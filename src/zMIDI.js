/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2023 https://www.igorski.nl
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import zMIDIEvent  from "./zMIDIEvent";
import SysexBuffer from "./SysexBuffer";

/* private properties */

/**
 * @private
 * @type {MIDIAccess}
 */
let midiInterface = null;

/**
 * @private
 * @type {Object}
 */
const listenerMap  = {};
let changeListener = null;

function handleConnectionFailure() {
    throw new Error( "zMIDI unavailable, WebMIDI either unsupported or" +
                     "zMIDI hasn't established a connection yet" );
}

/**
 * the main hub that hooks into the MIDI interface
 */
const zMIDI = {
    /* public methods */

    /**
     * Creates a connection to the MIDI interface.
     *
     * @param {boolean=} aOptSysex optional, whether to also provide an interface to
     *                   send and receive system exclusive messages
     * @return {Promise<Array<WebMidi.MIDIInput>, Array<WebMidi.MIDIOutput>>}
     */
    connect( aOptSysex = false ) {
        if ( !zMIDI.isSupported() ) {
            return handleConnectionFailure();
        }
        const options = { sysex : aOptSysex };
        return new Promise( async ( resolve, reject ) => {
            try {
                midiInterface = await navigator.requestMIDIAccess( /** @type {MIDIOptions} */ ( options ));
                resolve( zMIDI.getInChannels(), zMIDI.getOutChannels() );
            } catch ( error ) {
                reject( error );
            }
        });
    },

    /**
     * whether MIDI is available in the current application runtime environment
     * note this does NOT mean a successful connection can be established !
     * (i.e. navigator supports MIDI, but no devices are attached)
     *
     * @return {boolean}
     */
    isSupported() {
        return "requestMIDIAccess" in navigator;
    },

    /**
     * whether zMIDI is connected to an interface / listening
     * to MIDI messages
     *
     * @return {boolean}
     */
    isConnected() {
        return midiInterface !== null;
    },

    /**
     * @param {function(Array<WebMidi.MIDIInput>, Array<WebMidi.MIDIOutput>)} listener
     */
    addChangeListener( listener ) {
        if ( !zMIDI.isConnected() ) {
            throw new Error( "cannot add listener without connecting zMIDI first" );
        }
        changeListener = () => {
            listener( zMIDI.getInChannels(), zMIDI.getOutChannels() );
        };
        midiInterface.addEventListener( "statechange", changeListener );
    },

    removeChangeListener() {
        if ( changeListener ) {
            midiInterface.removeEventListener( "statechange", changeListener );
            changeListener = null;
        }
    },

    destroy() {
        if ( !zMIDI.isConnected() ) {
            return;
        }
        zMIDI.removeChangeListener();
        Object.entries( listenerMap ).forEach(([ portNumber, listener ]) => {
            if ( listener ) {
                const inChannel = zMIDI.getInChannels()[ portNumber ];
                inChannel.close();
                inChannel.removeEventListener( "midimessage", listener, true );
                delete listenerMap[ portNumber ];
            }
        });
        midiInterface = null;
    },

    /**
     * attach a method to listen to MIDI message in events
     *
     * @param {number} portNumber index of the MIDI port to listen on
     * @param {function(ZMIDIEvent)} listener to receive {zMIDIEvent}
     */
    addMessageListener( portNumber, listener ) {
        const sysexBuffer     = new SysexBuffer(); // create a new sysex buffer for this port
        const proxiedListener = function( aEvent )
        {
            const eventData = /** @type {Uint8Array} */ ( aEvent.data ), isSysexMessage = false;

            const cmd      = eventData[ 0 ] >> 4;
            const channel  = eventData[ 0 ] & 0xf;
            const number   = eventData[ 1 ];
            const velocity = eventData.length > 2 ? eventData[ 2 ] : 0;

            let eventType, value;

            if ( cmd == 8 || (( cmd == 9 ) && ( velocity === 0 )) )
            {
                eventType = zMIDIEvent.NOTE_OFF;
                value     = number;
            }
            else if ( cmd == 9 ) {
                eventType = zMIDIEvent.NOTE_ON;
                value     = number;
            }
            else if ( cmd == 11 ) {
                eventType = zMIDIEvent.CONTROL_CHANGE;
                value     = velocity;
            }
            else
            {
                // everything else
                let length = 0;
                for ( let i = 0; i < eventData.length; i += length )
                {
                    if ( sysexBuffer.processing )
                    {
                        i = sysexBuffer.process( eventData, i );
                        if ( eventData[ i - 1 ] != 0xf7 ) return; // Sysex message hasn't ended yet
                        isSysexMessage = true;
                    }
                    else
                    {
                        isSysexMessage = false;

                        switch ( eventData[ i ] & 0xF0 )
                        {
                            /* // these could occur but should have been caught above!
                            case 0x80:  // note off
                            case 0x90:  // note on
                            case 0xB0:  // control change
                                length = 3;
                                break;
                            */
                            case 0xA0:
                                eventType = zMIDIEvent.AFTERTOUCH;
                                length    = 3;
                                break;

                            case 0xE0:
                                eventType = zMIDIEvent.CHANNEL_MODE;
                                length    = 3;
                                break;

                            case 0xC0:
                                eventType = zMIDIEvent.PROGRAM_CHANGE;
                                length    = 2;
                                break;

                            case 0xD0:
                                eventType = zMIDIEvent.CHANNEL_AFTERTOUCH;
                                length    = 2;
                                break;

                            case 0xF0:

                                switch ( eventData[ i ])
                                {
                                    case 0xf0:
                                        // implies incoming Sysex message
                                        i = sysexBuffer.process( eventData, i );
                                        if ( eventData[ i - 1 ] != 0xf7 ) return; // Sysex message hasn't ended yet
                                        isSysexMessage = true;
                                        break;

                                    case 0xF1:
                                        eventType = zMIDIEvent.QUARTER_FRAME;
                                        length    = 2;
                                        break;

                                    case 0xF3:
                                        eventType = zMIDIEvent.SONG_SELECT;
                                        length    = 2;
                                        break;

                                    case 0xF2:
                                        eventType = zMIDIEvent.SONG_POSITION;
                                        length    = 3;
                                        break;

                                    default:
                                        length = 1;
                                        break;
                                }
                                break;
                        }
                    }
                }
                if ( isSysexMessage && sysexBuffer.completed ) {
                    value = sysexBuffer.getMessage();
                }
                else {
                    value = new Uint8Array( eventData.subarray( i, length + i ));
                }
            }
            // wrap it up, create zMIDIEvent and broadcast it to the listener
            const event = new zMIDIEvent(
                /** @type {number} */ ( eventType ), value, velocity, number,
                channel, portNumber, isSysexMessage
            );
            listener( event );

            // prepare for next Sysex message stream
            if ( isSysexMessage && sysexBuffer.completed ) {
                sysexBuffer.reset();
            }
        };

        // attach listener
        listenerMap[ portNumber ] = proxiedListener;
        const inChannel = zMIDI.getInChannels()[ portNumber ];

        inChannel.addEventListener( "midimessage", proxiedListener, true );
        inChannel.open();
    },

    /**
     * detach a method to listen to MIDI message in events
     *
     * @param {number} portNumber index of the MIDI port stop listening on
     */
    removeMessageListener( portNumber )
    {
        const listener = listenerMap[ portNumber];
        if ( listener ) {
            const inChannel = zMIDI.getInChannels()[ portNumber ];
            inChannel.close();
            inChannel.removeEventListener( "midimessage", listener, true );
            delete listenerMap[ portNumber ];
        }
    },

    /**
     * broadcast a message to a MIDI port
     *
     * @param {number} portNumber index of the MIDI port to broadcast to
     * @param {Array<number>} message to send, is an Array with three slots :
     *                         event type (e.g. note on/note off), note (frequency) and velocity
     * @param {number=} timestamp optional time to send the message, by default
     *                  the message will be sent immediately
     */
    sendMessage( portNumber, message, timestamp ) {
        zMIDI.getOutChannels()[ portNumber ].send( message, timestamp );
    },

    /**
     * retrieve all available MIDI inputs
     *
     * @return {Array<WebMidi.MIDIInput>}
     */
    getInChannels()
    {
        if ( zMIDI.isConnected() )
        {
            let inputs = /** @type {Array<WebMidi.MIDIInput>} */ ( [] );

            if ( typeof midiInterface.inputs === "function" ) {
                inputs = midiInterface.inputs();
            }
            else {
                const it = midiInterface.inputs.values();
                for ( let o = it.next(); !o.done; o = it.next() ) {
                    inputs.push( o.value );
                }
            }
            return inputs;
        }
        handleConnectionFailure();
        return null;
    },

    /**
     * retrieve all available MIDI output ports
     *
     * @return {Array<WebMidi.MIDIOutput>}
     */
    getOutChannels()
    {
        if ( zMIDI.isConnected() )
        {
            let outputs = /** @type {Array<WebMidi.MIDIOutput>} */ ( [] );

            if ( typeof midiInterface.outputs === "function" ) {
                outputs = midiInterface.outputs();
            }
            else {
                const it = midiInterface.outputs.values();
                for ( let o = it.next(); !o.done; o = it.next() ) {
                    outputs.push( o.value );
                }
            }
            return outputs;
        }
        handleConnectionFailure();
        return null;
    },

    /**
     * retrieve the current timestamp of the MIDI performance
     * (in milliseconds) this can be used to enqueue events relative
     * to the current time (e.g. getCurrentTime() + 1000 can enqueue
     * an event 1 second from now)
     *
     * @return {number}
     */
    getCurrentTime() {
        return window.performance.now();
    }
};
export default zMIDI;

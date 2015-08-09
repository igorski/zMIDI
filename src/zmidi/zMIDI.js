/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Igor Zinken / igorski
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
// resolve CommonJS dependencies

var zMIDIEvent, SysexBuffer;

if ( typeof module !== "undefined" )
{
    zMIDIEvent  = require( "./zMIDIEvent" );
    SysexBuffer = require( "./SysexBuffer" );
}

(function( aName, aModule )
{
    // CommonJS
    if ( typeof module !== "undefined" )
        module.exports = aModule();

    // AMD
    else if ( typeof define === "function" && typeof define.amd === "object" )
        define( aName, [ "zMIDIEvent", "SysexBuffer" ], function( aZME, aSB )
        {
            zMIDIEvent  = aZME;
            SysexBuffer = aSB;
            return aModule();
        });

    // Browser global
    else this[ aName ] = aModule;

}( "zMIDI", function()
{
    /**
     * the main hub that hooks into the MIDI interface
     *
     * @typedef {{
     *              connect : Function,
     *              isSupported : Function,
     *              isConnected : Function,
     *              addMessageListener : Function,
     *              removeMessageListener : Function,
     *              sendMessage : Function,
     *              getInChannels : Function,
     *              getOutChannels : Function,
     *              getCurrentTime : Function,
     *              _interface : MIDIAccess,
     *              _listenerMap : Object,
     *              _handleConnectionFailure: Function
     *          }}
     */
    var zMIDI =
    {
        /* public methods */

        /**
         * creates a connection to the MIDI interface
         *
         * @public
         *
         * @param {!Function} aSuccessHandler invoked when connection has been established
         * @param {!Function} aFaultHandler invoked when MIDI is not available, will receive
         *                    error message argument
         * @param {boolean=} aOptSysex optional, whether to also provide an interface to
         *                   send and receive system exclusive messages
         */
        connect : function( aSuccessHandler, aFaultHandler, aOptSysex )
        {
            if ( !zMIDI.isSupported() ) {
                aFaultHandler( "zMIDI not supported by browser" );
                return;
            }

            var options = void 0;

            if ( aOptSysex ) {
                options = { "sysex" : true };
            }

            navigator.requestMIDIAccess( /** @type {MIDIOptions} */ ( options )).then( function( midiAccess )
            {
                zMIDI._interface = /** @type {MIDIAccess} */ ( midiAccess );
                aSuccessHandler();
            },
            aFaultHandler );
        },

        /**
         * whether MIDI is available in the current application runtime environment
         * note this does NOT mean a successful connection can be established !
         * (i.e. navigator supports MIDI, but no devices are attached)
         *
         * @public
         * @return {boolean}
         */
        isSupported : function()
        {
            return "requestMIDIAccess" in navigator;
        },

        /**
         * whether zMIDI is connected to an interface / listening
         * to MIDI messages
         *
         * @public
         * @return {boolean}
         */
        isConnected : function()
        {
            return ( zMIDI._interface !== null );
        },

        /**
         * attach a method to listen to MIDI message in events
         *
         * @public
         *
         * @param {number} aPortNumber index of the MIDI port to listen on
         * @param {!Function} aListener to receive {zMIDIEvent}
         */
        addMessageListener : function( aPortNumber, aListener )
        {
            var sysexBuffer     = new SysexBuffer();    // create a new sysex buffer for this port
            var proxiedListener = function( aEvent )
            {
                var eventData = /** @type {Uint8Array} */ ( aEvent[ "data" ] ), isSysexMessage = false;

                var cmd          = eventData[ 0 ] >> 4;
                var channel      = eventData[ 0 ] & 0xf;
                var noteNumber   = eventData[ 1 ];
                var velocity     = eventData.length > 2 ? eventData[ 2 ] : 0;

                var eventType, value;

                if ( cmd == 8 || (( cmd == 9 ) && ( velocity === 0 )) )
                {
                    eventType = zMIDIEvent.NOTE_OFF;
                    value     = noteNumber;
                }
                else if ( cmd == 9 ) {
                    eventType = zMIDIEvent.NOTE_ON;
                    value     = noteNumber;
                }
                else if ( cmd == 11 ) {
                    eventType = zMIDIEvent.CONTROL_CHANGE;
                    value     = velocity; // CC message value is velocity
                }
                else
                {
                    // everything else, likely Sysex message
                    var length = 0;

                    for ( var i = 0; i < eventData.length; i += length )
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
                    if ( isSysexMessage && sysexBuffer.completed )
                    {
                        value = sysexBuffer.getMessage();
                    }
                    else {
                        value = new Uint8Array( eventData.subarray( i, length + i ));
                    }
                }
                // wrap it up, create zMIDIEvent and broadcast it to the listener
                var event = new zMIDIEvent( /** @type {number} */ ( eventType ), value, velocity,
                                            channel, aPortNumber, isSysexMessage );
                aListener( event );

                // prepare for next Sysex message stream
                if ( isSysexMessage && sysexBuffer.completed ) sysexBuffer.reset();
            };

            // attach listener
            zMIDI._listenerMap[ aPortNumber ] = proxiedListener;
            var inChannel = zMIDI.getInChannels()[ aPortNumber ];

            inChannel.addEventListener( "midimessage", proxiedListener, true );
            inChannel.open();
        },

        /**
         * detach a method to listen to MIDI message in events
         *
         * @public
         *
         * @param {number} aPortNumber index of the MIDI port stop listening on
         */
        removeMessageListener : function( aPortNumber )
        {
            var listener = zMIDI._listenerMap[ aPortNumber], inChannel;

            if ( listener )
            {
                inChannel = zMIDI.getInChannels()[ aPortNumber ];
                inChannel.close();
                inChannel.removeEventListener( "midimessage", listener, true );
                delete zMIDI._listenerMap[ aPortNumber ];
            }
        },

        /**
         * broadcast a message to a MIDI port
         *
         * @public
         *
         * @param {number} aPortNumber index of the MIDI port to broadcast to
         * @param {Array.<number>} aMessage to send, is an Array with three slots :
         *                         event type (e.g. note on/note off), note (frequency) and velocity
         * @param {number=} aTimestamp optional time to send the message, by default
         *                  the message will be sent immediately
         */
        sendMessage : function( aPortNumber, aMessage, aTimestamp )
        {
            zMIDI.getOutChannels()[ aPortNumber ][ "send" ]( aMessage, aTimestamp );
        },

        /**
         * retrieve all available MIDI inputs
         *
         * @public
         * @return {Array.<MIDIInput>}
         */
        getInChannels : function()
        {
            if ( zMIDI.isConnected() )
            {
                var inputs = /** @type {Array.<MIDIInput>} */ ( [] );
                var iface  = zMIDI._interface;

                if ( typeof iface.inputs === "function" )
                {
                    inputs = iface.inputs();
                }
                else
                {
                    var it = iface.inputs[ "values" ]();

                    for ( var o = it[ "next" ](); !o[ "done" ]; o = it[ "next" ]() ) {
                        inputs.push( o[ "value" ] );
                    }
                }
                return inputs;
            }
            zMIDI._handleConnectionFailure();
            return null;
        },

        /**
         * retrieve all available MIDI output ports
         *
         * @public
         * @return {Array.<MIDIOutput>}
         */
        getOutChannels : function()
        {
            if ( zMIDI.isConnected() )
            {
                var outputs = /** @type {Array.<MIDIOutput>} */ ( [] );
                var iface   = zMIDI._interface;

                if ( typeof iface.outputs === "function" )
                {
                    outputs = iface.outputs();
                }
                else
                {
                    var it = iface.outputs[ "values" ]();

                    for ( var o = it[ "next" ](); !o[ "done" ]; o = it[ "next" ]() ) {
                        outputs.push( o[ "value" ] );
                    }
                }
                return outputs;
            }
            zMIDI._handleConnectionFailure();
            return null;
        },

        /**
         * retrieve the current timestamp of the MIDI performance
         * (in milliseconds) this can be used to enqueue events relative
         * to the current time (e.g. getCurrentTime() + 1000 can enqueue
         * an event 1 second from now)
         *
         * @public
         * @return {number}
         */
        getCurrentTime : function()
        {
            return window[ "performance" ][ "now" ]();
        },

        /* private properties */

        /**
         * @private
         * @type {MIDIAccess}
         */
        _interface : null,

        /**
         * @private
         * @type {Object}
         */
        _listenerMap : {},

        /**
         * @private
         * @throws {Error}
         */
        _handleConnectionFailure : function()
        {
            throw new Error( "zMIDI unavailable, WebMIDI either unsupported or" +
                             "zMIDI hasn't established a connection yet" );
        }
    };
    return zMIDI;
}));

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2021 https://www.igorski.nl
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
class zMIDIEvent {
    /**
     * @constructor
     *
     * @param {number} aType MIDI message type
     * @param {number|Uint8Array} aValue the MIDI message value can be Uint8Array
     *                 for sysex messages
     * @param {number} aVelocity the MIDI velocity value
     * @param {number} aChannel the MIDI channel the message was broadcast over
     * @param {number} aPortNumber the MIDI Input port number the
     *                 message was transmitted to / received on
     * @param {boolean=} aOptSysex optional whether the Event was a sysex message,
     *                   defaults to false
     */
    constructor( aType, aValue, aVelocity, aChannel, aPortNumber, aOptSysex = false )
    {
        /** @public @type {number} */  this.type = aType;
        /** @public @type {number} */  this.velocity = aVelocity;
        /** @public @type {number} */  this.channel  = aChannel;
        /** @public @type {number} */  this.port     = aPortNumber;
        /** @public @type {boolean} */ this.sysex    = aOptSysex;

        if ( this.sysex ) {
            this.sysexValue = /** @type {Uint8Array} */ ( aValue );
        }
        else {
            this.value = /** @type {number} */ ( aValue );
        }
    };
};

/* class constants */

/** @public @const @type {number} */ zMIDIEvent.NOTE_ON            = 0;
/** @public @const @type {number} */ zMIDIEvent.NOTE_OFF           = 1;
/** @public @const @type {number} */ zMIDIEvent.AFTERTOUCH         = 2;
/** @public @const @type {number} */ zMIDIEvent.CONTROL_CHANGE     = 3;
/** @public @const @type {number} */ zMIDIEvent.CHANNEL_MODE       = 4;
/** @public @const @type {number} */ zMIDIEvent.PROGRAM_CHANGE     = 5;
/** @public @const @type {number} */ zMIDIEvent.CHANNEL_AFTERTOUCH = 6;
/** @public @const @type {number} */ zMIDIEvent.SYSEX              = 7;
/** @public @const @type {number} */ zMIDIEvent.QUARTER_FRAME      = 8;
/** @public @const @type {number} */ zMIDIEvent.SONG_SELECT        = 9;
/** @public @const @type {number} */ zMIDIEvent.SONG_POSITION      = 10;

export default zMIDIEvent;

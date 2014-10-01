define( "zMIDIEvent", function()
{
    "use strict";

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
    var zMIDIEvent = function( aType, aValue, aVelocity, aChannel, aPortNumber, aOptSysex )
    {
        this.type     = aType;
        this.velocity = aVelocity;
        this.channel  = aChannel;
        this.port     = aPortNumber;
        this.sysex    = aOptSysex ? aOptSysex : false;

        if ( this.sysex ) {
            this.sysexValue = /** @type {Uint8Array} */ ( aValue );
        }
        else {
            this.value = /** @type {number} */ ( aValue );
        }
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

    /* class properties */

    /** @public @type {number} */     zMIDIEvent.prototype.type;
    /** @public @type {number} */     zMIDIEvent.prototype.value;
    /** @public @type {number} */     zMIDIEvent.prototype.velocity;
    /** @public @type {number} */     zMIDIEvent.prototype.channel;
    /** @public @type {number} */     zMIDIEvent.prototype.port;
    /** @public @type {boolean} */    zMIDIEvent.prototype.sysex;
    /** @public @type {Uint8Array} */ zMIDIEvent.prototype.sysexValue;

    return zMIDIEvent;

});

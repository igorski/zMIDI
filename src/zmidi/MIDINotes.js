/**
 * MIDINotes is an enumeration that lists all MIDI note numbers
 * as musical pitches (using note name and octave)
 *
 * @typedef {{
 *              getPitchByNoteNumber : Function
 *          }}
 */
define( "MIDINotes", function()
{
    var MIDINotes =
    {
        /**
         * convert a MIDI note number into a MIDINotes.Pitch Object
         * translating its value into more musically coherent values ;)
         *
         * @public
         *
         * @param {number} aNoteNumber
         * @return {{
         *             note: string,
         *             octave: number,
         *             frequency: number
         *         }}
         */
        getPitchByNoteNumber : function( aNoteNumber )
        {
            // note number range is 21 (A0) to 108 (C8)

            return {
                "note"      : MIDINotes.noteTable[ aNoteNumber % 12 ],
                "octave"    : Math.floor( aNoteNumber / 12 ) - 1,
                "frequency" : 440 * Math.pow( 2,( aNoteNumber - 69 ) / 12 )
            };
        },

        /**
         * @private
         * @type {Array.<string>}
         */
        noteTable : [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ]
    };

    return MIDINotes;

});

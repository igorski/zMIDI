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

(function( aName, aModule )
{
    // CommonJS
    if ( typeof module !== "undefined" )
        module.exports = aModule();

    // AMD
    else if ( typeof define === "function" && typeof define.amd === "object" )
        define( aName, [], function() { return aModule(); });

    // Browser global
    else this[ aName ] = aModule;

}( "MIDINotes", function()
{
    /**
     * MIDINotes is an enumeration that lists all MIDI note numbers
     * as musical pitches (using note name and octave)
     *
     * @typedef {{
     *              getPitchByNoteNumber : Function
     *          }}
     */
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

}));

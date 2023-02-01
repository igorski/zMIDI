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

 /**
  * MIDINotes is an enumeration that lists all MIDI note numbers
  * as musical pitches (using note name and octave)
  */
const MIDINotes = {
    /**
     * convert a MIDI note number into a MIDINotes.Pitch Object
     * translating its value into more musically coherent values ;)
     *
     * @param {number} noteNumber
     * @return {{
     *             note: string,
     *             octave: number,
     *             frequency: number
     *         }}
     */
    getPitchByNoteNumber( noteNumber ) {
        // note number range is 21 (A0) to 108 (C8)

        return {
            note      : MIDINotes.noteTable[ noteNumber % 12 ],
            octave    : Math.floor( noteNumber / 12 ) - 1,
            frequency : 440 * Math.pow( 2,( noteNumber - 69 ) / 12 )
        };
    },

    /**
     * @private
     * @type {Array<string>}
     */
    noteTable : [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ]
};
export default MIDINotes;

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
class SysexBuffer {

    /**
     * convenience class to receive and store long incoming
     * Sysex messages until they have finished their broadcast
     *
     * @constructor
     */
    constructor() {
        /* instance properties */

        /** @public @type {boolean} */     this.processing = false;
        /** @public @type {boolean} */     this.completed  = false;
        /** @private @type {Uint8Array} */ this._buffer;
    }

    /* public methods */

    /**
     * retrieve the Sysex message buffer (when buffer has completed writing)
     *
     * @public
     *
     * @return {Uint8Array}
     * @throws {Error}
     */
    getMessage() {
        if ( !this.completed || this._buffer === null ) {
            throw new Error( "SysexBuffer empty or message broadcast incomplete" );
        }
        return this._buffer;
    }

    /**
     * processes an incoming Sysex message and internally handles
     * the message state in the internal buffer
     *
     * @public
     *
     * @param {Uint8Array} data
     * @param {number} initialOffset
     *
     * @return {number} offset of the last data read pointer
     */
    process( data, initialOffset ) {
        let j = initialOffset;
        while ( j < data.length )
        {
            // end of message received, we're done!
            if ( data[ j ] == 0xF7 )
            {
                this.append( data.subarray( initialOffset, ++j ));
                this.processing = false;
                this.completed  = true;
                return j;
            }
            ++j;
        }
        this.append( data.subarray( initialOffset, j ));
        this.processing = true;

        return j;
    }

    /**
     * flush the contents of the current message buffer
     * so this instance can be re-used for new messages
     *
     * @public
     */
    reset() {
        this._buffer    = null;
        this.completed  = false;
        this.processing = false;
    }

    /* private methods */

    /**
     * append incoming Sysex Message data to the existing buffer
     * (this will also create a buffer if it didn't exist yet)
     *
     * @private
     *
     * @param {Uint8Array} data
     */
    append( data ) {
        const currentLength = this._buffer !== null ? this._buffer.length : 0;
        const newBuffer     = new Uint8Array( currentLength + data.length );

        if ( this._buffer !== null ) {
            newBuffer.set( this._buffer );
        }
        newBuffer.set( data, currentLength );

        this._buffer = newBuffer;
    }
};
export default SysexBuffer;

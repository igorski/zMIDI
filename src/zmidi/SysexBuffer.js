/**
 * convenience class to receive and store long incoming
 * Sysex messages until they have finished their broadcast
 */
define( "SysexBuffer", function()
{
    "use strict";

    /**
     * @constructor
     */
    var SysexBuffer = function()
    {

    };

    /* class properties */

    /** @public @type {boolean} */     SysexBuffer.prototype.processing = false;
    /** @public @type {boolean} */     SysexBuffer.prototype.completed  = false;
    /** @private @type {Uint8Array} */ SysexBuffer.prototype._buffer;

    /* public methods */

    /**
     * retrieve the Sysex message buffer (when buffer has completed writing)
     *
     * @public
     *
     * @return {Uint8Array}
     * @throws {Error}
     */
    SysexBuffer.prototype.getMessage = function()
    {
        if ( !this.completed || this._buffer === null )
        {
            throw new Error( "SysexBuffer empty or message broadcast incomplete" );
        }
        return this._buffer;
    };

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
    SysexBuffer.prototype.process = function( data, initialOffset )
    {
        var j = initialOffset;

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
    };

    /**
     * flush the contents of the current message buffer
     * so this instance can be re-used for new messages
     *
     * @public
     */
    SysexBuffer.prototype.reset = function()
    {
        this._buffer    = null;
        this.completed  =
        this.processing = false;
    };

    /* private methods */

    /**
     * append incoming Sysex Message data to the existing buffer
     * (this will also create a buffer if it didn't exist yet)
     *
     * @private
     *
     * @param {Uint8Array} data
     */
    SysexBuffer.prototype.append = function( data )
    {
        var currentLength = this._buffer !== null ? this._buffer.length : 0;
        var newBuffer     = new Uint8Array( currentLength + data.length );

        if ( this._buffer !== null )
        {
            newBuffer.set( this._buffer );
        }
        newBuffer.set( data, currentLength );

        this._buffer = newBuffer;
    };

    return SysexBuffer;
});

/**
 * expose the separate actors of
 * the zMIDI library
 */
module.exports =
{
    zMIDI      : require( "./src/zMIDI" ),
    zMIDIEvent : require( "./src/zMIDIEvent" ),
    MIDINotes  : require( "./src/MIDINotes" )
};

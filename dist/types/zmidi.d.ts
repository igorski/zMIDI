declare module "src/zMIDIEvent" {
    export default zMIDIEvent;
    class zMIDIEvent {
        constructor(type: number, value: number | Uint8Array, velocity: number, number: number, channel: number, portNumber: number, optSysex?: boolean | undefined);
        public type: number;
        public velocity: number;
        public number: number;
        public channel: number;
        public port: number;
        public sysex: boolean;
        sysexValue: Uint8Array;
        value: number;
    }
    namespace zMIDIEvent {
        const NOTE_ON: number;
        const NOTE_OFF: number;
        const AFTERTOUCH: number;
        const CONTROL_CHANGE: number;
        const CHANNEL_MODE: number;
        const PROGRAM_CHANGE: number;
        const CHANNEL_AFTERTOUCH: number;
        const SYSEX: number;
        const QUARTER_FRAME: number;
        const SONG_SELECT: number;
        const SONG_POSITION: number;
    }
}
declare module "src/SysexBuffer" {
    export default SysexBuffer;
    class SysexBuffer {
        public processing: boolean;
        public completed: boolean;
        private _buffer;
        getMessage(): Uint8Array;
        process(data: Uint8Array, initialOffset: number): number;
        reset(): void;
        private append;
    }
}
declare module "src/zMIDI" {
    export default zMIDI;
    namespace zMIDI {
        function connect(aOptSysex?: boolean): Promise<WebMidi.MIDIInput[]>;
        function isSupported(): boolean;
        function isConnected(): boolean;
        function addChangeListener(listener: (arg0: WebMidi.MIDIInput[], arg1: WebMidi.MIDIOutput[]) => any): void;
        function removeChangeListener(): void;
        function destroy(): void;
        function addMessageListener(portNumber: number, listener: (arg0: ZMIDIEvent) => any): void;
        function removeMessageListener(portNumber: number): void;
        function sendMessage(portNumber: number, message: number[], timestamp?: number): void;
        function getInChannels(): WebMidi.MIDIInput[];
        function getOutChannels(): WebMidi.MIDIOutput[];
        function getCurrentTime(): number;
    }
}
declare module "src/MIDINotes" {
    export default MIDINotes;
    namespace MIDINotes {
        function getPitchByNoteNumber(noteNumber: number): {
            note: string;
            octave: number;
            frequency: number;
        };
        const noteTable: Array<string>;
    }
}
declare module "zmidi" {
    import zMIDI from "src/zMIDI";
    import zMIDIEvent from "src/zMIDIEvent";
    import MIDINotes from "src/MIDINotes";
    export { zMIDI, zMIDIEvent, MIDINotes };
}
//# sourceMappingURL=zmidi.d.ts.map
# zMIDI

zMIDI is a small JavaScript library that provides an easy interface to transfer messages from connected MIDI
devices into your application. zMIDI basically enables your web app to communicate with musical hardware.

Instead of you having to manually translate weird hexadecimal numbers or doing scary masking operations on incoming MIDI messages, zMIDI does the job for you and provides you with enumerated types in an Event-driven model, which makes both more sense in a JavaScript environment and allows for easier development by providing an adequate abstraction layer.

zMIDI is used by WebSID and Efflux, which you can try out live. See the demos section at the end of this README.

## Installation

You can get zMIDI via NPM:

```
npm install zmidi
```

## Project integration

zMIDI is compatible with ES6 Modules, CommonJS, AMD/RequireJS or can be included in the browser via script tags:

### ES6 module

```
import { zMIDI, zMIDIEvent, MIDINotes } from "zmidi";
```

### CommonJS:

```
const ZMIDILib = require( "zmidi" );
const { zMIDI, zMIDIEvent, MIDINotes } = zMIDILib;
```

(you can subsequently use a tool like Browserify to build for the browser).

### RequireJS

Use _zmidi.amd.js_ inside the _dist/_-folder for a prebuilt, minimized AMD library transpiled to ES5.

```
require( [ "zmidi.amd" ], function( zMIDILib ) {
    // do something with zMIDILib-properties:
    // "zMIDI", "zMIDIEvent", "MIDINotes"    
});
```

### Browser:

Use _zmidi.min.js_ inside the _dist/_-folder for a prebuilt, minimized library transpiled to ES5.

```
<script type="text/javascript" src="./dist/zmidi.min.js"></script>
<script type="text/javascript">

    // do something with globally available actors:
    // "zMIDI", "zMIDIEvent", "MIDINotes"

</script>
```

## Usage

### Ensuring WebMIDI is available at the browser level

WebMIDI is still a W3C draft not implemented globally. Chrome users have already enjoyed this
feature for years across desktop and mobile platforms with Edge and Opera users following suit.

You can [consult this page](https://caniuse.com/?search=midi) to view the latest on browser support.

### Really making sure WebMIDI is available at the application level

Query the result of _zMIDI.isSupported()_ to really, really make sure it is available!

### Making sure you meet Chrome's security standards

As of M75, Web MIDI API will now ask for permissions. As such, any app using it will have to be served over HTTPS. Chrome’s permission requiring feature is available only on secure origins so effectively only on these the MIDI API will be allowed. The secure origins meet the following format:

```
(https, *, *)
(wss, *, *)
(*, localhost, *)
(*, 127/8, *)
(*, ::1/128, *)
(file, *, — )
(chrome-extension, *, — )
```

## Documentation / Wiki

You can view the online documentation here on Github :

https://github.com/igorski/zMIDI/wiki

## Demos

To quickly see what zMIDI is capable of, you can try the following URL with a MIDI keyboard attached to your computer :

https://rawgit.com/igorski/zMIDI/master/examples/index.html

those on macOS might find this [guide on creating a virtual MIDI output](https://feelyoursound.com/setup-midi-os-x/) valuable.

for a demo that packs some more punch, try the following applications:

 * [WebSID](https://www.igorski.nl/application/websid)
 * [Efflux](https://www.igorski.nl/application/efflux)

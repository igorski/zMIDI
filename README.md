# zMIDI

zMIDI is a small JavaScript "library" that provides an easy interface to transfer messages to and from the Web MIDI API
(for those less in the know: this API provides a means to communicate with musical hardware through the web browser).

zMIDI is aimed to easily integrate musical messages without needing to translate these to weird hexadecimal numbers or do
scary masking operations on incoming data values. Rather than having you translate MIDI commands, zMIDI does the job
for you and provides you with enumerated types in an Event-driven model, which makes both more sense in a JavaScript
environment and allows for easier development by providing an adequate abstraction layer.

## Usage

### Ensuring WebMIDI is available at the browser level

Those fortunate enough to have Google Chrome installed, can access this experimental feature (WebMIDI is still a W3C draft)
by navigating to chrome://flags/ and enabling WebMIDI (directly via chrome://flags/#enable-web-midi). Note there is also
an excellent WebMIDI shim available using the Jazz plugin, but this library is aimed at native support. Fingers crossed
that its adaptation is coming and will be as widespread as the WebAudio API seems to be heading to ;) For now Chrome 37+
should support it on Windows, OS X, Linux, Chrome OS and Android.

### Really making sure WebMIDI is available at the application level

Query the result of _ZMidi.isSupported_ to really, really make sure it is available!

### Really, really making sure MIDI devices are available at the real world level

Attach a MIDI device to your computer and activate it prior (!) to starting the browser. Note : some USB MIDI devices
won't show up when connected directly to your computer, or they will show up, but won't transmit messages.

You're likely to be most successful using an audio interface with dedicated MIDI in/out channels.

For instance : a M-Audio keyboard controller wouldn't show up when connected via USB, but when connecting the
keyboards MIDI-Out via a DIN cable into the MIDI-In of a MOTU soundcard, all messages are transmitted clearly.

## Documentation / Wiki

You can view the online documentation here on Github :

https://github.com/igorski/zMIDI/wiki

## Demo

To quickly see what zMIDI is capable of, you can try the WebSID Chrome experiment with a MIDI keyboard attached

to your computer for the experiment is using zMIDI ! : http://www.igorski.nl/experiment/websid

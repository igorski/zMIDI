module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=12)}([function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){t.exports=function(t){throw new TypeError('"'+t+'" is read-only')}},function(t,e,r){t.exports=r(11)},function(t,e,r){var n=r(6),o=r(7),i=r(8),a=r(10);t.exports=function(t,e){return n(t)||o(t,e)||i(t,e)||a()}},function(t,e){function r(t,e,r,n,o,i,a){try{var u=t[i](a),s=u.value}catch(t){return void r(t)}u.done?e(s):Promise.resolve(s).then(n,o)}t.exports=function(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function u(t){r(a,o,i,u,s,"next",t)}function s(t){r(a,o,i,u,s,"throw",t)}u(void 0)}))}}},function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return r}}},function(t,e,r){var n=r(9);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e,r){var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof l?e:l,i=Object.create(o.prototype),a=new O(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return L()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=w(a,r);if(u){if(u===f)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=c(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function l(){}function h(){}function p(){}var v={};v[o]=function(){return this};var d=Object.getPrototypeOf,y=d&&d(d(_([])));y&&y!==e&&r.call(y,o)&&(v=y);var g=p.prototype=l.prototype=Object.create(v);function m(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){var n;this._invoke=function(o,i){function a(){return new e((function(n,a){!function n(o,i,a,u){var s=c(t[o],t,i);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(l).then((function(t){f.value=t,a(f)}),(function(t){return n("throw",t,a,u)}))}u(s.arg)}(o,i,n,a)}))}return n=n?n.then(a,a):a()}}function w(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=c(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return h.prototype=g.constructor=p,p.constructor=h,h.displayName=u(p,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,u(t,a,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},m(b.prototype),b.prototype[i]=function(){return this},t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},m(g),u(g,a,"Generator"),g[o]=function(){return this},g.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=_,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},function(t,e,r){"use strict";r.r(e),r.d(e,"zMIDI",(function(){return _})),r.d(e,"zMIDIEvent",(function(){return d})),r.d(e,"MIDINotes",(function(){return C}));var n=r(1),o=r.n(n),a=r(3),u=r.n(a),s=r(2),c=r.n(s),f=r(4),l=r.n(f),h=r(0),p=r.n(h),v=function t(e,r,n,o,i,a){var u=arguments.length>6&&void 0!==arguments[6]&&arguments[6];p()(this,t),this.type=e,this.velocity=n,this.number=o,this.channel=i,this.port=a,this.sysex=u,this.sysex?this.sysexValue=r:this.value=r};v.NOTE_ON=0,v.NOTE_OFF=1,v.AFTERTOUCH=2,v.CONTROL_CHANGE=3,v.CHANNEL_MODE=4,v.PROGRAM_CHANGE=5,v.CHANNEL_AFTERTOUCH=6,v.SYSEX=7,v.QUARTER_FRAME=8,v.SONG_SELECT=9,v.SONG_POSITION=10;var d=v,y=r(5),g=r.n(y),m=function(){function t(){p()(this,t),this.processing=!1,this.completed=!1,this._buffer}return g()(t,[{key:"getMessage",value:function(){if(!this.completed||null===this._buffer)throw new Error("SysexBuffer empty or message broadcast incomplete");return this._buffer}},{key:"process",value:function(t,e){for(var r=e;r<t.length;){if(247==t[r])return this.append(t.subarray(e,++r)),this.processing=!1,this.completed=!0,r;++r}return this.append(t.subarray(e,r)),this.processing=!0,r}},{key:"reset",value:function(){this._buffer=null,this.completed=!1,this.processing=!1}},{key:"append",value:function(t){var e=null!==this._buffer?this._buffer.length:0,r=new Uint8Array(e+t.length);null!==this._buffer&&r.set(this._buffer),r.set(t,e),this._buffer=r}}]),t}(),b=null,w={},E=null;function x(){throw new Error("zMIDI unavailable, WebMIDI either unsupported orzMIDI hasn't established a connection yet")}var O={connect:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!O.isSupported())return x();var e={sysex:t};return new Promise(function(){var t=l()(c.a.mark((function t(r,n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.requestMIDIAccess(e);case 3:b=t.sent,r(O.getInChannels(),O.getOutChannels()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,r){return t.apply(this,arguments)}}())},isSupported:function(){return"requestMIDIAccess"in navigator},isConnected:function(){return null!==b},addChangeListener:function(t){if(!O.isConnected())throw new Error("cannot add listener without connecting zMIDI first");E=function(){t(O.getInChannels(),O.getOutChannels())},b.addEventListener("statechange",E)},removeChangeListener:function(){E&&(b.removeEventListener("statechange",E),E=null)},destroy:function(){O.isConnected()&&(O.removeChangeListener(),Object.entries(w).forEach((function(t){var e=u()(t,2),r=e[0],n=e[1];if(n){var o=O.getInChannels()[r];o.close(),o.removeEventListener("midimessage",n,!0),delete w[r]}})),b=null)},addMessageListener:function(t,e){var r=new m,n=function(n){var a,u,s=n.data,c=!1,f=s[0]>>4,l=15&s[0],h=s[1],p=s.length>2?s[2]:0;if(8==f||9==f&&0===p)a=d.NOTE_OFF,u=h;else if(9==f)a=d.NOTE_ON,u=h;else if(11==f)a=d.CONTROL_CHANGE,u=p;else{for(var v=0,y=0;y<s.length;y+=v)if(r.processing){if(247!=s[(y=r.process(s,y))-1])return;o()("isSysexMessage"),c=!0}else switch(o()("isSysexMessage"),c=!1,240&s[y]){case 160:a=d.AFTERTOUCH,v=3;break;case 224:a=d.CHANNEL_MODE,v=3;break;case 192:a=d.PROGRAM_CHANGE,v=2;break;case 208:a=d.CHANNEL_AFTERTOUCH,v=2;break;case 240:switch(s[y]){case 240:if(247!=s[(y=r.process(s,y))-1])return;o()("isSysexMessage"),c=!0;break;case 241:a=d.QUARTER_FRAME,v=2;break;case 243:a=d.SONG_SELECT,v=2;break;case 242:a=d.SONG_POSITION,v=3;break;default:v=1}}u=c&&r.completed?r.getMessage():new Uint8Array(s.subarray(i,v+i))}var g=new d(a,u,p,h,l,t,c);e(g),c&&r.completed&&r.reset()};w[t]=n;var a=O.getInChannels()[t];a.addEventListener("midimessage",n,!0),a.open()},removeMessageListener:function(t){var e=w[t];if(e){var r=O.getInChannels()[t];r.close(),r.removeEventListener("midimessage",e,!0),delete w[t]}},sendMessage:function(t,e,r){O.getOutChannels()[t].send(e,r)},getInChannels:function(){if(O.isConnected()){var t=[];if("function"==typeof b.inputs)t=b.inputs();else for(var e=b.inputs.values(),r=e.next();!r.done;r=e.next())t.push(r.value);return t}return x(),null},getOutChannels:function(){if(O.isConnected()){var t=[];if("function"==typeof b.outputs)t=b.outputs();else for(var e=b.outputs.values(),r=e.next();!r.done;r=e.next())t.push(r.value);return t}return x(),null},getCurrentTime:function(){return window.performance.now()}},_=O,L={getPitchByNoteNumber:function(t){return{note:L.noteTable[t%12],octave:Math.floor(t/12)-1,frequency:440*Math.pow(2,(t-69)/12)}},noteTable:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]},C=L}]);
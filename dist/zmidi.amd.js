define((()=>(()=>{var t={228:t=>{t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},858:t=>{t.exports=function(t){if(Array.isArray(t))return t}},926:t=>{function e(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,o)}t.exports=function(t){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=t.apply(r,n);function s(t){e(a,o,i,s,u,"next",t)}function u(t){e(a,o,i,s,u,"throw",t)}s(void 0)}))}}},575:t=>{t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},913:t=>{function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}},884:t=>{t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r}}},521:t=>{t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},103:t=>{t.exports=function(t){throw new TypeError('"'+t+'" is read-only')}},38:(t,e,r)=>{var n=r(858),o=r(884),i=r(379),a=r(521);t.exports=function(t,e){return n(t)||o(t,e)||i(t,e)||a()}},379:(t,e,r)=>{var n=r(228);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},757:(t,e,r)=>{t.exports=r(666)},666:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new I(n||[]);return i._invoke=function(t,e,r){var n=l;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===v){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=_(a,r);if(s){if(s===y)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=f(t,e,r);if("normal"===u.type){if(n=r.done?v:h,u.arg===y)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=v,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var l="suspendedStart",h="suspendedYield",p="executing",v="completed",y={};function d(){}function g(){}function m(){}var w={};w[i]=function(){return this};var b=Object.getPrototypeOf,E=b&&b(b(S([])));E&&E!==r&&n.call(E,i)&&(w=E);var x=m.prototype=d.prototype=Object.create(w);function O(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,i,a,s){var u=f(t[o],t,i);if("throw"!==u.type){var c=u.arg,l=c.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(l).then((function(t){c.value=t,a(c)}),(function(t){return r("throw",t,a,s)}))}s(u.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function _(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,_(t,r),"throw"===r.method))return y;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=f(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function S(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:T}}function T(){return{value:e,done:!0}}return g.prototype=x.constructor=m,m.constructor=g,g.displayName=u(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},O(L.prototype),L.prototype[a]=function(){return this},t.AsyncIterator=L,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new L(c(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(x),u(x,s,"Generator"),x[i]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(N),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),N(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{"use strict";r.r(n),r.d(n,{MIDINotes:()=>_,zMIDI:()=>O,zMIDIEvent:()=>v});var t=r(103),e=r.n(t),o=r(38),a=r.n(o),s=r(757),u=r.n(s),c=r(926),f=r.n(c),l=r(575),h=r.n(l),p=function t(e,r,n,o,i,a){var s=arguments.length>6&&void 0!==arguments[6]&&arguments[6];h()(this,t),this.type=e,this.velocity=n,this.number=o,this.channel=i,this.port=a,this.sysex=s,this.sysex?this.sysexValue=r:this.value=r};p.NOTE_ON=0,p.NOTE_OFF=1,p.AFTERTOUCH=2,p.CONTROL_CHANGE=3,p.CHANNEL_MODE=4,p.PROGRAM_CHANGE=5,p.CHANNEL_AFTERTOUCH=6,p.SYSEX=7,p.QUARTER_FRAME=8,p.SONG_SELECT=9,p.SONG_POSITION=10;const v=p;var y=r(913),d=r.n(y);const g=function(){function t(){h()(this,t),this.processing=!1,this.completed=!1,this._buffer}return d()(t,[{key:"getMessage",value:function(){if(!this.completed||null===this._buffer)throw new Error("SysexBuffer empty or message broadcast incomplete");return this._buffer}},{key:"process",value:function(t,e){for(var r=e;r<t.length;){if(247==t[r])return this.append(t.subarray(e,++r)),this.processing=!1,this.completed=!0,r;++r}return this.append(t.subarray(e,r)),this.processing=!0,r}},{key:"reset",value:function(){this._buffer=null,this.completed=!1,this.processing=!1}},{key:"append",value:function(t){var e=null!==this._buffer?this._buffer.length:0,r=new Uint8Array(e+t.length);null!==this._buffer&&r.set(this._buffer),r.set(t,e),this._buffer=r}}]),t}();var m=null,w={},b=null;function E(){throw new Error("zMIDI unavailable, WebMIDI either unsupported orzMIDI hasn't established a connection yet")}var x={connect:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!x.isSupported())return E();var e={sysex:t};return new Promise(function(){var t=f()(u().mark((function t(r,n){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.requestMIDIAccess(e);case 3:m=t.sent,r(x.getInChannels(),x.getOutChannels()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,r){return t.apply(this,arguments)}}())},isSupported:function(){return"requestMIDIAccess"in navigator},isConnected:function(){return null!==m},addChangeListener:function(t){if(!x.isConnected())throw new Error("cannot add listener without connecting zMIDI first");b=function(){t(x.getInChannels(),x.getOutChannels())},m.addEventListener("statechange",b)},removeChangeListener:function(){b&&(m.removeEventListener("statechange",b),b=null)},destroy:function(){x.isConnected()&&(x.removeChangeListener(),Object.entries(w).forEach((function(t){var e=a()(t,2),r=e[0],n=e[1];if(n){var o=x.getInChannels()[r];o.close(),o.removeEventListener("midimessage",n,!0),delete w[r]}})),m=null)},addMessageListener:function(t,r){var n=new g,o=function(o){var a,s,u=o.data,c=!1,f=u[0]>>4,l=15&u[0],h=u[1],p=u.length>2?u[2]:0;if(8==f||9==f&&0===p)a=v.NOTE_OFF,s=h;else if(9==f)a=v.NOTE_ON,s=h;else if(11==f)a=v.CONTROL_CHANGE,s=p;else{for(var y=0,d=0;d<u.length;d+=y)if(n.processing){if(247!=u[(d=n.process(u,d))-1])return;e()("isSysexMessage"),c=!0}else switch(e()("isSysexMessage"),c=!1,240&u[d]){case 160:a=v.AFTERTOUCH,y=3;break;case 224:a=v.CHANNEL_MODE,y=3;break;case 192:a=v.PROGRAM_CHANGE,y=2;break;case 208:a=v.CHANNEL_AFTERTOUCH,y=2;break;case 240:switch(u[d]){case 240:if(247!=u[(d=n.process(u,d))-1])return;e()("isSysexMessage"),c=!0;break;case 241:a=v.QUARTER_FRAME,y=2;break;case 243:a=v.SONG_SELECT,y=2;break;case 242:a=v.SONG_POSITION,y=3;break;default:y=1}}s=c&&n.completed?n.getMessage():new Uint8Array(u.subarray(i,y+i))}var g=new v(a,s,p,h,l,t,c);r(g),c&&n.completed&&n.reset()};w[t]=o;var a=x.getInChannels()[t];a.addEventListener("midimessage",o,!0),a.open()},removeMessageListener:function(t){var e=w[t];if(e){var r=x.getInChannels()[t];r.close(),r.removeEventListener("midimessage",e,!0),delete w[t]}},sendMessage:function(t,e,r){x.getOutChannels()[t].send(e,r)},getInChannels:function(){if(x.isConnected()){var t=[];if("function"==typeof m.inputs)t=m.inputs();else for(var e=m.inputs.values(),r=e.next();!r.done;r=e.next())t.push(r.value);return t}return E(),null},getOutChannels:function(){if(x.isConnected()){var t=[];if("function"==typeof m.outputs)t=m.outputs();else for(var e=m.outputs.values(),r=e.next();!r.done;r=e.next())t.push(r.value);return t}return E(),null},getCurrentTime:function(){return window.performance.now()}};const O=x;var L={getPitchByNoteNumber:function(t){return{note:L.noteTable[t%12],octave:Math.floor(t/12)-1,frequency:440*Math.pow(2,(t-69)/12)}},noteTable:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]};const _=L})(),n})()));
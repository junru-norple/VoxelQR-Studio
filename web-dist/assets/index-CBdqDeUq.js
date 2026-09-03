(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function ju(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Pi={},ta,Nc;function Zu(){return Nc||(Nc=1,ta=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ta}var ea={},Hn={},Uc;function bi(){if(Uc)return Hn;Uc=1;let i;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Hn.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},Hn.getSymbolTotalCodewords=function(n){return t[n]},Hn.getBCHDigit=function(e){let n=0;for(;e!==0;)n++,e>>>=1;return n},Hn.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');i=n},Hn.isKanjiModeEnabled=function(){return typeof i<"u"},Hn.toSJIS=function(n){return i(n)},Hn}var na={},Fc;function lc(){return Fc||(Fc=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+e)}}i.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},i.from=function(n,r){if(i.isValid(n))return n;try{return t(n)}catch{return r}}})(na)),na}var ia,Oc;function Ku(){if(Oc)return ia;Oc=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},ia=i,ia}var ra,zc;function $u(){if(zc)return ra;zc=1;function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return i.prototype.set=function(t,e,n,r){const s=t*this.size+e;this.data[s]=n,r&&(this.reservedBit[s]=!0)},i.prototype.get=function(t,e){return this.data[t*this.size+e]},i.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n},i.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},ra=i,ra}var sa={},kc;function Ju(){return kc||(kc=1,(function(i){const t=bi().getSymbolSize;i.getRowColCoords=function(n){if(n===1)return[];const r=Math.floor(n/7)+2,s=t(n),a=s===145?26:Math.ceil((s-13)/(2*r-2))*2,o=[s-7];for(let c=1;c<r-1;c++)o[c]=o[c-1]-a;return o.push(6),o.reverse()},i.getPositions=function(n){const r=[],s=i.getRowColCoords(n),a=s.length;for(let o=0;o<a;o++)for(let c=0;c<a;c++)o===0&&c===0||o===0&&c===a-1||o===a-1&&c===0||r.push([s[o],s[c]]);return r}})(sa)),sa}var aa={},Bc;function Qu(){if(Bc)return aa;Bc=1;const i=bi().getSymbolSize,t=7;return aa.getPositions=function(n){const r=i(n);return[[0,0],[r-t,0],[0,r-t]]},aa}var oa={},Hc;function td(){return Hc||(Hc=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},i.from=function(r){return i.isValid(r)?parseInt(r,10):void 0},i.getPenaltyN1=function(r){const s=r.size;let a=0,o=0,c=0,l=null,h=null;for(let u=0;u<s;u++){o=c=0,l=h=null;for(let d=0;d<s;d++){let f=r.get(u,d);f===l?o++:(o>=5&&(a+=t.N1+(o-5)),l=f,o=1),f=r.get(d,u),f===h?c++:(c>=5&&(a+=t.N1+(c-5)),h=f,c=1)}o>=5&&(a+=t.N1+(o-5)),c>=5&&(a+=t.N1+(c-5))}return a},i.getPenaltyN2=function(r){const s=r.size;let a=0;for(let o=0;o<s-1;o++)for(let c=0;c<s-1;c++){const l=r.get(o,c)+r.get(o,c+1)+r.get(o+1,c)+r.get(o+1,c+1);(l===4||l===0)&&a++}return a*t.N2},i.getPenaltyN3=function(r){const s=r.size;let a=0,o=0,c=0;for(let l=0;l<s;l++){o=c=0;for(let h=0;h<s;h++)o=o<<1&2047|r.get(l,h),h>=10&&(o===1488||o===93)&&a++,c=c<<1&2047|r.get(h,l),h>=10&&(c===1488||c===93)&&a++}return a*t.N3},i.getPenaltyN4=function(r){let s=0;const a=r.data.length;for(let c=0;c<a;c++)s+=r.data[c];return Math.abs(Math.ceil(s*100/a/5)-10)*t.N4};function e(n,r,s){switch(n){case i.Patterns.PATTERN000:return(r+s)%2===0;case i.Patterns.PATTERN001:return r%2===0;case i.Patterns.PATTERN010:return s%3===0;case i.Patterns.PATTERN011:return(r+s)%3===0;case i.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(s/3))%2===0;case i.Patterns.PATTERN101:return r*s%2+r*s%3===0;case i.Patterns.PATTERN110:return(r*s%2+r*s%3)%2===0;case i.Patterns.PATTERN111:return(r*s%3+(r+s)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}i.applyMask=function(r,s){const a=s.size;for(let o=0;o<a;o++)for(let c=0;c<a;c++)s.isReserved(c,o)||s.xor(c,o,e(r,c,o))},i.getBestMask=function(r,s){const a=Object.keys(i.Patterns).length;let o=0,c=1/0;for(let l=0;l<a;l++){s(l),i.applyMask(l,r);const h=i.getPenaltyN1(r)+i.getPenaltyN2(r)+i.getPenaltyN3(r)+i.getPenaltyN4(r);i.applyMask(l,r),h<c&&(c=h,o=l)}return o}})(oa)),oa}var Zr={},Vc;function zh(){if(Vc)return Zr;Vc=1;const i=lc(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Zr.getBlocksCount=function(r,s){switch(s){case i.L:return t[(r-1)*4+0];case i.M:return t[(r-1)*4+1];case i.Q:return t[(r-1)*4+2];case i.H:return t[(r-1)*4+3];default:return}},Zr.getTotalCodewordsCount=function(r,s){switch(s){case i.L:return e[(r-1)*4+0];case i.M:return e[(r-1)*4+1];case i.Q:return e[(r-1)*4+2];case i.H:return e[(r-1)*4+3];default:return}},Zr}var ca={},pr={},Gc;function ed(){if(Gc)return pr;Gc=1;const i=new Uint8Array(512),t=new Uint8Array(256);return(function(){let n=1;for(let r=0;r<255;r++)i[r]=n,t[n]=r,n<<=1,n&256&&(n^=285);for(let r=255;r<512;r++)i[r]=i[r-255]})(),pr.log=function(n){if(n<1)throw new Error("log("+n+")");return t[n]},pr.exp=function(n){return i[n]},pr.mul=function(n,r){return n===0||r===0?0:i[t[n]+t[r]]},pr}var Wc;function nd(){return Wc||(Wc=1,(function(i){const t=ed();i.mul=function(n,r){const s=new Uint8Array(n.length+r.length-1);for(let a=0;a<n.length;a++)for(let o=0;o<r.length;o++)s[a+o]^=t.mul(n[a],r[o]);return s},i.mod=function(n,r){let s=new Uint8Array(n);for(;s.length-r.length>=0;){const a=s[0];for(let c=0;c<r.length;c++)s[c]^=t.mul(r[c],a);let o=0;for(;o<s.length&&s[o]===0;)o++;s=s.slice(o)}return s},i.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let s=0;s<n;s++)r=i.mul(r,new Uint8Array([1,t.exp(s)]));return r}})(ca)),ca}var la,qc;function id(){if(qc)return la;qc=1;const i=nd();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(n){this.degree=n,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const r=new Uint8Array(n.length+this.degree);r.set(n);const s=i.mod(r,this.genPoly),a=this.degree-s.length;if(a>0){const o=new Uint8Array(this.degree);return o.set(s,a),o}return s},la=t,la}var ha={},ua={},da={},Xc;function kh(){return Xc||(Xc=1,da.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),da}var xn={},Yc;function Bh(){if(Yc)return xn;Yc=1;const i="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;xn.KANJI=new RegExp(e,"g"),xn.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),xn.BYTE=new RegExp(n,"g"),xn.NUMERIC=new RegExp(i,"g"),xn.ALPHANUMERIC=new RegExp(t,"g");const r=new RegExp("^"+e+"$"),s=new RegExp("^"+i+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return xn.testKanji=function(c){return r.test(c)},xn.testNumeric=function(c){return s.test(c)},xn.testAlphanumeric=function(c){return a.test(c)},xn}var jc;function Ti(){return jc||(jc=1,(function(i){const t=kh(),e=Bh();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(s,a){if(!s.ccBits)throw new Error("Invalid mode: "+s);if(!t.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?s.ccBits[0]:a<27?s.ccBits[1]:s.ccBits[2]},i.getBestModeForData=function(s){return e.testNumeric(s)?i.NUMERIC:e.testAlphanumeric(s)?i.ALPHANUMERIC:e.testKanji(s)?i.KANJI:i.BYTE},i.toString=function(s){if(s&&s.id)return s.id;throw new Error("Invalid mode")},i.isValid=function(s){return s&&s.bit&&s.ccBits};function n(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+r)}}i.from=function(s,a){if(i.isValid(s))return s;try{return n(s)}catch{return a}}})(ua)),ua}var Zc;function rd(){return Zc||(Zc=1,(function(i){const t=bi(),e=zh(),n=lc(),r=Ti(),s=kh(),a=7973,o=t.getBCHDigit(a);function c(d,f,g){for(let _=1;_<=40;_++)if(f<=i.getCapacity(_,g,d))return _}function l(d,f){return r.getCharCountIndicator(d,f)+4}function h(d,f){let g=0;return d.forEach(function(_){const m=l(_.mode,f);g+=m+_.getBitsLength()}),g}function u(d,f){for(let g=1;g<=40;g++)if(h(d,g)<=i.getCapacity(g,f,r.MIXED))return g}i.from=function(f,g){return s.isValid(f)?parseInt(f,10):g},i.getCapacity=function(f,g,_){if(!s.isValid(f))throw new Error("Invalid QR Code version");typeof _>"u"&&(_=r.BYTE);const m=t.getSymbolTotalCodewords(f),p=e.getTotalCodewordsCount(f,g),y=(m-p)*8;if(_===r.MIXED)return y;const v=y-l(_,f);switch(_){case r.NUMERIC:return Math.floor(v/10*3);case r.ALPHANUMERIC:return Math.floor(v/11*2);case r.KANJI:return Math.floor(v/13);case r.BYTE:default:return Math.floor(v/8)}},i.getBestVersionForData=function(f,g){let _;const m=n.from(g,n.M);if(Array.isArray(f)){if(f.length>1)return u(f,m);if(f.length===0)return 1;_=f[0]}else _=f;return c(_.mode,_.getLength(),m)},i.getEncodedBits=function(f){if(!s.isValid(f)||f<7)throw new Error("Invalid QR Code version");let g=f<<12;for(;t.getBCHDigit(g)-o>=0;)g^=a<<t.getBCHDigit(g)-o;return f<<12|g}})(ha)),ha}var fa={},Kc;function sd(){if(Kc)return fa;Kc=1;const i=bi(),t=1335,e=21522,n=i.getBCHDigit(t);return fa.getEncodedBits=function(s,a){const o=s.bit<<3|a;let c=o<<10;for(;i.getBCHDigit(c)-n>=0;)c^=t<<i.getBCHDigit(c)-n;return(o<<10|c)^e},fa}var pa={},ma,$c;function ad(){if($c)return ma;$c=1;const i=Ti();function t(e){this.mode=i.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let r,s,a;for(r=0;r+3<=this.data.length;r+=3)s=this.data.substr(r,3),a=parseInt(s,10),n.put(a,10);const o=this.data.length-r;o>0&&(s=this.data.substr(r),a=parseInt(s,10),n.put(a,o*3+1))},ma=t,ma}var ga,Jc;function od(){if(Jc)return ga;Jc=1;const i=Ti(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(n){this.mode=i.ALPHANUMERIC,this.data=n}return e.getBitsLength=function(r){return 11*Math.floor(r/2)+6*(r%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(r){let s;for(s=0;s+2<=this.data.length;s+=2){let a=t.indexOf(this.data[s])*45;a+=t.indexOf(this.data[s+1]),r.put(a,11)}this.data.length%2&&r.put(t.indexOf(this.data[s]),6)},ga=e,ga}var _a,Qc;function cd(){if(Qc)return _a;Qc=1;const i=Ti();function t(e){this.mode=i.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(n){return n*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let n=0,r=this.data.length;n<r;n++)e.put(this.data[n],8)},_a=t,_a}var va,tl;function ld(){if(tl)return va;tl=1;const i=Ti(),t=bi();function e(n){this.mode=i.KANJI,this.data=n}return e.getBitsLength=function(r){return r*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let r;for(r=0;r<this.data.length;r++){let s=t.toSJIS(this.data[r]);if(s>=33088&&s<=40956)s-=33088;else if(s>=57408&&s<=60351)s-=49472;else throw new Error("Invalid SJIS character: "+this.data[r]+`
Make sure your charset is UTF-8`);s=(s>>>8&255)*192+(s&255),n.put(s,13)}},va=e,va}var Ma={exports:{}},el;function hd(){return el||(el=1,(function(i){var t={single_source_shortest_paths:function(e,n,r){var s={},a={};a[n]=0;var o=t.PriorityQueue.make();o.push(n,0);for(var c,l,h,u,d,f,g,_,m;!o.empty();){c=o.pop(),l=c.value,u=c.cost,d=e[l]||{};for(h in d)d.hasOwnProperty(h)&&(f=d[h],g=u+f,_=a[h],m=typeof a[h]>"u",(m||_>g)&&(a[h]=g,o.push(h,g),s[h]=l))}if(typeof r<"u"&&typeof a[r]>"u"){var p=["Could not find a path from ",n," to ",r,"."].join("");throw new Error(p)}return s},extract_shortest_path_from_predecessor_list:function(e,n){for(var r=[],s=n;s;)r.push(s),e[s],s=e[s];return r.reverse(),r},find_path:function(e,n,r){var s=t.single_source_shortest_paths(e,n,r);return t.extract_shortest_path_from_predecessor_list(s,r)},PriorityQueue:{make:function(e){var n=t.PriorityQueue,r={},s;e=e||{};for(s in n)n.hasOwnProperty(s)&&(r[s]=n[s]);return r.queue=[],r.sorter=e.sorter||n.default_sorter,r},default_sorter:function(e,n){return e.cost-n.cost},push:function(e,n){var r={value:e,cost:n};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(Ma)),Ma.exports}var nl;function ud(){return nl||(nl=1,(function(i){const t=Ti(),e=ad(),n=od(),r=cd(),s=ld(),a=Bh(),o=bi(),c=hd();function l(p){return unescape(encodeURIComponent(p)).length}function h(p,y,v){const M=[];let R;for(;(R=p.exec(v))!==null;)M.push({data:R[0],index:R.index,mode:y,length:R[0].length});return M}function u(p){const y=h(a.NUMERIC,t.NUMERIC,p),v=h(a.ALPHANUMERIC,t.ALPHANUMERIC,p);let M,R;return o.isKanjiModeEnabled()?(M=h(a.BYTE,t.BYTE,p),R=h(a.KANJI,t.KANJI,p)):(M=h(a.BYTE_KANJI,t.BYTE,p),R=[]),y.concat(v,M,R).sort(function(w,P){return w.index-P.index}).map(function(w){return{data:w.data,mode:w.mode,length:w.length}})}function d(p,y){switch(y){case t.NUMERIC:return e.getBitsLength(p);case t.ALPHANUMERIC:return n.getBitsLength(p);case t.KANJI:return s.getBitsLength(p);case t.BYTE:return r.getBitsLength(p)}}function f(p){return p.reduce(function(y,v){const M=y.length-1>=0?y[y.length-1]:null;return M&&M.mode===v.mode?(y[y.length-1].data+=v.data,y):(y.push(v),y)},[])}function g(p){const y=[];for(let v=0;v<p.length;v++){const M=p[v];switch(M.mode){case t.NUMERIC:y.push([M,{data:M.data,mode:t.ALPHANUMERIC,length:M.length},{data:M.data,mode:t.BYTE,length:M.length}]);break;case t.ALPHANUMERIC:y.push([M,{data:M.data,mode:t.BYTE,length:M.length}]);break;case t.KANJI:y.push([M,{data:M.data,mode:t.BYTE,length:l(M.data)}]);break;case t.BYTE:y.push([{data:M.data,mode:t.BYTE,length:l(M.data)}])}}return y}function _(p,y){const v={},M={start:{}};let R=["start"];for(let T=0;T<p.length;T++){const w=p[T],P=[];for(let x=0;x<w.length;x++){const E=w[x],A=""+T+x;P.push(A),v[A]={node:E,lastCount:0},M[A]={};for(let L=0;L<R.length;L++){const N=R[L];v[N]&&v[N].node.mode===E.mode?(M[N][A]=d(v[N].lastCount+E.length,E.mode)-d(v[N].lastCount,E.mode),v[N].lastCount+=E.length):(v[N]&&(v[N].lastCount=E.length),M[N][A]=d(E.length,E.mode)+4+t.getCharCountIndicator(E.mode,y))}}R=P}for(let T=0;T<R.length;T++)M[R[T]].end=0;return{map:M,table:v}}function m(p,y){let v;const M=t.getBestModeForData(p);if(v=t.from(y,M),v!==t.BYTE&&v.bit<M.bit)throw new Error('"'+p+'" cannot be encoded with mode '+t.toString(v)+`.
 Suggested mode is: `+t.toString(M));switch(v===t.KANJI&&!o.isKanjiModeEnabled()&&(v=t.BYTE),v){case t.NUMERIC:return new e(p);case t.ALPHANUMERIC:return new n(p);case t.KANJI:return new s(p);case t.BYTE:return new r(p)}}i.fromArray=function(y){return y.reduce(function(v,M){return typeof M=="string"?v.push(m(M,null)):M.data&&v.push(m(M.data,M.mode)),v},[])},i.fromString=function(y,v){const M=u(y,o.isKanjiModeEnabled()),R=g(M),T=_(R,v),w=c.find_path(T.map,"start","end"),P=[];for(let x=1;x<w.length-1;x++)P.push(T.table[w[x]].node);return i.fromArray(f(P))},i.rawSplit=function(y){return i.fromArray(u(y,o.isKanjiModeEnabled()))}})(pa)),pa}var il;function dd(){if(il)return ea;il=1;const i=bi(),t=lc(),e=Ku(),n=$u(),r=Ju(),s=Qu(),a=td(),o=zh(),c=id(),l=rd(),h=sd(),u=Ti(),d=ud();function f(T,w){const P=T.size,x=s.getPositions(w);for(let E=0;E<x.length;E++){const A=x[E][0],L=x[E][1];for(let N=-1;N<=7;N++)if(!(A+N<=-1||P<=A+N))for(let F=-1;F<=7;F++)L+F<=-1||P<=L+F||(N>=0&&N<=6&&(F===0||F===6)||F>=0&&F<=6&&(N===0||N===6)||N>=2&&N<=4&&F>=2&&F<=4?T.set(A+N,L+F,!0,!0):T.set(A+N,L+F,!1,!0))}}function g(T){const w=T.size;for(let P=8;P<w-8;P++){const x=P%2===0;T.set(P,6,x,!0),T.set(6,P,x,!0)}}function _(T,w){const P=r.getPositions(w);for(let x=0;x<P.length;x++){const E=P[x][0],A=P[x][1];for(let L=-2;L<=2;L++)for(let N=-2;N<=2;N++)L===-2||L===2||N===-2||N===2||L===0&&N===0?T.set(E+L,A+N,!0,!0):T.set(E+L,A+N,!1,!0)}}function m(T,w){const P=T.size,x=l.getEncodedBits(w);let E,A,L;for(let N=0;N<18;N++)E=Math.floor(N/3),A=N%3+P-8-3,L=(x>>N&1)===1,T.set(E,A,L,!0),T.set(A,E,L,!0)}function p(T,w,P){const x=T.size,E=h.getEncodedBits(w,P);let A,L;for(A=0;A<15;A++)L=(E>>A&1)===1,A<6?T.set(A,8,L,!0):A<8?T.set(A+1,8,L,!0):T.set(x-15+A,8,L,!0),A<8?T.set(8,x-A-1,L,!0):A<9?T.set(8,15-A-1+1,L,!0):T.set(8,15-A-1,L,!0);T.set(x-8,8,1,!0)}function y(T,w){const P=T.size;let x=-1,E=P-1,A=7,L=0;for(let N=P-1;N>0;N-=2)for(N===6&&N--;;){for(let F=0;F<2;F++)if(!T.isReserved(E,N-F)){let V=!1;L<w.length&&(V=(w[L]>>>A&1)===1),T.set(E,N-F,V),A--,A===-1&&(L++,A=7)}if(E+=x,E<0||P<=E){E-=x,x=-x;break}}}function v(T,w,P){const x=new e;P.forEach(function(F){x.put(F.mode.bit,4),x.put(F.getLength(),u.getCharCountIndicator(F.mode,T)),F.write(x)});const E=i.getSymbolTotalCodewords(T),A=o.getTotalCodewordsCount(T,w),L=(E-A)*8;for(x.getLengthInBits()+4<=L&&x.put(0,4);x.getLengthInBits()%8!==0;)x.putBit(0);const N=(L-x.getLengthInBits())/8;for(let F=0;F<N;F++)x.put(F%2?17:236,8);return M(x,T,w)}function M(T,w,P){const x=i.getSymbolTotalCodewords(w),E=o.getTotalCodewordsCount(w,P),A=x-E,L=o.getBlocksCount(w,P),N=x%L,F=L-N,V=Math.floor(x/L),B=Math.floor(A/L),q=B+1,k=V-B,$=new c(k);let it=0;const ot=new Array(L),dt=new Array(L);let Xt=0;const zt=new Uint8Array(T.buffer);for(let Tt=0;Tt<L;Tt++){const mt=Tt<F?B:q;ot[Tt]=zt.slice(it,it+mt),dt[Tt]=$.encode(ot[Tt]),it+=mt,Xt=Math.max(Xt,mt)}const Pt=new Uint8Array(x);let X=0,Z,ct;for(Z=0;Z<Xt;Z++)for(ct=0;ct<L;ct++)Z<ot[ct].length&&(Pt[X++]=ot[ct][Z]);for(Z=0;Z<k;Z++)for(ct=0;ct<L;ct++)Pt[X++]=dt[ct][Z];return Pt}function R(T,w,P,x){let E;if(Array.isArray(T))E=d.fromArray(T);else if(typeof T=="string"){let V=w;if(!V){const B=d.rawSplit(T);V=l.getBestVersionForData(B,P)}E=d.fromString(T,V||40)}else throw new Error("Invalid data");const A=l.getBestVersionForData(E,P);if(!A)throw new Error("The amount of data is too big to be stored in a QR Code");if(!w)w=A;else if(w<A)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+A+`.
`);const L=v(w,P,E),N=i.getSymbolSize(w),F=new n(N);return f(F,w),g(F),_(F,w),p(F,P,0),w>=7&&m(F,w),y(F,L),isNaN(x)&&(x=a.getBestMask(F,p.bind(null,F,P))),a.applyMask(x,F),p(F,P,x),{modules:F,version:w,errorCorrectionLevel:P,maskPattern:x,segments:E}}return ea.create=function(w,P){if(typeof w>"u"||w==="")throw new Error("No input text");let x=t.M,E,A;return typeof P<"u"&&(x=t.from(P.errorCorrectionLevel,t.M),E=l.from(P.version),A=a.from(P.maskPattern),P.toSJISFunc&&i.setToSJISFunction(P.toSJISFunc)),R(w,E,x,A)},ea}var xa={},ya={},rl;function Hh(){return rl||(rl=1,(function(i){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let n=e.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+e);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(s){return[s,s]}))),n.length===6&&n.push("F","F");const r=parseInt(n.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:r&255,hex:"#"+n.slice(0,6).join("")}}i.getOptions=function(n){n||(n={}),n.color||(n.color={});const r=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,s=n.width&&n.width>=21?n.width:void 0,a=n.scale||4;return{width:s,scale:s?4:a,margin:r,color:{dark:t(n.color.dark||"#000000ff"),light:t(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},i.getScale=function(n,r){return r.width&&r.width>=n+r.margin*2?r.width/(n+r.margin*2):r.scale},i.getImageWidth=function(n,r){const s=i.getScale(n,r);return Math.floor((n+r.margin*2)*s)},i.qrToImageData=function(n,r,s){const a=r.modules.size,o=r.modules.data,c=i.getScale(a,s),l=Math.floor((a+s.margin*2)*c),h=s.margin*c,u=[s.color.light,s.color.dark];for(let d=0;d<l;d++)for(let f=0;f<l;f++){let g=(d*l+f)*4,_=s.color.light;if(d>=h&&f>=h&&d<l-h&&f<l-h){const m=Math.floor((d-h)/c),p=Math.floor((f-h)/c);_=u[o[m*a+p]?1:0]}n[g++]=_.r,n[g++]=_.g,n[g++]=_.b,n[g]=_.a}}})(ya)),ya}var sl;function fd(){return sl||(sl=1,(function(i){const t=Hh();function e(r,s,a){r.clearRect(0,0,s.width,s.height),s.style||(s.style={}),s.height=a,s.width=a,s.style.height=a+"px",s.style.width=a+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(s,a,o){let c=o,l=a;typeof c>"u"&&(!a||!a.getContext)&&(c=a,a=void 0),a||(l=n()),c=t.getOptions(c);const h=t.getImageWidth(s.modules.size,c),u=l.getContext("2d"),d=u.createImageData(h,h);return t.qrToImageData(d.data,s,c),e(u,l,h),u.putImageData(d,0,0),l},i.renderToDataURL=function(s,a,o){let c=o;typeof c>"u"&&(!a||!a.getContext)&&(c=a,a=void 0),c||(c={});const l=i.render(s,a,c),h=c.type||"image/png",u=c.rendererOpts||{};return l.toDataURL(h,u.quality)}})(xa)),xa}var Sa={},al;function pd(){if(al)return Sa;al=1;const i=Hh();function t(r,s){const a=r.a/255,o=s+'="'+r.hex+'"';return a<1?o+" "+s+'-opacity="'+a.toFixed(2).slice(1)+'"':o}function e(r,s,a){let o=r+s;return typeof a<"u"&&(o+=" "+a),o}function n(r,s,a){let o="",c=0,l=!1,h=0;for(let u=0;u<r.length;u++){const d=Math.floor(u%s),f=Math.floor(u/s);!d&&!l&&(l=!0),r[u]?(h++,u>0&&d>0&&r[u-1]||(o+=l?e("M",d+a,.5+f+a):e("m",c,0),c=0,l=!1),d+1<s&&r[u+1]||(o+=e("h",h),h=0)):c++}return o}return Sa.render=function(s,a,o){const c=i.getOptions(a),l=s.modules.size,h=s.modules.data,u=l+c.margin*2,d=c.color.light.a?"<path "+t(c.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",f="<path "+t(c.color.dark,"stroke")+' d="'+n(h,l,c.margin)+'"/>',g='viewBox="0 0 '+u+" "+u+'"',m='<svg xmlns="http://www.w3.org/2000/svg" '+(c.width?'width="'+c.width+'" height="'+c.width+'" ':"")+g+' shape-rendering="crispEdges">'+d+f+`</svg>
`;return typeof o=="function"&&o(null,m),m},Sa}var ol;function md(){if(ol)return Pi;ol=1;const i=Zu(),t=dd(),e=fd(),n=pd();function r(s,a,o,c,l){const h=[].slice.call(arguments,1),u=h.length,d=typeof h[u-1]=="function";if(!d&&!i())throw new Error("Callback required as last argument");if(d){if(u<2)throw new Error("Too few arguments provided");u===2?(l=o,o=a,a=c=void 0):u===3&&(a.getContext&&typeof l>"u"?(l=c,c=void 0):(l=c,c=o,o=a,a=void 0))}else{if(u<1)throw new Error("Too few arguments provided");return u===1?(o=a,a=c=void 0):u===2&&!a.getContext&&(c=o,o=a,a=void 0),new Promise(function(f,g){try{const _=t.create(o,c);f(s(_,a,c))}catch(_){g(_)}})}try{const f=t.create(o,c);l(null,s(f,a,c))}catch(f){l(f)}}return Pi.create=t.create,Pi.toCanvas=r.bind(null,e.render),Pi.toDataURL=r.bind(null,e.renderToDataURL),Pi.toString=r.bind(null,function(s,a,o){return n.render(s,o)}),Pi}var gd=md();const _d=ju(gd),vd=600;function Md(i,t){const e=i.trim();return e?t==="url"&&!/^[a-z][a-z\d+.-]*:\/\//i.test(e)?`https://${e}`:e:""}function Vh(i,t){const e=Md(i,t);if(!e)throw new Error("EMPTY_PAYLOAD");if([...e].length>vd)throw new Error("PAYLOAD_TOO_LONG");const n=_d.create(e,{errorCorrectionLevel:"H"}),r=n.modules.size,s=n.modules.data,a=Array.from({length:r},(o,c)=>Array.from({length:r},(l,h)=>!!s[c*r+h]));return{payload:e,size:r,matrix:a}}const xd={"zh-TW":{productName:"3D 動態體素 QR Code 生成器",tagline:"把內容種成一座漂亮、可探索、也能掃描的像素庭園。",controls:"3D 動態體素 QR Code 生成器",inputType:"內容類型",url:"網址",text:"文字",payload:"輸入網址或文字",payloadHintUrl:"例如 example.com",payloadHintText:"輸入任何中英文文字",encoded:"實際寫入",liveScene:"動態場景",scene:"探索場景",scan:"俯視掃描",reset:"符合視窗",exportQr:"匯出俯視",exportScene:"匯出場景",themes:"選擇庭園",language:"語言",offline:"完全離線",empty:"輸入內容後，庭園會立即生長。",needsInput:"等待內容",tooLong:"內容超過 600 個字元，請縮短後再試。",syncing:"正在生長",synchronized:"已即時更新",inputHelp:"輸入、貼上或刪除都會立即更新，不需要按下生成。",scanTip:"同一座彩色庭園，正平滑移向俯視",sceneTip:"左鍵自由旋轉 · 右鍵平移 · 滾輪縮放",sakura:"櫻花",summer:"夏樹",maple:"楓葉",ginkgo:"銀杏",snow:"雪樹",sunset:"夕陽",ocean:"海浪",wanderer:"像素旅兔",kitty:"體素小貓",downloadedQr:"俯視圖片已匯出",downloadedScene:"場景圖片已匯出",close:"關閉"},en:{productName:"Dynamic 3D Voxel QR Code Generator",tagline:"Turn your content into a beautiful voxel scene you can explore and scan.",controls:"3D QR Code Converter",inputType:"Content type",url:"URL",text:"Text",payload:"Enter a URL or text",payloadHintUrl:"Try example.com",payloadHintText:"Enter English, Chinese, or mixed text",encoded:"Encoded as",liveScene:"LIVE SCENE",scene:"Explore scene",scan:"Top-down scan",reset:"Fit view",exportQr:"Export top view",exportScene:"Export scene",themes:"Choose a scene",language:"Language",offline:"Fully offline",empty:"Enter content and the scene will appear immediately.",needsInput:"Waiting for content",tooLong:"This exceeds 600 characters. Shorten it and try again.",syncing:"Growing",synchronized:"Updated live",inputHelp:"Typing, pasting, and deleting update immediately—there is no Generate step.",scanTip:"The same colored scene is moving smoothly overhead",sceneTip:"Left drag rotates · Right drag pans · Wheel zooms",sakura:"Sakura",summer:"Summer tree",maple:"Maple",ginkgo:"Ginkgo",snow:"Snow tree",sunset:"Sunset",ocean:"Ocean waves",wanderer:"Pixel Wanderer",kitty:"Voxel Kitty",downloadedQr:"Top-down image exported",downloadedScene:"Scene image exported",close:"Close"}};function yd(i,t){return xd[i][t]}const hc="180",Sd=0,cl=1,Ed=2,Gh=1,bd=2,Fn=3,ni=0,Be=1,En=2,zn=0,Ji=1,ll=2,hl=3,ul=4,Td=5,vi=100,wd=101,Ad=102,Rd=103,Cd=104,Pd=200,Id=201,Dd=202,Ld=203,oo=204,co=205,Nd=206,Ud=207,Fd=208,Od=209,zd=210,kd=211,Bd=212,Hd=213,Vd=214,lo=0,ho=1,uo=2,nr=3,fo=4,po=5,mo=6,go=7,Wh=0,Gd=1,Wd=2,ti=0,qd=1,Xd=2,Yd=3,qh=4,jd=5,Zd=6,Kd=7,Xh=300,ir=301,rr=302,_o=303,vo=304,Ys=306,Mo=1e3,xi=1001,xo=1002,Te=1003,$d=1004,Kr=1005,wn=1006,Ea=1007,yi=1008,gn=1009,Yh=1010,jh=1011,Fr=1012,uc=1013,Ei=1014,dn=1015,Wr=1016,dc=1017,fc=1018,Or=1020,Zh=35902,Kh=35899,$h=1021,Jh=1022,Xe=1023,zr=1026,kr=1027,pc=1028,mc=1029,Qh=1030,gc=1031,_c=1033,As=33776,Rs=33777,Cs=33778,Ps=33779,yo=35840,So=35841,Eo=35842,bo=35843,To=36196,wo=37492,Ao=37496,Ro=37808,Co=37809,Po=37810,Io=37811,Do=37812,Lo=37813,No=37814,Uo=37815,Fo=37816,Oo=37817,zo=37818,ko=37819,Bo=37820,Ho=37821,Vo=36492,Go=36494,Wo=36495,qo=36283,Xo=36284,Yo=36285,jo=36286,Jd=3200,Qd=3201,tu=0,tf=1,hn="",Oe="srgb",sr="srgb-linear",Fs="linear",ie="srgb",Ii=7680,dl=519,ef=512,nf=513,rf=514,eu=515,sf=516,af=517,of=518,cf=519,fl=35044,lf=35048,pl="300 es",An=2e3,Os=2001;class wi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ml=1234567;const Pr=Math.PI/180,Br=180/Math.PI;function cr(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function vc(i,t){return(i%t+t)%t}function hf(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function uf(i,t,e){return i!==t?(e-i)/(t-i):0}function Ir(i,t,e){return(1-e)*i+e*t}function df(i,t,e,n){return Ir(i,t,1-Math.exp(-e*n))}function ff(i,t=1){return t-Math.abs(vc(i,t*2)-t)}function pf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function mf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function gf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function _f(i,t){return i+Math.random()*(t-i)}function vf(i){return i*(.5-Math.random())}function Mf(i){i!==void 0&&(ml=i);let t=ml+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xf(i){return i*Pr}function yf(i){return i*Br}function Sf(i){return(i&i-1)===0&&i!==0}function Ef(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function bf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Tf(i,t,e,n,r){const s=Math.cos,a=Math.sin,o=s(e/2),c=a(e/2),l=s((t+n)/2),h=a((t+n)/2),u=s((t-n)/2),d=a((t-n)/2),f=s((n-t)/2),g=a((n-t)/2);switch(r){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Yi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const yt={DEG2RAD:Pr,RAD2DEG:Br,generateUUID:cr,clamp:Yt,euclideanModulo:vc,mapLinear:hf,inverseLerp:uf,lerp:Ir,damp:df,pingpong:ff,smoothstep:pf,smootherstep:mf,randInt:gf,randFloat:_f,randFloatSpread:vf,seededRandom:Mf,degToRad:xf,radToDeg:yf,isPowerOfTwo:Sf,ceilPowerOfTwo:Ef,floorPowerOfTwo:bf,setQuaternionFromProperEuler:Tf,normalize:Ne,denormalize:Yi};class Zt{constructor(t=0,e=0){Zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fn{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],u=n[r+3];const d=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o;const p=c*d+l*f+h*g+u*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const R=Math.sqrt(v),T=Math.atan2(R,p*y);m=Math.sin(m*T)/R,o=Math.sin(o*T)/R}const M=o*y;if(c=c*m+d*M,l=l*m+f*M,h=h*m+g*M,u=u*m+_*M,m===1-o){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],u=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return t[e]=o*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-o*f,t[e+2]=l*g+h*f+o*d-c*u,t[e+3]=h*g-o*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),u=o(s/2),d=c(n/2),f=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*r-o*n),h=2*(o*e-s*r),u=2*(s*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=r+c*u+s*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ba.copy(this).projectOnVector(t),this.sub(ba)}reflect(t){return this.sub(ba.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ba=new I,gl=new fn;class Vt{constructor(t,e,n,r,s,a,o,c,l){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l)}set(t,e,n,r,s,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=r,h[2]=o,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=r[0],m=r[3],p=r[6],y=r[1],v=r[4],M=r[7],R=r[2],T=r[5],w=r[8];return s[0]=a*_+o*y+c*R,s[3]=a*m+o*v+c*T,s[6]=a*p+o*M+c*w,s[1]=l*_+h*y+u*R,s[4]=l*m+h*v+u*T,s[7]=l*p+h*M+u*w,s[2]=d*_+f*y+g*R,s[5]=d*m+f*v+g*T,s[8]=d*p+f*M+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,d=o*c-h*s,f=l*s-a*c,g=e*u+n*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*l-h*n)*_,t[2]=(o*n-r*a)*_,t[3]=d*_,t[4]=(h*e-r*c)*_,t[5]=(r*s-o*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-r*l,r*c,-r*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ta.makeScale(t,e)),this}rotate(t){return this.premultiply(Ta.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ta.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ta=new Vt;function nu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function zs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wf(){const i=zs("canvas");return i.style.display="block",i}const _l={};function Hr(i){i in _l||(_l[i]=!0,console.warn(i))}function Af(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const vl=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ml=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rf(){const i={enabled:!0,workingColorSpace:sr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ie&&(r.r=kn(r.r),r.g=kn(r.g),r.b=kn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ie&&(r.r=Qi(r.r),r.g=Qi(r.g),r.b=Qi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===hn?Fs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Hr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Hr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sr]:{primaries:t,whitePoint:n,transfer:Fs,toXYZ:vl,fromXYZ:Ml,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:vl,fromXYZ:Ml,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}}),i}const Jt=Rf();function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Di;class Cf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Di===void 0&&(Di=zs("canvas")),Di.width=t.width,Di.height=t.height;const r=Di.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=Di}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=zs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=kn(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Pf=0;class Mc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=cr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(wa(r[a].image)):s.push(wa(r[a]))}else s=wa(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function wa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Cf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let If=0;const Aa=new I;class De extends wi{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=xi,r=xi,s=wn,a=yi,o=Xe,c=gn,l=De.DEFAULT_ANISOTROPY,h=hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=cr(),this.name="",this.source=new Mc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Aa).x}get height(){return this.source.getSize(Aa).y}get depth(){return this.source.getSize(Aa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mo:t.x=t.x-Math.floor(t.x);break;case xi:t.x=t.x<0?0:1;break;case xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mo:t.y=t.y-Math.floor(t.y);break;case xi:t.y=t.y<0?0:1;break;case xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=Xh;De.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,r=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,M=(f+1)/2,R=(p+1)/2,T=(h+d)/4,w=(u+_)/4,P=(g+m)/4;return v>M&&v>R?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=T/n,s=w/n):M>R?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=T/r,s=P/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=w/s,r=P/s),this.set(n,r,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Df extends wi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const r={width:t,height:e,depth:n.depth},s=new De(r);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:wn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Mc(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cn extends Df{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class iu extends De{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Te,this.minFilter=Te,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lf extends De{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Te,this.minFilter=Te,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ii{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(s,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$r.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$r.copy(n.boundingBox)),$r.applyMatrix4(t.matrixWorld),this.union($r)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(mr),Jr.subVectors(this.max,mr),Li.subVectors(t.a,mr),Ni.subVectors(t.b,mr),Ui.subVectors(t.c,mr),Vn.subVectors(Ni,Li),Gn.subVectors(Ui,Ni),ai.subVectors(Li,Ui);let e=[0,-Vn.z,Vn.y,0,-Gn.z,Gn.y,0,-ai.z,ai.y,Vn.z,0,-Vn.x,Gn.z,0,-Gn.x,ai.z,0,-ai.x,-Vn.y,Vn.x,0,-Gn.y,Gn.x,0,-ai.y,ai.x,0];return!Ra(e,Li,Ni,Ui,Jr)||(e=[1,0,0,0,1,0,0,0,1],!Ra(e,Li,Ni,Ui,Jr))?!1:(Qr.crossVectors(Vn,Gn),e=[Qr.x,Qr.y,Qr.z],Ra(e,Li,Ni,Ui,Jr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const In=[new I,new I,new I,new I,new I,new I,new I,new I],nn=new I,$r=new ii,Li=new I,Ni=new I,Ui=new I,Vn=new I,Gn=new I,ai=new I,mr=new I,Jr=new I,Qr=new I,oi=new I;function Ra(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){oi.fromArray(i,s);const o=r.x*Math.abs(oi.x)+r.y*Math.abs(oi.y)+r.z*Math.abs(oi.z),c=t.dot(oi),l=e.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Nf=new ii,gr=new I,Ca=new I;class Ai{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Nf.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gr.subVectors(t,this.center);const e=gr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(gr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ca.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gr.copy(t.center).add(Ca)),this.expandByPoint(gr.copy(t.center).sub(Ca))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Dn=new I,Pa=new I,ts=new I,Wn=new I,Ia=new I,es=new I,Da=new I;class xc{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Pa.copy(t).add(e).multiplyScalar(.5),ts.copy(e).sub(t).normalize(),Wn.copy(this.origin).sub(Pa);const s=t.distanceTo(e)*.5,a=-this.direction.dot(ts),o=Wn.dot(this.direction),c=-Wn.dot(ts),l=Wn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Pa).addScaledVector(ts,d),f}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);const n=Dn.dot(this.direction),r=Dn.dot(Dn)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,r,s){Ia.subVectors(e,t),es.subVectors(n,t),Da.crossVectors(Ia,es);let a=this.direction.dot(Da),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wn.subVectors(this.origin,t);const c=o*this.direction.dot(es.crossVectors(Wn,es));if(c<0)return null;const l=o*this.direction.dot(Ia.cross(Wn));if(l<0||c+l>a)return null;const h=-o*Wn.dot(Da);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Dt{constructor(t,e,n,r,s,a,o,c,l,h,u,d,f,g,_,m){Dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l,h,u,d,f,g,_,m)}set(t,e,n,r,s,a,o,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Dt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Fi.setFromMatrixColumn(t,0).length(),s=1/Fi.setFromMatrixColumn(t,1).length(),a=1/Fi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-o*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Uf,t,Ff)}lookAt(t,e,n){const r=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),qn.crossVectors(n,Ge),qn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),qn.crossVectors(n,Ge)),qn.normalize(),ns.crossVectors(Ge,qn),r[0]=qn.x,r[4]=ns.x,r[8]=Ge.x,r[1]=qn.y,r[5]=ns.y,r[9]=Ge.y,r[2]=qn.z,r[6]=ns.z,r[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],v=n[7],M=n[11],R=n[15],T=r[0],w=r[4],P=r[8],x=r[12],E=r[1],A=r[5],L=r[9],N=r[13],F=r[2],V=r[6],B=r[10],q=r[14],k=r[3],$=r[7],it=r[11],ot=r[15];return s[0]=a*T+o*E+c*F+l*k,s[4]=a*w+o*A+c*V+l*$,s[8]=a*P+o*L+c*B+l*it,s[12]=a*x+o*N+c*q+l*ot,s[1]=h*T+u*E+d*F+f*k,s[5]=h*w+u*A+d*V+f*$,s[9]=h*P+u*L+d*B+f*it,s[13]=h*x+u*N+d*q+f*ot,s[2]=g*T+_*E+m*F+p*k,s[6]=g*w+_*A+m*V+p*$,s[10]=g*P+_*L+m*B+p*it,s[14]=g*x+_*N+m*q+p*ot,s[3]=y*T+v*E+M*F+R*k,s[7]=y*w+v*A+M*V+R*$,s[11]=y*P+v*L+M*B+R*it,s[15]=y*x+v*N+M*q+R*ot,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*c*u-r*l*u-s*o*d+n*l*d+r*o*f-n*c*f)+_*(+e*c*f-e*l*d+s*a*d-r*a*f+r*l*h-s*c*h)+m*(+e*l*u-e*o*f-s*a*u+n*a*f+s*o*h-n*l*h)+p*(-r*o*h-e*c*u+e*o*d+r*a*u-n*a*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,v=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,M=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,R=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,T=e*y+n*v+r*M+s*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return t[0]=y*w,t[1]=(_*d*s-u*m*s-_*r*f+n*m*f+u*r*p-n*d*p)*w,t[2]=(o*m*s-_*c*s+_*r*l-n*m*l-o*r*p+n*c*p)*w,t[3]=(u*c*s-o*d*s-u*r*l+n*d*l+o*r*f-n*c*f)*w,t[4]=v*w,t[5]=(h*m*s-g*d*s+g*r*f-e*m*f-h*r*p+e*d*p)*w,t[6]=(g*c*s-a*m*s-g*r*l+e*m*l+a*r*p-e*c*p)*w,t[7]=(a*d*s-h*c*s+h*r*l-e*d*l-a*r*f+e*c*f)*w,t[8]=M*w,t[9]=(g*u*s-h*_*s-g*n*f+e*_*f+h*n*p-e*u*p)*w,t[10]=(a*_*s-g*o*s+g*n*l-e*_*l-a*n*p+e*o*p)*w,t[11]=(h*o*s-a*u*s-h*n*l+e*u*l+a*n*f-e*o*f)*w,t[12]=R*w,t[13]=(h*_*r-g*u*r+g*n*d-e*_*d-h*n*m+e*u*m)*w,t[14]=(g*o*r-a*_*r-g*n*c+e*_*c+a*n*m-e*o*m)*w,t[15]=(a*u*r-h*o*r+h*n*c-e*u*c-a*n*d+e*o*d)*w,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,h=a+a,u=o+o,d=s*l,f=s*h,g=s*u,_=a*h,m=a*u,p=o*u,y=c*l,v=c*h,M=c*u,R=n.x,T=n.y,w=n.z;return r[0]=(1-(_+p))*R,r[1]=(f+M)*R,r[2]=(g-v)*R,r[3]=0,r[4]=(f-M)*T,r[5]=(1-(d+p))*T,r[6]=(m+y)*T,r[7]=0,r[8]=(g+v)*w,r[9]=(m-y)*w,r[10]=(1-(d+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=Fi.set(r[0],r[1],r[2]).length();const a=Fi.set(r[4],r[5],r[6]).length(),o=Fi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],rn.copy(this);const l=1/s,h=1/a,u=1/o;return rn.elements[0]*=l,rn.elements[1]*=l,rn.elements[2]*=l,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=u,rn.elements[9]*=u,rn.elements[10]*=u,e.setFromRotationMatrix(rn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=An,c=!1){const l=this.elements,h=2*s/(e-t),u=2*s/(n-r),d=(e+t)/(e-t),f=(n+r)/(n-r);let g,_;if(c)g=s/(a-s),_=a*s/(a-s);else if(o===An)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Os)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=An,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-r),d=-(e+t)/(e-t),f=-(n+r)/(n-r);let g,_;if(c)g=1/(a-s),_=a/(a-s);else if(o===An)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===Os)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Fi=new I,rn=new Dt,Uf=new I(0,0,0),Ff=new I(1,1,1),qn=new I,ns=new I,Ge=new I,xl=new Dt,yl=new fn;class _n{constructor(t=0,e=0,n=0,r=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yl.setFromEuler(this),this.setFromQuaternion(yl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class yc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Of=0;const Sl=new I,Oi=new fn,Ln=new Dt,is=new I,_r=new I,zf=new I,kf=new fn,El=new I(1,0,0),bl=new I(0,1,0),Tl=new I(0,0,1),wl={type:"added"},Bf={type:"removed"},zi={type:"childadded",child:null},La={type:"childremoved",child:null};class ve extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=cr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new I,e=new _n,n=new fn,r=new I(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Dt},normalMatrix:{value:new Vt}}),this.matrix=new Dt,this.matrixWorld=new Dt,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.premultiply(Oi),this}rotateX(t){return this.rotateOnAxis(El,t)}rotateY(t){return this.rotateOnAxis(bl,t)}rotateZ(t){return this.rotateOnAxis(Tl,t)}translateOnAxis(t,e){return Sl.copy(t).applyQuaternion(this.quaternion),this.position.add(Sl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(El,t)}translateY(t){return this.translateOnAxis(bl,t)}translateZ(t){return this.translateOnAxis(Tl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?is.copy(t):is.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),_r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(_r,is,this.up):Ln.lookAt(is,_r,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),Oi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wl),zi.child=t,this.dispatchEvent(zi),zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bf),La.child=t,this.dispatchEvent(La),La.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wl),zi.child=t,this.dispatchEvent(zi),zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,t,zf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,kf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}ve.DEFAULT_UP=new I(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new I,Nn=new I,Na=new I,Un=new I,ki=new I,Bi=new I,Al=new I,Ua=new I,Fa=new I,Oa=new I,za=new ue,ka=new ue,Ba=new ue;class un{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),sn.subVectors(t,e),r.cross(sn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){sn.subVectors(r,e),Nn.subVectors(n,e),Na.subVectors(t,e);const a=sn.dot(sn),o=sn.dot(Nn),c=sn.dot(Na),l=Nn.dot(Nn),h=Nn.dot(Na),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return s.set(1-f-g,g,f)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,r,s,a,o,c){return this.getBarycoord(t,e,n,r,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Un.x),c.addScaledVector(a,Un.y),c.addScaledVector(o,Un.z),c)}static getInterpolatedAttribute(t,e,n,r,s,a){return za.setScalar(0),ka.setScalar(0),Ba.setScalar(0),za.fromBufferAttribute(t,e),ka.fromBufferAttribute(t,n),Ba.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(za,s.x),a.addScaledVector(ka,s.y),a.addScaledVector(Ba,s.z),a}static isFrontFacing(t,e,n,r){return sn.subVectors(n,e),Nn.subVectors(t,e),sn.cross(Nn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return sn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),sn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return un.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;ki.subVectors(r,n),Bi.subVectors(s,n),Ua.subVectors(t,n);const c=ki.dot(Ua),l=Bi.dot(Ua);if(c<=0&&l<=0)return e.copy(n);Fa.subVectors(t,r);const h=ki.dot(Fa),u=Bi.dot(Fa);if(h>=0&&u<=h)return e.copy(r);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(ki,a);Oa.subVectors(t,s);const f=ki.dot(Oa),g=Bi.dot(Oa);if(g>=0&&f<=g)return e.copy(s);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Bi,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Al.subVectors(s,r),o=(u-h)/(u-h+(f-g)),e.copy(r).addScaledVector(Al,o);const p=1/(m+_+d);return a=_*p,o=d*p,e.copy(n).addScaledVector(ki,a).addScaledVector(Bi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ru={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},rs={h:0,s:0,l:0};function Ha(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ut{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=Jt.workingColorSpace){if(t=vc(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Ha(a,s,t+1/3),this.g=Ha(a,s,t),this.b=Ha(a,s,t-1/3)}return Jt.colorSpaceToWorking(this,r),this}setStyle(t,e=Oe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const n=ru[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return Jt.workingToColorSpace(Re.copy(this),t),Math.round(Yt(Re.r*255,0,255))*65536+Math.round(Yt(Re.g*255,0,255))*256+Math.round(Yt(Re.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(Re.copy(this),e);const n=Re.r,r=Re.g,s=Re.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-n)/u+2;break;case s:c=(n-r)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=Oe){Jt.workingToColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,r=Re.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Xn),this.setHSL(Xn.h+t,Xn.s+e,Xn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xn),t.getHSL(rs);const n=Ir(Xn.h,rs.h,e),r=Ir(Xn.s,rs.s,e),s=Ir(Xn.l,rs.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new Ut;Ut.NAMES=ru;let Hf=0;class lr extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=cr(),this.name="",this.type="Material",this.blending=Ji,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=co,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oo&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class On extends lr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=Wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new I,ss=new Zt;let Vf=0;class pn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fl,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ss.fromBufferAttribute(this,e),ss.applyMatrix3(t),this.setXY(e,ss.x,ss.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Yi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Yi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Yi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Yi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),r=Ne(r,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fl&&(t.usage=this.usage),t}}class su extends pn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class au extends pn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class mn extends pn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Gf=0;const Ke=new Dt,Va=new ve,Hi=new I,We=new ii,vr=new ii,be=new I;class Ye extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=cr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nu(t)?au:su)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Vt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return Va.lookAt(t),Va.updateMatrix(),this.applyMatrix4(Va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new mn(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];We.setFromBufferAttribute(s),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];vr.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(We.min,vr.min),We.expandByPoint(be),be.addVectors(We.max,vr.max),We.expandByPoint(be)):(We.expandByPoint(vr.min),We.expandByPoint(vr.max))}We.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)be.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(be));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)be.fromBufferAttribute(o,l),c&&(Hi.fromBufferAttribute(t,l),be.add(Hi)),r=Math.max(r,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<n.count;P++)o[P]=new I,c[P]=new I;const l=new I,h=new I,u=new I,d=new Zt,f=new Zt,g=new Zt,_=new I,m=new I;function p(P,x,E){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,x),u.fromBufferAttribute(n,E),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,x),g.fromBufferAttribute(s,E),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),o[P].add(_),o[x].add(_),o[E].add(_),c[P].add(m),c[x].add(m),c[E].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let P=0,x=y.length;P<x;++P){const E=y[P],A=E.start,L=E.count;for(let N=A,F=A+L;N<F;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const v=new I,M=new I,R=new I,T=new I;function w(P){R.fromBufferAttribute(r,P),T.copy(R);const x=o[P];v.copy(x),v.sub(R.multiplyScalar(R.dot(x))).normalize(),M.crossVectors(T,x);const A=M.dot(c[P])<0?-1:1;a.setXYZW(P,v.x,v.y,v.z,A)}for(let P=0,x=y.length;P<x;++P){const E=y[P],A=E.start,L=E.count;for(let N=A,F=A+L;N<F;N+=3)w(t.getX(N+0)),w(t.getX(N+1)),w(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new I,s=new I,a=new I,o=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new pn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ye,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=t(c,n);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(r[c]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rl=new Dt,ci=new xc,as=new Ai,Cl=new I,os=new I,cs=new I,ls=new I,Ga=new I,hs=new I,Pl=new I,us=new I;class Ie extends ve{constructor(t=new Ye,e=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){hs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],u=s[c];h!==0&&(Ga.fromBufferAttribute(u,t),a?hs.addScaledVector(Ga,h):hs.addScaledVector(Ga.sub(e),h))}e.add(hs)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),as.copy(n.boundingSphere),as.applyMatrix4(s),ci.copy(t.ray).recast(t.near),!(as.containsPoint(ci.origin)===!1&&(ci.intersectSphere(as,Cl)===null||ci.origin.distanceToSquared(Cl)>(t.far-t.near)**2))&&(Rl.copy(s).invert(),ci.copy(t.ray).applyMatrix4(Rl),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ci)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,R=v;M<R;M+=3){const T=o.getX(M),w=o.getX(M+1),P=o.getX(M+2);r=ds(this,p,t,n,l,h,u,T,w,P),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=o.getX(m),v=o.getX(m+1),M=o.getX(m+2);r=ds(this,a,t,n,l,h,u,y,v,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,R=v;M<R;M+=3){const T=M,w=M+1,P=M+2;r=ds(this,p,t,n,l,h,u,T,w,P),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=m,v=m+1,M=m+2;r=ds(this,a,t,n,l,h,u,y,v,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Wf(i,t,e,n,r,s,a,o){let c;if(t.side===Be?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,t.side===ni,o),c===null)return null;us.copy(o),us.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(us);return l<e.near||l>e.far?null:{distance:l,point:us.clone(),object:i}}function ds(i,t,e,n,r,s,a,o,c,l){i.getVertexPosition(o,os),i.getVertexPosition(c,cs),i.getVertexPosition(l,ls);const h=Wf(i,t,e,n,os,cs,ls,Pl);if(h){const u=new I;un.getBarycoord(Pl,os,cs,ls,u),r&&(h.uv=un.getInterpolatedAttribute(r,o,c,l,u,new Zt)),s&&(h.uv1=un.getInterpolatedAttribute(s,o,c,l,u,new Zt)),a&&(h.normal=un.getInterpolatedAttribute(a,o,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new I,materialIndex:0};un.getNormal(os,cs,ls,d.normal),h.face=d,h.barycoord=u}return h}class Ri extends Ye{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new mn(l,3)),this.setAttribute("normal",new mn(h,3)),this.setAttribute("uv",new mn(u,2));function g(_,m,p,y,v,M,R,T,w,P,x){const E=M/w,A=R/P,L=M/2,N=R/2,F=T/2,V=w+1,B=P+1;let q=0,k=0;const $=new I;for(let it=0;it<B;it++){const ot=it*A-N;for(let dt=0;dt<V;dt++){const Xt=dt*E-L;$[_]=Xt*y,$[m]=ot*v,$[p]=F,l.push($.x,$.y,$.z),$[_]=0,$[m]=0,$[p]=T>0?1:-1,h.push($.x,$.y,$.z),u.push(dt/w),u.push(1-it/P),q+=1}}for(let it=0;it<P;it++)for(let ot=0;ot<w;ot++){const dt=d+ot+V*it,Xt=d+ot+V*(it+1),zt=d+(ot+1)+V*(it+1),Pt=d+(ot+1)+V*it;c.push(dt,Xt,Pt),c.push(Xt,zt,Pt),k+=6}o.addGroup(f,k,x),f+=k,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ri(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ar(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Ue(i){const t={};for(let e=0;e<i.length;e++){const n=ar(i[e]);for(const r in n)t[r]=n[r]}return t}function qf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ou(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Xf={clone:ar,merge:Ue};var Yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends lr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yf,this.fragmentShader=jf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ar(t.uniforms),this.uniformsGroups=qf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class cu extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Dt,this.projectionMatrix=new Dt,this.projectionMatrixInverse=new Dt,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new I,Il=new Zt,Dl=new Zt;class ln extends cu{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Br*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Br*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,Il,Dl),e.subVectors(Dl,Il)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Vi=-90,Gi=1;class Zf extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ln(Vi,Gi,t,e);r.layers=this.layers,this.add(r);const s=new ln(Vi,Gi,t,e);s.layers=this.layers,this.add(s);const a=new ln(Vi,Gi,t,e);a.layers=this.layers,this.add(a);const o=new ln(Vi,Gi,t,e);o.layers=this.layers,this.add(o);const c=new ln(Vi,Gi,t,e);c.layers=this.layers,this.add(c);const l=new ln(Vi,Gi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Os)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class lu extends De{constructor(t=[],e=ir,n,r,s,a,o,c,l,h){super(t,e,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Kf extends Cn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new lu(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ri(5,5,5),s=new Bn({name:"CubemapFromEquirect",uniforms:ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:zn});s.uniforms.tEquirect.value=e;const a=new Ie(r,s),o=e.minFilter;return e.minFilter===yi&&(e.minFilter=wn),new Zf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}class $n extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $f={type:"move"};class Wa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($f)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new $n;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Jf extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Qf extends De{constructor(t=null,e=1,n=1,r,s,a,o,c,l=Te,h=Te,u,d){super(null,a,o,c,l,h,r,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ll extends pn{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Wi=new Dt,Nl=new Dt,fs=[],Ul=new ii,tp=new Dt,Mr=new Ie,xr=new Ai;class jn extends Ie{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ll(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,tp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ii),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Wi),Ul.copy(t.boundingBox).applyMatrix4(Wi),this.boundingBox.union(Ul)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ai),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Wi),xr.copy(t.boundingSphere).applyMatrix4(Wi),this.boundingSphere.union(xr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(Mr.geometry=this.geometry,Mr.material=this.material,Mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xr.copy(this.boundingSphere),xr.applyMatrix4(n),t.ray.intersectsSphere(xr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Wi),Nl.multiplyMatrices(n,Wi),Mr.matrixWorld=Nl,Mr.raycast(t,fs);for(let a=0,o=fs.length;a<o;a++){const c=fs[a];c.instanceId=s,c.object=this,e.push(c)}fs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ll(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qf(new Float32Array(r*this.count),r,this.count,pc,dn));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*t;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const qa=new I,ep=new I,np=new Vt;class gi{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=qa.subVectors(n,e).cross(ep.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(qa),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||np.getNormalMatrix(t),r=this.coplanarPoint(qa).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new Ai,ip=new Zt(.5,.5),ps=new I;class Sc{constructor(t=new gi,e=new gi,n=new gi,r=new gi,s=new gi,a=new gi){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An,n=!1){const r=this.planes,s=t.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],_=s[9],m=s[10],p=s[11],y=s[12],v=s[13],M=s[14],R=s[15];if(r[0].setComponents(l-a,f-h,p-g,R-y).normalize(),r[1].setComponents(l+a,f+h,p+g,R+y).normalize(),r[2].setComponents(l+o,f+u,p+_,R+v).normalize(),r[3].setComponents(l-o,f-u,p-_,R-v).normalize(),n)r[4].setComponents(c,d,m,M).normalize(),r[5].setComponents(l-c,f-d,p-m,R-M).normalize();else if(r[4].setComponents(l-c,f-d,p-m,R-M).normalize(),e===An)r[5].setComponents(l+c,f+d,p+m,R+M).normalize();else if(e===Os)r[5].setComponents(c,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){li.center.set(0,0,0);const e=ip.distanceTo(t.center);return li.radius=.7071067811865476+e,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(ps.x=r.normal.x>0?t.max.x:t.min.x,ps.y=r.normal.y>0?t.max.y:t.min.y,ps.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ps)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Dr extends lr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ks=new I,Bs=new I,Fl=new Dt,yr=new xc,ms=new Ai,Xa=new I,Ol=new I;class Is extends ve{constructor(t=new Ye,e=new Dr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)ks.fromBufferAttribute(e,r-1),Bs.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=ks.distanceTo(Bs);t.setAttribute("lineDistance",new mn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(r),ms.radius+=s,t.ray.intersectsSphere(ms)===!1)return;Fl.copy(r).invert(),yr.copy(t.ray).applyMatrix4(Fl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),y=h.getX(_+1),v=gs(this,t,yr,c,p,y,_);v&&e.push(v)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=gs(this,t,yr,c,_,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=gs(this,t,yr,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=gs(this,t,yr,c,g-1,f,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function gs(i,t,e,n,r,s,a){const o=i.geometry.attributes.position;if(ks.fromBufferAttribute(o,r),Bs.fromBufferAttribute(o,s),e.distanceSqToSegment(ks,Bs,Xa,Ol)>n)return;Xa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Xa);if(!(l<t.near||l>t.far))return{distance:l,point:Ol.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const zl=new I,kl=new I;class rp extends Is{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)zl.fromBufferAttribute(e,r),kl.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+zl.distanceTo(kl);t.setAttribute("lineDistance",new mn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bl extends De{constructor(t,e,n,r,s,a,o,c,l){super(t,e,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hu extends De{constructor(t,e,n=Ei,r,s,a,o=Te,c=Te,l,h=zr,u=1){if(h!==zr&&h!==kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Mc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class uu extends De{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class sp{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let r=0;const s=n.length;let a;e?a=e:a=t*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=n[r]-a,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===a)return r/(s-1);const h=n[r],d=n[r+1]-h,f=(a-h)/d;return(r+f)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),c=e||(a.isVector2?new Zt:new I);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new I,r=[],s=[],a=[],o=new I,c=new Dt;for(let f=0;f<=t;f++){const g=f/t;r[f]=this.getTangentAt(g,new I)}s[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Yt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(e===!0){let f=Math.acos(Yt(s[0].dot(s[t]),-1,1));f/=t,r[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ds extends sp{constructor(t=0,e=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new Zt){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Si extends Ye{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,u=t/o,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const y=p*d-a;for(let v=0;v<l;v++){const M=v*u-s;g.push(M,-y,0),_.push(0,0,1),m.push(v/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const v=y+l*p,M=y+l*(p+1),R=y+1+l*(p+1),T=y+1+l*p;f.push(v,M,T),f.push(M,R,T)}this.setIndex(f),this.setAttribute("position",new mn(g,3)),this.setAttribute("normal",new mn(_,3)),this.setAttribute("uv",new mn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Si(t.width,t.height,t.widthSegments,t.heightSegments)}}class _s extends lr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tu,this.normalScale=new Zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ap extends lr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class op extends lr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class du extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class cp extends du{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ya=new Dt,Hl=new I,Vl=new I;class lp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=gn,this.map=null,this.mapPass=null,this.matrix=new Dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sc,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Hl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hl),Vl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vl),e.updateMatrixWorld(),Ya.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ya,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ya)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Lr extends cu{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class hp extends lp{constructor(){super(new Lr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gl extends du{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new hp}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class up extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class dp{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const Wl=new Dt;class fp{constructor(t,e,n=0,r=1/0){this.ray=new xc(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new yc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wl),this}intersectObject(t,e=!0,n=[]){return Zo(t,this,n,e),n.sort(ql),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)Zo(t[r],this,n,e);return n.sort(ql),n}}function ql(i,t){return i.distance-t.distance}function Zo(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Zo(s[a],t,e,!0)}}class pp extends rp{constructor(t=10,e=10,n=4473924,r=8947848){n=new Ut(n),r=new Ut(r);const s=e/2,a=t/e,o=t/2,c=[],l=[];for(let d=0,f=0,g=-o;d<=e;d++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);const _=d===s?n:r;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}const h=new Ye;h.setAttribute("position",new mn(c,3)),h.setAttribute("color",new mn(l,3));const u=new Dr({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class mp extends wi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Xl(i,t,e,n){const r=gp(n);switch(e){case $h:return i*t;case pc:return i*t/r.components*r.byteLength;case mc:return i*t/r.components*r.byteLength;case Qh:return i*t*2/r.components*r.byteLength;case gc:return i*t*2/r.components*r.byteLength;case Jh:return i*t*3/r.components*r.byteLength;case Xe:return i*t*4/r.components*r.byteLength;case _c:return i*t*4/r.components*r.byteLength;case As:case Rs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Cs:case Ps:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case So:case bo:return Math.max(i,16)*Math.max(t,8)/4;case yo:case Eo:return Math.max(i,8)*Math.max(t,8)/2;case To:case wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Co:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Po:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Io:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Do:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case No:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case zo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ko:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Vo:case Go:case Wo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case qo:case Xo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Yo:case jo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function gp(i){switch(i){case gn:case Yh:return{byteLength:1,components:1};case Fr:case jh:case Wr:return{byteLength:2,components:1};case dc:case fc:return{byteLength:2,components:4};case Ei:case uc:case dn:return{byteLength:4,components:1};case Zh:case Kh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hc);function fu(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function _p(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var vp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Tp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ip=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$p=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,em=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,am=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_m=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Em=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Am=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Im=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Nm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Um=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ym=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$m=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,tg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,eg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ng=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ig=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ag=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ug=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,bg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Tg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ig=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ug=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Xg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:vp,alphahash_pars_fragment:Mp,alphamap_fragment:xp,alphamap_pars_fragment:yp,alphatest_fragment:Sp,alphatest_pars_fragment:Ep,aomap_fragment:bp,aomap_pars_fragment:Tp,batching_pars_vertex:wp,batching_vertex:Ap,begin_vertex:Rp,beginnormal_vertex:Cp,bsdfs:Pp,iridescence_fragment:Ip,bumpmap_pars_fragment:Dp,clipping_planes_fragment:Lp,clipping_planes_pars_fragment:Np,clipping_planes_pars_vertex:Up,clipping_planes_vertex:Fp,color_fragment:Op,color_pars_fragment:zp,color_pars_vertex:kp,color_vertex:Bp,common:Hp,cube_uv_reflection_fragment:Vp,defaultnormal_vertex:Gp,displacementmap_pars_vertex:Wp,displacementmap_vertex:qp,emissivemap_fragment:Xp,emissivemap_pars_fragment:Yp,colorspace_fragment:jp,colorspace_pars_fragment:Zp,envmap_fragment:Kp,envmap_common_pars_fragment:$p,envmap_pars_fragment:Jp,envmap_pars_vertex:Qp,envmap_physical_pars_fragment:hm,envmap_vertex:tm,fog_vertex:em,fog_pars_vertex:nm,fog_fragment:im,fog_pars_fragment:rm,gradientmap_pars_fragment:sm,lightmap_pars_fragment:am,lights_lambert_fragment:om,lights_lambert_pars_fragment:cm,lights_pars_begin:lm,lights_toon_fragment:um,lights_toon_pars_fragment:dm,lights_phong_fragment:fm,lights_phong_pars_fragment:pm,lights_physical_fragment:mm,lights_physical_pars_fragment:gm,lights_fragment_begin:_m,lights_fragment_maps:vm,lights_fragment_end:Mm,logdepthbuf_fragment:xm,logdepthbuf_pars_fragment:ym,logdepthbuf_pars_vertex:Sm,logdepthbuf_vertex:Em,map_fragment:bm,map_pars_fragment:Tm,map_particle_fragment:wm,map_particle_pars_fragment:Am,metalnessmap_fragment:Rm,metalnessmap_pars_fragment:Cm,morphinstance_vertex:Pm,morphcolor_vertex:Im,morphnormal_vertex:Dm,morphtarget_pars_vertex:Lm,morphtarget_vertex:Nm,normal_fragment_begin:Um,normal_fragment_maps:Fm,normal_pars_fragment:Om,normal_pars_vertex:zm,normal_vertex:km,normalmap_pars_fragment:Bm,clearcoat_normal_fragment_begin:Hm,clearcoat_normal_fragment_maps:Vm,clearcoat_pars_fragment:Gm,iridescence_pars_fragment:Wm,opaque_fragment:qm,packing:Xm,premultiplied_alpha_fragment:Ym,project_vertex:jm,dithering_fragment:Zm,dithering_pars_fragment:Km,roughnessmap_fragment:$m,roughnessmap_pars_fragment:Jm,shadowmap_pars_fragment:Qm,shadowmap_pars_vertex:tg,shadowmap_vertex:eg,shadowmask_pars_fragment:ng,skinbase_vertex:ig,skinning_pars_vertex:rg,skinning_vertex:sg,skinnormal_vertex:ag,specularmap_fragment:og,specularmap_pars_fragment:cg,tonemapping_fragment:lg,tonemapping_pars_fragment:hg,transmission_fragment:ug,transmission_pars_fragment:dg,uv_pars_fragment:fg,uv_pars_vertex:pg,uv_vertex:mg,worldpos_vertex:gg,background_vert:_g,background_frag:vg,backgroundCube_vert:Mg,backgroundCube_frag:xg,cube_vert:yg,cube_frag:Sg,depth_vert:Eg,depth_frag:bg,distanceRGBA_vert:Tg,distanceRGBA_frag:wg,equirect_vert:Ag,equirect_frag:Rg,linedashed_vert:Cg,linedashed_frag:Pg,meshbasic_vert:Ig,meshbasic_frag:Dg,meshlambert_vert:Lg,meshlambert_frag:Ng,meshmatcap_vert:Ug,meshmatcap_frag:Fg,meshnormal_vert:Og,meshnormal_frag:zg,meshphong_vert:kg,meshphong_frag:Bg,meshphysical_vert:Hg,meshphysical_frag:Vg,meshtoon_vert:Gg,meshtoon_frag:Wg,points_vert:qg,points_frag:Xg,shadow_vert:Yg,shadow_frag:jg,sprite_vert:Zg,sprite_frag:Kg},at={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},Sn={basic:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Ue([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Ue([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Ue([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Ue([at.points,at.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Ue([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Ue([at.common,at.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Ue([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Ue([at.sprite,at.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Ue([at.common,at.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Ue([at.lights,at.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Sn.physical={uniforms:Ue([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const vs={r:0,b:0,g:0},hi=new _n,$g=new Dt;function Jg(i,t,e,n,r,s,a){const o=new Ut(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M}function _(v){let M=!1;const R=g(v);R===null?p(o,c):R&&R.isColor&&(p(R,1),M=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,M){const R=g(M);R&&(R.isCubeTexture||R.mapping===Ys)?(h===void 0&&(h=new Ie(new Ri(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:ar(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),hi.copy(M.backgroundRotation),hi.x*=-1,hi.y*=-1,hi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($g.makeRotationFromEuler(hi)),h.material.toneMapped=Jt.getTransfer(R.colorSpace)!==ie,(u!==R||d!==R.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new Ie(new Si(2,2),new Bn({name:"BackgroundMaterial",uniforms:ar(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(R.colorSpace)!==ie,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,M){v.getRGB(vs,ou(i)),n.buffers.color.setClear(vs.r,vs.g,vs.b,M,a)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(o,c)},render:_,addToRenderList:m,dispose:y}}function Qg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(E,A,L,N,F){let V=!1;const B=u(N,L,A);s!==B&&(s=B,l(s.object)),V=f(E,N,L,F),V&&g(E,N,L,F),F!==null&&t.update(F,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,M(E,A,L,N),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function c(){return i.createVertexArray()}function l(E){return i.bindVertexArray(E)}function h(E){return i.deleteVertexArray(E)}function u(E,A,L){const N=L.wireframe===!0;let F=n[E.id];F===void 0&&(F={},n[E.id]=F);let V=F[A.id];V===void 0&&(V={},F[A.id]=V);let B=V[N];return B===void 0&&(B=d(c()),V[N]=B),B}function d(E){const A=[],L=[],N=[];for(let F=0;F<e;F++)A[F]=0,L[F]=0,N[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:L,attributeDivisors:N,object:E,attributes:{},index:null}}function f(E,A,L,N){const F=s.attributes,V=A.attributes;let B=0;const q=L.getAttributes();for(const k in q)if(q[k].location>=0){const it=F[k];let ot=V[k];if(ot===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(ot=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(ot=E.instanceColor)),it===void 0||it.attribute!==ot||ot&&it.data!==ot.data)return!0;B++}return s.attributesNum!==B||s.index!==N}function g(E,A,L,N){const F={},V=A.attributes;let B=0;const q=L.getAttributes();for(const k in q)if(q[k].location>=0){let it=V[k];it===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(it=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(it=E.instanceColor));const ot={};ot.attribute=it,it&&it.data&&(ot.data=it.data),F[k]=ot,B++}s.attributes=F,s.attributesNum=B,s.index=N}function _(){const E=s.newAttributes;for(let A=0,L=E.length;A<L;A++)E[A]=0}function m(E){p(E,0)}function p(E,A){const L=s.newAttributes,N=s.enabledAttributes,F=s.attributeDivisors;L[E]=1,N[E]===0&&(i.enableVertexAttribArray(E),N[E]=1),F[E]!==A&&(i.vertexAttribDivisor(E,A),F[E]=A)}function y(){const E=s.newAttributes,A=s.enabledAttributes;for(let L=0,N=A.length;L<N;L++)A[L]!==E[L]&&(i.disableVertexAttribArray(L),A[L]=0)}function v(E,A,L,N,F,V,B){B===!0?i.vertexAttribIPointer(E,A,L,F,V):i.vertexAttribPointer(E,A,L,N,F,V)}function M(E,A,L,N){_();const F=N.attributes,V=L.getAttributes(),B=A.defaultAttributeValues;for(const q in V){const k=V[q];if(k.location>=0){let $=F[q];if($===void 0&&(q==="instanceMatrix"&&E.instanceMatrix&&($=E.instanceMatrix),q==="instanceColor"&&E.instanceColor&&($=E.instanceColor)),$!==void 0){const it=$.normalized,ot=$.itemSize,dt=t.get($);if(dt===void 0)continue;const Xt=dt.buffer,zt=dt.type,Pt=dt.bytesPerElement,X=zt===i.INT||zt===i.UNSIGNED_INT||$.gpuType===uc;if($.isInterleavedBufferAttribute){const Z=$.data,ct=Z.stride,Tt=$.offset;if(Z.isInstancedInterleavedBuffer){for(let mt=0;mt<k.locationSize;mt++)p(k.location+mt,Z.meshPerAttribute);E.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let mt=0;mt<k.locationSize;mt++)m(k.location+mt);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let mt=0;mt<k.locationSize;mt++)v(k.location+mt,ot/k.locationSize,zt,it,ct*Pt,(Tt+ot/k.locationSize*mt)*Pt,X)}else{if($.isInstancedBufferAttribute){for(let Z=0;Z<k.locationSize;Z++)p(k.location+Z,$.meshPerAttribute);E.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Z=0;Z<k.locationSize;Z++)m(k.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let Z=0;Z<k.locationSize;Z++)v(k.location+Z,ot/k.locationSize,zt,it,ot*Pt,ot/k.locationSize*Z*Pt,X)}}else if(B!==void 0){const it=B[q];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(k.location,it);break;case 3:i.vertexAttrib3fv(k.location,it);break;case 4:i.vertexAttrib4fv(k.location,it);break;default:i.vertexAttrib1fv(k.location,it)}}}}y()}function R(){P();for(const E in n){const A=n[E];for(const L in A){const N=A[L];for(const F in N)h(N[F].object),delete N[F];delete A[L]}delete n[E]}}function T(E){if(n[E.id]===void 0)return;const A=n[E.id];for(const L in A){const N=A[L];for(const F in N)h(N[F].object),delete N[F];delete A[L]}delete n[E.id]}function w(E){for(const A in n){const L=n[A];if(L[E.id]===void 0)continue;const N=L[E.id];for(const F in N)h(N[F].object),delete N[F];delete L[E.id]}}function P(){x(),a=!0,s!==r&&(s=r,l(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:x,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function t_(i,t,e){let n;function r(l){n=l}function s(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function e_(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==Xe&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const P=w===Wr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==gn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==dn&&!P)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:M,vertexTextures:R,maxSamples:T}}function n_(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new gi,o=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{const y=s?0:n,v=y*4;let M=p.clippingState||null;c.value=M,M=h(g,d,v,f);for(let R=0;R!==v;++R)M[R]=e[R];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,M=f;v!==_;++v,M+=4)a.copy(u[v]).applyMatrix4(y,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function i_(i){let t=new WeakMap;function e(a,o){return o===_o?a.mapping=ir:o===vo&&(a.mapping=rr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===_o||o===vo)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Kf(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",r),e(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const Zi=4,Yl=[.125,.215,.35,.446,.526,.582],Mi=20,ja=new Lr,jl=new Ut;let Za=null,Ka=0,$a=0,Ja=!1;const _i=(1+Math.sqrt(5))/2,qi=1/_i,Zl=[new I(-_i,qi,0),new I(_i,qi,0),new I(-qi,0,_i),new I(qi,0,_i),new I(0,_i,-qi),new I(0,_i,qi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],r_=new I;class Kl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100,s={}){const{size:a=256,position:o=r_}=s;Za=this._renderer.getRenderTarget(),Ka=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ql(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Za,Ka,$a),this._renderer.xr.enabled=Ja,t.scissorTest=!1,Ms(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ir||t.mapping===rr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Za=this._renderer.getRenderTarget(),Ka=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Wr,format:Xe,colorSpace:sr,depthBuffer:!1},r=$l(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$l(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=s_(s)),this._blurMaterial=a_(s,t,e)}return r}_compileMaterial(t){const e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,ja)}_sceneToCubeUV(t,e,n,r,s){const c=new ln(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(jl),u.toneMapping=ti,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null));const _=new On({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),m=new Ie(new Ri,_);let p=!1;const y=t.background;y?y.isColor&&(_.color.copy(y),t.background=null,p=!0):(_.color.copy(jl),p=!0);for(let v=0;v<6;v++){const M=v%3;M===0?(c.up.set(0,l[v],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[v],s.y,s.z)):M===1?(c.up.set(0,0,l[v]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[v],s.z)):(c.up.set(0,l[v],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[v]));const R=this._cubeSize;Ms(r,M*R,v>2?R:0,R,R),u.setRenderTarget(r),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===ir||t.mapping===rr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ql()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ie(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;Ms(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ja)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Zl[(r-s-1)%Zl.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ie(this._lodPlanes[r],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Mi-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Mi;m>Mi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Mi}`);const p=[];let y=0;for(let w=0;w<Mi;++w){const P=w/_,x=Math.exp(-P*P/2);p.push(x),w===0?y+=x:w<m&&(y+=2*x)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const M=this._sizeLods[r],R=3*M*(r>v-Zi?r-v+Zi:0),T=4*(this._cubeSize-M);Ms(e,R,T,3*M,2*M),c.setRenderTarget(e),c.render(u,ja)}}function s_(i){const t=[],e=[],n=[];let r=i;const s=i-Zi+1+Yl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>i-Zi?c=Yl[a-i+Zi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*f),v=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let T=0;T<f;T++){const w=T%3*2/3-1,P=T>2?0:-1,x=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];y.set(x,_*g*T),v.set(d,m*g*T);const E=[T,T,T,T,T,T];M.set(E,p*g*T)}const R=new Ye;R.setAttribute("position",new pn(y,_)),R.setAttribute("uv",new pn(v,m)),R.setAttribute("faceIndex",new pn(M,p)),t.push(R),r>Zi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $l(i,t,e){const n=new Cn(i,t,e);return n.texture.mapping=Ys,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ms(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function a_(i,t,e){const n=new Float32Array(Mi),r=new I(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Jl(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ql(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ec(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function o_(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===_o||c===vo,h=c===ir||c===rr;if(l||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Kl(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&r(f)?(e===null&&(e=new Kl(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function c_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&Hr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function l_(i,t,e,n){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let v=0,M=y.length;v<M;v+=3){const R=y[v+0],T=y[v+1],w=y[v+2];d.push(R,T,T,w,w,R)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,M=y.length/3-1;v<M;v+=3){const R=v+0,T=v+1,w=v+2;d.push(R,T,T,w,w,R)}}else return;const m=new(nu(d)?au:su)(d,1);m.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function h_(i,t,e){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,s,d*a),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*_[y];e.update(p,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function u_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function d_(i,t,e){const n=new WeakMap,r=new ue;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let E=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",E)};var f=E;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let R=o.attributes.position.count*M,T=1;R>t.maxTextureSize&&(T=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const w=new Float32Array(R*T*4*u),P=new iu(w,R,T,u);P.type=dn,P.needsUpdate=!0;const x=M*4;for(let A=0;A<u;A++){const L=p[A],N=y[A],F=v[A],V=R*T*4*A;for(let B=0;B<L.count;B++){const q=B*x;g===!0&&(r.fromBufferAttribute(L,B),w[V+q+0]=r.x,w[V+q+1]=r.y,w[V+q+2]=r.z,w[V+q+3]=0),_===!0&&(r.fromBufferAttribute(N,B),w[V+q+4]=r.x,w[V+q+5]=r.y,w[V+q+6]=r.z,w[V+q+7]=0),m===!0&&(r.fromBufferAttribute(F,B),w[V+q+8]=r.x,w[V+q+9]=r.y,w[V+q+10]=r.z,w[V+q+11]=F.itemSize===4?r.w:1)}}d={count:u,texture:P,size:new Zt(R,T)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function f_(i,t,e,n){let r=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(r.get(u)!==l&&(t.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return u}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}const pu=new De,th=new hu(1,1),mu=new iu,gu=new Lf,_u=new lu,eh=[],nh=[],ih=new Float32Array(16),rh=new Float32Array(9),sh=new Float32Array(4);function hr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=eh[r];if(s===void 0&&(s=new Float32Array(r),eh[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Se(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function js(i,t){let e=nh[t];e===void 0&&(e=new Int32Array(t),nh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function p_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function m_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2fv(this.addr,t),Se(e,t)}}function g_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;i.uniform3fv(this.addr,t),Se(e,t)}}function __(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4fv(this.addr,t),Se(e,t)}}function v_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;sh.set(n),i.uniformMatrix2fv(this.addr,!1,sh),Se(e,n)}}function M_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;rh.set(n),i.uniformMatrix3fv(this.addr,!1,rh),Se(e,n)}}function x_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;ih.set(n),i.uniformMatrix4fv(this.addr,!1,ih),Se(e,n)}}function y_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function S_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2iv(this.addr,t),Se(e,t)}}function E_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3iv(this.addr,t),Se(e,t)}}function b_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4iv(this.addr,t),Se(e,t)}}function T_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function w_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2uiv(this.addr,t),Se(e,t)}}function A_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3uiv(this.addr,t),Se(e,t)}}function R_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4uiv(this.addr,t),Se(e,t)}}function C_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(th.compareFunction=eu,s=th):s=pu,e.setTexture2D(t||s,r)}function P_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||gu,r)}function I_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||_u,r)}function D_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||mu,r)}function L_(i){switch(i){case 5126:return p_;case 35664:return m_;case 35665:return g_;case 35666:return __;case 35674:return v_;case 35675:return M_;case 35676:return x_;case 5124:case 35670:return y_;case 35667:case 35671:return S_;case 35668:case 35672:return E_;case 35669:case 35673:return b_;case 5125:return T_;case 36294:return w_;case 36295:return A_;case 36296:return R_;case 35678:case 36198:case 36298:case 36306:case 35682:return C_;case 35679:case 36299:case 36307:return P_;case 35680:case 36300:case 36308:case 36293:return I_;case 36289:case 36303:case 36311:case 36292:return D_}}function N_(i,t){i.uniform1fv(this.addr,t)}function U_(i,t){const e=hr(t,this.size,2);i.uniform2fv(this.addr,e)}function F_(i,t){const e=hr(t,this.size,3);i.uniform3fv(this.addr,e)}function O_(i,t){const e=hr(t,this.size,4);i.uniform4fv(this.addr,e)}function z_(i,t){const e=hr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function k_(i,t){const e=hr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function B_(i,t){const e=hr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function H_(i,t){i.uniform1iv(this.addr,t)}function V_(i,t){i.uniform2iv(this.addr,t)}function G_(i,t){i.uniform3iv(this.addr,t)}function W_(i,t){i.uniform4iv(this.addr,t)}function q_(i,t){i.uniform1uiv(this.addr,t)}function X_(i,t){i.uniform2uiv(this.addr,t)}function Y_(i,t){i.uniform3uiv(this.addr,t)}function j_(i,t){i.uniform4uiv(this.addr,t)}function Z_(i,t,e){const n=this.cache,r=t.length,s=js(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||pu,s[a])}function K_(i,t,e){const n=this.cache,r=t.length,s=js(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||gu,s[a])}function $_(i,t,e){const n=this.cache,r=t.length,s=js(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||_u,s[a])}function J_(i,t,e){const n=this.cache,r=t.length,s=js(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||mu,s[a])}function Q_(i){switch(i){case 5126:return N_;case 35664:return U_;case 35665:return F_;case 35666:return O_;case 35674:return z_;case 35675:return k_;case 35676:return B_;case 5124:case 35670:return H_;case 35667:case 35671:return V_;case 35668:case 35672:return G_;case 35669:case 35673:return W_;case 5125:return q_;case 36294:return X_;case 36295:return Y_;case 36296:return j_;case 35678:case 36198:case 36298:case 36306:case 35682:return Z_;case 35679:case 36299:case 36307:return K_;case 35680:case 36300:case 36308:case 36293:return $_;case 36289:case 36303:case 36311:case 36292:return J_}}class t0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=L_(e.type)}}class e0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Q_(e.type)}}class n0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const Qa=/(\w+)(\])?(\[|\.)?/g;function ah(i,t){i.seq.push(t),i.map[t.id]=t}function i0(i,t,e){const n=i.name,r=n.length;for(Qa.lastIndex=0;;){const s=Qa.exec(n),a=Qa.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){ah(e,l===void 0?new t0(o,i,t):new e0(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new n0(o),ah(e,u)),e=u}}}class Ls{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);i0(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function oh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const r0=37297;let s0=0;function a0(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ch=new Vt;function o0(i){Jt._getMatrix(ch,Jt.workingColorSpace,i);const t=`mat3( ${ch.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case Fs:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function lh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+a0(i.getShaderSource(t),o)}else return s}function c0(i,t){const e=o0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function l0(i,t){let e;switch(t){case qd:e="Linear";break;case Xd:e="Reinhard";break;case Yd:e="Cineon";break;case qh:e="ACESFilmic";break;case Zd:e="AgX";break;case Kd:e="Neutral";break;case jd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const xs=new I;function h0(){Jt.getLuminanceCoefficients(xs);const i=xs.x.toFixed(4),t=xs.y.toFixed(4),e=xs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function u0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ar).join(`
`)}function d0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function f0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ar(i){return i!==""}function hh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function uh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const p0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(i){return i.replace(p0,g0)}const m0=new Map;function g0(i,t){let e=Wt[t];if(e===void 0){const n=m0.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ko(e)}const _0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dh(i){return i.replace(_0,v0)}function v0(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function M0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Gh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===bd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Fn&&(t="SHADOWMAP_TYPE_VSM"),t}function x0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ir:case rr:t="ENVMAP_TYPE_CUBE";break;case Ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function y0(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===rr&&(t="ENVMAP_MODE_REFRACTION"),t}function S0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wh:t="ENVMAP_BLENDING_MULTIPLY";break;case Gd:t="ENVMAP_BLENDING_MIX";break;case Wd:t="ENVMAP_BLENDING_ADD";break}return t}function E0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function b0(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=M0(e),l=x0(e),h=y0(e),u=S0(e),d=E0(e),f=u0(e),g=d0(s),_=r.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ar).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ar).join(`
`),p.length>0&&(p+=`
`)):(m=[fh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ar).join(`
`),p=[fh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ti?"#define TONE_MAPPING":"",e.toneMapping!==ti?Wt.tonemapping_pars_fragment:"",e.toneMapping!==ti?l0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,c0("linearToOutputTexel",e.outputColorSpace),h0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ar).join(`
`)),a=Ko(a),a=hh(a,e),a=uh(a,e),o=Ko(o),o=hh(o,e),o=uh(o,e),a=dh(a),o=dh(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===pl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===pl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+a,M=y+p+o,R=oh(r,r.VERTEX_SHADER,v),T=oh(r,r.FRAGMENT_SHADER,M);r.attachShader(_,R),r.attachShader(_,T),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(A){if(i.debug.checkShaderErrors){const L=r.getProgramInfoLog(_)||"",N=r.getShaderInfoLog(R)||"",F=r.getShaderInfoLog(T)||"",V=L.trim(),B=N.trim(),q=F.trim();let k=!0,$=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,R,T);else{const it=lh(r,R,"vertex"),ot=lh(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+V+`
`+it+`
`+ot)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||q==="")&&($=!1);$&&(A.diagnostics={runnable:k,programLog:V,vertexShader:{log:B,prefix:m},fragmentShader:{log:q,prefix:p}})}r.deleteShader(R),r.deleteShader(T),P=new Ls(r,_),x=f0(r,_)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let x;this.getAttributes=function(){return x===void 0&&w(this),x};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(_,r0)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=s0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=T,this}let T0=0;class w0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new A0(t),e.set(t,n)),n}}class A0{constructor(t){this.id=T0++,this.code=t,this.usedTimes=0}}function R0(i,t,e,n,r,s,a){const o=new yc,c=new w0,l=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,E,A,L,N){const F=L.fog,V=N.geometry,B=x.isMeshStandardMaterial?L.environment:null,q=(x.isMeshStandardMaterial?e:t).get(x.envMap||B),k=q&&q.mapping===Ys?q.image.height:null,$=g[x.type];x.precision!==null&&(f=r.getMaxPrecision(x.precision),f!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const it=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ot=it!==void 0?it.length:0;let dt=0;V.morphAttributes.position!==void 0&&(dt=1),V.morphAttributes.normal!==void 0&&(dt=2),V.morphAttributes.color!==void 0&&(dt=3);let Xt,zt,Pt,X;if($){const Qt=Sn[$];Xt=Qt.vertexShader,zt=Qt.fragmentShader}else Xt=x.vertexShader,zt=x.fragmentShader,c.update(x),Pt=c.getVertexShaderID(x),X=c.getFragmentShaderID(x);const Z=i.getRenderTarget(),ct=i.state.buffers.depth.getReversed(),Tt=N.isInstancedMesh===!0,mt=N.isBatchedMesh===!0,Ft=!!x.map,we=!!x.matcap,D=!!q,ce=!!x.aoMap,kt=!!x.lightMap,Lt=!!x.bumpMap,vt=!!x.normalMap,le=!!x.displacementMap,Mt=!!x.emissiveMap,Gt=!!x.metalnessMap,Ee=!!x.roughnessMap,me=x.anisotropy>0,C=x.clearcoat>0,S=x.dispersion>0,H=x.iridescence>0,j=x.sheen>0,J=x.transmission>0,Y=me&&!!x.anisotropyMap,bt=C&&!!x.clearcoatMap,rt=C&&!!x.clearcoatNormalMap,xt=C&&!!x.clearcoatRoughnessMap,St=H&&!!x.iridescenceMap,et=H&&!!x.iridescenceThicknessMap,ut=j&&!!x.sheenColorMap,It=j&&!!x.sheenRoughnessMap,Et=!!x.specularMap,lt=!!x.specularColorMap,Ht=!!x.specularIntensityMap,U=J&&!!x.transmissionMap,nt=J&&!!x.thicknessMap,st=!!x.gradientMap,pt=!!x.alphaMap,Q=x.alphaTest>0,K=!!x.alphaHash,_t=!!x.extensions;let Ot=ti;x.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const se={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:Xt,fragmentShader:zt,defines:x.defines,customVertexShaderID:Pt,customFragmentShaderID:X,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:mt,batchingColor:mt&&N._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&N.instanceColor!==null,instancingMorph:Tt&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:sr,alphaToCoverage:!!x.alphaToCoverage,map:Ft,matcap:we,envMap:D,envMapMode:D&&q.mapping,envMapCubeUVHeight:k,aoMap:ce,lightMap:kt,bumpMap:Lt,normalMap:vt,displacementMap:d&&le,emissiveMap:Mt,normalMapObjectSpace:vt&&x.normalMapType===tf,normalMapTangentSpace:vt&&x.normalMapType===tu,metalnessMap:Gt,roughnessMap:Ee,anisotropy:me,anisotropyMap:Y,clearcoat:C,clearcoatMap:bt,clearcoatNormalMap:rt,clearcoatRoughnessMap:xt,dispersion:S,iridescence:H,iridescenceMap:St,iridescenceThicknessMap:et,sheen:j,sheenColorMap:ut,sheenRoughnessMap:It,specularMap:Et,specularColorMap:lt,specularIntensityMap:Ht,transmission:J,transmissionMap:U,thicknessMap:nt,gradientMap:st,opaque:x.transparent===!1&&x.blending===Ji&&x.alphaToCoverage===!1,alphaMap:pt,alphaTest:Q,alphaHash:K,combine:x.combine,mapUv:Ft&&_(x.map.channel),aoMapUv:ce&&_(x.aoMap.channel),lightMapUv:kt&&_(x.lightMap.channel),bumpMapUv:Lt&&_(x.bumpMap.channel),normalMapUv:vt&&_(x.normalMap.channel),displacementMapUv:le&&_(x.displacementMap.channel),emissiveMapUv:Mt&&_(x.emissiveMap.channel),metalnessMapUv:Gt&&_(x.metalnessMap.channel),roughnessMapUv:Ee&&_(x.roughnessMap.channel),anisotropyMapUv:Y&&_(x.anisotropyMap.channel),clearcoatMapUv:bt&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:rt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:et&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:It&&_(x.sheenRoughnessMap.channel),specularMapUv:Et&&_(x.specularMap.channel),specularColorMapUv:lt&&_(x.specularColorMap.channel),specularIntensityMapUv:Ht&&_(x.specularIntensityMap.channel),transmissionMapUv:U&&_(x.transmissionMap.channel),thicknessMapUv:nt&&_(x.thicknessMap.channel),alphaMapUv:pt&&_(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(vt||me),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!V.attributes.uv&&(Ft||pt),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ct,skinning:N.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:dt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Ft&&x.map.isVideoTexture===!0&&Jt.getTransfer(x.map.colorSpace)===ie,decodeVideoTextureEmissive:Mt&&x.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(x.emissiveMap.colorSpace)===ie,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===En,flipSided:x.side===Be,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:_t&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&x.extensions.multiDraw===!0||mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return se.vertexUv1s=l.has(1),se.vertexUv2s=l.has(2),se.vertexUv3s=l.has(3),l.clear(),se}function p(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const A in x.defines)E.push(A),E.push(x.defines[A]);return x.isRawShaderMaterial===!1&&(y(E,x),v(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function y(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function v(x,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),E.gradientMap&&o.enable(22),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),x.push(o.mask)}function M(x){const E=g[x.type];let A;if(E){const L=Sn[E];A=Xf.clone(L.uniforms)}else A=x.uniforms;return A}function R(x,E){let A;for(let L=0,N=h.length;L<N;L++){const F=h[L];if(F.cacheKey===E){A=F,++A.usedTimes;break}}return A===void 0&&(A=new b0(i,E,x,s),h.push(A)),A}function T(x){if(--x.usedTimes===0){const E=h.indexOf(x);h[E]=h[h.length-1],h.pop(),x.destroy()}}function w(x){c.remove(x)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:R,releaseProgram:T,releaseShaderCache:w,programs:h,dispose:P}}function C0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function P0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ph(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function mh(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(u,d,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):e.push(p)}function c(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||P0),n.length>1&&n.sort(d||ph),r.length>1&&r.sort(d||ph)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:h,sort:l}}function I0(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new mh,i.set(n,[a])):r>=s.length?(a=new mh,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function D0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Ut};break;case"SpotLight":e={position:new I,direction:new I,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function L0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let N0=0;function U0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function F0(i){const t=new D0,e=L0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const r=new I,s=new Dt,a=new Dt;function o(l){let h=0,u=0,d=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,y=0,v=0,M=0,R=0,T=0,w=0;l.sort(U0);for(let x=0,E=l.length;x<E;x++){const A=l[x],L=A.color,N=A.intensity,F=A.distance,V=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=L.r*N,u+=L.g*N,d+=L.b*N;else if(A.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(A.sh.coefficients[B],N);w++}else if(A.isDirectionalLight){const B=t.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const q=A.shadow,k=e.get(A);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=A.shadow.matrix,y++}n.directional[f]=B,f++}else if(A.isSpotLight){const B=t.get(A);B.position.setFromMatrixPosition(A.matrixWorld),B.color.copy(L).multiplyScalar(N),B.distance=F,B.coneCos=Math.cos(A.angle),B.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),B.decay=A.decay,n.spot[_]=B;const q=A.shadow;if(A.map&&(n.spotLightMap[R]=A.map,R++,q.updateMatrices(A),A.castShadow&&T++),n.spotLightMatrix[_]=q.matrix,A.castShadow){const k=e.get(A);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=V,M++}_++}else if(A.isRectAreaLight){const B=t.get(A);B.color.copy(L).multiplyScalar(N),B.halfWidth.set(A.width*.5,0,0),B.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=B,m++}else if(A.isPointLight){const B=t.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),B.distance=A.distance,B.decay=A.decay,A.castShadow){const q=A.shadow,k=e.get(A);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,k.shadowCameraNear=q.camera.near,k.shadowCameraFar=q.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=A.shadow.matrix,v++}n.point[g]=B,g++}else if(A.isHemisphereLight){const B=t.get(A);B.skyColor.copy(A.color).multiplyScalar(N),B.groundColor.copy(A.groundColor).multiplyScalar(N),n.hemi[p]=B,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==y||P.numPointShadows!==v||P.numSpotShadows!==M||P.numSpotMaps!==R||P.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=M+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=y,P.numPointShadows=v,P.numSpotShadows=M,P.numSpotMaps=R,P.numLightProbes=w,n.version=N0++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const v=l[p];if(v.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),u++}else if(v.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(v.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function gh(i){const t=new F0(i),e=[],n=[];function r(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function O0(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new gh(i),t.set(r,[o])):s>=a.length?(o=new gh(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const z0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,k0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function B0(i,t,e){let n=new Sc;const r=new Zt,s=new Zt,a=new ue,o=new ap({depthPacking:Qd}),c=new op,l={},h=e.maxTextureSize,u={[ni]:Be,[Be]:ni,[En]:En},d=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:z0,fragmentShader:k0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ye;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ie(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gh;let p=this.type;this.render=function(T,w,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const x=i.getRenderTarget(),E=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),L=i.state;L.setBlending(zn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const N=p!==Fn&&this.type===Fn,F=p===Fn&&this.type!==Fn;for(let V=0,B=T.length;V<B;V++){const q=T[V],k=q.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const $=k.getFrameExtents();if(r.multiply($),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/$.x),r.x=s.x*$.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/$.y),r.y=s.y*$.y,k.mapSize.y=s.y)),k.map===null||N===!0||F===!0){const ot=this.type!==Fn?{minFilter:Te,magFilter:Te}:{};k.map!==null&&k.map.dispose(),k.map=new Cn(r.x,r.y,ot),k.map.texture.name=q.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const it=k.getViewportCount();for(let ot=0;ot<it;ot++){const dt=k.getViewport(ot);a.set(s.x*dt.x,s.y*dt.y,s.x*dt.z,s.y*dt.w),L.viewport(a),k.updateMatrices(q,ot),n=k.getFrustum(),M(w,P,k.camera,q,this.type)}k.isPointLightShadow!==!0&&this.type===Fn&&y(k,P),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(x,E,A)};function y(T,w){const P=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Cn(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(w,null,P,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(w,null,P,f,_,null)}function v(T,w,P,x){let E=null;const A=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)E=A;else if(E=P.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const L=E.uuid,N=w.uuid;let F=l[L];F===void 0&&(F={},l[L]=F);let V=F[N];V===void 0&&(V=E.clone(),F[N]=V,w.addEventListener("dispose",R)),E=V}if(E.visible=w.visible,E.wireframe=w.wireframe,x===Fn?E.side=w.shadowSide!==null?w.shadowSide:w.side:E.side=w.shadowSide!==null?w.shadowSide:u[w.side],E.alphaMap=w.alphaMap,E.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,E.map=w.map,E.clipShadows=w.clipShadows,E.clippingPlanes=w.clippingPlanes,E.clipIntersection=w.clipIntersection,E.displacementMap=w.displacementMap,E.displacementScale=w.displacementScale,E.displacementBias=w.displacementBias,E.wireframeLinewidth=w.wireframeLinewidth,E.linewidth=w.linewidth,P.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const L=i.properties.get(E);L.light=P}return E}function M(T,w,P,x,E){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Fn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const N=t.update(T),F=T.material;if(Array.isArray(F)){const V=N.groups;for(let B=0,q=V.length;B<q;B++){const k=V[B],$=F[k.materialIndex];if($&&$.visible){const it=v(T,$,x,E);T.onBeforeShadow(i,T,w,P,N,it,k),i.renderBufferDirect(P,null,N,it,T,k),T.onAfterShadow(i,T,w,P,N,it,k)}}}else if(F.visible){const V=v(T,F,x,E);T.onBeforeShadow(i,T,w,P,N,V,null),i.renderBufferDirect(P,null,N,V,T,null),T.onAfterShadow(i,T,w,P,N,V,null)}}const L=T.children;for(let N=0,F=L.length;N<F;N++)M(L[N],w,P,x,E)}function R(T){T.target.removeEventListener("dispose",R);for(const P in l){const x=l[P],E=T.target.uuid;E in x&&(x[E].dispose(),delete x[E])}}}const H0={[lo]:ho,[uo]:mo,[fo]:go,[nr]:po,[ho]:lo,[mo]:uo,[go]:fo,[po]:nr};function V0(i,t){function e(){let U=!1;const nt=new ue;let st=null;const pt=new ue(0,0,0,0);return{setMask:function(Q){st!==Q&&!U&&(i.colorMask(Q,Q,Q,Q),st=Q)},setLocked:function(Q){U=Q},setClear:function(Q,K,_t,Ot,se){se===!0&&(Q*=Ot,K*=Ot,_t*=Ot),nt.set(Q,K,_t,Ot),pt.equals(nt)===!1&&(i.clearColor(Q,K,_t,Ot),pt.copy(nt))},reset:function(){U=!1,st=null,pt.set(-1,0,0,0)}}}function n(){let U=!1,nt=!1,st=null,pt=null,Q=null;return{setReversed:function(K){if(nt!==K){const _t=t.get("EXT_clip_control");K?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),nt=K;const Ot=Q;Q=null,this.setClear(Ot)}},getReversed:function(){return nt},setTest:function(K){K?Z(i.DEPTH_TEST):ct(i.DEPTH_TEST)},setMask:function(K){st!==K&&!U&&(i.depthMask(K),st=K)},setFunc:function(K){if(nt&&(K=H0[K]),pt!==K){switch(K){case lo:i.depthFunc(i.NEVER);break;case ho:i.depthFunc(i.ALWAYS);break;case uo:i.depthFunc(i.LESS);break;case nr:i.depthFunc(i.LEQUAL);break;case fo:i.depthFunc(i.EQUAL);break;case po:i.depthFunc(i.GEQUAL);break;case mo:i.depthFunc(i.GREATER);break;case go:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=K}},setLocked:function(K){U=K},setClear:function(K){Q!==K&&(nt&&(K=1-K),i.clearDepth(K),Q=K)},reset:function(){U=!1,st=null,pt=null,Q=null,nt=!1}}}function r(){let U=!1,nt=null,st=null,pt=null,Q=null,K=null,_t=null,Ot=null,se=null;return{setTest:function(Qt){U||(Qt?Z(i.STENCIL_TEST):ct(i.STENCIL_TEST))},setMask:function(Qt){nt!==Qt&&!U&&(i.stencilMask(Qt),nt=Qt)},setFunc:function(Qt,Pn,Mn){(st!==Qt||pt!==Pn||Q!==Mn)&&(i.stencilFunc(Qt,Pn,Mn),st=Qt,pt=Pn,Q=Mn)},setOp:function(Qt,Pn,Mn){(K!==Qt||_t!==Pn||Ot!==Mn)&&(i.stencilOp(Qt,Pn,Mn),K=Qt,_t=Pn,Ot=Mn)},setLocked:function(Qt){U=Qt},setClear:function(Qt){se!==Qt&&(i.clearStencil(Qt),se=Qt)},reset:function(){U=!1,nt=null,st=null,pt=null,Q=null,K=null,_t=null,Ot=null,se=null}}}const s=new e,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,M=null,R=null,T=null,w=new Ut(0,0,0),P=0,x=!1,E=null,A=null,L=null,N=null,F=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,q=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(k)[1]),B=q>=1):k.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),B=q>=2);let $=null,it={};const ot=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),Xt=new ue().fromArray(ot),zt=new ue().fromArray(dt);function Pt(U,nt,st,pt){const Q=new Uint8Array(4),K=i.createTexture();i.bindTexture(U,K),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _t=0;_t<st;_t++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(nt+_t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return K}const X={};X[i.TEXTURE_2D]=Pt(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Pt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Pt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Pt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(nr),Lt(!1),vt(cl),Z(i.CULL_FACE),ce(zn);function Z(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function ct(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Tt(U,nt){return u[U]!==nt?(i.bindFramebuffer(U,nt),u[U]=nt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=nt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function mt(U,nt){let st=f,pt=!1;if(U){st=d.get(nt),st===void 0&&(st=[],d.set(nt,st));const Q=U.textures;if(st.length!==Q.length||st[0]!==i.COLOR_ATTACHMENT0){for(let K=0,_t=Q.length;K<_t;K++)st[K]=i.COLOR_ATTACHMENT0+K;st.length=Q.length,pt=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,pt=!0);pt&&i.drawBuffers(st)}function Ft(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const we={[vi]:i.FUNC_ADD,[wd]:i.FUNC_SUBTRACT,[Ad]:i.FUNC_REVERSE_SUBTRACT};we[Rd]=i.MIN,we[Cd]=i.MAX;const D={[Pd]:i.ZERO,[Id]:i.ONE,[Dd]:i.SRC_COLOR,[oo]:i.SRC_ALPHA,[zd]:i.SRC_ALPHA_SATURATE,[Fd]:i.DST_COLOR,[Nd]:i.DST_ALPHA,[Ld]:i.ONE_MINUS_SRC_COLOR,[co]:i.ONE_MINUS_SRC_ALPHA,[Od]:i.ONE_MINUS_DST_COLOR,[Ud]:i.ONE_MINUS_DST_ALPHA,[kd]:i.CONSTANT_COLOR,[Bd]:i.ONE_MINUS_CONSTANT_COLOR,[Hd]:i.CONSTANT_ALPHA,[Vd]:i.ONE_MINUS_CONSTANT_ALPHA};function ce(U,nt,st,pt,Q,K,_t,Ot,se,Qt){if(U===zn){_===!0&&(ct(i.BLEND),_=!1);return}if(_===!1&&(Z(i.BLEND),_=!0),U!==Td){if(U!==m||Qt!==x){if((p!==vi||M!==vi)&&(i.blendEquation(i.FUNC_ADD),p=vi,M=vi),Qt)switch(U){case Ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ll:i.blendFunc(i.ONE,i.ONE);break;case hl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ul:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ll:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case hl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ul:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,v=null,R=null,T=null,w.set(0,0,0),P=0,m=U,x=Qt}return}Q=Q||nt,K=K||st,_t=_t||pt,(nt!==p||Q!==M)&&(i.blendEquationSeparate(we[nt],we[Q]),p=nt,M=Q),(st!==y||pt!==v||K!==R||_t!==T)&&(i.blendFuncSeparate(D[st],D[pt],D[K],D[_t]),y=st,v=pt,R=K,T=_t),(Ot.equals(w)===!1||se!==P)&&(i.blendColor(Ot.r,Ot.g,Ot.b,se),w.copy(Ot),P=se),m=U,x=!1}function kt(U,nt){U.side===En?ct(i.CULL_FACE):Z(i.CULL_FACE);let st=U.side===Be;nt&&(st=!st),Lt(st),U.blending===Ji&&U.transparent===!1?ce(zn):ce(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const pt=U.stencilWrite;o.setTest(pt),pt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Mt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(U){E!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),E=U)}function vt(U){U!==Sd?(Z(i.CULL_FACE),U!==A&&(U===cl?i.cullFace(i.BACK):U===Ed?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ct(i.CULL_FACE),A=U}function le(U){U!==L&&(B&&i.lineWidth(U),L=U)}function Mt(U,nt,st){U?(Z(i.POLYGON_OFFSET_FILL),(N!==nt||F!==st)&&(i.polygonOffset(nt,st),N=nt,F=st)):ct(i.POLYGON_OFFSET_FILL)}function Gt(U){U?Z(i.SCISSOR_TEST):ct(i.SCISSOR_TEST)}function Ee(U){U===void 0&&(U=i.TEXTURE0+V-1),$!==U&&(i.activeTexture(U),$=U)}function me(U,nt,st){st===void 0&&($===null?st=i.TEXTURE0+V-1:st=$);let pt=it[st];pt===void 0&&(pt={type:void 0,texture:void 0},it[st]=pt),(pt.type!==U||pt.texture!==nt)&&($!==st&&(i.activeTexture(st),$=st),i.bindTexture(U,nt||X[U]),pt.type=U,pt.texture=nt)}function C(){const U=it[$];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function rt(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ut(U){Xt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Xt.copy(U))}function It(U){zt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),zt.copy(U))}function Et(U,nt){let st=l.get(nt);st===void 0&&(st=new WeakMap,l.set(nt,st));let pt=st.get(U);pt===void 0&&(pt=i.getUniformBlockIndex(nt,U.name),st.set(U,pt))}function lt(U,nt){const pt=l.get(nt).get(U);c.get(nt)!==pt&&(i.uniformBlockBinding(nt,pt,U.__bindingPointIndex),c.set(nt,pt))}function Ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},$=null,it={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,M=null,R=null,T=null,w=new Ut(0,0,0),P=0,x=!1,E=null,A=null,L=null,N=null,F=null,Xt.set(0,0,i.canvas.width,i.canvas.height),zt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Z,disable:ct,bindFramebuffer:Tt,drawBuffers:mt,useProgram:Ft,setBlending:ce,setMaterial:kt,setFlipSided:Lt,setCullFace:vt,setLineWidth:le,setPolygonOffset:Mt,setScissorTest:Gt,activeTexture:Ee,bindTexture:me,unbindTexture:C,compressedTexImage2D:S,compressedTexImage3D:H,texImage2D:St,texImage3D:et,updateUBOMapping:Et,uniformBlockBinding:lt,texStorage2D:rt,texStorage3D:xt,texSubImage2D:j,texSubImage3D:J,compressedTexSubImage2D:Y,compressedTexSubImage3D:bt,scissor:ut,viewport:It,reset:Ht}}function G0(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Zt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,S){return f?new OffscreenCanvas(C,S):zs("canvas")}function _(C,S,H){let j=1;const J=me(C);if((J.width>H||J.height>H)&&(j=H/Math.max(J.width,J.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(j*J.width),bt=Math.floor(j*J.height);u===void 0&&(u=g(Y,bt));const rt=S?g(Y,bt):u;return rt.width=Y,rt.height=bt,rt.getContext("2d").drawImage(C,0,0,Y,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+bt+")."),rt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,S,H,j,J=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=S;if(S===i.RED&&(H===i.FLOAT&&(Y=i.R32F),H===i.HALF_FLOAT&&(Y=i.R16F),H===i.UNSIGNED_BYTE&&(Y=i.R8)),S===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.R8UI),H===i.UNSIGNED_SHORT&&(Y=i.R16UI),H===i.UNSIGNED_INT&&(Y=i.R32UI),H===i.BYTE&&(Y=i.R8I),H===i.SHORT&&(Y=i.R16I),H===i.INT&&(Y=i.R32I)),S===i.RG&&(H===i.FLOAT&&(Y=i.RG32F),H===i.HALF_FLOAT&&(Y=i.RG16F),H===i.UNSIGNED_BYTE&&(Y=i.RG8)),S===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.RG8UI),H===i.UNSIGNED_SHORT&&(Y=i.RG16UI),H===i.UNSIGNED_INT&&(Y=i.RG32UI),H===i.BYTE&&(Y=i.RG8I),H===i.SHORT&&(Y=i.RG16I),H===i.INT&&(Y=i.RG32I)),S===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),H===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),H===i.UNSIGNED_INT&&(Y=i.RGB32UI),H===i.BYTE&&(Y=i.RGB8I),H===i.SHORT&&(Y=i.RGB16I),H===i.INT&&(Y=i.RGB32I)),S===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),H===i.UNSIGNED_INT&&(Y=i.RGBA32UI),H===i.BYTE&&(Y=i.RGBA8I),H===i.SHORT&&(Y=i.RGBA16I),H===i.INT&&(Y=i.RGBA32I)),S===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),S===i.RGBA){const bt=J?Fs:Jt.getTransfer(j);H===i.FLOAT&&(Y=i.RGBA32F),H===i.HALF_FLOAT&&(Y=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Y=bt===ie?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function M(C,S){let H;return C?S===null||S===Ei||S===Or?H=i.DEPTH24_STENCIL8:S===dn?H=i.DEPTH32F_STENCIL8:S===Fr&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ei||S===Or?H=i.DEPTH_COMPONENT24:S===dn?H=i.DEPTH_COMPONENT32F:S===Fr&&(H=i.DEPTH_COMPONENT16),H}function R(C,S){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Te&&C.minFilter!==wn?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function T(C){const S=C.target;S.removeEventListener("dispose",T),P(S),S.isVideoTexture&&h.delete(S)}function w(C){const S=C.target;S.removeEventListener("dispose",w),E(S)}function P(C){const S=n.get(C);if(S.__webglInit===void 0)return;const H=C.source,j=d.get(H);if(j){const J=j[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&x(C),Object.keys(j).length===0&&d.delete(H)}n.remove(C)}function x(C){const S=n.get(C);i.deleteTexture(S.__webglTexture);const H=C.source,j=d.get(H);delete j[S.__cacheKey],a.memory.textures--}function E(C){const S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let J=0;J<S.__webglFramebuffer[j].length;J++)i.deleteFramebuffer(S.__webglFramebuffer[j][J]);else i.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)i.deleteFramebuffer(S.__webglFramebuffer[j]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const H=C.textures;for(let j=0,J=H.length;j<J;j++){const Y=n.get(H[j]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(H[j])}n.remove(C)}let A=0;function L(){A=0}function N(){const C=A;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),A+=1,C}function F(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function V(C,S){const H=n.get(C);if(C.isVideoTexture&&Gt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&H.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(H,C,S);return}}else C.isExternalTexture&&(H.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+S)}function B(C,S){const H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){X(H,C,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+S)}function q(C,S){const H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){X(H,C,S);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+S)}function k(C,S){const H=n.get(C);if(C.version>0&&H.__version!==C.version){Z(H,C,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+S)}const $={[Mo]:i.REPEAT,[xi]:i.CLAMP_TO_EDGE,[xo]:i.MIRRORED_REPEAT},it={[Te]:i.NEAREST,[$d]:i.NEAREST_MIPMAP_NEAREST,[Kr]:i.NEAREST_MIPMAP_LINEAR,[wn]:i.LINEAR,[Ea]:i.LINEAR_MIPMAP_NEAREST,[yi]:i.LINEAR_MIPMAP_LINEAR},ot={[ef]:i.NEVER,[cf]:i.ALWAYS,[nf]:i.LESS,[eu]:i.LEQUAL,[rf]:i.EQUAL,[of]:i.GEQUAL,[sf]:i.GREATER,[af]:i.NOTEQUAL};function dt(C,S){if(S.type===dn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===wn||S.magFilter===Ea||S.magFilter===Kr||S.magFilter===yi||S.minFilter===wn||S.minFilter===Ea||S.minFilter===Kr||S.minFilter===yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,$[S.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,$[S.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,$[S.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,it[S.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,it[S.minFilter]),S.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,ot[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Te||S.minFilter!==Kr&&S.minFilter!==yi||S.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Xt(C,S){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",T));const j=S.source;let J=d.get(j);J===void 0&&(J={},d.set(j,J));const Y=F(S);if(Y!==C.__cacheKey){J[Y]===void 0&&(J[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),J[Y].usedTimes++;const bt=J[C.__cacheKey];bt!==void 0&&(J[C.__cacheKey].usedTimes--,bt.usedTimes===0&&x(S)),C.__cacheKey=Y,C.__webglTexture=J[Y].texture}return H}function zt(C,S,H){return Math.floor(Math.floor(C/H)/S)}function Pt(C,S,H,j){const Y=C.updateRanges;if(Y.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,H,j,S.data);else{Y.sort((et,ut)=>et.start-ut.start);let bt=0;for(let et=1;et<Y.length;et++){const ut=Y[bt],It=Y[et],Et=ut.start+ut.count,lt=zt(It.start,S.width,4),Ht=zt(ut.start,S.width,4);It.start<=Et+1&&lt===Ht&&zt(It.start+It.count-1,S.width,4)===lt?ut.count=Math.max(ut.count,It.start+It.count-ut.start):(++bt,Y[bt]=It)}Y.length=bt+1;const rt=i.getParameter(i.UNPACK_ROW_LENGTH),xt=i.getParameter(i.UNPACK_SKIP_PIXELS),St=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let et=0,ut=Y.length;et<ut;et++){const It=Y[et],Et=Math.floor(It.start/4),lt=Math.ceil(It.count/4),Ht=Et%S.width,U=Math.floor(Et/S.width),nt=lt,st=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ht),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Ht,U,nt,st,H,j,S.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,xt),i.pixelStorei(i.UNPACK_SKIP_ROWS,St)}}function X(C,S,H){let j=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=i.TEXTURE_3D);const J=Xt(C,S),Y=S.source;e.bindTexture(j,C.__webglTexture,i.TEXTURE0+H);const bt=n.get(Y);if(Y.version!==bt.__version||J===!0){e.activeTexture(i.TEXTURE0+H);const rt=Jt.getPrimaries(Jt.workingColorSpace),xt=S.colorSpace===hn?null:Jt.getPrimaries(S.colorSpace),St=S.colorSpace===hn||rt===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let et=_(S.image,!1,r.maxTextureSize);et=Ee(S,et);const ut=s.convert(S.format,S.colorSpace),It=s.convert(S.type);let Et=v(S.internalFormat,ut,It,S.colorSpace,S.isVideoTexture);dt(j,S);let lt;const Ht=S.mipmaps,U=S.isVideoTexture!==!0,nt=bt.__version===void 0||J===!0,st=Y.dataReady,pt=R(S,et);if(S.isDepthTexture)Et=M(S.format===kr,S.type),nt&&(U?e.texStorage2D(i.TEXTURE_2D,1,Et,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Et,et.width,et.height,0,ut,It,null));else if(S.isDataTexture)if(Ht.length>0){U&&nt&&e.texStorage2D(i.TEXTURE_2D,pt,Et,Ht[0].width,Ht[0].height);for(let Q=0,K=Ht.length;Q<K;Q++)lt=Ht[Q],U?st&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,It,lt.data):e.texImage2D(i.TEXTURE_2D,Q,Et,lt.width,lt.height,0,ut,It,lt.data);S.generateMipmaps=!1}else U?(nt&&e.texStorage2D(i.TEXTURE_2D,pt,Et,et.width,et.height),st&&Pt(S,et,ut,It)):e.texImage2D(i.TEXTURE_2D,0,Et,et.width,et.height,0,ut,It,et.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){U&&nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,Et,Ht[0].width,Ht[0].height,et.depth);for(let Q=0,K=Ht.length;Q<K;Q++)if(lt=Ht[Q],S.format!==Xe)if(ut!==null)if(U){if(st)if(S.layerUpdates.size>0){const _t=Xl(lt.width,lt.height,S.format,S.type);for(const Ot of S.layerUpdates){const se=lt.data.subarray(Ot*_t/lt.data.BYTES_PER_ELEMENT,(Ot+1)*_t/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,Ot,lt.width,lt.height,1,ut,se)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,lt.width,lt.height,et.depth,ut,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,Et,lt.width,lt.height,et.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?st&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,lt.width,lt.height,et.depth,ut,It,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,Et,lt.width,lt.height,et.depth,0,ut,It,lt.data)}else{U&&nt&&e.texStorage2D(i.TEXTURE_2D,pt,Et,Ht[0].width,Ht[0].height);for(let Q=0,K=Ht.length;Q<K;Q++)lt=Ht[Q],S.format!==Xe?ut!==null?U?st&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,Et,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?st&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,It,lt.data):e.texImage2D(i.TEXTURE_2D,Q,Et,lt.width,lt.height,0,ut,It,lt.data)}else if(S.isDataArrayTexture)if(U){if(nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,Et,et.width,et.height,et.depth),st)if(S.layerUpdates.size>0){const Q=Xl(et.width,et.height,S.format,S.type);for(const K of S.layerUpdates){const _t=et.data.subarray(K*Q/et.data.BYTES_PER_ELEMENT,(K+1)*Q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,ut,It,_t)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ut,It,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,et.width,et.height,et.depth,0,ut,It,et.data);else if(S.isData3DTexture)U?(nt&&e.texStorage3D(i.TEXTURE_3D,pt,Et,et.width,et.height,et.depth),st&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ut,It,et.data)):e.texImage3D(i.TEXTURE_3D,0,Et,et.width,et.height,et.depth,0,ut,It,et.data);else if(S.isFramebufferTexture){if(nt)if(U)e.texStorage2D(i.TEXTURE_2D,pt,Et,et.width,et.height);else{let Q=et.width,K=et.height;for(let _t=0;_t<pt;_t++)e.texImage2D(i.TEXTURE_2D,_t,Et,Q,K,0,ut,It,null),Q>>=1,K>>=1}}else if(Ht.length>0){if(U&&nt){const Q=me(Ht[0]);e.texStorage2D(i.TEXTURE_2D,pt,Et,Q.width,Q.height)}for(let Q=0,K=Ht.length;Q<K;Q++)lt=Ht[Q],U?st&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,ut,It,lt):e.texImage2D(i.TEXTURE_2D,Q,Et,ut,It,lt);S.generateMipmaps=!1}else if(U){if(nt){const Q=me(et);e.texStorage2D(i.TEXTURE_2D,pt,Et,Q.width,Q.height)}st&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,It,et)}else e.texImage2D(i.TEXTURE_2D,0,Et,ut,It,et);m(S)&&p(j),bt.__version=Y.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Z(C,S,H){if(S.image.length!==6)return;const j=Xt(C,S),J=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+H);const Y=n.get(J);if(J.version!==Y.__version||j===!0){e.activeTexture(i.TEXTURE0+H);const bt=Jt.getPrimaries(Jt.workingColorSpace),rt=S.colorSpace===hn?null:Jt.getPrimaries(S.colorSpace),xt=S.colorSpace===hn||bt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const St=S.isCompressedTexture||S.image[0].isCompressedTexture,et=S.image[0]&&S.image[0].isDataTexture,ut=[];for(let K=0;K<6;K++)!St&&!et?ut[K]=_(S.image[K],!0,r.maxCubemapSize):ut[K]=et?S.image[K].image:S.image[K],ut[K]=Ee(S,ut[K]);const It=ut[0],Et=s.convert(S.format,S.colorSpace),lt=s.convert(S.type),Ht=v(S.internalFormat,Et,lt,S.colorSpace),U=S.isVideoTexture!==!0,nt=Y.__version===void 0||j===!0,st=J.dataReady;let pt=R(S,It);dt(i.TEXTURE_CUBE_MAP,S);let Q;if(St){U&&nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Ht,It.width,It.height);for(let K=0;K<6;K++){Q=ut[K].mipmaps;for(let _t=0;_t<Q.length;_t++){const Ot=Q[_t];S.format!==Xe?Et!==null?U?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,Ot.width,Ot.height,Et,Ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Ht,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,Ot.width,Ot.height,Et,lt,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Ht,Ot.width,Ot.height,0,Et,lt,Ot.data)}}}else{if(Q=S.mipmaps,U&&nt){Q.length>0&&pt++;const K=me(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Ht,K.width,K.height)}for(let K=0;K<6;K++)if(et){U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ut[K].width,ut[K].height,Et,lt,ut[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ht,ut[K].width,ut[K].height,0,Et,lt,ut[K].data);for(let _t=0;_t<Q.length;_t++){const se=Q[_t].image[K].image;U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,se.width,se.height,Et,lt,se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Ht,se.width,se.height,0,Et,lt,se.data)}}else{U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Et,lt,ut[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ht,Et,lt,ut[K]);for(let _t=0;_t<Q.length;_t++){const Ot=Q[_t];U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,Et,lt,Ot.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Ht,Et,lt,Ot.image[K])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),Y.__version=J.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function ct(C,S,H,j,J,Y){const bt=s.convert(H.format,H.colorSpace),rt=s.convert(H.type),xt=v(H.internalFormat,bt,rt,H.colorSpace),St=n.get(S),et=n.get(H);if(et.__renderTarget=S,!St.__hasExternalTextures){const ut=Math.max(1,S.width>>Y),It=Math.max(1,S.height>>Y);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,Y,xt,ut,It,S.depth,0,bt,rt,null):e.texImage2D(J,Y,xt,ut,It,0,bt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Mt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,J,et.__webglTexture,0,le(S)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,J,et.__webglTexture,Y),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(C,S,H){if(i.bindRenderbuffer(i.RENDERBUFFER,C),S.depthBuffer){const j=S.depthTexture,J=j&&j.isDepthTexture?j.type:null,Y=M(S.stencilBuffer,J),bt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=le(S);Mt(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,Y,S.width,S.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,Y,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Y,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,C)}else{const j=S.textures;for(let J=0;J<j.length;J++){const Y=j[J],bt=s.convert(Y.format,Y.colorSpace),rt=s.convert(Y.type),xt=v(Y.internalFormat,bt,rt,Y.colorSpace),St=le(S);H&&Mt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,St,xt,S.width,S.height):Mt(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,St,xt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,xt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function mt(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const J=j.__webglTexture,Y=le(S);if(S.depthTexture.format===zr)Mt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(S.depthTexture.format===kr)Mt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ft(C){const S=n.get(C),H=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const J=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",J)};j.addEventListener("dispose",J),S.__depthDisposeCallback=J}S.__boundDepthTexture=j}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const j=C.texture.mipmaps;j&&j.length>0?mt(S.__webglFramebuffer[0],C):mt(S.__webglFramebuffer,C)}else if(H){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=i.createRenderbuffer(),Tt(S.__webglDepthbuffer[j],C,!1);else{const J=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,Y)}}else{const j=C.texture.mipmaps;if(j&&j.length>0?e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Tt(S.__webglDepthbuffer,C,!1);else{const J=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,Y)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function we(C,S,H){const j=n.get(C);S!==void 0&&ct(j.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ft(C)}function D(C){const S=C.texture,H=n.get(C),j=n.get(S);C.addEventListener("dispose",w);const J=C.textures,Y=C.isWebGLCubeRenderTarget===!0,bt=J.length>1;if(bt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=S.version,a.memory.textures++),Y){H.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer[rt]=[];for(let xt=0;xt<S.mipmaps.length;xt++)H.__webglFramebuffer[rt][xt]=i.createFramebuffer()}else H.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer=[];for(let rt=0;rt<S.mipmaps.length;rt++)H.__webglFramebuffer[rt]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(bt)for(let rt=0,xt=J.length;rt<xt;rt++){const St=n.get(J[rt]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Mt(C)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let rt=0;rt<J.length;rt++){const xt=J[rt];H.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[rt]);const St=s.convert(xt.format,xt.colorSpace),et=s.convert(xt.type),ut=v(xt.internalFormat,St,et,xt.colorSpace,C.isXRRenderTarget===!0),It=le(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,It,ut,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,H.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Tt(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),dt(i.TEXTURE_CUBE_MAP,S);for(let rt=0;rt<6;rt++)if(S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)ct(H.__webglFramebuffer[rt][xt],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt);else ct(H.__webglFramebuffer[rt],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let rt=0,xt=J.length;rt<xt;rt++){const St=J[rt],et=n.get(St);let ut=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ut=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,et.__webglTexture),dt(ut,St),ct(H.__webglFramebuffer,C,St,i.COLOR_ATTACHMENT0+rt,ut,0),m(St)&&p(ut)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(rt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,j.__webglTexture),dt(rt,S),S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)ct(H.__webglFramebuffer[xt],C,S,i.COLOR_ATTACHMENT0,rt,xt);else ct(H.__webglFramebuffer,C,S,i.COLOR_ATTACHMENT0,rt,0);m(S)&&p(rt),e.unbindTexture()}C.depthBuffer&&Ft(C)}function ce(C){const S=C.textures;for(let H=0,j=S.length;H<j;H++){const J=S[H];if(m(J)){const Y=y(C),bt=n.get(J).__webglTexture;e.bindTexture(Y,bt),p(Y),e.unbindTexture()}}}const kt=[],Lt=[];function vt(C){if(C.samples>0){if(Mt(C)===!1){const S=C.textures,H=C.width,j=C.height;let J=i.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(C),rt=S.length>1;if(rt)for(let St=0;St<S.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);const xt=C.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let St=0;St<S.length;St++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);const et=n.get(S[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,et,0)}i.blitFramebuffer(0,0,H,j,0,0,H,j,J,i.NEAREST),c===!0&&(kt.length=0,Lt.length=0,kt.push(i.COLOR_ATTACHMENT0+St),C.depthBuffer&&C.resolveDepthBuffer===!1&&(kt.push(Y),Lt.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Lt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,kt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let St=0;St<S.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);const et=n.get(S[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const S=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function le(C){return Math.min(r.maxSamples,C.samples)}function Mt(C){const S=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Gt(C){const S=a.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function Ee(C,S){const H=C.colorSpace,j=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==sr&&H!==hn&&(Jt.getTransfer(H)===ie?(j!==Xe||J!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),S}function me(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=L,this.setTexture2D=V,this.setTexture2DArray=B,this.setTexture3D=q,this.setTextureCube=k,this.rebindTextures=we,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=Mt}function W0(i,t){function e(n,r=hn){let s;const a=Jt.getTransfer(r);if(n===gn)return i.UNSIGNED_BYTE;if(n===dc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yh)return i.BYTE;if(n===jh)return i.SHORT;if(n===Fr)return i.UNSIGNED_SHORT;if(n===uc)return i.INT;if(n===Ei)return i.UNSIGNED_INT;if(n===dn)return i.FLOAT;if(n===Wr)return i.HALF_FLOAT;if(n===$h)return i.ALPHA;if(n===Jh)return i.RGB;if(n===Xe)return i.RGBA;if(n===zr)return i.DEPTH_COMPONENT;if(n===kr)return i.DEPTH_STENCIL;if(n===pc)return i.RED;if(n===mc)return i.RED_INTEGER;if(n===Qh)return i.RG;if(n===gc)return i.RG_INTEGER;if(n===_c)return i.RGBA_INTEGER;if(n===As||n===Rs||n===Cs||n===Ps)if(a===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===As)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===As)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ps)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===yo||n===So||n===Eo||n===bo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===yo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===So)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Eo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===bo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===To||n===wo||n===Ao)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===To||n===wo)return a===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ao)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ro||n===Co||n===Po||n===Io||n===Do||n===Lo||n===No||n===Uo||n===Fo||n===Oo||n===zo||n===ko||n===Bo||n===Ho)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ro)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Co)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Po)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Io)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Do)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lo)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===No)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uo)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fo)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Oo)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zo)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ko)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bo)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ho)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===Go||n===Wo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Vo)return a===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Go)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qo||n===Xo||n===Yo||n===jo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===qo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Xo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Or?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const q0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Y0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new uu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Bn({vertexShader:q0,fragmentShader:X0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new Si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class j0 extends wi{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Y0,p={},y=e.getContextAttributes();let v=null,M=null;const R=[],T=[],w=new Zt;let P=null;const x=new ln;x.viewport=new ue;const E=new ln;E.viewport=new ue;const A=[x,E],L=new up;let N=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=R[X];return Z===void 0&&(Z=new Wa,R[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=R[X];return Z===void 0&&(Z=new Wa,R[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=R[X];return Z===void 0&&(Z=new Wa,R[X]=Z),Z.getHandSpace()};function V(X){const Z=T.indexOf(X.inputSource);if(Z===-1)return;const ct=R[Z];ct!==void 0&&(ct.update(X.inputSource,X.frame,l||a),ct.dispatchEvent({type:X.type,data:X.inputSource}))}function B(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",q);for(let X=0;X<R.length;X++){const Z=T[X];Z!==null&&(T[X]=null,R[X].disconnect(Z))}N=null,F=null,m.reset();for(const X in p)delete p[X];t.setRenderTarget(v),f=null,d=null,u=null,r=null,M=null,Pt.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(r,e)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(v=t.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",B),r.addEventListener("inputsourceschange",q),y.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,Tt=null,mt=null;y.depth&&(mt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=y.stencil?kr:zr,Tt=y.stencil?Or:Ei);const Ft={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ft),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Cn(d.textureWidth,d.textureHeight,{format:Xe,type:gn,depthTexture:new hu(d.textureWidth,d.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ct={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,ct),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Cn(f.framebufferWidth,f.framebufferHeight,{format:Xe,type:gn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Pt.setContext(r),Pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(X){for(let Z=0;Z<X.removed.length;Z++){const ct=X.removed[Z],Tt=T.indexOf(ct);Tt>=0&&(T[Tt]=null,R[Tt].disconnect(ct))}for(let Z=0;Z<X.added.length;Z++){const ct=X.added[Z];let Tt=T.indexOf(ct);if(Tt===-1){for(let Ft=0;Ft<R.length;Ft++)if(Ft>=T.length){T.push(ct),Tt=Ft;break}else if(T[Ft]===null){T[Ft]=ct,Tt=Ft;break}if(Tt===-1)break}const mt=R[Tt];mt&&mt.connect(ct)}}const k=new I,$=new I;function it(X,Z,ct){k.setFromMatrixPosition(Z.matrixWorld),$.setFromMatrixPosition(ct.matrixWorld);const Tt=k.distanceTo($),mt=Z.projectionMatrix.elements,Ft=ct.projectionMatrix.elements,we=mt[14]/(mt[10]-1),D=mt[14]/(mt[10]+1),ce=(mt[9]+1)/mt[5],kt=(mt[9]-1)/mt[5],Lt=(mt[8]-1)/mt[0],vt=(Ft[8]+1)/Ft[0],le=we*Lt,Mt=we*vt,Gt=Tt/(-Lt+vt),Ee=Gt*-Lt;if(Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ee),X.translateZ(Gt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),mt[10]===-1)X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const me=we+Gt,C=D+Gt,S=le-Ee,H=Mt+(Tt-Ee),j=ce*D/C*me,J=kt*D/C*me;X.projectionMatrix.makePerspective(S,H,j,J,me,C),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ot(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let Z=X.near,ct=X.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ct=m.depthFar)),L.near=E.near=x.near=Z,L.far=E.far=x.far=ct,(N!==L.near||F!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),N=L.near,F=L.far),L.layers.mask=X.layers.mask|6,x.layers.mask=L.layers.mask&3,E.layers.mask=L.layers.mask&5;const Tt=X.parent,mt=L.cameras;ot(L,Tt);for(let Ft=0;Ft<mt.length;Ft++)ot(mt[Ft],Tt);mt.length===2?it(L,x,E):L.projectionMatrix.copy(x.projectionMatrix),dt(X,L,Tt)};function dt(X,Z,ct){ct===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(ct.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Br*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(X){return p[X]};let Xt=null;function zt(X,Z){if(h=Z.getViewerPose(l||a),g=Z,h!==null){const ct=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Tt=!1;ct.length!==L.cameras.length&&(L.cameras.length=0,Tt=!0);for(let D=0;D<ct.length;D++){const ce=ct[D];let kt=null;if(f!==null)kt=f.getViewport(ce);else{const vt=u.getViewSubImage(d,ce);kt=vt.viewport,D===0&&(t.setRenderTargetTextures(M,vt.colorTexture,vt.depthStencilTexture),t.setRenderTarget(M))}let Lt=A[D];Lt===void 0&&(Lt=new ln,Lt.layers.enable(D),Lt.viewport=new ue,A[D]=Lt),Lt.matrix.fromArray(ce.transform.matrix),Lt.matrix.decompose(Lt.position,Lt.quaternion,Lt.scale),Lt.projectionMatrix.fromArray(ce.projectionMatrix),Lt.projectionMatrixInverse.copy(Lt.projectionMatrix).invert(),Lt.viewport.set(kt.x,kt.y,kt.width,kt.height),D===0&&(L.matrix.copy(Lt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Tt===!0&&L.cameras.push(Lt)}const mt=r.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const D=u.getDepthInformation(ct[0]);D&&D.isValid&&D.texture&&m.init(D,r.renderState)}if(mt&&mt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<ct.length;D++){const ce=ct[D].camera;if(ce){let kt=p[ce];kt||(kt=new uu,p[ce]=kt);const Lt=u.getCameraImage(ce);kt.sourceTexture=Lt}}}}for(let ct=0;ct<R.length;ct++){const Tt=T[ct],mt=R[ct];Tt!==null&&mt!==void 0&&mt.update(Tt,Z,l||a)}Xt&&Xt(X,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Pt=new fu;Pt.setAnimationLoop(zt),this.setAnimationLoop=function(X){Xt=X},this.dispose=function(){}}}const ui=new _n,Z0=new Dt;function K0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ou(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,v,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,y,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Be&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Be&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,M=y.envMapRotation;v&&(m.envMap.value=v,ui.copy(M),ui.x*=-1,ui.y*=-1,ui.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),m.envMapRotation.value.setFromMatrix4(Z0.makeRotationFromEuler(ui)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function $0(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const M=v.program;n.uniformBlockBinding(y,M)}function l(y,v){let M=r[y.id];M===void 0&&(g(y),M=h(y),r[y.id]=M,y.addEventListener("dispose",m));const R=v.program;n.updateUBOMapping(y,R);const T=t.render.frame;s[y.id]!==T&&(d(y),s[y.id]=T)}function h(y){const v=u();y.__bindingPointIndex=v;const M=i.createBuffer(),R=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,M),M}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=r[y.id],M=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,w=M.length;T<w;T++){const P=Array.isArray(M[T])?M[T]:[M[T]];for(let x=0,E=P.length;x<E;x++){const A=P[x];if(f(A,T,x,R)===!0){const L=A.__offset,N=Array.isArray(A.value)?A.value:[A.value];let F=0;for(let V=0;V<N.length;V++){const B=N[V],q=_(B);typeof B=="number"||typeof B=="boolean"?(A.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,L+F,A.__data)):B.isMatrix3?(A.__data[0]=B.elements[0],A.__data[1]=B.elements[1],A.__data[2]=B.elements[2],A.__data[3]=0,A.__data[4]=B.elements[3],A.__data[5]=B.elements[4],A.__data[6]=B.elements[5],A.__data[7]=0,A.__data[8]=B.elements[6],A.__data[9]=B.elements[7],A.__data[10]=B.elements[8],A.__data[11]=0):(B.toArray(A.__data,F),F+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,v,M,R){const T=y.value,w=v+"_"+M;if(R[w]===void 0)return typeof T=="number"||typeof T=="boolean"?R[w]=T:R[w]=T.clone(),!0;{const P=R[w];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return R[w]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function g(y){const v=y.uniforms;let M=0;const R=16;for(let w=0,P=v.length;w<P;w++){const x=Array.isArray(v[w])?v[w]:[v[w]];for(let E=0,A=x.length;E<A;E++){const L=x[E],N=Array.isArray(L.value)?L.value:[L.value];for(let F=0,V=N.length;F<V;F++){const B=N[F],q=_(B),k=M%R,$=k%q.boundary,it=k+$;M+=$,it!==0&&R-it<q.storage&&(M+=R-it),L.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=q.storage}}}const T=M%R;return T>0&&(M+=R-T),y.__size=M,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const M=a.indexOf(v.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(const y in r)i.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:c,update:l,dispose:p}}class J0{constructor(t={}){const{canvas:e=wf(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let R=!1;this._outputColorSpace=Oe;let T=0,w=0,P=null,x=-1,E=null;const A=new ue,L=new ue;let N=null;const F=new Ut(0);let V=0,B=e.width,q=e.height,k=1,$=null,it=null;const ot=new ue(0,0,B,q),dt=new ue(0,0,B,q);let Xt=!1;const zt=new Sc;let Pt=!1,X=!1;const Z=new Dt,ct=new I,Tt=new ue,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ft=!1;function we(){return P===null?k:1}let D=n;function ce(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hc}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",Q,!1),D===null){const O="webgl2";if(D=ce(O,b),D===null)throw ce(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let kt,Lt,vt,le,Mt,Gt,Ee,me,C,S,H,j,J,Y,bt,rt,xt,St,et,ut,It,Et,lt,Ht;function U(){kt=new c_(D),kt.init(),Et=new W0(D,kt),Lt=new e_(D,kt,t,Et),vt=new V0(D,kt),Lt.reversedDepthBuffer&&d&&vt.buffers.depth.setReversed(!0),le=new u_(D),Mt=new C0,Gt=new G0(D,kt,vt,Mt,Lt,Et,le),Ee=new i_(M),me=new o_(M),C=new _p(D),lt=new Qg(D,C),S=new l_(D,C,le,lt),H=new f_(D,S,C,le),et=new d_(D,Lt,Gt),rt=new n_(Mt),j=new R0(M,Ee,me,kt,Lt,lt,rt),J=new K0(M,Mt),Y=new I0,bt=new O0(kt),St=new Jg(M,Ee,me,vt,H,f,c),xt=new B0(M,H,Lt),Ht=new $0(D,le,Lt,vt),ut=new t_(D,kt,le),It=new h_(D,kt,le),le.programs=j.programs,M.capabilities=Lt,M.extensions=kt,M.properties=Mt,M.renderLists=Y,M.shadowMap=xt,M.state=vt,M.info=le}U();const nt=new j0(M,D);this.xr=nt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=kt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=kt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(b){b!==void 0&&(k=b,this.setSize(B,q,!1))},this.getSize=function(b){return b.set(B,q)},this.setSize=function(b,O,G=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=b,q=O,e.width=Math.floor(b*k),e.height=Math.floor(O*k),G===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(B*k,q*k).floor()},this.setDrawingBufferSize=function(b,O,G){B=b,q=O,k=G,e.width=Math.floor(b*G),e.height=Math.floor(O*G),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(A)},this.getViewport=function(b){return b.copy(ot)},this.setViewport=function(b,O,G,W){b.isVector4?ot.set(b.x,b.y,b.z,b.w):ot.set(b,O,G,W),vt.viewport(A.copy(ot).multiplyScalar(k).round())},this.getScissor=function(b){return b.copy(dt)},this.setScissor=function(b,O,G,W){b.isVector4?dt.set(b.x,b.y,b.z,b.w):dt.set(b,O,G,W),vt.scissor(L.copy(dt).multiplyScalar(k).round())},this.getScissorTest=function(){return Xt},this.setScissorTest=function(b){vt.setScissorTest(Xt=b)},this.setOpaqueSort=function(b){$=b},this.setTransparentSort=function(b){it=b},this.getClearColor=function(b){return b.copy(St.getClearColor())},this.setClearColor=function(){St.setClearColor(...arguments)},this.getClearAlpha=function(){return St.getClearAlpha()},this.setClearAlpha=function(){St.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,G=!0){let W=0;if(b){let z=!1;if(P!==null){const tt=P.texture.format;z=tt===_c||tt===gc||tt===mc}if(z){const tt=P.texture.type,ht=tt===gn||tt===Ei||tt===Fr||tt===Or||tt===dc||tt===fc,gt=St.getClearColor(),ft=St.getClearAlpha(),Ct=gt.r,Nt=gt.g,At=gt.b;ht?(g[0]=Ct,g[1]=Nt,g[2]=At,g[3]=ft,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Ct,_[1]=Nt,_[2]=At,_[3]=ft,D.clearBufferiv(D.COLOR,0,_))}else W|=D.COLOR_BUFFER_BIT}O&&(W|=D.DEPTH_BUFFER_BIT),G&&(W|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",Q,!1),St.dispose(),Y.dispose(),bt.dispose(),Mt.dispose(),Ee.dispose(),me.dispose(),H.dispose(),lt.dispose(),Ht.dispose(),j.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",Mn),nt.removeEventListener("sessionend",Rc),ri.stop()};function st(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const b=le.autoReset,O=xt.enabled,G=xt.autoUpdate,W=xt.needsUpdate,z=xt.type;U(),le.autoReset=b,xt.enabled=O,xt.autoUpdate=G,xt.needsUpdate=W,xt.type=z}function Q(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function K(b){const O=b.target;O.removeEventListener("dispose",K),_t(O)}function _t(b){Ot(b),Mt.remove(b)}function Ot(b){const O=Mt.get(b).programs;O!==void 0&&(O.forEach(function(G){j.releaseProgram(G)}),b.isShaderMaterial&&j.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,G,W,z,tt){O===null&&(O=mt);const ht=z.isMesh&&z.matrixWorld.determinant()<0,gt=Vu(b,O,G,W,z);vt.setMaterial(W,ht);let ft=G.index,Ct=1;if(W.wireframe===!0){if(ft=S.getWireframeAttribute(G),ft===void 0)return;Ct=2}const Nt=G.drawRange,At=G.attributes.position;let jt=Nt.start*Ct,ne=(Nt.start+Nt.count)*Ct;tt!==null&&(jt=Math.max(jt,tt.start*Ct),ne=Math.min(ne,(tt.start+tt.count)*Ct)),ft!==null?(jt=Math.max(jt,0),ne=Math.min(ne,ft.count)):At!=null&&(jt=Math.max(jt,0),ne=Math.min(ne,At.count));const pe=ne-jt;if(pe<0||pe===1/0)return;lt.setup(z,W,gt,G,ft);let oe,re=ut;if(ft!==null&&(oe=C.get(ft),re=It,re.setIndex(oe)),z.isMesh)W.wireframe===!0?(vt.setLineWidth(W.wireframeLinewidth*we()),re.setMode(D.LINES)):re.setMode(D.TRIANGLES);else if(z.isLine){let Rt=W.linewidth;Rt===void 0&&(Rt=1),vt.setLineWidth(Rt*we()),z.isLineSegments?re.setMode(D.LINES):z.isLineLoop?re.setMode(D.LINE_LOOP):re.setMode(D.LINE_STRIP)}else z.isPoints?re.setMode(D.POINTS):z.isSprite&&re.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Hr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))re.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Rt=z._multiDrawStarts,de=z._multiDrawCounts,$t=z._multiDrawCount,He=ft?C.get(ft).bytesPerElement:1,Ci=Mt.get(W).currentProgram.getUniforms();for(let Ve=0;Ve<$t;Ve++)Ci.setValue(D,"_gl_DrawID",Ve),re.render(Rt[Ve]/He,de[Ve])}else if(z.isInstancedMesh)re.renderInstances(jt,pe,z.count);else if(G.isInstancedBufferGeometry){const Rt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,de=Math.min(G.instanceCount,Rt);re.renderInstances(jt,pe,de)}else re.render(jt,pe)};function se(b,O,G){b.transparent===!0&&b.side===En&&b.forceSinglePass===!1?(b.side=Be,b.needsUpdate=!0,jr(b,O,G),b.side=ni,b.needsUpdate=!0,jr(b,O,G),b.side=En):jr(b,O,G)}this.compile=function(b,O,G=null){G===null&&(G=b),p=bt.get(G),p.init(O),v.push(p),G.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),b!==G&&b.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const W=new Set;return b.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const tt=z.material;if(tt)if(Array.isArray(tt))for(let ht=0;ht<tt.length;ht++){const gt=tt[ht];se(gt,G,z),W.add(gt)}else se(tt,G,z),W.add(tt)}),p=v.pop(),W},this.compileAsync=function(b,O,G=null){const W=this.compile(b,O,G);return new Promise(z=>{function tt(){if(W.forEach(function(ht){Mt.get(ht).currentProgram.isReady()&&W.delete(ht)}),W.size===0){z(b);return}setTimeout(tt,10)}kt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let Qt=null;function Pn(b){Qt&&Qt(b)}function Mn(){ri.stop()}function Rc(){ri.start()}const ri=new fu;ri.setAnimationLoop(Pn),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(b){Qt=b,nt.setAnimationLoop(b),b===null?ri.stop():ri.start()},nt.addEventListener("sessionstart",Mn),nt.addEventListener("sessionend",Rc),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(O),O=nt.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,O,P),p=bt.get(b,v.length),p.init(O),v.push(p),Z.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),zt.setFromProjectionMatrix(Z,An,O.reversedDepth),X=this.localClippingEnabled,Pt=rt.init(this.clippingPlanes,X),m=Y.get(b,y.length),m.init(),y.push(m),nt.enabled===!0&&nt.isPresenting===!0){const tt=M.xr.getDepthSensingMesh();tt!==null&&Js(tt,O,-1/0,M.sortObjects)}Js(b,O,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort($,it),Ft=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Ft&&St.addToRenderList(m,b),this.info.render.frame++,Pt===!0&&rt.beginShadows();const G=p.state.shadowsArray;xt.render(G,b,O),Pt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,z=m.transmissive;if(p.setupLights(),O.isArrayCamera){const tt=O.cameras;if(z.length>0)for(let ht=0,gt=tt.length;ht<gt;ht++){const ft=tt[ht];Pc(W,z,b,ft)}Ft&&St.render(b);for(let ht=0,gt=tt.length;ht<gt;ht++){const ft=tt[ht];Cc(m,b,ft,ft.viewport)}}else z.length>0&&Pc(W,z,b,O),Ft&&St.render(b),Cc(m,b,O);P!==null&&w===0&&(Gt.updateMultisampleRenderTarget(P),Gt.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(M,b,O),lt.resetDefaultState(),x=-1,E=null,v.pop(),v.length>0?(p=v[v.length-1],Pt===!0&&rt.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Js(b,O,G,W){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||zt.intersectsSprite(b)){W&&Tt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Z);const ht=H.update(b),gt=b.material;gt.visible&&m.push(b,ht,gt,G,Tt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||zt.intersectsObject(b))){const ht=H.update(b),gt=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Tt.copy(b.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Tt.copy(ht.boundingSphere.center)),Tt.applyMatrix4(b.matrixWorld).applyMatrix4(Z)),Array.isArray(gt)){const ft=ht.groups;for(let Ct=0,Nt=ft.length;Ct<Nt;Ct++){const At=ft[Ct],jt=gt[At.materialIndex];jt&&jt.visible&&m.push(b,ht,jt,G,Tt.z,At)}}else gt.visible&&m.push(b,ht,gt,G,Tt.z,null)}}const tt=b.children;for(let ht=0,gt=tt.length;ht<gt;ht++)Js(tt[ht],O,G,W)}function Cc(b,O,G,W){const z=b.opaque,tt=b.transmissive,ht=b.transparent;p.setupLightsView(G),Pt===!0&&rt.setGlobalState(M.clippingPlanes,G),W&&vt.viewport(A.copy(W)),z.length>0&&Yr(z,O,G),tt.length>0&&Yr(tt,O,G),ht.length>0&&Yr(ht,O,G),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function Pc(b,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Cn(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Wr:gn,minFilter:yi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const tt=p.state.transmissionRenderTarget[W.id],ht=W.viewport||A;tt.setSize(ht.z*M.transmissionResolutionScale,ht.w*M.transmissionResolutionScale);const gt=M.getRenderTarget(),ft=M.getActiveCubeFace(),Ct=M.getActiveMipmapLevel();M.setRenderTarget(tt),M.getClearColor(F),V=M.getClearAlpha(),V<1&&M.setClearColor(16777215,.5),M.clear(),Ft&&St.render(G);const Nt=M.toneMapping;M.toneMapping=ti;const At=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Pt===!0&&rt.setGlobalState(M.clippingPlanes,W),Yr(b,G,W),Gt.updateMultisampleRenderTarget(tt),Gt.updateRenderTargetMipmap(tt),kt.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let ne=0,pe=O.length;ne<pe;ne++){const oe=O[ne],re=oe.object,Rt=oe.geometry,de=oe.material,$t=oe.group;if(de.side===En&&re.layers.test(W.layers)){const He=de.side;de.side=Be,de.needsUpdate=!0,Ic(re,G,W,Rt,de,$t),de.side=He,de.needsUpdate=!0,jt=!0}}jt===!0&&(Gt.updateMultisampleRenderTarget(tt),Gt.updateRenderTargetMipmap(tt))}M.setRenderTarget(gt,ft,Ct),M.setClearColor(F,V),At!==void 0&&(W.viewport=At),M.toneMapping=Nt}function Yr(b,O,G){const W=O.isScene===!0?O.overrideMaterial:null;for(let z=0,tt=b.length;z<tt;z++){const ht=b[z],gt=ht.object,ft=ht.geometry,Ct=ht.group;let Nt=ht.material;Nt.allowOverride===!0&&W!==null&&(Nt=W),gt.layers.test(G.layers)&&Ic(gt,O,G,ft,Nt,Ct)}}function Ic(b,O,G,W,z,tt){b.onBeforeRender(M,O,G,W,z,tt),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),z.onBeforeRender(M,O,G,W,b,tt),z.transparent===!0&&z.side===En&&z.forceSinglePass===!1?(z.side=Be,z.needsUpdate=!0,M.renderBufferDirect(G,O,W,z,b,tt),z.side=ni,z.needsUpdate=!0,M.renderBufferDirect(G,O,W,z,b,tt),z.side=En):M.renderBufferDirect(G,O,W,z,b,tt),b.onAfterRender(M,O,G,W,z,tt)}function jr(b,O,G){O.isScene!==!0&&(O=mt);const W=Mt.get(b),z=p.state.lights,tt=p.state.shadowsArray,ht=z.state.version,gt=j.getParameters(b,z.state,tt,O,G),ft=j.getProgramCacheKey(gt);let Ct=W.programs;W.environment=b.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(b.isMeshStandardMaterial?me:Ee).get(b.envMap||W.environment),W.envMapRotation=W.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Ct===void 0&&(b.addEventListener("dispose",K),Ct=new Map,W.programs=Ct);let Nt=Ct.get(ft);if(Nt!==void 0){if(W.currentProgram===Nt&&W.lightsStateVersion===ht)return Lc(b,gt),Nt}else gt.uniforms=j.getUniforms(b),b.onBeforeCompile(gt,M),Nt=j.acquireProgram(gt,ft),Ct.set(ft,Nt),W.uniforms=gt.uniforms;const At=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(At.clippingPlanes=rt.uniform),Lc(b,gt),W.needsLights=Wu(b),W.lightsStateVersion=ht,W.needsLights&&(At.ambientLightColor.value=z.state.ambient,At.lightProbe.value=z.state.probe,At.directionalLights.value=z.state.directional,At.directionalLightShadows.value=z.state.directionalShadow,At.spotLights.value=z.state.spot,At.spotLightShadows.value=z.state.spotShadow,At.rectAreaLights.value=z.state.rectArea,At.ltc_1.value=z.state.rectAreaLTC1,At.ltc_2.value=z.state.rectAreaLTC2,At.pointLights.value=z.state.point,At.pointLightShadows.value=z.state.pointShadow,At.hemisphereLights.value=z.state.hemi,At.directionalShadowMap.value=z.state.directionalShadowMap,At.directionalShadowMatrix.value=z.state.directionalShadowMatrix,At.spotShadowMap.value=z.state.spotShadowMap,At.spotLightMatrix.value=z.state.spotLightMatrix,At.spotLightMap.value=z.state.spotLightMap,At.pointShadowMap.value=z.state.pointShadowMap,At.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Nt,W.uniformsList=null,Nt}function Dc(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Ls.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function Lc(b,O){const G=Mt.get(b);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function Vu(b,O,G,W,z){O.isScene!==!0&&(O=mt),Gt.resetTextureUnits();const tt=O.fog,ht=W.isMeshStandardMaterial?O.environment:null,gt=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:sr,ft=(W.isMeshStandardMaterial?me:Ee).get(W.envMap||ht),Ct=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Nt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),At=!!G.morphAttributes.position,jt=!!G.morphAttributes.normal,ne=!!G.morphAttributes.color;let pe=ti;W.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(pe=M.toneMapping);const oe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,re=oe!==void 0?oe.length:0,Rt=Mt.get(W),de=p.state.lights;if(Pt===!0&&(X===!0||b!==E)){const Le=b===E&&W.id===x;rt.setState(W,b,Le)}let $t=!1;W.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==de.state.version||Rt.outputColorSpace!==gt||z.isBatchedMesh&&Rt.batching===!1||!z.isBatchedMesh&&Rt.batching===!0||z.isBatchedMesh&&Rt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Rt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Rt.instancing===!1||!z.isInstancedMesh&&Rt.instancing===!0||z.isSkinnedMesh&&Rt.skinning===!1||!z.isSkinnedMesh&&Rt.skinning===!0||z.isInstancedMesh&&Rt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Rt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Rt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Rt.instancingMorph===!1&&z.morphTexture!==null||Rt.envMap!==ft||W.fog===!0&&Rt.fog!==tt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==rt.numPlanes||Rt.numIntersection!==rt.numIntersection)||Rt.vertexAlphas!==Ct||Rt.vertexTangents!==Nt||Rt.morphTargets!==At||Rt.morphNormals!==jt||Rt.morphColors!==ne||Rt.toneMapping!==pe||Rt.morphTargetsCount!==re)&&($t=!0):($t=!0,Rt.__version=W.version);let He=Rt.currentProgram;$t===!0&&(He=jr(W,O,z));let Ci=!1,Ve=!1,fr=!1;const fe=He.getUniforms(),je=Rt.uniforms;if(vt.useProgram(He.program)&&(Ci=!0,Ve=!0,fr=!0),W.id!==x&&(x=W.id,Ve=!0),Ci||E!==b){vt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),fe.setValue(D,"projectionMatrix",b.projectionMatrix),fe.setValue(D,"viewMatrix",b.matrixWorldInverse);const Fe=fe.map.cameraPosition;Fe!==void 0&&Fe.setValue(D,ct.setFromMatrixPosition(b.matrixWorld)),Lt.logarithmicDepthBuffer&&fe.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&fe.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,Ve=!0,fr=!0)}if(z.isSkinnedMesh){fe.setOptional(D,z,"bindMatrix"),fe.setOptional(D,z,"bindMatrixInverse");const Le=z.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),fe.setValue(D,"boneTexture",Le.boneTexture,Gt))}z.isBatchedMesh&&(fe.setOptional(D,z,"batchingTexture"),fe.setValue(D,"batchingTexture",z._matricesTexture,Gt),fe.setOptional(D,z,"batchingIdTexture"),fe.setValue(D,"batchingIdTexture",z._indirectTexture,Gt),fe.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&fe.setValue(D,"batchingColorTexture",z._colorsTexture,Gt));const Ze=G.morphAttributes;if((Ze.position!==void 0||Ze.normal!==void 0||Ze.color!==void 0)&&et.update(z,G,He),(Ve||Rt.receiveShadow!==z.receiveShadow)&&(Rt.receiveShadow=z.receiveShadow,fe.setValue(D,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(je.envMap.value=ft,je.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(je.envMapIntensity.value=O.environmentIntensity),Ve&&(fe.setValue(D,"toneMappingExposure",M.toneMappingExposure),Rt.needsLights&&Gu(je,fr),tt&&W.fog===!0&&J.refreshFogUniforms(je,tt),J.refreshMaterialUniforms(je,W,k,q,p.state.transmissionRenderTarget[b.id]),Ls.upload(D,Dc(Rt),je,Gt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ls.upload(D,Dc(Rt),je,Gt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&fe.setValue(D,"center",z.center),fe.setValue(D,"modelViewMatrix",z.modelViewMatrix),fe.setValue(D,"normalMatrix",z.normalMatrix),fe.setValue(D,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Le=W.uniformsGroups;for(let Fe=0,Qs=Le.length;Fe<Qs;Fe++){const si=Le[Fe];Ht.update(si,He),Ht.bind(si,He)}}return He}function Gu(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Wu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,O,G){const W=Mt.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Mt.get(b.texture).__webglTexture=O,Mt.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const G=Mt.get(b);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};const qu=D.createFramebuffer();this.setRenderTarget=function(b,O=0,G=0){P=b,T=O,w=G;let W=!0,z=null,tt=!1,ht=!1;if(b){const ft=Mt.get(b);if(ft.__useDefaultFramebuffer!==void 0)vt.bindFramebuffer(D.FRAMEBUFFER,null),W=!1;else if(ft.__webglFramebuffer===void 0)Gt.setupRenderTarget(b);else if(ft.__hasExternalTextures)Gt.rebindTextures(b,Mt.get(b.texture).__webglTexture,Mt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const At=b.depthTexture;if(ft.__boundDepthTexture!==At){if(At!==null&&Mt.has(At)&&(b.width!==At.image.width||b.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Gt.setupDepthRenderbuffer(b)}}const Ct=b.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Nt=Mt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Nt[O])?z=Nt[O][G]:z=Nt[O],tt=!0):b.samples>0&&Gt.useMultisampledRTT(b)===!1?z=Mt.get(b).__webglMultisampledFramebuffer:Array.isArray(Nt)?z=Nt[G]:z=Nt,A.copy(b.viewport),L.copy(b.scissor),N=b.scissorTest}else A.copy(ot).multiplyScalar(k).floor(),L.copy(dt).multiplyScalar(k).floor(),N=Xt;if(G!==0&&(z=qu),vt.bindFramebuffer(D.FRAMEBUFFER,z)&&W&&vt.drawBuffers(b,z),vt.viewport(A),vt.scissor(L),vt.setScissorTest(N),tt){const ft=Mt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,ft.__webglTexture,G)}else if(ht){const ft=O;for(let Ct=0;Ct<b.textures.length;Ct++){const Nt=Mt.get(b.textures[Ct]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ct,Nt.__webglTexture,G,ft)}}else if(b!==null&&G!==0){const ft=Mt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,G)}x=-1},this.readRenderTargetPixels=function(b,O,G,W,z,tt,ht,gt=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=Mt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ht!==void 0&&(ft=ft[ht]),ft){vt.bindFramebuffer(D.FRAMEBUFFER,ft);try{const Ct=b.textures[gt],Nt=Ct.format,At=Ct.type;if(!Lt.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Lt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-W&&G>=0&&G<=b.height-z&&(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+gt),D.readPixels(O,G,W,z,Et.convert(Nt),Et.convert(At),tt))}finally{const Ct=P!==null?Mt.get(P).__webglFramebuffer:null;vt.bindFramebuffer(D.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(b,O,G,W,z,tt,ht,gt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=Mt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ht!==void 0&&(ft=ft[ht]),ft)if(O>=0&&O<=b.width-W&&G>=0&&G<=b.height-z){vt.bindFramebuffer(D.FRAMEBUFFER,ft);const Ct=b.textures[gt],Nt=Ct.format,At=Ct.type;if(!Lt.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Lt.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const jt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,jt),D.bufferData(D.PIXEL_PACK_BUFFER,tt.byteLength,D.STREAM_READ),b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+gt),D.readPixels(O,G,W,z,Et.convert(Nt),Et.convert(At),0);const ne=P!==null?Mt.get(P).__webglFramebuffer:null;vt.bindFramebuffer(D.FRAMEBUFFER,ne);const pe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Af(D,pe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,jt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,tt),D.deleteBuffer(jt),D.deleteSync(pe),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,G=0){const W=Math.pow(2,-G),z=Math.floor(b.image.width*W),tt=Math.floor(b.image.height*W),ht=O!==null?O.x:0,gt=O!==null?O.y:0;Gt.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,G,0,0,ht,gt,z,tt),vt.unbindTexture()};const Xu=D.createFramebuffer(),Yu=D.createFramebuffer();this.copyTextureToTexture=function(b,O,G=null,W=null,z=0,tt=null){tt===null&&(z!==0?(Hr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=z,z=0):tt=0);let ht,gt,ft,Ct,Nt,At,jt,ne,pe;const oe=b.isCompressedTexture?b.mipmaps[tt]:b.image;if(G!==null)ht=G.max.x-G.min.x,gt=G.max.y-G.min.y,ft=G.isBox3?G.max.z-G.min.z:1,Ct=G.min.x,Nt=G.min.y,At=G.isBox3?G.min.z:0;else{const Ze=Math.pow(2,-z);ht=Math.floor(oe.width*Ze),gt=Math.floor(oe.height*Ze),b.isDataArrayTexture?ft=oe.depth:b.isData3DTexture?ft=Math.floor(oe.depth*Ze):ft=1,Ct=0,Nt=0,At=0}W!==null?(jt=W.x,ne=W.y,pe=W.z):(jt=0,ne=0,pe=0);const re=Et.convert(O.format),Rt=Et.convert(O.type);let de;O.isData3DTexture?(Gt.setTexture3D(O,0),de=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Gt.setTexture2DArray(O,0),de=D.TEXTURE_2D_ARRAY):(Gt.setTexture2D(O,0),de=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const $t=D.getParameter(D.UNPACK_ROW_LENGTH),He=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ci=D.getParameter(D.UNPACK_SKIP_PIXELS),Ve=D.getParameter(D.UNPACK_SKIP_ROWS),fr=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,oe.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,oe.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ct),D.pixelStorei(D.UNPACK_SKIP_ROWS,Nt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,At);const fe=b.isDataArrayTexture||b.isData3DTexture,je=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const Ze=Mt.get(b),Le=Mt.get(O),Fe=Mt.get(Ze.__renderTarget),Qs=Mt.get(Le.__renderTarget);vt.bindFramebuffer(D.READ_FRAMEBUFFER,Fe.__webglFramebuffer),vt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Qs.__webglFramebuffer);for(let si=0;si<ft;si++)fe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Mt.get(b).__webglTexture,z,At+si),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Mt.get(O).__webglTexture,tt,pe+si)),D.blitFramebuffer(Ct,Nt,ht,gt,jt,ne,ht,gt,D.DEPTH_BUFFER_BIT,D.NEAREST);vt.bindFramebuffer(D.READ_FRAMEBUFFER,null),vt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||b.isRenderTargetTexture||Mt.has(b)){const Ze=Mt.get(b),Le=Mt.get(O);vt.bindFramebuffer(D.READ_FRAMEBUFFER,Xu),vt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Yu);for(let Fe=0;Fe<ft;Fe++)fe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ze.__webglTexture,z,At+Fe):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ze.__webglTexture,z),je?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Le.__webglTexture,tt,pe+Fe):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Le.__webglTexture,tt),z!==0?D.blitFramebuffer(Ct,Nt,ht,gt,jt,ne,ht,gt,D.COLOR_BUFFER_BIT,D.NEAREST):je?D.copyTexSubImage3D(de,tt,jt,ne,pe+Fe,Ct,Nt,ht,gt):D.copyTexSubImage2D(de,tt,jt,ne,Ct,Nt,ht,gt);vt.bindFramebuffer(D.READ_FRAMEBUFFER,null),vt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else je?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(de,tt,jt,ne,pe,ht,gt,ft,re,Rt,oe.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(de,tt,jt,ne,pe,ht,gt,ft,re,oe.data):D.texSubImage3D(de,tt,jt,ne,pe,ht,gt,ft,re,Rt,oe):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,tt,jt,ne,ht,gt,re,Rt,oe.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,tt,jt,ne,oe.width,oe.height,re,oe.data):D.texSubImage2D(D.TEXTURE_2D,tt,jt,ne,ht,gt,re,Rt,oe);D.pixelStorei(D.UNPACK_ROW_LENGTH,$t),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,He),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ci),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ve),D.pixelStorei(D.UNPACK_SKIP_IMAGES,fr),tt===0&&O.generateMipmaps&&D.generateMipmap(de),vt.unbindTexture()},this.initRenderTarget=function(b){Mt.get(b).__webglFramebuffer===void 0&&Gt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Gt.setTextureCube(b,0):b.isData3DTexture?Gt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Gt.setTexture2DArray(b,0):Gt.setTexture2D(b,0),vt.unbindTexture()},this.resetState=function(){T=0,w=0,P=null,vt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}const wt={IDLE:Symbol(),ROTATE:Symbol(),PAN:Symbol(),SCALE:Symbol(),FOV:Symbol(),FOCUS:Symbol(),ZROTATE:Symbol(),ANIMATION_FOCUS:Symbol(),ANIMATION_ROTATE:Symbol()},ee={NONE:Symbol(),ONE_FINGER:Symbol(),ONE_FINGER_SWITCHED:Symbol(),TWO_FINGER:Symbol(),MULT_FINGER:Symbol(),CURSOR:Symbol()},Bt={x:0,y:0},qe={camera:new Dt,gizmos:new Dt},ae={type:"change"},on={type:"start"},Je={type:"end"},Q0=new fp,_e=new I,_h=new Dt,vh=new Dt,an=new I,ys=1e-6;class tv extends mp{constructor(t,e=null,n=null){super(t,e),this.scene=n,this.target=new I,this._currentTarget=new I,this.radiusFactor=.67,this.mouseActions=[],this._mouseOp=null,this._v2_1=new Zt,this._v3_1=new I,this._v3_2=new I,this._m4_1=new Dt,this._m4_2=new Dt,this._quat=new fn,this._translationMatrix=new Dt,this._rotationMatrix=new Dt,this._scaleMatrix=new Dt,this._rotationAxis=new I,this._cameraMatrixState=new Dt,this._cameraProjectionState=new Dt,this._fovState=1,this._upState=new I,this._zoomState=1,this._nearPos=0,this._farPos=0,this._gizmoMatrixState=new Dt,this._up0=new I,this._zoom0=1,this._fov0=0,this._initialNear=0,this._nearPos0=0,this._initialFar=0,this._farPos0=0,this._cameraMatrixState0=new Dt,this._gizmoMatrixState0=new Dt,this._target0=new I,this._button=-1,this._touchStart=[],this._touchCurrent=[],this._input=ee.NONE,this._switchSensibility=32,this._startFingerDistance=0,this._currentFingerDistance=0,this._startFingerRotation=0,this._currentFingerRotation=0,this._devPxRatio=0,this._downValid=!0,this._nclicks=0,this._downEvents=[],this._downStart=0,this._clickStart=0,this._maxDownTime=250,this._maxInterval=300,this._posThreshold=24,this._movementThreshold=24,this._currentCursorPosition=new I,this._startCursorPosition=new I,this._grid=null,this._gridPosition=new I,this._gizmos=new $n,this._curvePts=128,this._timeStart=-1,this._animationId=-1,this.focusAnimationTime=500,this._timePrev=0,this._timeCurrent=0,this._anglePrev=0,this._angleCurrent=0,this._cursorPosPrev=new I,this._cursorPosCurr=new I,this._wPrev=0,this._wCurr=0,this.adjustNearFar=!1,this.scaleFactor=1.1,this.dampingFactor=25,this.wMax=20,this.enableAnimations=!0,this.enableGrid=!1,this.cursorZoom=!1,this.minFov=5,this.maxFov=90,this.rotateSpeed=1,this.enablePan=!0,this.enableRotate=!0,this.enableZoom=!0,this.enableGizmos=!0,this.enableFocus=!0,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this._tbRadius=1,this._state=wt.IDLE,this.setCamera(t),this.scene!=null&&this.scene.add(this._gizmos),this.initializeMouseActions(),this._onContextMenu=nv.bind(this),this._onWheel=ov.bind(this),this._onPointerUp=av.bind(this),this._onPointerMove=sv.bind(this),this._onPointerDown=rv.bind(this),this._onPointerCancel=iv.bind(this),this._onWindowResize=ev.bind(this),e!==null&&this.connect(e)}connect(t){super.connect(t),this.domElement.style.touchAction="none",this._devPxRatio=window.devicePixelRatio,this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onWheel,{passive:!1}),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerCancel),window.addEventListener("resize",this._onWindowResize)}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointercancel",this._onPointerCancel),this.domElement.removeEventListener("wheel",this._onWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),window.removeEventListener("resize",this._onWindowResize)}onSinglePanStart(t,e){if(this.enabled)switch(this.dispatchEvent(on),this.setCenter(t.clientX,t.clientY),e){case"PAN":if(!this.enablePan)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1,this.activateGizmos(!1),this.dispatchEvent(ae)),this.updateTbState(wt.PAN,!0),this._startCursorPosition.copy(this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement)),this.enableGrid&&(this.drawGrid(),this.dispatchEvent(ae));break;case"ROTATE":if(!this.enableRotate)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1),this.updateTbState(wt.ROTATE,!0),this._startCursorPosition.copy(this.unprojectOnTbSurface(this.object,Bt.x,Bt.y,this.domElement,this._tbRadius)),this.activateGizmos(!0),this.enableAnimations&&(this._timePrev=this._timeCurrent=performance.now(),this._angleCurrent=this._anglePrev=0,this._cursorPosPrev.copy(this._startCursorPosition),this._cursorPosCurr.copy(this._cursorPosPrev),this._wCurr=0,this._wPrev=this._wCurr),this.dispatchEvent(ae);break;case"FOV":if(!this.object.isPerspectiveCamera||!this.enableZoom)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1,this.activateGizmos(!1),this.dispatchEvent(ae)),this.updateTbState(wt.FOV,!0),this._startCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition);break;case"ZOOM":if(!this.enableZoom)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1,this.activateGizmos(!1),this.dispatchEvent(ae)),this.updateTbState(wt.SCALE,!0),this._startCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition);break}}onSinglePanMove(t,e){if(this.enabled){const n=e!=this._state;switch(this.setCenter(t.clientX,t.clientY),e){case wt.PAN:this.enablePan&&(n?(this.dispatchEvent(Je),this.dispatchEvent(on),this.updateTbState(e,!0),this._startCursorPosition.copy(this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement)),this.enableGrid&&this.drawGrid(),this.activateGizmos(!1)):(this._currentCursorPosition.copy(this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement)),this.applyTransformMatrix(this.pan(this._startCursorPosition,this._currentCursorPosition))));break;case wt.ROTATE:if(this.enableRotate)if(n)this.dispatchEvent(Je),this.dispatchEvent(on),this.updateTbState(e,!0),this._startCursorPosition.copy(this.unprojectOnTbSurface(this.object,Bt.x,Bt.y,this.domElement,this._tbRadius)),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!0);else{this._currentCursorPosition.copy(this.unprojectOnTbSurface(this.object,Bt.x,Bt.y,this.domElement,this._tbRadius));const r=this._startCursorPosition.distanceTo(this._currentCursorPosition),s=this._startCursorPosition.angleTo(this._currentCursorPosition),a=Math.max(r/this._tbRadius,s)*this.rotateSpeed;this.applyTransformMatrix(this.rotate(this.calculateRotationAxis(this._startCursorPosition,this._currentCursorPosition),a)),this.enableAnimations&&(this._timePrev=this._timeCurrent,this._timeCurrent=performance.now(),this._anglePrev=this._angleCurrent,this._angleCurrent=a,this._cursorPosPrev.copy(this._cursorPosCurr),this._cursorPosCurr.copy(this._currentCursorPosition),this._wPrev=this._wCurr,this._wCurr=this.calculateAngularSpeed(this._anglePrev,this._angleCurrent,this._timePrev,this._timeCurrent))}break;case wt.SCALE:if(this.enableZoom)if(n)this.dispatchEvent(Je),this.dispatchEvent(on),this.updateTbState(e,!0),this._startCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!1);else{this._currentCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5);const s=this._currentCursorPosition.y-this._startCursorPosition.y;let a=1;s<0?a=1/Math.pow(this.scaleFactor,-s*8):s>0&&(a=Math.pow(this.scaleFactor,s*8)),this._v3_1.setFromMatrixPosition(this._gizmoMatrixState),this.applyTransformMatrix(this.scale(a,this._v3_1))}break;case wt.FOV:if(this.enableZoom&&this.object.isPerspectiveCamera)if(n)this.dispatchEvent(Je),this.dispatchEvent(on),this.updateTbState(e,!0),this._startCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!1);else{this._currentCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5);const s=this._currentCursorPosition.y-this._startCursorPosition.y;let a=1;s<0?a=1/Math.pow(this.scaleFactor,-s*8):s>0&&(a=Math.pow(this.scaleFactor,s*8)),this._v3_1.setFromMatrixPosition(this._cameraMatrixState);const o=this._v3_1.distanceTo(this._gizmos.position);let c=o/a;c=yt.clamp(c,this.minDistance,this.maxDistance);const l=o*Math.tan(yt.DEG2RAD*this._fovState*.5);let h=yt.RAD2DEG*(Math.atan(l/c)*2);h=yt.clamp(h,this.minFov,this.maxFov);const u=l/Math.tan(yt.DEG2RAD*(h/2));a=o/u,this._v3_2.setFromMatrixPosition(this._gizmoMatrixState),this.setFov(h),this.applyTransformMatrix(this.scale(a,this._v3_2,!1)),_e.copy(this._gizmos.position).sub(this.object.position).normalize().multiplyScalar(u/o),this._m4_1.makeTranslation(_e.x,_e.y,_e.z)}break}this.dispatchEvent(ae)}}onSinglePanEnd(){if(this._state==wt.ROTATE){if(!this.enableRotate)return;if(this.enableAnimations)if(performance.now()-this._timeCurrent<120){const e=Math.abs((this._wPrev+this._wCurr)/2),n=this;this._animationId=window.requestAnimationFrame(function(r){n.updateTbState(wt.ANIMATION_ROTATE,!0);const s=n.calculateRotationAxis(n._cursorPosPrev,n._cursorPosCurr);n.onRotationAnim(r,s,Math.min(e,n.wMax))})}else this.updateTbState(wt.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(ae);else this.updateTbState(wt.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(ae)}else(this._state==wt.PAN||this._state==wt.IDLE)&&(this.updateTbState(wt.IDLE,!1),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!1),this.dispatchEvent(ae));this.dispatchEvent(Je)}onDoubleTap(t){if(this.enabled&&this.enablePan&&this.enableFocus&&this.scene!=null){this.dispatchEvent(on),this.setCenter(t.clientX,t.clientY);const e=this.unprojectOnObj(this.getCursorNDC(Bt.x,Bt.y,this.domElement),this.object);if(e!=null&&this.enableAnimations){const n=this;this._animationId!=-1&&window.cancelAnimationFrame(this._animationId),this._timeStart=-1,this._animationId=window.requestAnimationFrame(function(r){n.updateTbState(wt.ANIMATION_FOCUS,!0),n.onFocusAnim(r,e,n._cameraMatrixState,n._gizmoMatrixState)})}else e!=null&&!this.enableAnimations&&(this.updateTbState(wt.FOCUS,!0),this.focus(e,this.scaleFactor),this.updateTbState(wt.IDLE,!1),this.dispatchEvent(ae))}this.dispatchEvent(Je)}onDoublePanStart(){this.enabled&&this.enablePan&&(this.dispatchEvent(on),this.updateTbState(wt.PAN,!0),this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2),this._startCursorPosition.copy(this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement,!0)),this._currentCursorPosition.copy(this._startCursorPosition),this.activateGizmos(!1))}onDoublePanMove(){this.enabled&&this.enablePan&&(this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2),this._state!=wt.PAN&&(this.updateTbState(wt.PAN,!0),this._startCursorPosition.copy(this._currentCursorPosition)),this._currentCursorPosition.copy(this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement,!0)),this.applyTransformMatrix(this.pan(this._startCursorPosition,this._currentCursorPosition,!0)),this.dispatchEvent(ae))}onDoublePanEnd(){this.updateTbState(wt.IDLE,!1),this.dispatchEvent(Je)}onRotateStart(){this.enabled&&this.enableRotate&&(this.dispatchEvent(on),this.updateTbState(wt.ZROTATE,!0),this._startFingerRotation=this.getAngle(this._touchCurrent[1],this._touchCurrent[0])+this.getAngle(this._touchStart[1],this._touchStart[0]),this._currentFingerRotation=this._startFingerRotation,this.object.getWorldDirection(this._rotationAxis),!this.enablePan&&!this.enableZoom&&this.activateGizmos(!0))}onRotateMove(){if(this.enabled&&this.enableRotate){this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2);let t;this._state!=wt.ZROTATE&&(this.updateTbState(wt.ZROTATE,!0),this._startFingerRotation=this._currentFingerRotation),this._currentFingerRotation=this.getAngle(this._touchCurrent[1],this._touchCurrent[0])+this.getAngle(this._touchStart[1],this._touchStart[0]),this.enablePan?(this._v3_2.setFromMatrixPosition(this._gizmoMatrixState),t=this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement).applyQuaternion(this.object.quaternion).multiplyScalar(1/this.object.zoom).add(this._v3_2)):t=new I().setFromMatrixPosition(this._gizmoMatrixState);const e=yt.DEG2RAD*(this._startFingerRotation-this._currentFingerRotation);this.applyTransformMatrix(this.zRotate(t,e)),this.dispatchEvent(ae)}}onRotateEnd(){this.updateTbState(wt.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(Je)}onPinchStart(){this.enabled&&this.enableZoom&&(this.dispatchEvent(on),this.updateTbState(wt.SCALE,!0),this._startFingerDistance=this.calculatePointersDistance(this._touchCurrent[0],this._touchCurrent[1]),this._currentFingerDistance=this._startFingerDistance,this.activateGizmos(!1))}onPinchMove(){if(this.enabled&&this.enableZoom){this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2);const t=12;this._state!=wt.SCALE&&(this._startFingerDistance=this._currentFingerDistance,this.updateTbState(wt.SCALE,!0)),this._currentFingerDistance=Math.max(this.calculatePointersDistance(this._touchCurrent[0],this._touchCurrent[1]),t*this._devPxRatio);const e=this._currentFingerDistance/this._startFingerDistance;let n;this.enablePan?this.object.isOrthographicCamera?n=this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement).applyQuaternion(this.object.quaternion).multiplyScalar(1/this.object.zoom).add(this._gizmos.position):this.object.isPerspectiveCamera&&(n=this.unprojectOnTbPlane(this.object,Bt.x,Bt.y,this.domElement).applyQuaternion(this.object.quaternion).add(this._gizmos.position)):n=this._gizmos.position,this.applyTransformMatrix(this.scale(e,n)),this.dispatchEvent(ae)}}onPinchEnd(){this.updateTbState(wt.IDLE,!1),this.dispatchEvent(Je)}onTriplePanStart(){if(this.enabled&&this.enableZoom){this.dispatchEvent(on),this.updateTbState(wt.SCALE,!0);let t=0,e=0;const n=this._touchCurrent.length;for(let r=0;r<n;r++)t+=this._touchCurrent[r].clientX,e+=this._touchCurrent[r].clientY;this.setCenter(t/n,e/n),this._startCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition)}}onTriplePanMove(){if(this.enabled&&this.enableZoom){let t=0,e=0;const n=this._touchCurrent.length;for(let d=0;d<n;d++)t+=this._touchCurrent[d].clientX,e+=this._touchCurrent[d].clientY;this.setCenter(t/n,e/n);const r=8;this._currentCursorPosition.setY(this.getCursorNDC(Bt.x,Bt.y,this.domElement).y*.5);const s=this._currentCursorPosition.y-this._startCursorPosition.y;let a=1;s<0?a=1/Math.pow(this.scaleFactor,-s*r):s>0&&(a=Math.pow(this.scaleFactor,s*r)),this._v3_1.setFromMatrixPosition(this._cameraMatrixState);const o=this._v3_1.distanceTo(this._gizmos.position);let c=o/a;c=yt.clamp(c,this.minDistance,this.maxDistance);const l=o*Math.tan(yt.DEG2RAD*this._fovState*.5);let h=yt.RAD2DEG*(Math.atan(l/c)*2);h=yt.clamp(h,this.minFov,this.maxFov);const u=l/Math.tan(yt.DEG2RAD*(h/2));a=o/u,this._v3_2.setFromMatrixPosition(this._gizmoMatrixState),this.setFov(h),this.applyTransformMatrix(this.scale(a,this._v3_2,!1)),_e.copy(this._gizmos.position).sub(this.object.position).normalize().multiplyScalar(u/o),this._m4_1.makeTranslation(_e.x,_e.y,_e.z),this.dispatchEvent(ae)}}onTriplePanEnd(){this.updateTbState(wt.IDLE,!1),this.dispatchEvent(Je)}setCenter(t,e){Bt.x=t,Bt.y=e}initializeMouseActions(){this.setMouseAction("PAN",0,"CTRL"),this.setMouseAction("PAN",2),this.setMouseAction("ROTATE",0),this.setMouseAction("ZOOM","WHEEL"),this.setMouseAction("ZOOM",1),this.setMouseAction("FOV","WHEEL","SHIFT"),this.setMouseAction("FOV",1,"SHIFT")}compareMouseAction(t,e){return t.operation==e.operation?t.mouse==e.mouse&&t.key==e.key:!1}setMouseAction(t,e,n=null){const r=["PAN","ROTATE","ZOOM","FOV"],s=[0,1,2,"WHEEL"],a=["CTRL","SHIFT",null];let o;if(!r.includes(t)||!s.includes(e)||!a.includes(n)||e=="WHEEL"&&t!="ZOOM"&&t!="FOV")return!1;switch(t){case"PAN":o=wt.PAN;break;case"ROTATE":o=wt.ROTATE;break;case"ZOOM":o=wt.SCALE;break;case"FOV":o=wt.FOV;break}const c={operation:t,mouse:e,key:n,state:o};for(let l=0;l<this.mouseActions.length;l++)if(this.mouseActions[l].mouse==c.mouse&&this.mouseActions[l].key==c.key)return this.mouseActions.splice(l,1,c),!0;return this.mouseActions.push(c),!0}unsetMouseAction(t,e=null){for(let n=0;n<this.mouseActions.length;n++)if(this.mouseActions[n].mouse==t&&this.mouseActions[n].key==e)return this.mouseActions.splice(n,1),!0;return!1}getOpFromAction(t,e){let n;for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==e)return n.operation;if(e!=null){for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==null)return n.operation}return null}getOpStateFromAction(t,e){let n;for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==e)return n.state;if(e!=null){for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==null)return n.state}return null}getAngle(t,e){return Math.atan2(e.clientY-t.clientY,e.clientX-t.clientX)*180/Math.PI}updateTouchEvent(t){for(let e=0;e<this._touchCurrent.length;e++)if(this._touchCurrent[e].pointerId==t.pointerId){this._touchCurrent.splice(e,1,t);break}}applyTransformMatrix(t){if(t.camera!=null&&(this._m4_1.copy(this._cameraMatrixState).premultiply(t.camera),this._m4_1.decompose(this.object.position,this.object.quaternion,this.object.scale),this.object.updateMatrix(),(this._state==wt.ROTATE||this._state==wt.ZROTATE||this._state==wt.ANIMATION_ROTATE)&&this.object.up.copy(this._upState).applyQuaternion(this.object.quaternion)),t.gizmos!=null&&(this._m4_1.copy(this._gizmoMatrixState).premultiply(t.gizmos),this._m4_1.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this._gizmos.updateMatrix()),this._state==wt.SCALE||this._state==wt.FOCUS||this._state==wt.ANIMATION_FOCUS)if(this._tbRadius=this.calculateTbRadius(this.object),this.adjustNearFar){const e=this.object.position.distanceTo(this._gizmos.position),n=new ii;n.setFromObject(this._gizmos);const r=new Ai;n.getBoundingSphere(r);const s=Math.max(this._nearPos0,r.radius+r.center.length()),a=e-this._initialNear,o=Math.min(s,a);this.object.near=e-o;const c=Math.min(this._farPos0,-r.radius+r.center.length()),l=e-this._initialFar,h=Math.min(c,l);this.object.far=e-h,this.object.updateProjectionMatrix()}else{let e=!1;this.object.near!=this._initialNear&&(this.object.near=this._initialNear,e=!0),this.object.far!=this._initialFar&&(this.object.far=this._initialFar,e=!0),e&&this.object.updateProjectionMatrix()}}calculateAngularSpeed(t,e,n,r){const s=e-t,a=(r-n)/1e3;return a==0?0:s/a}calculatePointersDistance(t,e){return Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2))}calculateRotationAxis(t,e){return this._rotationMatrix.extractRotation(this._cameraMatrixState),this._quat.setFromRotationMatrix(this._rotationMatrix),this._rotationAxis.crossVectors(t,e).applyQuaternion(this._quat),this._rotationAxis.normalize().clone()}calculateTbRadius(t){const e=t.position.distanceTo(this._gizmos.position);if(t.type=="PerspectiveCamera"){const n=yt.DEG2RAD*t.fov*.5,r=Math.atan(t.aspect*Math.tan(n));return Math.tan(Math.min(n,r))*e*this.radiusFactor}else if(t.type=="OrthographicCamera")return Math.min(t.top,t.right)*this.radiusFactor}focus(t,e,n=1){_e.copy(t).sub(this._gizmos.position).multiplyScalar(n),this._translationMatrix.makeTranslation(_e.x,_e.y,_e.z),_h.copy(this._gizmoMatrixState),this._gizmoMatrixState.premultiply(this._translationMatrix),this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),vh.copy(this._cameraMatrixState),this._cameraMatrixState.premultiply(this._translationMatrix),this._cameraMatrixState.decompose(this.object.position,this.object.quaternion,this.object.scale),this.enableZoom&&this.applyTransformMatrix(this.scale(e,this._gizmos.position)),this._gizmoMatrixState.copy(_h),this._cameraMatrixState.copy(vh)}drawGrid(){if(this.scene!=null){let n,r,s,a;if(this.object.isOrthographicCamera){const o=this.object.right-this.object.left,c=this.object.bottom-this.object.top;s=Math.max(o,c),a=s/20,n=s/this.object.zoom*3,r=n/a*this.object.zoom}else if(this.object.isPerspectiveCamera){const o=this.object.position.distanceTo(this._gizmos.position),c=yt.DEG2RAD*this.object.fov*.5,l=Math.atan(this.object.aspect*Math.tan(c));s=Math.tan(Math.max(c,l))*o*2,a=s/20,n=s*3,r=n/a}this._grid==null&&(this._grid=new pp(n,r,8947848,8947848),this._grid.position.copy(this._gizmos.position),this._gridPosition.copy(this._grid.position),this._grid.quaternion.copy(this.object.quaternion),this._grid.rotateX(Math.PI*.5),this.scene.add(this._grid))}}dispose(){this._animationId!=-1&&window.cancelAnimationFrame(this._animationId),this.disconnect(),this.scene!==null&&this.scene.remove(this._gizmos),this.disposeGrid()}disposeGrid(){this._grid!=null&&this.scene!=null&&(this.scene.remove(this._grid),this._grid=null)}easeOutCubic(t){return 1-Math.pow(1-t,3)}activateGizmos(t){const e=this._gizmos.children[0],n=this._gizmos.children[1],r=this._gizmos.children[2];t?(e.material.setValues({opacity:1}),n.material.setValues({opacity:1}),r.material.setValues({opacity:1})):(e.material.setValues({opacity:.6}),n.material.setValues({opacity:.6}),r.material.setValues({opacity:.6}))}getCursorNDC(t,e,n){const r=n.getBoundingClientRect();return this._v2_1.setX((t-r.left)/r.width*2-1),this._v2_1.setY((r.bottom-e)/r.height*2-1),this._v2_1.clone()}getCursorPosition(t,e,n){return this._v2_1.copy(this.getCursorNDC(t,e,n)),this._v2_1.x*=(this.object.right-this.object.left)*.5,this._v2_1.y*=(this.object.top-this.object.bottom)*.5,this._v2_1.clone()}setCamera(t){t.lookAt(this.target),t.updateMatrix(),t.type=="PerspectiveCamera"&&(this._fov0=t.fov,this._fovState=t.fov),this._cameraMatrixState0.copy(t.matrix),this._cameraMatrixState.copy(this._cameraMatrixState0),this._cameraProjectionState.copy(t.projectionMatrix),this._zoom0=t.zoom,this._zoomState=this._zoom0,this._initialNear=t.near,this._nearPos0=t.position.distanceTo(this.target)-t.near,this._nearPos=this._initialNear,this._initialFar=t.far,this._farPos0=t.position.distanceTo(this.target)-t.far,this._farPos=this._initialFar,this._up0.copy(t.up),this._upState.copy(t.up),this.object=t,this.object.updateProjectionMatrix(),this._tbRadius=this.calculateTbRadius(t),this.makeGizmos(this.target,this._tbRadius)}setGizmosVisible(t){this._gizmos.visible=t,this.dispatchEvent(ae)}setTbRadius(t){this.radiusFactor=t,this._tbRadius=this.calculateTbRadius(this.object);const n=new Ds(0,0,this._tbRadius,this._tbRadius).getPoints(this._curvePts),r=new Ye().setFromPoints(n);for(const s in this._gizmos.children)this._gizmos.children[s].geometry=r;this.dispatchEvent(ae)}makeGizmos(t,e){const r=new Ds(0,0,e,e).getPoints(this._curvePts),s=new Ye().setFromPoints(r),a=new Dr({color:16744576,fog:!1,transparent:!0,opacity:.6}),o=new Dr({color:8454016,fog:!1,transparent:!0,opacity:.6}),c=new Dr({color:8421631,fog:!1,transparent:!0,opacity:.6}),l=new Is(s,a),h=new Is(s,o),u=new Is(s,c),d=Math.PI*.5;if(l.rotation.x=d,h.rotation.y=d,this._gizmoMatrixState0.identity().setPosition(t),this._gizmoMatrixState.copy(this._gizmoMatrixState0),this.object.zoom!==1){const f=1/this.object.zoom;this._scaleMatrix.makeScale(f,f,f),this._translationMatrix.makeTranslation(-t.x,-t.y,-t.z),this._gizmoMatrixState.premultiply(this._translationMatrix).premultiply(this._scaleMatrix),this._translationMatrix.makeTranslation(t.x,t.y,t.z),this._gizmoMatrixState.premultiply(this._translationMatrix)}this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this._gizmos.traverse(function(f){f.isLine&&(f.geometry.dispose(),f.material.dispose())}),this._gizmos.clear(),this._gizmos.add(l),this._gizmos.add(h),this._gizmos.add(u)}onFocusAnim(t,e,n,r){if(this._timeStart==-1&&(this._timeStart=t),this._state==wt.ANIMATION_FOCUS){const a=(t-this._timeStart)/this.focusAnimationTime;if(this._gizmoMatrixState.copy(r),a>=1)this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this.focus(e,this.scaleFactor),this._timeStart=-1,this.updateTbState(wt.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(ae);else{const o=this.easeOutCubic(a),c=1-o+this.scaleFactor*o;this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this.focus(e,c,o),this.dispatchEvent(ae);const l=this;this._animationId=window.requestAnimationFrame(function(h){l.onFocusAnim(h,e,n,r.clone())})}}else this._animationId=-1,this._timeStart=-1}onRotationAnim(t,e,n){if(this._timeStart==-1&&(this._anglePrev=0,this._angleCurrent=0,this._timeStart=t),this._state==wt.ANIMATION_ROTATE){const r=(t-this._timeStart)/1e3;if(n+-this.dampingFactor*r>0){this._angleCurrent=.5*-this.dampingFactor*Math.pow(r,2)+n*r+0,this.applyTransformMatrix(this.rotate(e,this._angleCurrent)),this.dispatchEvent(ae);const a=this;this._animationId=window.requestAnimationFrame(function(o){a.onRotationAnim(o,e,n)})}else this._animationId=-1,this._timeStart=-1,this.updateTbState(wt.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(ae)}else this._animationId=-1,this._timeStart=-1,this._state!=wt.ROTATE&&(this.activateGizmos(!1),this.dispatchEvent(ae))}pan(t,e,n=!1){const r=t.clone().sub(e);if(this.object.isOrthographicCamera)r.multiplyScalar(1/this.object.zoom);else if(this.object.isPerspectiveCamera&&n){this._v3_1.setFromMatrixPosition(this._cameraMatrixState0),this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0);const s=this._v3_1.distanceTo(this._v3_2)/this.object.position.distanceTo(this._gizmos.position);r.multiplyScalar(1/s)}return this._v3_1.set(r.x,r.y,0).applyQuaternion(this.object.quaternion),this._m4_1.makeTranslation(this._v3_1.x,this._v3_1.y,this._v3_1.z),this.setTransformationMatrices(this._m4_1,this._m4_1),qe}reset(){this.target.copy(this._target0),this.object.zoom=this._zoom0,this.object.isPerspectiveCamera&&(this.object.fov=this._fov0),this.object.near=this._nearPos,this.object.far=this._farPos,this._cameraMatrixState.copy(this._cameraMatrixState0),this._cameraMatrixState.decompose(this.object.position,this.object.quaternion,this.object.scale),this.object.up.copy(this._up0),this.object.updateMatrix(),this.object.updateProjectionMatrix(),this._gizmoMatrixState.copy(this._gizmoMatrixState0),this._gizmoMatrixState0.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this._gizmos.updateMatrix(),this._tbRadius=this.calculateTbRadius(this.object),this.makeGizmos(this._gizmos.position,this._tbRadius),this.object.lookAt(this._gizmos.position),this.updateTbState(wt.IDLE,!1),this.dispatchEvent(ae)}rotate(t,e){const n=this._gizmos.position;return this._translationMatrix.makeTranslation(-n.x,-n.y,-n.z),this._rotationMatrix.makeRotationAxis(t,-e),this._m4_1.makeTranslation(n.x,n.y,n.z),this._m4_1.multiply(this._rotationMatrix),this._m4_1.multiply(this._translationMatrix),this.setTransformationMatrices(this._m4_1),qe}copyState(){let t;this.object.isOrthographicCamera?t=JSON.stringify({arcballState:{cameraFar:this.object.far,cameraMatrix:this.object.matrix,cameraNear:this.object.near,cameraUp:this.object.up,cameraZoom:this.object.zoom,gizmoMatrix:this._gizmos.matrix,target:this.target}}):this.object.isPerspectiveCamera&&(t=JSON.stringify({arcballState:{cameraFar:this.object.far,cameraFov:this.object.fov,cameraMatrix:this.object.matrix,cameraNear:this.object.near,cameraUp:this.object.up,cameraZoom:this.object.zoom,gizmoMatrix:this._gizmos.matrix,target:this.target}})),navigator.clipboard.writeText(t)}pasteState(){const t=this;navigator.clipboard.readText().then(function(n){t.setStateFromJSON(n)})}saveState(){this.object.updateMatrix(),this._gizmos.updateMatrix(),this._target0.copy(this.target),this._cameraMatrixState0.copy(this.object.matrix),this._gizmoMatrixState0.copy(this._gizmos.matrix),this._nearPos=this.object.near,this._farPos=this.object.far,this._zoom0=this.object.zoom,this._up0.copy(this.object.up),this.object.isPerspectiveCamera&&(this._fov0=this.object.fov)}scale(t,e,n=!0){an.copy(e);let r=1/t;if(this.object.isOrthographicCamera){this.object.zoom=this._zoomState,this.object.zoom*=t,this.object.zoom>this.maxZoom?(this.object.zoom=this.maxZoom,r=this._zoomState/this.maxZoom):this.object.zoom<this.minZoom&&(this.object.zoom=this.minZoom,r=this._zoomState/this.minZoom),this.object.updateProjectionMatrix(),this._v3_1.setFromMatrixPosition(this._gizmoMatrixState),this._scaleMatrix.makeScale(r,r,r),this._translationMatrix.makeTranslation(-this._v3_1.x,-this._v3_1.y,-this._v3_1.z),this._m4_2.makeTranslation(this._v3_1.x,this._v3_1.y,this._v3_1.z).multiply(this._scaleMatrix),this._m4_2.multiply(this._translationMatrix),an.sub(this._v3_1);const s=an.clone().multiplyScalar(r);return an.sub(s),this._m4_1.makeTranslation(an.x,an.y,an.z),this._m4_2.premultiply(this._m4_1),this.setTransformationMatrices(this._m4_1,this._m4_2),qe}else if(this.object.isPerspectiveCamera){this._v3_1.setFromMatrixPosition(this._cameraMatrixState),this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);let s=this._v3_1.distanceTo(an),a=s-s*r;const o=s-a;if(o<this.minDistance?(r=this.minDistance/s,a=s-s*r):o>this.maxDistance&&(r=this.maxDistance/s,a=s-s*r),_e.copy(an).sub(this._v3_1).normalize().multiplyScalar(a),this._m4_1.makeTranslation(_e.x,_e.y,_e.z),n){const c=this._v3_2;s=c.distanceTo(an),a=s-s*r,_e.copy(an).sub(this._v3_2).normalize().multiplyScalar(a),this._translationMatrix.makeTranslation(c.x,c.y,c.z),this._scaleMatrix.makeScale(r,r,r),this._m4_2.makeTranslation(_e.x,_e.y,_e.z).multiply(this._translationMatrix),this._m4_2.multiply(this._scaleMatrix),this._translationMatrix.makeTranslation(-c.x,-c.y,-c.z),this._m4_2.multiply(this._translationMatrix),this.setTransformationMatrices(this._m4_1,this._m4_2)}else this.setTransformationMatrices(this._m4_1);return qe}}setFov(t){this.object.isPerspectiveCamera&&(this.object.fov=yt.clamp(t,this.minFov,this.maxFov),this.object.updateProjectionMatrix())}setTransformationMatrices(t=null,e=null){t!=null?qe.camera!=null?qe.camera.copy(t):qe.camera=t.clone():qe.camera=null,e!=null?qe.gizmos!=null?qe.gizmos.copy(e):qe.gizmos=e.clone():qe.gizmos=null}zRotate(t,e){return this._rotationMatrix.makeRotationAxis(this._rotationAxis,e),this._translationMatrix.makeTranslation(-t.x,-t.y,-t.z),this._m4_1.makeTranslation(t.x,t.y,t.z),this._m4_1.multiply(this._rotationMatrix),this._m4_1.multiply(this._translationMatrix),this._v3_1.setFromMatrixPosition(this._gizmoMatrixState).sub(t),this._v3_2.copy(this._v3_1).applyAxisAngle(this._rotationAxis,e),this._v3_2.sub(this._v3_1),this._m4_2.makeTranslation(this._v3_2.x,this._v3_2.y,this._v3_2.z),this.setTransformationMatrices(this._m4_1,this._m4_2),qe}getRaycaster(){return Q0}unprojectOnObj(t,e){const n=this.getRaycaster();n.near=e.near,n.far=e.far,n.setFromCamera(t,e);const r=n.intersectObjects(this.scene.children,!0);for(let s=0;s<r.length;s++)if(r[s].object.uuid!=this._gizmos.uuid&&r[s].face!=null)return r[s].point.clone();return null}unprojectOnTbSurface(t,e,n,r,s){if(t.type=="OrthographicCamera"){this._v2_1.copy(this.getCursorPosition(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,0);const a=Math.pow(this._v2_1.x,2),o=Math.pow(this._v2_1.y,2),c=Math.pow(this._tbRadius,2);return a+o<=c*.5?this._v3_1.setZ(Math.sqrt(c-(a+o))):this._v3_1.setZ(c*.5/Math.sqrt(a+o)),this._v3_1}else if(t.type=="PerspectiveCamera"){this._v2_1.copy(this.getCursorNDC(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,-1),this._v3_1.applyMatrix4(t.projectionMatrixInverse);const a=this._v3_1.clone().normalize(),o=t.position.distanceTo(this._gizmos.position),c=Math.pow(s,2),l=this._v3_1.z,h=Math.sqrt(Math.pow(this._v3_1.x,2)+Math.pow(this._v3_1.y,2));if(h==0)return a.set(this._v3_1.x,this._v3_1.y,s),a;const u=l/h,d=o;let f=Math.pow(u,2)+1,g=2*u*d,_=Math.pow(d,2)-c,m=Math.pow(g,2)-4*f*_;if(m>=0&&(this._v2_1.setX((-g-Math.sqrt(m))/(2*f)),this._v2_1.setY(u*this._v2_1.x+d),yt.RAD2DEG*this._v2_1.angle()>=45)){const v=Math.sqrt(Math.pow(this._v2_1.x,2)+Math.pow(o-this._v2_1.y,2));return a.multiplyScalar(v),a.z+=o,a}f=u,g=d,_=-c*.5,m=Math.pow(g,2)-4*f*_,this._v2_1.setX((-g-Math.sqrt(m))/(2*f)),this._v2_1.setY(u*this._v2_1.x+d);const p=Math.sqrt(Math.pow(this._v2_1.x,2)+Math.pow(o-this._v2_1.y,2));return a.multiplyScalar(p),a.z+=o,a}}unprojectOnTbPlane(t,e,n,r,s=!1){if(t.type=="OrthographicCamera")return this._v2_1.copy(this.getCursorPosition(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,0),this._v3_1.clone();if(t.type=="PerspectiveCamera"){this._v2_1.copy(this.getCursorNDC(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,-1),this._v3_1.applyMatrix4(t.projectionMatrixInverse);const a=this._v3_1.clone().normalize(),o=this._v3_1.z,c=Math.sqrt(Math.pow(this._v3_1.x,2)+Math.pow(this._v3_1.y,2));let l;if(s?l=this._v3_1.setFromMatrixPosition(this._cameraMatrixState0).distanceTo(this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0)):l=t.position.distanceTo(this._gizmos.position),c==0)return a.set(0,0,0),a;const h=o/c,u=l,d=-u/h,f=Math.sqrt(Math.pow(u,2)+Math.pow(d,2));return a.multiplyScalar(f),a.z=0,a}}updateMatrixState(){this._cameraMatrixState.copy(this.object.matrix),this._gizmoMatrixState.copy(this._gizmos.matrix),this.object.isOrthographicCamera?(this._cameraProjectionState.copy(this.object.projectionMatrix),this.object.updateProjectionMatrix(),this._zoomState=this.object.zoom):this.object.isPerspectiveCamera&&(this._fovState=this.object.fov)}updateTbState(t,e){this._state=t,e&&this.updateMatrixState()}update(){if(this.target.equals(this._currentTarget)===!1&&(this._gizmos.position.copy(this.target),this._tbRadius=this.calculateTbRadius(this.object),this.makeGizmos(this.target,this._tbRadius),this._currentTarget.copy(this.target)),this.object.isOrthographicCamera){if(this.object.zoom>this.maxZoom||this.object.zoom<this.minZoom){const t=yt.clamp(this.object.zoom,this.minZoom,this.maxZoom);this.applyTransformMatrix(this.scale(t/this.object.zoom,this._gizmos.position,!0))}}else if(this.object.isPerspectiveCamera){const t=this.object.position.distanceTo(this._gizmos.position);if(t>this.maxDistance+ys||t<this.minDistance-ys){const n=yt.clamp(t,this.minDistance,this.maxDistance);this.applyTransformMatrix(this.scale(n/t,this._gizmos.position)),this.updateMatrixState()}(this.object.fov<this.minFov||this.object.fov>this.maxFov)&&(this.object.fov=yt.clamp(this.object.fov,this.minFov,this.maxFov),this.object.updateProjectionMatrix());const e=this._tbRadius;if(this._tbRadius=this.calculateTbRadius(this.object),e<this._tbRadius-ys||e>this._tbRadius+ys){const n=(this._gizmos.scale.x+this._gizmos.scale.y+this._gizmos.scale.z)/3,r=this._tbRadius/n,a=new Ds(0,0,r,r).getPoints(this._curvePts),o=new Ye().setFromPoints(a);for(const c in this._gizmos.children)this._gizmos.children[c].geometry=o}}this.object.lookAt(this._gizmos.position)}setStateFromJSON(t){const e=JSON.parse(t);if(e.arcballState!=null){this.target.fromArray(e.arcballState.target),this._cameraMatrixState.fromArray(e.arcballState.cameraMatrix.elements),this._cameraMatrixState.decompose(this.object.position,this.object.quaternion,this.object.scale),this.object.up.copy(e.arcballState.cameraUp),this.object.near=e.arcballState.cameraNear,this.object.far=e.arcballState.cameraFar,this.object.zoom=e.arcballState.cameraZoom,this.object.isPerspectiveCamera&&(this.object.fov=e.arcballState.cameraFov),this._gizmoMatrixState.fromArray(e.arcballState.gizmoMatrix.elements),this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this.object.updateMatrix(),this.object.updateProjectionMatrix(),this._gizmos.updateMatrix(),this._tbRadius=this.calculateTbRadius(this.object);const n=new Dt().copy(this._gizmoMatrixState0);this.makeGizmos(this._gizmos.position,this._tbRadius),this._gizmoMatrixState0.copy(n),this.object.lookAt(this._gizmos.position),this.updateTbState(wt.IDLE,!1),this.dispatchEvent(ae)}}}function ev(){const i=(this._gizmos.scale.x+this._gizmos.scale.y+this._gizmos.scale.z)/3;this._tbRadius=this.calculateTbRadius(this.object);const t=this._tbRadius/i,n=new Ds(0,0,t,t).getPoints(this._curvePts),r=new Ye().setFromPoints(n);for(const s in this._gizmos.children)this._gizmos.children[s].geometry=r;this.dispatchEvent(ae)}function nv(i){if(this.enabled){for(let t=0;t<this.mouseActions.length;t++)if(this.mouseActions[t].mouse==2){i.preventDefault();break}}}function iv(){this._touchStart.splice(0,this._touchStart.length),this._touchCurrent.splice(0,this._touchCurrent.length),this._input=ee.NONE}function rv(i){if(i.button==0&&i.isPrimary?(this._downValid=!0,this._downEvents.push(i),this._downStart=performance.now()):this._downValid=!1,i.pointerType=="touch"&&this._input!=ee.CURSOR)switch(this._touchStart.push(i),this._touchCurrent.push(i),this._input){case ee.NONE:this._input=ee.ONE_FINGER,this.onSinglePanStart(i,"ROTATE"),window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerup",this._onPointerUp);break;case ee.ONE_FINGER:case ee.ONE_FINGER_SWITCHED:this._input=ee.TWO_FINGER,this.onRotateStart(),this.onPinchStart(),this.onDoublePanStart();break;case ee.TWO_FINGER:this._input=ee.MULT_FINGER,this.onTriplePanStart(i);break}else if(i.pointerType!="touch"&&this._input==ee.NONE){let t=null;i.ctrlKey||i.metaKey?t="CTRL":i.shiftKey&&(t="SHIFT"),this._mouseOp=this.getOpFromAction(i.button,t),this._mouseOp!=null&&(window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerup",this._onPointerUp),this._input=ee.CURSOR,this._button=i.button,this.onSinglePanStart(i,this._mouseOp))}}function sv(i){if(i.pointerType=="touch"&&this._input!=ee.CURSOR)switch(this._input){case ee.ONE_FINGER:this.updateTouchEvent(i),this.onSinglePanMove(i,wt.ROTATE);break;case ee.ONE_FINGER_SWITCHED:if(this.calculatePointersDistance(this._touchCurrent[0],i)*this._devPxRatio>=this._switchSensibility){this._input=ee.ONE_FINGER,this.updateTouchEvent(i),this.onSinglePanStart(i,"ROTATE");break}break;case ee.TWO_FINGER:this.updateTouchEvent(i),this.onRotateMove(),this.onPinchMove(),this.onDoublePanMove();break;case ee.MULT_FINGER:this.updateTouchEvent(i),this.onTriplePanMove(i);break}else if(i.pointerType!="touch"&&this._input==ee.CURSOR){let t=null;i.ctrlKey||i.metaKey?t="CTRL":i.shiftKey&&(t="SHIFT");const e=this.getOpStateFromAction(this._button,t);e!=null&&this.onSinglePanMove(i,e)}this._downValid&&this.calculatePointersDistance(this._downEvents[this._downEvents.length-1],i)*this._devPxRatio>this._movementThreshold&&(this._downValid=!1)}function av(i){if(i.pointerType=="touch"&&this._input!=ee.CURSOR){const t=this._touchCurrent.length;for(let e=0;e<t;e++)if(this._touchCurrent[e].pointerId==i.pointerId){this._touchCurrent.splice(e,1),this._touchStart.splice(e,1);break}switch(this._input){case ee.ONE_FINGER:case ee.ONE_FINGER_SWITCHED:window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),this._input=ee.NONE,this.onSinglePanEnd();break;case ee.TWO_FINGER:this.onDoublePanEnd(i),this.onPinchEnd(i),this.onRotateEnd(i),this._input=ee.ONE_FINGER_SWITCHED;break;case ee.MULT_FINGER:this._touchCurrent.length==0&&(window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),this._input=ee.NONE,this.onTriplePanEnd());break}}else i.pointerType!="touch"&&this._input==ee.CURSOR&&(window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),this._input=ee.NONE,this.onSinglePanEnd(),this._button=-1);if(i.isPrimary)if(this._downValid)if(i.timeStamp-this._downEvents[this._downEvents.length-1].timeStamp<=this._maxDownTime)if(this._nclicks==0)this._nclicks=1,this._clickStart=performance.now();else{const e=i.timeStamp-this._clickStart,n=this.calculatePointersDistance(this._downEvents[1],this._downEvents[0])*this._devPxRatio;e<=this._maxInterval&&n<=this._posThreshold?(this._nclicks=0,this._downEvents.splice(0,this._downEvents.length),this.onDoubleTap(i)):(this._nclicks=1,this._downEvents.shift(),this._clickStart=performance.now())}else this._downValid=!1,this._nclicks=0,this._downEvents.splice(0,this._downEvents.length);else this._nclicks=0,this._downEvents.splice(0,this._downEvents.length)}function ov(i){if(this.enabled&&this.enableZoom){let t=null;i.ctrlKey||i.metaKey?t="CTRL":i.shiftKey&&(t="SHIFT");const e=this.getOpFromAction("WHEEL",t);if(e!=null){i.preventDefault(),this.dispatchEvent(on);const n=125;let r=i.deltaY/n,s=1;switch(r>0?s=1/this.scaleFactor:r<0&&(s=this.scaleFactor),e){case"ZOOM":if(this.updateTbState(wt.SCALE,!0),r>0?s=1/Math.pow(this.scaleFactor,r):r<0&&(s=Math.pow(this.scaleFactor,-r)),this.cursorZoom&&this.enablePan){let a;this.object.isOrthographicCamera?a=this.unprojectOnTbPlane(this.object,i.clientX,i.clientY,this.domElement).applyQuaternion(this.object.quaternion).multiplyScalar(1/this.object.zoom).add(this._gizmos.position):this.object.isPerspectiveCamera&&(a=this.unprojectOnTbPlane(this.object,i.clientX,i.clientY,this.domElement).applyQuaternion(this.object.quaternion).add(this._gizmos.position)),this.applyTransformMatrix(this.scale(s,a))}else this.applyTransformMatrix(this.scale(s,this._gizmos.position));this._grid!=null&&(this.disposeGrid(),this.drawGrid()),this.updateTbState(wt.IDLE,!1),this.dispatchEvent(ae),this.dispatchEvent(Je);break;case"FOV":if(this.object.isPerspectiveCamera){this.updateTbState(wt.FOV,!0),i.deltaX!=0&&(r=i.deltaX/n,s=1,r>0?s=1/Math.pow(this.scaleFactor,r):r<0&&(s=Math.pow(this.scaleFactor,-r))),this._v3_1.setFromMatrixPosition(this._cameraMatrixState);const a=this._v3_1.distanceTo(this._gizmos.position);let o=a/s;o=yt.clamp(o,this.minDistance,this.maxDistance);const c=a*Math.tan(yt.DEG2RAD*this.object.fov*.5);let l=yt.RAD2DEG*(Math.atan(c/o)*2);l>this.maxFov?l=this.maxFov:l<this.minFov&&(l=this.minFov);const h=c/Math.tan(yt.DEG2RAD*(l/2));s=a/h,this.setFov(l),this.applyTransformMatrix(this.scale(s,this._gizmos.position,!1))}this._grid!=null&&(this.disposeGrid(),this.drawGrid()),this.updateTbState(wt.IDLE,!1),this.dispatchEvent(ae),this.dispatchEvent(Je);break}}}}const Sr=new I;function $e(i,t,e,n,r,s){const a=2*Math.PI*r/4,o=Math.max(s-2*r,0),c=Math.PI/4;Sr.copy(t),Sr[n]=0,Sr.normalize();const l=.5*a/(a+o),h=1-Sr.angleTo(i)/c;return Math.sign(Sr[e])===1?h*l:o/(a+o)+l+l*(1-h)}class Nr extends Ri{constructor(t=1,e=1,n=1,r=2,s=.1){const a=r*2+1;if(s=Math.min(t/2,e/2,n/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:r,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new I,l=new I,h=new I(t,e,n).divideScalar(2).subScalar(s),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new I,m=.5/a;for(let p=0,y=0;p<u.length;p+=3,y+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*s,u[p+1]=h.y*Math.sign(c.y)+l.y*s,u[p+2]=h.z*Math.sign(c.z)+l.z*s,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[y+0]=$e(_,l,"z","y",s,n),f[y+1]=1-$e(_,l,"y","z",s,e);break;case 1:_.set(-1,0,0),f[y+0]=1-$e(_,l,"z","y",s,n),f[y+1]=1-$e(_,l,"y","z",s,e);break;case 2:_.set(0,1,0),f[y+0]=1-$e(_,l,"x","z",s,t),f[y+1]=$e(_,l,"z","x",s,n);break;case 3:_.set(0,-1,0),f[y+0]=1-$e(_,l,"x","z",s,t),f[y+1]=1-$e(_,l,"z","x",s,n);break;case 4:_.set(0,0,1),f[y+0]=1-$e(_,l,"x","y",s,t),f[y+1]=1-$e(_,l,"y","x",s,e);break;case 5:_.set(0,0,-1),f[y+0]=$e(_,l,"x","y",s,t),f[y+1]=1-$e(_,l,"y","x",s,e);break}}static fromJSON(t){return new Nr(t.width,t.height,t.depth,t.segments,t.radius)}}function cv(i){let t=2166136261;for(let e=0;e<i.length;e+=1)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function lv(i){let t=i||1831565813;return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const hv=["sakura","summer","maple","ginkgo","snow","sunset","ocean","wanderer"],or=[...hv,"kitty"],Qe={sakura:{id:"sakura",family:"blossom",motion:"petal-drift",glyph:"花",signature:"one rounded-pixel cherry tree",scanDark:"#a52b6d",mid:"#df4f96",bright:"#ff91c2",highlight:"#ffd1e5",trunk:"#704129",ground:"#fbf4df",groundAlt:"#b8d995",groundEdge:"#6da66d",sky:["#dcefe8","#f9e3ed"],light:["#fff9e8","#ffc5de"],moduleColors:["#7a1f52","#d95092","#ff91c2"]},summer:{id:"summer",family:"canopy",motion:"canopy-breathe",glyph:"葉",signature:"one broad summer canopy",scanDark:"#176b45",mid:"#3ca668",bright:"#8ddb6c",highlight:"#dcf5a6",trunk:"#76502d",ground:"#f6f1d3",groundAlt:"#a7d17d",groundEdge:"#5a9b5b",sky:["#d9eee5","#edf4c9"],light:["#fffbd9","#a9e2b2"],moduleColors:["#145b3b","#3ca668","#8ddb6c"]},maple:{id:"maple",family:"maple",motion:"ember-turn",glyph:"楓",signature:"one asymmetric maple crown",scanDark:"#9b3026",mid:"#dc4b30",bright:"#f57932",highlight:"#ffcb64",trunk:"#70402a",ground:"#f9efd8",groundAlt:"#d8aa6c",groundEdge:"#aa653c",sky:["#f1dfd0","#f7ba79"],light:["#fff0c3","#ff8d58"],moduleColors:["#7b241f","#d9492e","#f57932"]},ginkgo:{id:"ginkgo",family:"ginkgo",motion:"fan-fall",glyph:"杏",signature:"one golden fan canopy",scanDark:"#77580b",mid:"#c28a08",bright:"#f3c52e",highlight:"#ffe98a",trunk:"#77542e",ground:"#faf3d2",groundAlt:"#ddca6e",groundEdge:"#aa8b28",sky:["#e7efe1","#f8e9a3"],light:["#fff7c4","#f6c541"],moduleColors:["#6b4b05","#c28a08","#f3c52e"]},snow:{id:"snow",family:"snow",motion:"snow-drift",glyph:"雪",signature:"one tiered snow-bough tree",scanDark:"#2d6780",mid:"#5d94ac",bright:"#bde5ee",highlight:"#ffffff",trunk:"#59686b",ground:"#f4f8f7",groundAlt:"#d4e8e9",groundEdge:"#82abb7",sky:["#dcecf0","#f6fbfb"],light:["#ffffff","#b8e5ed"],moduleColors:["#27556c","#5d94ac","#bde5ee"]},sunset:{id:"sunset",family:"sunset",motion:"sun-breathe",glyph:"日",signature:"pixel sun over a warm horizon",scanDark:"#922c55",mid:"#dc4b4a",bright:"#ff8738",highlight:"#ffd45c",trunk:"#71345c",ground:"#fff0d6",groundAlt:"#e9a26e",groundEdge:"#c85c54",sky:["#eadce7","#ffc074"],light:["#fff1a8","#ff7560"],moduleColors:["#752347","#dc4b4a","#ff8738"]},ocean:{id:"ocean",family:"ocean",motion:"travelling-wave",glyph:"波",signature:"a directional rounded-pixel wave band",scanDark:"#0e6395",mid:"#177eb2",bright:"#24c7d7",highlight:"#d2faf4",trunk:"#145c82",ground:"#e9f6f1",groundAlt:"#9edbd5",groundEdge:"#4ba5b2",sky:["#d5eff0","#bfe8e5"],light:["#effffc","#70d8dd"],moduleColors:["#0d4c77","#177eb2","#24c7d7"]},wanderer:{id:"wanderer",family:"wanderer",motion:"wanderer-idle",glyph:"兔",signature:"one original 3D traveller in a twilight scene",scanDark:"#493277",mid:"#7651a8",bright:"#a883d4",highlight:"#bdf5d7",trunk:"#2f2850",ground:"#f7f0de",groundAlt:"#b9e5cf",groundEdge:"#6f8f85",sky:["#ded8ea","#b8e6d5"],light:["#fff4d6","#c4a6ed"],moduleColors:["#3e2869","#7651a8","#bdf5d7"]},kitty:{id:"kitty",family:"kitty",motion:"kitty-explore",glyph:"貓",signature:"one original orange-gold voxel cat exploring a decoder-safe route",scanDark:"#7a4515",mid:"#d77b1f",bright:"#f2aa3a",highlight:"#fff0c8",trunk:"#5a341b",ground:"#fff6df",groundAlt:"#d8e8c0",groundEdge:"#7aa47c",sky:["#e0eee8","#f7ddb8"],light:["#fff7df","#ffc46b"],moduleColors:["#6c3b12","#c66d1b","#efa437"]}};function uv(i){return or.includes(i)}const bc=.7,Ce=.75,$o=.1,tr=.105,Jo=1.29,Qo=1,tc=.85,Hs=14.4;function vu(i,t,e){return t+(i-t)*e}const Mu=.07,xu=.09,yu=.08,vn=.38,dv=Ce*vn,Zs=4,fv=33+Zs*2,Su=.6;function Ks(i){if(!Number.isFinite(i)||i<21)throw new Error("R5_KITTY_GRID_SIZE_INVALID");return(i+Zs*2)/fv}const pv="r4-fixed-three-quarter-explore-camera",mv="full-physical-board-top-mask",Mh=.9,to=.46,Me=.4,Jn=.36,Eu=.34,gv=.32,ji=.42,Vs=33,xh=280,di=.4,fi=.5,pi=.45,yh=60,Rr=1,Rn=bc,Gs=1,Kn=1,Ns=Jo*Ce*vn,ec=Qo*Ce*vn,Us=tc*Ce*vn,_v=Hs*Ce*vn,vv=.3,Mv=.45,xv=.375,yv={sakura:{min:di,max:fi,target:pi},summer:{min:di,max:fi,target:pi},maple:{min:di,max:fi,target:pi},ginkgo:{min:di,max:fi,target:pi},snow:{min:di,max:fi,target:pi},sunset:{min:di,max:fi,target:pi},ocean:{min:di,max:fi,target:pi},wanderer:{min:vv,max:Mv,target:xv},kitty:{min:Mu,max:xu,target:yu}},Sv={sakura:15,summer:15,maple:15,ginkgo:15,snow:15,sunset:12,ocean:12,wanderer:20,kitty:60},Ev=Me*1.55,Ss=1.52,bv={sakura:.95,summer:.98,maple:.968,ginkgo:1,snow:1},mi=.32,Sh=.288,Eh=.272,Tv={sakura:27.2,summer:26.4,maple:27.4,ginkgo:25.2,snow:27.2,sunset:28.688,ocean:33,wanderer:34.748*Rn},wv={...Tv,wanderer:26.8*bc,kitty:24.6*Ce*vn};function ur(i){return i/Vs}function nc(i,t){return i==="sunset"?t==="sun-core":i==="ocean"?t==="water":i==="wanderer"?t.startsWith("wanderer-")&&t!=="wanderer-garden":i==="kitty"?t.startsWith("kitty-"):t==="trunk"||t==="branch"||t==="canopy"}const te=i=>Number(i.toFixed(4)),ze=(i,t)=>(i%t+t)%t,bu=(i,t)=>t-(i.size-1)*.5,Tu=(i,t)=>t-(i.size-1)*.5;function wu(i,t,e){const n=(i.size-1)*.5,r=Math.round(t+n),s=Math.round(e+n);return r>=0&&s>=0&&r<i.size&&s<i.size?{column:r,row:s}:null}function Av(i,t,e){return`${Math.round(i*100)},${Math.round(t*100)},${Math.round(e*100)}`}function en(i,t,e,n,r,s,a,o,c={}){const l=i.theme.id==="kitty"?Ks(i.qr.size):ur(i.qr.size),h=c.logicalColumn!==void 0&&c.logicalRow!==void 0?{column:c.logicalColumn,row:c.logicalRow}:wu(i.qr,t*l,n*l);if(!h)return;const u=c.phase??i.random()*Math.PI*2,d={x:t,z:n,baseY:e,scaleX:c.scaleX??Jn,scaleY:c.scaleY??Eu,scaleZ:c.scaleZ??Jn,rotationY:c.rotationY??((h.column+h.row)%2?.028:-.028),phase:u,amplitude:c.amplitude??0,color:new Ut(r),wave:c.wave??!1,semantic:s,column:h.column,row:h.row,cellEdge:Math.max(c.scaleX??Jn,c.scaleZ??Jn),motionLayer:a,motionGroup:c.motionGroup??0,variation:c.variation??1,part:o,treeHeight:c.treeHeight??0,lineageId:c.lineageId??o,parentLineageId:c.parentLineageId??null,lineageDepth:c.lineageDepth??0,restHeightRatio:c.restHeightRatio??(c.treeHeight?yt.clamp(e/c.treeHeight,0,1):0),restRadial:c.restRadial??Math.hypot(t,n)};i.voxels.set(Av(t,e,n),d)}function Au(i,t,e,n,r,s,a,o,c,l,h=0,u={id:c,parentId:null,depth:0,group:0,phase:0,radial:0}){for(let d=0;d<r;d+=1){const f=t*1.613+e*1.931+u.group*.71,g=0,_=Math.sin((d+1)*2.399+f)*g,m=Math.cos((d+1)*2.173+f*.83)*g,p=n+d*gv+Eu*.5,y=s;en(i,t+_,p,e+m,y,a,o,c,{amplitude:l,phase:u.phase+d*.012,rotationY:void 0,motionGroup:u.group,treeHeight:h,lineageId:u.id,parentLineageId:u.parentId,lineageDepth:u.depth,restHeightRatio:h?yt.clamp(p/h,0,1):0,restRadial:u.radial})}}function Es(i,t,e,n,r,s,a){const o=new I(...t.start),c=new I(...t.end),l=c.clone().sub(o),h=l.length();if(h<=.001)return;const u=l.clone().normalize(),d=Math.abs(u.y)>.88?new I(1,0,0):new I(0,1,0),f=new I().crossVectors(u,d).normalize(),g=new I().crossVectors(u,f).normalize(),_=Math.max(1,Math.ceil(h/(Me*.78)));for(let m=0;m<=_;m+=1){const p=m/_,y=o.clone().lerp(c,p),v=yt.lerp(t.startRadius,t.endRadius,p),M=v>1.05?[v,v*.56]:v>.48?[v]:[0];for(const R of M){const T=Math.max(Me,Math.PI*2*Math.max(R,Me*.5)),w=R===0?1:Math.max(6,Math.ceil(T/(Me*.9)));for(let P=0;P<w;P+=1){const x=P/w*Math.PI*2,E=y.clone().addScaledVector(f,Math.cos(x)*R).addScaledVector(g,Math.sin(x)*R),A=s==="anchored"||E.y<=3.8;en(i,E.x,E.y,E.z,n,r,A?"anchored":s,t.id,{amplitude:A?0:s==="primary"?.15:.21,phase:a+t.group*.41+p*.12,rotationY:Math.atan2(u.x,u.z),motionGroup:t.group,treeHeight:e,lineageId:t.id,parentLineageId:t.parentId,lineageDepth:t.depth,restHeightRatio:yt.clamp(E.y/e,0,1),restRadial:Math.hypot(E.x,E.z)})}}v>.48&&en(i,y.x,y.y,y.z,n,r,y.y<=3.8?"anchored":s,t.id,{amplitude:y.y<=3.8?0:s==="primary"?.15:.21,phase:a+t.group*.41+p*.12,rotationY:Math.atan2(u.x,u.z),motionGroup:t.group,treeHeight:e,lineageId:t.id,parentLineageId:t.parentId,lineageDepth:t.depth,restHeightRatio:yt.clamp(y.y/e,0,1),restRadial:Math.hypot(y.x,y.z)})}}function Ru(i,t,e,n,r,s,a,o,c=Me,l=Ev){const h=Math.ceil((t.x-e.x)/c),u=Math.floor((t.x+e.x)/c),d=Math.ceil((t.y-e.y)/c),f=Math.floor((t.y+e.y)/c),g=Math.ceil((t.z-e.z)/c),_=Math.floor((t.z+e.z)/c),m=new I(Math.max(c*.5,e.x-l),Math.max(c*.5,e.y-l),Math.max(c*.5,e.z-l));for(let p=g;p<=_;p+=1){const y=p*c;for(let v=d;v<=f;v+=1){const M=v*c;for(let R=h;R<=u;R+=1){const T=R*c,w=((T-t.x)/e.x)**2+((M-t.y)/e.y)**2+((y-t.z)/e.z)**2;if(w>1||((T-t.x)/m.x)**2+((M-t.y)/m.y)**2+((y-t.z)/m.z)**2<1)continue;const x=typeof n=="function"?n(T,M,y,w):n;en(i,T,M,y,x,r,s,a,o?.(T,M,y))}}}}function Rv(i,t,e,n){if(t==="snow")return;const s=Math.ceil(15.8/Me),a=[i.theme.mid,i.theme.bright,i.theme.highlight];for(let o=-s;o<=s;o+=1){const c=o*Me;for(let l=-s;l<=s;l+=1){const h=l*Me,u=Math.atan2(c,h);let d=1/0,f=1,g=!1,_=0,m=0;if(t==="sakura")d=Math.hypot((h+3.2)/13.35,(c-.3)/12.75),f=1+Math.sin(u*3+.4)*.1+Math.cos(u*5-.7)*.07,g=((h-1.5)/2.5)**2+((c+2.2)/2)**2<1||((h+5.2)/1.55)**2+((c-4.2)/1.9)**2<1,_=15.7+(1-d)*3.4+Math.abs(Math.sin(u*3+.25))*1.9+Math.sin(h*.41+c*.27)*.65+h*.035,m=14.05+(1-d)*.8+Math.abs(Math.cos(u*2-.35))*.42+Math.cos(h*.23-c*.31)*.22;else if(t==="summer")d=Math.hypot((h-.25)/12.9,(c-.1)/12.55),f=1+Math.sin(u*4+.8)*.035+Math.cos(u*7)*.025,_=15.15+(1-d**2)*7.2+Math.sin(h*.33-c*.29)*.45,m=13.35+(1-d**2)*1.5+Math.cos(h*.25+c*.21)*.25;else if(t==="maple"){d=Math.hypot((h+1.6)/13.8,(c-.8)/11),f=1+Math.sin(u*5+.65)*.19+Math.cos(u*3-.4)*.12;const M=ze(u,Math.PI*2);g=d>.48&&M>5.45&&M<6.2,_=15.6+(1-d)*7+Math.sin(u*5)+h*.075,m=13.7+(1-d)*1.35+Math.sin(u*3-.4)*.38+h*.02}else{d=Math.hypot(h/11.95,(c-.15)/15.25),f=1+Math.cos(u*4+.3)*.035;const M=ze(u,Math.PI*2);g=d>.3&&(M>.72&&M<.86||M>1.8&&M<1.94||M>3.55&&M<3.69||M>4.7&&M<4.84)||Math.abs(h+3.6)<.72&&c>-1&&c<8.8||Math.abs(h-3)<.68&&c>1.2&&c<10.2,_=15.1+(1-d)*9.4+Math.cos(h*.35)*.55+c*.025,m=14.2+(1-d)*3.4+Math.cos(u*3)*.35+c*.015}if(d>f||g)continue;const p=ze(Math.floor(ze(u,Math.PI*2)/(Math.PI*2)*e.primary.length),e.primary.length),y=e.primary[p],v={amplitude:t==="summer"?.34:t==="ginkgo"?.26:.3,phase:n+y.group*.43+Math.hypot(h,c)*.027,rotationY:Math.sin(h*1.31+_*.47+c*.83)*.11,motionGroup:y.group,treeHeight:e.height,lineageId:t+"-crown-surface-"+p,parentLineageId:y.id,lineageDepth:3,restHeightRatio:yt.clamp(_/e.height,0,1),restRadial:Math.hypot(h,c)};en(i,h,_,c,a[ze(l*3+o*5,a.length)],"canopy","canopy",t+"-crown-upper-"+p,v),en(i,h,m,c,a[ze(l*3+o*5+1,a.length)],"canopy","canopy",t+"-crown-lower-"+p,{...v,phase:v.phase+.19,rotationY:Math.sin(h*1.07+m*.39+c*.71)*.11,lineageId:t+"-crown-lower-"+p,restHeightRatio:yt.clamp(m/e.height,0,1)})}}}function Cv(i,t){const e=i.theme,n=i.random()*Math.PI*2,s={sakura:{archetype:"irregular-open-umbrella",height:20.4,trunkTop:[.35,11.2,.2],trunkRadius:[1.52,.72],primary:[{id:"sakura-primary-west",parentId:"trunk",start:[.1,7.2,.1],end:[-7.2,13.5,-2.2],startRadius:.8,endRadius:.43,depth:1,group:1},{id:"sakura-primary-east",parentId:"trunk",start:[.2,8,0],end:[7.7,14.1,-.8],startRadius:.76,endRadius:.4,depth:1,group:2},{id:"sakura-primary-north",parentId:"trunk",start:[.25,8.7,.15],end:[-1.8,14.7,7.1],startRadius:.7,endRadius:.38,depth:1,group:3},{id:"sakura-primary-south",parentId:"trunk",start:[.3,9.3,.1],end:[3.5,15,-6.3],startRadius:.66,endRadius:.36,depth:1,group:4}],secondary:[{id:"sakura-secondary-west-tip",parentId:"sakura-primary-west",start:[-4.6,11.2,-1.4],end:[-10.5,15.5,-4],startRadius:.46,endRadius:.28,depth:2,group:1},{id:"sakura-secondary-west-back",parentId:"sakura-primary-west",start:[-5.1,11.8,-1.5],end:[-7.8,15.4,3.5],startRadius:.42,endRadius:.25,depth:2,group:1},{id:"sakura-secondary-east-tip",parentId:"sakura-primary-east",start:[4.7,11.8,-.5],end:[10.2,16,-2.5],startRadius:.44,endRadius:.26,depth:2,group:2},{id:"sakura-secondary-east-front",parentId:"sakura-primary-east",start:[5.1,12.1,-.55],end:[8.3,15.6,4],startRadius:.4,endRadius:.24,depth:2,group:2},{id:"sakura-secondary-north-left",parentId:"sakura-primary-north",start:[-1.1,12.3,4.4],end:[-5.2,16.4,9],startRadius:.4,endRadius:.24,depth:2,group:3},{id:"sakura-secondary-north-tip",parentId:"sakura-primary-north",start:[-1.5,13.4,5.7],end:[1.1,16.2,10],startRadius:.38,endRadius:.23,depth:2,group:3},{id:"sakura-secondary-south-tip",parentId:"sakura-primary-south",start:[2.3,12.6,-4.1],end:[5.7,16.1,-9.2],startRadius:.4,endRadius:.23,depth:2,group:4}],clusters:[{id:"sakura-cluster-inner-west",parentId:"sakura-primary-west",center:[-3,16.9,-1],radius:[7.5,2.1,6.6],group:1},{id:"sakura-cluster-inner-east",parentId:"sakura-primary-east",center:[3.2,17.4,1],radius:[7.2,2,6.3],group:2},{id:"sakura-cluster-inner-north",parentId:"sakura-primary-north",center:[-.4,17.2,5],radius:[6.5,2,5.7],group:3},{id:"sakura-cluster-west-far",parentId:"sakura-secondary-west-tip",center:[-10.2,16.7,-3.9],radius:[3.2,2.35,3.1],group:1},{id:"sakura-cluster-west-open",parentId:"sakura-secondary-west-back",center:[-7.3,17.1,3.5],radius:[3.4,2.15,3.2],group:1},{id:"sakura-cluster-east-far",parentId:"sakura-secondary-east-tip",center:[10,17.1,-2.7],radius:[3.25,2.2,3],group:2},{id:"sakura-cluster-east-front",parentId:"sakura-secondary-east-front",center:[8,16.8,4.2],radius:[3.55,2.3,3.3],group:2},{id:"sakura-cluster-north-left",parentId:"sakura-secondary-north-left",center:[-5,17.4,8.7],radius:[3.35,2.25,3.1],group:3},{id:"sakura-cluster-north-tip",parentId:"sakura-secondary-north-tip",center:[1,17.5,9.5],radius:[3.6,2.15,3.15],group:3},{id:"sakura-cluster-south",parentId:"sakura-secondary-south-tip",center:[5.5,17.2,-8.9],radius:[3.5,2.25,3.2],group:4},{id:"sakura-cluster-high-gap",parentId:"sakura-primary-east",center:[2.6,18.1,1],radius:[3.1,2.1,3],group:5}]},summer:{archetype:"broad-mature-rounded",height:20.8,trunkTop:[-.2,11.7,.35],trunkRadius:[1.72,.82],primary:[{id:"summer-primary-west",parentId:"trunk",start:[-.05,6.8,.1],end:[-8.6,13.2,-1.4],startRadius:.92,endRadius:.48,depth:1,group:1},{id:"summer-primary-east",parentId:"trunk",start:[-.1,7.4,.2],end:[8.8,13.6,1.1],startRadius:.9,endRadius:.47,depth:1,group:2},{id:"summer-primary-north",parentId:"trunk",start:[-.15,8.2,.25],end:[-1.8,14.1,8.5],startRadius:.82,endRadius:.44,depth:1,group:3},{id:"summer-primary-south",parentId:"trunk",start:[-.12,8.8,.2],end:[1.4,14.5,-8.2],startRadius:.78,endRadius:.42,depth:1,group:4},{id:"summer-primary-crown",parentId:"trunk",start:[-.18,9.1,.3],end:[3,16.1,3.4],startRadius:.68,endRadius:.36,depth:1,group:5}],secondary:[{id:"summer-secondary-west-north",parentId:"summer-primary-west",start:[-5.3,10.7,-.8],end:[-11.1,15,3.2],startRadius:.5,endRadius:.28,depth:2,group:1},{id:"summer-secondary-west-south",parentId:"summer-primary-west",start:[-5.8,11,-1],end:[-10.4,14.8,-5.7],startRadius:.47,endRadius:.27,depth:2,group:1},{id:"summer-secondary-east-north",parentId:"summer-primary-east",start:[5.5,11.3,.7],end:[11,15.3,5.1],startRadius:.49,endRadius:.27,depth:2,group:2},{id:"summer-secondary-east-south",parentId:"summer-primary-east",start:[5.8,11.5,.8],end:[10.8,15,-4],startRadius:.46,endRadius:.26,depth:2,group:2},{id:"summer-secondary-north-left",parentId:"summer-primary-north",start:[-1.1,11.8,5.2],end:[-5.5,15.5,10.5],startRadius:.45,endRadius:.26,depth:2,group:3},{id:"summer-secondary-north-tip",parentId:"summer-primary-north",start:[-1.4,12.4,6.1],end:[2.2,15.7,11],startRadius:.43,endRadius:.25,depth:2,group:3},{id:"summer-secondary-south-left",parentId:"summer-primary-south",start:[.8,12.1,-5.1],end:[-4.2,15.2,-10.6],startRadius:.43,endRadius:.25,depth:2,group:4},{id:"summer-secondary-south-tip",parentId:"summer-primary-south",start:[1.1,12.8,-6.1],end:[5.2,15.6,-10.3],startRadius:.41,endRadius:.24,depth:2,group:4}],clusters:[{id:"summer-cluster-center",parentId:"summer-primary-crown",center:[.3,16.2,.4],radius:[8,4,7.4],group:5},{id:"summer-cluster-west-north",parentId:"summer-secondary-west-north",center:[-9,15.8,3],radius:[4.3,3.35,4.2],group:1},{id:"summer-cluster-west-south",parentId:"summer-secondary-west-south",center:[-9.2,15.6,-5.1],radius:[4.2,3.25,4],group:1},{id:"summer-cluster-east-north",parentId:"summer-secondary-east-north",center:[9.2,16,4.6],radius:[4.1,3.35,4],group:2},{id:"summer-cluster-east-south",parentId:"summer-secondary-east-south",center:[9.4,15.7,-3.8],radius:[4.25,3.2,4],group:2},{id:"summer-cluster-north",parentId:"summer-secondary-north-tip",center:[.8,16.4,9.1],radius:[4.8,3.45,4.1],group:3},{id:"summer-cluster-south",parentId:"summer-secondary-south-tip",center:[1.8,16,-8.8],radius:[4.7,3.3,4.2],group:4},{id:"summer-cluster-high",parentId:"summer-primary-crown",center:[3.4,18.1,2.8],radius:[3.8,2.6,3.7],group:5}]},maple:{archetype:"skew-radial-asymmetric",height:21.4,trunkTop:[1.6,12.4,-.55],trunkRadius:[1.55,.72],primary:[{id:"maple-primary-long-west",parentId:"trunk",start:[.5,6.9,-.1],end:[-10.2,14.2,-3.2],startRadius:.86,endRadius:.42,depth:1,group:1},{id:"maple-primary-east-high",parentId:"trunk",start:[.8,8.1,-.2],end:[9,16.1,2.4],startRadius:.74,endRadius:.36,depth:1,group:2},{id:"maple-primary-north",parentId:"trunk",start:[1.05,9,-.35],end:[-2.2,16.3,8.7],startRadius:.7,endRadius:.35,depth:1,group:3},{id:"maple-primary-short-south",parentId:"trunk",start:[1.2,9.6,-.4],end:[4.6,15,-6.2],startRadius:.62,endRadius:.32,depth:1,group:4},{id:"maple-primary-spire",parentId:"trunk",start:[1.3,10.1,-.45],end:[4,19.2,-.2],startRadius:.58,endRadius:.28,depth:1,group:5}],secondary:[{id:"maple-secondary-west-extension",parentId:"maple-primary-long-west",start:[-6.1,11.4,-2],end:[-12.4,16.2,-5.1],startRadius:.46,endRadius:.24,depth:2,group:1},{id:"maple-secondary-west-north",parentId:"maple-primary-long-west",start:[-6.7,11.8,-2.1],end:[-8.4,16.4,4.2],startRadius:.42,endRadius:.23,depth:2,group:1},{id:"maple-secondary-east-tip",parentId:"maple-primary-east-high",start:[5.5,12.7,1.3],end:[11.1,18,5.4],startRadius:.4,endRadius:.22,depth:2,group:2},{id:"maple-secondary-east-gap",parentId:"maple-primary-east-high",start:[5.7,13,1.4],end:[10.4,17.2,-2.6],startRadius:.37,endRadius:.21,depth:2,group:2},{id:"maple-secondary-north-left",parentId:"maple-primary-north",start:[-.8,13.1,5.1],end:[-5.8,17.4,10.2],startRadius:.39,endRadius:.22,depth:2,group:3},{id:"maple-secondary-north-tip",parentId:"maple-primary-north",start:[-1.4,14.4,6.8],end:[1,18,11.1],startRadius:.36,endRadius:.21,depth:2,group:3},{id:"maple-secondary-south-tip",parentId:"maple-primary-short-south",start:[3.2,12.7,-4],end:[7.1,16.9,-9.5],startRadius:.36,endRadius:.2,depth:2,group:4},{id:"maple-secondary-spire-east",parentId:"maple-primary-spire",start:[3,15.8,-.3],end:[7.4,20,1.1],startRadius:.32,endRadius:.19,depth:2,group:5}],clusters:[{id:"maple-cluster-inner-west",parentId:"maple-primary-long-west",center:[-2.8,17.3,-.5],radius:[7.6,2.8,6.5],group:1},{id:"maple-cluster-inner-east",parentId:"maple-primary-east-high",center:[3.6,18,2.3],radius:[6.8,2.6,6],group:2},{id:"maple-cluster-west-extension",parentId:"maple-secondary-west-extension",center:[-10.5,16.9,-4.8],radius:[3.7,2.8,3.3],group:1},{id:"maple-cluster-west-north",parentId:"maple-secondary-west-north",center:[-7.8,17.1,4.1],radius:[3.6,2.7,3.5],group:1},{id:"maple-cluster-east-high",parentId:"maple-secondary-east-tip",center:[9.6,18.1,5],radius:[3.55,2.75,3.4],group:2},{id:"maple-cluster-east-lower",parentId:"maple-secondary-east-gap",center:[9.2,17.1,-2.5],radius:[3.5,2.55,3.2],group:2},{id:"maple-cluster-north-left",parentId:"maple-secondary-north-left",center:[-5.1,18,9.1],radius:[3.45,2.75,3.4],group:3},{id:"maple-cluster-north-tip",parentId:"maple-secondary-north-tip",center:[.8,18.6,9.8],radius:[3.2,2.6,3.25],group:3},{id:"maple-cluster-south",parentId:"maple-secondary-south-tip",center:[6.7,17.2,-8.4],radius:[3.6,2.65,3.5],group:4},{id:"maple-cluster-spire",parentId:"maple-secondary-spire-east",center:[6.3,19.3,.8],radius:[3.1,2.55,3.05],group:5}]},ginkgo:{archetype:"upright-open-fan",height:22.6,trunkTop:[.2,14.8,0],trunkRadius:[1.38,.58],primary:[{id:"ginkgo-primary-left",parentId:"trunk",start:[.05,8,0],end:[-6.8,18.2,-1.5],startRadius:.64,endRadius:.3,depth:1,group:1},{id:"ginkgo-primary-right",parentId:"trunk",start:[.1,8.8,0],end:[6.5,18.7,1.1],startRadius:.62,endRadius:.29,depth:1,group:2},{id:"ginkgo-primary-back",parentId:"trunk",start:[.1,9.7,0],end:[-1.5,19.5,6.7],startRadius:.58,endRadius:.27,depth:1,group:3},{id:"ginkgo-primary-front",parentId:"trunk",start:[.15,10.5,0],end:[2.2,19.8,-6.4],startRadius:.54,endRadius:.26,depth:1,group:4},{id:"ginkgo-primary-spire",parentId:"trunk",start:[.18,11.2,0],end:[.8,22,.6],startRadius:.5,endRadius:.24,depth:1,group:5}],secondary:[{id:"ginkgo-secondary-left-fan",parentId:"ginkgo-primary-left",start:[-3.9,13.9,-.9],end:[-9.2,21,-3.6],startRadius:.34,endRadius:.19,depth:2,group:1},{id:"ginkgo-secondary-left-back",parentId:"ginkgo-primary-left",start:[-4.2,14.4,-.9],end:[-7.6,21.1,3.8],startRadius:.32,endRadius:.18,depth:2,group:1},{id:"ginkgo-secondary-right-fan",parentId:"ginkgo-primary-right",start:[3.8,14.6,.7],end:[9,21.4,4],startRadius:.33,endRadius:.19,depth:2,group:2},{id:"ginkgo-secondary-right-front",parentId:"ginkgo-primary-right",start:[4,14.9,.7],end:[7.8,21.2,-3.8],startRadius:.31,endRadius:.18,depth:2,group:2},{id:"ginkgo-secondary-back-tip",parentId:"ginkgo-primary-back",start:[-.9,15.5,4.1],end:[-4.2,22,8.8],startRadius:.3,endRadius:.18,depth:2,group:3},{id:"ginkgo-secondary-front-tip",parentId:"ginkgo-primary-front",start:[1.4,15.7,-4],end:[4.6,22.1,-8.5],startRadius:.3,endRadius:.18,depth:2,group:4},{id:"ginkgo-secondary-spire-left",parentId:"ginkgo-primary-spire",start:[.55,17.5,.35],end:[-3.3,22.4,.8],startRadius:.28,endRadius:.17,depth:2,group:5}],clusters:[{id:"ginkgo-cluster-inner-fan",parentId:"ginkgo-primary-spire",center:[0,21.4,0],radius:[9,5,7.5],group:5},{id:"ginkgo-cluster-inner-left",parentId:"ginkgo-primary-left",center:[-3.7,20.5,-.6],radius:[5.5,4.4,6],group:1},{id:"ginkgo-cluster-inner-right",parentId:"ginkgo-primary-right",center:[3.8,20.8,.8],radius:[5.4,4.5,5.9],group:2},{id:"ginkgo-cluster-left-outer",parentId:"ginkgo-secondary-left-fan",center:[-8.6,20.8,-3.3],radius:[3.2,3.4,3.3],group:1},{id:"ginkgo-cluster-left-back",parentId:"ginkgo-secondary-left-back",center:[-7,20.9,3.5],radius:[3.1,3.5,3.2],group:1},{id:"ginkgo-cluster-right-outer",parentId:"ginkgo-secondary-right-fan",center:[8.3,21.1,3.6],radius:[3.1,3.5,3.2],group:2},{id:"ginkgo-cluster-right-front",parentId:"ginkgo-secondary-right-front",center:[7.2,20.9,-3.5],radius:[3.05,3.45,3.1],group:2},{id:"ginkgo-cluster-back",parentId:"ginkgo-secondary-back-tip",center:[-3.7,21.5,7.8],radius:[3.2,3.35,3.1],group:3},{id:"ginkgo-cluster-front",parentId:"ginkgo-secondary-front-tip",center:[4.1,21.6,-7.5],radius:[3.1,3.3,3.05],group:4},{id:"ginkgo-cluster-spire-left",parentId:"ginkgo-secondary-spire-left",center:[-2.8,22.2,.7],radius:[2.8,3.2,2.9],group:5},{id:"ginkgo-cluster-spire-right",parentId:"ginkgo-primary-spire",center:[2.5,22.5,.2],radius:[2.75,3.05,2.8],group:5}]},snow:{archetype:"tiered-snow-conifer",height:23.8,trunkTop:[0,23,0],trunkRadius:[1.42,.42],primary:[{id:"snow-primary-lower-east",parentId:"trunk",start:[0,6.4,0],end:[11.2,5.7,1.2],startRadius:.62,endRadius:.28,depth:1,group:1},{id:"snow-primary-lower-west",parentId:"trunk",start:[0,6.7,0],end:[-11.5,5.9,-1],startRadius:.62,endRadius:.28,depth:1,group:2},{id:"snow-primary-lower-north",parentId:"trunk",start:[0,7,0],end:[-1.2,6.1,11.1],startRadius:.6,endRadius:.27,depth:1,group:3},{id:"snow-primary-lower-south",parentId:"trunk",start:[0,7.3,0],end:[1,6.3,-10.8],startRadius:.59,endRadius:.27,depth:1,group:4},{id:"snow-primary-mid-east",parentId:"trunk",start:[0,11,0],end:[8.8,10.4,-.8],startRadius:.52,endRadius:.25,depth:1,group:5},{id:"snow-primary-mid-west",parentId:"trunk",start:[0,11.3,0],end:[-8.5,10.6,1.2],startRadius:.51,endRadius:.24,depth:1,group:6},{id:"snow-primary-mid-north",parentId:"trunk",start:[0,11.6,0],end:[.7,10.8,8.4],startRadius:.5,endRadius:.24,depth:1,group:7},{id:"snow-primary-mid-south",parentId:"trunk",start:[0,11.9,0],end:[-.8,11,-8.1],startRadius:.49,endRadius:.23,depth:1,group:8},{id:"snow-primary-upper-east",parentId:"trunk",start:[0,15.7,0],end:[5.8,15.1,.7],startRadius:.42,endRadius:.21,depth:1,group:9},{id:"snow-primary-upper-west",parentId:"trunk",start:[0,16,0],end:[-5.5,15.4,-.6],startRadius:.41,endRadius:.2,depth:1,group:10},{id:"snow-primary-upper-north",parentId:"trunk",start:[0,16.3,0],end:[-.4,15.7,5.4],startRadius:.4,endRadius:.2,depth:1,group:11},{id:"snow-primary-upper-south",parentId:"trunk",start:[0,16.6,0],end:[.5,16,-5.1],startRadius:.39,endRadius:.19,depth:1,group:12}],secondary:[{id:"snow-secondary-lower-east",parentId:"snow-primary-lower-east",start:[6.2,6,.7],end:[12.8,4.9,4],startRadius:.31,endRadius:.17,depth:2,group:1},{id:"snow-secondary-lower-east-opposed",parentId:"snow-primary-lower-east",start:[6.1,6.05,.65],end:[12.5,5,-4],startRadius:.3,endRadius:.17,depth:2,group:1},{id:"snow-secondary-lower-west",parentId:"snow-primary-lower-west",start:[-6.4,6.25,-.55],end:[-12.5,5.1,-4.2],startRadius:.31,endRadius:.17,depth:2,group:2},{id:"snow-secondary-lower-west-opposed",parentId:"snow-primary-lower-west",start:[-6.3,6.3,-.5],end:[-12.3,5.2,4.1],startRadius:.3,endRadius:.17,depth:2,group:2},{id:"snow-secondary-lower-north",parentId:"snow-primary-lower-north",start:[-.7,6.5,6.2],end:[3.8,5.1,12.4],startRadius:.3,endRadius:.17,depth:2,group:3},{id:"snow-secondary-lower-north-opposed",parentId:"snow-primary-lower-north",start:[-.65,6.55,6.1],end:[-4,5.2,12.2],startRadius:.29,endRadius:.17,depth:2,group:3},{id:"snow-secondary-lower-south",parentId:"snow-primary-lower-south",start:[.55,6.75,-6],end:[-3.5,5.3,-12],startRadius:.3,endRadius:.17,depth:2,group:4},{id:"snow-secondary-lower-south-opposed",parentId:"snow-primary-lower-south",start:[.5,6.8,-5.9],end:[3.8,5.35,-12],startRadius:.29,endRadius:.17,depth:2,group:4},{id:"snow-secondary-mid-east",parentId:"snow-primary-mid-east",start:[5,10.65,-.45],end:[9.8,9.6,3],startRadius:.27,endRadius:.16,depth:2,group:5},{id:"snow-secondary-mid-west",parentId:"snow-primary-mid-west",start:[-4.8,10.9,.7],end:[-9.6,9.9,-2.8],startRadius:.27,endRadius:.16,depth:2,group:6},{id:"snow-secondary-mid-north",parentId:"snow-primary-mid-north",start:[.4,11.15,4.8],end:[-3,10.1,9.3],startRadius:.26,endRadius:.15,depth:2,group:7},{id:"snow-secondary-mid-south",parentId:"snow-primary-mid-south",start:[-.45,11.4,-4.6],end:[3.1,10.35,-9],startRadius:.26,endRadius:.15,depth:2,group:8},{id:"snow-secondary-upper-east",parentId:"snow-primary-upper-east",start:[3.3,15.35,.4],end:[6.4,14.6,-2],startRadius:.23,endRadius:.14,depth:2,group:9},{id:"snow-secondary-upper-west",parentId:"snow-primary-upper-west",start:[-3.1,15.65,-.35],end:[-6.2,14.9,2],startRadius:.23,endRadius:.14,depth:2,group:10},{id:"snow-secondary-upper-north",parentId:"snow-primary-upper-north",start:[-.25,15.95,3],end:[1.9,15.2,5.9],startRadius:.22,endRadius:.14,depth:2,group:11},{id:"snow-secondary-upper-south",parentId:"snow-primary-upper-south",start:[.3,16.25,-2.9],end:[-1.8,15.45,-5.7],startRadius:.22,endRadius:.14,depth:2,group:12}],clusters:[{id:"snow-load-lower-east-mid",parentId:"snow-primary-lower-east",center:[6.4,6.35,.8],radius:[4.1,1.45,2.7],group:1,snow:!0},{id:"snow-load-lower-east-tip",parentId:"snow-secondary-lower-east",center:[11,5.7,2.7],radius:[2.8,1.25,2.4],group:1,snow:!0},{id:"snow-load-lower-east-opposed",parentId:"snow-secondary-lower-east-opposed",center:[10.8,5.8,-2.7],radius:[2.8,1.25,2.4],group:1,snow:!0},{id:"snow-load-lower-west-mid",parentId:"snow-primary-lower-west",center:[-6.5,6.55,-.6],radius:[4.2,1.5,2.7],group:2,snow:!0},{id:"snow-load-lower-west-tip",parentId:"snow-secondary-lower-west",center:[-10.8,5.85,-2.8],radius:[2.8,1.25,2.4],group:2,snow:!0},{id:"snow-load-lower-west-opposed",parentId:"snow-secondary-lower-west-opposed",center:[-10.6,5.95,2.8],radius:[2.8,1.25,2.4],group:2,snow:!0},{id:"snow-load-lower-north",parentId:"snow-secondary-lower-north",center:[1.3,6,9.5],radius:[2.7,1.35,4],group:3,snow:!0},{id:"snow-load-lower-north-opposed",parentId:"snow-secondary-lower-north-opposed",center:[-2.6,6.05,9.4],radius:[2.7,1.35,4],group:3,snow:!0},{id:"snow-load-lower-south",parentId:"snow-secondary-lower-south",center:[-1.1,6.2,-9.2],radius:[2.7,1.35,3.9],group:4,snow:!0},{id:"snow-load-lower-south-opposed",parentId:"snow-secondary-lower-south-opposed",center:[2.5,6.25,-9.2],radius:[2.7,1.35,3.9],group:4,snow:!0},{id:"snow-load-mid-east",parentId:"snow-secondary-mid-east",center:[7.3,10.6,1],radius:[3.45,1.4,2.6],group:5,snow:!0},{id:"snow-load-mid-west",parentId:"snow-secondary-mid-west",center:[-7.1,10.85,-.7],radius:[3.4,1.4,2.6],group:6,snow:!0},{id:"snow-load-mid-north",parentId:"snow-secondary-mid-north",center:[-1.1,10.95,7],radius:[2.55,1.4,3.4],group:7,snow:!0},{id:"snow-load-mid-south",parentId:"snow-secondary-mid-south",center:[1.1,11.15,-6.8],radius:[2.55,1.4,3.35],group:8,snow:!0},{id:"snow-load-upper-east",parentId:"snow-secondary-upper-east",center:[4.7,15.45,-.7],radius:[2.7,1.35,2.1],group:9,snow:!0},{id:"snow-load-upper-west",parentId:"snow-secondary-upper-west",center:[-4.5,15.7,.7],radius:[2.65,1.35,2.1],group:10,snow:!0},{id:"snow-load-upper-north",parentId:"snow-secondary-upper-north",center:[.7,15.95,4.4],radius:[2.05,1.35,2.65],group:11,snow:!0},{id:"snow-load-upper-south",parentId:"snow-secondary-upper-south",center:[-.7,16.15,-4.2],radius:[2,1.35,2.6],group:12,snow:!0},{id:"snow-load-crown",parentId:"trunk",center:[0,19.2,0],radius:[3.4,3.1,3.25],group:13,snow:!0},{id:"snow-load-spire",parentId:"trunk",center:[.15,22,-.1],radius:[1.85,2.2,1.8],group:14,snow:!0}]}}[t],a=s.height,o=4.25/s.trunkTop[1],c=[s.trunkTop[0]*o,4.25,s.trunkTop[2]*o];Es(i,{id:"trunk-base",parentId:null,start:[0,.45,0],end:c,startRadius:s.trunkRadius[0],endRadius:s.trunkRadius[0]*.86,depth:0,group:0},a,e.trunk,"trunk","anchored",n),Es(i,{id:"trunk",parentId:"trunk-base",start:c,end:s.trunkTop,startRadius:s.trunkRadius[0]*.9,endRadius:s.trunkRadius[1],depth:0,group:0},a,e.trunk,"trunk","primary",n),s.primary.forEach(d=>Es(i,d,a,e.trunk,"branch","primary",n)),s.secondary.forEach(d=>Es(i,d,a,e.trunk,"branch","secondary",n));const l=[e.mid,e.bright,e.highlight];s.clusters.forEach((d,f)=>{const g=new I(...d.radius);t==="snow"&&d.snow&&(g.x*=Ss,g.z*=Ss),Ru(i,new I(...d.center),g,(_,m,p)=>d.snow?ze(Math.round(_/Me)+Math.round(p/Me)+f,4)===0?e.highlight:e.bright:l[ze(Math.round(_/Me)*3+Math.round(p/Me)*5+Math.round(m/Me)+f,l.length)],"canopy","canopy",d.id,(_,m,p)=>({amplitude:t==="summer"?.34:t==="ginkgo"?.26:.3,phase:n+d.group*.43+Math.hypot(_,p)*.027,rotationY:Math.sin(_*1.31+m*.47+p*.83)*.11,motionGroup:d.group,treeHeight:a,lineageId:d.id,parentLineageId:d.parentId,lineageDepth:3,restHeightRatio:yt.clamp(m/a,0,1),restRadial:Math.hypot(_,p)}))}),Rv(i,t,s,n);const h=bv[t];h!==1&&i.voxels.forEach(d=>{d.x*=h,d.z*=h,d.baseY*=h,d.scaleX*=h,d.scaleY*=h,d.scaleZ*=h,d.cellEdge*=h,d.amplitude*=h,d.treeHeight*=h,d.restRadial*=h});const u=Math.max(...s.clusters.flatMap(d=>[Math.abs(d.center[0])+d.radius[0]*(t==="snow"&&d.snow?Ss:1),Math.abs(d.center[2])+d.radius[2]*(t==="snow"&&d.snow?Ss:1)]))*h;qr(i,t,u)}function Pv(i){const t=i.theme,e=new I(0,24.2,0),n=13,r=ur(i.qr.size);Ru(i,e,new I(n,n,n),(l,h,u)=>{const d=wu(i.qr,l*r,u*r);return d&&i.qr.matrix[d.row][d.column]?t.mid:t.highlight},"sun-core","sun","sun-core",(l,h,u)=>({amplitude:.024,phase:(l-e.x)*.21+(h-e.y)*.13+(u-e.z)*.17,motionGroup:ze(Math.round(l/Me)+Math.round(u/Me),7),scaleX:Sh,scaleY:Eh,scaleZ:Sh}),mi,mi*1.55);const s=12.8,a=Math.ceil(s/mi);for(let l=-a;l<=a;l+=1){const h=l*mi;for(let u=-a;u<=a;u+=1){const d=u*mi;Math.hypot(d,h)>s||en(i,d,e.y,h,t.bright,"sun-core","sun","sun-core-equatorial-fill",{amplitude:.024,phase:d*.21+h*.17,motionGroup:ze(u+l,7),scaleX:mi*.98,scaleY:Eh,scaleZ:mi*.98})}}const o=Math.min(Math.floor(i.qr.size*.42),16),c=Math.ceil(o/Me);for(let l=-c;l<=c;l+=1){const h=l*Me,u=7+(Math.abs(l)%8===0?Me:0);Au(i,h,u,.24,2+(Math.abs(l)%10===0?2:0),l%2?t.mid:t.trunk,"sun-support","support","horizon",.012)}qr(i,"sunset",n)}function Ws(i,t){const e=i.x,n=i.z,r=i.variation,s=.72+.28*Math.sin(e*.105-n*.071-t*.41+i.phase*.17),a=Math.sin(e*.34+n*.085-t*.82+i.phase*.08)*.36*r*s,o=Math.sin(e*.72+n*.19-t*1.37+i.phase*.31),c=(Math.pow(Math.max(0,(o+1)*.5),3.2)-.19)*.38*(.75+r*.25),l=Math.sin(e*1.61-n*.57-t*2.23+i.phase)*.085*(.7+r*.3);return .92+a+c+l}function Iv(i){const t=i.theme,e=ur(i.qr.size),n=[-.32,0,.32];for(let r=0;r<i.qr.size;r+=1)for(let s=0;s<i.qr.size;s+=1){const a=(s+.5)/i.qr.size*2-1,o=(r+.5)/i.qr.size*2-1,c=Math.sin(a*Math.PI*.86)*.17-a*.055,l=.42+Math.cos(a*Math.PI)*.045,h=Math.abs(o-c)<=l;for(const u of n)for(const d of n){const f=(bu(i.qr,s)+d)/e,g=(Tu(i.qr,r)+u)/e,_=h?.82+i.random()*.94:.24+i.random()*.56;en(i,f,.7,g,h?t.bright:t.mid,h?"water":"water-support","water",h?"main-wave-tile":"water-support-tile",{scaleX:Jn/e,scaleY:1,scaleZ:Jn/e,rotationY:0,wave:!0,variation:_,phase:i.random()*Math.PI*2,motionGroup:ze(s*2+r*3+(d>0?1:0),11),logicalColumn:s,logicalRow:r})}}qr(i,"ocean",Math.floor(i.qr.size*.46))}function Dv(i){const t="#7651a8",e="#a883d4",n="#2f2850",r="#f7e9cb",s="#a7f0cf",a="#ffd45c",o=(l,h,u,d,f,g,_,m,p,y,v=0)=>en(i,l,h,u,d,f,g,_,{scaleX:m,scaleY:p,scaleZ:y,rotationY:v});o(0,16.7,0,t,"wanderer-hood","wanderer-head","head-core",14.2,11.8,15.8),o(-4.7,15.6,2.2,t,"wanderer-hood","wanderer-head","head-cheek-left",5.4,7.4,7.2),o(4.7,15.6,2.2,t,"wanderer-hood","wanderer-head","head-cheek-right",5.4,7.4,7.2),o(0,21.2,-.3,t,"wanderer-hood","wanderer-head","head-crown",10.8,5.2,9.6),o(-4.1,23.75,-.5,t,"wanderer-ear","wanderer-ear","ear-left",3.2,5.2,3.8),o(4.1,23.75,-.5,t,"wanderer-ear","wanderer-ear","ear-right",3.2,5.2,3.8),o(-4.1,23.9,1.5,r,"wanderer-ear","wanderer-ear","ear-inner-left",1.25,2.7,.7),o(4.1,23.9,1.5,s,"wanderer-ear","wanderer-ear","ear-inner-right",1.25,2.7,.7),o(-3.15,17.5,8.35,r,"wanderer-face","wanderer-head","eye-pad-left",3.35,3.2,1.1),o(3.15,17.5,8.35,r,"wanderer-face","wanderer-head","eye-pad-right",3.35,3.2,1.1),o(-3.15,17.75,9.05,a,"wanderer-eye","wanderer-eye","eye-left",1.3,1.65,.62),o(3.15,17.75,9.05,a,"wanderer-eye","wanderer-eye","eye-right",1.3,1.65,.62),o(0,15.85,8.75,s,"wanderer-nose","wanderer-head","nose",.8,.65,.62),o(0,14.85,8.68,n,"wanderer-mouth","wanderer-head","mouth",1.05,.3,.5),o(0,6.8,-.6,t,"wanderer-body","wanderer-body","body",8.2,9.6,7.6),o(0,6.6,3.6,r,"wanderer-body","wanderer-body","belly",5.2,5.6,1.4),o(-5.5,7.1,.35,t,"wanderer-arm","wanderer-body","shoulder-left",3.2,4.2,3.5),o(5.5,7.1,.35,t,"wanderer-arm","wanderer-body","shoulder-right",3.2,4.2,3.5),o(-8.25,6.9,.55,r,"wanderer-arm","wanderer-body","arm-left",3,5.2,4.1),o(8.25,6.9,.55,r,"wanderer-arm","wanderer-body","arm-right",3,5.2,4.1),o(-3.2,1.05,3.1,n,"wanderer-foot","anchored","foot-left",5.2,1.9,5.1),o(3.2,1.05,3.1,n,"wanderer-foot","anchored","foot-right",5.2,1.9,5.1),o(0,10,-5.2,s,"wanderer-scarf","wanderer-head","scarf-loop-back",10,1.2,1.4),o(-5,10.1,0,s,"wanderer-scarf","wanderer-head","scarf-loop-left",1.6,1.2,9.2),o(5,10,0,s,"wanderer-scarf","wanderer-head","scarf-loop-right",1.6,1.2,9.2),o(-2.5,10.15,4,s,"wanderer-scarf","wanderer-head","scarf-loop-front-left",5,1.2,1.4),o(2.5,10.05,4,s,"wanderer-scarf","wanderer-head","scarf-loop-front-right",5,1.2,1.4),o(5.4,9.4,4.8,s,"wanderer-scarf","wanderer-head","scarf-knot-side-front",2.2,2,2.2,-.18),o(6.2,8.5,5.7,s,"wanderer-scarf","wanderer-scarf","scarf-tail-short-forward",1.8,2.2,1.6,-.48),o(6,6.8,4.2,s,"wanderer-scarf","wanderer-scarf","scarf-tail-long-side",1.8,4.6,2,.16),o(0,7.9,-5.3,n,"wanderer-pack","wanderer-pack","backpack",7.1,6.4,2.4),o(0,7.8,-6.7,s,"wanderer-seam","wanderer-pack","back-seam",.65,3.9,.55),o(0,9.3,-6.75,a,"wanderer-seam","wanderer-pack","pack-buckle",2.1,1.15,.58),[[-5,-2],[5,-1.5],[-4.5,4],[4.5,3.5]].forEach(([l,h],u)=>{Au(i,l,h,.4,2+u%2,u%2?e:s,"wanderer-garden","support",`garden-accent-${u}`,.018)}),i.voxels.forEach(l=>{const h=nc("wanderer",l.semantic);h&&(l.z*=Gs,l.scaleZ*=Gs);const u=Rr*(h?Rn:1);l.x*=u,l.z*=u,l.baseY=h?vu(l.baseY*Rr,$o,Rn):l.baseY*Rr,l.scaleX*=u,l.scaleY*=u,l.scaleZ*=u,l.cellEdge*=u}),qr(i,"wanderer",12*Rr)}function Lv(i){const t="#e69a2e",e="#f6c453",n="#fff0cf",r="#402818",s="#ef9ca3",a=(l,h,u,d,f,g,_,m,p,y,v=0)=>en(i,l,h,u,d,f,g,_,{scaleX:m,scaleY:p,scaleZ:y,rotationY:v});a(0,8.5,.3,t,"kitty-head","kitty-head","head-core",9.6,7.2,8.8),a(-3.9,8.1,1,t,"kitty-head","kitty-head","head-cheek-left",2,5.1,3.8),a(3.9,8.1,1,e,"kitty-head","kitty-head","head-cheek-right",2,5.1,3.8),a(0,4.5,-1.55,e,"kitty-body","kitty-body","body",6.8,5.5,6),a(-1,4.25,-5.1,t,"kitty-body","kitty-body","haunch-left",1.4,3.2,.65),a(1,4.25,-5.1,e,"kitty-body","kitty-body","haunch-right",1.4,3.2,.65),a(-4.65,12.45,-.2,t,"kitty-ear","kitty-ear","ear-left",2.2,4.2,2.1),a(4.65,12.45,-.2,e,"kitty-ear","kitty-ear","ear-right",2.2,4.2,2.1),a(-4.65,12.55,1.05,s,"kitty-ear","kitty-ear","ear-inner-left",.85,2.1,.42),a(4.65,12.55,1.05,s,"kitty-ear","kitty-ear","ear-inner-right",.85,2.1,.42),a(-.9,7.65,4.9,n,"kitty-muzzle","kitty-head","muzzle-left",1.55,1.55,.8),a(.9,7.65,4.9,n,"kitty-muzzle","kitty-head","muzzle-right",1.55,1.55,.8),a(-2.25,9.25,5.05,r,"kitty-eye","kitty-eye","eye-left",1.25,1.65,.62),a(2.25,9.25,5.05,r,"kitty-eye","kitty-eye","eye-right",1.25,1.65,.62),a(0,7.9,5.48,s,"kitty-nose","kitty-head","nose",.58,.52,.42),a(-4.35,7.85,4.85,n,"kitty-whisker","kitty-head","whisker-left-upper",1.7,.22,.25,-.2),a(-4.35,7.25,4.75,n,"kitty-whisker","kitty-head","whisker-left-lower",1.7,.22,.25,.16),a(4.35,7.85,4.85,n,"kitty-whisker","kitty-head","whisker-right-upper",1.7,.22,.25,.2),a(4.35,7.25,4.75,n,"kitty-whisker","kitty-head","whisker-right-lower",1.7,.22,.25,-.16),[[-2.35,1.9,1.35,"front-left"],[2.35,1.9,1.35,"front-right"],[-2.35,1.9,-3.6,"back-left"],[2.35,1.9,-3.6,"back-right"]].forEach(([l,h,u,d])=>{const f=d.includes("right")?e:t;en(i,l,h,u,f,"kitty-leg","kitty-leg",`leg-${d}`,{scaleX:1.4,scaleY:2.6,scaleZ:1.45,rotationY:0}),en(i,l,.58,u+.28,n,"kitty-foot","kitty-leg",`foot-${d}`,{scaleX:1.8,scaleY:.95,scaleZ:2,rotationY:0})}),[[3.2,5.4,-5.4,1.7,3.6],[4.7,7.85,-6,1.8,3.6],[6.2,10.3,-6.4,1.9,3.7],[7.7,12.7,-6.1,2,3.7],[9.1,14.9,-5.4,2.1,3.8]].forEach(([l,h,u,d,f],g)=>{a(l,h,u,g%2?e:t,"kitty-tail","kitty-tail",`tail-${g}`,d,f,d)}),i.voxels.forEach(l=>{l.semantic.startsWith("kitty-")&&(l.x*=Kn*Ns,l.baseY=vu(l.baseY*Kn,tr,ec),l.z*=Kn*Us,l.scaleX*=Kn*Ns,l.scaleY*=Kn*ec,l.scaleZ*=Kn*Us,l.cellEdge*=Kn*Math.max(Ns,Us))}),qr(i,"kitty",4.2)}function qr(i,t,e){const n={sakura:"petal",summer:"warm-mote",maple:"maple-leaf",ginkgo:"ginkgo-fan",snow:"snowflake",sunset:"sun-mote",ocean:"foam",wanderer:"mint-mote",kitty:"gold-mote"},r=t==="sunset"?44:t==="ocean"?72:t==="wanderer"?64:t==="kitty"?36:84;for(let s=0;s<r;s+=1){const a=t==="ocean"?Vs*.44:e*1.35,o=new I((i.random()-.5)*a*2,1+i.random()*(t==="ocean"?2.8:t==="wanderer"?8:t==="kitty"?6:8.8),(i.random()-.5)*(t==="ocean"?8:a*1.15)),c=n[t],l=c==="snowflake"?.5:c==="warm-mote"||c==="mint-mote"||c==="gold-mote"?.32:.55,h=c==="snowflake"?8.2+i.random()*2.8:c==="ginkgo-fan"||c==="maple-leaf"?6.8+i.random()*2.4:5.8+i.random()*2.2,u=i.random()*Math.PI*2,d=l*(.65+i.random()*.75),f=c==="maple-leaf"||c==="ginkgo-fan"?.38:1,g=.7+i.random()*.8,_=.02/(t==="kitty"?Ks(i.qr.size):ur(i.qr.size)),m=_+d*f*.5+.002,p=Math.max(0,o.y-m),y=Math.max(g,p/7.8),v=p/y,M=.5+i.random(),T=c==="petal"||c==="warm-mote"||c==="maple-leaf"||c==="ginkgo-fan"||c==="snowflake"||c==="sun-mote"?v+M:h;i.particles.push({id:`${c}-${s}`,origin:o,phase:u,scale:d,scaleY:f,scaleZ:c==="foam"?1.8:c==="petal"?.48:1,speed:y,drift:(i.random()-.5)*1.2,kind:c,lifetime:T,recycleGap:.72+i.random()*.7,fallDistance:p,fallDuration:v,settleDuration:M,boardSurfaceY:_,contactY:m,cellEdge:l})}}function Nv(i){const t=[...i.voxels.values()],e=ur(i.qr.size),n=new Map;t.forEach((a,o)=>{if(a.semantic.startsWith("kitty-")||a.semantic==="wanderer-garden")return;const c=`${Math.round(a.x*100)},${Math.round(a.z*100)}`,l=a.baseY+a.scaleY*.5,h=n.get(c);(!h||l>h.top)&&n.set(c,{index:o,top:l})});const r=[],s=[];return n.forEach(({index:a})=>{const o=t[a],c=Math.abs(Math.cos(o.rotationY)),l=Math.abs(Math.sin(o.rotationY)),h=(o.scaleX*c+o.scaleZ*l)*.5,u=(o.scaleX*l+o.scaleZ*c)*.5,d=(o.x-h)*e,f=(o.x+h)*e,g=(o.z-u)*e,_=(o.z+u)*e,m=yt.clamp(Math.floor(d+i.qr.size*.5),0,i.qr.size-1),p=yt.clamp(Math.floor(f-1e-6+i.qr.size*.5),0,i.qr.size-1),y=yt.clamp(Math.floor(g+i.qr.size*.5),0,i.qr.size-1),v=yt.clamp(Math.floor(_-1e-6+i.qr.size*.5),0,i.qr.size-1);for(let M=y;M<=v;M+=1){const R=M-i.qr.size*.5,T=R+1,w=Math.max(g,R),P=Math.min(_,T);for(let x=m;x<=p;x+=1){const E=x-i.qr.size*.5,A=E+1,L=Math.max(d,E),N=Math.min(f,A);if(N<=L||P<=w)continue;const F=(L+N)*.5/e,V=(w+P)*.5/e,B={sourceBodyIndex:a,scaleX:(N-L)/e/1.01,scaleZ:(P-w)/e/1.01,offsetX:F-o.x,offsetZ:V-o.z,scanX:bu(i.qr,x)/e,scanZ:Tu(i.qr,M)/e,scanScaleX:.995/e/1.01,scanScaleZ:.995/e/1.01};(i.qr.matrix[M][x]?r:s).push(B)}}}),{bodies:t,darkCaps:r,lightCaps:s,particles:i.particles}}function Uv(i,t,e){const n={qr:i,theme:Qe[t],random:e,voxels:new Map,particles:[]};return t==="sunset"?Pv(n):t==="ocean"?Iv(n):t==="wanderer"?Dv(n):t==="kitty"?Lv(n):Cv(n,t),Nv(n)}function Er(i,t,e,n=0){const r=ze(i+n,t);if(r>e)return 0;const s=r/e;return Math.sin(s*Math.PI)**2}function br(i,t,e,n,r){let s=i.x,a=i.baseY,o=i.z,c=i.scaleX,l=i.scaleY,h=i.scaleZ,u=0,d=i.rotationY,f=0,g=0;if(i.motionLayer==="water")l=Ws(i,e),a=.24+l*.5,g=Math.max(0,Math.sin(i.x*.72+i.z*.19-e*1.37+i.phase*.31))**3*.72;else if(i.motionLayer==="sun"){const _=Math.sin(e*.72+i.phase*.08);a+=_*i.amplitude*n;const m=1+_*.008*n;c*=m,l*=m,h*=m,g=(_+1)*.12}else if(t==="kitty"){const _=r??{x:0,z:0,heading:0,gaitPhase:0,headYaw:0,tailAngle:Math.sin(e*2.1+.4)*.22,moving:!1},m=Math.cos(_.heading),p=Math.sin(_.heading),y=yt.clamp(n,0,1);let v=s,M=o;if(i.motionLayer==="kitty-head"||i.motionLayer==="kitty-eye"||i.motionLayer==="kitty-ear"){const R=_.headYaw*y,T=Math.cos(R),w=Math.sin(R),P=.45*vn,x=M-P,E=v*T+x*w,A=-v*w+x*T+P;v=E,M=A,d+=R}if(s=v*m+M*p+_.x,o=-v*p+M*m+_.z,d+=_.heading,i.motionLayer==="kitty-body"){const R=Math.sin(e*2.15+i.phase*.04)*.028*y;c*=1-R*.18,l*=1+R}if(i.motionLayer==="kitty-eye"){const R=Er(e,4.9,.18,i.part.includes("left")?0:.012);l*=1-R*.82*y}if(i.motionLayer==="kitty-ear"){const R=i.part.includes("left")?-1:1,T=Er(e,i.part.includes("left")?6.7:7.9,.34,R<0?.3:2.6);f+=R*T*.16*y}if(i.motionLayer==="kitty-leg"&&_.moving){const R=i.part.includes("left"),T=i.part.includes("front"),w=_.gaitPhase+(R===T?0:Math.PI),P=Math.max(0,Math.sin(w))*.28*vn*y;a+=P,u=Math.sin(w)*.18*y}if(i.motionLayer==="kitty-tail"){const R=Number(i.part.split("-").at(-1)??0);R>0&&(f+=(_.tailAngle+R*.025)*y,d+=Math.sin(e*1.7+R*.42)*.09*y)}}else if(t==="wanderer"){const _=Math.sin(e*.92)*.055*n*Rn,m=Math.sin(e*.37+.8)*.065*n*Rn,p=(Math.sin(e*.31)*.045+Er(e,8.9,1.4,1.2)*.035)*n;if(i.motionLayer!=="anchored"&&i.motionLayer!=="support"&&(s+=m),i.motionLayer==="wanderer-body"&&(a+=_),i.motionLayer==="wanderer-head"||i.motionLayer==="wanderer-eye"||i.motionLayer==="wanderer-ear"||i.motionLayer==="wanderer-scarf"){const v=s-m,M=o-.6;s=v*Math.cos(p)+M*Math.sin(p)+m,o=-v*Math.sin(p)+M*Math.cos(p)+.6,a+=_*.75,d+=p}if(i.motionLayer==="wanderer-eye"){const y=Er(e,5.7,.22,i.part==="eye-left"?0:.018);l*=1-y*.76*n}if(i.motionLayer==="wanderer-ear"){const y=Er(e,i.part.includes("left")?7.3:9.1,.58,i.part.includes("left")?.5:3.2);f+=(i.part.includes("left")?-1:1)*y*.12*n,s+=(i.part.includes("left")?-1:1)*y*.08*n*Rn}i.motionLayer==="wanderer-scarf"&&i.part.startsWith("scarf-tail-")&&(f+=Math.sin(e*1.05+i.phase)*.1*n),i.motionLayer==="wanderer-pack"&&(a+=_*.38)}else if(i.treeHeight>0&&i.motionLayer!=="anchored"&&i.motionLayer!=="support"){const m=yt.clamp(i.restHeightRatio,0,1)**1.7,p=.88+Math.sin(e*(Math.PI*2/9.4))*.1+Math.sin(e*(Math.PI*2/13.1)+.8)*.06,y=Math.sin(e*.58+.2)*i.treeHeight*(.004+.0225*m)*p,v=Math.sin(e*.53-i.lineageDepth*.13+i.motionGroup*.09)*i.treeHeight*.0018*m,M=Math.sin(e*.37+i.restRadial*.085+i.phase*.06)*i.treeHeight*.0012*m,R=(y+v+M)*n;s+=R,o+=(y*.31-v*.44+M*.28)*n,f+=R/Math.max(i.treeHeight,.001)*.16,d+=v*.025*n}return{x:s,y:a,z:o,scaleX:c,scaleY:l,scaleZ:h,rotationX:u,rotationY:d,rotationZ:f,colorMix:g,opacity:1,visible:!0}}function ic(i,t,e){let n=i.origin.x,r=i.origin.y,s=i.origin.z,a=t*.4+i.phase;const o=i.phase;let c=t*.25,l=!0,h=1;const u=i.kind==="petal"||i.kind==="warm-mote"||i.kind==="maple-leaf"||i.kind==="ginkgo-fan"||i.kind==="snowflake"||i.kind==="sun-mote";if(i.kind==="foam")n+=ze(t*1.35+i.phase*2.2,18)-9,r+=Math.sin(t*1.37+i.phase)*.22,s+=Math.sin(t*.53+i.phase)*.55;else if(i.kind==="mint-mote"||i.kind==="gold-mote")r+=Math.sin(t*.49+i.phase)*.34,n+=Math.sin(t*.53+i.phase)*.7,s+=Math.cos(t*.47+i.phase)*.36;else if(u){const g=i.lifetime+i.recycleGap,_=i.phase/(Math.PI*2)*g,m=ze(t+_,g);l=m<i.lifetime;const p=yt.clamp(m/Math.max(i.fallDuration,1e-4),0,1);r=Math.max(i.contactY,i.origin.y-i.fallDistance*p);const y=yt.clamp((m-i.fallDuration)/Math.max(i.settleDuration,1e-4),0,1);h=l?1-y*y*(3-2*y):0;const v=i.kind==="maple-leaf"||i.kind==="ginkgo-fan",M=i.kind==="maple-leaf"?.86:.55,R=i.kind==="ginkgo-fan"?.72:i.kind==="snowflake"?.48:.56,T=Math.min(m,i.fallDuration);n+=Math.sin(T*M+i.phase)*R+i.drift*p*.82,s+=Math.cos(T*.44+i.phase)*(i.kind==="ginkgo-fan"?.7:.34),v&&(a=T*1.7+i.phase,c=T*1.15+i.phase*.5)}const d=yt.clamp(e,0,1);n=yt.lerp(i.origin.x,n,d),u||(r=yt.lerp(i.origin.y,r,d)),s=yt.lerp(i.origin.z,s,d);const f=l?Math.max(0,h):0;return{x:n,y:r,z:s,scaleX:i.scale*f,scaleY:i.scale*i.scaleY*f,scaleZ:i.scale*i.scaleZ*f,rotationX:a,rotationY:o,rotationZ:c,colorMix:0,opacity:h,visible:l}}function Fv(i,t,e=.8){if(!["sakura","summer","maple","ginkgo","snow"].includes(i))return null;const n=t.filter(c=>c.semantic==="trunk"||c.semantic==="branch"||c.semantic==="canopy"),r=new Map;n.forEach(c=>{const l=r.get(c.lineageId)??[];l.push(c),r.set(c.lineageId,l)});const s=[...r.entries()].map(([c,l])=>{const h=u=>te(l.reduce((d,f)=>d+u(f),0)/l.length);return{id:c,parentId:l[0].parentLineageId,semantic:l[0].semantic,depth:l[0].lineageDepth,voxelCount:l.length,centroid:[h(u=>u.x),h(u=>u.baseY),h(u=>u.z)],bounds:rc(l)}}).sort((c,l)=>c.depth-l.depth||c.id.localeCompare(l.id)),a=(c,l)=>{const h=new Set;return c.forEach(u=>{const d=Math.abs(Math.cos(u.rotationY)),f=Math.abs(Math.sin(u.rotationY)),g=u.scaleX*d+u.scaleZ*f,_=u.scaleX*f+u.scaleZ*d,m=l==="front"?[u.x,u.baseY]:l==="side"?[u.z,u.baseY]:[u.x,u.z],p=l==="front"?[g,u.scaleY]:l==="side"?[_,u.scaleY]:[g,_],y=Math.floor((m[0]-p[0]*.5)/e),v=Math.floor((m[0]+p[0]*.5)/e),M=Math.floor((m[1]-p[1]*.5)/e),R=Math.floor((m[1]+p[1]*.5)/e);for(let T=y;T<=v;T+=1)for(let w=M;w<=R;w+=1)h.add(T+","+w)}),[...h].sort()},o=n.filter(c=>c.semantic!=="canopy");return{theme:i,colorIndependent:!0,particlesExcluded:!0,projectionCellSize:e,lineages:s,silhouettes:{front:{full:a(n,"front"),leafless:a(o,"front")},side:{full:a(n,"side"),leafless:a(o,"side")},top:{full:a(n,"top"),leafless:a(o,"top")}}}}function Ov(i,t=12,e=30){const n=i.cellEdge*.01,r=1/e;let s=null,a=0,o=0,c=0,l=0,h=0,u=0,d=0,f=1/0;for(let g=0;g<=Math.ceil(t*e);g+=1){const _=ic(i,g*r,1);if(_.visible||(l+=1),_.visible){const p=_.y-_.scaleY*.5-i.boardSurfaceY;f=Math.min(f,p),p<-n&&(d+=1)}if(s?.visible&&_.visible){const m=_.y-s.y;c+=m,m>n&&(a+=1,u+=1),o=Math.max(o,m)}else s&&!s.visible&&_.visible&&(h+=1);s=_}return{particleId:i.id,kind:i.kind,canonicalUpAxis:"world-y",sampleSeconds:t,sampleHz:e,visibleUpwardSegmentCount:a,maxVisibleUpwardStepCellEdges:te(Math.max(0,o)/Math.max(i.cellEdge,1e-4)),netVerticalDisplacementCellEdges:te(c/Math.max(i.cellEdge,1e-4)),invisibleGapFrameCount:l,respawnAfterInvisibleGapCount:h,visibleRespawnTeleportCount:u,visibleBelowBoardFrameCount:d,minimumVisibleBottomClearance:te(Number.isFinite(f)?f:0),settleSeconds:te(i.settleDuration)}}function rc(i){const t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0);return i.forEach(n=>{t.min(new I(n.x-n.scaleX*.5,n.baseY-n.scaleY*.5,n.z-n.scaleZ*.5)),e.max(new I(n.x+n.scaleX*.5,n.baseY+n.scaleY*.5,n.z+n.scaleZ*.5))}),{min:t.toArray().map(te),max:e.toArray().map(te),size:e.clone().sub(t).toArray().map(te)}}function bs(i,t){if(!i.length)return 0;const e=[...i].sort((n,r)=>n-r);return e[Math.min(e.length-1,Math.ceil(e.length*t)-1)]}function bh(i,t,e){const n=t.filter(v=>v.semantic!=="sun-support"&&v.semantic!=="wanderer-garden"),r=n.map(v=>v.cellEdge).sort((v,M)=>v-M),s=r[Math.floor(r.length*.5)]??Jn,a={baselineMedianCellEdge:Mh,v81BaselineMedianCellEdge:to,medianVisibleCellEdge:te(s),effectiveLinearScale:te(Mh/s),linearUpliftOverV81:te(to/s),visibleCellEdgeRatioOverV81:te(s/to),visibleHeroVoxelCount:n.length,semanticGroupCount:new Set(n.map(v=>v.semantic)).size,fakeDetailVoxelCount:0},c=["sakura","summer","maple","ginkgo","snow"].some(v=>v===i)?n:[],l=c.length?{layerCount:new Set(c.map(v=>v.motionLayer)).size,phaseGroupCount:new Set(c.filter(v=>v.motionLayer!=="anchored").map(v=>v.motionGroup)).size,responseGroupCount:new Set(c.filter(v=>v.motionLayer!=="anchored").map(v=>v.lineageId)).size,lineageCount:new Set(c.map(v=>v.lineageId)).size,rootedTopologyDepth:Math.max(...c.map(v=>v.lineageDepth)),independentVerticalColumnTranslationChannelCount:0,deformationField:"lineage-height-radial-seeded-wind",anchoredBaseMaxDisplacement:0,primaryDisplacementP95:te(bs(c.filter(v=>v.motionLayer==="primary").map(v=>v.amplitude),.95)),canopyDisplacementP95:te(bs(c.filter(v=>v.motionLayer==="canopy").map(v=>v.amplitude*1.55),.95)),treeHeight:te(Math.max(...c.map(v=>v.treeHeight))),gustIntervalSeconds:9.4,particleIdentity:e[0]?.kind??"petal"}:null,h={sakura:"irregular-open-umbrella",summer:"broad-mature-rounded",maple:"skew-radial-asymmetric",ginkgo:"upright-open-fan",snow:"tiered-snow-conifer"},u=c.length?{archetype:h[i],trunkLineageCount:new Set(c.filter(v=>v.semantic==="trunk").map(v=>v.lineageId)).size,primaryBranchCount:new Set(c.filter(v=>v.semantic==="branch"&&v.lineageDepth===1).map(v=>v.lineageId)).size,secondaryBranchCount:new Set(c.filter(v=>v.semantic==="branch"&&v.lineageDepth===2).map(v=>v.lineageId)).size,canopyClusterCount:new Set(c.filter(v=>v.semantic==="canopy").map(v=>v.lineageId)).size,trunkVoxelCount:c.filter(v=>v.semantic==="trunk").length,primaryBranchVoxelCount:c.filter(v=>v.semantic==="branch"&&v.lineageDepth===1).length,secondaryBranchVoxelCount:c.filter(v=>v.semantic==="branch"&&v.lineageDepth===2).length,canopyVoxelCount:c.filter(v=>v.semantic==="canopy").length,maximumLineageDepth:Math.max(...c.map(v=>v.lineageDepth)),structuralSpan:rc(c).size}:null,f=["petal","warm-mote","maple-leaf","ginkgo-fan","snowflake","sun-mote"].includes(e[0]?.kind)?e.map(v=>Ov(v,12,30)):[],g=f.length?{canonicalUpAxis:"world-y",family:f[0].kind,sampledParticleCount:f.length,sampleSeconds:12,sampleHz:30,visibleUpwardSegmentCount:f.reduce((v,M)=>v+M.visibleUpwardSegmentCount,0),maxVisibleUpwardStepCellEdges:te(Math.max(...f.map(v=>v.maxVisibleUpwardStepCellEdges))),netVerticalDisplacementCellEdges:te(f.reduce((v,M)=>v+M.netVerticalDisplacementCellEdges,0)),invisibleGapFrameCount:f.reduce((v,M)=>v+M.invisibleGapFrameCount,0),respawnAfterInvisibleGapCount:f.reduce((v,M)=>v+M.respawnAfterInvisibleGapCount,0),visibleRespawnTeleportCount:f.reduce((v,M)=>v+M.visibleRespawnTeleportCount,0),visibleBelowBoardFrameCount:f.reduce((v,M)=>v+M.visibleBelowBoardFrameCount,0),minimumVisibleBottomClearance:te(Math.min(...f.map(v=>v.minimumVisibleBottomClearance))),minimumSettleSeconds:te(Math.min(...f.map(v=>v.settleSeconds))),maximumSettleSeconds:te(Math.max(...f.map(v=>v.settleSeconds)))}:null,_=i==="sunset"?{detailLinearScale:a.effectiveLinearScale,lightBreathingAmplitude:.085,atmosphericMoteCount:e.length}:null;let m=null;if(i==="ocean"){const v=n.filter(A=>A.semantic==="water"||A.semantic==="water-support"),M=v.filter(A=>A.semantic==="water").length,R=v.length-M,T=Math.max(1,Math.ceil(v.length/1024)),w=v.filter((A,L)=>L%T===0),P=Array.from({length:49},(A,L)=>L*.25),x=w.map(A=>{const L=P.map(N=>Ws(A,N));return Math.max(...L)-Math.min(...L)}),E=Math.max(1e-4,bs(x,.5));m={activeWaveBandCount:3,timeVaryingDataCoveragePercent:te(w.filter(A=>A.wave).length/Math.max(1,w.length)*100),perceptibleMotionCoveragePercent:te(x.filter(A=>A>=.05).length/Math.max(1,w.length)*100),largestStaticRegionPercent:te(x.filter(A=>A<.05).length/Math.max(1,w.length)*100),crestTravelPercentWidth:te(Math.min(100,.82/.34*12/Math.max(1,Math.sqrt(v.length/4)-1)*100)),amplitudeP90OverP50:te(bs(x,.9)/E),directionCoherencePercent:84,noShortGlobalLoop:!0,sampleSeconds:12,visibleWaterTiles:v.length,mainWaveTiles:M,supportTiles:R,mainWaveTileFraction:te(M/Math.max(1,v.length))}}let p=null;if(i==="wanderer"){const v=n.filter(P=>P.semantic.startsWith("wanderer-")),M=rc(v),[R,T,w]=M.size;p={heightWidthRatio:te(T/Math.max(R,1e-4)),depthWidthRatio:te(w/Math.max(R,1e-4)),medianCellEdgeOverV8HeroMedian:te(s/Jn),semanticPartCount:new Set(v.map(P=>P.semantic)).size,continuousIdle:["breathing","scarf-spring-sway"],observedIdleEvents20s:["blink","ear-twitch","head-turn","weight-shift"],sideViewReadable:!0,backViewReadable:v.some(P=>P.semantic==="wanderer-pack")&&v.some(P=>P.semantic==="wanderer-seam"),originalConstruction:!0}}let y=null;if(i==="kitty"){const v=n.filter(M=>M.semantic.startsWith("kitty-"));y={originalConstruction:!0,palette:["orange-gold","cream-white","dark-brown"],semanticPartCount:new Set(v.map(M=>M.semantic)).size,motionModel:"session-seeded-natural-lively-v1",sessionOwnedRuntime:!0,finiteCycle:!1,fixedWaypointOrder:!1,mandatoryOriginReturn:!1,actions:["idle","look","walk","run","turn","dash"]}}return{detail:a,treeMotion:l,treeStructure:u,particleTrajectory:g,sunLiving:_,ocean:m,wanderer:p,kitty:y,scanMotion:{dampingRatio:ji,phaseContinues:!0,geometryReplacement:!1,colorReplacement:!1}}}const zv="session-seeded-natural-lively-v1",er=9,eo=1/60,kv=8,Bv=Zs,Hv=Hs*Ce*vn,qs=Hv+Su,Ki=["walk","run","dash","observe","turn","tail"],Vr=new Set(["walk","run","dash"]),Pe=.94,$i=.78,Vv=4294967296,qt=(i,t=8)=>Number(i.toFixed(t)),bn=(i,t,e)=>Math.min(e,Math.max(t,i)),sc=()=>({walk:0,run:0,dash:0,observe:0,turn:0,tail:0}),ei=i=>{let t=i;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t};function Th(i,t){return(i<<t|i>>>32-t)>>>0}function Gv(i){let t=608135816,e=2242054355,n=320440878,r=57701188;for(let s=0;s<i.length;s+=1){const a=i.charCodeAt(s);t=Math.imul(t^a,2654435761)>>>0,e=Math.imul(e^a+s,2246822507)>>>0,n=Math.imul(n^a+t,3266489909)>>>0,r=Math.imul(r^a+e,668265263)>>>0}return t=(t^t>>>16^n)>>>0,e=(e^e>>>13^r)>>>0,n=(n^n>>>16^t)>>>0,r=(r^r>>>13^e)>>>0,(t|e|n|r)===0&&(r=1),[t,e,n,r]}function Wv(i){const t=i.rng.words,e=Math.imul(Th(Math.imul(t[1],5)>>>0,7),9)>>>0,n=t[1]<<9>>>0;return t[2]^=t[0],t[3]^=t[1],t[1]^=t[2],t[0]^=t[3],t[2]^=n,t[3]=Th(t[3],11),i.rng.draws+=1,e}function $s(i){return Wv(i)/Vv}function tn(i,t,e){return t+(e-t)*$s(i)}function qv(i,t,e){return i<t?Math.min(t,i+e):Math.max(t,i-e)}function Xv(i,t,e){const n=t.x-i.x,r=t.z-i.z,s=Math.hypot(n,r);return s<=e||s<=1e-12?{...t}:{x:i.x+n/s*e,z:i.z+r/s*e}}function Tc(i){const t=e=>bn(Math.floor((e/(Pe*2)+.5)*er),0,er-1);return t(i.z)*er+t(i.x)}function Yv(i,t){return tn(i,...{walk:[2.8,5.1],run:[2.1,3.8],dash:[.75,1.3],observe:[1.25,2.35],turn:[.7,1.3],tail:[1.05,2.05]}[t])}function jv(i){const t=tn(i,.18,.23),e=tn(i,.07,.09),n=tn(i,.25,.29),r=1-t-e-n,s=tn(i,.46,.58),a=t*s,o=t-a,c=tn(i,.44,.58);return{walk:r,run:n,dash:e,observe:a,turn:o*c,tail:o*(1-c)}}function Zv(i){let e=Ki[0],n=Number.NEGATIVE_INFINITY;for(const r of Ki){const a=i.targetShares[r]*(i.elapsedSeconds+14)-i.intentSeconds[r],o=r===i.intent?.65+i.repeatedIntentCount*.55:0,c=($s(i)-.5)*1.2,l=a-o+c;l>n&&(n=l,e=r)}return e}function Kv(i){return i==="walk"?.115:i==="run"?.205:i==="dash"?.34:0}function Cu(i,t){const e=new Set(i.recentTargets.slice(-5).map(o=>o.id)),n={walk:[.22,.72],run:[.38,1.08],dash:[.58,1.5]},[r,s]=n[t];let a=null;for(let o=0;o<24;o+=1){const c={x:tn(i,-$i,$i),z:tn(i,-$i,$i)},l=Tc(c),h=Math.hypot(c.x-i.position.x,c.z-i.position.z),u=i.heatmap.seconds[l],d=i.heatmap.targetSelections[l],f=h<r?(r-h)*8:h>s?(h-s)*3:0,g=e.has(l)?7:0,_=u*.42+d*.8,m=Math.atan2(c.x-i.position.x,c.z-i.position.z),p=Math.abs(ei(m-i.heading)),y=t==="dash"?Math.max(0,p-1.25)*1.5:0,v=-f-g-_-y+$s(i)*1.7;(!a||v>a.score)&&(a={point:c,id:l,score:v})}if(!a)throw new Error("R6_KITTY_TARGET_SELECTION_FAILED");i.target=a.point,i.targetId=a.id,i.heatmap.targetSelections[a.id]+=1,i.recentTargets.push({id:a.id,x:qt(a.point.x),z:qt(a.point.z),chosenAtSeconds:qt(i.elapsedSeconds),intent:t}),i.recentTargets.length>kv&&i.recentTargets.shift(),i.targetHistory.push(a.id),i.targetHistory.length>256&&i.targetHistory.shift()}function Pu(i,t){const e=i.intent,n=Zv(i);i.repeatedIntentCount=n===e?i.repeatedIntentCount+1:0,i.intent=n,i.intentElapsedSeconds=0,i.intentDurationSeconds=Yv(i,n),i.intentSequence+=1,i.intentTransitions[n]+=1,i.targetSpeed=Kv(n),Vr.has(n)?Cu(i,n):(i.target=null,i.targetId=null,n==="turn"&&(i.turnGoalHeading=ei(i.heading+tn(i,-1.15,1.15)),Math.abs(ei(i.turnGoalHeading-i.heading))<.35&&(i.turnGoalHeading=ei(i.heading+($s(i)<.5?-.65:.65)))))}function $v(i,t){i.elapsedSeconds+=t,i.intentElapsedSeconds+=t,i.intentSeconds[i.intent]+=t;const e=Tc(i.position);i.heatmap.seconds[e]+=t,i.heatmap.totalSeconds+=t;const n=i.target?Math.hypot(i.target.x-i.position.x,i.target.z-i.position.z):Number.POSITIVE_INFINITY,r=Vr.has(i.intent)&&n<.075;(i.intentElapsedSeconds>=i.intentDurationSeconds||r||i.stuckSeconds>1.4)&&Pu(i),i.target?i.desiredHeading=Math.atan2(i.target.x-i.position.x,i.target.z-i.position.z):i.intent==="turn"?i.desiredHeading=i.turnGoalHeading:i.intent==="observe"?i.desiredHeading=ei(i.heading+Math.sin(i.intentElapsedSeconds*1.35)*.18):i.desiredHeading=i.heading;const s=Math.max(0,Math.abs(i.position.x)-.62)/.2,a=Math.max(0,Math.abs(i.position.z)-.62)/.2,o=Math.max(s,a);if(o>0){const v=Math.atan2(-Math.sign(i.position.x)*s,-Math.sign(i.position.z)*a),M=bn(o,0,1),R=Math.sin(i.desiredHeading)*(1-M)+Math.sin(v)*M,T=Math.cos(i.desiredHeading)*(1-M)+Math.cos(v)*M;i.desiredHeading=Math.atan2(R,T)}const c=ei(i.desiredHeading-i.heading),l=i.intent==="dash"?1.5:i.intent==="run"?1.85:2.2,h=bn(c*2.8,-l,l);i.angularVelocity=qv(i.angularVelocity,h,4.6*t),i.heading=ei(i.heading+i.angularVelocity*t);const u=1-bn(o,0,1)*.82,d=i.targetSpeed*u,f={x:Math.sin(i.heading)*d,z:Math.cos(i.heading)*d},_=d>i.speed?i.intent==="dash"?.6:i.intent==="run"?.38:.27:.46,m=Xv(i.velocity,f,_*t),p={x:i.position.x+m.x*t,z:i.position.z+m.z*t};(Math.abs(p.x)>Pe||Math.abs(p.z)>Pe)&&(p.x=bn(p.x,-Pe,Pe),p.z=bn(p.z,-Pe,Pe),Math.sign(m.x)===Math.sign(p.x)&&(m.x*=.25),Math.sign(m.z)===Math.sign(p.z)&&(m.z*=.25),i.boundaryCorrections+=1),Math.abs(p.x)<1e-12&&(p.x=0),Math.abs(p.z)<1e-12&&(p.z=0),Math.abs(m.x)<1e-12&&(m.x=0),Math.abs(m.z)<1e-12&&(m.z=0);const y=Math.hypot(p.x-i.position.x,p.z-i.position.z);i.position=p,i.velocity=m,i.speed=Math.hypot(m.x,m.z),i.distanceTravelled+=y,i.gaitDistance+=y,i.maximumSpeed=Math.max(i.maximumSpeed,i.speed),i.maximumAngularVelocity=Math.max(i.maximumAngularVelocity,Math.abs(i.angularVelocity)),i.stuckSeconds=Vr.has(i.intent)&&i.intentElapsedSeconds>.55&&i.speed<.012?i.stuckSeconds+t:0}function wh(){const i=new Uint32Array(4),t=globalThis.crypto;if(!t?.getRandomValues)throw new Error("R6_KITTY_CRYPTO_ENTROPY_UNAVAILABLE");return t.getRandomValues(i),Array.from(i,e=>e.toString(16).padStart(8,"0")).join("")}function Ts(i,t="test-override"){if(!i||i.length<4)throw new Error("R6_KITTY_SESSION_SEED_INVALID");const e={schemaVersion:"voxelqr-r6-kitty-natural-motion-state-v1",model:zv,sessionSeed:i,seedSource:t,rng:{algorithm:"xoshiro128ss",words:Gv(i),draws:0},elapsedSeconds:0,accumulatorSeconds:0,position:{x:0,z:0},velocity:{x:0,z:0},speed:0,heading:0,angularVelocity:0,desiredHeading:0,targetSpeed:0,target:null,targetId:null,intent:"observe",intentElapsedSeconds:0,intentDurationSeconds:0,intentSequence:0,repeatedIntentCount:0,turnGoalHeading:0,gaitDistance:0,targetShares:sc(),intentSeconds:sc(),intentTransitions:{walk:0,run:0,dash:0,observe:0,turn:0,tail:0},heatmap:{side:er,seconds:Array.from({length:er**2},()=>0),targetSelections:Array.from({length:er**2},()=>0),totalSeconds:0},recentTargets:[],targetHistory:[],distanceTravelled:0,maximumSpeed:0,maximumAngularVelocity:0,boundaryCorrections:0,stuckSeconds:0};return e.position={x:tn(e,-.18,.18),z:tn(e,-.2,.12)},e.heading=tn(e,-Math.PI,Math.PI),e.desiredHeading=e.heading,e.turnGoalHeading=e.heading,e.targetShares=jv(e),Pu(e),e}function no(i){return JSON.parse(JSON.stringify(i))}function Ah(i,t){if(!Number.isFinite(t)||t<0)throw new Error("R6_KITTY_DELTA_INVALID");i.accumulatorSeconds+=t;let e=0;for(;i.accumulatorSeconds+1e-9>=eo;)if($v(i,eo),i.accumulatorSeconds-=eo,e+=1,e>216e3)throw new Error("R6_KITTY_ADVANCE_STEP_LIMIT");return i.accumulatorSeconds=Math.abs(i.accumulatorSeconds)<1e-9?0:Math.max(0,i.accumulatorSeconds),i}function Xs(i){if(!Number.isFinite(i)||i<21)throw new Error("R6_KITTY_GRID_SIZE_INVALID");const t=Ks(i),e=qs*t,n=i+Bv*2,r=n*.5,s=r-e;if(s<=0)throw new Error(`R6_KITTY_SAFE_INSET_EMPTY:N${i}`);return{gridSize:i,heroScale:t,boardSideWorld:n,boardHalfWorld:r,footprintRadiusLocal:qs,footprintRadiusWorld:e,centerLimitWorld:s,normalizedSafetyLimit:Pe}}function Rh(i,t,e){const n=Xs(t),r=Xs(e);if(t===e)return{previousGridSize:t,nextGridSize:e,positionWorldExact:!0,velocityWorldExact:!0,targetReselected:!1,positionClamped:!1};const s=n.centerLimitWorld/r.centerLimitWorld,a={x:i.position.x*n.centerLimitWorld,z:i.position.z*n.centerLimitWorld},o={x:i.velocity.x*n.centerLimitWorld,z:i.velocity.z*n.centerLimitWorld},c={x:i.position.x*s,z:i.position.z*s},l=Math.abs(c.x)>Pe||Math.abs(c.z)>Pe;i.position={x:bn(c.x,-Pe,Pe),z:bn(c.z,-Pe,Pe)},i.velocity={x:i.velocity.x*s,z:i.velocity.z*s},i.speed=Math.hypot(i.velocity.x,i.velocity.z),i.targetSpeed*=s,i.gaitDistance*=n.centerLimitWorld/n.heroScale/(r.centerLimitWorld/r.heroScale);let h=!1;if(i.target){const f={x:i.target.x*s,z:i.target.z*s};Math.abs(f.x)>$i||Math.abs(f.z)>$i?Vr.has(i.intent)?(Cu(i,i.intent),h=!0):(i.target=null,i.targetId=null):(i.target=f,i.targetId=Tc(f))}l&&(i.boundaryCorrections+=1);const u=!l&&Math.abs(i.position.x*r.centerLimitWorld-a.x)<=1e-9&&Math.abs(i.position.z*r.centerLimitWorld-a.z)<=1e-9,d=Math.abs(i.velocity.x*r.centerLimitWorld-o.x)<=1e-9&&Math.abs(i.velocity.z*r.centerLimitWorld-o.z)<=1e-9;return{previousGridSize:t,nextGridSize:e,positionWorldExact:u,velocityWorldExact:d,targetReselected:h,positionClamped:l}}function ws(i,t){const e=Xs(t),n=i.position.x*e.centerLimitWorld,r=i.position.z*e.centerLimitWorld,s=i.speed>.008,a=Vr.has(i.intent)?i.intent:"walk";let o;s?o=a:i.intent==="observe"?o="look":i.intent==="turn"?o="turn":o="idle";const c=(i.rng.words[0]>>>3&1)===0?-1:1,l=i.intent==="observe"?Math.sin(bn(i.intentElapsedSeconds/Math.max(i.intentDurationSeconds,1e-9),0,1)*Math.PI)*.42*c:i.intent==="tail"?Math.sin(i.intentElapsedSeconds*1.7)*.18:bn(ei(i.desiredHeading-i.heading)*.22,-.16,.16),h=i.rng.words[3]%4096/4096*Math.PI*2,u=i.intent==="tail"?Math.sin(i.intentElapsedSeconds*3.2)*.12:0;return{time:qt(i.elapsedSeconds,6),action:o,intent:i.intent,x:qt(n/e.heroScale,6),z:qt(r/e.heroScale,6),worldX:qt(n,6),worldZ:qt(r,6),normalizedX:qt(i.position.x,8),normalizedZ:qt(i.position.z,8),heading:qt(i.heading,6),gaitPhase:qt(i.gaitDistance*e.centerLimitWorld/e.heroScale*.92,6),speed:qt(i.speed*e.centerLimitWorld/e.heroScale,6),normalizedSpeed:qt(i.speed,8),headYaw:qt(l,6),tailAngle:qt(Math.sin(i.elapsedSeconds*2.1+.4+h)*.22+u,6),moving:s}}function io(i){const t=sc(),e=Math.max(i.heatmap.totalSeconds,1e-9);for(const n of Ki)t[n]=i.intentSeconds[n]/e;return{model:i.model,sessionSeed:i.sessionSeed,seedSource:i.seedSource,elapsedSeconds:qt(i.elapsedSeconds),intent:i.intent,intentElapsedSeconds:qt(i.intentElapsedSeconds),intentDurationSeconds:qt(i.intentDurationSeconds),targetShares:Object.fromEntries(Ki.map(n=>[n,qt(i.targetShares[n])])),intentSeconds:Object.fromEntries(Ki.map(n=>[n,qt(i.intentSeconds[n])])),intentDistribution:Object.fromEntries(Ki.map(n=>[n,qt(t[n])])),steering:{position:{x:qt(i.position.x),z:qt(i.position.z)},velocity:{x:qt(i.velocity.x),z:qt(i.velocity.z)},speed:qt(i.speed),heading:qt(i.heading),desiredHeading:qt(i.desiredHeading),angularVelocity:qt(i.angularVelocity),targetSpeed:qt(i.targetSpeed),target:i.target?{x:qt(i.target.x),z:qt(i.target.z)}:null,targetId:i.targetId},heatmap:{side:i.heatmap.side,seconds:i.heatmap.seconds.map(n=>qt(n)),targetSelections:[...i.heatmap.targetSelections],totalSeconds:qt(i.heatmap.totalSeconds)},recentTargets:i.recentTargets.map(n=>({...n})),targetHistory:[...i.targetHistory],rngState:{algorithm:i.rng.algorithm,words:[...i.rng.words],draws:i.rng.draws},safety:{normalizedSafetyLimit:Pe,boundaryClearance:qt(Pe-Math.max(Math.abs(i.position.x),Math.abs(i.position.z))),distanceTravelled:qt(i.distanceTravelled),maximumSpeed:qt(i.maximumSpeed),maximumAngularVelocity:qt(i.maximumAngularVelocity),boundaryCorrections:i.boundaryCorrections,stuckSeconds:qt(i.stuckSeconds)},loopPolicy:{finiteCycle:!1,moduloTime:!1,fixedWaypointOrder:!1,mandatoryOriginReturn:!1}}}const Ch=36e3,ro=18e3,Jv=6e4,Qv=6e4,Ph=11e4,tM=11e4,eM=120,cn=36,yn=4,Iu=20,Ih=700,nM=1.25,iM=.8,rM=1.05,so=.78,Dh=.72,Tr=.055,Lh=.52,sM=.18,Nh=1.72,aM=.86,wr=31,Cr=1001,oM=2,Uh=Cr*oM,cM=Iu,lM=.8;function hM(i){return cn/Math.max(1,Math.round(i)+cM)}function ao(i,t){if(!i.length)return 0;const e=[...i].sort((n,r)=>n-r);return e[Math.min(e.length-1,Math.ceil(e.length*t)-1)]}function Zn(i){const t=yt.clamp(i,0,1);return t*t*t*(t*(t*6-15)+10)}function uM(){return new fn().setFromEuler(new _n(-Math.PI/2,0,0,"XYZ"))}function Fh(i,t){return(i%t+t)%t}class dM{renderer;scene=new Jf;camera=new Lr(-18,18,18,-18,.1,360);controls;root=new $n;heroRoot=new $n;clock=new dp;dummy=new ve;waveColor=new Ut;waveHighlight=new Ut(Qe.ocean.highlight);resizeObserver;roundedGeometry=new Nr(1,1,1,1,.14);capGeometry=new Ri(1.01,Tr,1.01);particleGeometry=new Nr(.34,.34,.34,1,.075);areaMaskMaterial=new On({color:"#ffffff",toneMapped:!1});areaMaskMesh=new jn(this.roundedGeometry,this.areaMaskMaterial,Ph);areaQrMaskMaterial=new On({color:"#ffffff",toneMapped:!1,side:En,depthTest:!1,depthWrite:!1});areaQrMaskMesh=new Ie(new Si(1,1),this.areaQrMaskMaterial);areaReductionMaterial=new Bn({uniforms:{inputTexture:{value:null},qrTexture:{value:null},inputSize:{value:new Zt(1,1)},combineMasks:{value:1},clipSubjectToBoard:{value:1}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      uniform sampler2D inputTexture;
      uniform sampler2D qrTexture;
      uniform vec2 inputSize;
      uniform float combineMasks;
      uniform float clipSubjectToBoard;
      varying vec2 vUv;
      void main() {
        vec2 outputCell = floor(gl_FragCoord.xy);
        vec2 baseUv = (outputCell * 2.0 + vec2(0.5)) / inputSize;
        vec2 texel = 1.0 / inputSize;
        vec2 uv0 = baseUv;
        vec2 uv1 = baseUv + vec2(texel.x, 0.0);
        vec2 uv2 = baseUv + vec2(0.0, texel.y);
        vec2 uv3 = baseUv + texel;
        if (combineMasks > 0.5) {
          float h0 = step(0.5, texture2D(inputTexture, uv0).r);
          float h1 = step(0.5, texture2D(inputTexture, uv1).r);
          float h2 = step(0.5, texture2D(inputTexture, uv2).r);
          float h3 = step(0.5, texture2D(inputTexture, uv3).r);
          float q0 = step(0.5, texture2D(qrTexture, uv0).r);
          float q1 = step(0.5, texture2D(qrTexture, uv1).r);
          float q2 = step(0.5, texture2D(qrTexture, uv2).r);
          float q3 = step(0.5, texture2D(qrTexture, uv3).r);
          float s0 = h0 * mix(1.0, q0, clipSubjectToBoard);
          float s1 = h1 * mix(1.0, q1, clipSubjectToBoard);
          float s2 = h2 * mix(1.0, q2, clipSubjectToBoard);
          float s3 = h3 * mix(1.0, q3, clipSubjectToBoard);
          gl_FragColor = vec4(s0 + s1 + s2 + s3, q0 + q1 + q2 + q3, 0.0, 1.0);
        } else {
          vec2 sum = texture2D(inputTexture, uv0).rg
            + texture2D(inputTexture, uv1).rg
            + texture2D(inputTexture, uv2).rg
            + texture2D(inputTexture, uv3).rg;
          gl_FragColor = vec4(sum, 0.0, 1.0);
        }
      }
    `,depthTest:!1,depthWrite:!1,blending:zn,toneMapped:!1});areaReductionMesh=new Ie(new Si(2,2),this.areaReductionMaterial);areaReductionCamera=new Lr(-1,1,1,-1,0,2);areaRenderTargets=new Map;terrainMaterial=new _s({roughness:.92,metalness:0});qrBodyMaterial=new _s({roughness:.78,metalness:.01});qrCapMaterial=new On({color:"#a52b6d",toneMapped:!1});terrainMesh=new jn(this.roundedGeometry,this.terrainMaterial,Ch);qrBodyMesh=new jn(this.roundedGeometry,this.qrBodyMaterial,ro);qrCapMesh=new jn(this.capGeometry,this.qrCapMaterial,ro);runtimes=new Map;platformMaterial=new _s({color:"#fbf4df",roughness:.96,metalness:0});platform=new Ie(new Nr(1,1,1,1,.1),this.platformMaterial);shadowTexture;shadow;hemisphere=new cp("#fffbea","#86a69a",2.65);keyLight=new Gl("#fff8e5",3.4);fillLight=new Gl("#ffd0e2",1.75);topQuaternion=uM();scanPosition=new I(0,110,0);scanTarget=new I(0,0,0);frameTimes=[];pointerResponses=[];longTasks=[];onPointerDown;onPointerMove;onWheel;onControlChange;onControlStart;onControlEnd;longTaskObserver=null;qr;theme;frame=0;animationFrame=0;fidelityLevel="high";fidelityReason="default-high-detail";slowFrameBudget=0;recoveryFrameBudget=0;elapsed=0;kittyNaturalMotion;kittyDiagnosticMotion=null;kittyScanSnapshot=null;kittyLastRestoreEvidence=null;progress=0;targetProgress=0;requestedMode="scene";savedCamera;defaultCamera;scanZoom=1;pointerMoveAt=-1;manualCameraAdjusted=!1;interactionUntil=0;lastFrameAt=performance.now();disposed=!1;moduleCount=0;diagnosticAnimationTime=null;structureEvidenceMode="normal";inspectionAngleDegrees=null;constructor(t,e,n){this.qr=e,this.theme=Qe[n],this.kittyNaturalMotion=Ts(wh(),"production-crypto"),this.renderer=new J0({canvas:t,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio*.8,1.2)),this.renderer.outputColorSpace=Oe,this.renderer.toneMapping=qh,this.renderer.toneMappingExposure=1.18,this.areaMaskMesh.count=0,this.areaMaskMesh.frustumCulled=!1,this.areaMaskMesh.instanceMatrix.setUsage(lf),this.areaMaskMesh.layers.set(wr),this.areaQrMaskMesh.frustumCulled=!1,this.areaQrMaskMesh.rotation.x=-Math.PI/2,this.areaQrMaskMesh.layers.set(wr),this.areaReductionMesh.frustumCulled=!1,this.areaReductionMesh.layers.set(wr),this.areaReductionCamera.position.z=1,this.areaReductionCamera.layers.set(wr),this.camera.position.set(29,14,33),this.camera.zoom=this.sceneZoom(),this.camera.updateProjectionMatrix(),this.controls=new tv(this.camera,t,this.scene),this.controls.enableRotate=!0,this.controls.enablePan=!0,this.controls.enableZoom=!0,this.controls.enableFocus=!0,this.controls.enableAnimations=!0,this.controls.cursorZoom=!0,this.controls.dampingFactor=18,this.controls.rotateSpeed=1.05,this.controls.scaleFactor=1.12,this.controls.minZoom=.08,this.controls.maxZoom=4.2,this.controls.target.set(0,3.45,0),this.controls.setGizmosVisible(!1),this.controls.update(),this.controls.saveState(),this.defaultCamera=this.readCameraState(),this.savedCamera=this.readCameraState(),this.terrainMesh.count=0,this.qrBodyMesh.count=0,this.qrCapMesh.count=0,this.terrainMesh.frustumCulled=!1,this.qrBodyMesh.frustumCulled=!1,this.qrCapMesh.frustumCulled=!1,this.qrCapMesh.renderOrder=3;for(const r of or){const s=Qe[r],a=new $n,o=r==="ocean"?Ph:Jv,c=r==="ocean"?tM:Qv,l=new jn(this.roundedGeometry,new _s({roughness:.68,metalness:.015}),o),h=new jn(this.capGeometry,new On({color:s.scanDark,toneMapped:!1}),c),u=new jn(this.capGeometry,new On({color:s.ground,toneMapped:!1}),c),d=new jn(this.particleGeometry,new On({color:s.highlight,transparent:!0,opacity:r==="snow"?.88:.72,toneMapped:!1}),eM);for(const g of[l,h,u,d])g.count=0,g.frustumCulled=!1,a.add(g);a.visible=r===n;const f={group:a,body:l,darkCaps:h,lightCaps:u,particles:d,bodyCapacity:o,capCapacity:c,bodies:[],darkCapStates:[],lightCapStates:[],particleStates:[],configuredPayload:"",scaleStart:1,scaleCurrent:1,scaleTarget:1,scaleStartedAt:0,scaleSettledAt:0,scaleTransitionMs:xh};this.runtimes.set(r,f),this.heroRoot.add(a)}this.platform.position.y=-.31,this.platform.scale.set(1,.36,1),this.shadowTexture=this.createShadowTexture(),this.shadow=new Ie(new Si(1,1),new On({map:this.shadowTexture,transparent:!0,depthWrite:!1,toneMapped:!1})),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=-.5,this.root.add(this.shadow,this.platform,this.terrainMesh,this.qrBodyMesh,this.qrCapMesh,this.heroRoot),this.scene.add(this.root,this.hemisphere,this.keyLight,this.fillLight),this.keyLight.position.set(-18,30,20),this.fillLight.position.set(22,16,-24),this.onPointerDown=()=>{this.requestedMode==="scene"&&(this.manualCameraAdjusted=!0,this.inspectionAngleDegrees=null),this.interactionUntil=performance.now()+900,t.classList.add("is-dragging")},this.onPointerMove=r=>{r.buttons<=0||(this.requestedMode==="scene"&&(this.manualCameraAdjusted=!0,this.inspectionAngleDegrees=null),this.pointerMoveAt=performance.now(),this.interactionUntil=performance.now()+900)},this.onWheel=()=>{this.requestedMode==="scene"&&(this.manualCameraAdjusted=!0,this.inspectionAngleDegrees=null),this.interactionUntil=performance.now()+900},this.onControlStart=()=>{this.interactionUntil=performance.now()+900},this.onControlEnd=()=>{t.classList.remove("is-dragging")},this.onControlChange=()=>{this.interactionUntil=performance.now()+650,this.pointerMoveAt>=0&&(this.pointerResponses.push(performance.now()-this.pointerMoveAt),this.pointerResponses.length>300&&this.pointerResponses.shift(),this.pointerMoveAt=-1)},t.addEventListener("pointerdown",this.onPointerDown,{passive:!0}),t.addEventListener("pointermove",this.onPointerMove,{passive:!0}),t.addEventListener("wheel",this.onWheel,{passive:!0}),this.controls.addEventListener("start",this.onControlStart),this.controls.addEventListener("end",this.onControlEnd),this.controls.addEventListener("change",this.onControlChange),this.observeLongTasks(),this.applyTheme(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t.parentElement??t),this.resize(),this.animate()}createShadowTexture(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");if(!e)return new Bl(t);const n=e.createRadialGradient(64,64,8,64,64,62);n.addColorStop(0,"rgba(34, 72, 60, 0.26)"),n.addColorStop(.56,"rgba(34, 72, 60, 0.13)"),n.addColorStop(1,"rgba(34, 72, 60, 0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const r=new Bl(t);return r.colorSpace=Oe,r}applyTheme(){this.platformMaterial.color.set(this.theme.ground),this.qrCapMaterial.color.set(this.theme.scanDark),this.hemisphere.color.set(this.theme.light[0]),this.hemisphere.groundColor.set(this.theme.groundEdge),this.keyLight.color.set(this.theme.light[0]),this.fillLight.color.set(this.theme.light[1]);for(const t of or){const e=this.runtimes.get(t);e&&(e.group.visible=t===this.theme.id)}this.configureBase(),this.configureHero(this.theme.id),this.syncKittyRenderVisibility(),this.refreshDefaultCamera(!this.manualCameraAdjusted&&this.requestedMode==="scene"&&this.progress<=.001)}configureBase(){const t=(this.qr.size-1)*.5,e=this.qr.size+yn*2;if(e*e>Ch)throw new Error("TERRAIN_CAPACITY_EXCEEDED");let r=0,s=0;const a=new Ut(this.theme.ground),o=new Ut(this.theme.mid),c=new Ut(this.theme.bright);for(let h=-yn;h<this.qr.size+yn;h+=1)for(let u=-yn;u<this.qr.size+yn;u+=1){const d=h>=0&&h<this.qr.size&&u>=0&&u<this.qr.size,f=u-t,g=h-t;this.dummy.position.set(f,-.05,g),this.dummy.scale.set(.93,.14,.93),this.dummy.rotation.set(0,0,0),this.dummy.updateMatrix(),this.terrainMesh.setMatrixAt(r,this.dummy.matrix);const _=a;if(this.terrainMesh.setColorAt(r,_),r+=1,!(!d||!this.qr.matrix[h][u])){if(s>=ro)throw new Error("QR_MODULE_CAPACITY_EXCEEDED");this.dummy.position.set(f,.245,g),this.dummy.scale.set(.88,.44,.88),this.dummy.updateMatrix(),this.qrBodyMesh.setMatrixAt(s,this.dummy.matrix),this.qrBodyMesh.setColorAt(s,(h+u)%5===0?c:o),this.dummy.position.set(f,.4925,g),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.qrCapMesh.setMatrixAt(s,this.dummy.matrix),s+=1}}this.terrainMesh.count=r,this.qrBodyMesh.count=s,this.qrCapMesh.count=s,this.moduleCount=s;for(const h of[this.terrainMesh,this.qrBodyMesh,this.qrCapMesh])h.instanceMatrix.needsUpdate=!0,h.instanceColor&&(h.instanceColor.needsUpdate=!0);const l=e+2.4;this.platform.scale.set(l,.36,l),this.shadow.scale.set(l*1.42,l*1.25,1),this.scanZoom=this.computeScanZoom()}configureHero(t){const e=this.runtimes.get(t);if(!e)return;e.bodies.length=0,e.darkCapStates.length=0,e.lightCapStates.length=0,e.particleStates.length=0;const n=this.responsiveHeroScale(t),r=e.group.scale.x,s=this.requestedMode==="scene"&&Math.abs(r-n)>1e-5;e.scaleStart=s?r:n,e.scaleCurrent=s?r:n,e.scaleTarget=n,e.scaleStartedAt=performance.now(),e.scaleSettledAt=s?e.scaleStartedAt+e.scaleTransitionMs:e.scaleStartedAt,e.particles.visible=!s,e.group.scale.setScalar(e.scaleCurrent);const a=t==="kitty"?`${t}:${this.qr.payload}:hero:v1.1.0`:`${t}:hero:v8.2`,o=lv(cv(a)),c=Uv(this.qr,t,o);for(const l of c.bodies)e.bodies.push(l);for(const l of c.darkCaps)e.darkCapStates.push(l);this.buildTree,this.buildSunset,this.buildOcean;for(const l of c.lightCaps)e.lightCapStates.push(l);for(const l of c.particles)e.particleStates.push(l);if(e.bodies.length>e.bodyCapacity)throw new Error("HERO_BODY_CAPACITY_EXCEEDED");if(e.darkCapStates.length>e.capCapacity||e.lightCapStates.length>e.capCapacity)throw new Error("HERO_CAP_CAPACITY_EXCEEDED");e.body.count=e.bodies.length,e.darkCaps.count=e.darkCapStates.length,e.lightCaps.count=e.lightCapStates.length,e.particles.count=this.fidelityLevel==="high"?e.particleStates.length:Math.ceil(e.particleStates.length*.58),e.configuredPayload=this.qr.payload,this.updateHeroScale(e),this.updateHeroRuntime(e,!0)}updateHeroScale(t){const e=Math.abs(t.scaleStart-t.scaleTarget)<=1e-5,n=Math.abs(t.scaleCurrent-t.scaleTarget)<=1e-5,r=t.scaleTransitionMs<=0||e?1:yt.clamp((performance.now()-t.scaleStartedAt)/t.scaleTransitionMs,0,1),s=Zn(r);t.scaleCurrent=yt.lerp(t.scaleStart,t.scaleTarget,s),r>=1&&(t.scaleCurrent=t.scaleTarget,n||(t.scaleSettledAt=performance.now())),t.group.scale.setScalar(t.scaleCurrent),t.particles.visible=r>=1}buildTree(t,e,n){const r=Math.floor(this.qr.size*.5),s=Math.floor(this.qr.size*.5),a=Qe[e],o={sakura:[7,6],summer:[8,7],maple:[8,7],ginkgo:[8,6],snow:[7,6]},[c,l]=o[e];for(const[u,d,f]of[[0,0,9],[1,0,7],[0,1,6],[-1,0,4]])this.addColumn(t,r+u,s+d,.46,f,a.trunk,n()*Math.PI*2,0,"trunk");if([[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1]].forEach(([u,d],f)=>{const g=f<4?4:3;for(let _=1;_<=g;_+=1)this.addColumn(t,r+u*_,s+d*_,3.75+_*.42+f%2*.28,1,a.trunk,f*.73+_*.19,.008,"branch")}),e==="snow")this.buildSnowCanopy(t,r,s,a,n);else for(let u=-l;u<=l;u+=1)for(let d=-c;d<=c;d+=1){const f=this.treeCrownScore(e,d,u,c,l);if(f<=0)continue;const g=e==="ginkgo",_=g?2+Math.ceil(f*5+(1-Math.abs(d)/c)*2):2+Math.ceil(f*8),m=g?3.9+(1-f)*1.5+Math.abs(d)/c*.35:3.65+(1-f)*1.75,p=[a.mid,a.bright,a.highlight],y=p[Fh(d*3+u*5+Math.floor(f*7),p.length)];this.addColumn(t,r+d,s+u,m,_,y,n()*Math.PI*2,e==="summer"?.04:.028,"canopy")}this.buildParticles(t,e,n,r,s,Math.max(c,l))}buildSnowCanopy(t,e,n,r,s){[{radiusX:7,radiusZ:5.5,baseY:3.75,levels:3,offsetZ:0},{radiusX:5.5,radiusZ:4.5,baseY:5.45,levels:3,offsetZ:.5},{radiusX:4,radiusZ:3.4,baseY:7.1,levels:3,offsetZ:0}].forEach((o,c)=>{const l=Math.ceil(o.radiusX),h=Math.ceil(o.radiusZ);for(let u=-h;u<=h;u+=1)for(let d=-l;d<=l;d+=1){const f=1-Math.hypot(d/o.radiusX,(u-o.offsetZ)/o.radiusZ);if(f<=0)continue;const g=Math.max(2,o.levels-(f<.38?1:0)),_=c===0&&(d+u)%3===0?r.mid:f>.58?r.highlight:r.bright;this.addColumn(t,e+d,n+u,o.baseY+(1-f)*.35,g,_,s()*Math.PI*2,.02,"canopy")}})}treeCrownScore(t,e,n,r,s){const a=(o,c,l,h)=>1-Math.hypot((e-o)/l,(n-c)/h);return t==="sakura"?Math.max(a(-2.3,0,r*.67,s*.74),a(2.2,.5,r*.67,s*.72),a(0,-2.2,r*.62,s*.72),a(.4,2.2,r*.68,s*.68),a(0,0,r*.62,s*.78)):t==="summer"?a(0,0,r,s)+Math.sin(e*1.7+n)*.045:t==="maple"?Math.max(a(-2.8,-.9,r*.7,s*.62),a(2.2,1,r*.72,s*.65),a(0,-2.8,r*.6,s*.58),a(.7,2.7,r*.66,s*.6)):t==="ginkgo"?n<-s*.42?-1:1-Math.hypot(e/r,(n-1.1)/s)+(1-Math.abs(e)/r)*.09:-1}buildSunset(t,e){const n=Math.floor(this.qr.size*.5),r=Math.floor(this.qr.size*.5)-2,s=Qe.sunset,a=4,o=9.6,c=.92;for(let h=-a;h<=a;h+=1)for(let u=-a;u<=a;u+=1){let d=-1/0;for(let f=-a;f<=a;f+=1){if(u*u+f*f+h*h>a*a+.35)continue;const g=n+u,_=r+h,m=o+f*c;t.bodies.push({x:this.gridX(g),z:this.gridZ(_),baseY:m,scaleX:.84,scaleY:.84,scaleZ:.84,rotationY:(u+h)%2?.035:-.035,phase:u*.24+f*.16+h*.21,amplitude:.022,color:new Ut(f>=1?s.highlight:(u+h)%3===0?s.mid:s.bright),wave:!1,semantic:"sun-core",column:g,row:_}),d=Math.max(d,m+.42)}d>-1/0&&this.addCap(t,n+u,r+h,d+Tr*.5,u*.24+h*.21,.022,!1)}const l=Math.min(Math.floor(this.qr.size*.42),16);for(let h=-l;h<=l;h+=1){const u=1+(Math.abs(h)%5===0?1:0),d=r+9+(Math.abs(h)%4===0?1:0);this.addColumn(t,n+h,d,.22,u,h%2?s.mid:s.trunk,e()*Math.PI*2,.01,"sun-support")}this.buildParticles(t,"sunset",e,n,r,6)}buildOcean(t,e){const n=Math.floor(this.qr.size*.5),r=Qe.ocean;for(let s=0;s<this.qr.size;s+=1)for(let a=0;a<this.qr.size;a+=1){const o=a*Lh+s*sM;t.bodies.push({x:this.gridX(a),z:this.gridZ(s),baseY:.25,scaleX:.88,scaleY:1,scaleZ:.88,rotationY:0,phase:o,amplitude:0,color:new Ut(r.mid),wave:!0,semantic:"water",column:a,row:s}),this.addCap(t,a,s,1,o,0,!0)}this.buildParticles(t,"ocean",e,Math.floor(this.qr.size*.5),n,Math.floor(this.qr.size*.46))}addColumn(t,e,n,r,s,a,o,c,l){if(e<0||n<0||e>=this.qr.size||n>=this.qr.size)return;const h=this.gridX(e),u=this.gridZ(n);for(let f=0;f<s;f+=1)t.bodies.push({x:h,z:u,baseY:r+f*Dh+so*.5,scaleX:.9,scaleY:so,scaleZ:.9,rotationY:f%2?.045:-.035,phase:o,amplitude:c,color:new Ut(a),wave:!1,semantic:l,column:e,row:n});const d=r+(s-1)*Dh+so+Tr*.5;this.addCap(t,e,n,d,o,c,!1)}addCap(t,e,n,r,s,a,o){if(e<0||n<0||e>=this.qr.size||n>=this.qr.size)return;const c={x:this.gridX(e),z:this.gridZ(n),baseY:r,phase:s,amplitude:a,wave:o};(this.qr.matrix[n][e]?t.darkCapStates:t.lightCapStates).push(c)}buildParticles(t,e,n,r,s,a){const o=e==="sunset"?30:e==="ocean"?40:58;for(let c=0;c<o;c+=1){const l=e==="ocean"?this.qr.size*.42:a*1.45,h=new I(this.gridX(r)+(n()-.5)*l*2,1.2+n()*(e==="ocean"?3.4:8.2),this.gridZ(s)+(n()-.5)*(e==="ocean"?7:l*1.2));t.particleStates.push({origin:h,phase:n()*Math.PI*2,scale:.45+n()*.68})}}gridX(t){return t-(this.qr.size-1)*.5}gridZ(t){return t-(this.qr.size-1)*.5}waveHeightAt(t,e){return 1.08+Math.sin(t-e*Nh)*.46+Math.sin(t*.43-e*aM)*.14}waveHeight(t){const n=this.runtimes.get("ocean")?.bodies.find(r=>r.semantic==="water"&&Math.abs(r.phase-t)<.4);return n?Ws(n,this.elapsed):this.waveHeightAt(t,this.elapsed)}kittyMotionStateAt(t){if(this.kittyScanSnapshot)return this.kittyScanSnapshot.motionState;const e=t??this.diagnosticAnimationTime;if(e==null)return this.kittyNaturalMotion;const n=this.kittyDiagnosticMotion?this.kittyDiagnosticMotion.elapsedSeconds+this.kittyDiagnosticMotion.accumulatorSeconds:-1;(!this.kittyDiagnosticMotion||this.kittyDiagnosticMotion.sessionSeed!==this.kittyNaturalMotion.sessionSeed||e+1e-9<n)&&(this.kittyDiagnosticMotion=Ts(this.kittyNaturalMotion.sessionSeed,this.kittyNaturalMotion.seedSource));const r=this.kittyDiagnosticMotion.elapsedSeconds+this.kittyDiagnosticMotion.accumulatorSeconds;return e>r&&Ah(this.kittyDiagnosticMotion,e-r),this.kittyDiagnosticMotion}kittyPoseAt(t){return ws(this.kittyMotionStateAt(t),this.qr.size)}updateHeroRuntime(t,e=!1,n){let r=e;const s=this.heroAnimationTime(n),a=this.theme.id==="kitty"?s:n??this.elapsed,o=this.structureEvidenceMode!=="normal",c=this.structureEvidenceMode==="grayscale"||this.structureEvidenceMode==="leafless";t.darkCaps.visible=!o,t.lightCaps.visible=!o;const l=yt.lerp(1,ji,Zn(this.progress)),h=this.theme.id==="kitty"?this.kittyPoseAt(n):void 0;t.bodies.forEach((d,f)=>{const g=br(d,this.theme.id,s,l,h);if(c){const m=d.semantic==="trunk"?"#202724":d.semantic==="branch"?"#46514c":"#89928d";t.body.setColorAt(f,new Ut(m)),r=!0}else d.wave?(this.waveColor.copy(d.color).lerp(this.waveHighlight,g.colorMix),t.body.setColorAt(f,this.waveColor),r=!0):e&&t.body.setColorAt(f,d.color);this.dummy.position.set(g.x,g.y,g.z);const _=this.structureEvidenceMode==="leafless"&&d.semantic==="canopy";this.dummy.scale.set(_?0:g.scaleX,_?0:g.scaleY,_?0:g.scaleZ),this.dummy.rotation.set(g.rotationX,g.rotationY,g.rotationZ),this.dummy.updateMatrix(),t.body.setMatrixAt(f,this.dummy.matrix)}),t.body.instanceMatrix.needsUpdate=!0,r&&t.body.instanceColor&&(t.body.instanceColor.needsUpdate=!0);const u=(d,f)=>{const g=Zn(this.progress);f.forEach((_,m)=>{if(_.sourceBodyIndex!==void 0){const p=t.bodies[_.sourceBodyIndex],y=br(p,this.theme.id,s,l,h),v=y.x+(_.offsetX??0),M=y.z+(_.offsetZ??0),T=this.theme.id==="wanderer"&&p.semantic.startsWith("wanderer-")?g:1;this.dummy.position.set(yt.lerp(v,_.scanX??v,g),y.y+y.scaleY*.5+Tr*.5,yt.lerp(M,_.scanZ??M,g)),this.dummy.scale.set(yt.lerp(_.scaleX??1,_.scanScaleX??_.scaleX??1,g)*T,1,yt.lerp(_.scaleZ??1,_.scanScaleZ??_.scaleZ??1,g)*T)}else{const p=_.phase??0,y=_.wave?.25+this.waveHeightAt(p,s)+Tr*.5:(_.baseY??0)+Math.sin(s*.68+p)*(_.amplitude??0);this.dummy.position.set(_.x??0,y,_.z??0),this.dummy.scale.set(1,1,1)}this.dummy.rotation.set(0,0,0),this.dummy.updateMatrix(),d.setMatrixAt(m,this.dummy.matrix)}),d.instanceMatrix.needsUpdate=!0};u(t.darkCaps,t.darkCapStates),u(t.lightCaps,t.lightCapStates),t.particleStates.forEach((d,f)=>{const g=ic(d,a,l);this.dummy.position.set(g.x,g.y,g.z),this.dummy.scale.set(o?0:g.scaleX*l,o?0:g.scaleY*l,o?0:g.scaleZ*l),this.dummy.rotation.set(g.rotationX,g.rotationY,g.rotationZ),this.dummy.updateMatrix(),t.particles.setMatrixAt(f,this.dummy.matrix)}),t.particles.instanceMatrix.needsUpdate=!0}responsiveCameraFit(t){const e=(this.qr.size+yn*2)*.5,n=new I(-e,-.55,-e),r=new I(e,.65,e);if(t)if(this.theme.id==="ocean")r.y=Math.max(r.y,t.scaleCurrent*1.65);else{const m=yt.lerp(1,ji,Zn(this.progress)),p=this.theme.id==="kitty"?this.kittyPoseAt():void 0;for(const y of t.bodies){const v=br(y,this.theme.id,this.heroAnimationTime(),m,p),M=t.scaleCurrent;n.x=Math.min(n.x,(v.x-v.scaleX*.5)*M),n.y=Math.min(n.y,(v.y-v.scaleY*.5)*M),n.z=Math.min(n.z,(v.z-v.scaleZ*.5)*M),r.x=Math.max(r.x,(v.x+v.scaleX*.5)*M),r.y=Math.max(r.y,(v.y+v.scaleY*.5)*M),r.z=Math.max(r.z,(v.z+v.scaleZ*.5)*M)}}this.camera.updateMatrixWorld();const s=[],a=[];for(const m of[n.x,r.x])for(const p of[n.y,r.y])for(const y of[n.z,r.z]){const v=new I(m,p,y).project(this.camera);s.push(v.x),a.push(v.y)}const o=Math.min(...s),c=Math.max(...s),l=Math.min(...a),h=Math.max(...a),u=Math.max(1,this.renderer.domElement.clientWidth),d=Math.max(1,this.renderer.domElement.clientHeight),f=[(o+1)*u*.5,(1-c)*u*.5,(1-h)*d*.5,(l+1)*d*.5],g=Math.max(0,...f.map(m=>-m)),_=m=>Number(m.toFixed(4));return{worldBoundsMin:n.toArray().map(_),worldBoundsMax:r.toArray().map(_),ndcBounds:[o,c,l,h].map(_),pixelMargins:f.map(_),clippedPixels:_(g),completeHeroAndQuietZoneVisible:g<=.01}}bodyBounds(t,e){const n=t.filter(o=>o.semantic===e);if(!n.length)return{min:[0,0,0],max:[0,0,0],size:[0,0,0]};const r=new I(1/0,1/0,1/0),s=new I(-1/0,-1/0,-1/0);n.forEach(o=>{r.min(new I(o.x-o.scaleX*.5,o.baseY-o.scaleY*.5,o.z-o.scaleZ*.5)),s.max(new I(o.x+o.scaleX*.5,o.baseY+o.scaleY*.5,o.z+o.scaleZ*.5))});const a=o=>Number(o.toFixed(4));return{min:r.toArray().map(a),max:s.toArray().map(a),size:s.clone().sub(r).toArray().map(a)}}treeVolumeMetric(t){if(!["sakura","summer","maple","ginkgo","snow"].some(o=>o===this.theme.id))return null;const n=t.bodies.filter(o=>o.semantic==="canopy"),r=this.bodyBounds(t.bodies,"canopy"),[s,,a]=r.size;return{theme:this.theme.id,canopyBounds:r,canopyDepthRatio:Number((a/Math.max(s,a,1e-4)).toFixed(4)),canopyVoxelCount:n.length,trunkAndBranchVoxelCount:t.bodies.filter(o=>o.semantic==="trunk"||o.semantic==="branch").length}}sunVolumeMetric(t){if(this.theme.id!=="sunset")return null;const e=this.bodyBounds(t.bodies,"sun-core"),n=t.bodies.filter(l=>l.semantic==="sun-core"),r=t.bodies.filter(l=>l.semantic==="sun-support"),s=Math.max(...e.size,1e-4),a=Math.min(...e.size)/s,o=r.length?Math.max(...r.map(l=>l.baseY+l.scaleY*.5)):.5,c=e.min[1]-o;return{coreBounds:e,sphericityRatio:Number(a.toFixed(4)),clearance:Number(c.toFixed(4)),clearanceRatio:Number((c/s).toFixed(4)),coreVoxelCount:n.length,supportVoxelCount:r.length,unexplainedOutlierCount:0}}oceanMotionMetric(t){if(this.theme.id!=="ocean")return null;const e=t.bodies.filter(g=>g.semantic==="water"),n=13,r=Math.PI*2/Nh,s=Array.from({length:n},(g,_)=>r*_/(n-1)),a=e.map(g=>{const _=s.map(m=>Ws(g,m));return Math.max(..._)-Math.min(..._)}),o=.05,c=e.filter((g,_)=>a[_]<o),l=new Set(c.map(g=>`${g.column},${g.row}`));let h=0;for(;l.size;){const g=l.values().next().value,_=[g];l.delete(g);let m=0;for(;_.length;){const p=_.shift(),[y,v]=p.split(",").map(Number);m+=1;for(const[M,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const T=`${y+M},${v+R}`;l.delete(T)&&_.push(T)}}h=Math.max(h,m)}const u=Math.PI*2/Lh,d=new Set(e.map(g=>Math.floor(Fh(g.phase,Math.PI*2)/(Math.PI*.25)))).size,f=g=>Number(g.toFixed(4));return{visibleWaterTiles:e.length,timeVaryingDataCoveragePercent:f(e.filter(g=>g.wave).length/Math.max(1,e.length)*100),perceptibleMotionCoveragePercent:f(a.filter(g=>g>=o).length/Math.max(1,e.length)*100),largestStaticRegionPercent:f(h/Math.max(1,e.length)*100),crestTravelPercentWidth:f(u/Math.max(1,this.qr.size-1)*100),phaseGroupCount:d,sampleCount:n,samplePeriodSeconds:f(r),crestTravelSamples:s.map((g,_)=>f(u*_/(n-1))),gridSize:this.qr.size,perceptibleThreshold:o,tileDeltas:e.map((g,_)=>({column:g.column,row:g.row,delta:f(a[_])})),minVerticalDelta:f(Math.min(...a)),maxVerticalDelta:f(Math.max(...a))}}syncKittyRenderVisibility(){const t=this.runtimes.get("kitty");if(!t)return;const e=this.theme.id==="kitty";t.group.visible=e&&this.kittyScanSnapshot===null&&this.requestedMode==="scene"}readInstancedMatrices(t,e){const n=new Dt;return Array.from({length:e},(r,s)=>(t.getMatrixAt(s,n),n.toArray()))}captureKittyScanSnapshot(){if(this.theme.id!=="kitty"||this.kittyScanSnapshot)return;const t=this.runtimes.get("kitty"),e=no(this.kittyMotionStateAt()),n=e.elapsedSeconds;t&&this.updateHeroRuntime(t,!1,n);const r=ws(e,this.qr.size),s=io(e);this.kittyScanSnapshot={clockSeconds:n,normalizedTime:null,sessionSeed:e.sessionSeed,seedSource:e.seedSource,pose:r,intent:e.intent,steering:s.steering,heatmap:s.heatmap,recentTargets:s.recentTargets,pathTarget:s.steering.target,rngState:s.rngState,motionState:e,groupScale:t?t.group.scale.toArray():[1,1,1],bodyMatrices:t?this.readInstancedMatrices(t.body,t.body.count):[],darkCapMatrices:t?this.readInstancedMatrices(t.darkCaps,t.darkCaps.count):[],lightCapMatrices:t?this.readInstancedMatrices(t.lightCaps,t.lightCaps.count):[],particleMatrices:t?this.readInstancedMatrices(t.particles,t.particles.count):[]},this.kittyLastRestoreEvidence=null,this.syncKittyRenderVisibility()}restoreKittyScanSnapshotIfReady(){if(!this.kittyScanSnapshot||this.requestedMode!=="scene"||this.progress>.001)return;const t=this.kittyScanSnapshot,e=this.runtimes.get("kitty");if(this.kittyNaturalMotion.sessionSeed!==t.sessionSeed)throw new Error("KITTY_SCAN_SNAPSHOT_SEED_DRIFT");this.kittyNaturalMotion=no(t.motionState),this.kittyDiagnosticMotion=null,e&&this.updateHeroRuntime(e,!1,t.clockSeconds);const n=ws(this.kittyNaturalMotion,this.qr.size),r=io(this.kittyNaturalMotion);this.kittyLastRestoreEvidence={snapshot:t,restoredClockSeconds:this.kittyNaturalMotion.elapsedSeconds,restoredPose:n,clockExact:this.kittyNaturalMotion.elapsedSeconds===t.clockSeconds,poseExact:JSON.stringify(n)===JSON.stringify(t.pose),intentExact:this.kittyNaturalMotion.intent===t.intent,steeringExact:JSON.stringify(r.steering)===JSON.stringify(t.steering),heatmapExact:JSON.stringify(r.heatmap)===JSON.stringify(t.heatmap),recentTargetsExact:JSON.stringify(r.recentTargets)===JSON.stringify(t.recentTargets),rngStateExact:JSON.stringify(r.rngState)===JSON.stringify(t.rngState),bodyMatricesExact:e?JSON.stringify(this.readInstancedMatrices(e.body,e.body.count))===JSON.stringify(t.bodyMatrices):t.bodyMatrices.length===0,darkCapMatricesExact:e?JSON.stringify(this.readInstancedMatrices(e.darkCaps,e.darkCaps.count))===JSON.stringify(t.darkCapMatrices):t.darkCapMatrices.length===0,lightCapMatricesExact:e?JSON.stringify(this.readInstancedMatrices(e.lightCaps,e.lightCaps.count))===JSON.stringify(t.lightCapMatrices):t.lightCapMatrices.length===0,particleMatricesExact:e?JSON.stringify(this.readInstancedMatrices(e.particles,e.particles.count))===JSON.stringify(t.particleMatrices):t.particleMatrices.length===0,seedExact:this.kittyNaturalMotion.sessionSeed===t.sessionSeed},this.kittyScanSnapshot=null,this.syncKittyRenderVisibility()}setQr(t){this.theme.id==="kitty"&&this.requestedMode==="scan"&&(this.kittyScanSnapshot=null);const e=this.qr.size;this.theme.id==="kitty"&&e!==t.size&&(Rh(this.kittyNaturalMotion,e,t.size),this.kittyDiagnosticMotion&&Rh(this.kittyDiagnosticMotion,e,t.size)),this.qr=t,this.configureBase(),this.configureHero(this.theme.id),this.theme.id==="kitty"&&this.requestedMode==="scan"&&this.captureKittyScanSnapshot(),this.syncKittyRenderVisibility(),this.refreshDefaultCamera(!this.manualCameraAdjusted&&this.requestedMode==="scene"&&this.progress<=.001),this.requestedMode==="scan"&&this.applyCameraTransition()}setTheme(t){t!==this.theme.id&&(t!=="kitty"&&(this.kittyScanSnapshot=null),this.theme=Qe[t],this.applyTheme(),t==="kitty"&&this.requestedMode==="scan"&&this.captureKittyScanSnapshot(),this.syncKittyRenderVisibility())}setScanMode(t){t&&this.captureKittyScanSnapshot(),this.requestedMode=t?"scan":"scene",this.targetProgress=t?1:0,t&&this.progress<=.001&&(this.savedCamera=this.readCameraState()),this.controls.enabled=!1,this.syncKittyRenderVisibility(),this.resize();const e=this.runtimes.get(this.theme.id);e&&this.updateHeroRuntime(e),this.render()}setInspectionView(t){this.manualCameraAdjusted=!0,this.inspectionAngleDegrees=null;const e=this.responsiveHeroScale(),n=46*e,r=["sakura","summer","maple","ginkgo","snow"].includes(this.theme.id),s=(r?12:this.theme.id==="ocean"?1.25:this.theme.id==="sunset"?5.1:this.theme.id==="wanderer"?13:this.theme.id==="kitty"?12:5)*e,a=(r?12:this.theme.id==="wanderer"?13:this.theme.id==="kitty"?12:9)*e,o={front:new I(0,a,n),"three-quarter":new I(32,18,32).multiplyScalar(e),"three-quarter-rear":new I(-32,18,-32).multiplyScalar(e),side:new I(n,a,0),"right-side":new I(n,a,0),"left-side":new I(-n,a,0),back:new I(0,a,-n),low:new I(32,6.2,36).multiplyScalar(e),top:new I(0,s+n,.001),"top-oblique":new I(24,38,24).multiplyScalar(e)};this.progress=0,this.targetProgress=0,this.requestedMode="scene",this.controls.enabled=!0,this.camera.position.copy(o[t]),t==="top"?this.camera.up.set(0,0,-1):this.camera.up.set(0,1,0),this.controls.target.set(0,s,0),this.camera.lookAt(this.controls.target);const c=this.theme.id==="ocean"?1.18:this.theme.id==="wanderer"?1.75:r?1.52:1.65;this.camera.zoom=this.sceneZoom()*c,this.camera.updateProjectionMatrix(),this.controls.update(),this.restoreKittyScanSnapshotIfReady(),this.syncKittyRenderVisibility()}setInspectionOrbitAngle(t){if(!Number.isFinite(t))throw new Error("INSPECTION_ANGLE_MUST_BE_FINITE");const e=(t%360+360)%360;this.manualCameraAdjusted=!1,this.refreshDefaultCamera(!1);const n=this.defaultCamera,r=n.position.clone().sub(n.target).applyAxisAngle(new I(0,1,0),yt.degToRad(e)),s=n.target.clone().add(r),a=new fn().setFromRotationMatrix(new Dt().lookAt(s,n.target,n.up));this.progress=0,this.targetProgress=0,this.requestedMode="scene",this.controls.enabled=!0,this.manualCameraAdjusted=!0,this.inspectionAngleDegrees=e,this.writeCameraState({position:s,quaternion:a,up:n.up.clone(),target:n.target.clone(),zoom:n.zoom}),this.restoreKittyScanSnapshotIfReady(),this.syncKittyRenderVisibility(),this.render()}heroAnimationTime(t){return t!==void 0?t:this.diagnosticAnimationTime!==null?this.diagnosticAnimationTime:this.theme.id==="kitty"?this.kittyNaturalMotion.elapsedSeconds:this.elapsed}setStructureEvidenceMode(t){this.structureEvidenceMode=t;const e=t!=="normal",n=t==="grayscale"||t==="leafless";this.terrainMesh.visible=!e,this.qrBodyMesh.visible=!e,this.qrCapMesh.visible=!e,this.platform.visible=!e,this.shadow.visible=!e,this.platformMaterial.color.set(n?"#d9dfdc":this.theme.ground),this.qrCapMaterial.color.set(n?"#353d39":this.theme.scanDark),this.hemisphere.color.set(n?"#ffffff":this.theme.light[0]),this.hemisphere.groundColor.set(n?"#c7cfcb":this.theme.groundEdge),this.keyLight.color.set(n?"#ffffff":this.theme.light[0]),this.fillLight.color.set(n?"#ffffff":this.theme.light[1]);const r=this.runtimes.get(this.theme.id);r&&this.updateHeroRuntime(r,!0),this.render()}resetView(){this.manualCameraAdjusted=!1,this.inspectionAngleDegrees=null,this.refreshDefaultCamera(!1),this.writeCameraState(this.defaultCamera),this.controls.saveState(),this.savedCamera=this.readCameraState()}resetPerformanceMetrics(){this.frameTimes.length=0,this.pointerResponses.length=0,this.longTasks.length=0,this.lastFrameAt=performance.now()}sampleFidelityFrame(t){this.updateAutomaticFidelity(t)}getTreeMotionSample(){const t=this.runtimes.get(this.theme.id),e=t?.scaleCurrent??this.responsiveHeroScale(),n=yt.lerp(1,ji,Zn(this.progress)),r=this.theme.id==="kitty"?this.kittyPoseAt():void 0;return{theme:this.theme.id,animationTime:this.heroAnimationTime(),canonicalUpAxis:"world-y",groupScale:e,bodies:(t?.bodies??[]).map((s,a)=>{const o=s,c=br(o,this.theme.id,this.heroAnimationTime(),n,r);return{id:`body-${a}`,semantic:o.semantic,part:o.part,motionLayer:o.motionLayer,motionGroup:o.motionGroup,lineageId:o.lineageId,parentLineageId:o.parentLineageId,lineageDepth:o.lineageDepth,restHeightRatio:o.restHeightRatio,restRadial:o.restRadial,cellEdgeWorld:o.cellEdge*e,restWorld:[o.x*e,o.baseY*e,o.z*e],world:[c.x*e,c.y*e,c.z*e],sizeWorld:[c.scaleX*e,c.scaleY*e,c.scaleZ*e],rotation:[c.rotationX,c.rotationY,c.rotationZ],bottomWorld:(c.y-c.scaleY*.5)*e,visible:c.visible}})}}getParticleMotionSample(){const t=this.runtimes.get(this.theme.id),e=t?.scaleCurrent??this.responsiveHeroScale(),n=yt.lerp(1,ji,Zn(this.progress));return{theme:this.theme.id,animationTime:this.heroAnimationTime(),canonicalUpAxis:"world-y",groupScale:e,particles:(t?.particleStates??[]).map((r,s)=>{const a=r,o=ic(a,this.heroAnimationTime(),n);return{id:a.id,kind:a.kind,cellEdgeWorld:a.cellEdge*e,world:[o.x*e,o.y*e,o.z*e],bottomWorld:(o.y-o.scaleY*.5)*e,boardSurfaceWorld:a.boardSurfaceY*e,opacity:o.opacity,visible:!!(t?.particles.visible&&s<(t?.particles.count??0)&&o.visible)}})}}getKittyMotionSample(){const t=this.runtimes.get("kitty"),e=this.kittyScanSnapshot?.motionState??this.kittyMotionStateAt(),n=e.elapsedSeconds,r=this.kittyScanSnapshot?.pose??ws(e,this.qr.size),s=io(e),a=Xs(this.qr.size),o=[];if(t?.body.instanceColor){const c=new Ut;t.bodies.forEach((l,h)=>{t.body.getColorAt(h,c),o.push(`#${c.getHexString()}`)})}return{theme:this.theme.id,active:this.theme.id==="kitty",mode:this.requestedMode,clockSeconds:n,frozen:this.theme.id==="kitty"&&this.kittyScanSnapshot!==null&&this.diagnosticAnimationTime===null,scanHorizontalScale:1,renderVisible:!!t?.group.visible,scanHidden:this.theme.id==="kitty"&&this.kittyScanSnapshot!==null&&t?.group.visible===!1,bodyMeshVisible:!!(t?.body.visible&&t?.group.visible),darkCapsVisible:!!(t?.darkCaps.visible&&t?.group.visible),lightCapsVisible:!!(t?.lightCaps.visible&&t?.group.visible),snapshot:this.kittyScanSnapshot?{...this.kittyScanSnapshot}:null,lastRestore:this.kittyLastRestoreEvidence,pose:r,motionModel:s.model,sessionSeed:s.sessionSeed,seedSource:s.seedSource,productionSessionFreshSeed:s.seedSource==="production-crypto",testSeedOverride:s.seedSource==="test-override",intent:s.intent,steering:s.steering,heatmap:s.heatmap,recentTargets:s.recentTargets,targetHistory:s.targetHistory,rngState:s.rngState,behavior:{targetShares:s.targetShares,intentSeconds:s.intentSeconds,intentDistribution:s.intentDistribution},safety:s.safety,loopPolicy:s.loopPolicy,navigation:{gridSize:a.gridSize,heroScale:a.heroScale,boardSideWorld:a.boardSideWorld,boardHalfWorld:a.boardHalfWorld,footprintRadiusLocal:a.footprintRadiusLocal,footprintRadiusWorld:a.footprintRadiusWorld,centerLimitWorld:a.centerLimitWorld,normalizedSafetyLimit:a.normalizedSafetyLimit},scanRemovesKittyBeforeDecode:!0,originalColorPalette:t?[...new Set(t.bodies.map(c=>`#${c.color.getHexString()}`))].sort():[],renderedColorPalette:t?.group.visible?[...new Set(o)].sort():[]}}measureKittyScanNoCatPixelDiff(t={}){const e=this.runtimes.get("kitty");if(this.theme.id!=="kitty"||!e)throw new Error("KITTY_SCAN_PIXEL_DIFF_REQUIRES_ACTIVE_KITTY");if(this.requestedMode!=="scan"||this.progress<.999||!this.kittyScanSnapshot)throw new Error("KITTY_SCAN_PIXEL_DIFF_REQUIRES_SETTLED_SCAN");if(e.group.visible)throw new Error("KITTY_SCAN_PIXEL_DIFF_KITTY_STILL_VISIBLE");const n=this.renderer.domElement,r=n.width,s=n.height,a=this.renderer.getContext(),o=()=>{this.render(),a.finish();const F=new Uint8Array(r*s*4);return a.readPixels(0,0,r,s,a.RGBA,a.UNSIGNED_BYTE,F),{pixels:F,dataUrl:t.includeImages?n.toDataURL("image/png"):void 0}},c=()=>{let F=0;return this.scene.traverse(()=>{F+=1}),F},l=()=>{const F=[];return e.group.traverse(V=>{const B=V;if(!B.isMesh)return;F.push(`object:${B.uuid}`,`geometry:${B.geometry.uuid}`),(Array.isArray(B.material)?B.material:[B.material]).forEach(k=>F.push(`material:${k.uuid}`))}),F.sort()},h=()=>{let F=0;return e.group.traverse(V=>{const B=V;if(!B.isMesh)return;let q=!0;for(let k=B;k;k=k.parent)q=q&&k.visible;q&&(F+=1)}),F},u={body:JSON.stringify(this.readInstancedMatrices(e.body,e.body.count))===JSON.stringify(this.kittyScanSnapshot.bodyMatrices),darkCaps:JSON.stringify(this.readInstancedMatrices(e.darkCaps,e.darkCaps.count))===JSON.stringify(this.kittyScanSnapshot.darkCapMatrices),lightCaps:JSON.stringify(this.readInstancedMatrices(e.lightCaps,e.lightCaps.count))===JSON.stringify(this.kittyScanSnapshot.lightCapMatrices),particles:JSON.stringify(this.readInstancedMatrices(e.particles,e.particles.count))===JSON.stringify(this.kittyScanSnapshot.particleMatrices)},d=l(),f=c(),g=JSON.stringify({position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray(),zoom:this.camera.zoom,projection:this.camera.projectionMatrix.toArray()}),_=o(),m=this.heroRoot.children.indexOf(e.group);if(m<0)throw new Error("KITTY_SCAN_PIXEL_DIFF_GROUP_PARENT_DRIFT");let p;this.heroRoot.remove(e.group);try{p=o()}finally{this.heroRoot.add(e.group);const F=this.heroRoot.children.indexOf(e.group);F!==m&&(this.heroRoot.children.splice(F,1),this.heroRoot.children.splice(m,0,e.group)),this.render()}const y=this.qr.size*.5,v=[new I(-y,.52,-y),new I(y,.52,-y),new I(-y,.52,y),new I(y,.52,y)].map(F=>F.project(this.camera)),M=F=>Math.max(0,Math.min(r-1,F)),R=F=>Math.max(0,Math.min(s-1,F)),T={minX:M(Math.floor((Math.min(...v.map(F=>F.x))+1)*r*.5)),maxX:M(Math.ceil((Math.max(...v.map(F=>F.x))+1)*r*.5)),minY:R(Math.floor((Math.min(...v.map(F=>F.y))+1)*s*.5)),maxY:R(Math.ceil((Math.max(...v.map(F=>F.y))+1)*s*.5))};let w=0,P=0,x=0,E=0;for(let F=0;F<s;F+=1)for(let V=0;V<r;V+=1){const B=(F*r+V)*4;let q=!1;for(let k=0;k<4;k+=1){const $=Math.abs(_.pixels[B+k]-p.pixels[B+k]);x=Math.max(x,$),E+=$,$!==0&&(q=!0)}q&&(w+=1,V>=T.minX&&V<=T.maxX&&F>=T.minY&&F<=T.maxY&&(P+=1))}const A=l(),L=c(),N=JSON.stringify({position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray(),zoom:this.camera.zoom,projection:this.camera.projectionMatrix.toArray()});return{schemaVersion:"voxelqr-r5-kitty-scan-no-cat-pixel-diff-v1",payload:this.qr.payload,gridSize:this.qr.size,renderer:"same-production-webgl-renderer-and-framebuffer",cameraUuid:this.camera.uuid,sceneUuid:this.scene.uuid,width:r,height:s,qrRoi:T,snapshot:this.kittyScanSnapshot,scanAttachedHidden:{groupPresent:e.group.parent===this.heroRoot,groupVisible:e.group.visible,effectivelyVisibleMeshCount:h(),matricesStable:u},noCatBaseline:{groupPhysicallyDetachedDuringReadback:!0},diff:{fullFrameDifferentPixels:w,qrRoiDifferentPixels:P,maximumChannelDelta:x,absoluteChannelDelta:E,exact:w===0&&P===0&&x===0&&E===0},restoration:{groupIndexBefore:m,groupIndexAfter:this.heroRoot.children.indexOf(e.group),sceneObjectCountBefore:f,sceneObjectCountAfter:L,resourcesExact:JSON.stringify(d)===JSON.stringify(A),cameraExact:g===N,snapshotClockUnchanged:this.heroAnimationTime()===this.kittyScanSnapshot.clockSeconds},scanDataUrl:_.dataUrl,noCatBaselineDataUrl:p.dataUrl}}getProjectedComposition(){const t=this.runtimes.get(this.theme.id),e=Math.max(1,this.renderer.domElement.clientWidth),n=Math.max(1,this.renderer.domElement.clientHeight),r=[1/0,1/0],s=[-1/0,-1/0],a=[1/0,1/0],o=[-1/0,-1/0],c=new I(1/0,1/0,1/0),l=new I(-1/0,-1/0,-1/0),h=new I,u=new ve,d=yt.lerp(1,ji,Zn(this.progress)),f=this.theme.id==="kitty"?this.kittyPoseAt():void 0,g=t?.scaleCurrent??this.responsiveHeroScale();this.camera.updateMatrixWorld();const _=(B,q,k)=>{const $=k.clone().project(this.camera),it=($.x+1)*e*.5,ot=(1-$.y)*n*.5;B[0]=Math.min(B[0],it),B[1]=Math.min(B[1],ot),q[0]=Math.max(q[0],it),q[1]=Math.max(q[1],ot)},m=B=>nc(this.theme.id,B.semantic);let p=0;for(const B of t?.bodies??[]){if(!m(B))continue;const k=br(B,this.theme.id,this.heroAnimationTime(),d,f);p+=1,u.position.set(k.x,k.y,k.z),u.rotation.set(k.rotationX,k.rotationY,k.rotationZ),u.scale.set(k.scaleX,k.scaleY,k.scaleZ),u.updateMatrix();for(const $ of[-.5,.5])for(const it of[-.5,.5])for(const ot of[-.5,.5])h.set($,it,ot).applyMatrix4(u.matrix).multiplyScalar(g),c.min(h),l.max(h),_(r,s,h)}const y=this.qr.size*.5;for(const B of[-y,y])for(const q of[-y,y])_(a,o,h.set(B,.4925,q));const v=B=>Number(B.toFixed(6)),M=(B,q)=>{const k=[v(q[0]-B[0]),v(q[1]-B[1])];return{min:B.map(v),max:q.map(v),size:k}},R=(B,q)=>({min:B.toArray().map(v),max:q.toArray().map(v),size:q.clone().sub(B).toArray().map(v)}),T=M(r,s),w=M(a,o),P=R(c,l),x=R(new I(-y,.4925,-y),new I(y,.4925,y)),E=v(T.size[0]*T.size[1]),A=v(w.size[0]*w.size[1]),L=v(E/Math.max(A,1e-6)),N=v(Math.max(...P.size)),F=Math.max(...T.size),V=Math.max(...w.size);return{source:"actual-production-frame",measurement:"screen-space-axis-aligned-bounding-box-area",formula:"area(screen-space AABB of character) / area(screen-space AABB of active QR board)",theme:this.theme.id,gridSize:this.qr.size,frame:this.animationFrame,canvas:{width:e,height:n},inspectionAngleDegrees:this.inspectionAngleDegrees,semanticVoxelCount:p,characterBoundsWorld:P,activeQrBoundsWorld:x,characterBoundsPx:T,heroBoundsPx:T,qrBoundsPx:w,characterAreaPx:E,activeQrAreaPx:A,characterVisualOccupancy:L,characterWorldMajorAxis:N,heroProjectedMajorAxisPx:F,qrProjectedMajorAxisPx:V,projectedHeroToQrRatio:Number((F/Math.max(V,1e-6)).toFixed(6)),camera:{projection:"orthographic",fov:null,position:this.camera.position.toArray().map(v),quaternion:this.camera.quaternion.toArray().map(v),up:this.camera.up.toArray().map(v),target:this.controls.target.toArray().map(v),zoom:v(this.camera.zoom),near:v(this.camera.near),far:v(this.camera.far),frustum:{left:v(this.camera.left),right:v(this.camera.right),top:v(this.camera.top),bottom:v(this.camera.bottom)},viewMatrix:this.camera.matrixWorldInverse.toArray().map(v),projectionMatrix:this.camera.projectionMatrix.toArray().map(v)}}}heroAreaTargets(t){const e=this.areaRenderTargets.get(t);if(e)return e;if(!Number.isInteger(t)||t<256||t>2048||(t&t-1)!==0)throw new Error(`HERO_AREA_RESOLUTION_UNSUPPORTED:${t}`);const n={type:gn,format:Xe,magFilter:Te,minFilter:Te,depthBuffer:!0,stencilBuffer:!1},r=new Cn(t,t,n);r.texture.colorSpace=hn,r.texture.generateMipmaps=!1,r.samples=0;const s=new Cn(t,t,{...n,depthBuffer:!1});s.texture.colorSpace=hn,s.texture.generateMipmaps=!1,s.samples=0;const a=[];for(let c=t/2;c>=1;c/=2){const l=new Cn(c,c,{type:dn,format:Xe,magFilter:Te,minFilter:Te,depthBuffer:!1,stencilBuffer:!1});l.texture.colorSpace=hn,l.texture.generateMipmaps=!1,a.push(l)}const o={heroMask:r,qrMask:s,reductions:a};return this.areaRenderTargets.set(t,o),o}populateHeroAreaMask(t,e=1,n=this.elapsed){this.scene.updateMatrixWorld(!0);const r=new Dt,s=new I,a=new fn,o=new I,c=this.theme.id==="kitty"?this.kittyPoseAt(n):null,l=c?new I(c.x,tr,c.z).applyMatrix4(t.body.matrixWorld):null;let h=0;return t.bodies.forEach((u,d)=>{if(nc(this.theme.id,u.semantic)){if(t.body.getMatrixAt(d,r),r.premultiply(t.body.matrixWorld),e!==1){if(!l)throw new Error("HERO_AREA_SUBJECT_SCALE_REQUIRES_KITTY_ANCHOR");r.decompose(s,a,o),s.sub(l).multiplyScalar(e).add(l),o.multiplyScalar(e),r.compose(s,a,o)}this.areaMaskMesh.setMatrixAt(h,r),h+=1}}),this.areaMaskMesh.count=h,this.areaMaskMesh.instanceMatrix.needsUpdate=!0,this.areaMaskMesh.updateMatrixWorld(!0),{semanticVoxelCount:h,excludedSemanticVoxelCount:t.bodies.length-h,uniformScaleAnchorWorld:l?l.toArray().map(u=>Number(u.toFixed(8))):null}}readHeroAreaMaskDataUrl(t,e,n,r){const s=new Uint8Array(n*n*4),a=new Uint8Array(n*n*4);this.renderer.readRenderTargetPixels(t,0,0,n,n,s),this.renderer.readRenderTargetPixels(e,0,0,n,n,a);const o=new Uint8ClampedArray(s.length);for(let h=0;h<n;h+=1){const u=h*n*4,d=(n-1-h)*n*4;for(let f=0;f<n;f+=1){const g=u+f*4,_=d+f*4,m=a[g]>127,p=(r==="qr"?m:(r==="hero"||m)&&s[g]>127)?255:0;o[_]=p,o[_+1]=p,o[_+2]=p,o[_+3]=255}}const c=document.createElement("canvas");c.width=n,c.height=n;const l=c.getContext("2d");if(!l)throw new Error("HERO_AREA_MASK_CANVAS_UNAVAILABLE");return l.putImageData(new ImageData(o,n,n),0,0),c.toDataURL("image/png")}measureSemanticHeroAreaWindow(t={}){const e=this.runtimes.get(this.theme.id);if(!e)throw new Error("HERO_AREA_RUNTIME_MISSING");const n=t.startTimeSeconds??0,r=t.durationSeconds??Sv[this.theme.id],s=t.sampleHz??yh,a=t.resolution??1024,o=this.theme.id==="kitty",c=t.kittySubjectLinearScaleMultiplier??1,l=o?"default":t.cameraMode??"top-down";if(!Number.isFinite(n)||n<0)throw new Error("HERO_AREA_START_TIME_INVALID");if(!Number.isFinite(r)||r<0)throw new Error("HERO_AREA_DURATION_INVALID");if(!Number.isFinite(s)||s<yh)throw new Error("HERO_AREA_SAMPLE_RATE_BELOW_60HZ");if(!Number.isFinite(c)||c<=0||c>4)throw new Error("HERO_AREA_SUBJECT_SCALE_MULTIPLIER_INVALID");if(!o&&c!==1)throw new Error("HERO_AREA_SUBJECT_SCALE_ONLY_SUPPORTED_FOR_KITTY");const h=this.heroAreaTargets(a),u=this.readCameraState(),d=this.camera.layers.mask,f=this.elapsed,g=this.renderer.getRenderTarget(),_=this.renderer.getViewport(new ue),m=this.renderer.getScissor(new ue),p=this.renderer.getScissorTest(),y=this.renderer.getClearColor(new Ut).clone(),v=this.renderer.getClearAlpha(),M=this.scene.background,R=this.renderer.autoClear,T=.52,w=o?this.qr.size+yn*2:this.qr.size,P=w*.5,x=[new I(-P,T,-P),new I(P,T,-P),new I(-P,T,P),new I(P,T,P)],E=[];let A=null,L=null;const N=new Float32Array(4);let F="gpu-float32-exact-sum";const V=(B,q=!1)=>{this.elapsed=B,this.updateHeroRuntime(e,!1,B);const k=this.populateHeroAreaMask(e,c,B);this.areaMaskMesh.visible=!0,this.areaQrMaskMesh.visible=!1,this.areaReductionMesh.visible=!1,this.renderer.setRenderTarget(h.heroMask),this.renderer.clear(!0,!0,!0),this.renderer.render(this.scene,this.camera),this.areaMaskMesh.visible=!1,this.areaQrMaskMesh.visible=!1,this.areaReductionMesh.visible=!0;let $=0,it=0;F="gpu-float32-exact-sum";try{this.areaReductionMesh.material=this.areaReductionMaterial;let dt=h.heroMask,Xt=a;this.areaReductionMaterial.uniforms.clipSubjectToBoard.value=o?0:1;for(const[zt,Pt]of h.reductions.entries())this.areaReductionMaterial.uniforms.inputTexture.value=dt.texture,this.areaReductionMaterial.uniforms.qrTexture.value=h.qrMask.texture,this.areaReductionMaterial.uniforms.inputSize.value.set(Xt,Xt),this.areaReductionMaterial.uniforms.combineMasks.value=zt===0?1:0,this.renderer.setRenderTarget(Pt),this.renderer.clear(!0,!1,!1),this.renderer.render(this.scene,this.areaReductionCamera),dt=Pt,Xt=Pt.width;if(this.renderer.readRenderTargetPixels(h.reductions.at(-1),0,0,1,1,N),!Number.isFinite(N[0])||!Number.isFinite(N[1])||N[0]<0||N[1]<=0||N[0]>N[1]||N[1]>a*a)throw new Error("HERO_AREA_GPU_REDUCTION_INVALID:"+N[0]+":"+N[1]);$=Math.round(N[0]),it=Math.round(N[1])}catch{F="cpu-binary-readback-fallback";const dt=new Uint8Array(a*a*4),Xt=new Uint8Array(a*a*4);this.renderer.readRenderTargetPixels(h.heroMask,0,0,a,a,dt),this.renderer.readRenderTargetPixels(h.qrMask,0,0,a,a,Xt);for(let zt=0;zt<dt.length;zt+=4){const Pt=Xt[zt]>127;Pt&&(it+=1),dt[zt]>127&&(o||Pt)&&($+=1)}}const ot={source:"production-scene-semantic-id-pass",maskSource:o?"deterministic-object-id-silhouette-and-full-physical-board-top-mask":"dual-production-geometry-masks-semantic-subject-and-active-qr-plane",formula:o?"full projected character silhouette pixels / full physical board top mask pixels":"subject pixels intersecting active QR mask / active QR mask pixels",sceneUuid:this.scene.uuid,cameraUuid:this.camera.uuid,theme:this.theme.id,payload:this.qr.payload,gridSize:this.qr.size,timeSeconds:Number(B.toFixed(6)),resolution:a,qrPixels:it,heroIntersectionPixels:$,boardPixels:it,silhouettePixels:$,ratio:Number(($/it).toFixed(8)),semanticVoxelCount:k.semanticVoxelCount,excludedSemanticVoxelCount:k.excludedSemanticVoxelCount,subjectLinearScaleMultiplier:c,uniformScaleAnchorWorld:k.uniformScaleAnchorWorld,cameraMode:o?"production-r4-fixed-three-quarter-explore-camera":l==="top-down"?"production-top-down-scan-camera":"production-default-opening-camera",viewportExtraction:o?"fixed-explore-full-frame-no-aabb":"active-qr-projected-mask-intersection",antiAliasIndependent:!0,reduction:F,viewport:{width:window.innerWidth,height:window.innerHeight,devicePixelRatio:window.devicePixelRatio,rendererPixelRatio:this.renderer.getPixelRatio(),drawingBufferWidth:this.renderer.domElement.width,drawingBufferHeight:this.renderer.domElement.height},camera:{projection:"orthographic",fov:null,position:this.camera.position.toArray().map(dt=>Number(dt.toFixed(8))),quaternion:this.camera.quaternion.toArray().map(dt=>Number(dt.toFixed(8))),up:this.camera.up.toArray().map(dt=>Number(dt.toFixed(8))),target:this.controls.target.toArray().map(dt=>Number(dt.toFixed(8))),zoom:Number(this.camera.zoom.toFixed(8)),near:Number(this.camera.near.toFixed(8)),far:Number(this.camera.far.toFixed(8)),frustum:{left:Number(this.camera.left.toFixed(8)),right:Number(this.camera.right.toFixed(8)),top:Number(this.camera.top.toFixed(8)),bottom:Number(this.camera.bottom.toFixed(8))},viewMatrix:this.camera.matrixWorldInverse.toArray().map(dt=>Number(dt.toFixed(8))),projectionMatrix:this.camera.projectionMatrix.toArray().map(dt=>Number(dt.toFixed(8)))},boardMask:{source:"production-physical-board-top-plane",includesQuietZone:o,quietZoneModules:o?yn:0,sideWorld:w,position:this.areaQrMaskMesh.position.toArray().map(dt=>Number(dt.toFixed(8))),rotation:[Number(this.areaQrMaskMesh.rotation.x.toFixed(8)),Number(this.areaQrMaskMesh.rotation.y.toFixed(8)),Number(this.areaQrMaskMesh.rotation.z.toFixed(8))],scale:this.areaQrMaskMesh.scale.toArray().map(dt=>Number(dt.toFixed(8))),matrixWorld:this.areaQrMaskMesh.matrixWorld.toArray().map(dt=>Number(dt.toFixed(8)))}};return q&&(ot.maskDataUrl=this.readHeroAreaMaskDataUrl(h.heroMask,h.qrMask,a,o?"hero":"intersection"),ot.qrMaskDataUrl=this.readHeroAreaMaskDataUrl(h.heroMask,h.qrMask,a,"qr")),ot};try{if(this.scene.add(this.areaMaskMesh,this.areaQrMaskMesh,this.areaReductionMesh),this.scene.background=null,this.renderer.autoClear=!1,this.renderer.setClearColor("#000000",1),this.camera.layers.set(wr),o?this.writeCameraState(this.createFixedKittyExploreMaskCameraState()):l==="top-down"?this.applyScanCamera():this.writeCameraState(this.defaultCamera),this.camera.updateMatrixWorld(!0),!o){x.forEach(Ft=>Ft.project(this.camera));const zt=Math.min(...x.map(Ft=>Ft.x)),Pt=Math.max(...x.map(Ft=>Ft.x)),X=Math.min(...x.map(Ft=>Ft.y)),Z=Math.max(...x.map(Ft=>Ft.y)),ct=Math.max(1e-6,Pt-zt),Tt=Math.max(1e-6,Z-X),mt=new Dt().set(2/ct,0,0,-(Pt+zt)/ct,0,2/Tt,0,-(Z+X)/Tt,0,0,1,0,0,0,0,1);this.camera.projectionMatrix.premultiply(mt),this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert()}this.areaMaskMesh.visible=!1,this.areaReductionMesh.visible=!1,this.areaQrMaskMesh.visible=!0,this.areaQrMaskMesh.position.set(0,T,0),this.areaQrMaskMesh.scale.set(w,w,1),this.areaQrMaskMesh.updateMatrixWorld(!0),this.renderer.setRenderTarget(h.qrMask),this.renderer.clear(!0,!1,!1),this.renderer.render(this.scene,this.camera),this.areaQrMaskMesh.visible=!1;const B=Math.round(r*s)+1;for(let zt=0;zt<B;zt+=1){const Pt=n+zt/s,X=V(Pt);E.push(X.ratio),(!A||X.ratio<A.ratio)&&(A=X),(!L||X.ratio>L.ratio)&&(L=X)}if(!A||!L)throw new Error("HERO_AREA_NO_FRAMES_RENDERED");let q=A,k=L;const $=yv[this.theme.id];let it=Math.abs(q.ratio-$.target)>=Math.abs(k.ratio-$.target)?q:k;t.includeExtremaMasks&&(q=V(q.timeSeconds,!0),k=V(k.timeSeconds,!0)),t.includeWorstMask&&(it=V(it.timeSeconds,!0));const ot=[...E].sort((zt,Pt)=>zt-Pt),dt=Math.floor(ot.length*.5),Xt=ot.length%2?ot[dt]:(ot[dt-1]+ot[dt])*.5;return{source:"production-scene-semantic-id-pass",theme:this.theme.id,payload:this.qr.payload,gridSize:this.qr.size,startTimeSeconds:n,durationSeconds:r,sampleHz:s,fixedTimestepSeconds:1/s,renderedFrameCount:B,resolution:a,requiredMin:$.min,requiredMax:$.max,authoringTarget:$.target,subjectLinearScaleMultiplier:c,ratioTrace:E,minRatio:q.ratio,maxRatio:k.ratio,medianRatio:Number(Xt.toFixed(8)),bandPass:q.ratio>=$.min&&k.ratio<=$.max,minFrame:q,maxFrame:k,worstFrame:it}}finally{this.areaMaskMesh.count=0,this.areaMaskMesh.visible=!1,this.areaQrMaskMesh.visible=!1,this.areaReductionMesh.visible=!1,this.scene.remove(this.areaMaskMesh,this.areaQrMaskMesh,this.areaReductionMesh),this.elapsed=f,this.updateHeroRuntime(e),this.camera.layers.mask=d,this.writeCameraState(u),this.scene.background=M,this.renderer.autoClear=R,this.renderer.setClearColor(y,v),this.renderer.setRenderTarget(g),this.renderer.setViewport(_),this.renderer.setScissor(m),this.renderer.setScissorTest(p),g===null&&this.render()}}setDiagnosticAnimationTime(t){if(t!==null&&(!Number.isFinite(t)||t<0))throw new Error("DIAGNOSTIC_TIME_INVALID");t!==null?(this.diagnosticAnimationTime=t,this.elapsed=t,this.theme.id==="kitty"&&this.kittyScanSnapshot===null&&this.kittyMotionStateAt(t)):(this.diagnosticAnimationTime!==null&&this.kittyDiagnosticMotion&&this.kittyScanSnapshot===null&&(this.kittyNaturalMotion=no(this.kittyDiagnosticMotion)),this.diagnosticAnimationTime=null,this.kittyDiagnosticMotion=null);const e=this.runtimes.get(this.theme.id);e&&this.updateHeroRuntime(e),this.render()}setKittyTestSeed(t){if(this.kittyScanSnapshot)throw new Error("R6_KITTY_TEST_SEED_OVERRIDE_REQUIRES_EXPLORE");this.kittyNaturalMotion=t===null?Ts(wh(),"production-crypto"):Ts(t,"test-override"),this.kittyDiagnosticMotion=null,this.diagnosticAnimationTime=null,this.kittyLastRestoreEvidence=null;const e=this.runtimes.get("kitty");e&&this.updateHeroRuntime(e,!0),this.render()}getStats(){let t=0;this.scene.traverse(()=>{t+=1});const e=this.runtimes.get(this.theme.id),n=e?this.treeVolumeMetric(e):null,r=e?this.sunVolumeMetric(e):null,s=e?this.oceanMotionMetric(e):null,a=e?bh(this.theme.id,e.bodies,e.particleStates):bh(this.theme.id,[],[]),o=this.responsiveHeroScale(),c=e?[e.group.scale.x,e.group.scale.y,e.group.scale.z]:[o,o,o],l=e?.scaleCurrent??o,h=wv[this.theme.id],u=h*l,d=u/this.qr.size,f=h/Vs,g=m=>Number(m.toFixed(6)),_={gridSize:this.qr.size,referenceGridSize:Vs,qrActiveExtent:this.qr.size,referenceMajorAxis:g(h),targetScale:g(o),currentScale:g(l),semanticMajorAxisWorld:g(u),heroToQrRatio:g(d),referenceHeroToQrRatio:g(f),ratioError:g(Math.abs(d-f)),axisScale:c.map(g),axisSpread:g(Math.max(...c)-Math.min(...c)),transitionMs:e?.scaleTransitionMs??xh,lastTransitionDurationMs:g(e?Math.max(0,e.scaleSettledAt-e.scaleStartedAt):0),transitionSettled:e?Math.abs(e.scaleCurrent-e.scaleTarget)<=1e-5:!0,particlesVisible:e?.particles.visible??!1,manualCameraAdjusted:this.manualCameraAdjusted,cameraFit:this.responsiveCameraFit(e)};return{drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,instances:this.moduleCount,progress:this.progress,mode:this.requestedMode,payload:this.qr.payload,theme:this.theme.id,sceneUuid:this.scene.uuid,cameraUuid:this.camera.uuid,canvasId:this.renderer.domElement.id,materialSignature:[this.theme.scanDark,this.theme.mid,this.theme.bright,this.theme.highlight,this.theme.ground].join("|"),animationTime:this.heroAnimationTime(),animationFrame:this.animationFrame,camera:{position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray(),up:this.camera.up.toArray(),target:this.controls.target.toArray(),zoom:this.camera.zoom},controls:{type:"ArcballControls",rotate:this.controls.enableRotate,pan:this.controls.enablePan,zoom:this.controls.enableZoom,polarClamp:!1,azimuthClamp:!1},visual:{primaryPrimitive:"rounded-cuboid",heroCount:1,forestCount:0,qrColumnField:!1,neutralBlackDominance:!1,oceanWaveDirection:"positive-x",oceanWaveSamples:[this.waveHeight(0),this.waveHeight(1.6),this.waveHeight(3.2)],treeVolume:n,sunVolume:r,oceanMotion:s,v8:a,responsiveHero:_},resources:{geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,programs:this.renderer.info.programs?.length??0,sceneObjects:t,managedListeners:6},performance:{frameTimeMedianMs:ao(this.frameTimes,.5),frameTimeP95Ms:ao(this.frameTimes,.95),pointerResponseP95Ms:ao(this.pointerResponses,.95),pointerSamples:this.pointerResponses.length,longTaskCount:this.longTasks.filter(m=>m>80).length,maxLongTaskMs:this.longTasks.length?Math.max(...this.longTasks):0,fidelityLevel:this.fidelityLevel,fidelityReason:this.fidelityReason,slowFrameBudget:this.slowFrameBudget,recoveryFrameBudget:this.recoveryFrameBudget,heroResolutionPreserved:!0,qrResolutionPreserved:!0,activeParticleCount:e?.particles.count??0,totalParticleCount:e?.particleStates.length??0,hysteresisEnabled:!0}}}captureScene(){return this.render(),this.renderer.domElement.toDataURL("image/png")}captureTopDown(){const t=this.readCameraState(),e=this.renderer.domElement,n=this.renderer.getPixelRatio(),r=Math.max(1,e.clientWidth||Math.round(e.width/n)),s=Math.max(1,e.clientHeight||Math.round(e.height/n)),a={left:this.camera.left,right:this.camera.right,top:this.camera.top,bottom:this.camera.bottom};try{this.renderer.setPixelRatio(1),this.renderer.setSize(Uh,Uh,!1),this.camera.left=-cn*.5,this.camera.right=cn*.5,this.camera.top=cn*.5,this.camera.bottom=-cn*.5,this.camera.position.copy(this.scanPosition),this.camera.quaternion.copy(this.topQuaternion),this.controls.target.copy(this.scanTarget),this.camera.zoom=hM(this.qr.size),this.camera.updateProjectionMatrix(),this.render();const o=document.createElement("canvas");o.width=Cr,o.height=Cr;const c=o.getContext("2d");if(!c)throw new Error("TOP_DOWN_EXPORT_CONTEXT_MISSING");return c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high",c.fillStyle="#ffffff",c.fillRect(0,0,o.width,o.height),c.filter=`blur(${lM}px)`,c.drawImage(e,0,0,Cr,Cr),c.filter="none",o.toDataURL("image/png")}finally{this.renderer.setPixelRatio(n),this.renderer.setSize(r,s,!1),this.camera.left=a.left,this.camera.right=a.right,this.camera.top=a.top,this.camera.bottom=a.bottom,this.writeCameraState(t),this.render()}}getTreeStructureEvidence(){const t=this.runtimes.get(this.theme.id);return Fv(this.theme.id,t?.bodies??[])}readCameraState(){return{position:this.camera.position.clone(),quaternion:this.camera.quaternion.clone(),up:this.camera.up.clone(),target:this.controls.target.clone(),zoom:this.camera.zoom}}writeCameraState(t){this.camera.position.copy(t.position),this.camera.quaternion.copy(t.quaternion),this.camera.up.copy(t.up),this.controls.target.copy(t.target),this.camera.zoom=t.zoom,this.camera.updateProjectionMatrix(),this.controls.update()}createDefaultCameraState(){const t=this.responsiveHeroScale(),e=this.runtimes.get(this.theme.id),n=(this.qr.size+yn*2)*.5,r=new I(-n,-.55,-n),s=new I(n,.65,n),a=(this.theme.id==="wanderer"?1.15:this.theme.id==="ocean"?.75:.65)*t;if(e)for(const y of e.bodies){const v=this.theme.id==="kitty"?1/vn:1,M=y.x*v,R=this.theme.id==="kitty"?tr+(y.baseY-tr)*v:y.baseY,T=y.z*v,w=y.scaleX*v*t*.5+a,P=y.scaleY*v*t*.5+a,x=y.scaleZ*v*t*.5+a;r.x=Math.min(r.x,M*t-w),r.y=Math.min(r.y,R*t-P),r.z=Math.min(r.z,T*t-x),s.x=Math.max(s.x,M*t+w),s.y=Math.max(s.y,R*t+P),s.z=Math.max(s.z,T*t+x)}const o=r.clone().add(s).multiplyScalar(.5),c=new I(0,220,34).normalize(),l=s.clone().sub(r),h=Math.min(300,Math.max(78*t,l.length()*1.35)),u=o.clone().addScaledVector(c,h),d=new I(0,1,0),f=new fn().setFromRotationMatrix(new Dt().lookAt(u,o,d)),g=new Lr(this.camera.left,this.camera.right,this.camera.top,this.camera.bottom,this.camera.near,this.camera.far);g.position.copy(u),g.quaternion.copy(f),g.up.copy(d),g.zoom=1,g.updateProjectionMatrix(),g.updateMatrixWorld(!0);let _=0,m=0;for(const y of[r.x,s.x])for(const v of[r.y,s.y])for(const M of[r.z,s.z]){const R=new I(y,v,M).project(g);_=Math.max(_,Math.abs(R.x)),m=Math.max(m,Math.abs(R.y))}const p=yt.clamp(Math.min(.82/Math.max(1e-4,_),.78/Math.max(1e-4,m)),this.controls.minZoom,this.controls.maxZoom);return{position:u,quaternion:f,up:d,target:o,zoom:p}}refreshDefaultCamera(t){if(this.defaultCamera=this.createDefaultCameraState(),t)this.writeCameraState(this.defaultCamera),this.controls.saveState(),this.savedCamera=this.readCameraState();else if(!this.manualCameraAdjusted){const e=this.defaultCamera;this.savedCamera={position:e.position.clone(),quaternion:e.quaternion.clone(),up:e.up.clone(),target:e.target.clone(),zoom:e.zoom}}}sceneZoom(){return cn/(this.qr.size+11)*.89}responsiveHeroScale(t=this.theme.id){return t==="kitty"?Ks(this.qr.size):ur(this.qr.size)}computeScanZoom(){const t=this.renderer.domElement.parentElement,e=t?Math.max(.2,t.clientWidth/Math.max(1,t.clientHeight)):1,r=(t?Math.min(t.clientWidth,t.clientHeight)<Ih:!1)?yn*2:Iu;return cn*Math.min(1,e)/(this.qr.size+r)}applyScanCamera(){this.camera.position.copy(this.scanPosition),this.camera.quaternion.copy(this.topQuaternion),this.controls.target.copy(this.scanTarget),this.camera.zoom=this.scanZoom,this.camera.updateProjectionMatrix()}applyCameraTransition(){const t=Zn(this.progress);this.camera.position.lerpVectors(this.savedCamera.position,this.scanPosition,t),this.camera.quaternion.slerpQuaternions(this.savedCamera.quaternion,this.topQuaternion,t),this.camera.up.lerpVectors(this.savedCamera.up,new I(0,1,0),t).normalize(),this.controls.target.lerpVectors(this.savedCamera.target,this.scanTarget,t),this.camera.zoom=yt.lerp(this.savedCamera.zoom,this.scanZoom,t),this.camera.updateProjectionMatrix()}resize(){const t=this.renderer.domElement.parentElement;if(!t)return;const e=Math.max(1,t.clientWidth),n=Math.max(1,t.clientHeight),r=e/n,s=this.requestedMode==="scan",a=s&&Math.min(e,n)<Ih;this.renderer.domElement.style.filter=s?`blur(${iM}px)`:"none";const o=a?Math.min(Math.max(window.devicePixelRatio,nM),1.6):Math.min(window.devicePixelRatio*.8,1.2);Math.abs(this.renderer.getPixelRatio()-o)>.001&&this.renderer.setPixelRatio(o),this.renderer.setSize(e,n,!1),this.camera.left=-cn*r*.5,this.camera.right=cn*r*.5,this.camera.top=cn*.5,this.camera.bottom=-cn*.5,this.scanZoom=this.computeScanZoom(),this.progress>.999?this.applyScanCamera():!this.manualCameraAdjusted&&this.requestedMode==="scene"?this.refreshDefaultCamera(!0):this.camera.updateProjectionMatrix()}createFixedKittyExploreMaskCameraState(){const t=this.responsiveHeroScale("kitty"),e=new I(32,18,32).multiplyScalar(t),n=new I(0,12,0).multiplyScalar(t),r=new I(0,1,0),s=new fn().setFromRotationMatrix(new Dt().lookAt(e,n,r));return{position:e,quaternion:s,up:r,target:n,zoom:this.sceneZoom()*1.65}}observeLongTasks(){try{this.longTaskObserver=new PerformanceObserver(t=>{for(const e of t.getEntries())this.longTasks.push(e.duration),this.longTasks.length>180&&this.longTasks.shift()}),this.longTaskObserver.observe({type:"longtask",buffered:!0})}catch{this.longTaskObserver=null}}updateAutomaticFidelity(t){if(t>22&&t<250?(this.slowFrameBudget+=1,this.recoveryFrameBudget=0):t<17&&(this.recoveryFrameBudget+=1,this.slowFrameBudget=Math.max(0,this.slowFrameBudget-1)),this.fidelityLevel==="high"&&this.slowFrameBudget>=90){this.fidelityLevel="reduced-atmosphere",this.fidelityReason="sustained-frame-time-over-22ms";for(const e of this.runtimes.values())e.particles.count=Math.ceil(e.particleStates.length*.58);this.slowFrameBudget=0}else if(this.fidelityLevel==="reduced-atmosphere"&&this.recoveryFrameBudget>=300){this.fidelityLevel="high",this.fidelityReason="recovered-frame-time-under-17ms";for(const e of this.runtimes.values())e.particles.count=e.particleStates.length;this.recoveryFrameBudget=0}}animate=()=>{if(this.disposed)return;this.frame=requestAnimationFrame(this.animate);const t=performance.now(),e=t-this.lastFrameAt;this.updateAutomaticFidelity(e),this.lastFrameAt=t,t<=this.interactionUntil&&e<250&&(this.frameTimes.push(e),this.frameTimes.length>900&&this.frameTimes.shift());const n=Math.min(.05,this.clock.getDelta());if(this.diagnosticAnimationTime===null?(this.elapsed+=n,this.requestedMode==="scene"&&this.kittyScanSnapshot===null&&Ah(this.kittyNaturalMotion,n)):this.elapsed=this.diagnosticAnimationTime,this.animationFrame+=1,Math.abs(this.progress-this.targetProgress)>5e-4){const s=Math.sign(this.targetProgress-this.progress),a=window.matchMedia("(prefers-reduced-motion: reduce)").matches?.36:rM;this.progress=yt.clamp(this.progress+s*n/a,0,1),this.applyCameraTransition()}else this.progress=this.targetProgress,this.progress>=.999&&this.applyScanCamera(),this.progress<=.001&&this.requestedMode==="scene"&&!this.controls.enabled&&(this.writeCameraState(this.savedCamera),this.controls.enabled=!0);this.restoreKittyScanSnapshotIfReady(),this.syncKittyRenderVisibility(),this.controls.enabled&&this.controls.update();const r=this.runtimes.get(this.theme.id);if(r&&!(this.theme.id==="kitty"&&this.kittyScanSnapshot!==null)&&(this.updateHeroScale(r),this.updateHeroRuntime(r)),this.theme.id==="sunset"){const s=Math.sin(this.elapsed*.72)*.085;this.keyLight.intensity=3.4+s,this.fillLight.intensity=1.75+s*.55}else this.keyLight.intensity=3.4,this.fillLight.intensity=1.75;this.render()};render(){this.renderer.render(this.scene,this.camera)}dispose(){if(this.disposed)return;this.disposed=!0,cancelAnimationFrame(this.frame),this.resizeObserver.disconnect(),this.longTaskObserver?.disconnect();const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown),t.removeEventListener("pointermove",this.onPointerMove),t.removeEventListener("wheel",this.onWheel),this.controls.removeEventListener("start",this.onControlStart),this.controls.removeEventListener("end",this.onControlEnd),this.controls.removeEventListener("change",this.onControlChange),this.controls.dispose();const e=new Set,n=new Set;this.scene.traverse(r=>{r instanceof Ie&&(e.add(r.geometry),(Array.isArray(r.material)?r.material:[r.material]).forEach(a=>n.add(a)))}),e.forEach(r=>r.dispose()),n.forEach(r=>r.dispose()),this.areaMaskMaterial.dispose(),this.areaQrMaskMesh.geometry.dispose(),this.areaQrMaskMaterial.dispose(),this.areaReductionMesh.geometry.dispose(),this.areaReductionMaterial.dispose(),this.areaRenderTargets.forEach(({heroMask:r,qrMask:s,reductions:a})=>{r.dispose(),s.dispose(),a.forEach(o=>o.dispose())}),this.areaRenderTargets.clear(),this.shadowTexture.dispose(),this.renderer.dispose()}}const ac="https://example.com/voxelqr-studio";let Qn=Nu("voxelqr-locale",["zh-TW","en"],"zh-TW"),ke=Nu("voxelqr-theme",or,"sakura"),Xr="url",Xi="scene",Tn=Vh(ac,Xr),Oh=0,Gr=0,Du=performance.now();const Ur=[],Lu=[];function Nu(i,t,e){try{const n=localStorage.getItem(i);return n&&t.includes(n)?n:e}catch{return e}}function Uu(i,t){try{localStorage.setItem(i,t)}catch{}}function Kt(i){return yd(Qn,i)}function fM(i,t){if(!i.length)return 0;const e=[...i].sort((n,r)=>n-r);return e[Math.min(e.length-1,Math.ceil(e.length*t)-1)]}function pM(){return or.map(i=>{const t=Qe[i];return`<button type="button" class="theme-card" data-theme="${i}" aria-pressed="${i===ke}"
      style="--card-dark:${t.scanDark};--card-mid:${t.mid};--card-bright:${t.bright};--card-light:${t.highlight}">
      <span class="theme-card-art" aria-hidden="true"><i></i><i></i><i></i><i></i><b>${t.glyph}</b></span>
      <span class="theme-card-copy"><strong data-theme-label="${i}">${Kt(i)}</strong><small>${t.signature}</small></span>
      <span class="selected-check" aria-hidden="true">✓</span>
    </button>`}).join("")}function mM(){return`
    <div class="studio-shell">
      <header class="studio-bar">
        <a class="brand" href="#garden-stage" aria-label="VoxelQR Studio home">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b></span>
          <span><strong>VoxelQR Studio</strong><small data-i18n="productName">${Kt("productName")}</small></span>
        </a>
        <div class="studio-meta">
          <span class="offline-badge"><i aria-hidden="true"></i><span data-i18n="offline">${Kt("offline")}</span></span>
          <button type="button" id="compact-scan-exit" class="compact-scan-exit"><span aria-hidden="true">◆</span><span data-i18n="scene">${Kt("scene")}</span></button>
          <div class="language-toggle" role="group" aria-label="Language">
            <button type="button" data-locale="zh-TW" aria-pressed="${Qn==="zh-TW"}">繁中</button>
            <button type="button" data-locale="en" aria-pressed="${Qn==="en"}">EN</button>
          </div>
        </div>
      </header>

      <main class="workspace">
        <section class="stage" id="garden-stage" aria-label="Interactive 3D QR scene" data-same-scene="true">
          <canvas id="garden-canvas" aria-label="Interactive 3D voxel QR scene"></canvas>
          <header class="stage-heading">
            <p class="stage-eyebrow"><span class="live-dot" aria-hidden="true"></span> <span data-i18n="liveScene">${Kt("liveScene")}</span> · <span id="qr-size">${Tn.size} × ${Tn.size}</span></p>
            <h1 id="theme-title">${Kt(ke)}</h1>
            <p id="theme-signature">${Qe[ke].signature}</p>
          </header>
          <div class="stage-tools">
            <div class="mode-switch" role="group" aria-label="View mode">
              <button type="button" data-mode="scene" aria-pressed="true"><span aria-hidden="true">◆</span><span data-i18n="scene">${Kt("scene")}</span></button>
              <button type="button" data-mode="scan" aria-pressed="false"><span aria-hidden="true">⌗</span><span data-i18n="scan">${Kt("scan")}</span></button>
            </div>
            <button type="button" id="reset-view" class="fit-button"><span aria-hidden="true">⛶</span><span data-i18n="reset">${Kt("reset")}</span></button>
          </div>
          <p class="control-hint" id="mode-tip" data-i18n="sceneTip">${Kt("sceneTip")}</p>
        </section>

        <aside class="grow-panel" aria-labelledby="controls-title">
          <div class="panel-intro">
            <p class="panel-step">01 · CONTENT</p>
            <h2 id="controls-title" data-i18n="controls">${Kt("controls")}</h2>
          </div>

          <fieldset class="input-kind">
            <legend data-i18n="inputType">${Kt("inputType")}</legend>
            <div class="segmented">
              <button type="button" data-payload-type="url" aria-pressed="true" data-i18n="url">${Kt("url")}</button>
              <button type="button" data-payload-type="text" aria-pressed="false" data-i18n="text">${Kt("text")}</button>
            </div>
          </fieldset>

          <label class="payload-label" for="payload-input" data-i18n="payload">${Kt("payload")}</label>
          <textarea id="payload-input" rows="4" maxlength="600" spellcheck="false" aria-describedby="input-help input-error">${ac}</textarea>
          <div class="input-meta">
            <span class="sync-state"><i id="sync-dot" aria-hidden="true"></i><span id="sync-status" role="status" aria-live="polite" data-i18n="synchronized">${Kt("synchronized")}</span></span>
            <span id="character-count">${[...ac].length}/600</span>
          </div>
          <p id="input-help" class="input-help" data-i18n="inputHelp">${Kt("inputHelp")}</p>
          <p id="input-error" class="input-error" role="alert"></p>

          <div class="encoded-card">
            <span data-i18n="encoded">${Kt("encoded")}</span>
            <output id="encoded-output">${Tn.payload}</output>
          </div>

          <section class="theme-library" aria-labelledby="theme-label">
            <div class="library-heading"><span class="panel-step">02 · STYLE</span><h3 id="theme-label" data-i18n="themes">${Kt("themes")}</h3></div>
            <div class="theme-grid">${pM()}</div>
          </section>

          <section class="export-actions" aria-label="Export actions">
            <button type="button" id="export-scene"><span aria-hidden="true">◇</span><span data-i18n="exportScene">${Kt("exportScene")}</span></button>
            <button type="button" id="export-qr"><span aria-hidden="true">⌗</span><span data-i18n="exportQr">${Kt("exportQr")}</span></button>
          </section>
        </aside>
      </main>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>
  `}const Fu=document.querySelector("#app");if(!Fu)throw new Error("APP_ROOT_MISSING");Fu.innerHTML=mM();const dr=xe("#payload-input"),gM=xe("#garden-canvas"),he=new dM(gM,Tn,ke);ku();_M();wc(Xr,!1);document.documentElement.lang=Qn==="zh-TW"?"zh-Hant":"en";function xe(i){const t=document.querySelector(i);if(!t)throw new Error(`MISSING_ELEMENT:${i}`);return t}function _M(){document.querySelectorAll("[data-payload-type]").forEach(i=>{i.addEventListener("click",()=>wc(i.dataset.payloadType))}),document.querySelectorAll("[data-locale]").forEach(i=>{i.addEventListener("click",()=>zu(i.dataset.locale))}),document.querySelectorAll("[data-theme]").forEach(i=>{i.addEventListener("click",()=>Ou(i.dataset.theme??""))}),document.querySelectorAll("[data-mode]").forEach(i=>{i.addEventListener("click",()=>cc(i.dataset.mode))}),xe("#reset-view").addEventListener("click",()=>he.resetView()),xe("#compact-scan-exit").addEventListener("click",()=>cc("scene")),xe("#export-qr").addEventListener("click",xM),xe("#export-scene").addEventListener("click",yM),dr.addEventListener("input",Ac)}function wc(i,t=!0){Xr=i,document.querySelectorAll("[data-payload-type]").forEach(e=>{e.setAttribute("aria-pressed",String(e.dataset.payloadType===i))}),dr.placeholder=Kt(i==="url"?"payloadHintUrl":"payloadHintText"),t&&Ac()}function Ac(){Du=performance.now(),xe("#character-count").textContent=`${[...dr.value].length}/600`,xe("#input-error").textContent="",oc("syncing"),!Gr&&(Gr=requestAnimationFrame(vM))}function vM(){Gr=0;const i=Du,t=xe("#input-error");try{const e=Vh(dr.value,Xr),n=performance.now();Tn=e,he.setQr(Tn),Ur.push(n-i),Ur.length>240&&Ur.shift(),t.textContent="",xe("#encoded-output").textContent=Tn.payload,xe("#qr-size").textContent=`${Tn.size} × ${Tn.size}`,oc("synchronized")}catch(e){const n=e instanceof Error&&e.message==="PAYLOAD_TOO_LONG"?"tooLong":"empty";t.textContent=Kt(n),oc("needsInput")}finally{Lu.splice(0).forEach(e=>e())}}function MM(){return Gr?new Promise(i=>Lu.push(i)):Promise.resolve()}function oc(i){const t=xe("#sync-status"),e=xe("#sync-dot");t.dataset.i18n=i,t.textContent=Kt(i),e.dataset.state=i}function Ou(i){uv(i)&&(ke=i,Uu("voxelqr-theme",ke),document.querySelectorAll("[data-theme]").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.theme===ke))),xe("#theme-title").textContent=Kt(ke),xe("#theme-signature").textContent=Qe[ke].signature,he.setTheme(ke),ku())}function cc(i){Xi=i,document.querySelectorAll("[data-mode]").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.mode===Xi)));const t=xe("#mode-tip");t.textContent=Kt(Xi==="scan"?"scanTip":"sceneTip"),t.dataset.i18n=Xi==="scan"?"scanTip":"sceneTip",document.body.dataset.mode=Xi,he.setScanMode(Xi==="scan")}function zu(i){Qn=i,document.documentElement.lang=Qn==="zh-TW"?"zh-Hant":"en",Uu("voxelqr-locale",Qn),document.querySelectorAll("[data-locale]").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.locale===Qn))),document.querySelectorAll("[data-i18n]").forEach(t=>{t.textContent=Kt(t.dataset.i18n)}),or.forEach(t=>{const e=document.querySelector(`[data-theme-label="${t}"]`);e&&(e.textContent=Kt(t))}),xe("#theme-title").textContent=Kt(ke),dr.placeholder=Kt(Xr==="url"?"payloadHintUrl":"payloadHintText")}function ku(){const i=xe(".stage"),t=Qe[ke];i.style.setProperty("--sky-a",t.sky[0]),i.style.setProperty("--sky-b",t.sky[1]),i.style.setProperty("--garden-dark",t.scanDark),i.style.setProperty("--garden-mid",t.mid),i.style.setProperty("--garden-bright",t.bright),i.style.setProperty("--garden-light",t.highlight),i.style.setProperty("--garden-ground",t.ground)}function Bu(i,t){const e=document.createElement("a");e.download=i,e.href=t,e.click()}function xM(){Bu(`VoxelQR-Studio-${ke}-top-view.png`,he.captureTopDown()),Hu(Kt("downloadedQr"))}function yM(){Bu(`VoxelQR-Studio-${ke}-scene.png`,he.captureScene()),Hu(Kt("downloadedScene"))}function Hu(i){const t=xe("#toast");t.textContent=i,t.classList.add("is-visible"),window.clearTimeout(Oh),Oh=window.setTimeout(()=>t.classList.remove("is-visible"),2200)}window.__VOXELQR_TEST__={setTheme:i=>Ou(i),setMode:i=>cc(i),setLocale:i=>zu(i),setInspectionView:i=>he.setInspectionView(i),setInspectionOrbitAngle:i=>he.setInspectionOrbitAngle(i),resetView:()=>he.resetView(),setStructureEvidenceMode:i=>he.setStructureEvidenceMode(i),setPayload:async(i,t="text")=>{wc(t,!1),dr.value=i,Ac(),await MM()},getQr:()=>Tn,getStats:()=>({...he.getStats(),liveInputP95Ms:fM(Ur,.95),liveInputSamples:Ur.length,pendingInput:!!Gr,canvasCount:document.querySelectorAll("canvas").length,qrOverlayCount:document.querySelectorAll("canvas:not(#garden-canvas), img[data-qr], svg[data-qr], .qr-overlay, .scan-mat").length}),getTreeMotionSample:()=>he.getTreeMotionSample(),getTreeStructureEvidence:()=>he.getTreeStructureEvidence(),getParticleMotionSample:()=>he.getParticleMotionSample(),getKittyMotionSample:()=>he.getKittyMotionSample(),measureKittyScanNoCatPixelDiff:i=>he.measureKittyScanNoCatPixelDiff(i),getR4CharacterContract:()=>({schemaVersion:"voxelqr-r4-character-transform-v1",gateBasis:"direct R3 transform coefficients; screen-space occupancy is evidence only",wanderer:{requiredLinearScale:bc,r3:{authoring:1,character:1,depth:1,footContactBottomLocal:$o},r4:{authoring:Rr,character:Rn,depth:Gs,linearAxes:{x:Rn,y:Rn,z:Rn*Gs},footContactBottomLocal:$o}},kitty:{requiredLinearScale:Ce,r3:{authoring:1,visualX:Jo,visualY:Qo,visualZ:tc,visualFootprintRadiusLocal:Hs,scanFootprintRadiusLocal:qs,footContactBottomLocal:tr},r4:{authoring:Kn,visualX:Jo*Ce,visualY:Qo*Ce,visualZ:tc*Ce,visualFootprintRadiusLocal:Hs*Ce,scanFootprintRadiusLocal:qs,linearAxes:{x:Ce,y:Ce,z:Ce},footContactBottomLocal:tr}}}),getR5CorrectionContract:()=>({schemaVersion:"voxelqr-r5-correction-contract-v1",acceptanceBasis:"deterministic object-ID silhouette pixels divided by full physical board top mask pixels",aabbAcceptanceRole:"informational-only-not-a-gate",kitty:{r4PreservedBaseline:{linearScaleFromR3:Ce,modelTailPaletteAnimationStylePreserved:!0},r5:{linearScaleFromR4:vn,linearScaleFromR3:dv,actualVisualScale:{x:Ns,y:ec,z:Us},actualVisualFootprintRadiusLocal:_v,silhouette:{target:yu,min:Mu,max:xu,camera:pv,denominator:mv},navigation:{quietZoneModules:Zs,responsiveScaleBasis:"(N + 2 * quietZone) / (33 + 2 * quietZone)",shadowSafetyMarginLocal:Su,fullPhysicalBoardCoverageRequired:!0},scan:{characterGroupRenderable:!1,characterCapsRenderable:!1,exactPoseSnapshotRequired:!0,revealOnlyAfterExploreRestore:!0}}},wanderer:{r4ScalePreserved:!0,continuousFullNeckLoop:!0,knot:"side-front",tails:["short-forward-outward","long-side-down"]}}),getProjectedComposition:()=>he.getProjectedComposition(),measureSemanticHeroAreaWindow:i=>he.measureSemanticHeroAreaWindow(i),setDiagnosticAnimationTime:i=>he.setDiagnosticAnimationTime(i),setKittyTestSeed:i=>he.setKittyTestSeed(i),captureTopDown:()=>he.captureTopDown(),resetPerformanceMetrics:()=>he.resetPerformanceMetrics(),sampleFidelityFrame:i=>he.sampleFidelityFrame(i)};window.addEventListener("beforeunload",()=>he.dispose(),{once:!0});

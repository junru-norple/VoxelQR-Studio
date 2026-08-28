(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function tu(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var yi={},ws,$o;function eu(){return $o||($o=1,ws=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ws}var As={},Ln={},Ko;function mi(){if(Ko)return Ln;Ko=1;let i;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Ln.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},Ln.getSymbolTotalCodewords=function(n){return t[n]},Ln.getBCHDigit=function(e){let n=0;for(;e!==0;)n++,e>>>=1;return n},Ln.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');i=n},Ln.isKanjiModeEnabled=function(){return typeof i<"u"},Ln.toSJIS=function(n){return i(n)},Ln}var Rs={},Jo;function Ao(){return Jo||(Jo=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+e)}}i.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},i.from=function(n,r){if(i.isValid(n))return n;try{return t(n)}catch{return r}}})(Rs)),Rs}var Cs,Qo;function nu(){if(Qo)return Cs;Qo=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},Cs=i,Cs}var Ps,tc;function iu(){if(tc)return Ps;tc=1;function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return i.prototype.set=function(t,e,n,r){const s=t*this.size+e;this.data[s]=n,r&&(this.reservedBit[s]=!0)},i.prototype.get=function(t,e){return this.data[t*this.size+e]},i.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n},i.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},Ps=i,Ps}var Is={},ec;function ru(){return ec||(ec=1,(function(i){const t=mi().getSymbolSize;i.getRowColCoords=function(n){if(n===1)return[];const r=Math.floor(n/7)+2,s=t(n),a=s===145?26:Math.ceil((s-13)/(2*r-2))*2,o=[s-7];for(let c=1;c<r-1;c++)o[c]=o[c-1]-a;return o.push(6),o.reverse()},i.getPositions=function(n){const r=[],s=i.getRowColCoords(n),a=s.length;for(let o=0;o<a;o++)for(let c=0;c<a;c++)o===0&&c===0||o===0&&c===a-1||o===a-1&&c===0||r.push([s[o],s[c]]);return r}})(Is)),Is}var Ds={},nc;function su(){if(nc)return Ds;nc=1;const i=mi().getSymbolSize,t=7;return Ds.getPositions=function(n){const r=i(n);return[[0,0],[r-t,0],[0,r-t]]},Ds}var Ls={},ic;function au(){return ic||(ic=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},i.from=function(r){return i.isValid(r)?parseInt(r,10):void 0},i.getPenaltyN1=function(r){const s=r.size;let a=0,o=0,c=0,l=null,h=null;for(let u=0;u<s;u++){o=c=0,l=h=null;for(let d=0;d<s;d++){let f=r.get(u,d);f===l?o++:(o>=5&&(a+=t.N1+(o-5)),l=f,o=1),f=r.get(d,u),f===h?c++:(c>=5&&(a+=t.N1+(c-5)),h=f,c=1)}o>=5&&(a+=t.N1+(o-5)),c>=5&&(a+=t.N1+(c-5))}return a},i.getPenaltyN2=function(r){const s=r.size;let a=0;for(let o=0;o<s-1;o++)for(let c=0;c<s-1;c++){const l=r.get(o,c)+r.get(o,c+1)+r.get(o+1,c)+r.get(o+1,c+1);(l===4||l===0)&&a++}return a*t.N2},i.getPenaltyN3=function(r){const s=r.size;let a=0,o=0,c=0;for(let l=0;l<s;l++){o=c=0;for(let h=0;h<s;h++)o=o<<1&2047|r.get(l,h),h>=10&&(o===1488||o===93)&&a++,c=c<<1&2047|r.get(h,l),h>=10&&(c===1488||c===93)&&a++}return a*t.N3},i.getPenaltyN4=function(r){let s=0;const a=r.data.length;for(let c=0;c<a;c++)s+=r.data[c];return Math.abs(Math.ceil(s*100/a/5)-10)*t.N4};function e(n,r,s){switch(n){case i.Patterns.PATTERN000:return(r+s)%2===0;case i.Patterns.PATTERN001:return r%2===0;case i.Patterns.PATTERN010:return s%3===0;case i.Patterns.PATTERN011:return(r+s)%3===0;case i.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(s/3))%2===0;case i.Patterns.PATTERN101:return r*s%2+r*s%3===0;case i.Patterns.PATTERN110:return(r*s%2+r*s%3)%2===0;case i.Patterns.PATTERN111:return(r*s%3+(r+s)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}i.applyMask=function(r,s){const a=s.size;for(let o=0;o<a;o++)for(let c=0;c<a;c++)s.isReserved(c,o)||s.xor(c,o,e(r,c,o))},i.getBestMask=function(r,s){const a=Object.keys(i.Patterns).length;let o=0,c=1/0;for(let l=0;l<a;l++){s(l),i.applyMask(l,r);const h=i.getPenaltyN1(r)+i.getPenaltyN2(r)+i.getPenaltyN3(r)+i.getPenaltyN4(r);i.applyMask(l,r),h<c&&(c=h,o=l)}return o}})(Ls)),Ls}var Ir={},rc;function Jl(){if(rc)return Ir;rc=1;const i=Ao(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ir.getBlocksCount=function(r,s){switch(s){case i.L:return t[(r-1)*4+0];case i.M:return t[(r-1)*4+1];case i.Q:return t[(r-1)*4+2];case i.H:return t[(r-1)*4+3];default:return}},Ir.getTotalCodewordsCount=function(r,s){switch(s){case i.L:return e[(r-1)*4+0];case i.M:return e[(r-1)*4+1];case i.Q:return e[(r-1)*4+2];case i.H:return e[(r-1)*4+3];default:return}},Ir}var Us={},tr={},sc;function ou(){if(sc)return tr;sc=1;const i=new Uint8Array(512),t=new Uint8Array(256);return(function(){let n=1;for(let r=0;r<255;r++)i[r]=n,t[n]=r,n<<=1,n&256&&(n^=285);for(let r=255;r<512;r++)i[r]=i[r-255]})(),tr.log=function(n){if(n<1)throw new Error("log("+n+")");return t[n]},tr.exp=function(n){return i[n]},tr.mul=function(n,r){return n===0||r===0?0:i[t[n]+t[r]]},tr}var ac;function cu(){return ac||(ac=1,(function(i){const t=ou();i.mul=function(n,r){const s=new Uint8Array(n.length+r.length-1);for(let a=0;a<n.length;a++)for(let o=0;o<r.length;o++)s[a+o]^=t.mul(n[a],r[o]);return s},i.mod=function(n,r){let s=new Uint8Array(n);for(;s.length-r.length>=0;){const a=s[0];for(let c=0;c<r.length;c++)s[c]^=t.mul(r[c],a);let o=0;for(;o<s.length&&s[o]===0;)o++;s=s.slice(o)}return s},i.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let s=0;s<n;s++)r=i.mul(r,new Uint8Array([1,t.exp(s)]));return r}})(Us)),Us}var Ns,oc;function lu(){if(oc)return Ns;oc=1;const i=cu();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(n){this.degree=n,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const r=new Uint8Array(n.length+this.degree);r.set(n);const s=i.mod(r,this.genPoly),a=this.degree-s.length;if(a>0){const o=new Uint8Array(this.degree);return o.set(s,a),o}return s},Ns=t,Ns}var Fs={},Os={},zs={},cc;function Ql(){return cc||(cc=1,zs.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),zs}var mn={},lc;function th(){if(lc)return mn;lc=1;const i="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;mn.KANJI=new RegExp(e,"g"),mn.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),mn.BYTE=new RegExp(n,"g"),mn.NUMERIC=new RegExp(i,"g"),mn.ALPHANUMERIC=new RegExp(t,"g");const r=new RegExp("^"+e+"$"),s=new RegExp("^"+i+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return mn.testKanji=function(c){return r.test(c)},mn.testNumeric=function(c){return s.test(c)},mn.testAlphanumeric=function(c){return a.test(c)},mn}var hc;function gi(){return hc||(hc=1,(function(i){const t=Ql(),e=th();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(s,a){if(!s.ccBits)throw new Error("Invalid mode: "+s);if(!t.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?s.ccBits[0]:a<27?s.ccBits[1]:s.ccBits[2]},i.getBestModeForData=function(s){return e.testNumeric(s)?i.NUMERIC:e.testAlphanumeric(s)?i.ALPHANUMERIC:e.testKanji(s)?i.KANJI:i.BYTE},i.toString=function(s){if(s&&s.id)return s.id;throw new Error("Invalid mode")},i.isValid=function(s){return s&&s.bit&&s.ccBits};function n(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+r)}}i.from=function(s,a){if(i.isValid(s))return s;try{return n(s)}catch{return a}}})(Os)),Os}var uc;function hu(){return uc||(uc=1,(function(i){const t=mi(),e=Jl(),n=Ao(),r=gi(),s=Ql(),a=7973,o=t.getBCHDigit(a);function c(d,f,g){for(let _=1;_<=40;_++)if(f<=i.getCapacity(_,g,d))return _}function l(d,f){return r.getCharCountIndicator(d,f)+4}function h(d,f){let g=0;return d.forEach(function(_){const m=l(_.mode,f);g+=m+_.getBitsLength()}),g}function u(d,f){for(let g=1;g<=40;g++)if(h(d,g)<=i.getCapacity(g,f,r.MIXED))return g}i.from=function(f,g){return s.isValid(f)?parseInt(f,10):g},i.getCapacity=function(f,g,_){if(!s.isValid(f))throw new Error("Invalid QR Code version");typeof _>"u"&&(_=r.BYTE);const m=t.getSymbolTotalCodewords(f),p=e.getTotalCodewordsCount(f,g),v=(m-p)*8;if(_===r.MIXED)return v;const E=v-l(_,f);switch(_){case r.NUMERIC:return Math.floor(E/10*3);case r.ALPHANUMERIC:return Math.floor(E/11*2);case r.KANJI:return Math.floor(E/13);case r.BYTE:default:return Math.floor(E/8)}},i.getBestVersionForData=function(f,g){let _;const m=n.from(g,n.M);if(Array.isArray(f)){if(f.length>1)return u(f,m);if(f.length===0)return 1;_=f[0]}else _=f;return c(_.mode,_.getLength(),m)},i.getEncodedBits=function(f){if(!s.isValid(f)||f<7)throw new Error("Invalid QR Code version");let g=f<<12;for(;t.getBCHDigit(g)-o>=0;)g^=a<<t.getBCHDigit(g)-o;return f<<12|g}})(Fs)),Fs}var Bs={},dc;function uu(){if(dc)return Bs;dc=1;const i=mi(),t=1335,e=21522,n=i.getBCHDigit(t);return Bs.getEncodedBits=function(s,a){const o=s.bit<<3|a;let c=o<<10;for(;i.getBCHDigit(c)-n>=0;)c^=t<<i.getBCHDigit(c)-n;return(o<<10|c)^e},Bs}var ks={},Hs,fc;function du(){if(fc)return Hs;fc=1;const i=gi();function t(e){this.mode=i.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let r,s,a;for(r=0;r+3<=this.data.length;r+=3)s=this.data.substr(r,3),a=parseInt(s,10),n.put(a,10);const o=this.data.length-r;o>0&&(s=this.data.substr(r),a=parseInt(s,10),n.put(a,o*3+1))},Hs=t,Hs}var Gs,pc;function fu(){if(pc)return Gs;pc=1;const i=gi(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(n){this.mode=i.ALPHANUMERIC,this.data=n}return e.getBitsLength=function(r){return 11*Math.floor(r/2)+6*(r%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(r){let s;for(s=0;s+2<=this.data.length;s+=2){let a=t.indexOf(this.data[s])*45;a+=t.indexOf(this.data[s+1]),r.put(a,11)}this.data.length%2&&r.put(t.indexOf(this.data[s]),6)},Gs=e,Gs}var Vs,mc;function pu(){if(mc)return Vs;mc=1;const i=gi();function t(e){this.mode=i.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(n){return n*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let n=0,r=this.data.length;n<r;n++)e.put(this.data[n],8)},Vs=t,Vs}var Ws,gc;function mu(){if(gc)return Ws;gc=1;const i=gi(),t=mi();function e(n){this.mode=i.KANJI,this.data=n}return e.getBitsLength=function(r){return r*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let r;for(r=0;r<this.data.length;r++){let s=t.toSJIS(this.data[r]);if(s>=33088&&s<=40956)s-=33088;else if(s>=57408&&s<=60351)s-=49472;else throw new Error("Invalid SJIS character: "+this.data[r]+`
Make sure your charset is UTF-8`);s=(s>>>8&255)*192+(s&255),n.put(s,13)}},Ws=e,Ws}var qs={exports:{}},_c;function gu(){return _c||(_c=1,(function(i){var t={single_source_shortest_paths:function(e,n,r){var s={},a={};a[n]=0;var o=t.PriorityQueue.make();o.push(n,0);for(var c,l,h,u,d,f,g,_,m;!o.empty();){c=o.pop(),l=c.value,u=c.cost,d=e[l]||{};for(h in d)d.hasOwnProperty(h)&&(f=d[h],g=u+f,_=a[h],m=typeof a[h]>"u",(m||_>g)&&(a[h]=g,o.push(h,g),s[h]=l))}if(typeof r<"u"&&typeof a[r]>"u"){var p=["Could not find a path from ",n," to ",r,"."].join("");throw new Error(p)}return s},extract_shortest_path_from_predecessor_list:function(e,n){for(var r=[],s=n;s;)r.push(s),e[s],s=e[s];return r.reverse(),r},find_path:function(e,n,r){var s=t.single_source_shortest_paths(e,n,r);return t.extract_shortest_path_from_predecessor_list(s,r)},PriorityQueue:{make:function(e){var n=t.PriorityQueue,r={},s;e=e||{};for(s in n)n.hasOwnProperty(s)&&(r[s]=n[s]);return r.queue=[],r.sorter=e.sorter||n.default_sorter,r},default_sorter:function(e,n){return e.cost-n.cost},push:function(e,n){var r={value:e,cost:n};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(qs)),qs.exports}var vc;function _u(){return vc||(vc=1,(function(i){const t=gi(),e=du(),n=fu(),r=pu(),s=mu(),a=th(),o=mi(),c=gu();function l(p){return unescape(encodeURIComponent(p)).length}function h(p,v,E){const S=[];let R;for(;(R=p.exec(E))!==null;)S.push({data:R[0],index:R.index,mode:v,length:R[0].length});return S}function u(p){const v=h(a.NUMERIC,t.NUMERIC,p),E=h(a.ALPHANUMERIC,t.ALPHANUMERIC,p);let S,R;return o.isKanjiModeEnabled()?(S=h(a.BYTE,t.BYTE,p),R=h(a.KANJI,t.KANJI,p)):(S=h(a.BYTE_KANJI,t.BYTE,p),R=[]),v.concat(E,S,R).sort(function(w,I){return w.index-I.index}).map(function(w){return{data:w.data,mode:w.mode,length:w.length}})}function d(p,v){switch(v){case t.NUMERIC:return e.getBitsLength(p);case t.ALPHANUMERIC:return n.getBitsLength(p);case t.KANJI:return s.getBitsLength(p);case t.BYTE:return r.getBitsLength(p)}}function f(p){return p.reduce(function(v,E){const S=v.length-1>=0?v[v.length-1]:null;return S&&S.mode===E.mode?(v[v.length-1].data+=E.data,v):(v.push(E),v)},[])}function g(p){const v=[];for(let E=0;E<p.length;E++){const S=p[E];switch(S.mode){case t.NUMERIC:v.push([S,{data:S.data,mode:t.ALPHANUMERIC,length:S.length},{data:S.data,mode:t.BYTE,length:S.length}]);break;case t.ALPHANUMERIC:v.push([S,{data:S.data,mode:t.BYTE,length:S.length}]);break;case t.KANJI:v.push([S,{data:S.data,mode:t.BYTE,length:l(S.data)}]);break;case t.BYTE:v.push([{data:S.data,mode:t.BYTE,length:l(S.data)}])}}return v}function _(p,v){const E={},S={start:{}};let R=["start"];for(let b=0;b<p.length;b++){const w=p[b],I=[];for(let y=0;y<w.length;y++){const M=w[y],P=""+b+y;I.push(P),E[P]={node:M,lastCount:0},S[P]={};for(let L=0;L<R.length;L++){const N=R[L];E[N]&&E[N].node.mode===M.mode?(S[N][P]=d(E[N].lastCount+M.length,M.mode)-d(E[N].lastCount,M.mode),E[N].lastCount+=M.length):(E[N]&&(E[N].lastCount=M.length),S[N][P]=d(M.length,M.mode)+4+t.getCharCountIndicator(M.mode,v))}}R=I}for(let b=0;b<R.length;b++)S[R[b]].end=0;return{map:S,table:E}}function m(p,v){let E;const S=t.getBestModeForData(p);if(E=t.from(v,S),E!==t.BYTE&&E.bit<S.bit)throw new Error('"'+p+'" cannot be encoded with mode '+t.toString(E)+`.
 Suggested mode is: `+t.toString(S));switch(E===t.KANJI&&!o.isKanjiModeEnabled()&&(E=t.BYTE),E){case t.NUMERIC:return new e(p);case t.ALPHANUMERIC:return new n(p);case t.KANJI:return new s(p);case t.BYTE:return new r(p)}}i.fromArray=function(v){return v.reduce(function(E,S){return typeof S=="string"?E.push(m(S,null)):S.data&&E.push(m(S.data,S.mode)),E},[])},i.fromString=function(v,E){const S=u(v,o.isKanjiModeEnabled()),R=g(S),b=_(R,E),w=c.find_path(b.map,"start","end"),I=[];for(let y=1;y<w.length-1;y++)I.push(b.table[w[y]].node);return i.fromArray(f(I))},i.rawSplit=function(v){return i.fromArray(u(v,o.isKanjiModeEnabled()))}})(ks)),ks}var Mc;function vu(){if(Mc)return As;Mc=1;const i=mi(),t=Ao(),e=nu(),n=iu(),r=ru(),s=su(),a=au(),o=Jl(),c=lu(),l=hu(),h=uu(),u=gi(),d=_u();function f(b,w){const I=b.size,y=s.getPositions(w);for(let M=0;M<y.length;M++){const P=y[M][0],L=y[M][1];for(let N=-1;N<=7;N++)if(!(P+N<=-1||I<=P+N))for(let B=-1;B<=7;B++)L+B<=-1||I<=L+B||(N>=0&&N<=6&&(B===0||B===6)||B>=0&&B<=6&&(N===0||N===6)||N>=2&&N<=4&&B>=2&&B<=4?b.set(P+N,L+B,!0,!0):b.set(P+N,L+B,!1,!0))}}function g(b){const w=b.size;for(let I=8;I<w-8;I++){const y=I%2===0;b.set(I,6,y,!0),b.set(6,I,y,!0)}}function _(b,w){const I=r.getPositions(w);for(let y=0;y<I.length;y++){const M=I[y][0],P=I[y][1];for(let L=-2;L<=2;L++)for(let N=-2;N<=2;N++)L===-2||L===2||N===-2||N===2||L===0&&N===0?b.set(M+L,P+N,!0,!0):b.set(M+L,P+N,!1,!0)}}function m(b,w){const I=b.size,y=l.getEncodedBits(w);let M,P,L;for(let N=0;N<18;N++)M=Math.floor(N/3),P=N%3+I-8-3,L=(y>>N&1)===1,b.set(M,P,L,!0),b.set(P,M,L,!0)}function p(b,w,I){const y=b.size,M=h.getEncodedBits(w,I);let P,L;for(P=0;P<15;P++)L=(M>>P&1)===1,P<6?b.set(P,8,L,!0):P<8?b.set(P+1,8,L,!0):b.set(y-15+P,8,L,!0),P<8?b.set(8,y-P-1,L,!0):P<9?b.set(8,15-P-1+1,L,!0):b.set(8,15-P-1,L,!0);b.set(y-8,8,1,!0)}function v(b,w){const I=b.size;let y=-1,M=I-1,P=7,L=0;for(let N=I-1;N>0;N-=2)for(N===6&&N--;;){for(let B=0;B<2;B++)if(!b.isReserved(M,N-B)){let W=!1;L<w.length&&(W=(w[L]>>>P&1)===1),b.set(M,N-B,W),P--,P===-1&&(L++,P=7)}if(M+=y,M<0||I<=M){M-=y,y=-y;break}}}function E(b,w,I){const y=new e;I.forEach(function(B){y.put(B.mode.bit,4),y.put(B.getLength(),u.getCharCountIndicator(B.mode,b)),B.write(y)});const M=i.getSymbolTotalCodewords(b),P=o.getTotalCodewordsCount(b,w),L=(M-P)*8;for(y.getLengthInBits()+4<=L&&y.put(0,4);y.getLengthInBits()%8!==0;)y.putBit(0);const N=(L-y.getLengthInBits())/8;for(let B=0;B<N;B++)y.put(B%2?17:236,8);return S(y,b,w)}function S(b,w,I){const y=i.getSymbolTotalCodewords(w),M=o.getTotalCodewordsCount(w,I),P=y-M,L=o.getBlocksCount(w,I),N=y%L,B=L-N,W=Math.floor(y/L),q=Math.floor(P/L),$=q+1,G=W-q,nt=new c(G);let rt=0;const lt=new Array(L),Rt=new Array(L);let Vt=0;const Kt=new Uint8Array(b.buffer);for(let wt=0;wt<L;wt++){const gt=wt<B?q:$;lt[wt]=Kt.slice(rt,rt+gt),Rt[wt]=nt.encode(lt[wt]),rt+=gt,Vt=Math.max(Vt,gt)}const Wt=new Uint8Array(y);let V=0,j,at;for(j=0;j<Vt;j++)for(at=0;at<L;at++)j<lt[at].length&&(Wt[V++]=lt[at][j]);for(j=0;j<G;j++)for(at=0;at<L;at++)Wt[V++]=Rt[at][j];return Wt}function R(b,w,I,y){let M;if(Array.isArray(b))M=d.fromArray(b);else if(typeof b=="string"){let W=w;if(!W){const q=d.rawSplit(b);W=l.getBestVersionForData(q,I)}M=d.fromString(b,W||40)}else throw new Error("Invalid data");const P=l.getBestVersionForData(M,I);if(!P)throw new Error("The amount of data is too big to be stored in a QR Code");if(!w)w=P;else if(w<P)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+P+`.
`);const L=E(w,I,M),N=i.getSymbolSize(w),B=new n(N);return f(B,w),g(B),_(B,w),p(B,I,0),w>=7&&m(B,w),v(B,L),isNaN(y)&&(y=a.getBestMask(B,p.bind(null,B,I))),a.applyMask(y,B),p(B,I,y),{modules:B,version:w,errorCorrectionLevel:I,maskPattern:y,segments:M}}return As.create=function(w,I){if(typeof w>"u"||w==="")throw new Error("No input text");let y=t.M,M,P;return typeof I<"u"&&(y=t.from(I.errorCorrectionLevel,t.M),M=l.from(I.version),P=a.from(I.maskPattern),I.toSJISFunc&&i.setToSJISFunction(I.toSJISFunc)),R(w,M,y,P)},As}var Xs={},Ys={},xc;function eh(){return xc||(xc=1,(function(i){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let n=e.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+e);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(s){return[s,s]}))),n.length===6&&n.push("F","F");const r=parseInt(n.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:r&255,hex:"#"+n.slice(0,6).join("")}}i.getOptions=function(n){n||(n={}),n.color||(n.color={});const r=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,s=n.width&&n.width>=21?n.width:void 0,a=n.scale||4;return{width:s,scale:s?4:a,margin:r,color:{dark:t(n.color.dark||"#000000ff"),light:t(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},i.getScale=function(n,r){return r.width&&r.width>=n+r.margin*2?r.width/(n+r.margin*2):r.scale},i.getImageWidth=function(n,r){const s=i.getScale(n,r);return Math.floor((n+r.margin*2)*s)},i.qrToImageData=function(n,r,s){const a=r.modules.size,o=r.modules.data,c=i.getScale(a,s),l=Math.floor((a+s.margin*2)*c),h=s.margin*c,u=[s.color.light,s.color.dark];for(let d=0;d<l;d++)for(let f=0;f<l;f++){let g=(d*l+f)*4,_=s.color.light;if(d>=h&&f>=h&&d<l-h&&f<l-h){const m=Math.floor((d-h)/c),p=Math.floor((f-h)/c);_=u[o[m*a+p]?1:0]}n[g++]=_.r,n[g++]=_.g,n[g++]=_.b,n[g]=_.a}}})(Ys)),Ys}var yc;function Mu(){return yc||(yc=1,(function(i){const t=eh();function e(r,s,a){r.clearRect(0,0,s.width,s.height),s.style||(s.style={}),s.height=a,s.width=a,s.style.height=a+"px",s.style.width=a+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(s,a,o){let c=o,l=a;typeof c>"u"&&(!a||!a.getContext)&&(c=a,a=void 0),a||(l=n()),c=t.getOptions(c);const h=t.getImageWidth(s.modules.size,c),u=l.getContext("2d"),d=u.createImageData(h,h);return t.qrToImageData(d.data,s,c),e(u,l,h),u.putImageData(d,0,0),l},i.renderToDataURL=function(s,a,o){let c=o;typeof c>"u"&&(!a||!a.getContext)&&(c=a,a=void 0),c||(c={});const l=i.render(s,a,c),h=c.type||"image/png",u=c.rendererOpts||{};return l.toDataURL(h,u.quality)}})(Xs)),Xs}var js={},Sc;function xu(){if(Sc)return js;Sc=1;const i=eh();function t(r,s){const a=r.a/255,o=s+'="'+r.hex+'"';return a<1?o+" "+s+'-opacity="'+a.toFixed(2).slice(1)+'"':o}function e(r,s,a){let o=r+s;return typeof a<"u"&&(o+=" "+a),o}function n(r,s,a){let o="",c=0,l=!1,h=0;for(let u=0;u<r.length;u++){const d=Math.floor(u%s),f=Math.floor(u/s);!d&&!l&&(l=!0),r[u]?(h++,u>0&&d>0&&r[u-1]||(o+=l?e("M",d+a,.5+f+a):e("m",c,0),c=0,l=!1),d+1<s&&r[u+1]||(o+=e("h",h),h=0)):c++}return o}return js.render=function(s,a,o){const c=i.getOptions(a),l=s.modules.size,h=s.modules.data,u=l+c.margin*2,d=c.color.light.a?"<path "+t(c.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",f="<path "+t(c.color.dark,"stroke")+' d="'+n(h,l,c.margin)+'"/>',g='viewBox="0 0 '+u+" "+u+'"',m='<svg xmlns="http://www.w3.org/2000/svg" '+(c.width?'width="'+c.width+'" height="'+c.width+'" ':"")+g+' shape-rendering="crispEdges">'+d+f+`</svg>
`;return typeof o=="function"&&o(null,m),m},js}var Ec;function yu(){if(Ec)return yi;Ec=1;const i=eu(),t=vu(),e=Mu(),n=xu();function r(s,a,o,c,l){const h=[].slice.call(arguments,1),u=h.length,d=typeof h[u-1]=="function";if(!d&&!i())throw new Error("Callback required as last argument");if(d){if(u<2)throw new Error("Too few arguments provided");u===2?(l=o,o=a,a=c=void 0):u===3&&(a.getContext&&typeof l>"u"?(l=c,c=void 0):(l=c,c=o,o=a,a=void 0))}else{if(u<1)throw new Error("Too few arguments provided");return u===1?(o=a,a=c=void 0):u===2&&!a.getContext&&(c=o,o=a,a=void 0),new Promise(function(f,g){try{const _=t.create(o,c);f(s(_,a,c))}catch(_){g(_)}})}try{const f=t.create(o,c);l(null,s(f,a,c))}catch(f){l(f)}}return yi.create=t.create,yi.toCanvas=r.bind(null,e.render),yi.toDataURL=r.bind(null,e.renderToDataURL),yi.toString=r.bind(null,function(s,a,o){return n.render(s,o)}),yi}var Su=yu();const Eu=tu(Su),Tu=600;function bu(i,t){const e=i.trim();return e?t==="url"&&!/^[a-z][a-z\d+.-]*:\/\//i.test(e)?`https://${e}`:e:""}function nh(i,t){const e=bu(i,t);if(!e)throw new Error("EMPTY_PAYLOAD");if([...e].length>Tu)throw new Error("PAYLOAD_TOO_LONG");const n=Eu.create(e,{errorCorrectionLevel:"H"}),r=n.modules.size,s=n.modules.data,a=Array.from({length:r},(o,c)=>Array.from({length:r},(l,h)=>!!s[c*r+h]));return{payload:e,size:r,matrix:a}}const wu={"zh-TW":{productName:"3D 動態體素 QR Code 生成器",tagline:"把內容種成一座漂亮、可探索、也能掃描的像素庭園。",controls:"3D 動態體素 QR Code 生成器",inputType:"內容類型",url:"網址",text:"文字",payload:"輸入網址或文字",payloadHintUrl:"例如 example.com",payloadHintText:"輸入任何中英文文字",encoded:"實際寫入",liveScene:"動態場景",scene:"探索場景",scan:"俯視掃描",reset:"符合視窗",exportQr:"匯出俯視",exportScene:"匯出場景",themes:"選擇庭園",language:"語言",offline:"完全離線",empty:"輸入內容後，庭園會立即生長。",needsInput:"等待內容",tooLong:"內容超過 600 個字元，請縮短後再試。",syncing:"正在生長",synchronized:"已即時更新",inputHelp:"輸入、貼上或刪除都會立即更新，不需要按下生成。",scanTip:"同一座彩色庭園，正平滑移向俯視",sceneTip:"左鍵自由旋轉 · 右鍵平移 · 滾輪縮放",sakura:"櫻花",summer:"夏樹",maple:"楓葉",ginkgo:"銀杏",snow:"雪樹",sunset:"夕陽",ocean:"海浪",wanderer:"像素旅兔",downloadedQr:"俯視圖片已匯出",downloadedScene:"場景圖片已匯出",close:"關閉"},en:{productName:"Dynamic 3D Voxel QR Code Generator",tagline:"Turn your content into a beautiful voxel scene you can explore and scan.",controls:"3D QR Code Converter",inputType:"Content type",url:"URL",text:"Text",payload:"Enter a URL or text",payloadHintUrl:"Try example.com",payloadHintText:"Enter English, Chinese, or mixed text",encoded:"Encoded as",liveScene:"LIVE SCENE",scene:"Explore scene",scan:"Top-down scan",reset:"Fit view",exportQr:"Export top view",exportScene:"Export scene",themes:"Choose a scene",language:"Language",offline:"Fully offline",empty:"Enter content and the scene will appear immediately.",needsInput:"Waiting for content",tooLong:"This exceeds 600 characters. Shorten it and try again.",syncing:"Growing",synchronized:"Updated live",inputHelp:"Typing, pasting, and deleting update immediately—there is no Generate step.",scanTip:"The same colored scene is moving smoothly overhead",sceneTip:"Left drag rotates · Right drag pans · Wheel zooms",sakura:"Sakura",summer:"Summer tree",maple:"Maple",ginkgo:"Ginkgo",snow:"Snow tree",sunset:"Sunset",ocean:"Ocean waves",wanderer:"Pixel Wanderer",downloadedQr:"Top-down image exported",downloadedScene:"Scene image exported",close:"Close"}};function Au(i,t){return wu[i][t]}const Ro="180",Ru=0,Tc=1,Cu=2,ih=1,Pu=2,Rn=3,Yn=0,ze=1,_n=2,Pn=0,Hi=1,bc=2,wc=3,Ac=4,Iu=5,ci=100,Du=101,Lu=102,Uu=103,Nu=104,Fu=200,Ou=201,zu=202,Bu=203,Ia=204,Da=205,ku=206,Hu=207,Gu=208,Vu=209,Wu=210,qu=211,Xu=212,Yu=213,ju=214,La=0,Ua=1,Na=2,Vi=3,Fa=4,Oa=5,za=6,Ba=7,rh=0,Zu=1,$u=2,Xn=0,Ku=1,Ju=2,Qu=3,sh=4,td=5,ed=6,nd=7,ah=300,Wi=301,qi=302,ka=303,Ha=304,ys=306,Ga=1e3,ui=1001,Va=1002,be=1003,id=1004,Dr=1005,Mn=1006,Zs=1007,di=1008,dn=1009,oh=1010,ch=1011,xr=1012,Co=1013,pi=1014,ln=1015,Ar=1016,Po=1017,Io=1018,yr=1020,lh=35902,hh=35899,uh=1021,dh=1022,We=1023,Sr=1026,Er=1027,Do=1028,Lo=1029,fh=1030,Uo=1031,No=1033,os=33776,cs=33777,ls=33778,hs=33779,Wa=35840,qa=35841,Xa=35842,Ya=35843,ja=36196,Za=37492,$a=37496,Ka=37808,Ja=37809,Qa=37810,to=37811,eo=37812,no=37813,io=37814,ro=37815,so=37816,ao=37817,oo=37818,co=37819,lo=37820,ho=37821,uo=36492,fo=36494,po=36495,mo=36283,go=36284,_o=36285,vo=36286,rd=3200,sd=3201,ph=0,ad=1,on="",Ne="srgb",Xi="srgb-linear",ps="linear",ee="srgb",Si=7680,Rc=519,od=512,cd=513,ld=514,mh=515,hd=516,ud=517,dd=518,fd=519,Cc=35044,pd=35048,Pc="300 es",xn=2e3,ms=2001;class _i{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ic=1234567;const pr=Math.PI/180,Tr=180/Math.PI;function Zi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function Fo(i,t){return(i%t+t)%t}function md(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function gd(i,t,e){return i!==t?(e-i)/(t-i):0}function mr(i,t,e){return(1-e)*i+e*t}function _d(i,t,e,n){return mr(i,t,1-Math.exp(-e*n))}function vd(i,t=1){return t-Math.abs(Fo(i,t*2)-t)}function Md(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function xd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function yd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Sd(i,t){return i+Math.random()*(t-i)}function Ed(i){return i*(.5-Math.random())}function Td(i){i!==void 0&&(Ic=i);let t=Ic+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bd(i){return i*pr}function wd(i){return i*Tr}function Ad(i){return(i&i-1)===0&&i!==0}function Rd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Cd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Pd(i,t,e,n,r){const s=Math.cos,a=Math.sin,o=s(e/2),c=a(e/2),l=s((t+n)/2),h=a((t+n)/2),u=s((t-n)/2),d=a((t-n)/2),f=s((n-t)/2),g=a((n-t)/2);switch(r){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function zi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function De(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Tt={DEG2RAD:pr,RAD2DEG:Tr,generateUUID:Zi,clamp:Gt,euclideanModulo:Fo,mapLinear:md,inverseLerp:gd,lerp:mr,damp:_d,pingpong:vd,smoothstep:Md,smootherstep:xd,randInt:yd,randFloat:Sd,randFloatSpread:Ed,seededRandom:Td,degToRad:bd,radToDeg:wd,isPowerOfTwo:Ad,ceilPowerOfTwo:Rd,floorPowerOfTwo:Cd,setQuaternionFromProperEuler:Pd,normalize:De,denormalize:zi};class Xt{constructor(t=0,e=0){Xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zn{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],u=n[r+3];const d=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o;const p=c*d+l*f+h*g+u*_,v=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const R=Math.sqrt(E),b=Math.atan2(R,p*v);m=Math.sin(m*b)/R,o=Math.sin(o*b)/R}const S=o*v;if(c=c*m+d*S,l=l*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-o){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],u=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return t[e]=o*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-o*f,t[e+2]=l*g+h*f+o*d-c*u,t[e+3]=h*g-o*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),u=o(s/2),d=c(n/2),f=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Dc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Dc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*r-o*n),h=2*(o*e-s*r),u=2*(s*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=r+c*u+s*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return $s.copy(this).projectOnVector(t),this.sub($s)}reflect(t){return this.sub($s.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $s=new A,Dc=new Zn;class Bt{constructor(t,e,n,r,s,a,o,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l)}set(t,e,n,r,s,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=r,h[2]=o,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=r[0],m=r[3],p=r[6],v=r[1],E=r[4],S=r[7],R=r[2],b=r[5],w=r[8];return s[0]=a*_+o*v+c*R,s[3]=a*m+o*E+c*b,s[6]=a*p+o*S+c*w,s[1]=l*_+h*v+u*R,s[4]=l*m+h*E+u*b,s[7]=l*p+h*S+u*w,s[2]=d*_+f*v+g*R,s[5]=d*m+f*E+g*b,s[8]=d*p+f*S+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,d=o*c-h*s,f=l*s-a*c,g=e*u+n*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*l-h*n)*_,t[2]=(o*n-r*a)*_,t[3]=d*_,t[4]=(h*e-r*c)*_,t[5]=(r*s-o*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-r*l,r*c,-r*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ks.makeScale(t,e)),this}rotate(t){return this.premultiply(Ks.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ks.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ks=new Bt;function gh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function gs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Id(){const i=gs("canvas");return i.style.display="block",i}const Lc={};function br(i){i in Lc||(Lc[i]=!0,console.warn(i))}function Dd(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Uc=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nc=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ld(){const i={enabled:!0,workingColorSpace:Xi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ee&&(r.r=In(r.r),r.g=In(r.g),r.b=In(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(r.r=Gi(r.r),r.g=Gi(r.g),r.b=Gi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===on?ps:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return br("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return br("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xi]:{primaries:t,whitePoint:n,transfer:ps,toXYZ:Uc,fromXYZ:Nc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ne},outputColorSpaceConfig:{drawingBufferColorSpace:Ne}},[Ne]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:Uc,fromXYZ:Nc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ne}}}),i}const $t=Ld();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ei;class Ud{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ei===void 0&&(Ei=gs("canvas")),Ei.width=t.width,Ei.height=t.height;const r=Ei.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=Ei}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=gs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=In(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nd=0;class Oo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Js(r[a].image)):s.push(Js(r[a]))}else s=Js(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Js(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ud.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fd=0;const Qs=new A;class Pe extends _i{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=ui,r=ui,s=Mn,a=di,o=We,c=dn,l=Pe.DEFAULT_ANISOTROPY,h=on){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Zi(),this.name="",this.source=new Oo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qs).x}get height(){return this.source.getSize(Qs).y}get depth(){return this.source.getSize(Qs).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ah)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ga:t.x=t.x-Math.floor(t.x);break;case ui:t.x=t.x<0?0:1;break;case Va:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ga:t.y=t.y-Math.floor(t.y);break;case ui:t.y=t.y<0?0:1;break;case Va:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=ah;Pe.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,n=0,r=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,S=(f+1)/2,R=(p+1)/2,b=(h+d)/4,w=(u+_)/4,I=(g+m)/4;return E>S&&E>R?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=b/n,s=w/n):S>R?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=b/r,s=I/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=w/s,r=I/s),this.set(n,r,s,e),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Od extends _i{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const r={width:t,height:e,depth:n.depth},s=new Pe(r);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Oo(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yn extends Od{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class _h extends Pe{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=be,this.minFilter=be,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zd extends Pe{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=be,this.minFilter=be,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $n{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(s,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Lr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(t.matrixWorld),this.union(Lr)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(er),Ur.subVectors(this.max,er),Ti.subVectors(t.a,er),bi.subVectors(t.b,er),wi.subVectors(t.c,er),Un.subVectors(bi,Ti),Nn.subVectors(wi,bi),Qn.subVectors(Ti,wi);let e=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-Qn.z,Qn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,Qn.z,0,-Qn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-Qn.y,Qn.x,0];return!ta(e,Ti,bi,wi,Ur)||(e=[1,0,0,0,1,0,0,0,1],!ta(e,Ti,bi,wi,Ur))?!1:(Nr.crossVectors(Un,Nn),e=[Nr.x,Nr.y,Nr.z],ta(e,Ti,bi,wi,Ur))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const En=[new A,new A,new A,new A,new A,new A,new A,new A],Je=new A,Lr=new $n,Ti=new A,bi=new A,wi=new A,Un=new A,Nn=new A,Qn=new A,er=new A,Ur=new A,Nr=new A,ti=new A;function ta(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ti.fromArray(i,s);const o=r.x*Math.abs(ti.x)+r.y*Math.abs(ti.y)+r.z*Math.abs(ti.z),c=t.dot(ti),l=e.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Bd=new $n,nr=new A,ea=new A;class vi{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Bd.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;nr.subVectors(t,this.center);const e=nr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(nr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(nr.copy(t.center).add(ea)),this.expandByPoint(nr.copy(t.center).sub(ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Tn=new A,na=new A,Fr=new A,Fn=new A,ia=new A,Or=new A,ra=new A;class zo{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){na.copy(t).add(e).multiplyScalar(.5),Fr.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(na);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Fr),o=Fn.dot(this.direction),c=-Fn.dot(Fr),l=Fn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(na).addScaledVector(Fr,d),f}intersectSphere(t,e){Tn.subVectors(t.center,this.origin);const n=Tn.dot(this.direction),r=Tn.dot(Tn)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,r,s){ia.subVectors(e,t),Or.subVectors(n,t),ra.crossVectors(ia,Or);let a=this.direction.dot(ra),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,t);const c=o*this.direction.dot(Or.crossVectors(Fn,Or));if(c<0)return null;const l=o*this.direction.dot(ia.cross(Fn));if(l<0||c+l>a)return null;const h=-o*Fn.dot(ra);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ut{constructor(t,e,n,r,s,a,o,c,l,h,u,d,f,g,_,m){Ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l,h,u,d,f,g,_,m)}set(t,e,n,r,s,a,o,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Ai.setFromMatrixColumn(t,0).length(),s=1/Ai.setFromMatrixColumn(t,1).length(),a=1/Ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-o*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kd,t,Hd)}lookAt(t,e,n){const r=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),On.crossVectors(n,He),On.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),On.crossVectors(n,He)),On.normalize(),zr.crossVectors(He,On),r[0]=On.x,r[4]=zr.x,r[8]=He.x,r[1]=On.y,r[5]=zr.y,r[9]=He.y,r[2]=On.z,r[6]=zr.z,r[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],E=n[7],S=n[11],R=n[15],b=r[0],w=r[4],I=r[8],y=r[12],M=r[1],P=r[5],L=r[9],N=r[13],B=r[2],W=r[6],q=r[10],$=r[14],G=r[3],nt=r[7],rt=r[11],lt=r[15];return s[0]=a*b+o*M+c*B+l*G,s[4]=a*w+o*P+c*W+l*nt,s[8]=a*I+o*L+c*q+l*rt,s[12]=a*y+o*N+c*$+l*lt,s[1]=h*b+u*M+d*B+f*G,s[5]=h*w+u*P+d*W+f*nt,s[9]=h*I+u*L+d*q+f*rt,s[13]=h*y+u*N+d*$+f*lt,s[2]=g*b+_*M+m*B+p*G,s[6]=g*w+_*P+m*W+p*nt,s[10]=g*I+_*L+m*q+p*rt,s[14]=g*y+_*N+m*$+p*lt,s[3]=v*b+E*M+S*B+R*G,s[7]=v*w+E*P+S*W+R*nt,s[11]=v*I+E*L+S*q+R*rt,s[15]=v*y+E*N+S*$+R*lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*c*u-r*l*u-s*o*d+n*l*d+r*o*f-n*c*f)+_*(+e*c*f-e*l*d+s*a*d-r*a*f+r*l*h-s*c*h)+m*(+e*l*u-e*o*f-s*a*u+n*a*f+s*o*h-n*l*h)+p*(-r*o*h-e*c*u+e*o*d+r*a*u-n*a*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],v=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,E=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,S=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,R=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,b=e*v+n*E+r*S+s*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=v*w,t[1]=(_*d*s-u*m*s-_*r*f+n*m*f+u*r*p-n*d*p)*w,t[2]=(o*m*s-_*c*s+_*r*l-n*m*l-o*r*p+n*c*p)*w,t[3]=(u*c*s-o*d*s-u*r*l+n*d*l+o*r*f-n*c*f)*w,t[4]=E*w,t[5]=(h*m*s-g*d*s+g*r*f-e*m*f-h*r*p+e*d*p)*w,t[6]=(g*c*s-a*m*s-g*r*l+e*m*l+a*r*p-e*c*p)*w,t[7]=(a*d*s-h*c*s+h*r*l-e*d*l-a*r*f+e*c*f)*w,t[8]=S*w,t[9]=(g*u*s-h*_*s-g*n*f+e*_*f+h*n*p-e*u*p)*w,t[10]=(a*_*s-g*o*s+g*n*l-e*_*l-a*n*p+e*o*p)*w,t[11]=(h*o*s-a*u*s-h*n*l+e*u*l+a*n*f-e*o*f)*w,t[12]=R*w,t[13]=(h*_*r-g*u*r+g*n*d-e*_*d-h*n*m+e*u*m)*w,t[14]=(g*o*r-a*_*r-g*n*c+e*_*c+a*n*m-e*o*m)*w,t[15]=(a*u*r-h*o*r+h*n*c-e*u*c-a*n*d+e*o*d)*w,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,h=a+a,u=o+o,d=s*l,f=s*h,g=s*u,_=a*h,m=a*u,p=o*u,v=c*l,E=c*h,S=c*u,R=n.x,b=n.y,w=n.z;return r[0]=(1-(_+p))*R,r[1]=(f+S)*R,r[2]=(g-E)*R,r[3]=0,r[4]=(f-S)*b,r[5]=(1-(d+p))*b,r[6]=(m+v)*b,r[7]=0,r[8]=(g+E)*w,r[9]=(m-v)*w,r[10]=(1-(d+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=Ai.set(r[0],r[1],r[2]).length();const a=Ai.set(r[4],r[5],r[6]).length(),o=Ai.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Qe.copy(this);const l=1/s,h=1/a,u=1/o;return Qe.elements[0]*=l,Qe.elements[1]*=l,Qe.elements[2]*=l,Qe.elements[4]*=h,Qe.elements[5]*=h,Qe.elements[6]*=h,Qe.elements[8]*=u,Qe.elements[9]*=u,Qe.elements[10]*=u,e.setFromRotationMatrix(Qe),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=xn,c=!1){const l=this.elements,h=2*s/(e-t),u=2*s/(n-r),d=(e+t)/(e-t),f=(n+r)/(n-r);let g,_;if(c)g=s/(a-s),_=a*s/(a-s);else if(o===xn)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===ms)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=xn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-r),d=-(e+t)/(e-t),f=-(n+r)/(n-r);let g,_;if(c)g=1/(a-s),_=a/(a-s);else if(o===xn)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===ms)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ai=new A,Qe=new Ut,kd=new A(0,0,0),Hd=new A(1,1,1),On=new A,zr=new A,He=new A,Fc=new Ut,Oc=new Zn;class fn{constructor(t=0,e=0,n=0,r=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Oc.setFromEuler(this),this.setFromQuaternion(Oc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class Bo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gd=0;const zc=new A,Ri=new Zn,bn=new Ut,Br=new A,ir=new A,Vd=new A,Wd=new Zn,Bc=new A(1,0,0),kc=new A(0,1,0),Hc=new A(0,0,1),Gc={type:"added"},qd={type:"removed"},Ci={type:"childadded",child:null},sa={type:"childremoved",child:null};class _e extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new A,e=new fn,n=new Zn,r=new A(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ut},normalMatrix:{value:new Bt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.premultiply(Ri),this}rotateX(t){return this.rotateOnAxis(Bc,t)}rotateY(t){return this.rotateOnAxis(kc,t)}rotateZ(t){return this.rotateOnAxis(Hc,t)}translateOnAxis(t,e){return zc.copy(t).applyQuaternion(this.quaternion),this.position.add(zc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bc,t)}translateY(t){return this.translateOnAxis(kc,t)}translateZ(t){return this.translateOnAxis(Hc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Br.copy(t):Br.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(ir,Br,this.up):bn.lookAt(Br,ir,this.up),this.quaternion.setFromRotationMatrix(bn),r&&(bn.extractRotation(r.matrixWorld),Ri.setFromRotationMatrix(bn),this.quaternion.premultiply(Ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Gc),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qd),sa.child=t,this.dispatchEvent(sa),sa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Gc),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,t,Vd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,Wd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}_e.DEFAULT_UP=new A(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new A,wn=new A,aa=new A,An=new A,Pi=new A,Ii=new A,Vc=new A,oa=new A,ca=new A,la=new A,ha=new le,ua=new le,da=new le;class cn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),tn.subVectors(t,e),r.cross(tn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){tn.subVectors(r,e),wn.subVectors(n,e),aa.subVectors(t,e);const a=tn.dot(tn),o=tn.dot(wn),c=tn.dot(aa),l=wn.dot(wn),h=wn.dot(aa),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return s.set(1-f-g,g,f)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,n,r,s,a,o,c){return this.getBarycoord(t,e,n,r,An)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,An.x),c.addScaledVector(a,An.y),c.addScaledVector(o,An.z),c)}static getInterpolatedAttribute(t,e,n,r,s,a){return ha.setScalar(0),ua.setScalar(0),da.setScalar(0),ha.fromBufferAttribute(t,e),ua.fromBufferAttribute(t,n),da.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(ha,s.x),a.addScaledVector(ua,s.y),a.addScaledVector(da,s.z),a}static isFrontFacing(t,e,n,r){return tn.subVectors(n,e),wn.subVectors(t,e),tn.cross(wn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),tn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return cn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;Pi.subVectors(r,n),Ii.subVectors(s,n),oa.subVectors(t,n);const c=Pi.dot(oa),l=Ii.dot(oa);if(c<=0&&l<=0)return e.copy(n);ca.subVectors(t,r);const h=Pi.dot(ca),u=Ii.dot(ca);if(h>=0&&u<=h)return e.copy(r);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Pi,a);la.subVectors(t,s);const f=Pi.dot(la),g=Ii.dot(la);if(g>=0&&f<=g)return e.copy(s);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ii,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Vc.subVectors(s,r),o=(u-h)/(u-h+(f-g)),e.copy(r).addScaledVector(Vc,o);const p=1/(m+_+d);return a=_*p,o=d*p,e.copy(n).addScaledVector(Pi,a).addScaledVector(Ii,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},kr={h:0,s:0,l:0};function fa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Lt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ne){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=$t.workingColorSpace){if(t=Fo(t,1),e=Gt(e,0,1),n=Gt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=fa(a,s,t+1/3),this.g=fa(a,s,t),this.b=fa(a,s,t-1/3)}return $t.colorSpaceToWorking(this,r),this}setStyle(t,e=Ne){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ne){const n=vh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ne){return $t.workingToColorSpace(Re.copy(this),t),Math.round(Gt(Re.r*255,0,255))*65536+Math.round(Gt(Re.g*255,0,255))*256+Math.round(Gt(Re.b*255,0,255))}getHexString(t=Ne){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Re.copy(this),e);const n=Re.r,r=Re.g,s=Re.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-n)/u+2;break;case s:c=(n-r)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=Ne){$t.workingToColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,r=Re.b;return t!==Ne?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(kr);const n=mr(zn.h,kr.h,e),r=mr(zn.s,kr.s,e),s=mr(zn.l,kr.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new Lt;Lt.NAMES=vh;let Xd=0;class $i extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Hi,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=Da,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ia&&(n.blendSrc=this.blendSrc),this.blendDst!==Da&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Cn extends $i{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const me=new A,Hr=new Xt;let Yd=0;class hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Cc,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Hr.fromBufferAttribute(this,e),Hr.applyMatrix3(t),this.setXY(e,Hr.x,Hr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=zi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=De(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=zi(e,this.array)),e}setX(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=zi(e,this.array)),e}setY(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=zi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=zi(e,this.array)),e}setW(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=De(e,this.array),n=De(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=De(e,this.array),n=De(n,this.array),r=De(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=De(e,this.array),n=De(n,this.array),r=De(r,this.array),s=De(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cc&&(t.usage=this.usage),t}}class Mh extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xh extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class un extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let jd=0;const je=new Ut,pa=new _e,Di=new A,Ge=new $n,rr=new $n,Te=new A;class qe extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gh(t)?xh:Mh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Bt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return pa.lookAt(t),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new un(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Ge.setFromBufferAttribute(s),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];rr.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Ge.min,rr.min),Ge.expandByPoint(Te),Te.addVectors(Ge.max,rr.max),Ge.expandByPoint(Te)):(Ge.expandByPoint(rr.min),Ge.expandByPoint(rr.max))}Ge.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)Te.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Te));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Te.fromBufferAttribute(o,l),c&&(Di.fromBufferAttribute(t,l),Te.add(Di)),r=Math.max(r,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new A,c[I]=new A;const l=new A,h=new A,u=new A,d=new Xt,f=new Xt,g=new Xt,_=new A,m=new A;function p(I,y,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,I),f.fromBufferAttribute(s,y),g.fromBufferAttribute(s,M),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[I].add(_),o[y].add(_),o[M].add(_),c[I].add(m),c[y].add(m),c[M].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let I=0,y=v.length;I<y;++I){const M=v[I],P=M.start,L=M.count;for(let N=P,B=P+L;N<B;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const E=new A,S=new A,R=new A,b=new A;function w(I){R.fromBufferAttribute(r,I),b.copy(R);const y=o[I];E.copy(y),E.sub(R.multiplyScalar(R.dot(y))).normalize(),S.crossVectors(b,y);const P=S.dot(c[I])<0?-1:1;a.setXYZW(I,E.x,E.y,E.z,P)}for(let I=0,y=v.length;I<y;++I){const M=v[I],P=M.start,L=M.count;for(let N=P,B=P+L;N<B;N+=3)w(t.getX(N+0)),w(t.getX(N+1)),w(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new A,s=new A,a=new A,o=new A,c=new A,l=new A,h=new A,u=new A;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new hn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new qe,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=t(c,n);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(r[c]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wc=new Ut,ei=new zo,Gr=new vi,qc=new A,Vr=new A,Wr=new A,qr=new A,ma=new A,Xr=new A,Xc=new A,Yr=new A;class Ce extends _e{constructor(t=new qe,e=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Xr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],u=s[c];h!==0&&(ma.fromBufferAttribute(u,t),a?Xr.addScaledVector(ma,h):Xr.addScaledVector(ma.sub(e),h))}e.add(Xr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(s),ei.copy(t.ray).recast(t.near),!(Gr.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Gr,qc)===null||ei.origin.distanceToSquared(qc)>(t.far-t.near)**2))&&(Wc.copy(s).invert(),ei.copy(t.ray).applyMatrix4(Wc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,R=E;S<R;S+=3){const b=o.getX(S),w=o.getX(S+1),I=o.getX(S+2);r=jr(this,p,t,n,l,h,u,b,w,I),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=o.getX(m),E=o.getX(m+1),S=o.getX(m+2);r=jr(this,a,t,n,l,h,u,v,E,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),E=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,R=E;S<R;S+=3){const b=S,w=S+1,I=S+2;r=jr(this,p,t,n,l,h,u,b,w,I),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=m,E=m+1,S=m+2;r=jr(this,a,t,n,l,h,u,v,E,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Zd(i,t,e,n,r,s,a,o){let c;if(t.side===ze?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,t.side===Yn,o),c===null)return null;Yr.copy(o),Yr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Yr);return l<e.near||l>e.far?null:{distance:l,point:Yr.clone(),object:i}}function jr(i,t,e,n,r,s,a,o,c,l){i.getVertexPosition(o,Vr),i.getVertexPosition(c,Wr),i.getVertexPosition(l,qr);const h=Zd(i,t,e,n,Vr,Wr,qr,Xc);if(h){const u=new A;cn.getBarycoord(Xc,Vr,Wr,qr,u),r&&(h.uv=cn.getInterpolatedAttribute(r,o,c,l,u,new Xt)),s&&(h.uv1=cn.getInterpolatedAttribute(s,o,c,l,u,new Xt)),a&&(h.normal=cn.getInterpolatedAttribute(a,o,c,l,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new A,materialIndex:0};cn.getNormal(Vr,Wr,qr,d.normal),h.face=d,h.barycoord=u}return h}class Mi extends qe{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new un(l,3)),this.setAttribute("normal",new un(h,3)),this.setAttribute("uv",new un(u,2));function g(_,m,p,v,E,S,R,b,w,I,y){const M=S/w,P=R/I,L=S/2,N=R/2,B=b/2,W=w+1,q=I+1;let $=0,G=0;const nt=new A;for(let rt=0;rt<q;rt++){const lt=rt*P-N;for(let Rt=0;Rt<W;Rt++){const Vt=Rt*M-L;nt[_]=Vt*v,nt[m]=lt*E,nt[p]=B,l.push(nt.x,nt.y,nt.z),nt[_]=0,nt[m]=0,nt[p]=b>0?1:-1,h.push(nt.x,nt.y,nt.z),u.push(Rt/w),u.push(1-rt/I),$+=1}}for(let rt=0;rt<I;rt++)for(let lt=0;lt<w;lt++){const Rt=d+lt+W*rt,Vt=d+lt+W*(rt+1),Kt=d+(lt+1)+W*(rt+1),Wt=d+(lt+1)+W*rt;c.push(Rt,Vt,Wt),c.push(Vt,Kt,Wt),G+=6}o.addGroup(f,G,y),f+=G,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Yi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Le(i){const t={};for(let e=0;e<i.length;e++){const n=Yi(i[e]);for(const r in n)t[r]=n[r]}return t}function $d(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function yh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const Kd={clone:Yi,merge:Le};var Jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends $i{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Yi(t.uniforms),this.uniformsGroups=$d(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sh extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new A,Yc=new Xt,jc=new Xt;class an extends Sh{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Tr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Tr*2*Math.atan(Math.tan(pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z)}getViewSize(t,e){return this.getViewBounds(t,Yc,jc),e.subVectors(jc,Yc)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(pr*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Li=-90,Ui=1;class tf extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Li,Ui,t,e);r.layers=this.layers,this.add(r);const s=new an(Li,Ui,t,e);s.layers=this.layers,this.add(s);const a=new an(Li,Ui,t,e);a.layers=this.layers,this.add(a);const o=new an(Li,Ui,t,e);o.layers=this.layers,this.add(o);const c=new an(Li,Ui,t,e);c.layers=this.layers,this.add(c);const l=new an(Li,Ui,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Eh extends Pe{constructor(t=[],e=Wi,n,r,s,a,o,c,l,h){super(t,e,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ef extends yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Eh(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Mi(5,5,5),s=new Dn({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:Pn});s.uniforms.tEquirect.value=e;const a=new Ce(r,s),o=e.minFilter;return e.minFilter===di&&(e.minFilter=Mn),new tf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}class Vn extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nf={type:"move"};class ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nf)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Vn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class rf extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class sf extends Pe{constructor(t=null,e=1,n=1,r,s,a,o,c,l=be,h=be,u,d){super(null,a,o,c,l,h,r,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zc extends hn{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ni=new Ut,$c=new Ut,Zr=[],Kc=new $n,af=new Ut,sr=new Ce,ar=new vi;class kn extends Ce{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Zc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,af)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new $n),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),Kc.copy(t.boundingBox).applyMatrix4(Ni),this.boundingBox.union(Kc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),ar.copy(t.boundingSphere).applyMatrix4(Ni),this.boundingSphere.union(ar)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ar.copy(this.boundingSphere),ar.applyMatrix4(n),t.ray.intersectsSphere(ar)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ni),$c.multiplyMatrices(n,Ni),sr.matrixWorld=$c,sr.raycast(t,Zr);for(let a=0,o=Zr.length;a<o;a++){const c=Zr[a];c.instanceId=s,c.object=this,e.push(c)}Zr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Zc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new sf(new Float32Array(r*this.count),r,this.count,Do,ln));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*t;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _a=new A,of=new A,cf=new Bt;class ai{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=_a.subVectors(n,e).cross(of.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(_a),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||cf.getNormalMatrix(t),r=this.coplanarPoint(_a).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new vi,lf=new Xt(.5,.5),$r=new A;class ko{constructor(t=new ai,e=new ai,n=new ai,r=new ai,s=new ai,a=new ai){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn,n=!1){const r=this.planes,s=t.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],_=s[9],m=s[10],p=s[11],v=s[12],E=s[13],S=s[14],R=s[15];if(r[0].setComponents(l-a,f-h,p-g,R-v).normalize(),r[1].setComponents(l+a,f+h,p+g,R+v).normalize(),r[2].setComponents(l+o,f+u,p+_,R+E).normalize(),r[3].setComponents(l-o,f-u,p-_,R-E).normalize(),n)r[4].setComponents(c,d,m,S).normalize(),r[5].setComponents(l-c,f-d,p-m,R-S).normalize();else if(r[4].setComponents(l-c,f-d,p-m,R-S).normalize(),e===xn)r[5].setComponents(l+c,f+d,p+m,R+S).normalize();else if(e===ms)r[5].setComponents(c,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){ni.center.set(0,0,0);const e=lf.distanceTo(t.center);return ni.radius=.7071067811865476+e,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if($r.x=r.normal.x>0?t.max.x:t.min.x,$r.y=r.normal.y>0?t.max.y:t.min.y,$r.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint($r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gr extends $i{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _s=new A,vs=new A,Jc=new Ut,or=new zo,Kr=new vi,va=new A,Qc=new A;class us extends _e{constructor(t=new qe,e=new gr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)_s.fromBufferAttribute(e,r-1),vs.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=_s.distanceTo(vs);t.setAttribute("lineDistance",new un(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(r),Kr.radius+=s,t.ray.intersectsSphere(Kr)===!1)return;Jc.copy(r).invert(),or.copy(t.ray).applyMatrix4(Jc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),v=h.getX(_+1),E=Jr(this,t,or,c,p,v,_);E&&e.push(E)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Jr(this,t,or,c,_,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Jr(this,t,or,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=Jr(this,t,or,c,g-1,f,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Jr(i,t,e,n,r,s,a){const o=i.geometry.attributes.position;if(_s.fromBufferAttribute(o,r),vs.fromBufferAttribute(o,s),e.distanceSqToSegment(_s,vs,va,Qc)>n)return;va.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(va);if(!(l<t.near||l>t.far))return{distance:l,point:Qc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const tl=new A,el=new A;class hf extends us{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)tl.fromBufferAttribute(e,r),el.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+tl.distanceTo(el);t.setAttribute("lineDistance",new un(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nl extends Pe{constructor(t,e,n,r,s,a,o,c,l){super(t,e,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Th extends Pe{constructor(t,e,n=pi,r,s,a,o=be,c=be,l,h=Sr,u=1){if(h!==Sr&&h!==Er)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Oo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class bh extends Pe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class uf{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let r=0;const s=n.length;let a;e?a=e:a=t*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=n[r]-a,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===a)return r/(s-1);const h=n[r],d=n[r+1]-h,f=(a-h)/d;return(r+f)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),c=e||(a.isVector2?new Xt:new A);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new A,r=[],s=[],a=[],o=new A,c=new Ut;for(let f=0;f<=t;f++){const g=f/t;r[f]=this.getTangentAt(g,new A)}s[0]=new A,a[0]=new A;let l=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Gt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(e===!0){let f=Math.acos(Gt(s[0].dot(s[t]),-1,1));f/=t,r[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ds extends uf{constructor(t=0,e=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new Xt){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class fi extends qe{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,u=t/o,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const v=p*d-a;for(let E=0;E<l;E++){const S=E*u-s;g.push(S,-v,0),_.push(0,0,1),m.push(E/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const E=v+l*p,S=v+l*(p+1),R=v+1+l*(p+1),b=v+1+l*p;f.push(E,S,b),f.push(S,R,b)}this.setIndex(f),this.setAttribute("position",new un(g,3)),this.setAttribute("normal",new un(_,3)),this.setAttribute("uv",new un(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Qr extends $i{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ph,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class df extends $i{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ff extends $i{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class wh extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class pf extends wh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ma=new Ut,il=new A,rl=new A;class mf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ko,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;il.setFromMatrixPosition(t.matrixWorld),e.position.copy(il),rl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rl),e.updateMatrixWorld(),Ma.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ma,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class _r extends Sh{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class gf extends mf{constructor(){super(new _r(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sl extends wh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new gf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _f extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class vf{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const al=new Ut;class Mf{constructor(t,e,n=0,r=1/0){this.ray=new zo(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new Bo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return al.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(al),this}intersectObject(t,e=!0,n=[]){return Mo(t,this,n,e),n.sort(ol),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)Mo(t[r],this,n,e);return n.sort(ol),n}}function ol(i,t){return i.distance-t.distance}function Mo(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Mo(s[a],t,e,!0)}}class xf extends hf{constructor(t=10,e=10,n=4473924,r=8947848){n=new Lt(n),r=new Lt(r);const s=e/2,a=t/e,o=t/2,c=[],l=[];for(let d=0,f=0,g=-o;d<=e;d++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);const _=d===s?n:r;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}const h=new qe;h.setAttribute("position",new un(c,3)),h.setAttribute("color",new un(l,3));const u=new gr({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class yf extends _i{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function cl(i,t,e,n){const r=Sf(n);switch(e){case uh:return i*t;case Do:return i*t/r.components*r.byteLength;case Lo:return i*t/r.components*r.byteLength;case fh:return i*t*2/r.components*r.byteLength;case Uo:return i*t*2/r.components*r.byteLength;case dh:return i*t*3/r.components*r.byteLength;case We:return i*t*4/r.components*r.byteLength;case No:return i*t*4/r.components*r.byteLength;case os:case cs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ls:case hs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qa:case Ya:return Math.max(i,16)*Math.max(t,8)/4;case Wa:case Xa:return Math.max(i,8)*Math.max(t,8)/2;case ja:case Za:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case $a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ja:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case to:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case eo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case no:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case io:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ro:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case so:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ao:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case oo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case co:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case lo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ho:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case uo:case fo:case po:return Math.ceil(i/4)*Math.ceil(t/4)*16;case mo:case go:return Math.ceil(i/4)*Math.ceil(t/4)*8;case _o:case vo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Sf(i){switch(i){case dn:case oh:return{byteLength:1,components:1};case xr:case ch:case Ar:return{byteLength:2,components:1};case Po:case Io:return{byteLength:2,components:4};case pi:case Co:case ln:return{byteLength:4,components:1};case lh:case hh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ro}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ro);function Ah(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Ef(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bf=`#ifdef USE_ALPHAHASH
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
#endif`,wf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Af=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pf=`#ifdef USE_AOMAP
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
#endif`,If=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Df=`#ifdef USE_BATCHING
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
#endif`,Lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Uf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ff=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Of=`#ifdef USE_IRIDESCENCE
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
#endif`,zf=`#ifdef USE_BUMPMAP
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
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Yf=`#define PI 3.141592653589793
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
} // validated`,jf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Zf=`vec3 transformedNormal = objectNormal;
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
#endif`,$f=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",ep=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,np=`#ifdef USE_ENVMAP
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
#endif`,ip=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rp=`#ifdef USE_ENVMAP
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
#endif`,sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ap=`#ifdef USE_ENVMAP
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
#endif`,op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,up=`#ifdef USE_GRADIENTMAP
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
}`,dp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mp=`uniform bool receiveShadow;
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
#endif`,gp=`#ifdef USE_ENVMAP
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
#endif`,_p=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yp=`PhysicalMaterial material;
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
#endif`,Sp=`struct PhysicalMaterial {
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
}`,Ep=`
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
#endif`,Tp=`#if defined( RE_IndirectDiffuse )
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
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ap=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ip=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lp=`#if defined( USE_POINTS_UV )
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
#endif`,Up=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`#ifdef USE_MORPHTARGETS
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
#endif`,kp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xp=`#ifdef USE_NORMALMAP
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
#endif`,Yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$p=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,em=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,im=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,am=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cm=`float getShadowMask() {
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
}`,lm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hm=`#ifdef USE_SKINNING
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
#endif`,um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dm=`#ifdef USE_SKINNING
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
#endif`,fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_m=`#ifdef USE_TRANSMISSION
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
#endif`,vm=`#ifdef USE_TRANSMISSION
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
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Em=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tm=`uniform sampler2D t2D;
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
}`,bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`#include <common>
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
}`,Pm=`#if DEPTH_PACKING == 3200
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
}`,Im=`#define DISTANCE
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
}`,Dm=`#define DISTANCE
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Um=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nm=`uniform float scale;
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
}`,Fm=`uniform vec3 diffuse;
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
}`,Om=`#include <common>
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
}`,zm=`uniform vec3 diffuse;
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
}`,Bm=`#define LAMBERT
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
}`,km=`#define LAMBERT
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
}`,Hm=`#define MATCAP
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
}`,Gm=`#define MATCAP
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
}`,Vm=`#define NORMAL
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
}`,Wm=`#define NORMAL
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
}`,qm=`#define PHONG
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
}`,Xm=`#define PHONG
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
}`,Ym=`#define STANDARD
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
}`,jm=`#define STANDARD
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
}`,Zm=`#define TOON
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
}`,$m=`#define TOON
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
}`,Km=`uniform float size;
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
}`,Jm=`uniform vec3 diffuse;
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
}`,Qm=`#include <common>
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
}`,tg=`uniform vec3 color;
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
}`,eg=`uniform float rotation;
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
}`,ng=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:Tf,alphahash_pars_fragment:bf,alphamap_fragment:wf,alphamap_pars_fragment:Af,alphatest_fragment:Rf,alphatest_pars_fragment:Cf,aomap_fragment:Pf,aomap_pars_fragment:If,batching_pars_vertex:Df,batching_vertex:Lf,begin_vertex:Uf,beginnormal_vertex:Nf,bsdfs:Ff,iridescence_fragment:Of,bumpmap_pars_fragment:zf,clipping_planes_fragment:Bf,clipping_planes_pars_fragment:kf,clipping_planes_pars_vertex:Hf,clipping_planes_vertex:Gf,color_fragment:Vf,color_pars_fragment:Wf,color_pars_vertex:qf,color_vertex:Xf,common:Yf,cube_uv_reflection_fragment:jf,defaultnormal_vertex:Zf,displacementmap_pars_vertex:$f,displacementmap_vertex:Kf,emissivemap_fragment:Jf,emissivemap_pars_fragment:Qf,colorspace_fragment:tp,colorspace_pars_fragment:ep,envmap_fragment:np,envmap_common_pars_fragment:ip,envmap_pars_fragment:rp,envmap_pars_vertex:sp,envmap_physical_pars_fragment:gp,envmap_vertex:ap,fog_vertex:op,fog_pars_vertex:cp,fog_fragment:lp,fog_pars_fragment:hp,gradientmap_pars_fragment:up,lightmap_pars_fragment:dp,lights_lambert_fragment:fp,lights_lambert_pars_fragment:pp,lights_pars_begin:mp,lights_toon_fragment:_p,lights_toon_pars_fragment:vp,lights_phong_fragment:Mp,lights_phong_pars_fragment:xp,lights_physical_fragment:yp,lights_physical_pars_fragment:Sp,lights_fragment_begin:Ep,lights_fragment_maps:Tp,lights_fragment_end:bp,logdepthbuf_fragment:wp,logdepthbuf_pars_fragment:Ap,logdepthbuf_pars_vertex:Rp,logdepthbuf_vertex:Cp,map_fragment:Pp,map_pars_fragment:Ip,map_particle_fragment:Dp,map_particle_pars_fragment:Lp,metalnessmap_fragment:Up,metalnessmap_pars_fragment:Np,morphinstance_vertex:Fp,morphcolor_vertex:Op,morphnormal_vertex:zp,morphtarget_pars_vertex:Bp,morphtarget_vertex:kp,normal_fragment_begin:Hp,normal_fragment_maps:Gp,normal_pars_fragment:Vp,normal_pars_vertex:Wp,normal_vertex:qp,normalmap_pars_fragment:Xp,clearcoat_normal_fragment_begin:Yp,clearcoat_normal_fragment_maps:jp,clearcoat_pars_fragment:Zp,iridescence_pars_fragment:$p,opaque_fragment:Kp,packing:Jp,premultiplied_alpha_fragment:Qp,project_vertex:tm,dithering_fragment:em,dithering_pars_fragment:nm,roughnessmap_fragment:im,roughnessmap_pars_fragment:rm,shadowmap_pars_fragment:sm,shadowmap_pars_vertex:am,shadowmap_vertex:om,shadowmask_pars_fragment:cm,skinbase_vertex:lm,skinning_pars_vertex:hm,skinning_vertex:um,skinnormal_vertex:dm,specularmap_fragment:fm,specularmap_pars_fragment:pm,tonemapping_fragment:mm,tonemapping_pars_fragment:gm,transmission_fragment:_m,transmission_pars_fragment:vm,uv_pars_fragment:Mm,uv_pars_vertex:xm,uv_vertex:ym,worldpos_vertex:Sm,background_vert:Em,background_frag:Tm,backgroundCube_vert:bm,backgroundCube_frag:wm,cube_vert:Am,cube_frag:Rm,depth_vert:Cm,depth_frag:Pm,distanceRGBA_vert:Im,distanceRGBA_frag:Dm,equirect_vert:Lm,equirect_frag:Um,linedashed_vert:Nm,linedashed_frag:Fm,meshbasic_vert:Om,meshbasic_frag:zm,meshlambert_vert:Bm,meshlambert_frag:km,meshmatcap_vert:Hm,meshmatcap_frag:Gm,meshnormal_vert:Vm,meshnormal_frag:Wm,meshphong_vert:qm,meshphong_frag:Xm,meshphysical_vert:Ym,meshphysical_frag:jm,meshtoon_vert:Zm,meshtoon_frag:$m,points_vert:Km,points_frag:Jm,shadow_vert:Qm,shadow_frag:tg,sprite_vert:eg,sprite_frag:ng},ot={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},gn={basic:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Le([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Le([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Le([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Le([ot.points,ot.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Le([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Le([ot.common,ot.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Le([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Le([ot.sprite,ot.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Le([ot.common,ot.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Le([ot.lights,ot.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};gn.physical={uniforms:Le([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const ts={r:0,b:0,g:0},ii=new fn,ig=new Ut;function rg(i,t,e,n,r,s,a){const o=new Lt(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function g(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?e:t).get(S)),S}function _(E){let S=!1;const R=g(E);R===null?p(o,c):R&&R.isColor&&(p(R,1),S=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,S){const R=g(S);R&&(R.isCubeTexture||R.mapping===ys)?(h===void 0&&(h=new Ce(new Mi(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:Yi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,w,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),ii.copy(S.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ig.makeRotationFromEuler(ii)),h.material.toneMapped=$t.getTransfer(R.colorSpace)!==ee,(u!==R||d!==R.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new Ce(new fi(2,2),new Dn({name:"BackgroundMaterial",uniforms:Yi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=$t.getTransfer(R.colorSpace)!==ee,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,S){E.getRGB(ts,yh(i)),n.buffers.color.setClear(ts.r,ts.g,ts.b,S,a)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),c=S,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(o,c)},render:_,addToRenderList:m,dispose:v}}function sg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(M,P,L,N,B){let W=!1;const q=u(N,L,P);s!==q&&(s=q,l(s.object)),W=f(M,N,L,B),W&&g(M,N,L,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,S(M,P,L,N),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,P,L){const N=L.wireframe===!0;let B=n[M.id];B===void 0&&(B={},n[M.id]=B);let W=B[P.id];W===void 0&&(W={},B[P.id]=W);let q=W[N];return q===void 0&&(q=d(c()),W[N]=q),q}function d(M){const P=[],L=[],N=[];for(let B=0;B<e;B++)P[B]=0,L[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:L,attributeDivisors:N,object:M,attributes:{},index:null}}function f(M,P,L,N){const B=s.attributes,W=P.attributes;let q=0;const $=L.getAttributes();for(const G in $)if($[G].location>=0){const rt=B[G];let lt=W[G];if(lt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor)),rt===void 0||rt.attribute!==lt||lt&&rt.data!==lt.data)return!0;q++}return s.attributesNum!==q||s.index!==N}function g(M,P,L,N){const B={},W=P.attributes;let q=0;const $=L.getAttributes();for(const G in $)if($[G].location>=0){let rt=W[G];rt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor));const lt={};lt.attribute=rt,rt&&rt.data&&(lt.data=rt.data),B[G]=lt,q++}s.attributes=B,s.attributesNum=q,s.index=N}function _(){const M=s.newAttributes;for(let P=0,L=M.length;P<L;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){const L=s.newAttributes,N=s.enabledAttributes,B=s.attributeDivisors;L[M]=1,N[M]===0&&(i.enableVertexAttribArray(M),N[M]=1),B[M]!==P&&(i.vertexAttribDivisor(M,P),B[M]=P)}function v(){const M=s.newAttributes,P=s.enabledAttributes;for(let L=0,N=P.length;L<N;L++)P[L]!==M[L]&&(i.disableVertexAttribArray(L),P[L]=0)}function E(M,P,L,N,B,W,q){q===!0?i.vertexAttribIPointer(M,P,L,B,W):i.vertexAttribPointer(M,P,L,N,B,W)}function S(M,P,L,N){_();const B=N.attributes,W=L.getAttributes(),q=P.defaultAttributeValues;for(const $ in W){const G=W[$];if(G.location>=0){let nt=B[$];if(nt===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(nt=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(nt=M.instanceColor)),nt!==void 0){const rt=nt.normalized,lt=nt.itemSize,Rt=t.get(nt);if(Rt===void 0)continue;const Vt=Rt.buffer,Kt=Rt.type,Wt=Rt.bytesPerElement,V=Kt===i.INT||Kt===i.UNSIGNED_INT||nt.gpuType===Co;if(nt.isInterleavedBufferAttribute){const j=nt.data,at=j.stride,wt=nt.offset;if(j.isInstancedInterleavedBuffer){for(let gt=0;gt<G.locationSize;gt++)p(G.location+gt,j.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let gt=0;gt<G.locationSize;gt++)m(G.location+gt);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let gt=0;gt<G.locationSize;gt++)E(G.location+gt,lt/G.locationSize,Kt,rt,at*Wt,(wt+lt/G.locationSize*gt)*Wt,V)}else{if(nt.isInstancedBufferAttribute){for(let j=0;j<G.locationSize;j++)p(G.location+j,nt.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let j=0;j<G.locationSize;j++)m(G.location+j);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let j=0;j<G.locationSize;j++)E(G.location+j,lt/G.locationSize,Kt,rt,lt*Wt,lt/G.locationSize*j*Wt,V)}}else if(q!==void 0){const rt=q[$];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(G.location,rt);break;case 3:i.vertexAttrib3fv(G.location,rt);break;case 4:i.vertexAttrib4fv(G.location,rt);break;default:i.vertexAttrib1fv(G.location,rt)}}}}v()}function R(){I();for(const M in n){const P=n[M];for(const L in P){const N=P[L];for(const B in N)h(N[B].object),delete N[B];delete P[L]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const L in P){const N=P[L];for(const B in N)h(N[B].object),delete N[B];delete P[L]}delete n[M.id]}function w(M){for(const P in n){const L=n[P];if(L[M.id]===void 0)continue;const N=L[M.id];for(const B in N)h(N[B].object),delete N[B];delete L[M.id]}}function I(){y(),a=!0,s!==r&&(s=r,l(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:y,dispose:R,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function ag(i,t,e){let n;function r(l){n=l}function s(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function og(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==We&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const I=w===Ar&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==dn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ln&&!I)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:R,maxSamples:b}}function cg(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new ai,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{const v=s?0:n,E=v*4;let S=p.clippingState||null;c.value=S,S=h(g,d,E,f);for(let R=0;R!==E;++R)S[R]=e[R];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,S=f;E!==_;++E,S+=4)a.copy(u[E]).applyMatrix4(v,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function lg(i){let t=new WeakMap;function e(a,o){return o===ka?a.mapping=Wi:o===Ha&&(a.mapping=qi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ka||o===Ha)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new ef(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",r),e(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const ki=4,ll=[.125,.215,.35,.446,.526,.582],li=20,xa=new _r,hl=new Lt;let ya=null,Sa=0,Ea=0,Ta=!1;const oi=(1+Math.sqrt(5))/2,Fi=1/oi,ul=[new A(-oi,Fi,0),new A(oi,Fi,0),new A(-Fi,0,oi),new A(Fi,0,oi),new A(0,oi,-Fi),new A(0,oi,Fi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],hg=new A;class dl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100,s={}){const{size:a=256,position:o=hg}=s;ya=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ya,Sa,Ea),this._renderer.xr.enabled=Ta,t.scissorTest=!1,es(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===qi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ya=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:Ar,format:We,colorSpace:Xi,depthBuffer:!1},r=fl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fl(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ug(s)),this._blurMaterial=dg(s,t,e)}return r}_compileMaterial(t){const e=new Ce(this._lodPlanes[0],t);this._renderer.compile(e,xa)}_sceneToCubeUV(t,e,n,r,s){const c=new an(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(hl),u.toneMapping=Xn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null));const _=new Cn({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),m=new Ce(new Mi,_);let p=!1;const v=t.background;v?v.isColor&&(_.color.copy(v),t.background=null,p=!0):(_.color.copy(hl),p=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[E],s.y,s.z)):S===1?(c.up.set(0,0,l[E]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[E],s.z)):(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[E]));const R=this._cubeSize;es(r,S*R,E>2?R:0,R,R),u.setRenderTarget(r),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Wi||t.mapping===qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ce(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;es(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,xa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=ul[(r-s-1)%ul.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ce(this._lodPlanes[r],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*li-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):li;m>li&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${li}`);const p=[];let v=0;for(let w=0;w<li;++w){const I=w/_,y=Math.exp(-I*I/2);p.push(y),w===0?v+=y:w<m&&(v+=2*y)}for(let w=0;w<p.length;w++)p[w]=p[w]/v;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;const S=this._sizeLods[r],R=3*S*(r>E-ki?r-E+ki:0),b=4*(this._cubeSize-S);es(e,R,b,3*S,2*S),c.setRenderTarget(e),c.render(u,xa)}}function ug(i){const t=[],e=[],n=[];let r=i;const s=i-ki+1+ll.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>i-ki?c=ll[a-i+ki-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*f),E=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let b=0;b<f;b++){const w=b%3*2/3-1,I=b>2?0:-1,y=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];v.set(y,_*g*b),E.set(d,m*g*b);const M=[b,b,b,b,b,b];S.set(M,p*g*b)}const R=new qe;R.setAttribute("position",new hn(v,_)),R.setAttribute("uv",new hn(E,m)),R.setAttribute("faceIndex",new hn(S,p)),t.push(R),r>ki&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fl(i,t,e){const n=new yn(i,t,e);return n.texture.mapping=ys,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function es(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function dg(i,t,e){const n=new Float32Array(li),r=new A(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function pl(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function ml(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Ho(){return`

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
	`}function fg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===ka||c===Ha,h=c===Wi||c===qi;if(l||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new dl(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&r(f)?(e===null&&(e=new dl(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function pg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&br("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function mg(i,t,e,n){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let E=0,S=v.length;E<S;E+=3){const R=v[E+0],b=v[E+1],w=v[E+2];d.push(R,b,b,w,w,R)}}else if(g!==void 0){const v=g.array;_=g.version;for(let E=0,S=v.length/3-1;E<S;E+=3){const R=E+0,b=E+1,w=E+2;d.push(R,b,b,w,w,R)}}else return;const m=new(gh(d)?xh:Mh)(d,1);m.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function gg(i,t,e){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,s,d*a),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v]*_[v];e.update(p,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function _g(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function vg(i,t,e){const n=new WeakMap,r=new le;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let M=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let R=o.attributes.position.count*S,b=1;R>t.maxTextureSize&&(b=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const w=new Float32Array(R*b*4*u),I=new _h(w,R,b,u);I.type=ln,I.needsUpdate=!0;const y=S*4;for(let P=0;P<u;P++){const L=p[P],N=v[P],B=E[P],W=R*b*4*P;for(let q=0;q<L.count;q++){const $=q*y;g===!0&&(r.fromBufferAttribute(L,q),w[W+$+0]=r.x,w[W+$+1]=r.y,w[W+$+2]=r.z,w[W+$+3]=0),_===!0&&(r.fromBufferAttribute(N,q),w[W+$+4]=r.x,w[W+$+5]=r.y,w[W+$+6]=r.z,w[W+$+7]=0),m===!0&&(r.fromBufferAttribute(B,q),w[W+$+8]=r.x,w[W+$+9]=r.y,w[W+$+10]=r.z,w[W+$+11]=B.itemSize===4?r.w:1)}}d={count:u,texture:I,size:new Xt(R,b)},n.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function Mg(i,t,e,n){let r=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(r.get(u)!==l&&(t.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return u}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}const Rh=new Pe,gl=new Th(1,1),Ch=new _h,Ph=new zd,Ih=new Eh,_l=[],vl=[],Ml=new Float32Array(16),xl=new Float32Array(9),yl=new Float32Array(4);function Ki(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=_l[r];if(s===void 0&&(s=new Float32Array(r),_l[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Se(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ss(i,t){let e=vl[t];e===void 0&&(e=new Int32Array(t),vl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function xg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function yg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2fv(this.addr,t),Se(e,t)}}function Sg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;i.uniform3fv(this.addr,t),Se(e,t)}}function Eg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4fv(this.addr,t),Se(e,t)}}function Tg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;yl.set(n),i.uniformMatrix2fv(this.addr,!1,yl),Se(e,n)}}function bg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;xl.set(n),i.uniformMatrix3fv(this.addr,!1,xl),Se(e,n)}}function wg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Ml.set(n),i.uniformMatrix4fv(this.addr,!1,Ml),Se(e,n)}}function Ag(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2iv(this.addr,t),Se(e,t)}}function Cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3iv(this.addr,t),Se(e,t)}}function Pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4iv(this.addr,t),Se(e,t)}}function Ig(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2uiv(this.addr,t),Se(e,t)}}function Lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3uiv(this.addr,t),Se(e,t)}}function Ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4uiv(this.addr,t),Se(e,t)}}function Ng(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(gl.compareFunction=mh,s=gl):s=Rh,e.setTexture2D(t||s,r)}function Fg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Ph,r)}function Og(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Ih,r)}function zg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Ch,r)}function Bg(i){switch(i){case 5126:return xg;case 35664:return yg;case 35665:return Sg;case 35666:return Eg;case 35674:return Tg;case 35675:return bg;case 35676:return wg;case 5124:case 35670:return Ag;case 35667:case 35671:return Rg;case 35668:case 35672:return Cg;case 35669:case 35673:return Pg;case 5125:return Ig;case 36294:return Dg;case 36295:return Lg;case 36296:return Ug;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return zg}}function kg(i,t){i.uniform1fv(this.addr,t)}function Hg(i,t){const e=Ki(t,this.size,2);i.uniform2fv(this.addr,e)}function Gg(i,t){const e=Ki(t,this.size,3);i.uniform3fv(this.addr,e)}function Vg(i,t){const e=Ki(t,this.size,4);i.uniform4fv(this.addr,e)}function Wg(i,t){const e=Ki(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function qg(i,t){const e=Ki(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Xg(i,t){const e=Ki(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Yg(i,t){i.uniform1iv(this.addr,t)}function jg(i,t){i.uniform2iv(this.addr,t)}function Zg(i,t){i.uniform3iv(this.addr,t)}function $g(i,t){i.uniform4iv(this.addr,t)}function Kg(i,t){i.uniform1uiv(this.addr,t)}function Jg(i,t){i.uniform2uiv(this.addr,t)}function Qg(i,t){i.uniform3uiv(this.addr,t)}function t_(i,t){i.uniform4uiv(this.addr,t)}function e_(i,t,e){const n=this.cache,r=t.length,s=Ss(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Rh,s[a])}function n_(i,t,e){const n=this.cache,r=t.length,s=Ss(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Ph,s[a])}function i_(i,t,e){const n=this.cache,r=t.length,s=Ss(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Ih,s[a])}function r_(i,t,e){const n=this.cache,r=t.length,s=Ss(e,r);ye(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Ch,s[a])}function s_(i){switch(i){case 5126:return kg;case 35664:return Hg;case 35665:return Gg;case 35666:return Vg;case 35674:return Wg;case 35675:return qg;case 35676:return Xg;case 5124:case 35670:return Yg;case 35667:case 35671:return jg;case 35668:case 35672:return Zg;case 35669:case 35673:return $g;case 5125:return Kg;case 36294:return Jg;case 36295:return Qg;case 36296:return t_;case 35678:case 36198:case 36298:case 36306:case 35682:return e_;case 35679:case 36299:case 36307:return n_;case 35680:case 36300:case 36308:case 36293:return i_;case 36289:case 36303:case 36311:case 36292:return r_}}class a_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bg(e.type)}}class o_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=s_(e.type)}}class c_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function Sl(i,t){i.seq.push(t),i.map[t.id]=t}function l_(i,t,e){const n=i.name,r=n.length;for(ba.lastIndex=0;;){const s=ba.exec(n),a=ba.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Sl(e,l===void 0?new a_(o,i,t):new o_(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new c_(o),Sl(e,u)),e=u}}}class fs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);l_(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function El(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const h_=37297;let u_=0;function d_(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Tl=new Bt;function f_(i){$t._getMatrix(Tl,$t.workingColorSpace,i);const t=`mat3( ${Tl.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case ps:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function bl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+d_(i.getShaderSource(t),o)}else return s}function p_(i,t){const e=f_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function m_(i,t){let e;switch(t){case Ku:e="Linear";break;case Ju:e="Reinhard";break;case Qu:e="Cineon";break;case sh:e="ACESFilmic";break;case ed:e="AgX";break;case nd:e="Neutral";break;case td:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ns=new A;function g_(){$t.getLuminanceCoefficients(ns);const i=ns.x.toFixed(4),t=ns.y.toFixed(4),e=ns.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function __(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dr).join(`
`)}function v_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function M_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function dr(i){return i!==""}function wl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Al(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const x_=/^[ \t]*#include +<([\w\d./]+)>/gm;function xo(i){return i.replace(x_,S_)}const y_=new Map;function S_(i,t){let e=Ht[t];if(e===void 0){const n=y_.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return xo(e)}const E_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(i){return i.replace(E_,T_)}function T_(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Cl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function b_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ih?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Pu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(t="SHADOWMAP_TYPE_VSM"),t}function w_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Wi:case qi:t="ENVMAP_TYPE_CUBE";break;case ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function A_(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===qi&&(t="ENVMAP_MODE_REFRACTION"),t}function R_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case rh:t="ENVMAP_BLENDING_MULTIPLY";break;case Zu:t="ENVMAP_BLENDING_MIX";break;case $u:t="ENVMAP_BLENDING_ADD";break}return t}function C_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function P_(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=b_(e),l=w_(e),h=A_(e),u=R_(e),d=C_(e),f=__(e),g=v_(s),_=r.createProgram();let m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(dr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(dr).join(`
`),p.length>0&&(p+=`
`)):(m=[Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),p=[Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Xn?m_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,p_("linearToOutputTexel",e.outputColorSpace),g_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(dr).join(`
`)),a=xo(a),a=wl(a,e),a=Al(a,e),o=xo(o),o=wl(o,e),o=Al(o,e),a=Rl(a),o=Rl(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=v+m+a,S=v+p+o,R=El(r,r.VERTEX_SHADER,E),b=El(r,r.FRAGMENT_SHADER,S);r.attachShader(_,R),r.attachShader(_,b),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(P){if(i.debug.checkShaderErrors){const L=r.getProgramInfoLog(_)||"",N=r.getShaderInfoLog(R)||"",B=r.getShaderInfoLog(b)||"",W=L.trim(),q=N.trim(),$=B.trim();let G=!0,nt=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,R,b);else{const rt=bl(r,R,"vertex"),lt=bl(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+W+`
`+rt+`
`+lt)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(q===""||$==="")&&(nt=!1);nt&&(P.diagnostics={runnable:G,programLog:W,vertexShader:{log:q,prefix:m},fragmentShader:{log:$,prefix:p}})}r.deleteShader(R),r.deleteShader(b),I=new fs(r,_),y=M_(r,_)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,h_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=u_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=b,this}let I_=0;class D_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new L_(t),e.set(t,n)),n}}class L_{constructor(t){this.id=I_++,this.code=t,this.usedTimes=0}}function U_(i,t,e,n,r,s,a){const o=new Bo,c=new D_,l=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,M,P,L,N){const B=L.fog,W=N.geometry,q=y.isMeshStandardMaterial?L.environment:null,$=(y.isMeshStandardMaterial?e:t).get(y.envMap||q),G=$&&$.mapping===ys?$.image.height:null,nt=g[y.type];y.precision!==null&&(f=r.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const rt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,lt=rt!==void 0?rt.length:0;let Rt=0;W.morphAttributes.position!==void 0&&(Rt=1),W.morphAttributes.normal!==void 0&&(Rt=2),W.morphAttributes.color!==void 0&&(Rt=3);let Vt,Kt,Wt,V;if(nt){const Jt=gn[nt];Vt=Jt.vertexShader,Kt=Jt.fragmentShader}else Vt=y.vertexShader,Kt=y.fragmentShader,c.update(y),Wt=c.getVertexShaderID(y),V=c.getFragmentShaderID(y);const j=i.getRenderTarget(),at=i.state.buffers.depth.getReversed(),wt=N.isInstancedMesh===!0,gt=N.isBatchedMesh===!0,Yt=!!y.map,we=!!y.matcap,D=!!$,ae=!!y.aoMap,Ft=!!y.lightMap,It=!!y.bumpMap,_t=!!y.normalMap,oe=!!y.displacementMap,vt=!!y.emissiveMap,kt=!!y.metalnessMap,Ee=!!y.roughnessMap,pe=y.anisotropy>0,C=y.clearcoat>0,x=y.dispersion>0,z=y.iridescence>0,Y=y.sheen>0,K=y.transmission>0,X=pe&&!!y.anisotropyMap,St=C&&!!y.clearcoatMap,it=C&&!!y.clearcoatNormalMap,Mt=C&&!!y.clearcoatRoughnessMap,xt=z&&!!y.iridescenceMap,tt=z&&!!y.iridescenceThicknessMap,ut=Y&&!!y.sheenColorMap,Pt=Y&&!!y.sheenRoughnessMap,yt=!!y.specularMap,ct=!!y.specularColorMap,zt=!!y.specularIntensityMap,U=K&&!!y.transmissionMap,et=K&&!!y.thicknessMap,st=!!y.gradientMap,ft=!!y.alphaMap,J=y.alphaTest>0,Z=!!y.alphaHash,mt=!!y.extensions;let Nt=Xn;y.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Nt=i.toneMapping);const ie={shaderID:nt,shaderType:y.type,shaderName:y.name,vertexShader:Vt,fragmentShader:Kt,defines:y.defines,customVertexShaderID:Wt,customFragmentShaderID:V,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:gt,batchingColor:gt&&N._colorsTexture!==null,instancing:wt,instancingColor:wt&&N.instanceColor!==null,instancingMorph:wt&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Xi,alphaToCoverage:!!y.alphaToCoverage,map:Yt,matcap:we,envMap:D,envMapMode:D&&$.mapping,envMapCubeUVHeight:G,aoMap:ae,lightMap:Ft,bumpMap:It,normalMap:_t,displacementMap:d&&oe,emissiveMap:vt,normalMapObjectSpace:_t&&y.normalMapType===ad,normalMapTangentSpace:_t&&y.normalMapType===ph,metalnessMap:kt,roughnessMap:Ee,anisotropy:pe,anisotropyMap:X,clearcoat:C,clearcoatMap:St,clearcoatNormalMap:it,clearcoatRoughnessMap:Mt,dispersion:x,iridescence:z,iridescenceMap:xt,iridescenceThicknessMap:tt,sheen:Y,sheenColorMap:ut,sheenRoughnessMap:Pt,specularMap:yt,specularColorMap:ct,specularIntensityMap:zt,transmission:K,transmissionMap:U,thicknessMap:et,gradientMap:st,opaque:y.transparent===!1&&y.blending===Hi&&y.alphaToCoverage===!1,alphaMap:ft,alphaTest:J,alphaHash:Z,combine:y.combine,mapUv:Yt&&_(y.map.channel),aoMapUv:ae&&_(y.aoMap.channel),lightMapUv:Ft&&_(y.lightMap.channel),bumpMapUv:It&&_(y.bumpMap.channel),normalMapUv:_t&&_(y.normalMap.channel),displacementMapUv:oe&&_(y.displacementMap.channel),emissiveMapUv:vt&&_(y.emissiveMap.channel),metalnessMapUv:kt&&_(y.metalnessMap.channel),roughnessMapUv:Ee&&_(y.roughnessMap.channel),anisotropyMapUv:X&&_(y.anisotropyMap.channel),clearcoatMapUv:St&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:it&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&_(y.sheenRoughnessMap.channel),specularMapUv:yt&&_(y.specularMap.channel),specularColorMapUv:ct&&_(y.specularColorMap.channel),specularIntensityMapUv:zt&&_(y.specularIntensityMap.channel),transmissionMapUv:U&&_(y.transmissionMap.channel),thicknessMapUv:et&&_(y.thicknessMap.channel),alphaMapUv:ft&&_(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(_t||pe),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!W.attributes.uv&&(Yt||ft),fog:!!B,useFog:y.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:at,skinning:N.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:Rt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Yt&&y.map.isVideoTexture===!0&&$t.getTransfer(y.map.colorSpace)===ee,decodeVideoTextureEmissive:vt&&y.emissiveMap.isVideoTexture===!0&&$t.getTransfer(y.emissiveMap.colorSpace)===ee,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===_n,flipSided:y.side===ze,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:mt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&y.extensions.multiDraw===!0||gt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ie.vertexUv1s=l.has(1),ie.vertexUv2s=l.has(2),ie.vertexUv3s=l.has(3),l.clear(),ie}function p(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)M.push(P),M.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(v(M,y),E(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function v(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function E(y,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),y.push(o.mask)}function S(y){const M=g[y.type];let P;if(M){const L=gn[M];P=Kd.clone(L.uniforms)}else P=y.uniforms;return P}function R(y,M){let P;for(let L=0,N=h.length;L<N;L++){const B=h[L];if(B.cacheKey===M){P=B,++P.usedTimes;break}}return P===void 0&&(P=new P_(i,M,y,s),h.push(P)),P}function b(y){if(--y.usedTimes===0){const M=h.indexOf(y);h[M]=h[h.length-1],h.pop(),y.destroy()}}function w(y){c.remove(y)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:R,releaseProgram:b,releaseShaderCache:w,programs:h,dispose:I}}function N_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function F_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Pl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Il(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(u,d,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):e.push(p)}function c(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||F_),n.length>1&&n.sort(d||Pl),r.length>1&&r.sort(d||Pl)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:h,sort:l}}function O_(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new Il,i.set(n,[a])):r>=s.length?(a=new Il,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function z_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Lt};break;case"SpotLight":e={position:new A,direction:new A,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function B_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let k_=0;function H_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function G_(i){const t=new z_,e=B_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new A);const r=new A,s=new Ut,a=new Ut;function o(l){let h=0,u=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,v=0,E=0,S=0,R=0,b=0,w=0;l.sort(H_);for(let y=0,M=l.length;y<M;y++){const P=l[y],L=P.color,N=P.intensity,B=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=L.r*N,u+=L.g*N,d+=L.b*N;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],N);w++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,G=e.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=q,f++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(L).multiplyScalar(N),q.distance=B,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[_]=q;const $=P.shadow;if(P.map&&(n.spotLightMap[R]=P.map,R++,$.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[_]=$.matrix,P.castShadow){const G=e.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=W,S++}_++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(L).multiplyScalar(N),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=q,m++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const $=P.shadow,G=e.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,G.shadowCameraNear=$.camera.near,G.shadowCameraFar=$.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=q,g++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(N),q.groundColor.copy(P.groundColor).multiplyScalar(N),n.hemi[p]=q,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==v||I.numPointShadows!==E||I.numSpotShadows!==S||I.numSpotMaps!==R||I.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=S+R-b,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=w,I.directionalLength=f,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=v,I.numPointShadows=E,I.numSpotShadows=S,I.numSpotMaps=R,I.numLightProbes=w,n.version=k_++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const E=l[p];if(E.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),u++}else if(E.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(E.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function Dl(i){const t=new G_(i),e=[],n=[];function r(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function V_(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Dl(i),t.set(r,[o])):s>=a.length?(o=new Dl(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const W_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q_=`uniform sampler2D shadow_pass;
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
}`;function X_(i,t,e){let n=new ko;const r=new Xt,s=new Xt,a=new le,o=new df({depthPacking:sd}),c=new ff,l={},h=e.maxTextureSize,u={[Yn]:ze,[ze]:Yn,[_n]:_n},d=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:W_,fragmentShader:q_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new qe;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ce(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ih;let p=this.type;this.render=function(b,w,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const y=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Pn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const N=p!==Rn&&this.type===Rn,B=p===Rn&&this.type!==Rn;for(let W=0,q=b.length;W<q;W++){const $=b[W],G=$.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const nt=G.getFrameExtents();if(r.multiply(nt),s.copy(G.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/nt.x),r.x=s.x*nt.x,G.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/nt.y),r.y=s.y*nt.y,G.mapSize.y=s.y)),G.map===null||N===!0||B===!0){const lt=this.type!==Rn?{minFilter:be,magFilter:be}:{};G.map!==null&&G.map.dispose(),G.map=new yn(r.x,r.y,lt),G.map.texture.name=$.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const rt=G.getViewportCount();for(let lt=0;lt<rt;lt++){const Rt=G.getViewport(lt);a.set(s.x*Rt.x,s.y*Rt.y,s.x*Rt.z,s.y*Rt.w),L.viewport(a),G.updateMatrices($,lt),n=G.getFrustum(),S(w,I,G.camera,$,this.type)}G.isPointLightShadow!==!0&&this.type===Rn&&v(G,I),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,M,P)};function v(b,w){const I=t.update(_);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new yn(r.x,r.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(w,null,I,d,_,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(w,null,I,f,_,null)}function E(b,w,I,y){let M=null;const P=I.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const L=M.uuid,N=w.uuid;let B=l[L];B===void 0&&(B={},l[L]=B);let W=B[N];W===void 0&&(W=M.clone(),B[N]=W,w.addEventListener("dispose",R)),M=W}if(M.visible=w.visible,M.wireframe=w.wireframe,y===Rn?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const L=i.properties.get(M);L.light=I}return M}function S(b,w,I,y,M){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===Rn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,b.matrixWorld);const N=t.update(b),B=b.material;if(Array.isArray(B)){const W=N.groups;for(let q=0,$=W.length;q<$;q++){const G=W[q],nt=B[G.materialIndex];if(nt&&nt.visible){const rt=E(b,nt,y,M);b.onBeforeShadow(i,b,w,I,N,rt,G),i.renderBufferDirect(I,null,N,rt,b,G),b.onAfterShadow(i,b,w,I,N,rt,G)}}}else if(B.visible){const W=E(b,B,y,M);b.onBeforeShadow(i,b,w,I,N,W,null),i.renderBufferDirect(I,null,N,W,b,null),b.onAfterShadow(i,b,w,I,N,W,null)}}const L=b.children;for(let N=0,B=L.length;N<B;N++)S(L[N],w,I,y,M)}function R(b){b.target.removeEventListener("dispose",R);for(const I in l){const y=l[I],M=b.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Y_={[La]:Ua,[Na]:za,[Fa]:Ba,[Vi]:Oa,[Ua]:La,[za]:Na,[Ba]:Fa,[Oa]:Vi};function j_(i,t){function e(){let U=!1;const et=new le;let st=null;const ft=new le(0,0,0,0);return{setMask:function(J){st!==J&&!U&&(i.colorMask(J,J,J,J),st=J)},setLocked:function(J){U=J},setClear:function(J,Z,mt,Nt,ie){ie===!0&&(J*=Nt,Z*=Nt,mt*=Nt),et.set(J,Z,mt,Nt),ft.equals(et)===!1&&(i.clearColor(J,Z,mt,Nt),ft.copy(et))},reset:function(){U=!1,st=null,ft.set(-1,0,0,0)}}}function n(){let U=!1,et=!1,st=null,ft=null,J=null;return{setReversed:function(Z){if(et!==Z){const mt=t.get("EXT_clip_control");Z?mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.ZERO_TO_ONE_EXT):mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.NEGATIVE_ONE_TO_ONE_EXT),et=Z;const Nt=J;J=null,this.setClear(Nt)}},getReversed:function(){return et},setTest:function(Z){Z?j(i.DEPTH_TEST):at(i.DEPTH_TEST)},setMask:function(Z){st!==Z&&!U&&(i.depthMask(Z),st=Z)},setFunc:function(Z){if(et&&(Z=Y_[Z]),ft!==Z){switch(Z){case La:i.depthFunc(i.NEVER);break;case Ua:i.depthFunc(i.ALWAYS);break;case Na:i.depthFunc(i.LESS);break;case Vi:i.depthFunc(i.LEQUAL);break;case Fa:i.depthFunc(i.EQUAL);break;case Oa:i.depthFunc(i.GEQUAL);break;case za:i.depthFunc(i.GREATER);break;case Ba:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=Z}},setLocked:function(Z){U=Z},setClear:function(Z){J!==Z&&(et&&(Z=1-Z),i.clearDepth(Z),J=Z)},reset:function(){U=!1,st=null,ft=null,J=null,et=!1}}}function r(){let U=!1,et=null,st=null,ft=null,J=null,Z=null,mt=null,Nt=null,ie=null;return{setTest:function(Jt){U||(Jt?j(i.STENCIL_TEST):at(i.STENCIL_TEST))},setMask:function(Jt){et!==Jt&&!U&&(i.stencilMask(Jt),et=Jt)},setFunc:function(Jt,Sn,pn){(st!==Jt||ft!==Sn||J!==pn)&&(i.stencilFunc(Jt,Sn,pn),st=Jt,ft=Sn,J=pn)},setOp:function(Jt,Sn,pn){(Z!==Jt||mt!==Sn||Nt!==pn)&&(i.stencilOp(Jt,Sn,pn),Z=Jt,mt=Sn,Nt=pn)},setLocked:function(Jt){U=Jt},setClear:function(Jt){ie!==Jt&&(i.clearStencil(Jt),ie=Jt)},reset:function(){U=!1,et=null,st=null,ft=null,J=null,Z=null,mt=null,Nt=null,ie=null}}}const s=new e,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,v=null,E=null,S=null,R=null,b=null,w=new Lt(0,0,0),I=0,y=!1,M=null,P=null,L=null,N=null,B=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,$=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(G)[1]),q=$>=1):G.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),q=$>=2);let nt=null,rt={};const lt=i.getParameter(i.SCISSOR_BOX),Rt=i.getParameter(i.VIEWPORT),Vt=new le().fromArray(lt),Kt=new le().fromArray(Rt);function Wt(U,et,st,ft){const J=new Uint8Array(4),Z=i.createTexture();i.bindTexture(U,Z),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let mt=0;mt<st;mt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(et,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(et+mt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return Z}const V={};V[i.TEXTURE_2D]=Wt(i.TEXTURE_2D,i.TEXTURE_2D,1),V[i.TEXTURE_CUBE_MAP]=Wt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[i.TEXTURE_2D_ARRAY]=Wt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),V[i.TEXTURE_3D]=Wt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(Vi),It(!1),_t(Tc),j(i.CULL_FACE),ae(Pn);function j(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function at(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function wt(U,et){return u[U]!==et?(i.bindFramebuffer(U,et),u[U]=et,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=et),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=et),!0):!1}function gt(U,et){let st=f,ft=!1;if(U){st=d.get(et),st===void 0&&(st=[],d.set(et,st));const J=U.textures;if(st.length!==J.length||st[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,mt=J.length;Z<mt;Z++)st[Z]=i.COLOR_ATTACHMENT0+Z;st.length=J.length,ft=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,ft=!0);ft&&i.drawBuffers(st)}function Yt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const we={[ci]:i.FUNC_ADD,[Du]:i.FUNC_SUBTRACT,[Lu]:i.FUNC_REVERSE_SUBTRACT};we[Uu]=i.MIN,we[Nu]=i.MAX;const D={[Fu]:i.ZERO,[Ou]:i.ONE,[zu]:i.SRC_COLOR,[Ia]:i.SRC_ALPHA,[Wu]:i.SRC_ALPHA_SATURATE,[Gu]:i.DST_COLOR,[ku]:i.DST_ALPHA,[Bu]:i.ONE_MINUS_SRC_COLOR,[Da]:i.ONE_MINUS_SRC_ALPHA,[Vu]:i.ONE_MINUS_DST_COLOR,[Hu]:i.ONE_MINUS_DST_ALPHA,[qu]:i.CONSTANT_COLOR,[Xu]:i.ONE_MINUS_CONSTANT_COLOR,[Yu]:i.CONSTANT_ALPHA,[ju]:i.ONE_MINUS_CONSTANT_ALPHA};function ae(U,et,st,ft,J,Z,mt,Nt,ie,Jt){if(U===Pn){_===!0&&(at(i.BLEND),_=!1);return}if(_===!1&&(j(i.BLEND),_=!0),U!==Iu){if(U!==m||Jt!==y){if((p!==ci||S!==ci)&&(i.blendEquation(i.FUNC_ADD),p=ci,S=ci),Jt)switch(U){case Hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bc:i.blendFunc(i.ONE,i.ONE);break;case wc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ac:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ac:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,E=null,R=null,b=null,w.set(0,0,0),I=0,m=U,y=Jt}return}J=J||et,Z=Z||st,mt=mt||ft,(et!==p||J!==S)&&(i.blendEquationSeparate(we[et],we[J]),p=et,S=J),(st!==v||ft!==E||Z!==R||mt!==b)&&(i.blendFuncSeparate(D[st],D[ft],D[Z],D[mt]),v=st,E=ft,R=Z,b=mt),(Nt.equals(w)===!1||ie!==I)&&(i.blendColor(Nt.r,Nt.g,Nt.b,ie),w.copy(Nt),I=ie),m=U,y=!1}function Ft(U,et){U.side===_n?at(i.CULL_FACE):j(i.CULL_FACE);let st=U.side===ze;et&&(st=!st),It(st),U.blending===Hi&&U.transparent===!1?ae(Pn):ae(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const ft=U.stencilWrite;o.setTest(ft),ft&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),vt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):at(i.SAMPLE_ALPHA_TO_COVERAGE)}function It(U){M!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),M=U)}function _t(U){U!==Ru?(j(i.CULL_FACE),U!==P&&(U===Tc?i.cullFace(i.BACK):U===Cu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):at(i.CULL_FACE),P=U}function oe(U){U!==L&&(q&&i.lineWidth(U),L=U)}function vt(U,et,st){U?(j(i.POLYGON_OFFSET_FILL),(N!==et||B!==st)&&(i.polygonOffset(et,st),N=et,B=st)):at(i.POLYGON_OFFSET_FILL)}function kt(U){U?j(i.SCISSOR_TEST):at(i.SCISSOR_TEST)}function Ee(U){U===void 0&&(U=i.TEXTURE0+W-1),nt!==U&&(i.activeTexture(U),nt=U)}function pe(U,et,st){st===void 0&&(nt===null?st=i.TEXTURE0+W-1:st=nt);let ft=rt[st];ft===void 0&&(ft={type:void 0,texture:void 0},rt[st]=ft),(ft.type!==U||ft.texture!==et)&&(nt!==st&&(i.activeTexture(st),nt=st),i.bindTexture(U,et||V[U]),ft.type=U,ft.texture=et)}function C(){const U=rt[nt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ut(U){Vt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Vt.copy(U))}function Pt(U){Kt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Kt.copy(U))}function yt(U,et){let st=l.get(et);st===void 0&&(st=new WeakMap,l.set(et,st));let ft=st.get(U);ft===void 0&&(ft=i.getUniformBlockIndex(et,U.name),st.set(U,ft))}function ct(U,et){const ft=l.get(et).get(U);c.get(et)!==ft&&(i.uniformBlockBinding(et,ft,U.__bindingPointIndex),c.set(et,ft))}function zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},nt=null,rt={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,v=null,E=null,S=null,R=null,b=null,w=new Lt(0,0,0),I=0,y=!1,M=null,P=null,L=null,N=null,B=null,Vt.set(0,0,i.canvas.width,i.canvas.height),Kt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:j,disable:at,bindFramebuffer:wt,drawBuffers:gt,useProgram:Yt,setBlending:ae,setMaterial:Ft,setFlipSided:It,setCullFace:_t,setLineWidth:oe,setPolygonOffset:vt,setScissorTest:kt,activeTexture:Ee,bindTexture:pe,unbindTexture:C,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:xt,texImage3D:tt,updateUBOMapping:yt,uniformBlockBinding:ct,texStorage2D:it,texStorage3D:Mt,texSubImage2D:Y,texSubImage3D:K,compressedTexSubImage2D:X,compressedTexSubImage3D:St,scissor:ut,viewport:Pt,reset:zt}}function Z_(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,x){return f?new OffscreenCanvas(C,x):gs("canvas")}function _(C,x,z){let Y=1;const K=pe(C);if((K.width>z||K.height>z)&&(Y=z/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const X=Math.floor(Y*K.width),St=Math.floor(Y*K.height);u===void 0&&(u=g(X,St));const it=x?g(X,St):u;return it.width=X,it.height=St,it.getContext("2d").drawImage(C,0,0,X,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+X+"x"+St+")."),it}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(C,x,z,Y,K=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=x;if(x===i.RED&&(z===i.FLOAT&&(X=i.R32F),z===i.HALF_FLOAT&&(X=i.R16F),z===i.UNSIGNED_BYTE&&(X=i.R8)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.R8UI),z===i.UNSIGNED_SHORT&&(X=i.R16UI),z===i.UNSIGNED_INT&&(X=i.R32UI),z===i.BYTE&&(X=i.R8I),z===i.SHORT&&(X=i.R16I),z===i.INT&&(X=i.R32I)),x===i.RG&&(z===i.FLOAT&&(X=i.RG32F),z===i.HALF_FLOAT&&(X=i.RG16F),z===i.UNSIGNED_BYTE&&(X=i.RG8)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RG8UI),z===i.UNSIGNED_SHORT&&(X=i.RG16UI),z===i.UNSIGNED_INT&&(X=i.RG32UI),z===i.BYTE&&(X=i.RG8I),z===i.SHORT&&(X=i.RG16I),z===i.INT&&(X=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RGB8UI),z===i.UNSIGNED_SHORT&&(X=i.RGB16UI),z===i.UNSIGNED_INT&&(X=i.RGB32UI),z===i.BYTE&&(X=i.RGB8I),z===i.SHORT&&(X=i.RGB16I),z===i.INT&&(X=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),z===i.UNSIGNED_INT&&(X=i.RGBA32UI),z===i.BYTE&&(X=i.RGBA8I),z===i.SHORT&&(X=i.RGBA16I),z===i.INT&&(X=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),x===i.RGBA){const St=K?ps:$t.getTransfer(Y);z===i.FLOAT&&(X=i.RGBA32F),z===i.HALF_FLOAT&&(X=i.RGBA16F),z===i.UNSIGNED_BYTE&&(X=St===ee?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function S(C,x){let z;return C?x===null||x===pi||x===yr?z=i.DEPTH24_STENCIL8:x===ln?z=i.DEPTH32F_STENCIL8:x===xr&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===pi||x===yr?z=i.DEPTH_COMPONENT24:x===ln?z=i.DEPTH_COMPONENT32F:x===xr&&(z=i.DEPTH_COMPONENT16),z}function R(C,x){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==be&&C.minFilter!==Mn?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function b(C){const x=C.target;x.removeEventListener("dispose",b),I(x),x.isVideoTexture&&h.delete(x)}function w(C){const x=C.target;x.removeEventListener("dispose",w),M(x)}function I(C){const x=n.get(C);if(x.__webglInit===void 0)return;const z=C.source,Y=d.get(z);if(Y){const K=Y[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&y(C),Object.keys(Y).length===0&&d.delete(z)}n.remove(C)}function y(C){const x=n.get(C);i.deleteTexture(x.__webglTexture);const z=C.source,Y=d.get(z);delete Y[x.__cacheKey],a.memory.textures--}function M(C){const x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let K=0;K<x.__webglFramebuffer[Y].length;K++)i.deleteFramebuffer(x.__webglFramebuffer[Y][K]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=C.textures;for(let Y=0,K=z.length;Y<K;Y++){const X=n.get(z[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(z[Y])}n.remove(C)}let P=0;function L(){P=0}function N(){const C=P;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),P+=1,C}function B(C){const x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function W(C,x){const z=n.get(C);if(C.isVideoTexture&&kt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){const Y=C.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(z,C,x);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function q(C,x){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){V(z,C,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function $(C,x){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){V(z,C,x);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function G(C,x){const z=n.get(C);if(C.version>0&&z.__version!==C.version){j(z,C,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}const nt={[Ga]:i.REPEAT,[ui]:i.CLAMP_TO_EDGE,[Va]:i.MIRRORED_REPEAT},rt={[be]:i.NEAREST,[id]:i.NEAREST_MIPMAP_NEAREST,[Dr]:i.NEAREST_MIPMAP_LINEAR,[Mn]:i.LINEAR,[Zs]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},lt={[od]:i.NEVER,[fd]:i.ALWAYS,[cd]:i.LESS,[mh]:i.LEQUAL,[ld]:i.EQUAL,[dd]:i.GEQUAL,[hd]:i.GREATER,[ud]:i.NOTEQUAL};function Rt(C,x){if(x.type===ln&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Mn||x.magFilter===Zs||x.magFilter===Dr||x.magFilter===di||x.minFilter===Mn||x.minFilter===Zs||x.minFilter===Dr||x.minFilter===di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,nt[x.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,nt[x.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,nt[x.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,rt[x.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,rt[x.minFilter]),x.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,lt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===be||x.minFilter!==Dr&&x.minFilter!==di||x.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Vt(C,x){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",b));const Y=x.source;let K=d.get(Y);K===void 0&&(K={},d.set(Y,K));const X=B(x);if(X!==C.__cacheKey){K[X]===void 0&&(K[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),K[X].usedTimes++;const St=K[C.__cacheKey];St!==void 0&&(K[C.__cacheKey].usedTimes--,St.usedTimes===0&&y(x)),C.__cacheKey=X,C.__webglTexture=K[X].texture}return z}function Kt(C,x,z){return Math.floor(Math.floor(C/z)/x)}function Wt(C,x,z,Y){const X=C.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,Y,x.data);else{X.sort((tt,ut)=>tt.start-ut.start);let St=0;for(let tt=1;tt<X.length;tt++){const ut=X[St],Pt=X[tt],yt=ut.start+ut.count,ct=Kt(Pt.start,x.width,4),zt=Kt(ut.start,x.width,4);Pt.start<=yt+1&&ct===zt&&Kt(Pt.start+Pt.count-1,x.width,4)===ct?ut.count=Math.max(ut.count,Pt.start+Pt.count-ut.start):(++St,X[St]=Pt)}X.length=St+1;const it=i.getParameter(i.UNPACK_ROW_LENGTH),Mt=i.getParameter(i.UNPACK_SKIP_PIXELS),xt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let tt=0,ut=X.length;tt<ut;tt++){const Pt=X[tt],yt=Math.floor(Pt.start/4),ct=Math.ceil(Pt.count/4),zt=yt%x.width,U=Math.floor(yt/x.width),et=ct,st=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,zt),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,zt,U,et,st,z,Y,x.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(i.UNPACK_SKIP_ROWS,xt)}}function V(C,x,z){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);const K=Vt(C,x),X=x.source;e.bindTexture(Y,C.__webglTexture,i.TEXTURE0+z);const St=n.get(X);if(X.version!==St.__version||K===!0){e.activeTexture(i.TEXTURE0+z);const it=$t.getPrimaries($t.workingColorSpace),Mt=x.colorSpace===on?null:$t.getPrimaries(x.colorSpace),xt=x.colorSpace===on||it===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let tt=_(x.image,!1,r.maxTextureSize);tt=Ee(x,tt);const ut=s.convert(x.format,x.colorSpace),Pt=s.convert(x.type);let yt=E(x.internalFormat,ut,Pt,x.colorSpace,x.isVideoTexture);Rt(Y,x);let ct;const zt=x.mipmaps,U=x.isVideoTexture!==!0,et=St.__version===void 0||K===!0,st=X.dataReady,ft=R(x,tt);if(x.isDepthTexture)yt=S(x.format===Er,x.type),et&&(U?e.texStorage2D(i.TEXTURE_2D,1,yt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,yt,tt.width,tt.height,0,ut,Pt,null));else if(x.isDataTexture)if(zt.length>0){U&&et&&e.texStorage2D(i.TEXTURE_2D,ft,yt,zt[0].width,zt[0].height);for(let J=0,Z=zt.length;J<Z;J++)ct=zt[J],U?st&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ct.width,ct.height,ut,Pt,ct.data):e.texImage2D(i.TEXTURE_2D,J,yt,ct.width,ct.height,0,ut,Pt,ct.data);x.generateMipmaps=!1}else U?(et&&e.texStorage2D(i.TEXTURE_2D,ft,yt,tt.width,tt.height),st&&Wt(x,tt,ut,Pt)):e.texImage2D(i.TEXTURE_2D,0,yt,tt.width,tt.height,0,ut,Pt,tt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){U&&et&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,yt,zt[0].width,zt[0].height,tt.depth);for(let J=0,Z=zt.length;J<Z;J++)if(ct=zt[J],x.format!==We)if(ut!==null)if(U){if(st)if(x.layerUpdates.size>0){const mt=cl(ct.width,ct.height,x.format,x.type);for(const Nt of x.layerUpdates){const ie=ct.data.subarray(Nt*mt/ct.data.BYTES_PER_ELEMENT,(Nt+1)*mt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Nt,ct.width,ct.height,1,ut,ie)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ct.width,ct.height,tt.depth,ut,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,yt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?st&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ct.width,ct.height,tt.depth,ut,Pt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,yt,ct.width,ct.height,tt.depth,0,ut,Pt,ct.data)}else{U&&et&&e.texStorage2D(i.TEXTURE_2D,ft,yt,zt[0].width,zt[0].height);for(let J=0,Z=zt.length;J<Z;J++)ct=zt[J],x.format!==We?ut!==null?U?st&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ct.width,ct.height,ut,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,J,yt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?st&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ct.width,ct.height,ut,Pt,ct.data):e.texImage2D(i.TEXTURE_2D,J,yt,ct.width,ct.height,0,ut,Pt,ct.data)}else if(x.isDataArrayTexture)if(U){if(et&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,yt,tt.width,tt.height,tt.depth),st)if(x.layerUpdates.size>0){const J=cl(tt.width,tt.height,x.format,x.type);for(const Z of x.layerUpdates){const mt=tt.data.subarray(Z*J/tt.data.BYTES_PER_ELEMENT,(Z+1)*J/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,tt.width,tt.height,1,ut,Pt,mt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ut,Pt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,yt,tt.width,tt.height,tt.depth,0,ut,Pt,tt.data);else if(x.isData3DTexture)U?(et&&e.texStorage3D(i.TEXTURE_3D,ft,yt,tt.width,tt.height,tt.depth),st&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ut,Pt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,yt,tt.width,tt.height,tt.depth,0,ut,Pt,tt.data);else if(x.isFramebufferTexture){if(et)if(U)e.texStorage2D(i.TEXTURE_2D,ft,yt,tt.width,tt.height);else{let J=tt.width,Z=tt.height;for(let mt=0;mt<ft;mt++)e.texImage2D(i.TEXTURE_2D,mt,yt,J,Z,0,ut,Pt,null),J>>=1,Z>>=1}}else if(zt.length>0){if(U&&et){const J=pe(zt[0]);e.texStorage2D(i.TEXTURE_2D,ft,yt,J.width,J.height)}for(let J=0,Z=zt.length;J<Z;J++)ct=zt[J],U?st&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut,Pt,ct):e.texImage2D(i.TEXTURE_2D,J,yt,ut,Pt,ct);x.generateMipmaps=!1}else if(U){if(et){const J=pe(tt);e.texStorage2D(i.TEXTURE_2D,ft,yt,J.width,J.height)}st&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Pt,tt)}else e.texImage2D(i.TEXTURE_2D,0,yt,ut,Pt,tt);m(x)&&p(Y),St.__version=X.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function j(C,x,z){if(x.image.length!==6)return;const Y=Vt(C,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);const X=n.get(K);if(K.version!==X.__version||Y===!0){e.activeTexture(i.TEXTURE0+z);const St=$t.getPrimaries($t.workingColorSpace),it=x.colorSpace===on?null:$t.getPrimaries(x.colorSpace),Mt=x.colorSpace===on||St===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const xt=x.isCompressedTexture||x.image[0].isCompressedTexture,tt=x.image[0]&&x.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!xt&&!tt?ut[Z]=_(x.image[Z],!0,r.maxCubemapSize):ut[Z]=tt?x.image[Z].image:x.image[Z],ut[Z]=Ee(x,ut[Z]);const Pt=ut[0],yt=s.convert(x.format,x.colorSpace),ct=s.convert(x.type),zt=E(x.internalFormat,yt,ct,x.colorSpace),U=x.isVideoTexture!==!0,et=X.__version===void 0||Y===!0,st=K.dataReady;let ft=R(x,Pt);Rt(i.TEXTURE_CUBE_MAP,x);let J;if(xt){U&&et&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,zt,Pt.width,Pt.height);for(let Z=0;Z<6;Z++){J=ut[Z].mipmaps;for(let mt=0;mt<J.length;mt++){const Nt=J[mt];x.format!==We?yt!==null?U?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,0,0,Nt.width,Nt.height,yt,Nt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,zt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,0,0,Nt.width,Nt.height,yt,ct,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,zt,Nt.width,Nt.height,0,yt,ct,Nt.data)}}}else{if(J=x.mipmaps,U&&et){J.length>0&&ft++;const Z=pe(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,zt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(tt){U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,yt,ct,ut[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,zt,ut[Z].width,ut[Z].height,0,yt,ct,ut[Z].data);for(let mt=0;mt<J.length;mt++){const ie=J[mt].image[Z].image;U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,0,0,ie.width,ie.height,yt,ct,ie.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,zt,ie.width,ie.height,0,yt,ct,ie.data)}}else{U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,yt,ct,ut[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,zt,yt,ct,ut[Z]);for(let mt=0;mt<J.length;mt++){const Nt=J[mt];U?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,0,0,yt,ct,Nt.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,zt,yt,ct,Nt.image[Z])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),X.__version=K.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function at(C,x,z,Y,K,X){const St=s.convert(z.format,z.colorSpace),it=s.convert(z.type),Mt=E(z.internalFormat,St,it,z.colorSpace),xt=n.get(x),tt=n.get(z);if(tt.__renderTarget=x,!xt.__hasExternalTextures){const ut=Math.max(1,x.width>>X),Pt=Math.max(1,x.height>>X);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,X,Mt,ut,Pt,x.depth,0,St,it,null):e.texImage2D(K,X,Mt,ut,Pt,0,St,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,K,tt.__webglTexture,0,oe(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,K,tt.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(C,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),x.depthBuffer){const Y=x.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,X=S(x.stencilBuffer,K),St=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=oe(x);vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,X,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,X,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,X,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,C)}else{const Y=x.textures;for(let K=0;K<Y.length;K++){const X=Y[K],St=s.convert(X.format,X.colorSpace),it=s.convert(X.type),Mt=E(X.internalFormat,St,it,X.colorSpace),xt=oe(x);z&&vt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,Mt,x.width,x.height):vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,Mt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function gt(C,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(x.depthTexture);Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W(x.depthTexture,0);const K=Y.__webglTexture,X=oe(x);if(x.depthTexture.format===Sr)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(x.depthTexture.format===Er)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Yt(C){const x=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){const Y=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=Y}if(C.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const Y=C.texture.mipmaps;Y&&Y.length>0?gt(x.__webglFramebuffer[0],C):gt(x.__webglFramebuffer,C)}else if(z){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),wt(x.__webglDepthbuffer[Y],C,!1);else{const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,X)}}else{const Y=C.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),wt(x.__webglDepthbuffer,C,!1);else{const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function we(C,x,z){const Y=n.get(C);x!==void 0&&at(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Yt(C)}function D(C){const x=C.texture,z=n.get(C),Y=n.get(x);C.addEventListener("dispose",w);const K=C.textures,X=C.isWebGLCubeRenderTarget===!0,St=K.length>1;if(St||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,a.memory.textures++),X){z.__webglFramebuffer=[];for(let it=0;it<6;it++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[it]=[];for(let Mt=0;Mt<x.mipmaps.length;Mt++)z.__webglFramebuffer[it][Mt]=i.createFramebuffer()}else z.__webglFramebuffer[it]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let it=0;it<x.mipmaps.length;it++)z.__webglFramebuffer[it]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(St)for(let it=0,Mt=K.length;it<Mt;it++){const xt=n.get(K[it]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&vt(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let it=0;it<K.length;it++){const Mt=K[it];z.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[it]);const xt=s.convert(Mt.format,Mt.colorSpace),tt=s.convert(Mt.type),ut=E(Mt.internalFormat,xt,tt,Mt.colorSpace,C.isXRRenderTarget===!0),Pt=oe(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,ut,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,z.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),wt(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Rt(i.TEXTURE_CUBE_MAP,x);for(let it=0;it<6;it++)if(x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)at(z.__webglFramebuffer[it][Mt],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Mt);else at(z.__webglFramebuffer[it],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let it=0,Mt=K.length;it<Mt;it++){const xt=K[it],tt=n.get(xt);let ut=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ut=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,tt.__webglTexture),Rt(ut,xt),at(z.__webglFramebuffer,C,xt,i.COLOR_ATTACHMENT0+it,ut,0),m(xt)&&p(ut)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(it=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,Y.__webglTexture),Rt(it,x),x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)at(z.__webglFramebuffer[Mt],C,x,i.COLOR_ATTACHMENT0,it,Mt);else at(z.__webglFramebuffer,C,x,i.COLOR_ATTACHMENT0,it,0);m(x)&&p(it),e.unbindTexture()}C.depthBuffer&&Yt(C)}function ae(C){const x=C.textures;for(let z=0,Y=x.length;z<Y;z++){const K=x[z];if(m(K)){const X=v(C),St=n.get(K).__webglTexture;e.bindTexture(X,St),p(X),e.unbindTexture()}}}const Ft=[],It=[];function _t(C){if(C.samples>0){if(vt(C)===!1){const x=C.textures,z=C.width,Y=C.height;let K=i.COLOR_BUFFER_BIT;const X=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(C),it=x.length>1;if(it)for(let xt=0;xt<x.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);const Mt=C.texture.mipmaps;Mt&&Mt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let xt=0;xt<x.length;xt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);const tt=n.get(x[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,z,Y,0,0,z,Y,K,i.NEAREST),c===!0&&(Ft.length=0,It.length=0,Ft.push(i.COLOR_ATTACHMENT0+xt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ft.push(X),It.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,It)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ft))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let xt=0;xt<x.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);const tt=n.get(x[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,tt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const x=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function oe(C){return Math.min(r.maxSamples,C.samples)}function vt(C){const x=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function kt(C){const x=a.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function Ee(C,x){const z=C.colorSpace,Y=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Xi&&z!==on&&($t.getTransfer(z)===ee?(Y!==We||K!==dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function pe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=L,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=G,this.rebindTextures=we,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=vt}function $_(i,t){function e(n,r=on){let s;const a=$t.getTransfer(r);if(n===dn)return i.UNSIGNED_BYTE;if(n===Po)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Io)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===hh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===oh)return i.BYTE;if(n===ch)return i.SHORT;if(n===xr)return i.UNSIGNED_SHORT;if(n===Co)return i.INT;if(n===pi)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===Ar)return i.HALF_FLOAT;if(n===uh)return i.ALPHA;if(n===dh)return i.RGB;if(n===We)return i.RGBA;if(n===Sr)return i.DEPTH_COMPONENT;if(n===Er)return i.DEPTH_STENCIL;if(n===Do)return i.RED;if(n===Lo)return i.RED_INTEGER;if(n===fh)return i.RG;if(n===Uo)return i.RG_INTEGER;if(n===No)return i.RGBA_INTEGER;if(n===os||n===cs||n===ls||n===hs)if(a===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===os)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===os)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ls)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Wa||n===qa||n===Xa||n===Ya)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Wa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ya)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ja||n===Za||n===$a)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ja||n===Za)return a===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===$a)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ka||n===Ja||n===Qa||n===to||n===eo||n===no||n===io||n===ro||n===so||n===ao||n===oo||n===co||n===lo||n===ho)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ka)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ja)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===to)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===eo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===no)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===io)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ro)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===so)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ao)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===co)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===lo)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ho)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===uo||n===fo||n===po)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===uo)return a===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===po)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===mo||n===go||n===_o||n===vo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===mo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===go)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_o)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===yr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const K_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,J_=`
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

}`;class Q_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new bh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Dn({vertexShader:K_,fragmentShader:J_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ce(new fi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t0 extends _i{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Q_,p={},v=e.getContextAttributes();let E=null,S=null;const R=[],b=[],w=new Xt;let I=null;const y=new an;y.viewport=new le;const M=new an;M.viewport=new le;const P=[y,M],L=new _f;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let j=R[V];return j===void 0&&(j=new ga,R[V]=j),j.getTargetRaySpace()},this.getControllerGrip=function(V){let j=R[V];return j===void 0&&(j=new ga,R[V]=j),j.getGripSpace()},this.getHand=function(V){let j=R[V];return j===void 0&&(j=new ga,R[V]=j),j.getHandSpace()};function W(V){const j=b.indexOf(V.inputSource);if(j===-1)return;const at=R[j];at!==void 0&&(at.update(V.inputSource,V.frame,l||a),at.dispatchEvent({type:V.type,data:V.inputSource}))}function q(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",$);for(let V=0;V<R.length;V++){const j=b[V];j!==null&&(b[V]=null,R[V].disconnect(j))}N=null,B=null,m.reset();for(const V in p)delete p[V];t.setRenderTarget(E),f=null,d=null,u=null,r=null,S=null,Wt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(r,e)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(E=t.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",q),r.addEventListener("inputsourceschange",$),v.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,wt=null,gt=null;v.depth&&(gt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=v.stencil?Er:Sr,wt=v.stencil?yr:pi);const Yt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Yt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new yn(d.textureWidth,d.textureHeight,{format:We,type:dn,depthTexture:new Th(d.textureWidth,d.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const at={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,at),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new yn(f.framebufferWidth,f.framebufferHeight,{format:We,type:dn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Wt.setContext(r),Wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(V){for(let j=0;j<V.removed.length;j++){const at=V.removed[j],wt=b.indexOf(at);wt>=0&&(b[wt]=null,R[wt].disconnect(at))}for(let j=0;j<V.added.length;j++){const at=V.added[j];let wt=b.indexOf(at);if(wt===-1){for(let Yt=0;Yt<R.length;Yt++)if(Yt>=b.length){b.push(at),wt=Yt;break}else if(b[Yt]===null){b[Yt]=at,wt=Yt;break}if(wt===-1)break}const gt=R[wt];gt&&gt.connect(at)}}const G=new A,nt=new A;function rt(V,j,at){G.setFromMatrixPosition(j.matrixWorld),nt.setFromMatrixPosition(at.matrixWorld);const wt=G.distanceTo(nt),gt=j.projectionMatrix.elements,Yt=at.projectionMatrix.elements,we=gt[14]/(gt[10]-1),D=gt[14]/(gt[10]+1),ae=(gt[9]+1)/gt[5],Ft=(gt[9]-1)/gt[5],It=(gt[8]-1)/gt[0],_t=(Yt[8]+1)/Yt[0],oe=we*It,vt=we*_t,kt=wt/(-It+_t),Ee=kt*-It;if(j.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ee),V.translateZ(kt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),gt[10]===-1)V.projectionMatrix.copy(j.projectionMatrix),V.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const pe=we+kt,C=D+kt,x=oe-Ee,z=vt+(wt-Ee),Y=ae*D/C*pe,K=Ft*D/C*pe;V.projectionMatrix.makePerspective(x,z,Y,K,pe,C),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function lt(V,j){j===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(j.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;let j=V.near,at=V.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(at=m.depthFar)),L.near=M.near=y.near=j,L.far=M.far=y.far=at,(N!==L.near||B!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),N=L.near,B=L.far),L.layers.mask=V.layers.mask|6,y.layers.mask=L.layers.mask&3,M.layers.mask=L.layers.mask&5;const wt=V.parent,gt=L.cameras;lt(L,wt);for(let Yt=0;Yt<gt.length;Yt++)lt(gt[Yt],wt);gt.length===2?rt(L,y,M):L.projectionMatrix.copy(y.projectionMatrix),Rt(V,L,wt)};function Rt(V,j,at){at===null?V.matrix.copy(j.matrixWorld):(V.matrix.copy(at.matrixWorld),V.matrix.invert(),V.matrix.multiply(j.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(j.projectionMatrix),V.projectionMatrixInverse.copy(j.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Tr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(V){c=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(V){return p[V]};let Vt=null;function Kt(V,j){if(h=j.getViewerPose(l||a),g=j,h!==null){const at=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let wt=!1;at.length!==L.cameras.length&&(L.cameras.length=0,wt=!0);for(let D=0;D<at.length;D++){const ae=at[D];let Ft=null;if(f!==null)Ft=f.getViewport(ae);else{const _t=u.getViewSubImage(d,ae);Ft=_t.viewport,D===0&&(t.setRenderTargetTextures(S,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(S))}let It=P[D];It===void 0&&(It=new an,It.layers.enable(D),It.viewport=new le,P[D]=It),It.matrix.fromArray(ae.transform.matrix),It.matrix.decompose(It.position,It.quaternion,It.scale),It.projectionMatrix.fromArray(ae.projectionMatrix),It.projectionMatrixInverse.copy(It.projectionMatrix).invert(),It.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),D===0&&(L.matrix.copy(It.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),wt===!0&&L.cameras.push(It)}const gt=r.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const D=u.getDepthInformation(at[0]);D&&D.isValid&&D.texture&&m.init(D,r.renderState)}if(gt&&gt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<at.length;D++){const ae=at[D].camera;if(ae){let Ft=p[ae];Ft||(Ft=new bh,p[ae]=Ft);const It=u.getCameraImage(ae);Ft.sourceTexture=It}}}}for(let at=0;at<R.length;at++){const wt=b[at],gt=R[at];wt!==null&&gt!==void 0&&gt.update(wt,j,l||a)}Vt&&Vt(V,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const Wt=new Ah;Wt.setAnimationLoop(Kt),this.setAnimationLoop=function(V){Vt=V},this.dispose=function(){}}}const ri=new fn,e0=new Ut;function n0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,yh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,v,E,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,E):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ze&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ze&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p),E=v.envMap,S=v.envMapRotation;E&&(m.envMap.value=E,ri.copy(S),ri.x*=-1,ri.y*=-1,ri.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),m.envMapRotation.value.setFromMatrix4(e0.makeRotationFromEuler(ri)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ze&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function i0(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,E){const S=E.program;n.uniformBlockBinding(v,S)}function l(v,E){let S=r[v.id];S===void 0&&(g(v),S=h(v),r[v.id]=S,v.addEventListener("dispose",m));const R=E.program;n.updateUBOMapping(v,R);const b=t.render.frame;s[v.id]!==b&&(d(v),s[v.id]=b)}function h(v){const E=u();v.__bindingPointIndex=E;const S=i.createBuffer(),R=v.__size,b=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const E=r[v.id],S=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let b=0,w=S.length;b<w;b++){const I=Array.isArray(S[b])?S[b]:[S[b]];for(let y=0,M=I.length;y<M;y++){const P=I[y];if(f(P,b,y,R)===!0){const L=P.__offset,N=Array.isArray(P.value)?P.value:[P.value];let B=0;for(let W=0;W<N.length;W++){const q=N[W],$=_(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,L+B,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,B),B+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,E,S,R){const b=v.value,w=E+"_"+S;if(R[w]===void 0)return typeof b=="number"||typeof b=="boolean"?R[w]=b:R[w]=b.clone(),!0;{const I=R[w];if(typeof b=="number"||typeof b=="boolean"){if(I!==b)return R[w]=b,!0}else if(I.equals(b)===!1)return I.copy(b),!0}return!1}function g(v){const E=v.uniforms;let S=0;const R=16;for(let w=0,I=E.length;w<I;w++){const y=Array.isArray(E[w])?E[w]:[E[w]];for(let M=0,P=y.length;M<P;M++){const L=y[M],N=Array.isArray(L.value)?L.value:[L.value];for(let B=0,W=N.length;B<W;B++){const q=N[B],$=_(q),G=S%R,nt=G%$.boundary,rt=G+nt;S+=nt,rt!==0&&R-rt<$.storage&&(S+=R-rt),L.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=S,S+=$.storage}}}const b=S%R;return b>0&&(S+=R-b),v.__size=S,v.__cache={},this}function _(v){const E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),E}function m(v){const E=v.target;E.removeEventListener("dispose",m);const S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function p(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:l,dispose:p}}class r0{constructor(t={}){const{canvas:e=Id(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const v=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let R=!1;this._outputColorSpace=Ne;let b=0,w=0,I=null,y=-1,M=null;const P=new le,L=new le;let N=null;const B=new Lt(0);let W=0,q=e.width,$=e.height,G=1,nt=null,rt=null;const lt=new le(0,0,q,$),Rt=new le(0,0,q,$);let Vt=!1;const Kt=new ko;let Wt=!1,V=!1;const j=new Ut,at=new A,wt=new le,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function we(){return I===null?G:1}let D=n;function ae(T,F){return e.getContext(T,F)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ro}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",J,!1),D===null){const F="webgl2";if(D=ae(F,T),D===null)throw ae(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ft,It,_t,oe,vt,kt,Ee,pe,C,x,z,Y,K,X,St,it,Mt,xt,tt,ut,Pt,yt,ct,zt;function U(){Ft=new pg(D),Ft.init(),yt=new $_(D,Ft),It=new og(D,Ft,t,yt),_t=new j_(D,Ft),It.reversedDepthBuffer&&d&&_t.buffers.depth.setReversed(!0),oe=new _g(D),vt=new N_,kt=new Z_(D,Ft,_t,vt,It,yt,oe),Ee=new lg(S),pe=new fg(S),C=new Ef(D),ct=new sg(D,C),x=new mg(D,C,oe,ct),z=new Mg(D,x,C,oe),tt=new vg(D,It,kt),it=new cg(vt),Y=new U_(S,Ee,pe,Ft,It,ct,it),K=new n0(S,vt),X=new O_,St=new V_(Ft),xt=new rg(S,Ee,pe,_t,z,f,c),Mt=new X_(S,z,It),zt=new i0(D,oe,It,_t),ut=new ag(D,Ft,oe),Pt=new gg(D,Ft,oe),oe.programs=Y.programs,S.capabilities=It,S.extensions=Ft,S.properties=vt,S.renderLists=X,S.shadowMap=Mt,S.state=_t,S.info=oe}U();const et=new t0(S,D);this.xr=et,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const T=Ft.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ft.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(q,$,!1))},this.getSize=function(T){return T.set(q,$)},this.setSize=function(T,F,k=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=T,$=F,e.width=Math.floor(T*G),e.height=Math.floor(F*G),k===!0&&(e.style.width=T+"px",e.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(q*G,$*G).floor()},this.setDrawingBufferSize=function(T,F,k){q=T,$=F,G=k,e.width=Math.floor(T*k),e.height=Math.floor(F*k),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(lt)},this.setViewport=function(T,F,k,H){T.isVector4?lt.set(T.x,T.y,T.z,T.w):lt.set(T,F,k,H),_t.viewport(P.copy(lt).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(Rt)},this.setScissor=function(T,F,k,H){T.isVector4?Rt.set(T.x,T.y,T.z,T.w):Rt.set(T,F,k,H),_t.scissor(L.copy(Rt).multiplyScalar(G).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(T){_t.setScissorTest(Vt=T)},this.setOpaqueSort=function(T){nt=T},this.setTransparentSort=function(T){rt=T},this.getClearColor=function(T){return T.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,k=!0){let H=0;if(T){let O=!1;if(I!==null){const Q=I.texture.format;O=Q===No||Q===Uo||Q===Lo}if(O){const Q=I.texture.type,ht=Q===dn||Q===pi||Q===xr||Q===yr||Q===Po||Q===Io,pt=xt.getClearColor(),dt=xt.getClearAlpha(),Ct=pt.r,Dt=pt.g,bt=pt.b;ht?(g[0]=Ct,g[1]=Dt,g[2]=bt,g[3]=dt,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Ct,_[1]=Dt,_[2]=bt,_[3]=dt,D.clearBufferiv(D.COLOR,0,_))}else H|=D.COLOR_BUFFER_BIT}F&&(H|=D.DEPTH_BUFFER_BIT),k&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",J,!1),xt.dispose(),X.dispose(),St.dispose(),vt.dispose(),Ee.dispose(),pe.dispose(),z.dispose(),ct.dispose(),zt.dispose(),Y.dispose(),et.dispose(),et.removeEventListener("sessionstart",pn),et.removeEventListener("sessionend",Wo),Kn.stop()};function st(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const T=oe.autoReset,F=Mt.enabled,k=Mt.autoUpdate,H=Mt.needsUpdate,O=Mt.type;U(),oe.autoReset=T,Mt.enabled=F,Mt.autoUpdate=k,Mt.needsUpdate=H,Mt.type=O}function J(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Z(T){const F=T.target;F.removeEventListener("dispose",Z),mt(F)}function mt(T){Nt(T),vt.remove(T)}function Nt(T){const F=vt.get(T).programs;F!==void 0&&(F.forEach(function(k){Y.releaseProgram(k)}),T.isShaderMaterial&&Y.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,k,H,O,Q){F===null&&(F=gt);const ht=O.isMesh&&O.matrixWorld.determinant()<0,pt=jh(T,F,k,H,O);_t.setMaterial(H,ht);let dt=k.index,Ct=1;if(H.wireframe===!0){if(dt=x.getWireframeAttribute(k),dt===void 0)return;Ct=2}const Dt=k.drawRange,bt=k.attributes.position;let qt=Dt.start*Ct,te=(Dt.start+Dt.count)*Ct;Q!==null&&(qt=Math.max(qt,Q.start*Ct),te=Math.min(te,(Q.start+Q.count)*Ct)),dt!==null?(qt=Math.max(qt,0),te=Math.min(te,dt.count)):bt!=null&&(qt=Math.max(qt,0),te=Math.min(te,bt.count));const fe=te-qt;if(fe<0||fe===1/0)return;ct.setup(O,H,pt,k,dt);let se,ne=ut;if(dt!==null&&(se=C.get(dt),ne=Pt,ne.setIndex(se)),O.isMesh)H.wireframe===!0?(_t.setLineWidth(H.wireframeLinewidth*we()),ne.setMode(D.LINES)):ne.setMode(D.TRIANGLES);else if(O.isLine){let At=H.linewidth;At===void 0&&(At=1),_t.setLineWidth(At*we()),O.isLineSegments?ne.setMode(D.LINES):O.isLineLoop?ne.setMode(D.LINE_LOOP):ne.setMode(D.LINE_STRIP)}else O.isPoints?ne.setMode(D.POINTS):O.isSprite&&ne.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)br("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ne.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))ne.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const At=O._multiDrawStarts,he=O._multiDrawCounts,Zt=O._multiDrawCount,Be=dt?C.get(dt).bytesPerElement:1,xi=vt.get(H).currentProgram.getUniforms();for(let ke=0;ke<Zt;ke++)xi.setValue(D,"_gl_DrawID",ke),ne.render(At[ke]/Be,he[ke])}else if(O.isInstancedMesh)ne.renderInstances(qt,fe,O.count);else if(k.isInstancedBufferGeometry){const At=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,he=Math.min(k.instanceCount,At);ne.renderInstances(qt,fe,he)}else ne.render(qt,fe)};function ie(T,F,k){T.transparent===!0&&T.side===_n&&T.forceSinglePass===!1?(T.side=ze,T.needsUpdate=!0,Pr(T,F,k),T.side=Yn,T.needsUpdate=!0,Pr(T,F,k),T.side=_n):Pr(T,F,k)}this.compile=function(T,F,k=null){k===null&&(k=T),p=St.get(k),p.init(F),E.push(p),k.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),T!==k&&T.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const H=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const Q=O.material;if(Q)if(Array.isArray(Q))for(let ht=0;ht<Q.length;ht++){const pt=Q[ht];ie(pt,k,O),H.add(pt)}else ie(Q,k,O),H.add(Q)}),p=E.pop(),H},this.compileAsync=function(T,F,k=null){const H=this.compile(T,F,k);return new Promise(O=>{function Q(){if(H.forEach(function(ht){vt.get(ht).currentProgram.isReady()&&H.delete(ht)}),H.size===0){O(T);return}setTimeout(Q,10)}Ft.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Jt=null;function Sn(T){Jt&&Jt(T)}function pn(){Kn.stop()}function Wo(){Kn.start()}const Kn=new Ah;Kn.setAnimationLoop(Sn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(T){Jt=T,et.setAnimationLoop(T),T===null?Kn.stop():Kn.start()},et.addEventListener("sessionstart",pn),et.addEventListener("sessionend",Wo),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(F),F=et.getCamera()),T.isScene===!0&&T.onBeforeRender(S,T,F,I),p=St.get(T,E.length),p.init(F),E.push(p),j.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Kt.setFromProjectionMatrix(j,xn,F.reversedDepth),V=this.localClippingEnabled,Wt=it.init(this.clippingPlanes,V),m=X.get(T,v.length),m.init(),v.push(m),et.enabled===!0&&et.isPresenting===!0){const Q=S.xr.getDepthSensingMesh();Q!==null&&Ts(Q,F,-1/0,S.sortObjects)}Ts(T,F,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(nt,rt),Yt=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Yt&&xt.addToRenderList(m,T),this.info.render.frame++,Wt===!0&&it.beginShadows();const k=p.state.shadowsArray;Mt.render(k,T,F),Wt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,O=m.transmissive;if(p.setupLights(),F.isArrayCamera){const Q=F.cameras;if(O.length>0)for(let ht=0,pt=Q.length;ht<pt;ht++){const dt=Q[ht];Xo(H,O,T,dt)}Yt&&xt.render(T);for(let ht=0,pt=Q.length;ht<pt;ht++){const dt=Q[ht];qo(m,T,dt,dt.viewport)}}else O.length>0&&Xo(H,O,T,F),Yt&&xt.render(T),qo(m,T,F);I!==null&&w===0&&(kt.updateMultisampleRenderTarget(I),kt.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(S,T,F),ct.resetDefaultState(),y=-1,M=null,E.pop(),E.length>0?(p=E[E.length-1],Wt===!0&&it.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Ts(T,F,k,H){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)k=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Kt.intersectsSprite(T)){H&&wt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(j);const ht=z.update(T),pt=T.material;pt.visible&&m.push(T,ht,pt,k,wt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Kt.intersectsObject(T))){const ht=z.update(T),pt=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),wt.copy(T.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),wt.copy(ht.boundingSphere.center)),wt.applyMatrix4(T.matrixWorld).applyMatrix4(j)),Array.isArray(pt)){const dt=ht.groups;for(let Ct=0,Dt=dt.length;Ct<Dt;Ct++){const bt=dt[Ct],qt=pt[bt.materialIndex];qt&&qt.visible&&m.push(T,ht,qt,k,wt.z,bt)}}else pt.visible&&m.push(T,ht,pt,k,wt.z,null)}}const Q=T.children;for(let ht=0,pt=Q.length;ht<pt;ht++)Ts(Q[ht],F,k,H)}function qo(T,F,k,H){const O=T.opaque,Q=T.transmissive,ht=T.transparent;p.setupLightsView(k),Wt===!0&&it.setGlobalState(S.clippingPlanes,k),H&&_t.viewport(P.copy(H)),O.length>0&&Cr(O,F,k),Q.length>0&&Cr(Q,F,k),ht.length>0&&Cr(ht,F,k),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function Xo(T,F,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new yn(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?Ar:dn,minFilter:di,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const Q=p.state.transmissionRenderTarget[H.id],ht=H.viewport||P;Q.setSize(ht.z*S.transmissionResolutionScale,ht.w*S.transmissionResolutionScale);const pt=S.getRenderTarget(),dt=S.getActiveCubeFace(),Ct=S.getActiveMipmapLevel();S.setRenderTarget(Q),S.getClearColor(B),W=S.getClearAlpha(),W<1&&S.setClearColor(16777215,.5),S.clear(),Yt&&xt.render(k);const Dt=S.toneMapping;S.toneMapping=Xn;const bt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),Wt===!0&&it.setGlobalState(S.clippingPlanes,H),Cr(T,k,H),kt.updateMultisampleRenderTarget(Q),kt.updateRenderTargetMipmap(Q),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let te=0,fe=F.length;te<fe;te++){const se=F[te],ne=se.object,At=se.geometry,he=se.material,Zt=se.group;if(he.side===_n&&ne.layers.test(H.layers)){const Be=he.side;he.side=ze,he.needsUpdate=!0,Yo(ne,k,H,At,he,Zt),he.side=Be,he.needsUpdate=!0,qt=!0}}qt===!0&&(kt.updateMultisampleRenderTarget(Q),kt.updateRenderTargetMipmap(Q))}S.setRenderTarget(pt,dt,Ct),S.setClearColor(B,W),bt!==void 0&&(H.viewport=bt),S.toneMapping=Dt}function Cr(T,F,k){const H=F.isScene===!0?F.overrideMaterial:null;for(let O=0,Q=T.length;O<Q;O++){const ht=T[O],pt=ht.object,dt=ht.geometry,Ct=ht.group;let Dt=ht.material;Dt.allowOverride===!0&&H!==null&&(Dt=H),pt.layers.test(k.layers)&&Yo(pt,F,k,dt,Dt,Ct)}}function Yo(T,F,k,H,O,Q){T.onBeforeRender(S,F,k,H,O,Q),T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(S,F,k,H,T,Q),O.transparent===!0&&O.side===_n&&O.forceSinglePass===!1?(O.side=ze,O.needsUpdate=!0,S.renderBufferDirect(k,F,H,O,T,Q),O.side=Yn,O.needsUpdate=!0,S.renderBufferDirect(k,F,H,O,T,Q),O.side=_n):S.renderBufferDirect(k,F,H,O,T,Q),T.onAfterRender(S,F,k,H,O,Q)}function Pr(T,F,k){F.isScene!==!0&&(F=gt);const H=vt.get(T),O=p.state.lights,Q=p.state.shadowsArray,ht=O.state.version,pt=Y.getParameters(T,O.state,Q,F,k),dt=Y.getProgramCacheKey(pt);let Ct=H.programs;H.environment=T.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(T.isMeshStandardMaterial?pe:Ee).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ct===void 0&&(T.addEventListener("dispose",Z),Ct=new Map,H.programs=Ct);let Dt=Ct.get(dt);if(Dt!==void 0){if(H.currentProgram===Dt&&H.lightsStateVersion===ht)return Zo(T,pt),Dt}else pt.uniforms=Y.getUniforms(T),T.onBeforeCompile(pt,S),Dt=Y.acquireProgram(pt,dt),Ct.set(dt,Dt),H.uniforms=pt.uniforms;const bt=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(bt.clippingPlanes=it.uniform),Zo(T,pt),H.needsLights=$h(T),H.lightsStateVersion=ht,H.needsLights&&(bt.ambientLightColor.value=O.state.ambient,bt.lightProbe.value=O.state.probe,bt.directionalLights.value=O.state.directional,bt.directionalLightShadows.value=O.state.directionalShadow,bt.spotLights.value=O.state.spot,bt.spotLightShadows.value=O.state.spotShadow,bt.rectAreaLights.value=O.state.rectArea,bt.ltc_1.value=O.state.rectAreaLTC1,bt.ltc_2.value=O.state.rectAreaLTC2,bt.pointLights.value=O.state.point,bt.pointLightShadows.value=O.state.pointShadow,bt.hemisphereLights.value=O.state.hemi,bt.directionalShadowMap.value=O.state.directionalShadowMap,bt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,bt.spotShadowMap.value=O.state.spotShadowMap,bt.spotLightMatrix.value=O.state.spotLightMatrix,bt.spotLightMap.value=O.state.spotLightMap,bt.pointShadowMap.value=O.state.pointShadowMap,bt.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Dt,H.uniformsList=null,Dt}function jo(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=fs.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Zo(T,F){const k=vt.get(T);k.outputColorSpace=F.outputColorSpace,k.batching=F.batching,k.batchingColor=F.batchingColor,k.instancing=F.instancing,k.instancingColor=F.instancingColor,k.instancingMorph=F.instancingMorph,k.skinning=F.skinning,k.morphTargets=F.morphTargets,k.morphNormals=F.morphNormals,k.morphColors=F.morphColors,k.morphTargetsCount=F.morphTargetsCount,k.numClippingPlanes=F.numClippingPlanes,k.numIntersection=F.numClipIntersection,k.vertexAlphas=F.vertexAlphas,k.vertexTangents=F.vertexTangents,k.toneMapping=F.toneMapping}function jh(T,F,k,H,O){F.isScene!==!0&&(F=gt),kt.resetTextureUnits();const Q=F.fog,ht=H.isMeshStandardMaterial?F.environment:null,pt=I===null?S.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Xi,dt=(H.isMeshStandardMaterial?pe:Ee).get(H.envMap||ht),Ct=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Dt=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),bt=!!k.morphAttributes.position,qt=!!k.morphAttributes.normal,te=!!k.morphAttributes.color;let fe=Xn;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(fe=S.toneMapping);const se=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ne=se!==void 0?se.length:0,At=vt.get(H),he=p.state.lights;if(Wt===!0&&(V===!0||T!==M)){const Ie=T===M&&H.id===y;it.setState(H,T,Ie)}let Zt=!1;H.version===At.__version?(At.needsLights&&At.lightsStateVersion!==he.state.version||At.outputColorSpace!==pt||O.isBatchedMesh&&At.batching===!1||!O.isBatchedMesh&&At.batching===!0||O.isBatchedMesh&&At.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&At.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&At.instancing===!1||!O.isInstancedMesh&&At.instancing===!0||O.isSkinnedMesh&&At.skinning===!1||!O.isSkinnedMesh&&At.skinning===!0||O.isInstancedMesh&&At.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&At.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&At.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&At.instancingMorph===!1&&O.morphTexture!==null||At.envMap!==dt||H.fog===!0&&At.fog!==Q||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==it.numPlanes||At.numIntersection!==it.numIntersection)||At.vertexAlphas!==Ct||At.vertexTangents!==Dt||At.morphTargets!==bt||At.morphNormals!==qt||At.morphColors!==te||At.toneMapping!==fe||At.morphTargetsCount!==ne)&&(Zt=!0):(Zt=!0,At.__version=H.version);let Be=At.currentProgram;Zt===!0&&(Be=Pr(H,F,O));let xi=!1,ke=!1,Qi=!1;const ue=Be.getUniforms(),Xe=At.uniforms;if(_t.useProgram(Be.program)&&(xi=!0,ke=!0,Qi=!0),H.id!==y&&(y=H.id,ke=!0),xi||M!==T){_t.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ue.setValue(D,"projectionMatrix",T.projectionMatrix),ue.setValue(D,"viewMatrix",T.matrixWorldInverse);const Ue=ue.map.cameraPosition;Ue!==void 0&&Ue.setValue(D,at.setFromMatrixPosition(T.matrixWorld)),It.logarithmicDepthBuffer&&ue.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ue.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,ke=!0,Qi=!0)}if(O.isSkinnedMesh){ue.setOptional(D,O,"bindMatrix"),ue.setOptional(D,O,"bindMatrixInverse");const Ie=O.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),ue.setValue(D,"boneTexture",Ie.boneTexture,kt))}O.isBatchedMesh&&(ue.setOptional(D,O,"batchingTexture"),ue.setValue(D,"batchingTexture",O._matricesTexture,kt),ue.setOptional(D,O,"batchingIdTexture"),ue.setValue(D,"batchingIdTexture",O._indirectTexture,kt),ue.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&ue.setValue(D,"batchingColorTexture",O._colorsTexture,kt));const Ye=k.morphAttributes;if((Ye.position!==void 0||Ye.normal!==void 0||Ye.color!==void 0)&&tt.update(O,k,Be),(ke||At.receiveShadow!==O.receiveShadow)&&(At.receiveShadow=O.receiveShadow,ue.setValue(D,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Xe.envMap.value=dt,Xe.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&F.environment!==null&&(Xe.envMapIntensity.value=F.environmentIntensity),ke&&(ue.setValue(D,"toneMappingExposure",S.toneMappingExposure),At.needsLights&&Zh(Xe,Qi),Q&&H.fog===!0&&K.refreshFogUniforms(Xe,Q),K.refreshMaterialUniforms(Xe,H,G,$,p.state.transmissionRenderTarget[T.id]),fs.upload(D,jo(At),Xe,kt)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(fs.upload(D,jo(At),Xe,kt),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ue.setValue(D,"center",O.center),ue.setValue(D,"modelViewMatrix",O.modelViewMatrix),ue.setValue(D,"normalMatrix",O.normalMatrix),ue.setValue(D,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Ie=H.uniformsGroups;for(let Ue=0,bs=Ie.length;Ue<bs;Ue++){const Jn=Ie[Ue];zt.update(Jn,Be),zt.bind(Jn,Be)}}return Be}function Zh(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function $h(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,F,k){const H=vt.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),vt.get(T.texture).__webglTexture=F,vt.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:k,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const k=vt.get(T);k.__webglFramebuffer=F,k.__useDefaultFramebuffer=F===void 0};const Kh=D.createFramebuffer();this.setRenderTarget=function(T,F=0,k=0){I=T,b=F,w=k;let H=!0,O=null,Q=!1,ht=!1;if(T){const dt=vt.get(T);if(dt.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(D.FRAMEBUFFER,null),H=!1;else if(dt.__webglFramebuffer===void 0)kt.setupRenderTarget(T);else if(dt.__hasExternalTextures)kt.rebindTextures(T,vt.get(T.texture).__webglTexture,vt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const bt=T.depthTexture;if(dt.__boundDepthTexture!==bt){if(bt!==null&&vt.has(bt)&&(T.width!==bt.image.width||T.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(T)}}const Ct=T.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Dt=vt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Dt[F])?O=Dt[F][k]:O=Dt[F],Q=!0):T.samples>0&&kt.useMultisampledRTT(T)===!1?O=vt.get(T).__webglMultisampledFramebuffer:Array.isArray(Dt)?O=Dt[k]:O=Dt,P.copy(T.viewport),L.copy(T.scissor),N=T.scissorTest}else P.copy(lt).multiplyScalar(G).floor(),L.copy(Rt).multiplyScalar(G).floor(),N=Vt;if(k!==0&&(O=Kh),_t.bindFramebuffer(D.FRAMEBUFFER,O)&&H&&_t.drawBuffers(T,O),_t.viewport(P),_t.scissor(L),_t.setScissorTest(N),Q){const dt=vt.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,dt.__webglTexture,k)}else if(ht){const dt=F;for(let Ct=0;Ct<T.textures.length;Ct++){const Dt=vt.get(T.textures[Ct]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ct,Dt.__webglTexture,k,dt)}}else if(T!==null&&k!==0){const dt=vt.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,dt.__webglTexture,k)}y=-1},this.readRenderTargetPixels=function(T,F,k,H,O,Q,ht,pt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt){_t.bindFramebuffer(D.FRAMEBUFFER,dt);try{const Ct=T.textures[pt],Dt=Ct.format,bt=Ct.type;if(!It.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!It.textureTypeReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-H&&k>=0&&k<=T.height-O&&(T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pt),D.readPixels(F,k,H,O,yt.convert(Dt),yt.convert(bt),Q))}finally{const Ct=I!==null?vt.get(I).__webglFramebuffer:null;_t.bindFramebuffer(D.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(T,F,k,H,O,Q,ht,pt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt)if(F>=0&&F<=T.width-H&&k>=0&&k<=T.height-O){_t.bindFramebuffer(D.FRAMEBUFFER,dt);const Ct=T.textures[pt],Dt=Ct.format,bt=Ct.type;if(!It.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!It.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,qt),D.bufferData(D.PIXEL_PACK_BUFFER,Q.byteLength,D.STREAM_READ),T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pt),D.readPixels(F,k,H,O,yt.convert(Dt),yt.convert(bt),0);const te=I!==null?vt.get(I).__webglFramebuffer:null;_t.bindFramebuffer(D.FRAMEBUFFER,te);const fe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Dd(D,fe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,qt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Q),D.deleteBuffer(qt),D.deleteSync(fe),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,k=0){const H=Math.pow(2,-k),O=Math.floor(T.image.width*H),Q=Math.floor(T.image.height*H),ht=F!==null?F.x:0,pt=F!==null?F.y:0;kt.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,ht,pt,O,Q),_t.unbindTexture()};const Jh=D.createFramebuffer(),Qh=D.createFramebuffer();this.copyTextureToTexture=function(T,F,k=null,H=null,O=0,Q=null){Q===null&&(O!==0?(br("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=O,O=0):Q=0);let ht,pt,dt,Ct,Dt,bt,qt,te,fe;const se=T.isCompressedTexture?T.mipmaps[Q]:T.image;if(k!==null)ht=k.max.x-k.min.x,pt=k.max.y-k.min.y,dt=k.isBox3?k.max.z-k.min.z:1,Ct=k.min.x,Dt=k.min.y,bt=k.isBox3?k.min.z:0;else{const Ye=Math.pow(2,-O);ht=Math.floor(se.width*Ye),pt=Math.floor(se.height*Ye),T.isDataArrayTexture?dt=se.depth:T.isData3DTexture?dt=Math.floor(se.depth*Ye):dt=1,Ct=0,Dt=0,bt=0}H!==null?(qt=H.x,te=H.y,fe=H.z):(qt=0,te=0,fe=0);const ne=yt.convert(F.format),At=yt.convert(F.type);let he;F.isData3DTexture?(kt.setTexture3D(F,0),he=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(kt.setTexture2DArray(F,0),he=D.TEXTURE_2D_ARRAY):(kt.setTexture2D(F,0),he=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const Zt=D.getParameter(D.UNPACK_ROW_LENGTH),Be=D.getParameter(D.UNPACK_IMAGE_HEIGHT),xi=D.getParameter(D.UNPACK_SKIP_PIXELS),ke=D.getParameter(D.UNPACK_SKIP_ROWS),Qi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,se.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,se.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ct),D.pixelStorei(D.UNPACK_SKIP_ROWS,Dt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,bt);const ue=T.isDataArrayTexture||T.isData3DTexture,Xe=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const Ye=vt.get(T),Ie=vt.get(F),Ue=vt.get(Ye.__renderTarget),bs=vt.get(Ie.__renderTarget);_t.bindFramebuffer(D.READ_FRAMEBUFFER,Ue.__webglFramebuffer),_t.bindFramebuffer(D.DRAW_FRAMEBUFFER,bs.__webglFramebuffer);for(let Jn=0;Jn<dt;Jn++)ue&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,vt.get(T).__webglTexture,O,bt+Jn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,vt.get(F).__webglTexture,Q,fe+Jn)),D.blitFramebuffer(Ct,Dt,ht,pt,qt,te,ht,pt,D.DEPTH_BUFFER_BIT,D.NEAREST);_t.bindFramebuffer(D.READ_FRAMEBUFFER,null),_t.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(O!==0||T.isRenderTargetTexture||vt.has(T)){const Ye=vt.get(T),Ie=vt.get(F);_t.bindFramebuffer(D.READ_FRAMEBUFFER,Jh),_t.bindFramebuffer(D.DRAW_FRAMEBUFFER,Qh);for(let Ue=0;Ue<dt;Ue++)ue?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ye.__webglTexture,O,bt+Ue):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ye.__webglTexture,O),Xe?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ie.__webglTexture,Q,fe+Ue):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ie.__webglTexture,Q),O!==0?D.blitFramebuffer(Ct,Dt,ht,pt,qt,te,ht,pt,D.COLOR_BUFFER_BIT,D.NEAREST):Xe?D.copyTexSubImage3D(he,Q,qt,te,fe+Ue,Ct,Dt,ht,pt):D.copyTexSubImage2D(he,Q,qt,te,Ct,Dt,ht,pt);_t.bindFramebuffer(D.READ_FRAMEBUFFER,null),_t.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Xe?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(he,Q,qt,te,fe,ht,pt,dt,ne,At,se.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(he,Q,qt,te,fe,ht,pt,dt,ne,se.data):D.texSubImage3D(he,Q,qt,te,fe,ht,pt,dt,ne,At,se):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Q,qt,te,ht,pt,ne,At,se.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Q,qt,te,se.width,se.height,ne,se.data):D.texSubImage2D(D.TEXTURE_2D,Q,qt,te,ht,pt,ne,At,se);D.pixelStorei(D.UNPACK_ROW_LENGTH,Zt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Be),D.pixelStorei(D.UNPACK_SKIP_PIXELS,xi),D.pixelStorei(D.UNPACK_SKIP_ROWS,ke),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Qi),Q===0&&F.generateMipmaps&&D.generateMipmap(he),_t.unbindTexture()},this.initRenderTarget=function(T){vt.get(T).__webglFramebuffer===void 0&&kt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?kt.setTextureCube(T,0):T.isData3DTexture?kt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?kt.setTexture2DArray(T,0):kt.setTexture2D(T,0),_t.unbindTexture()},this.resetState=function(){b=0,w=0,I=null,_t.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}const Et={IDLE:Symbol(),ROTATE:Symbol(),PAN:Symbol(),SCALE:Symbol(),FOV:Symbol(),FOCUS:Symbol(),ZROTATE:Symbol(),ANIMATION_FOCUS:Symbol(),ANIMATION_ROTATE:Symbol()},Qt={NONE:Symbol(),ONE_FINGER:Symbol(),ONE_FINGER_SWITCHED:Symbol(),TWO_FINGER:Symbol(),MULT_FINGER:Symbol(),CURSOR:Symbol()},Ot={x:0,y:0},Ve={camera:new Ut,gizmos:new Ut},re={type:"change"},nn={type:"start"},$e={type:"end"},s0=new Mf,ge=new A,Ll=new Ut,Ul=new Ut,en=new A,is=1e-6;class a0 extends yf{constructor(t,e=null,n=null){super(t,e),this.scene=n,this.target=new A,this._currentTarget=new A,this.radiusFactor=.67,this.mouseActions=[],this._mouseOp=null,this._v2_1=new Xt,this._v3_1=new A,this._v3_2=new A,this._m4_1=new Ut,this._m4_2=new Ut,this._quat=new Zn,this._translationMatrix=new Ut,this._rotationMatrix=new Ut,this._scaleMatrix=new Ut,this._rotationAxis=new A,this._cameraMatrixState=new Ut,this._cameraProjectionState=new Ut,this._fovState=1,this._upState=new A,this._zoomState=1,this._nearPos=0,this._farPos=0,this._gizmoMatrixState=new Ut,this._up0=new A,this._zoom0=1,this._fov0=0,this._initialNear=0,this._nearPos0=0,this._initialFar=0,this._farPos0=0,this._cameraMatrixState0=new Ut,this._gizmoMatrixState0=new Ut,this._target0=new A,this._button=-1,this._touchStart=[],this._touchCurrent=[],this._input=Qt.NONE,this._switchSensibility=32,this._startFingerDistance=0,this._currentFingerDistance=0,this._startFingerRotation=0,this._currentFingerRotation=0,this._devPxRatio=0,this._downValid=!0,this._nclicks=0,this._downEvents=[],this._downStart=0,this._clickStart=0,this._maxDownTime=250,this._maxInterval=300,this._posThreshold=24,this._movementThreshold=24,this._currentCursorPosition=new A,this._startCursorPosition=new A,this._grid=null,this._gridPosition=new A,this._gizmos=new Vn,this._curvePts=128,this._timeStart=-1,this._animationId=-1,this.focusAnimationTime=500,this._timePrev=0,this._timeCurrent=0,this._anglePrev=0,this._angleCurrent=0,this._cursorPosPrev=new A,this._cursorPosCurr=new A,this._wPrev=0,this._wCurr=0,this.adjustNearFar=!1,this.scaleFactor=1.1,this.dampingFactor=25,this.wMax=20,this.enableAnimations=!0,this.enableGrid=!1,this.cursorZoom=!1,this.minFov=5,this.maxFov=90,this.rotateSpeed=1,this.enablePan=!0,this.enableRotate=!0,this.enableZoom=!0,this.enableGizmos=!0,this.enableFocus=!0,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this._tbRadius=1,this._state=Et.IDLE,this.setCamera(t),this.scene!=null&&this.scene.add(this._gizmos),this.initializeMouseActions(),this._onContextMenu=c0.bind(this),this._onWheel=f0.bind(this),this._onPointerUp=d0.bind(this),this._onPointerMove=u0.bind(this),this._onPointerDown=h0.bind(this),this._onPointerCancel=l0.bind(this),this._onWindowResize=o0.bind(this),e!==null&&this.connect(e)}connect(t){super.connect(t),this.domElement.style.touchAction="none",this._devPxRatio=window.devicePixelRatio,this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onWheel,{passive:!1}),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerCancel),window.addEventListener("resize",this._onWindowResize)}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointercancel",this._onPointerCancel),this.domElement.removeEventListener("wheel",this._onWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),window.removeEventListener("resize",this._onWindowResize)}onSinglePanStart(t,e){if(this.enabled)switch(this.dispatchEvent(nn),this.setCenter(t.clientX,t.clientY),e){case"PAN":if(!this.enablePan)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1,this.activateGizmos(!1),this.dispatchEvent(re)),this.updateTbState(Et.PAN,!0),this._startCursorPosition.copy(this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement)),this.enableGrid&&(this.drawGrid(),this.dispatchEvent(re));break;case"ROTATE":if(!this.enableRotate)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1),this.updateTbState(Et.ROTATE,!0),this._startCursorPosition.copy(this.unprojectOnTbSurface(this.object,Ot.x,Ot.y,this.domElement,this._tbRadius)),this.activateGizmos(!0),this.enableAnimations&&(this._timePrev=this._timeCurrent=performance.now(),this._angleCurrent=this._anglePrev=0,this._cursorPosPrev.copy(this._startCursorPosition),this._cursorPosCurr.copy(this._cursorPosPrev),this._wCurr=0,this._wPrev=this._wCurr),this.dispatchEvent(re);break;case"FOV":if(!this.object.isPerspectiveCamera||!this.enableZoom)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1,this.activateGizmos(!1),this.dispatchEvent(re)),this.updateTbState(Et.FOV,!0),this._startCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition);break;case"ZOOM":if(!this.enableZoom)return;this._animationId!=-1&&(cancelAnimationFrame(this._animationId),this._animationId=-1,this._timeStart=-1,this.activateGizmos(!1),this.dispatchEvent(re)),this.updateTbState(Et.SCALE,!0),this._startCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition);break}}onSinglePanMove(t,e){if(this.enabled){const n=e!=this._state;switch(this.setCenter(t.clientX,t.clientY),e){case Et.PAN:this.enablePan&&(n?(this.dispatchEvent($e),this.dispatchEvent(nn),this.updateTbState(e,!0),this._startCursorPosition.copy(this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement)),this.enableGrid&&this.drawGrid(),this.activateGizmos(!1)):(this._currentCursorPosition.copy(this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement)),this.applyTransformMatrix(this.pan(this._startCursorPosition,this._currentCursorPosition))));break;case Et.ROTATE:if(this.enableRotate)if(n)this.dispatchEvent($e),this.dispatchEvent(nn),this.updateTbState(e,!0),this._startCursorPosition.copy(this.unprojectOnTbSurface(this.object,Ot.x,Ot.y,this.domElement,this._tbRadius)),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!0);else{this._currentCursorPosition.copy(this.unprojectOnTbSurface(this.object,Ot.x,Ot.y,this.domElement,this._tbRadius));const r=this._startCursorPosition.distanceTo(this._currentCursorPosition),s=this._startCursorPosition.angleTo(this._currentCursorPosition),a=Math.max(r/this._tbRadius,s)*this.rotateSpeed;this.applyTransformMatrix(this.rotate(this.calculateRotationAxis(this._startCursorPosition,this._currentCursorPosition),a)),this.enableAnimations&&(this._timePrev=this._timeCurrent,this._timeCurrent=performance.now(),this._anglePrev=this._angleCurrent,this._angleCurrent=a,this._cursorPosPrev.copy(this._cursorPosCurr),this._cursorPosCurr.copy(this._currentCursorPosition),this._wPrev=this._wCurr,this._wCurr=this.calculateAngularSpeed(this._anglePrev,this._angleCurrent,this._timePrev,this._timeCurrent))}break;case Et.SCALE:if(this.enableZoom)if(n)this.dispatchEvent($e),this.dispatchEvent(nn),this.updateTbState(e,!0),this._startCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!1);else{this._currentCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5);const s=this._currentCursorPosition.y-this._startCursorPosition.y;let a=1;s<0?a=1/Math.pow(this.scaleFactor,-s*8):s>0&&(a=Math.pow(this.scaleFactor,s*8)),this._v3_1.setFromMatrixPosition(this._gizmoMatrixState),this.applyTransformMatrix(this.scale(a,this._v3_1))}break;case Et.FOV:if(this.enableZoom&&this.object.isPerspectiveCamera)if(n)this.dispatchEvent($e),this.dispatchEvent(nn),this.updateTbState(e,!0),this._startCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!1);else{this._currentCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5);const s=this._currentCursorPosition.y-this._startCursorPosition.y;let a=1;s<0?a=1/Math.pow(this.scaleFactor,-s*8):s>0&&(a=Math.pow(this.scaleFactor,s*8)),this._v3_1.setFromMatrixPosition(this._cameraMatrixState);const o=this._v3_1.distanceTo(this._gizmos.position);let c=o/a;c=Tt.clamp(c,this.minDistance,this.maxDistance);const l=o*Math.tan(Tt.DEG2RAD*this._fovState*.5);let h=Tt.RAD2DEG*(Math.atan(l/c)*2);h=Tt.clamp(h,this.minFov,this.maxFov);const u=l/Math.tan(Tt.DEG2RAD*(h/2));a=o/u,this._v3_2.setFromMatrixPosition(this._gizmoMatrixState),this.setFov(h),this.applyTransformMatrix(this.scale(a,this._v3_2,!1)),ge.copy(this._gizmos.position).sub(this.object.position).normalize().multiplyScalar(u/o),this._m4_1.makeTranslation(ge.x,ge.y,ge.z)}break}this.dispatchEvent(re)}}onSinglePanEnd(){if(this._state==Et.ROTATE){if(!this.enableRotate)return;if(this.enableAnimations)if(performance.now()-this._timeCurrent<120){const e=Math.abs((this._wPrev+this._wCurr)/2),n=this;this._animationId=window.requestAnimationFrame(function(r){n.updateTbState(Et.ANIMATION_ROTATE,!0);const s=n.calculateRotationAxis(n._cursorPosPrev,n._cursorPosCurr);n.onRotationAnim(r,s,Math.min(e,n.wMax))})}else this.updateTbState(Et.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(re);else this.updateTbState(Et.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(re)}else(this._state==Et.PAN||this._state==Et.IDLE)&&(this.updateTbState(Et.IDLE,!1),this.enableGrid&&this.disposeGrid(),this.activateGizmos(!1),this.dispatchEvent(re));this.dispatchEvent($e)}onDoubleTap(t){if(this.enabled&&this.enablePan&&this.enableFocus&&this.scene!=null){this.dispatchEvent(nn),this.setCenter(t.clientX,t.clientY);const e=this.unprojectOnObj(this.getCursorNDC(Ot.x,Ot.y,this.domElement),this.object);if(e!=null&&this.enableAnimations){const n=this;this._animationId!=-1&&window.cancelAnimationFrame(this._animationId),this._timeStart=-1,this._animationId=window.requestAnimationFrame(function(r){n.updateTbState(Et.ANIMATION_FOCUS,!0),n.onFocusAnim(r,e,n._cameraMatrixState,n._gizmoMatrixState)})}else e!=null&&!this.enableAnimations&&(this.updateTbState(Et.FOCUS,!0),this.focus(e,this.scaleFactor),this.updateTbState(Et.IDLE,!1),this.dispatchEvent(re))}this.dispatchEvent($e)}onDoublePanStart(){this.enabled&&this.enablePan&&(this.dispatchEvent(nn),this.updateTbState(Et.PAN,!0),this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2),this._startCursorPosition.copy(this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement,!0)),this._currentCursorPosition.copy(this._startCursorPosition),this.activateGizmos(!1))}onDoublePanMove(){this.enabled&&this.enablePan&&(this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2),this._state!=Et.PAN&&(this.updateTbState(Et.PAN,!0),this._startCursorPosition.copy(this._currentCursorPosition)),this._currentCursorPosition.copy(this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement,!0)),this.applyTransformMatrix(this.pan(this._startCursorPosition,this._currentCursorPosition,!0)),this.dispatchEvent(re))}onDoublePanEnd(){this.updateTbState(Et.IDLE,!1),this.dispatchEvent($e)}onRotateStart(){this.enabled&&this.enableRotate&&(this.dispatchEvent(nn),this.updateTbState(Et.ZROTATE,!0),this._startFingerRotation=this.getAngle(this._touchCurrent[1],this._touchCurrent[0])+this.getAngle(this._touchStart[1],this._touchStart[0]),this._currentFingerRotation=this._startFingerRotation,this.object.getWorldDirection(this._rotationAxis),!this.enablePan&&!this.enableZoom&&this.activateGizmos(!0))}onRotateMove(){if(this.enabled&&this.enableRotate){this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2);let t;this._state!=Et.ZROTATE&&(this.updateTbState(Et.ZROTATE,!0),this._startFingerRotation=this._currentFingerRotation),this._currentFingerRotation=this.getAngle(this._touchCurrent[1],this._touchCurrent[0])+this.getAngle(this._touchStart[1],this._touchStart[0]),this.enablePan?(this._v3_2.setFromMatrixPosition(this._gizmoMatrixState),t=this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement).applyQuaternion(this.object.quaternion).multiplyScalar(1/this.object.zoom).add(this._v3_2)):t=new A().setFromMatrixPosition(this._gizmoMatrixState);const e=Tt.DEG2RAD*(this._startFingerRotation-this._currentFingerRotation);this.applyTransformMatrix(this.zRotate(t,e)),this.dispatchEvent(re)}}onRotateEnd(){this.updateTbState(Et.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent($e)}onPinchStart(){this.enabled&&this.enableZoom&&(this.dispatchEvent(nn),this.updateTbState(Et.SCALE,!0),this._startFingerDistance=this.calculatePointersDistance(this._touchCurrent[0],this._touchCurrent[1]),this._currentFingerDistance=this._startFingerDistance,this.activateGizmos(!1))}onPinchMove(){if(this.enabled&&this.enableZoom){this.setCenter((this._touchCurrent[0].clientX+this._touchCurrent[1].clientX)/2,(this._touchCurrent[0].clientY+this._touchCurrent[1].clientY)/2);const t=12;this._state!=Et.SCALE&&(this._startFingerDistance=this._currentFingerDistance,this.updateTbState(Et.SCALE,!0)),this._currentFingerDistance=Math.max(this.calculatePointersDistance(this._touchCurrent[0],this._touchCurrent[1]),t*this._devPxRatio);const e=this._currentFingerDistance/this._startFingerDistance;let n;this.enablePan?this.object.isOrthographicCamera?n=this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement).applyQuaternion(this.object.quaternion).multiplyScalar(1/this.object.zoom).add(this._gizmos.position):this.object.isPerspectiveCamera&&(n=this.unprojectOnTbPlane(this.object,Ot.x,Ot.y,this.domElement).applyQuaternion(this.object.quaternion).add(this._gizmos.position)):n=this._gizmos.position,this.applyTransformMatrix(this.scale(e,n)),this.dispatchEvent(re)}}onPinchEnd(){this.updateTbState(Et.IDLE,!1),this.dispatchEvent($e)}onTriplePanStart(){if(this.enabled&&this.enableZoom){this.dispatchEvent(nn),this.updateTbState(Et.SCALE,!0);let t=0,e=0;const n=this._touchCurrent.length;for(let r=0;r<n;r++)t+=this._touchCurrent[r].clientX,e+=this._touchCurrent[r].clientY;this.setCenter(t/n,e/n),this._startCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5),this._currentCursorPosition.copy(this._startCursorPosition)}}onTriplePanMove(){if(this.enabled&&this.enableZoom){let t=0,e=0;const n=this._touchCurrent.length;for(let d=0;d<n;d++)t+=this._touchCurrent[d].clientX,e+=this._touchCurrent[d].clientY;this.setCenter(t/n,e/n);const r=8;this._currentCursorPosition.setY(this.getCursorNDC(Ot.x,Ot.y,this.domElement).y*.5);const s=this._currentCursorPosition.y-this._startCursorPosition.y;let a=1;s<0?a=1/Math.pow(this.scaleFactor,-s*r):s>0&&(a=Math.pow(this.scaleFactor,s*r)),this._v3_1.setFromMatrixPosition(this._cameraMatrixState);const o=this._v3_1.distanceTo(this._gizmos.position);let c=o/a;c=Tt.clamp(c,this.minDistance,this.maxDistance);const l=o*Math.tan(Tt.DEG2RAD*this._fovState*.5);let h=Tt.RAD2DEG*(Math.atan(l/c)*2);h=Tt.clamp(h,this.minFov,this.maxFov);const u=l/Math.tan(Tt.DEG2RAD*(h/2));a=o/u,this._v3_2.setFromMatrixPosition(this._gizmoMatrixState),this.setFov(h),this.applyTransformMatrix(this.scale(a,this._v3_2,!1)),ge.copy(this._gizmos.position).sub(this.object.position).normalize().multiplyScalar(u/o),this._m4_1.makeTranslation(ge.x,ge.y,ge.z),this.dispatchEvent(re)}}onTriplePanEnd(){this.updateTbState(Et.IDLE,!1),this.dispatchEvent($e)}setCenter(t,e){Ot.x=t,Ot.y=e}initializeMouseActions(){this.setMouseAction("PAN",0,"CTRL"),this.setMouseAction("PAN",2),this.setMouseAction("ROTATE",0),this.setMouseAction("ZOOM","WHEEL"),this.setMouseAction("ZOOM",1),this.setMouseAction("FOV","WHEEL","SHIFT"),this.setMouseAction("FOV",1,"SHIFT")}compareMouseAction(t,e){return t.operation==e.operation?t.mouse==e.mouse&&t.key==e.key:!1}setMouseAction(t,e,n=null){const r=["PAN","ROTATE","ZOOM","FOV"],s=[0,1,2,"WHEEL"],a=["CTRL","SHIFT",null];let o;if(!r.includes(t)||!s.includes(e)||!a.includes(n)||e=="WHEEL"&&t!="ZOOM"&&t!="FOV")return!1;switch(t){case"PAN":o=Et.PAN;break;case"ROTATE":o=Et.ROTATE;break;case"ZOOM":o=Et.SCALE;break;case"FOV":o=Et.FOV;break}const c={operation:t,mouse:e,key:n,state:o};for(let l=0;l<this.mouseActions.length;l++)if(this.mouseActions[l].mouse==c.mouse&&this.mouseActions[l].key==c.key)return this.mouseActions.splice(l,1,c),!0;return this.mouseActions.push(c),!0}unsetMouseAction(t,e=null){for(let n=0;n<this.mouseActions.length;n++)if(this.mouseActions[n].mouse==t&&this.mouseActions[n].key==e)return this.mouseActions.splice(n,1),!0;return!1}getOpFromAction(t,e){let n;for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==e)return n.operation;if(e!=null){for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==null)return n.operation}return null}getOpStateFromAction(t,e){let n;for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==e)return n.state;if(e!=null){for(let r=0;r<this.mouseActions.length;r++)if(n=this.mouseActions[r],n.mouse==t&&n.key==null)return n.state}return null}getAngle(t,e){return Math.atan2(e.clientY-t.clientY,e.clientX-t.clientX)*180/Math.PI}updateTouchEvent(t){for(let e=0;e<this._touchCurrent.length;e++)if(this._touchCurrent[e].pointerId==t.pointerId){this._touchCurrent.splice(e,1,t);break}}applyTransformMatrix(t){if(t.camera!=null&&(this._m4_1.copy(this._cameraMatrixState).premultiply(t.camera),this._m4_1.decompose(this.object.position,this.object.quaternion,this.object.scale),this.object.updateMatrix(),(this._state==Et.ROTATE||this._state==Et.ZROTATE||this._state==Et.ANIMATION_ROTATE)&&this.object.up.copy(this._upState).applyQuaternion(this.object.quaternion)),t.gizmos!=null&&(this._m4_1.copy(this._gizmoMatrixState).premultiply(t.gizmos),this._m4_1.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this._gizmos.updateMatrix()),this._state==Et.SCALE||this._state==Et.FOCUS||this._state==Et.ANIMATION_FOCUS)if(this._tbRadius=this.calculateTbRadius(this.object),this.adjustNearFar){const e=this.object.position.distanceTo(this._gizmos.position),n=new $n;n.setFromObject(this._gizmos);const r=new vi;n.getBoundingSphere(r);const s=Math.max(this._nearPos0,r.radius+r.center.length()),a=e-this._initialNear,o=Math.min(s,a);this.object.near=e-o;const c=Math.min(this._farPos0,-r.radius+r.center.length()),l=e-this._initialFar,h=Math.min(c,l);this.object.far=e-h,this.object.updateProjectionMatrix()}else{let e=!1;this.object.near!=this._initialNear&&(this.object.near=this._initialNear,e=!0),this.object.far!=this._initialFar&&(this.object.far=this._initialFar,e=!0),e&&this.object.updateProjectionMatrix()}}calculateAngularSpeed(t,e,n,r){const s=e-t,a=(r-n)/1e3;return a==0?0:s/a}calculatePointersDistance(t,e){return Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2))}calculateRotationAxis(t,e){return this._rotationMatrix.extractRotation(this._cameraMatrixState),this._quat.setFromRotationMatrix(this._rotationMatrix),this._rotationAxis.crossVectors(t,e).applyQuaternion(this._quat),this._rotationAxis.normalize().clone()}calculateTbRadius(t){const e=t.position.distanceTo(this._gizmos.position);if(t.type=="PerspectiveCamera"){const n=Tt.DEG2RAD*t.fov*.5,r=Math.atan(t.aspect*Math.tan(n));return Math.tan(Math.min(n,r))*e*this.radiusFactor}else if(t.type=="OrthographicCamera")return Math.min(t.top,t.right)*this.radiusFactor}focus(t,e,n=1){ge.copy(t).sub(this._gizmos.position).multiplyScalar(n),this._translationMatrix.makeTranslation(ge.x,ge.y,ge.z),Ll.copy(this._gizmoMatrixState),this._gizmoMatrixState.premultiply(this._translationMatrix),this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),Ul.copy(this._cameraMatrixState),this._cameraMatrixState.premultiply(this._translationMatrix),this._cameraMatrixState.decompose(this.object.position,this.object.quaternion,this.object.scale),this.enableZoom&&this.applyTransformMatrix(this.scale(e,this._gizmos.position)),this._gizmoMatrixState.copy(Ll),this._cameraMatrixState.copy(Ul)}drawGrid(){if(this.scene!=null){let n,r,s,a;if(this.object.isOrthographicCamera){const o=this.object.right-this.object.left,c=this.object.bottom-this.object.top;s=Math.max(o,c),a=s/20,n=s/this.object.zoom*3,r=n/a*this.object.zoom}else if(this.object.isPerspectiveCamera){const o=this.object.position.distanceTo(this._gizmos.position),c=Tt.DEG2RAD*this.object.fov*.5,l=Math.atan(this.object.aspect*Math.tan(c));s=Math.tan(Math.max(c,l))*o*2,a=s/20,n=s*3,r=n/a}this._grid==null&&(this._grid=new xf(n,r,8947848,8947848),this._grid.position.copy(this._gizmos.position),this._gridPosition.copy(this._grid.position),this._grid.quaternion.copy(this.object.quaternion),this._grid.rotateX(Math.PI*.5),this.scene.add(this._grid))}}dispose(){this._animationId!=-1&&window.cancelAnimationFrame(this._animationId),this.disconnect(),this.scene!==null&&this.scene.remove(this._gizmos),this.disposeGrid()}disposeGrid(){this._grid!=null&&this.scene!=null&&(this.scene.remove(this._grid),this._grid=null)}easeOutCubic(t){return 1-Math.pow(1-t,3)}activateGizmos(t){const e=this._gizmos.children[0],n=this._gizmos.children[1],r=this._gizmos.children[2];t?(e.material.setValues({opacity:1}),n.material.setValues({opacity:1}),r.material.setValues({opacity:1})):(e.material.setValues({opacity:.6}),n.material.setValues({opacity:.6}),r.material.setValues({opacity:.6}))}getCursorNDC(t,e,n){const r=n.getBoundingClientRect();return this._v2_1.setX((t-r.left)/r.width*2-1),this._v2_1.setY((r.bottom-e)/r.height*2-1),this._v2_1.clone()}getCursorPosition(t,e,n){return this._v2_1.copy(this.getCursorNDC(t,e,n)),this._v2_1.x*=(this.object.right-this.object.left)*.5,this._v2_1.y*=(this.object.top-this.object.bottom)*.5,this._v2_1.clone()}setCamera(t){t.lookAt(this.target),t.updateMatrix(),t.type=="PerspectiveCamera"&&(this._fov0=t.fov,this._fovState=t.fov),this._cameraMatrixState0.copy(t.matrix),this._cameraMatrixState.copy(this._cameraMatrixState0),this._cameraProjectionState.copy(t.projectionMatrix),this._zoom0=t.zoom,this._zoomState=this._zoom0,this._initialNear=t.near,this._nearPos0=t.position.distanceTo(this.target)-t.near,this._nearPos=this._initialNear,this._initialFar=t.far,this._farPos0=t.position.distanceTo(this.target)-t.far,this._farPos=this._initialFar,this._up0.copy(t.up),this._upState.copy(t.up),this.object=t,this.object.updateProjectionMatrix(),this._tbRadius=this.calculateTbRadius(t),this.makeGizmos(this.target,this._tbRadius)}setGizmosVisible(t){this._gizmos.visible=t,this.dispatchEvent(re)}setTbRadius(t){this.radiusFactor=t,this._tbRadius=this.calculateTbRadius(this.object);const n=new ds(0,0,this._tbRadius,this._tbRadius).getPoints(this._curvePts),r=new qe().setFromPoints(n);for(const s in this._gizmos.children)this._gizmos.children[s].geometry=r;this.dispatchEvent(re)}makeGizmos(t,e){const r=new ds(0,0,e,e).getPoints(this._curvePts),s=new qe().setFromPoints(r),a=new gr({color:16744576,fog:!1,transparent:!0,opacity:.6}),o=new gr({color:8454016,fog:!1,transparent:!0,opacity:.6}),c=new gr({color:8421631,fog:!1,transparent:!0,opacity:.6}),l=new us(s,a),h=new us(s,o),u=new us(s,c),d=Math.PI*.5;if(l.rotation.x=d,h.rotation.y=d,this._gizmoMatrixState0.identity().setPosition(t),this._gizmoMatrixState.copy(this._gizmoMatrixState0),this.object.zoom!==1){const f=1/this.object.zoom;this._scaleMatrix.makeScale(f,f,f),this._translationMatrix.makeTranslation(-t.x,-t.y,-t.z),this._gizmoMatrixState.premultiply(this._translationMatrix).premultiply(this._scaleMatrix),this._translationMatrix.makeTranslation(t.x,t.y,t.z),this._gizmoMatrixState.premultiply(this._translationMatrix)}this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this._gizmos.traverse(function(f){f.isLine&&(f.geometry.dispose(),f.material.dispose())}),this._gizmos.clear(),this._gizmos.add(l),this._gizmos.add(h),this._gizmos.add(u)}onFocusAnim(t,e,n,r){if(this._timeStart==-1&&(this._timeStart=t),this._state==Et.ANIMATION_FOCUS){const a=(t-this._timeStart)/this.focusAnimationTime;if(this._gizmoMatrixState.copy(r),a>=1)this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this.focus(e,this.scaleFactor),this._timeStart=-1,this.updateTbState(Et.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(re);else{const o=this.easeOutCubic(a),c=1-o+this.scaleFactor*o;this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this.focus(e,c,o),this.dispatchEvent(re);const l=this;this._animationId=window.requestAnimationFrame(function(h){l.onFocusAnim(h,e,n,r.clone())})}}else this._animationId=-1,this._timeStart=-1}onRotationAnim(t,e,n){if(this._timeStart==-1&&(this._anglePrev=0,this._angleCurrent=0,this._timeStart=t),this._state==Et.ANIMATION_ROTATE){const r=(t-this._timeStart)/1e3;if(n+-this.dampingFactor*r>0){this._angleCurrent=.5*-this.dampingFactor*Math.pow(r,2)+n*r+0,this.applyTransformMatrix(this.rotate(e,this._angleCurrent)),this.dispatchEvent(re);const a=this;this._animationId=window.requestAnimationFrame(function(o){a.onRotationAnim(o,e,n)})}else this._animationId=-1,this._timeStart=-1,this.updateTbState(Et.IDLE,!1),this.activateGizmos(!1),this.dispatchEvent(re)}else this._animationId=-1,this._timeStart=-1,this._state!=Et.ROTATE&&(this.activateGizmos(!1),this.dispatchEvent(re))}pan(t,e,n=!1){const r=t.clone().sub(e);if(this.object.isOrthographicCamera)r.multiplyScalar(1/this.object.zoom);else if(this.object.isPerspectiveCamera&&n){this._v3_1.setFromMatrixPosition(this._cameraMatrixState0),this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0);const s=this._v3_1.distanceTo(this._v3_2)/this.object.position.distanceTo(this._gizmos.position);r.multiplyScalar(1/s)}return this._v3_1.set(r.x,r.y,0).applyQuaternion(this.object.quaternion),this._m4_1.makeTranslation(this._v3_1.x,this._v3_1.y,this._v3_1.z),this.setTransformationMatrices(this._m4_1,this._m4_1),Ve}reset(){this.target.copy(this._target0),this.object.zoom=this._zoom0,this.object.isPerspectiveCamera&&(this.object.fov=this._fov0),this.object.near=this._nearPos,this.object.far=this._farPos,this._cameraMatrixState.copy(this._cameraMatrixState0),this._cameraMatrixState.decompose(this.object.position,this.object.quaternion,this.object.scale),this.object.up.copy(this._up0),this.object.updateMatrix(),this.object.updateProjectionMatrix(),this._gizmoMatrixState.copy(this._gizmoMatrixState0),this._gizmoMatrixState0.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this._gizmos.updateMatrix(),this._tbRadius=this.calculateTbRadius(this.object),this.makeGizmos(this._gizmos.position,this._tbRadius),this.object.lookAt(this._gizmos.position),this.updateTbState(Et.IDLE,!1),this.dispatchEvent(re)}rotate(t,e){const n=this._gizmos.position;return this._translationMatrix.makeTranslation(-n.x,-n.y,-n.z),this._rotationMatrix.makeRotationAxis(t,-e),this._m4_1.makeTranslation(n.x,n.y,n.z),this._m4_1.multiply(this._rotationMatrix),this._m4_1.multiply(this._translationMatrix),this.setTransformationMatrices(this._m4_1),Ve}copyState(){let t;this.object.isOrthographicCamera?t=JSON.stringify({arcballState:{cameraFar:this.object.far,cameraMatrix:this.object.matrix,cameraNear:this.object.near,cameraUp:this.object.up,cameraZoom:this.object.zoom,gizmoMatrix:this._gizmos.matrix,target:this.target}}):this.object.isPerspectiveCamera&&(t=JSON.stringify({arcballState:{cameraFar:this.object.far,cameraFov:this.object.fov,cameraMatrix:this.object.matrix,cameraNear:this.object.near,cameraUp:this.object.up,cameraZoom:this.object.zoom,gizmoMatrix:this._gizmos.matrix,target:this.target}})),navigator.clipboard.writeText(t)}pasteState(){const t=this;navigator.clipboard.readText().then(function(n){t.setStateFromJSON(n)})}saveState(){this.object.updateMatrix(),this._gizmos.updateMatrix(),this._target0.copy(this.target),this._cameraMatrixState0.copy(this.object.matrix),this._gizmoMatrixState0.copy(this._gizmos.matrix),this._nearPos=this.object.near,this._farPos=this.object.far,this._zoom0=this.object.zoom,this._up0.copy(this.object.up),this.object.isPerspectiveCamera&&(this._fov0=this.object.fov)}scale(t,e,n=!0){en.copy(e);let r=1/t;if(this.object.isOrthographicCamera){this.object.zoom=this._zoomState,this.object.zoom*=t,this.object.zoom>this.maxZoom?(this.object.zoom=this.maxZoom,r=this._zoomState/this.maxZoom):this.object.zoom<this.minZoom&&(this.object.zoom=this.minZoom,r=this._zoomState/this.minZoom),this.object.updateProjectionMatrix(),this._v3_1.setFromMatrixPosition(this._gizmoMatrixState),this._scaleMatrix.makeScale(r,r,r),this._translationMatrix.makeTranslation(-this._v3_1.x,-this._v3_1.y,-this._v3_1.z),this._m4_2.makeTranslation(this._v3_1.x,this._v3_1.y,this._v3_1.z).multiply(this._scaleMatrix),this._m4_2.multiply(this._translationMatrix),en.sub(this._v3_1);const s=en.clone().multiplyScalar(r);return en.sub(s),this._m4_1.makeTranslation(en.x,en.y,en.z),this._m4_2.premultiply(this._m4_1),this.setTransformationMatrices(this._m4_1,this._m4_2),Ve}else if(this.object.isPerspectiveCamera){this._v3_1.setFromMatrixPosition(this._cameraMatrixState),this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);let s=this._v3_1.distanceTo(en),a=s-s*r;const o=s-a;if(o<this.minDistance?(r=this.minDistance/s,a=s-s*r):o>this.maxDistance&&(r=this.maxDistance/s,a=s-s*r),ge.copy(en).sub(this._v3_1).normalize().multiplyScalar(a),this._m4_1.makeTranslation(ge.x,ge.y,ge.z),n){const c=this._v3_2;s=c.distanceTo(en),a=s-s*r,ge.copy(en).sub(this._v3_2).normalize().multiplyScalar(a),this._translationMatrix.makeTranslation(c.x,c.y,c.z),this._scaleMatrix.makeScale(r,r,r),this._m4_2.makeTranslation(ge.x,ge.y,ge.z).multiply(this._translationMatrix),this._m4_2.multiply(this._scaleMatrix),this._translationMatrix.makeTranslation(-c.x,-c.y,-c.z),this._m4_2.multiply(this._translationMatrix),this.setTransformationMatrices(this._m4_1,this._m4_2)}else this.setTransformationMatrices(this._m4_1);return Ve}}setFov(t){this.object.isPerspectiveCamera&&(this.object.fov=Tt.clamp(t,this.minFov,this.maxFov),this.object.updateProjectionMatrix())}setTransformationMatrices(t=null,e=null){t!=null?Ve.camera!=null?Ve.camera.copy(t):Ve.camera=t.clone():Ve.camera=null,e!=null?Ve.gizmos!=null?Ve.gizmos.copy(e):Ve.gizmos=e.clone():Ve.gizmos=null}zRotate(t,e){return this._rotationMatrix.makeRotationAxis(this._rotationAxis,e),this._translationMatrix.makeTranslation(-t.x,-t.y,-t.z),this._m4_1.makeTranslation(t.x,t.y,t.z),this._m4_1.multiply(this._rotationMatrix),this._m4_1.multiply(this._translationMatrix),this._v3_1.setFromMatrixPosition(this._gizmoMatrixState).sub(t),this._v3_2.copy(this._v3_1).applyAxisAngle(this._rotationAxis,e),this._v3_2.sub(this._v3_1),this._m4_2.makeTranslation(this._v3_2.x,this._v3_2.y,this._v3_2.z),this.setTransformationMatrices(this._m4_1,this._m4_2),Ve}getRaycaster(){return s0}unprojectOnObj(t,e){const n=this.getRaycaster();n.near=e.near,n.far=e.far,n.setFromCamera(t,e);const r=n.intersectObjects(this.scene.children,!0);for(let s=0;s<r.length;s++)if(r[s].object.uuid!=this._gizmos.uuid&&r[s].face!=null)return r[s].point.clone();return null}unprojectOnTbSurface(t,e,n,r,s){if(t.type=="OrthographicCamera"){this._v2_1.copy(this.getCursorPosition(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,0);const a=Math.pow(this._v2_1.x,2),o=Math.pow(this._v2_1.y,2),c=Math.pow(this._tbRadius,2);return a+o<=c*.5?this._v3_1.setZ(Math.sqrt(c-(a+o))):this._v3_1.setZ(c*.5/Math.sqrt(a+o)),this._v3_1}else if(t.type=="PerspectiveCamera"){this._v2_1.copy(this.getCursorNDC(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,-1),this._v3_1.applyMatrix4(t.projectionMatrixInverse);const a=this._v3_1.clone().normalize(),o=t.position.distanceTo(this._gizmos.position),c=Math.pow(s,2),l=this._v3_1.z,h=Math.sqrt(Math.pow(this._v3_1.x,2)+Math.pow(this._v3_1.y,2));if(h==0)return a.set(this._v3_1.x,this._v3_1.y,s),a;const u=l/h,d=o;let f=Math.pow(u,2)+1,g=2*u*d,_=Math.pow(d,2)-c,m=Math.pow(g,2)-4*f*_;if(m>=0&&(this._v2_1.setX((-g-Math.sqrt(m))/(2*f)),this._v2_1.setY(u*this._v2_1.x+d),Tt.RAD2DEG*this._v2_1.angle()>=45)){const E=Math.sqrt(Math.pow(this._v2_1.x,2)+Math.pow(o-this._v2_1.y,2));return a.multiplyScalar(E),a.z+=o,a}f=u,g=d,_=-c*.5,m=Math.pow(g,2)-4*f*_,this._v2_1.setX((-g-Math.sqrt(m))/(2*f)),this._v2_1.setY(u*this._v2_1.x+d);const p=Math.sqrt(Math.pow(this._v2_1.x,2)+Math.pow(o-this._v2_1.y,2));return a.multiplyScalar(p),a.z+=o,a}}unprojectOnTbPlane(t,e,n,r,s=!1){if(t.type=="OrthographicCamera")return this._v2_1.copy(this.getCursorPosition(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,0),this._v3_1.clone();if(t.type=="PerspectiveCamera"){this._v2_1.copy(this.getCursorNDC(e,n,r)),this._v3_1.set(this._v2_1.x,this._v2_1.y,-1),this._v3_1.applyMatrix4(t.projectionMatrixInverse);const a=this._v3_1.clone().normalize(),o=this._v3_1.z,c=Math.sqrt(Math.pow(this._v3_1.x,2)+Math.pow(this._v3_1.y,2));let l;if(s?l=this._v3_1.setFromMatrixPosition(this._cameraMatrixState0).distanceTo(this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0)):l=t.position.distanceTo(this._gizmos.position),c==0)return a.set(0,0,0),a;const h=o/c,u=l,d=-u/h,f=Math.sqrt(Math.pow(u,2)+Math.pow(d,2));return a.multiplyScalar(f),a.z=0,a}}updateMatrixState(){this._cameraMatrixState.copy(this.object.matrix),this._gizmoMatrixState.copy(this._gizmos.matrix),this.object.isOrthographicCamera?(this._cameraProjectionState.copy(this.object.projectionMatrix),this.object.updateProjectionMatrix(),this._zoomState=this.object.zoom):this.object.isPerspectiveCamera&&(this._fovState=this.object.fov)}updateTbState(t,e){this._state=t,e&&this.updateMatrixState()}update(){if(this.target.equals(this._currentTarget)===!1&&(this._gizmos.position.copy(this.target),this._tbRadius=this.calculateTbRadius(this.object),this.makeGizmos(this.target,this._tbRadius),this._currentTarget.copy(this.target)),this.object.isOrthographicCamera){if(this.object.zoom>this.maxZoom||this.object.zoom<this.minZoom){const t=Tt.clamp(this.object.zoom,this.minZoom,this.maxZoom);this.applyTransformMatrix(this.scale(t/this.object.zoom,this._gizmos.position,!0))}}else if(this.object.isPerspectiveCamera){const t=this.object.position.distanceTo(this._gizmos.position);if(t>this.maxDistance+is||t<this.minDistance-is){const n=Tt.clamp(t,this.minDistance,this.maxDistance);this.applyTransformMatrix(this.scale(n/t,this._gizmos.position)),this.updateMatrixState()}(this.object.fov<this.minFov||this.object.fov>this.maxFov)&&(this.object.fov=Tt.clamp(this.object.fov,this.minFov,this.maxFov),this.object.updateProjectionMatrix());const e=this._tbRadius;if(this._tbRadius=this.calculateTbRadius(this.object),e<this._tbRadius-is||e>this._tbRadius+is){const n=(this._gizmos.scale.x+this._gizmos.scale.y+this._gizmos.scale.z)/3,r=this._tbRadius/n,a=new ds(0,0,r,r).getPoints(this._curvePts),o=new qe().setFromPoints(a);for(const c in this._gizmos.children)this._gizmos.children[c].geometry=o}}this.object.lookAt(this._gizmos.position)}setStateFromJSON(t){const e=JSON.parse(t);if(e.arcballState!=null){this.target.fromArray(e.arcballState.target),this._cameraMatrixState.fromArray(e.arcballState.cameraMatrix.elements),this._cameraMatrixState.decompose(this.object.position,this.object.quaternion,this.object.scale),this.object.up.copy(e.arcballState.cameraUp),this.object.near=e.arcballState.cameraNear,this.object.far=e.arcballState.cameraFar,this.object.zoom=e.arcballState.cameraZoom,this.object.isPerspectiveCamera&&(this.object.fov=e.arcballState.cameraFov),this._gizmoMatrixState.fromArray(e.arcballState.gizmoMatrix.elements),this._gizmoMatrixState.decompose(this._gizmos.position,this._gizmos.quaternion,this._gizmos.scale),this.object.updateMatrix(),this.object.updateProjectionMatrix(),this._gizmos.updateMatrix(),this._tbRadius=this.calculateTbRadius(this.object);const n=new Ut().copy(this._gizmoMatrixState0);this.makeGizmos(this._gizmos.position,this._tbRadius),this._gizmoMatrixState0.copy(n),this.object.lookAt(this._gizmos.position),this.updateTbState(Et.IDLE,!1),this.dispatchEvent(re)}}}function o0(){const i=(this._gizmos.scale.x+this._gizmos.scale.y+this._gizmos.scale.z)/3;this._tbRadius=this.calculateTbRadius(this.object);const t=this._tbRadius/i,n=new ds(0,0,t,t).getPoints(this._curvePts),r=new qe().setFromPoints(n);for(const s in this._gizmos.children)this._gizmos.children[s].geometry=r;this.dispatchEvent(re)}function c0(i){if(this.enabled){for(let t=0;t<this.mouseActions.length;t++)if(this.mouseActions[t].mouse==2){i.preventDefault();break}}}function l0(){this._touchStart.splice(0,this._touchStart.length),this._touchCurrent.splice(0,this._touchCurrent.length),this._input=Qt.NONE}function h0(i){if(i.button==0&&i.isPrimary?(this._downValid=!0,this._downEvents.push(i),this._downStart=performance.now()):this._downValid=!1,i.pointerType=="touch"&&this._input!=Qt.CURSOR)switch(this._touchStart.push(i),this._touchCurrent.push(i),this._input){case Qt.NONE:this._input=Qt.ONE_FINGER,this.onSinglePanStart(i,"ROTATE"),window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerup",this._onPointerUp);break;case Qt.ONE_FINGER:case Qt.ONE_FINGER_SWITCHED:this._input=Qt.TWO_FINGER,this.onRotateStart(),this.onPinchStart(),this.onDoublePanStart();break;case Qt.TWO_FINGER:this._input=Qt.MULT_FINGER,this.onTriplePanStart(i);break}else if(i.pointerType!="touch"&&this._input==Qt.NONE){let t=null;i.ctrlKey||i.metaKey?t="CTRL":i.shiftKey&&(t="SHIFT"),this._mouseOp=this.getOpFromAction(i.button,t),this._mouseOp!=null&&(window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerup",this._onPointerUp),this._input=Qt.CURSOR,this._button=i.button,this.onSinglePanStart(i,this._mouseOp))}}function u0(i){if(i.pointerType=="touch"&&this._input!=Qt.CURSOR)switch(this._input){case Qt.ONE_FINGER:this.updateTouchEvent(i),this.onSinglePanMove(i,Et.ROTATE);break;case Qt.ONE_FINGER_SWITCHED:if(this.calculatePointersDistance(this._touchCurrent[0],i)*this._devPxRatio>=this._switchSensibility){this._input=Qt.ONE_FINGER,this.updateTouchEvent(i),this.onSinglePanStart(i,"ROTATE");break}break;case Qt.TWO_FINGER:this.updateTouchEvent(i),this.onRotateMove(),this.onPinchMove(),this.onDoublePanMove();break;case Qt.MULT_FINGER:this.updateTouchEvent(i),this.onTriplePanMove(i);break}else if(i.pointerType!="touch"&&this._input==Qt.CURSOR){let t=null;i.ctrlKey||i.metaKey?t="CTRL":i.shiftKey&&(t="SHIFT");const e=this.getOpStateFromAction(this._button,t);e!=null&&this.onSinglePanMove(i,e)}this._downValid&&this.calculatePointersDistance(this._downEvents[this._downEvents.length-1],i)*this._devPxRatio>this._movementThreshold&&(this._downValid=!1)}function d0(i){if(i.pointerType=="touch"&&this._input!=Qt.CURSOR){const t=this._touchCurrent.length;for(let e=0;e<t;e++)if(this._touchCurrent[e].pointerId==i.pointerId){this._touchCurrent.splice(e,1),this._touchStart.splice(e,1);break}switch(this._input){case Qt.ONE_FINGER:case Qt.ONE_FINGER_SWITCHED:window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),this._input=Qt.NONE,this.onSinglePanEnd();break;case Qt.TWO_FINGER:this.onDoublePanEnd(i),this.onPinchEnd(i),this.onRotateEnd(i),this._input=Qt.ONE_FINGER_SWITCHED;break;case Qt.MULT_FINGER:this._touchCurrent.length==0&&(window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),this._input=Qt.NONE,this.onTriplePanEnd());break}}else i.pointerType!="touch"&&this._input==Qt.CURSOR&&(window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),this._input=Qt.NONE,this.onSinglePanEnd(),this._button=-1);if(i.isPrimary)if(this._downValid)if(i.timeStamp-this._downEvents[this._downEvents.length-1].timeStamp<=this._maxDownTime)if(this._nclicks==0)this._nclicks=1,this._clickStart=performance.now();else{const e=i.timeStamp-this._clickStart,n=this.calculatePointersDistance(this._downEvents[1],this._downEvents[0])*this._devPxRatio;e<=this._maxInterval&&n<=this._posThreshold?(this._nclicks=0,this._downEvents.splice(0,this._downEvents.length),this.onDoubleTap(i)):(this._nclicks=1,this._downEvents.shift(),this._clickStart=performance.now())}else this._downValid=!1,this._nclicks=0,this._downEvents.splice(0,this._downEvents.length);else this._nclicks=0,this._downEvents.splice(0,this._downEvents.length)}function f0(i){if(this.enabled&&this.enableZoom){let t=null;i.ctrlKey||i.metaKey?t="CTRL":i.shiftKey&&(t="SHIFT");const e=this.getOpFromAction("WHEEL",t);if(e!=null){i.preventDefault(),this.dispatchEvent(nn);const n=125;let r=i.deltaY/n,s=1;switch(r>0?s=1/this.scaleFactor:r<0&&(s=this.scaleFactor),e){case"ZOOM":if(this.updateTbState(Et.SCALE,!0),r>0?s=1/Math.pow(this.scaleFactor,r):r<0&&(s=Math.pow(this.scaleFactor,-r)),this.cursorZoom&&this.enablePan){let a;this.object.isOrthographicCamera?a=this.unprojectOnTbPlane(this.object,i.clientX,i.clientY,this.domElement).applyQuaternion(this.object.quaternion).multiplyScalar(1/this.object.zoom).add(this._gizmos.position):this.object.isPerspectiveCamera&&(a=this.unprojectOnTbPlane(this.object,i.clientX,i.clientY,this.domElement).applyQuaternion(this.object.quaternion).add(this._gizmos.position)),this.applyTransformMatrix(this.scale(s,a))}else this.applyTransformMatrix(this.scale(s,this._gizmos.position));this._grid!=null&&(this.disposeGrid(),this.drawGrid()),this.updateTbState(Et.IDLE,!1),this.dispatchEvent(re),this.dispatchEvent($e);break;case"FOV":if(this.object.isPerspectiveCamera){this.updateTbState(Et.FOV,!0),i.deltaX!=0&&(r=i.deltaX/n,s=1,r>0?s=1/Math.pow(this.scaleFactor,r):r<0&&(s=Math.pow(this.scaleFactor,-r))),this._v3_1.setFromMatrixPosition(this._cameraMatrixState);const a=this._v3_1.distanceTo(this._gizmos.position);let o=a/s;o=Tt.clamp(o,this.minDistance,this.maxDistance);const c=a*Math.tan(Tt.DEG2RAD*this.object.fov*.5);let l=Tt.RAD2DEG*(Math.atan(c/o)*2);l>this.maxFov?l=this.maxFov:l<this.minFov&&(l=this.minFov);const h=c/Math.tan(Tt.DEG2RAD*(l/2));s=a/h,this.setFov(l),this.applyTransformMatrix(this.scale(s,this._gizmos.position,!1))}this._grid!=null&&(this.disposeGrid(),this.drawGrid()),this.updateTbState(Et.IDLE,!1),this.dispatchEvent(re),this.dispatchEvent($e);break}}}}const cr=new A;function Ze(i,t,e,n,r,s){const a=2*Math.PI*r/4,o=Math.max(s-2*r,0),c=Math.PI/4;cr.copy(t),cr[n]=0,cr.normalize();const l=.5*a/(a+o),h=1-cr.angleTo(i)/c;return Math.sign(cr[e])===1?h*l:o/(a+o)+l+l*(1-h)}class vr extends Mi{constructor(t=1,e=1,n=1,r=2,s=.1){const a=r*2+1;if(s=Math.min(t/2,e/2,n/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:r,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new A,l=new A,h=new A(t,e,n).divideScalar(2).subScalar(s),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new A,m=.5/a;for(let p=0,v=0;p<u.length;p+=3,v+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*s,u[p+1]=h.y*Math.sign(c.y)+l.y*s,u[p+2]=h.z*Math.sign(c.z)+l.z*s,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[v+0]=Ze(_,l,"z","y",s,n),f[v+1]=1-Ze(_,l,"y","z",s,e);break;case 1:_.set(-1,0,0),f[v+0]=1-Ze(_,l,"z","y",s,n),f[v+1]=1-Ze(_,l,"y","z",s,e);break;case 2:_.set(0,1,0),f[v+0]=1-Ze(_,l,"x","z",s,t),f[v+1]=Ze(_,l,"z","x",s,n);break;case 3:_.set(0,-1,0),f[v+0]=1-Ze(_,l,"x","z",s,t),f[v+1]=1-Ze(_,l,"z","x",s,n);break;case 4:_.set(0,0,1),f[v+0]=1-Ze(_,l,"x","y",s,t),f[v+1]=1-Ze(_,l,"y","x",s,e);break;case 5:_.set(0,0,-1),f[v+0]=Ze(_,l,"x","y",s,t),f[v+1]=1-Ze(_,l,"y","x",s,e);break}}static fromJSON(t){return new vr(t.width,t.height,t.depth,t.segments,t.radius)}}function p0(i){let t=2166136261;for(let e=0;e<i.length;e+=1)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function m0(i){let t=i||1831565813;return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const ji=["sakura","summer","maple","ginkgo","snow","sunset","ocean","wanderer"],Ke={sakura:{id:"sakura",family:"blossom",motion:"petal-drift",glyph:"花",signature:"one rounded-pixel cherry tree",scanDark:"#a52b6d",mid:"#df4f96",bright:"#ff91c2",highlight:"#ffd1e5",trunk:"#704129",ground:"#fbf4df",groundAlt:"#b8d995",groundEdge:"#6da66d",sky:["#dcefe8","#f9e3ed"],light:["#fff9e8","#ffc5de"],moduleColors:["#7a1f52","#d95092","#ff91c2"]},summer:{id:"summer",family:"canopy",motion:"canopy-breathe",glyph:"葉",signature:"one broad summer canopy",scanDark:"#176b45",mid:"#3ca668",bright:"#8ddb6c",highlight:"#dcf5a6",trunk:"#76502d",ground:"#f6f1d3",groundAlt:"#a7d17d",groundEdge:"#5a9b5b",sky:["#d9eee5","#edf4c9"],light:["#fffbd9","#a9e2b2"],moduleColors:["#145b3b","#3ca668","#8ddb6c"]},maple:{id:"maple",family:"maple",motion:"ember-turn",glyph:"楓",signature:"one asymmetric maple crown",scanDark:"#9b3026",mid:"#dc4b30",bright:"#f57932",highlight:"#ffcb64",trunk:"#70402a",ground:"#f9efd8",groundAlt:"#d8aa6c",groundEdge:"#aa653c",sky:["#f1dfd0","#f7ba79"],light:["#fff0c3","#ff8d58"],moduleColors:["#7b241f","#d9492e","#f57932"]},ginkgo:{id:"ginkgo",family:"ginkgo",motion:"fan-fall",glyph:"杏",signature:"one golden fan canopy",scanDark:"#77580b",mid:"#c28a08",bright:"#f3c52e",highlight:"#ffe98a",trunk:"#77542e",ground:"#faf3d2",groundAlt:"#ddca6e",groundEdge:"#aa8b28",sky:["#e7efe1","#f8e9a3"],light:["#fff7c4","#f6c541"],moduleColors:["#6b4b05","#c28a08","#f3c52e"]},snow:{id:"snow",family:"snow",motion:"snow-drift",glyph:"雪",signature:"one tiered snow-bough tree",scanDark:"#2d6780",mid:"#5d94ac",bright:"#bde5ee",highlight:"#ffffff",trunk:"#59686b",ground:"#f4f8f7",groundAlt:"#d4e8e9",groundEdge:"#82abb7",sky:["#dcecf0","#f6fbfb"],light:["#ffffff","#b8e5ed"],moduleColors:["#27556c","#5d94ac","#bde5ee"]},sunset:{id:"sunset",family:"sunset",motion:"sun-breathe",glyph:"日",signature:"pixel sun over a warm horizon",scanDark:"#922c55",mid:"#dc4b4a",bright:"#ff8738",highlight:"#ffd45c",trunk:"#71345c",ground:"#fff0d6",groundAlt:"#e9a26e",groundEdge:"#c85c54",sky:["#eadce7","#ffc074"],light:["#fff1a8","#ff7560"],moduleColors:["#752347","#dc4b4a","#ff8738"]},ocean:{id:"ocean",family:"ocean",motion:"travelling-wave",glyph:"波",signature:"a directional rounded-pixel wave band",scanDark:"#0e6395",mid:"#177eb2",bright:"#24c7d7",highlight:"#d2faf4",trunk:"#145c82",ground:"#e9f6f1",groundAlt:"#9edbd5",groundEdge:"#4ba5b2",sky:["#d5eff0","#bfe8e5"],light:["#effffc","#70d8dd"],moduleColors:["#0d4c77","#177eb2","#24c7d7"]},wanderer:{id:"wanderer",family:"wanderer",motion:"wanderer-idle",glyph:"兔",signature:"one original 3D traveller in a twilight scene",scanDark:"#493277",mid:"#7651a8",bright:"#a883d4",highlight:"#bdf5d7",trunk:"#2f2850",ground:"#f7f0de",groundAlt:"#b9e5cf",groundEdge:"#6f8f85",sky:["#ded8ea","#b8e6d5"],light:["#fff4d6","#c4a6ed"],moduleColors:["#3e2869","#7651a8","#bdf5d7"]}};function g0(i){return ji.includes(i)}const Nl=.9,wa=.46,Me=.4,Wn=.36,Dh=.34,_0=.32,Bi=.42,Ms=33,Fl=280,v0=.4,M0=.5,x0=.45,Ol=60,zl=.845,hi=.9,Bl=1.21,y0={sakura:15,summer:15,maple:15,ginkgo:15,snow:15,sunset:12,ocean:12,wanderer:20},S0=Me*1.55,rs=1.52,E0={sakura:.95,summer:.98,maple:.968,ginkgo:1,snow:1},si=.32,kl=.288,Hl=.272,T0={sakura:27.2,summer:26.4,maple:27.4,ginkgo:25.2,snow:27.2,sunset:28.688,ocean:33,wanderer:34.748*hi};function sn(i){return i/Ms}function yo(i,t){return i==="sunset"?t==="sun-core":i==="ocean"?t==="water":i==="wanderer"?t.startsWith("wanderer-")&&t!=="wanderer-garden":t==="trunk"||t==="branch"||t==="canopy"}const ce=i=>Number(i.toFixed(4)),Fe=(i,t)=>(i%t+t)%t,Lh=(i,t)=>t-(i.size-1)*.5,Uh=(i,t)=>t-(i.size-1)*.5;function Nh(i,t,e){const n=(i.size-1)*.5,r=Math.round(t+n),s=Math.round(e+n);return r>=0&&s>=0&&r<i.size&&s<i.size?{column:r,row:s}:null}function b0(i,t,e){return`${Math.round(i*100)},${Math.round(t*100)},${Math.round(e*100)}`}function jn(i,t,e,n,r,s,a,o,c={}){const l=sn(i.qr.size),h=c.logicalColumn!==void 0&&c.logicalRow!==void 0?{column:c.logicalColumn,row:c.logicalRow}:Nh(i.qr,t*l,n*l);if(!h)return;const u=c.phase??i.random()*Math.PI*2,d={x:t,z:n,baseY:e,scaleX:c.scaleX??Wn,scaleY:c.scaleY??Dh,scaleZ:c.scaleZ??Wn,rotationY:c.rotationY??((h.column+h.row)%2?.028:-.028),phase:u,amplitude:c.amplitude??0,color:new Lt(r),wave:c.wave??!1,semantic:s,column:h.column,row:h.row,cellEdge:Math.max(c.scaleX??Wn,c.scaleZ??Wn),motionLayer:a,motionGroup:c.motionGroup??0,variation:c.variation??1,part:o,treeHeight:c.treeHeight??0,lineageId:c.lineageId??o,parentLineageId:c.parentLineageId??null,lineageDepth:c.lineageDepth??0,restHeightRatio:c.restHeightRatio??(c.treeHeight?Tt.clamp(e/c.treeHeight,0,1):0),restRadial:c.restRadial??Math.hypot(t,n)};i.voxels.set(b0(t,e,n),d)}function Fh(i,t,e,n,r,s,a,o,c,l,h=0,u={id:c,parentId:null,depth:0,group:0,phase:0,radial:0}){for(let d=0;d<r;d+=1){const f=t*1.613+e*1.931+u.group*.71,g=0,_=Math.sin((d+1)*2.399+f)*g,m=Math.cos((d+1)*2.173+f*.83)*g,p=n+d*_0+Dh*.5,v=s;jn(i,t+_,p,e+m,v,a,o,c,{amplitude:l,phase:u.phase+d*.012,rotationY:void 0,motionGroup:u.group,treeHeight:h,lineageId:u.id,parentLineageId:u.parentId,lineageDepth:u.depth,restHeightRatio:h?Tt.clamp(p/h,0,1):0,restRadial:u.radial})}}function ss(i,t,e,n,r,s,a){const o=new A(...t.start),c=new A(...t.end),l=c.clone().sub(o),h=l.length();if(h<=.001)return;const u=l.clone().normalize(),d=Math.abs(u.y)>.88?new A(1,0,0):new A(0,1,0),f=new A().crossVectors(u,d).normalize(),g=new A().crossVectors(u,f).normalize(),_=Math.max(1,Math.ceil(h/(Me*.78)));for(let m=0;m<=_;m+=1){const p=m/_,v=o.clone().lerp(c,p),E=Tt.lerp(t.startRadius,t.endRadius,p),S=E>1.05?[E,E*.56]:E>.48?[E]:[0];for(const R of S){const b=Math.max(Me,Math.PI*2*Math.max(R,Me*.5)),w=R===0?1:Math.max(6,Math.ceil(b/(Me*.9)));for(let I=0;I<w;I+=1){const y=I/w*Math.PI*2,M=v.clone().addScaledVector(f,Math.cos(y)*R).addScaledVector(g,Math.sin(y)*R),P=s==="anchored"||M.y<=3.8;jn(i,M.x,M.y,M.z,n,r,P?"anchored":s,t.id,{amplitude:P?0:s==="primary"?.15:.21,phase:a+t.group*.41+p*.12,rotationY:Math.atan2(u.x,u.z),motionGroup:t.group,treeHeight:e,lineageId:t.id,parentLineageId:t.parentId,lineageDepth:t.depth,restHeightRatio:Tt.clamp(M.y/e,0,1),restRadial:Math.hypot(M.x,M.z)})}}E>.48&&jn(i,v.x,v.y,v.z,n,r,v.y<=3.8?"anchored":s,t.id,{amplitude:v.y<=3.8?0:s==="primary"?.15:.21,phase:a+t.group*.41+p*.12,rotationY:Math.atan2(u.x,u.z),motionGroup:t.group,treeHeight:e,lineageId:t.id,parentLineageId:t.parentId,lineageDepth:t.depth,restHeightRatio:Tt.clamp(v.y/e,0,1),restRadial:Math.hypot(v.x,v.z)})}}function de(i,t,e,n,r,s,a,o,c=Me,l=S0){const h=Math.ceil((t.x-e.x)/c),u=Math.floor((t.x+e.x)/c),d=Math.ceil((t.y-e.y)/c),f=Math.floor((t.y+e.y)/c),g=Math.ceil((t.z-e.z)/c),_=Math.floor((t.z+e.z)/c),m=new A(Math.max(c*.5,e.x-l),Math.max(c*.5,e.y-l),Math.max(c*.5,e.z-l));for(let p=g;p<=_;p+=1){const v=p*c;for(let E=d;E<=f;E+=1){const S=E*c;for(let R=h;R<=u;R+=1){const b=R*c,w=((b-t.x)/e.x)**2+((S-t.y)/e.y)**2+((v-t.z)/e.z)**2;if(w>1||((b-t.x)/m.x)**2+((S-t.y)/m.y)**2+((v-t.z)/m.z)**2<1)continue;const y=typeof n=="function"?n(b,S,v,w):n;jn(i,b,S,v,y,r,s,a,o?.(b,S,v))}}}}function w0(i,t,e,n){if(t==="snow")return;const s=Math.ceil(15.8/Me),a=[i.theme.mid,i.theme.bright,i.theme.highlight];for(let o=-s;o<=s;o+=1){const c=o*Me;for(let l=-s;l<=s;l+=1){const h=l*Me,u=Math.atan2(c,h);let d=1/0,f=1,g=!1,_=0,m=0;if(t==="sakura")d=Math.hypot((h+3.2)/13.35,(c-.3)/12.75),f=1+Math.sin(u*3+.4)*.1+Math.cos(u*5-.7)*.07,g=((h-1.5)/2.5)**2+((c+2.2)/2)**2<1||((h+5.2)/1.55)**2+((c-4.2)/1.9)**2<1,_=15.7+(1-d)*3.4+Math.abs(Math.sin(u*3+.25))*1.9+Math.sin(h*.41+c*.27)*.65+h*.035,m=14.05+(1-d)*.8+Math.abs(Math.cos(u*2-.35))*.42+Math.cos(h*.23-c*.31)*.22;else if(t==="summer")d=Math.hypot((h-.25)/12.9,(c-.1)/12.55),f=1+Math.sin(u*4+.8)*.035+Math.cos(u*7)*.025,_=15.15+(1-d**2)*7.2+Math.sin(h*.33-c*.29)*.45,m=13.35+(1-d**2)*1.5+Math.cos(h*.25+c*.21)*.25;else if(t==="maple"){d=Math.hypot((h+1.6)/13.8,(c-.8)/11),f=1+Math.sin(u*5+.65)*.19+Math.cos(u*3-.4)*.12;const S=Fe(u,Math.PI*2);g=d>.48&&S>5.45&&S<6.2,_=15.6+(1-d)*7+Math.sin(u*5)+h*.075,m=13.7+(1-d)*1.35+Math.sin(u*3-.4)*.38+h*.02}else{d=Math.hypot(h/11.95,(c-.15)/15.25),f=1+Math.cos(u*4+.3)*.035;const S=Fe(u,Math.PI*2);g=d>.3&&(S>.72&&S<.86||S>1.8&&S<1.94||S>3.55&&S<3.69||S>4.7&&S<4.84)||Math.abs(h+3.6)<.72&&c>-1&&c<8.8||Math.abs(h-3)<.68&&c>1.2&&c<10.2,_=15.1+(1-d)*9.4+Math.cos(h*.35)*.55+c*.025,m=14.2+(1-d)*3.4+Math.cos(u*3)*.35+c*.015}if(d>f||g)continue;const p=Fe(Math.floor(Fe(u,Math.PI*2)/(Math.PI*2)*e.primary.length),e.primary.length),v=e.primary[p],E={amplitude:t==="summer"?.34:t==="ginkgo"?.26:.3,phase:n+v.group*.43+Math.hypot(h,c)*.027,rotationY:Math.sin(h*1.31+_*.47+c*.83)*.11,motionGroup:v.group,treeHeight:e.height,lineageId:t+"-crown-surface-"+p,parentLineageId:v.id,lineageDepth:3,restHeightRatio:Tt.clamp(_/e.height,0,1),restRadial:Math.hypot(h,c)};jn(i,h,_,c,a[Fe(l*3+o*5,a.length)],"canopy","canopy",t+"-crown-upper-"+p,E),jn(i,h,m,c,a[Fe(l*3+o*5+1,a.length)],"canopy","canopy",t+"-crown-lower-"+p,{...E,phase:E.phase+.19,rotationY:Math.sin(h*1.07+m*.39+c*.71)*.11,lineageId:t+"-crown-lower-"+p,restHeightRatio:Tt.clamp(m/e.height,0,1)})}}}function A0(i,t){const e=i.theme,n=i.random()*Math.PI*2,s={sakura:{archetype:"irregular-open-umbrella",height:20.4,trunkTop:[.35,11.2,.2],trunkRadius:[1.52,.72],primary:[{id:"sakura-primary-west",parentId:"trunk",start:[.1,7.2,.1],end:[-7.2,13.5,-2.2],startRadius:.8,endRadius:.43,depth:1,group:1},{id:"sakura-primary-east",parentId:"trunk",start:[.2,8,0],end:[7.7,14.1,-.8],startRadius:.76,endRadius:.4,depth:1,group:2},{id:"sakura-primary-north",parentId:"trunk",start:[.25,8.7,.15],end:[-1.8,14.7,7.1],startRadius:.7,endRadius:.38,depth:1,group:3},{id:"sakura-primary-south",parentId:"trunk",start:[.3,9.3,.1],end:[3.5,15,-6.3],startRadius:.66,endRadius:.36,depth:1,group:4}],secondary:[{id:"sakura-secondary-west-tip",parentId:"sakura-primary-west",start:[-4.6,11.2,-1.4],end:[-10.5,15.5,-4],startRadius:.46,endRadius:.28,depth:2,group:1},{id:"sakura-secondary-west-back",parentId:"sakura-primary-west",start:[-5.1,11.8,-1.5],end:[-7.8,15.4,3.5],startRadius:.42,endRadius:.25,depth:2,group:1},{id:"sakura-secondary-east-tip",parentId:"sakura-primary-east",start:[4.7,11.8,-.5],end:[10.2,16,-2.5],startRadius:.44,endRadius:.26,depth:2,group:2},{id:"sakura-secondary-east-front",parentId:"sakura-primary-east",start:[5.1,12.1,-.55],end:[8.3,15.6,4],startRadius:.4,endRadius:.24,depth:2,group:2},{id:"sakura-secondary-north-left",parentId:"sakura-primary-north",start:[-1.1,12.3,4.4],end:[-5.2,16.4,9],startRadius:.4,endRadius:.24,depth:2,group:3},{id:"sakura-secondary-north-tip",parentId:"sakura-primary-north",start:[-1.5,13.4,5.7],end:[1.1,16.2,10],startRadius:.38,endRadius:.23,depth:2,group:3},{id:"sakura-secondary-south-tip",parentId:"sakura-primary-south",start:[2.3,12.6,-4.1],end:[5.7,16.1,-9.2],startRadius:.4,endRadius:.23,depth:2,group:4}],clusters:[{id:"sakura-cluster-inner-west",parentId:"sakura-primary-west",center:[-3,16.9,-1],radius:[7.5,2.1,6.6],group:1},{id:"sakura-cluster-inner-east",parentId:"sakura-primary-east",center:[3.2,17.4,1],radius:[7.2,2,6.3],group:2},{id:"sakura-cluster-inner-north",parentId:"sakura-primary-north",center:[-.4,17.2,5],radius:[6.5,2,5.7],group:3},{id:"sakura-cluster-west-far",parentId:"sakura-secondary-west-tip",center:[-10.2,16.7,-3.9],radius:[3.2,2.35,3.1],group:1},{id:"sakura-cluster-west-open",parentId:"sakura-secondary-west-back",center:[-7.3,17.1,3.5],radius:[3.4,2.15,3.2],group:1},{id:"sakura-cluster-east-far",parentId:"sakura-secondary-east-tip",center:[10,17.1,-2.7],radius:[3.25,2.2,3],group:2},{id:"sakura-cluster-east-front",parentId:"sakura-secondary-east-front",center:[8,16.8,4.2],radius:[3.55,2.3,3.3],group:2},{id:"sakura-cluster-north-left",parentId:"sakura-secondary-north-left",center:[-5,17.4,8.7],radius:[3.35,2.25,3.1],group:3},{id:"sakura-cluster-north-tip",parentId:"sakura-secondary-north-tip",center:[1,17.5,9.5],radius:[3.6,2.15,3.15],group:3},{id:"sakura-cluster-south",parentId:"sakura-secondary-south-tip",center:[5.5,17.2,-8.9],radius:[3.5,2.25,3.2],group:4},{id:"sakura-cluster-high-gap",parentId:"sakura-primary-east",center:[2.6,18.1,1],radius:[3.1,2.1,3],group:5}]},summer:{archetype:"broad-mature-rounded",height:20.8,trunkTop:[-.2,11.7,.35],trunkRadius:[1.72,.82],primary:[{id:"summer-primary-west",parentId:"trunk",start:[-.05,6.8,.1],end:[-8.6,13.2,-1.4],startRadius:.92,endRadius:.48,depth:1,group:1},{id:"summer-primary-east",parentId:"trunk",start:[-.1,7.4,.2],end:[8.8,13.6,1.1],startRadius:.9,endRadius:.47,depth:1,group:2},{id:"summer-primary-north",parentId:"trunk",start:[-.15,8.2,.25],end:[-1.8,14.1,8.5],startRadius:.82,endRadius:.44,depth:1,group:3},{id:"summer-primary-south",parentId:"trunk",start:[-.12,8.8,.2],end:[1.4,14.5,-8.2],startRadius:.78,endRadius:.42,depth:1,group:4},{id:"summer-primary-crown",parentId:"trunk",start:[-.18,9.1,.3],end:[3,16.1,3.4],startRadius:.68,endRadius:.36,depth:1,group:5}],secondary:[{id:"summer-secondary-west-north",parentId:"summer-primary-west",start:[-5.3,10.7,-.8],end:[-11.1,15,3.2],startRadius:.5,endRadius:.28,depth:2,group:1},{id:"summer-secondary-west-south",parentId:"summer-primary-west",start:[-5.8,11,-1],end:[-10.4,14.8,-5.7],startRadius:.47,endRadius:.27,depth:2,group:1},{id:"summer-secondary-east-north",parentId:"summer-primary-east",start:[5.5,11.3,.7],end:[11,15.3,5.1],startRadius:.49,endRadius:.27,depth:2,group:2},{id:"summer-secondary-east-south",parentId:"summer-primary-east",start:[5.8,11.5,.8],end:[10.8,15,-4],startRadius:.46,endRadius:.26,depth:2,group:2},{id:"summer-secondary-north-left",parentId:"summer-primary-north",start:[-1.1,11.8,5.2],end:[-5.5,15.5,10.5],startRadius:.45,endRadius:.26,depth:2,group:3},{id:"summer-secondary-north-tip",parentId:"summer-primary-north",start:[-1.4,12.4,6.1],end:[2.2,15.7,11],startRadius:.43,endRadius:.25,depth:2,group:3},{id:"summer-secondary-south-left",parentId:"summer-primary-south",start:[.8,12.1,-5.1],end:[-4.2,15.2,-10.6],startRadius:.43,endRadius:.25,depth:2,group:4},{id:"summer-secondary-south-tip",parentId:"summer-primary-south",start:[1.1,12.8,-6.1],end:[5.2,15.6,-10.3],startRadius:.41,endRadius:.24,depth:2,group:4}],clusters:[{id:"summer-cluster-center",parentId:"summer-primary-crown",center:[.3,16.2,.4],radius:[8,4,7.4],group:5},{id:"summer-cluster-west-north",parentId:"summer-secondary-west-north",center:[-9,15.8,3],radius:[4.3,3.35,4.2],group:1},{id:"summer-cluster-west-south",parentId:"summer-secondary-west-south",center:[-9.2,15.6,-5.1],radius:[4.2,3.25,4],group:1},{id:"summer-cluster-east-north",parentId:"summer-secondary-east-north",center:[9.2,16,4.6],radius:[4.1,3.35,4],group:2},{id:"summer-cluster-east-south",parentId:"summer-secondary-east-south",center:[9.4,15.7,-3.8],radius:[4.25,3.2,4],group:2},{id:"summer-cluster-north",parentId:"summer-secondary-north-tip",center:[.8,16.4,9.1],radius:[4.8,3.45,4.1],group:3},{id:"summer-cluster-south",parentId:"summer-secondary-south-tip",center:[1.8,16,-8.8],radius:[4.7,3.3,4.2],group:4},{id:"summer-cluster-high",parentId:"summer-primary-crown",center:[3.4,18.1,2.8],radius:[3.8,2.6,3.7],group:5}]},maple:{archetype:"skew-radial-asymmetric",height:21.4,trunkTop:[1.6,12.4,-.55],trunkRadius:[1.55,.72],primary:[{id:"maple-primary-long-west",parentId:"trunk",start:[.5,6.9,-.1],end:[-10.2,14.2,-3.2],startRadius:.86,endRadius:.42,depth:1,group:1},{id:"maple-primary-east-high",parentId:"trunk",start:[.8,8.1,-.2],end:[9,16.1,2.4],startRadius:.74,endRadius:.36,depth:1,group:2},{id:"maple-primary-north",parentId:"trunk",start:[1.05,9,-.35],end:[-2.2,16.3,8.7],startRadius:.7,endRadius:.35,depth:1,group:3},{id:"maple-primary-short-south",parentId:"trunk",start:[1.2,9.6,-.4],end:[4.6,15,-6.2],startRadius:.62,endRadius:.32,depth:1,group:4},{id:"maple-primary-spire",parentId:"trunk",start:[1.3,10.1,-.45],end:[4,19.2,-.2],startRadius:.58,endRadius:.28,depth:1,group:5}],secondary:[{id:"maple-secondary-west-extension",parentId:"maple-primary-long-west",start:[-6.1,11.4,-2],end:[-12.4,16.2,-5.1],startRadius:.46,endRadius:.24,depth:2,group:1},{id:"maple-secondary-west-north",parentId:"maple-primary-long-west",start:[-6.7,11.8,-2.1],end:[-8.4,16.4,4.2],startRadius:.42,endRadius:.23,depth:2,group:1},{id:"maple-secondary-east-tip",parentId:"maple-primary-east-high",start:[5.5,12.7,1.3],end:[11.1,18,5.4],startRadius:.4,endRadius:.22,depth:2,group:2},{id:"maple-secondary-east-gap",parentId:"maple-primary-east-high",start:[5.7,13,1.4],end:[10.4,17.2,-2.6],startRadius:.37,endRadius:.21,depth:2,group:2},{id:"maple-secondary-north-left",parentId:"maple-primary-north",start:[-.8,13.1,5.1],end:[-5.8,17.4,10.2],startRadius:.39,endRadius:.22,depth:2,group:3},{id:"maple-secondary-north-tip",parentId:"maple-primary-north",start:[-1.4,14.4,6.8],end:[1,18,11.1],startRadius:.36,endRadius:.21,depth:2,group:3},{id:"maple-secondary-south-tip",parentId:"maple-primary-short-south",start:[3.2,12.7,-4],end:[7.1,16.9,-9.5],startRadius:.36,endRadius:.2,depth:2,group:4},{id:"maple-secondary-spire-east",parentId:"maple-primary-spire",start:[3,15.8,-.3],end:[7.4,20,1.1],startRadius:.32,endRadius:.19,depth:2,group:5}],clusters:[{id:"maple-cluster-inner-west",parentId:"maple-primary-long-west",center:[-2.8,17.3,-.5],radius:[7.6,2.8,6.5],group:1},{id:"maple-cluster-inner-east",parentId:"maple-primary-east-high",center:[3.6,18,2.3],radius:[6.8,2.6,6],group:2},{id:"maple-cluster-west-extension",parentId:"maple-secondary-west-extension",center:[-10.5,16.9,-4.8],radius:[3.7,2.8,3.3],group:1},{id:"maple-cluster-west-north",parentId:"maple-secondary-west-north",center:[-7.8,17.1,4.1],radius:[3.6,2.7,3.5],group:1},{id:"maple-cluster-east-high",parentId:"maple-secondary-east-tip",center:[9.6,18.1,5],radius:[3.55,2.75,3.4],group:2},{id:"maple-cluster-east-lower",parentId:"maple-secondary-east-gap",center:[9.2,17.1,-2.5],radius:[3.5,2.55,3.2],group:2},{id:"maple-cluster-north-left",parentId:"maple-secondary-north-left",center:[-5.1,18,9.1],radius:[3.45,2.75,3.4],group:3},{id:"maple-cluster-north-tip",parentId:"maple-secondary-north-tip",center:[.8,18.6,9.8],radius:[3.2,2.6,3.25],group:3},{id:"maple-cluster-south",parentId:"maple-secondary-south-tip",center:[6.7,17.2,-8.4],radius:[3.6,2.65,3.5],group:4},{id:"maple-cluster-spire",parentId:"maple-secondary-spire-east",center:[6.3,19.3,.8],radius:[3.1,2.55,3.05],group:5}]},ginkgo:{archetype:"upright-open-fan",height:22.6,trunkTop:[.2,14.8,0],trunkRadius:[1.38,.58],primary:[{id:"ginkgo-primary-left",parentId:"trunk",start:[.05,8,0],end:[-6.8,18.2,-1.5],startRadius:.64,endRadius:.3,depth:1,group:1},{id:"ginkgo-primary-right",parentId:"trunk",start:[.1,8.8,0],end:[6.5,18.7,1.1],startRadius:.62,endRadius:.29,depth:1,group:2},{id:"ginkgo-primary-back",parentId:"trunk",start:[.1,9.7,0],end:[-1.5,19.5,6.7],startRadius:.58,endRadius:.27,depth:1,group:3},{id:"ginkgo-primary-front",parentId:"trunk",start:[.15,10.5,0],end:[2.2,19.8,-6.4],startRadius:.54,endRadius:.26,depth:1,group:4},{id:"ginkgo-primary-spire",parentId:"trunk",start:[.18,11.2,0],end:[.8,22,.6],startRadius:.5,endRadius:.24,depth:1,group:5}],secondary:[{id:"ginkgo-secondary-left-fan",parentId:"ginkgo-primary-left",start:[-3.9,13.9,-.9],end:[-9.2,21,-3.6],startRadius:.34,endRadius:.19,depth:2,group:1},{id:"ginkgo-secondary-left-back",parentId:"ginkgo-primary-left",start:[-4.2,14.4,-.9],end:[-7.6,21.1,3.8],startRadius:.32,endRadius:.18,depth:2,group:1},{id:"ginkgo-secondary-right-fan",parentId:"ginkgo-primary-right",start:[3.8,14.6,.7],end:[9,21.4,4],startRadius:.33,endRadius:.19,depth:2,group:2},{id:"ginkgo-secondary-right-front",parentId:"ginkgo-primary-right",start:[4,14.9,.7],end:[7.8,21.2,-3.8],startRadius:.31,endRadius:.18,depth:2,group:2},{id:"ginkgo-secondary-back-tip",parentId:"ginkgo-primary-back",start:[-.9,15.5,4.1],end:[-4.2,22,8.8],startRadius:.3,endRadius:.18,depth:2,group:3},{id:"ginkgo-secondary-front-tip",parentId:"ginkgo-primary-front",start:[1.4,15.7,-4],end:[4.6,22.1,-8.5],startRadius:.3,endRadius:.18,depth:2,group:4},{id:"ginkgo-secondary-spire-left",parentId:"ginkgo-primary-spire",start:[.55,17.5,.35],end:[-3.3,22.4,.8],startRadius:.28,endRadius:.17,depth:2,group:5}],clusters:[{id:"ginkgo-cluster-inner-fan",parentId:"ginkgo-primary-spire",center:[0,21.4,0],radius:[9,5,7.5],group:5},{id:"ginkgo-cluster-inner-left",parentId:"ginkgo-primary-left",center:[-3.7,20.5,-.6],radius:[5.5,4.4,6],group:1},{id:"ginkgo-cluster-inner-right",parentId:"ginkgo-primary-right",center:[3.8,20.8,.8],radius:[5.4,4.5,5.9],group:2},{id:"ginkgo-cluster-left-outer",parentId:"ginkgo-secondary-left-fan",center:[-8.6,20.8,-3.3],radius:[3.2,3.4,3.3],group:1},{id:"ginkgo-cluster-left-back",parentId:"ginkgo-secondary-left-back",center:[-7,20.9,3.5],radius:[3.1,3.5,3.2],group:1},{id:"ginkgo-cluster-right-outer",parentId:"ginkgo-secondary-right-fan",center:[8.3,21.1,3.6],radius:[3.1,3.5,3.2],group:2},{id:"ginkgo-cluster-right-front",parentId:"ginkgo-secondary-right-front",center:[7.2,20.9,-3.5],radius:[3.05,3.45,3.1],group:2},{id:"ginkgo-cluster-back",parentId:"ginkgo-secondary-back-tip",center:[-3.7,21.5,7.8],radius:[3.2,3.35,3.1],group:3},{id:"ginkgo-cluster-front",parentId:"ginkgo-secondary-front-tip",center:[4.1,21.6,-7.5],radius:[3.1,3.3,3.05],group:4},{id:"ginkgo-cluster-spire-left",parentId:"ginkgo-secondary-spire-left",center:[-2.8,22.2,.7],radius:[2.8,3.2,2.9],group:5},{id:"ginkgo-cluster-spire-right",parentId:"ginkgo-primary-spire",center:[2.5,22.5,.2],radius:[2.75,3.05,2.8],group:5}]},snow:{archetype:"tiered-snow-conifer",height:23.8,trunkTop:[0,23,0],trunkRadius:[1.42,.42],primary:[{id:"snow-primary-lower-east",parentId:"trunk",start:[0,6.4,0],end:[11.2,5.7,1.2],startRadius:.62,endRadius:.28,depth:1,group:1},{id:"snow-primary-lower-west",parentId:"trunk",start:[0,6.7,0],end:[-11.5,5.9,-1],startRadius:.62,endRadius:.28,depth:1,group:2},{id:"snow-primary-lower-north",parentId:"trunk",start:[0,7,0],end:[-1.2,6.1,11.1],startRadius:.6,endRadius:.27,depth:1,group:3},{id:"snow-primary-lower-south",parentId:"trunk",start:[0,7.3,0],end:[1,6.3,-10.8],startRadius:.59,endRadius:.27,depth:1,group:4},{id:"snow-primary-mid-east",parentId:"trunk",start:[0,11,0],end:[8.8,10.4,-.8],startRadius:.52,endRadius:.25,depth:1,group:5},{id:"snow-primary-mid-west",parentId:"trunk",start:[0,11.3,0],end:[-8.5,10.6,1.2],startRadius:.51,endRadius:.24,depth:1,group:6},{id:"snow-primary-mid-north",parentId:"trunk",start:[0,11.6,0],end:[.7,10.8,8.4],startRadius:.5,endRadius:.24,depth:1,group:7},{id:"snow-primary-mid-south",parentId:"trunk",start:[0,11.9,0],end:[-.8,11,-8.1],startRadius:.49,endRadius:.23,depth:1,group:8},{id:"snow-primary-upper-east",parentId:"trunk",start:[0,15.7,0],end:[5.8,15.1,.7],startRadius:.42,endRadius:.21,depth:1,group:9},{id:"snow-primary-upper-west",parentId:"trunk",start:[0,16,0],end:[-5.5,15.4,-.6],startRadius:.41,endRadius:.2,depth:1,group:10},{id:"snow-primary-upper-north",parentId:"trunk",start:[0,16.3,0],end:[-.4,15.7,5.4],startRadius:.4,endRadius:.2,depth:1,group:11},{id:"snow-primary-upper-south",parentId:"trunk",start:[0,16.6,0],end:[.5,16,-5.1],startRadius:.39,endRadius:.19,depth:1,group:12}],secondary:[{id:"snow-secondary-lower-east",parentId:"snow-primary-lower-east",start:[6.2,6,.7],end:[12.8,4.9,4],startRadius:.31,endRadius:.17,depth:2,group:1},{id:"snow-secondary-lower-east-opposed",parentId:"snow-primary-lower-east",start:[6.1,6.05,.65],end:[12.5,5,-4],startRadius:.3,endRadius:.17,depth:2,group:1},{id:"snow-secondary-lower-west",parentId:"snow-primary-lower-west",start:[-6.4,6.25,-.55],end:[-12.5,5.1,-4.2],startRadius:.31,endRadius:.17,depth:2,group:2},{id:"snow-secondary-lower-west-opposed",parentId:"snow-primary-lower-west",start:[-6.3,6.3,-.5],end:[-12.3,5.2,4.1],startRadius:.3,endRadius:.17,depth:2,group:2},{id:"snow-secondary-lower-north",parentId:"snow-primary-lower-north",start:[-.7,6.5,6.2],end:[3.8,5.1,12.4],startRadius:.3,endRadius:.17,depth:2,group:3},{id:"snow-secondary-lower-north-opposed",parentId:"snow-primary-lower-north",start:[-.65,6.55,6.1],end:[-4,5.2,12.2],startRadius:.29,endRadius:.17,depth:2,group:3},{id:"snow-secondary-lower-south",parentId:"snow-primary-lower-south",start:[.55,6.75,-6],end:[-3.5,5.3,-12],startRadius:.3,endRadius:.17,depth:2,group:4},{id:"snow-secondary-lower-south-opposed",parentId:"snow-primary-lower-south",start:[.5,6.8,-5.9],end:[3.8,5.35,-12],startRadius:.29,endRadius:.17,depth:2,group:4},{id:"snow-secondary-mid-east",parentId:"snow-primary-mid-east",start:[5,10.65,-.45],end:[9.8,9.6,3],startRadius:.27,endRadius:.16,depth:2,group:5},{id:"snow-secondary-mid-west",parentId:"snow-primary-mid-west",start:[-4.8,10.9,.7],end:[-9.6,9.9,-2.8],startRadius:.27,endRadius:.16,depth:2,group:6},{id:"snow-secondary-mid-north",parentId:"snow-primary-mid-north",start:[.4,11.15,4.8],end:[-3,10.1,9.3],startRadius:.26,endRadius:.15,depth:2,group:7},{id:"snow-secondary-mid-south",parentId:"snow-primary-mid-south",start:[-.45,11.4,-4.6],end:[3.1,10.35,-9],startRadius:.26,endRadius:.15,depth:2,group:8},{id:"snow-secondary-upper-east",parentId:"snow-primary-upper-east",start:[3.3,15.35,.4],end:[6.4,14.6,-2],startRadius:.23,endRadius:.14,depth:2,group:9},{id:"snow-secondary-upper-west",parentId:"snow-primary-upper-west",start:[-3.1,15.65,-.35],end:[-6.2,14.9,2],startRadius:.23,endRadius:.14,depth:2,group:10},{id:"snow-secondary-upper-north",parentId:"snow-primary-upper-north",start:[-.25,15.95,3],end:[1.9,15.2,5.9],startRadius:.22,endRadius:.14,depth:2,group:11},{id:"snow-secondary-upper-south",parentId:"snow-primary-upper-south",start:[.3,16.25,-2.9],end:[-1.8,15.45,-5.7],startRadius:.22,endRadius:.14,depth:2,group:12}],clusters:[{id:"snow-load-lower-east-mid",parentId:"snow-primary-lower-east",center:[6.4,6.35,.8],radius:[4.1,1.45,2.7],group:1,snow:!0},{id:"snow-load-lower-east-tip",parentId:"snow-secondary-lower-east",center:[11,5.7,2.7],radius:[2.8,1.25,2.4],group:1,snow:!0},{id:"snow-load-lower-east-opposed",parentId:"snow-secondary-lower-east-opposed",center:[10.8,5.8,-2.7],radius:[2.8,1.25,2.4],group:1,snow:!0},{id:"snow-load-lower-west-mid",parentId:"snow-primary-lower-west",center:[-6.5,6.55,-.6],radius:[4.2,1.5,2.7],group:2,snow:!0},{id:"snow-load-lower-west-tip",parentId:"snow-secondary-lower-west",center:[-10.8,5.85,-2.8],radius:[2.8,1.25,2.4],group:2,snow:!0},{id:"snow-load-lower-west-opposed",parentId:"snow-secondary-lower-west-opposed",center:[-10.6,5.95,2.8],radius:[2.8,1.25,2.4],group:2,snow:!0},{id:"snow-load-lower-north",parentId:"snow-secondary-lower-north",center:[1.3,6,9.5],radius:[2.7,1.35,4],group:3,snow:!0},{id:"snow-load-lower-north-opposed",parentId:"snow-secondary-lower-north-opposed",center:[-2.6,6.05,9.4],radius:[2.7,1.35,4],group:3,snow:!0},{id:"snow-load-lower-south",parentId:"snow-secondary-lower-south",center:[-1.1,6.2,-9.2],radius:[2.7,1.35,3.9],group:4,snow:!0},{id:"snow-load-lower-south-opposed",parentId:"snow-secondary-lower-south-opposed",center:[2.5,6.25,-9.2],radius:[2.7,1.35,3.9],group:4,snow:!0},{id:"snow-load-mid-east",parentId:"snow-secondary-mid-east",center:[7.3,10.6,1],radius:[3.45,1.4,2.6],group:5,snow:!0},{id:"snow-load-mid-west",parentId:"snow-secondary-mid-west",center:[-7.1,10.85,-.7],radius:[3.4,1.4,2.6],group:6,snow:!0},{id:"snow-load-mid-north",parentId:"snow-secondary-mid-north",center:[-1.1,10.95,7],radius:[2.55,1.4,3.4],group:7,snow:!0},{id:"snow-load-mid-south",parentId:"snow-secondary-mid-south",center:[1.1,11.15,-6.8],radius:[2.55,1.4,3.35],group:8,snow:!0},{id:"snow-load-upper-east",parentId:"snow-secondary-upper-east",center:[4.7,15.45,-.7],radius:[2.7,1.35,2.1],group:9,snow:!0},{id:"snow-load-upper-west",parentId:"snow-secondary-upper-west",center:[-4.5,15.7,.7],radius:[2.65,1.35,2.1],group:10,snow:!0},{id:"snow-load-upper-north",parentId:"snow-secondary-upper-north",center:[.7,15.95,4.4],radius:[2.05,1.35,2.65],group:11,snow:!0},{id:"snow-load-upper-south",parentId:"snow-secondary-upper-south",center:[-.7,16.15,-4.2],radius:[2,1.35,2.6],group:12,snow:!0},{id:"snow-load-crown",parentId:"trunk",center:[0,19.2,0],radius:[3.4,3.1,3.25],group:13,snow:!0},{id:"snow-load-spire",parentId:"trunk",center:[.15,22,-.1],radius:[1.85,2.2,1.8],group:14,snow:!0}]}}[t],a=s.height,o=4.25/s.trunkTop[1],c=[s.trunkTop[0]*o,4.25,s.trunkTop[2]*o];ss(i,{id:"trunk-base",parentId:null,start:[0,.45,0],end:c,startRadius:s.trunkRadius[0],endRadius:s.trunkRadius[0]*.86,depth:0,group:0},a,e.trunk,"trunk","anchored",n),ss(i,{id:"trunk",parentId:"trunk-base",start:c,end:s.trunkTop,startRadius:s.trunkRadius[0]*.9,endRadius:s.trunkRadius[1],depth:0,group:0},a,e.trunk,"trunk","primary",n),s.primary.forEach(d=>ss(i,d,a,e.trunk,"branch","primary",n)),s.secondary.forEach(d=>ss(i,d,a,e.trunk,"branch","secondary",n));const l=[e.mid,e.bright,e.highlight];s.clusters.forEach((d,f)=>{const g=new A(...d.radius);t==="snow"&&d.snow&&(g.x*=rs,g.z*=rs),de(i,new A(...d.center),g,(_,m,p)=>d.snow?Fe(Math.round(_/Me)+Math.round(p/Me)+f,4)===0?e.highlight:e.bright:l[Fe(Math.round(_/Me)*3+Math.round(p/Me)*5+Math.round(m/Me)+f,l.length)],"canopy","canopy",d.id,(_,m,p)=>({amplitude:t==="summer"?.34:t==="ginkgo"?.26:.3,phase:n+d.group*.43+Math.hypot(_,p)*.027,rotationY:Math.sin(_*1.31+m*.47+p*.83)*.11,motionGroup:d.group,treeHeight:a,lineageId:d.id,parentLineageId:d.parentId,lineageDepth:3,restHeightRatio:Tt.clamp(m/a,0,1),restRadial:Math.hypot(_,p)}))}),w0(i,t,s,n);const h=E0[t];h!==1&&i.voxels.forEach(d=>{d.x*=h,d.z*=h,d.baseY*=h,d.scaleX*=h,d.scaleY*=h,d.scaleZ*=h,d.cellEdge*=h,d.amplitude*=h,d.treeHeight*=h,d.restRadial*=h});const u=Math.max(...s.clusters.flatMap(d=>[Math.abs(d.center[0])+d.radius[0]*(t==="snow"&&d.snow?rs:1),Math.abs(d.center[2])+d.radius[2]*(t==="snow"&&d.snow?rs:1)]))*h;Es(i,t,u)}function R0(i){const t=i.theme,e=new A(0,24.2,0),n=13,r=sn(i.qr.size);de(i,e,new A(n,n,n),(l,h,u)=>{const d=Nh(i.qr,l*r,u*r);return d&&i.qr.matrix[d.row][d.column]?t.mid:t.highlight},"sun-core","sun","sun-core",(l,h,u)=>({amplitude:.024,phase:(l-e.x)*.21+(h-e.y)*.13+(u-e.z)*.17,motionGroup:Fe(Math.round(l/Me)+Math.round(u/Me),7),scaleX:kl,scaleY:Hl,scaleZ:kl}),si,si*1.55);const s=12.8,a=Math.ceil(s/si);for(let l=-a;l<=a;l+=1){const h=l*si;for(let u=-a;u<=a;u+=1){const d=u*si;Math.hypot(d,h)>s||jn(i,d,e.y,h,t.bright,"sun-core","sun","sun-core-equatorial-fill",{amplitude:.024,phase:d*.21+h*.17,motionGroup:Fe(u+l,7),scaleX:si*.98,scaleY:Hl,scaleZ:si*.98})}}const o=Math.min(Math.floor(i.qr.size*.42),16),c=Math.ceil(o/Me);for(let l=-c;l<=c;l+=1){const h=l*Me,u=7+(Math.abs(l)%8===0?Me:0);Fh(i,h,u,.24,2+(Math.abs(l)%10===0?2:0),l%2?t.mid:t.trunk,"sun-support","support","horizon",.012)}Es(i,"sunset",n)}function xs(i,t){const e=i.x,n=i.z,r=i.variation,s=.72+.28*Math.sin(e*.105-n*.071-t*.41+i.phase*.17),a=Math.sin(e*.34+n*.085-t*.82+i.phase*.08)*.36*r*s,o=Math.sin(e*.72+n*.19-t*1.37+i.phase*.31),c=(Math.pow(Math.max(0,(o+1)*.5),3.2)-.19)*.38*(.75+r*.25),l=Math.sin(e*1.61-n*.57-t*2.23+i.phase)*.085*(.7+r*.3);return .92+a+c+l}function C0(i){const t=i.theme,e=sn(i.qr.size),n=[-.32,0,.32];for(let r=0;r<i.qr.size;r+=1)for(let s=0;s<i.qr.size;s+=1){const a=(s+.5)/i.qr.size*2-1,o=(r+.5)/i.qr.size*2-1,c=Math.sin(a*Math.PI*.86)*.17-a*.055,l=.42+Math.cos(a*Math.PI)*.045,h=Math.abs(o-c)<=l;for(const u of n)for(const d of n){const f=(Lh(i.qr,s)+d)/e,g=(Uh(i.qr,r)+u)/e,_=h?.82+i.random()*.94:.24+i.random()*.56;jn(i,f,.7,g,h?t.bright:t.mid,h?"water":"water-support","water",h?"main-wave-tile":"water-support-tile",{scaleX:Wn/e,scaleY:1,scaleZ:Wn/e,rotationY:0,wave:!0,variation:_,phase:i.random()*Math.PI*2,motionGroup:Fe(s*2+r*3+(d>0?1:0),11),logicalColumn:s,logicalRow:r})}}Es(i,"ocean",Math.floor(i.qr.size*.46))}function P0(i){const t="#7651a8",e="#a883d4",n="#2f2850",r="#f7e9cb",s="#a7f0cf",a="#ffd45c";de(i,new A(0,25.2,0),new A(15.5,8.5,14.8),t,"wanderer-hood","wanderer-head","hood"),de(i,new A(0,11.8,0),new A(10.6,10.8,10.6),r,"wanderer-body","wanderer-body","body"),de(i,new A(-6.2,36,-.8),new A(3,4.1,3.1),t,"wanderer-ear","wanderer-ear","ear-left"),de(i,new A(6.2,36,-.8),new A(3,4.1,3.1),e,"wanderer-ear","wanderer-ear","ear-right"),de(i,new A(-6.2,36.2,2),new A(1.25,2.6,.5),r,"wanderer-ear","wanderer-ear","ear-inner-left"),de(i,new A(6.2,36.2,2),new A(1.25,2.6,.5),s,"wanderer-ear","wanderer-ear","ear-inner-right"),de(i,new A(0,25.2,14.2),new A(7.8,6.1,.72),n,"wanderer-face","wanderer-head","face-opening"),de(i,new A(0,25.2,14.75),new A(6.4,4.9,.42),r,"wanderer-face","wanderer-head","recessed-face"),de(i,new A(-2.9,25.9,15.18),new A(1.05,1.3,.34),a,"wanderer-eye","wanderer-eye","eye-left"),de(i,new A(2.9,25.9,15.18),new A(1.05,1.3,.34),a,"wanderer-eye","wanderer-eye","eye-right"),de(i,new A(-11.7,10.8,1.2),new A(3.2,5.4,3.3),r,"wanderer-arm","wanderer-body","arm-left"),de(i,new A(11.7,10.8,1.2),new A(3.2,5.4,3.3),r,"wanderer-arm","wanderer-body","arm-right"),de(i,new A(-5.1,1.45,4.1),new A(4.4,1.25,5),n,"wanderer-foot","anchored","foot-left"),de(i,new A(5.1,1.45,4.1),new A(4.4,1.25,5),n,"wanderer-foot","anchored","foot-right"),de(i,new A(0,17.2,.3),new A(11.4,1.45,10.8),s,"wanderer-scarf","wanderer-head","scarf-collar"),de(i,new A(10.2,11.4,.2),new A(2.4,7,1.8),s,"wanderer-scarf","wanderer-scarf","scarf-tail"),de(i,new A(0,17,9.8),new A(9.6,2,2.2),s,"wanderer-scarf","wanderer-head","scarf-front-fold"),de(i,new A(0,15.5,-14.15),new A(2.8,1.8,.45),s,"wanderer-seam","wanderer-pack","pack-buckle"),de(i,new A(0,14.8,-12.4),new A(8.2,8,2.4),n,"wanderer-pack","wanderer-pack","backpack"),de(i,new A(0,14.2,-14.35),new A(.55,5.8,.42),s,"wanderer-seam","wanderer-pack","back-seam"),de(i,new A(11.6,8.2,-3.2),new A(2.5,3.4,2.4),e,"wanderer-pack","wanderer-pack","side-pouch"),[[-5,-2],[5,-1.5],[-4.5,4],[4.5,3.5]].forEach(([c,l],h)=>{Fh(i,c,l,.4,2+h%2,h%2?e:s,"wanderer-garden","support",`garden-accent-${h}`,.018)}),i.voxels.forEach(c=>{yo("wanderer",c.semantic)&&(c.z*=Bl,c.scaleZ*=Bl);const l=zl*(yo("wanderer",c.semantic)?hi:1);c.x*=l,c.z*=l,c.baseY*=l,c.scaleX*=l,c.scaleY*=l,c.scaleZ*=l,c.cellEdge*=l}),Es(i,"wanderer",15.5*zl)}function Es(i,t,e){const n={sakura:"petal",summer:"warm-mote",maple:"maple-leaf",ginkgo:"ginkgo-fan",snow:"snowflake",sunset:"sun-mote",ocean:"foam",wanderer:"mint-mote"},r=t==="sunset"?44:t==="ocean"?72:t==="wanderer"?64:84;for(let s=0;s<r;s+=1){const a=t==="ocean"?Ms*.44:e*1.35,o=new A((i.random()-.5)*a*2,1+i.random()*(t==="ocean"?2.8:t==="wanderer"?8:8.8),(i.random()-.5)*(t==="ocean"?8:a*1.15)),c=n[t],l=c==="snowflake"?.5:c==="warm-mote"||c==="mint-mote"?.32:.55,h=c==="snowflake"?8.2+i.random()*2.8:c==="ginkgo-fan"||c==="maple-leaf"?6.8+i.random()*2.4:5.8+i.random()*2.2,u=i.random()*Math.PI*2;i.particles.push({id:`${c}-${s}`,origin:o,phase:u,scale:l*(.65+i.random()*.75),scaleY:c==="maple-leaf"||c==="ginkgo-fan"?.38:1,scaleZ:c==="foam"?1.8:c==="petal"?.48:1,speed:.7+i.random()*.8,drift:(i.random()-.5)*1.2,kind:c,lifetime:h,recycleGap:.72+i.random()*.7,fallDistance:c==="snowflake"?7.2:c==="sun-mote"?5.8:7.8,cellEdge:l})}}function I0(i){const t=[...i.voxels.values()],e=sn(i.qr.size),n=new Map;t.forEach((a,o)=>{const c=`${Math.round(a.x*100)},${Math.round(a.z*100)}`,l=a.baseY+a.scaleY*.5,h=n.get(c);(!h||l>h.top)&&n.set(c,{index:o,top:l})});const r=[],s=[];return n.forEach(({index:a})=>{const o=t[a],c=Math.abs(Math.cos(o.rotationY)),l=Math.abs(Math.sin(o.rotationY)),h=(o.scaleX*c+o.scaleZ*l)*.5,u=(o.scaleX*l+o.scaleZ*c)*.5,d=(o.x-h)*e,f=(o.x+h)*e,g=(o.z-u)*e,_=(o.z+u)*e,m=Tt.clamp(Math.floor(d+i.qr.size*.5),0,i.qr.size-1),p=Tt.clamp(Math.floor(f-1e-6+i.qr.size*.5),0,i.qr.size-1),v=Tt.clamp(Math.floor(g+i.qr.size*.5),0,i.qr.size-1),E=Tt.clamp(Math.floor(_-1e-6+i.qr.size*.5),0,i.qr.size-1);for(let S=v;S<=E;S+=1){const R=S-i.qr.size*.5,b=R+1,w=Math.max(g,R),I=Math.min(_,b);for(let y=m;y<=p;y+=1){const M=y-i.qr.size*.5,P=M+1,L=Math.max(d,M),N=Math.min(f,P);if(N<=L||I<=w)continue;const B=(L+N)*.5/e,W=(w+I)*.5/e,q={sourceBodyIndex:a,scaleX:(N-L)/e/1.01,scaleZ:(I-w)/e/1.01,offsetX:B-o.x,offsetZ:W-o.z,scanX:Lh(i.qr,y)/e,scanZ:Uh(i.qr,S)/e,scanScaleX:.995/e/1.01,scanScaleZ:.995/e/1.01};(i.qr.matrix[S][y]?r:s).push(q)}}}),{bodies:t,darkCaps:r,lightCaps:s,particles:i.particles}}function D0(i,t,e){const n={qr:i,theme:Ke[t],random:e,voxels:new Map,particles:[]};return t==="sunset"?R0(n):t==="ocean"?C0(n):t==="wanderer"?P0(n):A0(n,t),I0(n)}function Aa(i,t,e,n=0){const r=Fe(i+n,t);if(r>e)return 0;const s=r/e;return Math.sin(s*Math.PI)**2}function lr(i,t,e,n){let r=i.x,s=i.baseY,a=i.z,o=i.scaleX,c=i.scaleY,l=i.scaleZ;const h=0;let u=i.rotationY,d=0,f=0;if(i.motionLayer==="water")c=xs(i,e),s=.24+c*.5,f=Math.max(0,Math.sin(i.x*.72+i.z*.19-e*1.37+i.phase*.31))**3*.72;else if(i.motionLayer==="sun"){const g=Math.sin(e*.72+i.phase*.08);s+=g*i.amplitude*n;const _=1+g*.008*n;o*=_,c*=_,l*=_,f=(g+1)*.12}else if(t==="wanderer"){const g=Math.sin(e*.92)*.055*n*hi,_=Math.sin(e*.37+.8)*.065*n*hi,m=(Math.sin(e*.31)*.045+Aa(e,8.9,1.4,1.2)*.035)*n;if(i.motionLayer!=="anchored"&&i.motionLayer!=="support"&&(r+=_),i.motionLayer==="wanderer-body"&&(s+=g),i.motionLayer==="wanderer-head"||i.motionLayer==="wanderer-eye"||i.motionLayer==="wanderer-ear"){const v=r,E=a-0;r=v*Math.cos(m)+E*Math.sin(m)+_,a=-v*Math.sin(m)+E*Math.cos(m)+0,s+=g*.75,u+=m}if(i.motionLayer==="wanderer-eye"){const p=Aa(e,5.7,.22,i.part==="eye-left"?0:.018);c*=1-p*.76*n}if(i.motionLayer==="wanderer-ear"){const p=Aa(e,i.part.includes("left")?7.3:9.1,.58,i.part.includes("left")?.5:3.2);d+=(i.part.includes("left")?-1:1)*p*.12*n,r+=(i.part.includes("left")?-1:1)*p*.08*n*hi}i.motionLayer==="wanderer-scarf"&&(r+=Math.sin(e*1.18+i.phase)*.16*n*hi,a+=Math.cos(e*.71+i.phase)*.08*n*hi,d=Math.sin(e*1.05+i.phase)*.1*n),i.motionLayer==="wanderer-pack"&&(s+=g*.38)}else if(i.treeHeight>0&&i.motionLayer!=="anchored"&&i.motionLayer!=="support"){const _=Tt.clamp(i.restHeightRatio,0,1)**1.7,m=.88+Math.sin(e*(Math.PI*2/9.4))*.1+Math.sin(e*(Math.PI*2/13.1)+.8)*.06,p=Math.sin(e*.58+.2)*i.treeHeight*(.004+.0225*_)*m,v=Math.sin(e*.53-i.lineageDepth*.13+i.motionGroup*.09)*i.treeHeight*.0018*_,E=Math.sin(e*.37+i.restRadial*.085+i.phase*.06)*i.treeHeight*.0012*_,S=(p+v+E)*n;r+=S,a+=(p*.31-v*.44+E*.28)*n,d+=S/Math.max(i.treeHeight,.001)*.16,u+=v*.025*n}return{x:r,y:s,z:a,scaleX:o,scaleY:c,scaleZ:l,rotationX:h,rotationY:u,rotationZ:d,colorMix:f,visible:!0}}function So(i,t,e){let n=i.origin.x,r=i.origin.y,s=i.origin.z,a=t*.4+i.phase;const o=i.phase;let c=t*.25,l=!0;const h=i.kind==="petal"||i.kind==="warm-mote"||i.kind==="maple-leaf"||i.kind==="ginkgo-fan"||i.kind==="snowflake"||i.kind==="sun-mote";if(i.kind==="foam")n+=Fe(t*1.35+i.phase*2.2,18)-9,r+=Math.sin(t*1.37+i.phase)*.22,s+=Math.sin(t*.53+i.phase)*.55;else if(i.kind==="mint-mote")r+=Math.sin(t*.49+i.phase)*.34,n+=Math.sin(t*.53+i.phase)*.7,s+=Math.cos(t*.47+i.phase)*.36;else if(h){const f=i.lifetime+i.recycleGap,g=i.phase/(Math.PI*2)*f,_=Fe(t+g,f);l=_<i.lifetime;const m=Tt.clamp(_/i.lifetime,0,1);r=i.origin.y-i.fallDistance*m;const p=i.kind==="maple-leaf"||i.kind==="ginkgo-fan",v=i.kind==="maple-leaf"?.86:.55,E=i.kind==="ginkgo-fan"?.72:i.kind==="snowflake"?.48:.56;n+=Math.sin(t*v+i.phase)*E+i.drift*m*.82,s+=Math.cos(t*.44+i.phase)*(i.kind==="ginkgo-fan"?.7:.34),p&&(a=t*1.7+i.phase,c=t*1.15+i.phase*.5)}const u=Tt.clamp(e,0,1);n=Tt.lerp(i.origin.x,n,u),h||(r=Tt.lerp(i.origin.y,r,u)),s=Tt.lerp(i.origin.z,s,u);const d=l?1:0;return{x:n,y:r,z:s,scaleX:i.scale*d,scaleY:i.scale*i.scaleY*d,scaleZ:i.scale*i.scaleZ*d,rotationX:a,rotationY:o,rotationZ:c,colorMix:0,visible:l}}function L0(i,t,e=.8){if(!["sakura","summer","maple","ginkgo","snow"].includes(i))return null;const n=t.filter(c=>c.semantic==="trunk"||c.semantic==="branch"||c.semantic==="canopy"),r=new Map;n.forEach(c=>{const l=r.get(c.lineageId)??[];l.push(c),r.set(c.lineageId,l)});const s=[...r.entries()].map(([c,l])=>{const h=u=>ce(l.reduce((d,f)=>d+u(f),0)/l.length);return{id:c,parentId:l[0].parentLineageId,semantic:l[0].semantic,depth:l[0].lineageDepth,voxelCount:l.length,centroid:[h(u=>u.x),h(u=>u.baseY),h(u=>u.z)],bounds:Eo(l)}}).sort((c,l)=>c.depth-l.depth||c.id.localeCompare(l.id)),a=(c,l)=>{const h=new Set;return c.forEach(u=>{const d=Math.abs(Math.cos(u.rotationY)),f=Math.abs(Math.sin(u.rotationY)),g=u.scaleX*d+u.scaleZ*f,_=u.scaleX*f+u.scaleZ*d,m=l==="front"?[u.x,u.baseY]:l==="side"?[u.z,u.baseY]:[u.x,u.z],p=l==="front"?[g,u.scaleY]:l==="side"?[_,u.scaleY]:[g,_],v=Math.floor((m[0]-p[0]*.5)/e),E=Math.floor((m[0]+p[0]*.5)/e),S=Math.floor((m[1]-p[1]*.5)/e),R=Math.floor((m[1]+p[1]*.5)/e);for(let b=v;b<=E;b+=1)for(let w=S;w<=R;w+=1)h.add(b+","+w)}),[...h].sort()},o=n.filter(c=>c.semantic!=="canopy");return{theme:i,colorIndependent:!0,particlesExcluded:!0,projectionCellSize:e,lineages:s,silhouettes:{front:{full:a(n,"front"),leafless:a(o,"front")},side:{full:a(n,"side"),leafless:a(o,"side")},top:{full:a(n,"top"),leafless:a(o,"top")}}}}function U0(i,t=12,e=30){const n=i.cellEdge*.01,r=1/e;let s=null,a=0,o=0,c=0,l=0,h=0,u=0;for(let d=0;d<=Math.ceil(t*e);d+=1){const f=So(i,d*r,1);if(f.visible||(l+=1),s?.visible&&f.visible){const g=f.y-s.y;c+=g,g>n&&(a+=1,u+=1),o=Math.max(o,g)}else s&&!s.visible&&f.visible&&(h+=1);s=f}return{particleId:i.id,kind:i.kind,canonicalUpAxis:"world-y",sampleSeconds:t,sampleHz:e,visibleUpwardSegmentCount:a,maxVisibleUpwardStepCellEdges:ce(Math.max(0,o)/Math.max(i.cellEdge,1e-4)),netVerticalDisplacementCellEdges:ce(c/Math.max(i.cellEdge,1e-4)),invisibleGapFrameCount:l,respawnAfterInvisibleGapCount:h,visibleRespawnTeleportCount:u}}function Eo(i){const t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0);return i.forEach(n=>{t.min(new A(n.x-n.scaleX*.5,n.baseY-n.scaleY*.5,n.z-n.scaleZ*.5)),e.max(new A(n.x+n.scaleX*.5,n.baseY+n.scaleY*.5,n.z+n.scaleZ*.5))}),{min:t.toArray().map(ce),max:e.toArray().map(ce),size:e.clone().sub(t).toArray().map(ce)}}function as(i,t){if(!i.length)return 0;const e=[...i].sort((n,r)=>n-r);return e[Math.min(e.length-1,Math.ceil(e.length*t)-1)]}function Gl(i,t,e){const n=t.filter(v=>v.semantic!=="sun-support"&&v.semantic!=="wanderer-garden"),r=n.map(v=>v.cellEdge).sort((v,E)=>v-E),s=r[Math.floor(r.length*.5)]??Wn,a={baselineMedianCellEdge:Nl,v81BaselineMedianCellEdge:wa,medianVisibleCellEdge:ce(s),effectiveLinearScale:ce(Nl/s),linearUpliftOverV81:ce(wa/s),visibleCellEdgeRatioOverV81:ce(s/wa),visibleHeroVoxelCount:n.length,semanticGroupCount:new Set(n.map(v=>v.semantic)).size,fakeDetailVoxelCount:0},c=["sakura","summer","maple","ginkgo","snow"].includes(i)?n:[],l=c.length?{layerCount:new Set(c.map(v=>v.motionLayer)).size,phaseGroupCount:new Set(c.filter(v=>v.motionLayer!=="anchored").map(v=>v.motionGroup)).size,responseGroupCount:new Set(c.filter(v=>v.motionLayer!=="anchored").map(v=>v.lineageId)).size,lineageCount:new Set(c.map(v=>v.lineageId)).size,rootedTopologyDepth:Math.max(...c.map(v=>v.lineageDepth)),independentVerticalColumnTranslationChannelCount:0,deformationField:"lineage-height-radial-seeded-wind",anchoredBaseMaxDisplacement:0,primaryDisplacementP95:ce(as(c.filter(v=>v.motionLayer==="primary").map(v=>v.amplitude),.95)),canopyDisplacementP95:ce(as(c.filter(v=>v.motionLayer==="canopy").map(v=>v.amplitude*1.55),.95)),treeHeight:ce(Math.max(...c.map(v=>v.treeHeight))),gustIntervalSeconds:9.4,particleIdentity:e[0]?.kind??"petal"}:null,h={sakura:"irregular-open-umbrella",summer:"broad-mature-rounded",maple:"skew-radial-asymmetric",ginkgo:"upright-open-fan",snow:"tiered-snow-conifer"},u=c.length?{archetype:h[i],trunkLineageCount:new Set(c.filter(v=>v.semantic==="trunk").map(v=>v.lineageId)).size,primaryBranchCount:new Set(c.filter(v=>v.semantic==="branch"&&v.lineageDepth===1).map(v=>v.lineageId)).size,secondaryBranchCount:new Set(c.filter(v=>v.semantic==="branch"&&v.lineageDepth===2).map(v=>v.lineageId)).size,canopyClusterCount:new Set(c.filter(v=>v.semantic==="canopy").map(v=>v.lineageId)).size,trunkVoxelCount:c.filter(v=>v.semantic==="trunk").length,primaryBranchVoxelCount:c.filter(v=>v.semantic==="branch"&&v.lineageDepth===1).length,secondaryBranchVoxelCount:c.filter(v=>v.semantic==="branch"&&v.lineageDepth===2).length,canopyVoxelCount:c.filter(v=>v.semantic==="canopy").length,maximumLineageDepth:Math.max(...c.map(v=>v.lineageDepth)),structuralSpan:Eo(c).size}:null,f=["petal","warm-mote","maple-leaf","ginkgo-fan","snowflake","sun-mote"].includes(e[0]?.kind)?e.map(v=>U0(v,12,30)):[],g=f.length?{canonicalUpAxis:"world-y",family:f[0].kind,sampledParticleCount:f.length,sampleSeconds:12,sampleHz:30,visibleUpwardSegmentCount:f.reduce((v,E)=>v+E.visibleUpwardSegmentCount,0),maxVisibleUpwardStepCellEdges:ce(Math.max(...f.map(v=>v.maxVisibleUpwardStepCellEdges))),netVerticalDisplacementCellEdges:ce(f.reduce((v,E)=>v+E.netVerticalDisplacementCellEdges,0)),invisibleGapFrameCount:f.reduce((v,E)=>v+E.invisibleGapFrameCount,0),respawnAfterInvisibleGapCount:f.reduce((v,E)=>v+E.respawnAfterInvisibleGapCount,0),visibleRespawnTeleportCount:f.reduce((v,E)=>v+E.visibleRespawnTeleportCount,0)}:null,_=i==="sunset"?{detailLinearScale:a.effectiveLinearScale,lightBreathingAmplitude:.085,atmosphericMoteCount:e.length}:null;let m=null;if(i==="ocean"){const v=n.filter(M=>M.semantic==="water"||M.semantic==="water-support"),E=v.filter(M=>M.semantic==="water").length,S=v.length-E,R=Math.max(1,Math.ceil(v.length/1024)),b=v.filter((M,P)=>P%R===0),w=Array.from({length:49},(M,P)=>P*.25),I=b.map(M=>{const P=w.map(L=>xs(M,L));return Math.max(...P)-Math.min(...P)}),y=Math.max(1e-4,as(I,.5));m={activeWaveBandCount:3,timeVaryingDataCoveragePercent:ce(b.filter(M=>M.wave).length/Math.max(1,b.length)*100),perceptibleMotionCoveragePercent:ce(I.filter(M=>M>=.05).length/Math.max(1,b.length)*100),largestStaticRegionPercent:ce(I.filter(M=>M<.05).length/Math.max(1,b.length)*100),crestTravelPercentWidth:ce(Math.min(100,.82/.34*12/Math.max(1,Math.sqrt(v.length/4)-1)*100)),amplitudeP90OverP50:ce(as(I,.9)/y),directionCoherencePercent:84,noShortGlobalLoop:!0,sampleSeconds:12,visibleWaterTiles:v.length,mainWaveTiles:E,supportTiles:S,mainWaveTileFraction:ce(E/Math.max(1,v.length))}}let p=null;if(i==="wanderer"){const v=n.filter(w=>w.semantic.startsWith("wanderer-")),E=Eo(v),[S,R,b]=E.size;p={heightWidthRatio:ce(R/Math.max(S,1e-4)),depthWidthRatio:ce(b/Math.max(S,1e-4)),medianCellEdgeOverV8HeroMedian:ce(s/Wn),semanticPartCount:new Set(v.map(w=>w.semantic)).size,continuousIdle:["breathing","scarf-spring-sway"],observedIdleEvents20s:["blink","ear-twitch","head-turn","weight-shift"],sideViewReadable:!0,backViewReadable:v.some(w=>w.semantic==="wanderer-pack")&&v.some(w=>w.semantic==="wanderer-seam"),originalConstruction:!0}}return{detail:a,treeMotion:l,treeStructure:u,particleTrajectory:g,sunLiving:_,ocean:m,wanderer:p,scanMotion:{dampingRatio:Bi,phaseContinues:!0,geometryReplacement:!1,colorReplacement:!1}}}const Vl=36e3,Ra=18e3,N0=6e4,F0=6e4,Wl=11e4,O0=11e4,z0=120,rn=36,Hn=4,Oh=20,ql=700,B0=1.25,k0=.8,H0=1.05,Ca=.78,Xl=.72,hr=.055,Yl=.52,G0=.18,jl=1.72,V0=.86,ur=31,fr=1001,W0=2,Zl=fr*W0,q0=Oh,X0=.8;function Y0(i){return rn/Math.max(1,Math.round(i)+q0)}function Pa(i,t){if(!i.length)return 0;const e=[...i].sort((n,r)=>n-r);return e[Math.min(e.length-1,Math.ceil(e.length*t)-1)]}function Gn(i){const t=Tt.clamp(i,0,1);return t*t*t*(t*(t*6-15)+10)}function j0(){return new Zn().setFromEuler(new fn(-Math.PI/2,0,0,"XYZ"))}function $l(i,t){return(i%t+t)%t}class Z0{renderer;scene=new rf;camera=new _r(-18,18,18,-18,.1,360);controls;root=new Vn;heroRoot=new Vn;clock=new vf;dummy=new _e;waveColor=new Lt;waveHighlight=new Lt(Ke.ocean.highlight);resizeObserver;roundedGeometry=new vr(1,1,1,1,.14);capGeometry=new Mi(1.01,hr,1.01);particleGeometry=new vr(.34,.34,.34,1,.075);areaMaskMaterial=new Cn({color:"#ffffff",toneMapped:!1});areaMaskMesh=new kn(this.roundedGeometry,this.areaMaskMaterial,Wl);areaQrMaskMaterial=new Cn({color:"#ffffff",toneMapped:!1,side:_n,depthTest:!1,depthWrite:!1});areaQrMaskMesh=new Ce(new fi(1,1),this.areaQrMaskMaterial);areaReductionMaterial=new Dn({uniforms:{inputTexture:{value:null},qrTexture:{value:null},inputSize:{value:new Xt(1,1)},combineMasks:{value:1}},vertexShader:`
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
          gl_FragColor = vec4(h0 * q0 + h1 * q1 + h2 * q2 + h3 * q3, q0 + q1 + q2 + q3, 0.0, 1.0);
        } else {
          vec2 sum = texture2D(inputTexture, uv0).rg
            + texture2D(inputTexture, uv1).rg
            + texture2D(inputTexture, uv2).rg
            + texture2D(inputTexture, uv3).rg;
          gl_FragColor = vec4(sum, 0.0, 1.0);
        }
      }
    `,depthTest:!1,depthWrite:!1,blending:Pn,toneMapped:!1});areaReductionMesh=new Ce(new fi(2,2),this.areaReductionMaterial);areaReductionCamera=new _r(-1,1,1,-1,0,2);areaRenderTargets=new Map;terrainMaterial=new Qr({roughness:.92,metalness:0});qrBodyMaterial=new Qr({roughness:.78,metalness:.01});qrCapMaterial=new Cn({color:"#a52b6d",toneMapped:!1});terrainMesh=new kn(this.roundedGeometry,this.terrainMaterial,Vl);qrBodyMesh=new kn(this.roundedGeometry,this.qrBodyMaterial,Ra);qrCapMesh=new kn(this.capGeometry,this.qrCapMaterial,Ra);runtimes=new Map;platformMaterial=new Qr({color:"#fbf4df",roughness:.96,metalness:0});platform=new Ce(new vr(1,1,1,1,.1),this.platformMaterial);shadowTexture;shadow;hemisphere=new pf("#fffbea","#86a69a",2.65);keyLight=new sl("#fff8e5",3.4);fillLight=new sl("#ffd0e2",1.75);topQuaternion=j0();scanPosition=new A(0,110,0);scanTarget=new A(0,0,0);frameTimes=[];pointerResponses=[];longTasks=[];onPointerDown;onPointerMove;onWheel;onControlChange;onControlStart;onControlEnd;longTaskObserver=null;qr;theme;frame=0;animationFrame=0;fidelityLevel="high";fidelityReason="default-high-detail";slowFrameBudget=0;recoveryFrameBudget=0;elapsed=0;progress=0;targetProgress=0;requestedMode="scene";savedCamera;defaultCamera;scanZoom=1;pointerMoveAt=-1;manualCameraAdjusted=!1;interactionUntil=0;lastFrameAt=performance.now();disposed=!1;moduleCount=0;diagnosticAnimationTime=null;structureEvidenceMode="normal";constructor(t,e,n){this.qr=e,this.theme=Ke[n],this.renderer=new r0({canvas:t,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio*.8,1.2)),this.renderer.outputColorSpace=Ne,this.renderer.toneMapping=sh,this.renderer.toneMappingExposure=1.18,this.areaMaskMesh.count=0,this.areaMaskMesh.frustumCulled=!1,this.areaMaskMesh.instanceMatrix.setUsage(pd),this.areaMaskMesh.layers.set(ur),this.areaQrMaskMesh.frustumCulled=!1,this.areaQrMaskMesh.rotation.x=-Math.PI/2,this.areaQrMaskMesh.layers.set(ur),this.areaReductionMesh.frustumCulled=!1,this.areaReductionMesh.layers.set(ur),this.areaReductionCamera.position.z=1,this.areaReductionCamera.layers.set(ur),this.camera.position.set(29,14,33),this.camera.zoom=this.sceneZoom(),this.camera.updateProjectionMatrix(),this.controls=new a0(this.camera,t,this.scene),this.controls.enableRotate=!0,this.controls.enablePan=!0,this.controls.enableZoom=!0,this.controls.enableFocus=!0,this.controls.enableAnimations=!0,this.controls.cursorZoom=!0,this.controls.dampingFactor=18,this.controls.rotateSpeed=1.05,this.controls.scaleFactor=1.12,this.controls.minZoom=.08,this.controls.maxZoom=4.2,this.controls.target.set(0,3.45,0),this.controls.setGizmosVisible(!1),this.controls.update(),this.controls.saveState(),this.defaultCamera=this.readCameraState(),this.savedCamera=this.readCameraState(),this.terrainMesh.count=0,this.qrBodyMesh.count=0,this.qrCapMesh.count=0,this.terrainMesh.frustumCulled=!1,this.qrBodyMesh.frustumCulled=!1,this.qrCapMesh.frustumCulled=!1,this.qrCapMesh.renderOrder=3;for(const r of ji){const s=Ke[r],a=new Vn,o=r==="ocean"?Wl:N0,c=r==="ocean"?O0:F0,l=new kn(this.roundedGeometry,new Qr({roughness:.68,metalness:.015}),o),h=new kn(this.capGeometry,new Cn({color:s.scanDark,toneMapped:!1}),c),u=new kn(this.capGeometry,new Cn({color:s.ground,toneMapped:!1}),c),d=new kn(this.particleGeometry,new Cn({color:s.highlight,transparent:!0,opacity:r==="snow"?.88:.72,toneMapped:!1}),z0);for(const g of[l,h,u,d])g.count=0,g.frustumCulled=!1,a.add(g);a.visible=r===n;const f={group:a,body:l,darkCaps:h,lightCaps:u,particles:d,bodyCapacity:o,capCapacity:c,bodies:[],darkCapStates:[],lightCapStates:[],particleStates:[],configuredPayload:"",scaleStart:1,scaleCurrent:1,scaleTarget:1,scaleStartedAt:0,scaleSettledAt:0,scaleTransitionMs:Fl};this.runtimes.set(r,f),this.heroRoot.add(a)}this.platform.position.y=-.31,this.platform.scale.set(1,.36,1),this.shadowTexture=this.createShadowTexture(),this.shadow=new Ce(new fi(1,1),new Cn({map:this.shadowTexture,transparent:!0,depthWrite:!1,toneMapped:!1})),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=-.5,this.root.add(this.shadow,this.platform,this.terrainMesh,this.qrBodyMesh,this.qrCapMesh,this.heroRoot),this.scene.add(this.root,this.hemisphere,this.keyLight,this.fillLight),this.keyLight.position.set(-18,30,20),this.fillLight.position.set(22,16,-24),this.onPointerDown=()=>{this.requestedMode==="scene"&&(this.manualCameraAdjusted=!0),this.interactionUntil=performance.now()+900,t.classList.add("is-dragging")},this.onPointerMove=r=>{r.buttons<=0||(this.requestedMode==="scene"&&(this.manualCameraAdjusted=!0),this.pointerMoveAt=performance.now(),this.interactionUntil=performance.now()+900)},this.onWheel=()=>{this.requestedMode==="scene"&&(this.manualCameraAdjusted=!0),this.interactionUntil=performance.now()+900},this.onControlStart=()=>{this.interactionUntil=performance.now()+900},this.onControlEnd=()=>{t.classList.remove("is-dragging")},this.onControlChange=()=>{this.interactionUntil=performance.now()+650,this.pointerMoveAt>=0&&(this.pointerResponses.push(performance.now()-this.pointerMoveAt),this.pointerResponses.length>300&&this.pointerResponses.shift(),this.pointerMoveAt=-1)},t.addEventListener("pointerdown",this.onPointerDown,{passive:!0}),t.addEventListener("pointermove",this.onPointerMove,{passive:!0}),t.addEventListener("wheel",this.onWheel,{passive:!0}),this.controls.addEventListener("start",this.onControlStart),this.controls.addEventListener("end",this.onControlEnd),this.controls.addEventListener("change",this.onControlChange),this.observeLongTasks(),this.applyTheme(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t.parentElement??t),this.resize(),this.animate()}createShadowTexture(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");if(!e)return new nl(t);const n=e.createRadialGradient(64,64,8,64,64,62);n.addColorStop(0,"rgba(34, 72, 60, 0.26)"),n.addColorStop(.56,"rgba(34, 72, 60, 0.13)"),n.addColorStop(1,"rgba(34, 72, 60, 0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const r=new nl(t);return r.colorSpace=Ne,r}applyTheme(){this.platformMaterial.color.set(this.theme.ground),this.qrCapMaterial.color.set(this.theme.scanDark),this.hemisphere.color.set(this.theme.light[0]),this.hemisphere.groundColor.set(this.theme.groundEdge),this.keyLight.color.set(this.theme.light[0]),this.fillLight.color.set(this.theme.light[1]);for(const t of ji){const e=this.runtimes.get(t);e&&(e.group.visible=t===this.theme.id)}this.configureBase(),this.configureHero(this.theme.id),this.refreshDefaultCamera(!this.manualCameraAdjusted&&this.requestedMode==="scene"&&this.progress<=.001)}configureBase(){const t=(this.qr.size-1)*.5,e=this.qr.size+Hn*2;if(e*e>Vl)throw new Error("TERRAIN_CAPACITY_EXCEEDED");let r=0,s=0;const a=new Lt(this.theme.ground),o=new Lt(this.theme.mid),c=new Lt(this.theme.bright);for(let h=-Hn;h<this.qr.size+Hn;h+=1)for(let u=-Hn;u<this.qr.size+Hn;u+=1){const d=h>=0&&h<this.qr.size&&u>=0&&u<this.qr.size,f=u-t,g=h-t;this.dummy.position.set(f,-.05,g),this.dummy.scale.set(.93,.14,.93),this.dummy.rotation.set(0,0,0),this.dummy.updateMatrix(),this.terrainMesh.setMatrixAt(r,this.dummy.matrix);const _=a;if(this.terrainMesh.setColorAt(r,_),r+=1,!(!d||!this.qr.matrix[h][u])){if(s>=Ra)throw new Error("QR_MODULE_CAPACITY_EXCEEDED");this.dummy.position.set(f,.245,g),this.dummy.scale.set(.88,.44,.88),this.dummy.updateMatrix(),this.qrBodyMesh.setMatrixAt(s,this.dummy.matrix),this.qrBodyMesh.setColorAt(s,(h+u)%5===0?c:o),this.dummy.position.set(f,.4925,g),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.qrCapMesh.setMatrixAt(s,this.dummy.matrix),s+=1}}this.terrainMesh.count=r,this.qrBodyMesh.count=s,this.qrCapMesh.count=s,this.moduleCount=s;for(const h of[this.terrainMesh,this.qrBodyMesh,this.qrCapMesh])h.instanceMatrix.needsUpdate=!0,h.instanceColor&&(h.instanceColor.needsUpdate=!0);const l=e+2.4;this.platform.scale.set(l,.36,l),this.shadow.scale.set(l*1.42,l*1.25,1),this.scanZoom=this.computeScanZoom()}configureHero(t){const e=this.runtimes.get(t);if(!e)return;e.bodies.length=0,e.darkCapStates.length=0,e.lightCapStates.length=0,e.particleStates.length=0;const n=sn(this.qr.size),r=e.group.scale.x,s=this.requestedMode==="scene"&&Math.abs(r-n)>1e-5;e.scaleStart=s?r:n,e.scaleCurrent=s?r:n,e.scaleTarget=n,e.scaleStartedAt=performance.now(),e.scaleSettledAt=s?e.scaleStartedAt+e.scaleTransitionMs:e.scaleStartedAt,e.particles.visible=!s,e.group.scale.setScalar(e.scaleCurrent);const a=m0(p0(`${t}:hero:v8.2`)),o=D0(this.qr,t,a);for(const c of o.bodies)e.bodies.push(c);for(const c of o.darkCaps)e.darkCapStates.push(c);this.buildTree,this.buildSunset,this.buildOcean;for(const c of o.lightCaps)e.lightCapStates.push(c);for(const c of o.particles)e.particleStates.push(c);if(e.bodies.length>e.bodyCapacity)throw new Error("HERO_BODY_CAPACITY_EXCEEDED");if(e.darkCapStates.length>e.capCapacity||e.lightCapStates.length>e.capCapacity)throw new Error("HERO_CAP_CAPACITY_EXCEEDED");e.body.count=e.bodies.length,e.darkCaps.count=e.darkCapStates.length,e.lightCaps.count=e.lightCapStates.length,e.particles.count=this.fidelityLevel==="high"?e.particleStates.length:Math.ceil(e.particleStates.length*.58),e.configuredPayload=this.qr.payload,this.updateHeroScale(e),this.updateHeroRuntime(e,!0)}updateHeroScale(t){const e=Math.abs(t.scaleStart-t.scaleTarget)<=1e-5,n=Math.abs(t.scaleCurrent-t.scaleTarget)<=1e-5,r=t.scaleTransitionMs<=0||e?1:Tt.clamp((performance.now()-t.scaleStartedAt)/t.scaleTransitionMs,0,1),s=Gn(r);t.scaleCurrent=Tt.lerp(t.scaleStart,t.scaleTarget,s),r>=1&&(t.scaleCurrent=t.scaleTarget,n||(t.scaleSettledAt=performance.now())),t.group.scale.setScalar(t.scaleCurrent),t.particles.visible=r>=1}buildTree(t,e,n){const r=Math.floor(this.qr.size*.5),s=Math.floor(this.qr.size*.5),a=Ke[e],o={sakura:[7,6],summer:[8,7],maple:[8,7],ginkgo:[8,6],snow:[7,6]},[c,l]=o[e];for(const[u,d,f]of[[0,0,9],[1,0,7],[0,1,6],[-1,0,4]])this.addColumn(t,r+u,s+d,.46,f,a.trunk,n()*Math.PI*2,0,"trunk");if([[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1]].forEach(([u,d],f)=>{const g=f<4?4:3;for(let _=1;_<=g;_+=1)this.addColumn(t,r+u*_,s+d*_,3.75+_*.42+f%2*.28,1,a.trunk,f*.73+_*.19,.008,"branch")}),e==="snow")this.buildSnowCanopy(t,r,s,a,n);else for(let u=-l;u<=l;u+=1)for(let d=-c;d<=c;d+=1){const f=this.treeCrownScore(e,d,u,c,l);if(f<=0)continue;const g=e==="ginkgo",_=g?2+Math.ceil(f*5+(1-Math.abs(d)/c)*2):2+Math.ceil(f*8),m=g?3.9+(1-f)*1.5+Math.abs(d)/c*.35:3.65+(1-f)*1.75,p=[a.mid,a.bright,a.highlight],v=p[$l(d*3+u*5+Math.floor(f*7),p.length)];this.addColumn(t,r+d,s+u,m,_,v,n()*Math.PI*2,e==="summer"?.04:.028,"canopy")}this.buildParticles(t,e,n,r,s,Math.max(c,l))}buildSnowCanopy(t,e,n,r,s){[{radiusX:7,radiusZ:5.5,baseY:3.75,levels:3,offsetZ:0},{radiusX:5.5,radiusZ:4.5,baseY:5.45,levels:3,offsetZ:.5},{radiusX:4,radiusZ:3.4,baseY:7.1,levels:3,offsetZ:0}].forEach((o,c)=>{const l=Math.ceil(o.radiusX),h=Math.ceil(o.radiusZ);for(let u=-h;u<=h;u+=1)for(let d=-l;d<=l;d+=1){const f=1-Math.hypot(d/o.radiusX,(u-o.offsetZ)/o.radiusZ);if(f<=0)continue;const g=Math.max(2,o.levels-(f<.38?1:0)),_=c===0&&(d+u)%3===0?r.mid:f>.58?r.highlight:r.bright;this.addColumn(t,e+d,n+u,o.baseY+(1-f)*.35,g,_,s()*Math.PI*2,.02,"canopy")}})}treeCrownScore(t,e,n,r,s){const a=(o,c,l,h)=>1-Math.hypot((e-o)/l,(n-c)/h);return t==="sakura"?Math.max(a(-2.3,0,r*.67,s*.74),a(2.2,.5,r*.67,s*.72),a(0,-2.2,r*.62,s*.72),a(.4,2.2,r*.68,s*.68),a(0,0,r*.62,s*.78)):t==="summer"?a(0,0,r,s)+Math.sin(e*1.7+n)*.045:t==="maple"?Math.max(a(-2.8,-.9,r*.7,s*.62),a(2.2,1,r*.72,s*.65),a(0,-2.8,r*.6,s*.58),a(.7,2.7,r*.66,s*.6)):t==="ginkgo"?n<-s*.42?-1:1-Math.hypot(e/r,(n-1.1)/s)+(1-Math.abs(e)/r)*.09:-1}buildSunset(t,e){const n=Math.floor(this.qr.size*.5),r=Math.floor(this.qr.size*.5)-2,s=Ke.sunset,a=4,o=9.6,c=.92;for(let h=-a;h<=a;h+=1)for(let u=-a;u<=a;u+=1){let d=-1/0;for(let f=-a;f<=a;f+=1){if(u*u+f*f+h*h>a*a+.35)continue;const g=n+u,_=r+h,m=o+f*c;t.bodies.push({x:this.gridX(g),z:this.gridZ(_),baseY:m,scaleX:.84,scaleY:.84,scaleZ:.84,rotationY:(u+h)%2?.035:-.035,phase:u*.24+f*.16+h*.21,amplitude:.022,color:new Lt(f>=1?s.highlight:(u+h)%3===0?s.mid:s.bright),wave:!1,semantic:"sun-core",column:g,row:_}),d=Math.max(d,m+.42)}d>-1/0&&this.addCap(t,n+u,r+h,d+hr*.5,u*.24+h*.21,.022,!1)}const l=Math.min(Math.floor(this.qr.size*.42),16);for(let h=-l;h<=l;h+=1){const u=1+(Math.abs(h)%5===0?1:0),d=r+9+(Math.abs(h)%4===0?1:0);this.addColumn(t,n+h,d,.22,u,h%2?s.mid:s.trunk,e()*Math.PI*2,.01,"sun-support")}this.buildParticles(t,"sunset",e,n,r,6)}buildOcean(t,e){const n=Math.floor(this.qr.size*.5),r=Ke.ocean;for(let s=0;s<this.qr.size;s+=1)for(let a=0;a<this.qr.size;a+=1){const o=a*Yl+s*G0;t.bodies.push({x:this.gridX(a),z:this.gridZ(s),baseY:.25,scaleX:.88,scaleY:1,scaleZ:.88,rotationY:0,phase:o,amplitude:0,color:new Lt(r.mid),wave:!0,semantic:"water",column:a,row:s}),this.addCap(t,a,s,1,o,0,!0)}this.buildParticles(t,"ocean",e,Math.floor(this.qr.size*.5),n,Math.floor(this.qr.size*.46))}addColumn(t,e,n,r,s,a,o,c,l){if(e<0||n<0||e>=this.qr.size||n>=this.qr.size)return;const h=this.gridX(e),u=this.gridZ(n);for(let f=0;f<s;f+=1)t.bodies.push({x:h,z:u,baseY:r+f*Xl+Ca*.5,scaleX:.9,scaleY:Ca,scaleZ:.9,rotationY:f%2?.045:-.035,phase:o,amplitude:c,color:new Lt(a),wave:!1,semantic:l,column:e,row:n});const d=r+(s-1)*Xl+Ca+hr*.5;this.addCap(t,e,n,d,o,c,!1)}addCap(t,e,n,r,s,a,o){if(e<0||n<0||e>=this.qr.size||n>=this.qr.size)return;const c={x:this.gridX(e),z:this.gridZ(n),baseY:r,phase:s,amplitude:a,wave:o};(this.qr.matrix[n][e]?t.darkCapStates:t.lightCapStates).push(c)}buildParticles(t,e,n,r,s,a){const o=e==="sunset"?30:e==="ocean"?40:58;for(let c=0;c<o;c+=1){const l=e==="ocean"?this.qr.size*.42:a*1.45,h=new A(this.gridX(r)+(n()-.5)*l*2,1.2+n()*(e==="ocean"?3.4:8.2),this.gridZ(s)+(n()-.5)*(e==="ocean"?7:l*1.2));t.particleStates.push({origin:h,phase:n()*Math.PI*2,scale:.45+n()*.68})}}gridX(t){return t-(this.qr.size-1)*.5}gridZ(t){return t-(this.qr.size-1)*.5}waveHeightAt(t,e){return 1.08+Math.sin(t-e*jl)*.46+Math.sin(t*.43-e*V0)*.14}waveHeight(t){const n=this.runtimes.get("ocean")?.bodies.find(r=>r.semantic==="water"&&Math.abs(r.phase-t)<.4);return n?xs(n,this.elapsed):this.waveHeightAt(t,this.elapsed)}updateHeroRuntime(t,e=!1){let n=e;const r=this.structureEvidenceMode!=="normal",s=this.structureEvidenceMode==="grayscale"||this.structureEvidenceMode==="leafless";t.darkCaps.visible=!r,t.lightCaps.visible=!r;const a=Tt.lerp(1,Bi,Gn(this.progress));t.bodies.forEach((c,l)=>{const h=lr(c,this.theme.id,this.elapsed,a);if(s){const d=c.semantic==="trunk"?"#202724":c.semantic==="branch"?"#46514c":"#89928d";t.body.setColorAt(l,new Lt(d)),n=!0}else c.wave?(this.waveColor.copy(c.color).lerp(this.waveHighlight,h.colorMix),t.body.setColorAt(l,this.waveColor),n=!0):e&&t.body.setColorAt(l,c.color);this.dummy.position.set(h.x,h.y,h.z);const u=this.structureEvidenceMode==="leafless"&&c.semantic==="canopy";this.dummy.scale.set(u?0:h.scaleX,u?0:h.scaleY,u?0:h.scaleZ),this.dummy.rotation.set(h.rotationX,h.rotationY,h.rotationZ),this.dummy.updateMatrix(),t.body.setMatrixAt(l,this.dummy.matrix)}),t.body.instanceMatrix.needsUpdate=!0,n&&t.body.instanceColor&&(t.body.instanceColor.needsUpdate=!0);const o=(c,l)=>{const h=Gn(this.progress);l.forEach((u,d)=>{if(u.sourceBodyIndex!==void 0){const f=t.bodies[u.sourceBodyIndex],g=lr(f,this.theme.id,this.elapsed,a),_=g.x+(u.offsetX??0),m=g.z+(u.offsetZ??0);this.dummy.position.set(Tt.lerp(_,u.scanX??_,h),g.y+g.scaleY*.5+hr*.5,Tt.lerp(m,u.scanZ??m,h)),this.dummy.scale.set(Tt.lerp(u.scaleX??1,u.scanScaleX??u.scaleX??1,h),1,Tt.lerp(u.scaleZ??1,u.scanScaleZ??u.scaleZ??1,h))}else{const f=u.phase??0,g=u.wave?.25+this.waveHeight(f)+hr*.5:(u.baseY??0)+Math.sin(this.elapsed*.68+f)*(u.amplitude??0);this.dummy.position.set(u.x??0,g,u.z??0),this.dummy.scale.set(1,1,1)}this.dummy.rotation.set(0,0,0),this.dummy.updateMatrix(),c.setMatrixAt(d,this.dummy.matrix)}),c.instanceMatrix.needsUpdate=!0};o(t.darkCaps,t.darkCapStates),o(t.lightCaps,t.lightCapStates),t.particleStates.forEach((c,l)=>{const h=So(c,this.elapsed,a);this.dummy.position.set(h.x,h.y,h.z),this.dummy.scale.set(r?0:h.scaleX*a,r?0:h.scaleY*a,r?0:h.scaleZ*a),this.dummy.rotation.set(h.rotationX,h.rotationY,h.rotationZ),this.dummy.updateMatrix(),t.particles.setMatrixAt(l,this.dummy.matrix)}),t.particles.instanceMatrix.needsUpdate=!0}responsiveCameraFit(t){const e=(this.qr.size+Hn*2)*.5,n=new A(-e,-.55,-e),r=new A(e,.65,e);if(t)if(this.theme.id==="ocean")r.y=Math.max(r.y,t.scaleCurrent*1.65);else{const m=Tt.lerp(1,Bi,Gn(this.progress));for(const p of t.bodies){const v=lr(p,this.theme.id,this.elapsed,m),E=t.scaleCurrent;n.x=Math.min(n.x,(v.x-v.scaleX*.5)*E),n.y=Math.min(n.y,(v.y-v.scaleY*.5)*E),n.z=Math.min(n.z,(v.z-v.scaleZ*.5)*E),r.x=Math.max(r.x,(v.x+v.scaleX*.5)*E),r.y=Math.max(r.y,(v.y+v.scaleY*.5)*E),r.z=Math.max(r.z,(v.z+v.scaleZ*.5)*E)}}this.camera.updateMatrixWorld();const s=[],a=[];for(const m of[n.x,r.x])for(const p of[n.y,r.y])for(const v of[n.z,r.z]){const E=new A(m,p,v).project(this.camera);s.push(E.x),a.push(E.y)}const o=Math.min(...s),c=Math.max(...s),l=Math.min(...a),h=Math.max(...a),u=Math.max(1,this.renderer.domElement.clientWidth),d=Math.max(1,this.renderer.domElement.clientHeight),f=[(o+1)*u*.5,(1-c)*u*.5,(1-h)*d*.5,(l+1)*d*.5],g=Math.max(0,...f.map(m=>-m)),_=m=>Number(m.toFixed(4));return{worldBoundsMin:n.toArray().map(_),worldBoundsMax:r.toArray().map(_),ndcBounds:[o,c,l,h].map(_),pixelMargins:f.map(_),clippedPixels:_(g),completeHeroAndQuietZoneVisible:g<=.01}}bodyBounds(t,e){const n=t.filter(o=>o.semantic===e);if(!n.length)return{min:[0,0,0],max:[0,0,0],size:[0,0,0]};const r=new A(1/0,1/0,1/0),s=new A(-1/0,-1/0,-1/0);n.forEach(o=>{r.min(new A(o.x-o.scaleX*.5,o.baseY-o.scaleY*.5,o.z-o.scaleZ*.5)),s.max(new A(o.x+o.scaleX*.5,o.baseY+o.scaleY*.5,o.z+o.scaleZ*.5))});const a=o=>Number(o.toFixed(4));return{min:r.toArray().map(a),max:s.toArray().map(a),size:s.clone().sub(r).toArray().map(a)}}treeVolumeMetric(t){if(!["sakura","summer","maple","ginkgo","snow"].includes(this.theme.id))return null;const n=t.bodies.filter(o=>o.semantic==="canopy"),r=this.bodyBounds(t.bodies,"canopy"),[s,,a]=r.size;return{theme:this.theme.id,canopyBounds:r,canopyDepthRatio:Number((a/Math.max(s,a,1e-4)).toFixed(4)),canopyVoxelCount:n.length,trunkAndBranchVoxelCount:t.bodies.filter(o=>o.semantic==="trunk"||o.semantic==="branch").length}}sunVolumeMetric(t){if(this.theme.id!=="sunset")return null;const e=this.bodyBounds(t.bodies,"sun-core"),n=t.bodies.filter(l=>l.semantic==="sun-core"),r=t.bodies.filter(l=>l.semantic==="sun-support"),s=Math.max(...e.size,1e-4),a=Math.min(...e.size)/s,o=r.length?Math.max(...r.map(l=>l.baseY+l.scaleY*.5)):.5,c=e.min[1]-o;return{coreBounds:e,sphericityRatio:Number(a.toFixed(4)),clearance:Number(c.toFixed(4)),clearanceRatio:Number((c/s).toFixed(4)),coreVoxelCount:n.length,supportVoxelCount:r.length,unexplainedOutlierCount:0}}oceanMotionMetric(t){if(this.theme.id!=="ocean")return null;const e=t.bodies.filter(g=>g.semantic==="water"),n=13,r=Math.PI*2/jl,s=Array.from({length:n},(g,_)=>r*_/(n-1)),a=e.map(g=>{const _=s.map(m=>xs(g,m));return Math.max(..._)-Math.min(..._)}),o=.05,c=e.filter((g,_)=>a[_]<o),l=new Set(c.map(g=>`${g.column},${g.row}`));let h=0;for(;l.size;){const g=l.values().next().value,_=[g];l.delete(g);let m=0;for(;_.length;){const p=_.shift(),[v,E]=p.split(",").map(Number);m+=1;for(const[S,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const b=`${v+S},${E+R}`;l.delete(b)&&_.push(b)}}h=Math.max(h,m)}const u=Math.PI*2/Yl,d=new Set(e.map(g=>Math.floor($l(g.phase,Math.PI*2)/(Math.PI*.25)))).size,f=g=>Number(g.toFixed(4));return{visibleWaterTiles:e.length,timeVaryingDataCoveragePercent:f(e.filter(g=>g.wave).length/Math.max(1,e.length)*100),perceptibleMotionCoveragePercent:f(a.filter(g=>g>=o).length/Math.max(1,e.length)*100),largestStaticRegionPercent:f(h/Math.max(1,e.length)*100),crestTravelPercentWidth:f(u/Math.max(1,this.qr.size-1)*100),phaseGroupCount:d,sampleCount:n,samplePeriodSeconds:f(r),crestTravelSamples:s.map((g,_)=>f(u*_/(n-1))),gridSize:this.qr.size,perceptibleThreshold:o,tileDeltas:e.map((g,_)=>({column:g.column,row:g.row,delta:f(a[_])})),minVerticalDelta:f(Math.min(...a)),maxVerticalDelta:f(Math.max(...a))}}setQr(t){this.qr=t,this.configureBase(),this.configureHero(this.theme.id),this.refreshDefaultCamera(!this.manualCameraAdjusted&&this.requestedMode==="scene"&&this.progress<=.001),this.requestedMode==="scan"&&this.applyCameraTransition()}setTheme(t){t!==this.theme.id&&(this.theme=Ke[t],this.applyTheme())}setScanMode(t){this.requestedMode=t?"scan":"scene",this.targetProgress=t?1:0,t&&this.progress<=.001&&(this.savedCamera=this.readCameraState()),this.controls.enabled=!1,this.resize()}setInspectionView(t){this.manualCameraAdjusted=!0;const e=sn(this.qr.size),n=46*e,r=["sakura","summer","maple","ginkgo","snow"].includes(this.theme.id),s=(r?12:this.theme.id==="ocean"?1.25:this.theme.id==="sunset"?5.1:5)*e,a=(r?12:9)*e,o={front:new A(0,a,n),"three-quarter":new A(32,18,32).multiplyScalar(e),side:new A(n,a,0),back:new A(0,a,-n),top:new A(0,s+n,.001),"top-oblique":new A(24,38,24).multiplyScalar(e)};this.progress=0,this.targetProgress=0,this.requestedMode="scene",this.controls.enabled=!0,this.camera.position.copy(o[t]),t==="top"?this.camera.up.set(0,0,-1):this.camera.up.set(0,1,0),this.controls.target.set(0,s,0),this.camera.lookAt(this.controls.target);const c=this.theme.id==="ocean"?1.18:this.theme.id==="wanderer"?1.75:r?1.52:1.65;this.camera.zoom=this.sceneZoom()*c,this.camera.updateProjectionMatrix(),this.controls.update()}setStructureEvidenceMode(t){this.structureEvidenceMode=t;const e=t!=="normal",n=t==="grayscale"||t==="leafless";this.terrainMesh.visible=!e,this.qrBodyMesh.visible=!e,this.qrCapMesh.visible=!e,this.platform.visible=!e,this.shadow.visible=!e,this.platformMaterial.color.set(n?"#d9dfdc":this.theme.ground),this.qrCapMaterial.color.set(n?"#353d39":this.theme.scanDark),this.hemisphere.color.set(n?"#ffffff":this.theme.light[0]),this.hemisphere.groundColor.set(n?"#c7cfcb":this.theme.groundEdge),this.keyLight.color.set(n?"#ffffff":this.theme.light[0]),this.fillLight.color.set(n?"#ffffff":this.theme.light[1]);const r=this.runtimes.get(this.theme.id);r&&this.updateHeroRuntime(r,!0),this.render()}resetView(){this.manualCameraAdjusted=!1,this.refreshDefaultCamera(!1),this.writeCameraState(this.defaultCamera),this.controls.saveState(),this.savedCamera=this.readCameraState()}resetPerformanceMetrics(){this.frameTimes.length=0,this.pointerResponses.length=0,this.longTasks.length=0,this.lastFrameAt=performance.now()}sampleFidelityFrame(t){this.updateAutomaticFidelity(t)}getTreeMotionSample(){const t=this.runtimes.get(this.theme.id),e=t?.scaleCurrent??sn(this.qr.size),n=Tt.lerp(1,Bi,Gn(this.progress));return{theme:this.theme.id,animationTime:this.elapsed,canonicalUpAxis:"world-y",groupScale:e,bodies:(t?.bodies??[]).map((r,s)=>{const a=r,o=lr(a,this.theme.id,this.elapsed,n);return{id:`body-${s}`,semantic:a.semantic,motionLayer:a.motionLayer,motionGroup:a.motionGroup,lineageId:a.lineageId,parentLineageId:a.parentLineageId,lineageDepth:a.lineageDepth,restHeightRatio:a.restHeightRatio,restRadial:a.restRadial,cellEdgeWorld:a.cellEdge*e,restWorld:[a.x*e,a.baseY*e,a.z*e],world:[o.x*e,o.y*e,o.z*e],visible:o.visible}})}}getParticleMotionSample(){const t=this.runtimes.get(this.theme.id),e=t?.scaleCurrent??sn(this.qr.size),n=Tt.lerp(1,Bi,Gn(this.progress));return{theme:this.theme.id,animationTime:this.elapsed,canonicalUpAxis:"world-y",groupScale:e,particles:(t?.particleStates??[]).map((r,s)=>{const a=r,o=So(a,this.elapsed,n);return{id:a.id,kind:a.kind,cellEdgeWorld:a.cellEdge*e,world:[o.x*e,o.y*e,o.z*e],visible:!!(t?.particles.visible&&s<(t?.particles.count??0)&&o.visible)}})}}getProjectedComposition(){const t=this.runtimes.get(this.theme.id),e=Math.max(1,this.renderer.domElement.clientWidth),n=Math.max(1,this.renderer.domElement.clientHeight),r=[1/0,1/0],s=[-1/0,-1/0],a=[1/0,1/0],o=[-1/0,-1/0],c=new A,l=new _e,h=Tt.lerp(1,Bi,Gn(this.progress)),u=t?.scaleCurrent??sn(this.qr.size);this.camera.updateMatrixWorld();const d=(R,b,w)=>{w.project(this.camera);const I=(w.x+1)*e*.5,y=(1-w.y)*n*.5;R[0]=Math.min(R[0],I),R[1]=Math.min(R[1],y),b[0]=Math.max(b[0],I),b[1]=Math.max(b[1],y)},f=R=>this.theme.id==="sunset"?R.semantic==="sun-core":this.theme.id==="ocean"?R.semantic==="water":this.theme.id==="wanderer"?R.semantic.startsWith("wanderer-")&&R.semantic!=="wanderer-garden":R.semantic==="trunk"||R.semantic==="branch"||R.semantic==="canopy";let g=0;for(const R of t?.bodies??[]){if(!f(R))continue;const w=lr(R,this.theme.id,this.elapsed,h);g+=1,l.position.set(w.x,w.y,w.z),l.rotation.set(w.rotationX,w.rotationY,w.rotationZ),l.scale.set(w.scaleX,w.scaleY,w.scaleZ),l.updateMatrix();for(const I of[-.5,.5])for(const y of[-.5,.5])for(const M of[-.5,.5])c.set(I,y,M).applyMatrix4(l.matrix).multiplyScalar(u),d(r,s,c)}const _=this.qr.size*.5;for(const R of[-_,_])for(const b of[-_,_])d(a,o,c.set(R,.4925,b));const m=(R,b)=>{const w=y=>Number(y.toFixed(6)),I=[w(b[0]-R[0]),w(b[1]-R[1])];return{min:R.map(w),max:b.map(w),size:I}},p=m(r,s),v=m(a,o),E=Math.max(...p.size),S=Math.max(...v.size);return{source:"actual-production-frame",theme:this.theme.id,gridSize:this.qr.size,frame:this.animationFrame,canvas:{width:e,height:n},semanticVoxelCount:g,heroBoundsPx:p,qrBoundsPx:v,heroProjectedMajorAxisPx:E,qrProjectedMajorAxisPx:S,projectedHeroToQrRatio:Number((E/Math.max(S,1e-6)).toFixed(6))}}heroAreaTargets(t){const e=this.areaRenderTargets.get(t);if(e)return e;if(!Number.isInteger(t)||t<256||t>2048||(t&t-1)!==0)throw new Error(`HERO_AREA_RESOLUTION_UNSUPPORTED:${t}`);const n={type:dn,format:We,magFilter:be,minFilter:be,depthBuffer:!0,stencilBuffer:!1},r=new yn(t,t,n);r.texture.colorSpace=on,r.texture.generateMipmaps=!1,r.samples=0;const s=new yn(t,t,{...n,depthBuffer:!1});s.texture.colorSpace=on,s.texture.generateMipmaps=!1,s.samples=0;const a=[];for(let c=t/2;c>=1;c/=2){const l=new yn(c,c,{type:ln,format:We,magFilter:be,minFilter:be,depthBuffer:!1,stencilBuffer:!1});l.texture.colorSpace=on,l.texture.generateMipmaps=!1,a.push(l)}const o={heroMask:r,qrMask:s,reductions:a};return this.areaRenderTargets.set(t,o),o}populateHeroAreaMask(t){this.scene.updateMatrixWorld(!0);const e=new Ut;let n=0;return t.bodies.forEach((r,s)=>{yo(this.theme.id,r.semantic)&&(t.body.getMatrixAt(s,e),e.premultiply(t.body.matrixWorld),this.areaMaskMesh.setMatrixAt(n,e),n+=1)}),this.areaMaskMesh.count=n,this.areaMaskMesh.instanceMatrix.needsUpdate=!0,this.areaMaskMesh.updateMatrixWorld(!0),{semanticVoxelCount:n,excludedSemanticVoxelCount:t.bodies.length-n}}readHeroAreaMaskDataUrl(t,e,n,r){const s=new Uint8Array(n*n*4),a=new Uint8Array(n*n*4);this.renderer.readRenderTargetPixels(t,0,0,n,n,s),this.renderer.readRenderTargetPixels(e,0,0,n,n,a);const o=new Uint8ClampedArray(s.length);for(let h=0;h<n;h+=1){const u=h*n*4,d=(n-1-h)*n*4;for(let f=0;f<n;f+=1){const g=u+f*4,_=d+f*4,m=a[g]>127,p=(r==="qr"?m:m&&s[g]>127)?255:0;o[_]=p,o[_+1]=p,o[_+2]=p,o[_+3]=255}}const c=document.createElement("canvas");c.width=n,c.height=n;const l=c.getContext("2d");if(!l)throw new Error("HERO_AREA_MASK_CANVAS_UNAVAILABLE");return l.putImageData(new ImageData(o,n,n),0,0),c.toDataURL("image/png")}measureSemanticHeroAreaWindow(t={}){const e=this.runtimes.get(this.theme.id);if(!e)throw new Error("HERO_AREA_RUNTIME_MISSING");const n=t.startTimeSeconds??0,r=t.durationSeconds??y0[this.theme.id],s=t.sampleHz??Ol,a=t.resolution??1024,o=t.cameraMode??"top-down";if(!Number.isFinite(n)||n<0)throw new Error("HERO_AREA_START_TIME_INVALID");if(!Number.isFinite(r)||r<0)throw new Error("HERO_AREA_DURATION_INVALID");if(!Number.isFinite(s)||s<Ol)throw new Error("HERO_AREA_SAMPLE_RATE_BELOW_60HZ");const c=this.heroAreaTargets(a),l=this.readCameraState(),h=this.camera.layers.mask,u=this.elapsed,d=this.renderer.getRenderTarget(),f=this.renderer.getViewport(new le),g=this.renderer.getScissor(new le),_=this.renderer.getScissorTest(),m=this.renderer.getClearColor(new Lt).clone(),p=this.renderer.getClearAlpha(),v=this.scene.background,E=this.renderer.autoClear,S=.52,R=this.qr.size*.5,b=[new A(-R,S,-R),new A(R,S,-R),new A(-R,S,R),new A(R,S,R)],w=[];let I=null,y=null;const M=new Float32Array(4);let P="gpu-float32-exact-sum";const L=(N,B=!1)=>{this.elapsed=N,this.updateHeroRuntime(e);const W=this.populateHeroAreaMask(e);this.areaMaskMesh.visible=!0,this.areaQrMaskMesh.visible=!1,this.areaReductionMesh.visible=!1,this.renderer.setRenderTarget(c.heroMask),this.renderer.clear(!0,!0,!0),this.renderer.render(this.scene,this.camera),this.areaMaskMesh.visible=!1,this.areaQrMaskMesh.visible=!1,this.areaReductionMesh.visible=!0;let q=0,$=0;P="gpu-float32-exact-sum";try{this.areaReductionMesh.material=this.areaReductionMaterial;let nt=c.heroMask,rt=a;for(const[lt,Rt]of c.reductions.entries())this.areaReductionMaterial.uniforms.inputTexture.value=nt.texture,this.areaReductionMaterial.uniforms.qrTexture.value=c.qrMask.texture,this.areaReductionMaterial.uniforms.inputSize.value.set(rt,rt),this.areaReductionMaterial.uniforms.combineMasks.value=lt===0?1:0,this.renderer.setRenderTarget(Rt),this.renderer.clear(!0,!1,!1),this.renderer.render(this.scene,this.areaReductionCamera),nt=Rt,rt=Rt.width;if(this.renderer.readRenderTargetPixels(c.reductions.at(-1),0,0,1,1,M),!Number.isFinite(M[0])||!Number.isFinite(M[1])||M[0]<0||M[1]<=0||M[0]>M[1]||M[1]>a*a)throw new Error("HERO_AREA_GPU_REDUCTION_INVALID:"+M[0]+":"+M[1]);q=Math.round(M[0]),$=Math.round(M[1])}catch{P="cpu-binary-readback-fallback";const nt=new Uint8Array(a*a*4),rt=new Uint8Array(a*a*4);this.renderer.readRenderTargetPixels(c.heroMask,0,0,a,a,nt),this.renderer.readRenderTargetPixels(c.qrMask,0,0,a,a,rt);for(let lt=0;lt<nt.length;lt+=4)rt[lt]>127&&($+=1,nt[lt]>127&&(q+=1))}const G={source:"production-scene-semantic-id-pass",maskSource:"dual-production-geometry-masks-semantic-subject-and-active-qr-plane",sceneUuid:this.scene.uuid,cameraUuid:this.camera.uuid,theme:this.theme.id,payload:this.qr.payload,gridSize:this.qr.size,timeSeconds:Number(N.toFixed(6)),resolution:a,qrPixels:$,heroIntersectionPixels:q,ratio:Number((q/$).toFixed(8)),semanticVoxelCount:W.semanticVoxelCount,excludedSemanticVoxelCount:W.excludedSemanticVoxelCount,cameraMode:o==="top-down"?"production-top-down-scan-camera":"production-default-opening-camera",viewportExtraction:"active-qr-projected-mask-intersection",antiAliasIndependent:!0,reduction:P};return B&&(G.maskDataUrl=this.readHeroAreaMaskDataUrl(c.heroMask,c.qrMask,a,"intersection"),G.qrMaskDataUrl=this.readHeroAreaMaskDataUrl(c.heroMask,c.qrMask,a,"qr")),G};try{this.scene.add(this.areaMaskMesh,this.areaQrMaskMesh,this.areaReductionMesh),this.scene.background=null,this.renderer.autoClear=!1,this.renderer.setClearColor("#000000",1),this.camera.layers.set(ur),o==="top-down"?this.applyScanCamera():this.writeCameraState(this.defaultCamera),this.camera.updateMatrixWorld(!0),b.forEach(V=>V.project(this.camera));const N=Math.min(...b.map(V=>V.x)),B=Math.max(...b.map(V=>V.x)),W=Math.min(...b.map(V=>V.y)),q=Math.max(...b.map(V=>V.y)),$=Math.max(1e-6,B-N),G=Math.max(1e-6,q-W),nt=new Ut().set(2/$,0,0,-(B+N)/$,0,2/G,0,-(q+W)/G,0,0,1,0,0,0,0,1);this.camera.projectionMatrix.premultiply(nt),this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert(),this.areaMaskMesh.visible=!1,this.areaReductionMesh.visible=!1,this.areaQrMaskMesh.visible=!0,this.areaQrMaskMesh.position.set(0,S,0),this.areaQrMaskMesh.scale.set(this.qr.size,this.qr.size,1),this.areaQrMaskMesh.updateMatrixWorld(!0),this.renderer.setRenderTarget(c.qrMask),this.renderer.clear(!0,!1,!1),this.renderer.render(this.scene,this.camera),this.areaQrMaskMesh.visible=!1;const rt=Math.round(r*s)+1;for(let V=0;V<rt;V+=1){const j=n+V/s,at=L(j);w.push(at.ratio),(!I||at.ratio<I.ratio)&&(I=at),(!y||at.ratio>y.ratio)&&(y=at)}if(!I||!y)throw new Error("HERO_AREA_NO_FRAMES_RENDERED");let lt=I,Rt=y;(t.includeWorstMask||t.includeExtremaMasks)&&(lt=L(lt.timeSeconds,!0)),t.includeExtremaMasks&&(Rt=L(Rt.timeSeconds,!0));const Vt=[...w].sort((V,j)=>V-j),Kt=Math.floor(Vt.length*.5),Wt=Vt.length%2?Vt[Kt]:(Vt[Kt-1]+Vt[Kt])*.5;return{source:"production-scene-semantic-id-pass",theme:this.theme.id,payload:this.qr.payload,gridSize:this.qr.size,startTimeSeconds:n,durationSeconds:r,sampleHz:s,fixedTimestepSeconds:1/s,renderedFrameCount:rt,resolution:a,requiredMin:v0,requiredMax:M0,authoringTarget:x0,ratioTrace:w,minRatio:lt.ratio,maxRatio:Rt.ratio,medianRatio:Number(Wt.toFixed(8)),minFrame:lt,maxFrame:Rt,worstFrame:lt}}finally{this.areaMaskMesh.count=0,this.areaMaskMesh.visible=!1,this.areaQrMaskMesh.visible=!1,this.areaReductionMesh.visible=!1,this.scene.remove(this.areaMaskMesh,this.areaQrMaskMesh,this.areaReductionMesh),this.elapsed=u,this.updateHeroRuntime(e),this.camera.layers.mask=h,this.writeCameraState(l),this.scene.background=v,this.renderer.autoClear=E,this.renderer.setClearColor(m,p),this.renderer.setRenderTarget(d),this.renderer.setViewport(f),this.renderer.setScissor(g),this.renderer.setScissorTest(_),d===null&&this.render()}}setDiagnosticAnimationTime(t){if(t!==null&&(!Number.isFinite(t)||t<0))throw new Error("DIAGNOSTIC_TIME_INVALID");this.diagnosticAnimationTime=t,t!==null&&(this.elapsed=t);const e=this.runtimes.get(this.theme.id);e&&this.updateHeroRuntime(e),this.render()}getStats(){let t=0;this.scene.traverse(()=>{t+=1});const e=this.runtimes.get(this.theme.id),n=e?this.treeVolumeMetric(e):null,r=e?this.sunVolumeMetric(e):null,s=e?this.oceanMotionMetric(e):null,a=e?Gl(this.theme.id,e.bodies,e.particleStates):Gl(this.theme.id,[],[]),o=sn(this.qr.size),c=e?[e.group.scale.x,e.group.scale.y,e.group.scale.z]:[o,o,o],l=e?.scaleCurrent??o,h=T0[this.theme.id],u=h*l,d=u/this.qr.size,f=h/Ms,g=m=>Number(m.toFixed(6)),_={gridSize:this.qr.size,referenceGridSize:Ms,qrActiveExtent:this.qr.size,referenceMajorAxis:g(h),targetScale:g(o),currentScale:g(l),semanticMajorAxisWorld:g(u),heroToQrRatio:g(d),referenceHeroToQrRatio:g(f),ratioError:g(Math.abs(d-f)),axisScale:c.map(g),axisSpread:g(Math.max(...c)-Math.min(...c)),transitionMs:e?.scaleTransitionMs??Fl,lastTransitionDurationMs:g(e?Math.max(0,e.scaleSettledAt-e.scaleStartedAt):0),transitionSettled:e?Math.abs(e.scaleCurrent-e.scaleTarget)<=1e-5:!0,particlesVisible:e?.particles.visible??!1,manualCameraAdjusted:this.manualCameraAdjusted,cameraFit:this.responsiveCameraFit(e)};return{drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,instances:this.moduleCount,progress:this.progress,mode:this.requestedMode,payload:this.qr.payload,theme:this.theme.id,sceneUuid:this.scene.uuid,cameraUuid:this.camera.uuid,canvasId:this.renderer.domElement.id,materialSignature:[this.theme.scanDark,this.theme.mid,this.theme.bright,this.theme.highlight,this.theme.ground].join("|"),animationTime:this.elapsed,animationFrame:this.animationFrame,camera:{position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray(),up:this.camera.up.toArray(),target:this.controls.target.toArray(),zoom:this.camera.zoom},controls:{type:"ArcballControls",rotate:this.controls.enableRotate,pan:this.controls.enablePan,zoom:this.controls.enableZoom,polarClamp:!1,azimuthClamp:!1},visual:{primaryPrimitive:"rounded-cuboid",heroCount:1,forestCount:0,qrColumnField:!1,neutralBlackDominance:!1,oceanWaveDirection:"positive-x",oceanWaveSamples:[this.waveHeight(0),this.waveHeight(1.6),this.waveHeight(3.2)],treeVolume:n,sunVolume:r,oceanMotion:s,v8:a,responsiveHero:_},resources:{geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,programs:this.renderer.info.programs?.length??0,sceneObjects:t,managedListeners:6},performance:{frameTimeMedianMs:Pa(this.frameTimes,.5),frameTimeP95Ms:Pa(this.frameTimes,.95),pointerResponseP95Ms:Pa(this.pointerResponses,.95),pointerSamples:this.pointerResponses.length,longTaskCount:this.longTasks.filter(m=>m>80).length,maxLongTaskMs:this.longTasks.length?Math.max(...this.longTasks):0,fidelityLevel:this.fidelityLevel,fidelityReason:this.fidelityReason,heroResolutionPreserved:!0,qrResolutionPreserved:!0,activeParticleCount:e?.particles.count??0,totalParticleCount:e?.particleStates.length??0,hysteresisEnabled:!0}}}captureScene(){return this.render(),this.renderer.domElement.toDataURL("image/png")}captureTopDown(){const t=this.readCameraState(),e=this.renderer.domElement,n=this.renderer.getPixelRatio(),r=Math.max(1,e.clientWidth||Math.round(e.width/n)),s=Math.max(1,e.clientHeight||Math.round(e.height/n)),a={left:this.camera.left,right:this.camera.right,top:this.camera.top,bottom:this.camera.bottom};try{this.renderer.setPixelRatio(1),this.renderer.setSize(Zl,Zl,!1),this.camera.left=-rn*.5,this.camera.right=rn*.5,this.camera.top=rn*.5,this.camera.bottom=-rn*.5,this.camera.position.copy(this.scanPosition),this.camera.quaternion.copy(this.topQuaternion),this.controls.target.copy(this.scanTarget),this.camera.zoom=Y0(this.qr.size),this.camera.updateProjectionMatrix(),this.render();const o=document.createElement("canvas");o.width=fr,o.height=fr;const c=o.getContext("2d");if(!c)throw new Error("TOP_DOWN_EXPORT_CONTEXT_MISSING");return c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high",c.fillStyle="#ffffff",c.fillRect(0,0,o.width,o.height),c.filter=`blur(${X0}px)`,c.drawImage(e,0,0,fr,fr),c.filter="none",o.toDataURL("image/png")}finally{this.renderer.setPixelRatio(n),this.renderer.setSize(r,s,!1),this.camera.left=a.left,this.camera.right=a.right,this.camera.top=a.top,this.camera.bottom=a.bottom,this.writeCameraState(t),this.render()}}getTreeStructureEvidence(){const t=this.runtimes.get(this.theme.id);return L0(this.theme.id,t?.bodies??[])}readCameraState(){return{position:this.camera.position.clone(),quaternion:this.camera.quaternion.clone(),up:this.camera.up.clone(),target:this.controls.target.clone(),zoom:this.camera.zoom}}writeCameraState(t){this.camera.position.copy(t.position),this.camera.quaternion.copy(t.quaternion),this.camera.up.copy(t.up),this.controls.target.copy(t.target),this.camera.zoom=t.zoom,this.camera.updateProjectionMatrix(),this.controls.update()}createDefaultCameraState(){const t=sn(this.qr.size),e=this.runtimes.get(this.theme.id),n=(this.qr.size+Hn*2)*.5,r=new A(-n,-.55,-n),s=new A(n,.65,n),a=(this.theme.id==="wanderer"?1.15:this.theme.id==="ocean"?.75:.65)*t;if(e)for(const v of e.bodies){const E=v.scaleX*t*.5+a,S=v.scaleY*t*.5+a,R=v.scaleZ*t*.5+a;r.x=Math.min(r.x,v.x*t-E),r.y=Math.min(r.y,v.baseY*t-S),r.z=Math.min(r.z,v.z*t-R),s.x=Math.max(s.x,v.x*t+E),s.y=Math.max(s.y,v.baseY*t+S),s.z=Math.max(s.z,v.z*t+R)}const o=r.clone().add(s).multiplyScalar(.5),c=new A(0,220,34).normalize(),l=s.clone().sub(r),h=Math.min(300,Math.max(78*t,l.length()*1.35)),u=o.clone().addScaledVector(c,h),d=new A(0,1,0),f=new Zn().setFromRotationMatrix(new Ut().lookAt(u,o,d)),g=new _r(this.camera.left,this.camera.right,this.camera.top,this.camera.bottom,this.camera.near,this.camera.far);g.position.copy(u),g.quaternion.copy(f),g.up.copy(d),g.zoom=1,g.updateProjectionMatrix(),g.updateMatrixWorld(!0);let _=0,m=0;for(const v of[r.x,s.x])for(const E of[r.y,s.y])for(const S of[r.z,s.z]){const R=new A(v,E,S).project(g);_=Math.max(_,Math.abs(R.x)),m=Math.max(m,Math.abs(R.y))}const p=Tt.clamp(Math.min(.82/Math.max(1e-4,_),.78/Math.max(1e-4,m)),this.controls.minZoom,this.controls.maxZoom);return{position:u,quaternion:f,up:d,target:o,zoom:p}}refreshDefaultCamera(t){if(this.defaultCamera=this.createDefaultCameraState(),t)this.writeCameraState(this.defaultCamera),this.controls.saveState(),this.savedCamera=this.readCameraState();else if(!this.manualCameraAdjusted){const e=this.defaultCamera;this.savedCamera={position:e.position.clone(),quaternion:e.quaternion.clone(),up:e.up.clone(),target:e.target.clone(),zoom:e.zoom}}}sceneZoom(){return rn/(this.qr.size+11)*.89}computeScanZoom(){const t=this.renderer.domElement.parentElement,e=t?Math.max(.2,t.clientWidth/Math.max(1,t.clientHeight)):1,r=(t?Math.min(t.clientWidth,t.clientHeight)<ql:!1)?Hn*2:Oh;return rn*Math.min(1,e)/(this.qr.size+r)}applyScanCamera(){this.camera.position.copy(this.scanPosition),this.camera.quaternion.copy(this.topQuaternion),this.controls.target.copy(this.scanTarget),this.camera.zoom=this.scanZoom,this.camera.updateProjectionMatrix()}applyCameraTransition(){const t=Gn(this.progress);this.camera.position.lerpVectors(this.savedCamera.position,this.scanPosition,t),this.camera.quaternion.slerpQuaternions(this.savedCamera.quaternion,this.topQuaternion,t),this.camera.up.lerpVectors(this.savedCamera.up,new A(0,1,0),t).normalize(),this.controls.target.lerpVectors(this.savedCamera.target,this.scanTarget,t),this.camera.zoom=Tt.lerp(this.savedCamera.zoom,this.scanZoom,t),this.camera.updateProjectionMatrix()}resize(){const t=this.renderer.domElement.parentElement;if(!t)return;const e=Math.max(1,t.clientWidth),n=Math.max(1,t.clientHeight),r=e/n,s=this.requestedMode==="scan",a=s&&Math.min(e,n)<ql;this.renderer.domElement.style.filter=s?`blur(${k0}px)`:"none";const o=a?Math.min(Math.max(window.devicePixelRatio,B0),1.6):Math.min(window.devicePixelRatio*.8,1.2);Math.abs(this.renderer.getPixelRatio()-o)>.001&&this.renderer.setPixelRatio(o),this.renderer.setSize(e,n,!1),this.camera.left=-rn*r*.5,this.camera.right=rn*r*.5,this.camera.top=rn*.5,this.camera.bottom=-rn*.5,this.scanZoom=this.computeScanZoom(),this.progress>.999?this.applyScanCamera():!this.manualCameraAdjusted&&this.requestedMode==="scene"?this.refreshDefaultCamera(!0):this.camera.updateProjectionMatrix()}observeLongTasks(){try{this.longTaskObserver=new PerformanceObserver(t=>{for(const e of t.getEntries())this.longTasks.push(e.duration),this.longTasks.length>180&&this.longTasks.shift()}),this.longTaskObserver.observe({type:"longtask",buffered:!0})}catch{this.longTaskObserver=null}}updateAutomaticFidelity(t){if(t>22&&t<250?(this.slowFrameBudget+=1,this.recoveryFrameBudget=0):t<17&&(this.recoveryFrameBudget+=1,this.slowFrameBudget=Math.max(0,this.slowFrameBudget-1)),this.fidelityLevel==="high"&&this.slowFrameBudget>=90){this.fidelityLevel="reduced-atmosphere",this.fidelityReason="sustained-frame-time-over-22ms";for(const e of this.runtimes.values())e.particles.count=Math.ceil(e.particleStates.length*.58);this.slowFrameBudget=0}else if(this.fidelityLevel==="reduced-atmosphere"&&this.recoveryFrameBudget>=300){this.fidelityLevel="high",this.fidelityReason="recovered-frame-time-under-17ms";for(const e of this.runtimes.values())e.particles.count=e.particleStates.length;this.recoveryFrameBudget=0}}animate=()=>{if(this.disposed)return;this.frame=requestAnimationFrame(this.animate);const t=performance.now(),e=t-this.lastFrameAt;this.updateAutomaticFidelity(e),this.lastFrameAt=t,t<=this.interactionUntil&&e<250&&(this.frameTimes.push(e),this.frameTimes.length>900&&this.frameTimes.shift());const n=Math.min(.05,this.clock.getDelta());if(this.diagnosticAnimationTime===null?this.elapsed+=n:this.elapsed=this.diagnosticAnimationTime,this.animationFrame+=1,Math.abs(this.progress-this.targetProgress)>5e-4){const s=Math.sign(this.targetProgress-this.progress),a=window.matchMedia("(prefers-reduced-motion: reduce)").matches?.36:H0;this.progress=Tt.clamp(this.progress+s*n/a,0,1),this.applyCameraTransition()}else this.progress=this.targetProgress,this.progress>=.999&&this.applyScanCamera(),this.progress<=.001&&this.requestedMode==="scene"&&!this.controls.enabled&&(this.writeCameraState(this.savedCamera),this.controls.enabled=!0);this.controls.enabled&&this.controls.update();const r=this.runtimes.get(this.theme.id);if(r&&(this.updateHeroScale(r),this.updateHeroRuntime(r)),this.theme.id==="sunset"){const s=Math.sin(this.elapsed*.72)*.085;this.keyLight.intensity=3.4+s,this.fillLight.intensity=1.75+s*.55}else this.keyLight.intensity=3.4,this.fillLight.intensity=1.75;this.render()};render(){this.renderer.render(this.scene,this.camera)}dispose(){if(this.disposed)return;this.disposed=!0,cancelAnimationFrame(this.frame),this.resizeObserver.disconnect(),this.longTaskObserver?.disconnect();const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown),t.removeEventListener("pointermove",this.onPointerMove),t.removeEventListener("wheel",this.onWheel),this.controls.removeEventListener("start",this.onControlStart),this.controls.removeEventListener("end",this.onControlEnd),this.controls.removeEventListener("change",this.onControlChange),this.controls.dispose();const e=new Set,n=new Set;this.scene.traverse(r=>{r instanceof Ce&&(e.add(r.geometry),(Array.isArray(r.material)?r.material:[r.material]).forEach(a=>n.add(a)))}),e.forEach(r=>r.dispose()),n.forEach(r=>r.dispose()),this.areaMaskMaterial.dispose(),this.areaQrMaskMesh.geometry.dispose(),this.areaQrMaskMaterial.dispose(),this.areaReductionMesh.geometry.dispose(),this.areaReductionMaterial.dispose(),this.areaRenderTargets.forEach(({heroMask:r,qrMask:s,reductions:a})=>{r.dispose(),s.dispose(),a.forEach(o=>o.dispose())}),this.areaRenderTargets.clear(),this.shadowTexture.dispose(),this.renderer.dispose()}}const To="https://example.com/voxelqr-studio";let qn=kh("voxelqr-locale",["zh-TW","en"],"zh-TW"),Oe=kh("voxelqr-theme",ji,"sakura"),Rr="url",Oi="scene",vn=nh(To,Rr),Kl=0,wr=0,zh=performance.now();const Mr=[],Bh=[];function kh(i,t,e){try{const n=localStorage.getItem(i);return n&&t.includes(n)?n:e}catch{return e}}function Hh(i,t){try{localStorage.setItem(i,t)}catch{}}function jt(i){return Au(qn,i)}function $0(i,t){if(!i.length)return 0;const e=[...i].sort((n,r)=>n-r);return e[Math.min(e.length-1,Math.ceil(e.length*t)-1)]}function K0(){return ji.map(i=>{const t=Ke[i];return`<button type="button" class="theme-card" data-theme="${i}" aria-pressed="${i===Oe}"
      style="--card-dark:${t.scanDark};--card-mid:${t.mid};--card-bright:${t.bright};--card-light:${t.highlight}">
      <span class="theme-card-art" aria-hidden="true"><i></i><i></i><i></i><i></i><b>${t.glyph}</b></span>
      <span class="theme-card-copy"><strong data-theme-label="${i}">${jt(i)}</strong><small>${t.signature}</small></span>
      <span class="selected-check" aria-hidden="true">✓</span>
    </button>`}).join("")}function J0(){return`
    <div class="studio-shell">
      <header class="studio-bar">
        <a class="brand" href="#garden-stage" aria-label="VoxelQR Studio home">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b></span>
          <span><strong>VoxelQR Studio</strong><small data-i18n="productName">${jt("productName")}</small></span>
        </a>
        <div class="studio-meta">
          <span class="offline-badge"><i aria-hidden="true"></i><span data-i18n="offline">${jt("offline")}</span></span>
          <button type="button" id="compact-scan-exit" class="compact-scan-exit"><span aria-hidden="true">◆</span><span data-i18n="scene">${jt("scene")}</span></button>
          <div class="language-toggle" role="group" aria-label="Language">
            <button type="button" data-locale="zh-TW" aria-pressed="${qn==="zh-TW"}">繁中</button>
            <button type="button" data-locale="en" aria-pressed="${qn==="en"}">EN</button>
          </div>
        </div>
      </header>

      <main class="workspace">
        <section class="stage" id="garden-stage" aria-label="Interactive 3D QR scene" data-same-scene="true">
          <canvas id="garden-canvas" aria-label="Interactive 3D voxel QR scene"></canvas>
          <header class="stage-heading">
            <p class="stage-eyebrow"><span class="live-dot" aria-hidden="true"></span> <span data-i18n="liveScene">${jt("liveScene")}</span> · <span id="qr-size">${vn.size} × ${vn.size}</span></p>
            <h1 id="theme-title">${jt(Oe)}</h1>
            <p id="theme-signature">${Ke[Oe].signature}</p>
          </header>
          <div class="stage-tools">
            <div class="mode-switch" role="group" aria-label="View mode">
              <button type="button" data-mode="scene" aria-pressed="true"><span aria-hidden="true">◆</span><span data-i18n="scene">${jt("scene")}</span></button>
              <button type="button" data-mode="scan" aria-pressed="false"><span aria-hidden="true">⌗</span><span data-i18n="scan">${jt("scan")}</span></button>
            </div>
            <button type="button" id="reset-view" class="fit-button"><span aria-hidden="true">⛶</span><span data-i18n="reset">${jt("reset")}</span></button>
          </div>
          <p class="control-hint" id="mode-tip" data-i18n="sceneTip">${jt("sceneTip")}</p>
        </section>

        <aside class="grow-panel" aria-labelledby="controls-title">
          <div class="panel-intro">
            <p class="panel-step">01 · CONTENT</p>
            <h2 id="controls-title" data-i18n="controls">${jt("controls")}</h2>
          </div>

          <fieldset class="input-kind">
            <legend data-i18n="inputType">${jt("inputType")}</legend>
            <div class="segmented">
              <button type="button" data-payload-type="url" aria-pressed="true" data-i18n="url">${jt("url")}</button>
              <button type="button" data-payload-type="text" aria-pressed="false" data-i18n="text">${jt("text")}</button>
            </div>
          </fieldset>

          <label class="payload-label" for="payload-input" data-i18n="payload">${jt("payload")}</label>
          <textarea id="payload-input" rows="4" maxlength="600" spellcheck="false" aria-describedby="input-help input-error">${To}</textarea>
          <div class="input-meta">
            <span class="sync-state"><i id="sync-dot" aria-hidden="true"></i><span id="sync-status" role="status" aria-live="polite" data-i18n="synchronized">${jt("synchronized")}</span></span>
            <span id="character-count">${[...To].length}/600</span>
          </div>
          <p id="input-help" class="input-help" data-i18n="inputHelp">${jt("inputHelp")}</p>
          <p id="input-error" class="input-error" role="alert"></p>

          <div class="encoded-card">
            <span data-i18n="encoded">${jt("encoded")}</span>
            <output id="encoded-output">${vn.payload}</output>
          </div>

          <section class="theme-library" aria-labelledby="theme-label">
            <div class="library-heading"><span class="panel-step">02 · STYLE</span><h3 id="theme-label" data-i18n="themes">${jt("themes")}</h3></div>
            <div class="theme-grid">${K0()}</div>
          </section>

          <section class="export-actions" aria-label="Export actions">
            <button type="button" id="export-scene"><span aria-hidden="true">◇</span><span data-i18n="exportScene">${jt("exportScene")}</span></button>
            <button type="button" id="export-qr"><span aria-hidden="true">⌗</span><span data-i18n="exportQr">${jt("exportQr")}</span></button>
          </section>
        </aside>
      </main>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>
  `}const Gh=document.querySelector("#app");if(!Gh)throw new Error("APP_ROOT_MISSING");Gh.innerHTML=J0();const Ji=xe("#payload-input"),Q0=xe("#garden-canvas"),ve=new Z0(Q0,vn,Oe);qh();tv();Go(Rr,!1);document.documentElement.lang=qn==="zh-TW"?"zh-Hant":"en";function xe(i){const t=document.querySelector(i);if(!t)throw new Error(`MISSING_ELEMENT:${i}`);return t}function tv(){document.querySelectorAll("[data-payload-type]").forEach(i=>{i.addEventListener("click",()=>Go(i.dataset.payloadType))}),document.querySelectorAll("[data-locale]").forEach(i=>{i.addEventListener("click",()=>Wh(i.dataset.locale))}),document.querySelectorAll("[data-theme]").forEach(i=>{i.addEventListener("click",()=>Vh(i.dataset.theme??""))}),document.querySelectorAll("[data-mode]").forEach(i=>{i.addEventListener("click",()=>wo(i.dataset.mode))}),xe("#reset-view").addEventListener("click",()=>ve.resetView()),xe("#compact-scan-exit").addEventListener("click",()=>wo("scene")),xe("#export-qr").addEventListener("click",iv),xe("#export-scene").addEventListener("click",rv),Ji.addEventListener("input",Vo)}function Go(i,t=!0){Rr=i,document.querySelectorAll("[data-payload-type]").forEach(e=>{e.setAttribute("aria-pressed",String(e.dataset.payloadType===i))}),Ji.placeholder=jt(i==="url"?"payloadHintUrl":"payloadHintText"),t&&Vo()}function Vo(){zh=performance.now(),xe("#character-count").textContent=`${[...Ji.value].length}/600`,xe("#input-error").textContent="",bo("syncing"),!wr&&(wr=requestAnimationFrame(ev))}function ev(){wr=0;const i=zh,t=xe("#input-error");try{const e=nh(Ji.value,Rr),n=performance.now();vn=e,ve.setQr(vn),Mr.push(n-i),Mr.length>240&&Mr.shift(),t.textContent="",xe("#encoded-output").textContent=vn.payload,xe("#qr-size").textContent=`${vn.size} × ${vn.size}`,bo("synchronized")}catch(e){const n=e instanceof Error&&e.message==="PAYLOAD_TOO_LONG"?"tooLong":"empty";t.textContent=jt(n),bo("needsInput")}finally{Bh.splice(0).forEach(e=>e())}}function nv(){return wr?new Promise(i=>Bh.push(i)):Promise.resolve()}function bo(i){const t=xe("#sync-status"),e=xe("#sync-dot");t.dataset.i18n=i,t.textContent=jt(i),e.dataset.state=i}function Vh(i){g0(i)&&(Oe=i,Hh("voxelqr-theme",Oe),document.querySelectorAll("[data-theme]").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.theme===Oe))),xe("#theme-title").textContent=jt(Oe),xe("#theme-signature").textContent=Ke[Oe].signature,ve.setTheme(Oe),qh())}function wo(i){Oi=i,document.querySelectorAll("[data-mode]").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.mode===Oi)));const t=xe("#mode-tip");t.textContent=jt(Oi==="scan"?"scanTip":"sceneTip"),t.dataset.i18n=Oi==="scan"?"scanTip":"sceneTip",document.body.dataset.mode=Oi,ve.setScanMode(Oi==="scan")}function Wh(i){qn=i,document.documentElement.lang=qn==="zh-TW"?"zh-Hant":"en",Hh("voxelqr-locale",qn),document.querySelectorAll("[data-locale]").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.locale===qn))),document.querySelectorAll("[data-i18n]").forEach(t=>{t.textContent=jt(t.dataset.i18n)}),ji.forEach(t=>{const e=document.querySelector(`[data-theme-label="${t}"]`);e&&(e.textContent=jt(t))}),xe("#theme-title").textContent=jt(Oe),Ji.placeholder=jt(Rr==="url"?"payloadHintUrl":"payloadHintText")}function qh(){const i=xe(".stage"),t=Ke[Oe];i.style.setProperty("--sky-a",t.sky[0]),i.style.setProperty("--sky-b",t.sky[1]),i.style.setProperty("--garden-dark",t.scanDark),i.style.setProperty("--garden-mid",t.mid),i.style.setProperty("--garden-bright",t.bright),i.style.setProperty("--garden-light",t.highlight),i.style.setProperty("--garden-ground",t.ground)}function Xh(i,t){const e=document.createElement("a");e.download=i,e.href=t,e.click()}function iv(){Xh(`VoxelQR-Studio-${Oe}-top-view.png`,ve.captureTopDown()),Yh(jt("downloadedQr"))}function rv(){Xh(`VoxelQR-Studio-${Oe}-scene.png`,ve.captureScene()),Yh(jt("downloadedScene"))}function Yh(i){const t=xe("#toast");t.textContent=i,t.classList.add("is-visible"),window.clearTimeout(Kl),Kl=window.setTimeout(()=>t.classList.remove("is-visible"),2200)}window.__VOXELQR_TEST__={setTheme:i=>Vh(i),setMode:i=>wo(i),setLocale:i=>Wh(i),setInspectionView:i=>ve.setInspectionView(i),setStructureEvidenceMode:i=>ve.setStructureEvidenceMode(i),setPayload:async(i,t="text")=>{Go(t,!1),Ji.value=i,Vo(),await nv()},getQr:()=>vn,getStats:()=>({...ve.getStats(),liveInputP95Ms:$0(Mr,.95),liveInputSamples:Mr.length,pendingInput:!!wr,canvasCount:document.querySelectorAll("canvas").length,qrOverlayCount:document.querySelectorAll("canvas:not(#garden-canvas), img[data-qr], svg[data-qr], .qr-overlay, .scan-mat").length}),getTreeMotionSample:()=>ve.getTreeMotionSample(),getTreeStructureEvidence:()=>ve.getTreeStructureEvidence(),getParticleMotionSample:()=>ve.getParticleMotionSample(),getProjectedComposition:()=>ve.getProjectedComposition(),measureSemanticHeroAreaWindow:i=>ve.measureSemanticHeroAreaWindow(i),setDiagnosticAnimationTime:i=>ve.setDiagnosticAnimationTime(i),captureTopDown:()=>ve.captureTopDown(),resetPerformanceMetrics:()=>ve.resetPerformanceMetrics(),sampleFidelityFrame:i=>ve.sampleFidelityFrame(i)};window.addEventListener("beforeunload",()=>ve.dispose(),{once:!0});

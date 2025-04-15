"use strict";var pmtiles=(()=>{var k=Object.defineProperty;var Je=Object.getOwnPropertyDescriptor;var Ye=Object.getOwnPropertyNames;var Qe=Object.prototype.hasOwnProperty;var U=Math.pow;var f=(r,e)=>k(r,"name",{value:e,configurable:!0});var Xe=(r,e)=>{for(var t in e)k(r,t,{get:e[t],enumerable:!0})},_e=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ye(e))!Qe.call(r,i)&&i!==t&&k(r,i,{get:()=>e[i],enumerable:!(n=Je(e,i))||n.enumerable});return r};var et=r=>_e(k({},"__esModule",{value:!0}),r);var m=(r,e,t)=>new Promise((n,i)=>{var a=h=>{try{u(t.next(h))}catch(l){i(l)}},s=h=>{try{u(t.throw(h))}catch(l){i(l)}},u=h=>h.done?n(h.value):Promise.resolve(h.value).then(a,s);u((t=t.apply(r,e)).next())});var Dt={};Xe(Dt,{Compression:()=>Oe,EtagMismatch:()=>B,FetchSource:()=>K,FileSource:()=>oe,PMTiles:()=>P,Protocol:()=>ie,ResolvedValueCache:()=>ue,SharedPromiseCache:()=>G,TileType:()=>se,bytesToHeader:()=>$e,findTile:()=>Fe,getUint64:()=>b,leafletRasterLayer:()=>wt,readVarint:()=>R,tileIdToZxy:()=>Tt,tileTypeExt:()=>Ze,zxyToTileId:()=>Ie});var w=Uint8Array,E=Uint16Array,tt=Int32Array,Me=new w([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ue=new w([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),rt=new w([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ee=f(function(r,e){for(var t=new E(31),n=0;n<31;++n)t[n]=e+=1<<r[n-1];for(var i=new tt(t[30]),n=1;n<30;++n)for(var a=t[n];a<t[n+1];++a)i[a]=a-t[n]<<5|n;return{b:t,r:i}},"freb"),Le=Ee(Me,2),Pe=Le.b,nt=Le.r;Pe[28]=258,nt[258]=28;var Se=Ee(Ue,0),it=Se.b,Ut=Se.r,re=new E(32768);for(g=0;g<32768;++g)T=(g&43690)>>1|(g&21845)<<1,T=(T&52428)>>2|(T&13107)<<2,T=(T&61680)>>4|(T&3855)<<4,re[g]=((T&65280)>>8|(T&255)<<8)>>1;var T,g,F=f(function(r,e,t){for(var n=r.length,i=0,a=new E(e);i<n;++i)r[i]&&++a[r[i]-1];var s=new E(e);for(i=1;i<e;++i)s[i]=s[i-1]+a[i-1]<<1;var u;if(t){u=new E(1<<e);var h=15-e;for(i=0;i<n;++i)if(r[i])for(var l=i<<4|r[i],c=e-r[i],o=s[r[i]-1]++<<c,v=o|(1<<c)-1;o<=v;++o)u[re[o]>>h]=l}else for(u=new E(n),i=0;i<n;++i)r[i]&&(u[i]=re[s[r[i]-1]++]>>15-r[i]);return u},"hMap"),$=new w(288);for(g=0;g<144;++g)$[g]=8;var g;for(g=144;g<256;++g)$[g]=9;var g;for(g=256;g<280;++g)$[g]=7;var g;for(g=280;g<288;++g)$[g]=8;var g,Re=new w(32);for(g=0;g<32;++g)Re[g]=5;var g;var at=F($,9,1);var st=F(Re,5,1),ee=f(function(r){for(var e=r[0],t=1;t<r.length;++t)r[t]>e&&(e=r[t]);return e},"max"),z=f(function(r,e,t){var n=e/8|0;return(r[n]|r[n+1]<<8)>>(e&7)&t},"bits"),te=f(function(r,e){var t=e/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(e&7)},"bits16"),ot=f(function(r){return(r+7)/8|0},"shft"),ut=f(function(r,e,t){return(e==null||e<0)&&(e=0),(t==null||t>r.length)&&(t=r.length),new w(r.subarray(e,t))},"slc");var ft=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],y=f(function(r,e,t){var n=new Error(e||ft[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,y),!t)throw n;return n},"err"),ne=f(function(r,e,t,n){var i=r.length,a=n?n.length:0;if(!i||e.f&&!e.l)return t||new w(0);var s=!t,u=s||e.i!=2,h=e.i;s&&(t=new w(i*3));var l=f(function(Te){var Ce=t.length;if(Te>Ce){var De=new w(Math.max(Ce*2,Te));De.set(t),t=De}},"cbuf"),c=e.f||0,o=e.p||0,v=e.b||0,d=e.l,p=e.d,H=e.m,I=e.n,q=i*8;do{if(!d){c=z(r,o,1);var j=z(r,o+1,3);if(o+=3,j)if(j==1)d=at,p=st,H=9,I=5;else if(j==2){var J=z(r,o,31)+257,me=z(r,o+10,15)+4,de=J+z(r,o+5,31)+1;o+=14;for(var O=new w(de),Y=new w(19),x=0;x<me;++x)Y[rt[x]]=z(r,o+x*3,7);o+=me*3;for(var ye=ee(Y),Ge=(1<<ye)-1,qe=F(Y,ye,1),x=0;x<de;){var we=qe[z(r,o,Ge)];o+=we&15;var A=we>>4;if(A<16)O[x++]=A;else{var D=0,V=0;for(A==16?(V=3+z(r,o,3),o+=2,D=O[x-1]):A==17?(V=3+z(r,o,7),o+=3):A==18&&(V=11+z(r,o,127),o+=7);V--;)O[x++]=D}}var xe=O.subarray(0,J),C=O.subarray(J);H=ee(xe),I=ee(C),d=F(xe,H,1),p=F(C,I,1)}else y(1);else{var A=ot(o)+4,W=r[A-4]|r[A-3]<<8,N=A+W;if(N>i){h&&y(0);break}u&&l(v+W),t.set(r.subarray(A,N),v),e.b=v+=W,e.p=o=N*8,e.f=c;continue}if(o>q){h&&y(0);break}}u&&l(v+131072);for(var je=(1<<H)-1,We=(1<<I)-1,Q=o;;Q=o){var D=d[te(r,o)&je],M=D>>4;if(o+=D&15,o>q){h&&y(0);break}if(D||y(2),M<256)t[v++]=M;else if(M==256){Q=o,d=null;break}else{var be=M-254;if(M>264){var x=M-257,Z=Me[x];be=z(r,o,(1<<Z)-1)+Pe[x],o+=Z}var X=p[te(r,o)&We],_=X>>4;X||y(3),o+=X&15;var C=it[_];if(_>3){var Z=Ue[_];C+=te(r,o)&(1<<Z)-1,o+=Z}if(o>q){h&&y(0);break}u&&l(v+131072);var ze=v+be;if(v<C){var Ae=a-C,Ne=Math.min(C,ze);for(Ae+v<0&&y(3);v<Ne;++v)t[v]=n[Ae+v]}for(;v<ze;++v)t[v]=t[v-C]}}e.l=d,e.p=Q,e.b=v,e.f=c,d&&(c=1,e.m=H,e.d=p,e.n=I)}while(!c);return v!=t.length&&s?ut(t,0,v):t.subarray(0,v)},"inflt");var lt=new w(0);var ht=f(function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&y(6,"invalid gzip data");var e=r[3],t=10;e&4&&(t+=(r[10]|r[11]<<8)+2);for(var n=(e>>3&1)+(e>>4&1);n>0;n-=!r[t++]);return t+(e&2)},"gzs"),ct=f(function(r){var e=r.length;return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0},"gzl");var vt=f(function(r,e){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&y(6,"invalid zlib data"),(r[1]>>5&1)==+!e&&y(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2},"zls");function gt(r,e){return ne(r,{i:2},e&&e.out,e&&e.dictionary)}f(gt,"inflateSync");function pt(r,e){var t=ht(r);return t+8>r.length&&y(6,"invalid gzip data"),ne(r.subarray(t,-8),{i:2},e&&e.out||new w(ct(r)),e&&e.dictionary)}f(pt,"gunzipSync");function mt(r,e){return ne(r.subarray(vt(r,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}f(mt,"unzlibSync");function Be(r,e){return r[0]==31&&r[1]==139&&r[2]==8?pt(r,e):(r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31?gt(r,e):mt(r,e)}f(Be,"decompressSync");var dt=typeof TextDecoder!="undefined"&&new TextDecoder,yt=0;try{dt.decode(lt,{stream:!0}),yt=1}catch(r){}var wt=f((r,e)=>{let t=!1,n="",i=L.GridLayer.extend({createTile:f((a,s)=>{let u=document.createElement("img"),h=new AbortController,l=h.signal;return u.cancel=()=>{h.abort()},t||(r.getHeader().then(c=>{c.tileType===1?console.error("Error: archive contains MVT vector tiles, but leafletRasterLayer is for displaying raster tiles. See https://github.com/protomaps/PMTiles/tree/main/js for details."):c.tileType===2?n="image/png":c.tileType===3?n="image/jpeg":c.tileType===4?n="image/webp":c.tileType===5&&(n="image/avif")}),t=!0),r.getZxy(a.z,a.x,a.y,l).then(c=>{if(c){let o=new Blob([c.data],{type:n}),v=window.URL.createObjectURL(o);u.src=v,u.cancel=void 0,s(void 0,u)}}).catch(c=>{if(c.name!=="AbortError")throw c}),u},"createTile"),_removeTile:f(function(a){let s=this._tiles[a];s&&(s.el.cancel&&s.el.cancel(),s.el.width=0,s.el.height=0,s.el.deleted=!0,L.DomUtil.remove(s.el),delete this._tiles[a],this.fire("tileunload",{tile:s.el,coords:this._keyToTileCoords(a)}))},"_removeTile")});return new i(e)},"leafletRasterLayer"),xt=f(r=>(e,t)=>{if(t instanceof AbortController)return r(e,t);let n=new AbortController;return r(e,n).then(i=>t(void 0,i.data,i.cacheControl||"",i.expires||""),i=>t(i)).catch(i=>t(i)),{cancel:f(()=>n.abort(),"cancel")}},"v3compat"),ae=class ae{constructor(e){this.tilev4=f((e,t)=>m(this,null,function*(){if(e.type==="json"){let v=e.url.substr(10),d=this.tiles.get(v);if(d||(d=new P(v),this.tiles.set(v,d)),this.metadata)return{data:yield d.getTileJson(e.url)};let p=yield d.getHeader();return(p.minLon>=p.maxLon||p.minLat>=p.maxLat)&&console.error(`Bounds of PMTiles archive ${p.minLon},${p.minLat},${p.maxLon},${p.maxLat} are not valid.`),{data:{tiles:[`${e.url}/{z}/{x}/{y}`],minzoom:p.minZoom,maxzoom:p.maxZoom,bounds:[p.minLon,p.minLat,p.maxLon,p.maxLat]}}}let n=new RegExp(/pmtiles:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/),i=e.url.match(n);if(!i)throw new Error("Invalid PMTiles protocol URL");let a=i[1],s=this.tiles.get(a);s||(s=new P(a),this.tiles.set(a,s));let u=i[2],h=i[3],l=i[4],c=yield s.getHeader(),o=yield s==null?void 0:s.getZxy(+u,+h,+l,t.signal);if(o)return{data:new Uint8Array(o.data),cacheControl:o.cacheControl,expires:o.expires};if(c.tileType===1){if(this.errorOnMissingTile)throw new Error("Tile not found.");return{data:new Uint8Array}}return{data:null}}),"tilev4");this.tile=xt(this.tilev4);this.tiles=new Map,this.metadata=(e==null?void 0:e.metadata)||!1,this.errorOnMissingTile=(e==null?void 0:e.errorOnMissingTile)||!1}add(e){this.tiles.set(e.source.getKey(),e)}get(e){return this.tiles.get(e)}};f(ae,"Protocol");var ie=ae;function S(r,e){return(e>>>0)*4294967296+(r>>>0)}f(S,"toNum");function bt(r,e){let t=e.buf,n=t[e.pos++],i=(n&112)>>4;if(n<128||(n=t[e.pos++],i|=(n&127)<<3,n<128)||(n=t[e.pos++],i|=(n&127)<<10,n<128)||(n=t[e.pos++],i|=(n&127)<<17,n<128)||(n=t[e.pos++],i|=(n&127)<<24,n<128)||(n=t[e.pos++],i|=(n&1)<<31,n<128))return S(r,i);throw new Error("Expected varint not more than 10 bytes")}f(bt,"readVarintRemainder");function R(r){let e=r.buf,t=e[r.pos++],n=t&127;return t<128||(t=e[r.pos++],n|=(t&127)<<7,t<128)||(t=e[r.pos++],n|=(t&127)<<14,t<128)||(t=e[r.pos++],n|=(t&127)<<21,t<128)?n:(t=e[r.pos],n|=(t&15)<<28,bt(n,r))}f(R,"readVarint");function He(r,e,t,n){if(n===0){t===1&&(e[0]=r-1-e[0],e[1]=r-1-e[1]);let i=e[0];e[0]=e[1],e[1]=i}}f(He,"rotate");function zt(r,e){let t=U(2,r),n=e,i=e,a=e,s=[0,0],u=1;for(;u<t;)n=1&a/2,i=1&(a^n),He(u,s,n,i),s[0]+=u*n,s[1]+=u*i,a=a/4,u*=2;return[r,s[0],s[1]]}f(zt,"idOnLevel");var At=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function Ie(r,e,t){if(r>26)throw new Error("Tile zoom level exceeds max safe number limit (26)");if(e>U(2,r)-1||t>U(2,r)-1)throw new Error("tile x/y outside zoom level bounds");let n=At[r],i=U(2,r),a=0,s=0,u=0,h=[e,t],l=i/2;for(;l>0;)a=(h[0]&l)>0?1:0,s=(h[1]&l)>0?1:0,u+=l*l*(3*a^s),He(l,h,a,s),l=l/2;return n+u}f(Ie,"zxyToTileId");function Tt(r){let e=0,t=0;for(let n=0;n<27;n++){let i=(1<<n)*(1<<n);if(e+i>r)return zt(n,r-e);e+=i}throw new Error("Tile zoom level exceeds max safe number limit (26)")}f(Tt,"tileIdToZxy");var Oe=(a=>(a[a.Unknown=0]="Unknown",a[a.None=1]="None",a[a.Gzip=2]="Gzip",a[a.Brotli=3]="Brotli",a[a.Zstd=4]="Zstd",a))(Oe||{});function fe(r,e){return m(this,null,function*(){if(e===1||e===0)return r;if(e===2){if(typeof globalThis.DecompressionStream=="undefined")return Be(new Uint8Array(r));let t=new Response(r).body;if(!t)throw new Error("Failed to read response stream");let n=t.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw new Error("Compression method not supported")})}f(fe,"defaultDecompress");var se=(s=>(s[s.Unknown=0]="Unknown",s[s.Mvt=1]="Mvt",s[s.Png=2]="Png",s[s.Jpeg=3]="Jpeg",s[s.Webp=4]="Webp",s[s.Avif=5]="Avif",s))(se||{});function Ze(r){return r===1?".mvt":r===2?".png":r===3?".jpg":r===4?".webp":r===5?".avif":""}f(Ze,"tileTypeExt");var Ct=127;function Fe(r,e){let t=0,n=r.length-1;for(;t<=n;){let i=n+t>>1,a=e-r[i].tileId;if(a>0)t=i+1;else if(a<0)n=i-1;else return r[i]}return n>=0&&(r[n].runLength===0||e-r[n].tileId<r[n].runLength)?r[n]:null}f(Fe,"findTile");var le=class le{constructor(e){this.file=e}getKey(){return this.file.name}getBytes(e,t){return m(this,null,function*(){return{data:yield this.file.slice(e,e+t).arrayBuffer()}})}};f(le,"FileSource");var oe=le,he=class he{constructor(e,t=new Headers){this.url=e,this.customHeaders=t,this.mustReload=!1;let n="";"navigator"in globalThis&&(n=globalThis.navigator.userAgent||"");let i=n.indexOf("Windows")>-1,a=/Chrome|Chromium|Edg|OPR|Brave/.test(n);this.chromeWindowsNoCache=!1,i&&a&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(e){this.customHeaders=e}getBytes(e,t,n,i){return m(this,null,function*(){let a,s;n?s=n:(a=new AbortController,s=a.signal);let u=new Headers(this.customHeaders);u.set("range",`bytes=${e}-${e+t-1}`);let h;this.mustReload?h="reload":this.chromeWindowsNoCache&&(h="no-store");let l=yield fetch(this.url,{signal:s,cache:h,headers:u});if(e===0&&l.status===416){let d=l.headers.get("Content-Range");if(!d||!d.startsWith("bytes */"))throw new Error("Missing content-length on 416 response");let p=+d.substr(8);l=yield fetch(this.url,{signal:s,cache:"reload",headers:{range:`bytes=0-${p-1}`}})}let c=l.headers.get("Etag");if(c!=null&&c.startsWith("W/")&&(c=null),l.status===416||i&&c&&c!==i)throw this.mustReload=!0,new B(`Server returned non-matching ETag ${i} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(l.status>=300)throw new Error(`Bad response code: ${l.status}`);let o=l.headers.get("Content-Length");if(l.status===200&&(!o||+o>t))throw a&&a.abort(),new Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield l.arrayBuffer(),etag:c||void 0,cacheControl:l.headers.get("Cache-Control")||void 0,expires:l.headers.get("Expires")||void 0}})}};f(he,"FetchSource");var K=he;function b(r,e){let t=r.getUint32(e+4,!0),n=r.getUint32(e+0,!0);return t*U(2,32)+n}f(b,"getUint64");function $e(r,e){let t=new DataView(r),n=t.getUint8(7);if(n>3)throw new Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:b(t,8),rootDirectoryLength:b(t,16),jsonMetadataOffset:b(t,24),jsonMetadataLength:b(t,32),leafDirectoryOffset:b(t,40),leafDirectoryLength:b(t,48),tileDataOffset:b(t,56),tileDataLength:b(t,64),numAddressedTiles:b(t,72),numTileEntries:b(t,80),numTileContents:b(t,88),clustered:t.getUint8(96)===1,internalCompression:t.getUint8(97),tileCompression:t.getUint8(98),tileType:t.getUint8(99),minZoom:t.getUint8(100),maxZoom:t.getUint8(101),minLon:t.getInt32(102,!0)/1e7,minLat:t.getInt32(106,!0)/1e7,maxLon:t.getInt32(110,!0)/1e7,maxLat:t.getInt32(114,!0)/1e7,centerZoom:t.getUint8(118),centerLon:t.getInt32(119,!0)/1e7,centerLat:t.getInt32(123,!0)/1e7,etag:e}}f($e,"bytesToHeader");function Ve(r){let e={buf:new Uint8Array(r),pos:0},t=R(e),n=[],i=0;for(let a=0;a<t;a++){let s=R(e);n.push({tileId:i+s,offset:0,length:0,runLength:1}),i+=s}for(let a=0;a<t;a++)n[a].runLength=R(e);for(let a=0;a<t;a++)n[a].length=R(e);for(let a=0;a<t;a++){let s=R(e);s===0&&a>0?n[a].offset=n[a-1].offset+n[a-1].length:n[a].offset=s-1}return n}f(Ve,"deserializeIndex");var ce=class ce extends Error{};f(ce,"EtagMismatch");var B=ce;function ke(r,e){return m(this,null,function*(){let t=yield r.getBytes(0,16384);if(new DataView(t.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");let i=t.data.slice(0,Ct),a=$e(i,t.etag),s=t.data.slice(a.rootDirectoryOffset,a.rootDirectoryOffset+a.rootDirectoryLength),u=`${r.getKey()}|${a.etag||""}|${a.rootDirectoryOffset}|${a.rootDirectoryLength}`,h=Ve(yield e(s,a.internalCompression));return[a,[u,h.length,h]]})}f(ke,"getHeaderAndRoot");function Ke(r,e,t,n,i){return m(this,null,function*(){let a=yield r.getBytes(t,n,void 0,i.etag),s=yield e(a.data,i.internalCompression),u=Ve(s);if(u.length===0)throw new Error("Empty directory is invalid");return u})}f(Ke,"getDirectory");var ve=class ve{constructor(e=100,t=!0,n=fe){this.cache=new Map,this.maxCacheEntries=e,this.counter=1,this.decompress=n}getHeader(e){return m(this,null,function*(){let t=e.getKey(),n=this.cache.get(t);if(n)return n.lastUsed=this.counter++,n.data;let i=yield ke(e,this.decompress);return i[1]&&this.cache.set(i[1][0],{lastUsed:this.counter++,data:i[1][2]}),this.cache.set(t,{lastUsed:this.counter++,data:i[0]}),this.prune(),i[0]})}getDirectory(e,t,n,i){return m(this,null,function*(){let a=`${e.getKey()}|${i.etag||""}|${t}|${n}`,s=this.cache.get(a);if(s)return s.lastUsed=this.counter++,s.data;let u=yield Ke(e,this.decompress,t,n,i);return this.cache.set(a,{lastUsed:this.counter++,data:u}),this.prune(),u})}prune(){if(this.cache.size>this.maxCacheEntries){let e=1/0,t;this.cache.forEach((n,i)=>{n.lastUsed<e&&(e=n.lastUsed,t=i)}),t&&this.cache.delete(t)}}invalidate(e){return m(this,null,function*(){this.cache.delete(e.getKey())})}};f(ve,"ResolvedValueCache");var ue=ve,ge=class ge{constructor(e=100,t=!0,n=fe){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=e,this.counter=1,this.decompress=n}getHeader(e){return m(this,null,function*(){let t=e.getKey(),n=this.cache.get(t);if(n)return n.lastUsed=this.counter++,yield n.data;let i=new Promise((a,s)=>{ke(e,this.decompress).then(u=>{u[1]&&this.cache.set(u[1][0],{lastUsed:this.counter++,data:Promise.resolve(u[1][2])}),a(u[0]),this.prune()}).catch(u=>{s(u)})});return this.cache.set(t,{lastUsed:this.counter++,data:i}),i})}getDirectory(e,t,n,i){return m(this,null,function*(){let a=`${e.getKey()}|${i.etag||""}|${t}|${n}`,s=this.cache.get(a);if(s)return s.lastUsed=this.counter++,yield s.data;let u=new Promise((h,l)=>{Ke(e,this.decompress,t,n,i).then(c=>{h(c),this.prune()}).catch(c=>{l(c)})});return this.cache.set(a,{lastUsed:this.counter++,data:u}),u})}prune(){if(this.cache.size>=this.maxCacheEntries){let e=1/0,t;this.cache.forEach((n,i)=>{n.lastUsed<e&&(e=n.lastUsed,t=i)}),t&&this.cache.delete(t)}}invalidate(e){return m(this,null,function*(){let t=e.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(e.getKey());let n=new Promise((i,a)=>{this.getHeader(e).then(s=>{i(),this.invalidations.delete(t)}).catch(s=>{a(s)})});this.invalidations.set(t,n)})}};f(ge,"SharedPromiseCache");var G=ge,pe=class pe{constructor(e,t,n){typeof e=="string"?this.source=new K(e):this.source=e,n?this.decompress=n:this.decompress=fe,t?this.cache=t:this.cache=new G}getHeader(){return m(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(e,t,n,i){return m(this,null,function*(){let a=Ie(e,t,n),s=yield this.cache.getHeader(this.source);if(e<s.minZoom||e>s.maxZoom)return;let u=s.rootDirectoryOffset,h=s.rootDirectoryLength;for(let l=0;l<=3;l++){let c=yield this.cache.getDirectory(this.source,u,h,s),o=Fe(c,a);if(o){if(o.runLength>0){let v=yield this.source.getBytes(s.tileDataOffset+o.offset,o.length,i,s.etag);return{data:yield this.decompress(v.data,s.tileCompression),cacheControl:v.cacheControl,expires:v.expires}}u=s.leafDirectoryOffset+o.offset,h=o.length}else return}throw new Error("Maximum directory depth exceeded")})}getZxy(e,t,n,i){return m(this,null,function*(){try{return yield this.getZxyAttempt(e,t,n,i)}catch(a){if(a instanceof B)return this.cache.invalidate(this.source),yield this.getZxyAttempt(e,t,n,i);throw a}})}getMetadataAttempt(){return m(this,null,function*(){let e=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(e.jsonMetadataOffset,e.jsonMetadataLength,void 0,e.etag),n=yield this.decompress(t.data,e.internalCompression),i=new TextDecoder("utf-8");return JSON.parse(i.decode(n))})}getMetadata(){return m(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(e){if(e instanceof B)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw e}})}getTileJson(e){return m(this,null,function*(){let t=yield this.getHeader(),n=yield this.getMetadata(),i=Ze(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${e}/{z}/{x}/{y}${i}`],vector_layers:n.vector_layers,attribution:n.attribution,description:n.description,name:n.name,version:n.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};f(pe,"PMTiles");var P=pe;return et(Dt);})();
//# sourceMappingURL=pmtiles.js.map
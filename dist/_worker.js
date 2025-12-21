var bt=Object.defineProperty;var Be=e=>{throw TypeError(e)};var vt=(e,t,a)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var h=(e,t,a)=>vt(e,typeof t!="symbol"?t+"":t,a),Le=(e,t,a)=>t.has(e)||Be("Cannot "+a);var l=(e,t,a)=>(Le(e,t,"read from private field"),a?a.call(e):t.get(e)),m=(e,t,a)=>t.has(e)?Be("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),u=(e,t,a,s)=>(Le(e,t,"write to private field"),s?s.call(e,a):t.set(e,a),a),g=(e,t,a)=>(Le(e,t,"access private method"),a);var He=(e,t,a,s)=>({set _(i){u(e,t,i,a)},get _(){return l(e,t,s)}});var _e=(e,t,a)=>(s,i)=>{let n=-1;return r(0);async function r(c){if(c<=n)throw new Error("next() called multiple times");n=c;let d,o=!1,p;if(e[c]?(p=e[c][0][0],s.req.routeIndex=c):p=c===e.length&&i||void 0,p)try{d=await p(s,()=>r(c+1))}catch(f){if(f instanceof Error&&t)s.error=f,d=await t(f,s),o=!0;else throw f}else s.finalized===!1&&a&&(d=await a(s));return d&&(s.finalized===!1||o)&&(s.res=d),s}},yt=Symbol(),jt=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,n=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?wt(e,{all:a,dot:s}):{}};async function wt(e,t){const a=await e.formData();return a?St(a,t):{}}function St(e,t){const a=Object.create(null);return e.forEach((s,i)=>{t.all||i.endsWith("[]")?Tt(a,i,s):a[i]=s}),t.dot&&Object.entries(a).forEach(([s,i])=>{s.includes(".")&&(Rt(a,s,i),delete a[s])}),a}var Tt=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},Rt=(e,t,a)=>{let s=e;const i=t.split(".");i.forEach((n,r)=>{r===i.length-1?s[n]=a:((!s[n]||typeof s[n]!="object"||Array.isArray(s[n])||s[n]instanceof File)&&(s[n]=Object.create(null)),s=s[n])})},Xe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Et=e=>{const{groups:t,path:a}=kt(e),s=Xe(a);return At(s,t)},kt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const i=`@${s}`;return t.push([i,a]),i}),{groups:t,path:e}},At=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let i=e.length-1;i>=0;i--)if(e[i].includes(s)){e[i]=e[i].replace(s,t[a][1]);break}}return e},Re={},Ot=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return Re[s]||(a[2]?Re[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:Re[s]=[e,a[1],!0]),Re[s]}return null},Ve=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},Pt=e=>Ve(e,decodeURI),Ze=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let s=a;for(;s<t.length;s++){const i=t.charCodeAt(s);if(i===37){const n=t.indexOf("?",s),r=t.slice(a,n===-1?void 0:n);return Pt(r.includes("%25")?r.replace(/%25/g,"%2525"):r)}else if(i===63)break}return t.slice(a,s)},Ct=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ae=(e,t,...a)=>(a.length&&(t=ae(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(i=>{if(i!==""&&!/\:/.test(i))s+="/"+i;else if(/\:/.test(i))if(/\?/.test(i)){a.length===0&&s===""?a.push("/"):a.push(s);const n=i.replace("?","");s+="/"+n,a.push(s)}else s+="/"+i}),a.filter((i,n,r)=>r.indexOf(i)===n)},Fe=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Ve(e,at):e):e,tt=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const c=e.charCodeAt(r+t.length+1);if(c===61){const d=r+t.length+2,o=e.indexOf("&",d);return Fe(e.slice(d,o===-1?void 0:o))}else if(c==38||isNaN(c))return"";r=e.indexOf(`&${t}`,r+1)}if(s=/[%+]/.test(e),!s)return}const i={};s??(s=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const r=e.indexOf("&",n+1);let c=e.indexOf("=",n);c>r&&r!==-1&&(c=-1);let d=e.slice(n+1,c===-1?r===-1?void 0:r:c);if(s&&(d=Fe(d)),n=r,d==="")continue;let o;c===-1?o="":(o=e.slice(c+1,r===-1?void 0:r),s&&(o=Fe(o))),a?(i[d]&&Array.isArray(i[d])||(i[d]=[]),i[d].push(o)):i[d]??(i[d]=o)}return t?i[t]:i},It=tt,Lt=(e,t)=>tt(e,t,!0),at=decodeURIComponent,$e=e=>Ve(e,at),ne,k,D,it,nt,Me,_,We,st=(We=class{constructor(e,t="/",a=[[]]){m(this,D);h(this,"raw");m(this,ne);m(this,k);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});m(this,_,e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const i=Object.keys(t)[0];return i?t[i].then(n=>(i==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,u(this,k,a),u(this,ne,{})}param(e){return e?g(this,D,it).call(this,e):g(this,D,nt).call(this)}query(e){return It(this.url,e)}queries(e){return Lt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await jt(this,e))}json(){return l(this,_).call(this,"text").then(e=>JSON.parse(e))}text(){return l(this,_).call(this,"text")}arrayBuffer(){return l(this,_).call(this,"arrayBuffer")}blob(){return l(this,_).call(this,"blob")}formData(){return l(this,_).call(this,"formData")}addValidatedData(e,t){l(this,ne)[e]=t}valid(e){return l(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[yt](){return l(this,k)}get matchedRoutes(){return l(this,k)[0].map(([[,e]])=>e)}get routePath(){return l(this,k)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,k=new WeakMap,D=new WeakSet,it=function(e){const t=l(this,k)[0][this.routeIndex][1][e],a=g(this,D,Me).call(this,t);return a&&/\%/.test(a)?$e(a):a},nt=function(){const e={},t=Object.keys(l(this,k)[0][this.routeIndex][1]);for(const a of t){const s=g(this,D,Me).call(this,l(this,k)[0][this.routeIndex][1][a]);s!==void 0&&(e[a]=/\%/.test(s)?$e(s):s)}return e},Me=function(e){return l(this,k)[1]?l(this,k)[1][e]:e},_=new WeakMap,We),Ft={Stringify:1},rt=async(e,t,a,s,i)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(i?i[0]+=e:i=[e],Promise.all(n.map(c=>c({phase:t,buffer:i,context:s}))).then(c=>Promise.all(c.filter(Boolean).map(d=>rt(d,t,!1,s,i))).then(()=>i[0]))):Promise.resolve(e)},Nt="text/plain; charset=UTF-8",Ne=(e,t)=>({"Content-Type":e,...t}),xe,ge,F,re,N,E,be,le,de,G,ve,ye,$,se,Je,Mt=(Je=class{constructor(e,t){m(this,$);m(this,xe);m(this,ge);h(this,"env",{});m(this,F);h(this,"finalized",!1);h(this,"error");m(this,re);m(this,N);m(this,E);m(this,be);m(this,le);m(this,de);m(this,G);m(this,ve);m(this,ye);h(this,"render",(...e)=>(l(this,le)??u(this,le,t=>this.html(t)),l(this,le).call(this,...e)));h(this,"setLayout",e=>u(this,be,e));h(this,"getLayout",()=>l(this,be));h(this,"setRenderer",e=>{u(this,le,e)});h(this,"header",(e,t,a)=>{this.finalized&&u(this,E,new Response(l(this,E).body,l(this,E)));const s=l(this,E)?l(this,E).headers:l(this,G)??u(this,G,new Headers);t===void 0?s.delete(e):a!=null&&a.append?s.append(e,t):s.set(e,t)});h(this,"status",e=>{u(this,re,e)});h(this,"set",(e,t)=>{l(this,F)??u(this,F,new Map),l(this,F).set(e,t)});h(this,"get",e=>l(this,F)?l(this,F).get(e):void 0);h(this,"newResponse",(...e)=>g(this,$,se).call(this,...e));h(this,"body",(e,t,a)=>g(this,$,se).call(this,e,t,a));h(this,"text",(e,t,a)=>!l(this,G)&&!l(this,re)&&!t&&!a&&!this.finalized?new Response(e):g(this,$,se).call(this,e,t,Ne(Nt,a)));h(this,"json",(e,t,a)=>g(this,$,se).call(this,JSON.stringify(e),t,Ne("application/json",a)));h(this,"html",(e,t,a)=>{const s=i=>g(this,$,se).call(this,i,t,Ne("text/html; charset=UTF-8",a));return typeof e=="object"?rt(e,Ft.Stringify,!1,{}).then(s):s(e)});h(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});h(this,"notFound",()=>(l(this,de)??u(this,de,()=>new Response),l(this,de).call(this,this)));u(this,xe,e),t&&(u(this,N,t.executionCtx),this.env=t.env,u(this,de,t.notFoundHandler),u(this,ye,t.path),u(this,ve,t.matchResult))}get req(){return l(this,ge)??u(this,ge,new st(l(this,xe),l(this,ye),l(this,ve))),l(this,ge)}get event(){if(l(this,N)&&"respondWith"in l(this,N))return l(this,N);throw Error("This context has no FetchEvent")}get executionCtx(){if(l(this,N))return l(this,N);throw Error("This context has no ExecutionContext")}get res(){return l(this,E)||u(this,E,new Response(null,{headers:l(this,G)??u(this,G,new Headers)}))}set res(e){if(l(this,E)&&e){e=new Response(e.body,e);for(const[t,a]of l(this,E).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=l(this,E).headers.getSetCookie();e.headers.delete("set-cookie");for(const i of s)e.headers.append("set-cookie",i)}else e.headers.set(t,a)}u(this,E,e),this.finalized=!0}get var(){return l(this,F)?Object.fromEntries(l(this,F)):{}}},xe=new WeakMap,ge=new WeakMap,F=new WeakMap,re=new WeakMap,N=new WeakMap,E=new WeakMap,be=new WeakMap,le=new WeakMap,de=new WeakMap,G=new WeakMap,ve=new WeakMap,ye=new WeakMap,$=new WeakSet,se=function(e,t,a){const s=l(this,E)?new Headers(l(this,E).headers):l(this,G)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,c]of n)r.toLowerCase()==="set-cookie"?s.append(r,c):s.set(r,c)}if(a)for(const[n,r]of Object.entries(a))if(typeof r=="string")s.set(n,r);else{s.delete(n);for(const c of r)s.append(n,c)}const i=typeof t=="number"?t:(t==null?void 0:t.status)??l(this,re);return new Response(e,{status:i,headers:s})},Je),y="ALL",Vt="all",Dt=["get","post","put","delete","options","patch"],lt="Can not add a route since the matcher is already built.",dt=class extends Error{},Bt="__COMPOSED_HANDLER",Ht=e=>e.text("404 Not Found",404),qe=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},A,j,ot,O,J,Ee,ke,oe,_t=(oe=class{constructor(t={}){m(this,j);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");m(this,A,"/");h(this,"routes",[]);m(this,O,Ht);h(this,"errorHandler",qe);h(this,"onError",t=>(this.errorHandler=t,this));h(this,"notFound",t=>(u(this,O,t),this));h(this,"fetch",(t,...a)=>g(this,j,ke).call(this,t,a[1],a[0],t.method));h(this,"request",(t,a,s,i)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,i):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ae("/",t)}`,a),s,i)));h(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(g(this,j,ke).call(this,t.request,t,void 0,t.request.method))})});[...Dt,Vt].forEach(n=>{this[n]=(r,...c)=>(typeof r=="string"?u(this,A,r):g(this,j,J).call(this,n,l(this,A),r),c.forEach(d=>{g(this,j,J).call(this,n,l(this,A),d)}),this)}),this.on=(n,r,...c)=>{for(const d of[r].flat()){u(this,A,d);for(const o of[n].flat())c.map(p=>{g(this,j,J).call(this,o.toUpperCase(),l(this,A),p)})}return this},this.use=(n,...r)=>(typeof n=="string"?u(this,A,n):(u(this,A,"*"),r.unshift(n)),r.forEach(c=>{g(this,j,J).call(this,y,l(this,A),c)}),this);const{strict:s,...i}=t;Object.assign(this,i),this.getPath=s??!0?t.getPath??Ze:Ct}route(t,a){const s=this.basePath(t);return a.routes.map(i=>{var r;let n;a.errorHandler===qe?n=i.handler:(n=async(c,d)=>(await _e([],a.errorHandler)(c,()=>i.handler(c,d))).res,n[Bt]=i.handler),g(r=s,j,J).call(r,i.method,i.path,n)}),this}basePath(t){const a=g(this,j,ot).call(this);return a._basePath=ae(this._basePath,t),a}mount(t,a,s){let i,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,s.replaceRequest===!1?i=d=>d:i=s.replaceRequest));const r=n?d=>{const o=n(d);return Array.isArray(o)?o:[o]}:d=>{let o;try{o=d.executionCtx}catch{}return[d.env,o]};i||(i=(()=>{const d=ae(this._basePath,t),o=d==="/"?0:d.length;return p=>{const f=new URL(p.url);return f.pathname=f.pathname.slice(o)||"/",new Request(f,p)}})());const c=async(d,o)=>{const p=await a(i(d.req.raw),...r(d));if(p)return p;await o()};return g(this,j,J).call(this,y,ae(t,"*"),c),this}},A=new WeakMap,j=new WeakSet,ot=function(){const t=new oe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,u(t,O,l(this,O)),t.routes=this.routes,t},O=new WeakMap,J=function(t,a,s){t=t.toUpperCase(),a=ae(this._basePath,a);const i={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,i]),this.routes.push(i)},Ee=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},ke=function(t,a,s,i){if(i==="HEAD")return(async()=>new Response(null,await g(this,j,ke).call(this,t,a,s,"GET")))();const n=this.getPath(t,{env:s}),r=this.router.match(i,n),c=new Mt(t,{path:n,matchResult:r,env:s,executionCtx:a,notFoundHandler:l(this,O)});if(r[0].length===1){let o;try{o=r[0][0][0][0](c,async()=>{c.res=await l(this,O).call(this,c)})}catch(p){return g(this,j,Ee).call(this,p,c)}return o instanceof Promise?o.then(p=>p||(c.finalized?c.res:l(this,O).call(this,c))).catch(p=>g(this,j,Ee).call(this,p,c)):o??l(this,O).call(this,c)}const d=_e(r[0],this.errorHandler,l(this,O));return(async()=>{try{const o=await d(c);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return g(this,j,Ee).call(this,o,c)}})()},oe),ct=[];function $t(e,t){const a=this.buildAllMatchers(),s=((i,n)=>{const r=a[i]||a[y],c=r[2][n];if(c)return c;const d=n.match(r[0]);if(!d)return[[],ct];const o=d.indexOf("",1);return[r[1][o],d]});return this.match=s,s(e,t)}var Oe="[^/]+",he=".*",me="(?:|/.*)",ie=Symbol(),qt=new Set(".\\+*[^]$()");function zt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===he||e===me?1:t===he||t===me?-1:e===Oe?1:t===Oe?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Y,Q,P,ee,Ut=(ee=class{constructor(){m(this,Y);m(this,Q);m(this,P,Object.create(null))}insert(t,a,s,i,n){if(t.length===0){if(l(this,Y)!==void 0)throw ie;if(n)return;u(this,Y,a);return}const[r,...c]=t,d=r==="*"?c.length===0?["","",he]:["","",Oe]:r==="/*"?["","",me]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(d){const p=d[1];let f=d[2]||Oe;if(p&&d[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw ie;if(o=l(this,P)[f],!o){if(Object.keys(l(this,P)).some(x=>x!==he&&x!==me))throw ie;if(n)return;o=l(this,P)[f]=new ee,p!==""&&u(o,Q,i.varIndex++)}!n&&p!==""&&s.push([p,l(o,Q)])}else if(o=l(this,P)[r],!o){if(Object.keys(l(this,P)).some(p=>p.length>1&&p!==he&&p!==me))throw ie;if(n)return;o=l(this,P)[r]=new ee}o.insert(c,a,s,i,n)}buildRegExpStr(){const a=Object.keys(l(this,P)).sort(zt).map(s=>{const i=l(this,P)[s];return(typeof l(i,Q)=="number"?`(${s})@${l(i,Q)}`:qt.has(s)?`\\${s}`:s)+i.buildRegExpStr()});return typeof l(this,Y)=="number"&&a.unshift(`#${l(this,Y)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},Y=new WeakMap,Q=new WeakMap,P=new WeakMap,ee),Pe,je,Ke,Wt=(Ke=class{constructor(){m(this,Pe,{varIndex:0});m(this,je,new Ut)}insert(e,t,a){const s=[],i=[];for(let r=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,d=>{const o=`@\\${r}`;return i[r]=[o,d],r++,c=!0,o}),!c)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=i.length-1;r>=0;r--){const[c]=i[r];for(let d=n.length-1;d>=0;d--)if(n[d].indexOf(c)!==-1){n[d]=n[d].replace(c,i[r][1]);break}}return l(this,je).insert(n,t,s,l(this,Pe),a),s}buildRegExp(){let e=l(this,je).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(i,n,r)=>n!==void 0?(a[++t]=Number(n),"$()"):(r!==void 0&&(s[Number(r)]=++t),"")),[new RegExp(`^${e}`),a,s]}},Pe=new WeakMap,je=new WeakMap,Ke),Jt=[/^$/,[],Object.create(null)],Ae=Object.create(null);function pt(e){return Ae[e]??(Ae[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function Kt(){Ae=Object.create(null)}function Gt(e){var o;const t=new Wt,a=[];if(e.length===0)return Jt;const s=e.map(p=>[!/\*|\/:/.test(p[0]),...p]).sort(([p,f],[x,v])=>p?1:x?-1:f.length-v.length),i=Object.create(null);for(let p=0,f=-1,x=s.length;p<x;p++){const[v,w,C]=s[p];v?i[w]=[C.map(([S])=>[S,Object.create(null)]),ct]:f++;let b;try{b=t.insert(w,f,v)}catch(S){throw S===ie?new dt(w):S}v||(a[f]=C.map(([S,B])=>{const Se=Object.create(null);for(B-=1;B>=0;B--){const[Te,I]=b[B];Se[Te]=I}return[S,Se]}))}const[n,r,c]=t.buildRegExp();for(let p=0,f=a.length;p<f;p++)for(let x=0,v=a[p].length;x<v;x++){const w=(o=a[p][x])==null?void 0:o[1];if(!w)continue;const C=Object.keys(w);for(let b=0,S=C.length;b<S;b++)w[C[b]]=c[w[C[b]]]}const d=[];for(const p in r)d[p]=a[r[p]];return[n,d,i]}function te(e,t){if(e){for(const a of Object.keys(e).sort((s,i)=>i.length-s.length))if(pt(a).test(t))return[...e[a]]}}var q,z,Ce,ft,Ge,Yt=(Ge=class{constructor(){m(this,Ce);h(this,"name","RegExpRouter");m(this,q);m(this,z);h(this,"match",$t);u(this,q,{[y]:Object.create(null)}),u(this,z,{[y]:Object.create(null)})}add(e,t,a){var c;const s=l(this,q),i=l(this,z);if(!s||!i)throw new Error(lt);s[e]||[s,i].forEach(d=>{d[e]=Object.create(null),Object.keys(d[y]).forEach(o=>{d[e][o]=[...d[y][o]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const d=pt(t);e===y?Object.keys(s).forEach(o=>{var p;(p=s[o])[t]||(p[t]=te(s[o],t)||te(s[y],t)||[])}):(c=s[e])[t]||(c[t]=te(s[e],t)||te(s[y],t)||[]),Object.keys(s).forEach(o=>{(e===y||e===o)&&Object.keys(s[o]).forEach(p=>{d.test(p)&&s[o][p].push([a,n])})}),Object.keys(i).forEach(o=>{(e===y||e===o)&&Object.keys(i[o]).forEach(p=>d.test(p)&&i[o][p].push([a,n]))});return}const r=et(t)||[t];for(let d=0,o=r.length;d<o;d++){const p=r[d];Object.keys(i).forEach(f=>{var x;(e===y||e===f)&&((x=i[f])[p]||(x[p]=[...te(s[f],p)||te(s[y],p)||[]]),i[f][p].push([a,n-o+d+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(l(this,z)).concat(Object.keys(l(this,q))).forEach(t=>{e[t]||(e[t]=g(this,Ce,ft).call(this,t))}),u(this,q,u(this,z,void 0)),Kt(),e}},q=new WeakMap,z=new WeakMap,Ce=new WeakSet,ft=function(e){const t=[];let a=e===y;return[l(this,q),l(this,z)].forEach(s=>{const i=s[e]?Object.keys(s[e]).map(n=>[n,s[e][n]]):[];i.length!==0?(a||(a=!0),t.push(...i)):e!==y&&t.push(...Object.keys(s[y]).map(n=>[n,s[y][n]]))}),a?Gt(t):null},Ge),U,M,Ye,Qt=(Ye=class{constructor(e){h(this,"name","SmartRouter");m(this,U,[]);m(this,M,[]);u(this,U,e.routers)}add(e,t,a){if(!l(this,M))throw new Error(lt);l(this,M).push([e,t,a])}match(e,t){if(!l(this,M))throw new Error("Fatal error");const a=l(this,U),s=l(this,M),i=a.length;let n=0,r;for(;n<i;n++){const c=a[n];try{for(let d=0,o=s.length;d<o;d++)c.add(...s[d]);r=c.match(e,t)}catch(d){if(d instanceof dt)continue;throw d}this.match=c.match.bind(c),u(this,U,[c]),u(this,M,void 0);break}if(n===i)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(l(this,M)||l(this,U).length!==1)throw new Error("No active router has been determined yet.");return l(this,U)[0]}},U=new WeakMap,M=new WeakMap,Ye),ue=Object.create(null),W,R,X,ce,T,V,K,pe,Xt=(pe=class{constructor(t,a,s){m(this,V);m(this,W);m(this,R);m(this,X);m(this,ce,0);m(this,T,ue);if(u(this,R,s||Object.create(null)),u(this,W,[]),t&&a){const i=Object.create(null);i[t]={handler:a,possibleKeys:[],score:0},u(this,W,[i])}u(this,X,[])}insert(t,a,s){u(this,ce,++He(this,ce)._);let i=this;const n=Et(a),r=[];for(let c=0,d=n.length;c<d;c++){const o=n[c],p=n[c+1],f=Ot(o,p),x=Array.isArray(f)?f[0]:o;if(x in l(i,R)){i=l(i,R)[x],f&&r.push(f[1]);continue}l(i,R)[x]=new pe,f&&(l(i,X).push(f),r.push(f[1])),i=l(i,R)[x]}return l(i,W).push({[t]:{handler:s,possibleKeys:r.filter((c,d,o)=>o.indexOf(c)===d),score:l(this,ce)}}),i}search(t,a){var d;const s=[];u(this,T,ue);let n=[this];const r=Xe(a),c=[];for(let o=0,p=r.length;o<p;o++){const f=r[o],x=o===p-1,v=[];for(let w=0,C=n.length;w<C;w++){const b=n[w],S=l(b,R)[f];S&&(u(S,T,l(b,T)),x?(l(S,R)["*"]&&s.push(...g(this,V,K).call(this,l(S,R)["*"],t,l(b,T))),s.push(...g(this,V,K).call(this,S,t,l(b,T)))):v.push(S));for(let B=0,Se=l(b,X).length;B<Se;B++){const Te=l(b,X)[B],I=l(b,T)===ue?{}:{...l(b,T)};if(Te==="*"){const H=l(b,R)["*"];H&&(s.push(...g(this,V,K).call(this,H,t,l(b,T))),u(H,T,I),v.push(H));continue}const[xt,De,fe]=Te;if(!f&&!(fe instanceof RegExp))continue;const L=l(b,R)[xt],gt=r.slice(o).join("/");if(fe instanceof RegExp){const H=fe.exec(gt);if(H){if(I[De]=H[0],s.push(...g(this,V,K).call(this,L,t,l(b,T),I)),Object.keys(l(L,R)).length){u(L,T,I);const Ie=((d=H[0].match(/\//))==null?void 0:d.length)??0;(c[Ie]||(c[Ie]=[])).push(L)}continue}}(fe===!0||fe.test(f))&&(I[De]=f,x?(s.push(...g(this,V,K).call(this,L,t,I,l(b,T))),l(L,R)["*"]&&s.push(...g(this,V,K).call(this,l(L,R)["*"],t,I,l(b,T)))):(u(L,T,I),v.push(L)))}}n=v.concat(c.shift()??[])}return s.length>1&&s.sort((o,p)=>o.score-p.score),[s.map(({handler:o,params:p})=>[o,p])]}},W=new WeakMap,R=new WeakMap,X=new WeakMap,ce=new WeakMap,T=new WeakMap,V=new WeakSet,K=function(t,a,s,i){const n=[];for(let r=0,c=l(t,W).length;r<c;r++){const d=l(t,W)[r],o=d[a]||d[y],p={};if(o!==void 0&&(o.params=Object.create(null),n.push(o),s!==ue||i&&i!==ue))for(let f=0,x=o.possibleKeys.length;f<x;f++){const v=o.possibleKeys[f],w=p[o.score];o.params[v]=i!=null&&i[v]&&!w?i[v]:s[v]??(i==null?void 0:i[v]),p[o.score]=!0}}return n},pe),Z,Qe,Zt=(Qe=class{constructor(){h(this,"name","TrieRouter");m(this,Z);u(this,Z,new Xt)}add(e,t,a){const s=et(t);if(s){for(let i=0,n=s.length;i<n;i++)l(this,Z).insert(e,s[i],a);return}l(this,Z).insert(e,t,a)}match(e,t){return l(this,Z).search(e,t)}},Z=new WeakMap,Qe),ut=class extends _t{constructor(e={}){super(e),this.router=e.router??new Qt({routers:[new Yt,new Zt]})}},ea=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(n=>typeof n=="string"?n==="*"?()=>n:r=>n===r?r:null:typeof n=="function"?n:r=>n.includes(r)?r:null)(a.origin),i=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(a.allowMethods);return async function(r,c){var p;function d(f,x){r.res.headers.set(f,x)}const o=await s(r.req.header("origin")||"",r);if(o&&d("Access-Control-Allow-Origin",o),a.credentials&&d("Access-Control-Allow-Credentials","true"),(p=a.exposeHeaders)!=null&&p.length&&d("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),r.req.method==="OPTIONS"){a.origin!=="*"&&d("Vary","Origin"),a.maxAge!=null&&d("Access-Control-Max-Age",a.maxAge.toString());const f=await i(r.req.header("origin")||"",r);f.length&&d("Access-Control-Allow-Methods",f.join(","));let x=a.allowHeaders;if(!(x!=null&&x.length)){const v=r.req.header("Access-Control-Request-Headers");v&&(x=v.split(/\s*,\s*/))}return x!=null&&x.length&&(d("Access-Control-Allow-Headers",x.join(",")),r.res.headers.append("Vary","Access-Control-Request-Headers")),r.res.headers.delete("Content-Length"),r.res.headers.delete("Content-Type"),new Response(null,{headers:r.res.headers,status:204,statusText:"No Content"})}await c(),a.origin!=="*"&&r.header("Vary","Origin",{append:!0})}},ta=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ze=(e,t=sa)=>{const a=/\.([a-zA-Z0-9]+?)$/,s=e.match(a);if(!s)return;let i=t[s[1]];return i&&i.startsWith("text")&&(i+="; charset=utf-8"),i},aa={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},sa=aa,ia=(...e)=>{let t=e.filter(i=>i!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const a=t.split("/"),s=[];for(const i of a)i===".."&&s.length>0&&s.at(-1)!==".."?s.pop():i!=="."&&s.push(i);return s.join("/")||"."},ht={br:".br",zstd:".zst",gzip:".gz"},na=Object.keys(ht),ra="index.html",la=e=>{const t=e.root??"./",a=e.path,s=e.join??ia;return async(i,n)=>{var p,f,x,v;if(i.finalized)return n();let r;if(e.path)r=e.path;else try{if(r=decodeURIComponent(i.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(r))throw new Error}catch{return await((p=e.onNotFound)==null?void 0:p.call(e,i.req.path,i)),n()}let c=s(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(c)&&(c=s(c,ra));const d=e.getContent;let o=await d(c,i);if(o instanceof Response)return i.newResponse(o.body,o);if(o){const w=e.mimes&&ze(c,e.mimes)||ze(c);if(i.header("Content-Type",w||"application/octet-stream"),e.precompressed&&(!w||ta.test(w))){const C=new Set((f=i.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(b=>b.trim()));for(const b of na){if(!C.has(b))continue;const S=await d(c+ht[b],i);if(S){o=S,i.header("Content-Encoding",b),i.header("Vary","Accept-Encoding",{append:!0});break}}}return await((x=e.onFound)==null?void 0:x.call(e,c,i)),i.body(o)}await((v=e.onNotFound)==null?void 0:v.call(e,c,i)),await n()}},da=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const i=a[e]||e;if(!i)return null;const n=await s.get(i,{type:"stream"});return n||null},oa=e=>async function(a,s){return la({...e,getContent:async n=>da(n,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,s)},ca=e=>oa(e);const we=new ut;we.use("/api/*",ea());we.use("/static/*",ca({root:"./public"}));we.post("/api/contact",async e=>{try{const t=await e.req.json(),{name:a,email:s,organization:i,phone:n,message:r,type:c,language:d}=t;return!a||!s||!r?e.json({success:!1,error:"Required fields are missing"},400):(console.log("Contact form submission:",{name:a,email:s,organization:i,phone:n,message:r,type:c,language:d}),e.json({success:!0,message:d==="ja"?"お問い合わせありがとうございます。担当者より折り返しご連絡いたします。":"Thank you for your inquiry. We will contact you soon."}))}catch(t){return console.error("Contact form error:",t),e.json({success:!1,error:"Internal server error"},500)}});we.get("/",e=>e.html(`
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="VALORISE（ヴァロライズ）- 理学療法士・トレーナーの中越清登が提供する、競技力向上と怪我予防のためのフィジカル測定サービス。科学的データ分析で選手の可能性を最大化します。">
    <meta name="keywords" content="フィジカル測定,スポーツ科学,パフォーマンス向上,怪我予防,トレーニング,中越清登,VALORISE,ヴァロライズ">
    <title>VALORISE（ヴァロライズ）｜フィジカル測定サービス - あなたのフィジカルを"科学"する</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"><\/script>
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
    
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Noto Sans JP', 'Roboto', sans-serif;
        }
        
        .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .section-gradient {
            background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .smooth-scroll {
            scroll-behavior: smooth;
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fadeInUp {
            animation: fadeInUp 1s ease-out;
        }
        
        /* Language Toggle */
        .lang-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        /* Navigation */
        nav {
            transition: all 0.3s ease;
        }
        
        nav.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="smooth-scroll">
    
    <!-- Language Toggle -->
    <div class="lang-toggle">
        <button id="langToggle" class="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
            <i class="fas fa-globe mr-2"></i>
            <span id="currentLang">EN</span>
        </button>
    </div>

    <!-- Navigation -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
        <div class="container mx-auto px-6 flex justify-between items-center">
            <div class="text-2xl font-bold text-white" id="logo">
                <span class="text-gradient-white">VALORISE</span>
            </div>
            <div class="hidden md:flex space-x-6">
                <a href="#about" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a>
                <a href="#features" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="特徴" data-en="Features">特徴</a>
                <a href="#services" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定項目" data-en="Services">測定項目</a>
                <a href="#team" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定スタッフ" data-en="Team">測定スタッフ</a>
                <a href="#pricing" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="料金プラン" data-en="Pricing">料金プラン</a>
                <a href="#contact" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>
            </div>
            <button id="mobileMenuBtn" class="md:hidden text-white">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-white mt-4 py-4 px-6 rounded-lg shadow-lg mx-6">
            <a href="#about" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a>
            <a href="#features" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="特徴" data-en="Features">特徴</a>
            <a href="#services" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="測定項目" data-en="Services">測定項目</a>
            <a href="#team" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="測定スタッフ" data-en="Team">測定スタッフ</a>
            <a href="#pricing" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="料金プラン" data-en="Pricing">料金プラン</a>
            <a href="#contact" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-gradient min-h-screen flex items-center justify-center text-white px-6 pt-20">
        <div class="container mx-auto text-center">
            <div class="animate-fadeInUp">
                <h1 class="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up">
                    <span id="heroTitle1" data-ja="あなたのフィジカルを" data-en="Transform Your Physical">あなたのフィジカルを</span><br>
                    <span id="heroTitle2" data-ja='"科学"する。' data-en='Performance with Science.'>"科学"する。</span>
                </h1>
                <p class="text-xl md:text-2xl mb-4" data-aos="fade-up" data-aos-delay="200">
                    <span id="heroSubtitle" data-ja="VALORISE フィジカル測定" data-en="VALORISE Physical Assessment">VALORISE フィジカル測定</span>
                </p>
                <p class="text-lg md:text-xl mb-8 opacity-90" data-aos="fade-up" data-aos-delay="400">
                    <span id="heroDescription" data-ja="トップアスリートも信頼する測定を、あなたに。" data-en="Trusted by top athletes worldwide.">トップアスリートも信頼する測定を、あなたに。</span>
                </p>
                <div class="flex flex-col md:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="600">
                    <a href="#contact" class="btn-primary text-white px-8 py-4 rounded-full text-lg font-semibold inline-block">
                        <i class="fas fa-calendar-check mr-2"></i>
                        <span id="heroCTA1" data-ja="無料相談を予約" data-en="Book Free Consultation">無料相談を予約</span>
                    </a>
                    <a href="#about" class="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-semibold inline-block hover:bg-gray-100 transition-all">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span id="heroCTA2" data-ja="詳しく見る" data-en="Learn More">詳しく見る</span>
                    </a>
                </div>
                <div class="mt-12 text-sm opacity-80" data-aos="fade-up" data-aos-delay="800">
                    <p id="heroCredentials" data-ja="理学療法士 × トレーナー × データサイエンス" data-en="Physical Therapist × Trainer × Data Science">理学療法士 × トレーナー × データサイエンス</p>
                    <p class="mt-2" id="heroFounder" data-ja="中越清登が提供する唯一無二のフィジカル測定サービス" data-en="Unique physical assessment service by Kiyoto Nakagoshi">中越清登が提供する唯一無二のフィジカル測定サービス</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="aboutTitle" data-ja="VALORISEとは" data-en="What is VALORISE">VALORISEとは</span>
                </h2>
                <p class="text-xl text-gray-600" id="aboutSubtitle" data-ja="測定を通じて、選手の可能性を可視化し、価値を最大化する" data-en="Visualize potential and maximize value through measurement">測定を通じて、選手の可能性を可視化し、価値を最大化する</p>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <div class="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg" data-aos="fade-up">
                    <p class="text-lg leading-relaxed mb-6" id="aboutText1" 
                       data-ja="VALORISE（ヴァロライズ）は、理学療法士・トレーナーの中越清登が開発した「競技力向上と怪我予防のためのフィジカル測定サービス」です。"
                       data-en="VALORISE is a comprehensive physical assessment service developed by physical therapist and trainer Kiyoto Nakagoshi for performance enhancement and injury prevention.">
                        VALORISE（ヴァロライズ）は、理学療法士・トレーナーの中越清登が開発した「競技力向上と怪我予防のためのフィジカル測定サービス」です。
                    </p>
                    <p class="text-lg leading-relaxed mb-6" id="aboutText2"
                       data-ja="単なる数値計測ではなく、スプリント・ジャンプ・パワー・左右差・動作特性などを科学的に解析し、競技パフォーマンスを決める根本要因を可視化します。"
                       data-en="Beyond simple measurements, we scientifically analyze sprint, jump, power, bilateral differences, and movement characteristics to visualize the fundamental factors that determine athletic performance.">
                        単なる数値計測ではなく、スプリント・ジャンプ・パワー・左右差・動作特性などを科学的に解析し、競技パフォーマンスを決める根本要因を可視化します。
                    </p>
                    <p class="text-xl font-semibold text-center text-purple-700 mt-8" id="aboutTagline"
                       data-ja="選手・チームが「伸びる理由」をつくる測定。それがVALORISEです。"
                       data-en='Creating the "reason to grow" for athletes and teams. That is VALORISE.'>
                        選手・チームが「伸びる理由」をつくる測定。それがVALORISEです。
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8 mt-12">
                    <div class="text-center" data-aos="fade-up" data-aos-delay="100">
                        <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-microscope text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2" id="mission1Title" data-ja="科学的根拠" data-en="Scientific Evidence">科学的根拠</h3>
                        <p class="text-gray-600" id="mission1Text" data-ja="数千名以上のデータに基づく分析" data-en="Analysis based on thousands of athletes">数千名以上のデータに基づく分析</p>
                    </div>
                    <div class="text-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-md text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2" id="mission2Title" data-ja="専門性" data-en="Expertise">専門性</h3>
                        <p class="text-gray-600" id="mission2Text" data-ja="理学療法とトレーニングの融合" data-en="Fusion of therapy and training">理学療法とトレーニングの融合</p>
                    </div>
                    <div class="text-center" data-aos="fade-up" data-aos-delay="300">
                        <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-chart-line text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2" id="mission3Title" data-ja="実践的" data-en="Practical">実践的</h3>
                        <p class="text-gray-600" id="mission3Text" data-ja="即トレーニングに活かせる提案" data-en="Actionable training recommendations">即トレーニングに活かせる提案</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="section-gradient py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="featuresTitle" data-ja="VALORISE測定の8つの特徴" data-en="8 Unique Features">VALORISE測定の8つの特徴</span>
                </h2>
                <p class="text-xl text-gray-600" id="featuresSubtitle" data-ja="なぜVALORISEが選ばれるのか" data-en="Why VALORISE is chosen">なぜVALORISEが選ばれるのか</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="100">
                    <div class="text-4xl mb-4">🔬</div>
                    <h3 class="text-xl font-bold mb-3" id="feature1Title" data-ja="中越式データ分析" data-en="Nakagoshi Method">中越式データ分析</h3>
                    <p class="text-gray-600" id="feature1Text" 
                       data-ja="数千名以上の経験から開発された独自の評価法。データから選手の未来を読み解きます。"
                       data-en="Unique evaluation method developed from thousands of cases. Reading the athlete's future from data.">
                        数千名以上の経験から開発された独自の評価法。データから選手の未来を読み解きます。
                    </p>
                </div>
                
                <!-- Feature 2 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="200">
                    <div class="text-4xl mb-4">📊</div>
                    <h3 class="text-xl font-bold mb-3" id="feature2Title" data-ja="一気通貫評価" data-en="Comprehensive Assessment">一気通貫評価</h3>
                    <p class="text-gray-600" id="feature2Text"
                       data-ja="スプリント、ジャンプ、パワー、可動域を総合的に評価。運動能力の根本を可視化します。"
                       data-en="Comprehensive evaluation of sprint, jump, power, and mobility. Visualizing the fundamentals of athletic ability.">
                        スプリント、ジャンプ、パワー、可動域を総合的に評価。運動能力の根本を可視化します。
                    </p>
                </div>
                
                <!-- Feature 3 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="300">
                    <div class="text-4xl mb-4">🏃</div>
                    <h3 class="text-xl font-bold mb-3" id="feature3Title" data-ja="スプリント特性分析" data-en="Sprint Analysis">スプリント特性分析</h3>
                    <p class="text-gray-600" id="feature3Text"
                       data-ja="加速型・最高速型など、あなたの走りのタイプを明確化。改善ポイントが一目瞭然。"
                       data-en="Identify your sprint type - acceleration or max speed. Clear improvement points.">
                        加速型・最高速型など、あなたの走りのタイプを明確化。改善ポイントが一目瞭然。
                    </p>
                </div>
                
                <!-- Feature 4 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="400">
                    <div class="text-4xl mb-4">⚖️</div>
                    <h3 class="text-xl font-bold mb-3" id="feature4Title" data-ja="左右差の精密評価" data-en="Bilateral Assessment">左右差の精密評価</h3>
                    <p class="text-gray-600" id="feature4Text"
                       data-ja="RB・RDL・片脚動作から左右差を高精度で評価。怪我の大きな原因を特定します。"
                       data-en="Precise bilateral difference assessment through RB, RDL, and single-leg movements. Identify major injury causes.">
                        RB・RDL・片脚動作から左右差を高精度で評価。怪我の大きな原因を特定します。
                    </p>
                </div>
                
                <!-- Feature 5 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="500">
                    <div class="text-4xl mb-4">⚡</div>
                    <h3 class="text-xl font-bold mb-3" id="feature5Title" data-ja="VBTパワー分析" data-en="VBT Analysis">VBTパワー分析</h3>
                    <p class="text-gray-600" id="feature5Text"
                       data-ja="速度・加速度・パワー発揮のタイミングまで分析。実戦向けの強さを評価します。"
                       data-en="Analyze velocity, acceleration, and power timing. Evaluate practical strength.">
                        速度・加速度・パワー発揮のタイミングまで分析。実戦向けの強さを評価します。
                    </p>
                </div>
                
                <!-- Feature 6 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="600">
                    <div class="text-4xl mb-4">🛡️</div>
                    <h3 class="text-xl font-bold mb-3" id="feature6Title" data-ja="怪我予防分析" data-en="Injury Prevention">怪我予防分析</h3>
                    <p class="text-gray-600" id="feature6Text"
                       data-ja="怪我しやすい動作パターンを測定段階で見抜き、予防プランにつなげます。"
                       data-en="Identify injury-prone movement patterns and connect to prevention plans.">
                        怪我しやすい動作パターンを測定段階で見抜き、予防プランにつなげます。
                    </p>
                </div>
                
                <!-- Feature 7 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="700">
                    <div class="text-4xl mb-4">🎯</div>
                    <h3 class="text-xl font-bold mb-3" id="feature7Title" data-ja="ポジション別比較" data-en="Position Comparison">ポジション別比較</h3>
                    <p class="text-gray-600" id="feature7Text"
                       data-ja="競技・ポジション別にあなたの強み・弱みをランキング化。現在地を正確に把握。"
                       data-en="Rank your strengths and weaknesses by sport and position. Accurate positioning.">
                        競技・ポジション別にあなたの強み・弱みをランキング化。現在地を正確に把握。
                    </p>
                </div>
                
                <!-- Feature 8 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="800">
                    <div class="text-4xl mb-4">📝</div>
                    <h3 class="text-xl font-bold mb-3" id="feature8Title" data-ja="具体的行動指針" data-en="Action Plan">具体的行動指針</h3>
                    <p class="text-gray-600" id="feature8Text"
                       data-ja="測定後は「明日から何をやるか」が明確に。中越式フィードバックで成長への道筋を提示。"
                       data-en="Clear action plan from day one. Nakagoshi feedback shows the path to growth.">
                        測定後は「明日から何をやるか」が明確に。中越式フィードバックで成長への道筋を提示。
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Measurement Items Section -->
    <section id="services" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="servicesTitle" data-ja="測定項目" data-en="Measurement Items">測定項目</span>
                </h2>
                <p class="text-xl text-gray-600" id="servicesSubtitle" data-ja="競技パフォーマンスを決める全要素を網羅" data-en="Comprehensive assessment of performance factors">競技パフォーマンスを決める全要素を網羅</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <!-- Sprint -->
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-running text-4xl text-blue-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service1Title" data-ja="スプリント測定" data-en="Sprint Assessment">スプリント測定</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="5m / 10m / 30m タイム測定" data-en="5m / 10m / 30m time measurement">5m / 10m / 30m タイム測定</span></li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="加速力・最高速度の評価" data-en="Acceleration & max speed evaluation">加速力・最高速度の評価</span></li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="スプリント特性の分析" data-en="Sprint characteristic analysis">スプリント特性の分析</span></li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="ピーク速度・スタートの癖" data-en="Peak speed & start habits">ピーク速度・スタートの癖</span></li>
                    </ul>
                </div>
                
                <!-- Jump -->
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-arrow-up text-4xl text-green-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service2Title" data-ja="ジャンプ測定" data-en="Jump Assessment">ジャンプ測定</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="CMJ（カウンタームーブメントジャンプ）" data-en="CMJ (Counter Movement Jump)">CMJ（カウンタームーブメントジャンプ）</span></li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="SCMJ（腕振りジャンプ）" data-en="SCMJ (Arm swing jump)">SCMJ（腕振りジャンプ）</span></li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="RB（リバウンドジャンプ）" data-en="RB (Rebound jump)">RB（リバウンドジャンプ）</span></li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="RSI・左右差の評価" data-en="RSI & bilateral difference">RSI・左右差の評価</span></li>
                    </ul>
                </div>
                
                <!-- Strength & Power -->
                <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-dumbbell text-4xl text-red-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service3Title" data-ja="筋力・パワー測定" data-en="Strength & Power">筋力・パワー測定</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="デッドリフト・スクワット" data-en="Deadlift & Squat">デッドリフト・スクワット</span></li>
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="ベンチプレス・懸垂" data-en="Bench Press & Pull-up">ベンチプレス・懸垂</span></li>
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="RDL30（片脚パワー）" data-en="RDL30 (Single leg power)">RDL30（片脚パワー）</span></li>
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="プッシュプレス（VBT分析）" data-en="Push Press (VBT analysis)">プッシュプレス（VBT分析）</span></li>
                    </ul>
                </div>
                
                <!-- Mobility -->
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-child text-4xl text-purple-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service4Title" data-ja="可動域・柔軟性" data-en="Mobility & Flexibility">可動域・柔軟性</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="肩関節可動域" data-en="Shoulder mobility">肩関節可動域</span></li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="股関節可動域" data-en="Hip mobility">股関節可動域</span></li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="ハムストリング柔軟性" data-en="Hamstring flexibility">ハムストリング柔軟性</span></li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="動作連動性の評価" data-en="Movement coordination">動作連動性の評価</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="section-gradient py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="benefitsTitle" data-ja="VALORISE測定で得られる4つの価値" data-en="4 Key Benefits">VALORISE測定で得られる4つの価値</span>
                </h2>
                <p class="text-xl text-gray-600" id="benefitsSubtitle" data-ja="測定後の成長が変わる" data-en="Transform your growth journey">測定後の成長が変わる</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <!-- Benefit 1 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up">
                    <div class="flex items-start">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-blue-600">01</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit1Title" data-ja="何を伸ばせばいいかが明確になる" data-en="Clear Development Direction">何を伸ばせばいいかが明確になる</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit1Text"
                               data-ja="加速が弱いのか、中間速度が弱いのか、地面反力の出し方が悪いのか、左右差が大きいのか。プレーの課題が「原因レベル」でわかるため、トレーニング効率が劇的に上がります。"
                               data-en="Identify whether it's acceleration, mid-speed, ground reaction force, or bilateral differences. Understanding issues at the root cause level dramatically improves training efficiency.">
                                加速が弱いのか、中間速度が弱いのか、地面反力の出し方が悪いのか、左右差が大きいのか。プレーの課題が「原因レベル」でわかるため、トレーニング効率が劇的に上がります。
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Benefit 2 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-start">
                        <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-green-600">02</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit2Title" data-ja="怪我しやすい理由が見える" data-en="Identify Injury Risks">怪我しやすい理由が見える</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit2Text"
                               data-ja="RB左右差、可動域不足、加速構造の崩れなど、怪我の根本要因をデータで把握。過去のフィジカルデータ比較から、怪我傾向を測定段階で見抜き、予防プランにつなげます。"
                               data-en="Identify root causes of injuries through RB bilateral differences, mobility limitations, and acceleration structure issues. Data-driven injury prevention planning.">
                                RB左右差、可動域不足、加速構造の崩れなど、怪我の根本要因をデータで把握。過去のフィジカルデータ比較から、怪我傾向を測定段階で見抜き、予防プランにつなげます。
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Benefit 3 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-start">
                        <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-purple-600">03</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit3Title" data-ja="明日からのトレーニングが変わる" data-en="Transform Your Training">明日からのトレーニングが変わる</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit3Text"
                               data-ja="目的別の「中越式トレーニング処方」を提供。優先すべきトレーニング、避けるべき動作、改善すべき左右差、競技力が上がるポイントが明確になります。効果が最短で出る方向性を提示します。"
                               data-en="Receive Nakagoshi's personalized training prescription. Clear priorities, movements to avoid, bilateral improvements, and performance enhancement points for fastest results.">
                                目的別の「中越式トレーニング処方」を提供。優先すべきトレーニング、避けるべき動作、改善すべき左右差、競技力が上がるポイントが明確になります。効果が最短で出る方向性を提示します。
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Benefit 4 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-start">
                        <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-red-600">04</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit4Title" data-ja="チーム強化の軸ができる" data-en="Team Enhancement Framework">チーム強化の軸ができる</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit4Text"
                               data-ja="ポジション別基準値の設定、年間計画の根拠づくり、データの共通言語化に最適。チームで測定すると、戦術とフィジカルを結びつける科学的基盤が構築できます。"
                               data-en="Establish position-specific benchmarks, evidence-based annual planning, and data-driven communication. Build a scientific foundation connecting tactics with physical capabilities.">
                                ポジション別基準値の設定、年間計画の根拠づくり、データの共通言語化に最適。チームで測定すると、戦術とフィジカルを結びつける科学的基盤が構築できます。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Target Audience Section -->
    <section id="target" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="targetTitle" data-ja="こんな方におすすめ" data-en="Who Should Use VALORISE">こんな方におすすめ</span>
                </h2>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md" data-aos="fade-up">
                    <i class="fas fa-chart-line text-3xl text-blue-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target1" data-ja="伸び悩んでいる原因を知りたい" data-en="Want to know why you're plateauing">伸び悩んでいる原因を知りたい</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="100">
                    <i class="fas fa-heartbeat text-3xl text-green-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target2" data-ja="怪我しやすい理由を知りたい" data-en="Want to understand injury patterns">怪我しやすい理由を知りたい</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="200">
                    <i class="fas fa-bolt text-3xl text-purple-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target3" data-ja="スプリントやジャンプを強化したい" data-en="Want to improve sprint and jump">スプリントやジャンプを強化したい</p>
                </div>
                <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="300">
                    <i class="fas fa-bullseye text-3xl text-red-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target4" data-ja="ポジション別の武器をつくりたい" data-en="Want position-specific strengths">ポジション別の武器をつくりたい</p>
                </div>
                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="400">
                    <i class="fas fa-map-marked-alt text-3xl text-yellow-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target5" data-ja="競技レベルの中で自分の現在地を知りたい" data-en="Want to know your competitive level">競技レベルの中で自分の現在地を知りたい</p>
                </div>
                <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="500">
                    <i class="fas fa-users text-3xl text-indigo-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target6" data-ja="チームトレーニングの方向性を明確にしたい" data-en="Want clear team training direction">チームトレーニングの方向性を明確にしたい</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="teamTitle" data-ja="VALORISE フィジカル測定チーム" data-en="VALORISE Measurement Team">VALORISE フィジカル測定チーム</span>
                </h2>
                <p class="text-xl text-gray-600" id="teamSubtitle" data-ja="6名体制の専門スタッフが測定をサポート" data-en="6-member professional team supports your assessment">6名体制の専門スタッフが測定をサポート</p>
            </div>
            
            <!-- Team Members -->
            <div class="max-w-7xl mx-auto space-y-8">
                
                <!-- 1. Director -->
                <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo Placeholder with Initials -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                            <span class="text-white text-4xl font-bold">KN</span>
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-purple-700 to-indigo-700 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                01
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team1Role" data-ja="VALORISE 統括ディレクター" data-en="Director">VALORISE 統括ディレクター</span>
                                <span class="text-purple-600 ml-2" id="team1Name" data-ja="（中越清登）" data-en="(Kiyoto Nakagoshi)">(中越清登)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team1Badge1" data-ja="全体統括" data-en="Overall Direction">全体統括</span>
                                <span class="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold" id="team1Badge2" data-ja="最終意思決定" data-en="Final Decision">最終意思決定</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team1Purpose" 
                               data-ja="VALORISEフィジカル測定事業全体の戦略策定・品質管理・対外窓口を担い、事業価値の最大化を図る。"
                               data-en="Responsible for overall strategy, quality control, and external relations of VALORISE physical assessment business to maximize business value.">
                                VALORISEフィジカル測定事業全体の戦略策定・品質管理・対外窓口を担い、事業価値の最大化を図る。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-purple-600 hover:text-purple-800" id="team1Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="測定事業の方向性・ビジョン策定" data-en="Business direction & vision">測定事業の方向性・ビジョン策定</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="測定項目・基準値の最終決定" data-en="Final measurement standards">測定項目・基準値の最終決定</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="学校・チーム・企業への営業・契約交渉" data-en="Sales & negotiations">学校・チーム・企業への営業・契約交渉</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="価格設定・見積作成の最終承認" data-en="Pricing approval">価格設定・見積作成の最終承認</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="スタッフ配置・報酬・年間スケジュール策定" data-en="Staff management">スタッフ配置・報酬・年間スケジュール策定</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="メディア発信（SNS・YouTube・PR）の統括" data-en="Media management">メディア発信（SNS・YouTube・PR）の統括</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 2. Special Advisor -->
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo Placeholder with Initials -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                            <span class="text-white text-4xl font-bold">NS</span>
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-yellow-600 to-orange-600 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                02
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team2Role" data-ja="特別アドバイザー" data-en="Special Advisor">特別アドバイザー</span>
                                <span class="text-orange-600 ml-2" id="team2Name" data-ja="（柴村直弥）" data-en="(Naoya Shibamura)">(柴村直弥)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team2Badge1" data-ja="技術助言" data-en="Technical Advice">技術助言</span>
                                <span class="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold" id="team2Badge2" data-ja="プロアスリート視点" data-en="Pro Athlete">プロアスリート視点</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team2Purpose"
                               data-ja="プロアスリート視点から測定内容の改善・品質向上に寄与し、VALORISEのブランド価値向上に貢献する。"
                               data-en="Contributes to improving measurement content and quality from a professional athlete's perspective, enhancing VALORISE's brand value.">
                                プロアスリート視点から測定内容の改善・品質向上に寄与し、VALORISEのブランド価値向上に貢献する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-orange-600 hover:text-orange-800" id="team2Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="測定項目・評価基準への助言" data-en="Measurement advice">測定項目・評価基準への助言</span></li>
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="現場での技術・動作分析アドバイス" data-en="Technical analysis">現場での技術・動作分析アドバイス</span></li>
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="チームの測定精度向上へのサポート" data-en="Quality improvement">チームの測定精度向上へのサポート</span></li>
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="PR・SNS協力（出演・コメント）" data-en="PR cooperation">PR・SNS協力（出演・コメント）</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 3. Technical Lead -->
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo with Hover Effect -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group">
                            <img src="/static/images/team/kitahara-color.jpg" 
                                 alt="北原寛也 - Technical Lead" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/kitahara-bw.jpg" 
                                 alt="北原寛也 - Technical Lead (B&W)" 
                                 class="absolute inset-0 w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-blue-600 to-cyan-600 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                03
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team3Role" data-ja="テクニカルリード" data-en="Technical Lead">テクニカルリード</span>
                                <span class="text-blue-600 ml-2" id="team3Name" data-ja="（北原寛也）" data-en="(Hiroya Kitahara)">(北原寛也)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team3Badge1" data-ja="技術責任" data-en="Technical Lead">技術責任</span>
                                <span class="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold" id="team3Badge2" data-ja="現場統括" data-en="Field Management">現場統括</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team3Purpose"
                               data-ja="現場での測定技術の最高責任者として、精度・効率・安全性を担保する。"
                               data-en="As the chief technical officer on-site, ensures accuracy, efficiency, and safety.">
                                現場での測定技術の最高責任者として、精度・効率・安全性を担保する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-blue-600 hover:text-blue-800" id="team3Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="光電管・VBT・ジャンプ測定の実施" data-en="Measurement execution">光電管・VBT・ジャンプ測定の実施</span></li>
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="測定導線の設計・配置管理" data-en="Setup design">測定導線の設計・配置管理</span></li>
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="オペレーターへの技術教育" data-en="Staff training">オペレーターへの技術教育</span></li>
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="デバイスのセットアップ・点検" data-en="Device management">デバイスのセットアップ・点検</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 4. Data Manager -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo Placeholder with Initials -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                            <span class="text-white text-4xl font-bold">TN</span>
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-green-700 to-emerald-700 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                04
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team4Role" data-ja="データマネージャー" data-en="Data Manager">データマネージャー</span>
                                <span class="text-green-600 ml-2" id="team4Name" data-ja="（根本大洋）" data-en="(Taiyo Nemoto)">(根本大洋)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team4Badge1" data-ja="解析" data-en="Analysis">解析</span>
                                <span class="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold" id="team4Badge2" data-ja="データ管理" data-en="Data Management">データ管理</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team4Purpose"
                               data-ja="測定データの正確な管理・整理・分析を行い、レポート作成までの工程を一元管理する。"
                               data-en="Manages accurate data processing, organization, and analysis, overseeing the entire report creation process.">
                                測定データの正確な管理・整理・分析を行い、レポート作成までの工程を一元管理する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-green-600 hover:text-green-800" id="team4Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="Excelへのデータ入力・チェック" data-en="Data entry">Excelへのデータ入力・チェック</span></li>
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="左右差・偏差値・基準値との比較" data-en="Comparative analysis">左右差・偏差値・基準値との比較</span></li>
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="個別フィードバック資料の作成" data-en="Report creation">個別フィードバック資料の作成</span></li>
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="チーム向け総括資料の作成" data-en="Team report">チーム向け総括資料の作成</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 5 & 6. Field Operators -->
                <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="400">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photos (2 operators) -->
                        <div class="flex flex-col space-y-2 flex-shrink-0">
                            <!-- Taiyo Urishima (05) - With hover effect -->
                            <div class="relative w-32 h-32 rounded-2xl overflow-hidden group">
                                <img src="/static/images/team/urishima-color.jpg" 
                                     alt="瓜島大洋 - Field Operator" 
                                     class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                                <img src="/static/images/team/urishima-bw.jpg" 
                                     alt="瓜島大洋 - Field Operator (B&W)" 
                                     class="absolute inset-0 w-full h-full object-cover">
                                <div class="absolute bottom-0 right-0 bg-gradient-to-br from-red-700 to-pink-700 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                    05
                                </div>
                            </div>
                            <!-- Hayate Fujimori (06) - Placeholder -->
                            <div class="relative w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                                <span class="text-white text-4xl font-bold">HF</span>
                                <div class="absolute bottom-0 right-0 bg-gradient-to-br from-red-600 to-pink-600 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                    06
                                </div>
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team5Role" data-ja="フィールドオペレーター（2名）" data-en="Field Operators (2)">フィールドオペレーター（2名）</span>
                            </h3>
                            <p class="text-gray-600 mb-4">
                                <span id="team5Name" data-ja="瓜島大洋、藤森颯" data-en="Taiyo Urishima, Hayate Fujimori">瓜島大洋、藤森颯</span>
                            </p>
                            <div class="mb-4">
                                <span class="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team5Badge1" data-ja="計測担当" data-en="Measurement">計測担当</span>
                                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold" id="team5Badge2" data-ja="現場サポート" data-en="Field Support">現場サポート</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team5Purpose"
                               data-ja="現場でのスプリント・ジャンプ・可動域測定を担当し、円滑で安全な測定運営に貢献する。"
                               data-en="Responsible for sprint, jump, and mobility measurements on-site, contributing to smooth and safe operations.">
                                現場でのスプリント・ジャンプ・可動域測定を担当し、円滑で安全な測定運営に貢献する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-red-600 hover:text-red-800" id="team5Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="スプリント測定の誘導・サポート" data-en="Sprint support">スプリント測定の誘導・サポート</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="ジャンプ測定（CMJ/SCMJ/RB）の実施" data-en="Jump measurement">ジャンプ測定（CMJ/SCMJ/RB）の実施</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="可動域チェック（肩・股関節）" data-en="Mobility check">可動域チェック（肩・股関節）</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="測定の順番管理・選手誘導" data-en="Flow management">測定の順番管理・選手誘導</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="荷物・備品の搬入搬出" data-en="Equipment setup">荷物・備品の搬入搬出</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="測定環境の安全確保" data-en="Safety management">測定環境の安全確保</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Team Balance Chart -->
            <div class="mt-16 max-w-5xl mx-auto" data-aos="fade-up">
                <h3 class="text-2xl font-bold text-center mb-8">
                    <span id="teamBalanceTitle" data-ja="6名体制の役割バランス" data-en="6-Member Team Role Balance">6名体制の役割バランス</span>
                </h3>
                <div class="bg-white rounded-2xl p-6 shadow-lg overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b-2 border-gray-300">
                                <th class="p-3 text-left font-bold" id="tableRole" data-ja="役職" data-en="Role">役職</th>
                                <th class="p-3 text-center font-bold" id="tableFocus" data-ja="役割の重心" data-en="Focus">役割の重心</th>
                                <th class="p-3 text-center font-bold" id="tableField" data-ja="現場" data-en="Field">現場</th>
                                <th class="p-3 text-center font-bold" id="tableData" data-ja="データ" data-en="Data">データ</th>
                                <th class="p-3 text-center font-bold" id="tableBusiness" data-ja="営業・戦略" data-en="Business">営業・戦略</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="中越" data-en="Nakagoshi">中越</span></td>
                                <td class="p-3"><span data-ja="全体統括" data-en="Overall Direction">全体統括</span></td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">○</td>
                                <td class="p-3 text-center">◎</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="柴村" data-en="Shibamura">柴村</span></td>
                                <td class="p-3"><span data-ja="技術助言" data-en="Technical Advice">技術助言</span></td>
                                <td class="p-3 text-center">○</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">○</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="テクニカルリード" data-en="Technical Lead">テクニカルリード</span></td>
                                <td class="p-3"><span data-ja="技術責任" data-en="Technical">技術責任</span></td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">△</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="データマネージャー" data-en="Data Manager">データマネージャー</span></td>
                                <td class="p-3"><span data-ja="解析" data-en="Analysis">解析</span></td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">△</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="オペレーター" data-en="Operator">オペレーター</span></td>
                                <td class="p-3"><span data-ja="計測担当" data-en="Measurement">計測担当</span></td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">－</td>
                            </tr>
                            <tr>
                                <td class="p-3"><span data-ja="オペレーター" data-en="Operator">オペレーター</span></td>
                                <td class="p-3"><span data-ja="計測担当" data-en="Measurement">計測担当</span></td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">－</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-4 text-xs text-gray-500 text-center">
                        <span data-ja="◎ = 主担当 / ○ = 関与大 / △ = 関与小 / － = なし" data-en="◎ = Primary / ○ = High / △ = Low / － = None">◎ = 主担当 / ○ = 関与大 / △ = 関与小 / － = なし</span>
                    </div>
                </div>
            </div>

            <!-- Team Strength -->
            <div class="mt-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 text-center" data-aos="fade-up">
                <h3 class="text-2xl font-bold mb-4">
                    <span id="teamStrengthTitle" data-ja="6名体制の強み" data-en="Team Strengths">6名体制の強み</span>
                </h3>
                <div class="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                        <div class="text-4xl mb-2">🎯</div>
                        <h4 class="font-bold mb-2" id="strength1Title" data-ja="高精度な測定" data-en="Precision">高精度な測定</h4>
                        <p class="text-sm text-gray-600" id="strength1Text" data-ja="各分野の専門家による正確な測定実施" data-en="Accurate measurements by specialists">各分野の専門家による正確な測定実施</p>
                    </div>
                    <div>
                        <div class="text-4xl mb-2">⚡</div>
                        <h4 class="font-bold mb-2" id="strength2Title" data-ja="効率的な運営" data-en="Efficiency">効率的な運営</h4>
                        <p class="text-sm text-gray-600" id="strength2Text" data-ja="役割分担による円滑な測定進行" data-en="Smooth operations through role division">役割分担による円滑な測定進行</p>
                    </div>
                    <div>
                        <div class="text-4xl mb-2">📊</div>
                        <h4 class="font-bold mb-2" id="strength3Title" data-ja="質の高い分析" data-en="Quality">質の高い分析</h4>
                        <p class="text-sm text-gray-600" id="strength3Text" data-ja="データから実践への一貫したサポート" data-en="Comprehensive support from data to practice">データから実践への一貫したサポート</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="section-gradient py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="pricingTitle" data-ja="料金プラン" data-en="Pricing Plans">料金プラン</span>
                </h2>
                <p class="text-xl text-gray-600" id="pricingSubtitle" data-ja="ニーズに合わせた4つのプラン" data-en="Four plans to fit your needs">ニーズに合わせた4つのプラン</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <!-- Entry Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow" data-aos="fade-up">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2" id="plan1Title" data-ja="VALORISE Entry" data-en="VALORISE Entry">VALORISE Entry</h3>
                        <p class="text-gray-600 text-sm mb-4" id="plan1Subtitle" data-ja="お試しプラン" data-en="Trial Plan">お試しプラン</p>
                        <div class="text-4xl font-bold text-purple-600">
                            ¥110,000
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan1Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature1" data-ja="基本測定（10m/30m、CMJ）" data-en="Basic measurements">基本測定（10m/30m、CMJ）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature2" data-ja="数値提示のみ" data-en="Data only">数値提示のみ</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan1Feature3" data-ja="個別評価なし" data-en="No individual assessment">個別評価なし</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan1Feature4" data-ja="トレーニングプログラムなし" data-en="No training program">トレーニングプログラムなし</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-gray-200 text-gray-800 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        <span id="plan1CTA" data-ja="詳細を見る" data-en="Learn More">詳細を見る</span>
                    </a>
                </div>
                
                <!-- Core Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2" id="plan2Title" data-ja="VALORISE Core" data-en="VALORISE Core">VALORISE Core</h3>
                        <p class="text-gray-600 text-sm mb-4" id="plan2Subtitle" data-ja="スタンダードプラン" data-en="Standard Plan">スタンダードプラン</p>
                        <div class="text-4xl font-bold text-purple-600">
                            ¥198,000
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan2Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature1" data-ja="スプリント・ジャンプ・RB・RDL30" data-en="Sprint, Jump, RB, RDL30">スプリント・ジャンプ・RB・RDL30</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature2" data-ja="チームレポート提供" data-en="Team report">チームレポート提供</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan2Feature3" data-ja="個人レポートなし" data-en="No individual report">個人レポートなし</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan2Feature4" data-ja="トレーニングプログラムなし" data-en="No training program">トレーニングプログラムなし</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        <span id="plan2CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
                
                <!-- Edge Plan (Recommended) -->
                <div class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-2xl transform scale-105 relative" data-aos="fade-up" data-aos-delay="200">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                        <span id="recommendedBadge" data-ja="おすすめ" data-en="Recommended">おすすめ</span>
                    </div>
                    <div class="text-center mb-6 text-white">
                        <h3 class="text-2xl font-bold mb-2" id="plan3Title" data-ja="VALORISE Edge" data-en="VALORISE Edge">VALORISE Edge</h3>
                        <p class="text-purple-100 text-sm mb-4" id="plan3Subtitle" data-ja="アドバンスプラン" data-en="Advanced Plan">アドバンスプラン</p>
                        <div class="text-4xl font-bold">
                            ¥440,000
                        </div>
                        <p class="text-sm text-purple-200 mt-2" id="plan3Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                    </div>
                    <ul class="space-y-3 mb-8 text-white">
                        <li class="flex items-start">
                            <i class="fas fa-check text-yellow-400 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan3Feature1" data-ja="全項目フルセット測定" data-en="Full comprehensive assessment">全項目フルセット測定</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-yellow-400 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan3Feature2" data-ja="個人レポート（コメント付き）" data-en="Individual report with comments">個人レポート（コメント付き）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-yellow-400 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan3Feature3" data-ja="チームレポート" data-en="Team report">チームレポート</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-purple-300 mr-2 mt-1"></i>
                            <span class="text-sm text-purple-200" id="plan3Feature4" data-ja="個別プログラムなし" data-en="No individual program">個別プログラムなし</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-white text-purple-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <span id="plan3CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
                
                <!-- Prime Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow" data-aos="fade-up" data-aos-delay="300">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2" id="plan4Title" data-ja="VALORISE Prime" data-en="VALORISE Prime">VALORISE Prime</h3>
                        <p class="text-gray-600 text-sm mb-4" id="plan4Subtitle" data-ja="プレミアムプラン" data-en="Premium Plan">プレミアムプラン</p>
                        <div class="text-3xl font-bold text-purple-600">
                            ¥660,000<span class="text-xl">〜</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan4Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan4Feature1" data-ja="全項目フルセット測定" data-en="Full comprehensive assessment">全項目フルセット測定</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan4Feature2" data-ja="個人レポート（コメント付き）" data-en="Individual report with comments">個人レポート（コメント付き）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan4Feature3" data-ja="チームレポート" data-en="Team report">チームレポート</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm font-semibold" id="plan4Feature4" data-ja="個別トレーニングプログラム" data-en="Individual training program">個別トレーニングプログラム</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-colors">
                        <span id="plan4CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
            </div>
            
            <div class="mt-12 text-center">
                <p class="text-gray-600" id="pricingNote" data-ja="※出張測定の場合は別途交通費を頂戴いたします。詳細はお問い合わせください。" data-en="*Travel expenses apply for on-site measurements. Contact us for details.">※出張測定の場合は別途交通費を頂戴いたします。詳細はお問い合わせください。</p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
                <span id="ctaTitle" data-ja="あなたのフィジカルの可能性を" data-en="Unlock Your Physical">あなたのフィジカルの可能性を</span><br>
                <span id="ctaTitle2" data-ja="最大化しませんか？" data-en="Potential Today">最大化しませんか?</span>
            </h2>
            <p class="text-xl mb-8 opacity-90" data-aos="fade-up" data-aos-delay="200">
                <span id="ctaSubtitle" data-ja="まずは無料相談から。専門家があなたのニーズに合わせたプランをご提案します。" data-en="Start with a free consultation. Our experts will propose a plan tailored to your needs.">まずは無料相談から。専門家があなたのニーズに合わせたプランをご提案します。</span>
            </p>
            <div class="flex flex-col md:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
                <a href="#contact" class="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold inline-block hover:bg-gray-100 transition-all transform hover:scale-105">
                    <i class="fas fa-envelope mr-2"></i>
                    <span id="ctaCTA1" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                </a>
                <a href="tel:+81-123-4567-8901" class="bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold inline-block hover:bg-purple-800 transition-all transform hover:scale-105">
                    <i class="fas fa-phone mr-2"></i>
                    <span id="ctaCTA2" data-ja="電話で相談" data-en="Call Us">電話で相談</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="contactTitle" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                </h2>
                <p class="text-xl text-gray-600" id="contactSubtitle" data-ja="ご質問・ご相談はお気軽にどうぞ" data-en="Feel free to ask any questions">ご質問・ご相談はお気軽にどうぞ</p>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-2xl p-8 md:p-12 shadow-lg" data-aos="fade-up">
                    <form id="contactForm" class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2" id="formNameLabel" data-ja="お名前" data-en="Name">お名前 <span class="text-red-500">*</span></label>
                                <input type="text" id="name" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" data-ja-placeholder="山田 太郎" data-en-placeholder="John Doe">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2" id="formEmailLabel" data-ja="メールアドレス" data-en="Email">メールアドレス <span class="text-red-500">*</span></label>
                                <input type="email" id="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" data-ja-placeholder="example@example.com" data-en-placeholder="example@example.com">
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2" id="formOrgLabel" data-ja="所属・団体名" data-en="Organization">所属・団体名</label>
                                <input type="text" id="organization" name="organization" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" data-ja-placeholder="〇〇高校サッカー部" data-en-placeholder="ABC High School Soccer Team">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2" id="formPhoneLabel" data-ja="電話番号" data-en="Phone">電話番号</label>
                                <input type="tel" id="phone" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" data-ja-placeholder="090-1234-5678" data-en-placeholder="+81-90-1234-5678">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2" id="formTypeLabel" data-ja="お問い合わせ種類" data-en="Inquiry Type">お問い合わせ種類</label>
                            <select id="type" name="type" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                                <option value="individual" id="typeIndividual" data-ja="個人測定について" data-en="Individual Assessment">個人測定について</option>
                                <option value="team" id="typeTeam" data-ja="チーム測定について" data-en="Team Assessment">チーム測定について</option>
                                <option value="pricing" id="typePricing" data-ja="料金について" data-en="Pricing">料金について</option>
                                <option value="other" id="typeOther" data-ja="その他" data-en="Other">その他</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2" id="formMessageLabel" data-ja="お問い合わせ内容" data-en="Message">お問い合わせ内容 <span class="text-red-500">*</span></label>
                            <textarea id="message" name="message" required rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" data-ja-placeholder="ご質問やご要望をご記入ください" data-en-placeholder="Please enter your questions or requests"></textarea>
                        </div>
                        
                        <div class="text-center">
                            <button type="submit" class="btn-primary text-white px-12 py-4 rounded-full text-lg font-semibold inline-block">
                                <i class="fas fa-paper-plane mr-2"></i>
                                <span id="formSubmit" data-ja="送信する" data-en="Send Message">送信する</span>
                            </button>
                        </div>
                        
                        <div id="formMessage" class="hidden text-center p-4 rounded-lg"></div>
                    </form>
                </div>
                
                <!-- Contact Info -->
                <div class="grid md:grid-cols-3 gap-6 mt-12">
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up">
                        <i class="fas fa-map-marker-alt text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="addressTitle" data-ja="所在地" data-en="Address">所在地</h3>
                        <p class="text-gray-600 text-sm">東京都調布市上石原2−40−6 B1F</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="100">
                        <i class="fas fa-envelope text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="emailTitle" data-ja="メール" data-en="Email">メール</h3>
                        <p class="text-gray-600 text-sm">nakagoshi@loopz.co.jp</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="200">
                        <i class="fas fa-building text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="companyTitle" data-ja="運営会社" data-en="Company">運営会社</h3>
                        <p class="text-gray-600 text-sm">株式会社LOOPZ</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-2xl font-bold mb-4">VALORISE</h3>
                    <p class="text-gray-400 text-sm" id="footerDesc" data-ja="フィジカル測定で選手の可能性を最大化" data-en="Maximizing athlete potential through physical assessment">フィジカル測定で選手の可能性を最大化</p>
                </div>
                <div>
                    <h4 class="font-bold mb-4" id="footerQuickLinks" data-ja="クイックリンク" data-en="Quick Links">クイックリンク</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#about" class="text-gray-400 hover:text-white footer-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a></li>
                        <li><a href="#features" class="text-gray-400 hover:text-white footer-link" data-ja="特徴" data-en="Features">特徴</a></li>
                        <li><a href="#services" class="text-gray-400 hover:text-white footer-link" data-ja="測定項目" data-en="Services">測定項目</a></li>
                        <li><a href="#team" class="text-gray-400 hover:text-white footer-link" data-ja="測定スタッフ" data-en="Team">測定スタッフ</a></li>
                        <li><a href="#pricing" class="text-gray-400 hover:text-white footer-link" data-ja="料金プラン" data-en="Pricing">料金プラン</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4" id="footerServices" data-ja="サービス" data-en="Services">サービス</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service1" data-ja="個人測定" data-en="Individual">個人測定</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service2" data-ja="チーム測定" data-en="Team">チーム測定</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service3" data-ja="トレーニング指導" data-en="Training">トレーニング指導</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service4" data-ja="コンサルティング" data-en="Consulting">コンサルティング</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4" id="footerContact" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><i class="fas fa-map-marker-alt mr-2"></i>東京都調布市上石原2−40−6 B1F</li>
                        <li><i class="fas fa-envelope mr-2"></i>nakagoshi@loopz.co.jp</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2024 VALORISE - Powered by LOOPZ Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Axios for API calls -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    
    <!-- AOS Animation Library -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"><\/script>
    
    <!-- Custom JavaScript -->
    <script src="/static/app.js"><\/script>
</body>
</html>
  `));const Ue=new ut,pa=Object.assign({"/src/index.tsx":we});let mt=!1;for(const[,e]of Object.entries(pa))e&&(Ue.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Ue.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),mt=!0);if(!mt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Ue as default};

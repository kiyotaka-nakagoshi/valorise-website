var va=Object.defineProperty;var Bt=t=>{throw TypeError(t)};var ba=(t,a,e)=>a in t?va(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e;var m=(t,a,e)=>ba(t,typeof a!="symbol"?a+"":a,e),Lt=(t,a,e)=>a.has(t)||Bt("Cannot "+e);var l=(t,a,e)=>(Lt(t,a,"read from private field"),e?e.call(t):a.get(t)),x=(t,a,e)=>a.has(t)?Bt("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,e),u=(t,a,e,s)=>(Lt(t,a,"write to private field"),s?s.call(t,e):a.set(t,e),e),g=(t,a,e)=>(Lt(t,a,"access private method"),e);var Ht=(t,a,e,s)=>({set _(i){u(t,a,i,e)},get _(){return l(t,a,s)}});var _t=(t,a,e)=>(s,i)=>{let n=-1;return r(0);async function r(c){if(c<=n)throw new Error("next() called multiple times");n=c;let d,o=!1,p;if(t[c]?(p=t[c][0][0],s.req.routeIndex=c):p=c===t.length&&i||void 0,p)try{d=await p(s,()=>r(c+1))}catch(f){if(f instanceof Error&&a)s.error=f,d=await a(f,s),o=!0;else throw f}else s.finalized===!1&&e&&(d=await e(s));return d&&(s.finalized===!1||o)&&(s.res=d),s}},ya=Symbol(),ja=async(t,a=Object.create(null))=>{const{all:e=!1,dot:s=!1}=a,n=(t instanceof sa?t.raw.headers:t.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?wa(t,{all:e,dot:s}):{}};async function wa(t,a){const e=await t.formData();return e?Sa(e,a):{}}function Sa(t,a){const e=Object.create(null);return t.forEach((s,i)=>{a.all||i.endsWith("[]")?Ra(e,i,s):e[i]=s}),a.dot&&Object.entries(e).forEach(([s,i])=>{s.includes(".")&&(Ea(e,s,i),delete e[s])}),e}var Ra=(t,a,e)=>{t[a]!==void 0?Array.isArray(t[a])?t[a].push(e):t[a]=[t[a],e]:a.endsWith("[]")?t[a]=[e]:t[a]=e},Ea=(t,a,e)=>{let s=t;const i=a.split(".");i.forEach((n,r)=>{r===i.length-1?s[n]=e:((!s[n]||typeof s[n]!="object"||Array.isArray(s[n])||s[n]instanceof File)&&(s[n]=Object.create(null)),s=s[n])})},Qt=t=>{const a=t.split("/");return a[0]===""&&a.shift(),a},Ta=t=>{const{groups:a,path:e}=ka(t),s=Qt(e);return Aa(s,a)},ka=t=>{const a=[];return t=t.replace(/\{[^}]+\}/g,(e,s)=>{const i=`@${s}`;return a.push([i,e]),i}),{groups:a,path:t}},Aa=(t,a)=>{for(let e=a.length-1;e>=0;e--){const[s]=a[e];for(let i=t.length-1;i>=0;i--)if(t[i].includes(s)){t[i]=t[i].replace(s,a[e][1]);break}}return t},Et={},Oa=(t,a)=>{if(t==="*")return"*";const e=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(e){const s=`${t}#${a}`;return Et[s]||(e[2]?Et[s]=a&&a[0]!==":"&&a[0]!=="*"?[s,e[1],new RegExp(`^${e[2]}(?=/${a})`)]:[t,e[1],new RegExp(`^${e[2]}$`)]:Et[s]=[t,e[1],!0]),Et[s]}return null},Nt=(t,a)=>{try{return a(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,e=>{try{return a(e)}catch{return e}})}},Ca=t=>Nt(t,decodeURI),Zt=t=>{const a=t.url,e=a.indexOf("/",a.indexOf(":")+4);let s=e;for(;s<a.length;s++){const i=a.charCodeAt(s);if(i===37){const n=a.indexOf("?",s),r=a.slice(e,n===-1?void 0:n);return Ca(r.includes("%25")?r.replace(/%25/g,"%2525"):r)}else if(i===63)break}return a.slice(e,s)},Pa=t=>{const a=Zt(t);return a.length>1&&a.at(-1)==="/"?a.slice(0,-1):a},et=(t,a,...e)=>(e.length&&(a=et(a,...e)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${a==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(a==null?void 0:a[0])==="/"?a.slice(1):a}`}`),ta=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const a=t.split("/"),e=[];let s="";return a.forEach(i=>{if(i!==""&&!/\:/.test(i))s+="/"+i;else if(/\:/.test(i))if(/\?/.test(i)){e.length===0&&s===""?e.push("/"):e.push(s);const n=i.replace("?","");s+="/"+n,e.push(s)}else s+="/"+i}),e.filter((i,n,r)=>r.indexOf(i)===n)},Ft=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Nt(t,ea):t):t,aa=(t,a,e)=>{let s;if(!e&&a&&!/[%+]/.test(a)){let r=t.indexOf("?",8);if(r===-1)return;for(t.startsWith(a,r+1)||(r=t.indexOf(`&${a}`,r+1));r!==-1;){const c=t.charCodeAt(r+a.length+1);if(c===61){const d=r+a.length+2,o=t.indexOf("&",d);return Ft(t.slice(d,o===-1?void 0:o))}else if(c==38||isNaN(c))return"";r=t.indexOf(`&${a}`,r+1)}if(s=/[%+]/.test(t),!s)return}const i={};s??(s=/[%+]/.test(t));let n=t.indexOf("?",8);for(;n!==-1;){const r=t.indexOf("&",n+1);let c=t.indexOf("=",n);c>r&&r!==-1&&(c=-1);let d=t.slice(n+1,c===-1?r===-1?void 0:r:c);if(s&&(d=Ft(d)),n=r,d==="")continue;let o;c===-1?o="":(o=t.slice(c+1,r===-1?void 0:r),s&&(o=Ft(o))),e?(i[d]&&Array.isArray(i[d])||(i[d]=[]),i[d].push(o)):i[d]??(i[d]=o)}return a?i[a]:i},Ia=aa,La=(t,a)=>aa(t,a,!0),ea=decodeURIComponent,$t=t=>Nt(t,ea),nt,k,V,ia,na,Dt,_,qt,sa=(qt=class{constructor(t,a="/",e=[[]]){x(this,V);m(this,"raw");x(this,nt);x(this,k);m(this,"routeIndex",0);m(this,"path");m(this,"bodyCache",{});x(this,_,t=>{const{bodyCache:a,raw:e}=this,s=a[t];if(s)return s;const i=Object.keys(a)[0];return i?a[i].then(n=>(i==="json"&&(n=JSON.stringify(n)),new Response(n)[t]())):a[t]=e[t]()});this.raw=t,this.path=a,u(this,k,e),u(this,nt,{})}param(t){return t?g(this,V,ia).call(this,t):g(this,V,na).call(this)}query(t){return Ia(this.url,t)}queries(t){return La(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const a={};return this.raw.headers.forEach((e,s)=>{a[s]=e}),a}async parseBody(t){var a;return(a=this.bodyCache).parsedBody??(a.parsedBody=await ja(this,t))}json(){return l(this,_).call(this,"text").then(t=>JSON.parse(t))}text(){return l(this,_).call(this,"text")}arrayBuffer(){return l(this,_).call(this,"arrayBuffer")}blob(){return l(this,_).call(this,"blob")}formData(){return l(this,_).call(this,"formData")}addValidatedData(t,a){l(this,nt)[t]=a}valid(t){return l(this,nt)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[ya](){return l(this,k)}get matchedRoutes(){return l(this,k)[0].map(([[,t]])=>t)}get routePath(){return l(this,k)[0].map(([[,t]])=>t)[this.routeIndex].path}},nt=new WeakMap,k=new WeakMap,V=new WeakSet,ia=function(t){const a=l(this,k)[0][this.routeIndex][1][t],e=g(this,V,Dt).call(this,a);return e&&/\%/.test(e)?$t(e):e},na=function(){const t={},a=Object.keys(l(this,k)[0][this.routeIndex][1]);for(const e of a){const s=g(this,V,Dt).call(this,l(this,k)[0][this.routeIndex][1][e]);s!==void 0&&(t[e]=/\%/.test(s)?$t(s):s)}return t},Dt=function(t){return l(this,k)[1]?l(this,k)[1][t]:t},_=new WeakMap,qt),Fa={Stringify:1},ra=async(t,a,e,s,i)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const n=t.callbacks;return n!=null&&n.length?(i?i[0]+=t:i=[t],Promise.all(n.map(c=>c({phase:a,buffer:i,context:s}))).then(c=>Promise.all(c.filter(Boolean).map(d=>ra(d,a,!1,s,i))).then(()=>i[0]))):Promise.resolve(t)},Ma="text/plain; charset=UTF-8",Mt=(t,a)=>({"Content-Type":t,...a}),xt,gt,F,rt,M,T,vt,lt,ot,K,bt,yt,$,st,Wt,Da=(Wt=class{constructor(t,a){x(this,$);x(this,xt);x(this,gt);m(this,"env",{});x(this,F);m(this,"finalized",!1);m(this,"error");x(this,rt);x(this,M);x(this,T);x(this,vt);x(this,lt);x(this,ot);x(this,K);x(this,bt);x(this,yt);m(this,"render",(...t)=>(l(this,lt)??u(this,lt,a=>this.html(a)),l(this,lt).call(this,...t)));m(this,"setLayout",t=>u(this,vt,t));m(this,"getLayout",()=>l(this,vt));m(this,"setRenderer",t=>{u(this,lt,t)});m(this,"header",(t,a,e)=>{this.finalized&&u(this,T,new Response(l(this,T).body,l(this,T)));const s=l(this,T)?l(this,T).headers:l(this,K)??u(this,K,new Headers);a===void 0?s.delete(t):e!=null&&e.append?s.append(t,a):s.set(t,a)});m(this,"status",t=>{u(this,rt,t)});m(this,"set",(t,a)=>{l(this,F)??u(this,F,new Map),l(this,F).set(t,a)});m(this,"get",t=>l(this,F)?l(this,F).get(t):void 0);m(this,"newResponse",(...t)=>g(this,$,st).call(this,...t));m(this,"body",(t,a,e)=>g(this,$,st).call(this,t,a,e));m(this,"text",(t,a,e)=>!l(this,K)&&!l(this,rt)&&!a&&!e&&!this.finalized?new Response(t):g(this,$,st).call(this,t,a,Mt(Ma,e)));m(this,"json",(t,a,e)=>g(this,$,st).call(this,JSON.stringify(t),a,Mt("application/json",e)));m(this,"html",(t,a,e)=>{const s=i=>g(this,$,st).call(this,i,a,Mt("text/html; charset=UTF-8",e));return typeof t=="object"?ra(t,Fa.Stringify,!1,{}).then(s):s(t)});m(this,"redirect",(t,a)=>{const e=String(t);return this.header("Location",/[^\x00-\xFF]/.test(e)?encodeURI(e):e),this.newResponse(null,a??302)});m(this,"notFound",()=>(l(this,ot)??u(this,ot,()=>new Response),l(this,ot).call(this,this)));u(this,xt,t),a&&(u(this,M,a.executionCtx),this.env=a.env,u(this,ot,a.notFoundHandler),u(this,yt,a.path),u(this,bt,a.matchResult))}get req(){return l(this,gt)??u(this,gt,new sa(l(this,xt),l(this,yt),l(this,bt))),l(this,gt)}get event(){if(l(this,M)&&"respondWith"in l(this,M))return l(this,M);throw Error("This context has no FetchEvent")}get executionCtx(){if(l(this,M))return l(this,M);throw Error("This context has no ExecutionContext")}get res(){return l(this,T)||u(this,T,new Response(null,{headers:l(this,K)??u(this,K,new Headers)}))}set res(t){if(l(this,T)&&t){t=new Response(t.body,t);for(const[a,e]of l(this,T).headers.entries())if(a!=="content-type")if(a==="set-cookie"){const s=l(this,T).headers.getSetCookie();t.headers.delete("set-cookie");for(const i of s)t.headers.append("set-cookie",i)}else t.headers.set(a,e)}u(this,T,t),this.finalized=!0}get var(){return l(this,F)?Object.fromEntries(l(this,F)):{}}},xt=new WeakMap,gt=new WeakMap,F=new WeakMap,rt=new WeakMap,M=new WeakMap,T=new WeakMap,vt=new WeakMap,lt=new WeakMap,ot=new WeakMap,K=new WeakMap,bt=new WeakMap,yt=new WeakMap,$=new WeakSet,st=function(t,a,e){const s=l(this,T)?new Headers(l(this,T).headers):l(this,K)??new Headers;if(typeof a=="object"&&"headers"in a){const n=a.headers instanceof Headers?a.headers:new Headers(a.headers);for(const[r,c]of n)r.toLowerCase()==="set-cookie"?s.append(r,c):s.set(r,c)}if(e)for(const[n,r]of Object.entries(e))if(typeof r=="string")s.set(n,r);else{s.delete(n);for(const c of r)s.append(n,c)}const i=typeof a=="number"?a:(a==null?void 0:a.status)??l(this,rt);return new Response(t,{status:i,headers:s})},Wt),j="ALL",Na="all",Va=["get","post","put","delete","options","patch"],la="Can not add a route since the matcher is already built.",oa=class extends Error{},Ba="__COMPOSED_HANDLER",Ha=t=>t.text("404 Not Found",404),zt=(t,a)=>{if("getResponse"in t){const e=t.getResponse();return a.newResponse(e.body,e)}return console.error(t),a.text("Internal Server Error",500)},A,w,da,O,W,Tt,kt,dt,_a=(dt=class{constructor(a={}){x(this,w);m(this,"get");m(this,"post");m(this,"put");m(this,"delete");m(this,"options");m(this,"patch");m(this,"all");m(this,"on");m(this,"use");m(this,"router");m(this,"getPath");m(this,"_basePath","/");x(this,A,"/");m(this,"routes",[]);x(this,O,Ha);m(this,"errorHandler",zt);m(this,"onError",a=>(this.errorHandler=a,this));m(this,"notFound",a=>(u(this,O,a),this));m(this,"fetch",(a,...e)=>g(this,w,kt).call(this,a,e[1],e[0],a.method));m(this,"request",(a,e,s,i)=>a instanceof Request?this.fetch(e?new Request(a,e):a,s,i):(a=a.toString(),this.fetch(new Request(/^https?:\/\//.test(a)?a:`http://localhost${et("/",a)}`,e),s,i)));m(this,"fire",()=>{addEventListener("fetch",a=>{a.respondWith(g(this,w,kt).call(this,a.request,a,void 0,a.request.method))})});[...Va,Na].forEach(n=>{this[n]=(r,...c)=>(typeof r=="string"?u(this,A,r):g(this,w,W).call(this,n,l(this,A),r),c.forEach(d=>{g(this,w,W).call(this,n,l(this,A),d)}),this)}),this.on=(n,r,...c)=>{for(const d of[r].flat()){u(this,A,d);for(const o of[n].flat())c.map(p=>{g(this,w,W).call(this,o.toUpperCase(),l(this,A),p)})}return this},this.use=(n,...r)=>(typeof n=="string"?u(this,A,n):(u(this,A,"*"),r.unshift(n)),r.forEach(c=>{g(this,w,W).call(this,j,l(this,A),c)}),this);const{strict:s,...i}=a;Object.assign(this,i),this.getPath=s??!0?a.getPath??Zt:Pa}route(a,e){const s=this.basePath(a);return e.routes.map(i=>{var r;let n;e.errorHandler===zt?n=i.handler:(n=async(c,d)=>(await _t([],e.errorHandler)(c,()=>i.handler(c,d))).res,n[Ba]=i.handler),g(r=s,w,W).call(r,i.method,i.path,n)}),this}basePath(a){const e=g(this,w,da).call(this);return e._basePath=et(this._basePath,a),e}mount(a,e,s){let i,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,s.replaceRequest===!1?i=d=>d:i=s.replaceRequest));const r=n?d=>{const o=n(d);return Array.isArray(o)?o:[o]}:d=>{let o;try{o=d.executionCtx}catch{}return[d.env,o]};i||(i=(()=>{const d=et(this._basePath,a),o=d==="/"?0:d.length;return p=>{const f=new URL(p.url);return f.pathname=f.pathname.slice(o)||"/",new Request(f,p)}})());const c=async(d,o)=>{const p=await e(i(d.req.raw),...r(d));if(p)return p;await o()};return g(this,w,W).call(this,j,et(a,"*"),c),this}},A=new WeakMap,w=new WeakSet,da=function(){const a=new dt({router:this.router,getPath:this.getPath});return a.errorHandler=this.errorHandler,u(a,O,l(this,O)),a.routes=this.routes,a},O=new WeakMap,W=function(a,e,s){a=a.toUpperCase(),e=et(this._basePath,e);const i={basePath:this._basePath,path:e,method:a,handler:s};this.router.add(a,e,[s,i]),this.routes.push(i)},Tt=function(a,e){if(a instanceof Error)return this.errorHandler(a,e);throw a},kt=function(a,e,s,i){if(i==="HEAD")return(async()=>new Response(null,await g(this,w,kt).call(this,a,e,s,"GET")))();const n=this.getPath(a,{env:s}),r=this.router.match(i,n),c=new Da(a,{path:n,matchResult:r,env:s,executionCtx:e,notFoundHandler:l(this,O)});if(r[0].length===1){let o;try{o=r[0][0][0][0](c,async()=>{c.res=await l(this,O).call(this,c)})}catch(p){return g(this,w,Tt).call(this,p,c)}return o instanceof Promise?o.then(p=>p||(c.finalized?c.res:l(this,O).call(this,c))).catch(p=>g(this,w,Tt).call(this,p,c)):o??l(this,O).call(this,c)}const d=_t(r[0],this.errorHandler,l(this,O));return(async()=>{try{const o=await d(c);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return g(this,w,Tt).call(this,o,c)}})()},dt),ca=[];function $a(t,a){const e=this.buildAllMatchers(),s=((i,n)=>{const r=e[i]||e[j],c=r[2][n];if(c)return c;const d=n.match(r[0]);if(!d)return[[],ca];const o=d.indexOf("",1);return[r[1][o],d]});return this.match=s,s(t,a)}var Ot="[^/]+",mt=".*",ht="(?:|/.*)",it=Symbol(),za=new Set(".\\+*[^]$()");function Ua(t,a){return t.length===1?a.length===1?t<a?-1:1:-1:a.length===1||t===mt||t===ht?1:a===mt||a===ht?-1:t===Ot?1:a===Ot?-1:t.length===a.length?t<a?-1:1:a.length-t.length}var Y,X,C,tt,Ja=(tt=class{constructor(){x(this,Y);x(this,X);x(this,C,Object.create(null))}insert(a,e,s,i,n){if(a.length===0){if(l(this,Y)!==void 0)throw it;if(n)return;u(this,Y,e);return}const[r,...c]=a,d=r==="*"?c.length===0?["","",mt]:["","",Ot]:r==="/*"?["","",ht]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(d){const p=d[1];let f=d[2]||Ot;if(p&&d[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw it;if(o=l(this,C)[f],!o){if(Object.keys(l(this,C)).some(h=>h!==mt&&h!==ht))throw it;if(n)return;o=l(this,C)[f]=new tt,p!==""&&u(o,X,i.varIndex++)}!n&&p!==""&&s.push([p,l(o,X)])}else if(o=l(this,C)[r],!o){if(Object.keys(l(this,C)).some(p=>p.length>1&&p!==mt&&p!==ht))throw it;if(n)return;o=l(this,C)[r]=new tt}o.insert(c,e,s,i,n)}buildRegExpStr(){const e=Object.keys(l(this,C)).sort(Ua).map(s=>{const i=l(this,C)[s];return(typeof l(i,X)=="number"?`(${s})@${l(i,X)}`:za.has(s)?`\\${s}`:s)+i.buildRegExpStr()});return typeof l(this,Y)=="number"&&e.unshift(`#${l(this,Y)}`),e.length===0?"":e.length===1?e[0]:"(?:"+e.join("|")+")"}},Y=new WeakMap,X=new WeakMap,C=new WeakMap,tt),Ct,jt,Gt,qa=(Gt=class{constructor(){x(this,Ct,{varIndex:0});x(this,jt,new Ja)}insert(t,a,e){const s=[],i=[];for(let r=0;;){let c=!1;if(t=t.replace(/\{[^}]+\}/g,d=>{const o=`@\\${r}`;return i[r]=[o,d],r++,c=!0,o}),!c)break}const n=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=i.length-1;r>=0;r--){const[c]=i[r];for(let d=n.length-1;d>=0;d--)if(n[d].indexOf(c)!==-1){n[d]=n[d].replace(c,i[r][1]);break}}return l(this,jt).insert(n,a,s,l(this,Ct),e),s}buildRegExp(){let t=l(this,jt).buildRegExpStr();if(t==="")return[/^$/,[],[]];let a=0;const e=[],s=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(i,n,r)=>n!==void 0?(e[++a]=Number(n),"$()"):(r!==void 0&&(s[Number(r)]=++a),"")),[new RegExp(`^${t}`),e,s]}},Ct=new WeakMap,jt=new WeakMap,Gt),Wa=[/^$/,[],Object.create(null)],At=Object.create(null);function pa(t){return At[t]??(At[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(a,e)=>e?`\\${e}`:"(?:|/.*)")}$`))}function Ga(){At=Object.create(null)}function Ka(t){var o;const a=new qa,e=[];if(t.length===0)return Wa;const s=t.map(p=>[!/\*|\/:/.test(p[0]),...p]).sort(([p,f],[h,b])=>p?1:h?-1:f.length-b.length),i=Object.create(null);for(let p=0,f=-1,h=s.length;p<h;p++){const[b,y,P]=s[p];b?i[y]=[P.map(([S])=>[S,Object.create(null)]),ca]:f++;let v;try{v=a.insert(y,f,b)}catch(S){throw S===it?new oa(y):S}b||(e[f]=P.map(([S,B])=>{const St=Object.create(null);for(B-=1;B>=0;B--){const[Rt,I]=v[B];St[Rt]=I}return[S,St]}))}const[n,r,c]=a.buildRegExp();for(let p=0,f=e.length;p<f;p++)for(let h=0,b=e[p].length;h<b;h++){const y=(o=e[p][h])==null?void 0:o[1];if(!y)continue;const P=Object.keys(y);for(let v=0,S=P.length;v<S;v++)y[P[v]]=c[y[P[v]]]}const d=[];for(const p in r)d[p]=e[r[p]];return[n,d,i]}function at(t,a){if(t){for(const e of Object.keys(t).sort((s,i)=>i.length-s.length))if(pa(e).test(a))return[...t[e]]}}var z,U,Pt,fa,Kt,Ya=(Kt=class{constructor(){x(this,Pt);m(this,"name","RegExpRouter");x(this,z);x(this,U);m(this,"match",$a);u(this,z,{[j]:Object.create(null)}),u(this,U,{[j]:Object.create(null)})}add(t,a,e){var c;const s=l(this,z),i=l(this,U);if(!s||!i)throw new Error(la);s[t]||[s,i].forEach(d=>{d[t]=Object.create(null),Object.keys(d[j]).forEach(o=>{d[t][o]=[...d[j][o]]})}),a==="/*"&&(a="*");const n=(a.match(/\/:/g)||[]).length;if(/\*$/.test(a)){const d=pa(a);t===j?Object.keys(s).forEach(o=>{var p;(p=s[o])[a]||(p[a]=at(s[o],a)||at(s[j],a)||[])}):(c=s[t])[a]||(c[a]=at(s[t],a)||at(s[j],a)||[]),Object.keys(s).forEach(o=>{(t===j||t===o)&&Object.keys(s[o]).forEach(p=>{d.test(p)&&s[o][p].push([e,n])})}),Object.keys(i).forEach(o=>{(t===j||t===o)&&Object.keys(i[o]).forEach(p=>d.test(p)&&i[o][p].push([e,n]))});return}const r=ta(a)||[a];for(let d=0,o=r.length;d<o;d++){const p=r[d];Object.keys(i).forEach(f=>{var h;(t===j||t===f)&&((h=i[f])[p]||(h[p]=[...at(s[f],p)||at(s[j],p)||[]]),i[f][p].push([e,n-o+d+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(l(this,U)).concat(Object.keys(l(this,z))).forEach(a=>{t[a]||(t[a]=g(this,Pt,fa).call(this,a))}),u(this,z,u(this,U,void 0)),Ga(),t}},z=new WeakMap,U=new WeakMap,Pt=new WeakSet,fa=function(t){const a=[];let e=t===j;return[l(this,z),l(this,U)].forEach(s=>{const i=s[t]?Object.keys(s[t]).map(n=>[n,s[t][n]]):[];i.length!==0?(e||(e=!0),a.push(...i)):t!==j&&a.push(...Object.keys(s[j]).map(n=>[n,s[j][n]]))}),e?Ka(a):null},Kt),J,D,Yt,Xa=(Yt=class{constructor(t){m(this,"name","SmartRouter");x(this,J,[]);x(this,D,[]);u(this,J,t.routers)}add(t,a,e){if(!l(this,D))throw new Error(la);l(this,D).push([t,a,e])}match(t,a){if(!l(this,D))throw new Error("Fatal error");const e=l(this,J),s=l(this,D),i=e.length;let n=0,r;for(;n<i;n++){const c=e[n];try{for(let d=0,o=s.length;d<o;d++)c.add(...s[d]);r=c.match(t,a)}catch(d){if(d instanceof oa)continue;throw d}this.match=c.match.bind(c),u(this,J,[c]),u(this,D,void 0);break}if(n===i)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(l(this,D)||l(this,J).length!==1)throw new Error("No active router has been determined yet.");return l(this,J)[0]}},J=new WeakMap,D=new WeakMap,Yt),ut=Object.create(null),q,E,Q,ct,R,N,G,pt,Qa=(pt=class{constructor(a,e,s){x(this,N);x(this,q);x(this,E);x(this,Q);x(this,ct,0);x(this,R,ut);if(u(this,E,s||Object.create(null)),u(this,q,[]),a&&e){const i=Object.create(null);i[a]={handler:e,possibleKeys:[],score:0},u(this,q,[i])}u(this,Q,[])}insert(a,e,s){u(this,ct,++Ht(this,ct)._);let i=this;const n=Ta(e),r=[];for(let c=0,d=n.length;c<d;c++){const o=n[c],p=n[c+1],f=Oa(o,p),h=Array.isArray(f)?f[0]:o;if(h in l(i,E)){i=l(i,E)[h],f&&r.push(f[1]);continue}l(i,E)[h]=new pt,f&&(l(i,Q).push(f),r.push(f[1])),i=l(i,E)[h]}return l(i,q).push({[a]:{handler:s,possibleKeys:r.filter((c,d,o)=>o.indexOf(c)===d),score:l(this,ct)}}),i}search(a,e){var d;const s=[];u(this,R,ut);let n=[this];const r=Qt(e),c=[];for(let o=0,p=r.length;o<p;o++){const f=r[o],h=o===p-1,b=[];for(let y=0,P=n.length;y<P;y++){const v=n[y],S=l(v,E)[f];S&&(u(S,R,l(v,R)),h?(l(S,E)["*"]&&s.push(...g(this,N,G).call(this,l(S,E)["*"],a,l(v,R))),s.push(...g(this,N,G).call(this,S,a,l(v,R)))):b.push(S));for(let B=0,St=l(v,Q).length;B<St;B++){const Rt=l(v,Q)[B],I=l(v,R)===ut?{}:{...l(v,R)};if(Rt==="*"){const H=l(v,E)["*"];H&&(s.push(...g(this,N,G).call(this,H,a,l(v,R))),u(H,R,I),b.push(H));continue}const[xa,Vt,ft]=Rt;if(!f&&!(ft instanceof RegExp))continue;const L=l(v,E)[xa],ga=r.slice(o).join("/");if(ft instanceof RegExp){const H=ft.exec(ga);if(H){if(I[Vt]=H[0],s.push(...g(this,N,G).call(this,L,a,l(v,R),I)),Object.keys(l(L,E)).length){u(L,R,I);const It=((d=H[0].match(/\//))==null?void 0:d.length)??0;(c[It]||(c[It]=[])).push(L)}continue}}(ft===!0||ft.test(f))&&(I[Vt]=f,h?(s.push(...g(this,N,G).call(this,L,a,I,l(v,R))),l(L,E)["*"]&&s.push(...g(this,N,G).call(this,l(L,E)["*"],a,I,l(v,R)))):(u(L,R,I),b.push(L)))}}n=b.concat(c.shift()??[])}return s.length>1&&s.sort((o,p)=>o.score-p.score),[s.map(({handler:o,params:p})=>[o,p])]}},q=new WeakMap,E=new WeakMap,Q=new WeakMap,ct=new WeakMap,R=new WeakMap,N=new WeakSet,G=function(a,e,s,i){const n=[];for(let r=0,c=l(a,q).length;r<c;r++){const d=l(a,q)[r],o=d[e]||d[j],p={};if(o!==void 0&&(o.params=Object.create(null),n.push(o),s!==ut||i&&i!==ut))for(let f=0,h=o.possibleKeys.length;f<h;f++){const b=o.possibleKeys[f],y=p[o.score];o.params[b]=i!=null&&i[b]&&!y?i[b]:s[b]??(i==null?void 0:i[b]),p[o.score]=!0}}return n},pt),Z,Xt,Za=(Xt=class{constructor(){m(this,"name","TrieRouter");x(this,Z);u(this,Z,new Qa)}add(t,a,e){const s=ta(a);if(s){for(let i=0,n=s.length;i<n;i++)l(this,Z).insert(t,s[i],e);return}l(this,Z).insert(t,a,e)}match(t,a){return l(this,Z).search(t,a)}},Z=new WeakMap,Xt),ua=class extends _a{constructor(t={}){super(t),this.router=t.router??new Xa({routers:[new Ya,new Za]})}},te=t=>{const e={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},s=(n=>typeof n=="string"?n==="*"?()=>n:r=>n===r?r:null:typeof n=="function"?n:r=>n.includes(r)?r:null)(e.origin),i=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(e.allowMethods);return async function(r,c){var p;function d(f,h){r.res.headers.set(f,h)}const o=await s(r.req.header("origin")||"",r);if(o&&d("Access-Control-Allow-Origin",o),e.credentials&&d("Access-Control-Allow-Credentials","true"),(p=e.exposeHeaders)!=null&&p.length&&d("Access-Control-Expose-Headers",e.exposeHeaders.join(",")),r.req.method==="OPTIONS"){e.origin!=="*"&&d("Vary","Origin"),e.maxAge!=null&&d("Access-Control-Max-Age",e.maxAge.toString());const f=await i(r.req.header("origin")||"",r);f.length&&d("Access-Control-Allow-Methods",f.join(","));let h=e.allowHeaders;if(!(h!=null&&h.length)){const b=r.req.header("Access-Control-Request-Headers");b&&(h=b.split(/\s*,\s*/))}return h!=null&&h.length&&(d("Access-Control-Allow-Headers",h.join(",")),r.res.headers.append("Vary","Access-Control-Request-Headers")),r.res.headers.delete("Content-Length"),r.res.headers.delete("Content-Type"),new Response(null,{headers:r.res.headers,status:204,statusText:"No Content"})}await c(),e.origin!=="*"&&r.header("Vary","Origin",{append:!0})}},ae=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ut=(t,a=se)=>{const e=/\.([a-zA-Z0-9]+?)$/,s=t.match(e);if(!s)return;let i=a[s[1]];return i&&i.startsWith("text")&&(i+="; charset=utf-8"),i},ee={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},se=ee,ie=(...t)=>{let a=t.filter(i=>i!=="").join("/");a=a.replace(new RegExp("(?<=\\/)\\/+","g"),"");const e=a.split("/"),s=[];for(const i of e)i===".."&&s.length>0&&s.at(-1)!==".."?s.pop():i!=="."&&s.push(i);return s.join("/")||"."},ma={br:".br",zstd:".zst",gzip:".gz"},ne=Object.keys(ma),re="index.html",le=t=>{const a=t.root??"./",e=t.path,s=t.join??ie;return async(i,n)=>{var p,f,h,b;if(i.finalized)return n();let r;if(t.path)r=t.path;else try{if(r=decodeURIComponent(i.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(r))throw new Error}catch{return await((p=t.onNotFound)==null?void 0:p.call(t,i.req.path,i)),n()}let c=s(a,!e&&t.rewriteRequestPath?t.rewriteRequestPath(r):r);t.isDir&&await t.isDir(c)&&(c=s(c,re));const d=t.getContent;let o=await d(c,i);if(o instanceof Response)return i.newResponse(o.body,o);if(o){const y=t.mimes&&Ut(c,t.mimes)||Ut(c);if(i.header("Content-Type",y||"application/octet-stream"),t.precompressed&&(!y||ae.test(y))){const P=new Set((f=i.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(v=>v.trim()));for(const v of ne){if(!P.has(v))continue;const S=await d(c+ma[v],i);if(S){o=S,i.header("Content-Encoding",v),i.header("Vary","Accept-Encoding",{append:!0});break}}}return await((h=t.onFound)==null?void 0:h.call(t,c,i)),i.body(o)}await((b=t.onNotFound)==null?void 0:b.call(t,c,i)),await n()}},oe=async(t,a)=>{let e;a&&a.manifest?typeof a.manifest=="string"?e=JSON.parse(a.manifest):e=a.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?e=JSON.parse(__STATIC_CONTENT_MANIFEST):e=__STATIC_CONTENT_MANIFEST;let s;a&&a.namespace?s=a.namespace:s=__STATIC_CONTENT;const i=e[t]||t;if(!i)return null;const n=await s.get(i,{type:"stream"});return n||null},de=t=>async function(e,s){return le({...t,getContent:async n=>oe(n,{manifest:t.manifest,namespace:t.namespace?t.namespace:e.env?e.env.__STATIC_CONTENT:void 0})})(e,s)},ce=t=>de(t);const wt=new ua;wt.use("/api/*",te());wt.use("/static/*",ce({root:"./public"}));wt.post("/api/contact",async t=>{var a;try{const e=await t.req.json(),{name:s,email:i,organization:n,phone:r,message:c,type:d,language:o}=e;if(!s||!i||!c)return t.json({success:!1,error:"Required fields are missing"},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i))return t.json({success:!1,error:"Invalid email format"},400);console.log("Contact form submission:",{name:s,email:i,organization:n,phone:r,message:c,type:d,language:o});const f=o==="ja"?`【VALORISE】新規お問い合わせ - ${s}様`:`[VALORISE] New Inquiry - ${s}`,h=`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VALORISE フィジカル測定サービス
新規お問い合わせ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【お名前】
${s}

【メールアドレス】
${i}

【組織名】
${n||"未記入"}

【電話番号】
${r||"未記入"}

【お問い合わせ種別】
${d==="team"?"チーム測定":d==="individual"?"個人測定":d==="consultation"?"相談・見積もり":"その他"}

【お問い合わせ内容】
${c}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
送信日時: ${new Date().toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,b=(a=t.env)==null?void 0:a.RESEND_API_KEY;if(b)try{const y=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${b}`,"Content-Type":"application/json"},body:JSON.stringify({from:"VALORISE Contact Form <onboarding@resend.dev>",to:["nakagoshi@loopz.co.jp"],reply_to:i,subject:f,text:h})});y.ok?console.log("Email sent successfully via Resend"):console.error("Resend API error:",await y.text())}catch(y){console.error("Failed to send email:",y)}else console.warn("RESEND_API_KEY not configured. Email not sent."),console.log("To enable email sending:"),console.log("1. Sign up at https://resend.com"),console.log("2. Get your API key"),console.log("3. Run: wrangler secret put RESEND_API_KEY");return t.json({success:!0,message:o==="ja"?"お問い合わせありがとうございます。担当者より折り返しご連絡いたします。":"Thank you for your inquiry. We will contact you soon."})}catch(e){return console.error("Contact form error:",e),t.json({success:!1,error:"Internal server error"},500)}});wt.get("/",t=>t.html(`
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
        
        /* Mobile: Move language toggle to left side to avoid menu button */
        @media (max-width: 768px) {
            .lang-toggle {
                top: 20px;
                left: 20px;
                right: auto;
            }
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
        
        /* Auto-switching staff photos */
        .staff-photo-container {
            position: relative;
        }
        
        .staff-photo-container img {
            transition: opacity 1s ease-in-out;
        }
        
        .staff-photo-container img.photo-hidden {
            opacity: 0;
        }
        
        .staff-photo-container img.photo-visible {
            opacity: 1;
        }
        
        /* Data Science Hero Background */
        .hero-data-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            z-index: 0;
        }
        
        .data-point {
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float 6s infinite ease-in-out;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-30px) translateX(20px); }
        }
        
        .grid-line {
            position: absolute;
            background: rgba(255, 255, 255, 0.05);
        }
        
        .grid-line.horizontal {
            width: 100%;
            height: 1px;
        }
        
        .grid-line.vertical {
            width: 1px;
            height: 100%;
        }
        
        .stat-card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .stat-card:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-5px);
        }
        
        .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        @keyframes pulse-ring {
            0% { transform: scale(0.9); opacity: 1; }
            100% { transform: scale(1.3); opacity: 0; }
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
            <a href="#" class="flex items-center" id="logo">
                <img src="/static/images/valorise-logo-horizontal.png" alt="VALORISE" class="h-8 md:h-10 w-auto">
            </a>
            <div class="hidden md:flex space-x-6">
                <a href="#about" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a>
                <a href="#features" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="特徴" data-en="Features">特徴</a>
                <a href="#services" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定項目" data-en="Services">測定項目</a>
                <a href="#team" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定スタッフ" data-en="Team">測定スタッフ</a>
                <a href="#gallery" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定の様子" data-en="Gallery">測定の様子</a>
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
            <a href="#gallery" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="測定の様子" data-en="Gallery">測定の様子</a>
            <a href="#pricing" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="料金プラン" data-en="Pricing">料金プラン</a>
            <a href="#contact" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-gradient min-h-screen flex items-center justify-center text-white px-6 pt-20 relative overflow-hidden">
        <!-- Data Science Background -->
        <div class="hero-data-bg">
            <!-- Grid Lines -->
            <div class="grid-line horizontal" style="top: 20%;"></div>
            <div class="grid-line horizontal" style="top: 40%;"></div>
            <div class="grid-line horizontal" style="top: 60%;"></div>
            <div class="grid-line horizontal" style="top: 80%;"></div>
            <div class="grid-line vertical" style="left: 20%;"></div>
            <div class="grid-line vertical" style="left: 40%;"></div>
            <div class="grid-line vertical" style="left: 60%;"></div>
            <div class="grid-line vertical" style="left: 80%;"></div>
            
            <!-- Floating Data Points -->
            <div class="data-point" style="top: 15%; left: 10%; animation-delay: 0s;"></div>
            <div class="data-point" style="top: 25%; left: 85%; animation-delay: 1s;"></div>
            <div class="data-point" style="top: 45%; left: 15%; animation-delay: 2s;"></div>
            <div class="data-point" style="top: 65%; left: 90%; animation-delay: 3s;"></div>
            <div class="data-point" style="top: 75%; left: 25%; animation-delay: 1.5s;"></div>
            <div class="data-point" style="top: 85%; left: 70%; animation-delay: 2.5s;"></div>
            <div class="data-point" style="top: 30%; left: 50%; animation-delay: 0.5s;"></div>
            <div class="data-point" style="top: 55%; left: 60%; animation-delay: 3.5s;"></div>
        </div>
        
        <div class="container mx-auto text-center relative z-10">
            <div class="animate-fadeInUp">
                <!-- Logo in Hero -->
                <div class="mb-8" data-aos="fade-down">
                    <img src="/static/images/valorise-logo-vertical.png" alt="VALORISE" class="h-32 md:h-40 w-auto mx-auto">
                </div>
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
                
                <!-- Data Stats Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="500">
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="99.9">0</span><span class="text-2xl">%</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat1" data-ja="測定精度" data-en="Accuracy">測定精度</div>
                    </div>
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="1000">0</span><span class="text-2xl">+</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat2" data-ja="測定実績" data-en="Assessments">測定実績</div>
                    </div>
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="15">0</span><span class="text-2xl">+</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat3" data-ja="測定項目" data-en="Parameters">測定項目</div>
                    </div>
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="6">0</span><span class="text-2xl">名</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat4" data-ja="専門スタッフ" data-en="Specialists">専門スタッフ</div>
                    </div>
                </div>
                
                <div class="flex flex-col md:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="700">
                    <a href="#contact" class="btn-primary text-white px-8 py-4 rounded-full text-lg font-semibold inline-block">
                        <i class="fas fa-calendar-check mr-2"></i>
                        <span id="heroCTA1" data-ja="無料相談を予約" data-en="Book Free Consultation">無料相談を予約</span>
                    </a>
                    <a href="#about" class="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-semibold inline-block hover:bg-gray-100 transition-all">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span id="heroCTA2" data-ja="詳しく見る" data-en="Learn More">詳しく見る</span>
                    </a>
                </div>
                <div class="mt-12 text-sm opacity-80" data-aos="fade-up" data-aos-delay="900">
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
                        <!-- Staff Photo with Hover Effect (Business → Gym) -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/nakagoshi-business.jpg" 
                                 alt="中越清登 - Director (Business)" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/nakagoshi-gym.jpg" 
                                 alt="中越清登 - Director (Gym)" 
                                 class="absolute inset-0 w-full h-full object-cover">
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
                        <!-- Staff Photo with Hover Effect (Business → TV) -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/shibamura-business.jpg" 
                                 alt="柴村直弥 - Special Advisor (Business)" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/shibamura-tv.jpg" 
                                 alt="柴村直弥 - Special Advisor (TV)" 
                                 class="absolute inset-0 w-full h-full object-cover">
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
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
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
                        <!-- Staff Photo with Hover Effect -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/nemoto-color.jpg" 
                                 alt="根本大洋 - Data Manager" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/nemoto-bw.jpg" 
                                 alt="根本大洋 - Data Manager (B&W)" 
                                 class="absolute inset-0 w-full h-full object-cover">
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
                            <div class="relative w-32 h-32 rounded-2xl overflow-hidden group staff-photo-container">
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
                            <!-- Hayate Fujimori (06) - With hover effect -->
                            <div class="relative w-32 h-32 rounded-2xl overflow-hidden group staff-photo-container">
                                <img src="/static/images/team/fujimori-color.jpg" 
                                     alt="藤森颯 - Field Operator" 
                                     class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                                <img src="/static/images/team/fujimori-bw.jpg" 
                                     alt="藤森颯 - Field Operator (B&W)" 
                                     class="absolute inset-0 w-full h-full object-cover">
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

    <!-- Gallery Section -->
    <section id="gallery" class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="galleryTitle" data-ja="測定現場の様子" data-en="Measurement Gallery">測定現場の様子</span>
                </h2>
                <p class="text-xl text-gray-600" id="gallerySubtitle" data-ja="プロフェッショナルな測定環境と実際の測定風景" data-en="Professional measurement environment and actual scenes">プロフェッショナルな測定環境と実際の測定風景</p>
            </div>

            <!-- Gallery Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <!-- Gallery Item 1 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up">
                    <img src="/static/images/gallery/measurement-01.jpg" 
                         alt="ジャンプ測定の様子" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="ジャンプ測定" data-en="Jump Measurement">ジャンプ測定</p>
                    </div>
                </div>

                <!-- Gallery Item 2 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <img src="/static/images/gallery/measurement-02.jpg" 
                         alt="パワー測定の様子" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="パワー測定" data-en="Power Measurement">パワー測定</p>
                    </div>
                </div>

                <!-- Gallery Item 3 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <img src="/static/images/gallery/measurement-03.jpg" 
                         alt="チーム測定指導" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="チーム測定指導" data-en="Team Measurement">チーム測定指導</p>
                    </div>
                </div>

                <!-- Gallery Item 4 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up">
                    <img src="/static/images/gallery/measurement-04.jpg" 
                         alt="データ収集" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="データ収集" data-en="Data Collection">データ収集</p>
                    </div>
                </div>

                <!-- Gallery Item 5 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <img src="/static/images/gallery/measurement-05.jpg" 
                         alt="スプリント測定環境" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="スプリント測定環境" data-en="Sprint Measurement">スプリント測定環境</p>
                    </div>
                </div>

                <!-- Gallery Item 6 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <img src="/static/images/gallery/measurement-06.jpg" 
                         alt="室内トレーニング施設" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="室内トレーニング施設" data-en="Indoor Facility">室内トレーニング施設</p>
                    </div>
                </div>

                <!-- Gallery Item 7 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-3" data-aos="fade-up">
                    <img src="/static/images/gallery/measurement-07.jpg" 
                         alt="野球チーム測定" 
                         class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                            <p class="text-white font-semibold text-xl mb-2" data-ja="野球チーム測定" data-en="Baseball Team Measurement">野球チーム測定</p>
                            <p class="text-gray-200 text-sm" data-ja="プロフェッショナルな測定環境でチーム全体をサポート" data-en="Supporting entire teams in professional measurement environment">プロフェッショナルな測定環境でチーム全体をサポート</p>
                        </div>
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
                            ¥165,000
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan1Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                        <p class="text-xs text-gray-500 mt-1" id="plan1Capacity" data-ja="20名まで" data-en="Up to 20 people">20名まで</p>
                        <p class="text-xs text-gray-500" id="plan1Extra" data-ja="追加1名：+¥5,000" data-en="+¥5,000 per additional person">追加1名：+¥5,000</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature1" data-ja="10m/30m、CMJ（両脚）" data-en="10m/30m, CMJ (both legs)">10m/30m、CMJ（両脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature2" data-ja="RB（両脚）" data-en="RB (both legs)">RB（両脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature3" data-ja="片脚CMJ（左右差）" data-en="Single-leg CMJ (L/R diff)">片脚CMJ（左右差）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature4" data-ja="RDL30（平均速度のみ）" data-en="RDL30 (avg speed only)">RDL30（平均速度のみ）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature5" data-ja="数値提示のみ" data-en="Data only">数値提示のみ</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan1Feature6" data-ja="個別評価なし" data-en="No individual assessment">個別評価なし</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan1Feature7" data-ja="トレーニングプログラムなし" data-en="No training program">トレーニングプログラムなし</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-gray-200 text-gray-800 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        <span id="plan1CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
                
                <!-- Core Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2" id="plan2Title" data-ja="VALORISE Core" data-en="VALORISE Core">VALORISE Core</h3>
                        <p class="text-gray-600 text-sm mb-4" id="plan2Subtitle" data-ja="スタンダードプラン" data-en="Standard Plan">スタンダードプラン</p>
                        <div class="text-4xl font-bold text-purple-600">
                            ¥250,000
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan2Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                        <p class="text-xs text-gray-500 mt-1" id="plan2Capacity" data-ja="25名まで" data-en="Up to 25 people">25名まで</p>
                        <p class="text-xs text-gray-500" id="plan2Extra" data-ja="追加1名：+¥5,500" data-en="+¥5,500 per additional person">追加1名：+¥5,500</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature1" data-ja="スプリント（10m/30m）" data-en="Sprint (10m/30m)">スプリント（10m/30m）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature2" data-ja="CMJ・片脚CMJ" data-en="CMJ, Single-leg CMJ">CMJ・片脚CMJ</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature3" data-ja="RB（両脚・片脚）" data-en="RB (both legs, single leg)">RB（両脚・片脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature4" data-ja="RDL30（左右）" data-en="RDL30 (L/R)">RDL30（左右）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature5" data-ja="PushPress（両脚）" data-en="PushPress (both legs)">PushPress（両脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature6" data-ja="チームレポート提供" data-en="Team report">チームレポート提供</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan2Feature7" data-ja="個人レポートなし" data-en="No individual report">個人レポートなし</span>
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
                        <p class="text-xs text-purple-200 mt-1" id="plan3Capacity" data-ja="30名まで" data-en="Up to 30 people">30名まで</p>
                        <p class="text-xs text-purple-200" id="plan3Extra" data-ja="追加1名：+¥8,800" data-en="+¥8,800 per additional person">追加1名：+¥8,800</p>
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
                        <p class="text-xs text-gray-500 mt-1" id="plan4Capacity" data-ja="25名まで" data-en="Up to 25 people">25名まで</p>
                        <p class="text-xs text-gray-500" id="plan4Extra" data-ja="追加1名：+¥20,000" data-en="+¥20,000 per additional person">追加1名：+¥20,000</p>
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
    <section id="contact" class="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="contactTitle" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                </h2>
                <p class="text-xl text-gray-600" id="contactSubtitle" data-ja="ご質問・ご相談はお気軽にどうぞ" data-en="Feel free to ask any questions">ご質問・ご相談はお気軽にどうぞ</p>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <!-- Email Contact Card -->
                <div class="bg-white rounded-2xl p-12 shadow-xl text-center" data-aos="fade-up">
                    <div class="mb-8">
                        <i class="fas fa-envelope text-6xl text-purple-600 mb-6"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4" id="contactEmailTitle" data-ja="メールでのお問い合わせ" data-en="Contact via Email">メールでのお問い合わせ</h3>
                    <p class="text-gray-600 mb-8" id="contactEmailDesc" data-ja="下記のメールアドレスまでお気軽にお問い合わせください" data-en="Please feel free to contact us at the email address below">下記のメールアドレスまでお気軽にお問い合わせください</p>
                    <a href="mailto:nakagoshi@loopz.co.jp" class="inline-block text-2xl md:text-3xl font-bold text-purple-600 hover:text-purple-800 transition-colors mb-8">
                        <i class="fas fa-paper-plane mr-3"></i>nakagoshi@loopz.co.jp
                    </a>
                    <div class="mt-8 pt-8 border-t border-gray-200">
                        <p class="text-sm text-gray-500" id="contactNote" data-ja="※ 通常1-2営業日以内にご返信いたします" data-en="* We will reply within 1-2 business days">※ 通常1-2営業日以内にご返信いたします</p>
                    </div>
                </div>
                
                <!-- Contact Info -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up">
                        <i class="fas fa-phone text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="phoneTitle" data-ja="電話番号" data-en="Phone">電話番号</h3>
                        <a href="tel:08054646367" class="text-purple-600 hover:text-purple-800 text-sm font-semibold">080-5464-6367</a>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="50">
                        <i class="fas fa-envelope text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="emailTitle" data-ja="メール" data-en="Email">メール</h3>
                        <a href="mailto:nakagoshi@loopz.co.jp" class="text-purple-600 hover:text-purple-800 text-sm font-semibold">nakagoshi@loopz.co.jp</a>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="100">
                        <i class="fas fa-map-marker-alt text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="addressTitle" data-ja="所在地" data-en="Address">所在地</h3>
                        <p class="text-gray-600 text-sm">東京都調布市上石原2−40−6 B1F</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="150">
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
                        <li><i class="fas fa-phone mr-2"></i>080-5464-6367</li>
                        <li><i class="fas fa-envelope mr-2"></i>nakagoshi@loopz.co.jp</li>
                        <li><i class="fas fa-map-marker-alt mr-2"></i>東京都調布市上石原2−40−6 B1F</li>
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
  `));const Jt=new ua,pe=Object.assign({"/src/index.tsx":wt});let ha=!1;for(const[,t]of Object.entries(pe))t&&(Jt.all("*",a=>{let e;try{e=a.executionCtx}catch{}return t.fetch(a.req.raw,a.env,e)}),Jt.notFound(a=>{let e;try{e=a.executionCtx}catch{}return t.fetch(a.req.raw,a.env,e)}),ha=!0);if(!ha)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Jt as default};

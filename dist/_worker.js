var vt=Object.defineProperty;var _e=e=>{throw TypeError(e)};var bt=(e,t,a)=>t in e?vt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var h=(e,t,a)=>bt(e,typeof t!="symbol"?t+"":t,a),Le=(e,t,a)=>t.has(e)||_e("Cannot "+a);var l=(e,t,a)=>(Le(e,t,"read from private field"),a?a.call(e):t.get(e)),x=(e,t,a)=>t.has(e)?_e("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),u=(e,t,a,s)=>(Le(e,t,"write to private field"),s?s.call(e,a):t.set(e,a),a),g=(e,t,a)=>(Le(e,t,"access private method"),a);var He=(e,t,a,s)=>({set _(i){u(e,t,i,a)},get _(){return l(e,t,s)}});var Be=(e,t,a)=>(s,i)=>{let r=-1;return n(0);async function n(c){if(c<=r)throw new Error("next() called multiple times");r=c;let o,d=!1,p;if(e[c]?(p=e[c][0][0],s.req.routeIndex=c):p=c===e.length&&i||void 0,p)try{o=await p(s,()=>n(c+1))}catch(f){if(f instanceof Error&&t)s.error=f,o=await t(f,s),d=!0;else throw f}else s.finalized===!1&&a&&(o=await a(s));return o&&(s.finalized===!1||d)&&(s.res=o),s}},yt=Symbol(),wt=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,r=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return r!=null&&r.startsWith("multipart/form-data")||r!=null&&r.startsWith("application/x-www-form-urlencoded")?jt(e,{all:a,dot:s}):{}};async function jt(e,t){const a=await e.formData();return a?Et(a,t):{}}function Et(e,t){const a=Object.create(null);return e.forEach((s,i)=>{t.all||i.endsWith("[]")?Rt(a,i,s):a[i]=s}),t.dot&&Object.entries(a).forEach(([s,i])=>{s.includes(".")&&(St(a,s,i),delete a[s])}),a}var Rt=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},St=(e,t,a)=>{let s=e;const i=t.split(".");i.forEach((r,n)=>{n===i.length-1?s[r]=a:((!s[r]||typeof s[r]!="object"||Array.isArray(s[r])||s[r]instanceof File)&&(s[r]=Object.create(null)),s=s[r])})},Qe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Tt=e=>{const{groups:t,path:a}=At(e),s=Qe(a);return Ot(s,t)},At=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const i=`@${s}`;return t.push([i,a]),i}),{groups:t,path:e}},Ot=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let i=e.length-1;i>=0;i--)if(e[i].includes(s)){e[i]=e[i].replace(s,t[a][1]);break}}return e},Se={},kt=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return Se[s]||(a[2]?Se[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:Se[s]=[e,a[1],!0]),Se[s]}return null},Me=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},Ct=e=>Me(e,decodeURI),Ze=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let s=a;for(;s<t.length;s++){const i=t.charCodeAt(s);if(i===37){const r=t.indexOf("?",s),n=t.slice(a,r===-1?void 0:r);return Ct(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(i===63)break}return t.slice(a,s)},It=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ae=(e,t,...a)=>(a.length&&(t=ae(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(i=>{if(i!==""&&!/\:/.test(i))s+="/"+i;else if(/\:/.test(i))if(/\?/.test(i)){a.length===0&&s===""?a.push("/"):a.push(s);const r=i.replace("?","");s+="/"+r,a.push(s)}else s+="/"+i}),a.filter((i,r,n)=>n.indexOf(i)===r)},Fe=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Me(e,at):e):e,tt=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let n=e.indexOf("?",8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){const c=e.charCodeAt(n+t.length+1);if(c===61){const o=n+t.length+2,d=e.indexOf("&",o);return Fe(e.slice(o,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";n=e.indexOf(`&${t}`,n+1)}if(s=/[%+]/.test(e),!s)return}const i={};s??(s=/[%+]/.test(e));let r=e.indexOf("?",8);for(;r!==-1;){const n=e.indexOf("&",r+1);let c=e.indexOf("=",r);c>n&&n!==-1&&(c=-1);let o=e.slice(r+1,c===-1?n===-1?void 0:n:c);if(s&&(o=Fe(o)),r=n,o==="")continue;let d;c===-1?d="":(d=e.slice(c+1,n===-1?void 0:n),s&&(d=Fe(d))),a?(i[o]&&Array.isArray(i[o])||(i[o]=[]),i[o].push(d)):i[o]??(i[o]=d)}return t?i[t]:i},Pt=tt,Lt=(e,t)=>tt(e,t,!0),at=decodeURIComponent,$e=e=>Me(e,at),re,A,D,it,rt,Ve,B,We,st=(We=class{constructor(e,t="/",a=[[]]){x(this,D);h(this,"raw");x(this,re);x(this,A);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});x(this,B,e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const i=Object.keys(t)[0];return i?t[i].then(r=>(i==="json"&&(r=JSON.stringify(r)),new Response(r)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,u(this,A,a),u(this,re,{})}param(e){return e?g(this,D,it).call(this,e):g(this,D,rt).call(this)}query(e){return Pt(this.url,e)}queries(e){return Lt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await wt(this,e))}json(){return l(this,B).call(this,"text").then(e=>JSON.parse(e))}text(){return l(this,B).call(this,"text")}arrayBuffer(){return l(this,B).call(this,"arrayBuffer")}blob(){return l(this,B).call(this,"blob")}formData(){return l(this,B).call(this,"formData")}addValidatedData(e,t){l(this,re)[e]=t}valid(e){return l(this,re)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[yt](){return l(this,A)}get matchedRoutes(){return l(this,A)[0].map(([[,e]])=>e)}get routePath(){return l(this,A)[0].map(([[,e]])=>e)[this.routeIndex].path}},re=new WeakMap,A=new WeakMap,D=new WeakSet,it=function(e){const t=l(this,A)[0][this.routeIndex][1][e],a=g(this,D,Ve).call(this,t);return a&&/\%/.test(a)?$e(a):a},rt=function(){const e={},t=Object.keys(l(this,A)[0][this.routeIndex][1]);for(const a of t){const s=g(this,D,Ve).call(this,l(this,A)[0][this.routeIndex][1][a]);s!==void 0&&(e[a]=/\%/.test(s)?$e(s):s)}return e},Ve=function(e){return l(this,A)[1]?l(this,A)[1][e]:e},B=new WeakMap,We),Ft={Stringify:1},nt=async(e,t,a,s,i)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const r=e.callbacks;return r!=null&&r.length?(i?i[0]+=e:i=[e],Promise.all(r.map(c=>c({phase:t,buffer:i,context:s}))).then(c=>Promise.all(c.filter(Boolean).map(o=>nt(o,t,!1,s,i))).then(()=>i[0]))):Promise.resolve(e)},Nt="text/plain; charset=UTF-8",Ne=(e,t)=>({"Content-Type":e,...t}),me,ge,F,ne,N,T,ve,le,oe,G,be,ye,$,se,Je,Vt=(Je=class{constructor(e,t){x(this,$);x(this,me);x(this,ge);h(this,"env",{});x(this,F);h(this,"finalized",!1);h(this,"error");x(this,ne);x(this,N);x(this,T);x(this,ve);x(this,le);x(this,oe);x(this,G);x(this,be);x(this,ye);h(this,"render",(...e)=>(l(this,le)??u(this,le,t=>this.html(t)),l(this,le).call(this,...e)));h(this,"setLayout",e=>u(this,ve,e));h(this,"getLayout",()=>l(this,ve));h(this,"setRenderer",e=>{u(this,le,e)});h(this,"header",(e,t,a)=>{this.finalized&&u(this,T,new Response(l(this,T).body,l(this,T)));const s=l(this,T)?l(this,T).headers:l(this,G)??u(this,G,new Headers);t===void 0?s.delete(e):a!=null&&a.append?s.append(e,t):s.set(e,t)});h(this,"status",e=>{u(this,ne,e)});h(this,"set",(e,t)=>{l(this,F)??u(this,F,new Map),l(this,F).set(e,t)});h(this,"get",e=>l(this,F)?l(this,F).get(e):void 0);h(this,"newResponse",(...e)=>g(this,$,se).call(this,...e));h(this,"body",(e,t,a)=>g(this,$,se).call(this,e,t,a));h(this,"text",(e,t,a)=>!l(this,G)&&!l(this,ne)&&!t&&!a&&!this.finalized?new Response(e):g(this,$,se).call(this,e,t,Ne(Nt,a)));h(this,"json",(e,t,a)=>g(this,$,se).call(this,JSON.stringify(e),t,Ne("application/json",a)));h(this,"html",(e,t,a)=>{const s=i=>g(this,$,se).call(this,i,t,Ne("text/html; charset=UTF-8",a));return typeof e=="object"?nt(e,Ft.Stringify,!1,{}).then(s):s(e)});h(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});h(this,"notFound",()=>(l(this,oe)??u(this,oe,()=>new Response),l(this,oe).call(this,this)));u(this,me,e),t&&(u(this,N,t.executionCtx),this.env=t.env,u(this,oe,t.notFoundHandler),u(this,ye,t.path),u(this,be,t.matchResult))}get req(){return l(this,ge)??u(this,ge,new st(l(this,me),l(this,ye),l(this,be))),l(this,ge)}get event(){if(l(this,N)&&"respondWith"in l(this,N))return l(this,N);throw Error("This context has no FetchEvent")}get executionCtx(){if(l(this,N))return l(this,N);throw Error("This context has no ExecutionContext")}get res(){return l(this,T)||u(this,T,new Response(null,{headers:l(this,G)??u(this,G,new Headers)}))}set res(e){if(l(this,T)&&e){e=new Response(e.body,e);for(const[t,a]of l(this,T).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=l(this,T).headers.getSetCookie();e.headers.delete("set-cookie");for(const i of s)e.headers.append("set-cookie",i)}else e.headers.set(t,a)}u(this,T,e),this.finalized=!0}get var(){return l(this,F)?Object.fromEntries(l(this,F)):{}}},me=new WeakMap,ge=new WeakMap,F=new WeakMap,ne=new WeakMap,N=new WeakMap,T=new WeakMap,ve=new WeakMap,le=new WeakMap,oe=new WeakMap,G=new WeakMap,be=new WeakMap,ye=new WeakMap,$=new WeakSet,se=function(e,t,a){const s=l(this,T)?new Headers(l(this,T).headers):l(this,G)??new Headers;if(typeof t=="object"&&"headers"in t){const r=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,c]of r)n.toLowerCase()==="set-cookie"?s.append(n,c):s.set(n,c)}if(a)for(const[r,n]of Object.entries(a))if(typeof n=="string")s.set(r,n);else{s.delete(r);for(const c of n)s.append(r,c)}const i=typeof t=="number"?t:(t==null?void 0:t.status)??l(this,ne);return new Response(e,{status:i,headers:s})},Je),y="ALL",Mt="all",Dt=["get","post","put","delete","options","patch"],lt="Can not add a route since the matcher is already built.",ot=class extends Error{},_t="__COMPOSED_HANDLER",Ht=e=>e.text("404 Not Found",404),qe=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},O,w,dt,k,J,Te,Ae,de,Bt=(de=class{constructor(t={}){x(this,w);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");x(this,O,"/");h(this,"routes",[]);x(this,k,Ht);h(this,"errorHandler",qe);h(this,"onError",t=>(this.errorHandler=t,this));h(this,"notFound",t=>(u(this,k,t),this));h(this,"fetch",(t,...a)=>g(this,w,Ae).call(this,t,a[1],a[0],t.method));h(this,"request",(t,a,s,i)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,i):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ae("/",t)}`,a),s,i)));h(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(g(this,w,Ae).call(this,t.request,t,void 0,t.request.method))})});[...Dt,Mt].forEach(r=>{this[r]=(n,...c)=>(typeof n=="string"?u(this,O,n):g(this,w,J).call(this,r,l(this,O),n),c.forEach(o=>{g(this,w,J).call(this,r,l(this,O),o)}),this)}),this.on=(r,n,...c)=>{for(const o of[n].flat()){u(this,O,o);for(const d of[r].flat())c.map(p=>{g(this,w,J).call(this,d.toUpperCase(),l(this,O),p)})}return this},this.use=(r,...n)=>(typeof r=="string"?u(this,O,r):(u(this,O,"*"),n.unshift(r)),n.forEach(c=>{g(this,w,J).call(this,y,l(this,O),c)}),this);const{strict:s,...i}=t;Object.assign(this,i),this.getPath=s??!0?t.getPath??Ze:It}route(t,a){const s=this.basePath(t);return a.routes.map(i=>{var n;let r;a.errorHandler===qe?r=i.handler:(r=async(c,o)=>(await Be([],a.errorHandler)(c,()=>i.handler(c,o))).res,r[_t]=i.handler),g(n=s,w,J).call(n,i.method,i.path,r)}),this}basePath(t){const a=g(this,w,dt).call(this);return a._basePath=ae(this._basePath,t),a}mount(t,a,s){let i,r;s&&(typeof s=="function"?r=s:(r=s.optionHandler,s.replaceRequest===!1?i=o=>o:i=s.replaceRequest));const n=r?o=>{const d=r(o);return Array.isArray(d)?d:[d]}:o=>{let d;try{d=o.executionCtx}catch{}return[o.env,d]};i||(i=(()=>{const o=ae(this._basePath,t),d=o==="/"?0:o.length;return p=>{const f=new URL(p.url);return f.pathname=f.pathname.slice(d)||"/",new Request(f,p)}})());const c=async(o,d)=>{const p=await a(i(o.req.raw),...n(o));if(p)return p;await d()};return g(this,w,J).call(this,y,ae(t,"*"),c),this}},O=new WeakMap,w=new WeakSet,dt=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,u(t,k,l(this,k)),t.routes=this.routes,t},k=new WeakMap,J=function(t,a,s){t=t.toUpperCase(),a=ae(this._basePath,a);const i={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,i]),this.routes.push(i)},Te=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},Ae=function(t,a,s,i){if(i==="HEAD")return(async()=>new Response(null,await g(this,w,Ae).call(this,t,a,s,"GET")))();const r=this.getPath(t,{env:s}),n=this.router.match(i,r),c=new Vt(t,{path:r,matchResult:n,env:s,executionCtx:a,notFoundHandler:l(this,k)});if(n[0].length===1){let d;try{d=n[0][0][0][0](c,async()=>{c.res=await l(this,k).call(this,c)})}catch(p){return g(this,w,Te).call(this,p,c)}return d instanceof Promise?d.then(p=>p||(c.finalized?c.res:l(this,k).call(this,c))).catch(p=>g(this,w,Te).call(this,p,c)):d??l(this,k).call(this,c)}const o=Be(n[0],this.errorHandler,l(this,k));return(async()=>{try{const d=await o(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return g(this,w,Te).call(this,d,c)}})()},de),ct=[];function $t(e,t){const a=this.buildAllMatchers(),s=((i,r)=>{const n=a[i]||a[y],c=n[2][r];if(c)return c;const o=r.match(n[0]);if(!o)return[[],ct];const d=o.indexOf("",1);return[n[1][d],o]});return this.match=s,s(e,t)}var ke="[^/]+",he=".*",xe="(?:|/.*)",ie=Symbol(),qt=new Set(".\\+*[^]$()");function zt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===he||e===xe?1:t===he||t===xe?-1:e===ke?1:t===ke?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Y,X,C,ee,Ut=(ee=class{constructor(){x(this,Y);x(this,X);x(this,C,Object.create(null))}insert(t,a,s,i,r){if(t.length===0){if(l(this,Y)!==void 0)throw ie;if(r)return;u(this,Y,a);return}const[n,...c]=t,o=n==="*"?c.length===0?["","",he]:["","",ke]:n==="/*"?["","",xe]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(o){const p=o[1];let f=o[2]||ke;if(p&&o[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw ie;if(d=l(this,C)[f],!d){if(Object.keys(l(this,C)).some(m=>m!==he&&m!==xe))throw ie;if(r)return;d=l(this,C)[f]=new ee,p!==""&&u(d,X,i.varIndex++)}!r&&p!==""&&s.push([p,l(d,X)])}else if(d=l(this,C)[n],!d){if(Object.keys(l(this,C)).some(p=>p.length>1&&p!==he&&p!==xe))throw ie;if(r)return;d=l(this,C)[n]=new ee}d.insert(c,a,s,i,r)}buildRegExpStr(){const a=Object.keys(l(this,C)).sort(zt).map(s=>{const i=l(this,C)[s];return(typeof l(i,X)=="number"?`(${s})@${l(i,X)}`:qt.has(s)?`\\${s}`:s)+i.buildRegExpStr()});return typeof l(this,Y)=="number"&&a.unshift(`#${l(this,Y)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},Y=new WeakMap,X=new WeakMap,C=new WeakMap,ee),Ce,we,Ke,Wt=(Ke=class{constructor(){x(this,Ce,{varIndex:0});x(this,we,new Ut)}insert(e,t,a){const s=[],i=[];for(let n=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,o=>{const d=`@\\${n}`;return i[n]=[d,o],n++,c=!0,d}),!c)break}const r=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=i.length-1;n>=0;n--){const[c]=i[n];for(let o=r.length-1;o>=0;o--)if(r[o].indexOf(c)!==-1){r[o]=r[o].replace(c,i[n][1]);break}}return l(this,we).insert(r,t,s,l(this,Ce),a),s}buildRegExp(){let e=l(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(i,r,n)=>r!==void 0?(a[++t]=Number(r),"$()"):(n!==void 0&&(s[Number(n)]=++t),"")),[new RegExp(`^${e}`),a,s]}},Ce=new WeakMap,we=new WeakMap,Ke),Jt=[/^$/,[],Object.create(null)],Oe=Object.create(null);function pt(e){return Oe[e]??(Oe[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function Kt(){Oe=Object.create(null)}function Gt(e){var d;const t=new Wt,a=[];if(e.length===0)return Jt;const s=e.map(p=>[!/\*|\/:/.test(p[0]),...p]).sort(([p,f],[m,b])=>p?1:m?-1:f.length-b.length),i=Object.create(null);for(let p=0,f=-1,m=s.length;p<m;p++){const[b,j,I]=s[p];b?i[j]=[I.map(([E])=>[E,Object.create(null)]),ct]:f++;let v;try{v=t.insert(j,f,b)}catch(E){throw E===ie?new ot(j):E}b||(a[f]=I.map(([E,_])=>{const Ee=Object.create(null);for(_-=1;_>=0;_--){const[Re,P]=v[_];Ee[Re]=P}return[E,Ee]}))}const[r,n,c]=t.buildRegExp();for(let p=0,f=a.length;p<f;p++)for(let m=0,b=a[p].length;m<b;m++){const j=(d=a[p][m])==null?void 0:d[1];if(!j)continue;const I=Object.keys(j);for(let v=0,E=I.length;v<E;v++)j[I[v]]=c[j[I[v]]]}const o=[];for(const p in n)o[p]=a[n[p]];return[r,o,i]}function te(e,t){if(e){for(const a of Object.keys(e).sort((s,i)=>i.length-s.length))if(pt(a).test(t))return[...e[a]]}}var q,z,Ie,ft,Ge,Yt=(Ge=class{constructor(){x(this,Ie);h(this,"name","RegExpRouter");x(this,q);x(this,z);h(this,"match",$t);u(this,q,{[y]:Object.create(null)}),u(this,z,{[y]:Object.create(null)})}add(e,t,a){var c;const s=l(this,q),i=l(this,z);if(!s||!i)throw new Error(lt);s[e]||[s,i].forEach(o=>{o[e]=Object.create(null),Object.keys(o[y]).forEach(d=>{o[e][d]=[...o[y][d]]})}),t==="/*"&&(t="*");const r=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const o=pt(t);e===y?Object.keys(s).forEach(d=>{var p;(p=s[d])[t]||(p[t]=te(s[d],t)||te(s[y],t)||[])}):(c=s[e])[t]||(c[t]=te(s[e],t)||te(s[y],t)||[]),Object.keys(s).forEach(d=>{(e===y||e===d)&&Object.keys(s[d]).forEach(p=>{o.test(p)&&s[d][p].push([a,r])})}),Object.keys(i).forEach(d=>{(e===y||e===d)&&Object.keys(i[d]).forEach(p=>o.test(p)&&i[d][p].push([a,r]))});return}const n=et(t)||[t];for(let o=0,d=n.length;o<d;o++){const p=n[o];Object.keys(i).forEach(f=>{var m;(e===y||e===f)&&((m=i[f])[p]||(m[p]=[...te(s[f],p)||te(s[y],p)||[]]),i[f][p].push([a,r-d+o+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(l(this,z)).concat(Object.keys(l(this,q))).forEach(t=>{e[t]||(e[t]=g(this,Ie,ft).call(this,t))}),u(this,q,u(this,z,void 0)),Kt(),e}},q=new WeakMap,z=new WeakMap,Ie=new WeakSet,ft=function(e){const t=[];let a=e===y;return[l(this,q),l(this,z)].forEach(s=>{const i=s[e]?Object.keys(s[e]).map(r=>[r,s[e][r]]):[];i.length!==0?(a||(a=!0),t.push(...i)):e!==y&&t.push(...Object.keys(s[y]).map(r=>[r,s[y][r]]))}),a?Gt(t):null},Ge),U,V,Ye,Xt=(Ye=class{constructor(e){h(this,"name","SmartRouter");x(this,U,[]);x(this,V,[]);u(this,U,e.routers)}add(e,t,a){if(!l(this,V))throw new Error(lt);l(this,V).push([e,t,a])}match(e,t){if(!l(this,V))throw new Error("Fatal error");const a=l(this,U),s=l(this,V),i=a.length;let r=0,n;for(;r<i;r++){const c=a[r];try{for(let o=0,d=s.length;o<d;o++)c.add(...s[o]);n=c.match(e,t)}catch(o){if(o instanceof ot)continue;throw o}this.match=c.match.bind(c),u(this,U,[c]),u(this,V,void 0);break}if(r===i)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(l(this,V)||l(this,U).length!==1)throw new Error("No active router has been determined yet.");return l(this,U)[0]}},U=new WeakMap,V=new WeakMap,Ye),ue=Object.create(null),W,S,Q,ce,R,M,K,pe,Qt=(pe=class{constructor(t,a,s){x(this,M);x(this,W);x(this,S);x(this,Q);x(this,ce,0);x(this,R,ue);if(u(this,S,s||Object.create(null)),u(this,W,[]),t&&a){const i=Object.create(null);i[t]={handler:a,possibleKeys:[],score:0},u(this,W,[i])}u(this,Q,[])}insert(t,a,s){u(this,ce,++He(this,ce)._);let i=this;const r=Tt(a),n=[];for(let c=0,o=r.length;c<o;c++){const d=r[c],p=r[c+1],f=kt(d,p),m=Array.isArray(f)?f[0]:d;if(m in l(i,S)){i=l(i,S)[m],f&&n.push(f[1]);continue}l(i,S)[m]=new pe,f&&(l(i,Q).push(f),n.push(f[1])),i=l(i,S)[m]}return l(i,W).push({[t]:{handler:s,possibleKeys:n.filter((c,o,d)=>d.indexOf(c)===o),score:l(this,ce)}}),i}search(t,a){var o;const s=[];u(this,R,ue);let r=[this];const n=Qe(a),c=[];for(let d=0,p=n.length;d<p;d++){const f=n[d],m=d===p-1,b=[];for(let j=0,I=r.length;j<I;j++){const v=r[j],E=l(v,S)[f];E&&(u(E,R,l(v,R)),m?(l(E,S)["*"]&&s.push(...g(this,M,K).call(this,l(E,S)["*"],t,l(v,R))),s.push(...g(this,M,K).call(this,E,t,l(v,R)))):b.push(E));for(let _=0,Ee=l(v,Q).length;_<Ee;_++){const Re=l(v,Q)[_],P=l(v,R)===ue?{}:{...l(v,R)};if(Re==="*"){const H=l(v,S)["*"];H&&(s.push(...g(this,M,K).call(this,H,t,l(v,R))),u(H,R,P),b.push(H));continue}const[mt,De,fe]=Re;if(!f&&!(fe instanceof RegExp))continue;const L=l(v,S)[mt],gt=n.slice(d).join("/");if(fe instanceof RegExp){const H=fe.exec(gt);if(H){if(P[De]=H[0],s.push(...g(this,M,K).call(this,L,t,l(v,R),P)),Object.keys(l(L,S)).length){u(L,R,P);const Pe=((o=H[0].match(/\//))==null?void 0:o.length)??0;(c[Pe]||(c[Pe]=[])).push(L)}continue}}(fe===!0||fe.test(f))&&(P[De]=f,m?(s.push(...g(this,M,K).call(this,L,t,P,l(v,R))),l(L,S)["*"]&&s.push(...g(this,M,K).call(this,l(L,S)["*"],t,P,l(v,R)))):(u(L,R,P),b.push(L)))}}r=b.concat(c.shift()??[])}return s.length>1&&s.sort((d,p)=>d.score-p.score),[s.map(({handler:d,params:p})=>[d,p])]}},W=new WeakMap,S=new WeakMap,Q=new WeakMap,ce=new WeakMap,R=new WeakMap,M=new WeakSet,K=function(t,a,s,i){const r=[];for(let n=0,c=l(t,W).length;n<c;n++){const o=l(t,W)[n],d=o[a]||o[y],p={};if(d!==void 0&&(d.params=Object.create(null),r.push(d),s!==ue||i&&i!==ue))for(let f=0,m=d.possibleKeys.length;f<m;f++){const b=d.possibleKeys[f],j=p[d.score];d.params[b]=i!=null&&i[b]&&!j?i[b]:s[b]??(i==null?void 0:i[b]),p[d.score]=!0}}return r},pe),Z,Xe,Zt=(Xe=class{constructor(){h(this,"name","TrieRouter");x(this,Z);u(this,Z,new Qt)}add(e,t,a){const s=et(t);if(s){for(let i=0,r=s.length;i<r;i++)l(this,Z).insert(e,s[i],a);return}l(this,Z).insert(e,t,a)}match(e,t){return l(this,Z).search(e,t)}},Z=new WeakMap,Xe),ut=class extends Bt{constructor(e={}){super(e),this.router=e.router??new Xt({routers:[new Yt,new Zt]})}},ea=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(r=>typeof r=="string"?r==="*"?()=>r:n=>r===n?n:null:typeof r=="function"?r:n=>r.includes(n)?n:null)(a.origin),i=(r=>typeof r=="function"?r:Array.isArray(r)?()=>r:()=>[])(a.allowMethods);return async function(n,c){var p;function o(f,m){n.res.headers.set(f,m)}const d=await s(n.req.header("origin")||"",n);if(d&&o("Access-Control-Allow-Origin",d),a.credentials&&o("Access-Control-Allow-Credentials","true"),(p=a.exposeHeaders)!=null&&p.length&&o("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),n.req.method==="OPTIONS"){a.origin!=="*"&&o("Vary","Origin"),a.maxAge!=null&&o("Access-Control-Max-Age",a.maxAge.toString());const f=await i(n.req.header("origin")||"",n);f.length&&o("Access-Control-Allow-Methods",f.join(","));let m=a.allowHeaders;if(!(m!=null&&m.length)){const b=n.req.header("Access-Control-Request-Headers");b&&(m=b.split(/\s*,\s*/))}return m!=null&&m.length&&(o("Access-Control-Allow-Headers",m.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await c(),a.origin!=="*"&&n.header("Vary","Origin",{append:!0})}},ta=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ze=(e,t=sa)=>{const a=/\.([a-zA-Z0-9]+?)$/,s=e.match(a);if(!s)return;let i=t[s[1]];return i&&i.startsWith("text")&&(i+="; charset=utf-8"),i},aa={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},sa=aa,ia=(...e)=>{let t=e.filter(i=>i!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const a=t.split("/"),s=[];for(const i of a)i===".."&&s.length>0&&s.at(-1)!==".."?s.pop():i!=="."&&s.push(i);return s.join("/")||"."},ht={br:".br",zstd:".zst",gzip:".gz"},ra=Object.keys(ht),na="index.html",la=e=>{const t=e.root??"./",a=e.path,s=e.join??ia;return async(i,r)=>{var p,f,m,b;if(i.finalized)return r();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(i.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await((p=e.onNotFound)==null?void 0:p.call(e,i.req.path,i)),r()}let c=s(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(c)&&(c=s(c,na));const o=e.getContent;let d=await o(c,i);if(d instanceof Response)return i.newResponse(d.body,d);if(d){const j=e.mimes&&ze(c,e.mimes)||ze(c);if(i.header("Content-Type",j||"application/octet-stream"),e.precompressed&&(!j||ta.test(j))){const I=new Set((f=i.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(v=>v.trim()));for(const v of ra){if(!I.has(v))continue;const E=await o(c+ht[v],i);if(E){d=E,i.header("Content-Encoding",v),i.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,c,i)),i.body(d)}await((b=e.onNotFound)==null?void 0:b.call(e,c,i)),await r()}},oa=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const i=a[e]||e;if(!i)return null;const r=await s.get(i,{type:"stream"});return r||null},da=e=>async function(a,s){return la({...e,getContent:async r=>oa(r,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,s)},ca=e=>da(e);const je=new ut;je.use("/api/*",ea());je.use("/static/*",ca({root:"./public"}));je.post("/api/contact",async e=>{try{const t=await e.req.json(),{name:a,email:s,organization:i,phone:r,message:n,type:c,language:o}=t;return!a||!s||!n?e.json({success:!1,error:"Required fields are missing"},400):(console.log("Contact form submission:",{name:a,email:s,organization:i,phone:r,message:n,type:c,language:o}),e.json({success:!0,message:o==="ja"?"お問い合わせありがとうございます。担当者より折り返しご連絡いたします。":"Thank you for your inquiry. We will contact you soon."}))}catch(t){return console.error("Contact form error:",t),e.json({success:!1,error:"Internal server error"},500)}});je.get("/",e=>e.html(`
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
            <div class="hidden md:flex space-x-8">
                <a href="#about" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a>
                <a href="#features" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="特徴" data-en="Features">特徴</a>
                <a href="#services" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定項目" data-en="Services">測定項目</a>
                <a href="#benefits" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="導入メリット" data-en="Benefits">導入メリット</a>
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
            <a href="#benefits" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="導入メリット" data-en="Benefits">導入メリット</a>
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
  `));const Ue=new ut,pa=Object.assign({"/src/index.tsx":je});let xt=!1;for(const[,e]of Object.entries(pa))e&&(Ue.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Ue.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),xt=!0);if(!xt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Ue as default};

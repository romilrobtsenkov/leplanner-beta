/*
 AngularJS v1.4.9
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(S,W,w){'use strict';function M(a){return function(){var b=arguments[0],d;d="["+(a?a+":":"")+b+"] http://errors.angularjs.org/1.4.9/"+(a?a+"/":"")+b;for(b=1;b<arguments.length;b++){d=d+(1==b?"?":"&")+"p"+(b-1)+"=";var c=encodeURIComponent,e;e=arguments[b];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;d+=c(e)}return Error(d)}}function Aa(a){if(null==a||Xa(a))return!1;if(E(a)||F(a)||A&&a instanceof A)return!0;
var b="length"in Object(a)&&a.length;return Q(b)&&(0<=b&&(b-1 in a||a instanceof Array)||"function"==typeof a.item)}function n(a,b,d){var c,e;if(a)if(B(a))for(c in a)"prototype"==c||"length"==c||"name"==c||a.hasOwnProperty&&!a.hasOwnProperty(c)||b.call(d,a[c],c,a);else if(E(a)||Aa(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==n)a.forEach(b,d,a);else if(oc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&
b.call(d,a[c],c,a);else for(c in a)ra.call(a,c)&&b.call(d,a[c],c,a);return a}function pc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function qc(a){return function(b,d){a(d,b)}}function Xd(){return++ob}function Ob(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=b[e];if(G(g)||B(g))for(var h=Object.keys(g),k=0,l=h.length;k<l;k++){var m=h[k],r=g[m];d&&G(r)?da(r)?a[m]=new Date(r.valueOf()):La(r)?a[m]=new RegExp(r):r.nodeName?a[m]=r.cloneNode(!0):
Pb(r)?a[m]=r.clone():(G(a[m])||(a[m]=E(r)?[]:{}),Ob(a[m],[r],!0)):a[m]=r}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function N(a){return Ob(a,sa.call(arguments,1),!1)}function Yd(a){return Ob(a,sa.call(arguments,1),!0)}function Z(a){return parseInt(a,10)}function Qb(a,b){return N(Object.create(a),b)}function z(){}function Ya(a){return a}function na(a){return function(){return a}}function rc(a){return B(a.toString)&&a.toString!==ta}function q(a){return"undefined"===typeof a}function u(a){return"undefined"!==
typeof a}function G(a){return null!==a&&"object"===typeof a}function oc(a){return null!==a&&"object"===typeof a&&!sc(a)}function F(a){return"string"===typeof a}function Q(a){return"number"===typeof a}function da(a){return"[object Date]"===ta.call(a)}function B(a){return"function"===typeof a}function La(a){return"[object RegExp]"===ta.call(a)}function Xa(a){return a&&a.window===a}function Za(a){return a&&a.$evalAsync&&a.$watch}function $a(a){return"boolean"===typeof a}function tc(a){return a&&Q(a.length)&&
Zd.test(ta.call(a))}function Pb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function $d(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function oa(a){return K(a.nodeName||a[0]&&a[0].nodeName)}function ab(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function Ma(a,b){function d(a,b){var d=b.$$hashKey,e;if(E(a)){e=0;for(var f=a.length;e<f;e++)b.push(c(a[e]))}else if(oc(a))for(e in a)b[e]=c(a[e]);else if(a&&"function"===typeof a.hasOwnProperty)for(e in a)a.hasOwnProperty(e)&&
(b[e]=c(a[e]));else for(e in a)ra.call(a,e)&&(b[e]=c(a[e]));d?b.$$hashKey=d:delete b.$$hashKey;return b}function c(a){if(!G(a))return a;var b=e.indexOf(a);if(-1!==b)return f[b];if(Xa(a)||Za(a))throw Ba("cpws");var b=!1,c;E(a)?(c=[],b=!0):tc(a)?c=new a.constructor(a):da(a)?c=new Date(a.getTime()):La(a)?(c=new RegExp(a.source,a.toString().match(/[^\/]*$/)[0]),c.lastIndex=a.lastIndex):B(a.cloneNode)?c=a.cloneNode(!0):(c=Object.create(sc(a)),b=!0);e.push(a);f.push(c);return b?d(a,c):c}var e=[],f=[];if(b){if(tc(b))throw Ba("cpta");
if(a===b)throw Ba("cpi");E(b)?b.length=0:n(b,function(a,c){"$$hashKey"!==c&&delete b[c]});e.push(a);f.push(b);return d(a,b)}return c(a)}function ha(a,b){if(E(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(G(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function ka(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d==typeof b&&"object"==d)if(E(a)){if(!E(b))return!1;if((d=a.length)==b.length){for(c=
0;c<d;c++)if(!ka(a[c],b[c]))return!1;return!0}}else{if(da(a))return da(b)?ka(a.getTime(),b.getTime()):!1;if(La(a))return La(b)?a.toString()==b.toString():!1;if(Za(a)||Za(b)||Xa(a)||Xa(b)||E(b)||da(b)||La(b))return!1;d=ea();for(c in a)if("$"!==c.charAt(0)&&!B(a[c])){if(!ka(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&u(b[c])&&!B(b[c]))return!1;return!0}return!1}function bb(a,b,d){return a.concat(sa.call(b,d))}function uc(a,b){var d=2<arguments.length?sa.call(arguments,2):
[];return!B(b)||b instanceof RegExp?b:d.length?function(){return arguments.length?b.apply(a,bb(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function ae(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=w:Xa(b)?d="$WINDOW":b&&W===b?d="$DOCUMENT":Za(b)&&(d="$SCOPE");return d}function cb(a,b){if("undefined"===typeof a)return w;Q(b)||(b=b?2:null);return JSON.stringify(a,ae,b)}function vc(a){return F(a)?JSON.parse(a):a}function wc(a,
b){var d=Date.parse("Jan 01, 1970 00:00:00 "+a)/6E4;return isNaN(d)?b:d}function Rb(a,b,d){d=d?-1:1;var c=wc(b,a.getTimezoneOffset());b=a;a=d*(c-a.getTimezoneOffset());b=new Date(b.getTime());b.setMinutes(b.getMinutes()+a);return b}function ua(a){a=A(a).clone();try{a.empty()}catch(b){}var d=A("<div>").append(a).html();try{return a[0].nodeType===Na?K(d):d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+K(b)})}catch(c){return K(d)}}function xc(a){try{return decodeURIComponent(a)}catch(b){}}
function yc(a){var b={};n((a||"").split("&"),function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=xc(e),u(e)&&(f=u(f)?xc(f):!0,ra.call(b,e)?E(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function Sb(a){var b=[];n(a,function(a,c){E(a)?n(a,function(a){b.push(ia(c,!0)+(!0===a?"":"="+ia(a,!0)))}):b.push(ia(c,!0)+(!0===a?"":"="+ia(a,!0)))});return b.length?b.join("&"):""}function pb(a){return ia(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,
"=").replace(/%2B/gi,"+")}function ia(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function be(a,b){var d,c,e=Oa.length;for(c=0;c<e;++c)if(d=Oa[c]+b,F(d=a.getAttribute(d)))return d;return null}function ce(a,b){var d,c,e={};n(Oa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});n(Oa,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":",
"\\:")+"]"))&&(d=e,c=e.getAttribute(b))});d&&(e.strictDi=null!==be(d,"strict-di"),b(d,c?[c]:[],e))}function zc(a,b,d){G(d)||(d={});d=N({strictDi:!1},d);var c=function(){a=A(a);if(a.injector()){var c=a[0]===W?"document":ua(a);throw Ba("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=db(b,d.strictDi);c.invoke(["$rootScope",
"$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;S&&e.test(S.name)&&(d.debugInfoEnabled=!0,S.name=S.name.replace(e,""));if(S&&!f.test(S.name))return c();S.name=S.name.replace(f,"");$.resumeBootstrap=function(a){n(a,function(a){b.push(a)});return c()};B($.resumeDeferredBootstrap)&&$.resumeDeferredBootstrap()}function de(){S.name="NG_ENABLE_DEBUG_INFO!"+S.name;S.location.reload()}
function ee(a){a=$.element(a).injector();if(!a)throw Ba("test");return a.get("$$testability")}function Ac(a,b){b=b||"_";return a.replace(fe,function(a,c){return(c?b:"")+a.toLowerCase()})}function ge(){var a;if(!Bc){var b=qb();(pa=q(b)?S.jQuery:b?S[b]:w)&&pa.fn.on?(A=pa,N(pa.fn,{scope:Pa.scope,isolateScope:Pa.isolateScope,controller:Pa.controller,injector:Pa.injector,inheritedData:Pa.inheritedData}),a=pa.cleanData,pa.cleanData=function(b){var c;if(Tb)Tb=!1;else for(var e=0,f;null!=(f=b[e]);e++)(c=
pa._data(f,"events"))&&c.$destroy&&pa(f).triggerHandler("$destroy");a(b)}):A=P;$.element=A;Bc=!0}}function rb(a,b,d){if(!a)throw Ba("areq",b||"?",d||"required");return a}function Qa(a,b,d){d&&E(a)&&(a=a[a.length-1]);rb(B(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ra(a,b){if("hasOwnProperty"===a)throw Ba("badname",b);}function Cc(a,b,d){if(!b)return a;b=b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&
B(a)?uc(e,a):a}function sb(a){for(var b=a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=A(sa.call(a,0,e))),c.push(b);return c||a}function ea(){return Object.create(null)}function he(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=M("$injector"),c=M("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||M;return b(a,"module",function(){var a={};return function(f,g,h){if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,
d,e,f){f||(f=c);return function(){f[e||"push"]([b,d,arguments]);return y}}function b(a,d){return function(b,e){e&&B(e)&&(e.$$moduleName=f);c.push([a,d,arguments]);return y}}if(!g)throw d("nomod",f);var c=[],e=[],t=[],C=a("$injector","invoke","push",e),y={_invokeQueue:c,_configBlocks:e,_runBlocks:t,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide",
"decorator"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:C,run:function(a){t.push(a);return this}};h&&C(h);return y})}})}function ie(a){N(a,{bootstrap:zc,copy:Ma,extend:N,merge:Yd,equals:ka,element:A,forEach:n,injector:db,noop:z,bind:uc,toJson:cb,fromJson:vc,identity:Ya,isUndefined:q,isDefined:u,isString:F,isFunction:B,isObject:G,isNumber:Q,isElement:Pb,isArray:E,
version:je,isDate:da,lowercase:K,uppercase:tb,callbacks:{counter:0},getTestability:ee,$$minErr:M,$$csp:Ca,reloadWithDebugInfo:de});Ub=he(S);Ub("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:ke});a.provider("$compile",Dc).directive({a:le,input:Ec,textarea:Ec,form:me,script:ne,select:oe,style:pe,option:qe,ngBind:re,ngBindHtml:se,ngBindTemplate:te,ngClass:ue,ngClassEven:ve,ngClassOdd:we,ngCloak:xe,ngController:ye,ngForm:ze,ngHide:Ae,ngIf:Be,ngInclude:Ce,ngInit:De,ngNonBindable:Ee,
ngPluralize:Fe,ngRepeat:Ge,ngShow:He,ngStyle:Ie,ngSwitch:Je,ngSwitchWhen:Ke,ngSwitchDefault:Le,ngOptions:Me,ngTransclude:Ne,ngModel:Oe,ngList:Pe,ngChange:Qe,pattern:Fc,ngPattern:Fc,required:Gc,ngRequired:Gc,minlength:Hc,ngMinlength:Hc,maxlength:Ic,ngMaxlength:Ic,ngValue:Re,ngModelOptions:Se}).directive({ngInclude:Te}).directive(ub).directive(Jc);a.provider({$anchorScroll:Ue,$animate:Ve,$animateCss:We,$$animateJs:Xe,$$animateQueue:Ye,$$AnimateRunner:Ze,$$animateAsyncRun:$e,$browser:af,$cacheFactory:bf,
$controller:cf,$document:df,$exceptionHandler:ef,$filter:Kc,$$forceReflow:ff,$interpolate:gf,$interval:hf,$http:jf,$httpParamSerializer:kf,$httpParamSerializerJQLike:lf,$httpBackend:mf,$xhrFactory:nf,$location:of,$log:pf,$parse:qf,$rootScope:rf,$q:sf,$$q:tf,$sce:uf,$sceDelegate:vf,$sniffer:wf,$templateCache:xf,$templateRequest:yf,$$testability:zf,$timeout:Af,$window:Bf,$$rAF:Cf,$$jqLite:Df,$$HashMap:Ef,$$cookieReader:Ff})}])}function eb(a){return a.replace(Gf,function(a,d,c,e){return e?c.toUpperCase():
c}).replace(Hf,"Moz$1")}function Lc(a){a=a.nodeType;return 1===a||!a||9===a}function Mc(a,b){var d,c,e=b.createDocumentFragment(),f=[];if(Vb.test(a)){d=d||e.appendChild(b.createElement("div"));c=(If.exec(a)||["",""])[1].toLowerCase();c=ja[c]||ja._default;d.innerHTML=c[1]+a.replace(Jf,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=bb(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";n(f,function(a){e.appendChild(a)});return e}function P(a){if(a instanceof
P)return a;var b;F(a)&&(a=T(a),b=!0);if(!(this instanceof P)){if(b&&"<"!=a.charAt(0))throw Wb("nosel");return new P(a)}if(b){b=W;var d;a=(d=Kf.exec(a))?[b.createElement(d[1])]:(d=Mc(a,b))?d.childNodes:[]}Nc(this,a)}function Xb(a){return a.cloneNode(!0)}function vb(a,b){b||wb(a);if(a.querySelectorAll)for(var d=a.querySelectorAll("*"),c=0,e=d.length;c<e;c++)wb(d[c])}function Oc(a,b,d,c){if(u(c))throw Wb("offargs");var e=(c=xb(a))&&c.events,f=c&&c.handle;if(f)if(b){var g=function(b){var c=e[b];u(d)&&
ab(c||[],d);u(d)&&c&&0<c.length||(a.removeEventListener(b,f,!1),delete e[b])};n(b.split(" "),function(a){g(a);yb[a]&&g(yb[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f,!1),delete e[b]}function wb(a,b){var d=a.ng339,c=d&&fb[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),Oc(a)),delete fb[d],a.ng339=w))}function xb(a,b){var d=a.ng339,d=d&&fb[d];b&&!d&&(a.ng339=d=++Lf,d=fb[d]={events:{},data:{},handle:w});return d}function Yb(a,b,d){if(Lc(a)){var c=
u(d),e=!c&&b&&!G(b),f=!b;a=(a=xb(a,!e))&&a.data;if(c)a[b]=d;else{if(f)return a;if(e)return a&&a[b];N(a,b)}}}function zb(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Ab(a,b){b&&a.setAttribute&&n(b.split(" "),function(b){a.setAttribute("class",T((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+T(b)+" "," ")))})}function Bb(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g,
" ");n(b.split(" "),function(a){a=T(a);-1===d.indexOf(" "+a+" ")&&(d+=a+" ")});a.setAttribute("class",T(d))}}function Nc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function Pc(a,b){return Cb(a,"$"+(b||"ngController")+"Controller")}function Cb(a,b,d){9==a.nodeType&&(a=a.documentElement);for(b=E(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(u(d=A.data(a,b[c])))return d;a=a.parentNode||
11===a.nodeType&&a.host}}function Qc(a){for(vb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Zb(a,b){b||vb(a);var d=a.parentNode;d&&d.removeChild(a)}function Mf(a,b){b=b||S;if("complete"===b.document.readyState)b.setTimeout(a);else A(b).on("load",a)}function Rc(a,b){var d=Db[b.toLowerCase()];return d&&Sc[oa(a)]&&d}function Nf(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=b[d||c.type],g=f?f.length:0;if(g){if(q(c.immediatePropagationStopped)){var h=
c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var k=f.specialHandlerWrapper||Of;1<g&&(f=ha(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||k(a,c,f[l])}};d.elem=a;return d}function Of(a,b,d){d.call(a,b)}function Pf(a,b,d){var c=b.relatedTarget;c&&(c===a||Qf.call(a,c))||d.call(a,b)}function Df(){this.$get=
function(){return N(P,{hasClass:function(a,b){a.attr&&(a=a[0]);return zb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Bb(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Ab(a,b)}})}}function Da(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"==d||"object"==d&&null!==a?a.$$hashKey=d+":"+(b||Xd)():d+":"+a}function Sa(a,b){if(b){var d=0;this.nextUid=function(){return++d}}n(a,this.put,this)}function Rf(a){return(a=a.toString().replace(Tc,
"").match(Uc))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function db(a,b){function d(a){return function(b,c){if(G(b))n(b,qc(a));else return a(b,c)}}function c(a,b){Ra(a,"service");if(B(b)||E(b))b=t.instantiate(b);if(!b.$get)throw Ea("pget",a);return r[a+"Provider"]=b}function e(a,b){return function(){var c=y.invoke(b,this);if(q(c))throw Ea("undef",a);return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){rb(q(a)||E(a),"modulesToLoad","not an array");var b=[],c;
n(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=t.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{F(a)?(c=Ub(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):B(a)?b.push(t.invoke(a)):E(a)?b.push(t.invoke(a)):Qa(a,"module")}catch(e){throw E(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ea("modulerr",a,e.stack||e.message||e);}}});return b}function h(a,c){function d(b,
e){if(a.hasOwnProperty(b)){if(a[b]===k)throw Ea("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=k,a[b]=c(b,e)}catch(f){throw a[b]===k&&delete a[b],f;}finally{l.shift()}}function e(a,c,f,g){"string"===typeof f&&(g=f,f=null);var k=[],h=db.$$annotate(a,b,g),l,m,t;m=0;for(l=h.length;m<l;m++){t=h[m];if("string"!==typeof t)throw Ea("itkn",t);k.push(f&&f.hasOwnProperty(t)?f[t]:d(t,g))}E(a)&&(a=a[l]);return a.apply(c,k)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((E(a)?
a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return G(a)||B(a)?a:d},get:d,annotate:db.$$annotate,has:function(b){return r.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var k={},l=[],m=new Sa([],!0),r={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,na(b),!1)}),constant:d(function(a,b){Ra(a,"constant");r[a]=b;C[a]=b}),decorator:function(a,b){var c=t.get(a+"Provider"),d=c.$get;
c.$get=function(){var a=y.invoke(d,c);return y.invoke(b,null,{$delegate:a})}}}},t=r.$injector=h(r,function(a,b){$.isString(b)&&l.push(b);throw Ea("unpr",l.join(" <- "));}),C={},y=C.$injector=h(C,function(a,b){var c=t.get(a+"Provider",b);return y.invoke(c.$get,c,w,a)});n(g(a),function(a){a&&y.invoke(a)});return y}function Ue(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===
oa(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();var c;c=g.yOffset;B(c)?c=c():Pb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):Q(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=F(a)?a:d.hash();var b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===b&&""===a||Mf(function(){c.$evalAsync(g)})});
return g}]}function gb(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;E(a)&&(a=a.join(" "));E(b)&&(b=b.join(" "));return a+" "+b}function Sf(a){F(a)&&(a=a.split(" "));var b=ea();n(a,function(a){a.length&&(b[a]=!0)});return b}function Fa(a){return G(a)?a:{}}function Tf(a,b,d,c){function e(a){try{a.apply(null,sa.call(arguments,1))}finally{if(y--,0===y)for(;R.length;)try{R.pop()()}catch(b){d.error(b)}}}function f(){H=null;g();h()}function g(){a:{try{p=m.state;break a}catch(a){}p=void 0}p=q(p)?
null:p;ka(p,D)&&(p=D);D=p}function h(){if(v!==k.url()||x!==p)v=k.url(),x=p,n(la,function(a){a(k.url(),p)})}var k=this,l=a.location,m=a.history,r=a.setTimeout,t=a.clearTimeout,C={};k.isMock=!1;var y=0,R=[];k.$$completeOutstandingRequest=e;k.$$incOutstandingRequestCount=function(){y++};k.notifyWhenNoOutstandingRequests=function(a){0===y?a():R.push(a)};var p,x,v=l.href,Y=b.find("base"),H=null;g();x=p;k.url=function(b,d,e){q(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=
x===e;if(v===b&&(!c.history||f))return k;var h=v&&Ga(v)===Ga(b);v=b;x=e;if(!c.history||h&&f){if(!h||H)H=b;d?l.replace(b):h?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b;l.href!==b&&(H=b)}else m[d?"replaceState":"pushState"](e,"",b),g(),x=p;return k}return H||l.href.replace(/%27/g,"'")};k.state=function(){return p};var la=[],I=!1,D=null;k.onUrlChange=function(b){if(!I){if(c.history)A(a).on("popstate",f);A(a).on("hashchange",f);I=!0}la.push(b);return b};k.$$applicationDestroyed=function(){A(a).off("hashchange popstate",
f)};k.$$checkUrlChange=h;k.baseHref=function(){var a=Y.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};k.defer=function(a,b){var c;y++;c=r(function(){delete C[c];e(a)},b||0);C[c]=!0;return c};k.defer.cancel=function(a){return C[a]?(delete C[a],t(a),e(z),!0):!1}}function af(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new Tf(a,c,b,d)}]}function bf(){this.$get=function(){function a(a,c){function e(a){a!=r&&(t?t==a&&(t=a.n):t=a,f(a.n,a.p),f(a,r),r=a,
r.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw M("$cacheFactory")("iid",a);var g=0,h=N({},c,{id:a}),k=ea(),l=c&&c.capacity||Number.MAX_VALUE,m=ea(),r=null,t=null;return b[a]={put:function(a,b){if(!q(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in k||g++;k[a]=b;g>l&&this.remove(t.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==r&&(r=b.p);b==
t&&(t=b.n);f(b.n,b.p);delete m[a]}a in k&&(delete k[a],g--)},removeAll:function(){k=ea();g=0;m=ea();r=t=null},destroy:function(){m=h=k=null;delete b[a]},info:function(){return N({},h,{size:g})}}}var b={};a.info=function(){var a={};n(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function xf(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Dc(a,b){function d(a,b,c){var d=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,e={};n(a,function(a,f){var g=a.match(d);
if(!g)throw ga("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f}});return e}function c(a){var b=a.charAt(0);if(!b||b!==K(b))throw ga("baddir",a);if(a!==a.trim())throw ga("baddir",a);}var e={},f=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,g=/(([\w\-]+)(?:\:([^;]+))?;?)/,h=$d("ngSrc,ngSrcset,src,srcset"),k=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function t(b,f){Ra(b,"directive");
F(b)?(c(b),rb(f,"directiveFactory"),e.hasOwnProperty(b)||(e[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var f=[];n(e[b],function(e,g){try{var h=a.invoke(e);B(h)?h={compile:na(h)}:!h.compile&&h.link&&(h.compile=na(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||b;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";var k=h,l=h,m=h.name,t={isolateScope:null,bindToController:null};G(l.scope)&&(!0===l.bindToController?(t.bindToController=d(l.scope,
m,!0),t.isolateScope={}):t.isolateScope=d(l.scope,m,!1));G(l.bindToController)&&(t.bindToController=d(l.bindToController,m,!0));if(G(t.bindToController)){var y=l.controller,X=l.controllerAs;if(!y)throw ga("noctrl",m);var U;a:if(X&&F(X))U=X;else{if(F(y)){var n=Vc.exec(y);if(n){U=n[3];break a}}U=void 0}if(!U)throw ga("noident",m);}var s=k.$$bindings=t;G(s.isolateScope)&&(h.$$isolateBindings=s.isolateScope);h.$$moduleName=e.$$moduleName;f.push(h)}catch(w){c(w)}});return f}])),e[b].push(f)):n(b,qc(t));
return this};this.aHrefSanitizationWhitelist=function(a){return u(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return u(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var m=!0;this.debugInfoEnabled=function(a){return u(a)?(m=a,this):m};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate","$$sanitizeUri",function(a,b,c,
d,p,x,v,Y,H,la){function I(a,b){try{a.addClass(b)}catch(c){}}function D(a,b,c,d,e){a instanceof A||(a=A(a));n(a,function(b,c){b.nodeType==Na&&b.nodeValue.match(/\S+/)&&(a[c]=A(b).wrap("<span></span>").parent()[0])});var f=L(a,b,a,c,d,e);D.$$addScopeClass(a);var g=null;return function(b,c,d){rb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var h=d.parentBoundTranscludeFn,k=d.transcludeControllers;d=d.futureParentElement;h&&h.$$boundTransclude&&(h=h.$$boundTransclude);g||(g=(d=d&&d[0])?
"foreignobject"!==oa(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?A(Q(g,A("<div>").append(a).html())):c?Pa.clone.call(a):a;if(k)for(var l in k)d.data("$"+l+"Controller",k[l].instance);D.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,h);return d}}function L(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,t,v,I;if(p)for(I=Array(c.length),m=0;m<h.length;m+=3)f=h[m],I[f]=c[f];else I=c;m=0;for(t=h.length;m<t;)k=I[h[m++]],c=h[m++],f=h[m++],c?(c.scope?(l=a.$new(),D.$$addScopeInfo(A(k),l)):l=a,
v=c.transcludeOnThisElement?O(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?O(a,b):null,c(f,l,k,d,v)):f&&f(a,k.childNodes,w,e)}for(var h=[],k,l,m,t,p,v=0;v<a.length;v++){k=new aa;l=X(a[v],[],k,0===v?d:w,e);(f=l.length?s(l,a[v],k,b,c,null,[],[],f):null)&&f.scope&&D.$$addScopeClass(k.$$element);k=f&&f.terminal||!(m=a[v].childNodes)||!m.length?null:L(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(v,f,k),t=!0,p=p||f;f=null}return t?g:null}function O(a,
b,c){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function X(a,b,c,d,e){var h=c.$attr,k;switch(a.nodeType){case 1:u(b,va(oa(a)),"E",d,e);for(var l,m,t,p=a.attributes,v=0,I=p&&p.length;v<I;v++){var L=!1,C=!1;l=p[v];k=l.name;m=T(l.value);l=va(k);if(t=ia.test(l))k=k.replace(Yc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});(l=l.match(ja))&&fa(l[1])&&(L=k,C=k.substr(0,k.length-
5)+"end",k=k.substr(0,k.length-6));l=va(k.toLowerCase());h[l]=k;if(t||!c.hasOwnProperty(l))c[l]=m,Rc(a,l)&&(c[l]=!0);P(a,b,m,l,t);u(b,l,"A",d,e,L,C)}a=a.className;G(a)&&(a=a.animVal);if(F(a)&&""!==a)for(;k=g.exec(a);)l=va(k[2]),u(b,l,"C",d,e)&&(c[l]=T(k[3])),a=a.substr(k.index+k[0].length);break;case Na:if(11===Ha)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===Na;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);J(b,a.nodeValue);break;case 8:try{if(k=f.exec(a.nodeValue))l=
va(k[1]),u(b,l,"M",d,e)&&(c[l]=T(k[2]))}catch(X){}}b.sort(wa);return b}function U(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ga("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return A(d)}function Ta(a,b,c){return function(d,e,f,g,h){e=U(e[0],b,c);return a(d,e,f,g,h)}}function s(a,b,d,e,f,g,h,l,m){function t(a,b,c,d){if(a){c&&(a=Ta(a,c,d));a.require=q.require;a.directiveName=z;if(O===
q||q.$$isolateScope)a=ba(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=Ta(b,c,d));b.require=q.require;b.directiveName=z;if(O===q||q.$$isolateScope)b=ba(b,{isolateScope:!0});l.push(b)}}function p(a,b,c,d){var e;if(F(b)){var f=b.match(k);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;e||(d="$"+b+"Controller",e=g?c.inheritedData(d):c.data(d));if(!e&&!f)throw ga("ctreq",b,a);}else if(E(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=p(a,b[g],c,d);return e||
null}function v(a,b,c,d,e,f){var g=ea(),h;for(h in d){var k=d[h],l={$scope:k===O||k.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},m=k.controller;"@"==m&&(m=b[k.name]);l=x(m,l,!0,k.controllerAs);g[k.name]=l;hb||a.data("$"+k.name+"Controller",l.instance)}return g}function I(a,c,e,f,g){function k(a,b,c){var d;Za(a)||(c=b,b=a,a=w);hb&&(d=X);c||(c=hb?x.parent():x);return g(a,b,d,c,Ta)}var m,t,L,X,y,x,U;b===e?(f=d,x=d.$$element):(x=A(e),f=new aa(x,d));L=c;O?t=c.$new(!0):C&&(L=c.$parent);g&&(y=k,
y.$$boundTransclude=g);R&&(X=v(x,f,y,R,t,c));O&&(D.$$addScopeInfo(x,t,!0,!(n&&(n===O||n===O.$$originalDirective))),D.$$addScopeClass(x,!0),t.$$isolateBindings=O.$$isolateBindings,(U=Z(c,f,t,t.$$isolateBindings,O))&&t.$on("$destroy",U));for(var Xc in X){U=R[Xc];var Y=X[Xc],H=U.$$bindings.bindToController;Y.identifier&&H&&(m=Z(L,f,Y.instance,H,U));var q=Y();q!==Y.instance&&(Y.instance=q,x.data("$"+U.name+"Controller",q),m&&m(),m=Z(L,f,Y.instance,H,U))}fa=0;for(K=h.length;fa<K;fa++)m=h[fa],ca(m,m.isolateScope?
t:c,x,f,m.require&&p(m.directiveName,m.require,x,X),y);var Ta=c;O&&(O.template||null===O.templateUrl)&&(Ta=t);a&&a(Ta,e.childNodes,w,g);for(fa=l.length-1;0<=fa;fa--)m=l[fa],ca(m,m.isolateScope?t:c,x,f,m.require&&p(m.directiveName,m.require,x,X),y)}m=m||{};for(var L=-Number.MAX_VALUE,C=m.newScopeDirective,R=m.controllerDirectives,O=m.newIsolateScopeDirective,n=m.templateDirective,Y=m.nonTlbTranscludeDirective,H=!1,la=!1,hb=m.hasElementTranscludeDirective,u=d.$$element=A(b),q,z,J,ib=e,wa,fa=0,K=a.length;fa<
K;fa++){q=a[fa];var N=q.$$start,P=q.$$end;N&&(u=U(b,N,P));J=w;if(L>q.priority)break;if(J=q.scope)q.templateUrl||(G(J)?(Ua("new/isolated scope",O||C,q,u),O=q):Ua("new/isolated scope",O,q,u)),C=C||q;z=q.name;!q.templateUrl&&q.controller&&(J=q.controller,R=R||ea(),Ua("'"+z+"' controller",R[z],q,u),R[z]=q);if(J=q.transclude)H=!0,q.$$tlb||(Ua("transclusion",Y,q,u),Y=q),"element"==J?(hb=!0,L=q.priority,J=u,u=d.$$element=A(W.createComment(" "+z+": "+d[z]+" ")),b=u[0],V(f,sa.call(J,0),b),ib=D(J,e,L,g&&g.name,
{nonTlbTranscludeDirective:Y})):(J=A(Xb(b)).contents(),u.empty(),ib=D(J,e,w,w,{needsNewScope:q.$$isolateScope||q.$$newScope}));if(q.template)if(la=!0,Ua("template",n,q,u),n=q,J=B(q.template)?q.template(u,d):q.template,J=ha(J),q.replace){g=q;J=Vb.test(J)?Zc(Q(q.templateNamespace,T(J))):[];b=J[0];if(1!=J.length||1!==b.nodeType)throw ga("tplrt",z,"");V(f,u,b);J={$attr:{}};var Eb=X(b,[],J),$=a.splice(fa+1,a.length-(fa+1));(O||C)&&Wc(Eb,O,C);a=a.concat(Eb).concat($);M(d,J);K=a.length}else u.html(J);if(q.templateUrl)la=
!0,Ua("template",n,q,u),n=q,q.replace&&(g=q),I=S(a.splice(fa,a.length-fa),u,d,f,H&&ib,h,l,{controllerDirectives:R,newScopeDirective:C!==q&&C,newIsolateScopeDirective:O,templateDirective:n,nonTlbTranscludeDirective:Y}),K=a.length;else if(q.compile)try{wa=q.compile(u,d,ib),B(wa)?t(null,wa,N,P):wa&&t(wa.pre,wa.post,N,P)}catch(da){c(da,ua(u))}q.terminal&&(I.terminal=!0,L=Math.max(L,q.priority))}I.scope=C&&!0===C.scope;I.transcludeOnThisElement=H;I.templateOnThisElement=la;I.transclude=ib;m.hasElementTranscludeDirective=
hb;return I}function Wc(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=Qb(a[d],{$$isolateScope:b,$$newScope:c})}function u(b,d,f,g,h,k,l){if(d===h)return null;h=null;if(e.hasOwnProperty(d)){var m;d=a.get(d+"Directive");for(var p=0,v=d.length;p<v;p++)try{m=d[p],(q(g)||g>m.priority)&&-1!=m.restrict.indexOf(f)&&(k&&(m=Qb(m,{$$start:k,$$end:l})),b.push(m),h=m)}catch(I){c(I)}}return h}function fa(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=c[d],b.multiElement)return!0;
return!1}function M(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;n(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});n(b,function(b,f){"class"==f?(I(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function S(a,b,c,e,f,g,h,k){var l=[],m,t,p=b[0],v=a.shift(),C=Qb(v,{templateUrl:null,transclude:null,replace:null,
$$originalDirective:v}),x=B(v.templateUrl)?v.templateUrl(b,c):v.templateUrl,y=v.templateNamespace;b.empty();d(x).then(function(d){var R,D;d=ha(d);if(v.replace){d=Vb.test(d)?Zc(Q(y,T(d))):[];R=d[0];if(1!=d.length||1!==R.nodeType)throw ga("tplrt",v.name,x);d={$attr:{}};V(e,b,R);var U=X(R,[],d);G(v.scope)&&Wc(U,!0);a=U.concat(a);M(c,d)}else R=p,b.html(d);a.unshift(C);m=s(a,R,c,f,b,v,g,h,k);n(e,function(a,c){a==R&&(e[c]=b[0])});for(t=L(b[0].childNodes,f);l.length;){d=l.shift();D=l.shift();var Y=l.shift(),
H=l.shift(),U=b[0];if(!d.$$destroyed){if(D!==p){var q=D.className;k.hasElementTranscludeDirective&&v.replace||(U=Xb(R));V(Y,A(D),U);I(A(U),q)}D=m.transcludeOnThisElement?O(d,m.transclude,H):H;m(t,d,U,e,D)}}l=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(m.transcludeOnThisElement&&(a=O(b,m.transclude,e)),m(t,b,c,d,a)))}}function wa(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Ua(a,b,c,d){function e(a){return a?
" (module: "+a+")":""}if(b)throw ga("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,ua(d));}function J(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&D.$$addBindingClass(a);return function(a,c){var e=c.parent();b||D.$$addBindingClass(e);D.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Q(a,b){a=K(a||"html");switch(a){case "svg":case "math":var c=W.createElement("div");c.innerHTML="<"+a+">"+b+"</"+
a+">";return c.childNodes[0].childNodes;default:return b}}function Eb(a,b){if("srcdoc"==b)return Y.HTML;var c=oa(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return Y.RESOURCE_URL}function P(a,c,d,e,f){var g=Eb(a,e);f=h[e]||f;var k=b(d,!0,g,f);if(k){if("multiple"===e&&"select"===oa(a))throw ga("selmulti",ua(a));c.push({priority:100,compile:function(){return{pre:function(a,c,h){c=h.$$observers||(h.$$observers=ea());if(l.test(e))throw ga("nodomevents");var m=h[e];m!==
d&&(k=m&&b(m,!0,g,f),d=m);k&&(h[e]=k(a),(c[e]||(c[e]=[])).$$inter=!0,(h.$$observers&&h.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?h.$updateClass(a,b):h.$set(e,a)}))}}}})}}function V(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=W.createDocumentFragment();a.appendChild(d);A.hasData(d)&&
(A.data(c,A.data(d)),pa?(Tb=!0,pa.cleanData([d])):delete A.cache[d[A.expando]]);d=1;for(e=b.length;d<e;d++)f=b[d],A(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function ba(a,b){return N(function(){return a.apply(null,arguments)},a,b)}function ca(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ua(d))}}function Z(a,c,d,e,f){var g=[];n(e,function(e,h){var k=e.attrName,l=e.optional,m,t,v,I;switch(e.mode){case "@":l||ra.call(c,k)||(d[h]=c[k]=void 0);c.$observe(k,function(a){F(a)&&(d[h]=a)});
c.$$observers[k].$$scope=a;F(c[k])&&(d[h]=b(c[k])(a));break;case "=":if(!ra.call(c,k)){if(l)break;c[k]=void 0}if(l&&!c[k])break;t=p(c[k]);I=t.literal?ka:function(a,b){return a===b||a!==a&&b!==b};v=t.assign||function(){m=d[h]=t(a);throw ga("nonassign",c[k],f.name);};m=d[h]=t(a);l=function(b){I(b,d[h])||(I(b,m)?v(a,b=d[h]):d[h]=b);return m=b};l.$stateful=!0;l=e.collection?a.$watchCollection(c[k],l):a.$watch(p(c[k],l),null,t.literal);g.push(l);break;case "&":t=c.hasOwnProperty(k)?p(c[k]):z;if(t===z&&
l)break;d[h]=function(b){return t(a,b)}}});return g.length&&function(){for(var a=0,b=g.length;a<b;++a)g[a]()}}var aa=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};aa.prototype={$normalize:va,$addClass:function(a){a&&0<a.length&&H.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&H.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=$c(a,b);c&&c.length&&H.addClass(this.$$element,c);(c=
$c(b,a))&&c.length&&H.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=Rc(this.$$element[0],a),g=ad[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Ac(a,"-"));f=oa(this.$$element);if("a"===f&&"href"===a||"img"===f&&"src"===a)this[a]=b=la(b,"src"===a);else if("img"===f&&"srcset"===a){for(var f="",g=T(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(g)?k:/(,)/,g=g.split(k),k=Math.floor(g.length/2),l=0;l<k;l++)var m=
2*l,f=f+la(T(g[m]),!0),f=f+(" "+T(g[m+1]));g=T(g[2*l]).split(/\s/);f+=la(T(g[0]),!0);2===g.length&&(f+=" "+T(g[1]));this[a]=b=f}!1!==d&&(null===b||q(b)?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&n(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ea()),e=d[a]||(d[a]=[]);e.push(b);v.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||q(c[a])||b(c[a])});return function(){ab(e,b)}}};var $=b.startSymbol(),
da=b.endSymbol(),ha="{{"==$||"}}"==da?Ya:function(a){return a.replace(/\{\{/g,$).replace(/}}/g,da)},ia=/^ngAttr[A-Z]/,ja=/^(.+)Start$/;D.$$addBindingInfo=m?function(a,b){var c=a.data("$binding")||[];E(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:z;D.$$addBindingClass=m?function(a){I(a,"ng-binding")}:z;D.$$addScopeInfo=m?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:z;D.$$addScopeClass=m?function(a,b){I(a,b?"ng-isolate-scope":"ng-scope")}:z;return D}]}function va(a){return eb(a.replace(Yc,
""))}function $c(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],h=0;h<e.length;h++)if(g==e[h])continue a;d+=(0<d.length?" ":"")+g}return d}function Zc(a){a=A(a);var b=a.length;if(1>=b)return a;for(;b--;)8===a[b].nodeType&&Uf.call(a,b,1);return a}function cf(){var a={},b=!1;this.register=function(b,c){Ra(b,"controller");G(b)?N(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function e(a,b,c,d){if(!a||!G(a.$scope))throw M("$controller")("noscp",
d,b);a.$scope[b]=c}return function(f,g,h,k){var l,m,r;h=!0===h;k&&F(k)&&(r=k);if(F(f)){k=f.match(Vc);if(!k)throw Vf("ctrlfmt",f);m=k[1];r=r||k[3];f=a.hasOwnProperty(m)?a[m]:Cc(g.$scope,m,!0)||(b?Cc(c,m,!0):w);Qa(f,m,!0)}if(h)return h=(E(f)?f[f.length-1]:f).prototype,l=Object.create(h||null),r&&e(g,r,l,m||f.name),N(function(){var a=d.invoke(f,l,g,m);a!==l&&(G(a)||B(a))&&(l=a,r&&e(g,r,l,m||f.name));return l},{instance:l,identifier:r});l=d.instantiate(f,g,m);r&&e(g,r,l,m||f.name);return l}}]}function df(){this.$get=
["$window",function(a){return A(a.document)}]}function ef(){this.$get=["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function $b(a){return G(a)?da(a)?a.toISOString():cb(a):a}function kf(){this.$get=function(){return function(a){if(!a)return"";var b=[];pc(a,function(a,c){null===a||q(a)||(E(a)?n(a,function(a,d){b.push(ia(c)+"="+ia($b(a)))}):b.push(ia(c)+"="+ia($b(a))))});return b.join("&")}}}function lf(){this.$get=function(){return function(a){function b(a,e,f){null===a||q(a)||
(E(a)?n(a,function(a,c){b(a,e+"["+(G(a)?c:"")+"]")}):G(a)&&!da(a)?pc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):d.push(ia(e)+"="+ia($b(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function ac(a,b){if(F(a)){var d=a.replace(Wf,"").trim();if(d){var c=b("Content-Type");(c=c&&0===c.indexOf(bd))||(c=(c=d.match(Xf))&&Yf[c[0]].test(d));c&&(a=vc(d))}}return a}function cd(a){var b=ea(),d;F(a)?n(a.split("\n"),function(a){d=a.indexOf(":");var e=K(T(a.substr(0,d)));a=T(a.substr(d+1));e&&
(b[e]=b[e]?b[e]+", "+a:a)}):G(a)&&n(a,function(a,d){var f=K(d),g=T(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function dd(a){var b;return function(d){b||(b=cd(a));return d?(d=b[K(d)],void 0===d&&(d=null),d):b}}function ed(a,b,d,c){if(B(c))return c(a,b,d);n(c,function(c){a=c(a,b,d)});return a}function jf(){var a=this.defaults={transformResponse:[ac],transformRequest:[function(a){return G(a)&&"[object File]"!==ta.call(a)&&"[object Blob]"!==ta.call(a)&&"[object FormData]"!==ta.call(a)?cb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},
post:ha(bc),put:ha(bc),patch:ha(bc)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},b=!1;this.useApplyAsync=function(a){return u(a)?(b=!!a,this):b};var d=!0;this.useLegacyPromiseExtensions=function(a){return u(a)?(d=!!a,this):d};var c=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(e,f,g,h,k,l){function m(b){function c(a){var b=N({},a);b.data=ed(a.data,a.headers,a.status,f.transformResponse);
a=a.status;return 200<=a&&300>a?b:k.reject(b)}function e(a,b){var c,d={};n(a,function(a,e){B(a)?(c=a(b),null!=c&&(d[e]=c)):d[e]=a});return d}if(!$.isObject(b))throw M("$http")("badreq",b);if(!F(b.url))throw M("$http")("badreq",b.url);var f=N({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer},b);f.headers=function(b){var c=a.headers,d=N({},b.headers),f,g,h,c=N({},c.common,c[K(b.method)]);a:for(f in c){g=K(f);for(h in d)if(K(h)===
g)continue a;d[f]=c[f]}return e(d,ha(b))}(b);f.method=tb(f.method);f.paramSerializer=F(f.paramSerializer)?l.get(f.paramSerializer):f.paramSerializer;var g=[function(b){var d=b.headers,e=ed(b.data,dd(d),w,b.transformRequest);q(e)&&n(d,function(a,b){"content-type"===K(b)&&delete d[b]});q(b.withCredentials)&&!q(a.withCredentials)&&(b.withCredentials=a.withCredentials);return r(b,e).then(c,c)},w],h=k.when(f);for(n(y,function(a){(a.request||a.requestError)&&g.unshift(a.request,a.requestError);(a.response||
a.responseError)&&g.push(a.response,a.responseError)});g.length;){b=g.shift();var m=g.shift(),h=h.then(b,m)}d?(h.success=function(a){Qa(a,"fn");h.then(function(b){a(b.data,b.status,b.headers,f)});return h},h.error=function(a){Qa(a,"fn");h.then(null,function(b){a(b.data,b.status,b.headers,f)});return h}):(h.success=fd("success"),h.error=fd("error"));return h}function r(c,d){function g(a,c,d,e){function f(){l(c,a,d,e)}D&&(200<=a&&300>a?D.put(X,[a,c,cd(d),e]):D.remove(X));b?h.$applyAsync(f):(f(),h.$$phase||
h.$apply())}function l(a,b,d,e){b=-1<=b?b:0;(200<=b&&300>b?n.resolve:n.reject)({data:a,status:b,headers:dd(d),config:c,statusText:e})}function r(a){l(a.data,a.status,ha(a.headers()),a.statusText)}function y(){var a=m.pendingRequests.indexOf(c);-1!==a&&m.pendingRequests.splice(a,1)}var n=k.defer(),I=n.promise,D,L,O=c.headers,X=t(c.url,c.paramSerializer(c.params));m.pendingRequests.push(c);I.then(y,y);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(D=G(c.cache)?c.cache:G(a.cache)?
a.cache:C);D&&(L=D.get(X),u(L)?L&&B(L.then)?L.then(r,r):E(L)?l(L[1],L[0],ha(L[2]),L[3]):l(L,200,{},"OK"):D.put(X,I));q(L)&&((L=gd(c.url)?f()[c.xsrfCookieName||a.xsrfCookieName]:w)&&(O[c.xsrfHeaderName||a.xsrfHeaderName]=L),e(c.method,X,d,g,O,c.timeout,c.withCredentials,c.responseType));return I}function t(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);return a}var C=g("$http");a.paramSerializer=F(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer;var y=[];n(c,function(a){y.unshift(F(a)?
l.get(a):l.invoke(a))});m.pendingRequests=[];(function(a){n(arguments,function(a){m[a]=function(b,c){return m(N({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){n(arguments,function(a){m[a]=function(b,c,d){return m(N({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");m.defaults=a;return m}]}function nf(){this.$get=function(){return function(){return new S.XMLHttpRequest}}}function mf(){this.$get=["$browser","$window","$document","$xhrFactory",function(a,b,d,
c){return Zf(a,c,a.defer,b.angular.callbacks,d[0])}]}function Zf(a,b,d,c,e){function f(a,b,d){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,C="unknown";a&&("load"!==a.type||c[b].called||(a={type:"error"}),C=a.type,g="error"===a.type?404:200);d&&d(g,C)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}
return function(e,h,k,l,m,r,t,C){function y(){x&&x();v&&v.abort()}function R(b,c,e,f,g){u(H)&&d.cancel(H);x=v=null;b(c,e,f,g);a.$$completeOutstandingRequest(z)}a.$$incOutstandingRequestCount();h=h||a.url();if("jsonp"==K(e)){var p="_"+(c.counter++).toString(36);c[p]=function(a){c[p].data=a;c[p].called=!0};var x=f(h.replace("JSON_CALLBACK","angular.callbacks."+p),p,function(a,b){R(l,a,c[p].data,"",b);c[p]=z})}else{var v=b(e,h);v.open(e,h,!0);n(m,function(a,b){u(a)&&v.setRequestHeader(b,a)});v.onload=
function(){var a=v.statusText||"",b="response"in v?v.response:v.responseText,c=1223===v.status?204:v.status;0===c&&(c=b?200:"file"==xa(h).protocol?404:0);R(l,c,b,v.getAllResponseHeaders(),a)};e=function(){R(l,-1,null,null,"")};v.onerror=e;v.onabort=e;t&&(v.withCredentials=!0);if(C)try{v.responseType=C}catch(Y){if("json"!==C)throw Y;}v.send(q(k)?null:k)}if(0<r)var H=d(y,r);else r&&B(r.then)&&r.then(y)}}function gf(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=
function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler","$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(m,a).replace(r,b)}function h(f,h,m,r){function p(a){try{var b=a;a=m?e.getTrusted(m,b):e.valueOf(b);var d;if(r&&!u(a))d=a;else if(null==a)d="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=cb(a)}d=a}return d}catch(g){c(Ia.interr(f,g))}}r=!!r;for(var x,v,n=0,H=[],s=[],I=f.length,D=[],L=[];n<I;)if(-1!=(x=f.indexOf(a,
n))&&-1!=(v=f.indexOf(b,x+k)))n!==x&&D.push(g(f.substring(n,x))),n=f.substring(x+k,v),H.push(n),s.push(d(n,p)),n=v+l,L.push(D.length),D.push("");else{n!==I&&D.push(g(f.substring(n)));break}m&&1<D.length&&Ia.throwNoconcat(f);if(!h||H.length){var O=function(a){for(var b=0,c=H.length;b<c;b++){if(r&&q(a[b]))return;D[L[b]]=a[b]}return D.join("")};return N(function(a){var b=0,d=H.length,e=Array(d);try{for(;b<d;b++)e[b]=s[b](a);return O(e)}catch(g){c(Ia.interr(f,g))}},{exp:f,expressions:H,$$watchDelegate:function(a,
b){var c;return a.$watchGroup(s,function(d,e){var f=O(d);B(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var k=a.length,l=b.length,m=new RegExp(a.replace(/./g,f),"g"),r=new RegExp(b.replace(/./g,f),"g");h.startSymbol=function(){return a};h.endSymbol=function(){return b};return h}]}function hf(){this.$get=["$rootScope","$window","$q","$$q",function(a,b,d,c){function e(e,h,k,l){var m=4<arguments.length,r=m?sa.call(arguments,4):[],t=b.setInterval,C=b.clearInterval,y=0,n=u(l)&&!l,p=(n?c:d).defer(),x=p.promise;
k=u(k)?k:0;x.then(null,null,m?function(){e.apply(null,r)}:e);x.$$intervalId=t(function(){p.notify(y++);0<k&&y>=k&&(p.resolve(y),C(x.$$intervalId),delete f[x.$$intervalId]);n||a.$apply()},h);f[x.$$intervalId]=p;return x}var f={};e.cancel=function(a){return a&&a.$$intervalId in f?(f[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),delete f[a.$$intervalId],!0):!1};return e}]}function cc(a){a=a.split("/");for(var b=a.length;b--;)a[b]=pb(a[b]);return a.join("/")}function hd(a,b){var d=
xa(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=Z(d.port)||$f[d.protocol]||null}function id(a,b){var d="/"!==a.charAt(0);d&&(a="/"+a);var c=xa(a);b.$$path=decodeURIComponent(d&&"/"===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname);b.$$search=yc(c.search);b.$$hash=decodeURIComponent(c.hash);b.$$path&&"/"!=b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function qa(a,b){if(0===b.indexOf(a))return b.substr(a.length)}function Ga(a){var b=a.indexOf("#");return-1==b?a:a.substr(0,b)}function jb(a){return a.replace(/(#.+)|#$/,
"$1")}function dc(a,b,d){this.$$html5=!0;d=d||"";hd(a,this);this.$$parse=function(a){var d=qa(b,a);if(!F(d))throw Fb("ipthprfx",a,b);id(d,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Sb(this.$$search),d=this.$$hash?"#"+pb(this.$$hash):"";this.$$url=cc(this.$$path)+(a?"?"+a:"")+d;this.$$absUrl=b+this.$$url.substr(1)};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;u(f=qa(a,c))?(g=f,g=u(f=qa(d,f))?b+(qa("/",f)||f):
a+g):u(f=qa(b,c))?g=b+f:b==c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function ec(a,b,d){hd(a,this);this.$$parse=function(c){var e=qa(a,c)||qa(b,c),f;q(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",q(e)&&(a=c,this.replace())):(f=qa(d,e),q(f)&&(f=e));id(f,this);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;0===f.indexOf(e)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=Sb(this.$$search),e=this.$$hash?"#"+pb(this.$$hash):"";this.$$url=
cc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+(this.$$url?d+this.$$url:"")};this.$$parseLinkUrl=function(b,d){return Ga(a)==Ga(b)?(this.$$parse(b),!0):!1}}function jd(a,b,d){this.$$html5=!0;ec.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a==Ga(c)?f=c:(g=qa(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$compose=function(){var b=Sb(this.$$search),e=this.$$hash?"#"+pb(this.$$hash):"";this.$$url=cc(this.$$path)+
(b?"?"+b:"")+e;this.$$absUrl=a+d+this.$$url}}function Gb(a){return function(){return this[a]}}function kd(a,b){return function(d){if(q(d))return this[a];this[a]=b(d);this.$$compose();return this}}function of(){var a="",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return u(b)?(a=b,this):a};this.html5Mode=function(a){return $a(a)?(b.enabled=a,this):G(a)?($a(a.enabled)&&(b.enabled=a.enabled),$a(a.requireBase)&&(b.requireBase=a.requireBase),$a(a.rewriteLinks)&&(b.rewriteLinks=
a.rewriteLinks),this):b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,e,f,g){function h(a,b,d){var e=l.url(),f=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(g){throw l.url(e),l.$$state=f,g;}}function k(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),a,l.$$state,b)}var l,m;m=c.baseHref();var r=c.url(),t;if(b.enabled){if(!m&&b.requireBase)throw Fb("nobase");t=r.substring(0,r.indexOf("/",r.indexOf("//")+2))+(m||"/");m=e.history?dc:jd}else t=Ga(r),m=
ec;var C=t.substr(0,Ga(t).lastIndexOf("/")+1);l=new m(t,C,"#"+a);l.$$parseLinkUrl(r,r);l.$$state=c.state();var y=/^\s*(javascript|mailto):/i;f.on("click",function(a){if(b.rewriteLinks&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!=a.which&&2!=a.button){for(var e=A(a.target);"a"!==oa(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),k=e.attr("href")||e.attr("xlink:href");G(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=xa(h.animVal).href);y.test(h)||!h||e.attr("target")||a.isDefaultPrevented()||
!l.$$parseLinkUrl(h,k)||(a.preventDefault(),l.absUrl()!=c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});jb(l.absUrl())!=jb(r)&&c.url(l.absUrl(),!0);var n=!0;c.onUrlChange(function(a,b){q(qa(C,a))?g.location.href=a:(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,f;a=jb(a);l.$$parse(a);l.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;l.absUrl()===a&&(f?(l.$$parse(c),l.$$state=e,h(c,!1,e)):(n=!1,k(c,e)))}),d.$$phase||d.$digest())});d.$watch(function(){var a=
jb(c.url()),b=jb(l.absUrl()),f=c.state(),g=l.$$replace,m=a!==b||l.$$html5&&e.history&&f!==l.$$state;if(n||m)n=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,f).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=f):(m&&h(b,g,f===l.$$state?null:l.$$state),k(a,f)))});l.$$replace=!1});return l}]}function pf(){var a=!0,b=this;this.debugEnabled=function(b){return u(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){a instanceof Error&&
(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||z;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];n(arguments,function(b){a.push(c(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}
function Va(a,b){if("__defineGetter__"===a||"__defineSetter__"===a||"__lookupGetter__"===a||"__lookupSetter__"===a||"__proto__"===a)throw aa("isecfld",b);return a}function ld(a,b){a+="";if(!F(a))throw aa("iseccst",b);return a}function ya(a,b){if(a){if(a.constructor===a)throw aa("isecfn",b);if(a.window===a)throw aa("isecwindow",b);if(a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw aa("isecdom",b);if(a===Object)throw aa("isecobj",b);}return a}function md(a,b){if(a){if(a.constructor===a)throw aa("isecfn",
b);if(a===ag||a===bg||a===cg)throw aa("isecff",b);}}function nd(a,b){if(a&&(a===(0).constructor||a===(!1).constructor||a==="".constructor||a==={}.constructor||a===[].constructor||a===Function.constructor))throw aa("isecaf",b);}function dg(a,b){return"undefined"!==typeof a?a:b}function od(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function V(a,b){var d,c;switch(a.type){case s.Program:d=!0;n(a.body,function(a){V(a.expression,b);d=d&&a.expression.constant});a.constant=d;break;case s.Literal:a.constant=
!0;a.toWatch=[];break;case s.UnaryExpression:V(a.argument,b);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case s.BinaryExpression:V(a.left,b);V(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case s.LogicalExpression:V(a.left,b);V(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case s.ConditionalExpression:V(a.test,b);V(a.alternate,b);V(a.consequent,b);a.constant=a.test.constant&&
a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case s.Identifier:a.constant=!1;a.toWatch=[a];break;case s.MemberExpression:V(a.object,b);a.computed&&V(a.property,b);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=[a];break;case s.CallExpression:d=a.filter?!b(a.callee.name).$stateful:!1;c=[];n(a.arguments,function(a){V(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=a.filter&&!b(a.callee.name).$stateful?c:
[a];break;case s.AssignmentExpression:V(a.left,b);V(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case s.ArrayExpression:d=!0;c=[];n(a.elements,function(a){V(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=c;break;case s.ObjectExpression:d=!0;c=[];n(a.properties,function(a){V(a.value,b);d=d&&a.value.constant;a.value.constant||c.push.apply(c,a.value.toWatch)});a.constant=d;a.toWatch=c;break;case s.ThisExpression:a.constant=!1,a.toWatch=
[]}}function pd(a){if(1==a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:w}}function qd(a){return a.type===s.Identifier||a.type===s.MemberExpression}function rd(a){if(1===a.body.length&&qd(a.body[0].expression))return{type:s.AssignmentExpression,left:a.body[0].expression,right:{type:s.NGValueParameter},operator:"="}}function sd(a){return 0===a.body.length||1===a.body.length&&(a.body[0].expression.type===s.Literal||a.body[0].expression.type===s.ArrayExpression||a.body[0].expression.type===
s.ObjectExpression)}function td(a,b){this.astBuilder=a;this.$filter=b}function ud(a,b){this.astBuilder=a;this.$filter=b}function Hb(a){return"constructor"==a}function fc(a){return B(a.valueOf)?a.valueOf():eg.call(a)}function qf(){var a=ea(),b=ea();this.$get=["$filter",function(d){function c(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=fc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function e(a,b,d,e,f){var g=e.inputs,h;if(1===g.length){var k=c,g=g[0];return a.$watch(function(a){var b=
g(a);c(b,k)||(h=e(a,w,w,[b]),k=b&&fc(b));return h},b,d,f)}for(var l=[],m=[],r=0,n=g.length;r<n;r++)l[r]=c,m[r]=null;return a.$watch(function(a){for(var b=!1,d=0,f=g.length;d<f;d++){var k=g[d](a);if(b||(b=!c(k,l[d])))m[d]=k,l[d]=k&&fc(k)}b&&(h=e(a,w,w,m));return h},b,d,f)}function f(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;B(b)&&b.apply(this,arguments);u(a)&&d.$$postDigest(function(){u(f)&&e()})},c)}function g(a,b,c,d){function e(a){var b=!0;n(a,function(a){u(a)||
(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;B(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function h(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){B(b)&&b.apply(this,arguments);e()},c)}function k(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,c=c!==g&&c!==f?function(c,e,f,g){f=d&&g?g[0]:a(c,e,f,g);return b(f,c,e)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return u(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==
e?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=e,d=!a.inputs,c.inputs=a.inputs?a.inputs:[a]);return c}var l=Ca().noUnsafeEval,m={csp:l,expensiveChecks:!1},r={csp:l,expensiveChecks:!0};return function(c,l,y){var n,p,x;switch(typeof c){case "string":x=c=c.trim();var v=y?b:a;n=v[x];n||(":"===c.charAt(0)&&":"===c.charAt(1)&&(p=!0,c=c.substring(2)),y=y?r:m,n=new gc(y),n=(new hc(n,d,y)).parse(c),n.constant?n.$$watchDelegate=h:p?n.$$watchDelegate=n.literal?g:f:n.inputs&&(n.$$watchDelegate=
e),v[x]=n);return k(n,l);case "function":return k(c,l);default:return k(z,l)}}}]}function sf(){this.$get=["$rootScope","$exceptionHandler",function(a,b){return vd(function(b){a.$evalAsync(b)},b)}]}function tf(){this.$get=["$browser","$exceptionHandler",function(a,b){return vd(function(b){a.defer(b)},b)}]}function vd(a,b){function d(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function c(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,
c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,a(function(){var a,d,e;e=c.pending;c.processScheduled=!1;c.pending=w;for(var f=0,g=e.length;f<g;++f){d=e[f][0];a=e[f][c.status];try{B(a)?d.resolve(a(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),b(h)}}}))}function g(){this.promise=new c;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=M("$q",TypeError);N(c.prototype,{then:function(a,b,c){if(q(a)&&
q(b)&&q(c))return this;var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return l(b,!0,a)},function(b){return l(b,!1,a)},b)}});N(g.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(a){var c,e;e=d(this,this.$$resolve,
this.$$reject);try{if(G(a)||B(a))c=a&&a.then;B(c)?(this.promise.$$state.status=-1,c.call(a,e[0],e[1],this.notify)):(this.promise.$$state.value=a,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),b(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&a(function(){for(var a,
e,f=0,g=d.length;f<g;f++){e=d[f][0];a=d[f][3];try{e.notify(B(a)?a(c):c)}catch(h){b(h)}}})}});var k=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},l=function(a,b,c){var d=null;try{B(c)&&(d=c())}catch(e){return k(e,!1)}return d&&B(d.then)?d.then(function(){return k(a,b)},function(a){return k(a,!1)}):k(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},r=function C(a){if(!B(a))throw h("norslvr",a);if(!(this instanceof C))return new C(a);var b=new g;
a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};r.defer=function(){return new g};r.reject=function(a){var b=new g;b.reject(a);return b.promise};r.when=m;r.resolve=m;r.all=function(a){var b=new g,c=0,d=E(a)?[]:{};n(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return r}function Cf(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||
a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function rf(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++ob;this.$$ChildScope=null}b.prototype=a;
return b}var b=10,d=M("$rootScope"),c=null,e=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(f,g,h,k){function l(a){a.currentScope.$$destroyed=!0}function m(a){9===Ha&&(a.$$childHead&&m(a.$$childHead),a.$$nextSibling&&m(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function r(){this.$id=++ob;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=
this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function t(a){if(v.$$phase)throw d("inprog",v.$$phase);v.$$phase=a}function C(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function y(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function s(){}function p(){for(;w.length;)try{w.shift()()}catch(a){g(a)}e=
null}function x(){null===e&&(e=k.defer(function(){v.$apply(p)}))}r.prototype={constructor:r,$new:function(b,c){var d;c=c||this;b?(d=new r,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!=this)&&d.$on("$destroy",l);return d},$watch:function(a,b,d,e){var f=h(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,
a);var g=this,k=g.$$watchers,l={fn:b,last:s,get:f,exp:e||a,eq:!!d};c=null;B(b)||(l.fn=z);k||(k=g.$$watchers=[]);k.unshift(l);C(this,1);return function(){0<=ab(k,l)&&C(g,-1);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});n(a,function(a,
b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!q(e)){if(G(e))if(Aa(e))for(f!==r&&(f=r,p=f.length=0,l++),a=e.length,p!==a&&(l++,f.length=p=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==t&&(f=t={},p=0,l++);a=0;for(b in e)ra.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(p++,f[b]=g,l++));if(p>
a)for(b in l++,f)ra.call(e,b)||(p--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,g,k=1<b.length,l=0,m=h(a,c),r=[],t={},n=!0,p=0;return this.$watch(m,function(){n?(n=!1,b(e,e,d)):b(e,g,d);if(k)if(G(e))if(Aa(e)){g=Array(e.length);for(var a=0;a<e.length;a++)g[a]=e[a]}else for(a in g={},e)ra.call(e,a)&&(g[a]=e[a]);else g=e})},$digest:function(){var a,f,h,l,m,r,n=b,C,x=[],q,y;t("$digest");k.$$checkUrlChange();this===v&&null!==e&&(k.defer.cancel(e),p());c=null;do{r=!1;for(C=
this;u.length;){try{y=u.shift(),y.scope.$eval(y.expression,y.locals)}catch(w){g(w)}c=null}a:do{if(l=C.$$watchers)for(m=l.length;m--;)try{if(a=l[m])if((f=a.get(C))!==(h=a.last)&&!(a.eq?ka(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))r=!0,c=a,a.last=a.eq?Ma(f,null):f,a.fn(f,h===s?f:h,C),5>n&&(q=4-n,x[q]||(x[q]=[]),x[q].push({msg:B(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:f,oldVal:h}));else if(a===c){r=!1;break a}}catch(la){g(la)}if(!(l=C.$$watchersCount&&C.$$childHead||
C!==this&&C.$$nextSibling))for(;C!==this&&!(l=C.$$nextSibling);)C=C.$parent}while(C=l);if((r||u.length)&&!n--)throw v.$$phase=null,d("infdig",b,x);}while(r||u.length);for(v.$$phase=null;H.length;)try{H.shift()()}catch(A){g(A)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===v&&k.$$applicationDestroyed();C(this,-this.$$watchersCount);for(var b in this.$$listenerCount)y(this,this.$$listenerCount[b],b);a&&a.$$childHead==this&&(a.$$childHead=
this.$$nextSibling);a&&a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=z;this.$on=this.$watch=this.$watchGroup=function(){return z};this.$$listeners={};this.$$nextSibling=null;m(this)}},$eval:function(a,b){return h(a)(this,b)},$evalAsync:function(a,b){v.$$phase||u.length||
k.defer(function(){u.length&&v.$digest()});u.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){H.push(a)},$apply:function(a){try{t("$apply");try{return this.$eval(a)}finally{v.$$phase=null}}catch(b){g(b)}finally{try{v.$digest()}catch(c){throw g(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&w.push(b);x()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;
while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,y(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,f=!1,h={name:a,targetScope:e,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=bb([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(r){g(r)}else d.splice(l,1),l--,m--;if(f)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=
null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var f=bb([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(l){g(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=
null;return e}};var v=new r,u=v.$$asyncQueue=[],H=v.$$postDigestQueue=[],w=v.$$applyAsyncQueue=[];return v}]}function ke(){var a=/^\s*(https?|ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return u(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return u(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f;f=xa(d).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function fg(a){if("self"===a)return a;
if(F(a)){if(-1<a.indexOf("***"))throw za("iwcard",a);a=wd(a).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+a+"$")}if(La(a))return new RegExp("^"+a.source+"$");throw za("imatcher");}function xd(a){var b=[];u(a)&&n(a,function(a){b.push(fg(a))});return b}function vf(){this.SCE_CONTEXTS=ma;var a=["self"],b=[];this.resourceUrlWhitelist=function(b){arguments.length&&(a=xd(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=xd(a));return b};this.$get=["$injector",
function(d){function c(a,b){return"self"===a?gd(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw za("unsafe");};d.has("$sanitize")&&(f=d.get("$sanitize"));var g=e(),h={};h[ma.HTML]=e(g);h[ma.CSS]=e(g);h[ma.URL]=e(g);h[ma.JS]=e(g);h[ma.RESOURCE_URL]=
e(h[ma.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw za("icontext",a,b);if(null===b||q(b)||""===b)return b;if("string"!==typeof b)throw za("itype",a);return new c(b)},getTrusted:function(d,e){if(null===e||q(e)||""===e)return e;var g=h.hasOwnProperty(d)?h[d]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(d===ma.RESOURCE_URL){var g=xa(e.toString()),r,t,n=!1;r=0;for(t=a.length;r<t;r++)if(c(a[r],g)){n=!0;break}if(n)for(r=0,t=b.length;r<t;r++)if(c(b[r],
g)){n=!1;break}if(n)return e;throw za("insecurl",e.toString());}if(d===ma.HTML)return f(e);throw za("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function uf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Ha)throw za("iequirks");var c=ha(ma);c.isEnabled=function(){return a};c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},
c.valueOf=Ya);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;n(ma,function(a,b){var d=K(b);c[eb("parse_as_"+d)]=function(b){return e(a,b)};c[eb("get_trusted_"+d)]=function(b){return f(a,b)};c[eb("trust_as_"+d)]=function(b){return g(a,b)}});return c}]}function wf(){this.$get=["$window","$document",function(a,b){var d={},c=Z((/android (\d+)/.exec(K((a.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((a.navigator||
{}).userAgent),f=b[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,k=f.body&&f.body.style,l=!1,m=!1;if(k){for(var r in k)if(l=h.exec(r)){g=l[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||g+"Transition"in k);m=!!("animation"in k||g+"Animation"in k);!c||l&&m||(l=F(k.webkitTransition),m=F(k.webkitAnimation))}return{history:!(!a.history||!a.history.pushState||4>c||e),hasEvent:function(a){if("input"===a&&11>=Ha)return!1;if(q(d[a])){var b=f.createElement("div");
d[a]="on"+a in b}return d[a]},csp:Ca(),vendorPrefix:g,transitions:l,animations:m,android:c}}]}function yf(){this.$get=["$templateCache","$http","$q","$sce",function(a,b,d,c){function e(f,g){e.totalPendingRequests++;F(f)&&a.get(f)||(f=c.getTrustedResourceUrl(f));var h=b.defaults&&b.defaults.transformResponse;E(h)?h=h.filter(function(a){return a!==ac}):h===ac&&(h=null);return b.get(f,{cache:a,transformResponse:h})["finally"](function(){e.totalPendingRequests--}).then(function(b){a.put(f,b.data);return b.data},
function(a){if(!g)throw ga("tpload",f,a.status,a.statusText);return d.reject(a)})}e.totalPendingRequests=0;return e}]}function zf(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");var g=[];n(a,function(a){var c=$.element(a).data("$binding");c&&n(c,function(c){d?(new RegExp("(^|\\s)"+wd(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!=c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-",
"data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(d?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function Af(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,k,l){B(f)||(l=k,k=f,f=z);var m=sa.call(arguments,3),r=u(l)&&!l,t=(r?c:d).defer(),n=t.promise,q;
q=b.defer(function(){try{t.resolve(f.apply(null,m))}catch(b){t.reject(b),e(b)}finally{delete g[n.$$timeoutId]}r||a.$apply()},k);n.$$timeoutId=q;g[q]=t;return n}var g={};f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1};return f}]}function xa(a){Ha&&(ba.setAttribute("href",a),a=ba.href);ba.setAttribute("href",a);return{href:ba.href,protocol:ba.protocol?ba.protocol.replace(/:$/,""):"",host:ba.host,search:ba.search?
ba.search.replace(/^\?/,""):"",hash:ba.hash?ba.hash.replace(/^#/,""):"",hostname:ba.hostname,port:ba.port,pathname:"/"===ba.pathname.charAt(0)?ba.pathname:"/"+ba.pathname}}function gd(a){a=F(a)?xa(a):a;return a.protocol===yd.protocol&&a.host===yd.host}function Bf(){this.$get=na(S)}function zd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}var d=a[0]||{},c={},e="";return function(){var a,g,h,k,l;a=d.cookie||"";if(a!==e)for(e=a,a=e.split("; "),c={},h=0;h<a.length;h++)g=a[h],k=
g.indexOf("="),0<k&&(l=b(g.substring(0,k)),q(c[l])&&(c[l]=b(g.substring(k+1))));return c}}function Ff(){this.$get=zd}function Kc(a){function b(d,c){if(G(d)){var e={};n(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",Ad);b("date",Bd);b("filter",gg);b("json",hg);b("limitTo",ig);b("lowercase",jg);b("number",Cd);b("orderBy",Dd);b("uppercase",kg)}function gg(){return function(a,
b,d){if(!Aa(a)){if(null==a)return a;throw M("filter")("notarray",a);}var c;switch(ic(b)){case "function":break;case "boolean":case "null":case "number":case "string":c=!0;case "object":b=lg(b,d,c);break;default:return a}return Array.prototype.filter.call(a,b)}}function lg(a,b,d){var c=G(a)&&"$"in a;!0===b?b=ka:B(b)||(b=function(a,b){if(q(a))return!1;if(null===a||null===b)return a===b;if(G(b)||G(a)&&!rc(a))return!1;a=K(""+a);b=K(""+b);return-1!==a.indexOf(b)});return function(e){return c&&!G(e)?Ja(e,
a.$,b,!1):Ja(e,a,b,d)}}function Ja(a,b,d,c,e){var f=ic(a),g=ic(b);if("string"===g&&"!"===b.charAt(0))return!Ja(a,b.substring(1),d,c);if(E(a))return a.some(function(a){return Ja(a,b,d,c)});switch(f){case "object":var h;if(c){for(h in a)if("$"!==h.charAt(0)&&Ja(a[h],b,d,!0))return!0;return e?!1:Ja(a,b,d,!1)}if("object"===g){for(h in b)if(e=b[h],!B(e)&&!q(e)&&(f="$"===h,!Ja(f?a:a[h],e,d,f,f)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function ic(a){return null===
a?"null":typeof a}function Ad(a){var b=a.NUMBER_FORMATS;return function(a,c,e){q(c)&&(c=b.CURRENCY_SYM);q(e)&&(e=b.PATTERNS[1].maxFrac);return null==a?a:Ed(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(/\u00A4/g,c)}}function Cd(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Ed(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function mg(a){var b=0,d,c,e,f,g;-1<(c=a.indexOf(Fd))&&(a=a.replace(Fd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=
a.length);for(e=0;a.charAt(e)==jc;e++);if(e==(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)==jc;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Gd&&(d=d.splice(0,Gd-1),b=c-1,c=1);return{d:d,e:b,i:c}}function ng(a,b,d,c){var e=a.d,f=e.length-a.i;b=q(b)?Math.min(Math.max(d,f),c):+b;d=b+a.i;c=e[d];if(0<d)e.splice(d);else{a.i=1;e.length=d=b+1;for(var g=0;g<d;g++)e[g]=0}for(5<=c&&e[d-1]++;f<b;f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),
a.i++}function Ed(a,b,d,c,e){if(!F(a)&&!Q(a)||isNaN(a))return"";var f=!isFinite(a),g=!1,h=Math.abs(a)+"",k="";if(f)k="\u221e";else{g=mg(h);ng(g,e,b.minFrac,b.maxFrac);k=g.d;h=g.i;e=g.e;f=[];for(g=k.reduce(function(a,b){return a&&!b},!0);0>h;)k.unshift(0),h++;0<h?f=k.splice(h):(f=k,k=[0]);h=[];for(k.length>b.lgSize&&h.unshift(k.splice(-b.lgSize).join(""));k.length>b.gSize;)h.unshift(k.splice(-b.gSize).join(""));k.length&&h.unshift(k.join(""));k=h.join(d);f.length&&(k+=c+f.join(""));e&&(k+="e+"+e)}return 0>
a&&!g?b.negPre+k+b.negSuf:b.posPre+k+b.posSuf}function Ib(a,b,d){var c="";0>a&&(c="-",a=-a);for(a=""+a;a.length<b;)a=jc+a;d&&(a=a.substr(a.length-b));return c+a}function ca(a,b,d,c){d=d||0;return function(e){e=e["get"+a]();if(0<d||e>-d)e+=d;0===e&&-12==d&&(e=12);return Ib(e,b,c)}}function Jb(a,b){return function(d,c){var e=d["get"+a](),f=tb(b?"SHORT"+a:a);return c[f][e]}}function Hd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Id(a){return function(b){var d=Hd(b.getFullYear());
b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-+d;b=1+Math.round(b/6048E5);return Ib(b,a)}}function kc(a,b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Bd(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Z(b[9]+b[10]),g=Z(b[9]+b[11]));h.call(a,Z(b[1]),Z(b[2])-1,Z(b[3]));f=Z(b[4]||0)-f;g=Z(b[5]||0)-g;h=Z(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,
h,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,d,f){var g="",h=[],k,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;F(c)&&(c=og.test(c)?Z(c):b(c));Q(c)&&(c=new Date(c));if(!da(c)||!isFinite(c.getTime()))return c;for(;d;)(l=pg.exec(d))?(h=bb(h,l,1),d=h.pop()):(h.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=wc(f,c.getTimezoneOffset()),c=Rb(c,f,!0));n(h,function(b){k=qg[b];g+=k?k(c,a.DATETIME_FORMATS,m):
b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function hg(){return function(a,b){q(b)&&(b=2);return cb(a,b)}}function ig(){return function(a,b,d){b=Infinity===Math.abs(Number(b))?Number(b):Z(b);if(isNaN(b))return a;Q(a)&&(a=a.toString());if(!E(a)&&!F(a))return a;d=!d||isNaN(d)?0:Z(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?a.slice(d,d+b):0===d?a.slice(b,a.length):a.slice(Math.max(0,d+b),d)}}function Dd(a){function b(b,d){d=d?-1:1;return b.map(function(b){var c=1,h=Ya;if(B(b))h=b;else if(F(b)){if("+"==
b.charAt(0)||"-"==b.charAt(0))c="-"==b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(h=a(b),h.constant))var k=h(),h=function(a){return a[k]}}return{get:h,descending:c*d}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}return function(a,e,f){if(!Aa(a))return a;E(e)||(e=[e]);0===e.length&&(e=["+"]);var g=b(e,f);g.push({get:function(){return{}},descending:f?-1:1});a=Array.prototype.map.call(a,function(a,b){return{value:a,predicateValues:g.map(function(c){var e=
c.get(a);c=typeof e;if(null===e)c="string",e="null";else if("string"===c)e=e.toLowerCase();else if("object"===c)a:{if("function"===typeof e.valueOf&&(e=e.valueOf(),d(e)))break a;if(rc(e)&&(e=e.toString(),d(e)))break a;e=b}return{value:e,type:c}})}});a.sort(function(a,b){for(var c=0,d=0,e=g.length;d<e;++d){var c=a.predicateValues[d],f=b.predicateValues[d],n=0;c.type===f.type?c.value!==f.value&&(n=c.value<f.value?-1:1):n=c.type<f.type?-1:1;if(c=n*g[d].descending)break}return c});return a=a.map(function(a){return a.value})}}
function Ka(a){B(a)&&(a={link:a});a.restrict=a.restrict||"AC";return na(a)}function Jd(a,b,d,c,e){var f=this,g=[];f.$error={};f.$$success={};f.$pending=w;f.$name=e(b.name||b.ngForm||"")(d);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;f.$$parentForm=Kb;f.$rollbackViewValue=function(){n(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){n(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ra(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a);a.$$parentForm=
f};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];n(f.$pending,function(b,c){f.$setValidity(c,null,a)});n(f.$error,function(b,c){f.$setValidity(c,null,a)});n(f.$$success,function(b,c){f.$setValidity(c,null,a)});ab(g,a);a.$$parentForm=Kb};Kd({ctrl:this,$element:a,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(ab(d,c),0===d.length&&
delete a[b])},$animate:c});f.$setDirty=function(){c.removeClass(a,Wa);c.addClass(a,Lb);f.$dirty=!0;f.$pristine=!1;f.$$parentForm.$setDirty()};f.$setPristine=function(){c.setClass(a,Wa,Lb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;n(g,function(a){a.$setPristine()})};f.$setUntouched=function(){n(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){c.addClass(a,"ng-submitted");f.$submitted=!0;f.$$parentForm.$setSubmitted()}}function lc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?
b:b.toString()})}function kb(a,b,d,c,e,f){var g=K(b[0].type);if(!e.android){var h=!1;b.on("compositionstart",function(a){h=!0});b.on("compositionend",function(){h=!1;k()})}var k=function(a){l&&(f.defer.cancel(l),l=null);if(!h){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&"false"===d.ngTrim||(e=T(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",k);else{var l,m=function(a,b,c){l||(l=f.defer(function(){l=null;b&&b.value===c||k(a)}))};
b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut",m)}b.on("change",k);c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Mb(a,b){return function(d,c){var e,f;if(da(d))return d;if(F(d)){'"'==d.charAt(0)&&'"'==d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(rg.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),
MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},n(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function lb(a,b,d,c){return function(e,f,g,h,k,l,m){function r(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function n(a){return u(a)&&!da(a)?d(a)||w:a}Ld(e,f,g,h);kb(e,f,g,h,k,l);var C=h&&h.$options&&h.$options.timezone,
y;h.$$parserName=a;h.$parsers.push(function(a){return h.$isEmpty(a)?null:b.test(a)?(a=d(a,y),C&&(a=Rb(a,C)),a):w});h.$formatters.push(function(a){if(a&&!da(a))throw mb("datefmt",a);if(r(a))return(y=a)&&C&&(y=Rb(y,C,!0)),m("date")(a,c,C);y=null;return""});if(u(g.min)||g.ngMin){var s;h.$validators.min=function(a){return!r(a)||q(s)||d(a)>=s};g.$observe("min",function(a){s=n(a);h.$validate()})}if(u(g.max)||g.ngMax){var p;h.$validators.max=function(a){return!r(a)||q(p)||d(a)<=p};g.$observe("max",function(a){p=
n(a);h.$validate()})}}}function Ld(a,b,d,c){(c.$$hasNativeValidators=G(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};return c.badInput&&!c.typeMismatch?w:a})}function Md(a,b,d,c,e){if(u(c)){a=a(c);if(!a.constant)throw mb("constexpr",d,c);return a(b)}return e}function mc(a,b){a="ngClass"+a;return["$animate",function(d){function c(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){var b=[];return E(a)?
(n(a,function(a){b=b.concat(e(a))}),b):F(a)?a.split(" "):G(a)?(n(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||ea(),d=[];n(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(a){if(!0===b||f.$index%2===b){var l=e(a||[]);if(!m){var n=k(l,1);h.$addClass(n)}else if(!ka(a,m)){var q=e(m),n=c(l,q),l=c(q,l),n=k(n,1),l=k(l,-1);n&&n.length&&
d.addClass(g,n);l&&l.length&&d.removeClass(g,l)}}m=ha(a)}var m;f.$watch(h[a],l,!0);h.$observe("class",function(b){l(f.$eval(h[a]))});"ngClass"!==a&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[a]));g===b?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}function Kd(a){function b(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function d(a,c){a=a?"-"+Ac(a,"-"):"";b(nb+a,!0===c);b(Nd+a,!1===c)}var c=a.ctrl,e=a.$element,f={},g=
a.set,h=a.unset,k=a.$animate;f[Nd]=!(f[nb]=e.hasClass(nb));c.$setValidity=function(a,e,f){q(e)?(c.$pending||(c.$pending={}),g(c.$pending,a,f)):(c.$pending&&h(c.$pending,a,f),Od(c.$pending)&&(c.$pending=w));$a(e)?e?(h(c.$error,a,f),g(c.$$success,a,f)):(g(c.$error,a,f),h(c.$$success,a,f)):(h(c.$error,a,f),h(c.$$success,a,f));c.$pending?(b(Pd,!0),c.$valid=c.$invalid=w,d("",null)):(b(Pd,!1),c.$valid=Od(c.$error),c.$invalid=!c.$valid,d("",c.$valid));e=c.$pending&&c.$pending[a]?w:c.$error[a]?!1:c.$$success[a]?
!0:null;d(a,e);c.$$parentForm.$setValidity(a,e,c)}}function Od(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}var sg=/^\/(.+)\/([a-z]*)$/,K=function(a){return F(a)?a.toLowerCase():a},ra=Object.prototype.hasOwnProperty,tb=function(a){return F(a)?a.toUpperCase():a},Ha,A,pa,sa=[].slice,Uf=[].splice,tg=[].push,ta=Object.prototype.toString,sc=Object.getPrototypeOf,Ba=M("ng"),$=S.angular||(S.angular={}),Ub,ob=0;Ha=W.documentMode;z.$inject=[];Ya.$inject=[];var E=Array.isArray,Zd=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
T=function(a){return F(a)?a.trim():a},wd=function(a){return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Ca=function(){if(!u(Ca.rules)){var a=W.querySelector("[ng-csp]")||W.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Ca.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Ca;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Ca.rules},
qb=function(){if(u(qb.name_))return qb.name_;var a,b,d=Oa.length,c,e;for(b=0;b<d;++b)if(c=Oa[b],a=W.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return qb.name_=e},Oa=["ng-","data-ng-","ng:","x-ng-"],fe=/[A-Z]/g,Bc=!1,Tb,Na=3,je={full:"1.4.9",major:1,minor:4,dot:9,codeName:"implicit-superannuation"};P.expando="ng339";var fb=P.cache={},Lf=1;P._data=function(a){return this.cache[a[this.expando]]||{}};var Gf=/([\:\-\_]+(.))/g,Hf=/^moz([A-Z])/,yb={mouseleave:"mouseout",
mouseenter:"mouseover"},Wb=M("jqLite"),Kf=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Vb=/<|&#?\w+;/,If=/<([\w:-]+)/,Jf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,ja={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ja.optgroup=ja.option;ja.tbody=ja.tfoot=ja.colgroup=ja.caption=ja.thead;
ja.th=ja.td;var Qf=Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)},Pa=P.prototype={ready:function(a){function b(){d||(d=!0,a())}var d=!1;"complete"===W.readyState?setTimeout(b):(this.on("DOMContentLoaded",b),P(S).on("load",b))},toString:function(){var a=[];n(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?A(this[a]):A(this[this.length+a])},length:0,push:tg,sort:[].sort,splice:[].splice},Db={};n("multiple selected checked disabled readOnly required open".split(" "),
function(a){Db[K(a)]=a});var Sc={};n("input select option textarea button form details".split(" "),function(a){Sc[a]=!0});var ad={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};n({data:Yb,removeData:wb,hasData:function(a){for(var b in fb[a.ng339])return!0;return!1}},function(a,b){P[b]=a});n({data:Yb,inheritedData:Cb,scope:function(a){return A.data(a,"$scope")||Cb(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){return A.data(a,"$isolateScope")||
A.data(a,"$isolateScopeNoTemplate")},controller:Pc,injector:function(a){return Cb(a,"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:zb,css:function(a,b,d){b=eb(b);if(u(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Na&&2!==c&&8!==c)if(c=K(b),Db[c])if(u(d))d?(a[b]=!0,a.setAttribute(b,c)):(a[b]=!1,a.removeAttribute(c));else return a[b]||(a.attributes.getNamedItem(b)||z).specified?c:w;else if(u(d))a.setAttribute(b,d);else if(a.getAttribute)return a=
a.getAttribute(b,2),null===a?w:a},prop:function(a,b,d){if(u(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(q(d)){var c=a.nodeType;return 1===c||c===Na?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(q(b)){if(a.multiple&&"select"===oa(a)){var d=[];n(a.options,function(a){a.selected&&d.push(a.value||a.text)});return 0===d.length?null:d}return a.value}a.value=b},html:function(a,b){if(q(b))return a.innerHTML;vb(a,!0);a.innerHTML=b},empty:Qc},function(a,b){P.prototype[b]=
function(b,c){var e,f,g=this.length;if(a!==Qc&&q(2==a.length&&a!==zb&&a!==Pc?b:c)){if(G(b)){for(e=0;e<g;e++)if(a===Yb)a(this[e],b);else for(f in b)a(this[e],f,b[f]);return this}e=a.$dv;g=q(e)?Math.min(g,1):g;for(f=0;f<g;f++){var h=a(this[f],b,c);e=e?e+h:h}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});n({removeData:wb,on:function(a,b,d,c){if(u(c))throw Wb("onargs");if(Lc(a)){c=xb(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=Nf(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,
h=function(b,c,g){var h=e[b];h||(h=e[b]=[],h.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f,!1));h.push(d)};g--;)b=c[g],yb[b]?(h(yb[b],Pf),h(b,w,!0)):h(b)}},off:Oc,one:function(a,b,d){a=A(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;vb(a);n(new P(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];n(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||
a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new P(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;n(new P(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){b=A(b).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(b,a);b.appendChild(a)},remove:Zb,detach:function(a){Zb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;b=new P(b);for(var e=0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,
d.nextSibling);d=g}},addClass:Bb,removeClass:Ab,toggleClass:function(a,b,d){b&&n(b.split(" "),function(b){var e=d;q(e)&&(e=!zb(a,b));(e?Bb:Ab)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:Xb,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=xb(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===
this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:z,type:f,target:a},b.type&&(c=N(c,b)),b=ha(g),e=d?[c].concat(d):[c],n(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){P.prototype[b]=function(b,c,e){for(var f,g=0,h=this.length;g<h;g++)q(f)?(f=a(this[g],b,c,e),u(f)&&(f=A(f))):Nc(f,a(this[g],b,c,e));return u(f)?f:this};P.prototype.bind=
P.prototype.on;P.prototype.unbind=P.prototype.off});Sa.prototype={put:function(a,b){this[Da(a,this.nextUid)]=b},get:function(a){return this[Da(a,this.nextUid)]},remove:function(a){var b=this[a=Da(a,this.nextUid)];delete this[a];return b}};var Ef=[function(){this.$get=[function(){return Sa}]}],Uc=/^[^\(]*\(\s*([^\)]*)\)/m,ug=/,/,vg=/^\s*(_?)(\S+?)\1\s*$/,Tc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ea=M("$injector");db.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw F(d)&&
d||(d=a.name||Rf(a)),Ea("strictdi",d);b=a.toString().replace(Tc,"");b=b.match(Uc);n(b[1].split(ug),function(a){a.replace(vg,function(a,b,d){c.push(d)})})}a.$inject=c}}else E(a)?(b=a.length-1,Qa(a[b],"fn"),c=a.slice(0,b)):Qa(a,"fn",!0);return c};var Qd=M("$animate"),Xe=function(){this.$get=function(){}},Ye=function(){var a=new Sa,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=F(b)?b.split(" "):E(b)?b:[],n(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){n(b,
function(b){var c=a.get(b);if(c){var d=Sf(b.attr("class")),e="",f="";n(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});n(b,function(a){e&&Bb(a,e);f&&Ab(a,f)});a.remove(b)}});b.length=0}return{enabled:z,on:z,off:z,pin:z,push:function(g,h,k,l){l&&l();k=k||{};k.from&&g.css(k.from);k.to&&g.css(k.to);if(k.addClass||k.removeClass)if(h=k.addClass,l=k.removeClass,k=a.get(g)||{},h=e(k,h,!0),l=e(k,l,!1),h||l)a.put(g,k),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();
return g}}}]},Ve=["$provide",function(a){var b=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,c){if(d&&"."!==d.charAt(0))throw Qd("notcsel",d);var e=d+"-animation";b.$$registeredAnimations[d.substr(1)]=e;a.factory(e,c)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Qd("nongcls","ng-animate");return this.$$classNameFilter};this.$get=
["$$animateQueue",function(a){function b(a,c,d){if(d){var h;a:{for(h=0;h<d.length;h++){var k=d[h];if(1===k.nodeType){h=k;break a}}h=void 0}!h||h.parentNode||h.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(e,f,g,h){f=f&&A(f);g=g&&A(g);f=f||g.parent();b(e,f,g);return a.push(e,"enter",Fa(h))},move:function(e,f,g,h){f=f&&A(f);g=g&&A(g);f=f||g.parent();b(e,f,g);return a.push(e,"move",Fa(h))},
leave:function(b,c){return a.push(b,"leave",Fa(c),function(){b.remove()})},addClass:function(b,c,g){g=Fa(g);g.addClass=gb(g.addclass,c);return a.push(b,"addClass",g)},removeClass:function(b,c,g){g=Fa(g);g.removeClass=gb(g.removeClass,c);return a.push(b,"removeClass",g)},setClass:function(b,c,g,h){h=Fa(h);h.addClass=gb(h.addClass,c);h.removeClass=gb(h.removeClass,g);return a.push(b,"setClass",h)},animate:function(b,c,g,h,k){k=Fa(k);k.from=k.from?N(k.from,c):c;k.to=k.to?N(k.to,g):g;k.tempClasses=gb(k.tempClasses,
h||"ng-inline-animate");return a.push(b,"animate",k)}}}]}],$e=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();d=[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},Ze=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$document","$timeout",function(a,b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=[];this._tick=function(a){var d=c[0];d&&d.hidden?e(a,
0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=function(a,b){function c(f){e=e&&f;++d===a.length&&b(e)}var d=0,e=!0;n(a,function(a){a.done(c)})};f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:z,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},
then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},
_resolve:function(a){2!==this._state&&(n(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},We=function(){this.$get=["$$rAF","$q","$$AnimateRunner",function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);h||k.complete();h=!0});return k}var g=e||{};g.$$prepared||(g=Ma(g));g.cleanupStyles&&(g.from=g.to=
null);g.from&&(b.css(g.from),g.from=null);var h,k=new d;return{start:f,end:f}}}]},ga=M("$compile");Dc.$inject=["$provide","$$sanitizeUriProvider"];var Yc=/^((?:x|data)[\:\-_])/i,Vf=M("$controller"),Vc=/^(\S+)(\s+as\s+([\w$]+))?$/,ff=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof A&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},bd="application/json",bc={"Content-Type":bd+";charset=utf-8"},Xf=/^\[|^\{(?!\{)/,Yf={"[":/]$/,"{":/}$/},Wf=/^\)\]\}',?\n/,wg=
M("$http"),fd=function(a){return function(){throw wg("legacy",a);}},Ia=$.$interpolateMinErr=M("$interpolate");Ia.throwNoconcat=function(a){throw Ia("noconcat",a);};Ia.interr=function(a,b){return Ia("interr",a,b.toString())};var xg=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,$f={http:80,https:443,ftp:21},Fb=M("$location"),yg={$$html5:!1,$$replace:!1,absUrl:Gb("$$absUrl"),url:function(a){if(q(a))return this.$$url;var b=xg.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||
"");this.hash(b[5]||"");return this},protocol:Gb("$$protocol"),host:Gb("$$host"),port:Gb("$$port"),path:kd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(F(a)||Q(a))a=a.toString(),this.$$search=yc(a);else if(G(a))a=Ma(a,{}),n(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw Fb("isrcharg");break;default:q(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();
return this},hash:kd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};n([jd,ec,dc],function(a){a.prototype=Object.create(yg);a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==dc||!this.$$html5)throw Fb("nostate");this.$$state=q(b)?null:b;return this}});var aa=M("$parse"),ag=Function.prototype.call,bg=Function.prototype.apply,cg=Function.prototype.bind,Nb=ea();n("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),
function(a){Nb[a]=!0});var zg={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;
else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Nb[b],e=Nb[d];Nb[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===
a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=u(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw aa("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=K(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var c=
this.peek();if("e"==d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var b=this.text.charAt(this.index);if(!this.isIdent(b)&&!this.isNumber(b))break;this.index++}this.tokens.push({index:a,
text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):d+=zg[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,
value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var s=function(a,b){this.lexer=a;this.options=b};s.Program="Program";s.ExpressionStatement="ExpressionStatement";s.AssignmentExpression="AssignmentExpression";s.ConditionalExpression="ConditionalExpression";s.LogicalExpression="LogicalExpression";s.BinaryExpression="BinaryExpression";s.UnaryExpression="UnaryExpression";s.CallExpression="CallExpression";s.MemberExpression="MemberExpression";s.Identifier="Identifier";s.Literal=
"Literal";s.ArrayExpression="ArrayExpression";s.Property="Property";s.ObjectExpression="ObjectExpression";s.ThisExpression="ThisExpression";s.NGValueParameter="NGValueParameter";s.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:s.Program,
body:a}},expressionStatement:function(){return{type:s.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();this.expect("=")&&(a={type:s.AssignmentExpression,left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?
(d=this.expression(),{type:s.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:s.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:s.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:s.BinaryExpression,
operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:s.BinaryExpression,operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:s.BinaryExpression,operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:s.BinaryExpression,operator:b.text,
left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:s.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.constants.hasOwnProperty(this.peek().text)?a=Ma(this.constants[this.consume().text]):this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():
this.throwError("not a primary expression",this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:s.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:s.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:s.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:s.CallExpression,callee:this.identifier(),
arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.expression());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:s.Identifier,name:a.text}},constant:function(){return{type:s.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:s.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:s.Property,kind:"init"};this.peek().constant?b.key=this.constant():this.peek().identifier?b.key=this.identifier():this.throwError("invalid key",this.peek());this.consume(":");b.value=this.expression();a.push(b)}while(this.expect(","))}this.consume("}");return{type:s.ObjectExpression,properties:a}},
throwError:function(a,b){throw aa("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw aa("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw aa("ueoe",this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,e){if(this.tokens.length>a){a=this.tokens[a];
var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},constants:{"true":{type:s.Literal,value:!0},"false":{type:s.Literal,value:!1},"null":{type:s.Literal,value:null},undefined:{type:s.Literal,value:w},"this":{type:s.ThisExpression}}};td.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:b,fn:{vars:[],body:[],own:{}},assign:{vars:[],
body:[],own:{}},inputs:[]};V(c,d.$filter);var e="",f;this.stage="assign";if(f=rd(c))this.state.computing="assign",e=this.nextId(),this.recurse(f,e),this.return_(e),e="fn.assign="+this.generateFunction("assign","s,v,l");f=pd(c.body);d.stage="inputs";n(f,function(a,b){var c="fn"+b;d.state[c]={vars:[],body:[],own:{}};d.state.computing=c;var e=d.nextId();d.recurse(a,e);d.return_(e);d.state.inputs.push(c);a.watchId=b});this.state.computing="fn";this.stage="main";this.recurse(c);e='"'+this.USE+" "+this.STRICT+
'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+e+this.watchFns()+"return fn;";e=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","getStringValue","ensureSafeAssignContext","ifDefined","plus","text",e))(this.$filter,Va,ya,md,ld,nd,dg,od,a);this.state=this.stage=w;e.literal=sd(c);e.constant=c.constant;return e},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;n(b,function(b){a.push("var "+b+"="+d.generateFunction(b,
"s"))});b.length&&a.push("fn.inputs=["+b.join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;n(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,
d,c,e,f){var g,h,k=this,l,m;c=c||z;if(!f&&u(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case s.Program:n(a.body,function(b,c){k.recurse(b.expression,w,w,function(a){h=a});c!==a.body.length-1?k.current().body.push(h,";"):k.return_(h)});break;case s.Literal:m=this.escape(a.value);this.assign(b,m);c(m);break;case s.UnaryExpression:this.recurse(a.argument,w,w,function(a){h=a});m=a.operator+"("+this.ifDefined(h,
0)+")";this.assign(b,m);c(m);break;case s.BinaryExpression:this.recurse(a.left,w,w,function(a){g=a});this.recurse(a.right,w,w,function(a){h=a});m="+"===a.operator?this.plus(g,h):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(h,0):"("+g+")"+a.operator+"("+h+")";this.assign(b,m);c(m);break;case s.LogicalExpression:b=b||this.nextId();k.recurse(a.left,b);k.if_("&&"===a.operator?b:k.not(b),k.lazyRecurse(a.right,b));c(b);break;case s.ConditionalExpression:b=b||this.nextId();k.recurse(a.test,
b);k.if_(b,k.lazyRecurse(a.alternate,b),k.lazyRecurse(a.consequent,b));c(b);break;case s.Identifier:b=b||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Va(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||"s",function(){e&&1!==e&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(b,k.nonComputedMember("s",
a.name))})},b&&k.lazyAssign(b,k.nonComputedMember("l",a.name)));(k.state.expensiveChecks||Hb(a.name))&&k.addEnsureSafeObject(b);c(b);break;case s.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();k.recurse(a.object,g,w,function(){k.if_(k.notNull(g),function(){if(a.computed)h=k.nextId(),k.recurse(a.property,h),k.getStringValue(h),k.addEnsureSafeMemberName(h),e&&1!==e&&k.if_(k.not(k.computedMember(g,h)),k.lazyAssign(k.computedMember(g,h),"{}")),m=k.ensureSafeObject(k.computedMember(g,
h)),k.assign(b,m),d&&(d.computed=!0,d.name=h);else{Va(a.property.name);e&&1!==e&&k.if_(k.not(k.nonComputedMember(g,a.property.name)),k.lazyAssign(k.nonComputedMember(g,a.property.name),"{}"));m=k.nonComputedMember(g,a.property.name);if(k.state.expensiveChecks||Hb(a.property.name))m=k.ensureSafeObject(m);k.assign(b,m);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(b,"undefined")});c(b)},!!e);break;case s.CallExpression:b=b||this.nextId();a.filter?(h=k.filter(a.callee.name),l=[],n(a.arguments,
function(a){var b=k.nextId();k.recurse(a,b);l.push(b)}),m=h+"("+l.join(",")+")",k.assign(b,m),c(b)):(h=k.nextId(),g={},l=[],k.recurse(a.callee,h,g,function(){k.if_(k.notNull(h),function(){k.addEnsureSafeFunction(h);n(a.arguments,function(a){k.recurse(a,k.nextId(),w,function(a){l.push(k.ensureSafeObject(a))})});g.name?(k.state.expensiveChecks||k.addEnsureSafeObject(g.context),m=k.member(g.context,g.name,g.computed)+"("+l.join(",")+")"):m=h+"("+l.join(",")+")";m=k.ensureSafeObject(m);k.assign(b,m)},
function(){k.assign(b,"undefined")});c(b)}));break;case s.AssignmentExpression:h=this.nextId();g={};if(!qd(a.left))throw aa("lval");this.recurse(a.left,w,g,function(){k.if_(k.notNull(g.context),function(){k.recurse(a.right,h);k.addEnsureSafeObject(k.member(g.context,g.name,g.computed));k.addEnsureSafeAssignContext(g.context);m=k.member(g.context,g.name,g.computed)+a.operator+h;k.assign(b,m);c(b||m)})},1);break;case s.ArrayExpression:l=[];n(a.elements,function(a){k.recurse(a,k.nextId(),w,function(a){l.push(a)})});
m="["+l.join(",")+"]";this.assign(b,m);c(m);break;case s.ObjectExpression:l=[];n(a.properties,function(a){k.recurse(a.value,k.nextId(),w,function(b){l.push(k.escape(a.key.type===s.Identifier?a.key.name:""+a.key.value)+":"+b)})});m="{"+l.join(",")+"}";this.assign(b,m);c(m);break;case s.ThisExpression:this.assign(b,"s");c("s");break;case s.NGValueParameter:this.assign(b,"v"),c("v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+
this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,
"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){return a+"."+b},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},
addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},addEnsureSafeAssignContext:function(a){this.current().body.push(this.ensureSafeAssignContext(a),";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},getStringValue:function(a){this.assign(a,"getStringValue("+a+",text)")},ensureSafeAssignContext:function(a){return"ensureSafeAssignContext("+
a+",text)"},lazyRecurse:function(a,b,d,c,e,f){var g=this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(F(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(Q(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===
typeof a)return"undefined";throw aa("esc");},nextId:function(a,b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};ud.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=b;V(c,d.$filter);var e,f;if(e=rd(c))f=this.recurse(e);e=pd(c.body);var g;e&&(g=[],n(e,function(a,b){var c=d.recurse(a);a.input=c;g.push(c);a.watchId=b}));var h=[];n(c.body,function(a){h.push(d.recurse(a.expression))});
e=0===c.body.length?function(){}:1===c.body.length?h[0]:function(a,b){var c;n(h,function(d){c=d(a,b)});return c};f&&(e.assign=function(a,b,c){return f(a,c,b)});g&&(e.inputs=g);e.literal=sd(c);e.constant=c.constant;return e},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case s.Literal:return this.value(a.value,b);case s.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case s.BinaryExpression:return c=this.recurse(a.left),
e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case s.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case s.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case s.Identifier:return Va(a.name,f.expression),f.identifier(a.name,f.expensiveChecks||Hb(a.name),b,d,f.expression);case s.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(Va(a.property.name,
f.expression),e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d,f.expression):this.nonComputedMember(c,e,f.expensiveChecks,b,d,f.expression);case s.CallExpression:return g=[],n(a.arguments,function(a){g.push(f.recurse(a))}),a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var r=[],n=0;n<g.length;++n)r.push(g[n](a,c,d,f));a=e.apply(w,r,f);return b?{context:w,name:w,value:a}:a}:function(a,
c,d,m){var n=e(a,c,d,m),t;if(null!=n.value){ya(n.context,f.expression);md(n.value,f.expression);t=[];for(var q=0;q<g.length;++q)t.push(ya(g[q](a,c,d,m),f.expression));t=ya(n.value.apply(n.context,t),f.expression)}return b?{value:t}:t};case s.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,g,m){var n=c(a,d,g,m);a=e(a,d,g,m);ya(n.value,f.expression);nd(n.context);n.context[n.name]=a;return b?{value:a}:a};case s.ArrayExpression:return g=[],n(a.elements,function(a){g.push(f.recurse(a))}),
function(a,c,d,e){for(var f=[],n=0;n<g.length;++n)f.push(g[n](a,c,d,e));return b?{value:f}:f};case s.ObjectExpression:return g=[],n(a.properties,function(a){g.push({key:a.key.type===s.Identifier?a.key.name:""+a.key.value,value:f.recurse(a.value)})}),function(a,c,d,e){for(var f={},n=0;n<g.length;++n)f[g[n].key]=g[n].value(a,c,d,e);return b?{value:f}:f};case s.ThisExpression:return function(a){return b?{value:a}:a};case s.NGValueParameter:return function(a,c,d,e){return b?{value:d}:d}}},"unary+":function(a,
b){return function(d,c,e,f){d=a(d,c,e,f);d=u(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=u(d)?-d:0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=od(h,c);return d?{value:h}:h}},"binary-":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=(u(h)?h:0)-(u(c)?c:0);return d?{value:h}:h}},"binary*":function(a,
b,d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,
d){return function(c,e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,h){e=a(e,f,g,h)?b(e,f,g,h):d(e,f,g,h);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:w,name:w,value:a}:a}},identifier:function(a,b,d,c,e){return function(f,g,h,k){f=
g&&a in g?g:f;c&&1!==c&&f&&!f[a]&&(f[a]={});g=f?f[a]:w;b&&ya(g,e);return d?{context:f,name:a,value:g}:g}},computedMember:function(a,b,d,c,e){return function(f,g,h,k){var l=a(f,g,h,k),m,n;null!=l&&(m=b(f,g,h,k),m=ld(m),Va(m,e),c&&1!==c&&l&&!l[m]&&(l[m]={}),n=l[m],ya(n,e));return d?{context:l,name:m,value:n}:n}},nonComputedMember:function(a,b,d,c,e,f){return function(g,h,k,l){g=a(g,h,k,l);e&&1!==e&&g&&!g[b]&&(g[b]={});h=null!=g?g[b]:w;(d||Hb(b))&&ya(h,f);return c?{context:g,name:b,value:h}:h}},inputs:function(a,
b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};var hc=function(a,b,d){this.lexer=a;this.$filter=b;this.options=d;this.ast=new s(this.lexer);this.astCompiler=d.csp?new ud(this.ast,b):new td(this.ast,b)};hc.prototype={constructor:hc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};var eg=Object.prototype.valueOf,za=M("$sce"),ma={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ga=M("$compile"),ba=W.createElement("a"),yd=xa(S.location.href);
zd.$inject=["$document"];Kc.$inject=["$provide"];var Gd=22,Fd=".",jc="0";Ad.$inject=["$locale"];Cd.$inject=["$locale"];var qg={yyyy:ca("FullYear",4),yy:ca("FullYear",2,0,!0),y:ca("FullYear",1),MMMM:Jb("Month"),MMM:Jb("Month",!0),MM:ca("Month",2,1),M:ca("Month",1,1),dd:ca("Date",2),d:ca("Date",1),HH:ca("Hours",2),H:ca("Hours",1),hh:ca("Hours",2,-12),h:ca("Hours",1,-12),mm:ca("Minutes",2),m:ca("Minutes",1),ss:ca("Seconds",2),s:ca("Seconds",1),sss:ca("Milliseconds",3),EEEE:Jb("Day"),EEE:Jb("Day",!0),
a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Ib(Math[0<a?"floor":"ceil"](a/60),2)+Ib(Math.abs(a%60),2))},ww:Id(2),w:Id(1),G:kc,GG:kc,GGG:kc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},pg=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,og=/^\-?\d+$/;Bd.$inject=["$locale"];var jg=na(K),kg=na(tb);Dd.$inject=["$parse"];var le=na({restrict:"E",compile:function(a,b){if(!b.href&&
!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===ta.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),ub={};n(Db,function(a,b){function d(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}if("multiple"!=a){var c=va("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==e[c]&&d(a,b,e)});ub[c]=function(){return{restrict:"A",priority:100,link:e}}}});n(ad,function(a,b){ub[b]=function(){return{priority:100,
link:function(a,c,e){if("ngPattern"===b&&"/"==e.ngPattern.charAt(0)&&(c=e.ngPattern.match(sg))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});n(["src","srcset","href"],function(a){var b=va("ng-"+a);ub[b]=function(){return{priority:99,link:function(d,c,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===ta.call(c.prop("href"))&&(g="xlinkHref",e.$attr[g]="xlink:href",f=null);e.$observe(b,function(b){b?(e.$set(g,b),Ha&&f&&c.prop(f,e[g])):"href"===
a&&e.$set(g,null)})}}}});var Kb={$addControl:z,$$renameControl:function(a,b){a.$name=b},$removeControl:z,$setValidity:z,$setDirty:z,$setPristine:z,$setSubmitted:z};Jd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Rd=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||z}return{name:"form",restrict:a?"EAC":"E",require:["form","^^?form"],controller:Jd,compile:function(d,f){d.addClass(Wa).addClass(nb);var g=f.name?"name":
a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var n=f[0];if(!("action"in e)){var t=function(b){a.$apply(function(){n.$commitViewValue();n.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",t,!1);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",t,!1)},0,!1)})}(f[1]||n.$$parentForm).$addControl(n);var q=g?c(n.$name):z;g&&(q(a,n),e.$observe(g,function(b){n.$name!==b&&(q(a,w),n.$$parentForm.$$renameControl(n,b),q=c(n.$name),q(a,n))}));d.on("$destroy",
function(){n.$$parentForm.$removeControl(n);q(a,w);N(n,Kb)})}}}}}]},me=Rd(),ze=Rd(!0),rg=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Ag=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,Bg=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Cg=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Sd=/^(\d{4})-(\d{2})-(\d{2})$/,Td=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
nc=/^(\d{4})-W(\d\d)$/,Ud=/^(\d{4})-(\d\d)$/,Vd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Wd={text:function(a,b,d,c,e,f){kb(a,b,d,c,e,f);lc(c)},date:lb("date",Sd,Mb(Sd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":lb("datetimelocal",Td,Mb(Td,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:lb("time",Vd,Mb(Vd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:lb("week",nc,function(a,b){if(da(a))return a;if(F(a)){nc.lastIndex=0;var d=nc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=
0,h=0,k=Hd(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),h=b.getMilliseconds());return new Date(c,0,k.getDate()+e,d,f,g,h)}}return NaN},"yyyy-Www"),month:lb("month",Ud,Mb(Ud,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f){Ld(a,b,d,c);kb(a,b,d,c,e,f);c.$$parserName="number";c.$parsers.push(function(a){return c.$isEmpty(a)?null:Cg.test(a)?parseFloat(a):w});c.$formatters.push(function(a){if(!c.$isEmpty(a)){if(!Q(a))throw mb("numfmt",a);a=a.toString()}return a});if(u(d.min)||
d.ngMin){var g;c.$validators.min=function(a){return c.$isEmpty(a)||q(g)||a>=g};d.$observe("min",function(a){u(a)&&!Q(a)&&(a=parseFloat(a,10));g=Q(a)&&!isNaN(a)?a:w;c.$validate()})}if(u(d.max)||d.ngMax){var h;c.$validators.max=function(a){return c.$isEmpty(a)||q(h)||a<=h};d.$observe("max",function(a){u(a)&&!Q(a)&&(a=parseFloat(a,10));h=Q(a)&&!isNaN(a)?a:w;c.$validate()})}},url:function(a,b,d,c,e,f){kb(a,b,d,c,e,f);lc(c);c.$$parserName="url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||
Ag.test(d)}},email:function(a,b,d,c,e,f){kb(a,b,d,c,e,f);lc(c);c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||Bg.test(d)}},radio:function(a,b,d,c){q(d.name)&&b.attr("name",++ob);b.on("click",function(a){b[0].checked&&c.$setViewValue(d.value,a&&a.type)});c.$render=function(){b[0].checked=d.value==c.$viewValue};d.$observe("value",c.$render)},checkbox:function(a,b,d,c,e,f,g,h){var k=Md(h,a,"ngTrueValue",d.ngTrueValue,!0),l=Md(h,a,"ngFalseValue",d.ngFalseValue,
!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return ka(a,k)});c.$parsers.push(function(a){return a?k:l})},hidden:z,button:z,submit:z,reset:z,file:z},Ec=["$browser","$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,h){h[0]&&(Wd[K(g.type)]||Wd.text)(e,f,g,h[0],b,a,d,c)}}}}],Dg=/^(true|false|\d+)$/,
Re=function(){return{restrict:"A",priority:100,compile:function(a,b){return Dg.test(b.ngValue)?function(a,b,e){e.$set("value",a.$eval(e.ngValue))}:function(a,b,e){a.$watch(e.ngValue,function(a){e.$set("value",a)})}}}},re=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=q(a)?"":a})}}}}],te=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);
return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=q(a)?"":a})}}}}],se=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){c.html(a.getTrustedHtml(f(b))||"")})}}}}],Qe=na({restrict:"A",
require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),ue=mc("",!0),we=mc("Odd",0),ve=mc("Even",1),xe=Ka({compile:function(a,b){b.$set("ngCloak",w);a.removeClass("ng-cloak")}}),ye=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Jc={},Eg={blur:!0,focus:!0};n("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=
va("ng-"+a);Jc[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(e,f){var g=d(f[b],null,!0);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};Eg[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var Be=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(b,d,c,e,f){var g,h,k;b.$watch(c.ngIf,function(b){b?h||f(function(b,e){h=e;b[b.length++]=W.createComment(" end ngIf: "+
c.ngIf+" ");g={clone:b};a.enter(b,d.parent(),d)}):(k&&(k.remove(),k=null),h&&(h.$destroy(),h=null),g&&(k=sb(g.clone),a.leave(k).then(function(){k=null}),g=null))})}}}],Ce=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:$.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",h=e.autoscroll;return function(c,e,m,n,q){var s=0,y,w,p,x=function(){w&&(w.remove(),w=null);y&&(y.$destroy(),y=null);p&&
(d.leave(p).then(function(){w=null}),w=p,p=null)};c.$watch(f,function(f){var m=function(){!u(h)||h&&!c.$eval(h)||b()},H=++s;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&H===s){var b=c.$new();n.template=a;a=q(b,function(a){x();d.enter(a,null,e).then(m)});y=b;p=a;y.$emit("$includeContentLoaded",f);c.$eval(g)}},function(){c.$$destroyed||H!==s||(x(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(x(),n.template=null)})}}}}],Te=["$compile",function(a){return{restrict:"ECA",
priority:-400,require:"ngInclude",link:function(b,d,c,e){/SVG/.test(d[0].toString())?(d.empty(),a(Mc(e.template,W).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],De=Ka({priority:450,compile:function(){return{pre:function(a,b,d){a.$eval(d.ngInit)}}}}),Pe=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=b.attr(d.$attr.ngList)||", ",f="false"!==d.ngTrim,g=f?T(e):e;c.$parsers.push(function(a){if(!q(a)){var b=
[];a&&n(a.split(g),function(a){a&&b.push(f?T(a):a)});return b}});c.$formatters.push(function(a){return E(a)?a.join(e):w});c.$isEmpty=function(a){return!a||!a.length}}}},nb="ng-valid",Nd="ng-invalid",Wa="ng-pristine",Lb="ng-dirty",Pd="ng-pending",mb=M("ngModel"),Fg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,b,d,c,e,f,g,h,k,l){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=w;this.$validators={};this.$asyncValidators=
{};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=w;this.$name=l(d.name||"",!1)(a);this.$$parentForm=Kb;var m=e(d.ngModel),r=m.assign,t=m,s=r,y=null,A,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var b=e(d.ngModel+"()"),f=e(d.ngModel+"($$$p)");t=function(a){var c=m(a);B(c)&&(c=b(a));return c};s=function(a,
b){B(m(a))?f(a,{$$$p:p.$modelValue}):r(a,p.$modelValue)}}else if(!m.assign)throw mb("nonassign",d.ngModel,ua(c));};this.$render=z;this.$isEmpty=function(a){return q(a)||""===a||null===a||a!==a};var x=0;Kd({ctrl:this,$element:c,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]},$animate:f});this.$setPristine=function(){p.$dirty=!1;p.$pristine=!0;f.removeClass(c,Lb);f.addClass(c,Wa)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;f.removeClass(c,Wa);f.addClass(c,Lb);p.$$parentForm.$setDirty()};
this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;f.setClass(c,"ng-untouched","ng-touched")};this.$setTouched=function(){p.$touched=!0;p.$untouched=!1;f.setClass(c,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){g.cancel(y);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!Q(p.$modelValue)||!isNaN(p.$modelValue)){var a=p.$$rawModelValue,b=p.$valid,c=p.$modelValue,d=p.$options&&p.$options.allowInvalid;p.$$runValidators(a,p.$$lastCommittedViewValue,
function(e){d||b===e||(p.$modelValue=e?a:w,p.$modelValue!==c&&p.$$writeModelToScope())})}};this.$$runValidators=function(a,b,c){function d(){var c=!0;n(p.$validators,function(d,e){var g=d(a,b);c=c&&g;f(e,g)});return c?!0:(n(p.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;n(p.$asyncValidators,function(e,g){var h=e(a,b);if(!h||!B(h.then))throw mb("nopromise",h);f(g,w);c.push(h.then(function(){f(g,!0)},function(a){d=!1;f(g,!1)}))});c.length?k.all(c).then(function(){g(d)},
z):g(!0)}function f(a,b){h===x&&p.$setValidity(a,b)}function g(a){h===x&&c(a)}x++;var h=x;(function(){var a=p.$$parserName||"parse";if(q(A))f(a,null);else return A||(n(p.$validators,function(a,b){f(b,null)}),n(p.$asyncValidators,function(a,b){f(b,null)})),f(a,A),A;return!0})()?d()?e():g(!1):g(!1)};this.$commitViewValue=function(){var a=p.$viewValue;g.cancel(y);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};
this.$$parseAndValidate=function(){var b=p.$$lastCommittedViewValue;if(A=q(b)?w:!0)for(var c=0;c<p.$parsers.length;c++)if(b=p.$parsers[c](b),q(b)){A=!1;break}Q(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=t(a));var d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=b;e&&(p.$modelValue=b,p.$modelValue!==d&&p.$$writeModelToScope());p.$$runValidators(b,p.$$lastCommittedViewValue,function(a){e||(p.$modelValue=a?b:w,p.$modelValue!==d&&p.$$writeModelToScope())})};this.$$writeModelToScope=
function(){s(a,p.$modelValue);n(p.$viewChangeListeners,function(a){try{a()}catch(c){b(c)}})};this.$setViewValue=function(a,b){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(b)};this.$$debounceViewValueCommit=function(b){var c=0,d=p.$options;d&&u(d.debounce)&&(d=d.debounce,Q(d)?c=d:Q(d[b])?c=d[b]:Q(d["default"])&&(c=d["default"]));g.cancel(y);c?y=g(function(){p.$commitViewValue()},c):h.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var b=
t(a);if(b!==p.$modelValue&&(p.$modelValue===p.$modelValue||b===b)){p.$modelValue=p.$$rawModelValue=b;A=w;for(var c=p.$formatters,d=c.length,e=b;d--;)e=c[d](e);p.$viewValue!==e&&(p.$viewValue=p.$$lastCommittedViewValue=e,p.$render(),p.$$runValidators(b,e,z))}return b})}],Oe=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Fg,priority:1,compile:function(b){b.addClass(Wa).addClass("ng-untouched").addClass(nb);return{pre:function(a,b,e,f){var g=
f[0];b=f[1]||g.$$parentForm;g.$$setOptions(f[2]&&f[2].$options);b.$addControl(g);e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){var g=f[0];if(g.$options&&g.$options.updateOn)c.on(g.$options.updateOn,function(a){g.$$debounceViewValueCommit(a&&a.type)});c.on("blur",function(c){g.$touched||(a.$$phase?b.$evalAsync(g.$setTouched):b.$apply(g.$setTouched))})}}}}}],Gg=/(\s+|^)default(\s+|$)/,
Se=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,b){var d=this;this.$options=Ma(a.$eval(b.ngModelOptions));u(this.$options.updateOn)?(this.$options.updateOnDefault=!1,this.$options.updateOn=T(this.$options.updateOn.replace(Gg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Ee=Ka({terminal:!0,priority:1E3}),Hg=M("ngOptions"),Ig=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
Me=["$compile","$parse",function(a,b){function d(a,c,d){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function l(a){var b;if(!q&&Aa(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var m=a.match(Ig);if(!m)throw Hg("iexp",a,ua(c));var n=m[5]||m[7],q=m[6];a=/ as /.test(m[0])&&m[1];var s=m[9];c=b(m[2]?m[1]:n);var y=a&&b(a)||c,u=s&&b(s),p=s?function(a,b){return u(d,b)}:function(a){return Da(a)},x=function(a,
b){return p(a,D(a,b))},v=b(m[2]||m[1]),w=b(m[3]||""),H=b(m[4]||""),A=b(m[8]),z={},D=q?function(a,b){z[q]=b;z[n]=a;return z}:function(a){z[n]=a;return z};return{trackBy:s,getTrackByValue:x,getWatchables:b(A,function(a){var b=[];a=a||[];for(var c=l(a),e=c.length,f=0;f<e;f++){var g=a===c?f:c[f],k=D(a[g],g),g=p(a[g],k);b.push(g);if(m[2]||m[1])g=v(d,k),b.push(g);m[4]&&(k=H(d,k),b.push(k))}return b}),getOptions:function(){for(var a=[],b={},c=A(d)||[],f=l(c),g=f.length,m=0;m<g;m++){var n=c===f?m:f[m],r=
D(c[n],n),q=y(d,r),n=p(q,r),t=v(d,r),u=w(d,r),r=H(d,r),q=new e(n,q,t,u,r);a.push(q);b[n]=q}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[x(a)]},getViewValueFromOption:function(a){return s?$.copy(a.viewValue):a.viewValue}}}}}var c=W.createElement("option"),e=W.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","?ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=z},post:function(b,g,h,k){function l(a,b){a.element=b;b.disabled=a.disabled;
a.label!==b.label&&(b.label=a.label,b.textContent=a.label);a.value!==b.value&&(b.value=a.selectValue)}function m(a,b,c,d){b&&K(b.nodeName)===c?c=b:(c=d.cloneNode(!1),b?a.insertBefore(c,b):a.appendChild(c));return c}function r(a){for(var b;a;)b=a.nextSibling,Zb(a),a=b}function q(a){var b=x&&x[0],c=z&&z[0];if(b||c)for(;a&&(a===b||a===c||8===a.nodeType||"option"===oa(a)&&""===a.value);)a=a.nextSibling;return a}function s(){var a=B&&u.readValue();B=D.getOptions();var b={},d=g[0].firstChild;H&&g.prepend(x);
d=q(d);B.items.forEach(function(a){var f,h;a.group?(f=b[a.group],f||(f=m(g[0],d,"optgroup",e),d=f.nextSibling,f.label=a.group,f=b[a.group]={groupElement:f,currentOptionElement:f.firstChild}),h=m(f.groupElement,f.currentOptionElement,"option",c),l(a,h),f.currentOptionElement=h.nextSibling):(h=m(g[0],d,"option",c),l(a,h),d=h.nextSibling)});Object.keys(b).forEach(function(a){r(b[a].currentOptionElement)});r(d);y.$render();if(!y.$isEmpty(a)){var f=u.readValue();(D.trackBy||p?ka(a,f):a===f)||(y.$setViewValue(f),
y.$render())}}var y=k[1];if(y){var u=k[0],p=h.multiple,x;k=0;for(var v=g.children(),w=v.length;k<w;k++)if(""===v[k].value){x=v.eq(k);break}var H=!!x,z=A(c.cloneNode(!1));z.val("?");var B,D=d(h.ngOptions,g,b);p?(y.$isEmpty=function(a){return!a||0===a.length},u.writeValue=function(a){B.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){(a=B.getOptionFromViewValue(a))&&!a.disabled&&(a.element.selected=!0)})},u.readValue=function(){var a=g.val()||[],b=[];n(a,function(a){(a=B.selectValueMap[a])&&
!a.disabled&&b.push(B.getViewValueFromOption(a))});return b},D.trackBy&&b.$watchCollection(function(){if(E(y.$viewValue))return y.$viewValue.map(function(a){return D.getTrackByValue(a)})},function(){y.$render()})):(u.writeValue=function(a){var b=B.getOptionFromViewValue(a);b&&!b.disabled?g[0].value!==b.selectValue&&(z.remove(),H||x.remove(),g[0].value=b.selectValue,b.element.selected=!0,b.element.setAttribute("selected","selected")):null===a||H?(z.remove(),H||g.prepend(x),g.val(""),x.prop("selected",
!0),x.attr("selected",!0)):(H||x.remove(),g.prepend(z),g.val("?"),z.prop("selected",!0),z.attr("selected",!0))},u.readValue=function(){var a=B.selectValueMap[g.val()];return a&&!a.disabled?(H||x.remove(),z.remove(),B.getViewValueFromOption(a)):null},D.trackBy&&b.$watch(function(){return D.getTrackByValue(y.$viewValue)},function(){y.$render()}));H?(x.remove(),a(x)(b),x.removeClass("ng-scope")):x=A(c.cloneNode(!1));s();b.$watchCollection(D.getWatchables,s)}}}}}],Fe=["$locale","$interpolate","$log",
function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,h){function k(a){g.text(a||"")}var l=h.count,m=h.$attr.when&&g.attr(h.$attr.when),r=h.offset||0,t=f.$eval(m)||{},s={},u=b.startSymbol(),w=b.endSymbol(),p=u+l+"-"+r+w,x=$.noop,v;n(h,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+K(c[2]),t[c]=g.attr(h.$attr[b]))});n(t,function(a,d){s[d]=b(a.replace(c,p))});f.$watch(l,function(b){var c=parseFloat(b),e=isNaN(c);e||c in t||(c=a.pluralCat(c-r));c===v||e&&Q(v)&&isNaN(v)||(x(),
e=s[c],q(e)?(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),x=z,k()):x=f.$watch(e,k),v=c)})}}}],Ge=["$parse","$animate",function(a,b){var d=M("ngRepeat"),c=function(a,b,c,d,k,l,m){a[c]=d;k&&(a[k]=l);a.$index=b;a.$first=0===b;a.$last=b===m-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(e,f){var g=f.ngRepeat,h=W.createComment(" end ngRepeat: "+g+" "),k=g.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if(!k)throw d("iexp",g);var l=k[1],m=k[2],r=k[3],q=k[4],k=l.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",l);var s=k[3]||k[1],u=k[2];if(r&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(r)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(r)))throw d("badident",r);var z,p,x,v,B={$id:Da};q?z=a(q):(x=function(a,b){return Da(b)},v=function(a){return a});return function(a,e,f,k,l){z&&(p=function(b,c,d){u&&(B[u]=b);B[s]=c;B.$index=
d;return z(a,B)});var q=ea();a.$watchCollection(m,function(f){var k,m,t=e[0],z,B=ea(),D,F,G,E,I,J,K;r&&(a[r]=f);if(Aa(f))I=f,m=p||x;else for(K in m=p||v,I=[],f)ra.call(f,K)&&"$"!==K.charAt(0)&&I.push(K);D=I.length;K=Array(D);for(k=0;k<D;k++)if(F=f===I?k:I[k],G=f[F],E=m(F,G,k),q[E])J=q[E],delete q[E],B[E]=J,K[k]=J;else{if(B[E])throw n(K,function(a){a&&a.scope&&(q[a.id]=a)}),d("dupes",g,E,G);K[k]={id:E,scope:w,clone:w};B[E]=!0}for(z in q){J=q[z];E=sb(J.clone);b.leave(E);if(E[0].parentNode)for(k=0,m=
E.length;k<m;k++)E[k].$$NG_REMOVED=!0;J.scope.$destroy()}for(k=0;k<D;k++)if(F=f===I?k:I[k],G=f[F],J=K[k],J.scope){z=t;do z=z.nextSibling;while(z&&z.$$NG_REMOVED);J.clone[0]!=z&&b.move(sb(J.clone),null,A(t));t=J.clone[J.clone.length-1];c(J.scope,k,s,G,u,F,D)}else l(function(a,d){J.scope=d;var e=h.cloneNode(!1);a[a.length++]=e;b.enter(a,null,A(t));t=e;J.clone=a;B[J.id]=J;c(J.scope,k,s,G,u,F,D)});q=B})}}}}],He=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,
function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Ae=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Ie=Ka(function(a,b,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&n(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),Je=["$animate",function(a){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],
link:function(b,d,c,e){var f=[],g=[],h=[],k=[],l=function(a,b){return function(){a.splice(b,1)}};b.$watch(c.ngSwitch||c.on,function(b){var c,d;c=0;for(d=h.length;c<d;++c)a.cancel(h[c]);c=h.length=0;for(d=k.length;c<d;++c){var q=sb(g[c].clone);k[c].$destroy();(h[c]=a.leave(q)).then(l(h,c))}g.length=0;k.length=0;(f=e.cases["!"+b]||e.cases["?"])&&n(f,function(b){b.transclude(function(c,d){k.push(d);var e=b.element;c[c.length++]=W.createComment(" end ngSwitchWhen: ");g.push({clone:c});a.enter(c,e.parent(),
e)})})})}}}],Ke=Ka({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["!"+d.ngSwitchWhen]=c.cases["!"+d.ngSwitchWhen]||[];c.cases["!"+d.ngSwitchWhen].push({transclude:e,element:b})}}),Le=Ka({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),Ne=Ka({restrict:"EAC",link:function(a,b,d,c,e){if(!e)throw M("ngTransclude")("orphan",
ua(b));e(function(a){b.empty();b.append(a)})}}),ne=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"==d.type&&a.put(d.id,b[0].text)}}}],Jg={$setViewValue:z,$render:z},Kg=["$element","$scope","$attrs",function(a,b,d){var c=this,e=new Sa;c.ngModelCtrl=Jg;c.unknownOption=A(W.createElement("option"));c.renderUnknownOption=function(b){b="? "+Da(b)+" ?";c.unknownOption.val(b);a.prepend(c.unknownOption);a.val(b)};b.$on("$destroy",function(){c.renderUnknownOption=
z});c.removeUnknownOption=function(){c.unknownOption.parent()&&c.unknownOption.remove()};c.readValue=function(){c.removeUnknownOption();return a.val()};c.writeValue=function(b){c.hasOption(b)?(c.removeUnknownOption(),a.val(b),""===b&&c.emptyOption.prop("selected",!0)):null==b&&c.emptyOption?(c.removeUnknownOption(),a.val("")):c.renderUnknownOption(b)};c.addOption=function(a,b){Ra(a,'"option value"');""===a&&(c.emptyOption=b);var d=e.get(a)||0;e.put(a,d+1);c.ngModelCtrl.$render();b[0].hasAttribute("selected")&&
(b[0].selected=!0)};c.removeOption=function(a){var b=e.get(a);b&&(1===b?(e.remove(a),""===a&&(c.emptyOption=w)):e.put(a,b-1))};c.hasOption=function(a){return!!e.get(a)};c.registerOption=function(a,b,d,e,l){if(e){var m;d.$observe("value",function(a){u(m)&&c.removeOption(m);m=a;c.addOption(a,b)})}else l?a.$watch(l,function(a,e){d.$set("value",a);e!==a&&c.removeOption(e);c.addOption(a,b)}):c.addOption(d.value,b);b.on("$destroy",function(){c.removeOption(d.value);c.ngModelCtrl.$render()})}}],oe=function(){return{restrict:"E",
require:["select","?ngModel"],controller:Kg,priority:1,link:{pre:function(a,b,d,c){var e=c[1];if(e){var f=c[0];f.ngModelCtrl=e;b.on("change",function(){a.$apply(function(){e.$setViewValue(f.readValue())})});if(d.multiple){f.readValue=function(){var a=[];n(b.find("option"),function(b){b.selected&&a.push(b.value)});return a};f.writeValue=function(a){var c=new Sa(a);n(b.find("option"),function(a){a.selected=u(c.get(a.value))})};var g,h=NaN;a.$watch(function(){h!==e.$viewValue||ka(g,e.$viewValue)||(g=
ha(e.$viewValue),e.$render());h=e.$viewValue});e.$isEmpty=function(a){return!a||0===a.length}}}},post:function(a,b,d,c){var e=c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},qe=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){if(u(d.value))var c=a(d.value,!0);else{var e=a(b.text(),!0);e||d.$set("value",b.text())}return function(a,b,d){var k=b.parent();(k=k.data("$selectController")||k.parent().data("$selectController"))&&k.registerOption(a,
b,d,c,e)}}}}],pe=na({restrict:"E",terminal:!1}),Gc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",function(){c.$validate()}))}}},Fc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e,f=d.ngPattern||d.pattern;d.$observe("pattern",function(a){F(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw M("ngPattern")("noregexp",
f,a,ua(b));e=a||w;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||q(e)||e.test(b)}}}}},Ic=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=-1;d.$observe("maxlength",function(a){a=Z(a);e=isNaN(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>e||c.$isEmpty(b)||b.length<=e}}}}},Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=0;d.$observe("minlength",function(a){e=Z(a)||0;c.$validate()});
c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=e}}}}};S.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(ge(),ie($),$.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),
SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",
PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",pluralCat:function(a,c){var e=a|0,f=c;w===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),A(W).ready(function(){ce(W,zc)}))})(window,document);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.3.20
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,c,C){'use strict';function v(r,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,f,b,d,y){function z(){k&&(g.cancel(k),k=null);l&&(l.$destroy(),l=null);m&&(k=g.leave(m),k.then(function(){k=null}),m=null)}function x(){var b=r.current&&r.current.locals;if(c.isDefined(b&&b.$template)){var b=a.$new(),d=r.current;m=y(b,function(b){g.enter(b,null,m||f).then(function(){!c.isDefined(t)||t&&!a.$eval(t)||h()});z()});l=d.scope=b;l.$emit("$viewContentLoaded");
l.$eval(w)}else z()}var l,m,k,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(c,h,g){return{restrict:"ECA",priority:-400,link:function(a,f){var b=g.current,d=b.locals;f.html(d.$template);var y=c(f.contents());b.controller&&(d.$scope=a,d=h(b.controller,d),b.controllerAs&&(a[b.controllerAs]=d),f.data("$ngControllerController",d),f.children().data("$ngControllerController",d));y(a)}}}p=c.module("ngRoute",["ng"]).provider("$route",function(){function r(a,f){return c.extend(Object.create(a),
f)}function h(a,c){var b=c.caseInsensitiveMatch,d={originalPath:a,regexp:a},g=d.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,c,b,d){a="?"===d?d:null;d="*"===d?d:null;g.push({name:b,optional:!!a});c=c||"";return""+(a?"":c)+"(?:"+(a?c:"")+(d&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");d.regexp=new RegExp("^"+a+"$",b?"i":"");return d}var g={};this.when=function(a,f){var b=c.copy(f);c.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
c.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=c.extend(b,a&&h(a,b));if(a){var d="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[d]=c.extend({redirectTo:a},h(d,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,f,b,d,h,p,x){function l(b){var e=s.current;
(v=(n=k())&&e&&n.$$route===e.$$route&&c.equals(n.pathParams,e.pathParams)&&!n.reloadOnSearch&&!w)||!e&&!n||a.$broadcast("$routeChangeStart",n,e).defaultPrevented&&b&&b.preventDefault()}function m(){var u=s.current,e=n;if(v)u.params=e.params,c.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(c.isString(e.redirectTo)?f.path(t(e.redirectTo,e.params)).search(e.params).replace():f.url(e.redirectTo(e.pathParams,f.path(),f.search())).replace()),d.when(e).then(function(){if(e){var a=
c.extend({},e.resolve),b,f;c.forEach(a,function(b,e){a[e]=c.isString(b)?h.get(b):h.invoke(b,null,null,e)});c.isDefined(b=e.template)?c.isFunction(b)&&(b=b(e.params)):c.isDefined(f=e.templateUrl)&&(c.isFunction(f)&&(f=f(e.params)),c.isDefined(f)&&(e.loadedTemplateUrl=x.valueOf(f),b=p(f)));c.isDefined(b)&&(a.$template=b);return d.all(a)}}).then(function(f){e==s.current&&(e&&(e.locals=f,c.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function k(){var a,b;c.forEach(g,function(d,g){var q;if(q=!b){var h=f.path();q=d.keys;var l={};if(d.regexp)if(h=d.regexp.exec(h)){for(var k=1,m=h.length;k<m;++k){var n=q[k-1],p=h[k];n&&p&&(l[n.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=r(d,{params:c.extend({},f.search(),a),pathParams:a}),b.$$route=d)});return b||g[null]&&r(g[null],{params:{},pathParams:{}})}function t(a,b){var d=[];c.forEach((a||"").split(":"),function(a,c){if(0===c)d.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];d.push(b[g]);d.push(f[2]||"");delete b[g]}});return d.join("")}var w=!1,n,v,s={routes:g,reload:function(){w=!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route)a=c.extend({},this.current.params,a),f.path(t(this.current.$$route.originalPath,a)),f.search(a);else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",m);return s}]});var B=c.$$minErr("ngRoute");p.provider("$routeParams",function(){this.$get=function(){return{}}});
p.directive("ngView",v);p.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

/*
 AngularJS v1.4.9
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(J,f,C){'use strict';function D(t,e){e=e||{};f.forEach(e,function(f,k){delete e[k]});for(var k in t)!t.hasOwnProperty(k)||"$"===k.charAt(0)&&"$"===k.charAt(1)||(e[k]=t[k]);return e}var y=f.$$minErr("$resource"),B=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;f.module("ngResource",["ng"]).provider("$resource",function(){var t=/^https?:\/\/[^\/]*/,e=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$log","$q",function(k,F,G){function w(f,g){this.template=f;this.defaults=r({},e.defaults,g);this.urlParams={}}function z(l,g,s,h){function c(a,q){var c={};q=r({},g,q);u(q,function(b,q){x(b)&&(b=b());var m;if(b&&b.charAt&&"@"==b.charAt(0)){m=a;var d=b.substr(1);if(null==d||""===d||"hasOwnProperty"===d||!B.test("."+d))throw y("badmember",d);for(var d=d.split("."),n=0,g=d.length;n<g&&f.isDefined(m);n++){var e=d[n];m=null!==m?m[e]:C}}else m=b;c[q]=m});return c}function H(a){return a.resource}
function d(a){D(a||{},this)}var t=new w(l,h);s=r({},e.defaults.actions,s);d.prototype.toJSON=function(){var a=r({},this);delete a.$promise;delete a.$resolved;return a};u(s,function(a,q){var g=/^(POST|PUT|PATCH)$/i.test(a.method);d[q]=function(b,A,m,e){var n={},h,l,s;switch(arguments.length){case 4:s=e,l=m;case 3:case 2:if(x(A)){if(x(b)){l=b;s=A;break}l=A;s=m}else{n=b;h=A;l=m;break}case 1:x(b)?l=b:g?h=b:n=b;break;case 0:break;default:throw y("badargs",arguments.length);}var w=this instanceof d,p=w?
h:a.isArray?[]:new d(h),v={},z=a.interceptor&&a.interceptor.response||H,B=a.interceptor&&a.interceptor.responseError||C;u(a,function(a,b){switch(b){default:v[b]=I(a);break;case "params":case "isArray":case "interceptor":break;case "timeout":a&&!f.isNumber(a)&&F.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests.\n  If you need support for cancellable $resource actions, you should upgrade to version 1.5 or higher.")}});
g&&(v.data=h);t.setUrlParams(v,r({},c(h,a.params||{}),n),a.url);n=k(v).then(function(b){var c=b.data,m=p.$promise;if(c){if(f.isArray(c)!==!!a.isArray)throw y("badcfg",q,a.isArray?"array":"object",f.isArray(c)?"array":"object",v.method,v.url);a.isArray?(p.length=0,u(c,function(b){"object"===typeof b?p.push(new d(b)):p.push(b)})):(D(c,p),p.$promise=m)}p.$resolved=!0;b.resource=p;return b},function(b){p.$resolved=!0;(s||E)(b);return G.reject(b)});n=n.then(function(b){var a=z(b);(l||E)(a,b.headers);return a},
B);return w?n:(p.$promise=n,p.$resolved=!1,p)};d.prototype["$"+q]=function(b,a,c){x(b)&&(c=a,a=b,b={});b=d[q].call(this,b,this,a,c);return b.$promise||b}});d.bind=function(a){return z(l,r({},g,a),s)};return d}var E=f.noop,u=f.forEach,r=f.extend,I=f.copy,x=f.isFunction;w.prototype={setUrlParams:function(l,g,e){var h=this,c=e||h.template,k,d,r="",a=h.urlParams={};u(c.split(/\W/),function(d){if("hasOwnProperty"===d)throw y("badname");!/^\d+$/.test(d)&&d&&(new RegExp("(^|[^\\\\]):"+d+"(\\W|$)")).test(c)&&
(a[d]=!0)});c=c.replace(/\\:/g,":");c=c.replace(t,function(a){r=a;return""});g=g||{};u(h.urlParams,function(a,e){k=g.hasOwnProperty(e)?g[e]:h.defaults[e];f.isDefined(k)&&null!==k?(d=encodeURIComponent(k).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+e+"(\\W|$)","g"),function(b,a){return d+a})):c=c.replace(new RegExp("(/?):"+e+"(\\W|$)","g"),function(b,
a,c){return"/"==c.charAt(0)?c:a+c})});h.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");l.url=r+c.replace(/\/\\\./,"/.");u(g,function(a,c){h.urlParams[c]||(l.params=l.params||{},l.params[c]=a)})}};return z}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map

/*
 AngularJS v1.5.0
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(A,e,B){'use strict';function C(a){var c=[];v(c,e.noop).chars(a);return c.join("")}function h(a,c){var b={},d=a.split(","),l;for(l=0;l<d.length;l++)b[c?e.lowercase(d[l]):d[l]]=!0;return b}function D(a,c){null===a||a===B?a="":"string"!==typeof a&&(a=""+a);g.innerHTML=a;var b=5;do{if(0===b)throw w("uinput");b--;11>=document.documentMode&&n(g);a=g.innerHTML;g.innerHTML=a}while(a!==g.innerHTML);for(b=g.firstChild;b;){switch(b.nodeType){case 1:c.start(b.nodeName.toLowerCase(),E(b.attributes));
break;case 3:c.chars(b.textContent)}var d;if(!(d=b.firstChild)&&(1==b.nodeType&&c.end(b.nodeName.toLowerCase()),d=b.nextSibling,!d))for(;null==d;){b=b.parentNode;if(b===g)break;d=b.nextSibling;1==b.nodeType&&c.end(b.nodeName.toLowerCase())}b=d}for(;b=g.firstChild;)g.removeChild(b)}function E(a){for(var c={},b=0,d=a.length;b<d;b++){var l=a[b];c[l.name]=l.value}return c}function x(a){return a.replace(/&/g,"&amp;").replace(F,function(a){var b=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(b-55296)+
(a-56320)+65536)+";"}).replace(G,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function v(a,c){var b=!1,d=e.bind(a,a.push);return{start:function(a,f){a=e.lowercase(a);!b&&H[a]&&(b=a);b||!0!==t[a]||(d("<"),d(a),e.forEach(f,function(b,f){var g=e.lowercase(f),h="img"===a&&"src"===g||"background"===g;!0!==I[g]||!0===y[g]&&!c(b,h)||(d(" "),d(f),d('="'),d(x(b)),d('"'))}),d(">"))},end:function(a){a=e.lowercase(a);b||!0!==t[a]||!0===z[a]||(d("</"),d(a),d(">"));a==
b&&(b=!1)},chars:function(a){b||d(x(a))}}}function n(a){if(a.nodeType===Node.ELEMENT_NODE)for(var c=a.attributes,b=0,d=c.length;b<d;b++){var e=c[b],f=e.name.toLowerCase();if("xmlns:ns1"===f||0===f.indexOf("ns1:"))a.removeAttributeNode(e),b--,d--}(c=a.firstChild)&&n(c);(c=a.nextSibling)&&n(c)}var w=e.$$minErr("$sanitize"),F=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,G=/([^\#-~ |!])/g,z=h("area,br,col,hr,img,wbr"),q=h("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),k=h("rp,rt"),u=e.extend({},k,q),q=e.extend({},
q,h("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),k=e.extend({},k,h("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),J=h("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
H=h("script,style"),t=e.extend({},z,q,k,u),y=h("background,cite,href,longdesc,src,xlink:href"),u=h("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),k=h("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
!0),I=e.extend({},y,k,u),g;(function(a){if(a.document&&a.document.implementation)a=a.document.implementation.createHTMLDocument("inert");else throw w("noinert");var c=(a.documentElement||a.getDocumentElement()).getElementsByTagName("body");1===c.length?g=c[0]:(c=a.createElement("html"),g=a.createElement("body"),c.appendChild(g),a.appendChild(c))})(A);e.module("ngSanitize",[]).provider("$sanitize",function(){var a=!1;this.$get=["$$sanitizeUri",function(c){a&&e.extend(t,J);return function(a){var d=
[];D(a,v(d,function(a,b){return!/^unsafe:/.test(c(a,b))}));return d.join("")}}];this.enableSvg=function(c){return e.isDefined(c)?(a=c,this):a}});e.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,b=/^mailto:/i,d=e.$$minErr("linky"),g=e.isString;return function(f,h,m){function k(a){a&&p.push(C(a))}function q(a,b){var c;p.push("<a ");e.isFunction(m)&&(m=m(a));if(e.isObject(m))for(c in m)p.push(c+
'="'+m[c]+'" ');else m={};!e.isDefined(h)||"target"in m||p.push('target="',h,'" ');p.push('href="',a.replace(/"/g,"&quot;"),'">');k(b);p.push("</a>")}if(null==f||""===f)return f;if(!g(f))throw d("notstring",f);for(var r=f,p=[],s,n;f=r.match(c);)s=f[0],f[2]||f[4]||(s=(f[3]?"http://":"mailto:")+s),n=f.index,k(r.substr(0,n)),q(s,f[0].replace(b,"")),r=r.substring(n+f[0].length);k(r);return a(p.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map

/**
 * @license
 * Lo-Dash 2.4.2 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,r,t){for(var e=(t||0)-1,u=n?n.length:0;++e<u;)if(n[e]===r)return e;return-1}function r(r,t){var e=typeof t;if(r=r.cache,"boolean"==e||null==t)return r[t]?0:-1;"number"!=e&&"string"!=e&&(e="object");var u="number"==e?t:m+t;return r=(r=r[e])&&r[u],"object"==e?r&&n(r,t)>-1?0:-1:r?0:-1}function t(n){var r=this.cache,t=typeof n;if("boolean"==t||null==n)r[n]=!0;else{"number"!=t&&"string"!=t&&(t="object");var e="number"==t?n:m+n,u=r[t]||(r[t]={});"object"==t?(u[e]||(u[e]=[])).push(n):u[e]=!0;

}}function e(n){return n.charCodeAt(0)}function u(n,r){for(var t=n.criteria,e=r.criteria,u=-1,o=t.length;++u<o;){var a=t[u],i=e[u];if(a!==i){if(a>i||"undefined"==typeof a)return 1;if(a<i||"undefined"==typeof i)return-1}}return n.index-r.index}function o(n){var r=-1,e=n.length,u=n[0],o=n[e/2|0],a=n[e-1];if(u&&"object"==typeof u&&o&&"object"==typeof o&&a&&"object"==typeof a)return!1;var i=f();i["false"]=i["null"]=i["true"]=i.undefined=!1;var l=f();for(l.array=n,l.cache=i,l.push=t;++r<e;)l.push(n[r]);

return l}function a(n){return"\\"+G[n]}function i(){return h.pop()||[]}function f(){return g.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var r=n.cache;r&&c(r),n.array=n.cache=n.criteria=n.object=n.number=n.string=n.value=null,g.length<_&&g.push(n)}function p(n,r,t){r||(r=0),"undefined"==typeof t&&(t=n?n.length:0);for(var e=-1,u=t-r||0,o=Array(u<0?0:u);++e<u;)o[e]=n[r+e];

return o}function s(t){function h(n){return n&&"object"==typeof n&&!Yt(n)&&Tt.call(n,"__wrapped__")?n:new g(n)}function g(n,r){this.__chain__=!!r,this.__wrapped__=n}function _(n){function r(){if(e){var n=p(e);$t.apply(n,arguments)}if(this instanceof r){var o=J(t.prototype),a=t.apply(o,n||arguments);return Sn(a)?a:o}return t.apply(u,n||arguments)}var t=n[0],e=n[2],u=n[4];return Xt(r,n),r}function G(n,r,t,e,u){if(t){var o=t(n);if("undefined"!=typeof o)return o}var a=Sn(n);if(!a)return n;var f=Nt.call(n);

if(!K[f])return n;var c=Jt[f];switch(f){case F:case B:return new c(+n);case q:case P:return new c(n);case L:return o=c(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o}var s=Yt(n);if(r){var v=!e;e||(e=i()),u||(u=i());for(var h=e.length;h--;)if(e[h]==n)return u[h];o=s?c(n.length):{}}else o=s?p(n):oe({},n);return s&&(Tt.call(n,"index")&&(o.index=n.index),Tt.call(n,"input")&&(o.input=n.input)),r?(e.push(n),u.push(o),(s?Xn:fe)(n,function(n,a){o[a]=G(n,r,t,e,u)}),v&&(l(e),l(u)),o):o}function J(n,r){return Sn(n)?zt(n):{};

}function Q(n,r,t){if("function"!=typeof n)return Yr;if("undefined"==typeof r||!("prototype"in n))return n;var e=n.__bindData__;if("undefined"==typeof e&&(Qt.funcNames&&(e=!n.name),e=e||!Qt.funcDecomp,!e)){var u=At.call(n);Qt.funcNames||(e=!O.test(u)),e||(e=I.test(u),Xt(n,e))}if(e===!1||e!==!0&&1&e[1])return n;switch(t){case 1:return function(t){return n.call(r,t)};case 2:return function(t,e){return n.call(r,t,e)};case 3:return function(t,e,u){return n.call(r,t,e,u)};case 4:return function(t,e,u,o){
return n.call(r,t,e,u,o)}}return $r(n,r)}function X(n){function r(){var n=f?a:this;if(u){var h=p(u);$t.apply(h,arguments)}if((o||c)&&(h||(h=p(arguments)),o&&$t.apply(h,o),c&&h.length<i))return e|=16,X([t,s?e:-4&e,h,null,a,i]);if(h||(h=arguments),l&&(t=n[v]),this instanceof r){n=J(t.prototype);var g=t.apply(n,h);return Sn(g)?g:n}return t.apply(n,h)}var t=n[0],e=n[1],u=n[2],o=n[3],a=n[4],i=n[5],f=1&e,l=2&e,c=4&e,s=8&e,v=t;return Xt(r,n),r}function Y(t,e){var u=-1,a=ln(),i=t?t.length:0,f=i>=b&&a===n,l=[];

if(f){var p=o(e);p?(a=r,e=p):f=!1}for(;++u<i;){var s=t[u];a(e,s)<0&&l.push(s)}return f&&c(e),l}function nn(n,r,t,e){for(var u=(e||0)-1,o=n?n.length:0,a=[];++u<o;){var i=n[u];if(i&&"object"==typeof i&&"number"==typeof i.length&&(Yt(i)||vn(i))){r||(i=nn(i,r,t));var f=-1,l=i.length,c=a.length;for(a.length+=l;++f<l;)a[c++]=i[f]}else t||a.push(i)}return a}function rn(n,r,t,e,u,o){if(t){var a=t(n,r);if("undefined"!=typeof a)return!!a}if(n===r)return 0!==n||1/n==1/r;var f=typeof n,c=typeof r;if(n===n&&(!n||!V[f])&&(!r||!V[c]))return!1;

if(null==n||null==r)return n===r;var p=Nt.call(n),s=Nt.call(r);if(p==T&&(p=z),s==T&&(s=z),p!=s)return!1;switch(p){case F:case B:return+n==+r;case q:return n!=+n?r!=+r:0==n?1/n==1/r:n==+r;case L:case P:return n==jt(r)}var h=p==$;if(!h){var g=Tt.call(n,"__wrapped__"),y=Tt.call(r,"__wrapped__");if(g||y)return rn(g?n.__wrapped__:n,y?r.__wrapped__:r,t,e,u,o);if(p!=z)return!1;var m=n.constructor,b=r.constructor;if(m!=b&&!(In(m)&&m instanceof m&&In(b)&&b instanceof b)&&"constructor"in n&&"constructor"in r)return!1;

}var _=!u;u||(u=i()),o||(o=i());for(var d=u.length;d--;)if(u[d]==n)return o[d]==r;var w=0;if(a=!0,u.push(n),o.push(r),h){if(d=n.length,w=r.length,a=w==d,a||e)for(;w--;){var j=d,k=r[w];if(e)for(;j--&&!(a=rn(n[j],k,t,e,u,o)););else if(!(a=rn(n[w],k,t,e,u,o)))break}}else ie(r,function(r,i,f){return Tt.call(f,i)?(w++,a=Tt.call(n,i)&&rn(n[i],r,t,e,u,o)):v}),a&&!e&&ie(n,function(n,r,t){return Tt.call(t,r)?a=--w>-1:v});return u.pop(),o.pop(),_&&(l(u),l(o)),a}function tn(n,r,t,e,u){(Yt(r)?Xn:fe)(r,function(r,o){
var a,i,f=r,l=n[o];if(r&&((i=Yt(r))||le(r))){for(var c=e.length;c--;)if(a=e[c]==r){l=u[c];break}if(!a){var p;t&&(f=t(l,r),(p="undefined"!=typeof f)&&(l=f)),p||(l=i?Yt(l)?l:[]:le(l)?l:{}),e.push(r),u.push(l),p||tn(l,r,t,e,u)}}else t&&(f=t(l,r),"undefined"==typeof f&&(f=r)),"undefined"!=typeof f&&(l=f);n[o]=l})}function en(n,r){return n+St(Ht()*(r-n+1))}function un(t,e,u){var a=-1,f=ln(),p=t?t.length:0,s=[],v=!e&&p>=b&&f===n,h=u||v?i():s;if(v){var g=o(h);f=r,h=g}for(;++a<p;){var y=t[a],m=u?u(y,a,t):y;

(e?!a||h[h.length-1]!==m:f(h,m)<0)&&((u||v)&&h.push(m),s.push(y))}return v?(l(h.array),c(h)):u&&l(h),s}function on(n){return function(r,t,e){var u={};t=h.createCallback(t,e,3);var o=-1,a=r?r.length:0;if("number"==typeof a)for(;++o<a;){var i=r[o];n(u,i,t(i,o,r),r)}else fe(r,function(r,e,o){n(u,r,t(r,e,o),o)});return u}}function an(n,r,t,e,u,o){var a=1&r,i=2&r,f=4&r,l=16&r,c=32&r;if(!i&&!In(n))throw new kt;l&&!t.length&&(r&=-17,l=t=!1),c&&!e.length&&(r&=-33,c=e=!1);var s=n&&n.__bindData__;if(s&&s!==!0)return s=p(s),
s[2]&&(s[2]=p(s[2])),s[3]&&(s[3]=p(s[3])),!a||1&s[1]||(s[4]=u),!a&&1&s[1]&&(r|=8),!f||4&s[1]||(s[5]=o),l&&$t.apply(s[2]||(s[2]=[]),t),c&&Wt.apply(s[3]||(s[3]=[]),e),s[1]|=r,an.apply(null,s);var v=1==r||17===r?_:X;return v([n,r,t,e,u,o])}function fn(n){return re[n]}function ln(){var r=(r=h.indexOf)===br?n:r;return r}function cn(n){return"function"==typeof n&&Rt.test(n)}function pn(n){var r,t;return n&&Nt.call(n)==z&&(r=n.constructor,!In(r)||r instanceof r)?(ie(n,function(n,r){t=r}),"undefined"==typeof t||Tt.call(n,t)):!1;

}function sn(n){return te[n]}function vn(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Nt.call(n)==T||!1}function hn(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t=r,r=!1),G(n,r,"function"==typeof t&&Q(t,e,1))}function gn(n,r,t){return G(n,!0,"function"==typeof r&&Q(r,t,1))}function yn(n,r){var t=J(n);return r?oe(t,r):t}function mn(n,r,t){var e;return r=h.createCallback(r,t,3),fe(n,function(n,t,u){return r(n,t,u)?(e=t,!1):v}),e}function bn(n,r,t){var e;return r=h.createCallback(r,t,3),
dn(n,function(n,t,u){return r(n,t,u)?(e=t,!1):v}),e}function _n(n,r,t){var e=[];ie(n,function(n,r){e.push(r,n)});var u=e.length;for(r=Q(r,t,3);u--&&r(e[u--],e[u],n)!==!1;);return n}function dn(n,r,t){var e=ne(n),u=e.length;for(r=Q(r,t,3);u--;){var o=e[u];if(r(n[o],o,n)===!1)break}return n}function wn(n){var r=[];return ie(n,function(n,t){In(n)&&r.push(t)}),r.sort()}function jn(n,r){return n?Tt.call(n,r):!1}function kn(n){for(var r=-1,t=ne(n),e=t.length,u={};++r<e;){var o=t[r];u[n[o]]=o}return u}function xn(n){
return n===!0||n===!1||n&&"object"==typeof n&&Nt.call(n)==F||!1}function Cn(n){return n&&"object"==typeof n&&Nt.call(n)==B||!1}function On(n){return n&&1===n.nodeType||!1}function Nn(n){var r=!0;if(!n)return r;var t=Nt.call(n),e=n.length;return t==$||t==P||t==T||t==z&&"number"==typeof e&&In(n.splice)?!e:(fe(n,function(){return r=!1}),r)}function Rn(n,r,t,e){return rn(n,r,"function"==typeof t&&Q(t,e,2))}function En(n){return Pt(n)&&!Kt(parseFloat(n))}function In(n){return"function"==typeof n}function Sn(n){
return!(!n||!V[typeof n])}function An(n){return Tn(n)&&n!=+n}function Dn(n){return null===n}function Tn(n){return"number"==typeof n||n&&"object"==typeof n&&Nt.call(n)==q||!1}function $n(n){return n&&"object"==typeof n&&Nt.call(n)==L||!1}function Fn(n){return"string"==typeof n||n&&"object"==typeof n&&Nt.call(n)==P||!1}function Bn(n){return"undefined"==typeof n}function Wn(n,r,t){var e={};return r=h.createCallback(r,t,3),fe(n,function(n,t,u){e[t]=r(n,t,u)}),e}function qn(n){var r=arguments,t=2;if(!Sn(n))return n;

if("number"!=typeof r[2]&&(t=r.length),t>3&&"function"==typeof r[t-2])var e=Q(r[--t-1],r[t--],2);else t>2&&"function"==typeof r[t-1]&&(e=r[--t]);for(var u=p(arguments,1,t),o=-1,a=i(),f=i();++o<t;)tn(n,u[o],e,a,f);return l(a),l(f),n}function zn(n,r,t){var e={};if("function"!=typeof r){var u=[];ie(n,function(n,r){u.push(r)}),u=Y(u,nn(arguments,!0,!1,1));for(var o=-1,a=u.length;++o<a;){var i=u[o];e[i]=n[i]}}else r=h.createCallback(r,t,3),ie(n,function(n,t,u){r(n,t,u)||(e[t]=n)});return e}function Ln(n){
for(var r=-1,t=ne(n),e=t.length,u=ht(e);++r<e;){var o=t[r];u[r]=[o,n[o]]}return u}function Pn(n,r,t){var e={};if("function"!=typeof r)for(var u=-1,o=nn(arguments,!0,!1,1),a=Sn(n)?o.length:0;++u<a;){var i=o[u];i in n&&(e[i]=n[i])}else r=h.createCallback(r,t,3),ie(n,function(n,t,u){r(n,t,u)&&(e[t]=n)});return e}function Kn(n,r,t,e){var u=Yt(n);if(null==t)if(u)t=[];else{var o=n&&n.constructor,a=o&&o.prototype;t=J(a)}return r&&(r=h.createCallback(r,e,4),(u?Xn:fe)(n,function(n,e,u){return r(t,n,e,u)})),
t}function Un(n){for(var r=-1,t=ne(n),e=t.length,u=ht(e);++r<e;)u[r]=n[t[r]];return u}function Mn(n){for(var r=arguments,t=-1,e=nn(r,!0,!1,1),u=r[2]&&r[2][r[1]]===n?1:e.length,o=ht(u);++t<u;)o[t]=n[e[t]];return o}function Vn(n,r,t){var e=-1,u=ln(),o=n?n.length:0,a=!1;return t=(t<0?Mt(0,o+t):t)||0,Yt(n)?a=u(n,r,t)>-1:"number"==typeof o?a=(Fn(n)?n.indexOf(r,t):u(n,r,t))>-1:fe(n,function(n){return++e<t?v:!(a=n===r)}),a}function Gn(n,r,t){var e=!0;r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o&&(e=!!r(n[u],u,n)););else fe(n,function(n,t,u){
return e=!!r(n,t,u)});return e}function Hn(n,r,t){var e=[];r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o;){var a=n[u];r(a,u,n)&&e.push(a)}else fe(n,function(n,t,u){r(n,t,u)&&e.push(n)});return e}function Jn(n,r,t){r=h.createCallback(r,t,3);var e=-1,u=n?n.length:0;if("number"!=typeof u){var o;return fe(n,function(n,t,e){return r(n,t,e)?(o=n,!1):v}),o}for(;++e<u;){var a=n[e];if(r(a,e,n))return a}}function Qn(n,r,t){var e;return r=h.createCallback(r,t,3),Yn(n,function(n,t,u){
return r(n,t,u)?(e=n,!1):v}),e}function Xn(n,r,t){var e=-1,u=n?n.length:0;if(r=r&&"undefined"==typeof t?r:Q(r,t,3),"number"==typeof u)for(;++e<u&&r(n[e],e,n)!==!1;);else fe(n,r);return n}function Yn(n,r,t){var e=n?n.length:0;if(r=r&&"undefined"==typeof t?r:Q(r,t,3),"number"==typeof e)for(;e--&&r(n[e],e,n)!==!1;);else{var u=ne(n);e=u.length,fe(n,function(n,t,o){return t=u?u[--e]:--e,r(o[t],t,o)})}return n}function Zn(n,r){var t=p(arguments,2),e=-1,u="function"==typeof r,o=n?n.length:0,a=ht("number"==typeof o?o:0);

return Xn(n,function(n){a[++e]=(u?r:n[r]).apply(n,t)}),a}function nr(n,r,t){var e=-1,u=n?n.length:0;if(r=h.createCallback(r,t,3),"number"==typeof u)for(var o=ht(u);++e<u;)o[e]=r(n[e],e,n);else o=[],fe(n,function(n,t,u){o[++e]=r(n,t,u)});return o}function rr(n,r,t){var u=-(1/0),o=u;if("function"!=typeof r&&t&&t[r]===n&&(r=null),null==r&&Yt(n))for(var a=-1,i=n.length;++a<i;){var f=n[a];f>o&&(o=f)}else r=null==r&&Fn(n)?e:h.createCallback(r,t,3),Xn(n,function(n,t,e){var a=r(n,t,e);a>u&&(u=a,o=n)});return o;

}function tr(n,r,t){var u=1/0,o=u;if("function"!=typeof r&&t&&t[r]===n&&(r=null),null==r&&Yt(n))for(var a=-1,i=n.length;++a<i;){var f=n[a];f<o&&(o=f)}else r=null==r&&Fn(n)?e:h.createCallback(r,t,3),Xn(n,function(n,t,e){var a=r(n,t,e);a<u&&(u=a,o=n)});return o}function er(n,r,t,e){if(!n)return t;var u=arguments.length<3;r=h.createCallback(r,e,4);var o=-1,a=n.length;if("number"==typeof a)for(u&&(t=n[++o]);++o<a;)t=r(t,n[o],o,n);else fe(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)});return t}function ur(n,r,t,e){
var u=arguments.length<3;return r=h.createCallback(r,e,4),Yn(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)}),t}function or(n,r,t){return r=h.createCallback(r,t,3),Hn(n,function(n,t,e){return!r(n,t,e)})}function ar(n,r,t){if(n&&"number"!=typeof n.length&&(n=Un(n)),null==r||t)return n?n[en(0,n.length-1)]:v;var e=ir(n);return e.length=Vt(Mt(0,r),e.length),e}function ir(n){var r=-1,t=n?n.length:0,e=ht("number"==typeof t?t:0);return Xn(n,function(n){var t=en(0,++r);e[r]=e[t],e[t]=n}),e}function fr(n){var r=n?n.length:0;

return"number"==typeof r?r:ne(n).length}function lr(n,r,t){var e;r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o&&!(e=r(n[u],u,n)););else fe(n,function(n,t,u){return!(e=r(n,t,u))});return!!e}function cr(n,r,t){var e=-1,o=Yt(r),a=n?n.length:0,p=ht("number"==typeof a?a:0);for(o||(r=h.createCallback(r,t,3)),Xn(n,function(n,t,u){var a=p[++e]=f();o?a.criteria=nr(r,function(r){return n[r]}):(a.criteria=i())[0]=r(n,t,u),a.index=e,a.value=n}),a=p.length,p.sort(u);a--;){
var s=p[a];p[a]=s.value,o||l(s.criteria),c(s)}return p}function pr(n){return n&&"number"==typeof n.length?p(n):Un(n)}function sr(n){for(var r=-1,t=n?n.length:0,e=[];++r<t;){var u=n[r];u&&e.push(u)}return e}function vr(n){return Y(n,nn(arguments,!0,!0,1))}function hr(n,r,t){var e=-1,u=n?n.length:0;for(r=h.createCallback(r,t,3);++e<u;)if(r(n[e],e,n))return e;return-1}function gr(n,r,t){var e=n?n.length:0;for(r=h.createCallback(r,t,3);e--;)if(r(n[e],e,n))return e;return-1}function yr(n,r,t){var e=0,u=n?n.length:0;

if("number"!=typeof r&&null!=r){var o=-1;for(r=h.createCallback(r,t,3);++o<u&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[0]:v;return p(n,0,Vt(Mt(0,e),u))}function mr(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t="function"!=typeof r&&e&&e[r]===n?null:r,r=!1),null!=t&&(n=nr(n,t,e)),nn(n,r)}function br(r,t,e){if("number"==typeof e){var u=r?r.length:0;e=e<0?Mt(0,u+e):e||0}else if(e){var o=Nr(r,t);return r[o]===t?o:-1}return n(r,t,e)}function _r(n,r,t){var e=0,u=n?n.length:0;if("number"!=typeof r&&null!=r){
var o=u;for(r=h.createCallback(r,t,3);o--&&r(n[o],o,n);)e++}else e=null==r||t?1:r||e;return p(n,0,Vt(Mt(0,u-e),u))}function dr(){for(var t=[],e=-1,u=arguments.length,a=i(),f=ln(),p=f===n,s=i();++e<u;){var v=arguments[e];(Yt(v)||vn(v))&&(t.push(v),a.push(p&&v.length>=b&&o(e?t[e]:s)))}var h=t[0],g=-1,y=h?h.length:0,m=[];n:for(;++g<y;){var _=a[0];if(v=h[g],(_?r(_,v):f(s,v))<0){for(e=u,(_||s).push(v);--e;)if(_=a[e],(_?r(_,v):f(t[e],v))<0)continue n;m.push(v)}}for(;u--;)_=a[u],_&&c(_);return l(a),l(s),
m}function wr(n,r,t){var e=0,u=n?n.length:0;if("number"!=typeof r&&null!=r){var o=u;for(r=h.createCallback(r,t,3);o--&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[u-1]:v;return p(n,Mt(0,u-e))}function jr(n,r,t){var e=n?n.length:0;for("number"==typeof t&&(e=(t<0?Mt(0,e+t):Vt(t,e-1))+1);e--;)if(n[e]===r)return e;return-1}function kr(n){for(var r=arguments,t=0,e=r.length,u=n?n.length:0;++t<e;)for(var o=-1,a=r[t];++o<u;)n[o]===a&&(Bt.call(n,o--,1),u--);return n}function xr(n,r,t){n=+n||0,t="number"==typeof t?t:+t||1,
null==r&&(r=n,n=0);for(var e=-1,u=Mt(0,Et((r-n)/(t||1))),o=ht(u);++e<u;)o[e]=n,n+=t;return o}function Cr(n,r,t){var e=-1,u=n?n.length:0,o=[];for(r=h.createCallback(r,t,3);++e<u;){var a=n[e];r(a,e,n)&&(o.push(a),Bt.call(n,e--,1),u--)}return o}function Or(n,r,t){if("number"!=typeof r&&null!=r){var e=0,u=-1,o=n?n.length:0;for(r=h.createCallback(r,t,3);++u<o&&r(n[u],u,n);)e++}else e=null==r||t?1:Mt(0,r);return p(n,e)}function Nr(n,r,t,e){var u=0,o=n?n.length:u;for(t=t?h.createCallback(t,e,1):Yr,r=t(r);u<o;){
var a=u+o>>>1;t(n[a])<r?u=a+1:o=a}return u}function Rr(){return un(nn(arguments,!0,!0))}function Er(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t="function"!=typeof r&&e&&e[r]===n?null:r,r=!1),null!=t&&(t=h.createCallback(t,e,3)),un(n,r,t)}function Ir(n){return Y(n,p(arguments,1))}function Sr(){for(var n=-1,r=arguments.length;++n<r;){var t=arguments[n];if(Yt(t)||vn(t))var e=e?un(Y(e,t).concat(Y(t,e))):t}return e||[]}function Ar(){for(var n=arguments.length>1?arguments:arguments[0],r=-1,t=n?rr(ve(n,"length")):0,e=ht(t<0?0:t);++r<t;)e[r]=ve(n,r);

return e}function Dr(n,r){var t=-1,e=n?n.length:0,u={};for(r||!e||Yt(n[0])||(r=[]);++t<e;){var o=n[t];r?u[o]=r[t]:o&&(u[o[0]]=o[1])}return u}function Tr(n,r){if(!In(r))throw new kt;return function(){return--n<1?r.apply(this,arguments):v}}function $r(n,r){return arguments.length>2?an(n,17,p(arguments,2),null,r):an(n,1,null,null,r)}function Fr(n){for(var r=arguments.length>1?nn(arguments,!0,!1,1):wn(n),t=-1,e=r.length;++t<e;){var u=r[t];n[u]=an(n[u],1,null,null,n)}return n}function Br(n,r){return arguments.length>2?an(r,19,p(arguments,2),null,n):an(r,3,null,null,n);

}function Wr(){for(var n=arguments,r=n.length;r--;)if(!In(n[r]))throw new kt;return function(){for(var r=arguments,t=n.length;t--;)r=[n[t].apply(this,r)];return r[0]}}function qr(n,r){return r="number"==typeof r?r:+r||n.length,an(n,4,null,null,null,r)}function zr(n,r,t){var e,u,o,a,i,f,l,c=0,p=!1,s=!0;if(!In(n))throw new kt;if(r=Mt(0,r)||0,t===!0){var h=!0;s=!1}else Sn(t)&&(h=t.leading,p="maxWait"in t&&(Mt(r,t.maxWait)||0),s="trailing"in t?t.trailing:s);var g=function(){var t=r-(ge()-a);if(t>0)f=Ft(g,t);
else{u&&It(u);var p=l;u=f=l=v,p&&(c=ge(),o=n.apply(i,e),f||u||(e=i=null))}},y=function(){f&&It(f),u=f=l=v,(s||p!==r)&&(c=ge(),o=n.apply(i,e),f||u||(e=i=null))};return function(){if(e=arguments,a=ge(),i=this,l=s&&(f||!h),p===!1)var t=h&&!f;else{u||h||(c=a);var v=p-(a-c),m=v<=0;m?(u&&(u=It(u)),c=a,o=n.apply(i,e)):u||(u=Ft(y,v))}return m&&f?f=It(f):f||r===p||(f=Ft(g,r)),t&&(m=!0,o=n.apply(i,e)),!m||f||u||(e=i=null),o}}function Lr(n){if(!In(n))throw new kt;var r=p(arguments,1);return Ft(function(){n.apply(v,r);

},1)}function Pr(n,r){if(!In(n))throw new kt;var t=p(arguments,2);return Ft(function(){n.apply(v,t)},r)}function Kr(n,r){if(!In(n))throw new kt;var t=function(){var e=t.cache,u=r?r.apply(this,arguments):m+arguments[0];return Tt.call(e,u)?e[u]:e[u]=n.apply(this,arguments)};return t.cache={},t}function Ur(n){var r,t;if(!In(n))throw new kt;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}}function Mr(n){return an(n,16,p(arguments,1))}function Vr(n){return an(n,32,null,p(arguments,1));

}function Gr(n,r,t){var e=!0,u=!0;if(!In(n))throw new kt;return t===!1?e=!1:Sn(t)&&(e="leading"in t?t.leading:e,u="trailing"in t?t.trailing:u),U.leading=e,U.maxWait=r,U.trailing=u,zr(n,r,U)}function Hr(n,r){return an(r,16,[n])}function Jr(n){return function(){return n}}function Qr(n,r,t){var e=typeof n;if(null==n||"function"==e)return Q(n,r,t);if("object"!=e)return tt(n);var u=ne(n),o=u[0],a=n[o];return 1!=u.length||a!==a||Sn(a)?function(r){for(var t=u.length,e=!1;t--&&(e=rn(r[u[t]],n[u[t]],null,!0)););
return e}:function(n){var r=n[o];return a===r&&(0!==a||1/a==1/r)}}function Xr(n){return null==n?"":jt(n).replace(ue,fn)}function Yr(n){return n}function Zr(n,r,t){var e=!0,u=r&&wn(r);r&&(t||u.length)||(null==t&&(t=r),o=g,r=n,n=h,u=wn(r)),t===!1?e=!1:Sn(t)&&"chain"in t&&(e=t.chain);var o=n,a=In(o);Xn(u,function(t){var u=n[t]=r[t];a&&(o.prototype[t]=function(){var r=this.__chain__,t=this.__wrapped__,a=[t];$t.apply(a,arguments);var i=u.apply(n,a);if(e||r){if(t===i&&Sn(i))return this;i=new o(i),i.__chain__=r;

}return i})})}function nt(){return t._=Ot,this}function rt(){}function tt(n){return function(r){return r[n]}}function et(n,r,t){var e=null==n,u=null==r;if(null==t&&("boolean"==typeof n&&u?(t=n,n=1):u||"boolean"!=typeof r||(t=r,u=!0)),e&&u&&(r=1),n=+n||0,u?(r=n,n=0):r=+r||0,t||n%1||r%1){var o=Ht();return Vt(n+o*(r-n+parseFloat("1e-"+((o+"").length-1))),r)}return en(n,r)}function ut(n,r){if(n){var t=n[r];return In(t)?n[r]():t}}function ot(n,r,t){var e=h.templateSettings;n=jt(n||""),t=ae({},t,e);var u,o=ae({},t.imports,e.imports),i=ne(o),f=Un(o),l=0,c=t.interpolate||E,p="__p += '",s=wt((t.escape||E).source+"|"+c.source+"|"+(c===N?x:E).source+"|"+(t.evaluate||E).source+"|$","g");

n.replace(s,function(r,t,e,o,i,f){return e||(e=o),p+=n.slice(l,f).replace(S,a),t&&(p+="' +\n__e("+t+") +\n'"),i&&(u=!0,p+="';\n"+i+";\n__p += '"),e&&(p+="' +\n((__t = ("+e+")) == null ? '' : __t) +\n'"),l=f+r.length,r}),p+="';\n";var g=t.variable,y=g;y||(g="obj",p="with ("+g+") {\n"+p+"\n}\n"),p=(u?p.replace(w,""):p).replace(j,"$1").replace(k,"$1;"),p="function("+g+") {\n"+(y?"":g+" || ("+g+" = {});\n")+"var __t, __p = '', __e = _.escape"+(u?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+p+"return __p\n}";

var m="\n/*\n//# sourceURL="+(t.sourceURL||"/lodash/template/source["+D++ +"]")+"\n*/";try{var b=mt(i,"return "+p+m).apply(v,f)}catch(_){throw _.source=p,_}return r?b(r):(b.source=p,b)}function at(n,r,t){n=(n=+n)>-1?n:0;var e=-1,u=ht(n);for(r=Q(r,t,1);++e<n;)u[e]=r(e);return u}function it(n){return null==n?"":jt(n).replace(ee,sn)}function ft(n){var r=++y;return jt(null==n?"":n)+r}function lt(n){return n=new g(n),n.__chain__=!0,n}function ct(n,r){return r(n),n}function pt(){return this.__chain__=!0,
this}function st(){return jt(this.__wrapped__)}function vt(){return this.__wrapped__}t=t?Z.defaults(H.Object(),t,Z.pick(H,A)):H;var ht=t.Array,gt=t.Boolean,yt=t.Date,mt=t.Function,bt=t.Math,_t=t.Number,dt=t.Object,wt=t.RegExp,jt=t.String,kt=t.TypeError,xt=[],Ct=dt.prototype,Ot=t._,Nt=Ct.toString,Rt=wt("^"+jt(Nt).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),Et=bt.ceil,It=t.clearTimeout,St=bt.floor,At=mt.prototype.toString,Dt=cn(Dt=dt.getPrototypeOf)&&Dt,Tt=Ct.hasOwnProperty,$t=xt.push,Ft=t.setTimeout,Bt=xt.splice,Wt=xt.unshift,qt=function(){
try{var n={},r=cn(r=dt.defineProperty)&&r,t=r(n,n,n)&&r}catch(e){}return t}(),zt=cn(zt=dt.create)&&zt,Lt=cn(Lt=ht.isArray)&&Lt,Pt=t.isFinite,Kt=t.isNaN,Ut=cn(Ut=dt.keys)&&Ut,Mt=bt.max,Vt=bt.min,Gt=t.parseInt,Ht=bt.random,Jt={};Jt[$]=ht,Jt[F]=gt,Jt[B]=yt,Jt[W]=mt,Jt[z]=dt,Jt[q]=_t,Jt[L]=wt,Jt[P]=jt,g.prototype=h.prototype;var Qt=h.support={};Qt.funcDecomp=!cn(t.WinRTError)&&I.test(s),Qt.funcNames="string"==typeof mt.name,h.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,
variable:"",imports:{_:h}},zt||(J=function(){function n(){}return function(r){if(Sn(r)){n.prototype=r;var e=new n;n.prototype=null}return e||t.Object()}}());var Xt=qt?function(n,r){M.value=r,qt(n,"__bindData__",M),M.value=null}:rt,Yt=Lt||function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Nt.call(n)==$||!1},Zt=function(n){var r,t=n,e=[];if(!t)return e;if(!V[typeof n])return e;for(r in t)Tt.call(t,r)&&e.push(r);return e},ne=Ut?function(n){return Sn(n)?Ut(n):[]}:Zt,re={"&":"&amp;",
"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},te=kn(re),ee=wt("("+ne(te).join("|")+")","g"),ue=wt("["+ne(re).join("")+"]","g"),oe=function(n,r,t){var e,u=n,o=u;if(!u)return o;var a=arguments,i=0,f="number"==typeof t?2:a.length;if(f>3&&"function"==typeof a[f-2])var l=Q(a[--f-1],a[f--],2);else f>2&&"function"==typeof a[f-1]&&(l=a[--f]);for(;++i<f;)if(u=a[i],u&&V[typeof u])for(var c=-1,p=V[typeof u]&&ne(u),s=p?p.length:0;++c<s;)e=p[c],o[e]=l?l(o[e],u[e]):u[e];return o},ae=function(n,r,t){var e,u=n,o=u;

if(!u)return o;for(var a=arguments,i=0,f="number"==typeof t?2:a.length;++i<f;)if(u=a[i],u&&V[typeof u])for(var l=-1,c=V[typeof u]&&ne(u),p=c?c.length:0;++l<p;)e=c[l],"undefined"==typeof o[e]&&(o[e]=u[e]);return o},ie=function(n,r,t){var e,u=n,o=u;if(!u)return o;if(!V[typeof u])return o;r=r&&"undefined"==typeof t?r:Q(r,t,3);for(e in u)if(r(u[e],e,n)===!1)return o;return o},fe=function(n,r,t){var e,u=n,o=u;if(!u)return o;if(!V[typeof u])return o;r=r&&"undefined"==typeof t?r:Q(r,t,3);for(var a=-1,i=V[typeof u]&&ne(u),f=i?i.length:0;++a<f;)if(e=i[a],
r(u[e],e,n)===!1)return o;return o},le=Dt?function(n){if(!n||Nt.call(n)!=z)return!1;var r=n.valueOf,t=cn(r)&&(t=Dt(r))&&Dt(t);return t?n==t||Dt(n)==t:pn(n)}:pn,ce=on(function(n,r,t){Tt.call(n,t)?n[t]++:n[t]=1}),pe=on(function(n,r,t){(Tt.call(n,t)?n[t]:n[t]=[]).push(r)}),se=on(function(n,r,t){n[t]=r}),ve=nr,he=Hn,ge=cn(ge=yt.now)&&ge||function(){return(new yt).getTime()},ye=8==Gt(d+"08")?Gt:function(n,r){return Gt(Fn(n)?n.replace(R,""):n,r||0)};return h.after=Tr,h.assign=oe,h.at=Mn,h.bind=$r,h.bindAll=Fr,
h.bindKey=Br,h.chain=lt,h.compact=sr,h.compose=Wr,h.constant=Jr,h.countBy=ce,h.create=yn,h.createCallback=Qr,h.curry=qr,h.debounce=zr,h.defaults=ae,h.defer=Lr,h.delay=Pr,h.difference=vr,h.filter=Hn,h.flatten=mr,h.forEach=Xn,h.forEachRight=Yn,h.forIn=ie,h.forInRight=_n,h.forOwn=fe,h.forOwnRight=dn,h.functions=wn,h.groupBy=pe,h.indexBy=se,h.initial=_r,h.intersection=dr,h.invert=kn,h.invoke=Zn,h.keys=ne,h.map=nr,h.mapValues=Wn,h.max=rr,h.memoize=Kr,h.merge=qn,h.min=tr,h.omit=zn,h.once=Ur,h.pairs=Ln,
h.partial=Mr,h.partialRight=Vr,h.pick=Pn,h.pluck=ve,h.property=tt,h.pull=kr,h.range=xr,h.reject=or,h.remove=Cr,h.rest=Or,h.shuffle=ir,h.sortBy=cr,h.tap=ct,h.throttle=Gr,h.times=at,h.toArray=pr,h.transform=Kn,h.union=Rr,h.uniq=Er,h.values=Un,h.where=he,h.without=Ir,h.wrap=Hr,h.xor=Sr,h.zip=Ar,h.zipObject=Dr,h.collect=nr,h.drop=Or,h.each=Xn,h.eachRight=Yn,h.extend=oe,h.methods=wn,h.object=Dr,h.select=Hn,h.tail=Or,h.unique=Er,h.unzip=Ar,Zr(h),h.clone=hn,h.cloneDeep=gn,h.contains=Vn,h.escape=Xr,h.every=Gn,
h.find=Jn,h.findIndex=hr,h.findKey=mn,h.findLast=Qn,h.findLastIndex=gr,h.findLastKey=bn,h.has=jn,h.identity=Yr,h.indexOf=br,h.isArguments=vn,h.isArray=Yt,h.isBoolean=xn,h.isDate=Cn,h.isElement=On,h.isEmpty=Nn,h.isEqual=Rn,h.isFinite=En,h.isFunction=In,h.isNaN=An,h.isNull=Dn,h.isNumber=Tn,h.isObject=Sn,h.isPlainObject=le,h.isRegExp=$n,h.isString=Fn,h.isUndefined=Bn,h.lastIndexOf=jr,h.mixin=Zr,h.noConflict=nt,h.noop=rt,h.now=ge,h.parseInt=ye,h.random=et,h.reduce=er,h.reduceRight=ur,h.result=ut,h.runInContext=s,
h.size=fr,h.some=lr,h.sortedIndex=Nr,h.template=ot,h.unescape=it,h.uniqueId=ft,h.all=Gn,h.any=lr,h.detect=Jn,h.findWhere=Jn,h.foldl=er,h.foldr=ur,h.include=Vn,h.inject=er,Zr(function(){var n={};return fe(h,function(r,t){h.prototype[t]||(n[t]=r)}),n}(),!1),h.first=yr,h.last=wr,h.sample=ar,h.take=yr,h.head=yr,fe(h,function(n,r){var t="sample"!==r;h.prototype[r]||(h.prototype[r]=function(r,e){var u=this.__chain__,o=n(this.__wrapped__,r,e);return u||null!=r&&(!e||t&&"function"==typeof r)?new g(o,u):o;

})}),h.VERSION="2.4.2",h.prototype.chain=pt,h.prototype.toString=st,h.prototype.value=vt,h.prototype.valueOf=vt,Xn(["join","pop","shift"],function(n){var r=xt[n];h.prototype[n]=function(){var n=this.__chain__,t=r.apply(this.__wrapped__,arguments);return n?new g(t,n):t}}),Xn(["push","reverse","sort","unshift"],function(n){var r=xt[n];h.prototype[n]=function(){return r.apply(this.__wrapped__,arguments),this}}),Xn(["concat","slice","splice"],function(n){var r=xt[n];h.prototype[n]=function(){return new g(r.apply(this.__wrapped__,arguments),this.__chain__);

}}),h}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" 	\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p \+= '';/g,j=/\b(__p \+=) '' \+/g,k=/(__e\(.*?\)|\b__t\)) \+\n'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,R=RegExp("^["+d+"]*0+(?=.$)"),E=/($^)/,I=/\bthis\b/,S=/['\n\r\t\u2028\u2029\\]/g,A=["Array","Boolean","Date","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],D=0,T="[object Arguments]",$="[object Array]",F="[object Boolean]",B="[object Date]",W="[object Function]",q="[object Number]",z="[object Object]",L="[object RegExp]",P="[object String]",K={};

K[W]=!1,K[T]=K[$]=K[F]=K[B]=K[q]=K[z]=K[L]=K[P]=!0;var U={leading:!1,maxWait:0,trailing:!1},M={configurable:!1,enumerable:!1,value:null,writable:!1},V={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},G={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},H=V[typeof window]&&window||this,J=V[typeof exports]&&exports&&!exports.nodeType&&exports,Q=V[typeof module]&&module&&!module.nodeType&&module,X=Q&&Q.exports===J&&J,Y=V[typeof global]&&global;!Y||Y.global!==Y&&Y.window!==Y||(H=Y);

var Z=s();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(H._=Z,define(function(){return Z})):J&&Q?X?(Q.exports=Z)._=Z:J._=Z:H._=Z}).call(this);
"use strict";var directiveModule=angular.module("angularjs-dropdown-multiselect",[]);directiveModule.directive("ngDropdownMultiselect",["$filter","$document","$compile","$parse",function($filter,$document){return{restrict:"AE",scope:{selectedModel:"=",options:"=",extraSettings:"=",events:"=",searchFilter:"=?",translationTexts:"=",groupBy:"@"},template:function(element,attrs){var checkboxes=attrs.checkboxes?!0:!1,groups=attrs.groupBy?!0:!1,template='<div class="multiselect-parent btn-group dropdown-multiselect">';template+='<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>',template+="<ul class=\"dropdown-menu dropdown-menu-form\" ng-style=\"{display: open ? 'block' : 'none', height : settings.scrollable ? settings.scrollableHeight : 'auto' }\" style=\"overflow: scroll\" >",template+='<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>',template+='<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>',template+='<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>',template+='<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>',template+='<li ng-show="settings.enableSearch" class="divider"></li>',groups?(template+='<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>',template+='<li ng-repeat-end role="presentation">'):template+='<li role="presentation" ng-repeat="option in options | filter: searchFilter">',template+='<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">',template+=checkboxes?'<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>':"<span data-ng-class=\"{'glyphicon glyphicon-ok': isChecked(getPropertyForObject(option,settings.idProp))}\"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>",template+="</li>",template+='<li class="divider" ng-show="settings.selectionLimit > 1"></li>',template+='<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>',template+="</ul>",template+="</div>",element.html(template)},link:function($scope,$element,$attrs){function getFindObj(id){var findObj={};return""===$scope.settings.externalIdProp?findObj[$scope.settings.idProp]=id:findObj[$scope.settings.externalIdProp]=id,findObj}function clearObject(object){for(var prop in object)delete object[prop]}var $dropdownTrigger=$element.children()[0];$scope.toggleDropdown=function(){$scope.open=!$scope.open},$scope.checkboxClick=function($event,id){$scope.setSelectedItem(id),$event.stopImmediatePropagation()},$scope.externalEvents={onItemSelect:angular.noop,onItemDeselect:angular.noop,onSelectAll:angular.noop,onDeselectAll:angular.noop,onInitDone:angular.noop,onMaxSelectionReached:angular.noop},$scope.settings={dynamicTitle:!0,scrollable:!1,scrollableHeight:"300px",closeOnBlur:!0,displayProp:"label",idProp:"id",externalIdProp:"id",enableSearch:!1,selectionLimit:0,showCheckAll:!0,showUncheckAll:!0,closeOnSelect:!1,buttonClasses:"btn btn-default",closeOnDeselect:!1,groupBy:$attrs.groupBy||void 0,groupByTextProvider:null,smartButtonMaxItems:0,smartButtonTextConverter:angular.noop},$scope.texts={checkAll:"Check All",uncheckAll:"Uncheck All",selectionCount:"checked",selectionOf:"/",searchPlaceholder:"Search...",buttonDefaultText:"Select",dynamicButtonTextSuffix:"checked"},$scope.searchFilter=$scope.searchFilter||"",angular.isDefined($scope.settings.groupBy)&&$scope.$watch("options",function(newValue){angular.isDefined(newValue)&&($scope.orderedItems=$filter("orderBy")(newValue,$scope.settings.groupBy))}),angular.extend($scope.settings,$scope.extraSettings||[]),angular.extend($scope.externalEvents,$scope.events||[]),angular.extend($scope.texts,$scope.translationTexts),$scope.singleSelection=1===$scope.settings.selectionLimit,$scope.singleSelection&&angular.isArray($scope.selectedModel)&&0===$scope.selectedModel.length&&clearObject($scope.selectedModel),$scope.settings.closeOnBlur&&$document.on("click",function(e){for(var target=e.target.parentElement,parentFound=!1;angular.isDefined(target)&&null!==target&&!parentFound;)_.contains(target.className.split(" "),"multiselect-parent")&&!parentFound&&target===$dropdownTrigger&&(parentFound=!0),target=target.parentElement;parentFound||$scope.$apply(function(){$scope.open=!1})}),$scope.getGroupTitle=function(groupValue){return null!==$scope.settings.groupByTextProvider?$scope.settings.groupByTextProvider(groupValue):groupValue},$scope.getButtonText=function(){if($scope.settings.dynamicTitle&&($scope.selectedModel.length>0||angular.isObject($scope.selectedModel)&&_.keys($scope.selectedModel).length>0)){if($scope.settings.smartButtonMaxItems>0){var itemsText=[];return angular.forEach($scope.options,function(optionItem){if($scope.isChecked($scope.getPropertyForObject(optionItem,$scope.settings.idProp))){var displayText=$scope.getPropertyForObject(optionItem,$scope.settings.displayProp),converterResponse=$scope.settings.smartButtonTextConverter(displayText,optionItem);itemsText.push(converterResponse?converterResponse:displayText)}}),$scope.selectedModel.length>$scope.settings.smartButtonMaxItems&&(itemsText=itemsText.slice(0,$scope.settings.smartButtonMaxItems),itemsText.push("...")),itemsText.join(", ")}var totalSelected;return totalSelected=$scope.singleSelection?null!==$scope.selectedModel&&angular.isDefined($scope.selectedModel[$scope.settings.idProp])?1:0:angular.isDefined($scope.selectedModel)?$scope.selectedModel.length:0,0===totalSelected?$scope.texts.buttonDefaultText:totalSelected+" "+$scope.texts.dynamicButtonTextSuffix}return $scope.texts.buttonDefaultText},$scope.getPropertyForObject=function(object,property){return angular.isDefined(object)&&object.hasOwnProperty(property)?object[property]:""},$scope.selectAll=function(){$scope.deselectAll(!1),$scope.externalEvents.onSelectAll(),angular.forEach($scope.options,function(value){$scope.setSelectedItem(value[$scope.settings.idProp],!0)})},$scope.deselectAll=function(sendEvent){sendEvent=sendEvent||!0,sendEvent&&$scope.externalEvents.onDeselectAll(),$scope.singleSelection?clearObject($scope.selectedModel):$scope.selectedModel.splice(0,$scope.selectedModel.length)},$scope.setSelectedItem=function(id,dontRemove){var findObj=getFindObj(id),finalObj=null;if(finalObj=""===$scope.settings.externalIdProp?_.find($scope.options,findObj):findObj,$scope.singleSelection)return clearObject($scope.selectedModel),angular.extend($scope.selectedModel,finalObj),void $scope.externalEvents.onItemSelect(finalObj);dontRemove=dontRemove||!1;var exists=-1!==_.findIndex($scope.selectedModel,findObj);!dontRemove&&exists?($scope.selectedModel.splice(_.findIndex($scope.selectedModel,findObj),1),$scope.externalEvents.onItemDeselect(findObj)):!exists&&(0===$scope.settings.selectionLimit||$scope.selectedModel.length<$scope.settings.selectionLimit)&&($scope.selectedModel.push(finalObj),$scope.externalEvents.onItemSelect(finalObj))},$scope.isChecked=function(id){return $scope.singleSelection?null!==$scope.selectedModel&&angular.isDefined($scope.selectedModel[$scope.settings.idProp])&&$scope.selectedModel[$scope.settings.idProp]===getFindObj(id)[$scope.settings.idProp]:-1!==_.findIndex($scope.selectedModel,getFindObj(id))},$scope.externalEvents.onInitDone()}}}]);

/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    var module;
    try {
        module = angular.module(moduleName);
    } catch(err) {
        // named module does not exist, so create one
        module = angular.module(moduleName, []);
    }

    module
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider)
        .run(['$templateCache',dirPaginationControlsTemplateInstaller]);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs){

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRepeat.js#L211
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:[^|\)]*/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs){

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled =  $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function() {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    scope.$watchCollection(function() {
                        return collectionGetter(scope);
                    }, function(collection) {
                        if (collection) {
                            paginationService.setCollectionLength(paginationId, collection.length);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:[^|]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // if the current-page attribute was not set, we'll make our own
                var defaultCurrentPage = paginationId + '__currentPage';
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsTemplateInstaller($templateCache) {
        $templateCache.put('angularUtils.directives.dirPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        return {
            restrict: 'AE',
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            },
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?',
                autoHide: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId ||  DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                console.warn('Pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive, which was not found at link time.');
            }

            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.autoHide = scope.autoHide === undefined ? true : scope.autoHide;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }
            }, function(length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getItemsPerPage(paginationId));
                }
            }, function(current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return paginationService.getCurrentPage(paginationId);
                }
            }, function(currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    num = parseInt(num, 10);
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            /**
             * Custom "track by" function which allows for duplicate "..." entries on long lists,
             * yet fixes the problem of wrongly-highlighted links which happens when using
             * "track by $index" - see https://github.com/michaelbromley/angularUtils/issues/153
             * @param id
             * @param index
             * @returns {string}
             */
            scope.tracker = function(id, index) {
                return id + '_' + index;
            };

            function goToPage(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as an argument
                    if (scope.onPageChange) {
                        scope.onPageChange({ newPageNumber : num });
                    }
                }
            }

            function generatePagination() {
                if (paginationService.isRegistered(paginationId)) {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;
                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                if (paginationService.isRegistered(paginationId)) {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }
            }
            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (collection instanceof Array) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                return collection.slice(start, end);
            } else {
                return collection;
            }
        };
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'angularUtils.directives.dirPagination.template';

        this.setPath = function(path) {
            templatePath = path;
        };

        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                }
            };
        };
    }
})();

/*! 5.0.9 */
!function(){function a(a,b){window.XMLHttpRequest.prototype[a]=b(window.XMLHttpRequest.prototype[a])}function b(a,b,c){try{Object.defineProperty(a,b,{get:c})}catch(d){}}if(window.FileAPI||(window.FileAPI={}),FileAPI.shouldLoad=window.XMLHttpRequest&&!window.FormData||FileAPI.forceLoad,FileAPI.shouldLoad){var c=function(a){if(!a.__listeners){a.upload||(a.upload={}),a.__listeners=[];var b=a.upload.addEventListener;a.upload.addEventListener=function(c,d){a.__listeners[c]=d,b&&b.apply(this,arguments)}}};a("open",function(a){return function(b,d,e){c(this),this.__url=d;try{a.apply(this,[b,d,e])}catch(f){f.message.indexOf("Access is denied")>-1&&(this.__origError=f,a.apply(this,[b,"_fix_for_ie_crossdomain__",e]))}}}),a("getResponseHeader",function(a){return function(b){return this.__fileApiXHR&&this.__fileApiXHR.getResponseHeader?this.__fileApiXHR.getResponseHeader(b):null==a?null:a.apply(this,[b])}}),a("getAllResponseHeaders",function(a){return function(){return this.__fileApiXHR&&this.__fileApiXHR.getAllResponseHeaders?this.__fileApiXHR.getAllResponseHeaders():null==a?null:a.apply(this)}}),a("abort",function(a){return function(){return this.__fileApiXHR&&this.__fileApiXHR.abort?this.__fileApiXHR.abort():null==a?null:a.apply(this)}}),a("setRequestHeader",function(a){return function(b,d){if("__setXHR_"===b){c(this);var e=d(this);e instanceof Function&&e(this)}else this.__requestHeaders=this.__requestHeaders||{},this.__requestHeaders[b]=d,a.apply(this,arguments)}}),a("send",function(a){return function(){var c=this;if(arguments[0]&&arguments[0].__isFileAPIShim){var d=arguments[0],e={url:c.__url,jsonp:!1,cache:!0,complete:function(a,d){c.__completed=!0,!a&&c.__listeners.load&&c.__listeners.load({type:"load",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),!a&&c.__listeners.loadend&&c.__listeners.loadend({type:"loadend",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),"abort"===a&&c.__listeners.abort&&c.__listeners.abort({type:"abort",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),void 0!==d.status&&b(c,"status",function(){return 0===d.status&&a&&"abort"!==a?500:d.status}),void 0!==d.statusText&&b(c,"statusText",function(){return d.statusText}),b(c,"readyState",function(){return 4}),void 0!==d.response&&b(c,"response",function(){return d.response});var e=d.responseText||(a&&0===d.status&&"abort"!==a?a:void 0);b(c,"responseText",function(){return e}),b(c,"response",function(){return e}),a&&b(c,"err",function(){return a}),c.__fileApiXHR=d,c.onreadystatechange&&c.onreadystatechange(),c.onload&&c.onload()},progress:function(a){if(a.target=c,c.__listeners.progress&&c.__listeners.progress(a),c.__total=a.total,c.__loaded=a.loaded,a.total===a.loaded){var b=this;setTimeout(function(){c.__completed||(c.getAllResponseHeaders=function(){},b.complete(null,{status:204,statusText:"No Content"}))},FileAPI.noContentTimeout||1e4)}},headers:c.__requestHeaders};e.data={},e.files={};for(var f=0;f<d.data.length;f++){var g=d.data[f];null!=g.val&&null!=g.val.name&&null!=g.val.size&&null!=g.val.type?e.files[g.key]=g.val:e.data[g.key]=g.val}setTimeout(function(){if(!FileAPI.hasFlash)throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';c.__fileApiXHR=FileAPI.upload(e)},1)}else{if(this.__origError)throw this.__origError;a.apply(c,arguments)}}}),window.XMLHttpRequest.__isFileAPIShim=!0,window.FormData=FormData=function(){return{append:function(a,b,c){b.__isFileAPIBlobShim&&(b=b.data[0]),this.data.push({key:a,val:b,name:c})},data:[],__isFileAPIShim:!0}},window.Blob=Blob=function(a){return{data:a,__isFileAPIBlobShim:!0}}}}(),function(){function a(a){return"input"===a[0].tagName.toLowerCase()&&a.attr("type")&&"file"===a.attr("type").toLowerCase()}function b(){try{var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(a)return!0}catch(b){if(void 0!==navigator.mimeTypes["application/x-shockwave-flash"])return!0}return!1}function c(a){var b=0,c=0;if(window.jQuery)return jQuery(a).offset();if(a.offsetParent)do b+=a.offsetLeft-a.scrollLeft,c+=a.offsetTop-a.scrollTop,a=a.offsetParent;while(a);return{left:b,top:c}}if(FileAPI.shouldLoad){if(FileAPI.forceLoad&&(FileAPI.html5=!1),!FileAPI.upload){var d,e,f,g,h,i=document.createElement("script"),j=document.getElementsByTagName("script");if(window.FileAPI.jsUrl)d=window.FileAPI.jsUrl;else if(window.FileAPI.jsPath)e=window.FileAPI.jsPath;else for(f=0;f<j.length;f++)if(h=j[f].src,g=h.search(/\/ng\-file\-upload[\-a-zA-z0-9\.]*\.js/),g>-1){e=h.substring(0,g+1);break}null==FileAPI.staticPath&&(FileAPI.staticPath=e),i.setAttribute("src",d||e+"FileAPI.min.js"),document.getElementsByTagName("head")[0].appendChild(i),FileAPI.hasFlash=b()}FileAPI.ngfFixIE=function(d,e,f,g){if(!b())throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';var h=function(){if(d.attr("disabled"))d.$$ngfRefElem.removeClass("js-fileapi-wrapper");else{var b=d.$$ngfRefElem;b?f(d.$$ngfRefElem):(b=d.$$ngfRefElem=e(),b.addClass("js-fileapi-wrapper"),!a(d),setTimeout(function(){b.bind("mouseenter",h)},10),b.bind("change",function(a){i.apply(this,[a]),g.apply(this,[a])})),a(d)||b.css("position","absolute").css("top",c(d[0]).top+"px").css("left",c(d[0]).left+"px").css("width",d[0].offsetWidth+"px").css("height",d[0].offsetHeight+"px").css("filter","alpha(opacity=0)").css("display",d.css("display")).css("overflow","hidden").css("z-index","900000").css("visibility","visible")}};d.bind("mouseenter",h);var i=function(a){for(var b=FileAPI.getFiles(a),c=0;c<b.length;c++)void 0===b[c].size&&(b[c].size=0),void 0===b[c].name&&(b[c].name="file"),void 0===b[c].type&&(b[c].type="undefined");a.target||(a.target={}),a.target.files=b,a.target.files!==b&&(a.__files_=b),(a.__files_||a.target.files).item=function(b){return(a.__files_||a.target.files)[b]||null}}},FileAPI.disableFileInput=function(a,b){b?a.removeClass("js-fileapi-wrapper"):a.addClass("js-fileapi-wrapper")}}}(),window.FileReader||(window.FileReader=function(){var a=this,b=!1;this.listeners={},this.addEventListener=function(b,c){a.listeners[b]=a.listeners[b]||[],a.listeners[b].push(c)},this.removeEventListener=function(b,c){a.listeners[b]&&a.listeners[b].splice(a.listeners[b].indexOf(c),1)},this.dispatchEvent=function(b){var c=a.listeners[b.type];if(c)for(var d=0;d<c.length;d++)c[d].call(a,b)},this.onabort=this.onerror=this.onload=this.onloadstart=this.onloadend=this.onprogress=null;var c=function(b,c){var d={type:b,target:a,loaded:c.loaded,total:c.total,error:c.error};return null!=c.result&&(d.target.result=c.result),d},d=function(d){b||(b=!0,a.onloadstart&&a.onloadstart(c("loadstart",d)));var e;"load"===d.type?(a.onloadend&&a.onloadend(c("loadend",d)),e=c("load",d),a.onload&&a.onload(e),a.dispatchEvent(e)):"progress"===d.type?(e=c("progress",d),a.onprogress&&a.onprogress(e),a.dispatchEvent(e)):(e=c("error",d),a.onerror&&a.onerror(e),a.dispatchEvent(e))};this.readAsArrayBuffer=function(a){FileAPI.readAsBinaryString(a,d)},this.readAsBinaryString=function(a){FileAPI.readAsBinaryString(a,d)},this.readAsDataURL=function(a){FileAPI.readAsDataURL(a,d)},this.readAsText=function(a){FileAPI.readAsText(a,d)}});
/*! 5.0.9 */
!window.XMLHttpRequest||window.FileAPI&&FileAPI.shouldLoad||(window.XMLHttpRequest.prototype.setRequestHeader=function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}}(window.XMLHttpRequest.prototype.setRequestHeader));var ngFileUpload=angular.module("ngFileUpload",[]);ngFileUpload.version="5.0.9",ngFileUpload.service("Upload",["$http","$q","$timeout",function(a,b,c){function d(d){d.method=d.method||"POST",d.headers=d.headers||{};var e=b.defer(),f=e.promise;return d.headers.__setXHR_=function(){return function(a){a&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){a.config=d,e.notify?e.notify(a):f.progressFunc&&c(function(){f.progressFunc(a)})},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&(a.config=d,e.notify?e.notify(a):f.progressFunc&&c(function(){f.progressFunc(a)}))},!1))}},a(d).then(function(a){e.resolve(a)},function(a){e.reject(a)},function(a){e.notify(a)}),f.success=function(a){return f.then(function(b){a(b.data,b.status,b.headers,d)}),f},f.error=function(a){return f.then(null,function(b){a(b.data,b.status,b.headers,d)}),f},f.progress=function(a){return f.progressFunc=a,f.then(null,null,function(b){a(b)}),f},f.abort=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),f},f.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(f,arguments),a.apply(f,arguments)}}(d.xhrFn),f},f}this.upload=function(a){function b(c,d,e){if(void 0!==d)if(angular.isDate(d)&&(d=d.toISOString()),angular.isString(d))c.append(e,d);else if("form"===a.sendFieldsAs)if(angular.isObject(d))for(var f in d)d.hasOwnProperty(f)&&b(c,d[f],e+"["+f+"]");else c.append(e,d);else d=angular.isString(d)?d:JSON.stringify(d),"json-blob"===a.sendFieldsAs?c.append(e,new Blob([d],{type:"application/json"})):c.append(e,d)}return a.headers=a.headers||{},a.headers["Content-Type"]=void 0,a.transformRequest=a.transformRequest?angular.isArray(a.transformRequest)?a.transformRequest:[a.transformRequest]:[],a.transformRequest.push(function(c){var d,e=new FormData,f={};for(d in a.fields)a.fields.hasOwnProperty(d)&&(f[d]=a.fields[d]);c&&(f.data=c);for(d in f)if(f.hasOwnProperty(d)){var g=f[d];a.formDataAppender?a.formDataAppender(e,d,g):b(e,g,d)}if(null!=a.file){var h=a.fileFormDataName||"file";if(angular.isArray(a.file))for(var i=angular.isString(h),j=0;j<a.file.length;j++)e.append(i?h:h[j],a.file[j],a.fileName&&a.fileName[j]||a.file[j].name);else e.append(h,a.file,a.fileName||a.file.name)}return e}),d(a)},this.http=function(b){return b.transformRequest=b.transformRequest||function(b){return window.ArrayBuffer&&b instanceof window.ArrayBuffer||b instanceof Blob?b:a.defaults.transformRequest[0](arguments)},d(b)}}]),function(){function a(a,e,f,g,h,i,j){function k(){return"input"===e[0].tagName.toLowerCase()&&f.type&&"file"===f.type.toLowerCase()}function l(b){if(!r){r=!0;try{for(var e=b.__files_||b.target&&b.target.files,j=[],k=[],l=0;l<e.length;l++){var m=e.item(l);c(a,h,f,m,b)?j.push(m):k.push(m)}d(h,i,a,g,f,f.ngfChange||f.ngfSelect,j,k,b),0===j.length&&(b.target.value=j)}finally{r=!1}}}function m(b){f.ngfMultiple&&b.attr("multiple",h(f.ngfMultiple)(a)),f.ngfCapture&&b.attr("capture",h(f.ngfCapture)(a)),f.accept&&b.attr("accept",f.accept);for(var c=0;c<e[0].attributes.length;c++){var d=e[0].attributes[c];(k()&&"type"!==d.name||"type"!==d.name&&"class"!==d.name&&"id"!==d.name&&"style"!==d.name)&&b.attr(d.name,d.value)}}function n(b,c){if(!c&&(b||k()))return e.$$ngfRefElem||e;var d=angular.element('<input type="file">');return m(d),k()?(e.replaceWith(d),e=d,d.attr("__ngf_gen__",!0),j(e)(a)):(d.css("visibility","hidden").css("position","absolute").css("overflow","hidden").css("width","0px").css("height","0px").css("z-index","-100000").css("border","none").css("margin","0px").css("padding","0px").attr("tabindex","-1"),e.$$ngfRefElem&&e.$$ngfRefElem.remove(),e.$$ngfRefElem=d,document.body.appendChild(d[0])),d}function o(b){d(h,i,a,g,f,f.ngfChange||f.ngfSelect,[],[],b,!0)}function p(c){function d(a){a&&i[0].click(),(k()||!a)&&e.bind("click touchend",p)}if(e.attr("disabled")||q)return!1;null!=c&&(c.preventDefault(),c.stopPropagation());var g=h(f.ngfResetOnClick)(a)!==!1,i=n(c,g);return i&&((!c||g)&&i.bind("change",l),c&&g&&h(f.ngfResetModelOnClick)(a)!==!1&&o(c),b(navigator.userAgent)?setTimeout(function(){d(c)},0):d(c)),!1}if(!e.attr("__ngf_gen__")){a.$on("$destroy",function(){e.$$ngfRefElem&&e.$$ngfRefElem.remove()});var q=!1;-1===f.ngfSelect.search(/\W+$files\W+/)&&a.$watch(f.ngfSelect,function(a){q=a===!1});var r=!1;window.FileAPI&&window.FileAPI.ngfFixIE?window.FileAPI.ngfFixIE(e,n,m,l):p()}}function b(a){var b=a.match(/Android[^\d]*(\d+)\.(\d+)/);return b&&b.length>2?parseInt(b[1])<4||4===parseInt(b[1])&&parseInt(b[2])<4:/.*Windows.*Safari.*/.test(a)}ngFileUpload.directive("ngfSelect",["$parse","$timeout","$compile",function(b,c,d){return{restrict:"AEC",require:"?ngModel",link:function(e,f,g,h){a(e,f,g,h,b,c,d)}}}]),ngFileUpload.validate=function(a,b,c,d,e){function f(a){if(a.length>2&&"/"===a[0]&&"/"===a[a.length-1])return a.substring(1,a.length-1);var b=a.split(","),c="";if(b.length>1)for(var d=0;d<b.length;d++)c+="("+f(b[d])+")",d<b.length-1&&(c+="|");else 0===a.indexOf(".")&&(a="*"+a),c="^"+a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",c=c.replace(/\\\*/g,".*").replace(/\\\?/g,".");return c}var g=b(c.ngfAccept)(a,{$file:d,$event:e}),h=b(c.ngfMaxSize)(a,{$file:d,$event:e})||9007199254740991,i=b(c.ngfMinSize)(a,{$file:d,$event:e})||-1;if(null!=g&&angular.isString(g)){var j=new RegExp(f(g),"gi");g=null!=d.type&&j.test(d.type.toLowerCase())||null!=d.name&&j.test(d.name.toLowerCase())}return(null==g||g)&&(null==d.size||d.size<h&&d.size>i)},ngFileUpload.updateModel=function(a,b,c,d,e,f,g,h,i,j){function k(){if(a(e.ngfKeep)(c)===!0){var j=(d.$modelValue||[]).slice(0);if(g&&g.length)if(a(e.ngfKeepDistinct)(c)===!0){for(var k=j.length,l=0;l<g.length;l++){for(var m=0;k>m&&g[l].name!==j[m].name;m++);m===k&&j.push(g[l])}g=j}else g=j.concat(g);else g=j}d&&(a(e.ngModel).assign(c,g),b(function(){d&&d.$setViewValue(null!=g&&0===g.length?null:g)})),e.ngModelRejected&&a(e.ngModelRejected).assign(c,h),f&&a(f)(c,{$files:g,$rejectedFiles:h,$event:i})}j?k():b(function(){k()})};var c=ngFileUpload.validate,d=ngFileUpload.updateModel}(),function(){function a(a,e,f,g,h,i,j){function k(a,b,d){var e=!0,f=d.dataTransfer.items;if(null!=f)for(var g=0;g<f.length&&e;g++)e=e&&("file"===f[g].kind||""===f[g].kind)&&c(a,h,b,f[g],d);var i=h(b.ngfDragOverClass)(a,{$event:d});return i&&(i.delay&&(r=i.delay),i.accept&&(i=e?i.accept:i.reject)),i||b.ngfDragOverClass||"dragover"}function l(b,d,e,g){function k(d){c(a,h,f,d,b)?m.push(d):n.push(d)}function l(a,b,c){if(null!=b)if(b.isDirectory){var d=(c||"")+b.name;k({name:b.name,type:"directory",path:d});var e=b.createReader(),f=[];p++;var g=function(){e.readEntries(function(d){try{if(d.length)f=f.concat(Array.prototype.slice.call(d||[],0)),g();else{for(var e=0;e<f.length;e++)l(a,f[e],(c?c:"")+b.name+"/");p--}}catch(h){p--,console.error(h)}},function(){p--})};g()}else p++,b.file(function(a){try{p--,a.path=(c?c:"")+a.name,k(a)}catch(b){p--,console.error(b)}},function(){p--})}var m=[],n=[],o=b.dataTransfer.items,p=0;if(o&&o.length>0&&"file"!==j.protocol())for(var q=0;q<o.length;q++){if(o[q].webkitGetAsEntry&&o[q].webkitGetAsEntry()&&o[q].webkitGetAsEntry().isDirectory){var r=o[q].webkitGetAsEntry();if(r.isDirectory&&!e)continue;null!=r&&l(m,r)}else{var s=o[q].getAsFile();null!=s&&k(s)}if(!g&&m.length>0)break}else{var t=b.dataTransfer.files;if(null!=t)for(var u=0;u<t.length&&(k(t.item(u)),g||!(m.length>0));u++);}var v=0;!function w(a){i(function(){if(p)10*v++<2e4&&w(10);else{if(!g&&m.length>1){for(q=0;"directory"===m[q].type;)q++;m=[m[q]]}d(m,n)}},a||0)}()}var m=b();if(f.dropAvailable&&i(function(){a[f.dropAvailable]?a[f.dropAvailable].value=m:a[f.dropAvailable]=m}),!m)return void(h(f.ngfHideOnDropNotAvailable)(a)===!0&&e.css("display","none"));var n=!1;-1===f.ngfDrop.search(/\W+$files\W+/)&&a.$watch(f.ngfDrop,function(a){n=a===!1});var o,p=null,q=h(f.ngfStopPropagation),r=1;e[0].addEventListener("dragover",function(b){if(!e.attr("disabled")&&!n){if(b.preventDefault(),q(a)&&b.stopPropagation(),navigator.userAgent.indexOf("Chrome")>-1){var c=b.dataTransfer.effectAllowed;b.dataTransfer.dropEffect="move"===c||"linkMove"===c?"move":"copy"}i.cancel(p),a.actualDragOverClass||(o=k(a,f,b)),e.addClass(o)}},!1),e[0].addEventListener("dragenter",function(b){e.attr("disabled")||n||(b.preventDefault(),q(a)&&b.stopPropagation())},!1),e[0].addEventListener("dragleave",function(){e.attr("disabled")||n||(p=i(function(){e.removeClass(o),o=null},r||1))},!1),e[0].addEventListener("drop",function(b){e.attr("disabled")||n||(b.preventDefault(),q(a)&&b.stopPropagation(),e.removeClass(o),o=null,l(b,function(c,e){d(h,i,a,g,f,f.ngfChange||f.ngfDrop,c,e,b)},h(f.ngfAllowDir)(a)!==!1,f.multiple||h(f.ngfMultiple)(a)))},!1)}function b(){var a=document.createElement("div");return"draggable"in a&&"ondrop"in a}var c=ngFileUpload.validate,d=ngFileUpload.updateModel;ngFileUpload.directive("ngfDrop",["$parse","$timeout","$location",function(b,c,d){return{restrict:"AEC",require:"?ngModel",link:function(e,f,g,h){a(e,f,g,h,b,c,d)}}}]),ngFileUpload.directive("ngfNoFileDrop",function(){return function(a,c){b()&&c.css("display","none")}}),ngFileUpload.directive("ngfDropAvailable",["$parse","$timeout",function(a,c){return function(d,e,f){if(b()){var g=a(f.ngfDropAvailable);c(function(){g(d),g.assign&&g.assign(d,!0)})}}}]),ngFileUpload.directive("ngfSrc",["$parse","$timeout",function(a,b){return{restrict:"AE",link:function(d,e,f){window.FileReader&&d.$watch(f.ngfSrc,function(g){g&&c(d,a,f,g,null)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||g.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||g.size<4e6)?b(function(){var a=window.URL||window.webkitURL;if(a&&a.createObjectURL)e.attr("src",a.createObjectURL(g));else{var c=new FileReader;c.readAsDataURL(g),c.onload=function(a){b(function(){e.attr("src",a.target.result)})}}}):e.attr("src",f.ngfDefaultSrc||"")})}}}])}();
/**
 * angular-ui-sortable - This directive allows you to jQueryUI Sortable.
 * @version v0.13.4 - 2015-06-07
 * @link http://angular-ui.github.com
 * @license MIT
 */

!function(a,b,c){"use strict";b.module("ui.sortable",[]).value("uiSortableConfig",{}).directive("uiSortable",["uiSortableConfig","$timeout","$log",function(a,d,e){return{require:"?ngModel",scope:{ngModel:"=",uiSortable:"="},link:function(f,g,h,i){function j(a,b){return b&&"function"==typeof b?function(){a.apply(this,arguments),b.apply(this,arguments)}:a}function k(a){var b=a.data("ui-sortable");return b&&"object"==typeof b&&"ui-sortable"===b.widgetFullName?b:null}function l(a,b){var c=a.sortable("option","helper");return"clone"===c||"function"==typeof c&&b.item.sortable.isCustomHelperUsed()}function m(a){return/left|right/.test(a.css("float"))||/inline|table-cell/.test(a.css("display"))}function n(a,b){for(var c=null,d=0;d<a.length;d++){var e=a[d];if(e.element[0]===b[0]){c=e.scope;break}}return c}function o(a,b){b.item.sortable._destroy()}var p,q={},r={"ui-floating":c},s={receive:null,remove:null,start:null,stop:null,update:null},t={helper:null};return b.extend(q,r,a,f.uiSortable),b.element.fn&&b.element.fn.jquery?(i?(f.$watch("ngModel.length",function(){d(function(){k(g)&&g.sortable("refresh")},0,!1)}),s.start=function(a,d){if("auto"===q["ui-floating"]){var e=d.item.siblings(),f=k(b.element(a.target));f.floating=m(e)}d.item.sortable={model:i.$modelValue[d.item.index()],index:d.item.index(),source:d.item.parent(),sourceModel:i.$modelValue,cancel:function(){d.item.sortable._isCanceled=!0},isCanceled:function(){return d.item.sortable._isCanceled},isCustomHelperUsed:function(){return!!d.item.sortable._isCustomHelperUsed},_isCanceled:!1,_isCustomHelperUsed:d.item.sortable._isCustomHelperUsed,_destroy:function(){b.forEach(d.item.sortable,function(a,b){d.item.sortable[b]=c})}}},s.activate=function(a,c){p=g.contents();var d=g.sortable("option","placeholder");if(d&&d.element&&"function"==typeof d.element){var e=d.element();e=b.element(e);var h=g.find('[class="'+e.attr("class")+'"]:not([ng-repeat], [data-ng-repeat])');p=p.not(h)}var i=c.item.sortable._connectedSortables||[];i.push({element:g,scope:f}),c.item.sortable._connectedSortables=i},s.update=function(a,b){if(!b.item.sortable.received){b.item.sortable.dropindex=b.item.index();var c=b.item.parent();b.item.sortable.droptarget=c;var d=n(b.item.sortable._connectedSortables,c);b.item.sortable.droptargetModel=d.ngModel,g.sortable("cancel")}l(g,b)&&!b.item.sortable.received&&"parent"===g.sortable("option","appendTo")&&(p=p.not(p.last())),p.appendTo(g),b.item.sortable.received&&(p=null),b.item.sortable.received&&!b.item.sortable.isCanceled()&&f.$apply(function(){i.$modelValue.splice(b.item.sortable.dropindex,0,b.item.sortable.moved)})},s.stop=function(a,b){!b.item.sortable.received&&"dropindex"in b.item.sortable&&!b.item.sortable.isCanceled()?f.$apply(function(){i.$modelValue.splice(b.item.sortable.dropindex,0,i.$modelValue.splice(b.item.sortable.index,1)[0])}):"dropindex"in b.item.sortable&&!b.item.sortable.isCanceled()||l(g,b)||p.appendTo(g),p=null},s.receive=function(a,b){b.item.sortable.received=!0},s.remove=function(a,b){"dropindex"in b.item.sortable||(g.sortable("cancel"),b.item.sortable.cancel()),b.item.sortable.isCanceled()||f.$apply(function(){b.item.sortable.moved=i.$modelValue.splice(b.item.sortable.index,1)[0]})},t.helper=function(a){return a&&"function"==typeof a?function(b,c){var d=a.apply(this,arguments);return c.sortable._isCustomHelperUsed=c!==d,d}:a},f.$watch("uiSortable",function(a){var c=k(g);c&&b.forEach(a,function(a,b){return b in r?("ui-floating"!==b||a!==!1&&a!==!0||(c.floating=a),void(q[b]=a)):(s[b]?("stop"===b&&(a=j(a,function(){f.$apply()}),a=j(a,o)),a=j(s[b],a)):t[b]&&(a=t[b](a)),q[b]=a,void g.sortable("option",b,a))})},!0),b.forEach(s,function(a,b){q[b]=j(a,q[b]),"stop"===b&&(q[b]=j(q[b],o))})):e.info("ui.sortable: ngModel not provided!",g),void g.sortable(q)):void e.error("ui.sortable: jQuery should be included before AngularJS!")}}}])}(window,window.angular);

/*jslint node: true */
/*global angular */
'use strict';

angular
  .module('app', ['ngRoute','ngResource', 'ngSanitize','angularjs-dropdown-multiselect','angularUtils.directives.dirPagination','ngFileUpload','ui.sortable'])
  .config(['$routeProvider','$locationProvider', '$resourceProvider', function($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

(function() {
  'use strict';

  angular
    .module('app')
    .config(['$routeProvider','$locationProvider','$resourceProvider',
  function($routeProvider,$locationProvider,$resourceProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/js/app/home/home.html',
      controller: 'HomeController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/create', {
      templateUrl: '/js/app/create/create.html',
      controller: 'CreateController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/dashboard', {
      templateUrl: '/js/app/dashboard/dashboard.html',
      controller: 'DashboardController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/edit/:id', {
      templateUrl: '/js/app/edit/edit.html',
      controller: 'EditController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/edit-details/:id', {
      templateUrl: '/js/app/edit-details/edit-details.html',
      controller: 'EditDetailsController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/login', {
      templateUrl: '/js/app/login/login.html',
      controller: 'LoginController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ success_location: '/dashboard'});
        }]
      }
    })
    .when('/reset/:token', {
      templateUrl: '/js/app/reset/reset.html',
      controller: 'ResetController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/scenario/:id', {
      templateUrl: '/js/app/scenario/scenario.html',
      controller: 'ScenarioController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/search', {
      templateUrl: '/js/app/search/search.html',
      controller: 'SearchController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/settings', {
      templateUrl: '/js/app/settings/settings.html',
      controller: 'SettingsController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/user/:id', {
      templateUrl: '/js/app/user/user.html',
      controller: 'UserController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    });

  }]);
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', ['$scope','$rootScope','$location','requestService',
    function($scope,$rootScope,$location,requestService) {

      $rootScope.title = 'Leplanner beta';

      //console.log($rootScope.user);
      $scope.logout = function(){
        requestService.get('/user/logout')
          .then(function(data){
            console.log(data);
            $rootScope.user = undefined;
            $location.path('/');
          });
      };

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        if($location.path().toString() != '/'){
          $rootScope.navigatedToLoginFrom = $location.path();
          $location.path('/login');
        }else{
          // if from home page
          $location.path('/login');
        }

      };

      $scope.searchFromTop = function($event){
        if($location.path() == '/search'){
          $rootScope.top_search_word = $scope.top_search_word;
          $scope.$broadcast ('triggerSearchForm');
        }else{
          if(typeof $event !== 'undefined'){
            $event.preventDefault();
          }
          $rootScope.top_search_word = $scope.top_search_word;
          $location.path('/search');
        }
      };

  }]); // MainController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', ['$scope','$rootScope','$location','requestService',
    function($scope,$rootScope,$location,requestService) {

      $rootScope.title = 'Leplanner beta';

      if(typeof $rootScope.home_active_sort_tab === 'undefined'){
        $rootScope.home_active_sort_tab = 'latest';
      }

      // INIT
      getScenarios();
      loadSubjects();

      function getScenarios(){
        var q = {};
        q.limit = 4;

        if(typeof $rootScope.home_active_sort_tab == 'undefined'){
          $rootScope.home_active_sort_tab = 'latest';
        }else{
          switch ($rootScope.home_active_sort_tab) {
            case 'latest':
                q.order = 'latest';
              break;
              case 'popular':
                  q.order = 'popular';
                break;
              case 'favorited':
                  q.order = 'favorited';
                break;
              case 'commented':
                  q.order = 'commented';
                break;
            default:
              q.order = 'latest';
          }
        }

        requestService.post('/scenario/widget-list', q)
          .then(function(data) {
            //console.log(data);
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

      function loadSubjects(){
        requestService.get('/meta/subjects')
        .then(function(data) {

          if(data.subjects){
            $scope.subjects = data.subjects;
          }

          if(data.error){
            console.log(data.error);
          }
        });
      }

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.home_active_sort_tab){ return true; }
        return false;
      };

       $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.home_active_sort_tab = tab;
          getScenarios();
        }else{
          $rootScope.home_active_sort_tab = 'latest';
          getScenarios();
        }
      };

      $scope.searchSubject = function(subject_name, $event){
        if(typeof $event !== 'undefined'){
          $event.preventDefault();
        }
        $rootScope.search_subject = subject_name;
        $location.path('/search');
      };

  }]);
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', ['$scope','$rootScope','$location','$timeout','requestService',
    function($scope,$rootScope,$location,$timeout,requestService) {

      $rootScope.title = ' Login | Leplanner beta';


      $scope.activateCreateForm = function($event){
        $event.preventDefault();
        $scope.create_form = true;
        $scope.reset_form = false;
      };

      $scope.deactivateCreateForm = function($event){
        $event.preventDefault();
        $scope.create_form = false;
      };

      $scope.activateResetForm = function($event){
        $event.preventDefault();
        $scope.reset_form = true;
        $scope.create_form = false;
      };

      $scope.deactivateResetForm = function($event){
        $event.preventDefault();
        $scope.reset_form = false;
      };

      $scope.login = function(user){

        $scope.login_in_process = true;
		user.new_beta_code = 'tallinnaülikool';
        requestService.post('/user/login', {email: user.email, password: user.password, remember_me: user.remember_me})
          .then(function(data) {

            $scope.login_in_process = undefined;

            if(data.user){
              //user id
              //console.log(data.user.id);
              if(typeof $rootScope.navigatedToLoginFrom !== 'undefined'){
                $location.path($rootScope.navigatedToLoginFrom);
                $rootScope.navigatedToLoginFrom = undefined;
              }else{
                if(typeof $rootScope.navigatedToLoginFrom !== 'undefined'){
                  $location.path($rootScope.navigatedToLoginFrom);
                  $rootScope.navigatedToLoginFrom = undefined;
                }else{
                  $location.path('/dashboard');
                }
              }
            }

            if(data.error){
              switch (data.error.id) {
                case 10:
                  $scope.login_error = 'Wrong credentials';
                  break;
                default:
                  $scope.login_error = 'Unknown error';
              }
              $timeout(function() { $scope.login_error = null; }, 2000);
            }

        });
      };

      $scope.create = function(user){

        $scope.creating_in_progress = true;

        requestService.post('/user/create', user)
          .then(function(data) {

            $scope.creating_in_progress = undefined;

            console.log(data);
            if(data.user){
              //user id
              //console.log(data.user.id);
              if(typeof $rootScope.navigatedToLoginFrom !== 'undefined'){
                $location.path($rootScope.navigatedToLoginFrom);
                $rootScope.navigatedToLoginFrom = undefined;
              }else{
                $location.path('/dashboard');
              }

            }

            if(data.error){
              switch(data.error.id) {
                case 'beta':
                  $scope.create_error = 'Please enter required beta code';
                  break;
                case 'wrong_beta':
                  $scope.create_error = 'Wrong beta code!';
                  break;
                case 0:
                  $scope.create_error = 'Please enter your first name';
                  break;
                case 1:
                  $scope.create_error = 'Please enter your last name';
                  break;
                case 2:
                  $scope.create_error = 'Please enter yout email';
                  break;
                case 3:
                  $scope.create_error = 'Please enter correct email';
                  break;
                case 4:
                  $scope.create_error = 'Please enter your password';
                  break;
                case 5:
                  $scope.create_error = 'Password has to be min 8 chars long';
                  break;
                case 6:
                  $scope.create_error = 'That email is already in use';
                  break;
                default:
                  $scope.create_error = 'Unknown error';
              }
              $timeout(function() { $scope.create_error = null; }, 2000);
            }

        });
      };


      $scope.reset = function(user){

        $scope.sending_in_progress = true;

        requestService.post('/user/send-reset-token', user)
          .then(function(data) {

            $scope.sending_in_progress = undefined;

            if(data.success){
              $scope.success_alert = 'Successfully reset email sent';
              $scope.reset_error = null;
              $timeout(function() { $scope.success_alert = null; }, 2000);
            }

            if(data.error){
              console.log(data);
              switch(data.error.id) {
                case 3:
                  $scope.reset_error = 'Please enter correct email';
                  break;
                case 20:
                  $scope.reset_error = 'No such email found';
                  break;
                default:
                  $scope.reset_error = 'Unknown error';
              }
              $timeout(function() { $scope.reset_error = null; }, 2000);
            }

        });
      };

  }]); // LoginController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', ['$scope','$rootScope','$timeout','$location','requestService',
    function($scope,$rootScope,$timeout,$location,requestService) {

      $rootScope.title = 'Create new scenario | Leplanner beta';

      $scope.createScenario = function(scenario){

        $scope.saving_in_progress = true;

        if(!scenario || typeof scenario.name == 'undefined' || scenario.name === '' || scenario.name.length <= 2){
          $scope.errorMessage = 'Scenario name has to be atleast 3 chars long!';
          $scope.saving_in_progress = undefined;
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        if(typeof scenario.description == 'undefined' || scenario.description === '' || scenario.description.length <= 2){
          $scope.errorMessage = 'Scenario description has to be atleast 3 chars long!';
          $scope.saving_in_progress = undefined;
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: scenario
        };

        $scope.saving = true;

        requestService.post('/scenario/create', params)
          .then(function(data) {

            $scope.saving_in_progress = undefined;

            if(data.scenario){

              $scope.errorMessage = null;

              $location.path('/edit-details/'+data.scenario._id);

            }

            if(data.error){
              console.log(data.error);
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 0:
                  $scope.errorMessage = 'Scenario name has to be atlest 3 chars long';
                  break;
                case 1:
                  $scope.errorMessage = 'Scenario description has to be atlest 3 chars long';
                  break;
                default:
                  $scope.errorMessage = 'Unknown error';
              }

              $timeout(function() { $scope.errorMessage = null; }, 2000);

            }

        });

      };

  }]); // CreateController
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('EditDetailsController', ['$scope','$rootScope','$timeout','$routeParams','$location','requestService',
    function($scope,$rootScope,$timeout,$routeParams,$location,requestService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      $scope.selected_subjects = [];

      $scope.subjects_list = [];
      $scope.outcomes_list = [];
      $scope.activity_list = [];

      init();

      function init(){

          var params = {
            user: {
              _id: $rootScope.user._id
            },
            scenario: {
              _id: $scope.scenario_id
            }
          };

          requestService.post('/scenario/get-edit-data-single-scenario', params)
          .then(function(data) {

            if(data.scenario){
              //console.log(data.scenario);

              $scope.scenario = data.scenario;
              //console.log(data.scenario.subjects);
              if(data.scenario.subjects){
                $scope.selected_subjects = data.scenario.subjects;
              }

              console.log('Loaded scenario');

              if(typeof data.scenario.outcomes !== 'undefined'){
                $scope.outcomes_list = data.scenario.outcomes;
                console.log('Loaded outcomes');
              }

              if(typeof data.scenario.activities !== 'undefined'){
                $scope.activity_list = data.scenario.activities;
                console.log('Loaded activities');
              }

              //console.log(data.scenario);

              $rootScope.title = 'Edit scenario: '+$scope.scenario.name+' details | Leplanner beta';

              loadDropdownData();

            }

            if(data.error){
              if(typeof data.error.id !== 'undefined' && data.error.id === 0){
                $scope.errorMessage = 'No such scenario found, check URL!';
              }else if(typeof data.error.id !== 'undefined' && data.error.id === 3){
                //no rights
                $location.path('/');
              }else{
                $scope.errorMessage = 'No such scenario found, check URL!';
              }
              console.log(data.error);
            }
          });
      }

      function loadDropdownData(){

        if($scope.outcomes_list.length === 0){
          $scope.outcomes_list.push(createNewEmptyOutcome());
          console.log('added empty outcome init');
        }

        if($scope.activity_list.length === 0){
          $scope.activity_list.push(createNewEmptyActivity());
          console.log('added empty activity init');
        }

        //publish/draft dropdown
        $scope.publish_options = [{name: 'Draft', value: true},{name: 'Published', value: false}];

        requestService.get('/meta/get-scenario-meta')
        .then(function(data) {

          if(data.subjects && data.activity_organization){
            $scope.subjects_list = data.subjects;
            //console.log($scope.subjects_list);
            $scope.activity_organization = data.activity_organization;

            $scope.fully_loaded = true;

            createDropdowns();
            addWatchListeners();


          }else{
            $scope.errorMessage = 'Please try reloading the page';
          }

          if(data.error){
            console.log(data.error);
            $scope.errorMessage = 'Please try reloading the page';
          }
        });

      }

      function createDropdowns(){

        $scope.subjectsSettings = {
            scrollableHeight: '200px',
            scrollable: true,
            smartButtonMaxItems: 1,
            displayProp: 'name',
            showCheckAll: false,
            showUncheckAll: false,
            idProp: '_id',
            externalIdProp: '',
            buttonClasses: 'btn btn-default',
        };
        $scope.subjectsText = {buttonDefaultText: 'Subjects'};


        $scope.outcomesSettings = {
          scrollableHeight: '150px',
          scrollable: true,
          smartButtonMaxItems: 1,
          displayProp: 'name',
          //showCheckAll: false,
          //showUncheckAll: false,
          idProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default',
        };
        $scope.outcomesText = {buttonDefaultText: 'Learning outcomes'};

        $scope.activity_organizationSettings = {
          scrollableHeight: '200px',
          scrollable: false,
          selectionLimit: 1,
          smartButtonMaxItems: 1,
          displayProp: 'name_eng',
          showCheckAll: false,
          showUncheckAll: false,
          closeOnSelect: true,
          idProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default',
        };
        $scope.activity_organizationText = {buttonDefaultText: 'Organization'};

      }

      function addWatchListeners(){

        $scope.watch_init_event = true;

        $scope.$watch("scenario", function(v) {
          userChangedScenario();
        }, true);

        $scope.$watch("subjects_list", function(v) {
          userChangedScenario();
        }, true);

        $scope.$watch("outcomes_list", function(v) {
          userChangedScenario();
        }, true);

        $scope.$watch("activity_list", function(v) {
          userChangedScenario();
        }, true);

        //resize textare on change
        $scope.$watch("scenario.description", function(v) {
          $scope.resizeTextarea();
        }, true);
      }

      $scope.resizeTextarea = function(){
          var el = angular.element("#description")[0];
          var heightLimit = 400;
          el.style.height = ""; /* Reset the height*/
          el.style.height = Math.min(el.scrollHeight, heightLimit) + "px";
      };

      $scope.saveScenario = function(scenario) {
        saveScenarioData({forward_to_edit_canvas: true});
      };

      $scope.addNewOutcomeItem = function(){
        var new_outcome = createNewEmptyOutcome();
        $scope.outcomes_list.push(new_outcome);
      };

      function createNewEmptyOutcome(){
        return {
          _id: guid(),
          name: ''
        };
      }

      $scope.removeOutcome = function($index){

        //also remove from activities selection
        for(var i = 0; i < $scope.activity_list.length; i++){
          for(var j = 0; j < $scope.activity_list[i].outcomes.length; j++){
            if($scope.activity_list[i].outcomes[j].id == $scope.outcomes_list[$index].id){
              $scope.activity_list[i].outcomes.splice(j, 1);
              j--;
            }
          }
        }

        $scope.outcomes_list.splice($index,1);

      };

      $scope.addNewActivityItem = function(){
        var new_activity = createNewEmptyActivity();
        $scope.activity_list.push(new_activity);
      };

      function createNewEmptyActivity(){
        return {
          _id: guid(), // fix for making empty list items different
          name: '',
          duration: '',
          in_class: true,
          activity_organization: {
            _id: 0
          },
          outcomes: []
        };
      }

      function getTotalActivirtyTime(){
        var time = 0;
        for(var i = 0; i < $scope.activity_list.length; i++){
          time += parseInt($scope.activity_list[i].duration);
        }
        return time;
      }

      $scope.removeActivity = function($index){
        $scope.activity_list.splice($index,1);
      };

      $scope.deleteScenario = function(){
        var del = confirm("Do you really want to delete scenario '"+$scope.scenario.name+"', there is no turning back!");
        if(del === true){

          var params = {
            user: {
              _id: $rootScope.user._id
            },
            scenario: {
              _id: $scope.scenario_id
            }
          };

          requestService.post('/scenario/delete-scenario', params)
          .then(function(data) {

            if(data.success){
              console.log('deleted');
              $location.path('/dashboard');
            }

            if(data.error){
              console.log(data.error);
              $scope.errorMessage = 'Please try reloading the page';
            }
          });
        }
      };

      function userChangedScenario(){

        // after typing init autosave

        var done_typing_interval = 3000;

        if($scope.timer){ $timeout.cancel($scope.timer); }

        $scope.timer = $timeout(function() {

          // fix for first loading listeners
          if(!$scope.watch_init_event){
            saveScenarioData();
          }else{
            $scope.watch_init_event = undefined;
          }
        }, done_typing_interval);

      }

      function saveScenarioData(forward) {

        $scope.saving_in_progress = true;

        $scope.scenario.outcomes = $scope.outcomes_list;
        $scope.scenario.activities = $scope.activity_list;

        // allow empty, grade, duration
        if(typeof $scope.scenario.grade == 'undefined'){ $scope.scenario.grade = null; }
        if(typeof $scope.scenario.duration == 'undefined'){ $scope.scenario.duration = null; }
        //console.log($scope.scenario.subject);
        //$scope.scenario.subject = $scope.selected_subject;
        //console.log($scope.scenario);

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario_data: $scope.scenario
        };

        $scope.saving = true;

        requestService.post('/scenario/save', params)
          .then(function(data) {

            //enable save button
            $scope.saving_in_progress = undefined;

            if(data.scenario){
              console.log('saved scenario ');

              // user clicked save button
              if(forward){
                $location.path('/edit/'+data.scenario._id);
              }

              $timeout(function() {
                $scope.saved = true;
                $scope.saving = undefined;
              }, 1000);

              $scope.errorMessage = null;
            }

            if(data.error){
              console.log(data.error);
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 3:
                  $scope.errorMessage = 'no rights';
                  $location.path('/');
                  break;
                default:
                  $scope.errorMessage = 'Unknown error';
              }

              $timeout(function() { $scope.errorMessage = null; }, 2000);

            }

        });

      }

      // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

      // fix destroing timeout after navigationg away
      $scope.$on("$destroy", function( event ) {
        if($scope.timer){ $timeout.cancel($scope.timer); }
      });

  }]); //editDetailsController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('EditController', ['$scope','$rootScope','$timeout','$routeParams','$location','requestService',
    function($scope,$rootScope,$timeout,$routeParams,$location,requestService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      $scope.outcomes_list = [];
      $scope.activity_list = [];
      $scope.materials = [];
      $scope.involvement_options = [];
      $scope.displays_list = [];
      $scope.conveyor_list = [];

      $scope.whois_material = '';
      $scope.activity = null;

      //for canvas - show/hide edit possibilities
      $scope.allow_edit = true;

      init();

      function init(){

          var params = {
            user: {
              _id: $rootScope.user._id
            },
            scenario: {
              _id: $scope.scenario_id
            }
          };

          requestService.post('/scenario/get-edit-data-single-scenario', params)
          .then(function(data) {

            if(data.scenario && data.materials){
              //console.log(data.scenario);

              $scope.scenario = data.scenario;
              $rootScope.title = 'Edit scenario: '+$scope.scenario.name+' canvas';
              console.log('Loaded scenario');

              if(typeof data.scenario.outcomes !== 'undefined'){
                $scope.outcomes_list = data.scenario.outcomes;
                console.log('Loaded outcomes');
              }

              if(typeof data.scenario.activities !== 'undefined'){
                $scope.activity_list = data.scenario.activities;
                console.log('Loaded activities');
              }
              if(typeof data.materials !== 'undefined'){
                $scope.materials = data.materials;

                updateActivityList();
                //console.log($scope.activity_list);
                console.log('Loaded materials');
              }

              loadMetaData();
            }

            if(data.error){
              if(typeof data.error.id !== 'undefined' && data.error.id === 0){
                $scope.errorMessage = 'No such scenario found, check URL!';
              }else if(typeof data.error.id !== 'undefined' && data.error.id === 3){
                //no rights
                $location.path('/');
              }else{
                $scope.errorMessage = 'No such scenario found, check URL!';
              }
              console.log(data.error);
            }
          });
      }

      function loadMetaData(){

        requestService.get('/meta/get-scenario-meta')
        .then(function(data) {

          if(data.subjects && data.activity_organization && data.involvement_options && data.displays){
            $scope.subjects = data.subjects;
            $scope.activity_organization = data.activity_organization;
            $scope.involvement_options = data.involvement_options;
            $scope.displays_list = data.displays;

            $scope.fully_loaded = true;

          }else{
            $scope.errorMessage = 'Please try reloading the page';
          }

          if(data.error){
            console.log(data.error);
            $scope.errorMessage = 'Please try reloading the page';
          }
        });

      }

      $scope.openAddMaterialModal = function(a, pos){

        $scope.activity = a;

        $scope.whois_material = 'Student';
        $scope.material_position = 'bottom';
        if(pos === 'top'){
          $scope.whois_material = 'Teacher';
          $scope.material_position = 'top';
        }
        $scope.material = {};
        $scope.material.involvement_level =  0;

        $scope.displays_selection = [];

        //empty conveyor on empty material
        $scope.material.conveyors = [
            {name: null, url: null},
        ];

        $scope.manageModal('show');
      };

      $scope.openEditMaterialModal = function(a, pos, material){

        $scope.activity = a;

        $scope.whois_material = 'Student';
        $scope.material_position = 'bottom';
        if(pos === 'top'){
          $scope.whois_material = 'Teacher';
          $scope.material_position = 'top';
        }
        $scope.material = material;

        $scope.displays_selection = [];
        //console.log(material.displays);

        for(var i = 0; i < material.displays.length; i++){
            $scope.displays_selection[material.displays[i]] = true;
        }

        // empty conveyor add empty one
        if($scope.material.conveyors.length === 0){
            $scope.material.conveyors = [
                {name: null, url: null},
            ];
        }

        $scope.manageModal('show');
      };

      // making possible to launch direcetive fn
      $scope.setManageFunction = function(directiveFn) {
        $scope.manageModal = directiveFn.theDirFn;
      };
      $scope.setreDrawMaterialFunction = function(directiveFn) {
        $scope.reDrawMaterial = directiveFn.theDirFn;
      };

      $scope.deleteMaterial = function(id){

        var del = confirm('Do you really want to delete this material?');

        if(del !== true){ return; }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: {
            _id: $scope.scenario_id
          },
          material: {
            _id: id
          }
        };

        $scope.deleting_material = true;

        requestService.post('/scenario/delete-material', params)
        .then(function(data) {

          // enable save button
          $scope.deleting_material = undefined;

          if(data.material){
            console.log('deleted');
            // replace updated material
            updateMaterialList(data.material, 'delete');
            $scope.manageModal('hide');
          }

          if(data.error){
            console.log(data.error);
            switch (data.error.id) {
              case 100:
                // user changed
                $location.path('/');
                break;
              default:
                $scope.materialErrorMessage = 'Unknown error';
            }

            $timeout(function() { $scope.materialErrorMessage = null; }, 2000);

          }
        });
      };

      $scope.saveMaterial = function(){

        var action = 'update';
        if(typeof $scope.material._id == 'undefined'){
          action = 'new';
        }

        $scope.material.activity_id = $scope.activity._id;
        $scope.material.position =$scope.material_position;

        //rearrange displays
        var temp_arr = [];
        for(var i = 0; i < $scope.displays_list.length; i++){
            //if checked then true
            if($scope.displays_selection[$scope.displays_list[i]._id]){
                //console.log($scope.displays_list[i]._id);
                temp_arr.push($scope.displays_list[i]._id);
            }
        }

        $scope.material.displays = temp_arr;
        console.log($scope.material.conveyors);
        //clean empty conveyors
        for(var j = 0; j < $scope.material.conveyors.length; j++){
            //if both name and url empty
            console.log(!$scope.material.conveyors[j].name && !$scope.material.conveyors[j].url);
            if(!$scope.material.conveyors[j].name && !$scope.material.conveyors[j].url){
                //console.log($scope.displays_list[i]._id);
                $scope.material.conveyors.splice(j, 1);
            }
        }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: {
            _id: $scope.scenario_id
          },
          material: $scope.material
        };

        $scope.saving_material = true;

        requestService.post('/scenario/save-material', params)
        .then(function(data) {

          // enable save button
          $scope.saving_material = undefined;

          if($scope.material.conveyors.length === 0){
              $scope.material.conveyors = [
                  {name: null, url: null},
              ];
          }

          if(data.material){
            console.log('saved');
            // replace updated material
            updateMaterialList(data.material, action);
            $scope.manageModal('hide');
          }

          if(data.error){
            console.log(data.error);
            switch (data.error.id) {
              case 100:
                // user changed
                $location.path('/');
                break;
              case 0:
                $scope.materialErrorMessage = 'Material name can not be empty';
                break;
              case 1:
                $scope.materialErrorMessage = 'Material url can not be empty';
                break;
              /*case 2:
                $scope.materialErrorMessage = 'Conveyor name can not be empty';
                break;
              case 3:
                $scope.materialErrorMessage = 'Conveyor url can not be empty';
                break;
              case 4:
                $scope.materialErrorMessage = 'Display can not be empty';
                break;*/
              case 20:
                $scope.materialErrorMessage = 'Material exists try reloading the page';
                break;
              default:
                $scope.materialErrorMessage = 'Unknown error';
            }

            $timeout(function() { $scope.materialErrorMessage = null; }, 2000);

          }
        });
      };

      var updateMaterialList = function(new_material, action){

        if(action == 'new'){
          $scope.materials.push(new_material);
          updateActivityList();
          $scope.reDrawMaterial('new');
          return;
        }

        if(action == 'delete'){
          console.log(new_material._id);
          console.log($scope.materials.length);
          var index = null;
          for(var i = 0; i < $scope.materials.length; i++){
            if($scope.materials[i]._id == new_material._id){
              index = i;
              break;
            }
          }

          $scope.materials.splice(index, 1);
          updateActivityList();
          $scope.reDrawMaterial('delete', new_material._id);

          console.log($scope.materials.length);

        }


        if(action == 'update'){
          for(var j = 0; j < $scope.materials.length; j++){
            if($scope.materials[j]._id == new_material._id){
              $scope.materials[j] = new_material;
              break;
            }
          }

          updateActivityList();
          $scope.reDrawMaterial('update', new_material._id);
        }

      };

      var updateActivityList = function(){
        // add material to relevant activities
        for(var i = 0; i < $scope.activity_list.length; i++){

          // empty materials
          $scope.activity_list[i].materials = undefined;

          for(var j = 0; j < $scope.materials.length; j++){
            if($scope.activity_list[i]._id == $scope.materials[j].activity_id){
              if(typeof $scope.activity_list[i].materials == 'undefined'){
                $scope.activity_list[i].materials = [];
              }
              $scope.activity_list[i].materials.push($scope.materials[j]);
            }
          }
        }

      };

      $scope.addNewActivityItem = function(){
        $scope.material.conveyors.push({name: null, url: null});
      };

      $scope.removeActivityItem = function(index){
        $scope.material.conveyors.splice(index, 1);
      };


  }]); //EditController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScenarioController', ['$scope','$rootScope','$routeParams','$location','$timeout','requestService',
    function($scope,$rootScope,$routeParams,$location,$timeout,requestService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      $scope.activity_list = [];
      $scope.materials = [];

      // single scenario details
      var params = {
        scenario: {
          _id: $scope.scenario_id
        }
      };

      if(typeof $rootScope.user !== 'undefined'){
        params.user = {
          _id :$rootScope.user._id
        };
      }

      // INIT
      requestService.post('/scenario/single-scenario', params)
        .then(function(data) {
          if(data.scenario){

            $rootScope.title = data.scenario.name+' - '+data.scenario.author.first_name+' '+data.scenario.author.last_name+' | Leplanner beta';

            $scope.scenario = data.scenario;
            $scope.activity_list = data.scenario.activities;
            $scope.is_favorite = data.is_favorite;
            $scope.is_following = data.is_following;
            //console.log(data.scenario);
            if(typeof data.materials !== 'undefined'){
              $scope.materials = data.materials;

              updateActivityList();
              //console.log($scope.activity_list);
              //console.log('Loaded materials');
            }
            loadMetaData();
            getSidebarScenarios();
            getComments();
          }

          if(data.error){
            switch (data.error.id) {
              case 0:
                $scope.no_scenario = true;
                break;
              default:
                $scope.no_scenario = true;
                console.log(data.error);
            }
          }
      });

      function loadMetaData(){

        requestService.get('/meta/get-scenario-meta')
        .then(function(data) {

          if(data.subjects && data.activity_organization && data.involvement_options && data.displays){
            $scope.subjects = data.subjects;
            $scope.activity_organization = data.activity_organization;
            $scope.involvement_options = data.involvement_options;
            $scope.displays_list = data.displays;

            $scope.fully_loaded = true;

          }else{
            $scope.errorMessage = 'Please try reloading the page';
          }

          if(data.error){
            console.log(data.error);
            $scope.errorMessage = 'Please try reloading the page';
          }
        });

      }

      function getSidebarScenarios(){
        var q= {order: 'popular', limit: 3, exclude: $scope.scenario._id, author: $scope.scenario.author._id};
        requestService.post('/scenario/widget-list', q)
          .then(function(data) {
            if(data.scenarios){
              if(data.scenarios.length > 0){
                $scope.scenarios = data.scenarios;
              }else{
                $scope.no_popular_scenarios = true;
              }

            }
            if(data.error){
              console.log(data.error);
            }
        });
      }

      function getComments(){
        requestService.post('/scenario/comments', {scenario_id: $scope.scenario._id})
          .then(function(data) {
            //console.log(data);
            if(data.comments){
              //console.log(data.comments);
              if(data.comments.length > 0){
                $scope.comments = data.comments;
              }
            }
            if(data.error){
              console.log(data.error);
            }
        });
      }

      $scope.addRemoveFavorite = function(remove){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario_id: $scope.scenario._id
        };

        if(typeof remove !== 'undefined'){
          params.remove = true;
        }

        requestService.post('/scenario/add-remove-favorite', params)
          .then(function(data) {

            if(data.success){

              if(data.success == 'remove'){
                $scope.is_favorite = false;
                $scope.scenario.favorites_count--;
              }else{
                $scope.is_favorite = true;
                $scope.scenario.favorites_count++;
              }
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);

              }
            }
        });
      };

      $scope.addRemoveFollow = function(remove_follow){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          following: {
            _id: $scope.scenario.author._id
          }
        };

        if(typeof remove_follow !== 'undefined'){
          params.remove_follow = true;
        }

        requestService.post('/user/add-remove-follow', params)
          .then(function(data) {

            if(data.success){
              //console.log(data.success);
              if(data.success == 'unfollow'){
                $scope.is_following = false;
              }else{
                $scope.is_following = true;
              }
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);

              }
            }
        });
      };

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        $rootScope.navigatedToLoginFrom = $location.path();
        $location.path('/login');
      };

      $scope.addComment = function(comment){
        if(typeof comment === 'undefined' || typeof comment.text == 'undefined' ){
          $scope.save_error = "Comment text cannot be empty";
          $timeout(function() { $scope.save_error = null; }, 2000);
          return;
        }

        $scope.adding_comment_in_progress = true;

        var params = {
          comment: {
            text: comment.text
          },
          user: {
            _id: $rootScope.user._id
          },
          scenario: {
            _id: $scope.scenario_id
          },
          author: {
            _id: $scope.scenario.author._id
          }
        };

        requestService.post('/scenario/add-comment', params)
          .then(function(data) {

            $scope.adding_comment_in_progress = undefined;

            if(data.comments){
              $scope.comments = data.comments;
              $scope.scenario.comments_count = data.comments.length;
              comment.text = undefined;
              $scope.save_success = "Comment posted successfully!";
              $timeout(function() { $scope.save_success = null; }, 2000);
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 0:
                  $scope.save_error = "Comment text cannot be empty";
                  $timeout(function() { $scope.save_error = null; }, 2000);
                  break;
                default:
                  console.log(data.error);
              }
            }
        });

      };

      // disable delete button while deleting
      $scope.showDeleteText = function(comment_id){
        if($scope.is_deleting == comment_id){
          return true;
        }else{
          return false;
        }
      };

      $scope.deleteComment = function(comment_id, text){
        var del = confirm("Are you sure that you want to delete comment: "+text);
        if (del === true) {

          $scope.is_deleting = comment_id;
          $scope.comment_delete_text = "deleting...";

          var params = {
            user: {
              _id: $rootScope.user._id
            },
            scenario: {
              _id: $scope.scenario_id
            },
            comment: {
              _id: comment_id
            }
          };

          requestService.post('/scenario/delete-comment', params)
            .then(function(data) {
              if(data.comments){

                $scope.comment_delete_text = "deleted";

                $timeout(function() {
                  $scope.is_deleting = undefined;
                  $scope.comments = data.comments;
                  $scope.scenario.comments_count = data.comments.length;

                }, 1500);

              }

              if(data.error){
                switch (data.error.id) {
                  case 100:
                    // user changed
                    $location.path('/');
                    break;
                  case 3:
                    $scope.comment_delete_text = "error, no rights";
                    console.log("No rights");
                    break;
                  default:
                    console.log(data.error);
                }

                $scope.comment_delete_text = "error, refresh the page";
                $timeout(function() {
                  $scope.is_deleting = undefined;
                }, 2000);

              }
          });

        }
      };

      var updateActivityList = function(){
        // add material to relevant activities
        for(var i = 0; i < $scope.activity_list.length; i++){

          // empty materials
          $scope.activity_list[i].materials = undefined;

          for(var j = 0; j < $scope.materials.length; j++){
            if($scope.activity_list[i]._id == $scope.materials[j].activity_id){
              if(typeof $scope.activity_list[i].materials == 'undefined'){
                $scope.activity_list[i].materials = [];
              }
              $scope.activity_list[i].materials.push($scope.materials[j]);
            }
          }
        }

      };


  }]); // ScenarioController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', ['$scope','$rootScope','$routeParams','requestService',
    function($scope,$rootScope,$routeParams,requestService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.get_profile_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      if(typeof $rootScope.sort_tab === 'undefined'){
        $rootScope.sort_tab = {};
      }else if(typeof $rootScope.sort_tab.profile === 'undefined') {
        $rootScope.sort_tab.profile = 'latest';
      }

      $scope.sidebox_quantity = {};
      $scope.sidebox_quantity.followings = 8;
      $scope.sidebox_quantity.followers = 8;

      // INIT
      getUserData();

      function getUserData(){

        var request = {
          user: {
            _id: $scope.get_profile_id
          }
        };

        requestService.post('/user/load-user-data', request)
          .then(function(data) {

            if(data.profile){

              getSingleUserScenarios();

              //console.log(data);
              $scope.profile = data.profile;
              $rootScope.title = data.profile.first_name+' '+data.profile.last_name+' | Leplanner beta';

              //check if user is following
              if(typeof $rootScope.user === 'undefined'){
                $scope.is_following = false;
              }else if(typeof data.followers === 'undefined'){
                $scope.is_following = false;
              }else{
                for(var i = 0; i < data.followers.length; i++){
                  //console.log($rootScope.user._id +' == '+ data.followers[i]._id);
                  if($rootScope.user._id == data.followers[i].follower._id){
                    // following user
                    $scope.is_following = true;
                    break;
                  }
                }
              }

              if(typeof data.following !== 'undefined'){
                $scope.followings = data.following;
              }else{
                $scope.followings = undefined;
              }

              if(typeof data.followers !== 'undefined'){
                $scope.followers = data.followers;
              }else{
                $scope.followers = undefined;
              }

            }

            if(data.error){
              switch (data.error.id) {
                case 0:
                  $scope.no_user = true;
                  break;
                default:
                  $scope.no_user = true;
                  console.log(data.error);
              }
            }

        });
      }

      function getSingleUserScenarios(){

        $scope.loading_animation = true;
        $scope.no_scenarios = false;
        $scope.scenarios = [];

        var q = {};

        q.user = {_id: $scope.get_profile_id};

        if(typeof $rootScope.sort_tab.profile == 'undefined'){
          $rootScope.sort_tab.profile = 'latest';
        }

        switch ($rootScope.sort_tab.profile) {
          case 'latest':
              q.order = 'latest';
            break;
            case 'popular':
                q.order = 'popular';
              break;
            case 'favorited':
                q.order = 'favorited';
              break;
            case 'commented':
                q.order = 'commented';
              break;
          default:
            q.order = 'latest';
        }


        requestService.post('/scenario/list', q)
          .then(function(data) {
            //console.log(data);
            if(data.scenarios){
              if(data.scenarios.length === 0){
                  $scope.no_scenarios = true;
              }
              $scope.scenarios = data.scenarios;

              $scope.loading_animation = false;
            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

      $scope.addRemoveFollow = function(remove_follow){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          following: {
            _id: $scope.get_profile_id
          }
        };

        if(typeof remove_follow !== 'undefined'){
          params.remove_follow = true;
        }

        requestService.post('/user/add-remove-follow', params)
          .then(function(data) {

            if(data.success){
              //console.log(data.success);
              if(data.success == 'unfollow'){
                $scope.is_following = false;
              }else{
                $scope.is_following = true;
              }
              getUserData();
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);

              }
            }
        });
      };

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.sort_tab.profile){ return true; }
        return false;
      };

      $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.sort_tab.profile = tab;
          getSingleUserScenarios();
        }else{
          $rootScope.sort_tab.profile = 'latest';
          getSingleUserScenarios();
        }
      };

      $scope.expandSideBox = function(box_name){
        switch (box_name) {
          case 'followings':
            $scope.sidebox_quantity.followings = undefined;
            break;
          case 'followers':
            $scope.sidebox_quantity.followers = undefined;
            break;
          default:
            console.log('no name');
        }
      };

  }]); // UserController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('ResetController', ['$scope','$location','$rootScope','$routeParams','$timeout','requestService',
    function($scope,$location,$rootScope,$routeParams,$timeout,requestService) {

      $rootScope.title = 'Password reset | Leplanner beta';

      $scope.reset = function(user){

        if(
           typeof user.new_password != 'undefined' &&
           typeof user.new_password_twice != 'undefined'
          ){
            if(user.new_password == user.new_password_twice){

                // Save new password
                user.token = $routeParams.token;

                requestService.post('/user/reset-password', user)
                  .then(function(data) {
                    if(data.success){
                      $location.path('/login');
                    }

                    if(data.error){
                      switch(data.error.id) {
                        case 5:
                          $scope.reset_error = 'Password has to be min 8 chars long';
                          break;
                        case 7:
                          $scope.reset_error = 'Please enter all fields';
                          break;
                        case 9:
                          $scope.reset_error = 'New passwords dont match';
                          break;
                        case 10:
                          $scope.reset_error = 'Request new token';
                          break;
                        case 11:
                          $scope.reset_error = 'Token expired';
                          break;
                        default:
                          $scope.reset_error = 'Unknown error';
                      }
                      $timeout(function() { $scope.reset_error = null; }, 2000);
                    }

                });

            }else{
              $scope.reset_error = 'New passwords dont match';
              $timeout(function() { $scope.reset_error = null; }, 2000);
            }

        }else{
          $scope.reset_error = 'All fields are required';
          $timeout(function() { $scope.reset_error = null; }, 2000);
        }

      };

  }]); // ResetController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsController', ['$scope','$rootScope','$location','$timeout','requestService','Upload',
    function($scope,$rootScope,$location,$timeout,requestService,Upload) {

      $rootScope.title = 'Settings | Leplanner beta';

      $scope.user = $rootScope.user;
      $scope.user.profile_image ="./images/user/"+$scope.user._id+".jpg";

      // INIT
      fillUpdateProfileForm($scope.user);

      function fillUpdateProfileForm() {
        $scope.user.new_first_name = $scope.user.first_name;
        $scope.user.new_last_name = $scope.user.last_name;
        $scope.user.new_email = $scope.user.email;
        $scope.user.new_organization = $scope.user.organization;
      }

      $scope.updateProfile = function(user){

        if($scope.user.new_first_name != $scope.user.first_name ||
           $scope.user.new_last_name != $scope.user.last_name ||
           $scope.user.new_email != $scope.user.email ||
           $scope.user.new_organization != $scope.user.organization
          ){

            $scope.updating_in_progress = true;

            requestService.post('/user/update-profile', {user: $scope.user})
              .then(function(data) {

                $scope.updating_in_progress = undefined;
                //console.log(data);
                if(data.user){
                  $rootScope.user = data.user;
                  $scope.user = $rootScope.user;
                  fillUpdateProfileForm();
                  $scope.updateProfile_success = 'Update successful';
                  $scope.updateProfile_error = null;
                  $timeout(function() { $scope.updateProfile_success = null; }, 2000);
                }

                if(data.error){
                  switch(data.error.id) {
                    case 100:
                      // user changed
                      $location.path('/');
                      break;
                    case 0:
                      $scope.updateProfile_error = 'Please enter your first name';
                      break;
                    case 1:
                      $scope.updateProfile_error = 'Please enter your last name';
                      break;
                    case 2:
                      $scope.updateProfile_error = 'Please enter yout email';
                      break;
                    case 3:
                      $scope.updateProfile_error = 'Please enter correct email';
                      break;
                    case 6:
                      $scope.updateProfile_error = 'That email is already in use';
                      break;
                    case 7:
                      $scope.updateProfile_error = 'Please enter password to confirm email change!';
                      break;
                    case 10:
                      $scope.updateProfile_error = 'Wrong password!';
                      break;
                    default:
                      $scope.updateProfile_error = 'Unknown error';
                      console.log(data.error);
                  }
                  $timeout(function() { $scope.updateProfile_error = null; }, 2000);
                }

            });

        }else{
          $scope.updateProfile_error = 'No profile data modified';
          $timeout(function() { $scope.updateProfile_error = null; }, 2000);
        }
      };

      $scope.updatePassword = function(user){

        if(typeof user.password != 'undefined' &&
           typeof user.new_password != 'undefined' &&
           typeof user.new_password_twice != 'undefined'
          ){
            if(user.new_password == user.new_password_twice){

              $scope.updating_in_progress = true;

              requestService.post('/user/update-password', {user: user})
                .then(function(data) {

                  $scope.updating_in_progress = undefined;

                  //console.log(data);
                  if(data.user){
                    $scope.updatePassword_success = 'Update successful';
                    $scope.updatePassword_error = null;
                    user.password = undefined;
                    user.new_password = undefined;
                    user.new_password_twice = undefined;
                    $timeout(function() { $scope.updatePassword_success = null; }, 2000);
                  }

                  if(data.error){
                    switch(data.error.id) {
                      case 100:
                        // user changed
                        $location.path('/');
                        break;
                      case 5:
                        $scope.updatePassword_error = 'Password has to be min 8 chars long';
                        break;
                      case 7:
                        $scope.updatePassword_error = 'Please enter all fields';
                        break;
                      case 8:
                        $scope.updatePassword_error = 'New password has to be different from old one';
                        break;
                      case 9:
                        $scope.updatePassword_error = 'New passwords dont match';
                        break;
                      case 10:
                        $scope.updatePassword_error = 'Wrong password';
                        break;
                      default:
                        $scope.updatePassword_error = 'Unknown error';
                    }
                    $timeout(function() { $scope.updatePassword_error = null; }, 2000);
                  }

              });

            }else{
              $scope.updatePassword_error = 'New passwords dont match';
              $timeout(function() { $scope.updatePassword_error = null; }, 2000);
            }

        }else{
          $scope.updatePassword_error = 'All fields are required';
          $timeout(function() { $scope.updatePassword_error = null; }, 2000);
        }
      };

      $scope.uploadPicture = function(files){
        if (files && files.length) {

          var file = files[0];
          //console.log(file);
          var user_for_restrict_check = {};
          user_for_restrict_check._id = $rootScope.user._id;
          Upload.upload({
              url: 'api/upload/profile-image',
              fields: {
                  user: user_for_restrict_check
              },
              sendFieldsAs: "form",
              file: file
          }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $scope.progress_percentage = progressPercentage+ '% ';
              //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {

              if(data.success){
                //console.log('success');

                // to update image src & update image in browser
                var last_modified = new Date();
                $scope.user.profile_image ="./images/user/"+$scope.user._id+".jpg?last_modified="+last_modified;

                //console.log(last_modified);
                // update rootScope to change user profile_image everywhere
                $rootScope.user.image = $scope.user._id+".jpg?last_modified="+last_modified;
                $rootScope.user.image_thumb = $scope.user._id+"_thumb.jpg?last_modified="+last_modified;

                $scope.upload_success = 'Upload successful';
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_success = null; }, 2000);
              }

              if(data.error){
                switch(data.error.id) {
                  case 100:
                    // user changed
                    $location.path('/');
                    break;
                  case 20:
                    $scope.upload_error = 'File too large';
                    break;
                  case 22:
                    $scope.upload_error = 'Unsupported file type';
                    break;
                  case 23:
                    $scope.upload_error = 'Upload larger image than 400px x 400px';
                    break;

                }
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_error = null; }, 2000);
              }

          }).error(function (data, status, headers, config) {
            $scope.progress_percentage = null;
            $scope.upload_error = 'Unknown error!';
            $timeout(function() { $scope.upload_error = null; }, 2000);
          });

        }
      };

  }]); // SettingsController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', ['$scope','$rootScope','requestService',
    function ($scope,$rootScope,requestService) {

      $rootScope.title = $rootScope.user.first_name+' '+$rootScope.user.last_name+' dashboard | Leplanner beta';

      if(typeof $rootScope.dash_active_tab === 'undefined'){
        $rootScope.dash_active_tab = 'feed';
      }

      if(typeof $rootScope.sort_tab === 'undefined'){
        $rootScope.sort_tab = {};
      }else if(typeof $rootScope.sort_tab.dash === 'undefined') {
        $rootScope.sort_tab.dash = 'latest';
      }

      // INIT
      getDashboardData();

      var notification_limit = 20;
      getNotifications(notification_limit);

      function getDashboardData(){

        $scope.loading_animation = true;
        $scope.messages = {};
        $scope.scenarios = [];
        $scope.users_list = [];

        var query = {
          order : 'latest',
          user: {
            _id: $rootScope.user._id
          }
        };

        if(typeof $rootScope.sort_tab.dash == 'undefined'){
          $rootScope.sort_tab.dash = 'latest';
        }else{
          switch ($rootScope.sort_tab.dash) {
            case 'latest':
                query.order = 'latest';
              break;
              case 'popular':
                  query.order = 'popular';
                break;
              case 'favorited':
                  query.order = 'favorited';
                break;
              case 'commented':
                  query.order = 'commented';
                break;
            default:
              query.order = 'latest';
          }
        }

        if(typeof $rootScope.dash_active_tab == 'undefined'){
          query.page = 'feed';
        }else{
          switch ($rootScope.dash_active_tab) {
            case 'feed':
                query.page = 'feed';
              break;
            case 'drafts':
                query.page = 'drafts';
              break;
            case 'published':
                query.page = 'published';
              break;
            case 'favorites':
                query.page = 'favorites';
              break;
            case 'users':
                query.page = 'users';
              break;
            default:
              query.page = 'feed';
          }
        }

        if(query.page != 'users'){

          getScenarios(query);

        }else{

          // get users list to follow/unfollow
          var params = {
              user: {
                _id: $rootScope.user._id
              }
          };

          requestService.post('/user/list', params)
            .then(function(data) {

              if(data.users){
                $scope.users_list = data.users;
                $scope.loading_animation = false;
              }

              if(data.error){
                switch(data.error.id) {
                  case 100:
                    // user changed
                    $location.path('/');
                    break;
                  default:
                    console.log(data.error);
                }
              }
          });

        }

      }

      function getScenarios(query){
        requestService.post('/scenario/scenarios-dash-list', query)
          .then(function(data) {
            if(data.scenarios){

              switch (query.page) {
                case 'feed':
                  if(data.scenarios.length === 0){
                    $scope.messages.no_following = true;
                  }
                  break;
                case 'drafts':
                  $scope.drafts_count = data.scenarios.length;
                  if(data.scenarios.length === 0){
                    $scope.messages.no_drafts = true;
                  }
                  break;
                case 'published':
                  if(data.scenarios.length === 0){
                    $scope.messages.no_published = true;
                  }
                  break;
                case 'favorites':
                  if(data.scenarios.length === 0){
                    $scope.messages.no_favorites = true;
                  }
                  break;
                default:
                  alert('something went wrong, please refresh the page');
                  break;
              }

              $scope.scenarios = data.scenarios;
              $scope.loading_animation = false;

            }

            if(data.error){
              switch(data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);
              }
            }
        });
      }

      function getNotifications(limit){

        $scope.notifications_loading_animation = true;

        var params = {
          user: {
            _id: $rootScope.user._id
          }
        };

        if(typeof limit != 'undefined'){
          params.limit = limit;
        }

        requestService.post('/user/notifications', params)
          .then(function(data) {
            if(data.notifications){
              $scope.notifications = data.notifications;
              $scope.notifications_loading_animation = undefined;
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);
              }
            }
        });


      }

      $scope.isActiveDash = function(tab){
        if(tab == $rootScope.dash_active_tab){ return true; }
        return false;
      };

       $scope.updateDashList = function(tab){
        if(tab == 'feed ' || tab == 'drafts' || tab == 'published' || tab == 'favorites' || tab == 'users'){
          $rootScope.dash_active_tab = tab;
          getDashboardData();
        }else{
          $rootScope.dash_active_tab = 'feed';
          getDashboardData();
        }
      };

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.sort_tab.dash){ return true; }
        return false;
      };

      $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.sort_tab.dash = tab;
          getDashboardData();
        }else{
          $rootScope.sort_tab.dash = 'latest';
          getDashboardData();
        }
      };


      $scope.addRemoveFollow = function(user_id,remove_follow){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          following: {
            _id: user_id
          }
        };

        if(typeof remove_follow !== 'undefined'){
          params.remove_follow = true;
        }

        requestService.post('/user/add-remove-follow', params)
          .then(function(data) {

            if(data.success){
              if(data.success == 'unfollow'){

                for(var i = 0; i < $scope.users_list.length; i++){
                  if($scope.users_list[i]._id == user_id){
                    $scope.users_list[i].following = undefined;
                  }
                }

              }else{
                for(var j = 0; j < $scope.users_list.length; j++){
                  if($scope.users_list[j]._id == user_id){
                    $scope.users_list[j].following = 'following';
                  }
                }
              }

            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);
              }
            }
        });
      };

      $scope.getAllNotifications = function(){
        getNotifications();
      };

      $scope.getLatestNotifications = function(){
        getNotifications(notification_limit);
      };

  }]); // DashboardController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchController', ['$scope','$rootScope','requestService',
    function($scope,$rootScope,requestService) {

      $rootScope.title = 'Search | Leplanner beta';

      $scope.$on('triggerSearchForm', function(e) {
        angular.element('#search-word-input').trigger('focus');
        $scope.search();
      });

      if(typeof $rootScope.sort_tab === 'undefined'){
        $rootScope.sort_tab = {};
      }else if(typeof $rootScope.sort_tab.search === 'undefined') {
        $rootScope.sort_tab.search = 'latest';
      }

      // search default pagination start
      if(typeof $rootScope.search_page_nr !== 'undefined'){
        $scope.search_page_nr = $rootScope.search_page_nr;
      }else{
        $rootScope.search_page_nr = 1;
      }

      $scope.loading_animation = true;

      // INIT
      createDropDownMenusAndInitialSearch();

      function createDropDownMenusAndInitialSearch(){
        //  arrays to store selected multiple choices
        $scope.selected_subjects = [];

        $scope.subjectsSettings = {
          scrollableHeight: '400px',
          scrollable: true,
          enableSearch: true,
          smartButtonMaxItems: 3,
          displayProp: 'name',
          idProp: '_id',
          //externalIdProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default btn-fixed-width',
        };

        $scope.subjectsText = {buttonDefaultText: 'Filter subjects'};

         requestService.get('/meta/subjects')
          .then(function(data) {

            if(data.subjects){

              $scope.subjects = data.subjects;

              // Retrieve search from navigating back to search
              if(typeof $rootScope.searchParams !== 'undefined'){

                $scope.search_word = $rootScope.searchParams.search_word;

                for(var i = 0; i < $scope.subjects.length; i++){
                  for(var j = 0; j < $rootScope.searchParams.subjects.length; j++){
                    if($scope.subjects[i].name == $rootScope.searchParams.subjects[j]){
                       $scope.selected_subjects.push($scope.subjects[i]);
                    }
                  }
                }

              }

              // INITAL SEARCH
              getSearchParamsAndSearch();

            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

      function getSearchParamsAndSearch(){

        $scope.loading_animation = true;

        if(typeof $rootScope.top_search_word !== 'undefined'){
          $scope.search_word = $rootScope.top_search_word;
          $rootScope.top_search_word = undefined;
          $scope.$parent.top_search_word = undefined;
          angular.element('#search-word-input').trigger('focus');
        }

        var subjects = [];
        var selected_subjects_labels = [];

        // redirect from home page, search for subject only
        if(typeof $rootScope.search_subject !== 'undefined'){
          $scope.search_word = '';
          $scope.selected_subjects = [];
          for(var i = 0; i < $scope.subjects.length; i++){
            if($scope.subjects[i].name == $rootScope.search_subject){
              $scope.selected_subjects.push($scope.subjects[i]);
            }
          }
          $rootScope.search_subject = undefined;
        }

        $scope.selected_subjects.forEach(function(element) {
          selected_subjects_labels.push(element._id);
        });

        var search_params = {
          search_word: $scope.search_word,
          subjects: selected_subjects_labels,
        };

        // Save to rootScope to use when user navigates back
        $rootScope.searchParams = search_params;

        // Start search
        searchScenarios(search_params);
      }

      function searchScenarios(query){

        var q;
        if(typeof query != 'undefined'){
          q = query;
        }

        if(typeof $rootScope.sort_tab.search == 'undefined'){
          $rootScope.sort_tab.search = 'latest';
        }else{
          switch ($rootScope.sort_tab.search) {
            case 'latest':
                q.order = 'latest';
              break;
              case 'popular':
                  q.order = 'popular';
                break;
              case 'favorited':
                  q.order = 'favorited';
                break;
              case 'commented':
                  q.order = 'commented';
                break;
            default:
              q.order = 'latest';
          }
        }

        requestService.post('/scenario/search', q)
          .then(function(data) {
            //console.log(data);
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
              if(typeof q != 'undefined'){
                $scope.search_word_end = q.search_word;
              }else{
                $scope.search_word_end = undefined;
              }
              // update how many results found label
              //$scope.search_end = 1;
              $scope.loading_animation = false;
            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

      $scope.search = function() {
        $scope.search_page_nr = 1;
        $rootScope.search_page_nr = 1;
        getSearchParamsAndSearch();
      };

      $scope.pageChanged = function(new_page_nr) {
        $rootScope.search_page_nr = new_page_nr;
        //console.log($scope.search_page_nr);
      };

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.sort_tab.search){ return true; }
        return false;
      };

      $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.sort_tab.search = tab;
          getSearchParamsAndSearch();
        }else{
          $rootScope.sort_tab.search = 'latest';
          getSearchParamsAndSearch();
        }
      };

  }]); // SearchController end
}());

(function() {
  'use strict';

  angular
    .module('app')
    .controller('ModalCtrl', ['$scope',
    function($scope) {
       this.setModel = function(data) {
          $scope.$apply( function() {
             $scope = data;
          });
       };
       $scope.setModel = this.setModel;

   }]); // ModalCtrl end
}());

(function() {
    'use strict';

    angular
    .module('app')
    .factory('requestService', ['$http', function($http) {
        var API_BASE = '/api';
        return {
            get: function(request) {
                return $http.get(API_BASE + request)
                .then(function(response) {
                    return response.data;
                });
            },

            post: function(request, query) {
                return $http.post(API_BASE + request, query)
                .then(function(response) {
                    return response.data;
                });
            }
        };

    }]);

}());

(function() {
  'use strict';

  angular
    .module('app')
    .factory('userAuthService', ['$q', '$rootScope', '$location', 'requestService',
  function($q, $rootScope, $location, requestService) {
    return {
      checkUser: function(option) {

        var deferred = $q.defer();
        requestService.get('/user/me')
          .then(function(data){
            if(!$rootScope.user){
               //console.log('rootscope null, saved to rootscope');
               $rootScope.user = data;
            }

            // check if user has changed
            if($rootScope.user._id != data._id){
              console.log('user changed');

              // rewrite with new user data
              $rootScope.user = data;
            }

            if(typeof option !== 'undefined' && option.success_location){
              console.log('redirected to '+ option.success_location);
              $location.path(option.success_location);
            }else{
              deferred.resolve();
            }

          })
          .catch(function(fallback){
            $rootScope.user = undefined;
            if(typeof option !== 'undefined' && option.error_location){
              console.log('redirected to '+ option.error_location);
              $location.path(option.error_location);
            }else{
              deferred.resolve();
            }
          });
          return deferred.promise;

      }
    };

  }]);

}());

(function() {
  'use strict';

  angular
    .module('app')
    .directive('timeline', ['$routeParams','$timeout','$window','$filter',
    function($routeParams,$timeout,$window,$filter) {
      return {
        restrict: 'E',
        templateUrl: 'js/app/directives/timeline/timeline.html',
        link: function postLink($scope, element, attrs) {

            var Planner = function(options){

                //singleton
                if (Planner.instance_) {
                    return Planner.instance_;
                }
                Planner.instance_ = this;

                this.config = Planner.config;
                if(options && options.edit){ this.config.allow_edit = true; }

                //vars
                this.timeline = this.WIDTH = this.HEIGHT = null;
                this.activities = [];
                this.activities_duration = null;
                this.activity_images = [];
                this.timeouts = []; //animation timeouts

                this.zoom = false;
                this.activity_min_px_for_zoom = 50;

                // center height
                this.top_percent = 30;

                //resize delay var
                this.resizeDelay = null;

                this.init();
            };

            Planner.config = {
                activityImageNames: ['./images/one.png','./images/pair.png','./images/group.png'],
                scenarioWrapperId: '#scenario-wrapper',
                timelineWrapperId: '#scenario-timeline-wrapper',
                ColorInClass: 'rgb(100,126,228)',
                ColorOffClass: 'rgb(92,184,92)',
                ColorMaterialInClass: 'rgb(159,192,255)',
                ColorMaterialOffClass: 'rgb(202,255,190)',
                ColorAddNewButtonInClass: 'rgb(159,192,255)',
                ColorAddNewButtonOffClass: 'rgb(202,255,190)',
                legendInClass: 'tunnitegevus (in-class)',
                legendOffClass: 'muu (off-class)',
                aboveAxisLegend: 'õpetaja (teacher)',
                belowAxisLegend: 'õpilane (student)',
                AddaboveAxisLegend: 'materjal õpetajale (for teacher)',
                AddbelowAxisLegend: 'materjal õpilasele (for student)',
                defaultFontSize: 12,
                org_language: 'name_eng',
                edit: 'Edit',
                add: '+'
            };

            Planner.prototype = {
                init: function(){

                    //assigning canvas
                    this.timeline = document.querySelector(this.config.timelineWrapperId);

                    //assigning group organization images
                    var one_img = new Image();
                    one_img.src = this.config.activityImageNames[0];
                    this.activity_images.push(one_img);
                    var pair_img = new Image();
                    pair_img.src = this.config.activityImageNames[1];
                    this.activity_images.push(pair_img);
                    var group_img = new Image();
                    group_img.src = this.config.activityImageNames[2];
                    this.activity_images.push(group_img);
                    // same icon for whole class
                    this.activity_images.push(group_img);

                    this.activities_duration = $scope.scenario.activities_duration;

                    this.resize();
                    this.clearTimeline();
                    this.drawBaseLayer();
                    this.initActivities();

                    window.addEventListener("resize", this.timelineResizeDelay.bind(this));

                    //ZOOM
                    window.addEventListener("keypress", this.keyPressed.bind(this));
                    this.timeline.addEventListener("dblclick", this.dblClickEvent.bind(this));

                },
                resize: function(){
                    var border_fix = 2;

                    // wrapper
                    var timeline_wrapper = document.querySelector(this.config.scenarioWrapperId);
                    var width = timeline_wrapper.offsetWidth - border_fix;
                    var height = Math.round(timeline_wrapper.offsetWidth * (8/16));
                    this.zoom_start_width = width;

                    if(this.zoom){
                        //box minimum width when zoomed in
                        var min_width = 100;
                        width = (min_width / this.activity_min_px_for_zoom) * width;
                        //width = 3000;
                    }

                    //do the defaults
                    this.timeline.style.width = width + 'px';
                    this.timeline.style.height  = height + 'px';

                    //update constants
                    this.WIDTH = width-border_fix;
                    this.HEIGHT = height;
                    //console.log('resize w:' + width + ' h:' + height );
                },
                keyPressed: function(evt){
                    var charCode = evt.which || evt.keyCode;
                    var charStr = String.fromCharCode(charCode);
                    //console.log(charStr.toLowerCase());
                    if(charStr.toLowerCase() === 'z'){
                        this.zoomEvent();
                    }
                },
                dblClickEvent: function(evt){
                    this.zoomEvent();
                    var el = document.querySelector(this.config.scenarioWrapperId);
                    var constant = this.WIDTH / (this.zoom_start_width);
                    //console.log(this.WIDTH + ' ' + constant * evt.offsetX);
                    el.scrollLeft = constant * evt.offsetX;
                },
                zoomEvent: function(){
                    if(this.zoom){
                        this.zoom = false;
                        //fix dblclick scrollleft after zoomout
                        var el = document.querySelector(this.config.scenarioWrapperId);
                        el.scrollLeft = 0;
                    }else{
                        this.zoom = true;
                    }

                    this.timelineResize();
                },
                timelineResizeDelay: function(){
                    clearTimeout(this.resizeDelay);
                    this.resizeDelay = setTimeout(this.timelineResize.bind(this), 200);
                },
                timelineResize: function(){
                    //clear animation timeouts ?
                    for (var i=0; i<this.timeouts.length; i++) {
                      clearTimeout(this.timeouts[i]);
                    }

                    //clear popovers & tooltips
                    jQuery('.has-popover').popover('hide');
                    jQuery('.has-tooltip').tooltip('hide');

                    this.resize();

                    //TODO check if width cahnged in the future

                    this.rePositionTimeline();
                },
                rePositionTimeline: function(){
                    for(var i = 0; i < this.activities.length; i++){
                        //UPDATE STYLE
                        this.activities[i].updateActivitystyle();
                    }
                },
                drawBaseLayer: function(){

                    // legend
                    var spaceFromBottom = 15;
                    var spaceFromTop= 15;
                    var box_dim = 11;
                    this.Drawlegend(this.config.legendInClass, 0+15, spaceFromBottom, box_dim, box_dim, this.config.ColorInClass, this.timeline);
                    this.Drawlegend(this.config.legendOffClass, 160, spaceFromBottom, box_dim, box_dim, this.config.ColorOffClass, this.timeline);

                    //text legend for teacher and student side
                    this.DrawTextlegend(this.config.aboveAxisLegend, spaceFromTop, this.timeline, true); //true for top
                    this.DrawTextlegend(this.config.belowAxisLegend, spaceFromBottom, this.timeline);

                    //line
                    this.DrawLine(this.WIDTH, this.HEIGHT, 1, 'lightgray', this.timeline);

                },
                initActivities: function(){
                    console.log('loading activities');

                    var ScopeList = getScopeList();

                    if(ScopeList.length === 0 ||
                      (ScopeList.length === 1 && ScopeList[0].duration === 0)){
                      alert('please add more acitivty');
                      //TODO write to timeline
                      return;
                    }

                    var start_time = 0;
                    console.log('drawing');
                    this.activities = [];
                    for(var i = 0; i < ScopeList.length; i++){
                      //alert(getScopeList().length);
                      var Activity = new Planner.Activity(i, start_time, ScopeList[i]);
                      this.activities.push(Activity);

                      start_time += ScopeList[i].duration;

                    }

                },
                clearTimeline: function(){
                    this.timeline.innerHTML = '';
                },
                Drawlegend: function(text, x, y, box_w, box_h, color, timeline){

                    var style = {
                        bottom: y + 'px',
                        left: x + 'px',
                        width: box_w + 'px',
                        height: box_h + 'px',
                    };

                    var el = createElementWithStyle('div','.legend', style);
                    el.setAttribute('style', el.getAttribute('style') +' background-color:'+ color +' !important;');

                    timeline.appendChild(el);

                    var textPadding = 17;
                    var textStyle = {
                        bottom: y + 'px',
                        left: x + textPadding + 'px'
                    };
                    style.left = x + textPadding + 'px';
                    var textEl = createElementWithStyle('div','.legend-text', textStyle, text);
                    timeline.appendChild(textEl);
                },
                DrawTextlegend: function(text, x, timeline, top){

                    var textPadding = 17;
                    var textStyle = {
                        bottom: x + 'px',
                        right: textPadding + 'px'
                    };
                    if(top){
                        textStyle.bottom = 'none';
                        textStyle.top = x + 'px';
                    }

                    var textEl = createElementWithStyle('div','.legend-text', textStyle, text);
                    timeline.appendChild(textEl);
                },
                DrawLine: function(width, height, thickness, color, timeline){
                    var style = {
                        //top: height/2 + 'px',
                        top: this.top_percent + '%',
                        left: 0 + 'px',
                        //width: width + 'px',
                        width: '100%',
                        height: thickness + 'px',
                        backgroundColor: color
                    };
                    var el = createElementWithStyle('div','.timeline-line', style);
                    timeline.appendChild(el);
                },
                reDrawMaterial: function(todo, material_id){

                    for(var i = 0; i < Planner.instance_.activities.length; i++){
                        //update materials from scope for each activity
                        Planner.instance_.activities[i].materials = getScopeList()[i].materials;

                        if(todo === "delete" || todo === "update"){
                            for(var k = 0; k < Planner.instance_.activities[i].materialElements.length; k++){
                                //update materials from scope for each activity
                                if(Planner.instance_.activities[i].materialElements[k].material._id == material_id){


                                    if(Planner.instance_.activities[i].materialElements[k].material.position == 'top'){
                                        Planner.instance_.activities[i].has_top_material = false;
                                    }else{
                                        Planner.instance_.activities[i].has_bottom_material = false;
                                    }

                                    Planner.instance_.activities[i].materialElements.splice(k, 1);
                                    console.log('deleted material from timeline');

                                    //delete from DOM
                                    document.querySelector('#activities-wrapper').removeChild(document.querySelector('div.material-wrapper[data-id="'+material_id+'"]'));

                                }
                            }
                        }

                        if(todo === "new" || todo === "update"){
                            //draw new materials, skip if exists
                            Planner.instance_.activities[i].drawMaterials();
                        }else if (todo === "delete") {
                            //Add add-new button
                            Planner.instance_.activities[i].updateAddNewButtons();
                        }

                    }//for end

                },
                findMaterial: function(id){
                    for(var i = 0; i < Planner.instance_.activities.length; i++){
                        for(var k = 0; k < Planner.instance_.activities[i].materialElements.length; k++){
                            if(Planner.instance_.activities[i].materialElements[k].material._id == id){
                                return Planner.instance_.activities[i].materialElements[k].material;
                            }
                        }
                    }

                }
            };

            Planner.Activity = function(index, start_time, data){

                //INCOMING
                this.index = index;
                this.start = start_time;

                //ELEMENTS
                this.timeline = Planner.instance_.timeline;
                this.activites_wrapper = null;
                this.activity_wrapper = null;
                this.element = null;
                this.text_span = null;

                //MAIN DATA
                this._id = data._id;
              	this.name = data.name;
              	this.duration = data.duration;
                this.materials = data.materials;
                this.has_top_material = false;
                this.has_bottom_material = false;
                if(typeof data.in_class == 'undefined'){
                  this.in_class = false;
                }else{
                  this.in_class = true;
                }
                if(this.in_class){
                  this.class_color = Planner.instance_.config.ColorInClass;
                  this.material_class_color = Planner.instance_.config.ColorMaterialInClass;
                  this.add_new_button_color =  Planner.instance_.config.ColorAddNewButtonInClass;
                }else{
                  this.class_color = Planner.instance_.config.ColorOffClass;
                  this.material_class_color = Planner.instance_.config.ColorMaterialOffClass;
                  this.add_new_button_color =  Planner.instance_.config.ColorAddNewButtonOffClass;
                }
                this.materialElements = [];
                this.organization = data.activity_organization._id;
                this.org_title = '';
                for(var i = 0; i < $scope.activity_organization.length; i++){
                  if($scope.activity_organization[i]._id == this.organization){
                    this.org_title = $scope.activity_organization[i][Planner.instance_.config.org_language];
                  }
                }
                this.org_image = Planner.instance_.activity_images[this.organization].cloneNode(); //img element
                this.conveyor_icon_size = this.display_icon_size = 12;
                this.duration_mark = 'min'; //can be changed if needed

                // EXTRA
                this.x = this.height = this.y = this.width = this.minute_constant = this.material_height = null;

                //CALCULAT NECCESERT VARIABLES
                this.calculateVariables();

                var timeout_delay = 40; //ms
                Planner.instance_.timeouts.push(setTimeout(this.createActivity.bind(this), timeout_delay*index));
            };

            Planner.Activity.prototype = {
                calculateVariables: function(){

                    var padding = 5; //between activities

                    this.minute_constant = ((Planner.instance_.WIDTH-((getScopeList().length+1)*padding))/Planner.instance_.activities_duration); // min in px
                    this.x = parseInt((this.minute_constant * this.start) + ((this.index+1)* padding));
                    this.height = 20;
                    this.y = parseInt((Planner.instance_.HEIGHT*Planner.instance_.top_percent/100)-this.height/2);
                    this.width = parseInt(this.minute_constant * this.duration);

                    if(this.width < Planner.instance_.activity_min_px_for_zoom){
                        Planner.instance_.activity_min_px_for_zoom = this.width;
                    }
                    //var height_dim = Planner.instance_.HEIGHT * Planner.instance_.top_percent / 100;
                    this.material_height = Math.round(Planner.instance_.HEIGHT * Planner.instance_.HEIGHT  / 6000); // 6000 is just some constant, used in level * this

                },
                createActivity: function(){

                    //STRUCTURE
                    // #activities-wrapper
                    //      .single-activity-wrapper
                    //          .activity-container
                    //              span.activity-text-container
                    //              img.activity-org-icon

                    // ALL ACTIVITIES WRAPPER
                    this.activities_wrapper = document.querySelector('#activities-wrapper');
                    if(!this.activities_wrapper){
                        this.activities_wrapper = createElementWithStyle('div','#activities-wrapper');
                        this.timeline.appendChild(this.activities_wrapper);
                    }

                    // ELEMENT
                    var style = this.getActivityStyle();
                    var el = createElementWithStyle('div','.activity-container', style, null, {attribute: 'data-id', value: this._id});
                    //for printing
                    el.setAttribute('style', el.getAttribute('style') +' background-color:'+ this.class_color +' !important;');

                    // TEXT & DURATION
                    var span_style = this.getSpanStyle();
                    this.text_span = createElementWithStyle('span','.activity-text-container', span_style);
                    var text = document.createTextNode(this.name);
                    this.duration_span = createElementWithStyle('span','.activity-duration-container');
                    this.duration_min_span = createElementWithStyle('span','.activity-duration-min-container');
                    var duration = document.createTextNode(this.duration);
                    this.duration_span.appendChild(duration);
                    this.duration_min_span.appendChild(document.createTextNode(this.duration_mark));
                    this.duration_span.appendChild(this.duration_min_span);
                    this.text_span.appendChild(this.duration_span);
                    this.text_span.appendChild(text);
                    el.appendChild(this.text_span);

                    // ORG ICON
                    var org_icon_style = this.getOrgIconStyle();
                    this.org_image.className = 'activity-org-icon';
                    this.org_image.alt = this.org_title;
                    setElementStyle(this.org_image, org_icon_style);
                    el.appendChild(this.org_image);

                    //ORG ICON TEXT
                    var org_title = document.createTextNode(this.org_title);
                    this.org_title_span = createElementWithStyle('span','.activity-org-title');
                    this.org_title_span.appendChild(org_title);
                    el.appendChild(this.org_title_span);

                    // APPEND ELEMENT
                    this.activities_wrapper.appendChild(el);
                    this.element = el;

                    // CREATE MATERIALS
                    Planner.instance_.timeouts.push(setTimeout(this.drawMaterials.bind(this), 300));
                    this.bindEvents();
                },
                getActivityStyle: function(){
                    return {
                        top: this.y + 'px',
                        left: this.x + 'px',
                        width: this.width + 'px',
                        height: this.height + 'px'
                    };
                },
                getSpanStyle: function(){
                    var style = {};
                    // hide text if width less than
                    if(this.width < 30){
                        style.display = 'none';
                    }else{
                        style.display = 'block';
                    }
                    return style;
                },
                getOrgIconStyle: function(){
                    var style = {};
                    // hide text if width less than
                    if(this.width < 20){
                        style.display = 'none';
                    }else{
                        style.display = 'block';
                    }
                    return style;
                },
                updateActivitystyle: function(){
                    //UPDATE vars
                    this.calculateVariables();

                    // ELEMENT
                    var style = this.getActivityStyle();
                    setElementStyle(this.element, style);

                    // TEXT
                    var span_style = this.getSpanStyle();
                    setElementStyle(this.text_span, span_style);

                    // ORG ICON
                    var org_icon_style = this.getOrgIconStyle();
                    setElementStyle(this.org_image, org_icon_style);

                    this.updateMaterials();
                },
                bindEvents: function(el){
                    this.element.addEventListener('mouseover', this.hover.bind(this), true);
                    this.element.addEventListener('mouseout', this.unHover.bind(this), true);
                },
                hover: function(e){
                    this.element.className += ' activity-container-hover';
                    var expanded_width = 200;
                    //check which way to expand, and is expandable
                    if(this.width < expanded_width){
                        this.element.style.width = expanded_width + 'px';
                        if(this.x < expanded_width/2){
                            //expand righy
                            //DO NOTHING WITH ADJUSTMENT
                        }else if(this.x + expanded_width > Planner.instance_.WIDTH) {
                            //expand left
                            this.element.style.left = this.x - (expanded_width - this.width) + 'px';
                        }else{
                            // expand middle
                            this.element.style.left = this.x - ((expanded_width - this.width)/2) + 'px';
                        }
                    }
                },
                unHover: function(e){
                    this.element.className = this.element.className.replace(' activity-container-hover', '');
                    this.element.style.left = this.x  + 'px';
                    this.element.style.width = this.width  + 'px';
                },
                drawMaterials: function(){

                    // IF there ARE ANY
                    if(this.materials && this.materials.length > 0){

                        //FOR every material
                        for(var i = 0; i < this.materials.length; i++){

                            // .material-wrapper top/bottom
                            //      .material-container bottom
                            //          a > text
                            //      a.conveyor-container top/bottom
                            //          img.conveyor-icon
                            //      .display-container bottom
                            //          img.display-icon

                            var material = this.materials[i];

                            if(!this.materialExists(material)){
                                //console.log('new');
                                // WRAPPER ELEMENT
                                var wrapper_style = this.getMateriaMainStyle(material);
                                var material_wrapper = createElementWithStyle('div','.material-wrapper '+material.position, wrapper_style, null, {attribute: 'data-id', value: material._id});

                                // MATERIAL ITSELF
                                var m_el = createElementWithStyle('div','.material-container '+material.position);
                                m_el.title = material.material_name; // title for tooltip
                                //for print, there needs to be !important
                                m_el.setAttribute('style', 'background-color:'+ this.material_class_color +' !important;');

                                // MATERIAL MAIN TEXT
                                var text_el = null;
                                var text = document.createTextNode(material.material_name);

                                // IF DIGITAL MATERIAL ADD LINK
                                if(material.material_url){
                                    text_el = document.createElement('a');
                                    text_el.href = material.material_url;
                                    text_el.target = '_blank';
                                    text_el.appendChild(text);
                                }else{
                                    // no link
                                    text_el = text;
                                }
                                m_el.appendChild(text_el);

                                // APPEND MATERIAL
                                material_wrapper.appendChild(m_el);
                                this.activities_wrapper.appendChild(material_wrapper);

                                //CONVEYOR
                                var conveyors = [];
                                //console.log(material.conveyors);
                                if(material.conveyors.length > 0){

                                    for(var k = material.conveyors.length-1; k >= 0 ; k--){

                                        var current_conveyor = material.conveyors[k];

                                        if(current_conveyor.name){

                                            var conveyor_style = this.getConveyorStyle(material, wrapper_style, k, material.conveyors.length);

                                            // LINK TO CONVEYOR
                                            var conveyor = createElementWithStyle('a','.conveyor-container '+material.position, conveyor_style);
                                            if(current_conveyor.url){
                                                // ICON IMAGE
                                                var conveyor_icon = new Image();
                                                conveyor_icon.className = 'conveyor-icon';
                                                conveyor_icon.src = 'http://www.google.com/s2/favicons?domain='+current_conveyor.url;
                                                conveyor_icon.style.width = this.conveyor_icon_size + 'px';
                                                conveyor_icon.style.height = this.conveyor_icon_size + 'px';
                                                conveyor.appendChild(conveyor_icon);

                                                //fix url
                                                var new_url = current_conveyor.url;
                                                if (!new_url.match(/^[a-zA-Z]+:\/\//))
                                                {
                                                    new_url = 'http://' + new_url;
                                                }

                                                conveyor.href = new_url;
                                                conveyor.target = '_blank';
                                            }
                                            //conveyor.title = current_conveyor.name; hide for popover_content
                                            conveyor.setAttribute('data-popdata', current_conveyor.name);

                                            //APPEND CONVEYOR
                                            material_wrapper.appendChild(conveyor);

                                            conveyors.push({index: k, conveyor: conveyor});
                                        }
                                    }

                                    var last_conveyor = conveyors[conveyors.length-1].conveyor;
                                    last_conveyor.className += " has-popover";
                                    last_conveyor.setAttribute('data-toggle', 'popover');

                                    //create HTML
                                    var popover_content = document.createElement('div');
                                    for(var d = 0; d < conveyors.length; d++){

                                        var conveyor_clone = conveyors[d].conveyor.cloneNode(true);
                                        var textdata = document.createTextNode(conveyor_clone.dataset.popdata);
                                        conveyor_clone.appendChild(textdata);
                                        conveyor_clone.className = "inner-conveyor-icon";
                                        popover_content.appendChild(conveyor_clone);

                                        // remove hrefs for clicks
                                        conveyors[d].conveyor.removeAttribute('href');
                                    }
                                    this.createPopover(last_conveyor, popover_content);
                                }

                                // DISPLAY
                                var displays = [];
                                //adpat to displays
                                //console.log(material.displays);
                                if(material.displays.length > 0){

                                    for(var j = 0; j < material.displays.length; j++){

                                        var current_display = material.displays[j];
                                        // DISPLAY IMAGE
                                        var display_icon = new Image();
                                        display_icon.className = 'display-icon';
                                        display_icon.src = 'images/'+$scope.displays_list[current_display].icon;
                                        display_icon.style.width = this.display_icon_size + 'px';
                                        display_icon.style.height = this.display_icon_size + 'px';

                                        var display_style = this.getDisplayStyle(material, wrapper_style, j, material.displays.length);

                                        // DISPLAY CONTAINER DIV
                                        var display = createElementWithStyle('div','.display-container '+material.position, display_style);
                                        //display.title = $scope.displays_list[current_display].name; hide for popover

                                        //name for popover
                                        display.setAttribute("data-popdata", $scope.displays_list[current_display].name);

                                        display.appendChild(display_icon);

                                        //APPEND DISPLAY
                                        material_wrapper.appendChild(display);
                                        displays.push({index: j, display: display});
                                    }

                                    // BOOTSTRAP POPOVER for first display even if has multiple
                                    var last_display = displays[displays.length-1].display;
                                    last_display.className += " has-popover";
                                    last_display.setAttribute('data-toggle', 'popover');
                                    //create HTML
                                    var pop_content = document.createElement('div');
                                    for(var e = 0; e < displays.length; e++){

                                        var display_clone = displays[e].display.cloneNode(true);
                                        var display_textdata = document.createTextNode(display_clone.dataset.popdata);
                                        display_clone.appendChild(display_textdata);
                                        display_clone.className = "inner-display-icon";
                                        pop_content.appendChild(display_clone);
                                    }
                                    this.createPopover(last_display, pop_content);

                                }

                                //EDIT LINK IF IN EDIT MODE
                                if(Planner.instance_.config.allow_edit){
                                    var edit_overflow = createElementWithStyle('a','.material-edit '+material.position, {backgroundColor: 'rgba(0,0,0,0.2)'});
                                    edit_overflow.title = Planner.instance_.config.edit; // title for tooltip
                                    var edit_text = document.createTextNode(Planner.instance_.config.edit);
                                    var edit_text_span = document.createElement('span');
                                    edit_text_span.appendChild(edit_text);
                                    edit_overflow.appendChild(edit_text_span);
                                    material_wrapper.appendChild(edit_overflow);

                                    this.bindOpenModal(edit_overflow, material.position, material._id);
                                }

                                if(material.position === 'top'){
                                    this.has_top_material = true;
                                }else if (material.position === 'bottom') {
                                    this.has_bottom_material = true;
                                }

                                // FOR UPDATING STYlES LATER
                                this.materialElements.push({
                                    material: material,
                                    element: material_wrapper,
                                    conveyors: conveyors,
                                    displays: displays
                                });

                            } // exists end

                        } //for end
                    } // if there are any end

                    this.updateAddNewButtons();

                },
                createPopover: function(el, content){
                    // BOOTSTRAP - http://stackoverflow.com/questions/15989591/how-can-i-keep-bootstrap-popover-alive-while-the-popover-is-being-hovered
                    jQuery(el).popover({
                        animation: false,
                        content: content,
                        trigger: 'manual',
                        container: "#scenario-timeline-wrapper",
                        viewport: "#scenario-timeline-wrapper",
                        placement: 'right auto',
                        html: true
                    }).on("mouseenter", function () {
                        var _this = this;

                        //clear popovers
                        jQuery('.has-popover').popover('hide');

                        jQuery(this).popover("show");
                        jQuery(".popover").on("mouseleave", function () {
                            jQuery(_this).popover('hide');
                        });
                    }).on("mouseleave", function () {
                        var _this = this;
                        setTimeout(function () {
                        if (!jQuery(".popover:hover").length) {
                            jQuery(_this).popover("hide");
                        }
                        }, 300);
                    });
                },
                materialExists: function(material){
                    for(var i = 0; i < this.materialElements.length; i++){
                        if(this.materialElements[i].material._id === material._id){
                            //console.log('exists');
                            return true;
                        }
                    }

                    return false;
                },
                addNewButtonExists: function(class_name, activity_id){
                    return document.querySelector('div.new-material-button.'+class_name+'[data-id="'+activity_id+'"]');
                },

                updateAddNewButtons: function(){
                    //ADD NEW LINKS IF IN EDIT MODE
                    if(Planner.instance_.config.allow_edit){
                        //for every empty space
                        var activity = this;
                        var top_button = this.addNewButtonExists('top', activity._id);
                        var bottom_button = this.addNewButtonExists('bottom', activity._id);

                        if(!this.has_top_material && !top_button){
                            //console.log('created new top');
                            var top_style = this.getAddNewButtonStyle('top');
                            var top_overflow = this.createAddButtonOverflow(top_style, 'top', activity._id);
                            this.activities_wrapper.appendChild(top_overflow);
                            top_overflow.addEventListener('click', function(){
                                //console.log('click top');
                                $scope.openAddMaterialModal(activity, 'top');

                            });

                        }else if(this.has_top_material && top_button){
                            // remove, is unneccesery
                            this.activities_wrapper.removeChild(top_button);
                            //console.log('should remove');
                        }

                        if(!this.has_bottom_material && !bottom_button){
                            //console.log('created new bottom');
                            var bottom_style = this.getAddNewButtonStyle('bottom');
                            var bottom_overflow = this.createAddButtonOverflow(bottom_style, 'bottom', activity._id);
                            this.activities_wrapper.appendChild(bottom_overflow);
                            bottom_overflow.addEventListener('click', function(){
                                //console.log('click bottom');
                                $scope.openAddMaterialModal(activity, 'bottom');

                            });

                        }else if(this.has_bottom_material && bottom_button){
                            // remove, is unneccesery
                            this.activities_wrapper.removeChild(bottom_button);
                            //console.log('should remove bottom');
                        }
                    }
                },
                bindOpenModal: function(element, pos, id){
                    var activity = this;
                    element.addEventListener('click', function(){
                        //console.log('edit click' + i);
                        $scope.openEditMaterialModal(activity, pos, Planner.instance_.findMaterial(id));
                    });
                },
                createAddButtonOverflow: function(style, pos, activity_id){
                    //console.log(activity_id);
                    var button_wrapper = createElementWithStyle('div','.new-material-button '+pos, style, null, {attribute: 'data-id', value: activity_id});
                    button_wrapper.setAttribute('style', button_wrapper.getAttribute('style') +' background-color:'+ style.backgroundColor +' !important;');

                    var button_overflow = createElementWithStyle('a','.new-add has-tooltip '+pos, {backgroundColor: 'rgba(0,0,0,0.2)'});
                    var add_text = document.createTextNode(Planner.instance_.config.add);
                    var add_text_span = document.createElement('span');
                    add_text_span.appendChild(add_text);
                    button_overflow.appendChild(add_text_span);
                    button_wrapper.appendChild(button_overflow);

                    //add tooltip
                    if(pos == "top"){
                        button_overflow.title = Planner.instance_.config.AddaboveAxisLegend;
                        jQuery(button_overflow).tooltip({container: '#scenario-timeline-wrapper', animation: false, placement: "auto "+pos, html: true});
                    }else if(pos == "bottom"){
                        button_overflow.title = Planner.instance_.config.AddbelowAxisLegend;
                        jQuery(button_overflow).tooltip({container: '#scenario-timeline-wrapper', animation: false, placement: "auto "+pos, html: true});
                    }

                    return button_wrapper;
                },
                getMateriaMainStyle: function(material){

                    var m_height = 29 + (this.material_height * material.involvement_level);

                    // DISABLE teacher involvement_level
                    if(material.position === 'top'){
                        m_height = 10 + this.material_height;
                    }

                    var m_top = this.y + this.height;
                    if(material.position === 'top'){
                        m_top -=  this.height + m_height;
                    }

                    return {
                        top: m_top + 'px',
                        left: this.x + 'px', //parent left
                        width: this.width + 'px', //parent width
                        height: m_height + 'px',
                        backgroundColor: 'transparent',
                    };
                },
                getConveyorStyle: function(material, material_style, index, count){
                    var padding_top = 4;

                    var conveyor_top = null;
                    if(material.position === 'top'){
                        conveyor_top = -this.conveyor_icon_size -8 - padding_top;
                    }else{
                        conveyor_top = parseInt(material_style.height.replace('px',''));
                        conveyor_top += padding_top;
                    }

                    /* TODO IF there is no room, hide */
                    var padding = 3;

                    return {
                        left: this.width - this.conveyor_icon_size - 8 - count*padding + index * padding + padding  + 'px',
                        top: conveyor_top + 'px'
                    };
                },
                getDisplayStyle: function(material, material_style, index, count){

                    var padding_top = 4;

                    var display_top = null;
                    if(material.position === 'top'){
                        display_top = -this.conveyor_icon_size -8 - padding_top;
                    }else{
                        display_top = parseInt(material_style.height.replace('px',''));
                        display_top += padding_top;
                    }

                    var padding = 3;

                    return {
                        left: count*padding - index * padding - padding+ 'px',
                        top: display_top + 'px'
                    };
                },
                getAddNewButtonStyle: function(position){

                    var height = 30;
                    var width = 30;
                    var margin = 10;

                    var top = this.y + this.height + margin;
                    if(position === 'top'){
                        top -=  this.height + height + margin*2;
                    }
                    return {
                        top: top + 'px',
                        left: (this.x + this.width/2 - width/2)+ 'px', //parent left
                        width: width + 'px', //parent width
                        height: height + 'px',
                        backgroundColor: this.add_new_button_color,
                    };
                },
                updateMaterials: function(){
                    //if there are any
                    if(this.materialElements.length > 0){

                        for(var i = 0; i < this.materialElements.length; i++){

                            var material = this.materialElements[i].material;
                            var material_element = this.materialElements[i].element;
                            var conveyors = this.materialElements[i].conveyors;
                            var displays = this.materialElements[i].displays;

                            //MATERIAL
                            var material_style = this.getMateriaMainStyle(material);
                            setElementStyle(material_element, material_style);

                            //CONVEYORS
                            if(conveyors.length > 0){
                                for(var k = 0; k < conveyors.length; k++){
                                    var conveyor_style = this.getConveyorStyle(material, material_style, k, conveyors.length);
                                    setElementStyle(conveyors[k].conveyor, conveyor_style);
                                }
                            }

                            //DISPLAYS
                            if(displays.length > 0){
                                for(var j = 0; j < displays.length; j++){
                                    var display_style = this.getDisplayStyle(material, material_style, j, displays.length);
                                    setElementStyle(displays[j].display, display_style);
                                }
                            }

                        }

                    }

                    //update add new button position
                    if(Planner.instance_.config.allow_edit){
                        //for every empty space
                        var activity = this;
                        var button_top = this.addNewButtonExists('top', activity._id);
                        var button_bottom = this.addNewButtonExists('bottom', activity._id);

                        if(button_top){
                            //console.log('created new top');
                            var top_style = this.getAddNewButtonStyle('top');
                            setElementStyle(button_top, top_style);
                            //for printig
                            button_top.setAttribute('style', button_top.getAttribute('style') +' background-color:'+ top_style.backgroundColor +' !important;');
                        }

                        if(button_bottom){
                            //console.log('created new bottom');
                            var bottom_style = this.getAddNewButtonStyle('bottom');
                            setElementStyle(button_bottom, bottom_style);
                            button_bottom.setAttribute('style', button_bottom.getAttribute('style') +' background-color:'+ bottom_style.backgroundColor +' !important;');
                        }
                    }

                }
            };

            /*
                HELPERS
            */
            var createElementWithStyle = function(type, selector, style, text, data){
                var el = document.createElement(type);
                if(selector.charAt(0) === '.'){
                    el.className = selector.slice(1);
                }else{
                    el.id = selector.slice(1);
                }
                if(style){
                    setElementStyle(el, style);
                }
                if(text){
                    el.appendChild(document.createTextNode(text));
                }

                if(data){
                    el.setAttribute(data.attribute, data.value);
                }

                return el;
            };
            var setElementStyle = function(el, style){
                if(style){
                    for (var property in style){
                        el.style[property] = style[property];
                    }
                }
            };
            var escapeRegExp = function(str) {
                return str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            };

            var getScopeList = function(){
                return $scope.activity_list;
            };

            angular.element($window).ready(function() {
                console.log('ready');
                var edit = false;
                if($scope.allow_edit){ edit = true;}
                var newPlanner = new Planner({edit: edit});

                // !IMPORTANT enable redraw fn in controller
                if(edit === true){
                  $scope.setreDrawMaterialFunction({theDirFn: Planner.instance_.reDrawMaterial});
                }
            });

        }//link end
      };

    }]);

}());

(function() {
  'use strict';

  angular
    .module('app')
    .directive('editcanvasmodal', ['$timeout',
    function($timeout) {
      return {
  			restrict: 'E',
        templateUrl: 'js/app/directives/modal/modal.html',
  			link: function postLink($scope, element, attrs) {

          var manageModal = function(show_or_hide){
            // fix digest issue
            $timeout(function() {
              var element = angular.element('#myModal');
              var ctrl = element.controller();
              ctrl.setModel($scope);
              element.modal(show_or_hide);
            }, 0);
          };

          $scope.setManageFunction({theDirFn: manageModal});
        },

      };
  }]);

}());

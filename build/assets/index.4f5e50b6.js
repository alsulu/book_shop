var st=Object.defineProperty;var it=(n,e,t)=>e in n?st(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var U=(n,e,t)=>(it(n,typeof e!="symbol"?e+"":e,t),t);function Yt(){import("data:text/javascript,")}const rt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}};rt();const y={routes:{index:"/",search:"/search/:search",cart:"/cart",wishlist:"/wishlist",profile:"/profile",register:"/register",login:"/login",book:"/book/:book",user:"/user/:user"},search:{types:{book:"book",user:"user"}},lists:{types:{book:"book",user:"user"}}};function ot(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var z={};(function(n){var e=function(){var t=function(w,r,o,c){for(o=o||{},c=w.length;c--;o[w[c]]=r);return o},i=[1,9],s=[1,10],a=[1,11],p=[1,12],u=[5,11,12,13,14,15],d={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(r,o,c,h,l,f,B){var b=f.length-1;switch(l){case 1:return new h.Root({},[f[b-1]]);case 2:return new h.Root({},[new h.Literal({value:""})]);case 3:this.$=new h.Concat({},[f[b-1],f[b]]);break;case 4:case 5:this.$=f[b];break;case 6:this.$=new h.Literal({value:f[b]});break;case 7:this.$=new h.Splat({name:f[b]});break;case 8:this.$=new h.Param({name:f[b]});break;case 9:this.$=new h.Optional({},[f[b-1]]);break;case 10:this.$=r;break;case 11:case 12:this.$=r.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:i,13:s,14:a,15:p},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:i,13:s,14:a,15:p},{1:[2,2]},t(u,[2,4]),t(u,[2,5]),t(u,[2,6]),t(u,[2,7]),t(u,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:i,13:s,14:a,15:p},t(u,[2,10]),t(u,[2,11]),t(u,[2,12]),{1:[2,1]},t(u,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:i,12:[1,16],13:s,14:a,15:p},t(u,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(r,o){if(o.recoverable)this.trace(r);else{let c=function(h,l){this.message=h,this.hash=l};throw c.prototype=Error,new c(r,o)}},parse:function(r){var o=this,c=[0],h=[null],l=[],f=this.table,B="",b=0,D=0,Z=2,H=1,tt=l.slice.call(arguments,1),m=Object.create(this.lexer),S={yy:{}};for(var $ in this.yy)Object.prototype.hasOwnProperty.call(this.yy,$)&&(S.yy[$]=this.yy[$]);m.setInput(r,S.yy),S.yy.lexer=m,S.yy.parser=this,typeof m.yylloc=="undefined"&&(m.yylloc={});var M=m.yylloc;l.push(M);var et=m.options&&m.options.ranges;typeof S.yy.parseError=="function"?this.parseError=S.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var nt=function(){var L;return L=m.lex()||H,typeof L!="number"&&(L=o.symbols_[L]||L),L},g,A,_,N,C={},O,x,F,I;;){if(A=c[c.length-1],this.defaultActions[A]?_=this.defaultActions[A]:((g===null||typeof g=="undefined")&&(g=nt()),_=f[A]&&f[A][g]),typeof _=="undefined"||!_.length||!_[0]){var j="";I=[];for(O in f[A])this.terminals_[O]&&O>Z&&I.push("'"+this.terminals_[O]+"'");m.showPosition?j="Parse error on line "+(b+1)+`:
`+m.showPosition()+`
Expecting `+I.join(", ")+", got '"+(this.terminals_[g]||g)+"'":j="Parse error on line "+(b+1)+": Unexpected "+(g==H?"end of input":"'"+(this.terminals_[g]||g)+"'"),this.parseError(j,{text:m.match,token:this.terminals_[g]||g,line:m.yylineno,loc:M,expected:I})}if(_[0]instanceof Array&&_.length>1)throw new Error("Parse Error: multiple actions possible at state: "+A+", token: "+g);switch(_[0]){case 1:c.push(g),h.push(m.yytext),l.push(m.yylloc),c.push(_[1]),g=null,D=m.yyleng,B=m.yytext,b=m.yylineno,M=m.yylloc;break;case 2:if(x=this.productions_[_[1]][1],C.$=h[h.length-x],C._$={first_line:l[l.length-(x||1)].first_line,last_line:l[l.length-1].last_line,first_column:l[l.length-(x||1)].first_column,last_column:l[l.length-1].last_column},et&&(C._$.range=[l[l.length-(x||1)].range[0],l[l.length-1].range[1]]),N=this.performAction.apply(C,[B,D,b,S.yy,_[1],h,l].concat(tt)),typeof N!="undefined")return N;x&&(c=c.slice(0,-1*x*2),h=h.slice(0,-1*x),l=l.slice(0,-1*x)),c.push(this.productions_[_[1]][0]),h.push(C.$),l.push(C._$),F=f[c[c.length-2]][c[c.length-1]],c.push(F);break;case 3:return!0}}return!0}},k=function(){var w={EOF:1,parseError:function(o,c){if(this.yy.parser)this.yy.parser.parseError(o,c);else throw new Error(o)},setInput:function(r,o){return this.yy=o||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var o=r.match(/(?:\r\n?|\n).*/g);return o?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var o=r.length,c=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-o),this.offset-=o;var h=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var l=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===h.length?this.yylloc.first_column:0)+h[h.length-c.length].length-c[0].length:this.yylloc.first_column-o},this.options.ranges&&(this.yylloc.range=[l[0],l[0]+this.yyleng-o]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),o=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+o+"^"},test_match:function(r,o){var c,h,l;if(this.options.backtrack_lexer&&(l={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(l.yylloc.range=this.yylloc.range.slice(0))),h=r[0].match(/(?:\r\n?|\n).*/g),h&&(this.yylineno+=h.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:h?h[h.length-1].length-h[h.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],c=this.performAction.call(this,this.yy,this,o,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),c)return c;if(this._backtrack){for(var f in l)this[f]=l[f];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,o,c,h;this._more||(this.yytext="",this.match="");for(var l=this._currentRules(),f=0;f<l.length;f++)if(c=this._input.match(this.rules[l[f]]),c&&(!o||c[0].length>o[0].length)){if(o=c,h=f,this.options.backtrack_lexer){if(r=this.test_match(c,l[f]),r!==!1)return r;if(this._backtrack){o=!1;continue}else return!1}else if(!this.options.flex)break}return o?(r=this.test_match(o,l[h]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var o=this.next();return o||this.lex()},begin:function(o){this.conditionStack.push(o)},popState:function(){var o=this.conditionStack.length-1;return o>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(o){return o=this.conditionStack.length-1-Math.abs(o||0),o>=0?this.conditionStack[o]:"INITIAL"},pushState:function(o){this.begin(o)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(o,c,h,l){switch(h){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return w}();d.lexer=k;function v(){this.yy={}}return v.prototype=d,d.Parser=v,new v}();typeof ot!="undefined"&&(n.parser=e,n.Parser=e.Parser,n.parse=function(){return e.parse.apply(e,arguments)})})(z);function R(n){return function(e,t){return{displayName:n,props:e,children:t||[]}}}var W={Root:R("Root"),Concat:R("Concat"),Literal:R("Literal"),Splat:R("Splat"),Param:R("Param"),Optional:R("Optional")},J=z.parser;J.yy=W;var at=J,ct=Object.keys(W);function lt(n){return ct.forEach(function(e){if(typeof n[e]=="undefined")throw new Error("No handler defined for "+e.displayName)}),{visit:function(e,t){return this.handlers[e.displayName].call(this,e,t)},handlers:n}}var Y=lt,ht=Y,ut=/[\-{}\[\]+?.,\\\^$|#\s]/g;function G(n){this.captures=n.captures,this.re=n.re}G.prototype.match=function(n){var e=this.re.exec(n),t={};if(!!e)return this.captures.forEach(function(i,s){typeof e[s+1]=="undefined"?t[i]=void 0:t[i]=decodeURIComponent(e[s+1])}),t};var pt=ht({Concat:function(n){return n.children.reduce(function(e,t){var i=this.visit(t);return{re:e.re+i.re,captures:e.captures.concat(i.captures)}}.bind(this),{re:"",captures:[]})},Literal:function(n){return{re:n.props.value.replace(ut,"\\$&"),captures:[]}},Splat:function(n){return{re:"([^?]*?)",captures:[n.props.name]}},Param:function(n){return{re:"([^\\/\\?]+)",captures:[n.props.name]}},Optional:function(n){var e=this.visit(n.children[0]);return{re:"(?:"+e.re+")?",captures:e.captures}},Root:function(n){var e=this.visit(n.children[0]);return new G({re:new RegExp("^"+e.re+"(?=\\?|$)"),captures:e.captures})}}),dt=pt,ft=Y,mt=ft({Concat:function(n,e){var t=n.children.map(function(i){return this.visit(i,e)}.bind(this));return t.some(function(i){return i===!1})?!1:t.join("")},Literal:function(n){return decodeURI(n.props.value)},Splat:function(n,e){return e[n.props.name]?e[n.props.name]:!1},Param:function(n,e){return e[n.props.name]?e[n.props.name]:!1},Optional:function(n,e){var t=this.visit(n.children[0],e);return t||""},Root:function(n,e){e=e||{};var t=this.visit(n.children[0],e);return t?encodeURI(t):!1}}),yt=mt,gt=at,bt=dt,_t=yt;q.prototype=Object.create(null);q.prototype.match=function(n){var e=bt.visit(this.ast),t=e.match(n);return t||!1};q.prototype.reverse=function(n){return _t.visit(this.ast,n)};function q(n){var e;if(this?e=this:e=Object.create(q.prototype),typeof n=="undefined")throw new Error("A route spec is required");return e.spec=n,e.ast=gt.parse(n),e}var kt=q,vt=kt,P=vt;function wt(n={}){return`<main-nav type="post"></main-nav>
<div>Main template (new)</div>
<list-component title="Lastest" list-type="book"></list-component>`}function xt(n={}){return`<main-nav type="post"></main-nav>
<div>Cart</div>`}function Et(n={}){return`<main-nav type="post"></main-nav>
<book-detail book="${n.book}"></book-detail>`}function St(n={}){return`<main-nav type="user"></main-nav>
<div>wishlist</div>`}function At(n={}){return`<main-nav type="book"></main-nav>
<list-component title="search" search="${n.search}" book="" list-type="book"></list-component>`}function Ct(n={}){return`<main-nav type="post"></main-nav>
<div>profile</div>`}const E={Main:new P(y.routes.index),Book:new P(y.routes.book),Search:new P(y.routes.search),Cart:new P(y.routes.cart),Wishlist:new P(y.routes.wishlist),Profile:new P(y.routes.profile)},Lt=[{route:E.Main,page:wt},{route:E.Book,page:Et},{route:E.Search,page:At},{route:E.Wishlist,page:St},{route:E.Profile,page:Ct},{route:E.Cart,page:xt}],Rt=n=>{const e=Lt.find(t=>t.route.match(n));if(e){const t=e.route.match(n);return{page:e.page,route:e.route,params:t}}return null},V=n=>{let e="<h1>404</h1>";const t=Rt(n);t&&(e=t.page(t.params)),document.querySelector("#app").innerHTML=e},T=n=>{window.history.pushState({path:n},n,n),V(n)},Pt=()=>{window.addEventListener("popstate",n=>{V(new URL(window.location.href).pathname)}),document.querySelectorAll('[href^="/"]').forEach(n=>{n.addEventListener("click",e=>{e.preventDefault();const{pathname:t}=new URL(e.target.href);T(t)})}),V(new URL(window.location.href).pathname)};class qt extends HTMLElement{constructor(){super();U(this,"onClick",t=>{if(t.preventDefault(),!this.selected){const{pathname:i}=new URL(t.target.href);T(i)}});const t=this.attachShadow({mode:"open"}),i=document.createElement("a"),s=document.createElement("style");this.selected=!1,s.textContent=`
            a {
                padding: 5px;
                margin: 5px 5px 5px 0;
                background-color: #ddd;
                color: #333;
            }
            a:hover {
                background-color: #666;
                color: #eee;
                text-decoration: none;
            }
        `,t.appendChild(s),t.appendChild(i)}connectedCallback(){const t=this.shadowRoot,i=this.getAttribute("href"),s=t.querySelector("a");s.href=i,s.textContent=this.getAttribute("text"),s.addEventListener("click",this.onClick)}static get observedAttributes(){return["selected"]}attributeChangedCallback(t,i,s){t==="selected"&&this.updateStyle(JSON.parse(s))}updateStyle(t){if(t){const s=this.shadowRoot.querySelector("style");this.selected=!0,s.textContent=`
                a {
                    padding: 5px;
                    margin: 5px 5px 5px 0;
                    background-color: #333;
                    text-decoration: none;
                    color: #ccc;
                    cursor: default;
                }
            `}}}customElements.define("nav-link",qt);class Tt extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.setAttribute("class","main-menu"),this.links=[{href:y.routes.index,name:"home",class:"home-link"},{href:y.routes.book,name:"Book",class:"book-link"},{href:y.routes.wishlist,name:"wishlist",class:"wishlist-link"},{href:y.routes.profile,name:"profile",class:"profile-link"}];const i=document.createElement("style");i.textContent=`
            .main-menu {
                display: flex;
                align-items: center;
                padding: 5px;
            } 

            .global-search {
                font-size: 1am;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 4px 20px;
                width: 100%;
                margin: 0 50px;
            }

            .global-search:placeholder {
                color: #aaa;
            }
        `,e.appendChild(i),e.appendChild(t);const s=document.createDocumentFragment();this.links.forEach(u=>{const d=document.createElement("nav-link");d.setAttribute("class",`main-link ${u.class}`),d.setAttribute("href",u.href),d.setAttribute("text",u.name),s.appendChild(d)}),t.appendChild(s);const a=document.createElement("select");a.setAttribute("class","select"),a.innerHTML=`
            <option selected value="books">Books</option>
            <option value="users">Users</option>
        `;const p=document.createElement("input");p.setAttribute("class","global-search"),p.addEventListener("keyup",u=>{if(u.stopPropagation,u.key==="Enter"){u.preventDefault();const d=u.target.value,k=E.Search.reverse({search:d});T(k)}}),t.appendChild(p)}updateSearch(){const t=this.shadowRoot.querySelector("input"),i=this.getAttribute("search");t.value=i,this.searchType===y.search.type.book?t.setAttribute("placeholder","Search book..."):this.searchType===y.search.type.user&&t.setAttribute("placeholder","Search user...")}connectedCallback(){const e=this.shadowRoot,t=this.getAttribute("search");if(this.searchType=this.getAttribute("type")?this.getAttribute("type"):y.search.types.book,t){const a=e.querySelector("input");a.value=t}const{pathname:i}=new URL(window.location.href),s=this.links.find(a=>a.href==i);s&&e.querySelector(`.${s.class}`).setAttribute("selected",!0)}static get observedAttributes(){return["search","type"]}attributeChangedCallback(e,t,i){e==="search"&&this.updateSearch(),e==="type"&&(this.searchType=i,this.updateSearch())}}customElements.define("main-nav",Tt);class Ot extends HTMLElement{constructor(){super();U(this,"onClick",t=>{if(t.preventDefault(),!this.selected){const{pathname:i}=new URL(t.target.href);T(i)}});const t=this.attachShadow({mode:"open"}),i=document.createElement("img");i.setAttribute("class","user-avatar");const s=document.createElement("p");s.setAttribute("class","avatar-name");const a=document.createElement("style");a.textContent=`
            .user-avatar {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: red;
            }
            .user-avatar.small {
                width: 10px;
                height: 10px;
            }
        `,t.appendChild(a),t.appendChild(i),t.appendChild(s)}connectedCallback(){this.updateElement()}static get observedAttributes(){return["user-name","small"]}attributeChangedCallback(t,i,s){this.updateElement()}updateElement(){this.shadowRoot;const t=this.getAttribute("user-name"),i=this.getAttribute("small"),s=this.querySelector(".user-avatar"),a=this.querySelector(".avatar-name");i?s.setAttribute("class"," user-avatar small"):s.setAttribute("class"," user-avatar"),t&&(a.textContent=t)}}customElements.define("user-avatar",Ot);const K=new Map,Q=n=>K.get(n),X=n=>{K.set(n.isbn13,n)},It=()=>fetch("https://api.itbook.store/1.0/new").then(n=>{if(console.log(n),n.ok)return n.json();throw new Error}),Bt=n=>fetch("https://api.itbook.store/1.0/books/"+n).then(e=>{if(console.log(e),e.ok)return e.json();throw new Error}),$t=(n,e)=>fetch(`https://api.itbook.store/1.0/search/${n}/${e}`).then(t=>{if(console.log(t),t.ok)return t.json();throw new Error});class Mt extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.setAttribute("class","book-detail"),t.innerHTML=`
            <div class="book-detail__container">
                <img class="book-detail__container__cover" alt="book image">
                <h2 class="book-detail__container__title"></h2>
                <p class="book-detail__container__author"></p>
                <p class="book-detail__container__price"></p>
                <p class="book-detail__container__description"></p>
                <button class="book-detail__container__cart-btn">Add to Cart</button>
                <button class="book-detail__container__wishlist-btn">Wishlist</button>
                <p class="book-detail__container__publisher"></p>
                <p class="book-detail__container__isbn13"></p>
            </div>
            <list-component class="similars" title="Similar" list-type="book"></list-component>
        `,e.appendChild(t)}connectedCallback(){this.shadowRoot;const e=this.getAttribute("book");Q(e),Bt(e).then(t=>{X(t),this.updateBook(t)}).catch(t=>console.log(t))}updateBook(e){const t=this.shadowRoot,i=t.querySelector(".similars"),s=this.getAttribute("book");i.setAttribute("id",s),console.log(i),i.setAttribute("search",e.title);const a=t.querySelector(".book-detail__container__title");a.textContent=e.title;const p=t.querySelector(".book-detail__container__author");p.textContent=e.authors;const u=t.querySelector(".book-detail__container__price");u.textContent=e.price;const d=t.querySelector(".book-detail__container__description");d.textContent=e.desc;const k=t.querySelector(".book-detail__container__publisher");k.textContent="Publisher:"+e.publisher;const v=t.querySelector(".book-detail__container__isbn13");v.textContent="ISBN13:"+e.isbn13,t.querySelector(".book-detail__container__cover").setAttribute("src",e.image),t.querySelector(".book-detail__container__cart-btn").setAttribute("data-art",e.isbn13),t.querySelector(".book-detail__container__wishlist-btn").setAttribute("data-art",e.isbn13)}}customElements.define("book-detail",Mt);class Nt extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.setAttribute("class","book-container"),t.innerHTML=`
            <img class="book-container__cover" alt="book image">
            <h4 class="book-container__title"></h4>
            <p class="book-container__subtitle"></p>
            <p class="book-container__price"></p>
        `,e.appendChild(t)}connectedCallback(){const e=this.shadowRoot,t=this.getAttribute("id"),i=Q(t),s=e.querySelector(".book-container");e.querySelector(".book-container__cover").setAttribute("src",i.image);const p=e.querySelector(".book-container__title");p.textContent=i.title;const u=e.querySelector(".book-container__subtitle");u.textContent=i.subtitle;const d=e.querySelector(".book-container__price");d.textContent=i.price,s.addEventListener("click",k=>{k.stopPropagation();const v=E.Book.reverse({book:t});T(v)})}}customElements.define("book-component",Nt);const jt=new Map,Ut=n=>{jt.set(n.id,n)},Vt=n=>fetch("http://localhost:1111"+n).then(e=>{if(console.log(e),e.ok)return e.json();throw new Error}).catch(e=>{console.log(e)}),Dt=(n,e={})=>fetch("http://localhost:1111"+n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(t=>{if(console.log(t),t.ok)return t.json();throw new Error}).catch(t=>{console.log(t)}),Ht=(n,e={})=>fetch("http://localhost:1111"+n,{method:"DELETE",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(t=>{if(console.log(t),t.ok)return t.json();throw new Error}).catch(t=>{console.log(t)});var Ft={get:Vt,post:Dt,delete:Ht};const zt=n=>Ft.get(`/users?q=${n}&limit=10&_expand=user`);class Wt extends HTMLElement{constructor(){super(),this.search="",this.page=1,this.lastPage=!1;const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.setAttribute("class","list-container");const i=document.createElement("h2");i.setAttribute("class","list-title"),e.appendChild(i);const s=document.createElement("div");s.setAttribute("class","pagination");const a=document.createElement("button");a.setAttribute("class","pagination__prev-btn"),a.textContent="Prev",a.addEventListener("click",d=>{d.stopPropagation(),this.page>1&&(this.page--,this.typeList===y.lists.types.book&&this.getBooksPage(),(this.typeList=y.lists.types.user)&&this.getUsersPage())});const p=document.createElement("button");p.setAttribute("class","pagination__next-btn"),p.textContent="Next",p.addEventListener("click",d=>{d.stopPropagation(),this.lastPage||(this.page++,this.typeList===y.lists.types.book&&this.getBooksPage(),(this.typeList=y.lists.types.user)&&this.getUsersPage())});const u=document.createElement("span");u.setAttribute("class","pagination__number"),u.textContent=this.page,s.appendChild(a),s.appendChild(u),s.appendChild(p),e.appendChild(t),e.appendChild(s)}connectedCallback(){this.updatePage(),this.updateList()}static get observedAttributes(){return["search"]}attributeChangedCallback(e,t,i){this.updateList()}updatePage(){const e=this.shadowRoot,t=e.querySelector(".pagination__prev-btn"),i=e.querySelector(".pagination__next-btn"),s=e.querySelector(".pagination__number");console.log(t),this.page===1?t.setAttribute("disabled",!0):t.removeAttribute("disabled"),this.lastPage?i.removeAttribute("disabled"):i.setAttribute("disabled",!0),s.textContent=this.page}updateList(){const t=this.shadowRoot.querySelector(".list-title"),i=this.getAttribute("title"),s=this.getAttribute("list-type");t.textContent=i,s==="book"&&this.getBooksPage(),s==="user"&&this.getUsersPage()}getBooksPage(){const t=this.shadowRoot.querySelector(".list-container"),i=this.getAttribute("search"),s=this.getAttribute("id");i&&(this.search=i);const a=this.search?$t(this.search,this.page):It();console.log("aicall",a),a.then(p=>{const u=document.createDocumentFragment();this.lastPage=p.total%10===0?this.page=p.total/10:this.page=p.total/10+1;const d=p.total;t.innerHTML="",p.books.forEach(k=>{if(k.isbn13!==s){X(k);const v=document.createElement("book-component");v.setAttribute("id",k.isbn13),this.search&&v.setAttribute("search",this.search),u.appendChild(v)}}),t.appendChild(u),d===0&this.page===1&&(t.textContent="Books are not found")}).catch(p=>{console.log(p)})}getUsersPage(){const t=this.shadowRoot.querySelector("list-container");(this.search&&zt(this.search)).then(s=>{const a=document.createDocumentFragment();this.lastPage=s.length<10;const p=s.length;t.innerHTML="",s.forEach(u=>{Ut(u);const d=document.createElement("user-component");d.setAttribute("id",u.id),this.search&&d.setAttribute("search",this.search),a.appendChild(d)}),t.appendChild(a),p===0&this.page===1&&(t.textContent="Users are not found")}).catch(s=>{console.log(s)})}}customElements.define("list-component",Wt);Pt();export{Yt as __vite_legacy_guard};

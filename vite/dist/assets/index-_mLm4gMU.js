import{e as S,g as lt,a as ct,s as ft,_ as T,u as ut,f as dt,j as H,k as mt,m as pt,a9 as J,ak as En,b as xt,al as Nn,P as m,R as $e}from"./index-CSQcVwAp.js";const Ye=S.createContext();function Sn(t){return ct("MuiTable",t)}lt("MuiTable",["root","stickyHeader"]);const In=["className","component","padding","size","stickyHeader"],Mn=t=>{const{classes:e,stickyHeader:n}=t;return pt({root:["root",n&&"stickyHeader"]},Sn,e)},_n=ft("table",{name:"MuiTable",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,n.stickyHeader&&e.stickyHeader]}})(({theme:t,ownerState:e})=>T({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":T({},t.typography.body2,{padding:t.spacing(2),color:(t.vars||t).palette.text.secondary,textAlign:"left",captionSide:"bottom"})},e.stickyHeader&&{borderCollapse:"separate"})),fe="table",Zr=S.forwardRef(function(e,n){const a=ut({props:e,name:"MuiTable"}),{className:r,component:o=fe,padding:s="normal",size:i="medium",stickyHeader:l=!1}=a,c=dt(a,In),f=T({},a,{component:o,padding:s,size:i,stickyHeader:l}),p=Mn(f),d=S.useMemo(()=>({padding:s,size:i,stickyHeader:l}),[s,i,l]);return H.jsx(Ye.Provider,{value:d,children:H.jsx(_n,T({as:o,role:o===fe?null:"table",ref:n,className:mt(p.root,r),ownerState:f},c))})}),Ct=S.createContext();function Rn(t){return ct("MuiTableBody",t)}lt("MuiTableBody",["root"]);const Fn=["className","component"],Ln=t=>{const{classes:e}=t;return pt({root:["root"]},Rn,e)},zn=ft("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:(t,e)=>e.root})({display:"table-row-group"}),jn={variant:"body"},ue="tbody",to=S.forwardRef(function(e,n){const a=ut({props:e,name:"MuiTableBody"}),{className:r,component:o=ue}=a,s=dt(a,Fn),i=T({},a,{component:o}),l=Ln(i);return H.jsx(Ct.Provider,{value:jn,children:H.jsx(zn,T({className:mt(l.root,r),as:o,ref:n,role:o===ue?null:"rowgroup",ownerState:i},s))})});function Dn(t){return ct("MuiTableCell",t)}const Hn=lt("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]),Un=["align","className","component","padding","scope","size","sortDirection","variant"],$n=t=>{const{classes:e,variant:n,align:a,padding:r,size:o,stickyHeader:s}=t,i={root:["root",n,s&&"stickyHeader",a!=="inherit"&&`align${J(a)}`,r!=="normal"&&`padding${J(r)}`,`size${J(o)}`]};return pt(i,Dn,e)},Yn=ft("td",{name:"MuiTableCell",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],e[`size${J(n.size)}`],n.padding!=="normal"&&e[`padding${J(n.padding)}`],n.align!=="inherit"&&e[`align${J(n.align)}`],n.stickyHeader&&e.stickyHeader]}})(({theme:t,ownerState:e})=>T({},t.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:t.vars?`1px solid ${t.vars.palette.TableCell.border}`:`1px solid
    ${t.palette.mode==="light"?En(xt(t.palette.divider,1),.88):Nn(xt(t.palette.divider,1),.68)}`,textAlign:"left",padding:16},e.variant==="head"&&{color:(t.vars||t).palette.text.primary,lineHeight:t.typography.pxToRem(24),fontWeight:t.typography.fontWeightMedium},e.variant==="body"&&{color:(t.vars||t).palette.text.primary},e.variant==="footer"&&{color:(t.vars||t).palette.text.secondary,lineHeight:t.typography.pxToRem(21),fontSize:t.typography.pxToRem(12)},e.size==="small"&&{padding:"6px 16px",[`&.${Hn.paddingCheckbox}`]:{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}},e.padding==="checkbox"&&{width:48,padding:"0 0 0 4px"},e.padding==="none"&&{padding:0},e.align==="left"&&{textAlign:"left"},e.align==="center"&&{textAlign:"center"},e.align==="right"&&{textAlign:"right",flexDirection:"row-reverse"},e.align==="justify"&&{textAlign:"justify"},e.stickyHeader&&{position:"sticky",top:0,zIndex:2,backgroundColor:(t.vars||t).palette.background.default})),eo=S.forwardRef(function(e,n){const a=ut({props:e,name:"MuiTableCell"}),{align:r="inherit",className:o,component:s,padding:i,scope:l,size:c,sortDirection:f,variant:p}=a,d=dt(a,Un),g=S.useContext(Ye),A=S.useContext(Ct),w=A&&A.variant==="head";let h;s?h=s:h=w?"th":"td";let v=l;h==="td"?v=void 0:!v&&w&&(v="col");const x=p||A&&A.variant,k=T({},a,{align:r,component:h,padding:i||(g&&g.padding?g.padding:"normal"),size:c||(g&&g.size?g.size:"medium"),sortDirection:f,stickyHeader:x==="head"&&g&&g.stickyHeader,variant:x}),N=$n(k);let C=null;return f&&(C=f==="asc"?"ascending":"descending"),H.jsx(Yn,T({as:h,ref:n,className:mt(N.root,o),"aria-sort":C,scope:v,ownerState:k},d))});function Wn(t){return ct("MuiTableHead",t)}lt("MuiTableHead",["root"]);const Bn=["className","component"],Xn=t=>{const{classes:e}=t;return pt({root:["root"]},Wn,e)},Gn=ft("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(t,e)=>e.root})({display:"table-header-group"}),Vn={variant:"head"},de="thead",no=S.forwardRef(function(e,n){const a=ut({props:e,name:"MuiTableHead"}),{className:r,component:o=de}=a,s=dt(a,Bn),i=T({},a,{component:o}),l=Xn(i);return H.jsx(Ct.Provider,{value:Vn,children:H.jsx(Gn,T({as:o,className:mt(l.root,r),ref:n,role:o===de?null:"rowgroup",ownerState:i},s))})});function Kn(t){return ct("MuiTableRow",t)}const me=lt("MuiTableRow",["root","selected","hover","head","footer"]),qn=["className","component","hover","selected"],Jn=t=>{const{classes:e,selected:n,hover:a,head:r,footer:o}=t;return pt({root:["root",n&&"selected",a&&"hover",r&&"head",o&&"footer"]},Kn,e)},Qn=ft("tr",{name:"MuiTableRow",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,n.head&&e.head,n.footer&&e.footer]}})(({theme:t})=>({color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,[`&.${me.hover}:hover`]:{backgroundColor:(t.vars||t).palette.action.hover},[`&.${me.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:xt(t.palette.primary.main,t.palette.action.selectedOpacity),"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:xt(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity)}}})),pe="tr",ao=S.forwardRef(function(e,n){const a=ut({props:e,name:"MuiTableRow"}),{className:r,component:o=pe,hover:s=!1,selected:i=!1}=a,l=dt(a,qn),c=S.useContext(Ct),f=T({},a,{component:o,hover:s,selected:i,head:c&&c.variant==="head",footer:c&&c.variant==="footer"}),p=Jn(f);return H.jsx(Qn,T({as:o,ref:n,className:mt(p.root,r),role:o===pe?null:"row",ownerState:f},l))}),ge=()=>{};let Zt={},We={},Be=null,Xe={mark:ge,measure:ge};try{typeof window<"u"&&(Zt=window),typeof document<"u"&&(We=document),typeof MutationObserver<"u"&&(Be=MutationObserver),typeof performance<"u"&&(Xe=performance)}catch{}const{userAgent:he=""}=Zt.navigator||{},U=Zt,b=We,be=Be,bt=Xe;U.document;const z=!!b.documentElement&&!!b.head&&typeof b.addEventListener=="function"&&typeof b.createElement=="function",Ge=~he.indexOf("MSIE")||~he.indexOf("Trident/");var y="classic",Ve="duotone",O="sharp",P="sharp-duotone",Zn=[y,Ve,O,P],ta={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},ye={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},ea=["kit"],na=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,aa=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,ra={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},oa={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},sa={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},ia={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},la={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},ca={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Ke={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},fa=["solid","regular","light","thin","duotone","brands"],qe=[1,2,3,4,5,6,7,8,9,10],ua=qe.concat([11,12,13,14,15,16,17,18,19,20]),nt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},da=[...Object.keys(ia),...fa,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",nt.GROUP,nt.SWAP_OPACITY,nt.PRIMARY,nt.SECONDARY].concat(qe.map(t=>"".concat(t,"x"))).concat(ua.map(t=>"w-".concat(t))),ma={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},pa={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},ga={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},ve={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const F="___FONT_AWESOME___",Lt=16,Je="fa",Qe="svg-inline--fa",G="data-fa-i2svg",zt="data-fa-pseudo-element",ha="data-fa-pseudo-element-pending",te="data-prefix",ee="data-icon",xe="fontawesome-i2svg",ba="async",ya=["HTML","HEAD","STYLE","SCRIPT"],Ze=(()=>{try{return!0}catch{return!1}})(),tn=[y,O,P];function gt(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[y]}})}const en={...Ke};en[y]={...Ke[y],...ye.kit,...ye["kit-duotone"]};const B=gt(en),jt={...ca};jt[y]={...jt[y],...ve.kit,...ve["kit-duotone"]};const st=gt(jt),Dt={...la};Dt[y]={...Dt[y],...ga.kit};const X=gt(Dt),Ht={...sa};Ht[y]={...Ht[y],...pa.kit};const va=gt(Ht),xa=na,nn="fa-layers-text",Aa=aa,ka={...ta};gt(ka);const wa=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],St=nt,Z=new Set;Object.keys(st[y]).map(Z.add.bind(Z));Object.keys(st[O]).map(Z.add.bind(Z));Object.keys(st[P]).map(Z.add.bind(Z));const Ca=[...ea,...da],rt=U.FontAwesomeConfig||{};function Oa(t){var e=b.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Pa(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}b&&typeof b.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=Pa(Oa(n));r!=null&&(rt[a]=r)});const an={styleDefault:"solid",familyDefault:"classic",cssPrefix:Je,replacementClass:Qe,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};rt.familyPrefix&&(rt.cssPrefix=rt.familyPrefix);const tt={...an,...rt};tt.autoReplaceSvg||(tt.observeMutations=!1);const u={};Object.keys(an).forEach(t=>{Object.defineProperty(u,t,{enumerable:!0,set:function(e){tt[t]=e,ot.forEach(n=>n(u))},get:function(){return tt[t]}})});Object.defineProperty(u,"familyPrefix",{enumerable:!0,set:function(t){tt.cssPrefix=t,ot.forEach(e=>e(u))},get:function(){return tt.cssPrefix}});U.FontAwesomeConfig=u;const ot=[];function Ta(t){return ot.push(t),()=>{ot.splice(ot.indexOf(t),1)}}const j=Lt,M={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Ea(t){if(!t||!z)return;const e=b.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=b.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const o=n[r],s=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(a=o)}return b.head.insertBefore(e,a),t}const Na="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function it(){let t=12,e="";for(;t-- >0;)e+=Na[Math.random()*62|0];return e}function et(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function ne(t){return t.classList?et(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function rn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Sa(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(rn(t[n]),'" '),"").trim()}function Ot(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function ae(t){return t.size!==M.size||t.x!==M.x||t.y!==M.y||t.rotate!==M.rotate||t.flipX||t.flipY}function Ia(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),i="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(o," ").concat(s," ").concat(i)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function Ma(t){let{transform:e,width:n=Lt,height:a=Lt,startCentered:r=!1}=t,o="";return r&&Ge?o+="translate(".concat(e.x/j-n/2,"em, ").concat(e.y/j-a/2,"em) "):r?o+="translate(calc(-50% + ".concat(e.x/j,"em), calc(-50% + ").concat(e.y/j,"em)) "):o+="translate(".concat(e.x/j,"em, ").concat(e.y/j,"em) "),o+="scale(".concat(e.size/j*(e.flipX?-1:1),", ").concat(e.size/j*(e.flipY?-1:1),") "),o+="rotate(".concat(e.rotate,"deg) "),o}var _a=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function on(){const t=Je,e=Qe,n=u.cssPrefix,a=u.replacementClass;let r=_a;if(n!==t||a!==e){const o=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),i=new RegExp("\\.".concat(e),"g");r=r.replace(o,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(i,".".concat(a))}return r}let Ae=!1;function It(){u.autoAddCss&&!Ae&&(Ea(on()),Ae=!0)}var Ra={mixout(){return{dom:{css:on,insertCss:It}}},hooks(){return{beforeDOMElementCreation(){It()},beforeI2svg(){It()}}}};const L=U||{};L[F]||(L[F]={});L[F].styles||(L[F].styles={});L[F].hooks||(L[F].hooks={});L[F].shims||(L[F].shims=[]);var _=L[F];const sn=[],ln=function(){b.removeEventListener("DOMContentLoaded",ln),At=1,sn.map(t=>t())};let At=!1;z&&(At=(b.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(b.readyState),At||b.addEventListener("DOMContentLoaded",ln));function Fa(t){z&&(At?setTimeout(t,0):sn.push(t))}function ht(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?rn(t):"<".concat(e," ").concat(Sa(n),">").concat(a.map(ht).join(""),"</").concat(e,">")}function ke(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var Mt=function(e,n,a,r){var o=Object.keys(e),s=o.length,i=n,l,c,f;for(a===void 0?(l=1,f=e[o[0]]):(l=0,f=a);l<s;l++)c=o[l],f=i(f,e[c],c,e);return f};function La(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const o=t.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Ut(t){const e=La(t);return e.length===1?e[0].toString(16):null}function za(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function we(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function $t(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=we(e);typeof _.hooks.addPack=="function"&&!a?_.hooks.addPack(t,we(e)):_.styles[t]={..._.styles[t]||{},...r},t==="fas"&&$t("fa",e)}const{styles:W,shims:ja}=_,Da={[y]:Object.values(X[y]),[O]:Object.values(X[O]),[P]:Object.values(X[P])};let re=null,cn={},fn={},un={},dn={},mn={};const Ha={[y]:Object.keys(B[y]),[O]:Object.keys(B[O]),[P]:Object.keys(B[P])};function Ua(t){return~Ca.indexOf(t)}function $a(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!Ua(r)?r:null}const pn=()=>{const t=a=>Mt(W,(r,o,s)=>(r[s]=Mt(o,a,{}),r),{});cn=t((a,r,o)=>(r[3]&&(a[r[3]]=o),r[2]&&r[2].filter(i=>typeof i=="number").forEach(i=>{a[i.toString(16)]=o}),a)),fn=t((a,r,o)=>(a[o]=o,r[2]&&r[2].filter(i=>typeof i=="string").forEach(i=>{a[i]=o}),a)),mn=t((a,r,o)=>{const s=r[2];return a[o]=o,s.forEach(i=>{a[i]=o}),a});const e="far"in W||u.autoFetchSvg,n=Mt(ja,(a,r)=>{const o=r[0];let s=r[1];const i=r[2];return s==="far"&&!e&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:i}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:i}),a},{names:{},unicodes:{}});un=n.names,dn=n.unicodes,re=Pt(u.styleDefault,{family:u.familyDefault})};Ta(t=>{re=Pt(t.styleDefault,{family:u.familyDefault})});pn();function oe(t,e){return(cn[t]||{})[e]}function Ya(t,e){return(fn[t]||{})[e]}function D(t,e){return(mn[t]||{})[e]}function gn(t){return un[t]||{prefix:null,iconName:null}}function Wa(t){const e=dn[t],n=oe("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function $(){return re}const se=()=>({prefix:null,iconName:null,rest:[]});function Pt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=y}=e,a=B[n][t],r=st[n][t]||st[n][a],o=t in _.styles?t:null;return r||o||null}const Ba={[y]:Object.keys(X[y]),[O]:Object.keys(X[O]),[P]:Object.keys(X[P])};function Tt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e,a={[y]:"".concat(u.cssPrefix,"-").concat(y),[O]:"".concat(u.cssPrefix,"-").concat(O),[P]:"".concat(u.cssPrefix,"-").concat(P)};let r=null,o=y;const s=Zn.filter(l=>l!==Ve);s.forEach(l=>{(t.includes(a[l])||t.some(c=>Ba[l].includes(c)))&&(o=l)});const i=t.reduce((l,c)=>{const f=$a(u.cssPrefix,c);if(W[c]?(c=Da[o].includes(c)?va[o][c]:c,r=c,l.prefix=c):Ha[o].indexOf(c)>-1?(r=c,l.prefix=Pt(c,{family:o})):f?l.iconName=f:c!==u.replacementClass&&!s.some(p=>c===a[p])&&l.rest.push(c),!n&&l.prefix&&l.iconName){const p=r==="fa"?gn(l.iconName):{},d=D(l.prefix,l.iconName);p.prefix&&(r=null),l.iconName=p.iconName||d||l.iconName,l.prefix=p.prefix||l.prefix,l.prefix==="far"&&!W.far&&W.fas&&!u.autoFetchSvg&&(l.prefix="fas")}return l},se());return(t.includes("fa-brands")||t.includes("fab"))&&(i.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(i.prefix="fad"),!i.prefix&&o===O&&(W.fass||u.autoFetchSvg)&&(i.prefix="fass",i.iconName=D(i.prefix,i.iconName)||i.iconName),!i.prefix&&o===P&&(W.fasds||u.autoFetchSvg)&&(i.prefix="fasds",i.iconName=D(i.prefix,i.iconName)||i.iconName),(i.prefix==="fa"||r==="fa")&&(i.prefix=$()||"fas"),i}class Xa{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(o=>{this.definitions[o]={...this.definitions[o]||{},...r[o]},$t(o,r[o]);const s=X[y][o];s&&$t(s,r[o]),pn()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:o,iconName:s,icon:i}=a[r],l=i[2];e[o]||(e[o]={}),l.length>0&&l.forEach(c=>{typeof c=="string"&&(e[o][c]=i)}),e[o][s]=i}),e}}let Ce=[],K={};const Q={},Ga=Object.keys(Q);function Va(t,e){let{mixoutsTo:n}=e;return Ce=t,K={},Object.keys(Q).forEach(a=>{Ga.indexOf(a)===-1&&delete Q[a]}),Ce.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(o=>{typeof r[o]=="function"&&(n[o]=r[o]),typeof r[o]=="object"&&Object.keys(r[o]).forEach(s=>{n[o]||(n[o]={}),n[o][s]=r[o][s]})}),a.hooks){const o=a.hooks();Object.keys(o).forEach(s=>{K[s]||(K[s]=[]),K[s].push(o[s])})}a.provides&&a.provides(Q)}),n}function Yt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(K[t]||[]).forEach(s=>{e=s.apply(null,[e,...a])}),e}function V(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(K[t]||[]).forEach(o=>{o.apply(null,n)})}function Y(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return Q[t]?Q[t].apply(null,e):void 0}function Wt(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||$();if(e)return e=D(n,e)||e,ke(hn.definitions,n,e)||ke(_.styles,n,e)}const hn=new Xa,Ka=()=>{u.autoReplaceSvg=!1,u.observeMutations=!1,V("noAuto")},qa={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return z?(V("beforeI2svg",t),Y("pseudoElements2svg",t),Y("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;u.autoReplaceSvg===!1&&(u.autoReplaceSvg=!0),u.observeMutations=!0,Fa(()=>{Qa({autoReplaceSvgRoot:e}),V("watch",t)})}},Ja={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:D(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=Pt(t[0]);return{prefix:n,iconName:D(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(u.cssPrefix,"-"))>-1||t.match(xa))){const e=Tt(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||$(),iconName:D(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=$();return{prefix:e,iconName:D(e,t)||t}}}},E={noAuto:Ka,config:u,dom:qa,parse:Ja,library:hn,findIconDefinition:Wt,toHtml:ht},Qa=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=b}=t;(Object.keys(_.styles).length>0||u.autoFetchSvg)&&z&&u.autoReplaceSvg&&E.dom.i2svg({node:e})};function Et(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>ht(n))}}),Object.defineProperty(t,"node",{get:function(){if(!z)return;const n=b.createElement("div");return n.innerHTML=t.html,n.children}}),t}function Za(t){let{children:e,main:n,mask:a,attributes:r,styles:o,transform:s}=t;if(ae(s)&&n.found&&!a.found){const{width:i,height:l}=n,c={x:i/l/2,y:.5};r.style=Ot({...o,"transform-origin":"".concat(c.x+s.x/16,"em ").concat(c.y+s.y/16,"em")})}return[{tag:"svg",attributes:r,children:e}]}function tr(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:o}=t;const s=o===!0?"".concat(e,"-").concat(u.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:s},children:a}]}]}function ie(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:o,symbol:s,title:i,maskId:l,titleId:c,extra:f,watchable:p=!1}=t,{width:d,height:g}=n.found?n:e,A=a==="fak",w=[u.replacementClass,r?"".concat(u.cssPrefix,"-").concat(r):""].filter(C=>f.classes.indexOf(C)===-1).filter(C=>C!==""||!!C).concat(f.classes).join(" ");let h={children:[],attributes:{...f.attributes,"data-prefix":a,"data-icon":r,class:w,role:f.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(d," ").concat(g)}};const v=A&&!~f.classes.indexOf("fa-fw")?{width:"".concat(d/g*16*.0625,"em")}:{};p&&(h.attributes[G]=""),i&&(h.children.push({tag:"title",attributes:{id:h.attributes["aria-labelledby"]||"title-".concat(c||it())},children:[i]}),delete h.attributes.title);const x={...h,prefix:a,iconName:r,main:e,mask:n,maskId:l,transform:o,symbol:s,styles:{...v,...f.styles}},{children:k,attributes:N}=n.found&&e.found?Y("generateAbstractMask",x)||{children:[],attributes:{}}:Y("generateAbstractIcon",x)||{children:[],attributes:{}};return x.children=k,x.attributes=N,s?tr(x):Za(x)}function Oe(t){const{content:e,width:n,height:a,transform:r,title:o,extra:s,watchable:i=!1}=t,l={...s.attributes,...o?{title:o}:{},class:s.classes.join(" ")};i&&(l[G]="");const c={...s.styles};ae(r)&&(c.transform=Ma({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const f=Ot(c);f.length>0&&(l.style=f);const p=[];return p.push({tag:"span",attributes:l,children:[e]}),o&&p.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),p}function er(t){const{content:e,title:n,extra:a}=t,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},o=Ot(a.styles);o.length>0&&(r.style=o);const s=[];return s.push({tag:"span",attributes:r,children:[e]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}const{styles:_t}=_;function Bt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(u.cssPrefix,"-").concat(St.GROUP)},children:[{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(St.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(St.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const nr={found:!1,width:512,height:512};function ar(t,e){!Ze&&!u.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Xt(t,e){let n=e;return e==="fa"&&u.styleDefault!==null&&(e=$()),new Promise((a,r)=>{if(n==="fa"){const o=gn(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&_t[e]&&_t[e][t]){const o=_t[e][t];return a(Bt(o))}ar(t,e),a({...nr,icon:u.showMissingIcons&&t?Y("missingIconAbstract")||{}:{}})})}const Pe=()=>{},Gt=u.measurePerformance&&bt&&bt.mark&&bt.measure?bt:{mark:Pe,measure:Pe},at='FA "6.6.0"',rr=t=>(Gt.mark("".concat(at," ").concat(t," begins")),()=>bn(t)),bn=t=>{Gt.mark("".concat(at," ").concat(t," ends")),Gt.measure("".concat(at," ").concat(t),"".concat(at," ").concat(t," begins"),"".concat(at," ").concat(t," ends"))};var le={begin:rr,end:bn};const yt=()=>{};function Te(t){return typeof(t.getAttribute?t.getAttribute(G):null)=="string"}function or(t){const e=t.getAttribute?t.getAttribute(te):null,n=t.getAttribute?t.getAttribute(ee):null;return e&&n}function sr(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(u.replacementClass)}function ir(){return u.autoReplaceSvg===!0?vt.replace:vt[u.autoReplaceSvg]||vt.replace}function lr(t){return b.createElementNS("http://www.w3.org/2000/svg",t)}function cr(t){return b.createElement(t)}function yn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?lr:cr}=e;if(typeof t=="string")return b.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])}),(t.children||[]).forEach(function(o){a.appendChild(yn(o,{ceFn:n}))}),a}function fr(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const vt={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(yn(n),e)}),e.getAttribute(G)===null&&u.keepOriginalSource){let n=b.createComment(fr(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~ne(e).indexOf(u.replacementClass))return vt.replace(t);const a=new RegExp("".concat(u.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((s,i)=>(i===u.replacementClass||i.match(a)?s.toSvg.push(i):s.toNode.push(i),s),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}const r=n.map(o=>ht(o)).join(`
`);e.setAttribute(G,""),e.innerHTML=r}};function Ee(t){t()}function vn(t,e){const n=typeof e=="function"?e:yt;if(t.length===0)n();else{let a=Ee;u.mutateApproach===ba&&(a=U.requestAnimationFrame||Ee),a(()=>{const r=ir(),o=le.begin("mutate");t.map(r),o(),n()})}}let ce=!1;function xn(){ce=!0}function Vt(){ce=!1}let kt=null;function Ne(t){if(!be||!u.observeMutations)return;const{treeCallback:e=yt,nodeCallback:n=yt,pseudoElementsCallback:a=yt,observeMutationsRoot:r=b}=t;kt=new be(o=>{if(ce)return;const s=$();et(o).forEach(i=>{if(i.type==="childList"&&i.addedNodes.length>0&&!Te(i.addedNodes[0])&&(u.searchPseudoElements&&a(i.target),e(i.target)),i.type==="attributes"&&i.target.parentNode&&u.searchPseudoElements&&a(i.target.parentNode),i.type==="attributes"&&Te(i.target)&&~wa.indexOf(i.attributeName))if(i.attributeName==="class"&&or(i.target)){const{prefix:l,iconName:c}=Tt(ne(i.target));i.target.setAttribute(te,l||s),c&&i.target.setAttribute(ee,c)}else sr(i.target)&&n(i.target)})}),z&&kt.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function ur(){kt&&kt.disconnect()}function dr(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const o=r.split(":"),s=o[0],i=o.slice(1);return s&&i.length>0&&(a[s]=i.join(":").trim()),a},{})),n}function mr(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=Tt(ne(t));return r.prefix||(r.prefix=$()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Ya(r.prefix,t.innerText)||oe(r.prefix,Ut(t.innerText))),!r.iconName&&u.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function pr(t){const e=et(t.attributes).reduce((r,o)=>(r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return u.autoA11y&&(n?e["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(a||it()):(e["aria-hidden"]="true",e.focusable="false")),e}function gr(){return{iconName:null,title:null,titleId:null,prefix:null,transform:M,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Se(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=mr(t),o=pr(t),s=Yt("parseNodeAttributes",{},t);let i=e.styleParser?dr(t):[];return{iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:M,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:i,attributes:o},...s}}const{styles:hr}=_;function An(t){const e=u.autoReplaceSvg==="nest"?Se(t,{styleParser:!1}):Se(t);return~e.extra.classes.indexOf(nn)?Y("generateLayersText",t,e):Y("generateSvgReplacementMutation",t,e)}let R=new Set;tn.map(t=>{R.add("fa-".concat(t))});Object.keys(B[y]).map(R.add.bind(R));Object.keys(B[O]).map(R.add.bind(R));Object.keys(B[P]).map(R.add.bind(R));R=[...R];function Ie(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!z)return Promise.resolve();const n=b.documentElement.classList,a=f=>n.add("".concat(xe,"-").concat(f)),r=f=>n.remove("".concat(xe,"-").concat(f)),o=u.autoFetchSvg?R:tn.map(f=>"fa-".concat(f)).concat(Object.keys(hr));o.includes("fa")||o.push("fa");const s=[".".concat(nn,":not([").concat(G,"])")].concat(o.map(f=>".".concat(f,":not([").concat(G,"])"))).join(", ");if(s.length===0)return Promise.resolve();let i=[];try{i=et(t.querySelectorAll(s))}catch{}if(i.length>0)a("pending"),r("complete");else return Promise.resolve();const l=le.begin("onTree"),c=i.reduce((f,p)=>{try{const d=An(p);d&&f.push(d)}catch(d){Ze||d.name==="MissingIcon"&&console.error(d)}return f},[]);return new Promise((f,p)=>{Promise.all(c).then(d=>{vn(d,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),f()})}).catch(d=>{l(),p(d)})})}function br(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;An(t).then(n=>{n&&vn([n],e)})}function yr(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:Wt(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Wt(r||{})),t(a,{...n,mask:r})}}const vr=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=M,symbol:a=!1,mask:r=null,maskId:o=null,title:s=null,titleId:i=null,classes:l=[],attributes:c={},styles:f={}}=e;if(!t)return;const{prefix:p,iconName:d,icon:g}=t;return Et({type:"icon",...t},()=>(V("beforeDOMElementCreation",{iconDefinition:t,params:e}),u.autoA11y&&(s?c["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(i||it()):(c["aria-hidden"]="true",c.focusable="false")),ie({icons:{main:Bt(g),mask:r?Bt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:p,iconName:d,transform:{...M,...n},symbol:a,title:s,maskId:o,titleId:i,extra:{attributes:c,styles:f,classes:l}})))};var xr={mixout(){return{icon:yr(vr)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=Ie,t.nodeCallback=br,t}}},provides(t){t.i2svg=function(e){const{node:n=b,callback:a=()=>{}}=e;return Ie(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:o,prefix:s,transform:i,symbol:l,mask:c,maskId:f,extra:p}=n;return new Promise((d,g)=>{Promise.all([Xt(a,s),c.iconName?Xt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(A=>{let[w,h]=A;d([e,ie({icons:{main:w,mask:h},prefix:s,iconName:a,transform:i,symbol:l,maskId:f,title:r,titleId:o,extra:p,watchable:!0})])}).catch(g)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:o,styles:s}=e;const i=Ot(s);i.length>0&&(a.style=i);let l;return ae(o)&&(l=Y("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},Ar={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return Et({type:"layer"},()=>{V("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(o=>{a=a.concat(o.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(u.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},kr={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:o={}}=e;return Et({type:"counter",content:t},()=>(V("beforeDOMElementCreation",{content:t,params:e}),er({content:t.toString(),title:n,extra:{attributes:r,styles:o,classes:["".concat(u.cssPrefix,"-layers-counter"),...a]}})))}}}},wr={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=M,title:a=null,classes:r=[],attributes:o={},styles:s={}}=e;return Et({type:"text",content:t},()=>(V("beforeDOMElementCreation",{content:t,params:e}),Oe({content:t,transform:{...M,...n},title:a,extra:{attributes:o,styles:s,classes:["".concat(u.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:o}=n;let s=null,i=null;if(Ge){const l=parseInt(getComputedStyle(e).fontSize,10),c=e.getBoundingClientRect();s=c.width/l,i=c.height/l}return u.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([e,Oe({content:e.innerHTML,width:s,height:i,transform:r,title:a,extra:o,watchable:!0})])}}};const Cr=new RegExp('"',"ug"),Me=[1105920,1112319],_e={FontAwesome:{normal:"fas",400:"fas"},...oa,...ra,...ma},Kt=Object.keys(_e).reduce((t,e)=>(t[e.toLowerCase()]=_e[e],t),{}),Or=Object.keys(Kt).reduce((t,e)=>{const n=Kt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function Pr(t){const e=t.replace(Cr,""),n=za(e,0),a=n>=Me[0]&&n<=Me[1],r=e.length===2?e[0]===e[1]:!1;return{value:Ut(r?e[0]:e),isSecondary:a||r}}function Tr(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(Kt[n]||{})[r]||Or[n]}function Re(t,e){const n="".concat(ha).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const s=et(t.children).filter(d=>d.getAttribute(zt)===e)[0],i=U.getComputedStyle(t,e),l=i.getPropertyValue("font-family"),c=l.match(Aa),f=i.getPropertyValue("font-weight"),p=i.getPropertyValue("content");if(s&&!c)return t.removeChild(s),a();if(c&&p!=="none"&&p!==""){const d=i.getPropertyValue("content");let g=Tr(l,f);const{value:A,isSecondary:w}=Pr(d),h=c[0].startsWith("FontAwesome");let v=oe(g,A),x=v;if(h){const k=Wa(A);k.iconName&&k.prefix&&(v=k.iconName,g=k.prefix)}if(v&&!w&&(!s||s.getAttribute(te)!==g||s.getAttribute(ee)!==x)){t.setAttribute(n,x),s&&t.removeChild(s);const k=gr(),{extra:N}=k;N.attributes[zt]=e,Xt(v,g).then(C=>{const Pn=ie({...k,icons:{main:C,mask:se()},prefix:g,iconName:x,extra:N,watchable:!0}),Nt=b.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(Nt,t.firstChild):t.appendChild(Nt),Nt.outerHTML=Pn.map(Tn=>ht(Tn)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Er(t){return Promise.all([Re(t,"::before"),Re(t,"::after")])}function Nr(t){return t.parentNode!==document.head&&!~ya.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(zt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Fe(t){if(z)return new Promise((e,n)=>{const a=et(t.querySelectorAll("*")).filter(Nr).map(Er),r=le.begin("searchPseudoElements");xn(),Promise.all(a).then(()=>{r(),Vt(),e()}).catch(()=>{r(),Vt(),n()})})}var Sr={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=Fe,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=b}=e;u.searchPseudoElements&&Fe(n)}}};let Le=!1;var Ir={mixout(){return{dom:{unwatch(){xn(),Le=!0}}}},hooks(){return{bootstrap(){Ne(Yt("mutationObserverCallbacks",{}))},noAuto(){ur()},watch(t){const{observeMutationsRoot:e}=t;Le?Vt():Ne(Yt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const ze=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),o=r[0];let s=r.slice(1).join("-");if(o&&s==="h")return n.flipX=!0,n;if(o&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(o){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},e)};var Mr={mixout(){return{parse:{transform:t=>ze(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=ze(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:o}=e;const s={transform:"translate(".concat(r/2," 256)")},i="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),f={transform:"".concat(i," ").concat(l," ").concat(c)},p={transform:"translate(".concat(o/2*-1," -256)")},d={outer:s,inner:f,path:p};return{tag:"g",attributes:{...d.outer},children:[{tag:"g",attributes:{...d.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...d.path}}]}]}}}};const Rt={x:0,y:0,width:"100%",height:"100%"};function je(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function _r(t){return t.tag==="g"?t.children:[t]}var Rr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?Tt(n.split(" ").map(r=>r.trim())):se();return a.prefix||(a.prefix=$()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:o,maskId:s,transform:i}=e;const{width:l,icon:c}=r,{width:f,icon:p}=o,d=Ia({transform:i,containerWidth:f,iconWidth:l}),g={tag:"rect",attributes:{...Rt,fill:"white"}},A=c.children?{children:c.children.map(je)}:{},w={tag:"g",attributes:{...d.inner},children:[je({tag:c.tag,attributes:{...c.attributes,...d.path},...A})]},h={tag:"g",attributes:{...d.outer},children:[w]},v="mask-".concat(s||it()),x="clip-".concat(s||it()),k={tag:"mask",attributes:{...Rt,id:v,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[g,h]},N={tag:"defs",children:[{tag:"clipPath",attributes:{id:x},children:_r(p)},k]};return n.push(N,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(x,")"),mask:"url(#".concat(v,")"),...Rt}}),{children:n,attributes:a}}}},Fr={provides(t){let e=!1;U.matchMedia&&(e=U.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const o={...r,attributeName:"opacity"},s={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return e||s.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...o,values:"1;0;1;1;0;1;"}}),n.push(s),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:e?[]:[{tag:"animate",attributes:{...o,values:"1;0;0;0;0;1;"}}]}),e||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...o,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Lr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},zr=[Ra,xr,Ar,kr,wr,Sr,Ir,Mr,Rr,Fr,Lr];Va(zr,{mixoutsTo:E});E.noAuto;E.config;E.library;E.dom;const qt=E.parse;E.findIconDefinition;E.toHtml;const jr=E.icon;E.layer;E.text;E.counter;function De(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function I(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?De(Object(n),!0).forEach(function(a){q(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):De(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function wt(t){"@babel/helpers - typeof";return wt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},wt(t)}function q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Dr(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,o;for(o=0;o<a.length;o++)r=a[o],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function Hr(t,e){if(t==null)return{};var n=Dr(t,e),a,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)a=o[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Jt(t){return Ur(t)||$r(t)||Yr(t)||Wr()}function Ur(t){if(Array.isArray(t))return Qt(t)}function $r(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Yr(t,e){if(t){if(typeof t=="string")return Qt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Qt(t,e)}}function Qt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function Wr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Br(t){var e,n=t.beat,a=t.fade,r=t.beatFade,o=t.bounce,s=t.shake,i=t.flash,l=t.spin,c=t.spinPulse,f=t.spinReverse,p=t.pulse,d=t.fixedWidth,g=t.inverse,A=t.border,w=t.listItem,h=t.flip,v=t.size,x=t.rotation,k=t.pull,N=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":o,"fa-shake":s,"fa-flash":i,"fa-spin":l,"fa-spin-reverse":f,"fa-spin-pulse":c,"fa-pulse":p,"fa-fw":d,"fa-inverse":g,"fa-border":A,"fa-li":w,"fa-flip":h===!0,"fa-flip-horizontal":h==="horizontal"||h==="both","fa-flip-vertical":h==="vertical"||h==="both"},q(e,"fa-".concat(v),typeof v<"u"&&v!==null),q(e,"fa-rotate-".concat(x),typeof x<"u"&&x!==null&&x!==0),q(e,"fa-pull-".concat(k),typeof k<"u"&&k!==null),q(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(N).map(function(C){return N[C]?C:null}).filter(function(C){return C})}function Xr(t){return t=t-0,t===t}function kn(t){return Xr(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var Gr=["style"];function Vr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Kr(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=kn(n.slice(0,a)),o=n.slice(a+1).trim();return r.startsWith("webkit")?e[Vr(r)]=o:e[r]=o,e},{})}function wn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(l){return wn(t,l)}),r=Object.keys(e.attributes||{}).reduce(function(l,c){var f=e.attributes[c];switch(c){case"class":l.attrs.className=f,delete e.attributes.class;break;case"style":l.attrs.style=Kr(f);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?l.attrs[c.toLowerCase()]=f:l.attrs[kn(c)]=f}return l},{attrs:{}}),o=n.style,s=o===void 0?{}:o,i=Hr(n,Gr);return r.attrs.style=I(I({},r.attrs.style),s),t.apply(void 0,[e.tag,I(I({},r.attrs),i)].concat(Jt(a)))}var Cn=!1;try{Cn=!0}catch{}function qr(){if(!Cn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function He(t){if(t&&wt(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(qt.icon)return qt.icon(t);if(t===null)return null;if(t&&wt(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function Ft(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?q({},t,e):{}}var Ue={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},On=$e.forwardRef(function(t,e){var n=I(I({},Ue),t),a=n.icon,r=n.mask,o=n.symbol,s=n.className,i=n.title,l=n.titleId,c=n.maskId,f=He(a),p=Ft("classes",[].concat(Jt(Br(n)),Jt((s||"").split(" ")))),d=Ft("transform",typeof n.transform=="string"?qt.transform(n.transform):n.transform),g=Ft("mask",He(r)),A=jr(f,I(I(I(I({},p),d),g),{},{symbol:o,title:i,titleId:l,maskId:c}));if(!A)return qr("Could not find icon",f),null;var w=A.abstract,h={ref:e};return Object.keys(n).forEach(function(v){Ue.hasOwnProperty(v)||(h[v]=n[v])}),Jr(w[0],h)});On.displayName="FontAwesomeIcon";On.propTypes={beat:m.bool,border:m.bool,beatFade:m.bool,bounce:m.bool,className:m.string,fade:m.bool,flash:m.bool,mask:m.oneOfType([m.object,m.array,m.string]),maskId:m.string,fixedWidth:m.bool,inverse:m.bool,flip:m.oneOf([!0,!1,"horizontal","vertical","both"]),icon:m.oneOfType([m.object,m.array,m.string]),listItem:m.bool,pull:m.oneOf(["right","left"]),pulse:m.bool,rotation:m.oneOf([0,90,180,270]),shake:m.bool,size:m.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:m.bool,spinPulse:m.bool,spinReverse:m.bool,symbol:m.oneOfType([m.bool,m.string]),title:m.string,titleId:m.string,transform:m.oneOfType([m.string,m.object]),swapOpacity:m.bool};var Jr=wn.bind(null,$e.createElement);const ro={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]},oo={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"]},so={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"]};export{On as F,Zr as T,no as a,ao as b,eo as c,to as d,so as e,oo as f,ro as g};

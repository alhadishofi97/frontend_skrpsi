import{j as e,e as c,J as x}from"./index-CSQcVwAp.js";import{X as j}from"./index.es-CxZxsqlz.js";import{I as p}from"./IconPencil-fOTvrl4N.js";const f=({team:n,onSave:l,onCancel:r})=>{const[a,m]=c.useState(n.authority?n.authority.split(","):[]),d=s=>{m(o=>o.includes(s)?o.filter(t=>t!==s):[...o,s])},u=()=>{l({...n,authority:a.join(",")})};return e.jsxs("div",{children:[e.jsxs("h3",{children:["Edit Role: ",n.name]}),e.jsx("form",{children:authorityMenus.map(s=>e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",value:s,onChange:()=>d(s),checked:a.includes(s)}),s]})},s))}),e.jsx("button",{onClick:u,children:"Save"}),e.jsx("button",{onClick:r,children:"Cancel"})]})},b=()=>{const[n,l]=c.useState([]),[r,a]=c.useState(null),[m,d]=c.useState(!1);c.useEffect(()=>{(async()=>{try{const i=await(await fetch("https://backendapi.my.id/api/masterTim/get_tim")).json();i.success&&l(i.data)}catch(h){console.error("Failed to fetch teams:",h)}})()},[]);const u=t=>{a(t),d(!0)},s=t=>{console.log("Updated team:",t),l(h=>h.map(i=>i.id===t.id?t:i)),a(null),d(!1)},o=[{name:"ID",selector:t=>t.id,sortable:!0},{name:"Name",selector:t=>t.name,sortable:!0},{name:"Actions",cell:t=>e.jsx(x,{variant:"outlined",onClick:()=>u(t),style:{marginRight:"10px"},startIcon:e.jsx(p,{}),children:"Edit"})}];return e.jsxs("div",{children:[e.jsx(j,{title:"Teams Data Table",columns:o,data:n,pagination:!0}),r&&e.jsx(f,{team:r,onSave:s,onCancel:()=>a(null)})]})},y=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Teams Overview"}),e.jsx(b,{})]});export{y as default};

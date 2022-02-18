var P=Object.defineProperty,w=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var p=(r,n,a)=>n in r?P(r,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[n]=a,g=(r,n)=>{for(var a in n||(n={}))I.call(n,a)&&p(r,a,n[a]);if(m)for(var a of m(n))C.call(n,a)&&p(r,a,n[a]);return r},f=(r,n)=>w(r,A(n));import{j as e,F as i,h as t,i as u,k as s,y as l,I as c,B as d,a2 as D,an as o,n as N,m as x,ac as F,v as b,a1 as B,aj as E,ao as v}from"./vendor.1ad7f0a1.js";const T=()=>e(i,{children:t(u,{gutter:[32,8],children:[e(s,{span:12,offset:6,children:e(l.Item,{name:"password",rules:[{required:!0,message:"Please enter current password!"}],hasFeedback:!0,children:e(c.Password,{placeholder:"Current password"})})}),e(s,{span:12,offset:6,children:e(l.Item,{name:"password",rules:[{required:!0,message:"Please enter password!"}],hasFeedback:!0,children:e(c.Password,{placeholder:"The new password"})})}),e(s,{span:12,offset:6,children:e(l.Item,{name:"confirm",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Please enter password try again!"},({getFieldValue:r})=>({validator(n,a){return!a||r("password")===a?Promise.resolve():Promise.reject(new Error("Password must be match!"))}})],children:e(c.Password,{placeholder:"Enter password again"})})}),e(s,{style:{textAlign:"center"},span:24,children:e(l.Item,{children:e(d,{shape:"round",type:"primary",htmlType:"submit",className:"signup-form-button",children:"Update password"})})})]})}),j={beforeUpload:r=>{const n=r.type==="image/jpeg";return x.info(`${r.type}`),n||x.error(`${r.name} is not a jpeg file`),n||o.LIST_IGNORE}},S=()=>e(i,{children:t(u,{style:{alignItems:"center"},children:[e(s,{xs:{span:4},lg:{span:4},xl:{span:2},style:{margin:"0 15px"},children:e(D,{style:{height:"70px",width:"70px"},src:"https://joeschmoe.io/api/v1/random"})}),e(s,{sm:{span:9},md:{span:6},lg:{span:7},xl:{span:4},children:e(o,f(g({},j),{children:e(d,{type:"primary",children:"Upload New Picture"})}))}),e(s,{xs:{span:4},md:{span:3},lg:{span:5},xl:{span:4},style:{marginLeft:"10px"},children:e(o,{children:e(d,{icon:e(N,{}),danger:!0,children:"Remove Picture"})})})]})}),Q=()=>t(i,{children:[e(l.Item,{name:"fullName",rules:[{len:6,message:"Name must be at least 6 characters"},{required:!0,message:"Please enter your full name!"}],children:e(c,{placeholder:"Full name"})}),e(l.Item,{name:"email",rules:[{type:"email",message:"Wrong format email (Ex: abc@gmail.com)"},{required:!0,message:"Please input E-mail!"}],children:e(c,{placeholder:"Email"})})]}),H=()=>{const r=[{value:13,label:"Qu\u1EADn B\xECnh T\xE2n"},{value:14,label:"Qu\u1EADn B\xECnh Th\u1EA1nh"},{value:15,label:"Qu\u1EADn G\xF2 V\u1EA5p"},{value:16,label:"Qu\u1EADn Ph\xFA Nhu\u1EADn"},{value:17,label:"Qu\u1EADn T\xE2n B\xECnh"},{value:18,label:"Qu\u1EADn T\xE2n Ph\xFA"}];for(let a=12;a>0;a--)r.unshift({value:a,label:`Qu\u1EADn ${a}`});return e(i,{children:e(F,{placeholder:"District/Province",options:[{value:"district",label:"District",children:r},{value:"district2",label:"Province",children:[{value:"19",label:"Huy\u1EC7n B\xECnh Ch\xE1nh"},{value:"20",label:"Huy\u1EC7n C\u1EA7n Gi\u1EDD"},{value:"21",label:"Huy\u1EC7n C\u1EE7 Chi"},{value:"22",label:"Huy\u1EC7n H\xF3c M\xF4n"},{value:"23",label:"Huy\u1EC7n Nh\xE0 B\xE8"}]}]})})},{Option:h}=b,q=()=>e(i,{children:e(l.Item,{name:"prefix",noStyle:!0,children:t(b,{style:{width:70},children:[e(h,{value:"86",children:"+86"}),e(h,{value:"87",children:"+87"}),e(h,{value:"84",children:"+84"})]})})}),L=()=>t(i,{children:[e(l.Item,{name:"district",rules:[{type:"array"}],children:e(H,{})}),e(l.Item,{name:"phone",children:e("div",{className:"input-phone-number",children:e(c,{placeholder:"Phone number",addonBefore:e(q,{})})})})]}),R=()=>t("div",{className:"profile-container",children:[e("div",{className:"header-profile",children:e("h3",{children:"Your Profile Picture"})}),t(l,{name:"register",style:{padding:"0 20px"},initialValues:{prefix:"86"},children:[e(S,{}),e(B,{}),e("h3",{children:"Your Profile Information"}),t(u,{gutter:[32,8],children:[e(s,{span:12,children:e(Q,{})}),e(s,{span:12,children:e(L,{})}),e(s,{style:{textAlign:"center"},span:24,children:e(l.Item,{children:e(d,{shape:"round",type:"primary",htmlType:"submit",className:"signup-form-button",children:"Update profile"})})})]})]})]}),{TabPane:y}=E,G=()=>e("div",{className:"setting-container",children:t(E,{defaultActiveKey:"1",centered:!0,className:"tab-header",children:[e(y,{tab:e(v.Button,{className:"custom-button",value:1,children:"Account settings"}),children:e(R,{})},"1"),e(y,{tab:e(v.Button,{className:"custom-button",value:2,children:"Login & Security"}),children:e(T,{})},"2")]})});export{G as default};

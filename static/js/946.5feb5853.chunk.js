"use strict";(self.webpackChunkreact_monkey_blogging_boilerplate=self.webpackChunkreact_monkey_blogging_boilerplate||[]).push([[946],{1573:function(e,n,r){r.d(n,{g:function(){return i}});var t,a=r(168),s=(r(2791),r(6031)),o=r(184),l=s.ZP.div(t||(t=(0,a.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  row-gap: 10px;\n  margin-bottom: 25px;\n"]))),i=function(e){var n=e.children;return(0,o.jsx)(l,{children:n})}},9248:function(e,n,r){var t,a=r(1413),s=r(4925),o=r(168),l=r(1134),i=r(6031),c=(r(6041),r(184)),u=["name","type","children","hasIcon","control"],d=i.ZP.div(t||(t=(0,o.Z)(["\n  position: relative;\n  width: 100%;\n  input {\n    width: 100%;\n    padding: ",";\n    background-color: transparent;\n    border: 1px solid ",";\n    border-radius: 8px;\n    transition: all 0.2s linear;\n    color: ",";\n    font-size: 14px;\n  }\n\n  input::-webkit-input-placeholder {\n    color: #b2b3bd;\n  }\n  input::-moz-input-placeholder {\n    color: #b2b3bd;\n  }\n  .input-icon {\n    position: absolute;\n    right: 20px;\n    top: 50%;\n    transform: translateY(-50%);\n    cursor: pointer;\n  }\n"])),(function(e){return e.hasIcon?"16px 60px 16px 20px":"16px 20px"}),(function(e){return e.theme.grayf1}),(function(e){return e.theme.black}));n.Z=function(e){var n=e.name,r=void 0===n?"":n,t=e.type,o=void 0===t?"text":t,i=e.children,m=e.hasIcon,p=void 0!==m&&m,h=e.control,f=(0,s.Z)(e,u),x=(0,l.bc)({control:h,name:r,defaultValue:""}).field;return(0,c.jsxs)(d,{hasIcon:p,children:[(0,c.jsx)("input",(0,a.Z)((0,a.Z)({type:o,id:r},x),f)),p&&i]})}},4641:function(e,n,r){var t=r(9439),a=r(2791),s=r(6041),o=r(9248),l=r(184);n.Z=function(e){var n=e.control,r=(0,a.useState)(!1),i=(0,t.Z)(r,2),c=i[0],u=i[1];return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(o.Z,{control:n,name:"password",type:c?"text":"password",className:"input",placeholder:"Please enter your Password",hasIcon:!0,children:c?(0,l.jsx)(s.tE,{onClick:function(){return u((function(e){return!e}))},className:"input-icon w-4 h-4"}):(0,l.jsx)(s.JP,{onClick:function(){return u((function(e){return!e}))},className:"input-icon"})})})}},3117:function(e,n,r){r.d(n,{I:function(){return t.Z}});var t=r(9248)},4566:function(e,n,r){r.d(n,{_:function(){return d}});var t,a=r(1413),s=r(4925),o=r(168),l=r(6031),i=r(184),c=["className","htmlFor","children"],u=l.ZP.label(t||(t=(0,o.Z)(["\n  color: ",";\n  font-weight: 600;\n  cursor: pointer;\n"])),(function(e){return e.theme.grayDark}));var d=function(e){var n=e.className,r=e.htmlFor,t=e.children,o=(0,s.Z)(e,c);return(0,i.jsx)(u,(0,a.Z)((0,a.Z)({htmlFor:r,className:n},o),{},{children:t}))}},946:function(e,n,r){r.r(n);var t=r(5861),a=r(9439),s=r(7757),o=r.n(s),l=r(2791),i=r(1134),c=r(1724),u=r(4695),d=r(289),m=r(9062),p=r(1453),h=(r(1966),r(3117)),f=r(4566),x=r(1573),b=r(385),g=r(577),v=(r(763),r(6871)),j=r(3504),y=r(4641),Z=r(333),w=r.n(Z),k=r(184),N=c.Ry({fullname:c.Z_().required("Please enter your full name"),email:c.Z_().email("Please enter your email"),password:c.Z_().min(6,"Please 6 character").required("Please enter your password")});n.default=function(){var e=(0,v.s0)(),n=(0,l.useState)(!1),r=(0,a.Z)(n,2),s=(r[0],r[1],(0,i.cI)({mode:"onChange",resolver:(0,u.X)(N)})),c=s.control,Z=s.handleSubmit,P=s.formState,_=P.errors,I=P.isValid,C=P.isSubmitting,F=(s.watch,function(){var n=(0,t.Z)(o().mark((function n(r){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(I){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,(0,d.Xb)(p.I,r.email,r.password);case 4:return n.sent,g.Am.success("Create User success !!!"),n.next=8,(0,d.ck)(p.I.currentUser,{displayName:r.fullname});case 8:return n.next=10,(0,m.pl)((0,m.JU)(p.db,"users",p.I.currentUser.uid),{fullname:r.fullname,email:r.email,password:r.password,username:w()(r.fullname,{lower:!0}),createAdd:(0,m.Bt)()});case 10:e("/");case 11:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}());return(0,l.useEffect)((function(){var e,n=Object.values(_);n.length>0&&(0,g.Am)(null===(e=n[0])||void 0===e?void 0:e.message,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",type:"error"})}),[_]),(0,k.jsxs)("form",{className:"form",onSubmit:Z(F),children:[(0,k.jsxs)(x.g,{children:[(0,k.jsx)(f._,{htmlFor:"fullname",className:"label",children:"Fullname"}),(0,k.jsx)(h.I,{control:c,name:"fullname",type:"text",className:"input",placeholder:"Please enter your fullname"})]}),(0,k.jsxs)(x.g,{children:[(0,k.jsx)(f._,{htmlFor:"email",className:"label",children:"Email address"}),(0,k.jsx)(h.I,{control:c,name:"email",type:"email",className:"input",placeholder:"Please enter your email address"})]}),(0,k.jsxs)(x.g,{children:[(0,k.jsx)(f._,{htmlFor:"password",className:"label",children:"Password"}),(0,k.jsx)(y.Z,{control:c})]}),(0,k.jsxs)("div",{className:"have-account",children:["You have already account ? ",(0,k.jsx)(j.OL,{to:"/sign-in",children:"Login"})]}),(0,k.jsx)("div",{className:"button",children:(0,k.jsx)(b.z,{type:"submit",isLoading:C,children:"Sign Up"})})]})}}}]);
//# sourceMappingURL=946.5feb5853.chunk.js.map
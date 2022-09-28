"use strict";(self.webpackChunkecommerce_client=self.webpackChunkecommerce_client||[]).push([[199],{3943:function(e,n,r){var t=r(4942),a=r(1413),i=r(885),o=r(2791),u=r(5442),s=r(2703),l=r(4391),c="touched",d="change",p="reset",f="error",h="touchall",m="focused",g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{values:e,errors:{},touched:(0,s.HT)(e,!1),focused:(0,s.HT)(e,!1)}},v=(0,u.ZP)((function(e,n){switch(n.type){case c:return!0===e.touched[n.input.name]||(e.touched[n.input.name]=!0),e;case m:return e.focused[n.input.name]=n.input.value,e;case d:return e.values[n.input.name]=n.input.value,e;case p:return n.initialState;case f:return e.errors=n.errors,e;case h:if(Object.values(e.touched).every((function(e){return!0===e})))return e;var r=(0,s.HT)(e.touched,!0);return e.touched=r,e;default:return e}})),b=function(){return{}},x=function(){l.ZK("Please pass the onSubmit function as the function argument")};n.Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.initialValues,r=void 0===n?{}:n,u=e.validate,l=void 0===u?b:u,w=e.onSubmit,Z=void 0===w?x:w,y=(0,o.useReducer)(v,r,g),k=(0,i.Z)(y,2),F=k[0],j=F.values,P=F.errors,C=F.touched,S=F.focused,E=k[1];(0,o.useEffect)((function(){var e=l(j);E({type:f,errors:(0,a.Z)({},e)})}),[j,C,l]);var O=(0,o.useCallback)((function(e){E({type:m,input:{name:e.target.name,value:!0}})}),[]),I=(0,o.useCallback)((function(e){E({type:c,input:{name:e.target.name}}),E({type:m,input:{name:e.target.name,value:!1}})}),[]),z=(0,o.useCallback)((function(e){E({type:d,input:{name:e.target.name,value:"checkbox"===e.target.type?e.target.checked:e.target.value}})}),[]),_=(0,o.useCallback)((function(){E({type:p,initialState:g(r)})}),[r]),B=(0,o.useCallback)((function(e){e.preventDefault(),E({type:h}),(0,s.Sm)(P)&&Z(j,{resetForm:_})}),[P,Z,_,j]),T=(0,o.useCallback)((function(e,n){E({type:f,errors:(0,t.Z)({},e,n)})}),[]),H=(0,o.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};E({type:f,errors:(0,a.Z)({},e)})}),[]);return{values:j,errors:P,touched:C,focused:S,handleFocus:O,handleBlur:I,handleChange:z,handleSubmit:B,setFieldError:T,setMultipleFieldsError:H}}},9881:function(e,n,r){var t=r(2791);n.Z=function(e){return(0,t.useEffect)((function(){e&&(document.title=e)}),[e]),{setPageTitle:(0,t.useCallback)((function(e){document.title=e}),[])}}},9199:function(e,n,r){r.r(n),r.d(n,{default:function(){return _}});var t=r(168),a=r(5987),i=r(2791),o=r(955),u=r(6030),s=r(3943),l=r(9881),c=r(9850);var d,p,f,h,m,g,v,b,x,w=r.p+"static/media/undraw_online_shopping_re_k1sv.c0f0680850e79ebd69da137a9df4b3b9.svg",Z=r(184),y=["setFieldError","setMultipleFieldsError"],k=function(e){var n={};return e.email.trim()||(n.email="Please enter your email address"),e.password.trim()||(n.password="Please enter a password"),n},F=o.ZP.div(d||(d=(0,t.Z)(["\n  min-height: 100vh;\n  background: url(",");\n  background-repeat: no-repeat;\n  background-position: left top;\n  background-size: 50%;\n  background-origin: content-box;\n  background-color: rgb(0 128 128 / 10%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 40px 20px;\n"])),w),j=o.ZP.div(p||(p=(0,t.Z)(["\n  max-width: 500px;\n  width: 100%;\n"]))),P=o.ZP.form(f||(f=(0,t.Z)(["\n  background-color: #fff;\n  box-shadow: 2px 2px 7px 2px rgb(0 0 0 / 20%);\n  width: 100%;\n  padding: 20px 30px;\n"]))),C=o.ZP.h1(h||(h=(0,t.Z)(["\n  color: teal;\n  font-weight: 300;\n  text-align: left;\n  margin-bottom: 20px;\n  font-size: 30px;\n"]))),S=o.ZP.div(m||(m=(0,t.Z)(["\n  position: relative;\n  margin: 10px 0;\n"]))),E=o.ZP.input(g||(g=(0,t.Z)(["\n  padding: 18px 18px 2px 18px;\n  font-size: 16px;\n  width: 100%;\n  outline: 1px solid #d4d5d9;\n  border: navajowhite;\n  color: #282c3f;\n  caret-color: teal;\n  font-weight: 500;\n  border-radius: 5px;\n  &:focus {\n    outline: 1px solid teal;\n  }\n"]))),O=o.ZP.label(v||(v=(0,t.Z)(["\n  position: absolute;\n  font-size: 16px;\n  color: ",";\n  left: 18px;\n  transform: ",";\n  pointer-events: none;\n  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);\n  transform-origin: left;\n"])),(function(e){return e.isFocused||e.isInputFilled?"teal":"#94969f"}),(function(e){return e.isFocused||e.isInputFilled?"scale(0.75, 0.75) translate(0, 2px)":"translate(0, 10px)"})),I=o.ZP.button(b||(b=(0,t.Z)(["\n  background: teal;\n  color: white;\n  border: 1px solid transparent;\n  padding: 10px 20px;\n  font-size: 14px;\n  text-transform: uppercase;\n  cursor: pointer;\n  :disabled {\n    background-color: grey;\n  }\n"]))),z=o.ZP.p(x||(x=(0,t.Z)(["\n  color: red;\n  height: 20px;\n"]))),_=function(){(0,l.Z)("Login | Fashionista");var e=(0,u.I0)(),n=(0,u.v9)((function(e){return e.auth})).error,r=(0,s.Z)({initialValues:{email:"",password:""},validate:k,onSubmit:function(n){e((0,c.x4)({email:n.email,password:n.password}))}}),t=r.setFieldError,o=r.setMultipleFieldsError,d=(0,a.Z)(r,y);return(0,i.useEffect)((function(){if(n)if(Array.isArray(n)){var e=n.reduce((function(e,n){return e[n.param]=n.msg,e}),{});o(e)}else t("password",n.message)}),[n,t,o]),(0,Z.jsx)(F,{children:(0,Z.jsx)(j,{children:(0,Z.jsxs)(P,{onSubmit:d.handleSubmit,children:[(0,Z.jsx)(C,{children:"Sign In"}),(0,Z.jsxs)(S,{children:[(0,Z.jsx)(O,{htmlFor:"email",isFocused:d.focused.email,isInputFilled:d.values.email,children:"Email"}),(0,Z.jsx)(E,{type:"email",name:"email",id:"email",onFocus:d.handleFocus,onBlur:d.handleBlur,onChange:d.handleChange,value:d.values.email,"aria-label":"Email",required:!0}),(0,Z.jsx)(z,{children:d.touched.email&&d.errors.email})]}),(0,Z.jsxs)(S,{children:[(0,Z.jsx)(O,{htmlFor:"password",isFocused:d.focused.password,isInputFilled:d.values.password,children:"Password"}),(0,Z.jsx)(E,{type:"password",name:"password",id:"password",onFocus:d.handleFocus,onBlur:d.handleBlur,onChange:d.handleChange,value:d.values.password,"aria-label":"Password",required:!0}),(0,Z.jsx)(z,{children:d.touched.password&&d.errors.password})]}),(0,Z.jsx)(S,{children:(0,Z.jsx)(I,{children:"Sign In"})})]})})})}},5987:function(e,n,r){r.d(n,{Z:function(){return a}});var t=r(3366);function a(e,n){if(null==e)return{};var r,a,i=(0,t.Z)(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}},3366:function(e,n,r){function t(e,n){if(null==e)return{};var r,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}r.d(n,{Z:function(){return t}})}}]);
//# sourceMappingURL=199.ac19acbf.chunk.js.map
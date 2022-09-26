"use strict";(self.webpackChunkecommerce_client=self.webpackChunkecommerce_client||[]).push([[64,364],{9881:function(n,e,i){var t=i(2791);e.Z=function(n){return(0,t.useEffect)((function(){n&&(document.title=n)}),[n]),{setPageTitle:(0,t.useCallback)((function(n){document.title=n}),[])}}},5787:function(n,e,i){i.r(e);var t,r,d,o,s,l,c,a,x,h,p,u,f,Z,m,g,j,b,P,y,v=i(168),k=i(2791),w=i(955),O=i(6871),D=i(501),I=i(6030),z=i(2708),A=i(4364),C=i(9881),E=i(171),M=i(2703),N=i(8409),S=i(184),G=w.ZP.div(t||(t=(0,v.Z)([""]))),L=w.ZP.ul(r||(r=(0,v.Z)(["\n  display: flex;\n  list-style: none;\n  gap: 5px;\n  margin-bottom: 10px;\n"]))),T=w.ZP.li(d||(d=(0,v.Z)([""]))),U=(0,w.ZP)(D.rU)(o||(o=(0,v.Z)(["\n  color: black;\n  text-decoration: none;\n  &.active {\n    color: teal;\n  }\n"]))),_=w.ZP.h1(s||(s=(0,v.Z)(["\n  font-weight: 500;\n  font-size: 24px;\n"]))),q=w.ZP.div(l||(l=(0,v.Z)(["\n  margin-top: 10px;\n"]))),F=w.ZP.span(c||(c=(0,v.Z)(["\n  &:first-child {\n    border-right: 1px solid #ccc;\n    display: inline-block;\n    margin-right: 10px;\n    padding-right: 10px;\n  }\n"]))),Q=w.ZP.div(a||(a=(0,v.Z)(["\n  display: flex;\n  justify-content: space-between;\n  border: 1px solid #ccc;\n  padding: 15px 20px;\n  margin: 20px 0;\n  @media "," {\n    flex-direction: column;\n    gap: 20px;\n  }\n  @media "," {\n    flex-direction: column;\n    gap: 20px;\n  }\n"])),N.Z.tablet,N.Z.mobileM),H=w.ZP.div(x||(x=(0,v.Z)(["\n  flex: 1;\n"]))),R=w.ZP.h1(h||(h=(0,v.Z)(["\n  font-weight: 700;\n  font-size: 16px;\n  margin-bottom: 6px;\n"]))),Y=w.ZP.div(p||(p=(0,v.Z)(["\n  display: flex;\n  justify-content: space-between;\n"]))),B=w.ZP.p(u||(u=(0,v.Z)(["\n  line-height: 24px;\n"]))),J=(0,w.ZP)(B)(f||(f=(0,v.Z)(["\n  font-weight: 700;\n"]))),K=w.ZP.div(Z||(Z=(0,v.Z)(["\n  margin-top: 30px;\n"]))),V=w.ZP.div(m||(m=(0,v.Z)(["\n  display: flex;\n  margin-bottom: 16px;\n  @media "," {\n    gap: 20px;\n  }\n  @media "," {\n    gap: 20px;\n  }\n"])),N.Z.tablet,N.Z.mobileM),W=w.ZP.div(g||(g=(0,v.Z)(["\n  height: 112px;\n  width: 112px;\n  position: relative;\n"]))),X=w.ZP.img(j||(j=(0,v.Z)(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  top: 0;\n  margin: auto;\n  opacity: 1;\n  max-width: 100%;\n  max-height: 100%;\n"]))),$=w.ZP.div(b||(b=(0,v.Z)(["\n  @media "," {\n    flex-shrink: 2;\n  }\n  @media "," {\n    flex-shrink: 2;\n  }\n"])),N.Z.tablet,N.Z.mobileM),nn=w.ZP.h2(P||(P=(0,v.Z)(["\n  font-size: 18px;\n  font-weight: 500;\n"]))),en=w.ZP.p(y||(y=(0,v.Z)([""])));e.default=function(){(0,C.Z)("Order Details");var n=(0,O.UO)().id,e=(0,I.v9)((function(n){return n.order})),i=e.order,t=e.status,r=(0,I.I0)(),d=i||{},o=d.shippingaddress,s=d.items,l=null===s||void 0===s?void 0:s.reduce((function(n,e){return n+Number(e.productPrice)*Number(e.quantity)}),0),c=null===i||void 0===i?void 0:i.deliveryPrice,a=l+c,x=new Date(null===i||void 0===i?void 0:i.createdAt).toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"});return(0,k.useEffect)((function(){r((0,E.G)({id:n}))}),[r,n]),t===M.Q_.FAILED?(0,S.jsx)(A.default,{}):t!==M.Q_.LOADING&&i?(0,S.jsxs)(G,{children:[(0,S.jsxs)(L,{children:[(0,S.jsx)(T,{children:(0,S.jsx)(U,{exact:!0,to:"/my/orders",children:"Your Orders"})}),(0,S.jsx)(T,{children:">"}),(0,S.jsx)(T,{children:(0,S.jsx)(U,{className:"active",to:"/my/orders/".concat(n),children:"Order Details"})})]}),(0,S.jsx)(_,{children:"Order Details"}),(0,S.jsxs)(q,{children:[(0,S.jsxs)(F,{children:["Ordered on ",x]}),(0,S.jsxs)(F,{children:["Order# ",i.id]})]}),(0,S.jsxs)(Q,{children:[(0,S.jsxs)(H,{children:[(0,S.jsx)(R,{children:"Shipping Address"}),(0,S.jsx)(B,{children:o.name}),(0,S.jsxs)(B,{children:[o.address,",",o.locality]}),(0,S.jsxs)(B,{children:[o.city,", ",o.state," ",o.pincode]}),(0,S.jsx)(B,{children:"India"})]}),(0,S.jsxs)(H,{children:[(0,S.jsx)(R,{children:"Payment Method"}),(0,S.jsx)(B,{children:i.razorpayOrderId?"Credit / Debit / ATM Card":"Pay On Delivery"})]}),(0,S.jsxs)(H,{children:[(0,S.jsx)(R,{children:"Order Summary"}),(0,S.jsxs)(Y,{children:[(0,S.jsx)(B,{children:"Item(s) Subtotal:"}),(0,S.jsxs)(B,{children:["\u20b9",l]})]}),(0,S.jsxs)(Y,{children:[(0,S.jsx)(B,{children:"Shipping:"}),(0,S.jsx)(B,{children:0===c?"FREE":"\u20b9 ".concat(c)})]}),(0,S.jsxs)(Y,{children:[(0,S.jsx)(J,{children:"Grand Total:"}),(0,S.jsxs)(J,{children:["\u20b9",a]})]})]})]}),(0,S.jsx)(K,{children:s.map((function(n){return(0,S.jsxs)(V,{children:[(0,S.jsx)(W,{children:(0,S.jsx)(X,{src:n.productImg,alt:"product image"})}),(0,S.jsxs)($,{children:[(0,S.jsxs)(nn,{children:[n.productTitle," x ",n.quantity]}),(0,S.jsxs)(en,{children:["\u20b9 ",n.productPrice]})]})]},n.id)}))})]}):(0,S.jsx)(z.Z,{})}},4364:function(n,e,i){i.r(e);var t,r,d,o,s=i(168),l=i(501),c=i(955),a=i(184),x=c.ZP.div(t||(t=(0,s.Z)(["\n  text-align: center;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background: #f1f3f6;\n"]))),h=c.ZP.h1(r||(r=(0,s.Z)(["\n  font-size: 34px;\n  color: #282c3f;\n"]))),p=c.ZP.h2(d||(d=(0,s.Z)(["\n  font-size: 18px;\n  font-weight: 400;\n  margin: 1rem 0;\n  color: #93959f;\n"]))),u=(0,c.ZP)(l.rU)(o||(o=(0,s.Z)(["\n  display: inline-block;\n  text-decoration: none;\n  background-color: teal;\n  color: #fff;\n  font-family: inherit;\n  font-size: 16px;\n  font-weight: 700;\n  padding: 10px 20px;\n  border: 1px solid rgba(0, 0, 0, 0);\n  transition: all 0.3s;\n  cursor: pointer;\n  &:hover {\n    background-color: rgba(0, 0, 0, 0);\n    color: teal;\n    border: 1px solid teal;\n  }\n"])));e.default=function(){return(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{children:"Page not found"}),(0,a.jsx)(p,{children:"Uh-oh! Looks like the page you are trying to access doesn't exist. Please start afresh."}),(0,a.jsx)(u,{to:"/",children:"Go Home"})]})}}}]);
//# sourceMappingURL=64.37dbfb56.chunk.js.map
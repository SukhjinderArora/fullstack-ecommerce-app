"use strict";(self.webpackChunkecommerce_client=self.webpackChunkecommerce_client||[]).push([[479],{6479:function(n,e,i){i.r(e);var t,d,r,o,s,c,l,a,x,p,h,m,Z,u,f,g,j,b,v,P,w=i(168),y=i(2791),D=i(955),k=i(6030),E=i(501),z=i(2708),I=i(7650),O=i(2703),M=i(8409),R=i(9881),S=i(184),A=D.ZP.div(t||(t=(0,w.Z)(["\n  padding: 0 30px;\n  @media "," {\n    padding: 0;\n  }\n  @media "," {\n    padding: 0;\n  }\n"])),M.Z.tablet,M.Z.mobileM),C=D.ZP.h1(d||(d=(0,w.Z)(["\n  font-size: 24px;\n  font-weight: 500;\n  margin-bottom: 40px;\n  border-bottom: 1px solid #d4d4d9;\n  padding-bottom: 30px;\n"]))),L=D.ZP.div(r||(r=(0,w.Z)([""]))),_=D.ZP.div(o||(o=(0,w.Z)(["\n  padding: 20px;\n  border: 1px solid #ccc;\n  position: relative;\n  margin-bottom: 20px;\n"]))),F=D.ZP.div(s||(s=(0,w.Z)(["\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 10px;\n  border: 1px solid #eee;\n  border-radius: 4px;\n  background-color: #e9e9e954;\n  & > div:first-child {\n    flex: 1;\n  }\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n"]))),N=D.ZP.p(c||(c=(0,w.Z)([""]))),T=D.ZP.p(l||(l=(0,w.Z)(["\n  margin-top: 5px;\n"]))),G=(0,D.ZP)(E.rU)(a||(a=(0,w.Z)(["\n  color: teal;\n  text-decoration: none;\n"]))),Q=D.ZP.div(x||(x=(0,w.Z)(["\n  margin-top: 70px;\n  @media "," {\n    margin-top: 100px;\n  }\n  @media "," {\n    margin-top: 100px;\n  }\n"])),M.Z.tablet,M.Z.mobileM),Y=D.ZP.div(p||(p=(0,w.Z)(["\n  display: flex;\n  margin-bottom: 16px;\n  @media "," {\n    gap: 10px;\n  }\n  @media "," {\n    gap: 10px;\n  }\n"])),M.Z.tablet,M.Z.mobileM),q=D.ZP.div(h||(h=(0,w.Z)(["\n  height: 112px;\n  width: 112px;\n"]))),U=D.ZP.img(m||(m=(0,w.Z)(["\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n"]))),V=D.ZP.div(Z||(Z=(0,w.Z)(["\n  @media "," {\n    flex-shrink: 2;\n  }\n  @media "," {\n    flex-shrink: 2;\n  }\n"])),M.Z.tablet,M.Z.mobileM),B=D.ZP.h2(u||(u=(0,w.Z)(["\n  font-size: 18px;\n  font-weight: 500;\n  @media "," {\n    font-size: 16px;\n  }\n  @media "," {\n    font-size: 16px;\n  }\n"])),M.Z.tablet,M.Z.mobileM),H=D.ZP.p(f||(f=(0,w.Z)([""]))),J=D.ZP.div(g||(g=(0,w.Z)(["\n  margin-top: 20px;\n"]))),K=D.ZP.p(j||(j=(0,w.Z)(["\n  font-weight: 500;\n  font-size: 18px;\n  margin-bottom: 10px;\n  @media "," {\n    font-size: 16px;\n  }\n  @media "," {\n    font-size: 16px;\n  }\n"])),M.Z.tablet,M.Z.mobileM),W=D.ZP.div(b||(b=(0,w.Z)(["\n  display: flex;\n  margin-bottom: 5px;\n  justify-content: space-between;\n"]))),X=D.ZP.p(v||(v=(0,w.Z)(["\n  font-weight: 500;\n  margin-right: 10px;\n"]))),$=D.ZP.p(P||(P=(0,w.Z)([""])));e.default=function(){(0,R.Z)("Orders | Fashionista");var n=(0,k.v9)((function(n){return n.orders})),e=n.status,i=n.orders,t=(0,k.I0)();return(0,y.useEffect)((function(){t((0,I.u)())}),[t]),e===O.Q_.LOADING?(0,S.jsx)(z.Z,{}):e===O.Q_.FAILED?(0,S.jsx)("div",{children:"Something went wrong!"}):(0,S.jsxs)(A,{children:[(0,S.jsx)(C,{children:"Your Orders"}),0===i.length&&(0,S.jsx)("div",{children:"You have no orders"}),(0,S.jsx)(L,{children:null===i||void 0===i?void 0:i.map((function(n){var e=n.items.reduce((function(n,e){return n+Number(e.productPrice)}),0),i=n.deliveryPrice,t=e+i,d=new Date(n.createdAt);return(0,S.jsxs)(_,{children:[(0,S.jsxs)(F,{children:[(0,S.jsxs)("div",{children:[(0,S.jsx)(N,{children:"ORDER PLACED"}),(0,S.jsx)(T,{children:d.toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"})})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)(N,{children:"ORDER ID"}),(0,S.jsxs)(T,{children:["# ",n.id]})]}),(0,S.jsx)("div",{children:(0,S.jsx)(G,{to:"/my/orders/".concat(n.id),children:"View Order Details"})})]}),(0,S.jsx)(Q,{children:n.items.map((function(n){return(0,S.jsxs)(Y,{children:[(0,S.jsx)(q,{children:(0,S.jsx)(U,{src:n.productImg,alt:"product image"})}),(0,S.jsxs)(V,{children:[(0,S.jsxs)(B,{children:[n.productTitle," x ",n.quantity]}),(0,S.jsxs)(H,{children:["\u20b9 ",n.productPrice]})]})]},n.id)}))}),(0,S.jsxs)(J,{children:[(0,S.jsx)(K,{children:"Order Summary"}),(0,S.jsxs)(W,{children:[(0,S.jsx)(X,{children:"Item(s) Subtotal:"}),(0,S.jsxs)($,{children:["\u20b9 ",e]})]}),(0,S.jsxs)(W,{children:[(0,S.jsx)(X,{children:"Shipping:"}),(0,S.jsx)($,{children:0===i?"FREE":"\u20b9 ".concat(i)})]}),(0,S.jsxs)(W,{children:[(0,S.jsx)(X,{children:"Grand Total:"}),(0,S.jsxs)($,{children:["\u20b9 ",t]})]})]})]},n.id)}))})]})}},9881:function(n,e,i){var t=i(2791);e.Z=function(n){return(0,t.useEffect)((function(){n&&(document.title=n)}),[n]),{setPageTitle:(0,t.useCallback)((function(n){document.title=n}),[])}}}}]);
//# sourceMappingURL=479.203b1321.chunk.js.map
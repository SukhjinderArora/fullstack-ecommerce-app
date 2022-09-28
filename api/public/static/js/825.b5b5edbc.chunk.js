"use strict";(self.webpackChunkecommerce_client=self.webpackChunkecommerce_client||[]).push([[825,364],{4963:function(n,e,t){var r,i,o,l=t(168),a=t(885),c=t(2791),s=t(955),d=t(7191),p=t(3874),u=t(184),f=s.ZP.div(r||(r=(0,l.Z)(["\n  overflow: hidden;\n  position: relative;\n"]))),x=s.ZP.div(i||(i=(0,l.Z)(["\n  display: flex;\n  transform: translateX(\n    ","px\n  );\n  transition: all 0.5s ease-in-out;\n"])),(function(n){return n.itemWidth*n.currentItemIndexAtLeft*-1})),h=s.ZP.div(o||(o=(0,l.Z)([""])));e.Z=function(n){var e=n.children,t=(0,c.useState)(0),r=(0,a.Z)(t,2),i=r[0],o=r[1],l=(0,c.useState)(0),s=(0,a.Z)(l,2),g=s[0],m=s[1],Z=c.Children.count(e),b=(0,c.useRef)(null),v=(0,p.Z)({root:b.current,threshold:1}),w=v.inView,y=v.inViewRef,j=(0,c.useCallback)((function(n){null!==n&&(o(n.getBoundingClientRect().width),y(n.firstChild))}),[y]),P=function(n){m("right"===n?function(n){return w?0:n+1}:function(n){return 0===n?n:n-1})};return(0,u.jsxs)(f,{ref:b,children:[(0,u.jsx)(x,{itemWidth:i,totalItems:Z,currentItemIndexAtLeft:g,children:c.Children.map(e,(function(n,e){return(0,u.jsx)(h,{ref:e===Z-1?j:null,children:n})}))}),(0,u.jsx)(d.Z,{position:"left",clickHandler:function(){return P("left")}}),(0,u.jsx)(d.Z,{position:"right",clickHandler:function(){return P("right")}})]})}},5148:function(n,e,t){var r,i,o,l,a,c,s,d,p,u=t(168),f=t(885),x=t(2791),h=t(6871),g=t(955),m=t(8409),Z=t(184),b=g.ZP.div(r||(r=(0,u.Z)(["\n  width: 300px;\n  cursor: pointer;\n  @media "," {\n    width: 150px;\n  }\n  @media "," {\n    width: 150px;\n  }\n"])),m.Z.tablet,m.Z.mobileM),v=g.ZP.div(i||(i=(0,u.Z)(["\n  height: 400px;\n  width: 100%;\n  box-shadow: 0 0 20px 1px #0000001c;\n  position: relative;\n  @media "," {\n    height: 160px;\n  }\n  @media "," {\n    height: 160px;\n  }\n"])),m.Z.tablet,m.Z.mobileM),w=g.ZP.img(o||(o=(0,u.Z)(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  @media "," {\n    object-fit: contain;\n  }\n  @media "," {\n    object-fit: contain;\n  }\n"])),m.Z.tablet,m.Z.mobileM),y=g.ZP.a(l||(l=(0,u.Z)(["\n  display: inline-block;\n  margin-top: 12px;\n  margin-bottom: 5px;\n  font-weight: 500;\n  @media "," {\n    font-size: 14px;\n  }\n  @media "," {\n    font-size: 14px;\n  }\n"])),m.Z.tablet,m.Z.mobileM),j=g.ZP.div(a||(a=(0,u.Z)(["\n  @media "," {\n    font-size: 14px;\n  }\n  @media "," {\n    font-size: 14px;\n  }\n"])),m.Z.tablet,m.Z.mobileM),P=g.ZP.span(c||(c=(0,u.Z)(["\n  font-weight: 700;\n  color: teal;\n  margin-right: 5px;\n"]))),k=g.ZP.del(s||(s=(0,u.Z)(["\n  color: #515151;\n"]))),O=g.ZP.div(d||(d=(0,u.Z)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-around;\n  padding: 15px 0;\n  overflow: hidden;\n  opacity: ",";\n  transition: all 0.5s ease;\n  background-color: rgba(0, 0, 0, 0.1);\n"])),(function(n){return n.isHovered?1:0})),z=g.ZP.button(p||(p=(0,u.Z)(["\n  display: inline-block;\n  background-color: white;\n  font-weight: 700;\n  font-size: 14px;\n  border: none;\n  padding: 12px 15px;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: all 0.3s;\n  &:hover {\n    background-color: teal;\n    color: white;\n  }\n"])));e.Z=function(n){var e=n.title,t=n.img,r=n.priceNew,i=n.priceOld,o=n.id,l=(0,x.useState)(!1),a=(0,f.Z)(l,2),c=a[0],s=a[1],d=(0,h.s0)(),p=function(){d("/product/".concat(o))};return(0,Z.jsxs)(b,{onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)},onClick:p,children:[(0,Z.jsxs)(v,{children:[(0,Z.jsx)(w,{src:t}),(0,Z.jsxs)(O,{isHovered:c,children:[(0,Z.jsx)(z,{onClick:p,children:"Add to cart"}),(0,Z.jsx)(z,{onClick:p,children:"Buy Now"})]})]}),(0,Z.jsx)(y,{children:e}),(0,Z.jsxs)(j,{children:[(0,Z.jsxs)(P,{children:["\u20b9 ",r]}),(0,Z.jsxs)(k,{children:["\u20b9 ",i]})]})]})}},7191:function(n,e,t){var r,i=t(168),o=t(955),l=t(2506),a=t(8606),c=t(8409),s=t(184),d=o.ZP.button(r||(r=(0,i.Z)(["\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: ",";\n  right: ",";\n  cursor: pointer;\n  background-color: white;\n  border: none;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  box-shadow: 0 4px 6px -3px #9a9a9a;\n  transition: all 0.3s ease-in-out;\n  &:hover {\n    background-color: #f5f5f5;\n  }\n  /* @media "," {\n    width: 30px;\n    height: 30px;\n    & svg {\n      width: 16px;\n      height: 16px;\n    }\n  } */\n  @media "," {\n    width: 30px;\n    height: 30px;\n    & svg {\n      width: 16px;\n      height: 16px;\n    }\n  }\n"])),(function(n){return"left"===n.$position&&0}),(function(n){return"right"===n.$position&&0}),c.Z.tablet,c.Z.mobileM);e.Z=function(n){var e=n.position,t=n.clickHandler;return(0,s.jsx)(d,{onClick:t,$position:e,children:"right"===e?(0,s.jsx)(l.Z,{stroke:"#2c4152"}):(0,s.jsx)(a.Z,{stroke:"#2c4152"})})}},4078:function(n,e,t){var r,i=t(168),o=t(955).ZP.button(r||(r=(0,i.Z)(["\n  background-color: teal;\n  border: none;\n  color: white;\n  padding: 15px 20px;\n  font-size: 16px;\n  text-transform: uppercase;\n  cursor: pointer;\n"])));e.Z=o},3874:function(n,e,t){var r=t(885),i=t(2791);e.Z=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{root:null,rootMargin:"0px",threshold:1},e=(0,i.useState)(!1),t=(0,r.Z)(e,2),o=t[0],l=t[1],a=(0,i.useRef)(null),c=(0,i.useRef)(!0),s=(0,i.useCallback)((function(n){n&&(a.current=n)}),[]);return(0,i.useEffect)((function(){return function(){c.current=!1}}),[]),(0,i.useEffect)((function(){var e=new IntersectionObserver((function(n){n.forEach((function(n){c.current&&(n.isIntersecting?l(!0):l(!1))}))}),n);a.current&&e.observe(a.current)}),[n]),{ref:a,inView:o,inViewRef:s}}},9881:function(n,e,t){var r=t(2791);e.Z=function(n){return(0,r.useEffect)((function(){n&&(document.title=n)}),[n]),{setPageTitle:(0,r.useCallback)((function(n){document.title=n}),[])}}},4364:function(n,e,t){t.r(e);var r,i,o,l,a=t(168),c=t(501),s=t(955),d=t(184),p=s.ZP.div(r||(r=(0,a.Z)(["\n  text-align: center;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background: #f1f3f6;\n"]))),u=s.ZP.h1(i||(i=(0,a.Z)(["\n  font-size: 34px;\n  color: #282c3f;\n"]))),f=s.ZP.h2(o||(o=(0,a.Z)(["\n  font-size: 18px;\n  font-weight: 400;\n  margin: 1rem 0;\n  color: #93959f;\n"]))),x=(0,s.ZP)(c.rU)(l||(l=(0,a.Z)(["\n  display: inline-block;\n  text-decoration: none;\n  background-color: teal;\n  color: #fff;\n  font-family: inherit;\n  font-size: 16px;\n  font-weight: 700;\n  padding: 10px 20px;\n  border: 1px solid rgba(0, 0, 0, 0);\n  transition: all 0.3s;\n  cursor: pointer;\n  &:hover {\n    background-color: rgba(0, 0, 0, 0);\n    color: teal;\n    border: 1px solid teal;\n  }\n"])));e.default=function(){return(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{children:"Page not found"}),(0,d.jsx)(f,{children:"Uh-oh! Looks like the page you are trying to access doesn't exist. Please start afresh."}),(0,d.jsx)(x,{to:"/",children:"Go Home"})]})}},4825:function(n,e,t){t.r(e),t.d(e,{default:function(){return Xn}});var r,i,o=t(168),l=t(5861),a=t(885),c=t(7757),s=t.n(c),d=t(2791),p=t(955),u=t(6030),f=t(6871),x=t(6140),h=t(7379),g=t(1469),m=t(4078),Z=t(4963),b=t(5148),v=t(2708),w=["title","titleId"];function y(){return y=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},y.apply(this,arguments)}function j(n,e){if(null==n)return{};var t,r,i=function(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}function P(n,e){var t=n.title,o=n.titleId,l=j(n,w);return d.createElement("svg",y({width:38,height:38,viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",ref:e,"aria-labelledby":o},l),t?d.createElement("title",{id:o},t):null,r||(r=d.createElement("defs",null,d.createElement("linearGradient",{x1:"8.042%",y1:"0%",x2:"65.682%",y2:"23.865%",id:"a"},d.createElement("stop",{stopColor:"#fff",stopOpacity:0,offset:"0%"}),d.createElement("stop",{stopColor:"#fff",stopOpacity:.631,offset:"63.146%"}),d.createElement("stop",{stopColor:"#fff",offset:"100%"})))),i||(i=d.createElement("g",{fill:"none",fillRule:"evenodd"},d.createElement("g",{transform:"translate(1 1)"},d.createElement("path",{d:"M36 18c0-9.94-8.06-18-18-18",id:"Oval-2",stroke:"url(#a)",strokeWidth:2},d.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.9s",repeatCount:"indefinite"})),d.createElement("circle",{fill:"#fff",cx:36,cy:18,r:1},d.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.9s",repeatCount:"indefinite"}))))))}var k,O,z,C,E,M,S,I,N,R,T,L,B,H,W,A,U,V,q,G,$,F,X,Y,_,D,J,Q,K,nn,en,tn,rn,on=d.forwardRef(P),ln=(t.p,(0,p.ZP)(on)(k||(k=(0,o.Z)(["\n  width: ",";\n  height: ",";\n"])),(function(n){return n.width||"40px"}),(function(n){return n.height||"40px"}))),an=t(4364),cn=t(1694),sn=t(6122),dn=t(5783),pn=t(2703),un=t(8409),fn=t(9881),xn=t(184),hn=p.ZP.div(O||(O=(0,o.Z)(["\n  padding: 50px 20px;\n"]))),gn=p.ZP.div(z||(z=(0,o.Z)(["\n  display: flex;\n  margin-bottom: 20px;\n  @media "," {\n    flex-direction: column;\n  }\n"])),un.Z.mobileM),mn=p.ZP.div(C||(C=(0,o.Z)(["\n  flex: 1;\n  display: flex;\n  justify-content: space-evenly;\n"]))),Zn=p.ZP.div(E||(E=(0,o.Z)([""]))),bn=p.ZP.div(M||(M=(0,o.Z)(["\n  border: 2px solid ",";\n  display: flex;\n  width: 100px;\n  margin-bottom: 10px;\n  cursor: pointer;\n  @media "," {\n    width: 70px;\n  }\n  @media "," {\n    width: 50px;\n  }\n"])),(function(n){return n.selected?"teal":"transparent"}),un.Z.tablet,un.Z.mobileM),vn=p.ZP.img(S||(S=(0,o.Z)(["\n  width: 100%;\n"]))),wn=p.ZP.div(I||(I=(0,o.Z)(["\n  position: relative;\n  @media "," {\n    text-align: center;\n  }\n  @media "," {\n    text-align: center;\n  }\n"])),un.Z.tablet,un.Z.mobileM),yn=p.ZP.img(N||(N=(0,o.Z)(["\n  width: 450px;\n  @media "," {\n    width: 250px;\n  }\n  @media "," {\n    width: 250px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),jn=p.ZP.div(R||(R=(0,o.Z)(["\n  flex: 1;\n  padding: 0 20px;\n  @media "," {\n    margin-top: 20px;\n  }\n  @media "," {\n    margin-top: 20px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Pn=p.ZP.h1(T||(T=(0,o.Z)(["\n  font-size: 25px;\n  font-weight: 300;\n  color: rgb(27, 40, 57);\n  text-transform: uppercase;\n  @media "," {\n    font-size: 18px;\n    font-weight: 700;\n  }\n  @media "," {\n    font-size: 18px;\n    font-weight: 700;\n  }\n"])),un.Z.tablet,un.Z.mobileM),kn=p.ZP.div(L||(L=(0,o.Z)(["\n  margin: 10px 0;\n"]))),On=p.ZP.span(B||(B=(0,o.Z)(["\n  font-size: 25px;\n  font-weight: 700;\n  color: teal;\n  margin-right: 10px;\n  @media "," {\n    font-size: 16px;\n  }\n  @media "," {\n    font-size: 16px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),zn=p.ZP.span(H||(H=(0,o.Z)(["\n  font-size: 18px;\n  @media "," {\n    font-size: 16px;\n  }\n  @media "," {\n    font-size: 16px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Cn=p.ZP.div(W||(W=(0,o.Z)(["\n  display: flex;\n  margin: 20px 0;\n"]))),En=p.ZP.div(A||(A=(0,o.Z)(["\n  min-width: 50px;\n  height: 50px;\n  padding: 10px;\n  border: 1px solid grey;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 10px;\n  cursor: pointer;\n  &.selected {\n    border: 1px solid teal;\n    background: teal;\n    color: white;\n  }\n"]))),Mn=p.ZP.div(U||(U=(0,o.Z)(["\n  margin: 20px 0;\n"]))),Sn=p.ZP.p(V||(V=(0,o.Z)(["\n  font-size: 18px;\n  @media "," {\n    font-size: 16px;\n  }\n  @media "," {\n    font-size: 16px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),In=p.ZP.button(q||(q=(0,o.Z)(["\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background-color: ",";\n  border: 3px solid ",";\n  display: inline-block;\n  margin-right: 10px;\n  cursor: pointer;\n  @media "," {\n    width: 30px;\n    height: 30px;\n  }\n  @media "," {\n    width: 30px;\n    height: 30px;\n  }\n"])),(function(n){return n.color}),(function(n){return n.active?"teal":"#ccc"}),un.Z.tablet,un.Z.mobileM),Nn=p.ZP.div(G||(G=(0,o.Z)(["\n  display: flex;\n  align-items: center;\n  margin: 20px 0;\n"]))),Rn=p.ZP.span($||($=(0,o.Z)(["\n  font-size: 18px;\n  @media "," {\n    font-size: 16px;\n  }\n  @media "," {\n    font-size: 16px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Tn=p.ZP.div(F||(F=(0,o.Z)(["\n  display: flex;\n  margin-left: 10px;\n"]))),Ln=p.ZP.button(X||(X=(0,o.Z)(["\n  background: white;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  border: 1px solid grey;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  @media "," {\n    width: 25px;\n    height: 25px;\n  }\n  @media "," {\n    width: 25px;\n    height: 25px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Bn=p.ZP.input(Y||(Y=(0,o.Z)(["\n  width: 50px;\n  height: 30px;\n  font-size: 18px;\n  padding: 5px;\n  text-align: center;\n  vertical-align: middle;\n  display: inline-block;\n  margin: 0 8px;\n"]))),Hn=p.ZP.button(_||(_=(0,o.Z)(["\n  background: white;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  border: 1px solid grey;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  @media "," {\n    width: 25px;\n    height: 25px;\n  }\n  @media "," {\n    width: 25px;\n    height: 25px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Wn=p.ZP.div(D||(D=(0,o.Z)(["\n  display: flex;\n  align-items: center;\n"]))),An=(0,p.ZP)(m.Z)(J||(J=(0,o.Z)(["\n  font-size: 16px;\n  padding: 10px 15px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin-right: 20px;\n  border: 1px solid transparent;\n  height: 50px;\n  width: 200px;\n  @media "," {\n    font-size: 14px;\n  }\n  @media "," {\n    font-size: 14px;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Un=(0,p.ZP)(m.Z)(Q||(Q=(0,o.Z)(["\n  font-size: 16px;\n  padding: 10px 15px;\n  color: teal;\n  background: white;\n  border: 1px solid teal;\n  height: 50px;\n  width: 200px;\n"]))),Vn=p.ZP.div(K||(K=(0,o.Z)(["\n  color: #262626;\n  border: 1px solid #cfcfcf;\n  padding: 20px;\n\n  & p {\n    margin-bottom: 30px;\n  }\n\n  & p br {\n    display: block;\n    content: '';\n    margin-bottom: 10px;\n  }\n"]))),qn=p.ZP.p(nn||(nn=(0,o.Z)(["\n  @media "," {\n    font-size: 16px;\n    font-weight: 700;\n  }\n  @media "," {\n    font-size: 16px;\n    font-weight: 700;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Gn=p.ZP.p(en||(en=(0,o.Z)([""]))),$n=p.ZP.div(tn||(tn=(0,o.Z)(["\n  padding: 0 20px;\n  margin: 40px 0;\n  @media "," {\n    padding: 0;\n  }\n  @media "," {\n    padding: 0;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Fn=p.ZP.h1(rn||(rn=(0,o.Z)(["\n  font-size: 30px;\n  text-transform: uppercase;\n  text-align: center;\n  color: rgb(27, 40, 57);\n  margin-bottom: 40px;\n  @media "," {\n    font-size: 20px;\n    font-weight: 700;\n  }\n  @media "," {\n    font-size: 20px;\n    font-weight: 700;\n  }\n"])),un.Z.tablet,un.Z.mobileM),Xn=function(){var n=(0,f.UO)(),e=Number(n.id),t=(0,f.s0)(),r=(0,f.TH)(),i=(0,u.I0)(),o=(0,fn.Z)().setPageTitle,c=(0,u.v9)((function(n){return n.product})),p=c.product,m=c.status,w=(0,u.v9)((function(n){return n.products})).products,y=(0,u.v9)((function(n){return n.auth})).isAuthenticated,j=p.title,P=p.img,k=p.price,O=p.description,z=p.sizes,C=p.category,E=p.colors,M=(0,d.useState)(1),S=(0,a.Z)(M,2),I=S[0],N=S[1],R=(0,d.useState)(null),T=(0,a.Z)(R,2),L=T[0],B=T[1],H=(0,d.useState)(!1),W=(0,a.Z)(H,2),A=W[0],U=W[1];(0,d.useEffect)((function(){return i((0,cn.MX)({id:e})).unwrap().then((function(n){return o("".concat(n.product.title," | Fashionista"))})),function(){i((0,cn.JY)()),i((0,sn.kH)()),B(null),N(1),U(!1)}}),[i,e,o]),(0,d.useEffect)((function(){C&&i((0,sn.t2)({category:C,limit:10}))}),[C,i,e]);var V=function(){var n=(0,l.Z)(s().mark((function n(){return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(y){n.next=4;break}return x.ZP.error("Please login to continue"),t("/login",{state:{from:r}}),n.abrupt("return");case 4:if(L){n.next=7;break}return x.ZP.error("Please select the product size"),n.abrupt("return");case 7:if(!(I<1)){n.next=10;break}return x.ZP.error("Product quantity cannot be less than 1"),n.abrupt("return");case 10:return n.prev=10,n.next=13,i((0,dn.dA)({productId:L.id,quantity:I})).unwrap();case 13:x.ZP.success("Product successfully added to the cart"),U(!0),setTimeout((function(){t("/checkout/cart")}),1e3),n.next=21;break;case 18:n.prev=18,n.t0=n.catch(10),x.ZP.error("Something went wrong!");case 21:case"end":return n.stop()}}),n,null,[[10,18]])})));return function(){return n.apply(this,arguments)}}();return"failed"===m?(0,xn.jsx)(an.default,{}):"loading"===m||(0,pn.Sm)(p)?(0,xn.jsx)(v.Z,{}):(0,xn.jsxs)(hn,{children:[(0,xn.jsxs)(gn,{children:[(0,xn.jsxs)(mn,{children:[(0,xn.jsx)(Zn,{children:(0,xn.jsx)(bn,{selected:!0,children:(0,xn.jsx)(vn,{src:P})})}),(0,xn.jsx)(wn,{children:(0,xn.jsx)(yn,{src:P})})]}),(0,xn.jsxs)(jn,{children:[(0,xn.jsx)(Pn,{children:j}),(0,xn.jsx)(kn,{children:(0,xn.jsxs)(On,{children:["INR ",k]})}),(0,xn.jsx)(zn,{children:"Size:"}),(0,xn.jsx)(Cn,{children:z.map((function(n){return(0,xn.jsx)(En,{onClick:function(){return function(n){B(n)}(n)},className:(null===L||void 0===L?void 0:L.id)===n.id&&"selected",children:n.size.toUpperCase()},n.id)}))}),(0,xn.jsx)(Sn,{children:"Color:"}),(0,xn.jsx)(Mn,{children:E.map((function(n){return(0,xn.jsx)(In,{color:n.color,active:n.id===e,onClick:function(){return t("/product/".concat(n.id),{replace:!0})}},n.id)}))}),(0,xn.jsxs)(Nn,{children:[(0,xn.jsx)(Rn,{children:"Qty:"}),(0,xn.jsxs)(Tn,{children:[(0,xn.jsx)(Ln,{onClick:function(){return N((function(n){return n>1?n-1:n}))},children:(0,xn.jsx)(h.Z,{})}),(0,xn.jsx)(Bn,{type:"number",value:I,min:"1",required:!0,onChange:function(n){return N(Number(n.target.value))}}),(0,xn.jsx)(Hn,{onClick:function(){return N((function(n){return n+1}))},children:(0,xn.jsx)(g.Z,{})})]})]}),(0,xn.jsxs)(Wn,{children:[(0,xn.jsx)(An,{onClick:V,children:A?(0,xn.jsxs)(xn.Fragment,{children:[(0,xn.jsx)(ln,{width:"20px",height:"20px"}),(0,xn.jsx)("span",{children:"Going To Cart"})]}):"Add to Cart"}),(0,xn.jsx)(Un,{children:"Buy Now"})]})]})]}),(0,xn.jsxs)(Vn,{children:[(0,xn.jsx)(qn,{children:"DESCRIPTION"}),(0,xn.jsx)(Gn,{children:O})]}),(0,xn.jsxs)($n,{children:[(0,xn.jsx)(Fn,{children:"Related Products"}),(0,xn.jsx)(Z.Z,{children:w.map((function(n){return n.id!==e&&(0,xn.jsx)("div",{style:{margin:"0 20px"},children:(0,xn.jsx)(b.Z,{title:n.title,img:n.img,priceNew:Number(n.price),priceOld:Number(n.price),id:n.id})},n.id)}))})]})]})}},8606:function(n,e,t){var r=t(2791),i=t(2007),o=t.n(i);function l(){return l=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},l.apply(this,arguments)}function a(n,e){if(null==n)return{};var t,r,i=function(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var c=(0,r.forwardRef)((function(n,e){var t=n.color,i=void 0===t?"currentColor":t,o=n.size,c=void 0===o?24:o,s=a(n,["color","size"]);return r.createElement("svg",l({ref:e,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),r.createElement("polyline",{points:"15 18 9 12 15 6"}))}));c.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},c.displayName="ChevronLeft",e.Z=c},2506:function(n,e,t){var r=t(2791),i=t(2007),o=t.n(i);function l(){return l=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},l.apply(this,arguments)}function a(n,e){if(null==n)return{};var t,r,i=function(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var c=(0,r.forwardRef)((function(n,e){var t=n.color,i=void 0===t?"currentColor":t,o=n.size,c=void 0===o?24:o,s=a(n,["color","size"]);return r.createElement("svg",l({ref:e,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),r.createElement("polyline",{points:"9 18 15 12 9 6"}))}));c.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},c.displayName="ChevronRight",e.Z=c},7379:function(n,e,t){var r=t(2791),i=t(2007),o=t.n(i);function l(){return l=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},l.apply(this,arguments)}function a(n,e){if(null==n)return{};var t,r,i=function(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var c=(0,r.forwardRef)((function(n,e){var t=n.color,i=void 0===t?"currentColor":t,o=n.size,c=void 0===o?24:o,s=a(n,["color","size"]);return r.createElement("svg",l({ref:e,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),r.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}))}));c.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},c.displayName="Minus",e.Z=c},1469:function(n,e,t){var r=t(2791),i=t(2007),o=t.n(i);function l(){return l=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},l.apply(this,arguments)}function a(n,e){if(null==n)return{};var t,r,i=function(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var c=(0,r.forwardRef)((function(n,e){var t=n.color,i=void 0===t?"currentColor":t,o=n.size,c=void 0===o?24:o,s=a(n,["color","size"]);return r.createElement("svg",l({ref:e,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),r.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),r.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}))}));c.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},c.displayName="Plus",e.Z=c}}]);
//# sourceMappingURL=825.b5b5edbc.chunk.js.map
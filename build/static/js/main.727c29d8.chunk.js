(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,function(t,e,n){t.exports=n.p+"static/media/logo.5d5d9eef.svg"},function(t,e,n){t.exports=n(18)},,,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var i=n(0),s=n.n(i),o=n(7),a=n.n(o),r=(n(15),n(1)),c=n(2),u=n(4),l=n(3),h=n(5),p=n(8),d=n.n(p);n(16),i.Component,Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(17);var m=375,v=0,f=0,g=0,y=0,w=0,T=0,k=0,b=0,I=null,x="function"===typeof document.documentElement.getBoundingClientRect,C=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(u.a)(this,Object(l.a)(e).call(this,t))).state={currentList:[],transX:0,activeIndex:1,isTransToX:!1,firstSwiperItem:null,lastSwiperItem:null,swiperItemCount:0},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){var t=this,e=this.props.urlList;this.isMobile()||(e=["https://dummyimage.com/375x100/FB8A80?text=please+browse+on+mobile"]);var n=e.length>1?e.slice(-1).concat(e,e.slice(0,1)).map(function(t,e){return{url:t,_id:e}}):e.map(function(t,e){return{url:t,_id:e}});if(m=this.props.clientW,v=m*this.props.criticalValue,n.length>1){k=this.getActiveIndex(this.props.startIndex+1);var i=y=-m*k;this.setState({activeIndex:k,transX:i})}clearTimeout(I),I=setTimeout(function(){t.autoPlayFn()},14),this.setState({swiperItemCount:n.length,currentList:n})}},{key:"componentWillUnmount",value:function(){clearTimeout(I)}},{key:"touchstartFn",value:function(t){if(clearTimeout(I),!this.ignoreTouch()){if(this.state.isTransToX){if(!x)return f=0;var e=y=this.refs.sliderWrapper.getBoundingClientRect().left-this.refs.swiperContainer.getBoundingClientRect().left;this.setState({isTransToX:!1,transX:e})}f=1,b=t.touches.length,this.singleTouchStartFn(t)}}},{key:"touchmoveFn",value:function(t){t.preventDefault(),this.ignoreTouch()||1!==f||1!==this.state.swiperItemCount&&this.singleTouchMoveFn(t)}},{key:"touchendFn",value:function(t){if(b=t.touches.length,!this.ignoreTouch()&&1===f)return 0!==b?(g=t.touches[b-1].clientX,void(y=this.state.transX)):void this.singleTouchEndFn(t)}},{key:"getSingleTouchEndMultipleChildToX",value:function(){var t=0,e=this.state.transX+m*k,n=Math.floor(e/m);return Math.abs(e)>m&&(k=Math.ceil(-this.state.transX/m),e-=m*n),e>0?(T=-1,t=(w=e>v)?-m*(k-1):-m*k):e<0?(T=1,t=(w=Math.abs(e)>v)?-m*(k+1):-m*k):(T=0,w=!1,t=-m*k),k=this.getActiveIndex(k+(w?T:0)),this.setState({activeIndex:k}),t}},{key:"singleTouchStartFn",value:function(t){g=t.touches[b-1].clientX,b>1&&(y=this.state.transX)}},{key:"singleTouchMoveFn",value:function(t){var e=t.touches[b-1].clientX-g+y;e>0?(g=t.touches[b-1].clientX,y=e=-m*(this.state.swiperItemCount-2)):e<-m*(this.state.swiperItemCount-1)&&(g=t.touches[b-1].clientX,y=e=-m),this.setState({transX:e})}},{key:"singleTouchEndFn",value:function(t){var e=1===this.state.swiperItemCount?0:this.getSingleTouchEndMultipleChildToX();this.gotoX(e)}},{key:"transEndFn",value:function(){var t=this;k=this.getActiveIndex(k),y=-m*k,this.setState({activeIndex:k,transX:y}),clearTimeout(I),I=setTimeout(function(){t.autoPlayFn()},16.7)}},{key:"transitionendFn",value:function(t){"swiper-wrapper"===t.target.className&&this.state.isTransToX&&(this.setState({isTransToX:!1}),this.transEndFn(),this.props.change&&this.props.change(k))}},{key:"getActiveIndex",value:function(t){return 1===this.state.swiperItemCount?0:t>=this.state.swiperItemCount-1?1:t<=0?this.state.swiperItemCount-2:t}},{key:"autoPlayFn",value:function(){var t=this;this.state.swiperItemCount>1&&"number"===typeof this.props.autoPlayDelay&&this.props.autoPlayDelay>=0&&0===b&&this.state.transX%m===0&&(clearTimeout(I),I=setTimeout(function(){k+=1,t.setState({transX:-m*k,isTransToX:!0}),t.correctDurationAct()},this.props.autoPlayDelay))}},{key:"ignoreTouch",value:function(){return this.state.swiperItemCount<=1}},{key:"correctDurationAct",value:function(){("number"!==typeof this.props.duration||this.props.duration<=0)&&(this.setState({isTransToX:!1}),this.transEndFn())}},{key:"swipeClick",value:function(t){t.preventDefault(),this.props.click&&this.props.click(this.state.activeIndex)}},{key:"gotoX",value:function(t){this.state.transX===t?this.transEndFn():(this.setState({isTransToX:!0,transX:t}),this.correctDurationAct())}},{key:"goto",value:function(t){return clearTimeout(I),k=t<1||1===this.state.swiperItemCount?1:t>this.state.swiperItemCount-2?this.state.swiperItemCount-2:t,this.state.activeIndex!==k?this.setState({activeIndex:k},this.gotoX(-m*k)):this.autoPlayFn(),k}},{key:"isMobile",value:function(){return null!==navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i)}},{key:"render",value:function(){var t=this;this.isMobile();return s.a.createElement("div",{className:"active-swiper-container",ref:"swiperContainer",style:{width:m+"px",height:this.props.clientH+"px"},onClick:this.swipeClick.bind(this)},s.a.createElement("div",{className:"swiper-wrapper",ref:"sliderWrapper",style:{transform:"translate3d(".concat(this.state.transX,"px, 0, 0)"),transition:this.state.isTransToX?"transform ".concat(this.props.duration,"ms cubic-bezier(0,0,0.25,1)"):""},onTouchStart:this.touchstartFn.bind(this),onTouchMove:this.touchmoveFn.bind(this),onTouchEnd:this.touchendFn.bind(this),onTransitionEnd:this.transitionendFn.bind(this)},this.state.currentList.map(function(e,n){return s.a.createElement("div",{className:"img-box",style:{backgroundImage:"url(".concat(e.url,")"),backgroundSize:t.props.backgroundSize},key:e._id})})),this.props.showCounter&&this.state.swiperItemCount>1&&s.a.createElement("div",{className:"swiper-pagination",style:this.props.counterStyle},"".concat(this.state.activeIndex,"/").concat(this.state.swiperItemCount-2)))}}]),e}(i.Component);C.defaultProps={urlList:[],backgroundSize:"cover",clientW:document.documentElement.clientWidth,clientH:200,showCounter:!1,counterStyle:null,startIndex:0,criticalValue:.25,autoPlayDelay:null,duration:350,click:null,change:null};var X=C,F=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(u.a)(this,Object(l.a)(e).call(this,t))).state={index:1},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"inputIndex",value:function(t){this.setState({index:t.target.value})}},{key:"goto",value:function(){var t=parseInt(this.state.index);t=this.refs.swiper.goto(t),this.setState({index:t})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(X,{urlList:["https://dummyimage.com/375x100/FB8A80?text=1","https://dummyimage.com/375x100/29A90F?text=2","https://dummyimage.com/375x100/6F9DFF?text=3"],showCounter:!0,click:function(t){console.log("click",t)},change:function(t){console.log("change",t)},ref:"swiper"}),s.a.createElement("input",{type:"number",onChange:this.inputIndex.bind(this),value:this.state.index}),s.a.createElement("button",{onClick:this.goto.bind(this)},"goto"))}}]),e}(i.Component);a.a.render(s.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.727c29d8.chunk.js.map
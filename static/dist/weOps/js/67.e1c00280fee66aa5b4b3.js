(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{xJcY:function(t,e,i){"use strict";i.r(e);var o,r=i("G0B5"),n=i("qz1i"),s=(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),l=function(t,e,i,o){var r,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(s=(n<3?r(s):n>3?r(e,i,s):r(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s},a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.url="",e.isRefresh=!0,e.visible=!1,e.formData={reason:""},e.rules={reason:[{required:!0,message:"必填项",trigger:"blur"}]},e.loading=!1,e}return s(e,t),e.prototype.beforeDestroy=function(){this.$bus.$off("refreshTicketDetail"),this.$bus.$off("closeTicket")},e.prototype.mounted=function(){var t=this;this.url="".concat(window.HOST,"bk_itsm/#/ticketInfo?id=").concat(this.$route.query.id),this.$bus.$on("refreshTicketDetail",(function(){t.isRefresh=!1,t.$nextTick((function(){t.isRefresh=!0}))})),this.$bus.$on("closeTicket",(function(){t.visible=!0,t.formData.reason=""}))},e.prototype.confirm=function(){var t=this;this.$refs.validateForm.validate().then((function(e){t.loading=!0,t.$api.ticket.handleTicket({sn:t.$route.query.sn,id:t.$route.query.id}).then((function(e){if(!e.result)return t.$error(e.message),!1;t.$success("关闭单据成功!"),t.$router.push({name:"Ticket"})})).finally((function(){t.loading=!1,t.close()}))}))},e.prototype.close=function(){this.visible=!1},e=l([Object(r.a)({components:{WikiIframe:n.a}})],e)}(r.e),c=a,u=i("KHd+"),f=Object(u.a)(c,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.isRefresh?i("div",{staticClass:"ticket-detail"},[i("wiki-iframe",{attrs:{url:t.url,name:"ticketDetail",link:"ticketDetail"}}),t._v(" "),i("bk-dialog",{attrs:{width:"600","render-directive":"if","mask-close":!1,"header-position":"left",title:"撤单"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[i("bk-form",{ref:"validateForm",staticStyle:{width:"550px"},attrs:{"label-width":90,model:t.formData,rules:t.rules}},[i("bk-form-item",{attrs:{label:"服务"}},[i("span",{staticStyle:{position:"relative",top:"2px"}},[t._v(t._s(t.$route.query.title))])]),t._v(" "),i("bk-form-item",{attrs:{label:"工单状态"}},[i("span",{staticStyle:{position:"relative",top:"2px"}},[t._v("处理中")])])],1),t._v(" "),i("template",{slot:"footer"},[i("bk-button",{staticClass:"mr10",attrs:{disabled:t.loading,loading:t.loading,theme:"primary"},on:{click:t.confirm}},[t._v("\n                确认\n            ")]),t._v(" "),i("bk-button",{attrs:{theme:"default",type:"submit"},on:{click:t.close}},[t._v("\n                取消\n            ")])],1)],2)],1):t._e()}),[],!1,null,"6dbd1c38",null);e.default=f.exports}}]);
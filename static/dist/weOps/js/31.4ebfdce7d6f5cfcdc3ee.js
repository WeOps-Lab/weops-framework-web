(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{oq1l:function(e,t,r){"use strict";r.r(t);var n,a=r("JnIg"),o=r("G0B5"),i=(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),s=function(e,t,r,n){var a,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,r,i):a(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i},l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.resetVisible=!1,t.password="",t.resetUser="",t.resetLoading=!1,t.formData={password:""},t.rules={password:[{required:!0,message:"必填项",trigger:"blur"}]},t}return i(t,e),t.prototype.show=function(e){this.resetVisible=!0,this.resetUser=e},t.prototype.close=function(){this.resetVisible=!1},t.prototype.closeResetDialog=function(){this.formData.password="",this.$refs.validatePsdForm.clearError()},t.prototype.confirmReset=function(){var e=this;this.$refs.validatePsdForm.validate().then((function(t){e.resetLoading=!0,e.$api.userManage.resetPassword({password:e.formData.password,id:e.resetUser.bk_user_id}).then((function(t){if(!t.result)return e.$error(t.message),!1;e.$success("重置密码成功!")})).finally((function(){e.resetLoading=!1,e.close()}))}))},t=s([Object(o.a)({name:"reset-password"})],t)}(o.e),c=l,u=r("KHd+"),p=Object(u.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("bk-dialog",{attrs:{theme:"primary","mask-close":!1,"header-position":"left",title:"重置密码"},on:{"after-leave":e.closeResetDialog},model:{value:e.resetVisible,callback:function(t){e.resetVisible=t},expression:"resetVisible"}},[r("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:e.resetLoading,zIndex:10},expression:"{ isLoading: resetLoading, zIndex: 10 }"}]},[r("bk-form",{ref:"validatePsdForm",attrs:{"label-width":0,model:e.formData,rules:e.rules}},[r("bk-form-item",{attrs:{required:!0,property:"password","error-display-type":"normal"}},[r("bk-input",{attrs:{clearable:!0,type:"password",placeholder:"请输入重置密码"},on:{enter:e.confirmReset},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],1)],1)],1),e._v(" "),r("template",{slot:"footer"},[r("bk-button",{staticClass:"mr10",attrs:{disabled:e.resetLoading,theme:"primary",title:"确认"},on:{click:e.confirmReset}},[e._v("\n            确认\n        ")]),e._v(" "),r("bk-button",{attrs:{theme:"default",type:"submit",title:"取消"},on:{click:e.close}},[e._v("\n            取消\n        ")])],1)],2)}),[],!1,null,null,null).exports,f=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),d=function(){return d=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},d.apply(this,arguments)},h=function(e,t,r,n){var a,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,r,i):a(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i},m=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.visible=!1,t.loading=!1,t.userInfo={},t.type="",t.formData={username:"",display_name:"",email:"",telephone:"",leader:[]},t.rules={username:[{required:!0,message:"必填项",trigger:"blur"}],display_name:[{required:!0,message:"必填项",trigger:"blur"}],email:[{required:!0,message:"必填项",trigger:"blur"},{regex:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,message:"请输入正确的邮箱地址",trigger:"blur"}],telephone:[{required:!0,message:"必填项",trigger:"blur"},{regex:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message:"请输入正确的手机格式",trigger:"blur"}]},t.leaderList=[],t}return f(t,e),t.prototype.getUserList=function(){var e=this;this.loading=!0,this.$api.Server.getBkUsers({page_size:-1}).then((function(t){if(!t.result)return e.$error(t.message);t.data.items.forEach((function(t){e.userInfo.bk_user_id===t.bk_user_id&&(t.disabled=!0)})),e.leaderList=t.data.items})).finally((function(){e.loading=!1}))},t.prototype.show=function(e,t){this.visible=!0,this.type=e,"edit"===this.type&&(this.userInfo=t,this.formData.username=t.bk_username,this.formData.display_name=t.chname,this.formData.email=t.email,this.formData.telephone=t.phone,this.formData.leader=t.leaders.map((function(e){return e.bk_user_id}))),this.getUserList()},t.prototype.close=function(){this.visible=!1},t.prototype.confirm=function(){var e=this;this.$refs.validateForm.validate().then((function(t){var r="createUser",n=d({},e.formData);"add"!==e.type&&(r="editUser",n={id:e.userInfo.id,bk_user_id:e.userInfo.bk_user_id,display_name:e.formData.display_name,email:e.formData.email,telephone:e.formData.telephone,leader:e.formData.leader}),e.loading=!0,e.$api.userManage[r](n).then((function(t){if(!t.result)return e.$error(t.message),!1;e.$success("".concat("add"===e.type?"新增":"编辑","用户成功!")),e.$emit("refreshList"),e.close()})).finally((function(){e.loading=!1}))}))},t.prototype.closeDialog=function(){Object.assign(this.$data,this.$options.data.call(this)),this.$refs.validateForm.clearError()},t=h([Object(o.a)({name:"operate-user"})],t)}(o.e),b=m,y=Object(u.a)(b,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("bk-dialog",{attrs:{position:{top:100},theme:"primary",width:"600","mask-close":!1,"header-position":"left",title:"add"===e.type?"新增用户":"编辑用户"},on:{"after-leave":e.closeDialog},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[r("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:e.loading,zIndex:10},expression:"{ isLoading: loading, zIndex: 10 }"}],staticClass:"content-box"},[r("bk-form",{ref:"validateForm",attrs:{"label-width":75,model:e.formData,rules:e.rules}},[r("bk-form-item",{attrs:{label:"用户名",required:!0,property:"username","error-display-type":"normal"}},[r("bk-input",{attrs:{disabled:"edit"===e.type,placeholder:"请输入用户名"},model:{value:e.formData.username,callback:function(t){e.$set(e.formData,"username",t)},expression:"formData.username"}})],1),e._v(" "),r("bk-form-item",{attrs:{label:"中文名",required:!0,property:"display_name","error-display-type":"normal"}},[r("bk-input",{attrs:{placeholder:"请输入中文名"},model:{value:e.formData.display_name,callback:function(t){e.$set(e.formData,"display_name",t)},expression:"formData.display_name"}})],1),e._v(" "),r("bk-form-item",{attrs:{label:"邮箱",required:!0,property:"email","error-display-type":"normal"}},[r("bk-input",{attrs:{placeholder:"请输入邮箱"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}})],1),e._v(" "),r("bk-form-item",{attrs:{label:"手机号",required:!0,property:"telephone","error-display-type":"normal"}},[r("bk-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.formData.telephone,callback:function(t){e.$set(e.formData,"telephone",t)},expression:"formData.telephone"}})],1),e._v(" "),r("bk-form-item",{attrs:{label:"上级","error-display-type":"normal"}},[r("bk-select",{attrs:{multiple:"",searchable:""},model:{value:e.formData.leader,callback:function(t){e.$set(e.formData,"leader",t)},expression:"formData.leader"}},e._l(e.leaderList,(function(e){return r("bk-option",{key:e.bk_user_id,attrs:{id:e.bk_user_id,name:e.chname,disabled:e.disabled}})})),1)],1)],1)],1),e._v(" "),r("template",{slot:"footer"},[r("bk-button",{staticClass:"mr10",attrs:{disabled:e.loading,theme:"primary",title:"确认"},on:{click:e.confirm}},[e._v("\n            确认\n        ")]),e._v(" "),r("bk-button",{attrs:{theme:"default",type:"submit",title:"取消"},on:{click:e.close}},[e._v("\n            取消\n        ")])],1)],2)}),[],!1,null,null,null).exports,g=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),v=function(e,t,r,n){var a,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,r,i):a(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i},_=function(e,t,r,n){return new(r||(r=Promise))((function(a,o){function i(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))},k=function(e,t){var r,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.tableLoading=!1,t.dataList=[],t.columns=[{label:"用户名",key:"bk_username",align:"left",minWidth:"150px"},{label:"中文名",key:"chname",align:"left",minWidth:"100px"},{label:"邮箱",key:"email",align:"left",minWidth:"150px"},{label:"手机号码",key:"phone",align:"left",minWidth:"150px"},{label:"用户角色",key:"roles",align:"left",minWidth:"220px",scopedSlots:"roles",filters:[],filterRemote:!0,filterMultiple:!0},{label:"组织",key:"organization",align:"left",minWidth:"100px",scopedSlots:"organization"},{label:"上级",key:"superior",align:"left",minWidth:"100px",scopedSlots:"superior"},{label:"用户来源",key:"local",align:"left",minWidth:"100px",scopedSlots:"local"},{label:"操作",key:"operation",align:"left",width:"180px",scopedSlots:"operation"}],t.pagination={current:1,count:1,limit:20},t.roleList=[],t.maxHeight="",t.search="",t.roles=[],t}return g(t,e),t.prototype.created=function(){var e=this;this.getUserList(),this.getRoleList();this.maxHeight=window.innerHeight-240,window.onresize=function(){e.maxHeight=window.innerHeight-240}},t.prototype.getOrganizationOrSuperior=function(e,t){var r=t.listKey,n=t.fieldKey;return e[r].map((function(e){return e[n]})).join(";")||"--"},t.prototype.sourceFilterMethod=function(e){this.roles=Object.values(e).flat(),this.handlerIconClick()},t.prototype.syncUsers=function(){var e=this;this.tableLoading=!0,this.$api.Server.syncUsers().then((function(t){if(!t.result)return e.$error(t.message),!1;e.handlerIconClick(),e.$success("同步用户成功！")})).finally((function(){e.tableLoading=!1}))},t.prototype.changeRole=function(e){var t=this;setTimeout((function(){t.confirmSetRole(e)}),0)},t.prototype.refreshList=function(){this.getUserList()},t.prototype.handlerIconClick=function(){this.pagination.current=1,this.getUserList()},t.prototype.operateUser=function(e,t){this.$refs.operateUser.show(e,t)},t.prototype.resetPassword=function(e){this.$refs.resetPassword.show(e)},t.prototype.deleteUser=function(e){var t=this;this.$bkInfo({title:"确认要删除该用户？",confirmLoading:!0,confirmFn:function(){return _(t,void 0,void 0,(function(){return k(this,(function(t){switch(t.label){case 0:return[4,this.confirmDelete(e)];case 1:return t.sent(),[2]}}))}))}})},t.prototype.confirmDelete=function(e){return _(this,void 0,void 0,(function(){var t;return k(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,this.$api.userManage.deleteUser({id:e.id,bk_user_id:e.bk_user_id})];case 1:return(t=r.sent()).result?(this.$success("删除成功"),this.pagination.current>1&&1===this.dataList.length&&this.pagination.current--,this.getUserList(),[3,3]):[2,this.$error(t.message)];case 2:return r.sent(),[2,!1];case 3:return[2]}}))}))},t.prototype.setUserRole=function(e){var t=e.roles.sort().toString()===e.roleV1.sort().toString();(e.roles.length!==e.roleV1.length||e.roles.length===e.roleV1.length&&!t)&&this.confirmSetRole(e)},t.prototype.confirmSetRole=function(e){var t=this;this.tableLoading=!0,this.$api.userManage.setUserRoles({id:e.id,roles:e.roles}).then((function(r){if(!r.result)return t.$error(r.message),t.$set(e,"roles",e.roleV1),!1;t.$success("设置成功！"),t.$set(e,"roleV1",e.roles)})).finally((function(){t.tableLoading=!1}))},t.prototype.getUserList=function(){var e=this,t={page:this.pagination.current,page_size:this.pagination.limit,search:this.search,roles:this.roles};this.tableLoading=!0,this.$api.userManage.getUserList(t).then((function(t){if(!t.result)return!1;e.dataList=t.data.items,e.dataList.forEach((function(t){e.$set(t,"roleV1",t.roles)})),e.pagination.count=t.data.count})).finally((function(){e.tableLoading=!1}))},t.prototype.getRoleList=function(){var e=this;this.$api.roleManage.getAllRoleList().then((function(t){if(!t.result)return!1;e.roleList=t.data;var r=e.columns.find((function(e){return"roles"===e.key}));r&&(r.filters=t.data.map((function(e){return{text:e.role_name,value:e.id}})))}))},t.prototype.handlePageChange=function(e){this.pagination.current=e,this.getUserList()},t.prototype.limitChange=function(e){this.pagination.current=1,this.pagination.limit=e,this.getUserList()},t=v([Object(o.a)({name:"user-manage",components:{comTable:a.a,resetPassword:p,operateUser:y}})],t)}(o.e),D=w,x=Object(u.a)(D,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-manage"},[r("div",{staticClass:"operate-box"},[r("div",[r("bk-button",{staticClass:"mr10",attrs:{disabled:e.tableLoading,theme:"primary",title:"新增用户",icon:"plus"},on:{click:function(t){return e.operateUser("add")}}},[e._v("\n                新增用户\n            ")]),e._v(" "),r("bk-button",{staticClass:"mr10",attrs:{disabled:e.tableLoading,theme:"primary",title:"同步用户"},on:{click:e.syncUsers}},[e._v("\n                同步用户\n            ")])],1),e._v(" "),r("bk-input",{staticStyle:{width:"300px"},attrs:{disabled:e.tableLoading,clearable:"",placeholder:"请输入搜索关键字","right-icon":"bk-icon icon-search"},on:{"right-icon-click":e.handlerIconClick,enter:e.handlerIconClick,clear:e.handlerIconClick},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),r("div",{staticClass:"table-box"},[r("com-table",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:e.tableLoading,zIndex:10},expression:"{ isLoading: tableLoading, zIndex: 10 }"}],ref:"comTable",attrs:{data:e.dataList,columns:e.columns,"max-height":e.maxHeight,pagination:e.pagination},on:{"page-change":e.handlePageChange,"page-limit-change":e.limitChange,"filter-change":e.sourceFilterMethod},scopedSlots:e._u([{key:"roles",fn:function(t){var n=t.row;return[r("bk-select",{attrs:{searchable:"",multiple:"","display-tag":"",clearable:!1,disabled:"admin"===n.bk_username,"search-with-pinyin":!0},on:{toggle:function(t){return e.setUserRole(n)},"tab-remove":function(t){return e.changeRole(n)},clear:function(t){return e.changeRole(n)}},model:{value:n.roles,callback:function(t){e.$set(n,"roles",t)},expression:"row.roles"}},e._l(e.roleList,(function(e){return r("bk-option",{key:e.id,attrs:{id:e.id,name:e.role_name}})})),1)]}},{key:"local",fn:function(t){var n=t.row;return[r("span",[e._v(e._s(n.local?"本地创建":"异地同步"))])]}},{key:"organization",fn:function(t){var n=t.row;return[r("span",[e._v(e._s(e.getOrganizationOrSuperior(n,{listKey:"departments",fieldKey:"full_name"})))])]}},{key:"superior",fn:function(t){var n=t.row;return[r("span",[e._v(e._s(e.getOrganizationOrSuperior(n,{listKey:"leaders",fieldKey:"chname"})))])]}},{key:"operation",fn:function(t){var n=t.row;return[r("bk-button",{staticClass:"mr10",attrs:{theme:"primary",disabled:!n.local,text:""},on:{click:function(t){return e.operateUser("edit",n)}}},[e._v("\n                    编辑\n                ")]),e._v(" "),r("bk-button",{staticClass:"mr10",attrs:{theme:"primary",disabled:!n.local||"admin"===n.bk_username,text:""},on:{click:function(t){return e.deleteUser(n)}}},[e._v("\n                    删除\n                ")]),e._v(" "),r("bk-button",{staticClass:"mr10",attrs:{theme:"primary",disabled:!n.local,text:""},on:{click:function(t){return e.resetPassword(n)}}},[e._v("\n                    重置密码\n                ")])]}}])})],1),e._v(" "),r("reset-password",{ref:"resetPassword"}),e._v(" "),r("operate-user",{ref:"operateUser",on:{refreshList:e.refreshList}})],1)}),[],!1,null,"157b4db8",null).exports,L=r("SeYB"),O=r("qz1i"),$=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),j=function(e,t,r,n){var a,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,r,i):a(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i},C=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.pageUrl="",t.iframeHeight=null,t.ownCss=!1,t.pageName="userCatalog",t}return $(t,e),t.prototype.mounted=function(){this.pageUrl=L.a.userCatalog},t=j([Object(o.a)({name:"user-catalog",components:{WikiIframe:O.a}})],t)}(o.e),S=C,P=Object(u.a)(S,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"agent-manage"}},[r("div",{ref:"iframeWraper",staticClass:"iframe-wrapper"},[r("wiki-iframe",{attrs:{url:e.pageUrl,name:e.pageName,link:"userCatalog"}})],1)])}),[],!1,null,"ed1c6054",null).exports,R=r("gjeX"),U=r.n(R),z=r("5u7y"),I=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),A=function(){return A=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},A.apply(this,arguments)},M=function(e,t,r,n){var a,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,r,i):a(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i},E=function(e,t,r,n){return new(r||(r=Promise))((function(a,o){function i(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))},V=function(e,t){var r,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},F=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.loading=!1,t.formData={two_factor_enable:!0,auth_type:["mail"],auth_white_list:{user:[],role:[]},default_domain:""},t.typeList=[{name:"邮件",key:"mail"},{name:"短信",key:"msg"}],t.code="",t.allSelected=[],t.disabled=!0,t.isConfirm=!0,t.validateCode="",t.count=60,t.disabledValidate=!1,t.domainList=[],t.rules={default_domain:[{required:!0,message:"默认登陆域不能为空",trigger:"blur"}]},t.showDomainLoading=!1,t.showFactorLoading=!1,t}return I(t,e),Object.defineProperty(t.prototype,"hasWhiteList",{get:function(){var e=this.formData.auth_white_list;return(null==e?void 0:e.user.length)||(null==e?void 0:e.role.length)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nameList",{get:function(){return this.allSelected.map((function(e){return"role"===e.type?e.role_name:e.bk_username})).join(",")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isAdmin",{get:function(){return"admin"===this.$store.getters.getUser.username},enumerable:!1,configurable:!0}),t.prototype.mounted=function(){return E(this,void 0,void 0,(function(){return V(this,(function(e){switch(e.label){case 0:return this.loading=!0,[4,this.getDomainList()];case 1:return e.sent(),this.getLoginSet(),this.disabled=!this.isAdmin,[2]}}))}))},t.prototype.saveDefaultDomain=function(){var e=this;this.$refs.validateForm.validate().then((function(t){e.setDomain()}))},t.prototype.setDomain=function(){return E(this,void 0,void 0,(function(){var e,t;return V(this,(function(r){switch(r.label){case 0:this.showDomainLoading=!0,r.label=1;case 1:return r.trys.push([1,,3,4]),e={default_domain:this.formData.default_domain},[4,this.$api.userManage.setDomain(e)];case 2:return(t=r.sent()).result?(this.$success("默认登陆域设置成功"),[3,4]):[2,this.$error(t.message)];case 3:return this.showDomainLoading=!1,[7];case 4:return[2]}}))}))},t.prototype.getLoginSet=function(){return E(this,void 0,void 0,(function(){var e;return V(this,(function(t){switch(t.label){case 0:this.loading=!0,t.label=1;case 1:return t.trys.push([1,,3,4]),[4,this.$api.userManage.getLoginSet()];case 2:return(e=t.sent()).result?(this.formData=e.data,this.handleAllSelected(this.formData.auth_white_list),[3,4]):[2,this.$error(e.message)];case 3:return this.loading=!1,[7];case 4:return[2]}}))}))},t.prototype.getDomainList=function(){return E(this,void 0,void 0,(function(){var e;return V(this,(function(t){switch(t.label){case 0:return[4,this.$api.userManage.getDomainList()];case 1:return(e=t.sent()).result?(this.domainList=e.data,[2]):[2,this.$error(e.message)]}}))}))},t.prototype.handleGatherCode=function(){return E(this,void 0,void 0,(function(){var e,t,r=this;return V(this,(function(n){switch(n.label){case 0:return this.disabledValidate=!0,(e=function(){0===r.count?(r.disabledValidate=!1,r.count=60):(r.disabledValidate=!0,r.count--,setTimeout((function(){e()}),1e3))})(),[4,this.$api.userManage.sendValidateCode()];case 1:return(t=n.sent()).result?(this.disabled=!1,this.validateCode=t.data.validate_code,[2]):[2,this.$error(t.message)]}}))}))},t.prototype.handleChoose=function(){this.$refs.authWhite.showSlider(this.formData.auth_white_list)},t.prototype.handleConfirm=function(e){this.formData.auth_white_list=this.$deepClone(e),this.handleAllSelected(e)},t.prototype.handleAllSelected=function(e){var t=this;this.allSelected=[],Object.keys(e).forEach((function(r){t.allSelected=t.allSelected.concat(e[r].map((function(e){return A(A({},e),{type:r})})))}))},t.prototype.handleSubmit=function(){return E(this,void 0,void 0,(function(){var e;return V(this,(function(t){switch(t.label){case 0:this.showFactorLoading=!0,t.label=1;case 1:return t.trys.push([1,,4,5]),this.isConfirm=U()(this.code)===this.validateCode,this.isConfirm||this.isAdmin?(this.formData.auth_type=Array.isArray(this.formData.auth_type)?this.formData.auth_type:[this.formData.auth_type],[4,this.$api.userManage.updateLoginSet(this.formData)]):[3,3];case 2:if(!(e=t.sent()).result)return[2,this.$error(e.message)];this.$success("多因子认证设置成功"),t.label=3;case 3:return[3,5];case 4:return this.showFactorLoading=!1,[7];case 5:return[2]}}))}))},t=M([Object(o.a)({components:{AuthWhiteList:z.a}})],t)}(o.e),T=F,W=Object(u.a)(T,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:e.loading,zIndex:10},expression:"{ isLoading: loading, zIndex: 10 }"}],staticClass:"login-config"},[r("div",{staticClass:"multiple-factor-wrapper mb20"},[r("bk-form",{ref:"validateForm",attrs:{"label-width":200,model:e.formData,rules:e.rules}},[r("bk-form-item",{attrs:{label:"默认登陆域：",property:"default_domain","error-display-type":"normal",required:""}},[r("bk-select",{staticStyle:{width:"350px"},model:{value:e.formData.default_domain,callback:function(t){e.$set(e.formData,"default_domain",t)},expression:"formData.default_domain"}},e._l(e.domainList,(function(e,t){return r("bk-option",{key:t,attrs:{id:e,name:e}})})),1)],1),e._v(" "),r("bk-form-item",[r("bk-button",{staticStyle:{"margin-right":"3px"},attrs:{title:"保存",theme:"primary",disabled:e.disabled,loading:e.showDomainLoading},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.saveDefaultDomain.apply(null,arguments)}}},[e._v("\n                    保存\n                ")])],1)],1)],1),e._v(" "),r("div",{staticClass:"multiple-factor-wrapper"},[r("bk-form",{attrs:{"label-width":200,model:e.formData}},[r("bk-form-item",{attrs:{label:"开启双因子认证：",property:"two_factor_enable"}},[r("bk-switcher",{attrs:{size:"small",theme:"primary"},model:{value:e.formData.two_factor_enable,callback:function(t){e.$set(e.formData,"two_factor_enable",t)},expression:"formData.two_factor_enable"}})],1),e._v(" "),r("bk-form-item",{attrs:{label:"认证方式：",property:"auth_type"}},[r("bk-select",{staticStyle:{width:"350px"},attrs:{clearable:!1,"ext-cls":"select-custom","ext-popover-cls":"select-popover-custom"},model:{value:e.formData.auth_type,callback:function(t){e.$set(e.formData,"auth_type",t)},expression:"formData.auth_type"}},e._l(e.typeList,(function(e){return r("bk-option",{key:e.key,attrs:{id:e.key,name:e.name}})})),1)],1),e._v(" "),r("bk-form-item",{attrs:{label:"白名单：",property:"auth_white_list"}},[r("div",{staticClass:"auth-white-list",on:{click:e.handleChoose}},[e.hasWhiteList?r("span",{directives:[{name:"bk-overflow-tips",rawName:"v-bk-overflow-tips"}],staticClass:"overflow"},[e._v(e._s(e.nameList))]):r("span",{staticClass:"placeholder"},[e._v("请选择白名单")])])]),e._v(" "),e.isAdmin?e._e():r("bk-form-item",{attrs:{label:"验证码：",property:"code"}},[r("div",{staticClass:"code-container"},[r("bk-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入验证码"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),e._v(" "),e.disabledValidate?r("span",{staticClass:"tip-txt tip-txt-disabled"},[e._v("\n                        重新发送"),r("span",[e._v(e._s(e.count))]),e._v("后\n                    ")]):r("span",{staticClass:"tip-txt",on:{click:e.handleGatherCode}},[e._v("\n                        获取验证码\n                    ")]),e._v(" "),e.isConfirm?e._e():r("div",{staticClass:"m0",staticStyle:{color:"#f00"}},[e._v("请输入正确的验证码")])],1)]),e._v(" "),r("bk-form-item",[r("bk-button",{staticStyle:{"margin-right":"3px"},attrs:{title:"保存",theme:"primary",disabled:e.disabled,loading:e.showFactorLoading},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[e._v("\n                    保存\n                ")])],1)],1),e._v(" "),r("auth-white-list",{ref:"authWhite",on:{confirm:e.handleConfirm}})],1)])}),[],!1,null,"6aac680c",null),q=W.exports,H=r("ac6i"),K=r("uMZD"),N=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),G=function(e,t,r,n){var a,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,r,i):a(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i},Z=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.panels=[{name:"userManage",label:"用户列表"},{name:"userCatalog",label:"用户目录"},{name:"multipleFactor",label:"登录配置"}],t.active="userManage",t}return N(t,e),Object.defineProperty(t.prototype,"user",{get:function(){return this.$store.state.permission.user},enumerable:!1,configurable:!0}),t.prototype.created=function(){this.user.is_super||(this.panels=this.panels.filter((function(e){return"userCatalog"!==e.name})),this.active=this.panels[0].name)},t.prototype.toTabMenu=function(e){this.active=e.name},t=G([Object(o.a)({name:"user-manage-index",components:{menuTab:H.a,userManage:x,userCatalog:P,headerSub:K.a,multipleFactor:q}})],t)}(o.e),B=Z,J=Object(u.a)(B,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("header-sub",{staticClass:"notice-manage-header"},[r("template",{slot:"title"},[r("menu-tab",{attrs:{panels:e.panels,type:"line","active-panel":e.active},on:{click:e.toTabMenu}})],1)],2),e._v(" "),r(e.active,{tag:"component",staticStyle:{height:"100%"}})],1)}),[],!1,null,"537fdc3f",null);t.default=J.exports}}]);
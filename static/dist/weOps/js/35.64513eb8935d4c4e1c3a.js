(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{C7Bo:function(t,e,i){"use strict";i.r(e);i("ioFf"),i("mYba"),i("jm62");var o=i("yXPU"),n=i.n(o),s=i("lSNA"),r=i.n(s),a=i("o0o1"),c=i.n(a),h=(i("bWfx"),i("0l/t"),i("L9s1"),i("Z2Ku"),i("f3/d"),i("RW0V"),i("L2JU")),u=i("xKzH"),d=i("vDqi"),l=i.n(d);function m(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function b(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?m(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):m(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var p={name:"qr-code-export",data:function(){return{loading:!1,checks:[],checksMap:{},desc:"二维码标记属性将会标记在配置\n二维码旁同时生成，方便对不同\n配置二维码进行区分：",example:[{name:"实例名：",value:"mysql-001"},{name:"所属部门：",value:"设备部"},{name:"所在机房：",value:"南中心2FA1"},{name:"维保到期时间：",value:"2020-12-28"},{name:"主要维护人：",value:"张三"}]}},computed:b(b({},Object(h.mapGetters)({objAttMap:"obj/objAttMap",selections:"instance/selections"})),{},{attMap:function(){return this.objAttMap[this.objId]}}),props:{objId:"",config:{isShow:!1,title:"请选择二维码标记属性（支持最多选择5个）",width:1e3}},methods:{checkLimit:function(t,e){Object.keys(t).length>5&&(this.$message.warning("最多允许选择5个标记属性"),this.checks=e)},downloadFile:function(){var t=this;if(this.checks.length){var e,i={obj_id:this.objId,fields:this.checks,inst_ids:[]};e="host"===this.objId?"bk_host_id":"bk_inst_id",this.selections.forEach((function(t){i.inst_ids.push(t[e])})),this.loading=!0,l()({method:"post",url:window.siteUrl+"api/cc/export_qr_code",data:i,responseType:"blob"}).then((function(e){t._download(e),t.$message.success("导出成功"),t.loading=!1,t.config.isShow=!1}))}else this.$message.error("请选择标记属性")},_download:function(t){var e=this;if(t.size){var i=t,o=new FileReader;o.readAsDataURL(i),o.onload=function(t){var o=document.createElement("a");o.download=e.objId+".zip",o.href=t.target.result,document.body.appendChild(o),o.onclick=function(t){if(navigator.msSaveBlob)return navigator.msSaveBlob(i,e.objId+".zip")},o.click(),document.body.removeChild(o)}}else this.$message.error("无法导出二维码")}}},f=i("KHd+"),g=Object(f.a)(p,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("bk-dialog",{attrs:{"header-position":"left","auto-close":!1,loading:t.loading,title:t.config.title,width:t.config.width},on:{confirm:t.downloadFile},model:{value:t.config.isShow,callback:function(e){t.$set(t.config,"isShow",e)},expression:"config.isShow"}},[o("div",{staticClass:"qrWrapper"},[o("div",{staticClass:"props"},[o("bk-checkbox-group",{on:{change:t.checkLimit},model:{value:t.checks,callback:function(e){t.checks=e},expression:"checks"}},t._l(t.attMap,(function(e){return o("bk-checkbox",{key:e.bk_property_id,staticClass:"checkbox",attrs:{value:e.bk_property_id}},[t._v(t._s(e.bk_property_name)+"\n                ")])})),1)],1),t._v(" "),o("div",{staticClass:"qrCode"},[o("div",{staticClass:"description"},[t._v(t._s(t.desc))]),t._v(" "),o("div",{staticClass:"qc-template"},[o("div",{staticClass:"prop-mes"},[o("bk-form",{staticStyle:{"font-size":"10px"},attrs:{"label-width":125}},t._l(t.example,(function(e){return o("bk-form-item",{key:e.name,staticClass:"mt0",attrs:{label:e.name}},[t._v("\n                            "+t._s(e.value)+"\n                        ")])})),1)],1),t._v(" "),o("div",{staticClass:"qr-code-temp"},[o("img",{staticClass:"qr-img",attrs:{src:i("bXz/")}})])])])])])}),[],!1,null,"503e1ee2",null).exports;function k(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function _(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?k(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):k(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var v={name:"cmdb-host-base",components:{cmdbInstanceTable:u.a,qrCodeExport:g},props:{config:{type:Object,default:function(){return{customType:"",operations:[]}}}},computed:_(_({},Object(h.mapGetters)({unionQuery:"host/unionQuery",selections:"instance/selections",v:"v"})),{},{cutHeight:function(){var t=135;return"business_topology"===this.customType&&(t=200),t},customType:function(){return this.config.customType},bizId:function(){return this.unionQuery.bk_biz_id},objId:function(){return"host"},disabled:function(){return 0===this.selections.length||void 0===this.selections.length},tableConfig:function(){return{objId:this.objId,customType:this.customType,instData:this.hostData,cutHeight:this.cutHeight,pagination:this.pagination,checkbox:!0}},selectHostIds:function(){return this.selections.map((function(t){return t.bk_host_id}))}}),watch:{v:function(t){t&&(this.operations=this.setOperations())}},data:function(){return{loading:!1,isRefresh:!0,hostData:{count:0,info:[]},pagination:{},operations:{},searchType:1,qrDialog:{isShow:!1,title:"请选择二维码标记属性（支持最多选择5个）",width:1e3}}},mounted:function(){this.searchType=this.$route.params.searchType||1,this.operations=this.setOperations();var t=this.$route.params.condition||{};this.quickSearch(t)},methods:{searchHost:function(){var t=this;return n()(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.unionQuery.bk_biz_id){e.next=2;break}return e.abrupt("return");case 2:return t.loading=!0,e.next=5,t.$api.cc.host.search_host(t.unionQuery).then((function(e){t.loading=!1,e.result?(t.hostData=j(e.data),window.sessionStorage.setItem("tableDataCount",e.data.count)):t.$message.error(e.message)}));case 5:case"end":return e.stop()}}),e)})))()},pageChange:function(t){this.pagination=t;var e=this.common.handlerRemotePage(t);this.$store.commit("host/setPage",e),this.refresh()},sortChange:function(t){var e={sort:t};this.$store.commit("host/setPage",e),this.refresh()},setOperations:function(){var t=[];switch(this.customType){case"business_topology":t=["importExcel","customImportExcel","exportExcel","customExportAll","customExportExcel","batchEdit","transferHosts","customFilters","attributeSettings"];break;case"resource_host":t=["importExcel","customImportExcel","exportExcel","customExportAll","customExportExcel","batchEdit","batchDelete","qrCodeExport","shareHosts","searchTypes","customFilters","delHistory","attributeSettings","addHost","quickSearch"]}var e={left:[{name:"addHost",auth:this.checkAuth("create"),"bk-button":{title:this.$t("新建"),theme:"primary",marginLeft:0,marginRight:"8px",data:{objId:this.objId},operation:this.openCreate}},{auth:this.checkAuth("transfer"),name:"transferHosts","cmdb-hosts-transfer":{title:this.$t("转移"),data:{bizId:this.bizId},marginLeft:0,marginRight:"8px",disabled:this.disabled,operation:this.refresh}},{name:"searchTypes",auth:!0,"bk-select":{title:this.$t("查询类型"),operation:this.searchTypeChange,data:[{id:-1,name:this.$t("全部主机")},{id:1,name:this.$t("未分配主机")},{id:0,name:this.$t("已分配主机")}],value:this.searchType,marginLeft:0,marginRight:"8px"}},{name:"shareHosts",auth:this.checkAuth("transfer"),"cmdb-hosts-share":{data:this.businessList,operation:this.shareHosts,disabled:this.disabled,marginLeft:0,marginRight:"8px"}}],right:[{name:"quickSearch",auth:!0,"cmdb-select-search":{data:{objId:this.objId,customType:this.customType},operation:this.quickSearch,marginLeft:0,marginRight:"8px"}},{name:"customFilters",auth:!0,"cmdb-custom-filters":{icon:"icon-cc-funnel",labelTitle:"自定义查询",operation:this.seniorSearch,marginLeft:0,marginRight:"8px",data:{objId:this.objId,customType:this.customType,filterObjIds:[this.objId,"set","module"]}}},{name:"delHistory",auth:!0,"bk-button":{icon:"icon-cc-history",labelTitle:"删除历史",operation:this.toDelHistory,marginLeft:0,marginRight:"8px"}},{name:"attributeSettings",auth:!0,"cmdb-attribute-settings":{data:{objId:this.objId,customType:this.customType},labelTitle:"列表显示属性配置",marginLeft:0,marginRight:0,operation:this.refreshCols}}],more:{name:"moreOp",auth:!0,"cmdb-more-op":{labelTitle:this.$t("更多操作"),disabled:this.disabled,datas:[{name:"batchEdit",auth:this.checkAuth("update"),title:this.$t("批量更新"),operation:this.openBatchEdit},{auth:this.checkAuth("delete"),name:"batchDelete",title:this.$t("删除"),operation:this.batchDelete},{name:"qrCodeExport",title:this.$t("导出二维码"),auth:this.checkAuth("qrcode"),operation:this.openQrCodeDialog}]}}},i=e.more["cmdb-more-op"].datas;if("v4"===this.v){var o=[{auth:this.checkAuth("import"),name:"customImportExcel","cmdb-custom-import-excel":{title:"导入新增",data:{objId:this.objId,operation:this.searchHost},marginLeft:0,marginRight:"8px"}}];e.left=e.left.concat(o),i=[{name:"customExportExcel",title:this.$t("导出选中"),auth:this.checkAuth("export"),data:{objId:this.objId}},{name:"customExportAll",title:this.$t("导出全部"),auth:this.checkAuth("export"),data:{objId:this.objId}}].concat(i);var n=e.left.filter((function(e){return t.includes(e.name)&&e.auth})),s=e.right.filter((function(e){return t.includes(e.name)&&e.auth}));return i=i.filter((function(e){return t.includes(e.name)&&e.auth})),this.$set(e.more["cmdb-more-op"],"datas",i),i.length>0&&n.push(e.more),{left:n,right:s}}if(void 0!==this.v){var r=[{name:"importExcel",auth:this.checkAuth("import"),"cmdb-import-excel":{title:"导入",icon:"bk-cc-icon icon-cc-import",theme:"default",marginLeft:0,marginRight:"8px",data:{objId:this.objId},operation:this.refresh}},{name:"exportExcel",auth:this.checkAuth("export"),"cmdb-export-all":{title:this.$t("全部导出"),marginLeft:0,marginRight:"8px",data:{objId:this.objId,bizId:this.bizId,customType:this.customType},operation:this.refresh}}];e.left=e.left.concat(r),i=[{title:this.$t("导出"),auth:this.checkAuth("export"),name:"exportExcel",data:{objId:this.objId}}].concat(i);var a=e.left.filter((function(e){return t.includes(e.name)&&e.auth})),c=e.right.filter((function(e){return t.includes(e.name)&&e.auth}));return i=i.filter((function(e){return t.includes(e.name)&&e.auth})),this.$set(e.more["cmdb-more-op"],"datas",i),i.length>0&&a.push(e.more),{left:a,right:c}}},checkAuth:function(t){return this.hasPrivilege("cmdb","hosts",t)},shareHosts:function(){this.refresh()},openBatchEdit:function(){this.$refs.table.openBatchEdit()},batchDelete:function(){var t=this,e={bk_host_id:this.selectHostIds.join(",")};this.$bkInfo({title:"确认要删除选中主机吗？",confirmFn:function(){t.loading=!0,t.$api.cc.host.batch_delete_host(e).then((function(e){t.loading=!1,e.result?t.refresh():t.$message.error(e.message)}))}})},searchTypeChange:function(t){var e,i=this.$store.getters["biz/resourceBizId"],o=(e={},r()(e,-1,{}),r()(e,0,{field:"bk_biz_id",operator:"$ne",value:i}),r()(e,1,{field:"bk_biz_id",operator:"$eq",value:i}),e)[t];if(o){var n=this.$store.getters["host/defaultQuery"];n.condition.forEach((function(t){"biz"===t.bk_obj_id&&(Object.keys(o).length?t.condition=[o]:t.condition=[])})),this.$store.commit("host/setDefaultQuery",n),this.refresh()}},toDelHistory:function(){this.$router.push("/cmdb/resource/instance/".concat(this.objId,"/del-history"))},quickSearch:function(t){var e={};if(Object.keys(t).length){var i={bk_biz_name:{bk_obj_id:"biz",field:"bk_biz_name"},bk_module_name:{bk_obj_id:"module",field:"bk_module_name"},bk_set_name:{bk_obj_id:"set",field:"bk_set_name"},bk_cloud_id:{bk_obj_id:"plat",field:"bk_cloud_name"}},o=t.field,n="host";Object.keys(i).includes(o)&&(n=i[o].bk_obj_id,t.field=i[o].field),e={condition:[{bk_obj_id:n,condition:[t]}]}}this.$store.commit("host/setQuickQuery",e),this.refresh()},seniorSearch:function(t){var e=Object.keys(t.condition).map((function(e){return{bk_obj_id:e,condition:t.condition[e]}})),i={ip:t.ip,condition:e};this.$store.commit("host/setSeniorQuery",i),this.refresh()},refreshCols:function(){var t=this;this.isRefresh=!1,this.refresh(),this.$nextTick((function(){t.isRefresh=!0}))},refresh:function(){var t=this;return n()(c.a.mark((function e(){var i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.$store.commit("instance/setSelections",[]),e.next=3,t.searchHost();case 3:if((t.hostData.info?t.hostData.info:[]).length){e.next=10;break}return t.pagination.current=1,i=t.common.handlerRemotePage(t.pagination),t.$store.commit("host/setPage",i),e.next=10,t.searchHost();case 10:case"end":return e.stop()}}),e)})))()},openCreate:function(){this.$refs.table.openCreate()},openQrCodeDialog:function(){this.qrDialog.isShow=!0}}},j=function(t){var e={};return e.count=t.count,e.info=t.info.map((function(t){var e=t.host;return e.bk_cloud_id=e.bk_cloud_id.map((function(t){return t.bk_inst_name})).join(),e.bk_module_name=t.module.map((function(t){return t.bk_module_name})).join(),e.bk_set_name=t.set.map((function(t){return t.bk_set_name})).join(),e.bk_biz_name=t.biz.map((function(t){return t.bk_biz_name})).join(),e.bk_biz_id=t.biz.map((function(t){return t.bk_biz_id})).join(),e})),e},y=v,x=Object(f.a)(y,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.loading,zIndex:9},expression:"{ isLoading: loading, zIndex: 9 }"}],staticClass:"max-width max-height cmdb-host-instance",staticStyle:{padding:"20px 24px 0"}},[i("cmdb-operation",{attrs:{operations:t.operations,disabled:t.disabled}}),t._v(" "),t.isRefresh?i("cmdb-instance-table",{ref:"table",staticClass:"mt15",attrs:{config:t.tableConfig},on:{"page-change":t.pageChange,"sort-change":t.sortChange,refresh:t.refresh}}):t._e(),t._v(" "),i("qr-code-export",{ref:"qrCode",attrs:{"obj-id":t.objId,config:t.qrDialog}})],1)}),[],!1,null,null,null);e.default=x.exports},"bXz/":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0AQAAAAAVtjufAAACbElEQVR4nMWYQY7bOBBFH5sG6B1zAtMHUUTnSLPrhQGpo0XOMzeg4gA5RqTOBdiLAWiA1p+Fg9lMpleSh8taFPH5f1X9ohG/O29Pvw3DavGrMWY/PvFijm/9aMxOxpin1fJTOsklcBeBEbRemvPmuLiZDxDy9TxrSLMbEma3Xn7KGe8qvif4QVOh9dhH4ALAZOI416/BD2mL/P86O6zYf5Nxf+3yy+cf1wridcV7X4zBzvmPUwhDotxOb8YcN8eFJOkyZ6w0pOBqlKTH6HOPQn87QhzfdqNhXLHuVFsKIdOQMZMbFmjM5rgomEwTpBoyoD7KrVjvqDdZWrwkaAM2PQhXl6A58EzAjpProx7Rxyjn1qseeG7InSbsmGE9vKg32aWgL3e+wIi4vf5RNblE5ecozgQ3KGPXu5diEzQhY0UnFTvmR9Q1hai7PidpnNS3vjzkPZW8uyh3EjYFaUE1rPie3UKJC10F4lTO+BIfMO+c+ZR9euW6C6o6umFhf2u3nwvFjln14EucvFIoZ3CXNftYbXHJ5C6F/Iuvwnp8vcPjmEtc6BIQp2IT7rJi3WlI3qWDL+BrlLRQmkfgspIqAL6aCfBaka93fSB2oau/Zt0GPJbmp/bfJ6M0c/skd5keoP9uzMRZpQErcQZW5PHuu1JQAa9xUh+1Zv53+jM4Lb40qDdS3/o19f/f8U6Cn/P++/SBdr5Wk6+n9fzzfR+5zOrjhB0nVXB1e1+0A+D28RULt9NiiH/6b9vr8589qLse4aPh/NVfT2vmt8o0r0CQPgc33IxL2+9Zd33Wg/9ymfyQKDb5sqK/Nf/TP8Pf41qRQNm3bWgAAAAASUVORK5CYII="}}]);
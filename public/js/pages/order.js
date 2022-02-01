(()=>{"use strict";const t=function(t,e,s,i,a,r,o,n){var d,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=s,l._compiled=!0),i&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),o?(d=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=d):a&&(d=n?function(){a.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:a),d)if(l.functional){l._injectStyles=d;var c=l.render;l.render=function(t,e){return d.call(e),c(t,e)}}else{var u=l.beforeCreate;l.beforeCreate=u?[].concat(u,d):[d]}return{exports:t,options:l}}({name:"order-item",props:["order","editFun","viewFun","deleteFun","permissions"],mounted:function(){this.getOrderStatus()},data:function(){return{status:""}},methods:{editItem:function(){this.editFun(this.order.id)},deleteItem:function(){this.deleteFun(this.order.id)},viewItem:function(){this.viewFun(this.order.id)},getOrderStatus:function(){var t=this;if("api"==this.order.service.type&&this.order.order_api_id){var e=this.order.service.api_provider;axios.post("api-providers/api",{key:e.api_key,action:"status",order:this.order.order_api_id,url:e.url}).then((function(e){e.data.status&&(t.status=e.data.status)}))}else this.status=this.order.status}}},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("td",{staticClass:"d-none d-sm-table-cell"},[t._v("\n        "+t._s(t.order.id)+"\n    ")]),t._v(" "),s("td",{staticClass:"d-none d-sm-table-cell"},[s("div",{staticClass:"text-center"},[s("small",[t._v(" "+t._s(t.order.user.firstname+" "+t.order.user.lastname))]),t._v(" "),s("div",[t._v("\n                "+t._s(t.order.user.email)+"\n            ")])])]),t._v(" "),s("td",{staticClass:"d-none d-sm-table-cell"},[s("div",{staticClass:"details",domProps:{innerHTML:t._s(t.order.details)}})]),t._v(" "),s("td",{staticClass:"d-none d-sm-table-cell"},[s("small",{staticClass:"text-center"},[s("div",{staticClass:"text-center"},[t._v("\n                "+t._s(t.order.created_at)+"\n            ")])])]),t._v(" "),t.permissions.is_admin?s("td",{staticClass:"d-none d-sm-table-cell"},[t._v("\n        "+t._s(t.order.service.type)+"\n        "),"api"==t.order.service.type?s("div",[t.order.order_api_id?s("small",{staticClass:"text-success"},[t._v("Request send")]):t._e(),t._v(" "),t.order.order_api_id?t._e():s("small",{staticClass:"text-danger"},[t._v("Error: "),s("span",[t._v(t._s(t.order.api_provider_error))])])]):t._e()]):t._e(),t._v(" "),s("td",{staticClass:"d-none d-sm-table-cell"},[s("span",{staticClass:"badge badge-pill p-2",class:{"badge-primary":"completed"!=this.status&&"refunded"!=this.status&&"error"!=this.status,"badge-success":"completed"==this.status,"badge-danger":"refunded"==this.status||"error"==this.status}},[t._v(t._s(this.$getLang(this.status)))])]),t._v(" "),t.permissions.is_admin?s("td",{staticClass:"text-center"},[t.permissions.edit?s("div",{staticClass:"btn-group"},[s("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button",title:this.$getLang("edit"),"data-toggle":"tooltip","data-placement":"bottom"},on:{click:function(e){return t.editItem()}}},[s("i",{staticClass:"fa fa-pencil-alt"})])]):t._e(),t._v(" "),t.permissions.delete?s("div",{staticClass:"btn-group"},[s("button",{staticClass:"btn btn-sm btn-danger",attrs:{type:"button",title:this.$getLang("delete"),"data-toggle":"tooltip","data-placement":"bottom"},on:{click:function(e){return t.deleteItem()}}},[s("i",{staticClass:"fa fa-trash"})])]):t._e()]):t._e()])}),[],!1,null,null,null).exports;var e="orders/";new Vue({el:"#app",data:{modal_target:"#add-order-modal",postdata:{},errors:{},search:"",services:[],category_id:"",confirmation:"",total_price:"",selected_service:null,delete_item:null,loading:!1,permissions:[],orders:{},processing:!1},methods:{initForm:function(){this.$set(this.postdata,"service_id",""),this.$set(this.postdata,"link",""),this.$set(this.postdata,"quantity",""),this.$set(this.postdata,"notes",""),this.confirmation="",this.category_id=""},storeOrder:function(){var t=this,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.valideForm(),0==Object.keys(this.errors).length&&(s||(this.processing=!0,axios.post(e,this.postdata).then((function(e){200==e.status&&($(t.modal_target).modal("hide"),window.utilities.notify("success","New order added successfully"),t.getOrders(),t.processing=!1)})).catch((function(e){300==e.response.status&&($(t.modal_target).modal("hide"),window.utilities.notify("error","for security reasons you can't update data in demo version")),401==e.response.status&&($(t.modal_target).modal("hide"),window.utilities.notify("error","You don't have enough balance"))}))))},updateOrder:function(t){var e=this;axios.put(window.location.href+"/"+t,this.postdata).then((function(t){200==t.status&&($("#edit-order-modal").modal("hide"),window.utilities.notify("success","order updated successfully"),e.getOrders())})).catch((function(t){300==t.response.status&&($(e.modal_target).modal("hide"),window.utilities.notify("error","for security reasons you can't update data in demo version"))}))},getServices:function(){var t=this;this.services=[],this.category_id&&axios.get("orders/services/"+this.category_id).then((function(e){200==e.status&&(t.services=e.data)}))},setService:function(){var t=this;this.selected_service=null,this.postdata.service_id&&(this.selected_service=this.services.filter((function(e){return e.id==t.postdata.service_id}))[0]),this.selected_service.price="-"},getTotalPrice:function(){this.selected_service&&(this.total_price=parseFloat(this.selected_service.rate*this.postdata.quantity/1e3).toFixed(4))},getOrders:function(t){var e=this;this.loading=!0,void 0===t&&(t=1);var s="?api=true&page="+t;null!=this.search&&this.search.length&&(s+="&search="+this.search),axios.get(s).then((function(t){200==t.status&&(e.orders=t.data.orders,e.permissions=t.data.permissions,e.loading=!1)}))},valideForm:function(){if(this.errors={},this.category_id||this.$set(this.errors,"category_id","required"),this.postdata.service_id||this.$set(this.errors,"service_id","required"),this.postdata.link)try{new URL(this.postdata.link)}catch(t){this.$set(this.errors,"link",{link_not_valid:!0})}else this.$set(this.errors,"link",{required:!0});this.postdata.quantity?parseFloat(this.postdata.quantity)>parseFloat(this.selected_service.max)?this.$set(this.errors,"quantity",{maximum:!0}):parseFloat(this.postdata.quantity)<parseFloat(this.selected_service.min)&&this.$set(this.errors,"quantity",{minimum:!0}):this.$set(this.errors,"quantity",{required:!0}),this.confirmation||this.$set(this.errors,"confirmation","required")},loadModal:function(){this.initForm(),$(this.modal_target).modal("show")},loadModalEdit:function(t){var e=this;axios.get(window.location.href+"/"+t).then((function(t){200==t.status&&(e.postdata=t.data,e.postdata.type=t.data.service.type,e.postdata.user=t.data.user.email,e.postdata.type=t.data.service.type,e.postdata.type=t.data.service.type,e.postdata.service_name=t.data.service.name,$("#edit-order-modal").modal("show"))}))},loadModalView:function(){alert("// to do")},loadModalDelete:function(t){this.delete_item=t,$("#modal-delete").modal("show")},deleteItem:function(){var t=this;axios.delete(window.location.href+"/"+this.delete_item).then((function(e){200==e.status&&($("#modal-delete").modal("hide"),window.utilities.notify("success","item deleted successfully"),t.getOrders())})).catch((function(t){300==t.response.status&&($("#modal-delete").modal("hide"),window.utilities.notify("error","for security reasons you can't update data in demo version"))}))}},components:{"order-item":t},mounted:function(){this.getServices(),this.getOrders()}})})();
import link from "./components/link";
import view from "./components/view";

export let _Vue = null;

/**
 * 注册 VueRouter 插件，
 * 并给 Vue 根实例，以及每一个子组件对象设置 _routerRoot ，
 * 让子组件可以获取到根实例，以及根实例中存储的 _router 对象
 * @param {*} Vue
 */
export default function install(Vue) {
  _Vue = Vue;

  Vue.mixin({
    beforeCreate() {
      // vue 实例
      if (this.$options.router) {
        this._router = this.$options.router;
        this._routerRoot = this;
        this._router.init(this);
        // 定义一个响应式属性，在 transitionTo 中如果current变化，则给 _route 重新赋值
        // 响应式数据变化，重新渲染视图
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        // 组件
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
  });

  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });

  Vue.component(link.name, link);
  Vue.component(view.name, view);
}

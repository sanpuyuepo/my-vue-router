// 声明全局变量，用于记录Vue构造函数
let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已安装
    // 使用一个属性标识是否已安装
    if (VueRouter.install.installed) return;
    // 2. 记录Vue构造函数到全局变量
    _Vue = Vue;
    // 3. 把创建 Vue 实例时传入的 router 对象注入到 Vue 实例上
    // 使用混入及beforeCreate钩子函数获取 Vue 实例
    _Vue.mixin({
      beforeCreate() {
        // 只有在创建 Vue实例时传入了router对象，所以组件是没有的
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          // ^ 初始化 Vue Router
          this.$options.router.init();
        }
      },
    });
  }

  constructor(options) {
    this.options = options;
    // 记录路径和对应的组件
    this.routeMap = {};
    this.data = _Vue.observable({
      // current: "/",
      current: window.location.pathname,
    });
  }

  // ^ 初始化 Vue Router
  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }

  /**
   * 遍历构造函数传入的 options，解析为键值对，存储到 routeMap
   */
  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component;
    });
  }

  /**
   * 创建 router-link / router-view 组件
   */
  initComponents(Vue) {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      // template: '<a :href="to"><slot></slot></a>',
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, "", this.to);
          this.$router.data.current = this.to;
          e.preventDefault();
        },
      },
    });

    const self = this;
    Vue.component("router-view", {
      render(h) {
        // 根据当前路由地址获取对相应组件
        const curPath = self.data.current;
        let curComp = self.routeMap[curPath];
        // 路由不存在匹配组件时
        if (!curComp) {
          curComp = self.routeMap["*"];
        }
        return h(curComp);
      },
    });
  }

  initEvent() {
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}

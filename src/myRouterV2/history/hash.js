import History from "./base";

export default class HashHistory extends History {
  constructor(router) {
    super(router);
    // 确保首次访问路径中有 #
    ensureSlash();
  }

  /**
   * 获取当前的路由地址（# 后面的部分）
   * @returns {String}
   */
  getCurrentLocation() {
    return window.location.hash.substring(1);
  }

  /**
   * 监听路由地址改变的事件
   */
  setupListener() {
    window.addEventListener("hashchange", () => {
      this.transitionTo(this.getCurrentLocation());
    });
  }
}

function ensureSlash() {
  if (window.location.hash) return;
  window.location.hash = "/";
}

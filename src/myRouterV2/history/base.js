import createRoute from "../util/route";

export default class History {
  constructor(router) {
    this.router = router;
    // 记录当前路由对象
    this.current = createRoute(null, "/");

    this.cb = null;
  }

  listen(cb) {
    this.cb = cb;
  }

  transitionTo(path, onComplete) {
    // 根据路由地址匹配路由对象
    const current = this.router.matcher.match(path);

    this.router.beforeHooks.forEach(hook => {
      hook(current, this.current);
    });

    this.current = current;
    this.cb && this.cb(this.current);
    // 在vue router初始化的时候，内部注册路由地址变化的事件，
    onComplete && onComplete();
  }
}

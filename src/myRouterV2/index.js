import install from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import HTML5History from "./history/html5";

export default class VueRouter {
  constructor(options) {
    this._routes = options.routes || [];
    this.matcher = createMatcher(this._routes);

    //导航守卫
    this.beforeHooks = [];

    const mode = (this.mode = options.mode || "hash");
    switch (mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        this.history = new HTML5History(this);
        break;
      default:
        throw new Error("error mode");
    }
  }

  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }

  /**
   * 初始化VueRouter
   * @param {Object} app vue 实例
   */
  init(app) {
    console.log(app);
    const history = this.history;

    const setupListener = () => {
      history.setupListener();
    };

    history.listen(current => {
      app._route = current;
    });

    history.transitionTo(history.getCurrentLocation(), setupListener);
  }
}

VueRouter.install = install;

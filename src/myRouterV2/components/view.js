export default {
  name: "RouterView",
  render(h) {
    const route = this.$route;
    let depth = 0;

    // 标识当前组件是一个 router-view
    this.routerView = true;

    let parent = this.$parent;
    while (parent) {
      // 如果当前组件的父组件也是 router-view depth++
      if (parent.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    const record = route.matched[depth];
    if (record) {
      return h(record.component);
    }
    return h();
  },
};

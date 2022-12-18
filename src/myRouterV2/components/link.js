export default {
  name: "RouterLink",
  props: {
    to: String,
    required: true,
  },
  render(h) {
    return h("a", { attrs: { href: "#" + this.to } }, [this.$slots.default]);
  },
};

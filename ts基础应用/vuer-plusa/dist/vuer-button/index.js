import { defineComponent, openBlock, createBlock, Fragment, createCommentVNode, createVNode, renderSlot } from 'vue';

var script = defineComponent({
    name: 'vuer-button',
    components: {},
    props: {
        type: { type: String, default: 'defalut' },
        plain: { type: Boolean, default: false },
        round: { type: Boolean, default: false },
        circle: { type: Boolean, default: false },
        icon: { type: String, default: '' },
        disabled: { type: Boolean, default: false }
    },
    setup() {
        const handleClick = () => {
        };
        return {
            handleClick
        };
    }
});

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Fragment, null, [
    createCommentVNode(" <button> 按钮 </button> "),
    createVNode("button", {
      class: ["vuer-button", [`vuer-button-${_ctx.type}`,{
    'is-plain':_ctx.plain,
    'is-round':_ctx.round,
    'is-circle':_ctx.circle,
    'is-disabled':_ctx.disabled
  }]],
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args))),
      disabled: _ctx.disabled
    }, [
      (_ctx.icon)
        ? (openBlock(), createBlock("i", {
            key: 0,
            class: `iconfont ${_ctx.icon}`
          }, null, 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      (_ctx.$slots.default)
        ? (openBlock(), createBlock("span", _hoisted_1, [
            renderSlot(_ctx.$slots, "default")
          ]))
        : createCommentVNode("v-if", true)
    ], 10 /* CLASS, PROPS */, ["disabled"])
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Button = script;

export default _Button;

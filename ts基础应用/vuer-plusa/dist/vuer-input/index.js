import { defineComponent, computed, ref, onMounted, openBlock, createBlock, Fragment, createCommentVNode, createVNode } from 'vue';

var script = defineComponent({
    name: "vuer-input",
    components: {},
    props: {
        placeholder: { type: String, defalult: "" },
        type: { type: String, default: "text" },
        name: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
        modelValue: { type: String, default: "" },
        clearable: { type: Boolean, default: false },
        showPassword: { type: Boolean, default: false },
        autocomplete: { type: String, default: null }
    },
    setup(props, ctx) {
        const selectedClass = '.vuer-input_inner';
        const { clearable, showPassword } = props;
        const handleChange = (e) => {
            ctx.emit("update:modelValue", e.target.value);
        };
        const clear = () => {
            ctx.emit("update:modelValue", "");
        };
        const showSuffix = computed(() => clearable || showPassword);
        const passwordVisible = ref(false);
        const handlePassword = () => {
            passwordVisible.value = !passwordVisible.value;
        };
        const focus = (e) => ctx.emit('focus', e);
        const blur = (e) => ctx.emit('blur', e);
        onMounted(() => {
            var _a, _b;
            (_a = document.querySelector(selectedClass)) === null || _a === void 0 ? void 0 : _a.addEventListener('focus', focus);
            (_b = document.querySelector(selectedClass)) === null || _b === void 0 ? void 0 : _b.addEventListener('blur', blur);
        });
        return {
            handleChange,
            showSuffix,
            clear,
            handlePassword,
        };
    },
});

const _hoisted_1 = { class: "vuer-input_suffix" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Fragment, null, [
    createCommentVNode(" <input placeholder=\"这是一个input输入框\">  "),
    createVNode("div", {
      class: ["vuer-input", {'vuer-input_suffix':_ctx.showSuffix}]
    }, [
      createVNode("input", {
        class: ["vuer-input_inner", {'is-disabled': _ctx.disabled}],
        placeholder: _ctx.placeholder,
        type: _ctx.showPassword ? (_ctx.passwordVisible ? 'text' : 'password') : _ctx.type,
        name: _ctx.name,
        value: _ctx.modelValue,
        onInput: _cache[1] || (_cache[1] = (...args) => (_ctx.handleChange && _ctx.handleChange(...args))),
        onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
        disabled: _ctx.disabled,
        style: {"'ime-mode'":"disabled"},
        autocomplete: _ctx.autocomplete
      }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["placeholder", "type", "name", "value", "disabled", "autocomplete"]),
      createVNode("span", _hoisted_1, [
        (_ctx.clearable && _ctx.modelValue)
          ? (openBlock(), createBlock("i", {
              key: 0,
              class: "iconfont icon-cancel",
              onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.clear && _ctx.clear(...args)))
            }))
          : createCommentVNode("v-if", true),
        (_ctx.showPassword && _ctx.type=='password')
          ? (openBlock(), createBlock("i", {
              key: 1,
              class: `iconfont icon-password-${[_ctx.passwordVisible ? 'visible': 'not-view']}`,
              onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.handlePassword && _ctx.handlePassword(...args)))
            }, null, 2 /* CLASS */))
          : createCommentVNode("v-if", true)
      ])
    ], 2 /* CLASS */)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

script.render = render;
script.__file = "packages/input/src/input.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Input = script;

export default _Input;

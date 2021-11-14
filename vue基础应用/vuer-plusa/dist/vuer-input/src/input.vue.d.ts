declare const _default: import("vue").DefineComponent<{
    placeholder: {
        type: StringConstructor;
        defalult: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPassword: {
        type: BooleanConstructor;
        default: boolean;
    };
    autocomplete: {
        type: StringConstructor;
        default: null;
    };
}, {
    handleChange: (e: Event) => void;
    showSuffix: import("vue").ComputedRef<boolean>;
    clear: () => void;
    handlePassword: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: string;
    name: string;
    disabled: boolean;
    modelValue: string;
    clearable: boolean;
    showPassword: boolean;
    autocomplete: string;
} & {
    placeholder?: string | undefined;
}>, {
    type: string;
    name: string;
    disabled: boolean;
    modelValue: string;
    clearable: boolean;
    showPassword: boolean;
    autocomplete: string;
}>;
export default _default;

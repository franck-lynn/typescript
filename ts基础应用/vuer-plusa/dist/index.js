import VuerButton from './vuer-button';
export { default as VuerButton } from './vuer-button';
import VuerInput from './vuer-input';
export { default as VuerInput } from './vuer-input';

const defaultInstallOpt = {
    size: '',
    zIndex: 2000,
};
const components = [VuerButton, VuerInput];
const install = (app, opt) => {
    Object.assign(defaultInstallOpt, opt);
    components.forEach(component => {
        app.component(component.name, component);
    });
};
var index = { install, };

export default index;

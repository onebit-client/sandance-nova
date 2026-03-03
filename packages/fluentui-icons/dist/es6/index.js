import { initializeIcons as i } from './fabric-icons';
let registerIcons;
let unregisterIcons;
export function initializeIcons() {
    [i].forEach((initialize) => {
        const subset = initialize();
        unregisterIcons && unregisterIcons(Object.keys(subset.icons));
        registerIcons(subset, {
            disableWarnings: true,
        });
    });
}
export function use(_registerIcons, _unregisterIcons) {
    registerIcons = _registerIcons;
    unregisterIcons = _unregisterIcons;
}

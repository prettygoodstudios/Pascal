
export function classNames(classes) {
    return Object.entries(classes).map(([className, isEnabled]) => isEnabled ? className : '').join(' ');
}
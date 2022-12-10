export const hasLocalStorage = (key: string): boolean => {
    try {
        return !!window.localStorage.getItem(key);
    } catch (e) {
        return false;
    }
}

export const getLocalStorage = (key: string) => {
    return window.localStorage.getItem(key)
}

export const setLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
}

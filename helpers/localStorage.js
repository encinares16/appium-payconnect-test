
import { LocalStorage } from "node-localstorage";

let localStorage;

if (typeof globalThis.localStorage === 'undefined' || globalThis.localStorage === null) {
    localStorage = new LocalStorage('./storage');
    globalThis.localStorage = localStorage;
} else {
    localStorage = globalThis.localStorage;
}

export const setItemStoge = (item, value) => {
    localStorage.setItem(item, value);
}

export const getItemStorage = (item) => {
    return localStorage.getItem(item);
}

export const cleartItemStorage = () => {
    localStorage.clear()
}

export default { setItemStoge, getItemStorage}
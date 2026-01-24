import { storageKeys } from "../constants/constants.js";

export function getCurrentUser () {
    return localStorage.getItem(storageKeys.userInfoKey);
}
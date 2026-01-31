import { currentUser } from "./currentUser.js";

const users = new Map();
const friends = new Map();

export function addUser (user) {
    users.set(String(user.id), user)
}

export function getUser (userId) {
    return users.get(String(userId));
}

export function addRelationship (personId) {
    friends.set(String(personId), currentUser.id);
}

export function isFriendWithCurrentUser (personId) {
    return friends.get(String(personId));
}
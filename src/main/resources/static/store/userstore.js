import { currentUser } from "./currentUser.js";

const users = new Map();
const friends = new Map();

// add user info
export function addUser (user) {
    users.set(String(user.id), user)
}

export function getUser (userId) {
    return users.get(String(userId));
}

// store current user id using friends id to know if they're friends
export function addRelationship (personId) {
    friends.set(String(personId), currentUser.id);
}

export function isFriendWithCurrentUser (personId) {
    return friends.get(String(personId));
}
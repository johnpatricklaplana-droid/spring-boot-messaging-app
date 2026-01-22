const users = new Map();

export function addUser (user) {
    users.set(String(user.id), user)
}

export function getUser (userId) {
    return users.get(String(userId));
}
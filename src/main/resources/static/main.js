import { currentUser } from "/store/currentUser.js";

const currentUserId = currentUser.id;

export const socket = new WebSocket(
    `ws://192.168.100.241:8080/chat?user_id=${currentUserId}`
);  

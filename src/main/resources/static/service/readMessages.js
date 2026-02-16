import { readMessagesApi } from "/api/api.js";

export async function readMessages(userId, conversationId) {
    
    const url = `http://192.168.100.241:8080/getReadMessages/${userId}/${conversationId}`;
    readMessagesApi(url);
    
}


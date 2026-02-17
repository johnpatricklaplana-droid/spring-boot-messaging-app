import { socket } from "/main.js";

export async function readMessages(userId, conversationId) {

    const message = {
        type: "seen_message",
        userId: userId,
        conversationId: conversationId
    };

    socket.send(JSON.stringify(message));    
   
    
}


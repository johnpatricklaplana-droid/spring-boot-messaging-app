export const conversation_with_its_user = new Map();

export function addConversation (conversation) {
    conversation_with_its_user.set(JSON.stringify(conversation.id), conversation);
}

export function getConversation (conversationId) {
    return conversation_with_its_user.get(conversationId);
}
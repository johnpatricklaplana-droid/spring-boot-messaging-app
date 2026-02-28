import { currentUser } from "/store/currentUser.js";
import { showMessagesLive } from "/components/showMessageInRealTime.js";
import { editMessageLive, deleteMessageLive } from "/components/components.js";
import { seenMessageInRealTime } from "/service/seenMessageInRealTime.js";
import { typing_indicator } from "/pages/mainPage.js";

const currentUserId = currentUser.id;

export const socket = new WebSocket(
    `ws://192.168.100.17:8080/chat`
);  

socket.onmessage = (event) => {
    const info = JSON.parse(event.data);
    if (info.type === "text_message") {
        showMessagesLive(info);
        messageInputField.value = "";
        return;
    }

    if (info.type === "seen_message") {
        seenMessageInRealTime(info);
        return;
    }

    if (info.type === "typing") {
        typing_indicator();
        return;
    }

    if (info.type === "edit_message") {
        editMessageLive(info);
        return;
    }

    if (info.type === "delete_message") {
        deleteMessageLive(info.message_id);
        return;
    }
};
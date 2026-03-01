import { storageKeys } from "/constants/constants.js";
import { addUser } from "/store/userstore.js";
import { currentUser } from "/store/currentUser.js";
import { addRelationship } from "/store/userstore.js";
import { addConversation } from "/store/ConversationStore.js";

export function searchResult(peoples) {
    const ul = document.querySelector(".userFromSearchResult");
    peoples.forEach(person => {
        const id = person.id;
        const li = document.createElement("li");
        addUser(person);
        li.dataset.personId = id;
        li.className = "userListFromSearch";
        const span = document.createElement("span");
        li.innerText = person.username;
        span.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`;
        li.appendChild(span);
        ul.appendChild(li);
    });
}

export async function displayConversation (messages) {

    const currentUserId = currentUser.id;

    const conversationId = document.querySelector(".recieverProfile").dataset.conversationId;

    document.querySelectorAll(".youContainer").forEach(element => {
        element.remove();
    });

    document.querySelectorAll(".kachatContainer").forEach(element => {
        element.remove();
    });
    
    messages.forEach(m => {
        if (Number(m.senderId.id) === Number(currentUserId)) {
            appendCurrentUserMessage(m);
        } else if (Number(m.conversation.id) === Number(conversationId)) {
            appendFriendMessage(m);
        } 
    });
}

function appendCurrentUserMessage (m) {

    const conversationContainer = document.querySelector(".conversationContainer");

    const conversationEl = document.querySelector(".conversation");

    const youContainer = document.createElement("div");
    youContainer.className = "youContainer";
    youContainer.classList.add("messageContainer");

    const you = document.createElement("div");
    you.className = "you";

    const messageAndProfileWrapper = document.createElement("div");
    messageAndProfileWrapper.className = "messageAndProfileWrapper";

    const iconsWrapper = document.createElement("div");
    iconsWrapper.className = "iconsWrapperInMessages";
    iconsWrapper.dataset.messageId = m.MessageId;

    const threeDotInMessage = document.createElement("i");
    threeDotInMessage.className = "fa-solid";
    threeDotInMessage.classList.add("fa-ellipsis");
    threeDotInMessage.classList.add("threeDotInMessage");
    threeDotInMessage.dataset.messageId = m.MessageId;

    const emoji = document.createElement("i");
    emoji.className = "fa-solid";
    emoji.classList.add("fa-face-grin");
    emoji.classList.add("emojiInMessage");
    emoji.dataset.messageId = m.MessageId;

    const reply = document.createElement("i");
    reply.className = "fa-solid";
    reply.classList.add("fa-reply");
    reply.classList.add("replyInMessage");
    reply.dataset.messageId = m.MessageId;

    const peopleWhoSeenMessagesListContainer = document.createElement("div");
    peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

    const youMessage = document.createElement("p");
    youMessage.classList = "message";
    youMessage.dataset.messageId = m.MessageId;
    youMessage.innerText = m.textMessage;

    const arrayOfPeopleWhoSeenTheMessage = [];

    Object.entries(m.peopleWhoSeenTheMessage).forEach(([user_id, readStatus]) => {
        if (readStatus === "read") {
            const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
            profileOfpeopleWhoSeenTheMessage.dataset.seenerId = user_id;
            arrayOfPeopleWhoSeenTheMessage.push(user_id);
            profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
            profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.241:8080/getProfilePic/${user_id}.png`;
            peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
        }
    });

    sessionStorage.setItem(m.MessageId, JSON.stringify(arrayOfPeopleWhoSeenTheMessage));

    const youProfile = document.createElement("img");
    youProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${currentUser.id}.png")`;
    youProfile.className = "youProfile";

    conversationEl.appendChild(youContainer);
    youContainer.appendChild(you);
    you.appendChild(messageAndProfileWrapper);
    messageAndProfileWrapper.appendChild(iconsWrapper);
    iconsWrapper.appendChild(threeDotInMessage);
    iconsWrapper.appendChild(emoji);
    iconsWrapper.appendChild(reply);
    messageAndProfileWrapper.appendChild(youMessage);
    messageAndProfileWrapper.appendChild(youProfile);
    you.appendChild(peopleWhoSeenMessagesListContainer);
    conversationContainer.scrollTop = conversationEl.scrollHeight;
}

function appendFriendMessage (m) {

    const conversationContainer = document.querySelector(".conversationContainer");

    const conversationEl = document.querySelector(".conversation");

    const kachatContainer = document.createElement("div");
    kachatContainer.className = "kachatContainer";
    kachatContainer.classList.add("messageContainer");

    const kachat = document.createElement("div");
    kachat.className = "kachat";

    const messageAndProfileWrapper = document.createElement("div");
    messageAndProfileWrapper.className = "messageAndProfileWrapper";

    const iconsWrapper = document.createElement("div");
    iconsWrapper.className = "iconsWrapperInMessages";
    iconsWrapper.dataset.messageId = m.MessageId;

    const threeDotInMessage = document.createElement("i");
    threeDotInMessage.className = "fa-solid";
    threeDotInMessage.classList.add("fa-ellipsis");
    threeDotInMessage.classList.add("threeDotInMessage");
    threeDotInMessage.dataset.messageId = m.MessageId;

    const emoji = document.createElement("i");
    emoji.className = "fa-solid";
    emoji.classList.add("fa-face-grin");
    emoji.classList.add("emojiInMessage");
    emoji.dataset.messageId = m.MessageId;

    const reply = document.createElement("i");
    reply.className = "fa-solid";
    reply.classList.add("fa-reply");
    reply.classList.add("replyInMessage");
    reply.dataset.messageId = m.MessageId;

    const peopleWhoSeenMessagesListContainer = document.createElement("div");
    peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

    const kachatProfile = document.createElement("img");
    kachatProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${m.senderId.id}.png")`;
    kachatProfile.className = "kachatProfile";

    const kaChatMessage = document.createElement("p");
    kaChatMessage.classList = "message";
    kaChatMessage.innerText = m.textMessage;
    kaChatMessage.dataset.messageId = m.MessageId;

    const arrayOfPeopleWhoSeenTheMessage = [];

    Object.entries(m.peopleWhoSeenTheMessage).forEach(([user_id, readStatus]) => {
        if (readStatus === "read") {
            const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
            profileOfpeopleWhoSeenTheMessage.dataset.seenerId = user_id;
            arrayOfPeopleWhoSeenTheMessage.push(user_id);
            profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
            profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.241:8080/getProfilePic/${user_id}.png`;
            peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
        }
    });

    sessionStorage.setItem(m.MessageId, JSON.stringify(arrayOfPeopleWhoSeenTheMessage));

    conversationEl.appendChild(kachatContainer);
    kachatContainer.appendChild(kachat);
    kachat.appendChild(messageAndProfileWrapper);
    messageAndProfileWrapper.appendChild(kachatProfile);
    messageAndProfileWrapper.appendChild(kaChatMessage);
    messageAndProfileWrapper.appendChild(iconsWrapper);
    iconsWrapper.appendChild(reply);
    iconsWrapper.appendChild(emoji);
    iconsWrapper.appendChild(threeDotInMessage);
    kachat.appendChild(peopleWhoSeenMessagesListContainer);
    conversationContainer.scrollTop = conversationEl.scrollHeight;

}

export async function displayFriendList(conversationList) {
    
    const currentUserId = currentUser.id;
    
    conversationList.forEach(async conversation => {

        addConversation(conversation);

        const messagesContainer = document.querySelector(".messagesContainer");

        const conversationEl = document.createElement("div");
        conversationEl.className = "friend";

        const profilePicAndNameWrapper = document.createElement("div");
        profilePicAndNameWrapper.className = "profilePicAndNameWrapper";

        const profilepicture = document.createElement("img");
        profilepicture.className = "profilepicture";

        const nameAndLastMessageWrapper = document.createElement("div");
        nameAndLastMessageWrapper.className = "nameAndLastMessageWrapper";

        const h1 = document.createElement("h1");

        const lastMessage = document.createElement("p");
        lastMessage.className = "lastMessage";

        try {
            const lastMessageInAConversation = await (await fetch(`http://192.168.100.241:8080/getLastMessages/${conversation.id}`)).json();
          
            const whoSentTheLastMessage = document.createElement("span");
            whoSentTheLastMessage.className = "whoSentTheLastMessage";

            if (!lastMessageInAConversation) {
                console.log("lastMessageInAConversationIsNullOrWhatEver");
                return;
            }
            
            if (Number(currentUserId) === lastMessageInAConversation.senderId.id) {
                whoSentTheLastMessage.innerText = "you: ";
            } else {
                whoSentTheLastMessage.innerText = lastMessageInAConversation.senderId.username + ": ";
            }
            lastMessage.appendChild(whoSentTheLastMessage);
            
            // If current user don't seen the message yet 
            // make the last message and conversation name font BOLD
            if (lastMessageInAConversation.peopleWhoSeenTheMessage[Number(currentUserId)] !== "read") {
                lastMessage.classList.add("notSeenYet");
                h1.classList.add("notSeenYet");
            }
            lastMessage.append(lastMessageInAConversation.textMessage);
            } catch (error) { 
                const whoSentTheLastMessage = document.createElement("span");
                whoSentTheLastMessage.className = "whoSentTheLastMessage";

                whoSentTheLastMessage.innerText = "system: ";
                lastMessage.appendChild(whoSentTheLastMessage);
                lastMessage.append("you are now connected to hey daddy");

                console.error("ERROR HAPPENS: " + error);
            } 

            if(conversation.members.length === 2) {
                conversation.members.forEach(member => {
                    if(Number(member.id) !== Number(currentUserId)) {
                        profilepicture.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${member.id}.png")`;
                        h1.innerText = member.username;
                        conversationEl.dataset.conversationId = conversation.id;
                    }
                });
            } else {
                // profilepicture.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${member.id}.png")`;
                h1.innerText = conversation.conversationName;
                conversationEl.dataset.conversationId = conversation.id;
            }

            const i = document.createElement("i");
            i.className = "fa-ellipsis";
            i.classList.add("fa-solid");
            i.classList.add("threeDotInConversationList");

            conversationEl.appendChild(profilePicAndNameWrapper);
            profilePicAndNameWrapper.appendChild(profilepicture);
            profilePicAndNameWrapper.appendChild(nameAndLastMessageWrapper);
            nameAndLastMessageWrapper.appendChild(h1);
            nameAndLastMessageWrapper.appendChild(lastMessage);
            conversationEl.appendChild(i);
            messagesContainer.appendChild(conversationEl);
           
    });
}

export function editMessageLive (info) {

    const messageId = info.id;
    
    const textMessage = document.querySelector(`.message[data-message-id="${messageId}"]`);
    
    textMessage.innerText = info.textMessage;
}

export function deleteMessageLive (message_id) {
    const message = document.querySelector(`.message[data-message-id="${message_id}"]`);

    const messageContainer = message.closest(".messageContainer");
    messageContainer.style.opacity = "0";
    messageContainer.style.transform = "translateX(-100%)";

    setTimeout(() => {
        messageContainer.remove();
    }, 1000);
}

export function position(element) {
    const conversationContainer = document.querySelector(".conversationContainer");

    // conversation container distance from left and top
    const conversationContLeft = conversationContainer.getBoundingClientRect().left;
    const conversationContTop = conversationContainer.getBoundingClientRect().top;

    // conversation container width and height
    const conversationContWidth = conversationContainer.getBoundingClientRect().width;
    const conversationContHeight = conversationContainer.getBoundingClientRect().height;

    const top = (conversationContHeight / 2) + conversationContTop;
    const left = (conversationContWidth / 2) + conversationContLeft;

    element.style.setProperty("--xpos", left + "px");
    element.style.setProperty("--ypos", top + "px");
}
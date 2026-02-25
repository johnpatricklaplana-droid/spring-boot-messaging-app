import { currentUser } from "/store/currentUser.js";

export async function showMessagesLive (info) {
    console.log(info);
    const chatContainer = document.querySelector(".chatContainer");

    const currentUserId = currentUser.id;

    const conversationId = document.querySelector(".recieverProfile").dataset.conversationId;

    // if chat is open and
    // the conversation id of the chat is senders conversation id seen the message
    if(chatContainer.classList.contains("show") && conversationId === info.conversation_id) {
        await fetch(`http://192.168.100.17:8080/seenMessagesLive/${currentUserId}/${info.conversation_id}`, { method: "POST" });
    }

    //get people who seen this message
    const peopleWhoSeenTheMessage = await (await fetch(`http://192.168.100.17:8080/getPeopleWhoSeenTheMessage/${info.conversation_id}`)).json();

    const conversationContainer = document.querySelector(".conversationContainer");

    const conversation = document.querySelector(".conversation");

    if (Number(info.sender) === Number(currentUserId)) {
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
        threeDotInMessage.dataset.messageId = info.message_id;

        const emoji = document.createElement("i");
        emoji.className = "fa-solid";
        emoji.classList.add("fa-face-grin");
        emoji.classList.add("emojiInMessage");
        emoji.dataset.messageId = info.message_id;

        const reply = document.createElement("i");
        reply.className = "fa-solid";
        reply.classList.add("fa-reply");
        reply.classList.add("replyInMessage");
        reply.dataset.messageId = info.message_id;

        const peopleWhoSeenMessagesListContainer = document.createElement("div");
        peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

        const youMessage = document.createElement("p");
        youMessage.className = "youMessage";
        youMessage.classList = "message";
        youMessage.dataset.messageId = info.message_id;
        youMessage.innerText = info.text_message;

        const youProfile = document.createElement("img");
        youProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${currentUserId}.png")`;
        youProfile.className = "youProfile";

        // List of userId who seen this message 
        const arrayOfPeopleWhoSeenTheMessage = [];

        // append the profile of a user if there last message read is >= to this message id
        // and there chat is open
        peopleWhoSeenTheMessage.forEach(person => {
            if (chatContainer.classList.contains("show")
                && person.lastMessageRead >= info.message_id
                && conversationId === info.conversation_id) 
            {
                const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
                profileOfpeopleWhoSeenTheMessage.dataset.seenerId = person.user.id;
                arrayOfPeopleWhoSeenTheMessage.push(JSON.stringify(person.user.id));
                profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
                profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.17:8080/getProfilePic/${person.user.id}.png`;
                peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
            }
        });

        //add List Of userId who seen this messages to the session storage using the message id as key
        sessionStorage.setItem(info.message_id, JSON.stringify(arrayOfPeopleWhoSeenTheMessage));

        conversation.appendChild(youContainer);
        youContainer.appendChild(you);
        you.appendChild(messageAndProfileWrapper);
        messageAndProfileWrapper.appendChild(threeDotInMessage);
        messageAndProfileWrapper.appendChild(emoji);
        messageAndProfileWrapper.appendChild(reply);
        messageAndProfileWrapper.appendChild(youMessage);
        messageAndProfileWrapper.appendChild(youProfile);
        you.appendChild(peopleWhoSeenMessagesListContainer);
        conversationContainer.scrollTop = conversation.scrollHeight;
        
        const friends = document.querySelectorAll(".friend");
        //TODO: change the who sent the last message to the name of the sender 
        friends.forEach(f => {
            const lastMessage = f.querySelector(".lastMessage");
            const whoSentTheLastMessage = f.querySelector(".whoSentTheLastMessage");
           
            if (f.dataset.conversationId === info.conversation_id) {
                lastMessage.innerText = "";
                if(info.sender === currentUserId) {      
                    whoSentTheLastMessage.innerText = "you: ";
                } else {
                    whoSentTheLastMessage.innerText = info.sender;
                }
                lastMessage.appendChild(whoSentTheLastMessage);
                lastMessage.append(info.text_message);
            }
        });
    } else {
        //check if senders conversation id is equal to the conversation id of the chat currently open
            if (conversationId === info.conversation_id) {
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
                threeDotInMessage.dataset.messageId = info.message_id;

                const emoji = document.createElement("i");
                emoji.className = "fa-solid";
                emoji.classList.add("fa-face-grin");
                emoji.classList.add("emojiInMessage");
                emoji.dataset.messageId = info.message_id;

                const reply = document.createElement("i");
                reply.className = "fa-solid";
                reply.classList.add("fa-reply");
                reply.classList.add("replyInMessage");
                reply.dataset.messageId = info.message_id;

                const peopleWhoSeenMessagesListContainer = document.createElement("div");
                peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

                const arrayOfPeopleWhoSeenTheMessage = [];

                peopleWhoSeenTheMessage.forEach(person => {

                    if (chatContainer.classList.contains("show") 
                        && person.lastMessageRead >= info.message_id
                        && conversationId === info.conversation_id) 
                    {
                        const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
                        profileOfpeopleWhoSeenTheMessage.dataset.seenerId = person.user.id;
                        arrayOfPeopleWhoSeenTheMessage.push(JSON.stringify(person.user.id));
                        profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
                        profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.17:8080/getProfilePic/${person.user.id}.png`;
                        peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
                    }

                });

                sessionStorage.setItem(info.message_id, JSON.stringify(arrayOfPeopleWhoSeenTheMessage));

                const kachatProfile = document.createElement("img");
                kachatProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${info.sender}.png")`;
                kachatProfile.className = "kachatProfile";

                const kaChatMessage = document.createElement("p");
                kaChatMessage.className = "kaChatMessage";
                kaChatMessage.classList = "message";
                kaChatMessage.innerText = info.text_message;
                kaChatMessage.dataset.messageId = info.message_id;

                conversation.appendChild(kachatContainer);
                kachatContainer.appendChild(kachat);
                kachat.appendChild(messageAndProfileWrapper);
                messageAndProfileWrapper.appendChild(kachatProfile);
                messageAndProfileWrapper.appendChild(kaChatMessage);
                messageAndProfileWrapper.appendChild(reply);
                messageAndProfileWrapper.appendChild(emoji);
                messageAndProfileWrapper.appendChild(threeDotInMessage);
                kachat.appendChild(peopleWhoSeenMessagesListContainer);
                conversationContainer.scrollTop = conversation.scrollHeight;
            }

            const friends = document.querySelectorAll(".friend");
 
            // append the last message to the friend who has conversation id = senders conversation id
            friends.forEach(f => {
                const lastMessage = f.querySelector(".lastMessage");
                const whoSentTheLastMessage = f.querySelector(".whoSentTheLastMessage");
                if (f.dataset.conversationId === info.conversation_id) {
                    lastMessage.innerText = "";
                    whoSentTheLastMessage.innerText = info.sender + ": ";
                    lastMessage.appendChild(whoSentTheLastMessage);
                    lastMessage.append(info.text_message);
                }
            });
    }
}
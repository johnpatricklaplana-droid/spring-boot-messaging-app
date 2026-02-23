import { storageKeys } from "/constants/constants.js";
import { addUser } from "/store/userstore.js";
import { currentUser } from "/store/currentUser.js";
import { addRelationship } from "/store/userstore.js";
import { addConversation } from "/store/ConversationStore.js";

(() => {
    let isOpen = false;
    const notifBtn = document.querySelector(".notifBtn");

    if(notifBtn) {

    notifBtn.addEventListener("click", (e)=> {
        e.stopPropagation();
        if(!isOpen) {
            document.querySelector(".notifDropdown").style.display = "block";
            isOpen = true;
        } else {
            document.querySelector(".notifDropdown").style.display = "none";
            isOpen = false;
        }
        
    });     
    
    window.addEventListener("click", (event)=> {
    event.stopPropagation();
    if(isOpen === true &&
       !event.target.classList.contains("notifDropdown") &&
       !event.target.classList.contains("notificationHeader")) {

        document.querySelector(".notifDropdown").style.display = "none";
        isOpen = false;

    } else {

    }
    })
  }  
} ) ();

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

export async function displayConversation (messages, friendId) {
    console.log(messages);
    const currentUserId = currentUser.id;

    const conversationContainer = document.querySelector(".conversationContainer");

    const conversation = document.querySelector(".conversation");

    document.querySelectorAll(".youContainer").forEach(element => {
        element.remove();
    });

    document.querySelectorAll(".kachatContainer").forEach(element => {
        element.remove();
    });
    
    messages.forEach(m => {
    
        if (m.senderId.id === Number(currentUserId)) {
            const youContainer = document.createElement("div");
            youContainer.className = "youContainer";

            const you = document.createElement("div");
            you.className = "you";

            const messageAndProfileWrapper = document.createElement("div");
            messageAndProfileWrapper.className = "messageAndProfileWrapper";

            const peopleWhoSeenMessagesListContainer = document.createElement("div");
            peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

            const youMessage = document.createElement("p");
            youMessage.innerText = m.textMessage;
            youMessage.dataset.messageId = m.MessageId;

            const arrayOfPeopleWhoSeenTheMessage = [];
         
            Object.entries(m.peopleWhoSeenTheMessage).forEach(([user_id, readStatus]) => {
                if(readStatus === "read") {
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
            youProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${currentUserId}.png")`;
            youProfile.className = "youProfile";

            conversation.appendChild(youContainer);
            youContainer.appendChild(you);
            you.appendChild(messageAndProfileWrapper);
            messageAndProfileWrapper.appendChild(youMessage);
            messageAndProfileWrapper.appendChild(youProfile);
            you.appendChild(peopleWhoSeenMessagesListContainer);
            conversationContainer.scrollTop = conversation.scrollHeight;
        } else if (m.senderId.id === Number(friendId)) {
            
            const kachatContainer = document.createElement("div");
            kachatContainer.className = "kachatContainer";

            const kachat = document.createElement("div");
            kachat.className = "kachat";

            const messageAndProfileWrapper = document.createElement("div");
            messageAndProfileWrapper.className = "messageAndProfileWrapper";

            const peopleWhoSeenMessagesListContainer = document.createElement("div");
            peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

            const kachatProfile = document.createElement("img");
            kachatProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${friendId}.png")`;
            kachatProfile.className = "kachatProfile";

            const kaChatMessage = document.createElement("p");
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

            conversation.appendChild(kachatContainer);
            kachatContainer.appendChild(kachat);
            kachat.appendChild(messageAndProfileWrapper);
            messageAndProfileWrapper.appendChild(kachatProfile);
            messageAndProfileWrapper.appendChild(kaChatMessage);
            kachat.appendChild(peopleWhoSeenMessagesListContainer);
            conversationContainer.scrollTop = conversation.scrollHeight;
        }
    });
}

export async function displayFriendList(conversationList) {

    const currentUserId = currentUser.id;
    
    conversationList.forEach(async friend => {

        //check if the conversation is GROUP or PRIVATE
        if(friend.members.length === 2) {

            let friendId;
           
            friend.members.forEach(user => {
                if(Number(user.id) != Number(currentUserId)) {
                    friendId = user.id;
                }
            });

            const messagesContainer = document.querySelector(".messagesContainer");

            const friendEl = document.createElement("div");
            friendEl.className = "friend";

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
                const lastMessageInAConversation = await (await fetch(`http://192.168.100.241:8080/getLastMessages/${friend.conversationId.id}`)).json();

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
                if (lastMessageInAConversation.status[currentUserId] !== "read") {
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

            profilepicture.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${friendId}.png")`;
            h1.innerText = friend.conversationName;
            friendEl.dataset.conversationId = friend.id;
            friendEl.dataset.friendId = friendId;
             
            // TODO: use friend id as key and
            // store the current users id as value
            // to know  that they're friends
            addRelationship(friendId);

            //find the friend id
            friend.members.forEach(user => {
                if(Number(user.id) != Number(currentUserId)) {
                    // add the friends info to a hashmap 
                    addUser(user);
                }
            });

            const i = document.createElement("i");
            i.className = "fa-ellipsis";
            i.classList.add("fa-solid");

            friendEl.appendChild(profilePicAndNameWrapper);
            profilePicAndNameWrapper.appendChild(profilepicture);
            profilePicAndNameWrapper.appendChild(nameAndLastMessageWrapper);
            nameAndLastMessageWrapper.appendChild(h1);
            nameAndLastMessageWrapper.appendChild(lastMessage);
            friendEl.appendChild(i);
            messagesContainer.appendChild(friendEl);
        } else {
            //TODO: 
        }
        
    });
}






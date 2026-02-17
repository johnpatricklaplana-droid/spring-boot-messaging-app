import { storageKeys } from "/constants/constants.js";
import { addUser } from "/store/userstore.js";
import { currentUser } from "/store/currentUser.js";
import { addRelationship } from "/store/userstore.js";

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
        span.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${id}.png")`;
        li.appendChild(span);
        ul.appendChild(li);
    });
}

export async function displayConversation (messages, friendId) {

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

            const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
            profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
            profileOfpeopleWhoSeenTheMessage.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${currentUserId}.png")`;

            const youMessage = document.createElement("p");
            youMessage.innerText = m.textMessage;

            const youProfile = document.createElement("img");
            youProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${currentUserId}.png")`;
            youProfile.className = "youProfile";

            conversation.appendChild(youContainer);
            youContainer.appendChild(you);
            you.appendChild(messageAndProfileWrapper);
            messageAndProfileWrapper.appendChild(youMessage);
            messageAndProfileWrapper.appendChild(youProfile);
            you.appendChild(peopleWhoSeenMessagesListContainer);
            peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
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

            const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
            profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
            profileOfpeopleWhoSeenTheMessage.src = "http://192.168.100.17:8080/getProfilePic/1.png";

            const kachatProfile = document.createElement("img");
            kachatProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${friendId}.png")`;
            kachatProfile.className = "kachatProfile";

            const kaChatMessage = document.createElement("p");
            kaChatMessage.innerText = m.textMessage;

            conversation.appendChild(kachatContainer);
            kachatContainer.appendChild(kachat);
            kachat.appendChild(messageAndProfileWrapper);
            messageAndProfileWrapper.appendChild(kachatProfile);
            messageAndProfileWrapper.appendChild(kaChatMessage);
            kachat.appendChild(peopleWhoSeenMessagesListContainer);
            peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
            conversationContainer.scrollTop = conversation.scrollHeight;
        }
    });
}

export async function displayFriendList(friendList) {

    const currentUserId = currentUser.id;

    friendList.forEach(friend => {

        if (friend.userId.id != currentUserId) {
            const messagesContainer = document.querySelector(".messagesContainer");

            const friendEl = document.createElement("div");
            friendEl.className = "friend";

            const profilePicAndNameWrapper = document.createElement("div");
            profilePicAndNameWrapper.className = "profilePicAndNameWrapper";

            const profilepicture = document.createElement("img");
            profilepicture.className = "profilepicture";

            const h1 = document.createElement("h1");

            profilepicture.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${friend.userId.id}.png")`;
            h1.innerText = friend.userId.username;
            friendEl.dataset.friendId = friend.userId.id;
            friendEl.dataset.conversationId = friend.conversationId.id;
            addRelationship(friend.userId.id);
            addUser(friend.userId);

            const i = document.createElement("i");
            i.className = "fa-ellipsis";
            i.classList.add("fa-solid");

            friendEl.appendChild(profilePicAndNameWrapper);
            profilePicAndNameWrapper.appendChild(profilepicture);
            profilePicAndNameWrapper.appendChild(h1);
            friendEl.appendChild(i);
            messagesContainer.appendChild(friendEl);
        }
    });
}






import { storageKeys } from "/constants/constants.js";
import { addUser } from "/store/userstore.js";
import { currentUser } from "/store/currentUser.js";

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

export async function displayConversation (info) {

    const currentUserId = currentUser.id;

    const textMessage = info.textMessage;
    const sentBy = info.senderId;
    const conversationId = info.conversation_id;

    const getConversation = await (await fetch(`http://192.168.100.17:8080/getMessages/${sentBy}/${conversationId}`)).json();
    console.log(getConversation);

    const conversation = document.querySelector(".conversation");

    if(sentBy === currentUserId) {
        const youContainer = document.createElement("div");
        youContainer.className = "youContainer";

        const you = document.createElement("div");
        youContainer.className = "you";
  
        const youMessage = document.createElement("p");
        youContainer.className = "you";
        youMessage.innerText = info.textMessage;

        const youProfile = document.createElement("img");
        youProfile.className = "youProfile";
    }

    const kachatContainer = document.createElement("div");
    youContainer.className = "kachatContainer";

    const kachat = document.createElement("div");
    youContainer.className = "kachat";

    const kachatProfile = document.createElement("img");
    youContainer.className = "kachatProfile";

    const kaChatMessage = document.createElement("p");
}






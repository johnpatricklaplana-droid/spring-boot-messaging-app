import { getCurrentUser } from "/service/userServices.js";
import { get } from "/api/api.js";
import { searchResult } from "/components/components.js";
import { addUser, getUser } from "/store/userstore.js";
import { post } from "/api/api.js";
import { currentUser } from "/store/currentUser.js";
import { update } from "/api/api.js";
import { addRelationship, isFriendWithCurrentUser } from "/store/userstore.js";
import { displayConversation } from "/components/components.js";
import { displayFriendList } from "/components/components.js";
import { readMessages } from "/service/readMessages.js";
import { socket } from "/main.js";

// GET USER
// (() => {
//     const currentUser = JSON.parse(getCurrentUser());
//     console.log(currentUser);
     
//     const youProfile = document.querySelectorAll(".youProfile");
  
//     youProfile.forEach(element => {
//         element.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${id}.png")`;
//     });
    
// }) ();

// SEARCH FEATURE
(()=> {
    const searchPeople = document.querySelector(".searchPeople");

    if(!searchPeople) {
        console.log("bad one");
        return;
    }

    searchPeople.addEventListener("input", async ()=> {

        const searchResultContainer = document.querySelector(".searchResultContainer");
        const name = searchPeople.value.trim();

        searchResultContainer.querySelectorAll("li").forEach(li => li.remove());
        
        if(name === "") {
            searchResultContainer.style.display = "none";
            searchResultContainer.querySelectorAll("li").forEach(li => li.remove());
            return;
        }
        
        searchResultContainer.style.display = "block";

        const url = `http://192.168.100.17:8080/search/${name}`; 
        const result = await get(url);
        
        if(!result.length) {
            document.querySelector(".noResultFoundMessage").style.display = "block";
            return;
        }
        
        document.querySelector(".noResultFoundMessage").style.display = "none";

        searchResult(result);

    });

}) ();

(() => {

    document.addEventListener("click", (event)=> {
        
        if (!event.target.classList.contains("userListFromSearch")) {
            return;
        } 

        history.pushState({page: "peopleFromSearchResult"}, null, "");
      
        const messageButton = document.querySelector(".messageButton");
        messageButton.style.display = "block";

        const addButton = document.querySelector(".addButton");
        addButton.style.display = "block";
        addButton.innerText = "Add";
        addButton.style.backgroundColor = "rgb(21, 187, 242)";
        addButton.disabled = false;
        addButton.style.pointerEvents = "auto";
        addButton.style.cursor = "pointer";
        addButton.style.display = "block";

        const id = event.target.dataset.personId

        // check if current user is checking their profile
        if(currentUser.id === id) {
            addButton.style.display = "none";
            messageButton.style.display = "none";
        }

        if(isFriendWithCurrentUser(id) === currentUser.id) {
            addButton.style.backgroundColor = "white";
            addButton.innerText = "friends";
            addButton.style.opacity = "1";
            addButton.style.color = "black";
            addButton.disabled = true;
            addButton.style.pointerEvents = "none";
            addButton.style.borderColor = "black";
            addButton.style.cursor = "not-allowed";
        }   

        document.querySelector(".chatContainer").style.display = "none";
        document.querySelector(".friendrequestsContainer").style.display = "none";
        document.querySelector(".messagesContainer").style.display = "none";
        document.querySelector(".bottomNavbar").style.display = "none";

        const personProfile = document.querySelector(".personProfile");
      
        document.querySelector(".addButton").dataset.personId = id;

        document.querySelector(".searchResultContainer").style.display = "none";
        personProfile.style.display = "flex";
        
        const person = getUser(id);
        
        const personProfilePicture = document.querySelector(".personProfilePicture");
        const personName = document.querySelector(".personName");

        personProfilePicture.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${id}.png")`;
        personName.innerText = person.username;
    })
}) ();

(() => {
    const addButton = document.querySelector(".addButton");

    addButton.addEventListener("click", async (event) => {

        const requestTo = event.target.dataset.personId;
        const requestFrom = currentUser.id;    

        const url = `http://192.168.100.17:8080/addFriend/${requestTo}/${requestFrom}`;
        const result = await post(null, url);
        
        if (result == 200) {
            addButton.innerText = "request sent";
            addButton.style.backgroundColor = "white";
        }
        
    });

}) ();

(async () => {

        const friendRequestIconAndLabelContainer = document.querySelector(".FriendRequestIconAndLabelContainer");
    
        if(!friendRequestIconAndLabelContainer) {
            return;
        }
      
        const currentUserId = currentUser.id;

        const url = `http://192.168.100.17:8080/getFriendRequest/${currentUserId}`;
        const result = await get(url);

        const friendrequestsContainer = document.querySelector(".friendrequestsContainer");
         
        result.forEach(user => {

            const id = user.requestFrom.id;

            const divpersonRequestContainer = document.createElement("div");
            divpersonRequestContainer.className = "personRequestContainer";

            const divpersonRequestProfilePicture = document.createElement("div");
            divpersonRequestProfilePicture.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${id}.png")`;
            divpersonRequestProfilePicture.className = "personRequestProfilePicture";
            divpersonRequestProfilePicture.classList.add("profile");

            const divNameAndButtonsContainerInFriendRequest = document.createElement("div");
            divNameAndButtonsContainerInFriendRequest.className = "NameAndButtonsContainerInFriendRequest";

            const h3nameInFriendRequest = document.createElement("h3");
            h3nameInFriendRequest.innerText = user.requestFrom.username;
            h3nameInFriendRequest.className = "nameInFriendRequest";

            const divbuttonContainerInFrienRequest = document.createElement("div");
            divbuttonContainerInFrienRequest.className = "buttonContainerInFrienRequest";

            const buttonaccept = document.createElement("button");
            buttonaccept.dataset.personID = id;
            buttonaccept.innerText = "Accept";
            buttonaccept.className = "accept";

            const buttonblock = document.createElement("button");
            buttonblock.dataset.personID = user.id;
            buttonblock.innerText = "Block";
            buttonblock.className = "block";
           
            divNameAndButtonsContainerInFriendRequest.appendChild(h3nameInFriendRequest);
            divNameAndButtonsContainerInFriendRequest.appendChild(divbuttonContainerInFrienRequest);
            divbuttonContainerInFrienRequest.appendChild(buttonaccept);
            divbuttonContainerInFrienRequest.appendChild(buttonblock);
            divpersonRequestContainer.appendChild(divpersonRequestProfilePicture);
            divpersonRequestContainer.appendChild(divNameAndButtonsContainerInFriendRequest);
            friendrequestsContainer.appendChild(divpersonRequestContainer);
        });
    
}) ();


(() => {
    const friendRequestIconAndLabelContainer = document.querySelector(".FriendRequestIconAndLabelContainer");
   
    if(!friendRequestIconAndLabelContainer) {
        return;
    }

    friendRequestIconAndLabelContainer.addEventListener("click", ()=> {
        document.querySelector(".friendrequestsContainer").style.display = "flex";
        document.querySelector(".chatContainer").style.display = "none";
        document.querySelector(".personProfile").style.display = "none";
        document.querySelector(".messagesContainer").style.display = "none";
    });

}) ();


(() => {

    document.addEventListener("click", async (event) => {
         
        if(event.target.closest(".accept")) {
             
            const idFromFriendRequest = event.target.dataset.personID; 
            const currentUserId = currentUser.id; 
            
            const url = `http://192.168.100.17:8080/acceptFriendRequest/${idFromFriendRequest}/${currentUserId}`;
            const result = await update(url);
            console.log(result);
            
            if (result == 200) {
                const requestContainer = event.target.closest(".personRequestContainer");

                const NameAndButtonsContainerInFriendRequest = requestContainer.querySelector(".NameAndButtonsContainerInFriendRequest");

                const acceptbutton = NameAndButtonsContainerInFriendRequest.querySelector(".accept");
                const blockbutton = NameAndButtonsContainerInFriendRequest.querySelector(".block");
                const h3 = NameAndButtonsContainerInFriendRequest.querySelector(".nameInFriendRequest")

                acceptbutton.remove();
                blockbutton.remove();

                const message = document.createElement("p");
                message.className = "friendAddedMessage";
                const username = h3.innerText;
                message.innerText = `You're now friends with ${username}`;
                message.style.color = "white";
                h3.remove();

                NameAndButtonsContainerInFriendRequest.appendChild(message);
            }
        }

    })
}) ();

(() => {
    
    document.addEventListener("click", async (event) => {
        if (event.target.closest(".friend") && !event.target.classList.contains("fa-ellipsis")) {

            history.pushState({ page: "chat"}, null , "");
            
            const id = event.target.closest(".friend").dataset.friendId;
            const conversationId = event.target.closest(".friend").dataset.conversationId;
            console.log(conversationId);
            const friendInfo = getUser(id);   

            document.querySelector(".chatContainer").classList.add("show");
            document.querySelector(".personProfile").style.display = "none";
            document.querySelector(".friendrequestsContainer").style.display = "none";
            document.querySelector(".messagesContainer").style.display = "none";

            const recieverProfile = document.querySelector(".recieverProfile");
            const friendProfile = document.querySelector(".friendProfile");
            const recivierName = document.querySelector(".recivierName");
            const recivierNameTop = document.querySelector(".recivierNameTop");
            const kachatProfile = document.querySelectorAll(".kachatProfile");
            
            friendProfile.dataset.friendId = id;
            recieverProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${id}.png")`;
            friendProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${id}.png")`;
            kachatProfile.forEach(el => el.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${id}.png")`);

            recivierName.innerText = friendInfo.username;
            recivierNameTop.innerText = friendInfo.username;
            
            const messages = await (await fetch(`http://192.168.100.17:8080/getMessages/${conversationId}`)).json();
            console.log(messages);

            const peopleWhoSeenTheMessage = await (await fetch(`http://192.168.100.17:8080/getPeopleWhoSeenTheMessage/${conversationId}`)).json();
            console.log(peopleWhoSeenTheMessage);
            displayConversation(messages, id, peopleWhoSeenTheMessage);

            readMessages(currentUser.id, conversationId);
        }
    });

}) ();

(() => {
    
    let isOpen = false;
    document.addEventListener("click", (event) => {
        
        if (event.target.classList.contains("fa-ellipsis")) {
            
            const threeDonContentContainer = document.querySelector(".threeDonContentContainer");

            if(isOpen) {
                threeDonContentContainer.style.display = "none";
                isOpen = false;
                return;
            }
       
            threeDonContentContainer.style.display = "block";

            const rect = threeDonContentContainer.getBoundingClientRect();
            
            if(event.target.getBoundingClientRect().top < 500) {
                threeDonContentContainer.style.top = event.target.getBoundingClientRect().top + 22 + "px";
            } else {
                threeDonContentContainer.style.top = event.target.getBoundingClientRect().top - rect.height + "px";
            }
    
            threeDonContentContainer.style.left = event.target.getBoundingClientRect().left + "px";
            isOpen = true;
        }
    });
}) ();

(() => {

    const eXbutton = document.querySelector(".fa-x");

    if(!eXbutton) return;

    eXbutton.addEventListener("click", () => {
        document.querySelector(".chatContainer").classList.remove("show");
        document.querySelector(".messagesContainer").style.display = "block";
    });
    
}) ();

(async () => {

    const messageInputField = document.querySelector(".messageInputField");

    const currentUserId = currentUser.id;

    document.querySelector(".sendMessage").addEventListener("click", async () => {

        const friend_id = document.querySelector(".friendProfile").dataset.friendId;

        const conversationId = await (await fetch(
            `http://192.168.100.17:8080/getUserConversation/${currentUserId}/${friend_id}`
        )).text();
        
        const textMessage = messageInputField.value.trim();
    
        const sendTextMessage = {
        type: "text_message",
        text_message: textMessage,
        sender: currentUserId,
        sent_to: friend_id,
        conversation_id: conversationId
        };
                    
        socket.send(JSON.stringify(sendTextMessage)); 
 
    });

    socket.onmessage = (event) => {
        const info = JSON.parse(event.data);
        if (info.type === "text_message") {
            showMessagesLive(info);
            messageInputField.value = "";
            return;
        }
        
        if (info.type === "seen_message") {
            //TODO: 
            return;
        }
    };

}) ();

async function showMessagesLive (info) {
    console.log("right?");

    const chatContainer = document.querySelector(".chatContainer");

    const currentUserId = currentUser.id;

    if(chatContainer.classList.contains("show")) {
        const seenMessagesLive = await fetch(`http://192.168.100.17:8080/seenMessagesLive/${currentUserId}/${info.conversation_id}`, { method: "POST" });
    }

    const peopleWhoSeenTheMessage = await (await fetch(`http://192.168.100.17:8080/getPeopleWhoSeenTheMessage/${info.conversation_id}`)).json();

    const friendId = document.querySelector(".friendProfile").dataset.friendId;

    const conversationContainer = document.querySelector(".conversationContainer");

    const conversation = document.querySelector(".conversation");

    if (Number(info.sender) === Number(currentUserId)) {
        const youContainer = document.createElement("div");
        youContainer.className = "youContainer";

        const you = document.createElement("div");
        you.className = "you";

        const messageAndProfileWrapper = document.createElement("div");
        messageAndProfileWrapper.className = "messageAndProfileWrapper";

        const peopleWhoSeenMessagesListContainer = document.createElement("div");
        peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

        peopleWhoSeenTheMessage.forEach(person => {
            if (chatContainer.classList.contains("show")
                && person.lastMessageRead >= info.message_id) {
                const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
                profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
                profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.17:8080/getProfilePic/${person.user.id}.png`;
                peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
            }
        });

        const youMessage = document.createElement("p");
        youMessage.innerText = info.text_message;

        const youProfile = document.createElement("img");
        youProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${currentUserId}.png")`;
        youProfile.className = "youProfile";

        conversation.appendChild(youContainer);
        youContainer.appendChild(you);
        you.appendChild(messageAndProfileWrapper);
        messageAndProfileWrapper.appendChild(youMessage);
        messageAndProfileWrapper.appendChild(youProfile);
        you.appendChild(peopleWhoSeenMessagesListContainer);
        conversationContainer.scrollTop = conversation.scrollHeight;
    } else {
        if(friendId === info.sender) {
            const kachatContainer = document.createElement("div");
            kachatContainer.className = "kachatContainer";

            const kachat = document.createElement("div");
            kachat.className = "kachat";

            const messageAndProfileWrapper = document.createElement("div");
            messageAndProfileWrapper.className = "messageAndProfileWrapper";

            const peopleWhoSeenMessagesListContainer = document.createElement("div");
            peopleWhoSeenMessagesListContainer.className = "peopleWhoSeenMessagesListContainer";

            peopleWhoSeenTheMessage.forEach(person => {
                console.log(chatContainer.classList.contains("show"));
                if (chatContainer.classList.contains("show") && person.lastMessageRead >= info.message_id) {
                    console.log("WHat is happening?");
                    const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
                    profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
                    profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.17:8080/getProfilePic/${person.user.id}.png`;
                    peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
                }
            });

            const kachatProfile = document.createElement("img");
            kachatProfile.style.backgroundImage = `url("http://192.168.100.17:8080/getProfilePic/${info.sender}.png")`;
            kachatProfile.className = "kachatProfile";

            const kaChatMessage = document.createElement("p");
            kaChatMessage.innerText = info.text_message;

            conversation.appendChild(kachatContainer);
            kachatContainer.appendChild(kachat);
            kachat.appendChild(messageAndProfileWrapper);
            messageAndProfileWrapper.appendChild(kachatProfile);
            messageAndProfileWrapper.appendChild(kaChatMessage);
            kachat.appendChild(peopleWhoSeenMessagesListContainer);
            conversationContainer.scrollTop = conversation.scrollHeight;
        }
    }
}

window.addEventListener("load", async () => {
    
    const currentUserId = currentUser.id;

    history.pushState(null, null, location.href);
    
    const friendList = await(await fetch(
        `http://192.168.100.17:8080/getConversationList/${currentUserId}`
    )).json();

    displayFriendList(friendList);

});

window.addEventListener("popstate", (event)=> {
    
    const window = event.state;
    console.log(window);
    if(!window) {
        document.querySelector(".chatContainer").style.display = "none";
        document.querySelector(".personProfile").style.display = "none";
        document.querySelector(".friendrequestsContainer").style.display = "none";
        document.querySelector(".menuContainer").style.display = "none";
        document.querySelector(".messagesContainer").style.display = "block";
        document.querySelector(".bottomNavbar").style.display = "flex";
        return;
    }

    if(window?.page === "chat") {
        document.querySelector(".chatContainer").style.display = "flex";
        document.querySelector(".personProfile").style.display = "none";
        document.querySelector(".friendrequestsContainer").style.display = "none";
        document.querySelector(".messagesContainer").style.display = "none";
    }

    if (window?.page === "peopleFromSearchResult") {

        document.querySelector(".chatContainer").style.display = "none";
        document.querySelector(".friendrequestsContainer").style.display = "none";
        personProfile.style.display = "flex";
    }
});

(() => {
    
    const menuButtonInBottomNavBar = document.querySelector(".menuButtonInBottomNavBar");
    const chatButtonInBottomNavBar = document.querySelector(".chatButtonInBottomNavBar");
    
    menuButtonInBottomNavBar.addEventListener("click", ()=> {
        
        document.querySelector(".menuContainer").style.display = "flex";
        document.querySelector(".messagesContainer").style.display = "none";
        document.querySelector(".chatContainer").style.display = "none";

    }); 
    
    chatButtonInBottomNavBar.addEventListener("click", ()=> {
        
        document.querySelector(".menuContainer").style.display = "none";
        document.querySelector(".messagesContainer").style.display = "block";
        document.querySelector(".chatContainer").style.display = "none";

    }); 
    
}) ();


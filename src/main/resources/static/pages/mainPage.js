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

// GET USER
// (() => {
//     const currentUser = JSON.parse(getCurrentUser());
//     console.log(currentUser);
     
//     const youProfile = document.querySelectorAll(".youProfile");
  
//     youProfile.forEach(element => {
//         element.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`;
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

        const url = `http://192.168.100.241:8080/search/${name}`; 
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

        const personProfile = document.querySelector(".personProfile");
      
        document.querySelector(".addButton").dataset.personId = id;

        document.querySelector(".searchResultContainer").style.display = "none";
        personProfile.style.display = "flex";
        
        const person = getUser(id);
        
        const personProfilePicture = document.querySelector(".personProfilePicture");
        const personName = document.querySelector(".personName");

        personProfilePicture.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`;
        personName.innerText = person.username;
    })
}) ();

(() => {
    const addButton = document.querySelector(".addButton");

    addButton.addEventListener("click", async (event) => {

        const requestTo = event.target.dataset.personId;
        const requestFrom = currentUser.id;    

        const url = `http://192.168.100.241:8080/addFriend/${requestTo}/${requestFrom}`;
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

        const url = `http://192.168.100.241:8080/getFriendRequest/${currentUserId}`;
        const result = await get(url);

        const friendrequestsContainer = document.querySelector(".friendrequestsContainer");
         
        result.forEach(user => {

            const id = user.requestFrom.id;

            const divpersonRequestContainer = document.createElement("div");
            divpersonRequestContainer.className = "personRequestContainer";

            const divpersonRequestProfilePicture = document.createElement("div");
            divpersonRequestProfilePicture.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`;
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
            
            const url = `http://192.168.100.241:8080/acceptFriendRequest/${idFromFriendRequest}/${currentUserId}`;
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
                h3.remove();

                NameAndButtonsContainerInFriendRequest.appendChild(message);
            }
        }

    })
}) ();

(() => {
    
    document.addEventListener("click", async (event) => {
        if (event.target.closest(".friend") && !event.target.classList.contains("fa-ellipsis")) {
            
            const id = event.target.closest(".friend").dataset.friendId;
            const conversationId = event.target.closest(".friend").dataset.conversationId;
            console.log(conversationId);
            const friendInfo = getUser(id);   

            document.querySelector(".chatContainer").style.display = "flex";
            document.querySelector(".personProfile").style.display = "none";
            document.querySelector(".friendrequestsContainer").style.display = "none";
            document.querySelector(".messagesContainer").style.display = "none";

            const recieverProfile = document.querySelector(".recieverProfile");
            const friendProfile = document.querySelector(".friendProfile");
            const recivierName = document.querySelector(".recivierName");
            const recivierNameTop = document.querySelector(".recivierNameTop");
            const kachatProfile = document.querySelectorAll(".kachatProfile");
            
            friendProfile.dataset.friendId = id;
            recieverProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`;
            friendProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`;
            kachatProfile.forEach(el => el.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`);

            recivierName.innerText = friendInfo.username;
            recivierNameTop.innerText = friendInfo.username;
            
            const messages = await (await fetch(`http://192.168.100.241:8080/getMessages/${conversationId}`)).json();
            console.log(messages);

            displayConversation(messages, id);
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
        document.querySelector(".chatContainer").style.display = "none";
        document.querySelector(".messagesContainer").style.display = "block";
    });
    
}) ();

(async () => {

    const messageInputField = document.querySelector(".messageInputField");

    const currentUserId = currentUser.id;

    const socket = new WebSocket(
        `ws://192.168.100.241:8080/chat?user_id=${currentUserId}`
    );  

    document.querySelector(".sendMessage").addEventListener("click", async () => {

        const friend_id = document.querySelector(".friendProfile").dataset.friendId;

        const conversationId = await (await fetch(
            `http://192.168.100.241:8080/getUserConversation/${currentUserId}/${friend_id}`
        )).text();
        
        const textMessage = messageInputField.value.trim();
    
        const sendTextMessage = {
        text_message: textMessage,
        sender: currentUserId,
        sent_to: friend_id,
        conversation_id: conversationId
        };
                       
        socket.send(JSON.stringify(sendTextMessage));

    });

    socket.onmessage = (event) => {
        const info = JSON.parse(event.data);
        console.log(info);
        showMessagesLive(info);
        messageInputField.value = "";
    };

}) ();

function showMessagesLive (info) {

    const friendId = document.querySelector(".friendProfile").dataset.friendId;

    const currentUserId = currentUser.id;

    const conversationContainer = document.querySelector(".conversationContainer");

    const conversation = document.querySelector(".conversation");

    if (Number(info.sender) === Number(currentUserId)) {
        const youContainer = document.createElement("div");
        youContainer.className = "youContainer";

        const you = document.createElement("div");
        you.className = "you";

        const youMessage = document.createElement("p");
        youMessage.innerText = info.text_message;

        const youProfile = document.createElement("img");
        youProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${currentUserId}.png")`;
        youProfile.className = "youProfile";

        conversation.appendChild(youContainer);
        youContainer.appendChild(you);
        you.appendChild(youMessage);
        you.appendChild(youProfile);
        conversationContainer.scrollTop = conversation.scrollHeight;
    } else {
        if(friendId === info.sender) {
            const kachatContainer = document.createElement("div");
            kachatContainer.className = "kachatContainer";

            const kachat = document.createElement("div");
            kachat.className = "kachat";

            const kachatProfile = document.createElement("img");
            kachatProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${info.sender}.png")`;
            kachatProfile.className = "kachatProfile";

            const kaChatMessage = document.createElement("p");
            kaChatMessage.innerText = info.text_message;

            conversation.appendChild(kachatContainer);
            kachatContainer.appendChild(kachat);
            kachat.appendChild(kachatProfile);
            kachat.appendChild(kaChatMessage);
            conversationContainer.scrollTop = conversation.scrollHeight;
        }
    }
}

window.addEventListener("load", async () => {
    
    const currentUserId = currentUser.id;
    
    const friendList = await(await fetch(
        `http://192.168.100.241:8080/getConversationList/${currentUserId}`
    )).json();

    displayFriendList(friendList);

});




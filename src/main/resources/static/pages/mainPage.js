import { getCurrentUser } from "/service/userServices.js";
import { get, deleteMessage } from "/api/api.js";
import { searchResult } from "/components/components.js";
// import { addUser, getUser } from "/store/userstore.js";
import { post } from "/api/api.js";
import { currentUser } from "/store/currentUser.js";
import { update } from "/api/api.js";
import { addRelationship, isFriendWithCurrentUser } from "/store/userstore.js";
import { displayConversation, position } from "/components/components.js";
import { displayFriendList } from "/components/components.js";
import { readMessages } from "/service/readMessages.js";
import { socket } from "/main.js";
import { getConversation } from "/store/ConversationStore.js";

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
        
        history.pushState({page: "peopleFromSearchResult"}, null, "");
      
        // const messageButton = document.querySelector(".messageButton");
        // messageButton.style.display = "block";

        // const addButton = document.querySelector(".addButton");
        // addButton.style.display = "block";
        // addButton.innerText = "Add";
        // addButton.style.backgroundColor = "rgb(21, 187, 242)";
        // addButton.disabled = false;
        // addButton.style.pointerEvents = "auto";
        // addButton.style.cursor = "pointer";
        // addButton.style.display = "block";
      
        const id = event.target.dataset.personId
        
        window.location.href = `http://192.168.100.241:8080/personprofile/${id}`;
        
        // check if current user is checking their profile
        // if(currentUser.id === id) {
        //     addButton.style.display = "none";
        //     messageButton.style.display = "none";
        // }

        // if(isFriendWithCurrentUser(id) === currentUser.id) {
        //     addButton.style.backgroundColor = "white";
        //     addButton.innerText = "friends";
        //     addButton.style.opacity = "1";
        //     addButton.style.color = "black";
        //     addButton.disabled = true;
        //     addButton.style.pointerEvents = "none";
        //     addButton.style.borderColor = "black";
        //     addButton.style.cursor = "not-allowed";
        // }   

        // document.querySelector(".chatContainer").style.display = "none";
        // document.querySelector(".friendrequestsContainer").style.display = "none";
        // document.querySelector(".messagesContainer").style.display = "none";
        // document.querySelector(".bottomNavbar").style.display = "none";

        // const personProfile = document.querySelector(".personProfile");
      
        // document.querySelector(".addButton").dataset.personId = id;

        // document.querySelector(".searchResultContainer").style.display = "none";
        // personProfile.style.display = "flex";
        
        // const person = getUser(id);
        
        // const personProfilePicture = document.querySelector(".personProfilePicture");
        // const personName = document.querySelector(".personName");

        // personProfilePicture.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${id}.png")`;
        // personName.innerText = person.username;
    })
}) ();

(() => {
    const addButton = document.querySelector(".addButton");

    if(addButton) {
        addButton.addEventListener("click", async (event) => {

            const requestTo = event.target.dataset.userId;
            const requestFrom = currentUser.id;

            const url = `http://192.168.100.241:8080/addFriend/${requestTo}/${requestFrom}`;
            const result = await post(null, url);

            if (result == 200) {
                addButton.innerText = "request sent";
                addButton.style.backgroundColor = "white";
            }

        });
    }

}) ();

(() => {
    const friendRequestIconAndLabelContainer = document.querySelector(".FriendRequestIconAndLabelContainer");
   
    if(!friendRequestIconAndLabelContainer) {
        return;
    }

    friendRequestIconAndLabelContainer.addEventListener("click", ()=> {
        window.location.href = 'http://192.168.100.241:8080/friend-request';
    });

}) ();

// open chat
(() => {
    
    document.addEventListener("click", async (event) => {
        if (event.target.closest(".friend") && !event.target.classList.contains("fa-ellipsis")) {

            history.pushState({ page: "chat"}, null , "");
            
            const conversationId = event.target.closest(".friend").dataset.conversationId;
            
            const conversation = getConversation(conversationId);
            console.log(conversation);
             
            document.querySelector(".chatContainer").classList.add("show");
            document.querySelector(".messagesContainer").style.display = "none";

            const recieverProfile = document.querySelector(".recieverProfile");
            recieverProfile.dataset.conversationId = conversationId;
            const friendProfile = document.querySelector(".friendProfile");
            const recivierName = document.querySelector(".recivierName");
            const recivierNameTop = document.querySelector(".recivierNameTop");

            const messages = await (await fetch(`http://192.168.100.241:8080/getMessages/${conversationId}`)).json();
            console.log(messages);
            if(conversation.members.length === 2) {
                conversation.members.forEach(member => {
                    if(Number(member.id) !== Number(currentUser.id)) {
                        friendProfile.dataset.friendId = member.id;
                        recieverProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${member.id}.png")`;
                        friendProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${member.id}.png")`;
                        recivierName.innerText = member.username;
                        recivierNameTop.innerText = member.username;
                    }
                    displayConversation(messages, conversation);
                });
            } else if(conversation.members.length > 2) {
                // recieverProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${member.id}.png")`;
                // friendProfile.style.backgroundImage = `url("http://192.168.100.241:8080/getProfilePic/${member.id}.png")`;
                recivierName.innerText = conversation.conversationName;
                recivierNameTop.innerText = conversation.conversationName;

                displayConversation(messages, conversation);
            }

            readMessages(currentUser.id, conversationId);
        }
    });

}) ();

(() => {
    
    let isOpen = false;
    document.addEventListener("click", (event) => {
        
        if (event.target.classList.contains("threeDotInConversationList")) {
            
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

        const conversationId = document.querySelector(".recieverProfile").dataset.conversationId;

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

}) ();

export function typing_indicator () {

    const typingSound = document.querySelector(".typingSound");

    typingSound.loop = false;

    typingSound.play();

    // Stop the audio 500ms after last keystroke
    setTimeout(() => {
        typingSound.pause();
        typingSound.currentTime = 0; // reset to start
    }, 2000)

    const typing_indicator_container = document.querySelector(".typing-indicator-container");

    typing_indicator_container.classList.add("show");

    setTimeout(() => {
        typing_indicator_container.classList.remove("show");
    }, 1000);
}

(() => {

    const messageInputField = document.querySelector(".messageInputField");

    messageInputField.addEventListener("input", ()=> {

        const conversationId = document.querySelector(".recieverProfile").dataset.conversationId;
        console.log(conversationId);
        const isTyping = {
            type: "typing",
            conversation_id: conversationId
        }
    
        socket.send(JSON.stringify(isTyping));

    });

}) ();

window.addEventListener("load", async () => {

    history.pushState(null, null, location.href);
    
    const friendList = await(await fetch(
        `http://192.168.100.241:8080/getConversationList`
    )).json();
    console.log(friendList);
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
        
        const userId = currentUser.id;
         
        window.location.href = `http://192.168.100.241:8080/menu`;

    }); 
    
    chatButtonInBottomNavBar.addEventListener("click", ()=> {
        
        document.querySelector(".menuContainer").style.display = "none";
        document.querySelector(".messagesContainer").style.display = "block";
        document.querySelector(".chatContainer").style.display = "none";

    }); 
    
}) ();

(() => {
 
    const recivierNameTop = document.querySelector(".recivierNameTop");

    recivierNameTop.addEventListener("click", ()=> {
        document.querySelector(".bottomNavbar").classList.add("hide");

        document.querySelector(".conversationsettings").classList.add("show");

        document.querySelector(".chatContainer").classList.remove("show");
    });

}) ();

// (() => {

//     let pressTimer;
 
//     document.addEventListener("touchstart", (event) => {
//         const optionWhatToDoToAMessageContainer = document.querySelector(".optionWhatToDoToAMessageContainer");

//         if(event.target.classList.contains("youMessage") || event.target.classList.contains("kaChatMessage")) {
//             pressTimer = setTimeout(() => {
//                 optionWhatToDoToAMessageContainer.classList.add("show");
//             }, 2000);
//         }

//     });

//     document.addEventListener("touchend", (event) => {
//         if(event.target.classList.contains("youMessage") || event.target.classList.contains("kaChatMessage")) {
//             clearTimeout(pressTimer);
//         } 
//     });

// }) ();

(() => {
    const overlayToClosePopUp = document.querySelector(".overlayToClosePopUp");

    const yesButtonInDeletePopUp = document.querySelector(".yesButtonInDeletePopUp");
    const editMessage = document.querySelector(".editMessage");

    const morePopUp = document.querySelector(".morePopUp");

    document.addEventListener("click", (event) => {
        if(event.target.classList.contains("threeDotInMessage")) {
            morePopUp.classList.add("show");
            yesButtonInDeletePopUp.dataset.messageId = event.target.dataset.messageId;
            editMessage.dataset.messageId = event.target.dataset.messageId;
            overlayToClosePopUp.classList.add("on");
        }
        position(morePopUp);
    });

}) ();

//close pop ups
(() => {
    const overlayToClosePopUp = document.querySelector(".overlayToClosePopUp");

    overlayToClosePopUp.addEventListener("click", () => {
        document.querySelector(".morePopUp").classList.remove("show");
        setTimeout(() => {
            overlayToClosePopUp.classList.remove("on");
        }, 500);
    });

}) ();

//TODO
(() => {
    
    const deleteMessageButton = document.querySelector(".deleteMessage");

    const overlayToClosePopUp = document.querySelector(".overlayToClosePopUp");

    deleteMessageButton.addEventListener("click", () => {
        position(document.querySelector(".deleteMessagePopUp"));
        document.querySelector(".morePopUp").classList.remove("show");
        document.querySelector(".deleteMessagePopUp").classList.add("show");
        overlayToClosePopUp.classList.remove("on");
    });

}) ();

(() => {

    const noButtonInDeletePopUp = document.querySelector(".noButtonInDeletePopUp");

    noButtonInDeletePopUp.addEventListener("click", () => {
        document.querySelector(".deleteMessagePopUp").classList.remove("show");
    });

}) ();

(() => {
 
    const yesButtonInDeletePopUp = document.querySelector(".yesButtonInDeletePopUp");

    yesButtonInDeletePopUp.addEventListener("click", (event) => {

        document.querySelector(".deleteMessagePopUp").classList.remove("show");

        const message_id = event.target.dataset.messageId;

        const payload = {
            type: "delete_message",
            message_id: message_id,
            conversation_id: document.querySelector(".recieverProfile").dataset.conversationId
        };
  
        socket.send(JSON.stringify(payload));
    });

}) ();

(() => {

    const editMessage = document.querySelector(".editMessage");

    // const messageInputField = document.querySelector(".messageInputField");

    editMessage.addEventListener("click", (event) => {

        const editPopUpEl = document.querySelector(".EditPopUp");
        const textBox = editPopUpEl.querySelector("input");

        document.querySelector(".overlayToClosePopUp").classList.remove("on");

        position(editPopUpEl);

        const messageId = event.target.dataset.messageId;

        document.querySelector(".saveEditButton").dataset.messageId = messageId;

        const messageEl = document.querySelector(`.message[data-message-id="${messageId}"]`);

        editPopUpEl.classList.add("show");

        const textMessage = messageEl.innerText;
        textBox.value = textMessage;
        textBox.focus();

        document.querySelector(".morePopUp").classList.remove("show");

    });

}) ();

(() => {

    const saveEditButton = document.querySelector(".saveEditButton");
    const editInput = document.querySelector(".editInput");

    saveEditButton.addEventListener("click", (event) => {

        document.querySelector(".EditPopUp").classList.remove("show");

        const messageId = event.target.dataset.messageId;
    
        const body = {
            type: "edit_message",
            id: messageId,
            textMessage: editInput.value.trim(),
            conversation_id: document.querySelector(".recieverProfile").dataset.conversationId
        };

        socket.send(JSON.stringify(body));
    });

}) ();

(() => {

    const cancelEditButton = document.querySelector(".cancelEditButton");

    cancelEditButton.addEventListener("click", () => {
        document.querySelector(".EditPopUp").classList.remove("show");
    });

}) ();

(() => {
    
    const conversation = document.querySelector(".conversation");

    conversation.addEventListener("click", (event) => {

        if (event.target.closest(".message")) {
            const id = event.target.dataset.messageId;

            if(!event.target.closest(".you")) {
                return;
            }

            const iconsWrapperEl = document.querySelector(`.iconsWrapperInMessages[data-message-id="${id}"]`);
           
            iconsWrapperEl.classList.add("show");

        }
    });

}) ();

(() => {

    const createGroupChat = document.getElementById("createGroupChat");
    console.log(createGroupChat);
    createGroupChat.addEventListener("click", () => {

        window.location.href = `http://192.168.100.241:8080/create-group-chat`;

    });

}) ();
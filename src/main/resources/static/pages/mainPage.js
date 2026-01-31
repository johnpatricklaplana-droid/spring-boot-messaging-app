import { getCurrentUser } from "/service/userServices.js";
import { get } from "/api/api.js";
import { searchResult } from "/components/components.js";
import { addUser, getUser } from "/store/userstore.js";
import { post } from "/api/api.js";
import { storageKeys } from "/constants/constants.js";
import { currentUser } from "/store/currentUser.js";
import { update } from "/api/api.js";

// GET USER
// (() => {
//     const currentUser = JSON.parse(getCurrentUser());
//     console.log(currentUser);
     
//     const youProfile = document.querySelectorAll(".youProfile");
  
//     youProfile.forEach(element => {
//         element.style.backgroundImage = `url("http://localhost:8080/getProfilePic/${id}.png")`;
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

        const url = `http://localhost:8080/search/${name}`;
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

        document.querySelector(".chatContainer").style.display = "none";
        document.querySelector(".friendrequestsContainer").style.display = "none";

        const personProfile = document.querySelector(".personProfile");
        const id = event.target.dataset.personId
      
        document.querySelector(".addButton").dataset.personId = id;

        document.querySelector(".searchResultContainer").style.display = "none";
        personProfile.style.display = "flex";
        
        const person = getUser(id);
        
        const personProfilePicture = document.querySelector(".personProfilePicture");
        const personName = document.querySelector(".personName");

        personProfilePicture.style.backgroundImage = `url("http://localhost:8080/getProfilePic/${id}.png")`;
        personName.innerText = person.username;
    })
}) ();

(() => {
    const addButton = document.querySelector(".addButton");

    addButton.addEventListener("click", async (event) => {
        const currentUserInfo = JSON.parse(getCurrentUser());

        const requestTo = event.target.dataset.personId;
        const requestFrom = currentUser.id;    
        
        if(requestFrom === requestTo) {
            console.log("TODO feature");
            return;
        }

        const url = `http://localhost:8080/addFriend/${requestTo}/${requestFrom}`;
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

        const url = `http://localhost:8080/getFriendRequest/${currentUserId}`;
        const result = await get(url);

        const friendrequestsContainer = document.querySelector(".friendrequestsContainer");
         
        result.forEach(user => {

            const id = user.requestFrom.id;

            const divpersonRequestContainer = document.createElement("div");
            divpersonRequestContainer.className = "personRequestContainer";

            const divpersonRequestProfilePicture = document.createElement("div");
            divpersonRequestProfilePicture.style.backgroundImage = `url("http://localhost:8080/getProfilePic/${id}.png")`;
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
    });

}) ();


(() => {

    document.addEventListener("click", async (event) => {
         
        if(event.target.closest(".accept")) {
             
            const idFromFriendRequest = event.target.dataset.personID; 
            const currentUserId = currentUser.id; 
            
            const url = `http://localhost:8080/acceptFriendRequest/${idFromFriendRequest}/${currentUserId}`;
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

(async () => {

    const currentUserId = currentUser.id;

    const url = `http://localhost:8080/getfriends/${currentUserId}`;
    const result = await get(url);

    const messagesContentContainer = document.querySelector(".messagesContentContainer");
    
    result.forEach(friend => {
        
        addUser(friend);
        const friendEl = document.createElement("div");
        friendEl.className = "friend";
        friendEl.dataset.friendId = friend.id;

        const user = document.createElement("div");
        user.className = "user";

        const profilepicture = document.createElement("div");
        profilepicture.className = "profilepicture";
        
        if(friend.requestFrom === null) {
            profilepicture.style.backgroundImage = `url("http://localhost:8080/userProfilePic/${friend.requestTo.id}.png")`;
        } else {
            profilepicture.style.backgroundImage = `url("http://localhost:8080/userProfilePic/${friend.requestFrom.id}.png")`;
        }

        const h3 = document.createElement("h3");
        h3.innerText = friend.username;

        const i = document.createElement("i");
        i.className = "fa-ellipsis";
        i.classList.add("fa-solid");
        
        friendEl.appendChild(user);
        user.appendChild(profilepicture);
        user.appendChild(h3);
        friendEl.appendChild(i);
        messagesContentContainer.appendChild(friendEl);
    });
    
}) ();



(() => {
    
    document.addEventListener("click", (event) => {
        if (event.target.closest(".friend") && !event.target.classList.contains("fa-ellipsis")) {
            
            const id = event.target.closest(".friend").dataset.friendId;
            const friendInfo = getUser(id);

            document.querySelector(".chatContainer").style.display = "flex";
            document.querySelector(".personProfile").style.display = "none";
            document.querySelector(".friendrequestsContainer").style.display = "none";

            const recieverProfile = document.querySelector(".recieverProfile");
            const friendProfile = document.querySelector(".friendProfile");
            const recivierName = document.querySelector(".recivierName");
            const recivierNameTop = document.querySelector(".recivierNameTop");
            const kachatProfile = document.querySelectorAll(".kachatProfile");
            
            // recieverProfile.style.backgroundImage = `url("http://localhost:8080/userProfile?id=${id}")`;
            // friendProfile.style.backgroundImage = `url("http://localhost:8080/userProfile?id=${id}")`;
            // kachatProfile.forEach(el => el.style.backgroundImage = `url("http://localhost:8080/userProfile?id=${id}")`);

            recivierName.innerText = friendInfo.username;
            recivierNameTop.innerText = friendInfo.username;
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
    });
    
}) ();
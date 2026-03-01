import { get, update } from "/api/api.js";

(async () => {
   
        const friendRequestIconAndLabelContainer = document.querySelector(".FriendRequestIconAndLabelContainer");
    
        if(!friendRequestIconAndLabelContainer) {
            return;
        }

    const currentUserId = document.querySelector(".userprofile").dataset.userId;

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

// accept friend request
(() => {

    document.addEventListener("click", async (event) => {

        if (event.target.closest(".accept")) {

            const idFromFriendRequest = event.target.dataset.personID;
            const currentUserId = document.querySelector(".userprofile").dataset.userId;

            const url = `http://192.168.100.241:8080/acceptFriendRequest/${idFromFriendRequest}/${currentUserId}`;
            const requestMethod = "PUT";
            const result = await update(url, requestMethod);

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
})();
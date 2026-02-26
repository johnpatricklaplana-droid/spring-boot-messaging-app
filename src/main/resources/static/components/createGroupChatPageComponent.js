export function friendListInCreateGroupChat (friendList) {

    const createGroupChatContainer = document.querySelector(".createGroupChatContainer");
      
    friendList.forEach(friend => {
        const friendWrapper = document.createElement("div");
        friendWrapper.className = "friendWrapper";

        const profileAndNameWrapper = document.createElement("div");
        profileAndNameWrapper.className = "profileAndNameWrapperInCreateGroupChat";

        const friendprofilepicture = document.createElement("img");
        friendprofilepicture.className = "friendprofilepictureInCreateGroupChat";

        const name = document.createElement("h1");
        if (friend.requestFrom === null) {
            name.innerText = friend.requestTo.username;
            friendWrapper.dataset.friendId = friend.requestTo.id;
        } else {
            name.innerText = friend.requestFrom.username;
            friendWrapper.dataset.friendId = friend.requestFrom.id;
        }

        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "checkBox";

        createGroupChatContainer.appendChild(friendWrapper);
        friendWrapper.appendChild(profileAndNameWrapper);
        profileAndNameWrapper.appendChild(friendprofilepicture);
        profileAndNameWrapper.appendChild(name);
        friendWrapper.appendChild(input);
    });

        // < div class="friendWrapper" >
        //         <div class="">
        //             <img class="friendprofilepictureInCreateGroupChat" src="" alt="">
        //             <h1>djafkljaklfjds</h1>
        //         </div>
        //         <input type="checkbox" name="" class="checkBox" id="checkBox">
        //     </div> 

}

(() => {

    const createGroupChatBtnEl = document.querySelector(".createGroupChat");
    const createGroupChatContainer = document.querySelector(".createGroupChatContainer");

    const containerWidth = createGroupChatContainer.getBoundingClientRect().width;
    const containerLeft = createGroupChatContainer.getBoundingClientRect().left;
    console.log(containerWidth / 2);

    const leftPos = (containerWidth / 2) + containerLeft;

    createGroupChatBtnEl.style.setProperty("--xpos", leftPos + "px");

}) ();
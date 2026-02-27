import { get, post } from "../api/api.js";
import { friendListInCreateGroupChat } from "../components/createGroupChatPageComponent.js";
import { currentUser } from "/store/currentUser.js";

(async () => {

    const userprofile = document.querySelector(".userprofile");

    const userId = userprofile.dataset.userId;

    const url = `http://192.168.100.17:8080/getfriends/${userId}`;
    const result = await get(url);

    friendListInCreateGroupChat(result);

}) ();

(() => {

    const createGroupChatContainer = document.querySelector(".createGroupChatContainer");
 
    let isSelected = false;

    createGroupChatContainer.addEventListener("click", (event) => {
        if (event.target.closest(".friendWrapper")) {
            
            const checkBox = event.target.querySelector("input");

            if(!isSelected) {
                checkBox.checked = true;
                isSelected = true;
            } else {
                checkBox.checked = false;
                isSelected = false;
            }
        }
    });

}) ();

(() => {
   
    const createGroupChat = document.querySelector(".createGroupChat");

    createGroupChat.addEventListener("click", () => {

        const members = [Number(currentUser.id)];
        const groupChatName = document.querySelector(".groupChatName").value.trim();

        const groupChatMembers = document.querySelectorAll(".friendWrapper"); 
        groupChatMembers.forEach(friend => {
           
            const checkBox = friend.querySelector("input");

            if(checkBox.checked) {
                members.push(Number(friend.dataset.friendId));
            }

        });

        if (members.length <= 2) {
            console.log("dalawa lang kau? baliw ka ba?");
            return;
        }

        const url = `http://192.168.100.17:8080/conversation-member`;
        const body = {
            group_name: groupChatName,
            members: members
        };
        console.log(body.members);
        post(body, url);
    });

}) ();
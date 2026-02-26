import { get } from "../api/api.js";
import { friendListInCreateGroupChat } from "../components/createGroupChatPageComponent.js";

(async () => {

    const userprofile = document.querySelector(".userprofile");

    const userId = userprofile.dataset.userId;

    const url = `http://192.168.100.17:8080/getfriends/${userId}`;
    const result = await get(url);

    friendListInCreateGroupChat(result);

}) ();
export function seenMessageInRealTime(info) {

    const conversationId = document.querySelector(".recieverProfile").dataset.conversationId;

    const you = document.querySelectorAll(".you");
    you.forEach(element => {
        const message = element.querySelector("p");
       
        const peopleWhoSeenTheMessage = JSON.parse(sessionStorage.getItem(message.dataset.messageId)) || [];
        if (!peopleWhoSeenTheMessage.includes(info.userId)
            && info.conversationId === conversationId) {

            const peopleWhoSeenMessagesListContainer = element.querySelector(".peopleWhoSeenMessagesListContainer");
            const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
            profileOfpeopleWhoSeenTheMessage.dataset.seenerId = info.userId;
            profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
            profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.17:8080/getProfilePic/${info.userId}.png`;
            peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);

            peopleWhoSeenTheMessage.push(info.userId);
            sessionStorage.setItem(message.dataset.messageId, JSON.stringify(peopleWhoSeenTheMessage));
        }
    });

    //I DON'T KNOW WHY THIS WORKS WHEN IT SHOULDN'T
    const kachat = document.querySelectorAll(".kachat");
    kachat.forEach(element => {
        const message = element.querySelector("p");
            
        const peopleWhoSeenTheMessage = JSON.parse(sessionStorage.getItem(message.dataset.messageId)) || [];
        if (!peopleWhoSeenTheMessage.includes(info.userId)
            && info.conversationId === conversationId) {
            const peopleWhoSeenMessagesListContainer = element.querySelector(".peopleWhoSeenMessagesListContainer");
            const profileOfpeopleWhoSeenTheMessage = document.createElement("img");
            profileOfpeopleWhoSeenTheMessage.dataset.seenerId = info.userId;
            profileOfpeopleWhoSeenTheMessage.className = "profileOfpeopleWhoSeenTheMessage";
            profileOfpeopleWhoSeenTheMessage.src = `http://192.168.100.17:8080/getProfilePic/${info.userId}.png`;
            peopleWhoSeenMessagesListContainer.appendChild(profileOfpeopleWhoSeenTheMessage);
        } 
    });   
}
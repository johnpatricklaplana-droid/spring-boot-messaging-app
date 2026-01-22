import { storageKeys } from "/constants/constants.js";
import { addUser } from "/store/userstore.js";

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
        span.style.backgroundImage = `url("http://localhost:8080/userProfile?id=${id}")`;
        li.appendChild(span);
        ul.appendChild(li);
    });
}






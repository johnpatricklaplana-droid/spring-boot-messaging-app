import {post} from "/api/api.js";
import { validation } from "/utils/helper.js";


(() => {
    const signUpButton = document.querySelector(".signupbutton");

    if(signUpButton !== null) {
    document.querySelector(".signupbutton").addEventListener("click", async (event)=> {
    event.preventDefault(); 

    const nameElement = document.getElementById("userName");
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");
    const confirmPasswordElement = document.getElementById("confirmPassword");

    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();
    const confirmPassword = confirmPasswordElement.value.trim();
    
    const userInfo = {
        username: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    const validationRules = {
        password: { minLength: 6 },
        confirmPassword: { matchField: "password" },
        email: { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ }
    };

    const validInput = validation(userInfo, validationRules);
    
    if(validInput.length > 0) {
        signupErrorMessage(validInput);
        return;
    }
        const url = `http://localhost:8080/signup`;
        const result = await post(userInfo, url);

        if(result.response == "good one") {
            window.location.href = "http://localhost:8080/loginPage.html";
        }

    });
    }
}) ();

function signupErrorMessage (validInput) {
    
    validInput.forEach(field => {
        if(field === "name") {
            const nameIsEmptyMessage = document.querySelector(".nameIsEmptyMessage");
            nameIsEmptyMessage.innerText = "???????";
            nameIsEmptyMessage.style.color = "lightblue";
            nameIsEmptyMessage.style.textShadow = "1px 1px 8px blue";
        }
        if(field === "email") {
            const wrongFormatMessage = document.querySelector(".emailWrongFormatMessage");
            wrongFormatMessage.innerText = "Wrong format for email buddy";                 
            wrongFormatMessage.style.color = "lightblue";
            wrongFormatMessage.style.textShadow = "1px 1px 8px blue";  
        }
        if(field === "password") {
            const passwordTooShortMessage = document.querySelector(".passwordTooShortMessage");
            passwordTooShortMessage.innerText = "Your password is too short kid";
            passwordTooShortMessage.style.color = "lightblue";
            passwordTooShortMessage.style.textShadow = "1px 1px 8px blue";
        }
        if(field === "confirmPassword") {
            const passwordDontMatchMessage = document.querySelector(".passwordDontMatchMessage");
            passwordDontMatchMessage.innerText = "Passwords do not match.";
            passwordDontMatchMessage.style.color = "lightblue";
            passwordDontMatchMessage.style.textShadow = "1px 1px 8px blue";
        }
    });
}


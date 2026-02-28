

export async function post(requestBody, url, credentials = "same-origin") {

    try {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            credentials
        });   
        const response = await result.json();
        console.log(response);
        return result.status;
    } catch (error) {
        console.error(error);
    }  

}

export async function deleteMessage(url) {
    try {
        const result = await fetch(url, {
            method: "DELETE"
        });
        const response = await result.json();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export async function get (url) {
    try {
        const result = await fetch(url, {
            method: "GET"
        });
        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {   
        console.error(error);
    }
}

export async function update (url, requestMethod, body) {
    try {
        const result = await fetch(url, {
            method: requestMethod,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(result.json());
        return result.status;
    } catch (error) {   
        console.error(error);
    }
}



export async function readMessagesApi(url) {
    
    try {
        const result = await fetch(url, {
            method: "PUT"
        });
        
        return result.status;
    } catch (error) {   
        console.error(error);
    }

};



export async function post (requestBody, url, credentials = "omit") {

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
        return response;
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
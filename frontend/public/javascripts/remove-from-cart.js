function removeFromCart(productId){
    let access = localStorage.getItem("access")
    // Checking to see if prodID is passed as a link or just a integer
    if (isNaN(productId)) {
        const prodUrl = productId.split("/");
        prodID = prodUrl[4]
    } else {
        prodID = productId
    }
    if(access){
        fetch("http://127.0.0.1:8000/remove/",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+access
            },
            method: "POST",
            body: JSON.stringify({"product_id": prodID})
        })
        .then(response => response.json() )
        .then(data => {
            window.location.reload()
        })

    }
    else {
        //the user is not logged in,redirect them to the login page
        window.location.href = "/login"
    }
}
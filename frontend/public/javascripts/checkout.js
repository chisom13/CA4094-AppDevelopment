function checkout(basketID, basketTotal) {
    let access = localStorage.getItem("access");
    let id = parseInt(basketID);
    fetch("http://127.0.0.1:8000/checkout/",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+access
            },
            method: "POST",
            body: JSON.stringify({"basket_id": id, "total_price": basketTotal})
        })
        .then(response => response.json() )
        .then(data => {
             // Notification that the order has been placed
             alert("Thanks, Your Order Will Be Shipped Soon")
             // Redirected to Home Page
             window.location.href = "/";
    })

}
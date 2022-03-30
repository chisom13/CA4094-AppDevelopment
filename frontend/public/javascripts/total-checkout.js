function totalCheckout() {
    let access = localStorage.getItem("access");
    let output = '';
    if (access) {
        fetch('http://localhost:8000/baskets/', {
    method: 'Get',
    headers: {
      'Authorization': "Bearer "+access,
      'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => data.forEach(element => {
        // Calculates the total for the order including shipping
        total = 0;
        sub_total = 0;
        shipping = 15
        for (let i = 0; i < element.items.length; i++) {
            sub_total += element.items[i].sub_price;
            if(sub_total > 250){
                shipping = 0
            } else {
                shipping = shipping	
            }
            if (shipping == 0) {
                total = sub_total + shipping
                shipping = 'Free'
            } else {
                total = sub_total + shipping
            }
        }
        output += `
        <div class="px-4 border-b">
            <div class="flex justify-between py-4 text-gray-600">
                <span>Subtotal</span>
                <span class="font-semibold text-pink-500">€${sub_total}</span>
            </div>
            <div class="flex justify-between py-4 text-gray-600">
                <span>Shipping</span>
                <span class="font-semibold text-pink-500">€${shipping}</span>
            </div>
        </div>
        <div class="font-semibold text-xl px-4 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>€${total}</span>
        </div>
            `;
            // Location where total is outputted
        document.getElementById('totalCheckout').innerHTML = output
    }),
    )
    } else {
        output = `
        <div class="px-4 border-b">
            <div class="flex justify-between py-4 text-gray-600">
                <span>Subtotal</span>
                <span class="font-semibold text-pink-500">€0</span>
            </div>
            <div class="flex justify-between py-4 text-gray-600">
                <span>Shipping</span>
                <span class="font-semibold text-pink-500">€0</span>
            </div>
        </div>
        <div class="font-semibold text-xl px-4 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>None</span>
        </div>`;
            document.getElementById('totalCheckout').innerHTML = output

        alert('Please Login and create a basket to view this page')
        window.location.href = "/"
    }

}

totalCheckout();
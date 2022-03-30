function createOrders() {
    let access = localStorage.getItem("access");
    let output = '';
    fetch('http://localhost:8000/orders/', {
    method: 'Get',
    headers: {
      'Authorization': "Bearer "+access,
      'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => data.forEach(element => {

        // Finds the Date ordered
        const date = element.date_ordered.split("T");
        dateOrdered = date[0]
        // Output for each order
        output += `
        <div class="mb-4 border rounded w-1/2">
            <div class="bg-gray-400 flex justify-between px-3 py-1 rounded-t">
                <div class="flex space-x-20">
                    <div class="flex flex-col items-center text-sm">
                        <h3 class="text-gray-100 font-semibold">Order Placed</h3>
                        <span class="">${dateOrdered}</span>
                    </div>
                    <div class="flex flex-col items-center text-sm">
                        <h3 class="text-gray-100 font-semibold">Total</h3>
                        <span>€${element.total_price}</span>
                    </div>
                </div>
                <div class="flex items items-center text-yellow-200 font-semibold">
                    <h3>Order #${element.id}</h3>
                </div>
            </div>
        </div>
        `;
        // Location where items are outputted
        document.getElementById('orderContent').innerHTML = output
    }),
    )

}

createOrders();
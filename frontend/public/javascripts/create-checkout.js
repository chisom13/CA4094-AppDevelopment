function createCheckOut() {
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
        for (let i = 0; i < element.items.length; i++) {;
            if ((element.items[i].quantity) >= 1) {
                // Output for each checkout item
                output += `
            <li class="grid grid-cols-6 gap-2 border-b-1">
                <div class="col-span-1 self-center">
                    <img src="${element.items[i].image}" alt="Product" class="rounded w-full">
                </div>
                <div class="flex flex-col col-span-3 pt-2">
                    <span class="text-gray-600 text-md font-semi-bold">${element.items[i].product_name}</span>
                    <span class="text-gray-400 text-sm inline-block pt-2">Size: 9.5</span>
                </div>
                <div class="col-span-2 pt-3">
                    <div class="flex items-center space-x-2 text-sm justify-between">
                        <span class="text-gray-400">${element.items[i].quantity} x €${element.items[i].price}</span>
                        <span class="text-pink-400 font-semibold inline-block">€${element.items[i].sub_price}</span>
                    </div>
                </div>
            </li>
            `;
            }
          }
          // Location where items are outputted
          document.getElementById('checkoutItems').innerHTML = output
    }),
    )
    } else {
        output += `
            <li class="grid grid-cols-6 gap-2 border-b-1">
                <div class="col-span-1 self-center">
                    <img src="" alt="Product" class="rounded w-full">
                </div>
                <div class="flex flex-col col-span-3 pt-2">
                    <span class="text-gray-600 text-md font-semi-bold">-</span>
                    <span class="text-gray-400 text-sm inline-block pt-2">-</span>
                </div>
                <div class="col-span-2 pt-3">
                    <div class="flex items-center space-x-2 text-sm justify-between">
                        <span class="text-gray-400">- x -</span>
                        <span class="text-pink-400 font-semibold inline-block">-</span>
                    </div>
                </div>
            </li>
            `;
            // Location where items are outputted
          document.getElementById('checkoutItems').innerHTML = output
    }

}

createCheckOut();
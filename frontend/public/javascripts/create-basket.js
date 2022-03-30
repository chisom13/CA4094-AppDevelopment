function createBasket() {
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
        for (let i = 0; i < element.items.length; i++) {
            if ((element.items[i].quantity) >= 1) {
                // Output for each basket item
                output += `
            <div class="px-3 py-2 flex flex-row justify-between border-t">
                <div class="text-sm flex">
                    <img src="${element.items[i].image}" alt="" class="w-28 border">
                    <div class="flex flex-col pl-2">
                        <span class="font-bold">${element.items[i].product_name}</span>
                        <span>Size: 9.5</span>
                        <span class="text-purple font-bold">In Stock</span>
                    </div>
                </div>
                <div class="flex flex-col items-center text-sm">
                    <div class="flex">
                        <button class="bg-gray-100 border w-6" onclick="removeFromCart('${element.items[i].product_id}')">-</button>
                        <input type="button" value="${element.items[i].quantity}" aria-readonly="true" class="w-6 bg-white">
                        <button class="border w-6" onclick="addToCart('${element.items[i].product_id}')">+</button>
                    </div>
                    <a href="#" class="underline">Remove</a>
                </div>
                <div class="flex">
                    <span>€${element.items[i].price}</span>
                </div>
                <div class="flex">
                    <span>€${element.items[i].sub_price}</span>
                </div>
            </div>
            `;
            }
          }
          // Location where items are outputted
          document.getElementById('basketItems').innerHTML = output
    }),
    )
    } else {
        output = `
            <div class="flex justify-center items-center">
                <h3 class="text-2xl">Please Login to View Your Items</h3>
            </div>
        `;
        document.getElementById('basketItems').innerHTML = output
    }

}

createBasket();
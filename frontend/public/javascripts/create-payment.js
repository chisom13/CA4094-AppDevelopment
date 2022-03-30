function createPayment() {
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
        // // Output for payment section
        output += `
        <div class="flex flex-wrap">
            <label class="relative w-full flex flex-col">
            <span class="font-bold mb-3">Card number</span>
            <input class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_number" placeholder="0000 0000 0000" />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            </label>
        
            <label class="relative flex-1 flex flex-col">
            <span class="font-bold mb-3">Expire date</span>
            <input class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="expire_date" placeholder="MM/YY" />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            </label>
        
            <label class="relative flex-1 flex flex-col">
            <span class="font-bold flex items-center gap-3 mb-3">
                CVC/CVV
                <span class="relative group">
                <span class="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white"> Hey ceci est une infobulle !</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </span>
            </span>
            <input class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_cvc" placeholder="&bull;&bull;&bull;" />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            </label>
        </div>
        <a class="bg-purple text-white flex flex-grow rounded-md p-2 justify-center font-bold" style="cursor: pointer;" onclick="checkout('${element.id}', '${total}')">Pay €${total}</a>
                    `;
        // Location where item is outputted
        document.getElementById('payment').innerHTML = output
    }),
    )
    } else {
        output += `
        <h3 class="text-2xl">Nothing Here</h3>
         `;
        // Location where item is outputted
        document.getElementById('payment').innerHTML = output
    }
}
createPayment();
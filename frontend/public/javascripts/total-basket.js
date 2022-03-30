function totalBasket() {
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
      // Calculates the total for the basket
        total = 0; 
        for (let i = 0; i < element.items.length; i++) {
            total += element.items[i].sub_price;
          }
        output += `
            <span class="underline">Total:</span>
            <span class="font-bold">€${total}</span>
            `;
            // Location where total is outputted
        document.getElementById('totalBasket').innerHTML = output
    }),
    )
    } else {
      output = `
            <span class="underline">Total:</span>
            <span class="font-bold">None</span>`;
            document.getElementById('totalBasket').innerHTML = output
    }

}

totalBasket();
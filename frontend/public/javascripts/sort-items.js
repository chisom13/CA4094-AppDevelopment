function sortProducts() {
    let select = document.getElementById('select');
    let field = document.querySelector('#items');
    let li = Array.from(field.children);
    let defaultLi = Array.from(field.children);
    // checks to see which option was chosen
    select.addEventListener('change', event => {
        sortingValue(event.target.value);
    });
    // calls the function of the selected value 
    function sortingValue(eValue){
		let eventValue = eValue;
        if (eventValue === 'default') {
            SortDef(field, defaultLi)
        }
        if (eventValue === 'lowToHigh') {
            SortElem(field, li, true)
        }
        if (eventValue === 'highToLow') {
            SortElem(field, li, false)
        }
    }
    // Sorts items back to default
    function SortDef(field,defaultLi) {
        let ar = [];
        for(let i of defaultLi){
            const last = i.lastElementChild;
            const x = last.textContent.trim();
            const y = Number(x.substring(1));
            i.setAttribute("data-price", y);
            ar.push(i);
        }
        while (field.firstChild) {field.removeChild(field.firstChild);}
            field.append(...ar);
    }
    // Sorts items in asc and dec order
    function SortElem(field,li, asc){
        let  dm, sortli;
        dm = asc ? 1 : -1;
        sortli = li.sort((a, b)=>{
            const ax = a.getAttribute('data-price');
            const bx = b.getAttribute('data-price');
            return ax > bx ? (1*dm) : (-1*dm);
        });
         while (field.firstChild) {field.removeChild(field.firstChild);}
         field.append(...sortli);	
    }
}

new sortProducts();
FilterProduct('All')

function FilterProduct(c) {
    var x, i;
    x = document.getElementById("items");
    let li = Array.from(x.children);
    g = li[1].className.split(" ");
    // All products return when 'All' is selected
    if (c == 'All') {
        c = '';   
    }
    for (i = 0; i < li.length; i++) {
        // 'Show' class is removed on items that are not selected
        removeClass(li[i], "show");
        if (li[i].dataset.category.indexOf(c) > -1) {
            // 'Show' class is added to items that are selected
            addClass(li[i], "show")
        }
    }
}

function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    // if 'show' is not on the classList its gets added
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
        
    }
}

function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    // if 'show' is in the classList it gets removed
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
           arr1.splice(arr1.indexOf(arr2[i], 1)); 
        }
    }
    element.className = arr1.join(" ");
}
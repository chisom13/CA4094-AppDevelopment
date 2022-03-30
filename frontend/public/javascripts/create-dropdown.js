function dropDownCreation(){
    let access = localStorage.getItem("access")
    let output = '';
    // If user is logged in they will see these options
    if(access){
       output = `
            <div class="dd_left">
                <ul>
                  <li class="bg-purple p-2 rounded-tl-2xl"><i class="fas fa-truck"></i></li>
                  <li class="bg-purple p-2 rounded-bl-2xl"><i class="fas fa-sign-out-alt"></i></li>
                </ul>
            </div>
            <div class="dd_right">
                <ul>
                  <li class="p-2 hover:text-purple-400"><a href="/my-orders">My Orders</a></li>
                  <li class="p-2 hover:text-purple-400"><a onclick="logout()" style="cursor: pointer;">Logout</a></li>
                </ul>
            </div>
       `
       document.getElementById('dropDown').innerHTML = output;
       document.getElementById('dropDown_mobile').innerHTML = output;
    }
    // If user is not logged in they will see these options
    else {
        output = `
            <div class="dd_left">
                <ul>
                  <li class="bg-purple p-2 rounded-tl-2xl"><i class="fas fa-sign-in-alt"></i></li>
                  <li class="bg-purple p-2 rounded-bl-2xl"><i class="fas fa-user-plus"></i></li>
                </ul>
            </div>
            <div class="dd_right">
                <ul>
                  <li class="p-2 hover:text-purple-400"><a href="/login">Login</a></li>
                  <li class="p-2 hover:text-purple-400"><a href="/sign-up">Sign-Up</a></li>
                </ul>
            </div>
       `
       document.getElementById('dropDown').innerHTML = output;
       document.getElementById('dropDown_mobile').innerHTML = output;
    }

}

dropDownCreation();
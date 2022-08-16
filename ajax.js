/*extract all user data from parsed JSON response object*/
function extractUserList (response) {
    var dataArray = response.data;
    return dataArray;
}

/*load object data into html*/
function updateUserList(userList) {
    var cards = document.querySelector(".cards");
    cards.innerHTML = "";
    var cardCount = 1;
    
    for(var i = 0; i < userList.length; i++) {
        var card = document.createElement("article");
        card.className = "Card";
        var name = document.createElement("h2");
        name.innerHTML = `${userList[i].first_name} ${userList[i].last_name}`; 
        var avatar = document.createElement('img');
        avatar.src = userList[i].avatar;
        var email = document.createElement('a');
        email.href = '#';
        email.innerHTML = userList[i].email;
        
        //append
        card.appendChild(name);
        card.appendChild(avatar);
        card.appendChild(email);
        cards.appendChild(card);
        console.log("User count", cardCount);
        cardCount++;
    };

}

/*loads all the data from server response*/
function loadUserDatas() {
    var url = "https://reqres.in/api/users?page=1";
    var httpRequest = new XMLHttpRequest();
    
    httpRequest.onreadystatechange = function () {
        try {
            //for debugging
            var responseObj = JSON.parse(httpRequest.responseText);
            console.log("The fetched data", responseObj);
            var userList = extractUserList(responseObj);
            console.log("data is",userList);
            updateUserList(userList);
        } catch (error) {
            console.error('unable to load data');
        }
    }
    
    httpRequest.open('get', url);
    httpRequest.send();
}

window.onload = function () {
    loadUserDatas();
}

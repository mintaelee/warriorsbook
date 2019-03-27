window.onload = init;

function init() {
    document.querySelector('#search')
        .addEventListener('click', searchValue);

    document.querySelector('#display-all')
        .addEventListener('click', displayAll);

}

function displayAll(event){
    // Stop page from reloading on button click.
    event.preventDefault();
    clearAllElements();


    displayItems(data);
    
}

function searchValue(event){
    // Stop page from reloading on button click
    event.preventDefault();

    clearAllElements();

    // Grab the user input
    const userInput = document.querySelector('#search-input').value;
    const UILower = userInput.toLowerCase();

    // Create an empty array
    let arrayWithInput = [];

    // Loop through to find the input value in the data
    for (let i = 0; i < data.length; i++){
        let checkArray = Object.values(data[i]);
        for (let j = 0; j < 3; j++){
            checkArray[j] = checkArray[j].toLowerCase();            
            if(checkArray[j].includes(UILower)){
                arrayWithInput.push(data[i]);
            }
        }
    }

    displayItems(arrayWithInput);

}

function appendListElement(object, list){
    nameLiText = 'Name: ' + object.firstName + ' ' + object.lastName;
    
    positionLiText = 'Position: ' + object.position;

    const heightText = Math.floor(object.height/12).toString() + ' ft ' + (object.height%12).toString() + ' in';
    heightLiText = 'Height: ' + heightText;

    const weightText = object.weight.toString() + ' lbs'
    weightLiText = 'Weight: ' + weightText;
    
    teamLiText = 'Team: ' + object.team;

    appendElementText(nameLiText, list);
    appendElementText(positionLiText, list);
    appendElementText(heightLiText, list);
    appendElementText(weightLiText, list);
    appendElementText(teamLiText, list);
}

function appendElementText(text, list){
    const li = document.createElement('li');
    li.innerText = text;
    list.appendChild(li);
}

function displayItems(items){
    const list = document.querySelector('#list');
    
    for (let i = 0; i < items.length; i++){
        const newLi = document.createElement('li');
        const newUl = document.createElement('ul');
        appendListElement(items[i], newUl);

        newLi.appendChild(newUl);
        list.appendChild(newLi);
    }

}

function clearAllElements(){
    const list = document.querySelector('#list');

    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
}

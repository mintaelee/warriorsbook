window.onload = init;

const teams = [
    {
        ATL: 'Atlanta Hawks',
        BOS: 'Boston Celtics',
        BKN: 'Brooklyn Nets',
        CHA: 'Charlotte Hornets',
        CHI: 'Chicago Bulls',
        CLE: 'Cleeland Cavaliers',
        DAL: 'Dallas Mavericks',
        DEN: 'Denver Nuggets',
        DET: 'Detroit Pistons',
        GSW: 'Golden State Warriors',
        HOU: 'Houston Rockets',
        IND: 'Indiana Pacers',
        LAC: 'LA Clippers',
        LAL: 'Los Angeles Lakers',
        MEM: 'Memphis Grizzlies',
        MIA: 'Miami Heat',
        MIL: 'Milwaukee Bucks',
        MIN: 'Minnesota Timberwolves',
        NOP: 'New Orleans Pelicans',
        NYK: 'New York Knicks',
        OKC: 'Oklahoma City Thunders',
        ORL: 'Orlando Magic',
        PHI: 'Philadelphia 76ers',
        PHO: 'Phoenix Suns',
        POR: 'Portland Trail Blazers',
        SAC: 'Sacramento Kings',
        SAS: 'San Antonio Spurs',
        TOR: 'Toronto Raptors',
        UTA: 'Utah Jazz',
        WAS: 'Washington Wizards'

    }
]


function init() {
    document.querySelector('#search')
        .addEventListener('click', searchValue);

    document.querySelector('#display-all')
        .addEventListener('click', displayAll);

    document.querySelector('#search-input')
        .addEventListener('keyup',searchValue);
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
    
    // Grab the user selection
    const userSelection = document.querySelector('#select').value;

    // Grab the user input
    const userInput = document.querySelector('#search-input').value;

    if (userInput.length !== 0){
        searchLoop(userInput, userSelection);
    }


}

function appendListElement(object, list){
    let nameLiText = 'Name: ' + object.firstName + ' ' + object.lastName;
    
    let positionLiText = 'Position: ' + object.position;

    const heightText = Math.floor(object.height/12).toString() + ' ft ' + (object.height%12).toString() + ' in';
    let heightLiText = 'Height: ' + heightText;

    const weightText = object.weight.toString() + ' lbs'
    let weightLiText = 'Weight: ' + weightText;
    
    let teamLiText = 'Previous Teams:'

    appendElementText(nameLiText, list);
    appendElementText(positionLiText, list);
    appendElementText(heightLiText, list);
    appendElementText(weightLiText, list);
    appendElementText(teamLiText, list);
    appendSubList(object.previousTeams, list);
}

function appendElementText(text, list){
    const li = document.createElement('li');
    li.innerText = text;
    list.appendChild(li);
}

function appendSubList(array, list){
    const newUl = document.createElement('ul');

    for (let i = 0; i < array.length; i++){
        let teamText = array[i];
        appendElementText(teamText, newUl);
    }
    list.appendChild(newUl);
}

function displayItems(items){
    const list = document.querySelector('#list');

    if(items.length===0){
        displayNotFound(list);
    } else {
        for (let i = 0; i < items.length; i++){
            const newLi = document.createElement('li');
            const newUl = document.createElement('ul');
            appendListElement(items[i], newUl);
    
            newLi.appendChild(newUl);
            list.appendChild(newLi);
        }


    }
    

}

function displayNotFound(list){
    const newLi = document.createElement('li');

    newLi.innerText = 'No results found';
    list.appendChild(newLi);
}

function clearAllElements(){
    const list = document.querySelector('#list');

    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
}

function searchLoop(userInput, userSelection){
    const UILower = userInput.toLowerCase();

    // Create an empty array
    let arrayWithInput = [];

    if (userSelection === 'all'){
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
        arrayWithInput = searchTeamArray(UILower);
        
    } else if (userSelection === 'previousTeams'){
        arrayWithInput = searchTeamArray(UILower);

    } else {
        for (let i = 0; i < data.length; i++){
            if (data[i][userSelection].toLowerCase().includes(UILower)){
                arrayWithInput.push(data[i]);
            }
        }

    }

    displayItems(arrayWithInput);

}

function searchTeamArray(userInput){
    let arrayWithInput = [];
    for (let i = 0; i < data.length; i++){
        let subArray = data[i].previousTeams;
        for (let j = 0; j < subArray.length; j++){
            console.log(subArray[j].toLowerCase());
            if(subArray[j].toLowerCase().includes(userInput)){
                arrayWithInput.push(data[i]);
            }
        }
    }
    return arrayWithInput;
}

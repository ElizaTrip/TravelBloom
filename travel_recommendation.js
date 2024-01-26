// Getting buttons for search and clear. 
const searchbtn = document.getElementById('searchbtn');
const clearbtn = document.getElementById('clearbtn');

// Get result div.
const resultDiv = document.getElementById('results');

// Get submit button.
const submitbtn = document.getElementById('submitbtn');

// Create what is going to happen after clicking the search button.
function onSearch(){
    // Getting input and selecting where to paste results.
    const input = document.getElementById('search-input').value.toLowerCase();
    resultDiv.innerHTML = '';
    resultDiv.innerHTML += `<h1 style="color: #0F033E;"> Result of a search '${input}' </h1>`;

    //  Fetching data.
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

        // Checking type of search. 
        // If temple or beach: just insert into result div everything in array.
        
        if (input === 'beach' || input === 'beaches'){
            const beachList = data['beaches'];
            
            for (const beach in beachList){
                // Insert into result div name, image and description.
                resultDiv.innerHTML += `<h2 style="color:#234281;">${beachList[beach].name}<h3>`;
                resultDiv.innerHTML += `<img src='${beachList[beach].imageUrl}'>`;
                resultDiv.innerHTML += `<p>${beachList[beach].description} </p><br>`
            }
        } else if (input === 'temple' || input === 'temples'){
            const templeList = data['temples'];
            
            for (const temple in templeList){
                // Insert into result div name, image and description.
                resultDiv.innerHTML += `<h2 style="color:#234281;">${templeList[temple].name}<h3>`;
                resultDiv.innerHTML += `<img src='${templeList[temple].imageUrl}'>`;
                resultDiv.innerHTML += `<p>${templeList[temple].description} </p><br>`
            }
        } else if (input === "japan" || input==='australia' || input==='brazil'){ //check is it is in coutries

            const countyList = data["countries"]; 
            // Iterate through countires 
            for (const country in countyList){
                if (countyList[country].name.toLowerCase() === input){  // If matching with input - iterate cities
                    const citiesList =  countyList[country].cities;
                    for (const city in citiesList){
                        // Insert into result div name, image and description.
                        resultDiv.innerHTML += `<h2 style="color:#234281;">${citiesList[city].name}<h3>`;
                        resultDiv.innerHTML += `<img src='${citiesList[city].imageUrl}'">`;
                        resultDiv.innerHTML += `<p>${citiesList[city].description} </p><br>`
                    }
                }
            }
        } else{
            // If no matches found - inform.
            resultDiv.innerHTML += `<p>No matches found.</p>`
        }
        // Return to the top.
        resultDiv.innerHTML += `<a  href="#search"> Back to search! </a>`
    })
}

// Added search event
searchbtn.addEventListener('click', onSearch);


// Clear result and search text.
function onClear(){
    resultDiv.innerHTML = '';
    document.getElementById('search-input').value ='';
}

clearbtn.addEventListener('click', onClear);

function submitMessage(){
    alert('Thank you for leaving a message!');
    document.getElementById('name').value ='';
    document.getElementById('email').value ='';
    document.getElementById('message').value ='';
}
submitbtn.addEventListener('click', submitMessage);
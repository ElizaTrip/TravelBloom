// Getting button for search. 
const searchbtn = document.getElementById('searchbtn');


// Create what is going to happen after clicking the search button.
function onSearch(){
    // Getting input and selecting where to paste results.
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';
    resultDiv.innerHTML += `<h1 style="color: #0F033E;"> Result of a search '${input}' </h1>`;


    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        if (input === 'beach' || input === 'beaches'){
            const beachList = data['beaches'];
            
            for (const beach in beachList){
                resultDiv.innerHTML += `<h3 style="color:#234281;">${beachList[beach].name}<h3>`;
                resultDiv.innerHTML += `<img src='${beachList[beach].imageUrl}'>`;
                resultDiv.innerHTML += `<p>${beachList[beach].description} </p><br>`
            }
        } else if (input === 'temple' || input === 'temples'){
            const templeList = data['temples'];
            
            for (const temple in templeList){
                resultDiv.innerHTML += `<h3 style="color:#234281;">${templeList[temple].name}<h3>`;
                resultDiv.innerHTML += `<img src='${templeList[temple].imageUrl}'>`;
                resultDiv.innerHTML += `<p>${templeList[temple].description} </p><br>`
            }
        } else if (input === "japan" || input==='australia' || input==='brazil'){
            const countyList = data["countries"]; 
            for (const country in countyList){
                if (countyList[country].name.toLowerCase() === input){
                    console.log(countyList[country]);
                }
            }
        } else{
            resultDiv.innerHTML += `<p>No matches found.</p>`
        }
    })
}

searchbtn.addEventListener('click', onSearch);
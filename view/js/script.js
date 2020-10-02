const btn = document.querySelector('#button');

function validateInput() {
    var x = document.forms["input-form"]["input-field"].value;
    if (x == "" || hasOnlyLetters(x) || x == null) {
        alert("Please provide the valid input.");
        return false;
    }
    else {
        return getCities(x);
    }
}

function hasOnlyLetters(t) {
    var regex = /[^a-zA-Z]/;
    return regex.test(t);
}


const loader = document.getElementById("loader");
function showLoader() {
    loader.className = "show";
    setTimeout(() => {
        loader.className = loader.className.replace("show", "");
    }, 5000);
}


function hideLoader() {
    loader.className = loader.className.replace("show", "");
}

function getCities(data) {
    showLoader();
    const url = 'https://jsonmock.hackerrank.com/api/cities/?city=' + data;
    fetch(url)
            .then(resp => resp.json())
            .then(function (data) {
                cities = data.data;
                total = cities.length;
                var states = {};
                for (city of Object.keys(cities)) {
                    state = cities[city].state;
                    currentCity = cities[city].city;
                    if (state in states) {
                        states[state].push(currentCity);
                    }
                    else {
                        states[state] = [];
                        states[state].push(currentCity);
                    }
                }
                const noOfCities = 'Total Cities found: ' + total;
                const newPara = document.createElement('div');
                newPara.textContent = noOfCities;
                document.body.appendChild(newPara);
                const lines = document.createElement('br');
                document.body.appendChild(lines);
                const table = document.createElement('table');
                table.border = 1;
                for (const state of Object.keys(states)) {
                    const row = table.insertRow();
                    const cell = row.insertCell();
                    cell.innerHTML = state;
                    cities = states[state];
                    for (const city of cities) {
                        const cell = row.insertCell();
                        cell.innerHTML = city;
                    }
                }
                hideLoader();
                document.body.appendChild(table);
            })
            .catch(function (error) {

                console.log(error)
            })
}
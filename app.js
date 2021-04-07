console.log('Im here')
const toggle = document.querySelector('.nav-toggle')
const links = document.querySelector('.links')


function transition(e) {
    console.log(e.currentTarget)
    links.classList.toggle('show-links');
}


toggle.addEventListener('click', transition);

const inputList = document.querySelectorAll('.inputPlanet');

const resultBtn = document.getElementById('btnResult');

const http = new HttpFetch();
const ui = new UI();

let time = 0;
// Storing the Planet List
let initialPlanets = [];
let planet_details = [];
let vehicles_details = [];

//Storing Distance of the Planets
let planet_dist = {};
// Storing the list of values selected from the Drop Down list.
let selectedValues = {};

// Storing the selected Radio button
let selectedRadio = {};

// Storing final selected values
let finalDetails = { "token": "", "planet_names": [], "vehicle_names": [] };


// Getting the Planets details
const planets = http.get('https://findfalcone.herokuapp.com/planets').then(data => {

    data.forEach(element => {
        planet_details.push(element);
        initialPlanets.push(element.name);
    });

    // Displaying the Planets in the Dropdown list
    inputList.forEach(list => {
        const dropId = list.list;
        ui.showDropDownList(dropId, initialPlanets);
    })
});


// Getting the Vehicles
const vehicles = http.get('https://findfalcone.herokuapp.com/vehicles').then(res => {
    res.forEach(e => {
        vehicles_details.push(e);
    })

});

// Getting the Token
const apiToken = http.post('https://findfalcone.herokuapp.com/token', {}).then(res => {
    finalDetails['token'] = res.token;

});

function updateDropDown(e) {
    let currentList = [];
    let otherList = [];

    const currElem = e.currentTarget;
    const currDataList = e.currentTarget.list;
    const selectedPlanet = e.currentTarget.value;


    selectedValues[currElem.name] = selectedPlanet;

    finalDetails['planet_names'].push(selectedPlanet);

    otherList = initialPlanets.filter(e => {

        return e !== selectedPlanet && !Object.values(selectedValues).includes(e);
    });

    currentList.push(selectedPlanet, ...otherList);


    const currPlanet = planet_details.find(e => {
        return e.name === selectedPlanet

    });

    // Storing the selected Planet and its distance.
    planet_dist[currElem.name] = currPlanet;

    // Update the Planets in the Dropdown list based on the selection
    inputList.forEach(list => {
        const dropId = list.list;

        if (list.id === currElem.id) {
            ui.showDropDownList(dropId, currentList);
        } else {
            ui.showDropDownList(dropId, otherList);
        }

    })

    // Updating the Vehicle Radio buttons based on the Planet selected
    ui.showRadioButton(currElem, currPlanet, vehicles_details);

    const radioBtns = document.querySelectorAll("input[type=radio]")


    radioBtns.forEach(radio => {
        radio.addEventListener('change', btnClick);
    });

}

function btnClick(e) {

    let currRadioBtn = e.currentTarget;
    const noOfVehicles = parseInt(currRadioBtn.dataset.number);
    let newCount = noOfVehicles - 1;
    const [currId, currIdName] = currRadioBtn.id.split('-');

    if (selectedRadio[currId]) {

        const prevBtn = document.getElementById(`${selectedRadio[currId]}`)
        const prevCnt = parseInt(prevBtn.dataset.number) + 1;

        ui.updateRadioButton(prevBtn, prevCnt, vehicles_details)
    }
    selectedRadio[currId] = currRadioBtn.id;

    /*console.log(selectedRadio);
    console.log(planet_dist);*/
    ui.updateRadioButton(currRadioBtn, newCount, vehicles_details)

    const vehicle_dist = vehicles_details.find(e => e['name'] === currRadioBtn.dataset.name)['speed'];
    time += planet_dist[currId]['distance'] / vehicle_dist;
    console.log(time);
    finalDetails['vehicle_names'].push(currRadioBtn.dataset.name);

    const timeTaken = document.querySelector('.timeTaken');

    timeTaken.innerHTML = time;

}


function showResults(e) {

    console.log(e.currentTarget);


    const inputData = { 'token': 'IdIggIIukusSUiEjzpIdlLlTnlyQilg', 'planet_names': ["Donlon", "Enchai", "Jebing", "Lerbin"], 'vehicle_names': ["Space pod", "Space rocket", "Space shuttle", "Space ship"] }

    console.log(finalDetails);

    // Finding the Al Falcone
    const finalResult = http.post('https://findfalcone.herokuapp.com/find', finalDetails).then(res => {
        console.log(res.planet_name);
        console.log(res.status);
        console.log(time);
        window.location = `result.html?time=${time}&planet=${res.planet_name}&status=${res.status}`;
    });


}

inputList.forEach(elem => {
    elem.addEventListener('change', updateDropDown);
})


resultBtn.addEventListener('click', showResults);
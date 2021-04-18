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
    inputList.forEach(list => ui.showDropDownList(list.list, initialPlanets))
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


    const currPlanet = planet_details.find(e => e.name === selectedPlanet);

    console.log(currPlanet)
        // Storing the selected Planet and its distance.
    planet_dist[currElem.name] = currPlanet;
    console.log(planet_dist)
        // Update the Planets in the Dropdown list based on the selection
    inputList.forEach(el => {

        if (el.id === currElem.id) {
            ui.showDropDownList(el.list, currentList);
        } else {
            ui.showDropDownList(el.list, otherList);
        }
    })
    console.log(currElem);


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

        ui.updateRadioButton(prevBtn, prevCnt)
    }
    selectedRadio[currId] = currRadioBtn.id;

    ui.updateRadioButton(currRadioBtn, newCount)

    const vehicle_dist = vehicles_details.find(e => e['name'] === currRadioBtn.dataset.name)['speed'];
    time += planet_dist[currId]['distance'] / vehicle_dist;

    finalDetails['vehicle_names'].push(currRadioBtn.dataset.name);

    const timeTaken = document.querySelector('.timeTaken');

    timeTaken.innerHTML = time;

}


function showResults(e) {

    const inputData = { 'token': 'IdIggIIukusSUiEjzpIdlLlTnlyQilg', 'planet_names': ["Donlon", "Enchai", "Jebing", "Lerbin"], 'vehicle_names': ["Space pod", "Space rocket", "Space shuttle", "Space ship"] }

    // Finding the Al Falcone
    const finalResult = http.post('https://findfalcone.herokuapp.com/find', finalDetails).then(res => {

        window.location = `result.html?time=${time}&planet=${res.planet_name}&status=${res.status}`;
    });
}

inputList.forEach(elem => {
    elem.addEventListener('change', updateDropDown);
})

const rules = document.querySelector('.rules');
const modalOuter = document.querySelector('.modal-outer')

rules.addEventListener('click', function(e) {
    console.log(rules)
    modalOuter.classList.add('open');
})

const modalBtn = document.querySelector('.modal-play').addEventListener('click', function(e) {
    modalOuter.classList.remove('open');
})

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modalOuter.classList.remove('open');
    }
})
resultBtn.addEventListener('click', showResults);
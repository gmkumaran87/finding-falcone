console.log('Im here in Result');

let resultTitle = document.querySelector('.result-title');
let resultPlanet = document.querySelector('.result-planet');
let timeTkn = document.querySelector('.result-timeTaken');
const bttn = document.querySelector('.result-home');

const params = new URLSearchParams(window.location.search)

let status = ''
let planetName = '';
let timeTaken = 0;

for (const param of params) {


    if (param.includes('status')) {
        status = param[1];
    } else if (param.includes('planet')) {
        planetName = param[1];
    } else {
        timeTaken = param[1];
    }
    console.log(param);
}

if (status === 'success') {
    resultTitle.innerHTML = `Success.! Congratulations on Finding Falcone...`;
    resultPlanet.innerHTML = `Planet found - ${planetName}`;
    timeTkn.innerHTML = `Time Taken: ${timeTaken}`;
} else if (status === 'false') {
    resultTitle.innerHTML = `Cannot find the Falcone..! Better luck next time..!`;
}

bttn.addEventListener('click', () => window.location = 'index.html');
class UI {
    constructor() {

    }

    capitalize = (elem) => elem.split(' ').map(e => e.charAt(0).toUpperCase() + e.slice(1));


    showDropDownList(elem, planetArr) {
        elem.innerHTML = ``;

        planetArr.forEach(planet => elem.innerHTML += `<option value = ${planet}></option>`);

    }

    showRadioButton(currEl, planet, vehicles) {

        const newVehicles = vehicles.filter(el => el.max_distance >= planet.distance)

        let form = document.getElementById(`vehicle-${currEl.name}`).firstElementChild


        form.innerHTML = '';
        newVehicles.forEach(el => {

            let idName = this.capitalize(el.name).join('');

            let labelName = this.capitalize(el.name).join(' ');

            form.innerHTML += `<label for="${currEl.name}-${idName}" class="radio-btn">
                    <input type = "radio" id="${currEl.name}-${idName}" data-name="${el.name}" data-number="${el.total_no}" name="${currEl.name}-vehicles"> ${labelName} <span> (${el.total_no})</span></label>`;

        })
    }

    //  showListRadio(elem, )

    updateRadioButton(btn, cnt) {

        const vehicleId = btn.id.split('-');

        btn.dataset.number = cnt;
        btn.nextElementSibling.innerHTML = `(${cnt})`;

        if (cnt === 0) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }

        for (let i = 1; i <= 4; i++) {
            if (vehicleId[0] === `p${i}`) {
                continue;
            }

            const nextId = document.getElementById(`p${i}-${vehicleId[1]}`);

            if (nextId) {
                if (cnt === 0) {
                    nextId.disabled = true;
                } else {
                    nextId.disabled = false;
                }
                nextId.dataset.number = cnt;
                nextId.nextElementSibling.innerHTML = `(${cnt})`;
            }
        }

    }
}
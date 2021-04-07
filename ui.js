class UI {
    constructor() {

    }

    showDropDownList(elem, planetArr) {
        elem.innerHTML = ``;

        for (let i = 0; i < planetArr.length; i++) {
            elem.innerHTML += `<option value = ${planetArr[i]}></option>`;
        }


    }

    showRadioButton(currEl, planet, vehicles) {

        const newVehicles = vehicles.filter(el => {
            return el.max_distance >= planet.distance;
        })

        let form = document.getElementById(`vehicle-${currEl.name}`).firstElementChild


        form.innerHTML = '';
        newVehicles.forEach(el => {
            let n = el.name.split(' ').map(e => {
                return e.charAt(0).toUpperCase() + e.slice(1);
            }).join('');

            let n1 = el.name.split(' ').map(e => {
                return e.charAt(0).toUpperCase() + e.slice(1);
            }).join(' ');

            form.innerHTML += `<label for="${currEl.name}-${n}" class="radio-btn">
                    <input type = "radio" id="${currEl.name}-${n}" data-name="${el.name}" data-number="${el.total_no}" name="${currEl.name}-vehicles"> ${n1} <span> (${el.total_no})</span></label>`;

        })

    }

    updateRadioButton(btn, cnt, vehicles_det) {

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

    displayResult(elem) {


    }


}
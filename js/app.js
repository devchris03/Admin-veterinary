// -------------------- VARIABLES --------------------
const form = document.querySelector('#form');
// -------------------- EVENTOS --------------------
loadEvents()
function loadEvents() {
    form.addEventListener('submit', validate)
}

// -------------------- CLASSES --------------------
class Data {
    constructor(patient, owner, email, date, symptoms) {
        this.patient = patient;
        this.owner = owner;
        this.email = email;
        this.date = date;
        this.symptoms = symptoms;
    }
}


class UI {
    showAlert(type, message) {
        const alert = document.createElement('p');
        alert.classList.add('alert');
        alert.textContent = message;

        if(type === 'error') {
            alert.classList.add('error');
        } else {
            alert.classList.add('success');
        }

        const container = document.querySelector('.container:first-child');

        // elimina alerta existente
        const exist = container.querySelector('.alert');
        if(exist) {
            exist.remove();
        }

        // inserta alerta
        container.insertBefore(alert, form);

        // muestra alerta durante 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000)
    }
}

// -------------------- INSTANCIAS --------------------
const interface = new UI;
let information;

// -------------------- FUNCIONES --------------------

// valida formulario
function validate(event) {
    event.preventDefault();

    const patient = form.querySelector('#paciente');
    const owner = form.querySelector('#propietario');
    const email = form.querySelector('#email');
    const date = form.querySelector('#fecha');
    const symptoms = form.querySelector('#sintomas');

    // muestra alerta de error
    if(patient.value.trim() === '' || owner.value.trim() === '' || email.value.trim() === '' || date.value === '' || symptoms.value.trim() === '') {
        interface.showAlert('error', 'Todos los campos son obligatorios.')
        return;
    } 
    
    if(!/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/.test(owner.value.trim())) {
        interface.showAlert('error', 'El nombre ingresado no es válido')
        return;
    }

    if(!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email.value.trim())) {
        interface.showAlert('error', 'El email ingresado no es válido')
        return;
    }
    
    // muestra alerta de éxito
    interface.showAlert('success', 'Paciente registrado')

    //limpia formulario
    form.reset();

    information = new Data(patient.value.trim(), owner.value.trim(), email.value.trim(), date.value, symptoms.value.trim());

    
}
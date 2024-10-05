// -------------------- VARIABLES --------------------
const form = document.querySelector('#form');
const patient = form.querySelector('#paciente');
const owner = form.querySelector('#propietario');
const email = form.querySelector('#email');
const date = form.querySelector('#fecha');
const symptoms = form.querySelector('#sintomas');
const list = document.querySelector('#list');


// -------------------- EVENTOS --------------------
loadEvents()
function loadEvents() {
    form.addEventListener('submit', validate);
}

// -------------------- CLASSES --------------------
class Alert {

    showAlert(type, message) {
        const alert = document.createElement('p');
        alert.classList.add('alert');
        alert.textContent = message;

        // agrega estilo segun el tipo
        type === 'error' ? alert.classList.add('error') : alert.classList.add('success');

        // elimina alerta existente
        const exist = form.parentElement.querySelector('.alert');
        exist?.remove();

        // inserta alerta
        form.parentElement.insertBefore(alert, form);

        // muestra alerta durante 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000)
    }
}


class Data {

    constructor() {
        this.listAppointments = [];
    }

    list(patient, owner, email, date, symptoms) {

        const Obj = {
            patient: patient,
            owner: owner,
            email: email,
            date: date,
            symptoms: symptoms,
            id: Date.now(),
        }

        this.listAppointments = [...this.listAppointments, Obj];

        this.showList();
    }
    

    showList() {
        
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }

        this.listAppointments.forEach(data => {
            const appointment = document.createElement('div');
            appointment.classList.add('appointment');
            appointment.id = data.id;

            // crea html para mostar información de la cita
            const patient = document.createElement('p');
            patient.classList.add('patient');
            patient.innerHTML = `<span class="strong">Paciente:</span> <span>${data.patient}</span>`;
            
            const owner = document.createElement('p');
            owner.classList.add('owner');
            owner.innerHTML = `<span class="strong">Propietario:</span> <span>${data.owner}</span>`;
            
            const email = document.createElement('p');
            email.classList.add('email');
            email.innerHTML = `<span class="strong">Email:</span> <span>${data.email}</span>`;
            
            const date = document.createElement('p');
            date.classList.add('date')
            date.innerHTML = `<span class="strong">Fecha:</span> <span>${data.date}</span>`;
            
            const symptoms = document.createElement('p');
            symptoms.classList.add('symptoms');
            symptoms.innerHTML = `<span class="strong">Sintomas:</span> <span>${data.symptoms}</span>`;
        

            appointment.appendChild(patient);
            appointment.appendChild(owner);
            appointment.appendChild(email);
            appointment.appendChild(date);
            appointment.appendChild(symptoms);


            // crea boton editar
            const edit = document.createElement('button');
            edit.ariaLabel = "Editar Cita";
            edit.classList.add('edit', 'button');
            edit.innerHTML = `<span>Editar</span> <img src="./img/edit.svg">`;
            
            // crea boton eliminar
            const remove = document.createElement('button');
            remove.ariaLabel = "Eliminar Cita";
            remove.classList.add('remove', 'button');
            remove.innerHTML = `<span>Eliminar</span> <img src="./img/delete.svg">`;
            remove.onclick = () => this.remove(data.id);

            // crea contenedor de botones
            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            // inserta botones en el contener de botones
            buttons.appendChild(edit);
            buttons.appendChild(remove);

            // inserta contener de botones al elemento principal
            appointment.appendChild(buttons);

            //inserta lista en el html 
            list.appendChild(appointment);
        })

        if(this.listAppointments.length === 0) {
            const empty = document.createElement('p');
            empty.classList.add('empty');
            empty.textContent = 'No hay pacientes';
            list.appendChild(empty);
        }
    }

    remove(id) {
        this.listAppointments = this.listAppointments.filter(data => data.id !== id);
        this.showList();
    }
}

// -------------------- INSTANCIAS --------------------
const interface = new Alert;
const information = new Data;

// -------------------- FUNCIONES --------------------

// valida formulario
function validate(event) {
    event.preventDefault();

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

    // envia datos del formulario
    information.list(patient.value.trim(), owner.value.trim(), email.value.trim(), date.value.trim(), symptoms.value.trim());

    //limpia formulario
    form.reset();
}



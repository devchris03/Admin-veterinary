// ---------------------- VARIABLES ----------------------
const namePatient = document.querySelector('#paciente');
const nameOwner = document.querySelector('#propietario');
const email = document.querySelector('#email');
const date = document.querySelector('#fecha');
const symptoms = document.querySelector('#sintomas');
const form = document.querySelector('#form');
const containerTickets = document.querySelector('#list');
const buttonSubmit = document.querySelector('#submit');
let edit = false;


const objResult = {
    paciente: '',
    propietario: '',
    fecha: '',
    email: '',
    sintomas: '',
    id: Date.now(),
}

// ---------------------- EVENTOS ----------------------
loadEvents();
function loadEvents() {
    namePatient.addEventListener('change', changeValue);
    nameOwner.addEventListener('change', changeValue);
    email.addEventListener('change', changeValue);
    date.addEventListener('change', changeValue);
    symptoms.addEventListener('change', changeValue);
    form.addEventListener('submit', validate);
}

// ---------------------- CLASSES ----------------------
class Notification {
    constructor(type, message) {
        this.type = type;
        this.message = message

        this.showAlert()
    }

    showAlert() {
        const alert = document.createElement('P');
        alert.textContent = this.message;
        alert.classList.add('alert');

        // verifica si existe alerta, si es asi la remueve
        const existAlert = form.parentElement.querySelector('.alert');
        existAlert?.remove()

        this.type === 'error' ? alert.classList.add('error') : alert.classList.add('success');

        // inserta alerta en el html
        form.parentElement.insertBefore(alert, form);

        // muestra alerta durante 3s
        setTimeout(() => {
            alert.remove();
        }, 3000)
    }
}

class Admin {
    constructor () {
        this.listAppointment = [];
    }

    addAppointment(objResult) {
        this.listAppointment = [...this.listAppointment, objResult]
        this.showList();
    }

    showList() {
        // limpia contenerdor
        while(containerTickets.firstChild) {
            containerTickets.removeChild(containerTickets.firstChild)
        }

        if(this.listAppointment.length == '0') {
            const empty = document.createElement('P');
            empty.textContent = 'No hay pacientes'
            empty.classList.add('empty');
            containerTickets.appendChild(empty)
        }
        
        // muestra tickets
        this.listAppointment.forEach(appointment => {
            const ticket = document.createElement('DIV');
            ticket.classList.add('ticket');
            ticket.id = appointment.id;

            // crea html para mostrar información dentro la cita
            const patient = document.createElement('P');
            patient.classList.add('patient');
            patient.innerHTML = `<span class="strong">Paciente:</span> <span>${appointment.paciente}</span>`;
            
            const owner = document.createElement('P');
            owner.classList.add('owner');
            owner.innerHTML = `<span class="strong">Propietario:</span> <span>${appointment.propietario}</span>`;
            
            const email = document.createElement('P');
            email.classList.add('email');
            email.innerHTML = `<span class="strong">Email:</span> <span>${appointment.email}</span>`;
            
            const date = document.createElement('P');
            date.classList.add('date');
            date.innerHTML = `<span class="strong">Fecha:</span> <span>${appointment.fecha}</span>`;
            
            const symptoms = document.createElement('P');
            symptoms.classList.add('symptoms');
            symptoms.innerHTML = `<span class="strong">Sintomas:</span> <span>${appointment.sintomas}</span>`;

            // inserta elementos al elemento padre
            ticket.append(patient, owner, email, date, symptoms);

            // crea boton editar
            const editButton = document.createElement('BUTTON');
            editButton.ariaLabel = "Editar Cita";
            editButton.classList.add('edit', 'button');
            editButton.innerHTML = `<span>Editar</span> <img src="./img/edit.svg">`;
            const tacketSelect = structuredClone(appointment);
            editButton.onclick = () => this.editTicket(tacketSelect);

            const deleteButton = document.createElement('BUTTON');
            deleteButton.ariaLabel = "Eliminar Cita";
            deleteButton.classList.add('remove', 'button');
            deleteButton.innerHTML = `<span>Eliminar</span> <img src="./img/delete.svg">`;
            deleteButton.onclick = () => this.delete(appointment.id);

            // crea contenedor de los botones
            const buttonContainer = document.createElement('DIV');
            buttonContainer.classList.add('buttons');

            // inserta botones en el contenedor
            buttonContainer.append(editButton, deleteButton)

            // inserta contenedor de los botones en el ticket
            ticket.appendChild(buttonContainer)

            // inserta ticket en el html
            containerTickets.appendChild(ticket);
        })

        
    }

    // muestra los valores en el formulario
    editTicket(tacketSelect) {
        namePatient.value = tacketSelect.paciente;
        nameOwner.value = tacketSelect.propietario;
        email.value = tacketSelect.email;
        date.value = tacketSelect.fecha;
        symptoms.value = tacketSelect.sintomas;

        Object.assign(objResult, tacketSelect);

        buttonSubmit.value = 'Guardar cambios';
        edit = true;
    }

    updateTicket(objResult) {

        this.listAppointment = this.listAppointment.map((cita) => cita.id === objResult.id ? objResult : cita);
        this.showList();
    }

    delete(id) {
        this.listAppointment = this.listAppointment.filter((cita) => cita.id !== id);
        this.showList();
    }

}

// ---------------------- INSTANCIAS ----------------------
const admin = new Admin(); 

// ---------------------- FUNCIONES ----------------------

// obtiene valor de los campos
function changeValue (event) {
    objResult[event.target.id] = event.target.value;
}

// validar formulario
function validate(event) {
    event.preventDefault();

    // verifica si existe algun campo vacío
    if(Object.values(objResult).some(value => value === '')) {
        new Notification('error', 'Todos los campos son obligatorios.')
        return;
    }

    if(!/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/.test(objResult.propietario.trim())) {
        new Notification('error', 'El nombre ingresado no es válido.');
        return;
    }

    if(!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(objResult.email.trim())) {
        new Notification('error', 'El email ingresado no es válido.');
        return;
    }

    
    
    if(edit) {
        admin.updateTicket({...objResult});
        new Notification('success', 'Paciente actualizado.')
    } else {
        // agrega paciente
        admin.addAppointment({...objResult})
        new Notification('success', 'Paciente agregado.')
    }
    
    form.reset();
    Object.assign(objResult, {
            paciente: '',
            propietario: '',
            fecha: '',
            email: '',
            sintomas: '',
            id: Date.now(),
    })
    
    buttonSubmit.value = 'Registrar paciente'
}


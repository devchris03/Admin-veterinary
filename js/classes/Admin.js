// ---------------------- IMPORTAR ----------------------
import { containerTickets, nameOwner, namePatient, date, email, symptoms, buttonSubmit } from "../selectores.js";
import { objResult, edit } from "../variables.js";


export default class Admin {
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
        edit.value = true;
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
// ---------------------- IMPORTAR ----------------------
import { objResult, edit } from "./variables.js";
import Notification from "./classes/Notification.js";
import Admin from "./classes/Admin.js";
import { form, buttonSubmit } from "./selectores.js";
// ---------------------- INSTANCIAS ----------------------
const admin = new Admin(); 

// obtiene valor de los campos
export function changeValue (event) {
    objResult[event.target.id] = event.target.value;
}

// validar formulario
export function validate(event) {
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

    
    
    if(edit.value) {
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
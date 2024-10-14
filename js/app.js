// ---------------------- IMPORTAR ----------------------
import { namePatient, nameOwner, email, date, symptoms, form } from "./selectores.js";
import { changeValue,validate } from "./funciones.js";

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







// ---------------------- FUNCIONES ----------------------






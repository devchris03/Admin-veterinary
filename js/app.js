// ----------------------- VARIABLES ----------------------- 
const form = document.querySelector('#form');

// ----------------------- EVENTOS -----------------------
loadEvents();
function loadEvents() {
    form.addEventListener('submit', validate)
}

// ----------------------- CLASSES -----------------------
class Data {
    constructor(paciente, propietario, email, fecha, sintomas) {
        this.paciente = paciente;
        this.propietario = propietario;
        this.email = email;
        this.fecha = fecha;
        this.sintomas = sintomas;
    }
}


class UI {
    showAlert(message, reference) {
        const alert = document.createElement('p');
        alert.classList.add('alert');
        alert.textContent = message;

        // verifica si existe alerta
        const exist = reference.parentElement.querySelector('.alert');
        if(exist) {
            exist.remove()
        }

        // inserta alerta
        reference.parentElement.appendChild(alert);
        reference.classList.add('alertCamp')
        

    }
}

// ----------------------- INSTANCIAS -----------------------
let dataList;
const interface = new UI;
// ----------------------- FUNCIONES ----------------------- 

// valida los campos
function validate(event) {
    event.preventDefault();

    const paciente = form.querySelector('#paciente');
    const propietario = form.querySelector('#propietario');
    const email = form.querySelector('#email');
    const fecha = form.querySelector('#fecha');
    const sintomas = form.querySelector('#sintomas');

    const campList = [paciente, propietario, email, fecha, sintomas];

    dataList = new Data(paciente.value, propietario.value, email.value, fecha.value, sintomas.value);

    // verificar si existe algun campo vacio
    for(const data in dataList) {
        if(dataList[data] === '') {
            
            // busca coincidir con el campo 
            campList.forEach(camp => {
                if(camp.id == data) {
                    
                    // muestra  alerta
                    interface.showAlert(`El campo ${data} es obligatorio`, camp)
                }
            })
        }
    }
}
// ---------------------- IMPORTAR ----------------------
import { form } from "../selectores.js";

export default class Notification {
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
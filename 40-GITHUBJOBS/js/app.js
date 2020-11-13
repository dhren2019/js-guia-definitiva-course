const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContantLoader', () => {
    formulario.addEventListener('submit', validarBusqueda);
})

const validarBusqueda= (e) => {
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;

    if(busqueda.length < 3){
        mostrarMensaje('Busqueda muy corta...Añade mas información')
    }
}

const mostrarMensaje = (msg) => {
    const alerta = document.createElement('div');
    alerta.classList.add('bg-bray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
    alerta.textContent = msg;

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}
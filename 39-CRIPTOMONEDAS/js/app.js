// const selectCriptomonedas = document.querySelector('#criptomonedas');
const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario   = document.querySelector('#formulario');
const resultado   = document.querySelector('#resultado');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//Promise
const obtenerCriptomonedas = criptomonedas => new Promise ( resolve => {
    resolve(criptomonedas);

})
document.addEventListener('DOMContentLoaded', () => {

    consultarCriptomoneda();

    formulario.addEventListener('submit',  submitFormulario);

    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
})
function consultarCriptomoneda() {
    
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    
    fetch(url)
    .then( respuesta => respuesta.json() )
    .then( resultado => obtenerCriptomonedas(resultado.Data))
    .then( criptomonedas => selectCriptomonedas(criptomonedas))
}


function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach( cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
        console.log(selectCriptomonedas)
        });
}
function leerValor(e){

    objBusqueda[e.target.name] = e.target.value;
    // console.log(objBusqueda);
}

function submitFormulario(e) {
    e.preventDefault();

    // validar
    const { moneda, criptomoneda} = objBusqueda;

    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

    // Consultar la API con los resultados

    consultarApi();
}

function mostrarAlerta(msg) {

    const existeError = document.querySelector('.error');

    if (!existeError) {
        
        const divMensaje  = document.createElement('div');
        divMensaje.classList.add('error');
    
        // mensaje de error
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);
    
        setTimeout(() => {
            divMensaje.remove();
        },3000);
    }
}

function consultarApi(){
    const {moneda, criptomoneda} = objBusqueda;

    // const url = `https://min-api.cryptocompare.com/data/price?fsym=${criptomoneda}&tsyms=${moneda}`;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpinner();


    fetch(url)
    .then( respuesta => respuesta.json())
    .then( cotizacion => {
        mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
    })
}

const mostrarCotizacionHTML = (cotizacion) => {
    // console.log(cotizacion);
    limpiarHTML();

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;


    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;
    
    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>Precio mas alto del dia: <span>${HIGHDAY}</span>`;
    
    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>Precio mas bajo del dia: <span>${LOWDAY}</span>`;
    
    const ultimasHoras = document.createElement('p');
    const updates = document.createElement('p');
    ultimasHoras.innerHTML = `<p>Variacion ultimas 24 horas: <span>${CHANGEPCT24HOUR}</span>`;
    updates.innerHTML = `<p>Ultima actualizacion: <span>${LASTUPDATE}</span>`;
    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(updates);


}


const limpiarHTML = () => {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

const mostrarSpinner = () => {
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
    <div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>
    `;
    resultado.appendChild(spinner);
}
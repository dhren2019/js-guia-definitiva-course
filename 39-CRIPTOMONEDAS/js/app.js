// const selectCriptomonedas = document.querySelector('#criptomonedas');
const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario   = document.querySelector('#formulario');

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

    const url = `https://min-api.cryptocompare.com/data/price?fsym=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
    .then( respuesta => respuesta.json())
    .then( cotizacion => {
        console.log(cotizacion)
    })
}
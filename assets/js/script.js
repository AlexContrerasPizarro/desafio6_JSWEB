const urlApi = "https://mindicador.cl/api";
const btn = document.getElementById('buttonConvertir');
const resultadoOperacion = document.getElementById('resultadoDisplay');
const pesosIngresados = document.getElementById('pesosDisplay');
let grafico = document.getElementById("grafico");
let myChart


const buscarMonedas = async (monedas) => {
    try {

        const res = await fetch(`${urlApi}/${monedas}`);
        const data = await res.json();
        const valorHoy = data.serie[0].valor;
        const datosFechaValor = data.serie.splice(0, 10);

        operacion(valorHoy, monedas);
        ordenarxFechas(datosFechaValor);

        //  console.log(valorHoy , monedas)

    } catch (error) {
        alert("Hubo un error, inténtelo nuevamente");
    };

};

btn.addEventListener('click', () => {

    const option = document.getElementById('selectPesos').value;
    buscarMonedas(option);
});


const operacion = (dato, moneda) => {

    const valorInput = document.getElementById('inputPesos').value
    let operacionValor
    let valorModificado

    if (moneda === "dolar") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(2)} DOLARES`
    }
    else if (moneda === "euro") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(2)} EUROS`
    }
    else if (moneda === "uf") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(2)} UF`
    }
    else if (moneda === "utm") {
        operacionValor = parseInt(valorInput) / parseInt(dato)
        valorModificado = `${operacionValor.toFixed(2)} UTM`
    }

    pesosIngresados.innerHTML = ` ${valorInput} CLP hoy `;
    resultadoOperacion.innerHTML = `equivalen a ${valorModificado}`;

};

const estructuraFecha = (date) => {

    date = new Date(date);
    const ano = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dias = date.getDate();
    return `${dias}-${mes}-${ano}`;

};

const ordenarxFechas = (datos) => {

    //console.log(datos)

    const datoOrdenado = datos.sort((a, b) => {
        if (a.fecha < b.fecha) {
            return -1;
        }
        if (a.fecha > b.fecha) {
            return 1;
        }
        return 0;
    }
    );

    const ordenFechas = datoOrdenado.map(c => estructuraFecha(c.fecha));
    const valorMoneda = datoOrdenado.map(d => d.valor);
    configuracionGrafico(valorMoneda, ordenFechas);

};

const configuracionGrafico = (valores, fechas) => {

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(grafico, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [
                {
                    label: `Historial últimos 10 días`,
                    data: valores,
                    borderColor: "rgb(33, 153, 232)",

                }
            ]
        }
    })
};



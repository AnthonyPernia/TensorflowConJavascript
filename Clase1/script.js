async function getData() {
    const datosCasasR = await fetch('https://static.platzi.com/media/public/uploads/datos-entrenamiento_15cd99ce-3561-494e-8f56-9492d4e86438.json');  
    const datosCasas = await datosCasasR.json();  
    const datosLimpios = datosCasas.map(casa => ({
      precio: casa.Precio,
      cuartos: casa.NumeroDeCuartosPromedio
    }))
    .filter(casa => (casa.precio != null && casa.cuartos != null));
    
    return datosLimpios;
  }
  
  function visualizarDatos(data){
    const valores = data.map(d => ({
      x: d.cuartos,
      y: d.precio,
    }));
  
    tfvis.render.scatterplot(
      {name: 'Cuartos vs Precio'},
      {values: valores}, 
      {
        xLabel: 'Cuartos',
        yLabel: 'Precio',
        height: 300
      }
    );
  }

function crearModelo(){
  const modelo = tf.sequential(); 
    
  // agregar capa oculta que va a recibir 1 dato
  modelo.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
  
  // agregar una capa de salida que va a tener 1 sola unidad
  modelo.add(tf.layers.dense({units: 1, useBias: true}));

  return modelo;
}

async function run() {

    const data = await getData();

    visualizarDatos(data);

    crearModelo();
    
}

run();


// ===========================
// CONCEPTOS FIJOS
// ===========================

const conceptosFijos = [

    {
        nombre: "Operador de Sonido 2 Horas",
        precio: 40000
    },

    {
        nombre: "Traslado zona Norte/Oeste",
        precio: 60000
    }

];

const productos = [

{categoria:"BAFLES",nombre:'Par de bafles 12"',precio:30000},
{categoria:"BAFLES",nombre:'Par de bafles 15"',precio:30000},
{categoria:"BAFLES",nombre:'Bafle potenciado 12" (Monitor)',precio:30000},

{categoria:"POTENCIAS",nombre:'Potencia Para bafles de 12"',precio:25000},
{categoria:"POTENCIAS",nombre:'Potencia Para bafles de 15"',precio:25000},
{categoria:"POTENCIAS",nombre:'Potencia Para los 4 bafles ',precio:50000},

{categoria:"MICRÓFONOS",nombre:"Micrófono de mano con cable",precio:5000},
{categoria:"MICRÓFONOS",nombre:"Micrófono de instrumento con cable",precio:5000},

{categoria:"ACCESORIOS",nombre:"Pie de micrófono",precio:4000},

{categoria:"PROCESADORES",nombre:"Virtualizer 2000 (Behringer)",precio:10000},
{categoria:"PROCESADORES",nombre:"EQ 15x2 (Moon)",precio:10000},
{categoria:"PROCESADORES",nombre:"Caja Directa DI20",precio:4000},

{categoria:"CONSOLAS",nombre:"Consola Digital 8 CH",precio:40000},
{categoria:"CONSOLAS",nombre:"Consola Analógica 16 CH",precio:60000},

{categoria:"GRABACIÓN DEL SHOW",nombre:"Main L y R",precio:30000},
{categoria:"GRABACIÓN DEL SHOW",nombre:"Multitrack",precio:50000},

...conceptosFijos.map(c => ({
    categoria: "CONCEPTOS FIJOS",
    nombre: c.nombre,
    precio: c.precio,
    fijo: true
}))
];

const lista = document.getElementById("lista");
const carrito = document.getElementById("carrito");
const total = document.getElementById("total");

// ===========================
// COMBOS INTELIGENTES
// ===========================

const combos = {

    "50-solista": [
        { nombre:'Par de bafles 12"', cantidad:1 },
        { nombre:'Potencia Para bafles de 12"', cantidad:1 },
        { nombre:'Consola Digital 8 CH', cantidad:1 },
        { nombre:'Micrófono de mano con cable', cantidad:1 },
        { nombre:'Pie de micrófono', cantidad:1 }
    ],

    "50-duo": [
        { nombre:'Par de bafles 12"', cantidad:1 },
        { nombre:'Potencia Para bafles de 12"', cantidad:1 },
        { nombre:'Consola Digital 8 CH', cantidad:1 },
        { nombre:'Micrófono de mano con cable', cantidad:2 },
        { nombre:'Pie de micrófono', cantidad:2 }
    ],

    "50-trio": [
        { nombre:'Par de bafles 12"', cantidad:1 },
        { nombre:'Potencia Para bafles de 12"', cantidad:1 },
        { nombre:'Consola Digital 8 CH', cantidad:1 },
        { nombre:'Micrófono de mano con cable', cantidad:3 },
        { nombre:'Pie de micrófono', cantidad:3 }
    ],

    "100-solista": [
        { nombre:'Par de bafles 12"', cantidad:1 },
        { nombre:'Par de bafles 15"', cantidad:1 },
        { nombre:'Potencia Para los 4 bafles ', cantidad:1 },
        { nombre:'Consola Digital 8 CH', cantidad:1 },
        { nombre:'Micrófono de mano con cable', cantidad:1 },
        { nombre:'Pie de micrófono', cantidad:1 }
    ],

    "100-duo": [
        { nombre:'Par de bafles 12"', cantidad:1 },
        { nombre:'Par de bafles 15"', cantidad:1 },
        { nombre:'Potencia Para los 4 bafles ', cantidad:1 },
        { nombre:'Consola Digital 8 CH', cantidad:1 },
        { nombre:'Micrófono de mano con cable', cantidad:2 },
        { nombre:'Pie de micrófono', cantidad:2 }
    ],

    "100-trio": [
        { nombre:'Par de bafles 12"', cantidad:1 },
        { nombre:'Par de bafles 15"', cantidad:1 },
        { nombre:'Potencia Para los 4 bafles ', cantidad:1 },
        { nombre:'Consola Digital 8 CH', cantidad:1 },
        { nombre:'Micrófono de mano con cable', cantidad:3 },
        { nombre:'Pie de micrófono', cantidad:3 }
    ]

};

let items = conceptosFijos.map(c => ({
    categoria: "CONCEPTOS FIJOS",
    nombre: c.nombre,
    precio: c.precio,
    cantidad: 1,
    fijo: true
}));


function render() {

lista.innerHTML = "";

let categoriaActual = "";

productos.forEach((producto, indice) => {

    // No mostrar los conceptos fijos en la lista de equipamiento
if (producto.fijo) {
    return;
}

    if(producto.categoria !== categoriaActual){

        categoriaActual = producto.categoria;

        lista.innerHTML += `
            <h3 style="
                margin-top:25px;
                margin-bottom:10px;
                color:#66b3ff;
                border-bottom:1px solid #444;
                padding-bottom:5px;
            ">
                ${categoriaActual}
            </h3>
        `;

    }

    const item = items.find(i => i.nombre === producto.nombre);
    const cantidad = item ? item.cantidad : 0;

    lista.innerHTML += `
        <div class="producto">

            <div>

                <strong>${producto.nombre}</strong><br>

                $${producto.precio.toLocaleString("es-AR")}

            </div>

<div class="controles">

    <button class="btn-cantidad" onclick="restar(${indice})">−</button>

    <span class="cantidad">${cantidad}</span>

    <button class="btn-cantidad" onclick="sumar(${indice})">+</button>

</div>

        </div>
    `;

});

    carrito.innerHTML="";

    let suma=0;

items.forEach(item => {

    const subtotal = item.precio * item.cantidad;

    suma += subtotal;

    let controles = "";

    if(!item.fijo){

        const indiceProducto = productos.findIndex(
            p => p.nombre === item.nombre
        );

        controles = `
            <div class="controles-resumen">

                <button class="btn-mini" onclick="restar(${indiceProducto})">−</button>

                <span class="cantidad-mini">${item.cantidad}</span>

                <button class="btn-mini" onclick="sumar(${indiceProducto})">+</button>

            </div>
        `;

    }

    carrito.innerHTML += `

    <tr>

        <td>${item.nombre}</td>

        <td>${controles}</td>

        <td>$${subtotal.toLocaleString("es-AR")}</td>

    </tr>

    `;

});

    total.textContent=suma.toLocaleString("es-AR");

}

function sumar(indice){

    const producto=productos[indice];

    const item=items.find(i=>i.nombre===producto.nombre);

    if(item){

        item.cantidad++;

    }else{

        items.push({

            ...producto,

            cantidad:1

        });

    }

    render();

}

function restar(indice){

    const producto = productos[indice];

    const item = items.find(i => i.nombre === producto.nombre);

    if(!item) return;

    // Si es un concepto fijo, nunca puede bajar de 1
    if(producto.fijo){

        if(item.cantidad > 1){
            item.cantidad--;
        }

    }else{

        item.cantidad--;

        if(item.cantidad <= 0){
            items = items.filter(i => i.nombre !== producto.nombre);
        }

    }



    render();

}


function generarWhatsApp(){

    const datos=document.querySelectorAll("input, textarea");

    const nombre=datos[0].value;
    const telefono=datos[1].value;
    const lugar=datos[2].value;
    const fecha=datos[3].value;
    const observaciones=datos[4].value;

    let texto=`*BUENOS AIRES SONIDO*%0A`;
    texto+=`Solicitud de Presupuesto%0A%0A`;

    if(nombre) texto+=`*Cliente:* ${nombre}%0A`;
    if(telefono) texto+=`*Teléfono:* ${telefono}%0A`;
    if(lugar) texto+=`*Lugar:* ${lugar}%0A`;
    if(fecha) texto+=`*Fecha:* ${fecha}%0A`;

    texto+=`%0A------------------------%0A`;

    let suma=0;

    items.forEach(item=>{

        const subtotal=item.precio*item.cantidad;

        suma+=subtotal;

  if(item.fijo){

    texto += `${item.nombre} - $${subtotal.toLocaleString("es-AR")}%0A`;

}else{

    texto += `${item.nombre} x${item.cantidad} - $${subtotal.toLocaleString("es-AR")}%0A`;

}

    });

    texto+=`------------------------%0A`;
    texto+=`*TOTAL:* $${suma.toLocaleString("es-AR")}%0A%0A`;

    if(observaciones){

        texto+=`*Observaciones:*%0A${observaciones}%0A%0A`;

    }

 

window.open("https://wa.me/5491154730988?text="+texto,"_blank");

}

render();
function limpiarTodo(){

    items = conceptosFijos.map(c => ({
        categoria: "CONCEPTOS FIJOS",
        nombre: c.nombre,
        precio: c.precio,
        cantidad: 1,
        fijo: true
    }));

    // Apagar el interruptor de Multitrack
    document.getElementById("chkMultitrack").checked = false;

    render();

}

    render();


// ===========================
// MULTITRACK
// ===========================

function toggleMultitrack(){

    const check = document.getElementById("chkMultitrack");

    if(check.checked){

        const producto = productos.find(p => p.nombre === "Multitrack");

        if(producto){

            items.push({

                ...producto,

                cantidad:1

            });

        }

    }else{

        items = items.filter(i => i.nombre !== "Multitrack");

    }

    render();

}

// ===========================
// CARGAR COMBO
// ===========================

function cargarCombo(nombreCombo){

    // Mantener únicamente los conceptos fijos
    items = items.filter(item => item.fijo);

    // Buscar el combo seleccionado
    const combo = combos[nombreCombo];

    if(!combo) return;

    // Agregar los productos del combo
    combo.forEach(productoCombo => {

        const producto = productos.find(p => p.nombre === productoCombo.nombre);

        if(producto){

            items.push({

                ...producto,

                cantidad: productoCombo.cantidad

            });

        }

    });

    render();

}
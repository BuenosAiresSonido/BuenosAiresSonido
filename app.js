const productos=[
{name:'Par de bafles 12"',precio:30000},
{name:'Par de bafles 15"',precio:30000},
{name:'Micrófono con cable',precio:5000},
{name:'Consola digital 8 canales',precio:40000}
];

const lista=document.getElementById('lista');
const carrito=document.getElementById('carrito');
const total=document.getElementById('total');
let items=[];

function render(){
lista.innerHTML='';
productos.forEach((p,i)=>{
 const d=document.createElement('div');
 d.className='producto';
 d.innerHTML=`<span>${p.name}<br><b>$${p.precio.toLocaleString()}</b></span>
 <button onclick="agregar(${i})">Agregar</button>`;
 lista.appendChild(d);
});

carrito.innerHTML='';
let t=0;
items.forEach(it=>{
 const s=it.precio*it.cantidad;
 t+=s;
 carrito.innerHTML+=`<tr><td>${it.name}</td><td>${it.cantidad}</td><td>$${s.toLocaleString()}</td></tr>`;
});
total.textContent=t.toLocaleString();
}

function agregar(i){
const p=productos[i];
const e=items.find(x=>x.name===p.name);
if(e)e.cantidad++;
else items.push({...p,cantidad:1});
render();
}
render();

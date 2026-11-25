const practicantes = [
  {
    "codigo": "E001",
    "nombre": "María Pérez",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 128,
    "estado": "Validado"
  },
  {
    "codigo": "E002",
    "nombre": "Carlos Ramos",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 96,
    "estado": "Pendiente"
  },
  {
    "codigo": "E003",
    "nombre": "Lucía Torres",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 80,
    "estado": "Pendiente"
  },
  {
    "codigo": "E004",
    "nombre": "José Flores",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 128,
    "estado": "Validado"
  },
  {
    "codigo": "E005",
    "nombre": "Ana García",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 64,
    "estado": "Pendiente"
  },
  {
    "codigo": "E006",
    "nombre": "Luis Castro",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 100,
    "estado": "Pendiente"
  },
  {
    "codigo": "E007",
    "nombre": "Rosa Díaz",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 128,
    "estado": "Validado"
  },
  {
    "codigo": "E008",
    "nombre": "Diego Rojas",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 72,
    "estado": "Pendiente"
  },
  {
    "codigo": "E009",
    "nombre": "Elena Ruiz",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 110,
    "estado": "Pendiente"
  },
  {
    "codigo": "E010",
    "nombre": "Miguel Soto",
    "programa": "Diseño y Programación Web",
    "empresa": "Empresa de ejemplo",
    "horas": 128,
    "estado": "Validado"
  }
];
let state = { estudiantes: practicantes.map(p=>({...p})), filtro:'Todos', busqueda:'' };
const cards=document.getElementById('cards');
function renderizar(){
 const lista=state.estudiantes.filter(p=>(state.filtro==='Todos'||p.estado===state.filtro)&&p.nombre.toLowerCase().includes(state.busqueda.toLowerCase()));
 cards.innerHTML=lista.map(p=>`<article class="bg-white rounded-xl shadow p-5"><p>${p.codigo}</p><h2 class="font-bold text-xl">${p.nombre}</h2><p>${p.programa}</p><p>${p.empresa}</p><p>Horas: ${p.horas}/128 (${Math.round(p.horas/128*100)}%)</p><div class="bg-slate-200 h-2 rounded-full my-3"><div class="bg-indigo-600 h-2 rounded-full" style="width:${Math.min(100,p.horas/128*100)}%"></div></div><span class="${p.estado==='Validado'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'} rounded-full px-3 py-1">${p.estado}</span><button class="block bg-[#C91414] hover:bg-red-800 text-white rounded-lg p-2 mt-4 disabled:opacity-50" onclick="validar('${p.codigo}')" ${p.estado==='Validado'?'disabled':''}>Validar</button></article>`).join('')||'No hay resultados';
 document.getElementById('contador').textContent=`Total: ${state.estudiantes.length} | Validados: ${state.estudiantes.filter(p=>p.estado==='Validado').length} | Pendientes: ${state.estudiantes.filter(p=>p.estado==='Pendiente').length}`;
}
function validar(codigo){state.estudiantes=state.estudiantes.map(p=>p.codigo===codigo?{...p,estado:'Validado'}:p);renderizar();}
document.getElementById('buscar').oninput=e=>{state.busqueda=e.target.value;renderizar()};
document.getElementById('filtro').onchange=e=>{state.filtro=e.target.value;renderizar()};
renderizar();
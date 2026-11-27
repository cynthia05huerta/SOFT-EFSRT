
// ======================================
// ACTIVIDAD 5: ARREGLO DE 10 PRACTICANTES
// ======================================

const practicantes = [
    {
        codigo: "E001",
        nombre: "María García López",
        programa: "Diseño y Programación Web",
        empresa: "Innovación Digital",
        horas: 96,
        estado: "Pendiente"
    },
    {
        codigo: "E002",
        nombre: "Carlos Mendoza Ruiz",
        programa: "Diseño y Programación Web",
        empresa: "Soluciones Web",
        horas: 128,
        estado: "Validado"
    },
    {
        codigo: "E003",
        nombre: "Ana Torres Pérez",
        programa: "Diseño y Programación Web",
        empresa: "Tecnología Creativa",
        horas: 80,
        estado: "Pendiente"
    },
    {
        codigo: "E004",
        nombre: "Luis Ramos Flores",
        programa: "Diseño y Programación Web",
        empresa: "Digital Systems",
        horas: 128,
        estado: "Validado"
    },
    {
        codigo: "E005",
        nombre: "Lucía Castro Díaz",
        programa: "Diseño y Programación Web",
        empresa: "Web Studio",
        horas: 64,
        estado: "Pendiente"
    },
    {
        codigo: "E006",
        nombre: "José Vargas Rojas",
        programa: "Diseño y Programación Web",
        empresa: "Innova Tech",
        horas: 112,
        estado: "Pendiente"
    },
    {
        codigo: "E007",
        nombre: "Andrea Morales Soto",
        programa: "Diseño y Programación Web",
        empresa: "Diseño Digital",
        horas: 128,
        estado: "Validado"
    },
    {
        codigo: "E008",
        nombre: "Diego Sánchez León",
        programa: "Diseño y Programación Web",
        empresa: "Sistemas del Centro",
        horas: 88,
        estado: "Pendiente"
    },
    {
        codigo: "E009",
        nombre: "Valeria Cruz Medina",
        programa: "Diseño y Programación Web",
        empresa: "Creative Web",
        horas: 128,
        estado: "Validado"
    },
    {
        codigo: "E010",
        nombre: "Pedro Salazar Gómez",
        programa: "Diseño y Programación Web",
        empresa: "Servicios Informáticos",
        horas: 48,
        estado: "Pendiente"
    }
];

// ======================================
// ACTIVIDAD 9: VARIABLES DE ESTADO
// ======================================

let estadoSeleccionado = "Todos";
let textoBusqueda = "";

// ======================================
// CAPTURAR ELEMENTOS DEL HTML
// ======================================

const contenedor = document.getElementById("contenedor");
const total = document.getElementById("total");
const validados = document.getElementById("validados");
const pendientes = document.getElementById("pendientes");
const filtroEstado = document.getElementById("filtroEstado");
const buscador = document.getElementById("buscador");
const resultados = document.getElementById("resultados");
const mensaje = document.getElementById("mensaje");

// ======================================
// ACTUALIZAR CONTADORES
// ======================================

function actualizarContadores() {

    total.textContent = practicantes.length;

    validados.textContent = practicantes.filter(
        estudiante => estudiante.estado === "Validado"
    ).length;

    pendientes.textContent = practicantes.filter(
        estudiante => estudiante.estado === "Pendiente"
    ).length;

}

// ======================================
// NORMALIZAR TEXTO PARA EL BUSCADOR
// ======================================

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}

// ======================================
// FILTRAR PRACTICANTES
// ======================================

function filtrarPracticantes() {

    return practicantes.filter(estudiante => {

        const coincideEstado =
            estadoSeleccionado === "Todos" ||
            estudiante.estado === estadoSeleccionado;

        const coincideBusqueda =
            normalizarTexto(estudiante.nombre)
                .includes(normalizarTexto(textoBusqueda)) ||
            normalizarTexto(estudiante.codigo)
                .includes(normalizarTexto(textoBusqueda));

        return coincideEstado && coincideBusqueda;

    });

}

// ======================================
// VALIDAR FÓLDER SIN RECARGAR LA PÁGINA
// ======================================

function validarPracticante(codigo) {

    const estudiante = practicantes.find(
        persona => persona.codigo === codigo
    );

    if (estudiante && estudiante.estado === "Pendiente") {

        // CAMBIO DE ESTADO
        estudiante.estado = "Validado";

        // ACTUALIZAR INTERFAZ
        renderizarPracticantes();

        // MOSTRAR MENSAJE
        mensaje.textContent =
            "El fólder de " + estudiante.nombre +
            " fue validado correctamente.";

        mensaje.classList.remove("hidden");

    }

}

// ======================================
// FUNCIÓN PARA GENERAR LAS TARJETAS
// ======================================

function renderizarPracticantes() {

    actualizarContadores();

    const estudiantesFiltrados = filtrarPracticantes();

    resultados.textContent =
        "Mostrando " + estudiantesFiltrados.length +
        " de " + practicantes.length + " practicantes";

    // MENSAJE SI NO HAY RESULTADOS
    if (estudiantesFiltrados.length === 0) {

        contenedor.innerHTML = `
            <div class="col-span-full bg-white border border-slate-200 rounded-xl p-10 text-center">

                <h3 class="font-bold text-indigo-950 text-lg">
                    No se encontraron practicantes
                </h3>

                <p class="text-slate-500 text-sm mt-2">
                    Intente cambiar el filtro o el texto de búsqueda.
                </p>

            </div>
        `;

        return;

    }

    // GENERACIÓN DINÁMICA CON MAP
    contenedor.innerHTML = estudiantesFiltrados.map(estudiante => {

        const porcentaje = Math.min(
            Math.round((estudiante.horas / 128) * 100),
            100
        );

        const estaValidado =
            estudiante.estado === "Validado";

        const colorEstado = estaValidado
            ? "bg-green-100 text-green-800"
            : "bg-amber-100 text-amber-800";

        const iniciales = estudiante.nombre
            .split(" ")
            .slice(0, 2)
            .map(palabra => palabra[0])
            .join("");

        return `
            <article class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition">

                <div class="h-2 bg-[#C91414]"></div>

                <div class="p-6">

                    <div class="flex items-center gap-4 mb-5">

                        <div class="w-14 h-14 shrink-0 rounded-full bg-indigo-950 text-white flex items-center justify-center font-bold text-xl">
                            ${iniciales}
                        </div>

                        <div>
                            <p class="text-xs text-slate-500">
                                Código: ${estudiante.codigo}
                            </p>

                            <h2 class="font-bold text-lg text-indigo-950">
                                ${estudiante.nombre}
                            </h2>
                        </div>

                    </div>

                    <div class="space-y-4">

                        <div>
                            <p class="text-xs text-slate-500">
                                Programa de estudios
                            </p>

                            <p class="text-sm font-medium">
                                ${estudiante.programa}
                            </p>
                        </div>

                        <div>
                            <p class="text-xs text-slate-500">
                                Empresa
                            </p>

                            <p class="text-sm font-medium">
                                ${estudiante.empresa}
                            </p>
                        </div>

                        <!-- BARRA DE PROGRESO -->
                        <div class="border-t border-slate-200 pt-4">

                            <div class="flex justify-between text-sm mb-2">

                                <span class="text-slate-500">
                                    Horas acumuladas
                                </span>

                                <span class="font-bold text-indigo-950">
                                    ${estudiante.horas}/128 h
                                </span>

                            </div>

                            <div class="w-full bg-slate-200 h-3 rounded-full overflow-hidden">

                                <div class="bg-emerald-500 h-3 rounded-full"
                                     style="width: ${porcentaje}%">
                                </div>

                            </div>

                            <p class="text-right text-xs text-emerald-600 font-bold mt-2">
                                ${porcentaje}% completado
                            </p>

                        </div>

                        <!-- ESTADO DEL FÓLDER -->
                        <div class="flex justify-between items-center border-t border-slate-200 pt-4">

                            <span class="text-sm text-slate-500">
                                Estado del fólder
                            </span>

                            <span class="${colorEstado} px-3 py-1 rounded-full text-xs font-semibold">
                                ${estudiante.estado}
                            </span>

                        </div>

                        <!-- BOTÓN VALIDAR -->
                        <button
                            type="button"
                            data-codigo="${estudiante.codigo}"
                            ${estaValidado ? "disabled" : ""}
                            class="w-full py-3 rounded-lg text-sm font-semibold transition
                            ${estaValidado
                                ? "bg-emerald-50 text-emerald-700 cursor-not-allowed"
                                : "bg-[#C91414] text-white hover:bg-red-800"}">

                            ${estaValidado
                                ? "✓ Fólder validado"
                                : "Validar fólder"}

                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");

}

// ======================================
// EVENTO: FILTRO POR ESTADO
// ======================================

filtroEstado.addEventListener("change", function () {

    estadoSeleccionado = this.value;

    mensaje.classList.add("hidden");

    renderizarPracticantes();

});

// ======================================
// EVENTO: BUSCADOR
// ======================================

buscador.addEventListener("input", function () {

    textoBusqueda = this.value;

    mensaje.classList.add("hidden");

    renderizarPracticantes();

});

// ======================================
// EVENTO: BOTÓN VALIDAR
// ======================================

contenedor.addEventListener("click", function (evento) {

    const boton = evento.target.closest("button[data-codigo]");

    if (boton && !boton.disabled) {

        validarPracticante(boton.dataset.codigo);

    }

});

// ======================================
// EJECUTAR LA FUNCIÓN INICIAL
// ======================================

renderizarPracticantes();

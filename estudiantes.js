
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
let codigoEdicion = null;

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

// ELEMENTOS DEL MODAL

const modal = document.getElementById("modalPracticante");
const formulario = document.getElementById("formPracticante");
const tituloModal = document.getElementById("tituloModal");

const btnAgregar = document.getElementById("btnAgregar");
const btnCancelar = document.getElementById("btnCancelar");
const btnCerrar = document.getElementById("cerrarModal");
const btnGuardar = document.getElementById("btnGuardar");

const campoCodigo = document.getElementById("codigo");
const campoNombre = document.getElementById("nombre");
const campoPrograma = document.getElementById("programa");
const campoEmpresa = document.getElementById("empresa");
const campoHoras = document.getElementById("horas");
const campoEstado = document.getElementById("estado");

const errorFormulario = document.getElementById("errorFormulario");

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
// NORMALIZAR TEXTO
// ======================================

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}

// ======================================
// PROTEGER TEXTO INGRESADO EN FORMULARIOS
// ======================================

function escaparHTML(texto) {

    return String(texto).replace(/[&<>"']/g, caracter => {

        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return caracteres[caracter];

    });

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
// MOSTRAR MENSAJES
// ======================================

function mostrarMensaje(texto, tipo = "exito") {

    mensaje.textContent = texto;

    mensaje.className = "border rounded-xl p-4 mb-6";

    if (tipo === "exito") {

        mensaje.classList.add(
            "bg-emerald-50",
            "border-emerald-200",
            "text-emerald-800"
        );

    } else if (tipo === "pendiente") {

        mensaje.classList.add(
            "bg-amber-50",
            "border-amber-200",
            "text-amber-800"
        );

    } else {

        mensaje.classList.add(
            "bg-red-50",
            "border-red-200",
            "text-red-800"
        );

    }

}

// ======================================
// CAMBIAR ESTADO SIN RECARGAR
// ======================================

function cambiarEstado(codigo) {

    const estudiante = practicantes.find(
        persona => persona.codigo === codigo
    );

    if (!estudiante) return;

    // CAMBIO DE VARIABLE DE ESTADO

    if (estudiante.estado === "Pendiente") {

        estudiante.estado = "Validado";

        mostrarMensaje(
            "El fólder de " + estudiante.nombre +
            " fue validado correctamente."
        );

    } else {

        estudiante.estado = "Pendiente";

        mostrarMensaje(
            "El fólder de " + estudiante.nombre +
            " regresó al estado pendiente.",
            "pendiente"
        );

    }

    // ACTUALIZAR TARJETAS Y CONTADORES

    renderizarPracticantes();

}

// ======================================
// GENERAR CÓDIGO AUTOMÁTICO
// ======================================

function generarCodigo() {

    const numeros = practicantes.map(estudiante => {

        const coincidencia = estudiante.codigo.match(/^E(\d+)$/i);

        return coincidencia ? Number(coincidencia[1]) : 0;

    });

    const siguiente = Math.max(0, ...numeros) + 1;

    return "E" + String(siguiente).padStart(3, "0");

}

// ======================================
// ABRIR FORMULARIO PARA AGREGAR
// ======================================

function abrirFormularioAgregar() {

    codigoEdicion = null;

    formulario.reset();

    tituloModal.textContent = "Agregar practicante";

    btnGuardar.textContent = "Guardar practicante";

    campoCodigo.value = generarCodigo();
    campoNombre.value = "";
    campoPrograma.value = "Diseño y Programación Web";
    campoEmpresa.value = "";
    campoHoras.value = 0;
    campoEstado.value = "Pendiente";

    errorFormulario.classList.add("hidden");

    modal.showModal();

    campoNombre.focus();

}

// ======================================
// ABRIR FORMULARIO PARA EDITAR
// ======================================

function editarPracticante(codigo) {

    const estudiante = practicantes.find(
        persona => persona.codigo === codigo
    );

    if (!estudiante) return;

    codigoEdicion = codigo;

    tituloModal.textContent = "Editar practicante";

    btnGuardar.textContent = "Guardar cambios";

    campoCodigo.value = estudiante.codigo;
    campoNombre.value = estudiante.nombre;
    campoPrograma.value = estudiante.programa;
    campoEmpresa.value = estudiante.empresa;
    campoHoras.value = estudiante.horas;
    campoEstado.value = estudiante.estado;

    errorFormulario.classList.add("hidden");

    modal.showModal();

}

// ======================================
// CERRAR FORMULARIO
// ======================================

function cerrarFormulario() {

    modal.close();

    formulario.reset();

    codigoEdicion = null;

    errorFormulario.classList.add("hidden");

}

// ======================================
// MOSTRAR ERRORES DEL FORMULARIO
// ======================================

function mostrarErrorFormulario(texto) {

    errorFormulario.textContent = texto;

    errorFormulario.classList.remove("hidden");

}

// ======================================
// GUARDAR O ACTUALIZAR PRACTICANTE
// ======================================

formulario.addEventListener("submit", function (evento) {

    // EVITAR QUE LA PÁGINA SE RECARGUE

    evento.preventDefault();

    const codigo = campoCodigo.value.trim().toUpperCase();
    const nombre = campoNombre.value.trim();
    const programa = campoPrograma.value.trim();
    const empresa = campoEmpresa.value.trim();
    const horas = Number(campoHoras.value);
    const estado = campoEstado.value;

    // VALIDAR CAMPOS VACÍOS

    if (!codigo || !nombre || !programa || !empresa) {

        mostrarErrorFormulario(
            "Debe completar todos los campos."
        );

        return;

    }

    // VALIDAR FORMATO DEL CÓDIGO

    if (!/^[A-Z0-9-]+$/.test(codigo)) {

        mostrarErrorFormulario(
            "El código solo debe contener letras, números o guiones."
        );

        return;

    }

    // VALIDAR HORAS

    if (
        campoHoras.value.trim() === "" ||
        !Number.isInteger(horas) ||
        horas < 0 ||
        horas > 128
    ) {

        mostrarErrorFormulario(
            "Las horas deben ser un número entero entre 0 y 128."
        );

        return;

    }

    // VALIDAR ESTADO

    if (!["Pendiente", "Validado"].includes(estado)) {

        mostrarErrorFormulario("Seleccione un estado válido.");

        return;

    }

    // EVITAR CÓDIGOS DUPLICADOS

    const codigoExiste = practicantes.some(estudiante =>

        estudiante.codigo === codigo &&
        estudiante.codigo !== codigoEdicion

    );

    if (codigoExiste) {

        mostrarErrorFormulario(
            "Ya existe un practicante con ese código."
        );

        return;

    }

    const datos = {
        codigo,
        nombre,
        programa,
        empresa,
        horas,
        estado
    };

    // EDITAR PRACTICANTE EXISTENTE

    if (codigoEdicion !== null) {

        const indice = practicantes.findIndex(
            estudiante => estudiante.codigo === codigoEdicion
        );

        if (indice === -1) {

            mostrarErrorFormulario(
                "No se encontró el practicante."
            );

            return;

        }

        practicantes[indice] = datos;

        mostrarMensaje(
            "Los datos de " + nombre +
            " fueron actualizados correctamente."
        );

    } else {

        // AGREGAR NUEVO PRACTICANTE

        practicantes.push(datos);

        mostrarMensaje(
            "El practicante " + nombre +
            " fue registrado correctamente."
        );

    }

    // RESTABLECER FILTROS PARA MOSTRAR EL REGISTRO

    estadoSeleccionado = "Todos";
    textoBusqueda = "";

    filtroEstado.value = "Todos";
    buscador.value = "";

    cerrarFormulario();

    // ACTUALIZAR INTERFAZ SIN RECARGAR

    renderizarPracticantes();

});

// ======================================
// ELIMINAR PRACTICANTE
// ======================================

function eliminarPracticante(codigo) {

    const indice = practicantes.findIndex(
        estudiante => estudiante.codigo === codigo
    );

    if (indice === -1) return;

    const estudiante = practicantes[indice];

    const confirmar = window.confirm(
        "¿Está seguro de eliminar a " +
        estudiante.nombre + "?"
    );

    if (!confirmar) return;

    // ELIMINAR DEL ARREGLO

    practicantes.splice(indice, 1);

    mostrarMensaje(
        "El practicante " + estudiante.nombre +
        " fue eliminado correctamente.",
        "eliminado"
    );

    renderizarPracticantes();

}

// ======================================
// GENERAR TARJETAS DINÁMICAMENTE
// ======================================

function renderizarPracticantes() {

    actualizarContadores();

    const estudiantesFiltrados = filtrarPracticantes();

    resultados.textContent =
        "Mostrando " + estudiantesFiltrados.length +
        " de " + practicantes.length + " practicantes";

    // SI NO EXISTEN RESULTADOS

    if (estudiantesFiltrados.length === 0) {

        contenedor.innerHTML = `
            <div class="col-span-full bg-white border border-slate-200 rounded-xl p-10 text-center">

                <h3 class="font-bold text-indigo-950 text-lg">
                    No se encontraron practicantes
                </h3>

                <p class="text-slate-500 text-sm mt-2">
                    Intente cambiar el filtro o agregar un practicante.
                </p>

            </div>
        `;

        return;

    }

    // GENERACIÓN DE TARJETAS CON MAP

    contenedor.innerHTML = estudiantesFiltrados.map(estudiante => {

        // CALCULAR PORCENTAJE

        const porcentaje = Math.max(
            0,
            Math.min(
                Math.round((estudiante.horas / 128) * 100),
                100
            )
        );

        const estaValidado =
            estudiante.estado === "Validado";

        // COLOR DE LA ETIQUETA

        const colorEstado = estaValidado
            ? "bg-green-100 text-green-800"
            : "bg-amber-100 text-amber-800";

        // INICIALES DEL ESTUDIANTE

        const iniciales = estudiante.nombre
            .split(/\s+/)
            .slice(0, 2)
            .map(palabra => palabra[0])
            .join("")
            .toUpperCase();

        // PROTEGER DATOS DE TEXTO

        const codigoSeguro = escaparHTML(estudiante.codigo);
        const nombreSeguro = escaparHTML(estudiante.nombre);
        const programaSeguro = escaparHTML(estudiante.programa);
        const empresaSegura = escaparHTML(estudiante.empresa);

        // PLANTILLA DE LA TARJETA

        return `
            <article class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition">

                <div class="h-2 bg-[#C91414]"></div>

                <div class="p-6">

                    <!-- DATOS PERSONALES -->

                    <div class="flex items-center gap-4 mb-5">

                        <div class="w-14 h-14 shrink-0 rounded-full bg-indigo-950 text-white flex items-center justify-center font-bold text-xl">
                            ${escaparHTML(iniciales)}
                        </div>

                        <div>

                            <p class="text-xs text-slate-500">
                                Código: ${codigoSeguro}
                            </p>

                            <h2 class="font-bold text-lg text-indigo-950 break-words">
                                ${nombreSeguro}
                            </h2>

                        </div>

                    </div>

                    <div class="space-y-4">

                        <!-- PROGRAMA DE ESTUDIOS -->

                        <div>

                            <p class="text-xs text-slate-500">
                                Programa de estudios
                            </p>

                            <p class="text-sm font-medium break-words">
                                ${programaSeguro}
                            </p>

                        </div>

                        <!-- EMPRESA -->

                        <div>

                            <p class="text-xs text-slate-500">
                                Empresa
                            </p>

                            <p class="text-sm font-medium break-words">
                                ${empresaSegura}
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

                            <div class="w-full bg-slate-200 h-3 rounded-full overflow-hidden"
                                 role="progressbar"
                                 aria-label="Progreso de horas"
                                 aria-valuenow="${porcentaje}"
                                 aria-valuemin="0"
                                 aria-valuemax="100">

                                <div class="bg-emerald-500 h-3 rounded-full transition-all"
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

                        <!-- BOTÓN CAMBIAR ESTADO -->

                        <button
                            type="button"
                            data-accion="estado"
                            data-codigo="${codigoSeguro}"
                            class="w-full py-3 rounded-lg text-sm font-semibold transition
                            ${estaValidado
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                : "bg-[#C91414] text-white hover:bg-red-800"}">

                            ${estaValidado
                                ? "Marcar como pendiente"
                                : "Validar fólder"}

                        </button>

                        <!-- BOTONES EDITAR Y ELIMINAR -->

                        <div class="grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                data-accion="editar"
                                data-codigo="${codigoSeguro}"
                                class="border border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 rounded-lg py-2 text-sm font-semibold transition">

                                Editar

                            </button>

                            <button
                                type="button"
                                data-accion="eliminar"
                                data-codigo="${codigoSeguro}"
                                class="border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg py-2 text-sm font-semibold transition">

                                Eliminar

                            </button>

                        </div>

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
// EVENTOS DE LAS TARJETAS
// ======================================

contenedor.addEventListener("click", function (evento) {

    const boton = evento.target.closest(
        "button[data-accion][data-codigo]"
    );

    if (!boton) return;

    const codigo = boton.dataset.codigo;
    const accion = boton.dataset.accion;

    switch (accion) {

        case "estado":
            cambiarEstado(codigo);
            break;

        case "editar":
            editarPracticante(codigo);
            break;

        case "eliminar":
            eliminarPracticante(codigo);
            break;

    }

});

// ======================================
// EVENTOS DEL MODAL
// ======================================

btnAgregar.addEventListener(
    "click",
    abrirFormularioAgregar
);

btnCancelar.addEventListener(
    "click",
    cerrarFormulario
);

btnCerrar.addEventListener(
    "click",
    cerrarFormulario
);

// ======================================
// EJECUTAR FUNCIÓN INICIAL
// ======================================

renderizarPracticantes();

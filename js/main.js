let productos = []
fetch("./db/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos (productos)
    })

const contenedorProductos = document.getElementById("contenedor-productos")
const botonCategoria = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.getElementById("titulo-principal")
let botonAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.getElementById("numerito")

function cargarProductos (productosElegidos) {
    contenedorProductos.innerHTML = ""  

    productosElegidos.forEach(producto => {
        const card = document.createElement("article")
        card.classList.add("cards__card")
        card.innerHTML = `
            <div class="card__img">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="card__descripcion">
                <h2 class="descripcion__nombre">${producto.nombre}</h2>
                <p class="descripcion__precio">S/. ${producto.precio.toFixed(2)}</p>
            </div>
            <button id=${producto.id} class="producto-agregar">
                <i class="ri-shopping-bag-fill"></i>
            Añadir al Carrito
            </button>
            `
        contenedorProductos.appendChild(card)
    })
    actualizarbotonAgregar ()
}


botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonCategoria.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")

        const categoriaSeleccionada = e.currentTarget.id
        if (categoriaSeleccionada === "Todos") { 
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos);
        }else {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaSeleccionada)
            tituloPrincipal.innerText = productosFiltrados[0].categoria.nombre
            cargarProductos(productosFiltrados);
        }
    })
})

function actualizarbotonAgregar ( ) {
    botonAgregar = document.querySelectorAll(".producto-agregar")
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    })
}

let productosCarrito = []
const productosCarritoLS = localStorage.getItem("productos-carrito")
if (productosCarritoLS) {
    try {
        const nuevoLS = JSON.parse(productosCarritoLS);
        if (Array.isArray(nuevoLS)) {
            productosCarrito = nuevoLS;
        } else {
            console.warn("El valor ingresado al localStorage no es un array");
            productosCarrito = []
        }
    } catch (error) {
        console.error("Error al ingresar al localStorage:", error)
        productosCarrito = []
    }
}

function agregarCarrito (e) {
    Toastify({
        text: "Producto agregado",
        duration: 1500,
        close: false,
        gravity: "top", 
        position: "left", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right,var(--ligth-brown),var(--peach))",
            color:"  #dd1313 ",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: "18px"
        },
        offset: {
            x: '55px', 
            y: '60px' 
        },
        onClick: function(){} 
    }).showToast();

    const idBoton = Number(e.currentTarget.id) 
    const productoAgregado = productos.find(producto => producto.id === idBoton)
    const repeat = productosCarrito.some(repeatProducto => repeatProducto.id === idBoton)
    if(repeat){
        const index = productosCarrito.findIndex(producto => producto.id === idBoton)
        productosCarrito[index].cantidad++
        
    } else {
        productoAgregado.cantidad = 1
        productosCarrito.push(productoAgregado)
    }
    actualizarNumerito ()
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito))
}

function actualizarNumerito () {
    let nuevoNumerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito
}

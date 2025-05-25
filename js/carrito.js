/*Almacenar datos*/
let productosCarrito = JSON.parse(localStorage.getItem("productos-carrito")) || []

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#cart-productos")
const contenedorCarritoFooter = document.querySelector("#carrito-footers")

let botonEliminar = document.querySelectorAll(".cart-producto-eliminar")
const nuevoTotal = document.getElementById("total")

function cargarCarrito () {
    if (productosCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.remove("disabled")
    contenedorCarritoFooter.classList.remove("disabled")
    
    contenedorCarritoProductos.innerHTML = ""

    productosCarrito.forEach(producto => {
        const card =document.createElement("section")
        card.classList.add("cart-producto")
        card.innerHTML = `
            <div class="cart-producto-titulo">
                <span>Nombre</span>
                <h3>${producto.nombre}</h3>
            </div>
            <div class="cart-producto-precio">
                <span>Precio Unitario</span>
                <p>S/.${producto.precio.toFixed(2)}</p>
            </div>
            <div class="cart-producto-imagen" > 
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="cart-producto-cantidad">
                <div class="restar"> <i class="ri-indeterminate-circle-fill restar"></i> </div>
                <span>Cantidad</span>
                <p>${producto.cantidad}</p>
                <div class="sumar"> <i class="ri-add-circle-fill"></i> </div>
            </div>
            <div class="cart-producto-subtotal">
                <span>Subtotal</span>
                <p>S/.${(producto.precio * producto.cantidad).toFixed(2)}</p>
            </div>
            <button class="cart-producto-eliminar" id="${producto.id}">
                <i class="ri-delete-bin-6-line"></i>
            </button>
        `
        contenedorCarritoProductos.appendChild(card)

        let restar = card.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (producto.cantidad !==1) {
                Toastify({
                    text: "Disminución en 1 unidad",
                    duration: 1500,
                    close: false,
                    gravity: "top", 
                    position: "center", 
                    stopOnFocus: true, 
                    style: {
                        background: "linear-gradient(to right,var(--ligth-brown),var(--peach))",
                        color:"  #dd1313 ",
                        borderRadius: "2rem",
                        fontSize: "18px"
                    },
                    offset: {
                        x: '55px', 
                        y: '60px' 
                    },
                    onClick: function(){} 
                }).showToast();
                producto.cantidad--
            }
            cargarCarrito () 
        })

        let sumar = card.querySelector(".sumar")
        sumar.addEventListener("click", () => {
                            Toastify({
                    text: "Aumento en 1 unidad",
                    duration: 1500,
                    close: false,
                    gravity: "bottom", 
                    position: "center", 
                    stopOnFocus: true, 
                    style: {
                        background: "linear-gradient(to right,var(--ligth-brown),var(--peach))",
                        color:"  #dd1313 ",
                        borderRadius: "2rem",
                        fontSize: "18px"
                    },
                    offset: {
                        x: '55px', 
                        y: '60px' 
                    },
                    onClick: function(){} 
                }).showToast();
            producto.cantidad++
            cargarCarrito () 
        })
    })

    contenedorCarritoFooter.innerHTML = ""
    
    const izquierda = document.createElement ("section")
    izquierda.classList.add("carrito-footer")
    izquierda.innerHTML = `
                <div class="carrito-footer-izq">
                    <button id="carrito-footer-vaciar" class="carrito-footer-vaciar">
                        Vaciar carrito
                    </button>
                </div>
                
    `
    contenedorCarritoFooter.appendChild(izquierda)

    const derecha = document.createElement ("section")
    derecha.classList.add("carrito-footer")
    const total = actualizarTotal ()
    derecha.innerHTML = `
                <div class="carrito-footer-der">
                    <div class="carrito-footer-total">
                        <p class="total">Total a pagar: S/. ${total}</p>
                    </div>
                </div>
    `
    contenedorCarritoFooter.appendChild(derecha)

    document.querySelector("#carrito-footer-vaciar").addEventListener("click", () => {
    vaciarCarrito();
    })
    } else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoFooter.classList.add("disabled")
    }
    actualizarbotonEliminar ( )
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito))
}
cargarCarrito ()

function actualizarbotonEliminar ( ) {
    botonEliminar = document.querySelectorAll(".cart-producto-eliminar")
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito)
    })
}

function eliminarCarrito (e) {
        Toastify({
        text: "Producto eliminado",
        duration: 1500,
        close: false,
        gravity: "top", 
        position: "right", 
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
    const index = productosCarrito.findIndex(producto => producto.id === idBoton)
    productosCarrito.splice(index,1)
    cargarCarrito ()
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito))
}

function actualizarTotal () {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    return totalCalculado.toFixed(2)
}

function vaciarCarrito () {
    productosCarrito.length = 0
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito))
    cargarCarrito ()
}

localStorage.setItem("contenedorCarritoFooter", JSON.stringify(contenedorCarritoFooter))



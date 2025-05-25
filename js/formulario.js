const contenido = document.getElementById("contenido-principal")
const productosCarrito = JSON.parse(localStorage.getItem("productos-carrito")) || []
const { subtotal, envio, totalFinal } = totales(productosCarrito)
    const primero =document.createElement("section")
    primero.classList.add("formulario")
    const total = calcularTotal(productosCarrito)
    primero.innerHTML = `
        <div class="facturacion">
            <h2>Detalles de facturación</h2>
            <form action="">
                <div>
                    <label>Nombre(s) *</label>
                    <input type="text" placeholder="Nombre(s)">
                </div>
                <div>
                    <label>Apellido(s) *</label>
                    <input type="text" placeholder="Apellido(s)">
                </div>
                <div>
                    <label>DNI *</label>
                    <input type="tel" placeholder="DNI" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                </div>
                <div>
                    <label>Número de teléfono *</label>
                    <input type="tel" placeholder="Número de teléfono" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                </div>
                <div>
                    <label>Correo electrónico *</label>
                    <input type="text" placeholder="Correo electrónico">
                </div>
                <div>
                    <label>Dirección de entrega *</label>
                    <input type="text" placeholder="Dirección de entrega">
                </div>
            </form>
        </div>
        <div class="pago">
            <h2>Método de pago</h2>
            <ul>
                <li>
                    <input type="radio" name="pay-option" id="cc">
                    <label for="cc"><i class="ri-bank-card-line"></i></label>
                    <div>Tarjeta (débito o crédito)</div>
                </li>
                <li>
                    <input type="radio" name="pay-option" id="bd">
                    <label for="bd"><i class="ri-paypal-line"></i></label>
                    <div>Billetera digital</div>
                </li>
                <li>
                    <input type="radio" name="pay-option" id="pe">
                    <label for="pe"><i class="ri-hand-coin-line"></i></label>
                    <div>Pago efectivo</div>
                </li>
            </ul>
            <div>
                <div class="pago-izq">
                    <div>
                        <span>Subtotal</span>
                        <span>S/. ${subtotal}</span>
                    </div>
                    <div>
                        <span>Envío</span>
                        <span>S/. ${envio}</span>
                    </div>
                    <div>
                        <p class="total">Total: S/. ${totalFinal}</p>
                    </div>
                </div>
            </div>
            <button class="verCompra" id="verCompra">Finalizar compra</button>
        </div>
    `
    contenido.appendChild(primero)

const verCompra = document.getElementById("verCompra")
const modalContainer = document.getElementById("modal-container")
const contenidoPrincipal = document.getElementById("contenido-principal")
const nuevoPedido = document.getElementById("nuevoPedido")

verCompra.addEventListener("click", () => {
    
    modalContainer.classList.remove("hidden");
    contenidoPrincipal.classList.add("blur")

    modalContainer.innerHTML = "" 

    const productosCarrito = JSON.parse(localStorage.getItem("productos-carrito")) || []

    const modalHeader = document.createElement("section")
    modalHeader.classList.add("modal-header")
    modalHeader.innerHTML = `
        <h1>Pedido exitoso</h1>
        <div>Muchas gracias por su compra <i class="ri-user-smile-fill"></i></div>
        `
    modalContainer.appendChild(modalHeader)

    productosCarrito.forEach(producto => { 
    const pedidoRealizado = document.createElement("section")
    pedidoRealizado.classList.add("cart-producto")
    pedidoRealizado.innerHTML = `
        <div class="cart-producto-imagen" > 
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div>
        <div class="cart-producto-titulo">
            <h3>${producto.nombre}</h3>
        </div>
        <div class="cart-producto-cantidad">
            <p>${producto.cantidad} x S/.${producto.precio.toFixed(2)}</p>
        </div>
        </div>
        <div class="cart-producto-subtotal">
            <span>Subtotal</span>
            <p>S/.${(producto.precio * producto.cantidad).toFixed(2)}</p>
        </div>
        `
    modalContainer.appendChild(pedidoRealizado)
})

    const modalFooter = document.createElement("section")
    modalFooter.classList.add("modal-footer")

    const {envio, totalFinal}= totales(productosCarrito)
    modalFooter.innerHTML = `
    <span class="total">Envío: S/. ${envio}</span>
        <p class="total">Total: S/. ${totalFinal}</p>
        
        <a href="../index.html" class="verCompra" id="nuevoPedido">Realizar pedido Nuevo</a>
        `
    modalContainer.appendChild(modalFooter)
    const borrarPedido = document.getElementById("nuevoPedido")
    borrarPedido.addEventListener("click", () => {
    modalContainer.innerHTML = ""; 
    modalContainer.classList.add("hidden")
})
})

function totales (productos, costoEnvio = 10.00) {
    const subtotal = parseFloat(calcularTotal(productos))
    const totalFinal = (subtotal + costoEnvio).toFixed(2)
    return {
        subtotal: subtotal.toFixed(2),
        envio: costoEnvio.toFixed(2),
        totalFinal
    }
}

function calcularTotal(productos) {
    const nuevoTotal = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
    return nuevoTotal.toFixed(2);
}

nuevoPedido.addEventListener("click", () => {
    modalContainer.classList.add("hidden")
    contenidoPrincipal.classList.remove("blur")
})

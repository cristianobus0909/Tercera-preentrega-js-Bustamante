const pintarCarrito = ()=>{
    carritoCompra.innerHTML = "";
    carritoCompra.style.display = "flex"
    //creamos el header del carrito <div class="modal">mHeader</div>
    const mHeader = document.createElement("div");
    mHeader.className = "modal";
    mHeader.innerHTML = `
        <h1 class="modalTitulo">Mi Carrito </h1>
    `;
//le decimos al <div>carritoCompra padre que tiene un <div>mHeader hijo
    carritoCompra.appendChild(mHeader);
//creamos un h2 que va a contener un texto "X" como boton de nuestro carrito
    const cerrarCarrito = document.createElement("h2");
    cerrarCarrito.innerText = "X";
    //le asignamos una clase a nuestro boton del carrito
    cerrarCarrito.className = "botonXCarrito";
//a nuestro boton le agregamos un evento que cuando el usuario haga click se cierre
    cerrarCarrito.addEventListener("click", ()=>{
        carritoCompra.style.display = "none";
    });
//le decimos a contenedor padre que agregamos un contenedor hijo <h2 class= "botonCarrito">X</h2>
    mHeader.appendChild(cerrarCarrito);
// creamos el contenido de nuestro carrito de productos con una funcion usando el metodo forEach
    carrito.forEach((prod)=>{
        //creamos un <div class= "modalContent"> donde van a ir la estructura de los productos agregados
        let carritoContent = document.createElement("div");
        carritoContent.className = "modalContent";
        carritoContent.innerHTML = `
            <img src="${prod.img}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <span class="restar"> - </span>
            <p>${prod.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total:$${prod.cantidad * prod.precio}</p>
            <span class="deleteProduct"> ❌ </span>
        `;
        carritoCompra.appendChild(carritoContent);

        let restaProd = carritoContent.querySelector(".restar");

        restaProd.addEventListener("click", () => {
            if (prod.cantidad !== 1) {
                prod.cantidad--;
            };
            guardarLocal();
            pintarCarrito();
        });
        let sumaProd = carritoContent.querySelector(".sumar");
        sumaProd.addEventListener("click", () => {
            prod.cantidad++;
            guardarLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".deleteProduct");

        eliminar.addEventListener("click", () => {
            eliminarProducto(prod.id);
        });

    })
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "totalCompra";
    totalCompra.innerHTML = `Total a pagar: $${total}`;
    carritoCompra.appendChild(totalCompra);
}
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id)=>{
    const buscarId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarId;
    });
    cuentaCarrito();
    guardarLocal();
    pintarCarrito();
};
const cuentaCarrito = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
cuentaCarrito();
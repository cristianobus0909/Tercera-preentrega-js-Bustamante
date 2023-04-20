let market = document.getElementById("market");
let verCarrito = document.getElementById("verCarrito");
let carritoCompra = document.getElementById("carritoCompra")

const productos = [
    {
        id: 1,
        nombre:"leche",
        unidad:"1L",
        precio:"250",
        img:"./img/11155.jpg",
        cantidad: 1
    },
    {
        id: 2,
        nombre:"huevo",
        unidad:"maple",
        precio:"1300",
        img:"./img/20201069.webp",
        cantidad: 1
    },
    {
        id: 3,
        nombre:"aceite",
        unidad:"1L",
        precio:"1800",
        img:"./img/9423.jpg",
        cantidad: 1
    },
    {
        id: 4,
        nombre:"fideo",
        unidad:"1L",
        precio:"500",
        img:"./img/431_1.jpg",
        cantidad: 1
    },
    {
        id: 5,
        nombre:"harina",
        unidad:"1kg",
        precio:"250",
        img:"./img/1112-MAROLIO-HARINA-000-1-KG.png",
        cantidad: 1
    },
    {
        id: 6,
        nombre:"carne",
        unidad:"1kg",
        precio:"1600",
        img:"./img/cocinar-la-carne-de-vacuno.jpg",
        cantidad: 1
    }
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((prod) => {
    let gondola = document.createElement("div");
    gondola.className = "cardProd";
    gondola.innerHTML = `
        <img src="${prod.img}">
        <h3>${prod.nombre}</h3>
        <h4>${prod.unidad}</h4>
        <p>$${prod.precio}</p>
    `;
    market.appendChild(gondola);
    let comprar = document.createElement("button");
    comprar.className = "comprar";
    comprar.innerText = "comprar";

    gondola.appendChild(comprar);
    comprar.addEventListener("click", () => {
        carrito.push({
            id: prod.id,
            img: prod.img,
            nombre: prod.nombre,
            unidad: prod.unidad,
            precio: prod.precio,
            cantidad: prod.cantidad
        });
    });
    
    
});
verCarrito.addEventListener("click", ()=>{
    carritoCompra.innerHTML = "";
    carritoCompra.style.display = "flex"
    const mHeader = document.createElement("div");
    mHeader.className = "modal";
    mHeader.innerHTML = `
        <h1 class="modalTitulo">Mi Carrito </h1>
    `;

    mHeader.appendChild(carritoCompra);

    const cerrarCarrito = document.createElement("h1")
    cerrarCarrito.innerText = "X";
    cerrarCarrito.className = "carritoCompra"
    carritoCompra.appendChild(cerrarCarrito);

    cerrarCarrito.addEventListener("click", ()=>[
        carritoCompra.style.display = "none"
    ]);
    carrito.forEach((prod)=>{
        let carritoContent = document.createElement("div")
        carritoContent.className = "modalContent"
        carritoContent.innerHTML = `
            <img src="${prod.img}">
            <h3>${prod.nombre}</h3>
            <h4>${prod.unidad}</h4>
            <p>$${prod.precio}</p>
        `
        carritoCompra.appendChild(carritoContent)
    })
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    const totalCompra = document.createElement("div")
    totalCompra.className = "totalCompra";
    totalCompra.innerHTML = `Total a pagar: $${total}`;
    carritoCompra.appendChild(totalCompra);
});

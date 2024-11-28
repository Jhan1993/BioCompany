const productosInventario = [
    { nombre: "Producto 1", precio: 20000, imagen: "images/producto1.png", descripcion: "Descripcion Producto", cantidad: "250ml"},
    { nombre: "Producto 2", precio: 15000, imagen: "images/producto2.png", descripcion: "Descripcion Producto", cantidad: "250ml"},
    { nombre: "Producto 3", precio: 10000, imagen: "images/producto3.png", descripcion: "Descripcion Producto", cantidad: "250ml"}
];

function mostrarProductos()  {
    const contenedor = document.getElementById("productos");

    productosInventario.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto")

        productoDiv.innerHTML =`
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p>Cant: ${producto.cantidad}</p>
            <p>Precio: $${producto.precio}</p>
            <button>Agregar al carrito</button>
        `
        contenedor.appendChild(productoDiv)
    })
}
mostrarProductos()
console.log('Archivo productsScripts')

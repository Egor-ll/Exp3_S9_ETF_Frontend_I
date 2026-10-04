function Producto({ producto, onAgregar, carrito }) {

    // Comprobar si el producto ya está en el carrito
    const estaEnCarrito = carrito.some(
        (item) => item.id === producto.id
    )

    return (
        <article className="producto-react">
            <img
                src={producto.imagen}
                alt={producto.nombre}
            />

            <h3>
                {producto.nombre}
            </h3>

            <p>
                {producto.descripcion}
            </p>

            {producto.precioAnterior && (
                <p>
                    <del>
                        {producto.precioAnterior}
                    </del>
                </p>
            )}

            {producto.descuento && (
                <span className="descuento-react">
                    {producto.descuento}
                </span>
            )}

            <strong>
                {producto.precioOferta || producto.precio}
            </strong>

            <button
                type="button"
                onClick={() => onAgregar(producto)}
                disabled={estaEnCarrito}
            >
                {estaEnCarrito
                    ? '✓ En el carrito'
                    : '🛒 Agregar al carrito'}
            </button>
        </article>
    )
}

export default Producto
import Producto from './Producto'

function ListaProductos({
                            productos,
                            onAgregar,
                            carrito
                        }) {
    return (
        <div className="productos-grid-react">
            {productos.map((producto) => (
                <Producto
                    key={producto.id}
                    producto={producto}
                    onAgregar={onAgregar}
                    carrito={carrito}
                />
            ))}
        </div>
    )
}

export default ListaProductos
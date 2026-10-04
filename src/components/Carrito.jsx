import { useState } from 'react'
import { createPortal } from 'react-dom'
import ProductoCarrito from './ProductoCarrito'

function Carrito({
                     carrito,
                     onEliminar,
                     onLimpiar
                 }) {
    const [minimizado, setMinimizado] = useState(false)

    // Convierte precios con formato chileno a números.
    const convertirPrecio = (precio) => {
        if (typeof precio === 'number') {
            return precio
        }

        return Number(
            String(precio)
                .replace('$', '')
                .replace(/\./g, '')
        )
    }

    const total = carrito.reduce(
        (acumulado, producto) => {
            const precio =
                producto.precioOferta || producto.precio

            return acumulado + convertirPrecio(precio)
        },
        0
    )

    // Mostrar el carrito minimizado cuando está vacío.
    if (carrito.length === 0 && !minimizado) {
        return createPortal(
            <button
                type="button"
                className="btn-carrito-minimizado-react"
                onClick={() => setMinimizado(true)}
                aria-label="Abrir carrito vacío"
            >
                🛒

                <span>
                0
            </span>
            </button>,
            document.body
        )
    }

// Mostrar el carrito vacío cuando está abierto.
    if (carrito.length === 0 && minimizado) {
        return createPortal(
            <aside
                className="carrito-react"
                aria-label="Carrito de compras vacío"
            >
                <div className="carrito-header-react">
                    <h2>
                        🛒 Mi carrito
                    </h2>

                    <button
                        type="button"
                        className="btn-minimizar-react"
                        onClick={() => setMinimizado(false)}
                        aria-label="Minimizar carrito"
                    >
                        −
                    </button>
                </div>

                <p className="cantidad-productos-react">
                    Tu carrito está vacío.
                </p>
            </aside>,
            document.body
        )
    }

    // Muestra solamente el botón circular cuando está minimizado.
    if (minimizado) {
        return createPortal(
            <button
                type="button"
                className="btn-carrito-minimizado-react"
                onClick={() => setMinimizado(false)}
                aria-label="Abrir carrito"
            >
                🛒

                <span>
                    {carrito.length}
                </span>
            </button>,
            document.body
        )
    }

    return createPortal(
        <aside
            className="carrito-react"
            aria-label="Carrito de compras"
        >
            <div className="carrito-header-react">
                <h2>
                    🛒 Mi carrito
                </h2>

                <button
                    type="button"
                    className="btn-minimizar-react"
                    onClick={() => setMinimizado(true)}
                    aria-label="Minimizar carrito"
                >
                    −
                </button>
            </div>

            <p className="cantidad-productos-react">
                Productos:
                <strong>
                    {' '}{carrito.length}
                </strong>
            </p>

            <div className="lista-carrito-react">
                {carrito.map((producto, indice) => (
                    <ProductoCarrito
                        key={`${producto.id}-${indice}`}
                        producto={producto}
                        onEliminar={() => onEliminar(indice)}
                    />
                ))}
            </div>

            <div className="resumen-carrito-react">
                <span>
                    Total:
                </span>

                <strong>
                    ${total.toLocaleString('es-CL')}
                </strong>
            </div>

            <div className="acciones-carrito-react">
                <button
                    type="button"
                    className="btn-pagar-react"
                    onClick={() =>
                        alert(
                            'El proceso de pago estará disponible próximamente.'
                        )
                    }
                >
                    Pagar
                </button>

                <button
                    type="button"
                    className="btn-limpiar-react"
                    onClick={onLimpiar}
                >
                    Limpiar
                </button>
            </div>
        </aside>,
        document.body
    )
}

export default Carrito
import { useState } from 'react'

function Categorias() {

    // Categorías disponibles en la tienda
    const categorias = [
        {
            id: 'teclados',
            nombre: 'TECLADOS',
            icono: '⌨️',
            texto: 'Ver teclados →',
            clase: 'categoria-teclados',
            url: 'accesorios.html?categoria=teclados'
        },
        {
            id: 'audifonos',
            nombre: 'AUDÍFONOS',
            icono: '🎧',
            texto: 'Ver audífonos →',
            clase: 'categoria-audifonos',
            url: 'accesorios.html?categoria=audifonos'
        },
        {
            id: 'mouse',
            nombre: 'MOUSE',
            icono: '🖱️',
            texto: 'Ver mouse →',
            clase: 'categoria-mouse',
            url: 'accesorios.html?categoria=mouse'
        }
    ]

    // Estado de la categoría seleccionada
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

    return (
        <section
            className="bloque-inicio categorias-inicio"
            aria-labelledby="titulo-categorias">
            <div className="encabezado-bloque">

                <div>
                    <h2 id="titulo-categorias">
                        🎮 EXPLORA NUESTRAS CATEGORÍAS
                    </h2>

                    <p>
                        Encuentra exactamente lo que necesitas.
                    </p>
                </div>

            </div>

            <div className="categorias-grid">

                {categorias.map((categoria) => (

                    <a key={categoria.id}
                        className={`categoria-card ${categoria.clase} ${
                            categoriaSeleccionada === categoria.id
                                ? 'categoria-seleccionada'
                                : ''
                        }`}
                        href={categoria.url}
                        onClick={() => setCategoriaSeleccionada(categoria.id)}>
                        <span>{categoria.icono}</span>

                        <div>
                            <h3>{categoria.nombre}</h3>
                            <small>{categoria.texto}</small>
                        </div>
                    </a>

                ))}

            </div>
        </section>
    )
}

export default Categorias
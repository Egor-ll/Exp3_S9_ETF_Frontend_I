import { useEffect, useState } from 'react'

function Recomendaciones() {
    const [productos, setProductos] = useState([])
    const [recomendacion, setRecomendacion] = useState(null)

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const [respuestaProductos, respuestaAccesorios] =
                    await Promise.all([
                        fetch(
                            `${import.meta.env.BASE_URL}data/productos.json`
                        ),
                        fetch(
                            `${import.meta.env.BASE_URL}data/accesorios.json`
                        )
                    ])

                if (
                    !respuestaProductos.ok ||
                    !respuestaAccesorios.ok
                ) {
                    throw new Error(
                        'No se pudieron cargar los productos.'
                    )
                }

                const productosCatalogo =
                    await respuestaProductos.json()

                const accesoriosCatalogo =
                    await respuestaAccesorios.json()

                setProductos([
                    ...productosCatalogo,
                    ...accesoriosCatalogo
                ])
            } catch (error) {
                console.error(
                    'Error al cargar las recomendaciones:',
                    error
                )
            }
        }

        cargarProductos()
    }, [])

    const mostrarRecomendacion = () => {
        if (productos.length === 0) {
            return
        }

        const indice = Math.floor(
            Math.random() * productos.length
        )

        setRecomendacion(productos[indice])
    }

    return (
        <section
            className="recomendacion-inicio"
            aria-labelledby="titulo-recomendacion"
        >
            <div className="recomendacion-texto">
                <span className="icono-recomendacion">
                    💡
                </span>

                <div>
                    <h2 id="titulo-recomendacion">
                        ¿NECESITAS AYUDA PARA ELEGIR?
                    </h2>

                    <p>
                        Presiona el botón y te mostraremos una
                        recomendación.
                    </p>

                    <button
                        type="button"
                        className="btn-neon-principal"
                        onClick={mostrarRecomendacion}
                        disabled={productos.length === 0}
                    >
                        MOSTRAR RECOMENDACIÓN
                    </button>
                </div>
            </div>

            <div
                className="resultado-recomendacion"
                aria-live="polite"
            >
                {recomendacion ? (
                    <div>
                        <img
                            src={recomendacion.imagen}
                            alt={recomendacion.nombre}
                            style={{
                                width: '90px',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                marginBottom: '10px'
                            }}
                        />

                        <h3>
                            🎮 {recomendacion.nombre}
                        </h3>

                        <p>
                            {recomendacion.descripcion}
                        </p>

                        <strong>
                            {recomendacion.precioOferta ||
                                recomendacion.precio}
                        </strong>
                    </div>
                ) : (
                    <p>
                        Presiona el botón para recibir una
                        recomendación.
                    </p>
                )}
            </div>
        </section>
    )
}

export default Recomendaciones
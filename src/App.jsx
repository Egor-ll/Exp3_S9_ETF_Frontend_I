import { useEffect, useState } from 'react'
import ListaProductos from './components/ListaProductos'
import Carrito from './components/Carrito'
import Filtros from './components/Filtros'
import './App.css'

function App({ catalogo = 'productos' }) {
  const [productos, setProductos] = useState([])

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado =
        localStorage.getItem('elamigo-carrito')

    if (!carritoGuardado) {
      return []
    }

    try {
      return JSON.parse(carritoGuardado)
    } catch (error) {
      console.error(
          'Error al recuperar el carrito:',
          error
      )

      return []
    }
  })

  const [busqueda, setBusqueda] = useState('')
  const [plataforma, setPlataforma] = useState('')
    const [categoria, setCategoria] = useState(() => {
        if (catalogo !== 'accesorios') {
            return ''
        }

        const parametros = new URLSearchParams(
            window.location.search
        )

        return parametros.get('categoria') || ''
    })

  useEffect(() => {
    localStorage.setItem(
        'elamigo-carrito',
        JSON.stringify(carrito)
    )
  }, [carrito])

  useEffect(() => {
    const archivosCatalogo = {
      productos: '/data/productos.json',
      juegos: '/data/juegos.json',
      accesorios: '/data/accesorios.json'
    }

      const archivo =
          archivosCatalogo[catalogo] ||
          archivosCatalogo.productos

      const rutaArchivo =
          `${import.meta.env.BASE_URL}${archivo.replace('/data/', 'data/')}`

      fetch(rutaArchivo)
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error(
                'No se pudo cargar el catálogo.'
            )
          }

          return respuesta.json()
        })
        .then((datos) => {
          setProductos(datos)
        })
        .catch((error) => {
          console.error(
              'Error al cargar el catálogo:',
              error
          )
        })
  }, [catalogo])

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [
      ...carritoActual,
      producto
    ])
  }

  const eliminarDelCarrito = (indice) => {
    setCarrito((carritoActual) =>
        carritoActual.filter(
            (_, index) => index !== indice
        )
    )
  }

  const limpiarCarrito = () => {
    setCarrito([])
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setPlataforma('')
    setCategoria('')
  }

  const productosFiltrados = productos.filter(
      (producto) => {
        if (catalogo === 'juegos') {
          const coincideBusqueda =
              producto.nombre
                  .toLowerCase()
                  .includes(
                      busqueda.toLowerCase()
                  )

          const coincidePlataforma =
              plataforma === '' ||
              producto.plataforma === plataforma

          return (
              coincideBusqueda &&
              coincidePlataforma
          )
        }

        if (catalogo === 'accesorios') {
          return (
              categoria === '' ||
              producto.categoria === categoria
          )
        }

        return true
      }
  )

  return (
      <div className="react-elamigo">

        <Filtros
            catalogo={catalogo}
            busqueda={busqueda}
            plataforma={plataforma}
            categoria={categoria}
            onBusquedaChange={setBusqueda}
            onPlataformaChange={setPlataforma}
            onCategoriaChange={setCategoria}
            onLimpiar={limpiarFiltros}
        />

          <ListaProductos
              productos={productosFiltrados}
              onAgregar={agregarAlCarrito}
              carrito={carrito}
          />

        {productosFiltrados.length === 0 &&
            productos.length > 0 && (
                <p className="sin-resultados-react">
                  No se encontraron productos con los
                  filtros seleccionados.
                </p>
            )}

        <Carrito
            carrito={carrito}
            onEliminar={eliminarDelCarrito}
            onLimpiar={limpiarCarrito}
        />

      </div>
  )
}

export default App
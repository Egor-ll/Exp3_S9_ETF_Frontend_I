import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Categorias from './components/Categorias.jsx'
import Recomendaciones from './components/Recomendaciones.jsx'

// Montar el Navbar
const navbarRoot = document.getElementById('navbar-root')

if (navbarRoot) {
    createRoot(navbarRoot).render(
        <StrictMode>
            <Navbar />
        </StrictMode>,
    )
}

// Montar las categorías
const categoriasRoot = document.getElementById('categorias-root')

if (categoriasRoot) {
    createRoot(categoriasRoot).render(
        <StrictMode>
            <Categorias />
        </StrictMode>,
    )
}

// Montar las recomendaciones
const recomendacionesRoot = document.getElementById('recomendaciones-root')

if (recomendacionesRoot) {
    createRoot(recomendacionesRoot).render(
        <StrictMode>
            <Recomendaciones />
        </StrictMode>,
    )
}

// Montar la aplicación principal
const root = document.getElementById('react-root')

if (root) {
    const catalogo = root.dataset.catalogo || 'productos'

    createRoot(root).render(
        <StrictMode>
            <App catalogo={catalogo} />
        </StrictMode>,
    )
}
function Navbar() {

    // Obtener la página actual
    const paginaActual =
        window.location.pathname.split('/').pop() || 'index.html'

    // Determinar si una opción está activa
    const esPaginaActual = (pagina) =>
        paginaActual === pagina

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark navbar-elamigo"
            aria-label="Navegación principal"
        >
            <div className="container">

                <a className="navbar-brand" href="index.html">
                    🎮 El Amigo
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                    aria-controls="menuPrincipal"
                    aria-expanded="false"
                    aria-label="Mostrar menú de navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menuPrincipal"
                >
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    esPaginaActual('index.html')
                                        ? 'active'
                                        : ''
                                }`}
                                aria-current={
                                    esPaginaActual('index.html')
                                        ? 'page'
                                        : undefined
                                }
                                href="index.html"
                            >
                                Inicio
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    esPaginaActual('accesorios.html')
                                        ? 'active'
                                        : ''
                                }`}
                                aria-current={
                                    esPaginaActual('accesorios.html')
                                        ? 'page'
                                        : undefined
                                }
                                href="accesorios.html"
                            >
                                Accesorios
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    esPaginaActual('games.html')
                                        ? 'active'
                                        : ''
                                }`}
                                aria-current={
                                    esPaginaActual('games.html')
                                        ? 'page'
                                        : undefined
                                }
                                href="games.html"
                            >
                                Games
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    esPaginaActual('contacto.html')
                                        ? 'active'
                                        : ''
                                }`}
                                aria-current={
                                    esPaginaActual('contacto.html')
                                        ? 'page'
                                        : undefined
                                }
                                href="contacto.html"
                            >
                                Contacto
                            </a>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
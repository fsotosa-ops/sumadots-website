export default function Nav() {
  return (
    <>
      <nav className="max-w-6xl mx-auto px-6 md:px-10 py-7 flex justify-between items-center">
        <a
          href="#top"
          aria-label="Volver al inicio"
          className="flex items-center transition-transform hover:scale-[1.02]"
        >
          <img
            src="/s4i/sumadots_for_impact.png"
            alt="Sumadots for Impact"
            className="w-40 md:w-52 h-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#servicios" className="nav-link">
            Servicios
          </a>
          <a href="#para-quien" className="nav-link">
            Para Quién
          </a>
          <a href="#clientes" className="nav-link">
            Clientes
          </a>
          <a href="#founders" className="nav-link">
            Quiénes somos
          </a>
          <a
            href="/"
            className="nav-link inline-flex items-center gap-1"
            aria-label="Ir a Sumadots"
          >
            Sumadots
            <span className="text-white/30">↗</span>
          </a>
          <a href="#agenda" className="nav-cta">
            Iniciar conversación
            <span className="arrow">→</span>
          </a>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="hairline"></div>
      </div>
    </>
  );
}

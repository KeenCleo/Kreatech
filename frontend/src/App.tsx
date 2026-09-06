import { useState, type ChangeEvent } from "react";
import "./App.css";

type Rol = "Emprendedor" | "Proveedor" | "Estudiante";

type Pagina =
  | "Inicio"
  | "Perfil"
  | "Proveedores"
  | "Detalle proveedor"
  | "Conexiones"
  | "Contacto"
  | "Productos"
  | "Publicar oportunidad"
  | "Oportunidades"
  | "Postulaciones"
  | "Postulaciones recibidas"
  | "Contacto estudiante";

type VistaAcceso = "Login" | "Registro";

type EstadoConexion = "Pendiente" | "Aceptada" | "Rechazada";

type EstadoPostulacion = "Pendiente" | "Aceptada" | "Rechazada";

type Proveedor = {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  correo: string;
  telefono: string;
};

type Conexion = {
  id: number;
  proveedorId: number;
  proveedor: string;
  emprendedor: string;
  correoEmprendedor: string;
  telefonoEmprendedor: string;
  estado: EstadoConexion;
};

type Oportunidad = {
  id: number;
  titulo: string;
  descripcion: string;
  carrera: string;
  emprendedor: string;
  correoEmprendedor: string;
  telefonoEmprendedor: string;
};

type Postulacion = {
  id: number;
  oportunidadId: number;
  titulo: string;
  emprendedor: string;
  carrera: string;
  estudiante: string;
  correoEstudiante: string;
  telefonoEstudiante: string;
  correoEmprendedor: string;
  telefonoEmprendedor: string;
  estado: EstadoPostulacion;
};

type Producto = {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  imagen: string;
};

const proveedoresIniciales: Proveedor[] = [
  {
    id: 1,
    nombre: "Soluciones Digitales NIC",
    categoria: "Tecnología",
    descripcion:
      "Servicios tecnológicos para pequeños negocios y emprendimientos de Nicaragua.",
    correo: "contacto@solucionesnic.com",
    telefono: "+505 8888 1122",
  },
  {
    id: 2,
    nombre: "Distribuidora Central",
    categoria: "Distribución",
    descripcion:
      "Productos, suministros y soluciones de distribución para emprendedores locales.",
    correo: "ventas@distribuidoracentral.com",
    telefono: "+505 8666 2200",
  },
  {
    id: 3,
    nombre: "Creativa Nicaragua",
    categoria: "Diseño",
    descripcion:
      "Diseño gráfico, identidad visual, publicidad y contenido digital.",
    correo: "hola@creativanicaragua.com",
    telefono: "+505 8555 3300",
  },
];

const oportunidadesIniciales: Oportunidad[] = [
  {
    id: 1,
    titulo: "Pasante de desarrollo web",
    descripcion:
      "Apoyo en el desarrollo y mantenimiento de herramientas web para el emprendimiento.",
    carrera: "Ingeniería en Sistemas",
    emprendedor: "Innovación Nicaragua",
    correoEmprendedor: "contacto@innovacionnica.com",
    telefonoEmprendedor: "+505 8444 1100",
  },
  {
    id: 2,
    titulo: "Apoyo en redes sociales",
    descripcion:
      "Apoyo en creación de contenido y administración de redes sociales.",
    carrera: "Marketing",
    emprendedor: "Creativa Nicaragua",
    correoEmprendedor: "hola@creativanicaragua.com",
    telefonoEmprendedor: "+505 8555 3300",
  },
];

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [vistaAcceso, setVistaAcceso] = useState<VistaAcceso>("Login");
  const [rol, setRol] = useState<Rol>("Emprendedor");
  const [pagina, setPagina] = useState<Pagina>("Inicio");

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [imagenPerfil, setImagenPerfil] = useState("");

  const [descripcionPerfil, setDescripcionPerfil] = useState("");
  const [categoriaPerfil, setCategoriaPerfil] = useState("");
  const [carreraPerfil, setCarreraPerfil] = useState("");

  const [nombreBorrador, setNombreBorrador] = useState("");
  const [correoBorrador, setCorreoBorrador] = useState("");
  const [telefonoBorrador, setTelefonoBorrador] = useState("");
  const [descripcionBorrador, setDescripcionBorrador] = useState("");
  const [categoriaBorrador, setCategoriaBorrador] = useState("");
  const [carreraBorrador, setCarreraBorrador] = useState("");
  const [imagenPerfilBorrador, setImagenPerfilBorrador] = useState("");
  const [perfilGuardado, setPerfilGuardado] = useState(false);

  const [proveedores] = useState<Proveedor[]>(proveedoresIniciales);
  const [filtroProveedor, setFiltroProveedor] = useState("Todas");

  const [proveedorSeleccionado, setProveedorSeleccionado] =
    useState<Proveedor | null>(null);

  const [conexionSeleccionada, setConexionSeleccionada] =
    useState<Conexion | null>(null);

  const [postulacionSeleccionada, setPostulacionSeleccionada] =
    useState<Postulacion | null>(null);

  const [conexiones, setConexiones] = useState<Conexion[]>([]);

  const [oportunidades, setOportunidades] =
    useState<Oportunidad[]>(oportunidadesIniciales);

  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);

  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoriaProducto, setCategoriaProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [imagenProducto, setImagenProducto] = useState("");
  const [productoEditando, setProductoEditando] = useState<number | null>(null);

  const [tituloOportunidad, setTituloOportunidad] = useState("");
  const [descripcionOportunidad, setDescripcionOportunidad] = useState("");
  const [carreraOportunidad, setCarreraOportunidad] = useState("");
  const [filtroCarrera, setFiltroCarrera] = useState("Todas");

  const iniciarSesion = () => {
    if (!correo.trim() || !contrasena.trim()) {
      return;
    }

    setSesionIniciada(true);
    setPagina("Inicio");
  };

  const registrarUsuario = () => {
    if (
      !nombreUsuario.trim() ||
      !correo.trim() ||
      !contrasena.trim() ||
      !telefonoUsuario.trim()
    ) {
      return;
    }

    setSesionIniciada(true);
    setPagina("Inicio");
  };

  const cerrarSesion = () => {
    setSesionIniciada(false);
    setPagina("Inicio");
    setVistaAcceso("Login");
    setNombreUsuario("");
    setCorreo("");
    setContrasena("");
    setTelefonoUsuario("");
    setDescripcionPerfil("");
    setCategoriaPerfil("");
    setCarreraPerfil("");
    setImagenPerfil("");
  };

  const abrirPerfil = () => {
    setNombreBorrador(nombreUsuario);
    setCorreoBorrador(correo);
    setTelefonoBorrador(telefonoUsuario);
    setDescripcionBorrador(descripcionPerfil);
    setCategoriaBorrador(categoriaPerfil);
    setCarreraBorrador(carreraPerfil);
    setImagenPerfilBorrador(imagenPerfil);
    setPerfilGuardado(false);
    setPagina("Perfil");
  };

  const seleccionarImagenPerfil = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const archivo = e.target.files?.[0];

    if (!archivo) {
      return;
    }

    const urlImagen = URL.createObjectURL(archivo);
    setImagenPerfilBorrador(urlImagen);
    setPerfilGuardado(false);
  };

  const guardarPerfil = () => {
    if (
      !nombreBorrador.trim() ||
      !correoBorrador.trim() ||
      !telefonoBorrador.trim()
    ) {
      return;
    }

    setNombreUsuario(nombreBorrador);
    setCorreo(correoBorrador);
    setTelefonoUsuario(telefonoBorrador);
    setDescripcionPerfil(descripcionBorrador);
    setCategoriaPerfil(categoriaBorrador);
    setCarreraPerfil(carreraBorrador);
    setImagenPerfil(imagenPerfilBorrador);
    setPerfilGuardado(true);
  };

  const verProveedor = (proveedor: Proveedor) => {
    setProveedorSeleccionado(proveedor);
    setPagina("Detalle proveedor");
  };

  const solicitarConexion = (proveedor: Proveedor) => {
    const yaExiste = conexiones.some(
      (conexion) =>
        conexion.proveedorId === proveedor.id &&
        conexion.correoEmprendedor === correo
    );

    if (!yaExiste) {
      const nuevaConexion: Conexion = {
        id: Date.now(),
        proveedorId: proveedor.id,
        proveedor: proveedor.nombre,
        emprendedor: nombreUsuario || "Emprendedor WorkBiz",
        correoEmprendedor: correo || "emprendedor@workbiz.com",
        telefonoEmprendedor: telefonoUsuario || "+505 8888 0000",
        estado: "Pendiente",
      };

      setConexiones([...conexiones, nuevaConexion]);
    }

    setPagina("Conexiones");
  };

  const cambiarEstadoConexion = (
    id: number,
    estado: EstadoConexion
  ) => {
    setConexiones(
      conexiones.map((conexion) =>
        conexion.id === id ? { ...conexion, estado } : conexion
      )
    );
  };

  const abrirContactoConexion = (conexion: Conexion) => {
    const proveedor = proveedores.find(
      (item) => item.id === conexion.proveedorId
    );

    setConexionSeleccionada(conexion);

    if (proveedor) {
      setProveedorSeleccionado(proveedor);
    }

    setPagina("Contacto");
  };

  const publicarOportunidad = () => {
    if (
      !tituloOportunidad.trim() ||
      !descripcionOportunidad.trim() ||
      !carreraOportunidad.trim()
    ) {
      return;
    }

    const nuevaOportunidad: Oportunidad = {
      id: Date.now(),
      titulo: tituloOportunidad,
      descripcion: descripcionOportunidad,
      carrera: carreraOportunidad,
      emprendedor: nombreUsuario || "Emprendedor WorkBiz",
      correoEmprendedor: correo || "emprendedor@workbiz.com",
      telefonoEmprendedor: telefonoUsuario || "+505 8888 0000",
    };

    setOportunidades([...oportunidades, nuevaOportunidad]);

    setTituloOportunidad("");
    setDescripcionOportunidad("");
    setCarreraOportunidad("");
  };

  const postularme = (oportunidad: Oportunidad) => {
    const yaExiste = postulaciones.some(
      (postulacion) =>
        postulacion.oportunidadId === oportunidad.id &&
        postulacion.correoEstudiante === correo
    );

    if (!yaExiste) {
      const nuevaPostulacion: Postulacion = {
        id: Date.now(),
        oportunidadId: oportunidad.id,
        titulo: oportunidad.titulo,
        emprendedor: oportunidad.emprendedor,
        carrera: oportunidad.carrera,
        estudiante: nombreUsuario || "Estudiante WorkBiz",
        correoEstudiante: correo || "estudiante@workbiz.com",
        telefonoEstudiante: telefonoUsuario || "+505 8888 0000",
        correoEmprendedor: oportunidad.correoEmprendedor,
        telefonoEmprendedor: oportunidad.telefonoEmprendedor,
        estado: "Pendiente",
      };

      setPostulaciones([...postulaciones, nuevaPostulacion]);
    }

    setPagina("Postulaciones");
  };

  const cambiarEstadoPostulacion = (
    id: number,
    estado: EstadoPostulacion
  ) => {
    setPostulaciones(
      postulaciones.map((postulacion) =>
        postulacion.id === id
          ? { ...postulacion, estado }
          : postulacion
      )
    );
  };

  const abrirContactoEstudiante = (postulacion: Postulacion) => {
    setPostulacionSeleccionada(postulacion);
    setPagina("Contacto estudiante");
  };

  const seleccionarImagenProducto = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const archivo = e.target.files?.[0];

    if (!archivo) {
      return;
    }

    const urlImagen = URL.createObjectURL(archivo);
    setImagenProducto(urlImagen);
  };

  const limpiarFormularioProducto = () => {
    setNombreProducto("");
    setCategoriaProducto("");
    setDescripcionProducto("");
    setImagenProducto("");
    setProductoEditando(null);
  };

  const guardarProducto = () => {
    if (
      !nombreProducto.trim() ||
      !categoriaProducto.trim() ||
      !descripcionProducto.trim()
    ) {
      return;
    }

    if (productoEditando !== null) {
      setProductos(
        productos.map((producto) =>
          producto.id === productoEditando
            ? {
                ...producto,
                nombre: nombreProducto,
                categoria: categoriaProducto,
                descripcion: descripcionProducto,
                imagen: imagenProducto || producto.imagen,
              }
            : producto
        )
      );

      limpiarFormularioProducto();
      return;
    }

    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre: nombreProducto,
      categoria: categoriaProducto,
      descripcion: descripcionProducto,
      imagen: imagenProducto,
    };

    setProductos([...productos, nuevoProducto]);
    limpiarFormularioProducto();
  };

  const editarProducto = (producto: Producto) => {
    setProductoEditando(producto.id);
    setNombreProducto(producto.nombre);
    setCategoriaProducto(producto.categoria);
    setDescripcionProducto(producto.descripcion);
    setImagenProducto(producto.imagen);
  };

  const eliminarProducto = (id: number) => {
    setProductos(
      productos.filter((producto) => producto.id !== id)
    );

    if (productoEditando === id) {
      limpiarFormularioProducto();
    }
  };

  const categoriasProveedores = [
    "Todas",
    ...Array.from(
      new Set(proveedores.map((proveedor) => proveedor.categoria))
    ),
  ];

  const carrerasDisponibles = [
    "Todas",
    ...Array.from(
      new Set(oportunidades.map((oportunidad) => oportunidad.carrera))
    ),
  ];

  const proveedoresFiltrados =
    filtroProveedor === "Todas"
      ? proveedores
      : proveedores.filter(
          (proveedor) => proveedor.categoria === filtroProveedor
        );

  const oportunidadesFiltradas =
    filtroCarrera === "Todas"
      ? oportunidades
      : oportunidades.filter(
          (oportunidad) => oportunidad.carrera === filtroCarrera
        );

  const postulacionesEstudiante = postulaciones.filter(
    (postulacion) =>
      !correo ||
      postulacion.correoEstudiante === correo ||
      postulacion.correoEstudiante === "estudiante@workbiz.com"
  );

  if (!sesionIniciada) {
    return (
      <div className="accesoPagina">
        <div className="accesoContenedor">
          <div className="accesoMarca">
            <h1>WorkBiz</h1>
            <p>Conectando oportunidades</p>
          </div>

          <div className="accesoCard">
            <div className="accesoTabs">
              <button
                className={vistaAcceso === "Login" ? "tabActivo" : ""}
                onClick={() => setVistaAcceso("Login")}
              >
                Iniciar sesión
              </button>

              <button
                className={vistaAcceso === "Registro" ? "tabActivo" : ""}
                onClick={() => setVistaAcceso("Registro")}
              >
                Registrarme
              </button>
            </div>

            {vistaAcceso === "Login" && (
              <>
                <div className="accesoEncabezado">
                  <h2>Bienvenido a WorkBiz</h2>
                  <p>Inicia sesión para continuar en la plataforma.</p>
                </div>

                <div className="formularioAcceso">
                  <label>Correo electrónico</label>

                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />

                  <label>Contraseña</label>

                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />

                  <label>Tipo de usuario</label>

                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value as Rol)}
                  >
                    <option value="Emprendedor">Emprendedor</option>
                    <option value="Proveedor">Proveedor</option>
                    <option value="Estudiante">Estudiante</option>
                  </select>

                  <button
                    className="botonAcceso"
                    onClick={iniciarSesion}
                  >
                    Iniciar sesión
                  </button>
                </div>

                <p className="cambioAcceso">
                  ¿No tienes una cuenta?{" "}
                  <button onClick={() => setVistaAcceso("Registro")}>
                    Regístrate
                  </button>
                </p>
              </>
            )}

            {vistaAcceso === "Registro" && (
              <>
                <div className="accesoEncabezado">
                  <h2>Crea tu cuenta</h2>

                  <p>
                    Regístrate según el tipo de usuario que te corresponda.
                  </p>
                </div>

                <div className="formularioAcceso">
                  <label>Nombre</label>

                  <input
                    type="text"
                    placeholder="Tu nombre o negocio"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />

                  <label>Correo electrónico</label>

                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />

                  <label>Número de teléfono</label>

                  <input
                    type="tel"
                    placeholder="+505 8888 0000"
                    value={telefonoUsuario}
                    onChange={(e) => setTelefonoUsuario(e.target.value)}
                  />

                  <label>Contraseña</label>

                  <input
                    type="password"
                    placeholder="Crea una contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />

                  <label>Tipo de usuario</label>

                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value as Rol)}
                  >
                    <option value="Emprendedor">Emprendedor</option>
                    <option value="Proveedor">Proveedor</option>
                    <option value="Estudiante">Estudiante</option>
                  </select>

                  <button
                    className="botonAcceso"
                    onClick={registrarUsuario}
                  >
                    Crear cuenta
                  </button>
                </div>

                <p className="cambioAcceso">
                  ¿Ya tienes una cuenta?{" "}
                  <button onClick={() => setVistaAcceso("Login")}>
                    Inicia sesión
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div>
          <h1 className="logo">WorkBiz</h1>
          <p className="subtitulo">Conectando oportunidades</p>
        </div>

        <nav className="menu">
          <button
            className={pagina === "Inicio" ? "activo" : ""}
            onClick={() => setPagina("Inicio")}
          >
            Inicio
          </button>

          <button
            className={pagina === "Perfil" ? "activo" : ""}
            onClick={abrirPerfil}
          >
            Mi perfil
          </button>

          {rol === "Emprendedor" && (
            <>
              <button
                className={
                  pagina === "Proveedores" ||
                  pagina === "Detalle proveedor"
                    ? "activo"
                    : ""
                }
                onClick={() => setPagina("Proveedores")}
              >
                Buscar proveedores
              </button>

              <button
                className={
                  pagina === "Conexiones" || pagina === "Contacto"
                    ? "activo"
                    : ""
                }
                onClick={() => setPagina("Conexiones")}
              >
                Mis conexiones
              </button>

              <button
                className={
                  pagina === "Publicar oportunidad" ? "activo" : ""
                }
                onClick={() => setPagina("Publicar oportunidad")}
              >
                Publicar oportunidad
              </button>

              <button
                className={
                  pagina === "Postulaciones recibidas" ||
                  pagina === "Contacto estudiante"
                    ? "activo"
                    : ""
                }
                onClick={() => setPagina("Postulaciones recibidas")}
              >
                Postulaciones recibidas
              </button>
            </>
          )}

          {rol === "Proveedor" && (
            <>
              <button
                className={pagina === "Productos" ? "activo" : ""}
                onClick={() => setPagina("Productos")}
              >
                Mis productos
              </button>

              <button
                className={
                  pagina === "Conexiones" || pagina === "Contacto"
                    ? "activo"
                    : ""
                }
                onClick={() => setPagina("Conexiones")}
              >
                Mis conexiones
              </button>
            </>
          )}

          {rol === "Estudiante" && (
            <>
              <button
                className={pagina === "Oportunidades" ? "activo" : ""}
                onClick={() => setPagina("Oportunidades")}
              >
                Oportunidades
              </button>

              <button
                className={
                  pagina === "Postulaciones" ||
                  pagina === "Contacto estudiante"
                    ? "activo"
                    : ""
                }
                onClick={() => setPagina("Postulaciones")}
              >
                Mis postulaciones
              </button>
            </>
          )}
        </nav>

        <button
          className="cerrarSesion"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="contenido">
        <header className="topbar">
          <div className="tituloPagina">
            <h2>{pagina}</h2>
            <p>Plataforma WorkBiz</p>
          </div>

          <div
            className="perfilUsuario"
            onClick={abrirPerfil}
          >
            <div className="perfilIcono">
              {imagenPerfil ? (
                <img
                  src={imagenPerfil}
                  alt="Perfil"
                  style={{
                    width: "36px",
                    height: "36px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                "👤"
              )}
            </div>

            <div className="perfilTexto">
              <strong>{nombreUsuario || rol}</strong>
              <span>{rol}</span>
            </div>
          </div>
        </header>

        {pagina === "Inicio" && (
          <section>
            <div className="heroWorkbiz">
              <h2>Bienvenido a WorkBiz</h2>

              <p>
                Una plataforma que conecta pequeños emprendedores de Nicaragua
                con proveedores y estudiantes que buscan experiencia laboral.
              </p>
            </div>

            {rol === "Emprendedor" && (
              <div className="tarjetas">
                <div className="tarjeta">
                  <h3>Proveedores</h3>
                  <strong>{proveedores.length}</strong>
                  <p>Disponibles</p>
                </div>

                <div className="tarjeta">
                  <h3>Oportunidades</h3>
                  <strong>{oportunidades.length}</strong>
                  <p>Publicadas</p>
                </div>

                <div className="tarjeta">
                  <h3>Postulaciones</h3>
                  <strong>{postulaciones.length}</strong>
                  <p>Recibidas</p>
                </div>
              </div>
            )}

            {rol === "Proveedor" && (
              <div className="tarjetas">
                <div className="tarjeta">
                  <h3>Productos</h3>
                  <strong>{productos.length}</strong>
                  <p>En catálogo</p>
                </div>

                <div className="tarjeta">
                  <h3>Solicitudes</h3>

                  <strong>
                    {
                      conexiones.filter(
                        (conexion) => conexion.estado === "Pendiente"
                      ).length
                    }
                  </strong>

                  <p>Pendientes</p>
                </div>

                <div className="tarjeta">
                  <h3>Conexiones</h3>

                  <strong>
                    {
                      conexiones.filter(
                        (conexion) => conexion.estado === "Aceptada"
                      ).length
                    }
                  </strong>

                  <p>Aceptadas</p>
                </div>
              </div>
            )}

            {rol === "Estudiante" && (
              <div className="tarjetas">
                <div className="tarjeta">
                  <h3>Oportunidades</h3>
                  <strong>{oportunidades.length}</strong>
                  <p>Disponibles</p>
                </div>

                <div className="tarjeta">
                  <h3>Postulaciones</h3>
                  <strong>{postulacionesEstudiante.length}</strong>
                  <p>Enviadas</p>
                </div>

                <div className="tarjeta">
                  <h3>Aceptadas</h3>

                  <strong>
                    {
                      postulacionesEstudiante.filter(
                        (postulacion) => postulacion.estado === "Aceptada"
                      ).length
                    }
                  </strong>

                  <p>Matches</p>
                </div>
              </div>
            )}
          </section>
        )}

        {pagina === "Perfil" && (
          <section className="panel">
            <h3>Mi perfil</h3>

            <p>
              Actualiza la información que los demás usuarios podrán ver sobre
              ti en WorkBiz.
            </p>

            <div className="formulario">
              <label>Imagen o logo</label>

              <input
                type="file"
                accept="image/*"
                onChange={seleccionarImagenPerfil}
              />

              {imagenPerfilBorrador && (
                <img
                  src={imagenPerfilBorrador}
                  alt="Vista previa del perfil"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "18px",
                    objectFit: "cover",
                  }}
                />
              )}

              <label>Nombre</label>

              <input
                type="text"
                placeholder="Nombre"
                value={nombreBorrador}
                onChange={(e) => {
                  setNombreBorrador(e.target.value);
                  setPerfilGuardado(false);
                }}
              />

              <label>Descripción</label>

              <textarea
                placeholder="Cuéntanos un poco sobre ti"
                rows={4}
                value={descripcionBorrador}
                onChange={(e) => {
                  setDescripcionBorrador(e.target.value);
                  setPerfilGuardado(false);
                }}
              />

              {rol !== "Estudiante" && (
                <>
                  <label>Categoría</label>

                  <input
                    type="text"
                    placeholder={
                      rol === "Proveedor"
                        ? "Ejemplo: Tecnología"
                        : "Ejemplo: Comercio"
                    }
                    value={categoriaBorrador}
                    onChange={(e) => {
                      setCategoriaBorrador(e.target.value);
                      setPerfilGuardado(false);
                    }}
                  />
                </>
              )}

              {rol === "Estudiante" && (
                <>
                  <label>Carrera universitaria</label>

                  <input
                    type="text"
                    placeholder="Ejemplo: Ingeniería en Sistemas"
                    value={carreraBorrador}
                    onChange={(e) => {
                      setCarreraBorrador(e.target.value);
                      setPerfilGuardado(false);
                    }}
                  />
                </>
              )}

              <label>Correo electrónico</label>

              <input
                type="email"
                placeholder="Correo electrónico"
                value={correoBorrador}
                onChange={(e) => {
                  setCorreoBorrador(e.target.value);
                  setPerfilGuardado(false);
                }}
              />

              <label>Número de teléfono</label>

              <input
                type="tel"
                placeholder="+505 8888 0000"
                value={telefonoBorrador}
                onChange={(e) => {
                  setTelefonoBorrador(e.target.value);
                  setPerfilGuardado(false);
                }}
              />

              <button
                className="guardar"
                onClick={guardarPerfil}
              >
                Guardar cambios
              </button>

              {perfilGuardado && (
                <span className="aceptada">
                  Perfil actualizado correctamente
                </span>
              )}
            </div>
          </section>
        )}

        {pagina === "Proveedores" && rol === "Emprendedor" && (
          <section className="panel">
            <h3>Buscar proveedores</h3>

            <p>
              Encuentra proveedores según las necesidades de tu emprendimiento.
            </p>

            <select
              value={filtroProveedor}
              onChange={(e) => setFiltroProveedor(e.target.value)}
            >
              {categoriasProveedores.map((categoria) => (
                <option
                  key={categoria}
                  value={categoria}
                >
                  {categoria === "Todas"
                    ? "Todas las categorías"
                    : categoria}
                </option>
              ))}
            </select>

            {proveedoresFiltrados.length === 0 && (
              <p>No hay proveedores disponibles en esta categoría.</p>
            )}

            <div className="listaCards">
              {proveedoresFiltrados.map((proveedor) => (
                <div
                  className="cardItem"
                  key={proveedor.id}
                >
                  <h3>{proveedor.nombre}</h3>

                  <p>
                    <strong>Categoría:</strong> {proveedor.categoria}
                  </p>

                  <p>{proveedor.descripcion}</p>

                  <button
                    className="guardar"
                    onClick={() => verProveedor(proveedor)}
                  >
                    Ver proveedor
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {pagina === "Detalle proveedor" &&
          proveedorSeleccionado &&
          rol === "Emprendedor" && (
            <section className="panel">
              <h3>{proveedorSeleccionado.nombre}</h3>

              <p>
                <strong>Categoría:</strong>{" "}
                {proveedorSeleccionado.categoria}
              </p>

              <p>{proveedorSeleccionado.descripcion}</p>

              <div className="formulario">
                <button
                  className="guardar"
                  onClick={() =>
                    solicitarConexion(proveedorSeleccionado)
                  }
                >
                  Solicitar conexión
                </button>

                <button
                  className="guardar"
                  onClick={() => setPagina("Proveedores")}
                >
                  Volver
                </button>
              </div>
            </section>
          )}

        {pagina === "Conexiones" &&
          (rol === "Emprendedor" || rol === "Proveedor") && (
            <section className="panel">
              <h3>Mis conexiones</h3>

              {conexiones.length === 0 && (
                <p>Todavía no hay solicitudes de conexión.</p>
              )}

              {conexiones.map((conexion) => (
                <div
                  className="conexion"
                  key={conexion.id}
                >
                  <div>
                    <strong>
                      {rol === "Proveedor"
                        ? conexion.emprendedor
                        : conexion.proveedor}
                    </strong>

                    <p>Estado de la conexión</p>
                  </div>

                  <div>
                    {conexion.estado === "Pendiente" && (
                      <span className="pendiente">
                        Pendiente
                      </span>
                    )}

                    {conexion.estado === "Aceptada" && (
                      <span className="aceptada">
                        Aceptada
                      </span>
                    )}

                    {conexion.estado === "Rechazada" && (
                      <span className="rechazada">
                        Rechazada
                      </span>
                    )}

                    {rol === "Proveedor" &&
                      conexion.estado === "Pendiente" && (
                        <div className="formulario">
                          <button
                            className="guardar"
                            onClick={() =>
                              cambiarEstadoConexion(
                                conexion.id,
                                "Aceptada"
                              )
                            }
                          >
                            Aceptar
                          </button>

                          <button
                            className="guardar"
                            onClick={() =>
                              cambiarEstadoConexion(
                                conexion.id,
                                "Rechazada"
                              )
                            }
                          >
                            Rechazar
                          </button>
                        </div>
                      )}

                    {conexion.estado === "Aceptada" && (
                      <div className="formulario">
                        <button
                          className="guardar"
                          onClick={() =>
                            abrirContactoConexion(conexion)
                          }
                        >
                          Ver contacto
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

        {pagina === "Contacto" &&
          proveedorSeleccionado &&
          conexionSeleccionada && (
            <section className="panel">
              <h3>
                {rol === "Proveedor"
                  ? "Contacto del emprendedor"
                  : "Contacto del proveedor"}
              </h3>

              <p>
                La conexión fue aceptada. Ahora ambas partes pueden
                comunicarse de manera externa.
              </p>

              <div className="cardItem">
                {rol === "Proveedor" ? (
                  <>
                    <h3>{conexionSeleccionada.emprendedor}</h3>

                    <p>
                      <strong>Correo:</strong>{" "}
                      {conexionSeleccionada.correoEmprendedor}
                    </p>

                    <p>
                      <strong>Teléfono:</strong>{" "}
                      {conexionSeleccionada.telefonoEmprendedor}
                    </p>
                  </>
                ) : (
                  <>
                    <h3>{proveedorSeleccionado.nombre}</h3>

                    <p>
                      <strong>Correo:</strong>{" "}
                      {proveedorSeleccionado.correo}
                    </p>

                    <p>
                      <strong>Teléfono:</strong>{" "}
                      {proveedorSeleccionado.telefono}
                    </p>
                  </>
                )}

                <p>
                  WorkBiz no cuenta con chat interno. La comunicación continúa
                  por correo o teléfono.
                </p>
              </div>

              <div className="formulario">
                <button
                  className="guardar"
                  onClick={() => setPagina("Conexiones")}
                >
                  Volver
                </button>
              </div>
            </section>
          )}

        {pagina === "Productos" && rol === "Proveedor" && (
          <section className="panel">
            <h3>Mi catálogo</h3>

            <p>
              Agrega y administra los productos o servicios que ofreces.
            </p>

            <div className="formulario">
              <input
                type="text"
                placeholder="Nombre del producto o servicio"
                value={nombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
              />

              <input
                type="text"
                placeholder="Categoría"
                value={categoriaProducto}
                onChange={(e) => setCategoriaProducto(e.target.value)}
              />

              <textarea
                placeholder="Descripción"
                rows={4}
                value={descripcionProducto}
                onChange={(e) =>
                  setDescripcionProducto(e.target.value)
                }
              />

              <label>Imagen del producto</label>

              <input
                type="file"
                accept="image/*"
                onChange={seleccionarImagenProducto}
              />

              {imagenProducto && (
                <img
                  src={imagenProducto}
                  alt="Vista previa"
                  style={{
                    width: "180px",
                    height: "130px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              )}

              <button
                className="guardar"
                onClick={guardarProducto}
              >
                {productoEditando !== null
                  ? "Guardar cambios"
                  : "Agregar al catálogo"}
              </button>

              {productoEditando !== null && (
                <button
                  className="guardar"
                  onClick={limpiarFormularioProducto}
                >
                  Cancelar edición
                </button>
              )}
            </div>

            {productos.length === 0 && (
              <p>Todavía no tienes productos en tu catálogo.</p>
            )}

            <div className="listaCards">
              {productos.map((producto) => (
                <div
                  className="cardItem"
                  key={producto.id}
                >
                  {producto.imagen && (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{
                        width: "100%",
                        height: "190px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        marginBottom: "15px",
                      }}
                    />
                  )}

                  <h3>{producto.nombre}</h3>

                  <p>
                    <strong>Categoría:</strong> {producto.categoria}
                  </p>

                  <p>{producto.descripcion}</p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className="guardar"
                      onClick={() => editarProducto(producto)}
                    >
                      Editar
                    </button>

                    <button
                      className="guardar"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {pagina === "Publicar oportunidad" &&
          rol === "Emprendedor" && (
            <section className="panel">
              <h3>Publicar oportunidad</h3>

              <p>
                Publica oportunidades para estudiantes que quieran obtener
                experiencia laboral.
              </p>

              <div className="formulario">
                <input
                  type="text"
                  placeholder="Título de la oportunidad"
                  value={tituloOportunidad}
                  onChange={(e) =>
                    setTituloOportunidad(e.target.value)
                  }
                />

                <textarea
                  placeholder="Descripción de la oportunidad"
                  rows={5}
                  value={descripcionOportunidad}
                  onChange={(e) =>
                    setDescripcionOportunidad(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Carrera requerida"
                  value={carreraOportunidad}
                  onChange={(e) =>
                    setCarreraOportunidad(e.target.value)
                  }
                />

                <button
                  className="guardar"
                  onClick={publicarOportunidad}
                >
                  Publicar oportunidad
                </button>
              </div>

              <div className="listaCards">
                {oportunidades.map((oportunidad) => (
                  <div
                    className="cardItem"
                    key={oportunidad.id}
                  >
                    <h3>{oportunidad.titulo}</h3>

                    <p>
                      <strong>Carrera:</strong>{" "}
                      {oportunidad.carrera}
                    </p>

                    <p>{oportunidad.descripcion}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        {pagina === "Oportunidades" && rol === "Estudiante" && (
          <section className="panel">
            <h3>Oportunidades disponibles</h3>

            <p>
              Explora oportunidades publicadas por emprendedores.
            </p>

            <select
              value={filtroCarrera}
              onChange={(e) => setFiltroCarrera(e.target.value)}
            >
              {carrerasDisponibles.map((carrera) => (
                <option
                  key={carrera}
                  value={carrera}
                >
                  {carrera === "Todas"
                    ? "Todas las carreras"
                    : carrera}
                </option>
              ))}
            </select>

            {oportunidadesFiltradas.length === 0 && (
              <p>
                No hay oportunidades disponibles para esta carrera.
              </p>
            )}

            <div className="listaCards">
              {oportunidadesFiltradas.map((oportunidad) => {
                const yaPostulado = postulaciones.some(
                  (postulacion) =>
                    postulacion.oportunidadId === oportunidad.id &&
                    postulacion.correoEstudiante === correo
                );

                return (
                  <div
                    className="cardItem"
                    key={oportunidad.id}
                  >
                    <h3>{oportunidad.titulo}</h3>

                    <p>
                      <strong>Emprendedor:</strong>{" "}
                      {oportunidad.emprendedor}
                    </p>

                    <p>
                      <strong>Carrera:</strong>{" "}
                      {oportunidad.carrera}
                    </p>

                    <p>{oportunidad.descripcion}</p>

                    <button
                      className="guardar"
                      disabled={yaPostulado}
                      onClick={() => postularme(oportunidad)}
                    >
                      {yaPostulado
                        ? "Ya postulado"
                        : "Postularme"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {pagina === "Postulaciones" && rol === "Estudiante" && (
          <section className="panel">
            <h3>Mis postulaciones</h3>

            <p>
              Consulta el estado de las oportunidades a las que te has
              postulado.
            </p>

            {postulacionesEstudiante.length === 0 && (
              <p>
                Todavía no te has postulado a ninguna oportunidad.
              </p>
            )}

            {postulacionesEstudiante.map((postulacion) => (
              <div
                className="conexion"
                key={postulacion.id}
              >
                <div>
                  <strong>{postulacion.titulo}</strong>
                  <p>{postulacion.emprendedor}</p>
                  <p>{postulacion.carrera}</p>
                </div>

                <div>
                  {postulacion.estado === "Pendiente" && (
                    <span className="pendiente">
                      Pendiente
                    </span>
                  )}

                  {postulacion.estado === "Aceptada" && (
                    <>
                      <span className="aceptada">
                        Aceptada
                      </span>

                      <div className="formulario">
                        <button
                          className="guardar"
                          onClick={() =>
                            abrirContactoEstudiante(postulacion)
                          }
                        >
                          Ver contacto
                        </button>
                      </div>
                    </>
                  )}

                  {postulacion.estado === "Rechazada" && (
                    <span className="rechazada">
                      Rechazada
                    </span>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {pagina === "Postulaciones recibidas" &&
          rol === "Emprendedor" && (
            <section className="panel">
              <h3>Postulaciones recibidas</h3>

              <p>
                Revisa las postulaciones de estudiantes a tus oportunidades.
              </p>

              {postulaciones.length === 0 && (
                <p>Todavía no has recibido postulaciones.</p>
              )}

              {postulaciones.map((postulacion) => (
                <div
                  className="conexion"
                  key={postulacion.id}
                >
                  <div>
                    <strong>{postulacion.estudiante}</strong>
                    <p>{postulacion.titulo}</p>
                    <p>Carrera: {postulacion.carrera}</p>
                  </div>

                  <div>
                    {postulacion.estado === "Pendiente" && (
                      <>
                        <span className="pendiente">
                          Pendiente
                        </span>

                        <div className="formulario">
                          <button
                            className="guardar"
                            onClick={() =>
                              cambiarEstadoPostulacion(
                                postulacion.id,
                                "Aceptada"
                              )
                            }
                          >
                            Aceptar
                          </button>

                          <button
                            className="guardar"
                            onClick={() =>
                              cambiarEstadoPostulacion(
                                postulacion.id,
                                "Rechazada"
                              )
                            }
                          >
                            Rechazar
                          </button>
                        </div>
                      </>
                    )}

                    {postulacion.estado === "Aceptada" && (
                      <>
                        <span className="aceptada">
                          Aceptada
                        </span>

                        <div className="formulario">
                          <button
                            className="guardar"
                            onClick={() =>
                              abrirContactoEstudiante(postulacion)
                            }
                          >
                            Ver contacto
                          </button>
                        </div>
                      </>
                    )}

                    {postulacion.estado === "Rechazada" && (
                      <span className="rechazada">
                        Rechazada
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

        {pagina === "Contacto estudiante" &&
          postulacionSeleccionada && (
            <section className="panel">
              <h3>
                {rol === "Emprendedor"
                  ? "Contacto del estudiante"
                  : "Contacto del emprendedor"}
              </h3>

              <p>
                La postulación fue aceptada. Ahora ambas partes pueden
                comunicarse de manera externa.
              </p>

              <div className="cardItem">
                {rol === "Emprendedor" ? (
                  <>
                    <h3>
                      {postulacionSeleccionada.estudiante}
                    </h3>

                    <p>
                      <strong>Oportunidad:</strong>{" "}
                      {postulacionSeleccionada.titulo}
                    </p>

                    <p>
                      <strong>Carrera:</strong>{" "}
                      {postulacionSeleccionada.carrera}
                    </p>

                    <p>
                      <strong>Correo:</strong>{" "}
                      {postulacionSeleccionada.correoEstudiante}
                    </p>

                    <p>
                      <strong>Teléfono:</strong>{" "}
                      {postulacionSeleccionada.telefonoEstudiante}
                    </p>
                  </>
                ) : (
                  <>
                    <h3>
                      {postulacionSeleccionada.emprendedor}
                    </h3>

                    <p>
                      <strong>Oportunidad:</strong>{" "}
                      {postulacionSeleccionada.titulo}
                    </p>

                    <p>
                      <strong>Correo:</strong>{" "}
                      {postulacionSeleccionada.correoEmprendedor}
                    </p>

                    <p>
                      <strong>Teléfono:</strong>{" "}
                      {postulacionSeleccionada.telefonoEmprendedor}
                    </p>
                  </>
                )}

                <p>
                  WorkBiz no cuenta con chat interno. La comunicación continúa
                  por correo o teléfono.
                </p>
              </div>

              <div className="formulario">
                <button
                  className="guardar"
                  onClick={() => {
                    if (rol === "Emprendedor") {
                      setPagina("Postulaciones recibidas");
                    } else {
                      setPagina("Postulaciones");
                    }
                  }}
                >
                  Volver
                </button>
              </div>
            </section>
          )}
      </main>
    </div>
  );
}

export default App;
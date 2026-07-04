export default {
  appTitle: "Dulcería Cuellar",
  close: "Cerrar",
  back: "Atrás",
  page: "Página",
  actions: "Acciones",
  none: "Ninguno",
  all: "Todos",
  showMoreOptions: "Mostrar más opciones",
  dashboard: "Panel",
  go: "Ir",
  forms: {
    email: "Correo electrónico",
    password: "Contraseña",
    newPassword: "Confirmar contraseña",
    role: "Rol",
    isActive: "Activo",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    create: "Crear",
    update: "Guardar cambios",
    name: "Nombre",
    address: "Dirección",
    isPickupEnabled: "Recogida habilitada",
    pickupEnabled: "Habilitar recogida",
    inactive: "Inactivo",
  },
  users: {
    table: {
      empty: "No hay usuarios para mostrar",
      inactive: "Inactivo",
      name: "Nombre",
      search: "Buscar por nombre, apellido o correo",
      search2: "Buscar por nombre, apellido, correo o teléfono",
      cashbackBalance: "Puntos",
    },
    modals: {
      user: {
        createTitle: "Crear usuario",
        editTitle: "Editar usuario",
        description: "Gestiona la información de acceso y perfil del usuario.",
      },
      client: {
        createTitle: "Crear cliente",
        editTitle: "Editar cliente",
        description: "Gestiona la información de acceso y perfil del cliente.",
      },
    },
    forms: {
      user: {
        created: "Usuario creado correctamente",
        updated: "Usuario actualizado correctamente",
      },
      client: {
        created: "Cliente creado correctamente",
        updated: "Cliente actualizado correctamente",
      },
    },
  },
  branches: {
    select: "Seleccionar sucursal",
    forms: {},
    table: {
      empty: "No hay sucursales para mostrar",
      search: "Buscar por nombre",
    },
  },
  auth: {
    forms: {
      login: {
        title: "Bienvenido de nuevo",
        description: "Ingresa tus datos para continuar",
        submit: "Ingresar",
        forgotPassword: "¿Olvidaste tu contraseña?",
      },
      passwordRecoveryEmailStep: {
        title: "Recuperar contraseña",
        description:
          "Ingrese el correo electrónico donde se enviará el código de recuperación de contraseña.",
        submit: "Enviar",
      },
      passwordRecoveryOtpStep: {
        title: "Recuperar contraseña",
        description: "Ingrese el código enviado a su correo electrónico...",
        verify: "Verificar",
        resendCode: "Reenviar código",
      },
      resetPassword: {
        title: "Recuperar contraseña",
        description: "Ingrese su nueva contraseña",
      },
    },
  },
  errors: {
    notAccess: "No tienes permisos para acceder a esta página",
    passwordNotMatch: "Las contraseñas no coinciden",
    passwordRequired: "La contraseña debe tener al menos 8 caracteres",
    passwordMin: "La contraseña debe tener al menos 8 caracteres",
  },
  layouts: {
    dashboard: {
      logout: "Cerrar sesión",
    },
  },
  breadcrumbs: {
    dashboard: "Panel",
    users: "Usuarios",
    clients: "Clientes",
    branches: "Sucursales",
  },
  sections: {
    users: "Usuarios",
    clients: "Clientes",
    branches: "Sucursales",
  },
  tooltip: {
    deactivateUserAccessSystem:
      "Si desactiva al usuario este perderá el acceso al sistema",
  },
  roles: {
    OPERATOR: "Operador",
    BRANCH_OPERATOR: "Operador de sucursal",
    ADMIN: "Administrador",
    SALESPERSON: "Ventas",
    DELIVERY_DRIVER: "Conductor de entrega",
    CLIENT: "Cliente",
  },
  home: {
    manageUsers: `Gestiona los usuarios del sistema. Consulta el listado de usuarios registrados, 
                  crea nuevas cuentas, actualiza la información existente y administra sus datos.`,
    manageClients: `Gestiona los usuarios del sistema. Consulta el listado de usuarios registrados, 
                    crea nuevas cuentas, actualiza la información existente y administra sus datos.`,
  },
};

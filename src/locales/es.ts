export default {
  appTitle: "Dulcería Cuellar",
  close: "Cerrar",
  back: "Atrás",
  forms: {
    email: "Correo electrónico",
    password: "Contraseña",
    newPassword: "Confirmar contraseña",
    role: "Rol",
    isActive: "Activo",
    firstName: "Nombre",
    lastName: "Apellido",
  },
  users: {
    table: {
      empty: "No hay usuarios para mostrar",
      inactive: "Inactivo",
      name: "Nombre",
      search: "Buscar por nombre, apellido o correo",
    },
    modals: {
      user: {
        createTitle: "Crear usuario",
        editTitle: "Editar usuario",
        description: "Gestiona la información de acceso y perfil del usuario.",
      },
    },
    forms: {
      user: {
        create: "Crear",
        update: "Guardar cambios",
        created: "Usuario creado correctamente",
        updated: "Usuario actualizado correctamente",
      },
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
  },
  sections: {
    users: "Usuarios",
  },
};

# 🎮 Games Library – Frontend (React)

Este es el **frontend** de la aplicación web **Games Library**, parte del Trabajo de Fin de Grado. Esta aplicación permite a los usuarios gestionar su biblioteca de videojuegos, acceder mediante su cuenta de Google, jugar un minijuego temático y, si son administradores, gestionar usuarios desde un panel exclusivo.

## ✅ Requisitos previos

Antes de iniciar el proyecto, asegúrate de tener instalado en tu sistema:

- **Node.js** (v16 o superior)
- **npm** (gestor de paquetes de Node, generalmente viene con Node.js)

## 🚀 Instalación y ejecución

1. Abre una terminal y navega hasta la carpeta del frontend del proyecto.
2. Instala las dependencias del proyecto (ya que la carpeta `node_modules` no está incluida en el repositorio):

```bash
npm install
```

3. Una vez instaladas las dependencias, inicia el servidor de desarrollo con:

```bash
npm start
```

4. La aplicación se abrirá automáticamente en tu navegador en:

```
http://localhost:3000
```

## 🌐 Funcionalidades del frontend

- Autenticación mediante Google OAuth2.
- Gestión visual de la biblioteca de videojuegos (CRUD).
- Minijuego visual basado en jefes de la saga Soulsborne.
- Panel de administración (visible solo para usuarios con rol admin).
- Interfaz responsive gracias a Bootstrap.

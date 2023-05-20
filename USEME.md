# Proyecto

Esta aplicación web se llama Mentor Match

## Objetivo

Es una aplicación web responsive para uso en mobile y desktop. 
Está dirigida a personas estudiantes de programación que quieran realizar un proyecto final de una aplicación real y necesiten la guía de un profesional que pueda resolver sus dudas. A su vez está dirigida a profesionales del mundo de la programación o de la web que quieran compartir y guiar alumnos en sus proyectos.

## Páginas

Las páginas que contiene esta aplicación web son:
- Home
- Login
- Registro
- Mi cuenta

### Home

En ella se encuentra la bienvenida al usuario no logeado/registrado.
En el caso de que se haga login/registro, en esta página aparecerá el carousel de usuarios compatible con sus intereses.
Si es un mentor aparecerán solo mentorizados y si ha añadido tecnologías aparecerán los mentorizados con tecnologías compatibles. 
Para cada uno de los usuarios compatibles, se podrá clickar el botón de Haz Match que ejecutará el gestor de correo tanto en mobile o desktop con un mensaje con destinatario, título y cuerpo predeterminado y personalizado que podrá editarse.
Es el modo de contacto que contempla de momento la aplicación web.

### Registro

En ella se encuentra un formulario de registro parcial.
Además, hay un link para redireccionar al usuario ya registrado al login.
En el caso de que ya haya hecho login/registro, pero se quiera acceder a esta página modificando la url, aparecé un link para regresar a la home.

### Login

En ella se encuentra un formulario de login con input email y password con gestión de errores en el caso de que no se encuentre en bbdd ese usuario.
Además, hay un link para redireccionar al usuario no registrado al registro.

### Mi Cuenta

En ella se encuentra un formulario con los campos no requeridos para el uso de la aplicación. Los cuáles son la descripción o las tecnologías a usar en el proyecto.
A esta página es redirigido el usuario una vez hecho el registro, pero puede saltar a la Home directamente sin rellenar los campos, o también puede llegar hasta mi cuenta una vez ya logeado, a través del icono de la hamburguesa del header.
Además, en este formulario se permiten editar los valores introducidos anteriormente.


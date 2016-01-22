<?php
// Sesion Sistema
 if (!isset($_SESSION)) session_start();
/**
 * MoneyAPP Version
 *
 * @var string
 *
 */
define('WEB_VERSION', '0.0.1');
// Enlace Autor
define('URLAUTOR','');
// Activar Desarrollo del proyecto
define('ENTORNO_DESARROLLO', false);
// Barra separadora
define('DS', DIRECTORY_SEPARATOR);
//Archivos Estaticos del Proyecto
define('ESTATICO', URLBASE.'estatico'.DS);
// Directorio Root del Proyecto
define('__ROOT__', dirname(dirname(__FILE__)).DS);
// Directorio del Sistema del Proyecto
define('SISTEMA', __ROOT__ .'sistema'.DS);
// Directorio de las Clases del Proyecto
define('CLASE', SISTEMA.DS.'clase'.DS);
// Directorio de los modulos del Proyecto
define('MODULO', SISTEMA.DS.'modulo'.DS.'');
// Prevenir que la mayoria de navegadores no puedan manejar con javascript a través del atributo "HttpOnly"
ini_set('session.cookie_httponly', 1);
// Utilizar únicamente cookies para la propagación del identificador de sesión.
ini_set('session.use_only_cookies', 1);
// Establecer la zona horaria predeterminada UTC.
date_default_timezone_set(HORARIO);

// Directorios Importantes NO EDITAR DE AQUI EN ADELANTE
require_once (SISTEMA.'metodo.php');
require_once (SISTEMA.'clase.php');
require_once (SISTEMA.'OOP.php');

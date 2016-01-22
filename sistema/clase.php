<?php
/*
|--------------------------------------------------------------------------|
| Carga automática Clases
|--------------------------------------------------------------------------|
*/
function __autoload($className) {
	if (file_exists(SISTEMA.'clase' . DS . strtolower($className) . '.clase.php')):
		require_once(SISTEMA.'clase' . DS . strtolower($className) . '.clase.php');
	endif;
}
//Instanciar Clases
$db			= new Conexion();
$noticia	= new Noticias();
// Ejecutar Algunas Clases
$SistemaApp->ReportarError();

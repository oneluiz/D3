<?php
class Conexion {

	private $db_host = "";  // Cambiar según sea necesario
	private $db_user = "";  // Cambiar según sea necesario
	private $db_pass = "";  // Cambiar según sea necesario
	private $db_name = "";	// Cambiar según sea necesario

    /**
     * Establecimiento de la conexión de base de datos
     * @return manejador de conexión de base de datos
     */
	public function Conectar(){

		$this->mysqli = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);
		// Soporte para caracteres especiales en la base de datoss
		$this->mysqli->query("SET NAMES 'utf8'");

		if (mysqli_connect_error()){
			die("Error al conectar con la base de datos (" . mysqli_connect_errno() . ") " . mysqli_connect_error());
		}

		// Devolver recurso de conexión
		return $this->mysqli;
	}

	public function SQL($sqlconsulta){
		return $this->Conectar()->query($sqlconsulta);
	}
}

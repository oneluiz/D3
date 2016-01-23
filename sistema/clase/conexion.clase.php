<?php
class Conexion {

	private $db_host = "";  // Cambiar host según sea necesario
	private $db_user = "";  // Cambiar usuario según sea necesario
	private $db_pass = "";  // Cambiar contraseña según sea necesario
	private $db_name = "";	// Cambiar nombre según sea necesario
	private $db_auth = "";	// Cambiar auth según sea necesario
	private $db_chars= "";	// Cambiar personaje según sea necesario
	private $db_world= "";	// Cambiar mundo según sea necesario

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

		/**
		* Devolver recurso de conexión
		*/
		return $this->mysqli;
	}

	public function Auth(){

		$this->mysqli = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_auth);
		// Soporte para caracteres especiales en la base de datoss
		$this->mysqli->query("SET NAMES 'utf8'");

		if (mysqli_connect_error()){
			die("Error al conectar con la base de datos (" . mysqli_connect_errno() . ") " . mysqli_connect_error());
		}

		/**
		* Devolver recurso de conexión
		*/
		return $this->mysqli;
	}

	public function Personajes(){

		$this->mysqli = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_chars);
		// Soporte para caracteres especiales en la base de datoss
		$this->mysqli->query("SET NAMES 'utf8'");

		if (mysqli_connect_error()){
			die("Error al conectar con la base de datos (" . mysqli_connect_errno() . ") " . mysqli_connect_error());
		}

		/**
		* Devolver recurso de conexión
		*/
		return $this->mysqli;
	}

	public function SQL($sqlconsulta){
		return $this->Conectar()->query($sqlconsulta);
	}

	public function AuthQuery(){
		return $this->Conectar()->query($sqlconsulta);
	}
}

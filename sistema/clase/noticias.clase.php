<?php
class Noticias extends Conexion {

	public function TiempoPublicacion($fecha){

		if(empty($fecha)){
			return "No hay fecha prevista";
		}

		$periodos	= array("segundo", "minuto", "hora", "d&iacute;a", "semana", "mes", "a&ntilde;o", "d&eacute;cada");
		$longitudes	= array("60","60","24","7","4.35","12","10");
		$ahora		= time();

		$unix_fecha = strtotime( $fecha );

		/**
		 *  Comprobar la validez de la fecha
		 */
		if( empty( $unix_fecha ) )
		{
			return "Fecha Desconocida";
		}

		/**
		 *  Fecha futura o fecha pasada
		 */
		if( $ahora > $unix_fecha )
		{
			$diferencia = $ahora - $unix_fecha;
			$tiempo = "hace";
		}
		else
		{
			$diferencia = $unix_fecha - $ahora;
			$tiempo = "desde ahora, hace";
		}

		for( $j = 0; $diferencia >= $longitudes[$j] && $j < count($longitudes)-1; $j++ )
		{
			$diferencia /= $longitudes[$j];
		}

		$diferencia = round( $diferencia );

		if( $diferencia != 1 )
		{
			$periodos[$j].= "s";
		}

		return " {$tiempo} $diferencia $periodos[$j]";
	}
}
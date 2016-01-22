/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `noticias` */

DROP TABLE IF EXISTS `noticias`;

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la noticia',
  `titulo` varchar(55) NOT NULL COMMENT 'Titulo de la noticia',
  `contenido` text NOT NULL COMMENT 'Contenido de la noticia',
  `imagen` varchar(55) DEFAULT NULL COMMENT 'Imagen de la noticia',
  `enlace` varchar(55) DEFAULT NULL COMMENT 'Enlace de la noticia',
  `fecha` varchar(22) DEFAULT NULL COMMENT 'Fecha de la publicación de la noticia',
  `habilitada` tinyint(1) DEFAULT '1' COMMENT 'Habilitar la noticia',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `noticias` */

LOCK TABLES `noticias` WRITE;

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

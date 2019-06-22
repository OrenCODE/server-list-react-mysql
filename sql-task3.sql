create database test3;

use test3;

CREATE TABLE `hosting` (
`hostingid` int(10) NOT NULL AUTO_INCREMENT,
`name` varchar(50) NOT NULL,
PRIMARY KEY (`hostingid`)
);

CREATE TABLE `servers` (
`id` int(7) NOT NULL AUTO_INCREMENT,
`hostingId` int(10) NOT NULL,
`alias` varchar(25) NOT NULL,
`ip` varchar(90) NOT NULL,
`status` boolean default true,
 PRIMARY KEY (`id`)
);

INSERT INTO hosting (hostingid,name)
VALUES (1 , "Amazon" ),
(2, "Microsoft"),
(3, "Redhat"),
(4, "Cisco");

INSERT INTO servers (alias,ip,hostingId)
VALUES ("shopping server", "10.0.0:1000", "1"),
("xbox server", "20.0.0:1005", "2"),
("users server", "30.0.0:4002", "3"),
("tv server", "22.0.0:3003", "4");

SELECT * FROM hosting;
SELECT * FROM servers;

SELECT * from servers inner join hosting on servers.hostingId = hosting.hostingId;
SELECT * from servers join hosting on servers.hostingId = hosting.hostingId;
# Projet_node
projet node A2 BIN1
group 1: Mickael et Léa,  
Louis n'a pas participé au projet car il quitte l'école

Projet :
API de gestion de projet comprenant les entités "Project", "User", "Task", "Employee".

On a fait 4 requêtes mysql au préalable pour pouvoir créer les tables : 

* Create table Users( id MEDIUMINT NOT NULL, lastname varchar(100), firstname varchar(100), email varchar(50), password varchar(100), role varchar(50), createdAt date, updatedAt date, PRIMARY KEY (id) );  
* Create table Employees( Id MEDIUMINT NOT NULL, lastname varchar(100), firstname varchar(100), email varchar(50), jobs varchar(50), createdAt date, updatedAt date, PRIMARY KEY (Id) );  
* Create table Projects( Id MEDIUMINT NOT NULL, nameProject varchar(100), name varchar(100), description varchar(100), status varchar(20), startDate date,dueDate date, createdAt date, updatedAt date, PRIMARY KEY (Id) );  
* Create table Tasks( Id MEDIUMINT NOT NULL, name varchar(100), description varchar(100), status varchar(20), dueDate date, createdAt date, updatedAt date, PRIMARY KEY (Id) );

Et ensuite on a insérer une ligne dans la table Users pour avoir un admin :  
insert into Users values(1,"Chaksoukane","Mickael","mickael@test.com","$2a$12$UFgK1Vz4snsrHv/byTC8peg6ixVJbp8l0CPept8riZzEfKsH7rhZa","ADMIN","2023-01-07","2023-01-07");

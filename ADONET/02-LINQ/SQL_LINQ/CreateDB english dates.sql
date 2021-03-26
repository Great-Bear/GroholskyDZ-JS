CREATE DATABASE SQL_DB_LINQ
GO
Use SQL_DB_LINQ

CREATE TABLE Workers
(
	ID int PRIMARY KEY IDENTITY, 
	Name nvarchar(30) NOT NULL,
	SurName nvarchar(30) NOT NULL,
	Patronymic nvarchar(30) NOT NULL,
	GotJob Date NOT NULL,
	QuitJob Date NOT NULL,
	CHECK(GotJob <= QuitJob),
	UNIQUE (Name,SurName,Patronymic)
)
GO
INSERT INTO Workers(Name,SurName,Patronymic,GotJob,QuitJob)
VALUES('Лев','Толстой','Николаевич','03-20-2020','04-20-2021');
	INSERT INTO Workers(Name,SurName,Patronymic,GotJob,QuitJob)
	VALUES('Рэй ','Брэдбери ','Дууглас ','03-20-2021','04-20-2022');
		INSERT INTO Workers(Name,SurName,Patronymic,GotJob,QuitJob)
		VALUES('Джон','Че́йни','Грииффит','03-20-2022','04-20-2023');
GO
CREATE TABLE DaysWork
(
	ID int PRIMARY KEY IDENTITY,	
	Id_Worker int REFERENCES Workers (ID),
	Day Date NOT NULL UNIQUE,
)
GO
INSERT INTO DaysWork(Day,Id_Worker)
VALUES('03-20-2020',1);
	INSERT INTO DaysWork(Day,Id_Worker)
	VALUES('04-1-2020',1);
		INSERT INTO DaysWork(Day,Id_Worker)
		VALUES('04-10-2020',1);
INSERT INTO DaysWork(Day,Id_Worker)
VALUES('03-20-2021',2);
	INSERT INTO DaysWork(Day,Id_Worker)
	VALUES('04-1-2021',2);
		INSERT INTO DaysWork(Day,Id_Worker)
		VALUES('04-10-2021',2);
INSERT INTO DaysWork(Day,Id_Worker)
VALUES('03-20-2022',3);
	INSERT INTO DaysWork(Day,Id_Worker)
	VALUES('04-1-2022',3);
		INSERT INTO DaysWork(Day,Id_Worker)
		VALUES('04-10-2022',3);
GO
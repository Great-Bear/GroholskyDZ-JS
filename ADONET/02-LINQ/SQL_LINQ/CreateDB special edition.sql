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
VALUES('Лев','Толстой','Николаевич','20-03-2020','20-03-2021');
	INSERT INTO Workers(Name,SurName,Patronymic,GotJob,QuitJob)
	VALUES('Рэй ','Брэдбери ','Дууглас ','20-03-2021','20-03-2022');
		INSERT INTO Workers(Name,SurName,Patronymic,GotJob,QuitJob)
		VALUES('Джон','Че́йни','Грииффит','20-03-2022','20-04-2023');
GO
CREATE TABLE DaysWork
(
	ID int PRIMARY KEY IDENTITY,	
	Id_Worker int REFERENCES Workers (ID),
	Day Date NOT NULL UNIQUE,
)
GO
INSERT INTO DaysWork(Day,Id_Worker)
VALUES('20-03-2020',1);
	INSERT INTO DaysWork(Day,Id_Worker)
	VALUES('1-04-2020',1);
		INSERT INTO DaysWork(Day,Id_Worker)
		VALUES('10-04-2020',1);
INSERT INTO DaysWork(Day,Id_Worker)
VALUES('20-03-2021',2);
	INSERT INTO DaysWork(Day,Id_Worker)
	VALUES('1-04-2021',2);
		INSERT INTO DaysWork(Day,Id_Worker)
		VALUES('10-04-2021',2);
INSERT INTO DaysWork(Day,Id_Worker)
VALUES('20-03-2022',3);
	INSERT INTO DaysWork(Day,Id_Worker)
	VALUES('1-04-2022',3);
		INSERT INTO DaysWork(Day,Id_Worker)
		VALUES('10-04-2022',3);
GO
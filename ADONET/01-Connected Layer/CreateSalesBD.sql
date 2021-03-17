CREATE DATABASE Sales
GO
USE Sales
CREATE TABLE Buyers
(
	ID int PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(30) NOT NULL,
	LastName NVARCHAR(30) NOT NULL
)
GO

INSERT INTO Buyers(FirstName,LastName)
VALUES ('Bear','Brown')
INSERT INTO Buyers(FirstName,LastName)
VALUES ('Penguin','Bird')
INSERT INTO Buyers(FirstName,LastName)
VALUES ('Zebra','Funny')
INSERT INTO Buyers(FirstName,LastName)
VALUES ('Bee','Boss')
INSERT INTO Buyers(FirstName,LastName)
VALUES ('Raccoon','Robber')
GO

CREATE TABLE Sellers
(
	ID int PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(30) NOT NULL,
	LastName NVARCHAR(30) NOT NULL
)
GO

INSERT INTO Sellers(FirstName,LastName)
VALUES('Squirrel','Dangerous')
INSERT INTO Sellers(FirstName,LastName)
VALUES('Squirrel','Mad')
GO

CREATE TABLE Sales
(
	ID int PRIMARY KEY IDENTITY,
	Id_Buyers int REFERENCES Buyers (ID) NOT NULL,
	Id_Sellers int REFERENCES Sellers (ID) NOT NULL,
	TransactAmount float,
	TransactDate Date
)
GO
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(1,1,50,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(1,1,150,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(2,1,450,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(2,1,550,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(3,2,50,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(3,2,1050,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(4,2,50,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(4,2,100,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(5,2,450,GETDATE())
INSERT INTO Sales(Id_Buyers,Id_Sellers,TransactAmount,TransactDate)
VALUES(5,2,400,GETDATE())
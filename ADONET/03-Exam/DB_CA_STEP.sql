CREATE DATABASE CA_STEP
GO


USE CA_STEP

CREATE TABLE Branches
(
ID INT PRIMARY KEY IDENTITY,
Country NVARCHAR(50) NOT NULL,
City NVARCHAR(50) NOT NULL,
Street NVARCHAR(50) NOT NULL,
UNIQUE(Country,City,Street)
)
GO 

INSERT INTO Branches(Country,City,Street)
VALUES('Ukraine','Odessa','Sadovaya 24')
INSERT INTO Branches(Country,City,Street)
VALUES('Ukraine','Kiev','Sadovaya 12')
INSERT INTO Branches(Country,City,Street)
VALUES('Ukraine','Lviv','Sadovaya 10')

GO
CREATE TABLE ContactsBranches
(
ID INT PRIMARY KEY IDENTITY,
ID_Branches INT NOT NULL,
Web_Site NVARCHAR(50) NOT NULL,
Phone NVARCHAR(20) NOT NULL,
FOREIGN KEY (ID_Branches) REFERENCES Branches (Id) ON DELETE CASCADE
)
GO
INSERT INTO ContactsBranches(ID_Branches,Web_Site,Phone)
VALUES(1,'Step.org','+3804324232')
INSERT INTO ContactsBranches(ID_Branches,Web_Site,Phone)
VALUES(2,'Step.org','+3806453449')
INSERT INTO ContactsBranches(ID_Branches,Web_Site,Phone)
VALUES(3,'Step.org','+3802345312')

CREATE TABLE Position
(
ID INT PRIMARY KEY IDENTITY,
Name NVARCHAR(50) NOT NULL UNIQUE,
RateHour MONEY NOT NULL
) 
GO

INSERT INTO Position(Name,RateHour)
VALUES('C teacher',100);
INSERT INTO Position(Name,RateHour)
VALUES('C++ teacher',100);
INSERT INTO Position(Name,RateHour)
VALUES('C# teacher',100);

CREATE TABLE Workers
(
ID INT PRIMARY KEY IDENTITY,
Name NVARCHAR(50) NOT NULL,
SurName NVARCHAR(50) NOT NULL,
DataBirth DATE,
EmploymentDate DATE NOT NULL,
DismissalDate DATE,
UNIQUE(Name,SurName,DataBirth)
)
GO
INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate,DismissalDate)
VALUES('Alexander','Pupkov','07-02-1980','07-02-2021','07-02-2022')
INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate)
VALUES('Vova','Pupkov','07-02-1980','07-02-2021')
INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate)
VALUES('Victor','Pupkov','07-02-1980','07-02-2021')

INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate,DismissalDate)
VALUES('Alexander','Svistun','07-02-1980','07-02-2012','07-02-2013')
INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate)
VALUES('Vova','Svistun','07-02-1980','07-02-2012')
INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate)
VALUES('Victor','Svistun','07-02-1980','07-02-2012')

INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate,DismissalDate)
VALUES('Alexander','Kovrov','07-02-1980','07-02-2013','07-02-2014')
INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate)
VALUES('Vova','Kovrov','07-02-1980','07-02-2013')
INSERT INTO Workers(Name,Surname,DataBirth,EmploymentDate)
VALUES('Victor','Kovrov','07-02-1980','07-02-2013')
GO

CREATE TABLE Specialists
(
ID INT PRIMARY KEY IDENTITY,
ID_Branches INT REFERENCES Branches (ID) ON DELETE CASCADE,
ID_Workers INT REFERENCES Workers (ID) ,
ID_Position INT REFERENCES Position (ID),
)
GO

INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(1,2,1)
INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(1,4,2)
INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(1,5,3)

INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(2,6,1)
INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(2,7,2)
INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(3,8,3)



INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(3,9,1)
INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(3,2,2)
INSERT INTO Specialists(ID_Branches,ID_Workers,ID_Position)
VALUES(3,3,3)


CREATE TABLE Subjects
(
ID INT PRIMARY KEY IDENTITY,
Name NVARCHAR(50) NOT NULL UNIQUE
)
GO

INSERT INTO Subjects(Name)
VALUES('C')
INSERT INTO Subjects(Name)
VALUES('C++')
INSERT INTO Subjects(Name)
VALUES('C#')
GO

CREATE TABLE NameCourses
(
ID INT PRIMARY KEY IDENTITY,
Name NVARCHAR(50) NOT NULL UNIQUE
)
GO

INSERT INTO NameCourses
VALUES('Bakalavrat')
INSERT INTO NameCourses
VALUES('Magistracy')
INSERT INTO NameCourses
VALUES('Training University')
GO

CREATE TABLE Courses
(
ID INT PRIMARY KEY IDENTITY,
ID_NameCourse INT REFERENCES NameCourses (ID) ON DELETE CASCADE,
ID_Subject INT REFERENCES Subjects (ID) ON DELETE CASCADE,
CountHours INT CHECK(CountHours >= 0),
Describe NVARCHAR(MAX)
)
GO

INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(1,1,40)
INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(1,2,40)
INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(1,3,40)

INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(2,1,40)
INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(2,2,40)
INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(2,3,40)

INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(3,1,20)
INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(3,2,20)
INSERT INTO Courses(ID_NameCourse,ID_Subject,CountHours)
VALUES(3,3,20)
GO

CREATE TABLE Clients
(
ID INT PRIMARY KEY IDENTITY,
Name NVARCHAR(50) NOT NULL,
SurName NVARCHAR(50) NOT NULL,
Phone NVARCHAR(50) NOT NULL UNIQUE,
UNIQUE(Name,SurName)
)
GO



INSERT INTO Clients(Name,SurName,Phone)
VALUES('Vika','Drozdova','+38012394442')
INSERT INTO Clients(Name,SurName,Phone)
VALUES('Katya','Drozdova','+3801239s4442')
INSERT INTO Clients(Name,SurName,Phone)
VALUES('Nastya','Drozdova','+3802344442')
GO 

CREATE TABLE NameGroups
(
ID INT PRIMARY KEY IDENTITY,
Name NVARCHAR(20) UNIQUE
)
GO
INSERT INTO NameGroups(Name)
VALUES('Bak-01')

CREATE TABLE Groups
(
ID INT PRIMARY KEY IDENTITY,
ID_Client INT REFERENCES Clients (ID) ON DELETE CASCADE,
ID_Course INT REFERENCES Courses (ID) ON DELETE CASCADE,
ID_NameGroups INT REFERENCES NameGroups (ID) ON DELETE CASCADE,
)
GO

INSERT INTO Groups(ID_Client,ID_Course,ID_NameGroups)
VALUES(1,1,1)
INSERT INTO Groups(ID_Client,ID_Course,ID_NameGroups)
VALUES(1,1,1)
INSERT INTO Groups(ID_Client,ID_Course,ID_NameGroups)
VALUES(3,1,1)

CREATE TABLE ProgressStudy
(
ID INT PRIMARY KEY IDENTITY,
ID_Specialist INT REFERENCES Specialists (ID),
ID_Subjects INT REFERENCES Subjects (ID),
ID_Group INT REFERENCES NameGroups (ID),
CountHours INT CHECK(CountHours > 0)
UNIQUE(ID_Specialist,ID_Subjects,ID_Group)
)
GO

INSERT INTO ProgressStudy(ID_Specialist,ID_Subjects,ID_Group)
VALUES(2,2,1)
INSERT INTO ProgressStudy(ID_Specialist,ID_Subjects,ID_Group)
VALUES(3,1,1)
INSERT INTO ProgressStudy(ID_Specialist,ID_Subjects,ID_Group)
VALUES(4,3,1)








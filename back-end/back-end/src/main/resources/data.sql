CREATE TABLE Users (
ID INTEGER NOT NULL,
FIRSTNAME VARCHAR(255) NOT NULL,
LASTNAME VARCHAR(255) NOT NULL,
EMAIL VARCHAR(255) NOT NULL,
PASSWORD VARCHAR(255) NOT NULL,
PHONE VARCHAR(255) NOT NULL,
FUNCTION VARCHAR(255) NOT NULL,
DISTRICT VARCHAR(255) NOT NULL,
PRIMARY KEY(ID)
);

insert into employee (id,voornaam,achternaam,email,telefoon,functie , stad_Deel , admin)
values (1,'Johan' , 'Van Der Valk' ,'john@ggd.nl','0640298384','Werknemer', 'Oost', false);
insert into employee (id,voornaam,achternaam,email,telefoon,functie , stad_Deel , admin)
values (2,'Robert', 'mijer', 'robert98neijmeijer@gmail.com', '0640280291', 'Werknemer', 'Centrum', false);
insert into employee (id,voornaam,achternaam,email,telefoon,functie , stad_Deel , admin)
values (3,'Daniel', 'iqbal', 'ggd@hotmail.com', '0640235456', 'Werknemer', 'Oost', false);
insert into employee (id,voornaam,achternaam,email,telefoon,functie , stad_Deel , admin)
values (4,'Johan' , 'Van Der Valk' ,'john@ggd.nl','0640298384','Werknemer', 'Oost', false);

-- INSERT INTO Result (ID, PROJECT_ID , EXERCISE , GARDENING , MEETING_PEOPLE, NATURE , REST_AND_RELAXATION )
-- VALUES(1, 1,  20,20,20,20,20);
-- INSERT INTO Result (ID, PROJECT_ID , EXERCISE , GARDENING , MEETING_PEOPLE, NATURE , REST_AND_RELAXATION )
-- VALUES(1, 1,  30,10,25,25,10);
-- INSERT INTO Result (ID, PROJECT_ID , EXERCISE , GARDENING , MEETING_PEOPLE, NATURE , REST_AND_RELAXATION )
-- VALUES(1, 1,  10,15,30,25,20);
-- INSERT INTO Result (ID, PROJECT_ID , EXERCISE , GARDENING , MEETING_PEOPLE, NATURE , REST_AND_RELAXATION )
-- VALUES(1, 1,  20,45,5,25,5);



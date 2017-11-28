USE projectb; 

DROP TABLE IF EXISTS `profile`;

CREATE TABLE profile
(
  id integer NOT NULL AUTO_INCREMENT,
  name varchar(255),
  email varchar(255) NOT NULL,
  password varchar(30), 
  homezipcode integer NOT NULL,
  workzipcode integer NOT NULL,
  leavehome TIME NOT NULL,
  leavework TIME NOT NULL,
  waittime TIME NOT NULL,
  emptyseats integer,
  CONSTRAINT profile_pk PRIMARY KEY (id)
);

INSERT INTO profile
(name, email, password, homezipcode, workzipcode, leavehome, leavework, waittime, emptyseats)
VALUES
('Lanette Dennie', 'denniel@gmail.com',  'denniel', 90001, 90015, '07:00:00', '16:30:00', '01:00:00', 1),
('Cassie Damore',  'damored@gmail.com',  'damored', 90002, 90015,  '07:00:00', '17:00:00', '01:00:00', 1),
('Philomena Gaddis', 'gaddisp@gmail.com',  'gaddisp', 90002, 90015, '07:00:00', '16:45:00', '01:00:00', 1),
('Heidy Renegar', 'renegerh@gmail.com',  'renegerh' , 90002, 90015,  '07:15:00', '16:45:00', '01:00:00', 1),
('Katherine Woodburn', 'woodburn@gmail.com',  'woodburn', 90005, 90011,  '07:00:00', '16:30:00', '01:00:00', 1),
('Desirae Ortex',  'ortexd@gmail.com',  'ortexd', 90006, 90013, '07:30:00', '17:30:00', '01:00:00', 1),
('Rashad Moronta', 'moronta@gmail.com',  'moronta', 90006, 90013, '07:45:00', '17:45:00', '01:00:00', 1),
('Yon Sedgwick',  'sedgwicky@gmail.com',  'sedgwicky', 90002, 90013, '07:00:00', '16:30:00', '01:00:00', 1),
('Janis Vero',  'veroj@gmail.com',  'veroj', 90003, 90012, '07:00:00', '16:30:00', '01:00:00', 1),
('Adrien Setser',  'setsera@gmail.com', 'setsera', 90003, 90012, '07:00:00', '16:45:00', '01:00:00', 1),
('Jacquelynn Toy', 'toyj@gmail.com', 'toyj', 90003, 90012, '07:00:00', '17:00:00', '01:00:00', 1),
('Etta Frady',  'fradye@gmail.com', 'fradye', 90003, 90012, '07:15:00', '16:45:00', '01:00:00', 1),
('Shirly Gargiulo',  'gargiulos@gmail.com', 'garguilos', 90003, 90012, '07:15:00', '16:45:00', '01:00:00', 1),
('Jeff Kolodziej',  'kolodziej@gmail.com', 'kolodziej', 90003, 90012, '07:30:00', '17:15:00', '01:00:00', 1),
('Florencio Lemaster', 'lemaster@gmail.com', 'lemaster', 90003, 90012, '07:30:00', '17:15:00', '01:00:00', 1),
('Aisha Gertz', 'gertza@gmail.com', 'gertza', 90003, 90012, '07:45:00', '17:00:00', '01:00:00', 1),
('Gidget Gawronski', 'gawronski@gmail.com', 'gawronski', 90003, 90012, '08:00:00', '16:30:00', '01:00:00', 1),
('Kathe Ghee', 'gheek@gmail.com', 'gheek', 90005, 90010, '07:00:00', '16:30:00', '01:00:00', 1),
('Buster Simmon', 'simmonb@gmail.com', 'simmonb', 90005, 90013, '07:00:00', '16:30:00', '01:00:00', 1),
('Joni Carabello', 'carabelloj@gmail.com', 'carabelloj', 90003, 90011, '07:00:00', '16:30:00', '01:00:00', 1),
('Roland Hegna', 'hengar@gmail.com', 'hengar', 90004, 90010, '07:00:00', '16:30:00', '01:00:00', 1),
('Florentina Baptista', 'baptistaf@gmail.com', 'baptistaf', 90004, 90010, '07:00:00', '16:30:00', '01:00:00', 1),
('Hope Clayborne', 'clayborneh.com', 'clayborneh', 90004, 90010, '07:15:00', '17:30:00', '01:00:00', 1),
('Marya Shirey', 'shireym@gmail.com', 'shireym', 90004, 90010, '08:00:00', '16:45:00', '01:00:00', 1),
('Nanette Rollin', 'rollinn@gmail.com', 'rollinn', 90004, 90010, '07:30:00', '17:00:00', '01:00:00', 1),
('Carlene Flannigan', 'flanniganc@gmail.com', 'flanniganc', 90002, 90016, '07:00:00', '16:30:00', '01:00:00', 1),
('Josefa Mccranie', 'mccraniej@gmail.com',  'mccraniej', 90004, 90009, '07:00:00', '16:30:00', '01:00:00', 1),
('Tamala Aitken', 'aitkent@gmail.com', 'aitkent', 90005, 90009, '07:45:00', '17:30:00', '01:00:00', 1),
('Jennifer Nicholls', 'nichollsj@gmail.com', 'nichollsj', 90005, 90009, '07:45:00', '17:30:00', '01:00:00', 1),
('Jeanene Fiorini', 'fiorinij@gmail.com', 'fiorinij', 90005, 90009, '07:45:00', '17:30:00', '01:00:00', 1),
('Gayle Ronning', 'ronningg@gmail.com', 'ronningg', 90006, 90015, '07:00:00', '16:30:00', '01:00:00', 1),
('Genna Sealey', 'sealeyg@gmail.com', 'sealeyg', 90007, 90014, '07:00:00', '16:30:00', '01:00:00', 1),
('Iona Canavan',  'cavavani@gmail.com', 'cavavani', 90007, 90014, '07:00:00', '16:30:00', '01:00:00', 1),
('Debora Szewczyk', 'szewczykd@gmail.com',  'szewczykd', 90007, 90014, '07:00:00', '16:30:00', '01:00:00', 1),
('Sandee Shy',  'shys@gmail.com', 'shys', 90007, 90014, '07:00:00', '16:30:00', '01:00:00', 1),
('Porsha Kinnaird', 'kinnaridp@gmail.com', 'kinnaridp', 90007, 90014, '07:00:00', '16:30:00', '01:00:00', 1),
('Mireille Zucco',  'zuccom@gmail.com', 'zuccom', 90007, 90014, '07:15:00', '16:45:00', '01:00:00', 1),
('Terrie Hirsch', 'hirscht@gmail.com', 'hirscht', 90007, 90014, '07:15:00', '17:00:00', '01:00:00', 1),
('Clyde Leaman', 'leamanc@gmail.com', 'leamanc', 90007, 90014, '07:15:00', '17:15:00', '01:00:00', 1),
('Ken Nappi',  'nappik@gmail.com',  'nappik', 90007, 90014, '08:00:00', '16:30:00', '01:00:00', 1),
('Veola Bjork', 'veolab@gmail.com',  'veolab', 90007, 90014, '07:00:00', '17:30:00', '01:00:00', 1),
('Norah Minick', 'minickn@gmail.com',  'minickn', 90008, 90016, '07:15:00', '16:30:00', '01:00:00', 1),
('Dorine Huff', 'huffd@gmail.com', 'huffd', 90008, 90016, '07:15:00', '16:30:00', '01:00:00', 1),
('Trudi Mcgarry',  'mcgarryt@gmail.com', 'mcgarryt', 90008, 90016, '07:15:00', '16:45:00', '01:00:00', 1),
('Sun Bunton', 'buntons@gmail.com', 'buntons', 90008, 90016, '07:30:00', '17:00:00', '01:00:00', 1),
('Carlos Worthington', 'worthingtonc@gmail.com', 'worthingtonc', 90008, 90016, '07:45:00', '17:15:00', '01:00:00', 1),
('Nicki Kimbrell', 'kimbrelln@gmail.com', 'kimbrelln', 90001, 90011, '07:00:00', '16:30:00', '01:00:00', 1),
('Deloris Remigio', 'remigiod@gmail.com', 'remigiod', 90001, 90011, '07:00:00', '16:30:00', '01:00:00', 1),
('Denita Hiller', 'hillerd@gmail.com', 'hillerd', 90001, 90011, '07:00:00', '16:30:00', '01:00:00', 1),
('Fred Jones', 'jonesf@gmail.com', 'jonesf', 90006, 90009, '07:00:00', '16:30:00', '01:00:00', 1);


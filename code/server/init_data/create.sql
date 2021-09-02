DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  name VARCHAR(50),
  email VARCHAR(50) UNIQUE NOT NULL,
  phone_number VARCHAR(10),
  notifications VARCHAR(5)
);

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE IF NOT EXISTS tasks(
  id SERIAL PRIMARY KEY,       
  name VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(50) NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  owner VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL
);

DROP TABLE IF EXISTS user_task CASCADE;
CREATE TABLE IF NOT EXISTS user_task(
  user_id SERIAL,
  task_id SERIAL,
  PRIMARY KEY(user_id,task_id)  
  );

DROP TABLE IF EXISTS friends CASCADE;
CREATE TABLE IF NOT EXISTS friends(
  user_id SERIAL,
  friend_id SERIAL,
  PRIMARY KEY(user_id,friend_id)
);



INSERT INTO users(username,password,name,email,phone_number,notifications)
VALUES('Luke','12345','Luke Mo','lukemo@email.com','123456789','11111'),
('Coleman','12345','Colman Yo','coleman@email.com','223456789','11111'),
('Connor','12345','Connor Dix','connor@email.com','323456789','11111'),
('Lukas','12345','Lukas G','lukas@email.com','423456789','11111'),
('Thomas','12345','Thomas','thomas@email.com','523456789','11111')
;


INSERT INTO tasks(name,date,start_time,end_time,owner,location,description)
VALUES('Task1','20200831','04:05:06','05:05:06','Luke','Boulder','Task1 description'),
('Task2','20200831','12:05:06','05:05:06','Coleman','Boulder','Task2 description'),
('Task3','20200831','08:05:06','05:05:06','Thomas','Boulder','Task3 description');



INSERT INTO user_task(user_id,task_id)
VALUES(1,1),
(3,1),
(2,2),
(4,2),
(5,3);

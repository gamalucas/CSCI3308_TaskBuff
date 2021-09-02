# 3308SP21_section013_4

# TaskBuff

TaskBuff will allow users to organize individual and shared tasks with ease.

TaksBuff is a web app that allows users to create, share and keep track of various tasks they have to do within thier lives. A user can start by making an account and then creating their first task. They will be able to describe the task and say when it is happening. Then on the homepage they will be able to see all of their tasks for the current day and can also select anyday on the built in calendar to see their tasks for the selected day. Users can also share tasks with friends by first adding the friend by username and then simply selecting that user from a dropdown when creating a task. Any user with a shared task will be able to see it on their calendar.

## How to run TaskBuff

Currently taskbuff is only set up to be run locally. To do so you will need to run the following, which starts up the database:
```
cd code/task-buff-web/server
sudo docker-compose up
```
This will start up the database running locally within a docker container. To start the web server, run the following commands in a seperate terminal:
```
cd code/task-buff-web
npm run dev
```
Then simply direct your browser to http://localhost:3000/ and begin using the app!

## File Structure

/appDesignComponents holds various frontend related files like various wire frames and our color pallette.

/code holds all the code for the web app, front and backend.

/databaseBackend holds some scripts to put dummy data into a database.

/milestone_submissions holds all of our docoments for our project milesones.

/team_meeting_logs holds records of our meetings as a group for this project.

# CAT
- How to set up backend:
- First clone repo from main
- Run the following command in terminal in the root folder (i.e cat):
```
npm install
```
- Create a file called .env in the root repository of CAT with the following strings. Make sure to ask Arisha for the mongoDB connection string and JWT token string:
```
MONGODB_URI=askarisha
JWT_SECRET=askarisha
```
- Give Arisha your IP address to add in MongoDB (this will not work without this step!! very important). 
- Then in the root repository run this command
```
node server.js
```
You should be good to go! Make sure to keep the backend running in a separate port and terminal than the frontend's terminal

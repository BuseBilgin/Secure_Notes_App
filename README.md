Project Name: Secure Note-Taking Application
Created by: Buse Gül Rana Bilgin

Requirements:

Node.js (https://nodejs.org/)

MongoDB Community Server (https://www.mongodb.com/try/download/community)

How to Run the Project:

Open a terminal or command prompt (CMD/PowerShell).

Navigate to the project directory.
Example:
cd secure_notes_app

Install the required dependencies:
npm install

Start MongoDB (if it's not already running in the background):
mongod

Start the application:
node app.js

Open your browser and go to:
http://localhost:3000

Usage:

First, register via the "Register" page.

Then, log in through the "Login" page.

After logging in, go to the "Dashboard" to add new notes.

Notes:

MongoDB must be running on localhost:27017

CSRF protection and password hashing with bcrypt are enabled

The UI design features pastel pink and green colors

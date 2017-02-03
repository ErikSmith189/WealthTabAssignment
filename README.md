Author: Erik Smith
Date: February 1, 2017

Description:  This application was developed with the purpose of demonstrating the ability to create a MongoDB
              that is connected to via a nodejs server. This angular website then calls the server by authenticating itself using
              JWT's with an expiration time. Providing a valid token allows a user to create, view and delete a simple product.
              Any questions can be forwarded to erik.aaron.smith@gmail.com

How to run the package / Dependencies:
  1. Install MongoDB on the device that will run these applications (https://www.mongodb.com/download-center?jmp=nav#community)
  2. Install NodeJS on the device (https://nodejs.org/en/download/)
  3. Install Wamp/Mamp/Xamp/Lamp as per your OS (https://www.mamp.info/en/)

  4. Run the MongoDB as a net daemon
    4.0 Open a command window as Administrator. Important that it is as administrator or else you will get permission problems!
    4.1 go to /mongodb/bin/
    4.2 run "net start MongoDB"
    4.3 you will receive a message confirming that the mongoDB is running

  5. Open a command window at /nodeServer/
  6. Run the server (see /nodeServer/README.md)
    *see note on cross-origin error and how to avoid it

  7. run /app/ inside your Wamp/Xamp/Mamp -> /www directory

  8. go to localhost in a browser (Recommend chrome, I.E may not render all elements properly), Done!

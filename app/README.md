Author: Erik Smith
Date: February 1, 2017

Description:  This application was developed with the purpose of demonstrating the ability to create a MongoDB
              that is connected to via a nodejs server. This angular website then calls the server by authenticating itself using
              JWT's with an expiration time. Providing a valid token allows a user to create, view and delete a simple product.
              Any questions can be forwarded to erik.aaron.smith@gmail.com

Dependencies:
    1. This application must be ran on an apache server (I.E WAMP,MAMP,XAMP...)
    * IMPORTANT NOTE: you will receive a "cross-origin resource sharing" error if you do not have an extention to circumvent it!
              This is inevitable on localhost machines.
              (i.e extention https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)
    2. The node server must be running, (see ../nodeServer/README.md)
    3. The MongoDB must be running on port 8080

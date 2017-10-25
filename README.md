The Project is designed to handle authentication functionality with JWT.

Installation

A fresh installation of the project will usually involve the following steps:

* Cloning the repository with git clone URL
* Running npm install at the project root.
* create .env file in root directory of the project.
* run node server.js

# nodeAuth
pages: 

Get  
/
/login
/signup

Post 
/login
/signup
/logout


Secured routes

Get
/dashboard

POST
/api/inventory - addInventory
PUT
/api/inventory/1 - edit Inventory
DELETE
/api/inventory/1 - delete Inventory 

Secured routes

Get
/dashboard 
/dashboard/inventory/create -> Inventory Permission
/dashboard/inventory/1 -> edit Permission

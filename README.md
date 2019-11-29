# SF-middleware
This repo is still under development. 
## Goals:
* Create a production level template for node + expressjs + jsforce + pug + mongodb.
* The architecture should be: Portable, Decomposable, Extensible, and Maintainable.
## What is missing to be production ready (Work in progress)
* Error and logging management (Need to test libraries).
* Review Security of the application.
* Auto bundling and minifying for images, css and js (Need to test libraries).
* Need to add comment blocks around all the code.
* Quality checks of the pipeline in Github.
* Unit testing and automated postman tests for the endpoints.
* Cleanup deprecated code.
## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. This guide assume you have already setup all the tools listed in the Prerequisites.
### Prerequisites
* [Docker](https://www.docker.com/) For packaging the application and its dependencies in a virtual container that can be portable and has the basic setup and configuration of node.
* [VS Code](https://code.visualstudio.com/) IDE with important extensions to work with docker and node remotely. Follow the [guide: Developing inside a container](https://code.visualstudio.com/docs/remote/containers) for set up the development environment.
* [Github](https://github.com/) Account for cloning/fork the repository and contribute.
* [Git](https://git-scm.com/) For version control.
### Installing
Clone the repository, setup your own Github repo and follow this [guide](https://stackoverflow.com/questions/5181845/git-push-existing-repo-to-a-new-and-different-remote-repo-server) to push changes to a new remote repository of your own, then you can create pull-request to push commits to mine.
```
git clone https://github.com/Forcebits/SF-Midleware.git
```
Open it as a workspace with VSCode and then attached to a remote container using the command:
```
>Remote-containers: Open Folder in Container...
```
This will automatically read the .devcontainer folder, the it will install and initialize the container. Do not run the 'npm start' command yet until you have created and configured your .env file in the root folder. This is just an example and should be filled with your own data.
```
.env file
PORT=3000 -> can be changed
DB_COLLECTION=CustomActivityCollection
DB_NOTIFICATION_DOC=Notification
PRO_MONGODB=<Production mongo instance URL>
PRE_MONGODB=<Pre-production mongo instance URL>
MONGODB_URI=  ->leave this empty, it's for heroku. In heroku PRO_MONGODB and PRE_MONGODB don't exist.
COUNTRIES_LIST_URL=https://mock-countries.herokuapp.com/list
DEFAULT_COUNTRY_CODES=ES,US  -> can be changed
NODE_OPTIONS="--max-old-space-size=4096"  -> also setup docker to have some good ram and cpu allocation to don't get the app hanging and freezing all the time.
```

If all of the above is correct, the environment would be up and running for local, remote (github).

Additionally create a *.gitignore* file with the following
```
/node_modules
npm-debug.log
.DS_Store
/.env
```

You can run now this command in local VSCode terminal:
```
npm install
npm start
```
Remember that this command is running the app in the docker container, in order to view it in your local browser, run the following command:
```
>Remote-Containers: Forward Port from Container...
```
Write the port where you are exposing the app in the docker (3000), then you cna see it in the browser as localhost:3000
## About the project structure
The project it's applying the MVC pattern, additionally decouples the use of specific components. It's divided in the following:
### Controllers
The controller responds to the user input and performs interactions on the data model objects. Here it shouldn't be any logic, instead it should only deliver the request to the right Logic of the corresponding component. Once it's ready, it should share the response and pass it to the view. It can be used for front-end uses or API endpoints to be exposed.
### Model
The model is responsible for managing the data of the application. In this case, because the have decoupled the component to a different folder, we only maintain the specifics realted to the database we want to work on. In this case we have created a wrapper for Mongo db connector called MongoODM. Additionally we can define the different objects needed by this ODM to do the data transformation, like DocumentInfo. There is also no business logic in this layer.
### Views
This layer is the presentation of the application in a particular format. It uses pug and define the structure and manage the data passed in the response by the controller. It also doesn't define the business logic, but the methods to improve the presentation layer, like callouts, animations, specific behaviours like showing a notification preview when the texts in the inputs are being filled.
### Components
Components it's a different concept, what we do it's to isolate a specific sub-application, in this case everything related to eRate can be separated. It contains the business logic, it's main object definition, it's specific data transfer object (DTO, called Scheme) and data access layer (DAL) for mongo. Here we can add different DALs and DTOs depending on the Database. We can use components in other applications as doesn't depend in any of the other MVC structure. We can also extent the amount of components we need in this project.
### Public
Usually for css/js/images files and some configurations like manifest and web workers.
### Routing
Decouples the routing definition in one place to improve maintaiability and extensibility. 
### Utils
Suppoort classes for Logging, mailing, external libraries, JWT, etc.
## Important
### About Installed packages
* body-parser: Used to parse requests for express (in recent versions doesn't come natively).
* dotenv: For using the .env file and variables.
* express: Node framework for building web applications. Decided to use this one for it's similarities with other frameworks I've worked with in other languages.
* express-validator: used by express.
* mongoose: To connect with MongoDB. Decided to use this DB for it's compatibility to work with JSON. No transactions are needed in this app and it has natively High performance, availability and scalability features.
* pug: easy to understand library for views, react and angular are strong alternativies, but for a small challenge pug have the advantage of fast learning curve.
* request: designed to be the simplest way possible to make http calls for node.
* jsforce: library to conect and use the different Salesforce APIs
* elasticsearch: library to connect with elastic search

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Ruby - [Download & Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* Sails.JS - [Sails.JS](http://sailsjs.org/) is the foundation of our application.

```bash
$ sudo npm -g install sails
```

* Sass - You're going to use [Sass](http://sass-lang.com/) to compile CSS during your grunt task. Make sure you have ruby installed, and then install Sass using gem install:

```bash
$ gem install sass
```

## Downloading jobSeeker

### Cloning The GitHub Repository
The recommended way to get jobSeeker is to use git to directly clone the jobSeeker repository:

```bash
$ git clone https://github.com/edemauro/jobSeeker jobSeeker
```

## Quick Install

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application. To learn more about the modules installed visit the npm & Package.json section.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

```bash
$ npm install
```

## Running The Application

After the install process is over, run the application by using the sails command:

```bash
$ sails lift
```

## Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

* Local development and testing with compose:
```bash
$ docker-compose up
```

* Local development with just Docker:
```bash
$ docker build -t sails .
$ docker run -p 1337:1337 sails
```
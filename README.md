## Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

* Local development with just Docker:
```bash
$ docker build -t sails .
$ docker run -p 1337:1337 sails
```
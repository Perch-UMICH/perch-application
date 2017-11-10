Perch React Applcation
======================

The tentative perch application that will be backed on react and using dockerization for development purposes. `docker-compose` is used to spin up services together and handle the way that they communicate and interact.
----------------------

### Docker
> Docker is the company driving the container movement and the only container platform provider to address every
> application across the hybrid cloud. Today’s businesses are under pressure to digitally transform
> but are constrained by existing applications and infrastructure while rationalizing and increasingly diverse portfolio of
> clouds, datacenters and application architectures. Docker enables true independence between applications
> and infrastructure and developers and IT ops to unlock their potential and creates a model for better
> collaboration and innovation.

[Docker](https://www.docker.com/) is an immensely powerful tool meant for creating small, lightweight containers that store individual aspects of your project. This, in a way, forces you to keep your workspace clean as you code since every major portion of your app is isolated from every other major portion.

Click [here](https://docs.docker.com/engine/installation) to get started installing the docker engine and daemon. Community edition should suffice.
----------------------

### docker-compose

`docker-compose` is an extension of Docker that allows you to essentially specify a type of "schema" with all of the services (containers) that you need to spin up, how they will communicate with each other and other users, and allows you to separate dev/prod versions of your build.

Click [here](https://docs.docker.com/compose/install) to install `docker-compose` for your machine.
----------------------

### Example file structure

.
+-- docker\_compose.yml (yaml file for specifying services)
+-- docker\_compose.dev.yml (yaml file for dev services)
+-- service1 (e.g. frontend)
|   +-- index.html
|   +-- index.js
+-- service2 (e.g. backend)
|   +-- index.php
|   +-- login.php
+-- service3 (e.g. database)
|   +-- postgres.conf

### Getting Started with Perch App

In order to start the server for the first time:

```
docker-compose up --build
```

This command searches for a `docker-compose.yml/yaml` file in your current working directory. If it finds one, it attempts to start the services that you have specified. The `--build` tag assumes that you made changes to the services and attempts to rebuild your containers (this is typically the case while you are working in development and need to spin the containers up and down).

```
docker-compose down
```

If for some reason you find yourself in a place where you can not stop the running containers with `Ctrl-C` (for whatever reason), run this command to spin your containers specified in the yaml file down. Then use `docker ps` to make sure the containers are no longer running. `docker kill <hash>` allows you to kill containers that are still running.

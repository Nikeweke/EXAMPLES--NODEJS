## How to run container with nodejs and access to private repo npmrc

### 1. Add to .npmrc

```
//npm.pkg.github.com/:_authToken=....
@roosterbank:registry=https://npm.pkg.github.com
legacy-peer-deps=true
```


### 2. Adjust processes.yaml

```sh
script: 'server.js' => script: 'dist/server.js'
script: 'health.js' => script: 'dist/health.js'
```

### 3. Build & Run docker container

```sh
# fresh build every time
docker build --no-cache --platform=linux/amd64 -t [name] .

# run detached
docker run -d --platform linux/x86_64 [name]
```





--- 


#### Additional docker commands

```sh
# fresh build every time
docker build --no-cache --platform=linux/amd64 -t [name] .
# --no-cache - docker do fresh, without reuseing layers
# --platform=linux/amd64 - build specifically for named platform

# Reusing layers 
docker build --platform=linux/amd64 -t [name] .

# ----------------------------> run

# run it detached
docker run -d --platform linux/x86_64 [name]

# run it with entering
docker run -it --platform linux/x86_64 [name]

# run without trigger inner commands
docker run -it --platform linux/x86_64 --entrypoint /bin/sh [name]
```

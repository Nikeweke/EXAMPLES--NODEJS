## Git Scenarios

> how to do release, publish package,

<br />

### Push empty commit to retrigger github actions

```sh
git commit --allow-empty --no-verify -m "Trigger workflow"
```

### Publish package

* make PR
* send to review
* after approve merge it
* publish new version:

```sh
* git checkout develop
* git pull
* npm version minor --no-git-tag-version
* git add -A
* git commit -m "bump client to 1.1.0" 
* git push
* git tag cliet-1.1.0
* git push origin client-1.1.0
```
<br />

### Release package

* Install git flow

```sh
> git flow start relase '4.59'

# (was 4.58) become 4.59
> npm version minor 

> git tag make and push it --no-git-version

> git flow release finish '4.59'
> git tag 
> git push develop
> git push main 
> git push tag
```

### Release package 2
```sh
git switch develop
git pull
git switch master
git pull

git switch develop

# get current version of package (2.42.0), see next version to set in release sheet (2.43.0)
cat package.json|jq .version 

git flow init
  > Which branch should be used for bringing forth production releases? (Select - master)
  > Which branch should be used for integration of the "next release"? (develop)
  > ... for other, just pick default

git flow release start 2.43.0

# bump package version
npm version minor --no-git-tag-version

git status
npm install
git status

git add .
git commit -m 'release 2.43.0'

git flow release finish 2.43.0
 Press "i" to enter Insert mode with VIM, Press "Esc" to exit Insert mode, type ":wq" to write and quit file
 > Vi: Master - In the beggining should be "Merge branch 'release/2.43.0'" and type at the bottom - ":wq" to exit
 > Vi: Tag - In the beggining should be "2.43.0" and :wq
 > Vi: Develop - In the beggining should be "Merge branch 'release/2.43.0' into develop" and type at the bottom - ":wq" to exit

git push origin develop

# will trigger deploy to staging env (depends on github action setup)
git push origin master

# will trigger deploy to production (depends on github action setup)
git push origin 2.43.0

==================================>
Then check logs on London region with default Role
```


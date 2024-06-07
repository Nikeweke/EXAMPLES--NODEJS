## Git Flow scenarios

> how to do release, publish package,

<br />

### Publish package

* make PR
* send to review
* after approve merge it
* publish new version:

```sh
> git checkout main
> git pull
> npm version minor --no-git-tag-version
> git add -A
> git commit -m "bump version to 1.2.345" && git push
> git tag 1.2.345 (update with your version number)
> git push origin 1.2.345
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

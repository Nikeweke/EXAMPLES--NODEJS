
### Git init

> [Docs](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

```sh
> Branch name for production releases: [] master
> Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
> Feature branches? [feature/]
> Bugfix branches? [bugfix/]
> Release branches? [release/]
> Hotfix branches? [hotfix/]
> Support branches? [support/]
> Version tag prefix? []
> Hooks and filters directory? [.husky]

```

### Git flow reset 

```
git config --remove-section "gitflow.path"
git config --remove-section "gitflow.prefix"
git config --remove-section "gitflow.branch"

git flow init -f
```

### Git flow release 

```sh
git checkout develop 
git flow release start x.y.z (new version)
npm version x.y.z --no-git-tag-version
git diff (to check the changes to see package.json + lock.json)
git add -p (Adding version changed files interactivly) 
git commit -m "Bump version to x.y.z" 
git flow release finish x.y.z  
git push origin develop
git push origin master 
git push origin x.y.z
```

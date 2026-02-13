## .zshrc commands

```
alias awsLogin='aws sso login --sso-session [session-name]'
alias awsProd='export AWS_PROFILE=prod && aws sts get-caller-identity'
alias awsTest='export AWS_PROFILE=engTest && aws sts get-caller-identity'
alias awsPreProd='export AWS_PROFILE=preProd && aws sts get-caller-identity'
alias awsMarketingTest='export AWS_PROFILE=marketingTest && aws sts get-caller-identity'

alias puller='git pull --no-rebase'
alias pl='git pull --no-rebase'
alias gb='git branch'
alias gm='git checkout main && git pull'
alias gce='git commit --allow-empty --no-verify -m "Trigger workflow"'
alias gpnv='git push --no-verify'

gc() {
  echo branch name
  read msg
  git checkout $msg	
}

pusher() {
 echo enter message
 read msg 
 git add -A
 git commit -m "$msg" --no-verify
 git push --no-verify
}

feat() {
  echo enter branch name in style - "[ticket-number]-name"
  read msg
  git checkout -b feature/SILO-$msg
}

bra() {
  echo enter branch name
  read msg
  git checkout -b feature/$msg
}

alias awsume="source awsume"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

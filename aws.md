# AWS

### [Awsume] How to make "Awsume" work on windows

```sh
alias awsume='. awsume'
awsume engineeringTest
```
<br />

### [Logs Insights] Look for "error" word in messages

```sh
# looing for "error" in message
fields @timestamp, @message, @logStream, @log
| filter @message like /(?i)(error)/
```

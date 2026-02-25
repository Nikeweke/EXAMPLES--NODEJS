# Errors

### Github actions: Trying to install package "@unrs/resolver-binding-linux-x64-gnu" using npm

> update node to 24 version


### TypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module "file://...tsconfig.json" needs an import attribute of "type: json"

```
// this will fix
const tsconfig  = JSON.parse(readFileSync('./tsconfig.json', 'utf-8'));
const { compilerOptions } = tsconfig;

// const { compilerOptions } = require('./tsconfig.json'); // <!-- this line doesnt work because:
//Error: Jest: Failed to parse the TypeScript config file /....est.config.ts
// TypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module "file://...tsconfig.json" needs an import attribute of "type: json"
```

### Github actions: ECS Deployment Circuit Breaker was triggered

Circuit breaker just means something went wrong in the ECS task, to find out what, you need to go and find the logs for one of the failed tasks,
check logs in Cloudwatch(or ECS logs) in time it was deployed, in my case it said 

```
PM2 error: Error: ENOENT: no such file or directory, open '/home/node/.pm2/pm2.pid'
Error: EACCES: permission denied, mkdir '/home/node/.pm2/pids'
```

###### Solution add volume to dockerfile 

```
# Make Node home directory writeable
VOLUME ["/home/node"]
```



### Error throws and err in catch

```js

throw new Error('error 1') // err -> { name: 'Error', message: 'error 1' }

throw Error('error 2') // err -> { name: 'Error', message: 'error 2' }	

// Error('') === new Error('')

throw { error: 'error3' } // err -> { error: 'error3' }	

throw 'error3' // -> // in catch "err" will be: 'error3'

// custom error 
function NotImplementedError(message = "") {
    this.name = "NotImplementedError";
    this.message = message;
}
NotImplementedError.prototype = Error.prototype;

throw new NotImplementedError() // err -> { name: "NotImplementedError", message: "" }
```


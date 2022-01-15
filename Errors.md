# Errors

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

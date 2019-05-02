## Firebase entity class for firebase realtime DB

### Firebase API
**`{GET}` - Get items**
```bash
# Get whole collection
https://[database-name].firebaseio.com/[collection-name].json

# Get by key
https://[database-name].firebaseio.com/[collection-name]/[key].json

# Get by key and field in it
https://[database-name].firebaseio.com/[collection-name]/[key]/[field].json
```

**`{POST}` - Create item**
```bash
# Post some data 
https://[database-name].firebaseio.com/[collection-name].json
```

**`{DELETE}` - Delete item**
```bash
# Post some data 
https://[database-name].firebaseio.com/[collection-name]/[key].json
```

**`{PUT}` - Update item**
```bash
# Post data for update item
https://[database-name].firebaseio.com/[collection-name]/[key].json

# Post data for update item's field
https://[database-name].firebaseio.com/[collection-name]/[key]/[field].json
```

### Firebase-SDK
```js

/**
  * Connect to a firebase realtime database and get connection 
  * @return {Object} database connection
  */
 module.exports.getDB = function () {
  const admin          = require('firebase-admin');
  const serviceAccount = require('./path/to/key.json')
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://__________.firebaseio.com"
  })
  
  return admin.database()
}



/**
 * FirebaseEntity its class,
 * that have CRUD functions that allow to work with some nested object in realtime db 
 */

// constructor
function FirebaseEntity (table = '', db) {
  this.table    = table
  this.tableRef = db.ref(table)
}

/**
 * Add item in some nested item
 * @param {Object} data
 * @return {Promise} 
 */
FirebaseEntity.prototype.getItems = function () {
  let tableRef = this.tableRef
  return new Promise((res, rej) => {
    tableRef
    .on('value',
     (snapshot)    => res(snapshot.val()), 
     (errorObject) => console.log("The read failed: " + errorObject.code)
    )
  })
  .then((data) => {
    // Firebase возвращает записи в виде обьекта, где id это ключ, 
    // надо вынять ключи и поставить их как id,
    return Object.keys(data).map((key, index) => ({ id: key, ...data[key] })) 
  })
}

/**
 * Add item in some nested item(table)
 * @param {Object} data
 * @return {String} 
 */
FirebaseEntity.prototype.addItem = function (data) {
  let itemRef = this.tableRef.push(data)
  return itemRef.key
}

/**
 * Remove item by id
 * @param {String} id
 */
FirebaseEntity.prototype.deleteItem = function (id) {
  this.tableRef.child(id).remove()
}

/**
 * Update item by id
 * @param {String} id
 * @param {Object} data
 */
FirebaseEntity.prototype.updateItem = function (id, data) {
  if (!id) {
    console.log('No id provided')
    return
  }
  
  this.tableRef.update({
    [id]: data
  })

}

module.exports.FirebaseEntity = FirebaseEntity

// exporting 
// const {FirebaseEntity, getDB} = require('./firebase-entity')
```

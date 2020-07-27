// =====================> Example 1 
const cars: string[] = ['Ford', 'Audi']
const cars2: Array<string> = ['Ford', 'Audi'] // <string> - это generic


// =====================> Example 2
// generic sepcifie that number will be returned
const promise: Promise<number> = new Promise((res) => {
  res(42)
})


// =====================> Example 3
// T and R - here can be another letter
function mergeObjects<T, R>(a: T, b: R): T & R {
  return Object.assign({}, a, b)
}

const merged = mergeObjects({name: 'Amigo'}, {age: 30})


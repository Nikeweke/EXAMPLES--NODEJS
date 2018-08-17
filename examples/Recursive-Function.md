## Рекурсивная функция
меняет свойство каждого обьекта `active` на **false** в массиве и любой вложенности `subitems`

```js
// здесь будут копиться записи
var newItems = []

// тестовые данные
let subitemsLevel3 = [
    {active: true},
    {active: true},
]
let subitemsLevel2 = [
    {active: true, subitems: subitemsLevel3},
    {active: true, subitems: subitemsLevel3},
]
let items = [
    {active: true, subitems: subitemsLevel2},
    {active: true, subitems: subitemsLevel2},
    {active: true, subitems: subitemsLevel2},
]

// Рекурсня
function calc(nodes, level) {
  newItems[level] = newItems[level] || {}
  var total = 0

  nodes.forEach(node => {
    let ccount = 0
    node.active = false
    
    if ('subitems' in node) {
      ccount = calc(node.subitems, level+1)    

    } else {
      ccount = 1
    }

    newItems[level] = node
    total += ccount
  })

  return total
}

calc(items, 0)

// console.log(JSON.stringify(items))
console.log(newItems[0].subitems[0].subitems)
```

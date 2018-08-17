## Считывание строки

```js
const readline = require('readline'); // readline library

// var of readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Summa
Summ();


rl.on('close', () => {
  console.log('Have a nice day!');

});


// SUMM
function Summ()
{
  rl.question('\n 1 number: ', (answer) =>
   {
     var numb1 = answer;

      rl.question('2 number: ', (answer) =>
      {
         var numb2 = answer;

         // From string to number
          numb1 = parseInt(numb1);
          numb2 = parseInt(numb2);
          summ = numb1 + numb2;

        // Out Summ
         console.log(numb1 + '+' + numb2 + ' = ' +  summ);

         // Exit ?
         rl.question('End ?(y/n)', (answer) =>
          {
            if(answer == 'y'){rl.close(); process.exit(1); }
            else{ Summ(rl); }
          });
       });

  });
}
```

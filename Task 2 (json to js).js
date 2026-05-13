/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;
// console.log('jsonString', jsonString);

/* Этап 2. Получение данных */
const data = JSON.parse(jsonString);
// console.log('data', data);
const workers = data.list;
// console.log('worker', worker);


/* Этап 3. Запись данных в результирующий объект */
const result = [];
for (let i = 0; i < workers.length; i++) {
  result.push({
    name: workers[i].name,
    age: Number(workers[i].age),
    prof: workers[i].prof,
  });
}
console.log('result', result);
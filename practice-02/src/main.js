import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

// -------- Вспомогательная функция вывода --------
function printStats(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`\n[${label}]`);
  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

function printTitles(label, tasks) {
  console.log(`[${label}] Названия:`, getTaskTitles(tasks));
}

function printPendingIds(label, tasks) {
  const ids = getPendingTasks(tasks).map((task) => task.id);
  console.log(`[${label}] Невыполненные id:`, ids);
}

// -------- Общий демонстрационный сценарий --------
console.log("=== ПР2. Общий демонстрационный сценарий ===");

let currentTasks = demoTasks;

printStats("Исходный набор", currentTasks);
printTitles("Исходный набор", currentTasks);
printPendingIds("Исходный набор", currentTasks);

{
  const result = addTask(currentTasks, 20, "Добавить проверку", "high");
  if (result.ok) {
    currentTasks = result.tasks;
    printStats("После добавления id 20", currentTasks);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

{
  const result = setTaskCompleted(currentTasks, 4, true);
  if (result.ok) {
    currentTasks = result.tasks;
    printStats("После выполнения id 4", currentTasks);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

{
  const result = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
  if (result.ok) {
    currentTasks = result.tasks;
    printStats("После переименования id 10", currentTasks);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

{
  const result = removeTask(currentTasks, 7);
  if (result.ok) {
    currentTasks = result.tasks;
    printStats("После удаления id 7", currentTasks);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

console.log("\nИтоговые id:", currentTasks.map((task) => task.id));

// -------- Показанная ошибка --------
console.log("\n=== Обработка ошибки ===");
{
  const result = addTask(currentTasks, 4, "Дубликат");
  if (!result.ok) {
    console.error(`Ошибка: ${result.error}`);
  } else {
    console.log("Ожидалась ошибка, но операция прошла успешно");
  }
  // состояние не заменяется при ошибке
  console.log("Состояние после ошибки не изменилось, id:",
    currentTasks.map((task) => task.id));
}

// -------- Проверка неизменности demoTasks --------
console.log("\n=== Сохранность demoTasks ===");
console.log("demoTasks после всех операций:");
console.table(demoTasks);
console.log("Количество задач в demoTasks:", demoTasks.length);
console.log("Название id=10 в demoTasks:", findTaskById(demoTasks, 10).title);
console.log("Выполнена ли id=4 в demoTasks:", findTaskById(demoTasks, 4).completed);

// -------- Индивидуальный вариант --------
console.log(`\n=== Индивидуальный вариант № ${variantNumber} ===`);
console.log("Тема: Подготовка учебного релиза");

let variantCurrent = variantTasks;

printStats("Вариант: исходные данные", variantCurrent);

{
  const result = addTask(variantCurrent, 80, "Завершить подготовку релиза", "high");
  if (result.ok) {
    variantCurrent = result.tasks;
    printStats("Вариант: после добавления id 80", variantCurrent);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

{
  // id = 11 уже выполнен. Операция всё равно проверяется по контракту
  // и должна вернуть новый массив и новый объект.
  const result = setTaskCompleted(variantCurrent, 11, true);
  if (result.ok) {
    variantCurrent = result.tasks;
    printStats("Вариант: completed=true для id 11", variantCurrent);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

{
  const result = renameTask(variantCurrent, 23, "Зафиксировать заморозку функциональности");
  if (result.ok) {
    variantCurrent = result.tasks;
    printStats("Вариант: переименование id 23", variantCurrent);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

{
  const result = removeTask(variantCurrent, 37);
  if (result.ok) {
    variantCurrent = result.tasks;
    printStats("Вариант: удаление id 37", variantCurrent);
  } else {
    console.error(`Ошибка: ${result.error}`);
  }
}

{
  const result = addTask(variantCurrent, 80, "Повторное добавление");
  if (!result.ok) {
    console.error(`Ошибка (ожидаемая): ${result.error}`);
  } else {
    console.log("Ожидалась ошибка, но операция прошла успешно");
  }
  console.log("Вариант: состояние не изменилось, id:",
    variantCurrent.map((task) => task.id));
}

console.log("\nИтоговые id варианта:", variantCurrent.map((task) => task.id));
printStats("Вариант: итог", variantCurrent);

console.log("\n=== Сохранность variantTasks ===");
console.log("variantTasks после всех операций:");
console.table(variantTasks);
console.log("Количество задач в variantTasks:", variantTasks.length);
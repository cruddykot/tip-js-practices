"use strict";

const totalTasks = 10;
const completedTasks = 7;

// 1. Тип и целочисленность
if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
  console.log("Ошибка: количество задач должно быть целым числом");
}
// 2. Границы totalTasks
else if (totalTasks < 0 || totalTasks > 1000) {
  console.log("Ошибка: totalTasks вне диапазона 0…1000");
}
// 3. Границы completedTasks
else if (completedTasks < 0 || completedTasks > totalTasks) {
  console.log("Ошибка: completedTasks вне диапазона 0…totalTasks");
}
// 4. Оба нуля — особый случай
else if (totalTasks === 0 && completedTasks === 0) {
  console.log("Задач пока нет");
}
// 5. Обычный расчёт
else {
  const remaining = totalTasks - completedTasks;
  const percentage = (completedTasks / totalTasks) * 100;

  let status;
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  } else {
    status = "В работе";
  }

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remaining}`);
  console.log(`Прогресс: ${percentage.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}
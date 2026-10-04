"use strict";

const totalTasks = 10;
const completedTasks = 7;
const dailyLimit = 3;

// 1. Тип и целочисленность total/completed
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
// 4. dailyLimit — целое от 1 до 1000
else if (!Number.isInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 1000) {
  console.log("Ошибка: dailyLimit должен быть целым числом 1…1000");
}
// 5. Основная логика
else {
  let remaining = totalTasks - completedTasks;

  if (remaining === 0) {
    console.log("Все задачи уже выполнены");
    console.log("Потребуется дней: 0");
  } else {
    console.log(`Осталось задач: ${remaining}`);

    let day = 0;
    while (remaining > 0) {
      day += 1;
      const doneToday = Math.min(dailyLimit, remaining);
      remaining -= doneToday;
      console.log(`День ${day}: выполнено ${doneToday}, осталось ${remaining}`);
    }

    console.log(`Потребуется дней: ${day}`);
  }
}
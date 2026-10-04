// Общий контрольный набор. Для своего варианта ниже предусмотрен отдельный массив.
export const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];

// Индивидуальный вариант 7: «Подготовка учебного релиза».
// Идентификаторы: 11, 23, 37, 41, 58, 64. Все шесть задач изначально выполнены (K = 6).
// Приоритеты покрывают low / medium / high.
export const variantNumber = 7;

export const variantTasks = [
  { id: 11, title: "Согласовать состав релиза", completed: true, priority: "high" },
  { id: 23, title: "Заморозить функциональность", completed: true, priority: "medium" },
  { id: 37, title: "Подготовить список изменений", completed: true, priority: "low" },
  { id: 41, title: "Проверить сборку перед выпуском", completed: true, priority: "high" },
  { id: 58, title: "Обновить версию в package.json", completed: true, priority: "medium" },
  { id: 64, title: "Опубликовать заметки о релизе", completed: true, priority: "low" },
];
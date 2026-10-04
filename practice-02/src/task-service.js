// Прикладной модуль ПР2. Никаких console.log, DOM и чтения demoTasks.
// Ожидаемые ошибки — это данные: { ok: false, error: "..." }.
// Входные массивы и объекты не мутируются.

const VALID_PRIORITIES = ["low", "medium", "high"];
const MAX_TITLE_LENGTH = 100;

function isValidId(id) {
  return typeof id === "number" && Number.isSafeInteger(id) && id > 0;
}

function normalizeTitle(value) {
  if (typeof value !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const title = value.trim();
  if (title.length === 0) {
    return { ok: false, error: "Название не должно быть пустым" };
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: `Название длиннее ${MAX_TITLE_LENGTH} символов` };
  }
  return { ok: true, title };
}

function normalizePriority(value) {
  if (!VALID_PRIORITIES.includes(value)) {
    return { ok: false, error: "Приоритет должен быть low, medium или high" };
  }
  return { ok: true, priority: value };
}

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  const titleResult = normalizeTitle(title);
  if (!titleResult.ok) {
    return titleResult;
  }
  const priorityResult = normalizePriority(priority);
  if (!priorityResult.ok) {
    return priorityResult;
  }
  return {
    ok: true,
    task: {
      id,
      title: titleResult.title,
      completed: false,
      priority: priorityResult.priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  let completed = 0;
  for (const task of tasks) {
    if (task.completed === true) {
      completed += 1;
    }
  }
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (findTaskById(tasks, id) !== undefined) {
    return { ok: false, error: "Задача с таким id уже существует" };
  }
  const created = createTask(id, title, priority);
  if (!created.ok) {
    return created;
  }
  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (typeof completed !== "boolean") {
    return { ok: false, error: "completed должен быть true или false" };
  }
  const existing = findTaskById(tasks, id);
  if (existing === undefined) {
    return { ok: false, error: "Задача с таким id не найдена" };
  }
  const next = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );
  return { ok: true, tasks: next };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  const titleResult = normalizeTitle(title);
  if (!titleResult.ok) {
    return titleResult;
  }
  const existing = findTaskById(tasks, id);
  if (existing === undefined) {
    return { ok: false, error: "Задача с таким id не найдена" };
  }
  const next = tasks.map((task) =>
    task.id === id ? { ...task, title: titleResult.title } : task
  );
  return { ok: true, tasks: next };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  const existing = findTaskById(tasks, id);
  if (existing === undefined) {
    return { ok: false, error: "Задача с таким id не найдена" };
  }
  const next = tasks.filter((task) => task.id !== id);
  return { ok: true, tasks: next };
}
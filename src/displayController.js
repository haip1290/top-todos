import { id } from "date-fns/locale";
import { getAllProjects, getProjectById } from "./projectService";
import { DTOtoTodo, updateTodoById, deleteTodoById } from "./todoService";

function displayAllProjects() {
  // get container that hold all project button
  const container = document.querySelector(".projects-container");
  container.textContent = ""; // clear before add
  const projectList = getAllProjects(); // get all project from localStorage
  // for each project in the listt, create a button then add to container
  projectList.forEach((project) => {
    const projectDisplay = document.createElement("button");
    projectDisplay.classList.add("project");
    projectDisplay.id = project.id;
    projectDisplay.textContent = project.title;
    // add event handler when click button
    projectDisplay.addEventListener("click", () => {
      displayProject(project.id);
    });
    container.appendChild(projectDisplay);
  });
}

function displayProject(id) {
  // get container of project
  const container = document.querySelector(".project-container");
  container.textContent = "";
  const project = getProjectById(id); // get project from localStorage
  if (!project) {
    throw Error("No project with this id " + id);
  }
  createProjectElement(project, container);
}

function displayFirstProject() {
  // get container element which container all projects
  const container = document.querySelector(".project-container");
  container.textContent = "";
  const project = getAllProjects()[0]; // get first project from localStorage
  if (!project) {
    container.textContent = "No project available";
    return;
  }
  // create project element
  createProjectElement(project, container);
}

function createProjectElement(project, container) {
  // create project element
  const projectDiv = document.createElement("div");
  projectDiv.className = "project";
  projectDiv.id = project.id;

  projectDiv.appendChild(createProjectHeader(project.title));
  projectDiv.appendChild(createTableHeader());
  // display todos
  const todosContainer = document.createElement("div");
  todosContainer.className = "todos";
  projectDiv.appendChild(todosContainer);

  const dialogSection = createEditDialog();
  projectDiv.appendChild(dialogSection);

  container.appendChild(projectDiv);

  const todosList = project.todos;
  if (todosList && todosList.length > 0) {
    project.todos.forEach((todo) => displayTodo(todo));
  }
}

function createProjectHeader(title) {
  const header = document.createElement("h1");
  header.className = "title";
  header.textContent = title;
  return header;
}

function createTableHeader() {
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");

  headerContainer.appendChild(createPriorityHeader());
  headerContainer.appendChild(createTitleHeader());
  headerContainer.appendChild(createDueDateHeader());
  return headerContainer;
}

function createTitleHeader() {
  const title = document.createElement("div");
  title.classList.add("header-title");
  title.textContent = "Title";
  return title;
}

function createPriorityHeader() {
  const priority = document.createElement("div");
  priority.classList.add("header-priority");
  priority.textContent = "Priority";
  return priority;
}

function createDueDateHeader() {
  const dueDate = document.createElement("div");
  dueDate.classList.add("header-duedate");
  dueDate.textContent = "Due Date";
  return dueDate;
}

function displayTodo(todo) {
  // add todo class method to object
  DTOtoTodo(todo);

  // create todos div display details of todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = todo.id;

  const infoSection = createInfoSection(todo);
  todoDiv.appendChild(infoSection);
  const descriptionDiv = createDescriptionSection(todo.description);
  todoDiv.appendChild(descriptionDiv);

  const container = document.querySelector(".todos");
  container.appendChild(todoDiv);
}

function createInfoSection(todo) {
  // create title, due date, priority and description element
  const infoSection = document.createElement("div");
  infoSection.className = "info";

  const titleSection = createTitleSection(todo.title);
  const prioritySection = createPrioritySection(todo.priority);
  const dueDate = createDueDateSection(todo.dueDate);
  const btnGroup = createBtnGroup();

  infoSection.appendChild(prioritySection);
  infoSection.appendChild(titleSection);
  infoSection.appendChild(dueDate);
  infoSection.appendChild(btnGroup);
  return infoSection;
}

function createTitleSection(title) {
  const titleSpan = document.createElement("span");
  titleSpan.className = "title";
  titleSpan.textContent = title;
  return titleSpan;
}

function createDueDateSection(dueDate) {
  const dueDateSpan = document.createElement("span");
  dueDateSpan.className = "due-date";
  dueDateSpan.textContent = dueDate ? dueDate : "N/A";
  return dueDateSpan;
}

function createPrioritySection(priority) {
  const prioritySpan = document.createElement("span");
  prioritySpan.className = "priority";
  prioritySpan.classList.add(`priority-${priority}`);
  priorityContentByPriorityLevel(priority, prioritySpan);
  return prioritySpan;
}

function createDescriptionSection(description) {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("description");
  descriptionDiv.hidden = true;
  descriptionDiv.textContent = `Description: ${description}`;
  return descriptionDiv;
}

function createBtnGroup() {
  // create button group
  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btn-group");

  // append to container
  btnGroup.appendChild(createDetailBtn());
  btnGroup.appendChild(createEditBtn());
  btnGroup.appendChild(createDelBtn());
  return btnGroup;
}

function createDetailBtn() {
  const btnDetail = document.createElement("button");
  btnDetail.classList.add("btn-details");
  btnDetail.textContent = "More";
  btnDetail.addEventListener("click", showDetails);
  return btnDetail;
}

function createEditBtn() {
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  btnEdit.textContent = "Edit";
  btnEdit.addEventListener("click", openEditForm);
  return btnEdit;
}

function createDelBtn() {
  const btnDel = document.createElement("button");
  btnDel.classList.add("btn-del");
  btnDel.textContent = "Delete";
  btnDel.addEventListener("click", delTodo);
  return btnDel;
}

function delTodo(event) {
  const target = event.target;
  const todoId = target.closest(".todo").id;
  deleteTodoById(todoId);
  const projectId = target.closest(".project").id;
  displayProject(projectId);
}

function createEditDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "dialog-edit";

  const editForm = createEditForm();
  dialog.appendChild(editForm);
  return dialog;
}

function createEditForm() {
  const editForm = document.createElement("form");
  editForm.method = "dialog";

  editForm.appendChild(createIdInput());
  editForm.appendChild(createTitleInput());
  editForm.appendChild(createDescriptionInput());
  editForm.appendChild(createDueDateInput());
  editForm.appendChild(createPriorityInput());
  editForm.appendChild(createBtnGroupEditForm());
  return editForm;
}

function createIdInput() {
  const idInput = document.createElement("div");
  idInput.hidden = true;
  idInput.id = "edit-id";
  return idInput;
}

function createTitleInput() {
  const formControl = document.createElement("div");
  formControl.className = "form-control";

  const label = document.createElement("label");
  label.for = "edit-title";
  label.textContent = "Title";
  formControl.appendChild(label);

  const input = document.createElement("input");
  input.type = "text";
  input.name = "title";
  input.id = "edit-title";
  formControl.appendChild(input);
  return formControl;
}

function createDescriptionInput() {
  const formControl = document.createElement("div");
  formControl.className = "form-control";

  const label = document.createElement("label");
  label.for = "edit-des";
  label.textContent = "Description";
  formControl.appendChild(label);

  const textArea = document.createElement("textarea");
  textArea.name = "description";
  textArea.id = "edit-des";
  textArea.maxLength = 100;
  formControl.appendChild(textArea);
  return formControl;
}

function createDueDateInput() {
  const formControl = document.createElement("div");
  formControl.className = "form-control";

  const label = document.createElement("label");
  label.for = "edit-duedate";
  label.textContent = "Due Date";
  formControl.appendChild(label);

  const input = document.createElement("input");
  input.type = "date";
  input.name = "duedate";
  input.id = "edit-duedate";
  formControl.appendChild(input);
  return formControl;
}

function createPriorityInput() {
  const formControl = document.createElement("div");
  formControl.className = "form-control";

  const label = document.createElement("label");
  label.for = "edit-priority";
  label.textContent = "Priority";
  formControl.appendChild(label);

  const select = document.createElement("select");
  select.name = "priority";
  select.id = "edit-priority";
  select.appendChild(createOption("high"));
  select.appendChild(createOption("medium"));
  select.appendChild(createOption("low"));
  formControl.appendChild(select);
  return formControl;
}

function createOption(value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value.at(0).toUpperCase() + value.slice(1);
  return option;
}

function createBtnGroupEditForm() {
  const formControl = document.createElement("div");
  formControl.classList.add("form-control", "btn-group");
  formControl.appendChild(createSaveBtnEditForm());
  formControl.appendChild(createResetBtnEditForm());
  formControl.appendChild(createCancelBtnEditForm());
  return formControl;
}

function createSaveBtnEditForm() {
  const saveBtn = document.createElement("button");
  saveBtn.className = "btn-submit";
  saveBtn.type = "submit";
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", updateTodo);
  return saveBtn;
}

function updateTodo(event) {
  const id = document.querySelector("#edit-id").textContent;
  const todoEleList = document.querySelectorAll(".todo");
  const target = Array.from(todoEleList).find((element) => (element.id = id));
  const todo = updateTodoDB(target.id);

  const dialog = document.querySelector(".dialog-edit");
  dialog.close();

  updateTodoDisplay(target, todo);
}

function updateTodoDB() {
  const idInput = document.querySelector("#edit-id");
  const titleInput = document.querySelector("#edit-title");
  const descriptionInput = document.querySelector("#edit-des");
  const dueDateInput = document.querySelector("#edit-duedate");
  const priorityInput = document.querySelector("#edit-priority");
  const projectElement = document.querySelector(".main .project");

  const id = idInput.textContent;
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;
  const projectId = projectElement.id;
  const isCompleted = false;

  const dto = {
    id,
    title,
    description,
    dueDate,
    priority,
    isCompleted,
    projectId,
  };

  const todo = updateTodoById(dto);
  titleInput.value = "";
  descriptionInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "";

  return todo;
}

function updateTodoDisplay(target, todo) {
  const title = target.querySelector(".title");
  const dueDate = target.querySelector(".due-date");
  const description = target.querySelector(".description");
  const priority = target.querySelector(".priority");

  title.textContent = todo.title;
  dueDate.textContent = todo.dueDate ? todo.dueDate : "N/A";
  description.textContent = todo.description;
  priority.classList.forEach((className) => {
    if (className.startsWith(".priority-")) {
      priority.classList.remove(className);
    }
  });
}

function createResetBtnEditForm() {
  const resetBtn = document.createElement("button");
  resetBtn.type = "reset";
  resetBtn.textContent = "Reset";
  return resetBtn;
}

function createCancelBtnEditForm() {
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn-close";
  cancelBtn.type = "button";
  cancelBtn.formMethod = "dialog";
  cancelBtn.textContent = "Close";
  cancelBtn.addEventListener("click", (event) => {
    const dialog = document.querySelector(".dialog-edit");
    dialog.close();
  });
  return cancelBtn;
}

function openEditForm(event) {
  const todo = event.target.closest(".todo");
  const dialog = document.querySelector(".dialog-edit");
  const idInput = dialog.querySelector("#edit-id");
  idInput.textContent = todo.id;
  dialog.show();
}

function showDetails(event) {
  const description = event.target
    .closest(".todo")
    ?.querySelector(".description");
  description.hidden = !description.hidden;
}

function priorityContentByPriorityLevel(priorityLevel, prioritySpan) {
  switch (priorityLevel) {
    case "high":
      prioritySpan.textContent = "🔴";
      break;
    case "medium":
      prioritySpan.textContent = "🟠";
      break;
    case "low":
      prioritySpan.textContent = "🟢";
      break;

    default:
      throw Error("Invalid priority level");
      break;
  }
}

export { displayAllProjects, displayFirstProject, displayProject, displayTodo };

const todoList = []
let inputForm, todoMain, tabButton, sortMenu

/** Todo1個単位のHTML文字列を構成する */
function createTodoHtmlString(todo){
  let htmlString = ""
  const editType = todo.isEdit ? "editFixed" : "edit"
  const editButtonLabel = todo.isEdit ? "編集完了" : "編集"
  const doneType = todo.isDone ? "inbox" : "done"
  const doneButtonLabel = todo.isDone ? "未完了" : "完了"
  let todoTextCell = ""
  let priorityCell = ""
  if (todo.isEdit) {
    // 該当のtodoオブジェクトが編集中の場合はテキストフィールドを描画する 
    todoTextCell = '<td class="cell-text"><input class="input-edit" type="text" value=' + todo.text + " /></td>"
    priorityCell = '<td class="cell-priority"><input class="input-priority" type="number" value=' + todo.priority + " /></td>"
  } else {
    // ユーザは情報を見るだけなのでテキストとして表示すればOK
    todoTextCell = '<td class="cell-text">' + todo.text + "</td>"
    priorityCell = '<td class="cell-priority>"' + todo.priority + "</td>"
  }
  htmlString += '<tr id="' + todo.id + '">'
  htmlString += '<td class="cell-edit-button"><button data-type"' + editType + '">' + editButtonLabel + "</button></td>"
  htmlString += todoTextCell
  htmlString += '<td class="cell-created-at">' + todo.createdAt + "</td>"
  htmlString += todo.priorityCell
  htmlString += '<td class="cell-done">'
  htmlString += '<button data-type="' + doneType + '">'
  htmlString += doneButtonLabel
  htmlString += "</button></td>"
  htmlString += "</tr>"
  return htmlString
}

/** TodoListの描画を更新する */
function updateTodoList(){
  let htmlStrings = ""
  todoList.forEach(todo => {
    htmlString += createTodoHtmlString(todo)
    todoMain.innerHTML = htmlStrings
  })
  todoMain.innerHTML = htmlStrings
}

/** todoListを追加する */
function addTodo(todoObj){
  todoObj.id = "todo-" + (todoList.length + 1)
  todoObj.createdAt = new Date().toLocaleString()
  todoObj.priority = 3
  todoObj.isDone = false
  todoObj.isEdit = false
  todoList.unshift(todoObj)
  updateTodoList()
  clearInputForm()
}

/** Todoを登録する処理 */
function handleSubmit(event){
  event.preventDefault()
  const todoObj = {
    text: inputForm["input-text"].value
  }
  addTodo(todoObj)
}

/** DOMを変数に登録する */
function registerDOM(){
  inputForm = document.querySelector("#input-form")
  todoMain = document.querySelector("#todo-main")
  tabButton = document.querySelector("#tab").querySelectorAll("button")
  sortMenu = document.querySelector("#sort-menu")
}

/** DOMにイベントを設定する */
function bindEvents(){
  inputForm.addEventListener("submit", () => handleSubmit())
}

/** 初期化 */
function initialize(){
  registerDOM()
  bindEvents()
  updateTodoList()
}

document.addEventListener("DOMContentLoaded", initialize.bind(this))
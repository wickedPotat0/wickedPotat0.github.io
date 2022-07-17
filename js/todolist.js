const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

//위의 투두스를 로컬스토리지에 저장하기.
//JSON.stringify() 특성:
//value의 데이터 타입이 number 또는 boolean일 경우, 그 값 자체를 그대로 가져오고, 데이터타입은 string(문자열)이 된다.
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

//x버튼을 클릭하면 엑스버튼이 있는 부모엘리먼트인 li를 삭제.
//필터는 주어진 배열의 값들을 오름차순으로 접근해 callbackfn을 통해 true를 반환하는 요소를 기준으로 신규 배열을 만들어 반환한다
//딜리트한 후에 저정되어있는 배열들도 정리하기위해선 필터를 사용. 저장된 아이디와 화면에 있는 아이디 ㅂㅣ교해서 없는 걸 빼고 어레이생성.
function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function addToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li);
}

//투두리스트에 서브밋된 텍스트들을 리스트화 하려함.-> addToDo()
//로컬스토리지에 저장하고 사용하기 위 toDos에 배열화해서 넣기.(push)
//배열을 오브젝트로 만들어 설명넣기. newTodoObj
//Date.now() 메소드는 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환합니다.
function todoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  addToDo(newTodoObj);
  saveToDos();
}

todoForm.addEventListener("submit", todoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

//parse() 메서드는 JSON 문자열을 인자로 받고 결과값으로 JavaScript 객체를 반환합니다.
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(addToDo);
}

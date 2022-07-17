const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const clock = document.querySelector("#clock");
const todoForm = document.querySelector("#todo-form");

function currentClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`;
}

currentClock();
setInterval(currentClock, 1000);

const USERNAME_KEY = "username";
const HIDDEN_CLASSNAME = "hidden";

//로그인하면 로컬스토리지에 유저네임을 저장하고, 로그인폼을 지워준다.
function loginSubmit(event) {
  event.preventDefault();
  loginForm.style.display = "none";
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(username);
}

//로그인하면 로컬스토리지에 저장한 유저네임을 h1에 넣어 화면에 띄운다.
function paintGreeting(username) {
  greeting.innerText = `Hi, ${username}`;
  greeting.style.marginTop = "0";
  greeting.classList.remove(HIDDEN_CLASSNAME);
  clock.style.marginTop = "20px";
  clock.style.fontSize = "30px";
  todoForm.classList.remove(HIDDEN_CLASSNAME);
}

//로컬스토리지에서 가져온 username을 시이브유저네임이라는 변수에 넣는다.
const saveUsername = localStorage.getItem(USERNAME_KEY);

if (saveUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", loginSubmit);
} else {
  loginForm.style.display = "none";
  paintGreeting(saveUsername);
}

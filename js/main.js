import {getValidationStatus, setFormValue, submitSignUpForm, validateEmail, validatePassword, validateRepPassword} from "./utils.js"


////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
// const password = document.getElementById('password');

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
console.log("Document")
console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// password.classList.add("valid")
// password.classList.remove("valid")

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const email_id = 'email'
const sign_in_btn_id = "sign_in_btn"
const password_repeat_id = "password-repeat"

const sign_in_link_id = 'sign_in_link'
const sign_up_link_id = 'sign_up_link'
const sign_up_form_id = 'sign_up_form'
const sign_up_btn_id = 'sign_up_btn'
const sign_in_form_id = 'sign_in_form'


// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => {
  setFormValue(first_name_id, e.target.value)  // Установить значение без валидации
  check_disable()
}

const second_name = document.getElementById(last_name_id);
second_name.oninput = (e) => {
  setFormValue(last_name_id, e.target.value)  // Установить значение без валидации
  check_disable()
}

const emails = document.querySelectorAll('#email');
for (const email of emails) {
  email.oninput = (e) => {
    setFormValue(email_id, e.target.value, validateEmail) // Установить значение с валидацией
    check_disable()
  }
}


const passwords = document.querySelectorAll('#password');
for (const password of passwords) {
  password.oninput = (e) => {
    setFormValue(password_id, e, validatePassword) // Установить значение с валидацией
    if (validatePassword(e)){
      password.classList.remove("invalid")
      password.classList.add("valid")
    }
    else {
      password.classList.remove("valid")
      password.classList.add("invalid")
    }
    check_disable()
  }
}

const rep_password = document.getElementById(password_repeat_id);
rep_password.oninput = (e) => {
  setFormValue("rep_password", e, validateRepPassword) // Установить значение с валидацией
  if (validateRepPassword(e)){
    rep_password.classList.remove("invalid")
    rep_password.classList.add("valid")
  }
  else {
    rep_password.classList.remove("valid")
    rep_password.classList.add("invalid")
  }
  check_disable()
}


// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none"
  document.getElementById(sign_in_form_id).style.display = ""
}

const switch_to_sign_up = document.getElementById(sign_up_link_id);
switch_to_sign_up.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = ""
  document.getElementById(sign_in_form_id).style.display = "none"
}

const sign_up_fields = [first_name, second_name, passwords, emails, rep_password]

const sign_up_btn = document.getElementById(sign_up_btn_id);
console.log("sign_up_btn", sign_up_btn)
sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm(sign_up_fields)
}


const sign_in_fields = [passwords, emails]

const sign_in_btn = document.getElementById(sign_in_btn_id);
sign_in_btn.disabled = getValidationStatus(sign_in_fields)
sign_in_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm(sign_in_fields)
}

function check_disable() {
  if (document.getElementById(sign_up_form_id).style.display == ""){
    if (getValidationStatus(sign_up_fields))
      sign_up_btn.disabled = false
    else
      sign_up_btn.disabled = true
  }
  else{
    if (getValidationStatus(sign_in_fields))
      sign_in_btn.disabled = false
    else
      sign_in_btn.disabled = true
  }
}

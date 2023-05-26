const userName = document.getElementById("username")
const userEmail = document.getElementById("email")
const userTextarea = document.getElementById('textarea')
// const userPassword = document.getElementById("password")
// const userPasswordConfirmation = document.getElementById(
//   "password-confirmation"
// )


const elementResponse = document.getElementById("elementResponse")
const formContainer = document.getElementById("formContainer")
const contactInfoContainer = document.getElementById('contactInfo')
const contactMobileButton = document.getElementById('mobileButton')
const closeButon = document.getElementById('closeForm')
const formControl = document.querySelectorAll('.form-control')

contactMobileButton.addEventListener('click', () => {
  const screenWidth = screen.width

  if (screenWidth > 700) {
    formContainer.classList.remove('inactive')
    // return true
  } else {
    formContainer.classList.remove('inactive')
    contactInfoContainer.classList.add('inactive')
  }

  
})

closeButon.addEventListener('click', () => {
  formContainer.classList.add('inactive')
  contactInfoContainer.classList.remove('inactive')
  elementResponse.classList.add('inactive')
  
  formControl.forEach( (element) => {
    element.className = "form-control"
  } )
})

form.addEventListener("submit", event => {
  event.preventDefault()

  if (validations()) {
    responseElement()
    postData()
    clearInputs()
    console.log("Requisição será enviada para o servidor")
  } else {
    console.log("Formulário incompleto")
  }
})

function validations() {
  const userNameValue = userName.value
  const userEmailValue = userEmail.value
  const userTextareaValue = userTextarea.value

  if (userNameValue === "") {
    setError(userName, "Nome de usário não identificado")
    console.log("Nome de usário não identificado")
  } else {
    setSucess(userName)
    console.log(`Usuário ${userNameValue} correto`)
  }

  if (userEmailValue === "") {
    setError(userEmail, "Email não identificado")
    console.log("Email não identificado")
  } else if (!checkEmail(userEmailValue)) {
    setError(userEmail, "Por favor, insira um email válido")
    console.log("Email inválido")
  } else {
    setSucess(userEmail)
    console.log(`Email ${userEmailValue} correto`)
  }

  if (userTextareaValue === '') {
    setError(userTextarea, 'Menssagem não identificada')
    console.log('input textarea vazio')
  } else {
    setSucess(userTextarea)
    console.log('Input textarea preenchido')
  }

  const formControl = document.querySelectorAll(".form-control")
  const invalided = []
  let isValid = true
  formControl.forEach(element => {
    const contem = element.className === "form-control sucess"
    invalided.push(contem)
  })
  invalided.forEach(valor => {
    if (valor === false) {
      isValid = false
    }
  })
  
  return isValid
}

function setSucess(input) {
  const formControl = input.parentElement

  formControl.classList.add('sucess')
}

function setError(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector("small")

  small.innerText = message
  formControl.classList.add('error')
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
}

function responseElement() {
  elementResponse.classList.remove('inactive')
  elementResponse.classList.add("active")
}

function clearInputs() {
  userEmail.value = ""
  userName.value = ""
  userTextarea.value = ""
  // userPassword.value = ""
  // userPasswordConfirmation.value = ""
}

async function postData() {
  const formData = new FormData(form)

  try {
    const response = await fetch("https://form-back-end.vercel.app/get", {
      method: "POST",
      body: formData
    })
    const data = await response.json()
    // console.log(response)
    console.log(data)

    if (response.ok) {
      console.log("Formuláro enviado com sucesso")
    }
  } catch (error) {
    console.log(error.message)
    alert(
      `Ocorreu um erro ${error.name}:  ${error.message}, formulário não foi enviado`
    )
  }
}

const userName = document.getElementById("username")
const userEmail = document.getElementById("email")
const userPassword = document.getElementById("password")
const userPasswordConfirmation = document.getElementById(
  "password-confirmation"
)
const form = document.getElementById("form")
const elementResponse = document.getElementById("elementResponse")

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
  const userPasswordValue = userPassword.value
  const userPasswordConfirmationValue = userPasswordConfirmation.value

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

  if (userPasswordValue === "") {
    setError(userPassword, "Senha do usuário não identificada")
    console.log("Senha do usuário não identificada")
  } else if (userPasswordValue.length < 7) {
    setError(userPassword, "A senha deve conter no mínimo 7 digitos")
    console.log("A senha deve conter no mínimo 7 digitos")
  } else {
    setSucess(userPassword)
    console.log(`Senha ${userPasswordValue} correto`)
  }

  if (userPasswordConfirmationValue === "") {
    setError(
      userPasswordConfirmation,
      "Confirmação de senha deve ser igual a senha"
    )
    console.log("Campo de confirmação de senha em branco")
  } else if (userPasswordConfirmationValue !== userPasswordValue) {
    setError(
      userPasswordConfirmation,
      "Confirmação de senha deve ser igual a senha"
    )
    console.log(
      `Confirmação de senha ${userPasswordConfirmationValue} deve ser igual a senha`
    )
  } else {
    setSucess(userPasswordConfirmation)
    console.log(`Confirmação de senha ${userPasswordConfirmationValue} correta`)
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

  // console.log(formControl)
  // console.log(isValid)
  return isValid
}

function setSucess(input) {
  const formControl = input.parentElement

  // formControl.classList.add('sucess')
  formControl.className = "form-control sucess"
}

function setError(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector("small")

  small.innerText = message
  // formControl.classList.add('error')
  formControl.className = "form-control error"
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
}

function responseElement() {
  elementResponse.classList.add("active")
  // console.log('teste')
}

function clearInputs() {
  userEmail.value = ""
  userName.value = ""
  userPassword.value = ""
  userPasswordConfirmation.value = ""
}

async function postData() {
  const formData = new FormData(form)

  try {
    const response = await fetch("https://form-back-end.vercel.app/send", {
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

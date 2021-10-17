/* eslint-disable */
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const result = re.test(email)
  if (!result) {
    return 'Not valid'
  } else {
    return result
  }
}
const validatePassword = password => {
  if (password.length < 6) {
    return 'Minimum 6 characters are allowed.'
  } else if (password.length > 8) {
    return 'Maximum 8 characters are allowed.'
  } else if (!password.match(/[A-Z]/g)) {
    return 'Atleast one uppercase letter is necessary.'
  } else if (!password.match(/[a-z]/g)) {
    return 'Atleast one lowercase letter is necessary.'
  } else if (!password.match(/[0-9]/g)) {
    return 'Atleast one digit is necessary.'
  } else {
    return true
  }
}
const validateConfirm = (password, confirm) => {
  if (password !== confirm) {
    return 'Password and confirm password should be same'
  } else {
    return true
  }
}
const validateName = full_name => {
  if (!full_name.match(/^[A-Z][a-z]{2,}\w\s[A-Z][a-z]{2,}$/g)) {
    return "Dosen't follow pattern. e.g: John Doe"
  } else {
    return true
  }
}
const validatePhone = phone_number => {
  if (!phone_number.match(/^[0-9]{10}$/g)) {
    return 'Should be of 10 digits'
  } else {
    return true
  }
}
exports.validateInputs = (body, name) => {
  let { url, email, password, confirm, full_name, phone_number } = body
  if (url !== 'reset') {
    if (name === 'email') {
      return validateEmail(email)
    }
  }
  if (url === 'reset') {
    if (name === 'confirm') {
      return validateConfirm(confirm)
    }
  }
  if (url === 'signup') {
    console.log(name)
    if (name === 'full_name') {
      return validateName(full_name)
    }
    if (name === 'phone_number') {
      return validatePhone(phone_number)
    }
  }
  if (url !== 'request') {
    if (name === 'password') {
      return validatePassword(password)
    }
  }
}
exports.validateForm = body => {
  let { url, email, password, confirm, full_name, phone_number } = body
  let errors = {}
  let error = false
  if (url !== 'reset' && email === null) {
    errors = { ...errors, email: 'Email is required.' }
    error = true
  }
  if (url === 'reset' && confirm === null) {
    errors = { ...errors, confirm: 'Confirm your password first.' }
    error = true
  }
  if (url === 'signup') {
    if (full_name === null) {
      errors = { ...errors, full_name: 'Name is required.' }
      error = true
    }
    if (phone_number === null) {
      errors = { ...errors, phone_number: 'Phone number is required.' }
      error = true
    }
  }
  if (url !== 'request') {
    if (password === null) {
      errors = { ...errors, password: 'Password is required.' }
      error = true
    }
  }
  return { errors, error }
}

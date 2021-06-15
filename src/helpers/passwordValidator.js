export function passwordValidator(password) {
    if (!password) return "Mật khẩu không được rổng."
    if (password.length < 5) return 'Độ dài tối thiểu của mật khẩu là 5 kí tự.'
    return ''
  }
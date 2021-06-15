export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email không được rổng."
    // We need a valid email address
    if (!re.test(email)) return 'Có lỗi! Chúng tôi cần một địa chỉ Email.'
    return ''
  }
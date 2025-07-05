export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidNIM(nim) {
  // Validasi NIM: hanya angka dan panjang 8-10 digit
  return /^[0-9]{8,10}$/.test(nim)
}

export function isValidPassword(password) {
  // Minimal 6 karakter, termasuk angka dan huruf
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
}

export function isNotEmpty(value) {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

export function capitalizeFirstLetter(string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getInitials(name) {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

export function extractStudentCode(correo: string): string | null {
  const match = correo.match(/^([Uu]\d{8})@.*utp\.edu\.pe$/i)
  return match ? match[1] : null
}

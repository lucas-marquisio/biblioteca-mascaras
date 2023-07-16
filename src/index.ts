export const maskNumber = (number: number): string => {
  const suffixes: { [divisor: number]: string } = {
    1: '',
    1000: 'k',
    1000000: 'm',
    1000000000: 'b',
    1000000000000: 't'
  }

  const divisorKeys = Object.keys(suffixes)
    .map(key => parseInt(key))
    .sort((a, b) => b - a) 

  for (let divisor of divisorKeys) {
    if (number >= divisor) {
      const quotient = number / divisor
      let result = quotient.toString()
      if (result.includes('.')) {
        result = result.replace(/(\.[0-9]*[1-9])0+$/, '$1')
      }
      return result + suffixes[divisor]
    }
  }

  return number.toString()
}

export const maskDate = (input: string): string => {
  const dateMaskRegex: RegExp = /^(\d{0,2})(\d{0,2})(\d{0,4})$/

  const hasSlashes: boolean = input.includes('/')

  if (hasSlashes) {
    input = input.replace(/\//g, '')
  }

  const maskedInput = input.replace(dateMaskRegex, (match: string, p1: string, p2: string, p3: string) => {
    let maskedValue = ''
    if (p1) {
      maskedValue += p1
      if (p2) {
        maskedValue += `/${p2}`
        if (p3) {
          maskedValue += `/${p3}`
        }
      }
    }
    return maskedValue
  })

  return maskedInput
}

export const maskCurrency = (input: string | number): string => {
   const inputString: string = typeof input === 'string' ? input.replace(/[^\d.,]/g, '') : input.toString()
  const numericValue: number = parseFloat(inputString.replace(',', '.'))

  const formattedValue: string = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numericValue)

  return formattedValue
}


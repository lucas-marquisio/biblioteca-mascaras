export const maskNumber = (input: number | string): string => {
  if (typeof input === 'number') {
    input = input.toString()
  }

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
    if (parseFloat(input) >= divisor) {
      const quotient = parseFloat(input) / divisor
      let result = quotient.toString()
      if (result.includes('.')) {
        result = result.replace(/(\.[0-9]*[1-9])0+$/, '$1')
      }
      return result + suffixes[divisor]
    }
  }

  return input
}


export const maskDate = (input: string | number): string => {
  if (typeof input === 'number') {
    input = input.toString()
  }
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

  if (typeof input === 'string' && input.trim() === '') {
    return 'R$ 00,00'
  }

  const formattedValue: string = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numericValue)

  return formattedValue
}

export const maskCpf = (input: string | number): string => {
  let numericValue: string = String(input).replace(/\D/g, '').slice(0, 11)
  const cpfRegex: RegExp = /^(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?$/

  const formattedValue: string = numericValue.replace(cpfRegex, (_, p1, p2, p3, p4) =>
    `${p1}${p2 ? `.${p2}` : ''}${p3 ? `.${p3}` : ''}${p4 ? `-${p4}` : ''}`
  )

  return formattedValue
}

export const maskCnpj = (input: string | number): string => {
  let numericValue: string = String(input).replace(/\D/g, '').slice(0, 14)

  if (numericValue.length < 2 ) {
    return numericValue
  }

  let formattedValue: string = numericValue.slice(0, 2)

  if (numericValue.length  < 5 && numericValue.length > 2) {
    formattedValue += `.${numericValue.slice(2, 5)}`
  }
  if (numericValue.length >= 5) {
    formattedValue += `.${numericValue.slice(2, 5)}`
  }

  if (numericValue.length >= 8) {
    formattedValue += `.${numericValue.slice(5, 8)}`
  }

  if (numericValue.length >= 12) {
    formattedValue += `/${numericValue.slice(8, 12)}`
  }

  if (numericValue.length === 14) {
    formattedValue += `-${numericValue.slice(12)}`
  }

  return formattedValue
}

export const maskPhone = (input: string | number): string => {
  let numericValue: string = String(input).replace(/\D/g, '').slice(0, 11)

  if (numericValue.length < 2) {
    return numericValue
  }

  let formattedValue: string = `(${numericValue.slice(0, 2)})`

  if (numericValue.length >= 3) {
    formattedValue += ` ${numericValue.slice(2)}`
  }

  if (numericValue.length === 11) {
    formattedValue = `${formattedValue.slice(0, 10)}-${formattedValue.slice(10)}`
  } else if (numericValue.length > 6) {
    formattedValue = `${formattedValue.slice(0,9)}-${formattedValue.slice(9)}`
  }

  return formattedValue
}

export const maskCep = (cep: number | string) => {
  let cepString = String(cep).replace(/\D/g, '')

  if (cepString.length > 8) {
    cepString = cepString.slice(0, 8)
  }

  if (cepString.length > 5) {
    cepString = cepString.slice(0, 5) + '-' + cepString.slice(5)
  }

  return cepString
}
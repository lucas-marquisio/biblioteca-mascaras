export const parseNumber = (number: number): string => {
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
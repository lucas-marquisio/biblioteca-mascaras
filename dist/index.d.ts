declare const maskNumber: (input: number | string) => string;
declare const maskDate: (input: string | number) => string;
declare const maskCurrency: (input: string | number) => string;
declare const maskCpf: (input: string | number) => string;
declare const maskCnpj: (input: string | number) => string;
declare const maskPhone: (input: string | number) => string;
declare const maskCep: (cep: number | string) => string;

export { maskCep, maskCnpj, maskCpf, maskCurrency, maskDate, maskNumber, maskPhone };

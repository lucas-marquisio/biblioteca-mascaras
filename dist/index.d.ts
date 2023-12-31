declare const Cpf: (value: string) => string;
declare const Money: (value: string) => string;
declare const Cep: (data: string) => string;
declare const Phone: (data: string) => string;
declare const CNPJ: (data: string) => string;
declare const Numbers: (data: string) => string;
declare const CpfCNPJ: (data: string) => string;
declare const RG: (data: string) => string;
declare const CreditCardNumber: (data: string) => string;
declare const CreditCardDate: (data: string) => string;
declare const DateFormat: (data: string) => string;
declare const PhoneSimple: (data: string) => string;
declare const _default: {
    PhoneSimple: (data: string) => string;
    DateFormat: (data: string) => string;
    Cpf: (value: string) => string;
    Money: (value: string) => string;
    Cep: (data: string) => string;
    Phone: (data: string) => string;
    CNPJ: (data: string) => string;
    Numbers: (data: string) => string;
    CpfCNPJ: (data: string) => string;
    RG: (data: string) => string;
    CreditCardNumber: (data: string) => string;
    CreditCardDate: (data: string) => string;
};

export { CNPJ, Cep, Cpf, CpfCNPJ, CreditCardDate, CreditCardNumber, DateFormat, Money, Numbers, Phone, PhoneSimple, RG, _default as default };

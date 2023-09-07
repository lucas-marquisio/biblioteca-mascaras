export const Cpf = (value: string): string => {
  const Numbers = value.replace(/[^0-9]/g, "").split("");
  const totalNumbers = Numbers.length + 1;
  let numbersList = Numbers;

  if (totalNumbers > 11) {
    numbersList = [];
    Numbers.map((e, index) => {
      if (index < 11) {
        numbersList.push(e);
      }
    });
  }

  let cpf = value;

  if (totalNumbers > 3) {
    cpf = "";
    numbersList.map((n: string, index) => {
      const position = index + 1;
      if (position == 4 || position == 7) {
        cpf = cpf + `.${n}`;
        return;
      }

      if (position == 10) {
        cpf = cpf + `-${n}`;
        return;
      }

      cpf = cpf + n;
    });
  }
  return cpf;
};

export const Money = (value: string) => {
  const valueParse = value.toString();

  if (valueParse.length == 0)
    return `R$ 0,00`

  if (valueParse.length == 1)
    return `R$ 0,0${/[^\d,]/g.test(valueParse) ? 0 : valueParse}`;

  const removeCharacters = value.replace(/[^\d,]/g, "");
  const [money, cents] = removeCharacters.split(",");

  const moneyUpdated = {
    money: money || "0",
    cents: cents || "00",
  };

  if (cents.length == 3) {
    moneyUpdated.money = money == "0" ? cents[0] : `${money}${cents[0]}`;
    moneyUpdated.cents = cents.slice(1);
  } else if (cents.length == 1 && money != "0") {
    const valueToSetCent = money[money.length - 1];
    moneyUpdated.cents = `${valueToSetCent}${cents}`;
    moneyUpdated.money =
      money.slice(0, money.length - 1) == ""
        ? "0"
        : money.slice(0, money.length - 1);
  } else if (money.length < 2 && cents.length > 2 && cents.length < 4) {
    moneyUpdated.cents = cents.slice(1);
    moneyUpdated.money = money;
  }

  return `R$ ${parseInt(moneyUpdated.money).toLocaleString("pt-BR")},${
    moneyUpdated.cents == "0" ? "00" : moneyUpdated.cents
  }`;
};

export const Cep = (data: string) => {
  const dataOnlyNumbers = data.replace(/[^\d,]|,/g, "");
  let cepParse = "";

  if (dataOnlyNumbers.length > 5) {
    dataOnlyNumbers.split("").forEach((d, index) => {
      if (index > 7) return;
      if (index == 5) {
        cepParse = `${cepParse}-${d}`;
        return;
      }
      cepParse = `${cepParse}${d}`;
    });
    return cepParse;
  }
  return dataOnlyNumbers;
};

export const Phone = (data: string) => {
  const phoneNumber = data.replace(/[^\d,]|,/g, "");

  if (phoneNumber.length > 2) {
    let phoneMask = "";

    const phoneNumberArray = phoneNumber.split("");

    phoneNumberArray.forEach((p, index) => {
      if (index == 0) return (phoneMask = `(${p}`);
      if (index == 1) return (phoneMask = `${phoneMask}${p})`);
      if (index == 2) return (phoneMask = `${phoneMask} ${p}`);
      if (index == 3) return (phoneMask = `${phoneMask} ${p}`);
      if (index == 7) return (phoneMask = `${phoneMask}-${p}`);
      if (index == 10) return (phoneMask = `${phoneMask}${p}`);

      if (index > 10) return;

      phoneMask = `${phoneMask}${p}`;
    });

    return phoneMask;
  }

  return phoneNumber;
};

export const CNPJ = (data: string) => {
  const cnpjNumber = data.replace(/[^\d,]|,/g, "");

  if (cnpjNumber.length > 2) {
    const cnpjNumberArray = cnpjNumber.split("");
    let maskCNPJ = "";

    cnpjNumberArray.forEach((c, index) => {
      if (index == 2) return (maskCNPJ = `${maskCNPJ}.${c}`);
      if (index == 5) return (maskCNPJ = `${maskCNPJ}.${c}`);
      if (index == 8) return (maskCNPJ = `${maskCNPJ}/${c}`);
      if (index == 12) return (maskCNPJ = `${maskCNPJ}-${c}`);
      if (index >= 14) return;

      return (maskCNPJ = `${maskCNPJ}${c}`);
    });

    return maskCNPJ;
  }

  return cnpjNumber;
};

export const Numbers = (data: string) => {
  const number = data.replace(/[^\d,]|,/g, "");

  const numberMasked = parseInt(number).toLocaleString();

  return isNaN(parseInt(numberMasked)) ? "0" : numberMasked;
};

export  const CpfCNPJ = (data: string) => {
    const dataParse = data.replace(/[^\d,]|,/g, "")

    if (dataParse.length < 12) return Cpf(dataParse)

    return CNPJ(dataParse)
  }

export const RG = (data: string) => {
    const rgParse = data.replace(/[^\d,]|,/g, "")

    if (rgParse.length > 2) {
      const rgNumberList = rgParse.split('')
      let rgMasked = ''

      rgNumberList.forEach((r, index) => {
        if(index == 2) return rgMasked = `${rgMasked}.${r}`
        if(index == 5) return rgMasked = `${rgMasked}.${r}`
        if(index == 8) return rgMasked = `${rgMasked}-${r}`
        if(index > 9) return

        return rgMasked = `${rgMasked}${r}`
      })

      return rgMasked
    }

    return rgParse
  }

export const CreditCardNumber = (data: string) => {
    const creditCardParsed = data.replace(/[^\d,]|,/g, "")

    if (creditCardParsed.length > 4) {
      const creditCardListNumbers = creditCardParsed.split('')
      let creditCardMasked = ''

      creditCardListNumbers.forEach((c, index) => {
        if (index > 15) return
        if(index == 4) return creditCardMasked = `${creditCardMasked} ${c}` 
        if(index == 8) return creditCardMasked = `${creditCardMasked} ${c}` 
        if(index == 12) return creditCardMasked = `${creditCardMasked} ${c}` 

        creditCardMasked = `${creditCardMasked}${c}`
      })

      return creditCardMasked
    }

    return creditCardParsed
  }
export const CreditCardDate = (data: string) => {
    const creditCardCvvParsed = data.replace(/[^\d,]|,/g, "")

    if (creditCardCvvParsed.length > 2) {
      const creditCardCvvListNumbers = creditCardCvvParsed.split('')
      let creditCardCvvMasked = ''

      creditCardCvvListNumbers.forEach((c, index) => {
        if (index > 3) return
        if(index == 2) return creditCardCvvMasked = `${creditCardCvvMasked}/${c}` 
        creditCardCvvMasked = `${creditCardCvvMasked}${c}`
      })

      return creditCardCvvMasked
    }

    return creditCardCvvParsed

  }

export default {
  Cpf,
  Money,
  Cep,
  Phone,
  CNPJ,
  Numbers,
  CpfCNPJ,
  RG,
  CreditCardNumber,
  CreditCardDate
}
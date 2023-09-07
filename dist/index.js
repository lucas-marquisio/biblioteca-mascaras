"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CNPJ: () => CNPJ,
  Cep: () => Cep,
  Cpf: () => Cpf,
  CpfCNPJ: () => CpfCNPJ,
  CreditCardCvv: () => CreditCardCvv,
  CreditCardNumber: () => CreditCardNumber,
  Money: () => Money,
  Numbers: () => Numbers,
  Phone: () => Phone,
  RG: () => RG,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var Cpf = (value) => {
  const Numbers2 = value.replace(/[^0-9]/g, "").split("");
  const totalNumbers = Numbers2.length + 1;
  let numbersList = Numbers2;
  if (totalNumbers > 11) {
    numbersList = [];
    Numbers2.map((e, index) => {
      if (index < 11) {
        numbersList.push(e);
      }
    });
  }
  let cpf = value;
  if (totalNumbers > 3) {
    cpf = "";
    numbersList.map((n, index) => {
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
var Money = (value) => {
  const valueParse = value.toString();
  if (valueParse.length == 1)
    return `R$ 0,0${/[^\d,]/g.test(valueParse) ? 0 : valueParse}`;
  const removeCharacters = value.replace(/[^\d,]/g, "");
  const [money, cents] = removeCharacters.split(",");
  const moneyUpdated = {
    money: money || "0",
    cents: cents || "00"
  };
  if (cents.length == 3) {
    moneyUpdated.money = money == "0" ? cents[0] : `${money}${cents[0]}`;
    moneyUpdated.cents = cents.slice(1);
  } else if (cents.length == 1 && money != "0") {
    const valueToSetCent = money[money.length - 1];
    moneyUpdated.cents = `${valueToSetCent}${cents}`;
    moneyUpdated.money = money.slice(0, money.length - 1) == "" ? "0" : money.slice(0, money.length - 1);
  } else if (money.length < 2 && cents.length > 2 && cents.length < 4) {
    moneyUpdated.cents = cents.slice(1);
    moneyUpdated.money = money;
  }
  return `R$ ${parseInt(moneyUpdated.money).toLocaleString("pt-BR")},${moneyUpdated.cents == "0" ? "00" : moneyUpdated.cents}`;
};
var Cep = (data) => {
  const dataOnlyNumbers = data.replace(/[^\d,]|,/g, "");
  let cepParse = "";
  if (dataOnlyNumbers.length > 5) {
    dataOnlyNumbers.split("").forEach((d, index) => {
      if (index > 7)
        return;
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
var Phone = (data) => {
  const phoneNumber = data.replace(/[^\d,]|,/g, "");
  if (phoneNumber.length > 2) {
    let phoneMask = "";
    const phoneNumberArray = phoneNumber.split("");
    phoneNumberArray.forEach((p, index) => {
      if (index == 0)
        return phoneMask = `(${p}`;
      if (index == 1)
        return phoneMask = `${phoneMask}${p})`;
      if (index == 2)
        return phoneMask = `${phoneMask} ${p}`;
      if (index == 3)
        return phoneMask = `${phoneMask} ${p}`;
      if (index == 7)
        return phoneMask = `${phoneMask}-${p}`;
      if (index == 10)
        return phoneMask = `${phoneMask}${p}`;
      if (index > 10)
        return;
      phoneMask = `${phoneMask}${p}`;
    });
    return phoneMask;
  }
  return phoneNumber;
};
var CNPJ = (data) => {
  const cnpjNumber = data.replace(/[^\d,]|,/g, "");
  if (cnpjNumber.length > 2) {
    const cnpjNumberArray = cnpjNumber.split("");
    let maskCNPJ = "";
    cnpjNumberArray.forEach((c, index) => {
      if (index == 2)
        return maskCNPJ = `${maskCNPJ}.${c}`;
      if (index == 5)
        return maskCNPJ = `${maskCNPJ}.${c}`;
      if (index == 8)
        return maskCNPJ = `${maskCNPJ}/${c}`;
      if (index == 12)
        return maskCNPJ = `${maskCNPJ}-${c}`;
      if (index >= 14)
        return;
      return maskCNPJ = `${maskCNPJ}${c}`;
    });
    return maskCNPJ;
  }
  return cnpjNumber;
};
var Numbers = (data) => {
  const number = data.replace(/[^\d,]|,/g, "");
  const numberMasked = parseInt(number).toLocaleString();
  return isNaN(parseInt(numberMasked)) ? "0" : numberMasked;
};
var CpfCNPJ = (data) => {
  const dataParse = data.replace(/[^\d,]|,/g, "");
  if (dataParse.length < 12)
    return Cpf(dataParse);
  return CNPJ(dataParse);
};
var RG = (data) => {
  const rgParse = data.replace(/[^\d,]|,/g, "");
  if (rgParse.length > 2) {
    const rgNumberList = rgParse.split("");
    let rgMasked = "";
    rgNumberList.forEach((r, index) => {
      if (index == 2)
        return rgMasked = `${rgMasked}.${r}`;
      if (index == 5)
        return rgMasked = `${rgMasked}.${r}`;
      if (index == 8)
        return rgMasked = `${rgMasked}-${r}`;
      if (index > 9)
        return;
      return rgMasked = `${rgMasked}${r}`;
    });
    return rgMasked;
  }
  return rgParse;
};
var CreditCardNumber = (data) => {
  const creditCardParsed = data.replace(/[^\d,]|,/g, "");
  if (creditCardParsed.length > 4) {
    const creditCardListNumbers = creditCardParsed.split("");
    let creditCardMasked = "";
    creditCardListNumbers.forEach((c, index) => {
      if (index > 15)
        return;
      if (index == 4)
        return creditCardMasked = `${creditCardMasked} ${c}`;
      if (index == 8)
        return creditCardMasked = `${creditCardMasked} ${c}`;
      if (index == 12)
        return creditCardMasked = `${creditCardMasked} ${c}`;
      creditCardMasked = `${creditCardMasked}${c}`;
    });
    return creditCardMasked;
  }
  return creditCardParsed;
};
var CreditCardCvv = (data) => {
  const creditCardCvvParsed = data.replace(/[^\d,]|,/g, "");
  if (creditCardCvvParsed.length > 2) {
    const creditCardCvvListNumbers = creditCardCvvParsed.split("");
    let creditCardCvvMasked = "";
    creditCardCvvListNumbers.forEach((c, index) => {
      if (index > 3)
        return;
      if (index == 2)
        return creditCardCvvMasked = `${creditCardCvvMasked}/${c}`;
      creditCardCvvMasked = `${creditCardCvvMasked}${c}`;
    });
    return creditCardCvvMasked;
  }
  return creditCardCvvParsed;
};
var src_default = {
  Cpf,
  Money,
  Cep,
  Phone,
  CNPJ,
  Numbers,
  CpfCNPJ,
  RG,
  CreditCardNumber,
  CreditCardCvv
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CNPJ,
  Cep,
  Cpf,
  CpfCNPJ,
  CreditCardCvv,
  CreditCardNumber,
  Money,
  Numbers,
  Phone,
  RG
});

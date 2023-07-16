"use strict";

// src/index.ts
var maskNumber = (input) => {
  const suffixes = {
    1: "",
    1e3: "k",
    1e6: "m",
    1e9: "b",
    1e12: "t"
  };
  const divisorKeys = Object.keys(suffixes).map((key) => parseInt(key)).sort((a, b) => b - a);
  for (let divisor of divisorKeys) {
    if (input >= divisor) {
      const quotient = input / divisor;
      let result = quotient.toString();
      if (result.includes(".")) {
        result = result.replace(/(\.[0-9]*[1-9])0+$/, "$1");
      }
      return result + suffixes[divisor];
    }
  }
  return input.toString();
};
var maskDate = (input) => {
  const dateMaskRegex = /^(\d{0,2})(\d{0,2})(\d{0,4})$/;
  const hasSlashes = input.includes("/");
  if (hasSlashes) {
    input = input.replace(/\//g, "");
  }
  const maskedInput = input.replace(dateMaskRegex, (match, p1, p2, p3) => {
    let maskedValue = "";
    if (p1) {
      maskedValue += p1;
      if (p2) {
        maskedValue += `/${p2}`;
        if (p3) {
          maskedValue += `/${p3}`;
        }
      }
    }
    return maskedValue;
  });
  return maskedInput;
};
var maskCurrency = (input) => {
  const inputString = typeof input === "string" ? input.replace(/[^\d.,]/g, "") : input.toString();
  const numericValue = parseFloat(inputString.replace(",", "."));
  if (typeof input === "string" && input.trim() === "") {
    return "R$ 00,00";
  }
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(numericValue);
  return formattedValue;
};
var maskCpf = (input) => {
  let numericValue = String(input).replace(/\D/g, "").slice(0, 11);
  const cpfRegex = /^(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?$/;
  const formattedValue = numericValue.replace(
    cpfRegex,
    (_, p1, p2, p3, p4) => `${p1}${p2 ? `.${p2}` : ""}${p3 ? `.${p3}` : ""}${p4 ? `-${p4}` : ""}`
  );
  return formattedValue;
};
var maskCnpj = (input) => {
  let numericValue = String(input).replace(/\D/g, "").slice(0, 14);
  if (numericValue.length < 2) {
    return numericValue;
  }
  let formattedValue = numericValue.slice(0, 2);
  if (numericValue.length < 5 && numericValue.length > 2) {
    formattedValue += `.${numericValue.slice(2, 5)}`;
  }
  if (numericValue.length >= 5) {
    formattedValue += `.${numericValue.slice(2, 5)}`;
  }
  if (numericValue.length >= 8) {
    formattedValue += `.${numericValue.slice(5, 8)}`;
  }
  if (numericValue.length >= 12) {
    formattedValue += `/${numericValue.slice(8, 12)}`;
  }
  if (numericValue.length === 14) {
    formattedValue += `-${numericValue.slice(12)}`;
  }
  return formattedValue;
};
var maskPhone = (input) => {
  let numericValue = String(input).replace(/\D/g, "").slice(0, 11);
  if (numericValue.length < 2) {
    return numericValue;
  }
  let formattedValue = `(${numericValue.slice(0, 2)})`;
  if (numericValue.length >= 3) {
    formattedValue += ` ${numericValue.slice(2)}`;
  }
  if (numericValue.length === 11) {
    formattedValue = `${formattedValue.slice(0, 10)}-${formattedValue.slice(10)}`;
  } else if (numericValue.length > 6) {
    formattedValue = `${formattedValue.slice(0, 9)}-${formattedValue.slice(9)}`;
  }
  return formattedValue;
};
var maskCep = (cep) => {
  let cepString = String(cep).replace(/\D/g, "");
  if (cepString.length > 8) {
    cepString = cepString.slice(0, 8);
  }
  if (cepString.length > 5) {
    cepString = cepString.slice(0, 5) + "-" + cepString.slice(5);
  }
  return cepString;
};

// src/test.ts
console.log(`valor numerico: 12344, saida: ${maskNumber(12344)}`);
console.log(`valor data: 31012023, saida: ${maskDate("31012023")}`);
console.log(`valor monetario: 33, saida: ${maskCurrency("33")}`);
console.log(`valor cpf: 00000000000, saida: ${maskCpf("00000000000")}`);
console.log(`valor cnpj: 000000000000000, saida: ${maskCnpj("000000000000000")}`);
console.log(`valor celular: 5599999999999, saida: ${maskPhone("55123456789")}`);
console.log(`valor cep: 5555555, saida: ${maskCep("00000000")}`);

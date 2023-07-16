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
  maskCep: () => maskCep,
  maskCnpj: () => maskCnpj,
  maskCpf: () => maskCpf,
  maskCurrency: () => maskCurrency,
  maskDate: () => maskDate,
  maskNumber: () => maskNumber,
  maskPhone: () => maskPhone
});
module.exports = __toCommonJS(src_exports);
var maskNumber = (input) => {
  if (typeof input === "number") {
    input = input.toString();
  }
  const suffixes = {
    1: "",
    1e3: "k",
    1e6: "m",
    1e9: "b",
    1e12: "t"
  };
  const divisorKeys = Object.keys(suffixes).map((key) => parseInt(key)).sort((a, b) => b - a);
  for (let divisor of divisorKeys) {
    if (parseFloat(input) >= divisor) {
      const quotient = parseFloat(input) / divisor;
      let result = quotient.toString();
      if (result.includes(".")) {
        result = result.replace(/(\.[0-9]*[1-9])0+$/, "$1");
      }
      return result + suffixes[divisor];
    }
  }
  return input;
};
var maskDate = (input) => {
  if (typeof input === "number") {
    input = input.toString();
  }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  maskCep,
  maskCnpj,
  maskCpf,
  maskCurrency,
  maskDate,
  maskNumber,
  maskPhone
});

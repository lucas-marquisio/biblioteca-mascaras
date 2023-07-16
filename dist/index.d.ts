// lib.d.ts

declare module 'lib-masks' {
  export function maskNumber (input: number | string): string
  export function maskDate (input: number | string): string
  export function maskCurrency (input: number | string): string
  export function maskCpf (input: number | string): string
  export function maskCnpj (input: number | string): string
  export function maskPhone (input: number | string): string
  export function maskCep (input: number | string): string
}
import { ApplyMask } from './ApplyMask'
import masks from 'biblioteca-mascaras'
import './App.css'
function App() {

  return (
    <div className="" style={{ width: '100vw', height: '100vh', maxWidth: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10}}>
        <ApplyMask mask={masks.CNPJ} placeholder='00.000.000/0000-00' title='CNPJ' />
        <ApplyMask mask={masks.Cpf} placeholder='000.000.000-00' title='CPF' />
        <ApplyMask mask={masks.CpfCNPJ} placeholder='00.000.000/0000-00' title='CNPJ/CPF' />
        <ApplyMask mask={masks.CreditCardNumber} placeholder='0000 0000 0000 0000' title='Cartão Credito' />
        <ApplyMask mask={masks.CreditCardCvv} placeholder='00/00' title='Validade Cartão' />
        <ApplyMask mask={masks.Money} placeholder='R$ 12.000,00' title='Dinheiro' />
        <ApplyMask mask={masks.Numbers} placeholder='100.000.000' title='Numeros'  />
        <ApplyMask mask={masks.Phone} placeholder='(99) 9 9999-9999' title='Numero Celular' />
        <ApplyMask mask={masks.RG} placeholder='00.000.000-00' title='RG (Registro Geral)' />
        <ApplyMask mask={masks.Cep} placeholder='00000-000' title='CEP' />
    </div>
  )
}

export default App

import { ChangeEvent, useState } from 'react'

interface IApplyMask {
  mask: (data: string) => string
  title: string
  placeholder: string
}

export function ApplyMask ({ title, mask, placeholder }: IApplyMask) {
  const [data, setData] = useState('')

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    const dataChanged = e.target.value
    const dataWithMask = mask(dataChanged)
    setData(dataWithMask)
  }
  

  return (
    <div style={{ padding: 30, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 20, border: '1px solid #ccc',  borderRadius: 4}}>
      <h3 style={{ fontSize: 24, color: '#333', textTransform: 'uppercase', fontFamily: 'sans', width: '100%', textAlign: 'center'}}>{title}</h3>
      <input 
        type="text"
        value={data}
        onChange={handleChage}
        style={{ width: '100%', minWidth: '300px', border: '1px solid #444', borderRadius: 4, padding: '8px 16px', height: 40, fontSize: 20, color: "#000", fontWeight: 'bold'}}
        placeholder={placeholder}
       />
    </div>
  )
}
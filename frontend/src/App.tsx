import { useEffect, useState, useRef, FormEvent } from 'react'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { api } from './services/api'

interface CustomerProps{
  id: string;
  name: string;
  price: number;
  description: string;
  created_at: string;
}


export default function App(){

  const [ customers, setCustomers ] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const priceRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
 
  useEffect(() => {
    loadCustomers();
  }, [])

  async function loadCustomers(){
    const response = await api.get("/customers")
    setCustomers(response.data)
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault()

    if (!nameRef.current?.value || !priceRef.current?.value || !descriptionRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      price: parseFloat(priceRef.current?.value),
      description: descriptionRef.current?.value 
    })

    setCustomers(allCustomers => [...allCustomers, response.data])

    nameRef.current.value = ""
    priceRef.current.value = ""
    descriptionRef.current.value = ""
  }

  async function handleDelete(id: string) {
    try{
      await api.delete("/customer",{
        params: {
          id: id,
        }
      })

      const allCustomers = customers.filter( (customer) => customer.id !== id)
      setCustomers(allCustomers)

    }catch(err){
      console.log(err)
    }
  }

  async function handleUpdate(id: string) {
    try{
      if (!nameRef.current?.value || !priceRef.current?.value || !descriptionRef.current?.value) return;

      const response = await api.post("/editcustomer",{
        id: id,
        name: nameRef.current?.value,
        price: parseFloat(priceRef.current?.value),
        description: descriptionRef.current?.value
      })

      const allCustomers = customers.filter( (customer) => customer.id !== id)
      console.log(response.data)
      setCustomers( [...allCustomers, response.data])
      nameRef.current.value = ""
      priceRef.current.value = ""
      descriptionRef.current.value = ""

    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">

      <main className="my-10 w-full md:max-w-2xl">

        <h1 className="text-4xl font-medium text-white">Lista de Produtos</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>

          <label className="font-medium text-white">Nome: </label>

          <input 
          type="text"
          placeholder="Digite seu nome completo aqui..."
          className="w-full mb-5 p-2 rounded"
          ref ={nameRef}
           />
          
          <input 
          type="price"
          placeholder="Digite o preço aqui..."
          className="w-full mb-5 p-2 rounded"
          ref ={priceRef}
           />

          <input 
          type="price"
          placeholder="Digite a description aqui..."
          className="w-full mb-5 p-2 rounded"
          ref ={descriptionRef}
           />

           <input 
           type="submit"
           value="Cadastrar"
           className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            />
        </form>

        <section 
        className="flex flex-col gap-4">

          {customers.map( (customer)=>(
                <article
                key={customer.id} 
                className='w-full bg-white rounded p-2 relative hover:scale-105 duration-200'>
            
                <p><span className="font-medium">Nome:</span>{customer.name}</p>
                <p><span className="font-medium">Email:</span>{customer.price}</p>
                <p><span className="font-medium">Descrição:</span>{customer.description}</p>
            
                <button className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2'
                onClick={ () => handleDelete(customer.id) }>
            
                <FiTrash size={18} color='white'/>
            
                </button>

                <button className='bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -bottom-0'
                onClick={ () => handleUpdate(customer.id) }>
            
                <FiEdit size={18} color='white'/>
            
                </button>
                </article>
          ))}
        </section>

      </main>
    </div>
  )
}
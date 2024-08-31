import prismaClient from "../prisma";

interface CreateCustomerProps {
  name: string;
  description: string;
  price: number;
}

class CreateCustomerService{
  async execute({ name, description, price }: CreateCustomerProps){
    
    if (!name || !price || !description){
      throw new Error("Preencha todos os campos.")
    }
    const customer = await prismaClient.customer.create({
      data:{
        name,
        description,
        price
      }
    })
    return customer
  }
}

export { CreateCustomerService }
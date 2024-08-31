import prismaClient from "../prisma";

interface EditCustomerProps {
  name: string;
  description: string;
  price: number;
  id: string;
}

class EditCustomerService{
  async execute({ name, description, price, id }: EditCustomerProps){

    if (!name || !price || !description || !id){
      throw new Error("Preencha todos os campos.")
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where:{
        id: id
      }
    })

    if (!findCustomer){
      throw new Error("Cliente não existe!")
    }

    const customer = await prismaClient.customer.update({
      where:{
        id: findCustomer.id
      },
      data:{
        name,
        description,
        price
      }
    })

    return customer
  }
}

export { EditCustomerService }
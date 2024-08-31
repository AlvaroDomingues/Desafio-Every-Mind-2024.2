import { FastifyRequest, FastifyReply } from 'fastify'
import { EditCustomerService } from '../services/EditCustomerController'

class EditCustomerController {
  async handle (request: FastifyRequest, reply: FastifyReply){
    const { name, price, description , id} = request.body as { name: string, price: number, description: string, id: string }
    
    const customerService = new EditCustomerService()

    const customer = await customerService.execute({ name, price, description, id });
    
    reply.send(customer);
  }
}

export { EditCustomerController }
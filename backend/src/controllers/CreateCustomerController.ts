import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateCustomerService } from '../services/CreateCustomerService'

class CreateCustomerController {
  async handle (request: FastifyRequest, reply: FastifyReply){
    const { name, price, description } = request.body as { name: string, price: number, description: string }
    
    const customerService = new CreateCustomerService()

    const customer = await customerService.execute({ name, price, description });

    reply.send(customer);
  }
}

export { CreateCustomerController }
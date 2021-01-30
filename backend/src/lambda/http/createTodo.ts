import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { createTodo } from '../../businessLogic/todos'

const logger = createLogger('auth')

export const handler = middy(
async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  // TODO: Implement creating a new TODO item
  const userId = getUserId(event)

    logger.info(`create new user with id : ${userId}`)

    const item = await createTodo(newTodo, userId);
    return {
      statusCode: 201,
      body: JSON.stringify({
        item
      })
    }
}
)

handler.use(
  cors({
    credentials: true
  })
)
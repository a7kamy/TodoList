import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { deleteTodo } from '../../businessLogic/todos'

const logger = createLogger('auth')

export const handler = middy(
async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
   // TODO: Remove a TODO item by id
  try{
    if (!todoId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'no todo id is sent' })
      }
    }
    const userId = getUserId(event);
    await deleteTodo(userId, todoId);
  
    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  }
  catch(error){
    const errorMsg = `an error has ocurred while requesting to delete a todo with id :  ${todoId}`;
    logger.error(errorMsg);
    return {
      statusCode: 500,
      body: JSON.stringify({errorMessage:errorMsg})
    }
  }
}
)

handler.use(
  cors({
    credentials: true
  })
)
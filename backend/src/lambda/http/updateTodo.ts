import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { updateTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

export const handler =  middy(
async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId;
  
  if (!todoId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'no todo id is sent' })
    }
  }

  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  const userId = getUserId(event);

  try{
    await updateTodo(userId, todoId, updatedTodo)
    return {
      statusCode: 200,
      body: JSON.stringify({})
    }  
  }
  catch(error){
    const errorMsg = `an error has ocurred while updating a todo with id: ${todoId}`;
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

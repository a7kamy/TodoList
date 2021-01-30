
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { getTodos } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

export const handler =  middy(
async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  const userId = getUserId(event);
  try{
    const items = await getTodos(userId);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }

  }
  catch(error){

    const errorMsg = `an error has ocurred while geting all todos for user Id : ${userId}`;
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



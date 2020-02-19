
import {Operation} from "express-openapi";


export const POST:Operation=[
    (req,res,next)=>{
        res.status(500).json({});

    }
] ;
POST.apiDoc = {
    description: 'Create a new user.',
    operationId: 'createUser',
    tags: ['users', 'creating'],
    parameters: [],
    responses: {
      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error'
        }
      }
    }
  };
import {Operation} from "express-openapi";


export const parameters = [
    {
      in: 'path',
      name: 'id',
      required: true,
      type: 'integer'
    }
   ];

export const POST:Operation=[
    (req,res,next)=>{
        res.status(200).json({ id: req.params.id });

    }
] ;

POST.apiDoc = {
    description: 'Create a user.',
    operationId: 'createUser',
    tags: ['users'],
    parameters: [
      {
        name: 'user',
        in: 'body',
        schema: {
          $ref: '#/definitions/User'
        }
      }
    ],
  
    responses: {
      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error'
        }
      }
    }
  };
        

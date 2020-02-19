const apiDoc = {
    swagger: '2.0',
    basePath: '/v1',
    info: {
      title: 'MediaServer',
      version: '1.0.0'
    },
    definitions: {
      Error: {
        additionalProperties: true
      },
      User: {
        properties: {
          name: {
            type: 'string'
          },
          friends: {
            type: 'array',
            items: {
              $ref: '#/definitions/User'
            }
          }
        },
        required: ['name']
      }
    },
    paths: {}
  };
   
  export default apiDoc;
const MockAPI= require('../MockAPI.js');

describe("Mock API",()=>{
  let mockAPI;
  let mockDatabase=
  {
    users:[
    {
      name:"Jack",
      passwordHash:"dasdKDKDJSLASDLASDJSAasdsdc123",
      posts:["I just bought some magic beans!"]
    },
    {
      name:"Jill",
     passwordHash:"dasdKDKDJSLASDLASDJSAasdsdc123"
      posts:["Jack fell down!"]
    },
    ]
  };

  beforeEach(()=>{
    mockAPI= new MockAPI(mockDatabase)
  })

  it("returns a 400 bad request status if the request is invalid",()=>{
    const mockApiCall=mockAPI.simulateAsyncCall({})
    return mockApiCall.then(response=>{
      expect(response.status).toBe(400)
    })
  })

  describe("get requests",()=>{
    const validRequest={method:'get',body:{user:"Jack"}};
    const invalidRequest={method:'get',body:{user:"Tod"}};

    it("returns a 404 status if a user is not found",()=>{
      const mockApiCall=mockAPI.simulateAsyncCall(invalidRequest)
      return mockApiCall.then(response=>{
      expect(response.status).toBe(404)
      })
    });

    it("returns a 200 status with a user's posts",()=>{
      const mockApiCall=mockAPI.simulateAsyncCall(validRequest)
      return mockApiCall.then(response=>{
      expect(response.status).toBe(200)
      expect(response.posts).toEqual(["I just bought some magic beans!"])
      })
    });
  })

  describe("post requests",()=>{
    const validRequest={method:'post',body:{user:"Jill",password:'hill',post:"He broke his crown!"}}
    const invalidRequest={method:'post',body:{user:"Jill",password:'beanstock',post:"Jack is cool..."}}

    it("returns a 401 unauthorized status if the wrong credentials are sent",()=>{
      const mockApiCall=mockAPI.simulateAsyncCall(invalidRequest)
      return mockApiCall.then(response=>{
        expect(response.status).toBe(401)
        expect(mockAPI.db).toEqual(mockDatabase)
      })
    })

    it("returns a 200 status and adds the post to the database",()=>{
     const newDatabase={
     users:[
      {
        name:"Jack",
        passwordHash:"dasdKDKDJSLASDLASDJSAasdsdc123"
        posts:["I just bought some magic beans!"]
      },
      {
        name:"Jill",
        passwordHash:"dasdKDKDJSLASDLASDJSAasdsdc123"
        posts:["Jack fell down!","He broke his crown!"]
      },
     ]
     }
     const mockApiCall=mockAPI.simulateAsyncCall(validRequest)
     return mockApiCall.then(response=>{
     expect(response.status).toBe(200)
     expect(mockAPI.db).toEqual(newDatabase)
     })
    })
  })
})
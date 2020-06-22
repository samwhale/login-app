/**
 * Mock request for test app
 * 
 * @param {String} username 
 * @param {String} password 
 */
export const signUserIn = (username, password) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (!username) {
        return rej({
          statusCode: 400,
          message: 'Username required'
        });
      }
      
      if (password.length < 6) {
        return rej({
          statusCode: 400,
          message: password.length ?
            'Password too short' : 'Password required'
        });
      }
  
      return res({
        statusCode: 200,
        user: {
          username,
          firstName: 'fake',
          lastName: 'name',
          phoneNumber: '+17205550000'
        }
      });
    }, 750);
  })
};
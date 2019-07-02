import * as jwt from 'jsonwebtoken'

class TokenValidator {

  private static secret: string = 'expressadminarea'
  
  public static async sign(data: object): Promise<string> {
    let token = null
    try {
      const generatedToken: string = await jwt.sign(data, TokenValidator.secret, { expiresIn: '1h' })
      token = generatedToken
    }
    catch(e) {
      token = { message: 'Error while authenticating', status: 500 }
    }
    return token
  }

  public static async verify(token: string): Promise<any> {
    const validatedToken: any = await jwt.verify(token, TokenValidator.secret)
    return validatedToken
  }
  
}

export { TokenValidator }
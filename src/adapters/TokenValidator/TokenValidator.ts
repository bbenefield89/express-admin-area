import * as jwt from 'jsonwebtoken'

class TokenValidator {

  private static secret: string = 'expressadminarea'
  
  public static async sign(data: any): Promise<string> {
    const token: string = await jwt.sign(data, TokenValidator.secret)
    return token
  }

  public static async verify(token: string): Promise<any> {
    const validatedToken: any = await jwt.verify(token, TokenValidator.secret)
    return validatedToken
  }
  
}

export { TokenValidator }
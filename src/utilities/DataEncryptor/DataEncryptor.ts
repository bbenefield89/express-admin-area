import * as bcrypt from 'bcrypt'

class DataEncryptor {

  public static async encrypt(unencryptedData: string): Promise<string> {
    let encryptedData: string = await bcrypt.hash(unencryptedData, 10)
    return encryptedData
  }

  public static async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isPasswordsMatch: boolean = await bcrypt.compare(plainPassword, hashedPassword)
    return isPasswordsMatch
  }
  
}

export { DataEncryptor }
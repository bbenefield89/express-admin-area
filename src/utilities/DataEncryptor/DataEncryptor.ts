import * as bcrypt from 'bcrypt'

class DataEncryptor {

  public static async encrypt(unencryptedData: string): Promise<string> {
    let encryptedData: string = await bcrypt.hash(unencryptedData, 10)
    return encryptedData
  }
  
}

export { DataEncryptor }
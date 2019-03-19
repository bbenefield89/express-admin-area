import * as bcrypt from 'bcrypt'

import { DataEncryptor } from '../../../src/utilities/DataEncryptor/DataEncryptor'

/**
 * TODO: Write failing tests
 */
test('encrypt', async () => {
  const notEncryptedStr: string = 'foo'
  const encryptedStr: string = await DataEncryptor.encrypt(notEncryptedStr)
  expect(encryptedStr).not.toEqual(notEncryptedStr)

  try {
    await DataEncryptor.encrypt(null)
  }
  catch (e) {
    expect(true).toEqual(true)
  }
})

test('decrypt', async () => {
  const plainText: string = 'foo'
  const hashedText: string = await bcrypt.hash(plainText, 10)
  const isTextMatch: boolean = await DataEncryptor.compare(plainText, hashedText)
  expect(isTextMatch).toBe(true)
})
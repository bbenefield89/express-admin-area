import { TokenValidator } from '../../../src/adapters/TokenValidator/TokenValidator'

/**
 * TODO: write more thurough tests
 */
let token: any = null

test('sign', async () => {
  token = await TokenValidator.sign({ a: 'a', b: 'b' })
  expect(typeof token).toEqual('string')
})

test('verify', async () => {
  const verifiedToken: { a: string, b: string, iat: number } = await TokenValidator.verify(token)
  expect(verifiedToken.a).toEqual('a')
  expect(verifiedToken.b).toEqual('b')
  expect(typeof verifiedToken.iat).toEqual('number')
})
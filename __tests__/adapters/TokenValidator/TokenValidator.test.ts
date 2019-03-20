import { TokenValidator } from '../../../src/adapters/TokenValidator/TokenValidator'

let token: any = null

test('sign STRING', async () => {
  token = await TokenValidator.sign('Hello, World')
  expect(typeof token).toEqual('string')
})

test('verify STRING', async () => {
  const verifiedToken: string = await TokenValidator.verify(token)
  expect(verifiedToken).toEqual('Hello, World')
})

test('sign OBJECT', async () => {
  token = await TokenValidator.sign({ a: 'a', b: 'b' })
  expect(typeof token).toEqual('string')
})

test('verify OBJECT', async () => {
  const verifiedToken: { a: string, b: string, iat: number } = await TokenValidator.verify(token)
  expect(verifiedToken.a).toEqual('a')
  expect(verifiedToken.b).toEqual('b')
  expect(typeof verifiedToken.iat).toEqual('number')
})
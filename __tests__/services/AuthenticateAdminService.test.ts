import * as bcrypt from 'bcrypt'

import { AuthenticateAdminService } from '../../src/services/AuthenticateAdminService/AuthenticateAdminService'

type AdminModel = {
  findOne(where: object): AdminRow
}

type AdminRow = {
  password: string
  dataValues: { password: string }
}

test('authAdmin', async () => {
  const reqBody: { username: string, password: string } = { username: 'foo', password: 'foo' }
  const hashedPassword: string = await bcrypt.hash('foo', 10)
  const adminModel: AdminModel = { findOne: (_where) => <AdminRow>{ password: hashedPassword, dataValues: { password: hashedPassword } } }
  const token: { token?: string } = await AuthenticateAdminService.authAdmin(reqBody, adminModel)
  expect(typeof token).toBe('object')
  expect(typeof token.token).toBe('string')
  expect(token.token.length).toBeGreaterThan(0)
})
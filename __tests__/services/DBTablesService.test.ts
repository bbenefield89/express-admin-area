import { DBTablesService } from '../../build/src/services/DBTablesService/DBTablesService'

type DBModels = {
  admins: object
  electronics: object
}

test('getTables', () => {
  const dbModels: DBModels = { admins: {}, electronics: {} }
  let modelNames: string[] = DBTablesService.getTables(dbModels)
  expect(modelNames.length).toBe(2)
  expect(modelNames[0]).toEqual('admins')
  expect(modelNames[1]).toEqual('electronics')
  
  const dbModelsArray: any[] = ['admins', 'electronics']
  modelNames = DBTablesService.getTables(dbModelsArray)
  expect(modelNames.length).toEqual(0)

  const dbModelsString: string = 'admins'
  modelNames = DBTablesService.getTables(dbModelsString)
  expect(modelNames.length).toEqual(0)

  const dbModelsBoolean: boolean = true
  modelNames = DBTablesService.getTables(dbModelsBoolean)
  expect(modelNames.length).toEqual(0)

  const dbModelsNumber: number = 1
  modelNames = DBTablesService.getTables(dbModelsNumber)
  expect(modelNames.length).toEqual(0)

  const dbModelsUndefined: undefined = undefined
  modelNames = DBTablesService.getTables(dbModelsUndefined)
  expect(modelNames.length).toEqual(0)

  const dbModelsNull: null = null
  modelNames = DBTablesService.getTables(dbModelsNull)
  expect(modelNames.length).toEqual(0)
})

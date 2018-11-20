import { authGet, authPost } from './auth';
import * as mwc from '../controllers'

const authRoutes = (router, db) => {
  router.get('/', authGet)
  router.post('/', mwc.authenticateUser(db), authPost)
}

export { authRoutes }
export { dashboardGet, dashboardPost } from './dashboard'
export { tableDataGet, tableDataPost, tableDataDelete, tableDataPut } from './tableData'
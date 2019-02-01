// import { authGet, authPost } from './auth';
// import * as mwc from '../controllers'

// const authRoutes = (router, db) => {
//   router.get('/expressadminarea/auth', authGet)
//   router.post('/expressadminarea/auth', mwc.authenticateUser(db), authPost)
// }

// export { authRoutes }
export { dashboardGet, dashboardPost } from './dashboard'
export { tableDataGet, tableDataPost, tableDataDelete, tableDataPut } from './tableData'
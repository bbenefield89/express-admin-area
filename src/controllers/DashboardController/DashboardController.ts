class DashboardController {

  public static getDashboard(req, res): void {
    res.send({ databaseTables: [
      {
        id: 0,
        name: 'Admins'
      }
    ] })
  }
  
}

export default DashboardController
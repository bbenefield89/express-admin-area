  /**
   * TODO: change this route to the signup/login route
   */
  const auth = ((_req, res) => {
    const pugVars = {
      message: 'Signup/Login',
      pageTitle: 'Overview'
    }
    
    res.render('index', pugVars)
  })

  export { auth }
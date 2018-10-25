  /**
   * TODO: change this route to the signup/login route
   */
  export const authGet = ((_req, res) => {
    const locals = {
      message: 'Signup/Login',
      pageTitle: 'Overview'
    }
    
    res.render('index', locals)
  })

  export const authPost = ((req, res) => {
    console.log(req.body)
    res.send({ data: req.body })
  })
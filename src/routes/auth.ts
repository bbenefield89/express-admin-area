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

export const authPost = ((_req, res) => {
  const { admin } = res.locals
  res.send({ data: admin })
})
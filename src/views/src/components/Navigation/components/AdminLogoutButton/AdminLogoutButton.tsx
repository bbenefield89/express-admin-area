import React from 'react'

function AdminLogoutButton(props: any): any {
  return (
    <nav>
      <button onClick={ adminLogout }>Log Out</button>
    </nav>
  )

  function adminLogout(): void {
    localStorage.removeItem('token')
    props.history.push('/')
  }
}

export default AdminLogoutButton
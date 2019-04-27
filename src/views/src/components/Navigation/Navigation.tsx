import React from 'react'
import AdminLogoutButton from './components/AdminLogoutButton/AdminLogoutButton';

function Navigation(props: any): any {
  return (
    <nav>
      <AdminLogoutButton { ...props } />
    </nav>
  )
}

export default Navigation
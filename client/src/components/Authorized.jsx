import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import UserContext from '../../UserContext'

const Authorized = props => {
  let { authUser } = useContext(UserContext);
  return (
    <div>
      {authUser? <Outlet />:
          <Navigate to="/" replace />}
    </div>
  )
}

export default Authorized

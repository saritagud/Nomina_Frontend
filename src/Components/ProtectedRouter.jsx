import { Navigate, Outlet } from 'react-router-dom'

// Este componente envuelve las rutas que pasan por una autenticacion
function ProtectedRouter({ children, allowedRoles, redirectTo = '/login'}) {
   const userLS = localStorage.getItem('user')
   const user = JSON.parse(userLS)
   
   // Si no encuentra nada en el Localstorage lo redirige
   if (!user) return <Navigate to={redirectTo}/> 
   // Si el rol del usuario no se encuentra entre los permitidos para esa ruta lo redirige
   if (!allowedRoles.includes(user.role)) return <Navigate to={redirectTo}/> 
   return (
      <>
         {children ? children : <Outlet/>}
      </>
   )
}

export default ProtectedRouter
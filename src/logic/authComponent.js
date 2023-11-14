// Consiste en comprobar que exista una sesion activa y tenga el rol permitido
// allowedRoles debe ser un Array con los roles permitidos para tal componente
export const authComponent = (allowedRoles) => {
   const userLS = localStorage.getItem('user')
   const user = JSON.parse(userLS)
   
   if (!user) return false
   if (!allowedRoles.includes(user.role)) return false
   return true
}
// ** React Imports
import { useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom';

// ** Context Imports
import { AbilityContext } from 'Layouts/layout/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'configs/acl'

// ** Component Import
import NotAuthorized from 'Pages/ErrorPages/Error401'
import BlankLayout from '@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'Hooks/useAuth'
import GuestGuardData from 'Data/navigation/guestGuardData'
import GuestGuard from './GuestGuard';

const AclGuard = props => {
  const guestGuard = GuestGuardData()
  // ** Props
  const { children } = props
  const [ability, setAbility] = useState(undefined)

  // ** Hooks
  const auth = useAuth()
  const router = useLocation()
  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  // Agar guestGuard rost boʻlsa va foydalanuvchi tizimga kirmagan yoki xato sahifasi boʻlsa, kirishni tekshirmasdan sahifani koʻrsating.
  if (guestGuard || router.pathname === '/404' || router.route === '/500' || router.pathname === '/') {
    return <>{children}</>
  }

  // User is logged in, build ability for the user based on his role
  // Foydalanuvchi tizimga kirdi, uning roliga qarab foydalanuvchi uchun qobiliyat yarating
  if (auth.user && auth.user.roleName && !ability) {
    setAbility(buildAbilityFor(auth.user.roleName, guestGuard.subject))
  }

  // Check the access of current user and render pages
  // Joriy foydalanuvchining kirishini tekshiring va sahifalarni ko'rsating
  if (ability && ability.can(guestGuard.action, guestGuard.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  // Agar joriy foydalanuvchi cheklangan ruxsatga ega bo'lsa, Render Not Authorized komponenti
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard

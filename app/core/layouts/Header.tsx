import { useTheme } from "next-themes"
import React, { useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"
import logout from "app/auth/mutations/logout"

const UserInfo = () => {
  const { theme, setTheme } = useTheme()
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [menuOpen, setMenuOpen] = useState(false)

  {
    /* Array for menu */
  }
  const navLinks = [
    <Link key="123" href={Routes.BlogsPage()}>
      Blog
    </Link>,

    currentUser?.role === "ADMIN" && (
      <Link key="lockou" href={Routes.AdminPage()}>
        Admin
      </Link>
    ),
    currentUser && (
      <a
        key="lockout"
        className="no-underline cursor-pointer hover:text-gray-600"
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Log out
      </a>
    ),

    !currentUser && (
      <Link key="logIn" href={Routes.LoginPage()}>
        Log in
      </Link>
    ),
    !currentUser && (
      <Link key="signUp" href={Routes.SignupPage()}>
        Sign UP
      </Link>
    ),
  ]

  const Navbar = ({ menuOpen, setMenuOpen }) => (
    <div className="flex items-center justify-between py-6">
      <button
        key="btn1"
        type="button"
        aria-label="Toggle mobile menu"
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
      >
        <MenuAlt4Svg menuOpen={menuOpen} />
      </button>
      <div key="Navmain" className="flex items-center">
        Blitz
        <Link href={Routes.Home()}>Blog.io</Link>
      </div>
      <div key="Navsec" className="flex">
        <nav className="hidden space-x-6 md:block">{navLinks}</nav>
        {/* dark mode swith Icon */}
        <div className="pl-4 text-right">
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => {
                setTheme("dark")
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => {
                setTheme("light")
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  )

  const MobileMenu = ({ children }) => (
    <nav className="flex flex-col p-4 space-y-3 md:hidden">{children}</nav>
  )

  const MenuAlt4Svg = ({ menuOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`transition duration-100 ease h-8 w-8 ${menuOpen ? "transform rotate-90" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <MobileMenu>{navLinks}</MobileMenu>}
    </>
  )
}

const Header = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </>
  )
}

Header.suppressFirstRenderFlicker = true
export default Header

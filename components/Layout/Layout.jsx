import React from 'react'
import Footer from "../Layout/Footer"
import Menu from "../Layout/Menu"

export default function Layout({children}) {
  return (
    <>
      <Menu/>
      {children}
      <Footer/>
    </>
  )
}

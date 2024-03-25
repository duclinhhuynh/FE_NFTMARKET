import Link from 'next/link'
import path from 'path'
import React from 'react'
import  Style from './HelpCenter.module.css'
const HelpCenter = () => {
  const helpCenter = [
    {
      name: "About",
      link: "about"
    },
    {
      name: "Contact Us",
      link: "contactus"
    },
    {
      name: "About",
      link: "aboutus"
    },
    {
      name: "Sign Up",
      link: "sign-up"
    },
    {
      name: "Sign In",
      link: "sign-in"
    },
    {
      name: "Subscription",
      link: "subscription"
    },
  ]
  return (
    <div className>
      {
        helpCenter.map((el, i) => (
          <div className={Style.helpCenter} key={i + 1}>
              <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
}

export default HelpCenter
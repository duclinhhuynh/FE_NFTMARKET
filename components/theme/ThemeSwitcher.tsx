import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@nextui-org/button'
import { GoSun } from "react-icons/go";
import { IoMdMoon } from "react-icons/io";
import { WiDaySnowWind } from "react-icons/wi";
import {Chip} from "@nextui-org/react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex border-none'>
    {theme && 
    <div>
        { 
       theme === "light"
        ?
        <Chip className='text-2xl text-black focus:outline-none'variant="light" onClick={() => setTheme('dark')}>
            <IoMdMoon/>
        </Chip>
        :
        <Chip className='text-2xl text-white focus:outline-none' color='primary' variant="light" onClick={() => setTheme('light')}>
            <GoSun/>
        </Chip>
        }
    </div>
    }
    </div>
  )
}
import { Button, IconButton } from '@material-tailwind/react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode, useState } from 'react'
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  House,
  HouseFill
} from 'react-bootstrap-icons'

type Props = {
  children: ReactNode
}

const Layout = (props: Props) => {
  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-72 flex-col justify-between bg-blue-gray-800 p-4 transition-width">
        <div className="mt-12 flex flex-col">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                height={40}
                width={40}
                src="/images/rocket.svg"
                alt="Kicktracker logo"
              />
              <span className="mt-2 font-title text-2xl text-orange-700">
                Kicktracker
              </span>
            </div>
          </div>
          <div className="text-lg font-extrabold text-blue-gray-200">
            Your Crowdfunding Filter
          </div>
          <div className="mt-10 flex flex-col items-start">
            <div className="flex w-full cursor-pointer items-center overflow-hidden whitespace-nowrap rounded p-2 text-white hover:bg-blue-gray-400">
              <Link href="/">
                <a className="flex h-full w-full items-center">
                  <div>
                    <HouseFill size={30} />
                  </div>
                  <span className="ml-2 mt-2 text-2xl text-white">Home</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="ml-72 flex-1">{props.children}</main>
    </>
  )
}

export default Layout

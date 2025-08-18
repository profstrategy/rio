'use client'
import { logo } from '@/public'
import Image from 'next/image'
import React from 'react'
import { AppHeading } from '../reusables/app-heading'
import { DesktopNavLinksProps, MobileNavMenuProps } from '@/constants/types'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LiaTimesSolid } from 'react-icons/lia'
import { FaBarsStaggered } from 'react-icons/fa6'

export const Logo = () => {
    return (
        <div className='flex items-center md:gap-1'>
            <Image src={logo} alt='logo' priority={false} height={50} width={50} quality={100} />
            <AppHeading className='md:text-6xl font-extrabold text-sky-700'>RIO</AppHeading>
        </div>
    )
}

const DesktopNavMenu = ({ navItems, activeItem, setActiveItem }: DesktopNavLinksProps) => {
 
  return (
    <ul className="md:flex items-center justify-center lg:gap-8 md:gap-6 hidden">
      {navItems?.map((item) => (
        <li key={item.id} className="relative">
          <Link 
            href={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`px-3 py-2 rounded-md transition-all md:text-[0.95rem] lg:text-[1rem] font-medium relative
              ${
                item.id === activeItem 
                  ? 'text-accent-primary font-semibold' 
                  : 'text-white-rio hover:text-white-rio/80'
              }`}
          >
            {item.item}
            {item.id === activeItem && (
              <motion.span 
                className="absolute bottom-0 left-1/2 h-0.5 bg-accent-primary w-4/5 -translate-x-1/2"
                layoutId="activeNavItem"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        </li>
      ))}

 <button className="px-6 py-3 bg-gradient-to-br from-teal-700 via-teal-500 to-red-700 border border-teal-400/30 text-white rounded-lg font-medium w-50 h-10">
  Connect X
</button>

    </ul>
  )
}


const MobileNavMenu = ({
    isOpen,
    navItems,
    activeItem,
    setActiveItem,
    setIsOpen,
}: MobileNavMenuProps) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-gray-100  opacity-30 backdrop-blur-sm z-40 md:hidden top-16"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full max-w-sm shadow-xl bg-background rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* <div className="flex justify-end p-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <LiaTimesSolid className="w-6 h-6 text-gray-700" />
                            </button>
                        </div> */}

                        <motion.ul
                            className="flex flex-col items-center w-full gap-8 border-2 border-x-white-rio h-full justify-center"
                            initial="closed"
                            animate="open"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            {navItems?.map((item) => (
                                <motion.li
                                    key={item.id}
                                    variants={{
                                        open: { x: 0, opacity: 1 },
                                        closed: { x: 50, opacity: 0 },
                                    }}
                                    transition={{ type: 'spring', stiffness: 500 }}
                                    onClick={() => {
                                        setActiveItem(item.id);
                                        setIsOpen(false);
                                    }}
                                    className={` w-5/6 text-center text-lg font-medium transition-colors border-b-2 border-black-rio/5
                    ${item.id === activeItem
                                            ? 'bg-accent-white/10 text-accent-primary'
                                            : 'text-gray-700 hover:bg-white'
                                        }`}
                                >
                                    <Link

                                        href={`${item.id}`}
                                    >
                                        {item.item}
                                    </Link>
                                </motion.li>
                            ))}

                            <motion.li
                                variants={{
                                    open: { x: 0, opacity: 1 },
                                    closed: { x: 50, opacity: 0 },
                                }}
                                transition={{ type: 'spring', stiffness: 500 }}
                                className="mt-8"
                            >
                             <button className="px-6 py-3 bg-gradient-to-br from-teal-700 via-teal-500 to-red-700 border border-teal-400/30 text-white rounded-lg font-medium w-50 h-10">
  Connect X
</button>

                            </motion.li>
                        </motion.ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState('');
    const navItems = [
        { id: '/', item: 'Home' },
        { id: '/token', item: 'Token' },
        { id: '/leaderboard', item: 'Leaderboard' },
        // { id: 'contact', item: 'Contact' },
    ]
    return (
        <header className={` sticky top-0 z-30 bg-black-rio opacity-85 transition-shadow duration-300 grid m-auto`}>
            <nav className=" m-auto md:container h-16 flex items-center justify-between">
                <Logo />

                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-900 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-controls='mobile-menu'
                >
                    {isOpen ? (
                        <LiaTimesSolid className="w-6 h-6 text-white-rio" />
                    ) : (
                        <FaBarsStaggered className="w-6 h-6 text-white-rio" />
                    )}
                </button>

                <MobileNavMenu navItems={navItems} isOpen={isOpen} setIsOpen={setIsOpen} activeItem={activeItem} setActiveItem={setActiveItem} />

                <DesktopNavMenu  navItems={navItems} activeItem={activeItem} setActiveItem={setActiveItem} />
            </nav>
        </header >
    )
}

export default Navbar
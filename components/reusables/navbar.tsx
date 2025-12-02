'use client'
import { logo } from '@/public'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { AppHeading } from './app-heading'
import { DesktopNavLinksProps, MobileNavMenuProps } from '@/constants/types'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { signIn, useSession } from 'next-auth/react'
import { LiaTimesSolid } from 'react-icons/lia'
import { FaBarsStaggered } from 'react-icons/fa6'
import AppButton from '../ui/app-button'
import { useAppDialog } from '@/hooks/use-app-dialog'
import AppDialogBox from './alert-dialog'

export const Logo = () => {
    return (
        <div className='flex '>
            {/* <Image src={logo} alt='logo' priority={true} height={50} width={50} quality={100} /> */}
            <AppHeading className='lg:text-5xl font-extrabold text-sky-700'>RIO</AppHeading>
        </div>
    )
}

const DesktopNavMenu = ({ navItems, activeItem, setActiveItem, openDialog, dialogProps }: DesktopNavLinksProps) => {
    const session = useSession()
    return (
        <>
            <ul className="md:flex items-center justify-center lg:gap-8 md:gap-6 hidden">
                {navItems?.map((item) => (
                    <li key={item.id} className="relative">
                        <a
                            href={item.id}
                            onClick={() => setActiveItem(item.id)}
                            className={`px-3 py-2 rounded-md transition-all md:text-[0.95rem] lg:text-[1rem] font-medium relative
              ${item.id === activeItem
                                    ? 'text-white/60 font-semibold'
                                    : 'text-white hover:text-white/60'
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
                        </a>
                    </li>
                ))}

                {session ? <AppButton className="px-6 py-3 bg-gradient-to-br from-teal-700 via-teal-500 to-red-700 border border-teal-400/30 text-white rounded-lg font-medium w-50 h-10" onClick={openDialog}>
                    View Whitepaper
                </AppButton> : <AppButton className="px-6 py-3 bg-gradient-to-br from-teal-700 via-teal-500 to-red-700 border border-teal-400/30 text-white rounded-lg font-medium w-50 h-10" onClick={() => signIn("twitter", { callbackUrl: '/' })}>
                    Connect X
                </AppButton>}
            </ul>
            {dialogProps.open && <AppDialogBox {...dialogProps} />}
        </>
    )
}


const MobileNavMenu = ({
    isOpen,
    navItems,
    activeItem,
    setActiveItem,
    setIsOpen,
    openDialog, dialogProps
}: MobileNavMenuProps) => {
    const session = useSession()

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 md:hidden top-16 backdrop-blur-3xl"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full max-w-sm shadow-xl rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'radial-gradient(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)',
                            }}
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
                                className="flex flex-col items-center w-full gap-8 border-2 h-full justify-center"
                                initial="closed"
                                animate="open"
                                variants={{
                                    open: {
                                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                    },
                                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                                }}
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
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
                                        className={` w-5/6 text-center text-lg font-medium transition-colors border-b-2 text-white
                    ${item.id === activeItem
                                                ? 'bg-accent-white/10 text-accent-primary'
                                                : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                    >
                                        <a

                                            href={`${item.id}`}
                                        >
                                            {item.item}
                                        </a>
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
                                    {session ? <AppButton className="px-6 py-3 bg-gradient-to-br from-teal-700 via-teal-500 to-red-700 border border-teal-400/30 text-white rounded-lg font-medium w-50 h-10" onClick={() => signIn("twitter", { callbackUrl: '/' })}>
                                        Connect X
                                    </AppButton> : <AppButton className="px-6 py-3 bg-gradient-to-br from-teal-700 via-teal-500 to-red-700 border border-teal-400/30 text-white rounded-lg font-medium w-50 h-10" onClick={openDialog}>
                                        View Whitepaper
                                    </AppButton>}

                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {dialogProps.open && <AppDialogBox {...dialogProps} />}
        </>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState('');
    const { dialogProps, openDialog } = useAppDialog()
    const navItems = [
        { id: '/', item: 'Home' },
        { id: '#token', item: 'Token' },
        { id: '#leaderboard', item: 'Leaderboard' },
        // { id: 'contact', item: 'Contact' },
    ]

    useEffect(() => {
        const handleSmoothScroll = (e: Event) => {
            e.preventDefault();
            const anchor = e.target as HTMLAnchorElement;
            const href = anchor.getAttribute('href');
            if (href) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        };

        // Add event listeners
        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Cleanup function to remove event listeners
        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
        };
    }, []);


    return (
        <header className={` sticky top-0 z-50 opacity-85 transition-shadow duration-300 h-16 grid m-auto `} style={{
            background: 'radial-gradient(ellipse at center right, #1e3a5f 0%, #2c1810 40%, #0a0a0a 100%)',
        }}>
            <nav className=" flex items-center justify-between ">
                <Logo />
                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-900 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-controls='mobile-menu'
                >
                    {isOpen ? (
                        <LiaTimesSolid className="w-6 h-6 text-white" />
                    ) : (
                        <FaBarsStaggered className="w-6 h-6 text-white" />
                    )}
                </button>

                <MobileNavMenu navItems={navItems} isOpen={isOpen} setIsOpen={setIsOpen} activeItem={activeItem} setActiveItem={setActiveItem} openDialog={openDialog} dialogProps={dialogProps} />

                <DesktopNavMenu navItems={navItems} activeItem={activeItem} setActiveItem={setActiveItem} openDialog={openDialog} dialogProps={dialogProps} />
            </nav>
        </header >
    )
}

export default Navbar
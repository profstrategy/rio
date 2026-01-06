'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { AppHeading } from './app-heading'
import { DesktopNavLinksProps, MobileNavMenuProps } from '@/constants/types'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { LiaTimesSolid } from 'react-icons/lia'
import { FaBarsStaggered } from 'react-icons/fa6'
import AppButton from '../ui/app-button'
import { useAppDialog } from '@/hooks/use-app-dialog'
import Link from 'next/link'
import AppDialogBox from './alert-dialog'
import { useTwitterOAuth } from '@/hooks/use-twitter-oauth'
import { Spinner } from '../ui/spinner'

export const Logo = () => {
    return (
        <div className='flex items-center justify-center md:w-24 w-20'>
            <Image src={'/rio-logo.png'} alt='logo' priority={true} height={50} width={50} quality={100} />
            <AppHeading className='lg:text-5xl font-extrabold text-rio-sky-800'>RIO</AppHeading>
        </div>
    )
}

const DesktopNavMenu = ({ navItems, activeItem, handleNavClick, openDialog }: DesktopNavLinksProps) => {
    const { session, handleConnectTwitter } = useTwitterOAuth()

    return (
        <>
            <ul className="md:flex items-center justify-center lg:gap-8 md:gap-6 hidden">
                {navItems?.map((item) => (
                    <li key={item.id} className="relative">
                        <Link
                            href={item.id}
                            onClick={(e) => handleNavClick(e, item.id)}
                            className={`px-3 py-2 rounded-md transition-all md:text-[0.95rem] lg:text-[1rem] font-medium relative
              ${item.id === activeItem
                                    ? 'text-rio-sky-200/80'
                                    : 'text-white/70 bg-clip-text font-semibold hover:text-rio-sky-200/80'
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

                <AppButton className="px-6 py-3 text-white text-xl rounded-lg font-medium w-50 h-10 border-b-2" onClick={session.status === 'authenticated' ? openDialog : handleConnectTwitter}>
                    {session.status === 'loading' ? <Spinner /> : session.status === 'authenticated' ? `Dashboard` : `Connect X`}
                </AppButton>

                {/* <AppButton className="px-6 py-3 text-white text-xl rounded-lg font-medium w-50 h-10 border-b-2" onClick={handleSignOut}>
                    signout
                </AppButton> */}
            </ul>
        </>
    )
}


const MobileNavMenu = ({
    isOpen,
    navItems,
    activeItem,
    handleNavClick,
    setIsOpen,
    openDialog,
}: MobileNavMenuProps) => {
    const { session, handleConnectTwitter } = useTwitterOAuth()

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 lg:hidden top-16 backdrop-blur-3xl"
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
                                        className={` w-5/6 text-center text-lg font-medium transition-colors border-b-2 text-white
                 ${item.id === activeItem
                                                ? 'text-rio-sky-200/80'
                                                : 'text-white/70 bg-clip-text font-semibold hover:text-rio-sky-200/80'
                                            }`}
                                    >
                                        <Link
                                            href={item.id}
                                            onClick={(e) => {
                                                handleNavClick(e, item.id);
                                                setIsOpen(false);
                                            }}
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
                                    <AppButton className="px-6 py-3 text-white text-xl rounded-lg font-medium w-50 h-10 border-b-2" onClick={session.status === 'authenticated' ? openDialog : handleConnectTwitter}>
                                        {session.status === 'loading' ? <Spinner /> : session.status === 'authenticated' ? `Dashboard` : `Connect X`}
                                    </AppButton>
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState('/');
    const [scrollY, setScrollY] = React.useState(false);
    const dialog = useAppDialog()

    const navItems = [
        { id: '/', item: 'Home' },
        { id: '#how-it-works', item: 'How It Works' },
        { id: '#leaderboard', item: 'Leaderboard' },
        { id: '#tokenomics', item: 'Tokenomics' },
    ]

    // Handle smooth scrolling and active state
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        if (href === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveItem('/');
            window.history.pushState(null, '', '/');
            return;
        }

        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                setActiveItem(href);
                window.history.pushState(null, '', href);
            }
        }
    };

    // Update active item on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY > 0);

            const sections = ['/', 'how-it-works', 'tokenomics', 'leaderboard'];
            const scrollPosition = window.scrollY + 150;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveItem(`#${section}`);
                        window.history.replaceState(null, '', `#${section}`);
                        return;
                    }
                }
            }

            if (window.scrollY < 100) {
                setActiveItem('/');
                window.history.replaceState(null, '', '/');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`flex items-center justify-between z-50 opacity-85 transition-shadow duration-300 m-auto inset-x-0 container fixed ${scrollY ? 'bg-neutral-700 drop-shadow-white-ash shadow-md border-b border-rio-sky-800/50' : 'bg-transparent'}`}>
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

                <MobileNavMenu
                    navItems={navItems}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    activeItem={activeItem}
                    handleNavClick={handleNavClick}
                    openDialog={dialog.openDialog}
                    dialogProps={dialog.dialogProps}
                />

                <DesktopNavMenu
                    navItems={navItems}
                    activeItem={activeItem}
                    handleNavClick={handleNavClick}
                    openDialog={dialog.openDialog}
                    dialogProps={dialog.dialogProps}
                />
            </nav>
            <AppDialogBox
            {...dialog.dialogProps}
             />
        </>
    )
}

export default Navbar
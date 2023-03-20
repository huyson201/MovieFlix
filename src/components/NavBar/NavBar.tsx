import React, { MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import Wrapper from '../Wrapper/Wrapper'
import classnames from 'classnames'
import { Link, NavLink, useMatches } from 'react-router-dom'
import { urlMap } from '../../Types/common'
import Logo from '../Logo/Logo'
type Props = {}

const NavBar = (props: Props) => {
    const [showNav, setShowNav] = useState<boolean>(false)
    const navRef = useRef<HTMLDivElement>(null)
    const matches = useMatches()

    const navDark: boolean = useMemo(() => {
        return matches.some(route => (Object.keys(urlMap) as Array<keyof typeof urlMap>).some(key => route.pathname === urlMap[key]))
    }, [matches])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (navRef.current && navRef.current.contains(event.target)) return
            if (navRef.current && navRef.current.contains(event.target)) return
            setShowNav(false)
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    })

    return (
        <header className={classnames('header py-3 absolute top-0 left-0 w-full z-10', { 'bg-black': navDark })}>
            <Wrapper className='flex flex-row  items-center'>
                <button className='btn-bars text-4xl text-white mr-4 inline-block md:hidden duration-300 transition-colors hover:text-dark-teal' onClick={(event: MouseEvent) => { event.stopPropagation(); setShowNav(true) }}><HiBars3BottomLeft /></button>
                <Logo />
                <nav ref={navRef} className={classnames('menu', { active: showNav })}>
                    <button className='absolute cursor-pointer z-30 right-4 top-4 text-white text-3xl hover:text-dark-teal transition-colors duration-300 md:hidden' onClick={() => setShowNav(false)}><IoMdClose /></button>
                    <NavLink to={"/"} className={({ isActive }) => classnames("menu-items", { active: isActive })} onClick={() => setShowNav(false)}>Home</NavLink>
                    <NavLink to={"/movies"} className={({ isActive }) => classnames("menu-items", { active: isActive })} onClick={() => setShowNav(false)}>Movies</NavLink>
                    <NavLink to={"/tv-series"} className={({ isActive }) => classnames("menu-items", { active: isActive })} onClick={() => setShowNav(false)}>TV-Series</NavLink>
                </nav>
                <Link to='/search' className="search-box group ml-auto w-9 h-9 rounded-full flex justify-center items-center transition duration-300 ease-in-out hover:bg-white bg-white/10">
                    <AiOutlineSearch size={20} className='text-white/50 group-hover:text-gray-500' />
                </Link>

                {/* <div className="login-logout ml-2 md:ml-6 lg:ml-6 flex items-center group cursor-pointer">
                    <FaUserCircle className='mr-2 text-white/90' size={32} />
                    <span className='text-white/50 group-hover:text-white duration-300 transition-colors md:inline hidden'>Login</span>
                    <span className='text-white/50 mx-1 group-hover:text-white duration-300 transition-colors md:inline hidden'>/</span>
                    <span className='text-white/50 group-hover:text-white duration-300 transition-colors md:inline hidden'>Register</span>
                </div> */}
            </Wrapper>
        </header>
    )
}

export default NavBar
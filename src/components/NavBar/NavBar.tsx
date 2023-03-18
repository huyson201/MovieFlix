import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import Wrapper from '../Wrapper/Wrapper'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
type Props = {}

const NavBar = (props: Props) => {
    const [showNav, setShowNav] = useState<boolean>(false)

    return (
        <header className='header py-3 absolute top-0 left-0 w-full z-10'>
            <Wrapper className='flex flex-row  items-center'>
                <button className='btn-bars text-4xl text-white mr-4 inline-block md:hidden duration-300 transition-colors hover:text-dark-teal' onClick={() => setShowNav(true)}><HiBars3BottomLeft /></button>
                <a href='#' className="logo text-3xl font-semibold text-white">
                    Logos
                </a>
                <nav className={classnames('menu', { active: showNav })}>
                    <button className='absolute cursor-pointer z-30 right-4 top-4 text-white text-3xl hover:text-dark-teal transition-colors duration-300 md:hidden' onClick={() => setShowNav(false)}><IoMdClose /></button>
                    <NavLink to={"/"} className="menu-items">Home</NavLink>
                    <NavLink to={"/movies"} className="menu-items">Movies</NavLink>
                    <NavLink to={"/tv-series"} className="menu-items">TV-Series</NavLink>
                </nav>
                <a href='#' className="search-box group ml-auto w-9 h-9 rounded-full flex justify-center items-center transition duration-300 ease-in-out hover:bg-white bg-white/10">
                    <AiOutlineSearch size={20} className='text-white/50 group-hover:text-gray-500' />
                </a>

                <div className="login-logout ml-2 md:ml-6 lg:ml-6 flex items-center group cursor-pointer">
                    <FaUserCircle className='mr-2 text-white/90' size={32} />
                    <span className='text-white/50 group-hover:text-white duration-300 transition-colors md:inline hidden'>Login</span>
                    <span className='text-white/50 mx-1 group-hover:text-white duration-300 transition-colors md:inline hidden'>/</span>
                    <span className='text-white/50 group-hover:text-white duration-300 transition-colors md:inline hidden'>Register</span>
                </div>
            </Wrapper>
        </header>
    )
}

export default NavBar
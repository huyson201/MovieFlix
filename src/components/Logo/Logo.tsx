import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Logo = (props: Props) => {
    return (
        <Link to={'/'} className="logo text-3xl font-semibold text-white">
            Movie<span className='text-dark-teal'>Flix</span>
        </Link>
    )
}

export default Logo
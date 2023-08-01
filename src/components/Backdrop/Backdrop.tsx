import React from 'react'
import { useBackdrop } from '../../context/backdrop/backdrop.context'
import classNames from 'classnames'

const Backdrop = () => {
    const backdropState = useBackdrop()
    return (
        <div className={classNames('fixed w-full h-screen top-0 left-0 bg-black/70 z-[11] hidden [&.active]:block', { active: backdropState?.isShow })}></div>
    )
}

export default Backdrop
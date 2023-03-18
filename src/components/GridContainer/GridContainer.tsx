import classNames from 'classnames'
import React from 'react'

type Props = {
    children: any | any[]
    className?: string
}

const GridContainer = (props: Props) => {
    return (
        <div className={classNames('grid  md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 lg:grid-cols-6 mt-8', props.className)}>
            {props.children}
        </div>
    )
}

export default GridContainer
import React from 'react'

type Props = {
    children: any | any[]
}

const GridContainer = (props: Props) => {
    return (
        <div className='grid gap-y-8 gap-x-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 lg:grid-cols-6 mt-8'>
            {props.children}
        </div>
    )
}

export default GridContainer

import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {}

const FBComment = (props: Props) => {
    const location = useLocation()

    useEffect(() => {
        if (window.FB.XFBML) {
            window.FB.XFBML.parse()
        }
    }, [])

    return (
        <div
            className="fb-comments fb-comment-embed"
            data-href={import.meta.env.MODE === 'development' ? "http://localhost" : window.location.href}
            data-width="100%"
            data-numposts={3}
            data-lazy={true}
            data-mobile={true}
            data-order-by={'reverse_time'}
            data-colorscheme={'dark'}
            data-color-scheme="dark"
        >
        </div>
    )
}

export default FBComment
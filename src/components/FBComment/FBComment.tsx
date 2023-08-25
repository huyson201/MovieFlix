
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {}

const FBComment = (props: Props) => {
    const location = useLocation()
    useEffect(() => {
        if (window.FB && window.FB.XFBML) {
            window.FB.XFBML.parse();
        }
    }, [])

    return (
        <div
            className="fb-comments fb-comment-embed"
            data-href={import.meta.env.MODE === 'development' ? "https://netlifymovieflix.netlify.app/" + location.pathname : window.location.href}
            data-numposts={3}
            data-mobile={true}
            data-order-by={'reverse_time'}
            data-colorscheme={'dark'}
            data-lazy={true}
            ng-attr-data-href={window.location.href || ''}
        >
        </div>
    )
}

export default FBComment
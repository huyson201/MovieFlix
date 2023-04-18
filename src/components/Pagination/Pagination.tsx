import React, { useMemo } from 'react'
import RCPagination from 'rc-pagination';
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom'


type Props = {
    className?: string,
    defaultCurrent?: number,
    pageSize?: number,
    total?: number
}

const Pagination = ({ pageSize, total, defaultCurrent, ...props }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const onChange = (page: number, pageSize: number) => {
        console.log("change")
        searchParams.set("page", `${page}`)
        setSearchParams(searchParams)
    };

    const currentPage = useMemo(() => {
        console.log(total, pageSize, defaultCurrent)
        let page = parseInt(searchParams.get('page') || '1')
        return page
    }, [searchParams])

    return (
        <div className={classNames(props.className)}>
            <RCPagination className='flex w-full justify-center items-center gap-1'
                current={currentPage} total={total || 0} defaultCurrent={defaultCurrent || 1}
                pageSize={pageSize || 20}
                onChange={onChange}
                showPrevNextJumpers={false}
                nextIcon={<a><HiOutlineArrowNarrowRight /></a>}
                prevIcon={<a><HiOutlineArrowNarrowLeft /></a>}
                showLessItems={true} />
        </div>

    )
}

export default Pagination
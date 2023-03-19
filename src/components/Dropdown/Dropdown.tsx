import classNames from 'classnames'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BsCheck } from 'react-icons/bs'

type Props = {
    buttonIcon?: React.ReactElement
    title: string,
    grid?: boolean,
    selected?: string,
    dropContentClassName?: string
    renderItems: () => any
}

const Dropdown = ({ buttonIcon, title, renderItems, grid, dropContentClassName, selected = 'All' }: Props) => {
    const [active, setActive] = useState<boolean>(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const dropContentRef = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        setActive(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (buttonRef.current && buttonRef.current.contains(event.target)) return
            if (dropContentRef.current && dropContentRef.current.contains(event.target)) return
            setActive(false)
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [buttonRef, dropContentRef])

    return (
        <div className="relative w-[48%] xs:w-auto" >
            <button
                ref={buttonRef}
                className={classNames(`flex items-center gap-1 whitespace-nowrap rounded bg-[#212529] px-4 py-2 text-xs 
                leading-normal text-[#4b5156] transition duration-150 ease-in-out 
                focus:outline-none focus:ring-0 active:bg-primary-700 
                capitalize
                font-normal hover:bg-[#2c3237]
                w-full
                justify-center
                xs:justify-start
                motion-reduce:transition-none`,)}
                type="button"
                onClick={handleClick}
                id="dropdownMenuButton1"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                data-te-ripple-init
                data-te-ripple-color="light">

                {buttonIcon}
                <span>{title}</span>
                <span className='text-white/70'>{selected}</span>
            </button>
            <div
                ref={dropContentRef}
                data-te-dropdown-show
                className={classNames(`absolute z-20 float-left m-0 hidden 
                list-none overflow-hidden rounded-[6px] border-none
                mt-1 bg-[#212529] p-3  
                 gap-x-1 dropdown-content
                 ${!grid && 'h-80 overflow-y-auto scroll-bar'}
                 flex-wrap ${grid ? 'w-[200%] sm:w-[400px] md:w-[600px] [&.active]:flex' : 'w-max [&.active]:block'}`, { active }, dropContentClassName)}
                aria-labelledby="dropdownMenuButton1"
                data-te-dropdown-menu-ref>

                {
                    renderItems()
                }
            </div>
        </div>
    )
}

export interface DropItemsProps {
    id: string,
    value: string,
    name: string
    check?: boolean,
    simpleItem?: boolean
    onChangeEvent?: (isCheck: boolean, value: string) => void
}

export const DropItem = ({ id, name, value, check, onChangeEvent }: DropItemsProps) => {
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChangeEvent) {
            onChangeEvent(event.target.checked, value)
        }
    }
    return (
        <div className='flex items-center w-[48%] sm:w-[32%] md:w-[24%]'>
            <input type="checkbox" id={`${id}`} onChange={handleOnChange} className='checkbox peer hidden' checked={check} value={value} />
            <label htmlFor={`${id}`} className='flex h-8 gap-2 peer-checked:px-0 peer-checked:gap-0 px-2 w-full items-center text-white/60 text-xs hover:bg-[#16181b] 
                            py-[2px] transition duration-300 rounded cursor-pointer
                            before:content-[""] before:w-3 before:h-3 before:bg-[#434b53]'>
                <BsCheck className='text-dark-teal text-[28px] hidden icons' />
                {name}
            </label>
        </div>
    )
}
export interface DropItemsSimpleProps extends DropItemsProps {
    fieldName?: string
}


export const DropItemSimple = ({ id, name, value, check, fieldName, onChangeEvent }: DropItemsSimpleProps) => {
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("checked::" + `${event.target.checked}`)
        if (onChangeEvent) {
            onChangeEvent(event.target.checked, value)
        }
    }

    return (
        <div className='flex items-center w-full xs:w-max'>
            <input type="radio" id={`${id}`} onChange={handleOnChange} name={fieldName || "check-radio"} className='checkbox peer hidden' checked={check} value={value} />
            <label htmlFor={`${id}`} className='flex h-8 gap-2 peer-checked:px-2 peer-checked:gap-0 px-4 w-full items-center text-white/60 text-xs hover:bg-[#16181b] 
                            py-[2px] transition duration-300 rounded cursor-pointer
                            before:content-[""] before:w-3 before:h-3 before:rounded-full before:bg-[#434b53]'>
                <BsCheck className='text-dark-teal text-[28px] hidden icons' />
                {name}
            </label>
        </div>
    )
}
export default Dropdown
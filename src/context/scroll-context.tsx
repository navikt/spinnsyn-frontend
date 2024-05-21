import React, { createContext, useContext, ReactNode, RefObject, useState, useEffect } from 'react'

interface ScrollContextType {
    registrerElement: (ref: RefObject<HTMLElement>) => void
    blaTilElement: () => void
    erApenAccordion: boolean
}

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

interface ScrollProviderProps {
    children: ReactNode
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
    const [element, setElement] = useState<HTMLElement>()
    const [erApenAccordion, setErApenAccordion] = useState(false)

    const registrerElement = (ref: RefObject<HTMLElement>) => {
        if (ref.current) {
            setElement(ref.current)
        }
    }

    const blaTilElement = () => {
        setErApenAccordion(true)
    }

    useEffect(() => {
        if (erApenAccordion && element) {
            window.setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' })
            }, 50)
        }
    }, [element, erApenAccordion])

    return (
        <ScrollContext.Provider value={{ registrerElement, blaTilElement, erApenAccordion }}>
            {children}
        </ScrollContext.Provider>
    )
}

export const useScroll = (): ScrollContextType => {
    const context = useContext(ScrollContext)
    if (context === undefined) {
        throw new Error('useScroll må brukes i en ScrollProvider')
    }
    return context
}

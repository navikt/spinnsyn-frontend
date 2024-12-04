import React, { createContext, useContext, ReactNode, RefObject, useState, useEffect } from 'react'

type ScrollElementType = 'begrunnelse_vedtak' | 'dager_ikke_nav' | 'mer_om_beregningen' | ''

interface ScrollContextType {
    registrerElement: (elementId: ScrollElementType, ref: RefObject<HTMLElement>) => void
    blaTilElement: (elementId: ScrollElementType) => void
    apneElementMedId: ScrollElementType
}

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

interface ScrollProviderProps {
    children: ReactNode
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
    const [elementer, setElementer] = useState<Map<ScrollElementType, HTMLElement>>(new Map())
    const [apneElementMedId, setApneElementMedId] = useState<ScrollElementType>('')

    const registrerElement = (elementId: ScrollElementType, ref: RefObject<HTMLElement>) => {
        if (ref.current !== null && !elementer.has(elementId)) {
            setElementer((prevElements) => {
                const newElements = new Map(prevElements)
                newElements.set(elementId, ref.current!)
                return newElements
            })
        }
    }

    const blaTilElement = (id: ScrollElementType) => {
        setApneElementMedId(id)
    }

    useEffect(() => {
        if (apneElementMedId && elementer.has(apneElementMedId)) {
            const element = elementer.get(apneElementMedId)
            if (element) {
                window.setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                    setApneElementMedId('')
                }, 50)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apneElementMedId])

    return (
        <ScrollContext.Provider value={{ registrerElement, blaTilElement, apneElementMedId }}>
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

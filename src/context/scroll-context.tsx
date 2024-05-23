import React, { createContext, useContext, ReactNode, RefObject, useState, useEffect } from 'react'

interface ScrollContextType {
    registrerElement: (elementId: string, ref: RefObject<HTMLElement>) => void
    blaTilElement: (elementId: string) => void
    apneElementMedId: string
}

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

interface ScrollProviderProps {
    children: ReactNode
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
    const [elementer, setElementer] = useState<Map<string, HTMLElement>>(new Map())
    const [apneElementMedId, setApneElementMedId] = useState('')

    const registrerElement = (elementId: string, ref: RefObject<HTMLElement>) => {
        if (ref.current !== null && !elementer.has(elementId)) {
            console.log('registrerer element', elementId, ref.current)
            setElementer((prevElements) => {
                const newElements = new Map(prevElements)
                newElements.set(elementId, ref.current!)
                return newElements
            })
        }
    }

    const blaTilElement = (id: string) => {
        setApneElementMedId(id)
    }

    useEffect(() => {
        if (apneElementMedId && elementer.has(apneElementMedId)) {
            const element = elementer.get(apneElementMedId)
            if (apneElementMedId !== '' && element) {
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

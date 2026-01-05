import { useEffect, useRef } from 'react'

export const useAccordionHashNavigasjon = (
    accordionId: string,
    apne: boolean | undefined,
    setApne: ((apne: boolean) => void) | undefined,
    setForelderApne?: ((apne: boolean) => void) | undefined,
) => {
    const initialHashHandtertRef = useRef(false)

    useEffect(() => {
        const utforJevnScroll = () => {
            if (window.location.hash.slice(1) !== accordionId) return false

            const element = document.getElementById(accordionId)
            const mal = element?.querySelector('[tabindex="-1"]') as HTMLElement

            if (mal?.offsetParent) {
                mal.scrollIntoView({ behavior: 'smooth', block: 'start' })
                mal.focus({ preventScroll: true })
                return true
            }
            return false
        }

        const apneAccordionOgScroll = () => {
            if (!setApne) return

            if (setForelderApne) setForelderApne(true)
            setApne(true)

            const forsokScroll = () => {
                if (!utforJevnScroll()) {
                    requestAnimationFrame(forsokScroll)
                }
            }

            setTimeout(forsokScroll, 250)
        }

        const handterHashEndring = () => {
            if (window.location.hash.slice(1) === accordionId) {
                apneAccordionOgScroll()
            }
        }

        const handterKlikk = (e: MouseEvent) => {
            const lenke = (e.target as HTMLElement).closest('a')
            if (lenke?.hash !== `#${accordionId}`) return

            e.preventDefault()

            const hashAlleredeSatt = window.location.hash === `#${accordionId}`

            if (!hashAlleredeSatt) {
                window.location.hash = accordionId
            } else {
                setTimeout(() => utforJevnScroll(), 100)
            }
        }

        if (!initialHashHandtertRef.current) {
            initialHashHandtertRef.current = true
            if (window.location.hash.slice(1) === accordionId) {
                apneAccordionOgScroll()
            }
        }

        window.addEventListener('hashchange', handterHashEndring)
        document.addEventListener('click', handterKlikk)

        return () => {
            window.removeEventListener('hashchange', handterHashEndring)
            document.removeEventListener('click', handterKlikk)
        }
    }, [accordionId, setApne, setForelderApne])

    useEffect(() => {
        const hash = window.location.hash.slice(1)

        if (apne && hash !== accordionId) {
            history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${accordionId}`)
        } else if (!apne && hash === accordionId) {
            history.replaceState(null, '', window.location.pathname + window.location.search)
        }
    }, [accordionId, apne])
}

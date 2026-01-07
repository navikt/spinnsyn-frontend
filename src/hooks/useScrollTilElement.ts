import { useEffect, useRef } from 'react'

export const useScrollTilElement = (
    elementId: string,
    apne: boolean | undefined,
    setApen: ((apne: boolean) => void) | undefined,
    setForelderElementApen?: ((apne: boolean) => void) | undefined,
) => {
    const initialHashHandtertRef = useRef(false)

    useEffect(() => {
        const utforJevnScroll = () => {
            if (window.location.hash.slice(1) !== elementId) return false

            const element = document.getElementById(elementId)
            const mal = element?.querySelector('[tabindex="-1"]') as HTMLElement

            if (mal?.offsetParent) {
                mal.scrollIntoView({ behavior: 'smooth', block: 'start' })
                mal.focus({ preventScroll: true })
                return true
            }
            return false
        }

        const apneElementOgScroll = () => {
            if (!setApen) return

            if (setForelderElementApen) setForelderElementApen(true)
            setApen(true)

            const forsokScroll = () => {
                if (!utforJevnScroll()) {
                    requestAnimationFrame(forsokScroll)
                }
            }

            setTimeout(forsokScroll, 250)
        }

        const handterHashEndring = () => {
            if (window.location.hash.slice(1) === elementId) {
                apneElementOgScroll()
            }
        }

        const handterKlikk = (e: MouseEvent) => {
            const lenke = (e.target as HTMLElement).closest('a')
            if (lenke?.hash !== `#${elementId}`) return

            e.preventDefault()

            const hashAlleredeSatt = window.location.hash === `#${elementId}`

            if (!hashAlleredeSatt) {
                window.location.hash = elementId
            } else {
                setTimeout(() => utforJevnScroll(), 100)
            }
        }

        if (!initialHashHandtertRef.current) {
            initialHashHandtertRef.current = true
            if (window.location.hash.slice(1) === elementId) {
                apneElementOgScroll()
            }
        }

        window.addEventListener('hashchange', handterHashEndring)
        document.addEventListener('click', handterKlikk)

        return () => {
            window.removeEventListener('hashchange', handterHashEndring)
            document.removeEventListener('click', handterKlikk)
        }
    }, [elementId, setApen, setForelderElementApen])

    useEffect(() => {
        const hash = window.location.hash.slice(1)

        if (apne && hash !== elementId) {
            history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${elementId}`)
        } else if (!apne && hash === elementId) {
            history.replaceState(null, '', window.location.pathname + window.location.search)
        }
    }, [elementId, apne])
}

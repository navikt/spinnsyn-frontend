import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const RedirectTilForsiden = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/')
    }, [ router ])

    return null

}

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const VedtakPage = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        router.push('/?id=' + id)
    }, [id, router])

    return <strong>Vidersender...</strong>
}

export default VedtakPage

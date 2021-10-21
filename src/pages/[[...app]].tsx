import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

import CreateReactAppEntryPoint from '../app'

function App() {
    const [ isMounted, setIsMounted ] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }


    const CreateReactAppEntryPoint = dynamic(
        () => import('../app'),
        { ssr: false }
    )

    return <>
        <CreateReactAppEntryPoint />
    </>
}

export const getServerSideProps: GetServerSideProps<object> = async() => {
    // Tvinger dynamic page rendring
    return Promise.resolve({ props: {} })
}

export default App

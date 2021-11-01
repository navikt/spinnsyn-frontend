import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import CreateReactAppEntryPoint from '../components/app'

function App() {

    const CreateReactAppEntryPoint = dynamic(
        () => import('../components/app'),
        { ssr: false }
    )

    return <>
        <CreateReactAppEntryPoint />
    </>
}


export const getServerSideProps: GetServerSideProps = async() => {

    // Tving disabling av statisk rendring
    return { props: {} }
}


export default App

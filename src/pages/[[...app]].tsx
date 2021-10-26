import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import CreateReactAppEntryPoint from '../app'
import { logger } from '../utils/logger'

function App() {


    const CreateReactAppEntryPoint = dynamic(
        () => import('../app'),
        { ssr: false }
    )

    return <>
        <CreateReactAppEntryPoint />
    </>
}


export const getServerSideProps: GetServerSideProps = async() => {

    logger.info('Logger serverside')
    // Tving disabling av statisk rendring
    return { props: {} }
}


export default App

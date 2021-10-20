import { useEffect, useState } from 'react'

import CreateReactAppEntryPoint from '../app'

function App() {
    const [ isMounted, setIsMounted ] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return <CreateReactAppEntryPoint />
}

export default App

import React from 'react'

interface VisProps {
    hvis: any
    render: () => React.ReactElement
}
/**
 * @deprecated The method should not be used
 */
const Vis = ({ hvis, render }: VisProps) => {
    return hvis ? render() : null
}

/**
 * @deprecated The method should not be used
 */
export default Vis

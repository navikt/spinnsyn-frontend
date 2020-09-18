import './banner.less'

import React from 'react'

interface BannerProps {
    children: React.ReactElement;
}

const Banner = ({ children }: BannerProps) => {
    return (
        <header className="sidebanner">
            {children}
        </header>
    )
}

export default Banner

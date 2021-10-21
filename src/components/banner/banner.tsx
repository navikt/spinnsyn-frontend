import React from 'react'

import env from '../../utils/environment'

interface BannerProps {
    children: React.ReactNode;
}

const Banner = ({ children }: BannerProps) => {
    return (
        <header className="sidebanner">
            {children}
            <h2>{env.loginServiceUrl()}</h2>
        </header>
    )
}

export default Banner

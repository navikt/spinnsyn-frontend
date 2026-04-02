import { DecoratorComponentsReact, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { InternalHeader } from '@navikt/ds-react'

import { createInitialServerSideBreadcrumbs } from '../hooks/useBreadcrumbs'
import { getPublicEnv, safeJsonStringify, spinnsynFrontendInterne } from '../utils/environment'

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

interface Props {
    Decorator?: DecoratorComponentsReact
    language: string
    internheader: boolean
    ctx: DocumentContext
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        const language = getDocumentParameter(initialProps, 'lang')
        const internheader = spinnsynFrontendInterne()

        const props: DocumentInitialProps & Props = {
            ...initialProps,
            language,
            internheader,
            ctx,
        }

        const showDecorator = process.env.NO_DECORATOR != 'true'
        if (showDecorator) {
            props.Decorator = await fetchDecoratorReact({
                env: (process.env.DECORATOR_ENV as 'dev' | 'prod') || 'dev',
                params: {
                    chatbot: false,
                    feedback: false,
                    breadcrumbs: createInitialServerSideBreadcrumbs(ctx.pathname),
                    logoutWarning: process.env.MOCK_BACKEND !== 'true',
                },
            })
        }
        return props
    }

    render() {
        const { Decorator, language, internheader, ctx } = this.props
        const arkivering = ctx.pathname.includes('vedtak/arkivering')
        const visDekorator = Decorator != null && !arkivering && !internheader

        function header() {
            if (internheader) {
                return (
                    <InternalHeader>
                        <InternalHeader.Title as="h1">Svar på søknad om sykepenger</InternalHeader.Title>
                    </InternalHeader>
                )
            }
            if (visDekorator) {
                return <Decorator.Header />
            }
            return null
        }

        return (
            <Html lang={language || 'no'}>
                <Head>{visDekorator && <Decorator.HeadAssets />}</Head>
                <body>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.__publicEnv = ${safeJsonStringify(getPublicEnv())}`,
                        }}
                    />
                    {header()}
                    <Main />
                    {visDekorator && (
                        <>
                            <Decorator.Footer />
                            <Decorator.Scripts />
                        </>
                    )}
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument

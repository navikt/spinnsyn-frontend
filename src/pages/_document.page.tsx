import 'node-fetch'

import { DecoratorComponents, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import getConfig from 'next/config'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { Header } from '@navikt/ds-react-internal'

import { createInitialServerSideBreadcrumbs } from '../hooks/useBreadcrumbs'
import { spinnsynFrontendInterne } from '../utils/environment'

const { serverRuntimeConfig } = getConfig()

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

interface Props {
    Decorator?: DecoratorComponents
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

        const showDecorator = serverRuntimeConfig.noDecorator != 'true'
        if (showDecorator) {
            props.Decorator = await fetchDecoratorReact({
                env: serverRuntimeConfig.decoratorEnv,
                params: {
                    chatbot: false,
                    feedback: false,
                    urlLookupTable: false,
                    breadcrumbs: createInitialServerSideBreadcrumbs(ctx.pathname),
                },
            })
        }
        return props
    }

    render(): JSX.Element {
        const { Decorator, language, internheader, ctx } = this.props
        const arkivering = ctx.pathname.includes('vedtak/arkivering')
        const visDekorator = Decorator != null && !arkivering && !internheader

        function header() {
            if (internheader) {
                return (
                    <Header>
                        <Header.Title as="h1">Svar på søknad om sykepenger</Header.Title>
                    </Header>
                )
            }
            if (visDekorator) {
                return <Decorator.Header />
            }
            return null
        }

        return (
            <Html lang={language || 'no'}>
                <Head>{visDekorator && <Decorator.Styles />}</Head>
                <body>
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

import 'node-fetch'

import { Components, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import getConfig from 'next/config'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { createInitialServerSideBreadcrumbs } from '../hooks/useBreadcrumbs'

const { serverRuntimeConfig } = getConfig()

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

interface Props {
    Decorator?: Components
    language: string
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        const language = getDocumentParameter(initialProps, 'lang')

        const props: DocumentInitialProps & Props = { ...initialProps, language }

        const showDecorator = serverRuntimeConfig.noDecorator != 'true'
        if (showDecorator) {
            const Decorator = await fetchDecoratorReact({
                env: serverRuntimeConfig.decoratorEnv,
                simple: false,
                chatbot: false,
                feedback: false,
                urlLookupTable: false,
                breadcrumbs: createInitialServerSideBreadcrumbs(ctx.pathname),
            })
            props.Decorator = Decorator
        }
        return props
    }

    render(): JSX.Element {
        const { Decorator, language } = this.props
        return (
            <Html lang={language || 'no'}>
                <Head>{Decorator && <Decorator.Styles />}</Head>
                <body>
                    {Decorator && <Decorator.Header />}
                    <Main />
                    {Decorator && (
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

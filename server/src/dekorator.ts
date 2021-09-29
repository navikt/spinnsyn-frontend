import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr'

export const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        dekoratorenUrl: process.env.DECORATOR_URL,
        env: process.env.DECORATOR_ENV as any,
        filePath: filePath,
        simple: false,
        chatbot: false,
        urlLookupTable: false,
    })


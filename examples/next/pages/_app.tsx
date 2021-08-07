import type { AppProps } from 'next/app'

import './init.css'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App

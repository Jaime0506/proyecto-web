import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { MainRouter } from './MainRouter'
import { store } from './store'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <MainRouter />
        </Provider>
    </StrictMode>
)
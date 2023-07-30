import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <ChakraProvider>

      <Provider store={store}>
        <App />
      </Provider>

    </ChakraProvider>
  </Router>,
)



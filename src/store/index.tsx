import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import themeReducer from '../reducers/themeSlice'
import formReducer from '../reducers/formSlice'

const store = configureStore({
    reducer: {
      theme: themeReducer,
      form: formReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

function StoreProvider({children}: {children: React.ReactNode}) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider
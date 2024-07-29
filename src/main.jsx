import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Provider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import "./index.css";

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='max-w-7xl mx-auto'>
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)

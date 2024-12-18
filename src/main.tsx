import '@/styles/index.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

const root = document.getElementById('root')!

createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)

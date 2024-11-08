import '@/styles/index.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root, loader as rootLoader, action as rootAction } from './routes/root'
import { ErrorPage } from './error/error-page'
import { Contact, loader as contactLoader } from './routes/contact/contact'
import { Edit, action as editAction } from './routes/edit/edit'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		loader: rootLoader,
		action: rootAction,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'contacts/:contactId',
				element: <Contact />,
				loader: contactLoader,
			},
			{
				path: 'contacts/:contactId/edit',
				element: <Edit />,
				loader: contactLoader,
				action: editAction,
			},
		],
	},
])

const root = document.getElementById('root')!

createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)

import '@/styles/index.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root, loader as rootLoader, action as rootAction } from './routes/root'
import { ErrorPage } from './error/error-page'
import {
	Contact,
	loader as contactLoader,
	action as contactAction,
} from './routes/contact/contact'
import { Edit, action as editAction } from './routes/edit/edit'
import { action as destroyAction, Destroy } from './routes/destroy/destroy'
import { Index } from './routes/index'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		loader: rootLoader,
		action: rootAction,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Index />,
					},
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:contactId/edit',
						element: <Edit />,
						loader: contactLoader,
						action: editAction,
					},
					{
						path: 'contacts/:contactId/destroy',
						action: destroyAction,
						errorElement: <Destroy />,
					},
				],
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

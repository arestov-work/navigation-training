import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'
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

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Root />}
			loader={rootLoader}
			action={rootAction}
			errorElement={<ErrorPage />}
		>
			<Route errorElement={<ErrorPage />}>
				<Route index element={<Index />} />
				<Route
					path='contacts/:contactId'
					element={<Contact />}
					loader={contactLoader}
					action={contactAction}
				/>
				<Route
					path='contacts/:contactId/edit'
					element={<Edit />}
					loader={contactLoader}
					action={editAction}
				/>
				<Route
					path='contacts/:contactId/destroy'
					element={<Destroy />}
					loader={contactLoader}
					action={destroyAction}
				/>
			</Route>
		</Route>
	)
)

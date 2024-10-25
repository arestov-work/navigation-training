import { FC } from 'react'
import styles from './error-page.module.scss'
import { useRouteError } from 'react-router-dom'

type RouteError = {
	statusText?: string
	message?: string
}

export const ErrorPage: FC = () => {
	const error = useRouteError() as RouteError
	console.error(error)

	return (
		<div className={styles.wrapper}>
			<div>404</div>
			<p>{error.statusText || error.message}</p>
		</div>
	)
}

import { FC, useEffect } from 'react'
import styles from './root.module.scss'
import {
	Outlet,
	useLoaderData,
	Form,
	redirect,
	NavLink,
	useNavigation,
	Link,
	LoaderFunctionArgs,
	useSubmit,
} from 'react-router-dom'
import { getContacts, createContact } from '../contacts'
import cn from 'classnames'

type Contact = {
	id: string
	first: string
	last: string
	avatar: string
	twitter: string
	notes: string
	favorite: boolean
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const search = url.searchParams.get('search') || ''
	const contacts = await getContacts(search)
	return { contacts, search }
}

export const action = async () => {
	const contact = await createContact()
	return redirect(`/contacts/${contact.id}/edit`)
}

export const Root: FC = () => {
	const { contacts, search } = useLoaderData() as {
		contacts: Contact[]
		search: string
	}
	const navigation = useNavigation()
	const submit = useSubmit()

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('search')

	useEffect(() => {
		const searchInput = document.getElementById(
			'search'
		) as HTMLInputElement | null
		searchInput && (searchInput.value = search)
	}, [search])

	return (
		<div className={styles.container}>
			<div className={styles.wrapper} id='sidebar'>
				<Link to='/' className={styles.title}>
					React Router Contacts
				</Link>
				<div className={styles.search}>
					<Form className={styles.searchForm} id='search-form' role='search'>
						<input
							className={styles.input}
							id='search'
							placeholder='Поиск'
							type='search'
							name='search'
							defaultValue={search}
							onChange={(event) => {
								const isFirstSearch = search === null
								submit(event.currentTarget.form, { replace: !isFirstSearch })
							}}
						/>
						<div
							className={styles.searchSpinner}
							aria-hidden
							hidden={!searching}
						>
							<div className={styles.searchSpinnerLoad}></div>
						</div>
						<div className='sr-only' aria-live='polite'></div>
					</Form>
					<Form className={styles.formButton} method='post'>
						<button type='submit'>Новый</button>
					</Form>
				</div>

				<nav>
					{contacts.length ? (
						<ul className={styles.ul}>
							{contacts.map((contact: any) => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											cn(styles.link, {
												[styles.linkActive]: isActive,
												[styles.linkPending]: isPending,
											})
										}
									>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>Новая запись</i>
										)}{' '}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p className={styles.text}>
							<i>Нет контактов</i>
						</p>
					)}
				</nav>
			</div>

			<div
				className={cn(styles.detail, {
					[styles.detailLoading]: navigation.state === 'loading',
				})}
				id='detail'
			>
				<Outlet />
			</div>
		</div>
	)
}

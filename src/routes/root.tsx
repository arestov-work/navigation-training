import { FC } from 'react'
import styles from './root.module.scss'
import {
	Outlet,
	useLoaderData,
	Form,
	redirect,
	NavLink,
	useNavigation,
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

export async function loader() {
	const contacts = await getContacts()
	return { contacts }
}

export async function action() {
	const contact = await createContact()
	return redirect(`/contacts/${contact.id}/edit`)
}

export const Root: FC = () => {
	const { contacts } = useLoaderData() as { contacts: Contact[] }
	const navigation = useNavigation()

	return (
		<div className={styles.container}>
			<div className={styles.wrapper} id='sidebar'>
				<a href='/' className={styles.title}>
					React Router Contacts
				</a>
				<div className={styles.search}>
					<form className={styles.searchForm} id='search-form' role='search'>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
						/>
						<div id='search-spinner' aria-hidden hidden={true} />
						<div className='sr-only' aria-live='polite'></div>
					</form>
					<Form className={styles.formButton} method='post'>
						<button type='submit'>New</button>
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

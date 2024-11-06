import { FC } from 'react'
import styles from './root.module.scss'
import { Link, Outlet, useLoaderData, Form } from 'react-router-dom'
import { getContacts, createContact } from './contact/contact'

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
	return { contact }
}

export const Root: FC = () => {
	const { contacts } = useLoaderData() as { contacts: Contact[] }

	return (
		<div className={styles.container}>
			<div className={styles.wrapper} id='sidebar'>
				<h1 className={styles.title}>React Router Contacts</h1>
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
									<Link to={`contacts/${contact.id}`}>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>Нет имени</i>
										)}{' '}
										{contact.favorite && <span>★</span>}
									</Link>
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

			<div id='detail'>
				<Outlet />
			</div>
		</div>
	)
}

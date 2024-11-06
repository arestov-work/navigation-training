import { FC } from 'react'
import styles from './contact.module.scss'
import { Form } from 'react-router-dom'
import cn from 'classnames'
import { getContact } from '../../contacts'

type Contact = {
	id: string
	first: string
	last: string
	avatar: string
	twitter: string
	notes: string
	favorite: boolean
}

type LoaderParams = {
	params: {
		contactId: string
	}
}

let contacts: Contact[] = []

export async function loader({ params }) {
	const contact = await getContact(params.contactId)
	return { contact }
}

export async function getContacts(): Promise<Contact[]> {
	return contacts
}

export async function createContact(): Promise<Contact> {
	const newContact: Contact = {
		id: String(Date.now()),
		first: '',
		last: '',
		avatar: '',
		twitter: '',
		notes: '',
		favorite: false,
	}

	contacts.push(newContact)
	return newContact
}

export const Contact: FC = () => {
	const contact: Contact = {
		id: String(Date.now()),
		first: 'Иванов',
		last: 'Иван',
		avatar: `https://robohash.org/${String(Date.now())}.png?size=200x200`,
		twitter: 'twitter',
		notes: 'Маленькое описание',
		favorite: true,
	}

	const { id, first, last, avatar, twitter, notes, favorite } = contact

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperImg}>
				<img
					key={id}
					src={avatar || `https://robohash.org/${id}.png?size=200x200`}
					alt='Нет картинки'
				/>
			</div>

			<div className={styles.container}>
				<h1 className={styles.title}>
					{first || last ? (
						<>
							{first} {last}
						</>
					) : (
						'Неизвестный тип'
					)}
					<Favorite contact={favorite} />
				</h1>

				{twitter && (
					<p>
						<a
							className={styles.link}
							href='https://reactrouter.com/en/main/start/tutorial#the-root-route'
							target='_blank'
						>
							{twitter}
						</a>
					</p>
				)}

				{notes && <p className={styles.notes}>{notes}</p>}

				<div className={styles.wrapperBtn}>
					<Form action='edit'>
						<button className={styles.button}>Редактировать</button>
					</Form>

					<Form
						method='post'
						action='destroy'
						onSubmit={(e) => {
							if (
								!confirm(
									'Пожалуйста, подтвердите, что вы хотите удалить эту запись.'
								)
							) {
								e.preventDefault()
							}
						}}
					>
						<button className={cn(styles.button, styles.buttonDel)}>
							Удалить
						</button>
					</Form>
				</div>
			</div>
		</div>
	)
}

const Favorite = ({ contact }: { contact: boolean }) => {
	return (
		<Form className={styles.buttonForm} method='post'>
			<button name='favorite' value={contact ? 'false' : 'true'}>
				{contact ? '★' : '☆'}
			</button>
		</Form>
	)
}

import { FC } from 'react'
import styles from './contact.module.scss'
import {
	ActionFunctionArgs,
	Form,
	LoaderFunctionArgs,
	useFetcher,
	useLoaderData,
} from 'react-router-dom'
import cn from 'classnames'
import { getContact, updateContact } from '../../contacts'

type Contact = {
	id: string
	first: string
	last: string
	avatar: string
	twitter: string
	notes: string
	favorite: boolean
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const contact = await getContact(params.contactId as string)
	if (!contact) {
		throw new Response('', {
			status: 404,
			statusText: 'Not Found',
		})
	}

	return { contact }
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const formData = await request.formData()

	return updateContact(
		params.contactId as string,
		{
			favorite: formData.get('favorite') === 'true',
		} as Partial<Contact>
	)
}

export const Contact: FC = () => {
	const { contact } = useLoaderData() as { contact: Contact }
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
					<Favorite favorite={favorite} />
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

const Favorite = ({ favorite }: { favorite: boolean }) => {
	const fetcher = useFetcher()
	const favorites = fetcher.formData
		? fetcher.formData.get('favorite') === 'true'
		: favorite

	return (
		<fetcher.Form className={styles.buttonForm} method='post'>
			<button name='favorite' value={favorite ? 'false' : 'true'}>
				{/* {fetcher.state === 'loading' ? '⏳ ...' : favorite ? '★' : '☆'} */}
				{favorites ? '★' : '☆'}
			</button>
		</fetcher.Form>
	)
}

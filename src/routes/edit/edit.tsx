import styles from './edit.module.scss'
import { FC } from 'react'
import {
	Form,
	useLoaderData,
	redirect,
	ActionFunction,
	useNavigate,
} from 'react-router-dom'
import cn from 'classnames'
import { updateContact } from '../../contacts'

type Contact = {
	first?: string
	last?: string
	twitter?: string
	avatar?: string
	notes?: string
}

export const action: ActionFunction = async ({ request, params }) => {
	const contactId = params.contactId as string
	const formData = await request.formData()
	const updates = Object.fromEntries(formData)
	await updateContact(contactId, updates)

	return redirect(`/contacts/${params.contactId}`)
}

export const Edit: FC = () => {
	const { contact } = useLoaderData() as { contact: Contact }
	const navigate = useNavigate()

	return (
		<Form method='post' className={styles.wrapper}>
			<p className={styles.title}>Имя</p>
			<label className={styles.label}>
				<input
					className={styles.input}
					type='text'
					name='first'
					placeholder='Имя'
					defaultValue={contact?.first}
				/>
				<input
					className={styles.input}
					type='text'
					name='last'
					placeholder='Фамилия'
					defaultValue={contact?.last}
				/>
			</label>

			<p className={styles.title}>Twitter</p>
			<label className={styles.label}>
				<input
					className={styles.input}
					type='text'
					name='twitter'
					placeholder='@jack'
					defaultValue={contact?.twitter}
				/>
			</label>

			<p className={styles.title}>Аватар URL</p>
			<label className={styles.label}>
				<input
					className={styles.input}
					type='text'
					name='avatar'
					placeholder='https://example.com/avatar.jpg'
					defaultValue={contact?.avatar}
				/>
			</label>

			<p className={styles.title}>Записи</p>
			<label className={styles.label}>
				<textarea
					className={cn(styles.input, styles.textarea)}
					name='notes'
					defaultValue={contact?.notes}
				/>
			</label>

			<div />
			<div className={styles.wrapperBtn}>
				<button className={cn(styles.button, styles.buttonSave)} type='submit'>
					Сохранить
				</button>
				<button
					className={styles.button}
					type='button'
					onClick={() => navigate(-1)}
				>
					Отменить
				</button>
			</div>
		</Form>
	)
}

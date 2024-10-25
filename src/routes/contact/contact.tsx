import { FC } from 'react'
import styles from './contact.module.scss'
import { Form } from 'react-router-dom'
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

export const Contact: FC = () => {
	const contact: Contact = {
		id: '1',
		first: 'Иванов',
		last: 'Иван',
		avatar: 'https://robohash.org/you.png?size=200x200',
		twitter: 'Нет twitter',
		notes: 'Несколько заметок',
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

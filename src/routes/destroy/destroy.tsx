import styles from './destroy.module.scss'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { deleteContact } from '../../contacts'

export const action = async ({ params }: ActionFunctionArgs) => {
	// throw new Error('Ошибочка')
	await deleteContact(params.contactId as string)
	return redirect('/')
}

export const Destroy = () => {
	return <div className={styles.wrapper}>Упс! Произошла ошибка.</div>
}

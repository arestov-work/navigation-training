import { FC } from 'react'
import styles from './root.module.scss'

export const Root: FC = () => {
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
					<form className={styles.formButton} method='post'>
						<button type='submit'>New</button>
					</form>
				</div>

				<nav>
					<ul className={styles.ul}>
						<li>
							<a href={`/contacts/1`}>Your Name</a>
						</li>
						<li>
							<a href={`/contacts/2`}>Your Friend</a>
						</li>
					</ul>
				</nav>
			</div>

			<div id='detail'></div>
		</div>
	)
}

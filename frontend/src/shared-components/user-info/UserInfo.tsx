import styles from './UserInfo.module.css';

export function UserInfo({ name, headline="", postedOn }: { name: string, headline?: string, postedOn?: string }) {

    return (
        <div className={ styles.userInfo }>
           <strong className={ styles.author }>{ name }</strong>
           <p className={ styles.metaInfo }>{ headline }</p>
           <p className={ styles.metaInfo }>{ postedOn }</p>
        </div>
    )
}
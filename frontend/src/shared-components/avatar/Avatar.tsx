import styles from './Avatar.module.css';

const userImage = "https://image.shutterstock.com/image-vector/avatar-man-icon-profile-placeholder-260nw-1229859850.jpg";

export function Avatar({ size = 60, src = userImage }: { size?: number, src?: string }) {
    return (
        <div style={{ height:`${size}px`, width: `${size}px` }} className={ styles.avatar }>
            <img src={src} alt="" />
        </div>
    )
}
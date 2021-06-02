import { useAppSelector } from '../../../app/hooks';
import { selectIsLoading } from '../metaInfoSlice';
import styles from './Loader.module.css';


export function Loader() {
    const isLoading = useAppSelector(selectIsLoading);
    // console.log(isLoading)
    if(!isLoading)
        return null;
    return (
        <div className={ `row ${ styles.loaderContainer }` }>
            <div className={ `spinner-2 ${ styles.loader }` }>
            </div>
        </div>
    )
}
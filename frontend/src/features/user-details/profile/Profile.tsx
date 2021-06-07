import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUser } from "../usersSlice";

export function Profile() {
    const user = useAppSelector( selectCurrentUser );
    console.log(user);
    return (
        <>
        <div className="row">
            <div className="col-8">
                <img src="" alt="" />
            </div>
        </div>
        </>
    );
}
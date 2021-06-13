import { FaSkullCrossbones } from 'react-icons/fa';
export function NotFound() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', 'alignItems': 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '4rem' }}>
                    <FaSkullCrossbones />
                </span>
                <h1>404 NOT FOUND</h1>
            </div>
        </div>
    )
}
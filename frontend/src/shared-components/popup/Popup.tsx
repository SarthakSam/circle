import { MouseEventHandler, ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

const popupSizeMap = {
    'small': 'popup--small',
    'medium': 'popup--medium',
    'large': 'popup--large',
}

export function Popup({ title, children, popupSize = 'medium', closePopup }: { title: string, children: ReactNode, popupSize?: keyof typeof popupSizeMap, closePopup: MouseEventHandler<HTMLSpanElement> }) {
    return (
        <div className={`popup__container ${ popupSizeMap[popupSize] }`} style={{ display: 'initial' }}>
            <div className="popup">
                <div className="popup__header">
                    <p className="popup__title" style={{ fontWeight: 600, flex: 1 }}>{ title }</p>
                    <span className={`popup__close`} onClick = { closePopup } > <FaTimes /> </span>
                    <i className="fa fa-times popup__close"></i>
                </div>
                <div className="popup__body">
                    { children }
                </div>
            </div>
        </div>
    )
}
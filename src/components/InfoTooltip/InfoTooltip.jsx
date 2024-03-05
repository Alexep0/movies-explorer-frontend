import successIcon from '../../images/successIcon.svg'
import errorIcon from '../../images/errorIcon.svg'

export default function InfoTooltip({isOpen, onClose, isSuccess}) {
    return (
        <div className={`tooltip ${isOpen ? 'tooltip_opened' : ''}`}>
            <div className="tooltip__content">
                <button
                    type="button"
                    aria-label="Close"
                    className='tooltip__close'
                    onClick={onClose}
                />
                <img
                    className='tooltip__image'
                    alt='Изображение уведомления'
                    src={`${isSuccess ? successIcon : errorIcon}`}
                />
                <h2 className='tooltip__title'>{`${isSuccess ? "Успешно" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
            </div>
        </div>
    )
}
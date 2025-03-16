import './index.scss';

interface Props {
    isOn: boolean;
    onToggle: () => void;
    id?: string;
    disabled?: boolean;
}

const AppSwitchButton = ({ isOn, onToggle, id, disabled }: Props) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={onToggle}
                className="app__switch-checkbox"
                type="checkbox"
                id={id || 'app__switch-new'}
            />
            <label
                className={`app__switch-label ${isOn ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                htmlFor={id || `app__switch-new`}
                // onClick={(e) => {
                //     e.stopPropagation();
                // }}
            >
                <span className="app__switch-button" />
            </label>
        </>
    );
};

export default AppSwitchButton;

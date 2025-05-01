import './index.css';

/**
 * Basic button component
 *
 * @param children
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button({children, onClick}) {
    return (
        <button className="button" onClick={onClick}>{children}</button>
    );
}

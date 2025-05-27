import './index.css';

/**
 * A functional component that renders a button.
 *
 * @param {Object} props - The properties passed to the Button component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {function} props.onClick - The callback function to handle click events on the button.
 * @return {JSX.Element} A button element with the provided children and click event handler.
 */
export default function Button({children, onClick}) {
    return (
        <button className="button" onClick={onClick}>{children}</button>
    );
}

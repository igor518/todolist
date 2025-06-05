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
        <button 
            className="button tw:text-white tw:border tw:border-gray-400 tw:rounded-[10px] tw:px-5 tw:py-3 tw:text-lg tw:font-semibold tw:tracking-wide tw:transition-all tw:duration-300 tw:bg-gradient-to-r tw:from-[#1A237E] tw:to-[#03A9F4] tw:hover:from-[#3949AB] tw:hover:to-[#29B6F6]" 
            onClick={onClick}
        >
            {children}
        </button>
    );
}

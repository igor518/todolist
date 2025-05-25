/**
 * Modal component that renders a dialog overlay with customizable content
 * and a close button.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {Function} props.onClose - Callback function to be invoked when the close button is clicked.
 * @return {JSX.Element} The rendered modal component.
 */
export default function Modal({ children, onClose }) {
  return (
      <div className="tw:fixed tw:inset-0 tw:bg-black/40 tw:flex tw:items-center tw:justify-center tw:z-50">
          <div className="tw:bg-light tw:rounded-[10px] tw:shadow-lg tw:p-6 tw:w-full tw:max-w-md tw:relative">
              <button
                  onClick={onClose}
                  className="tw:absolute tw:top-2 tw:right-2 tw:text-text-gray hover:tw:text-gray-800 tw:text-xl"
              >
                  &times;
              </button>
              {children}
          </div>
      </div>
  );
}

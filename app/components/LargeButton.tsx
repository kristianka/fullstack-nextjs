interface LargeButtonProps {
    text: string;
    type?: "submit";
    disabled?: boolean;
}

export const LargeButton = ({ text, type, disabled }: LargeButtonProps) => {
    return (
        <button
            className="mt-3 bg-blue-500 text-white rounded-xl p-2.5 px-5 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

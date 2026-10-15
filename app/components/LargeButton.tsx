interface LargeButtonProps {
    text: string;
    type?: "submit";
}

export const LargeButton = ({ text, type }: LargeButtonProps) => {
    return (
        <button
            className="mt-3 bg-blue-500 text-white rounded-xl p-2.5 px-5 hover:bg-blue-600"
            type={type}
        >
            {text}
        </button>
    );
};

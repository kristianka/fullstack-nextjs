interface CustomLabelProps {
    text: string;
    type: "text" | "password" | "email";
    name: string;
    placeholder?: string;
    defaultValue?: string;
    required?: boolean;
}

export const CustomLabel = ({
    text,
    type,
    name,
    placeholder,
    defaultValue,
    required
}: CustomLabelProps) => {
    return (
        <label>
            <span className="block mb-2">{text}</span>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                required={required}
                className="border rounded-lg px-1"
            />
        </label>
    );
};

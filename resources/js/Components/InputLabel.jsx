export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-bold text-gray-300 uppercase tracking-wider mb-1 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img
            {...props}
            src="/blogo.jpg"
            alt="Logo"
            className={className}
        />
    );
}
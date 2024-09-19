export default function AZComp({ onAppSelect }) {
    return (
        <ul className="flex gap-2">
            {Array.from({ length: 26 }, (_, i) => (
                <li key={i}>
                    <button
                        className="px-2 py-2 transition-all rounded uppercase border hover:bg-secondary"
                        onClick={() => onAppSelect(String.fromCharCode(97 + i))} // Call the parent function with the selected character
                    >
                        {String.fromCharCode(97 + i)}
                    </button>
                </li>
            ))}
        </ul>
    );
}

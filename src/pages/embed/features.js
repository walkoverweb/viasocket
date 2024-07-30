import { useState } from 'react';

const images = {
    tag1: '/assets/img/embedfeature/libraries.svg',
    tag2: '/assets/img/embedfeature/mainFlow.svg',
    tag3: '/assets/img/embedfeature/mainFlow.svg',
    tag4: '/assets/img/embedfeature/mainFlow.svg',
    tag5: '/assets/img/embedfeature/mainFlow.svg',
    tag6: '/assets/img/embedfeature/mainFlow.svg',
    tag7: '/assets/img/embedfeature/mainFlow.svg',
    tag8: '/assets/img/embedfeature/mainFlow.svg',
    tag9: '/assets/img/embedfeature/Integrationtemplates.png',
    tag10: '/assets/img/embedfeature/mainFlow.svg',
    tag11: '/assets/img/embedfeature/mainFlow.svg',
    tag12: '/assets/img/embedfeature/mainFlow.svg',
    tag13: '/assets/img/embedfeature/mainFlow.svg',
    tag14: '/assets/img/embedfeature/scheduleTask.svg',
};

const tags = [
    { id: 'tag1', label: '5000+ connector library' },
    { id: 'tag2', label: 'Easy to implement' },
    { id: 'tag3', label: 'Cost-effective' },
    { id: 'tag4', label: 'Always updated' },
    { id: 'tag5', label: 'User friendly' },
    { id: 'tag6', label: 'Native behaviour' },
    { id: 'tag7', label: 'Inbuilt help doc' },
    { id: 'tag8', label: 'High customizations' },
    { id: 'tag9', label: 'Integration templates' },
    { id: 'tag10', label: 'Drag and Drop' },
    { id: 'tag11', label: 'Real-time data transfer' },
    { id: 'tag12', label: 'Built-in data storage' },
    { id: 'tag13', label: 'Scalability' },
    { id: 'tag14', label: 'Security and Compliances ' },
];

const TagImageDisplay = () => {
    const [hoveredTag, setHoveredTag] = useState(null);

    return (
        <div className="w-screen flex flex-col p-4">
            <div className="flex flex-col md:flex-row bg-F6F4EE rounded-lg  p-4 md:p-8 overflow-hidden">
                {/* Image Section */}
                <div className="flex-1 flex items-center justify-center bg-white p-4 overflow-hidden">
                    <img
                        src={images[hoveredTag] || '/assets/img/embedfeature/mainFlow.svg'}
                        alt={hoveredTag || 'Default Image'}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                {/* Tags Section */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {tags.map((tag) => (
                            <li
                                key={tag.id}
                                className={`cursor-pointer p-2 rounded border-b-4 border-gray-200 transition-all duration-300 flex items-center ${
                                    hoveredTag === tag.id
                                        ? 'bg-gradient-to-r from-white via-Ivory-100 via-Ivory-300 to-Ivory-500 text-black shadow-lg'
                                        : 'bg-F6F4EE text-gray-700 hover:bg-gray-300'
                                }`}
                                onMouseEnter={() => setHoveredTag(tag.id)}
                                onMouseLeave={() => {}}
                            >
                                <span className="flex-1 text-left md:text-center">{tag.label}</span>
                                {hoveredTag === tag.id && <span className="ml-2 w-3 h-3 rounded-full bg-black"></span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TagImageDisplay;

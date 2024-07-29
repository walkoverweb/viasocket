// import { useState } from 'react';

// const images = {
//   tag1: '/assets/img/embedfeature/libraries.svg',
//   tag2: '/assets/img/embedfeature/mainFlow.svg',
//   tag3: '/assets/img/embedfeature/mainFlow.svg',
//   tag4: '/assets/img/embedfeature/mainFlow.svg',
//   tag5: '/assets/img/embedfeature/mainFlow.svg',
//   tag6: '/assets/img/embedfeature/mainFlow.svg',
//   tag7: '/assets/img/embedfeature/mainFlow.svg',
//   tag8: '/assets/img/embedfeature/mainFlow.svg',
//   tag9: '/assets/img/embedfeature/Integrationtemplates.png',
//   tag10: '/assets/img/embedfeature/mainFlow.svg',
//   tag11: '/assets/img/embedfeature/mainFlow.svg',
//   tag12: '/assets/img/embedfeature/mainFlow.svg',
//   tag13: '/assets/img/embedfeature/mainFlow.svg',
//   tag14: '/assets/img/embedfeature/scheduleTask.svg',
// };

// const tags = [
//   { id: 'tag1', label: '5000+ connector library' },
//   { id: 'tag2', label: 'Easy to implement' },
//   { id: 'tag3', label: 'Cost-effective' },
//   { id: 'tag4', label: 'Always updated' },
//   { id: 'tag5', label: 'User friendly' },
//   { id: 'tag6', label: 'Native behaviour' },
//   { id: 'tag7', label: 'Inbuilt help doc' },
//   { id: 'tag8', label: 'High customizations' },
//   { id: 'tag9', label: 'Integration templates' },
//   { id: 'tag10', label: 'Drag and Drop' },
//   { id: 'tag11', label: 'Real-time data transfer' },
//   { id: 'tag12', label: 'Built-in data storage' },
//   { id: 'tag13', label: 'Scalability' },
//   { id: 'tag14', label: 'Security and Compliances ' },
// ];

// const TagImageDisplay = () => {
//   const [hoveredTag, setHoveredTag] = useState(null);

//   return (
//     <div className="h-screen w-screen flex flex-col p-4">
//       <div className="flex-1 bg-F6F4EE rounded-lg shadow-lg p-8 flex overflow-hidden">
//         <div className="flex-1 flex items-center justify-center bg-white p-4 overflow-hidden">
//           {hoveredTag ? (
//             <img
//               src={images[hoveredTag]}
//               alt={hoveredTag}
//               className="max-w-full max-h-full object-contain"
//             />
//           ) : (
//             <p className="text-lg text-gray-500">Hover over a tag to see the image</p>
//           )}
//         </div>
//         <div className="flex-1 p-4 overflow-y-auto">
//           <ul className="space-y-2">
//             {tags.map((tag) => (
//               <li
//                 key={tag.id}
//                 className={`cursor-pointer p-2 bg-F6F4EE rounded border-b-4 border-gray-200 hover:bg-gray-300 ${
//                   hoveredTag === tag.id ? 'shadow-lg text-black' : ''
//                 }`}
//                 onMouseEnter={() => setHoveredTag(tag.id)}
//                 onMouseLeave={() => setHoveredTag(null)}
//               >
//                 {tag.label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TagImageDisplay;
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
        <div className="h-screen w-screen flex flex-col p-4">
            <div className="flex-1 bg-F6F4EE rounded-lg shadow-lg p-8 flex overflow-hidden">
                <div className="flex-1 flex items-center justify-center bg-white p-4 overflow-hidden">
                    {hoveredTag ? (
                        <img
                            src={images[hoveredTag]}
                            alt={hoveredTag}
                            className="max-w-full max-h-full object-contain"
                        />
                    ) : (
                        <p className="text-lg text-gray-500">Hover over a tag to see the image</p>
                    )}
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {tags.map((tag) => (
                            <li
                                key={tag.id}
                                className={`cursor-pointer p-2 rounded border-b-4 border-gray-200 ${
                                    hoveredTag === tag.id
                                        ? 'bg-gray-300 text-black shadow-lg'
                                        : 'bg-F6F4EE text-gray-700 hover:bg-gray-300'
                                }`}
                                onMouseEnter={() => setHoveredTag(tag.id)}
                                onMouseLeave={() => setHoveredTag(null)}
                            >
                                {tag.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TagImageDisplay;

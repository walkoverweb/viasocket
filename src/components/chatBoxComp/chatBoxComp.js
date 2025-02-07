import Image from 'next/image';
import { useState } from 'react';

export default function ChatBoxComp() {
    const [launcher, setLauncher] = useState(false);
    const toggleChatWidget = () => {
        if (launcher) {
            window.chatWidget.close();
        } else {
            window.chatWidget.open();
        }
        setLauncher(!launcher);
    };
    return (
        <div>
            <Image
                onClick={toggleChatWidget}
                src={launcher ? '/assets/img/chat-box-hover.svg' : '/assets/img/chat-box.svg'}
                width={1400}
                height={1400}
                className="max-w-[340px] w-full block h-auto cursor-pointer"
                alt="Chat with Agent"
                onMouseEnter={(e) => {
                    if (!launcher) {
                        e.currentTarget.src = '/assets/img/chat-box-hover.svg';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!launcher) {
                        e.currentTarget.src = '/assets/img/chat-box.svg';
                    }
                }}
            />
        </div>
    );
}

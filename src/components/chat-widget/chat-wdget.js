import { useState } from 'react';
import style from './chat-widget.module.scss';
import { MdCircle } from 'react-icons/md';

export default function ChatWidget() {
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
        <>
            <button onClick={toggleChatWidget} className={style.chat_widget} aria-label="Talk to an expert">
                <MdCircle color="#00ED64" fontSize={12} /> Live Chat
            </button>
        </>
    );
}

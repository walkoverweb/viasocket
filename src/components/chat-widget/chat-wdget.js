import { useState } from 'react';
import style from './chat-widget.module.scss';

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
                Live Chat
            </button>
        </>
    );
}

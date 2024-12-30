import React, { useEffect, useState } from 'react';
import './Snackbar.css';

interface SnackbarProps {
    message: string;
    duration?: number;
    action?: { label: string; onClick: () => void };
}

const Snackbar: React.FC<SnackbarProps> = ({ message, duration = 3000, action }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration]);

    return (
        <div className={`snackbar ${visible ? 'show' : ''}`}> 
            {message}
            {action && <button onClick={action.onClick}>{action.label}</button>}
        </div>
    );
};

export default Snackbar;

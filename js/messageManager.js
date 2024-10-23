function showMessage(type, message) {
    const messageContainer = document.getElementById('messageContainer');
    
    // Remove any existing messages of the same type
    const existingMessages = messageContainer.querySelectorAll(`.message.${type}`);
    existingMessages.forEach(msg => messageContainer.removeChild(msg));
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        <span class="message-icon"></span>
        <span class="message-text">${message}</span>
        <span class="message-close">&times;</span>
    `;
    messageContainer.appendChild(messageElement);

    messageElement.querySelector('.message-close').addEventListener('click', () => {
        messageContainer.removeChild(messageElement);
    });

    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);

    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            if (messageContainer.contains(messageElement)) {
                messageContainer.removeChild(messageElement);
            }
        }, 300);
    }, 5000);
}

function showConfirmMessage(message, onConfirm) {
    const messageContainer = document.getElementById('messageContainer');
    
    // Remove any existing confirm messages
    const existingMessages = messageContainer.querySelectorAll('.message.warning');
    existingMessages.forEach(msg => messageContainer.removeChild(msg));
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message warning';
    messageElement.innerHTML = `
        <span class="message-icon"></span>
        <span class="message-text">${message}</span>
        <div class="message-buttons">
            <button class="confirm-button">${getTranslation('yes')}</button>
            <button class="cancel-button">${getTranslation('no')}</button>
        </div>
    `;
    messageContainer.appendChild(messageElement);

    const confirmButton = messageElement.querySelector('.confirm-button');
    const cancelButton = messageElement.querySelector('.cancel-button');

    const cleanup = () => {
        if (messageContainer.contains(messageElement)) {
            messageContainer.removeChild(messageElement);
        }
    };

    confirmButton.addEventListener('click', () => {
        cleanup();
        onConfirm();
    });

    cancelButton.addEventListener('click', cleanup);

    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
}

function showDownloadMessage(type, message, downloadUrl, filename) {
    const messageContainer = document.getElementById('messageContainer');
    
    // Remove any existing download messages
    const existingMessages = messageContainer.querySelectorAll(`.message.${type}`);
    existingMessages.forEach(msg => messageContainer.removeChild(msg));
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        <span class="message-icon"></span>
        <span class="message-text">${message}</span>
        <a href="${downloadUrl}" download="${filename}" class="download-link">${getTranslation('download')}</a>
        <span class="message-close">&times;</span>
    `;
    messageContainer.appendChild(messageElement);

    const closeMessage = () => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            if (messageContainer.contains(messageElement)) {
                messageContainer.removeChild(messageElement);
            }
        }, 300);
    };

    messageElement.querySelector('.message-close').addEventListener('click', closeMessage);

    messageElement.querySelector('.download-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(downloadUrl, '_blank');
        closeMessage();
    });

    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
}

const styles = `
    .message {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        border-radius: 4px;
        margin-bottom: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateX(100%);
        transition: opacity 0.3s, transform 0.3s;
        max-width: 300px;
    }

    .message.show {
        opacity: 1;
        transform: translateX(0);
    }

    .message.info {
        background-color: #e3f2fd;
        color: #0d47a1;
    }

    .message.warning {
        background-color: #fff3e0;
        color: #e65100;
    }

    .message.error {
        background-color: #ffebee;
        color: #b71c1c;
    }

    .message.success {
        background-color: #e8f5e9;
        color: #1b5e20;
    }

    .message-icon {
        margin-right: 10px;
        font-size: 24px;
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .message-text {
        flex-grow: 1;
        white-space: pre-line;
    }

    .message-close {
        cursor: pointer;
        margin-left: 10px;
        font-size: 18px;
    }

    .message-buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        gap: 10px;
    }

    .message-buttons button {
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        min-width: 60px;
    }

    .confirm-button {
        background-color: #4caf50;
        color: white;
    }

    .cancel-button {
        background-color: #f44336;
        color: white;
    }

    .download-link {
        display: inline-block;
        margin-left: 10px;
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 3px;
    }

    .download-link:hover {
        background-color: #45a049;
    }

    .dark-mode .message.info {
        background-color: #0d47a1;
        color: #e3f2fd;
    }

    .dark-mode .message.warning {
        background-color: #e65100;
        color: #fff3e0;
    }

    .dark-mode .message.error {
        background-color: #b71c1c;
        color: #ffebee;
    }

    .dark-mode .message.success {
        background-color: #1b5e20;
        color: #e8f5e9;
    }

    .dark-mode .download-link {
        background-color: #45a049;
    }

    .dark-mode .download-link:hover {
        background-color: #3d8b40;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Ensure these functions are globally accessible
window.showMessage = showMessage;
window.showConfirmMessage = showConfirmMessage;
window.showDownloadMessage = showDownloadMessage;

const filterSelect = document.querySelector('.message-filter');
const messageList = document.querySelector('.message-list');

function renderMessages(messages) {
    messageList.innerHTML = ''; // Clear existing messages

    if (messages && messages.length) {
        messages.forEach(message => {
            const row = document.createElement('div');
            row.classList.add('row-container');

            const category = document.createElement('div');
            category.classList.add('grid-item', 'category');
            category.textContent = message.category;

            const text = document.createElement('div');
            text.classList.add('grid-item', 'text');
            text.textContent = message.text;

            const actions = document.createElement('div');
            actions.classList.add('grid-item', 'actions');

            // Create and add the copy button
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy Text';
            copyButton.dataset.messageText = message.text;
            copyButton.addEventListener('click', () => copyText(copyButton.dataset.messageText));
            actions.appendChild(copyButton);

            // Create and add the update link
            const updateLink = document.createElement('a');
            updateLink.classList.add('update-link');
            updateLink.href = `/messages/${message._id}/update`;
            updateLink.textContent = 'Update';
            actions.appendChild(updateLink);

            // Create and add the delete link
            const deleteLink = document.createElement('a');
            deleteLink.href = `/messages/${message._id}/delete`;
            deleteLink.textContent = 'Delete';
            deleteLink.onclick = () => confirm('Are you sure you want to delete this message?');
            actions.appendChild(deleteLink);

            // Now append all elements to the row
            row.appendChild(category);
            row.appendChild(text);
            row.appendChild(actions);

            messageList.appendChild(row);
        });
    } else {
        messageList.innerHTML = '<p>No messages found.</p>';
    }
}

function copyText(text) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
            console.log('Text copied to clipboard');
        })
        .catch(function (error) {
            console.error('Error in copying text: ', error);
        });
}

function escapeForJS(str) {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "'").replace(/"/g, '"');
}

document.querySelectorAll('button[data-message-text]').forEach(button => {
    button.addEventListener('click', function () {
        const text = escapeForJS(this.getAttribute('data-message-text'));
        copyText(text);
    });
});

filterSelect.addEventListener('change', function () {
    const selectedFilter = this.value;
    let filteredMessages;
    switch (selectedFilter) {
        case 'tinder':
            filteredMessages = messages.tinderMessages;
            break;
        case 'jobs':
            filteredMessages = messages.jobMessages;
            break;
        case 'all':
        default:
            filteredMessages = messages.allMessages;
    }
    renderMessages(filteredMessages);
});

// Render initial messages (tinder messages by default)
renderMessages(messages.tinderMessages);

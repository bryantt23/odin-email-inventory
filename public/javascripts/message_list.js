const filterSelect = document.querySelector('.message-filter');
const messageList = document.querySelector('.message-list');

// Function to render messages
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
            copyButton.classList.add("message-action");
            copyButton.textContent = 'Copy Text';
            copyButton.dataset.messageText = message.text;
            copyButton.addEventListener('click', () => copyText(copyButton.dataset.messageText));
            actions.appendChild(copyButton);

            // Create and add the update link
            const updateLink = document.createElement('a');
            updateLink.classList.add("message-action");
            updateLink.href = `/messages/${message._id}/update`;
            updateLink.textContent = 'Update';
            actions.appendChild(updateLink);

            // Create and add the delete link
            const deleteLink = document.createElement('a');
            deleteLink.classList.add("message-action");
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

// Function to copy text to clipboard
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

// Function to escape special characters in a string
function escapeForJS(str) {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "'").replace(/"/g, '"');
}

// Function to handle filter change
function handleFilterChange() {
    const selectedFilter = filterSelect.value;
    localStorage.setItem('selectedFilter', selectedFilter);
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
}

// Get the filter value from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedFilter = localStorage.getItem('selectedFilter') || 'tinder';
    filterSelect.value = storedFilter;
    handleFilterChange();
});

// Event listener for filter select change
filterSelect.addEventListener('change', handleFilterChange);

// Render initial messages based on stored filter (or default to 'tinder')
renderMessages(messages.tinderMessages);

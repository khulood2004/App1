// script.js
const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");
const emailInput = document.getElementById("email-input");
const groupInput = document.getElementById("group-input");
const listContainer = document.getElementById("list-container");
const totalContacts = document.getElementById("total-contacts");
const contactSelect = document.getElementById("contact-select");
const groupSelectInput = document.getElementById("group-select-input");
const searchInput = document.getElementById("search-input");

async function addContact() {
    if (nameInput.value === '' || numberInput.value === '' || emailInput.value === '') {
        alert("You must fill all the fields!");
    } else {
        let contact = {
            name: nameInput.value,
            number: numberInput.value,
            email: emailInput.value,
            group_name: groupInput.value || 'No Group'
        };

        const response = await fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        const data = await response.json();
        if (data.message === 'success') {
            updateContactList();
            nameInput.value = '';
            numberInput.value = '';
            emailInput.value = '';
            groupInput.value = '';
        } else {
            alert('Error adding contact');
        }
    }
}

async function removeContact(button) {
    const li = button.parentElement;
    const contactId = li.getAttribute('data-id');

    const response = await fetch(`http://localhost:3000/contacts/${contactId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (data.message === 'deleted') {
        li.remove();
        updateTotalContacts();
    } else {
        alert('Error removing contact');
    }
}

async function updateContactList() {
    const response = await fetch('http://localhost:3000/contacts');
    const data = await response.json();
    listContainer.innerHTML = '';
    if (data.message === 'success') {
        data.data.forEach(contact => {
            let li = document.createElement("li");
            li.setAttribute('data-id', contact.id);
            li.innerHTML = `Name: ${contact.name}, Number: ${contact.number}, Email: ${contact.email}, Group: ${contact.group_name} <button onclick="removeContact(this)">Remove</button>`;
            listContainer.appendChild(li);
        });
        updateTotalContacts();
    } else {
        alert('Error fetching contacts');
    }
}

function updateTotalContacts() {
    totalContacts.textContent = listContainer.children.length;
}

document.addEventListener('DOMContentLoaded', updateContactList);







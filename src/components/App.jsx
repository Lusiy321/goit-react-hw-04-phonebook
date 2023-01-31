import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactsForm/ContactsForm';
import { ContactList } from './ContactsList/ContactsList';
import { Styles, PhonebookWrap, MainTitle, SecondaryTitle } from './Styles';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const getSubmitForm = (name, number) => {
    const normalazedFind = name.toLowerCase();

    const isName = contacts.find(
      contact => contact.name.toLowerCase() === normalazedFind
    );
    if (isName) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts([{ name, number, id: nanoid(5) }, ...contacts]);
  };
  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const deleteName = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Styles />
      <PhonebookWrap>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm submitForm={getSubmitForm} />
        <SecondaryTitle>Contacts</SecondaryTitle>
        <Filter handleChange={handleChange} filter={filter} />
        <ContactList contacts={getVisibleContacts()} onDelete={deleteName} />
      </PhonebookWrap>
    </>
  );
}

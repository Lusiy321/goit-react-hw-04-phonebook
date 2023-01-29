import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactsForm/ContactsForm';
import { ContactList } from './ContactsList/ContactsList';
import { Styles, PhonebookWrap, MainTitle, SecondaryTitle } from './Styles';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Kolya Pushka', number: '459-12-56' },
      { id: 'id-2', name: 'Stepan Sraka', number: '443-89-12' },
      { id: 'id-3', name: 'Vasyl Mordovorot', number: '645-17-79' },
      { id: 'id-4', name: 'Genka Metla', number: '227-91-26' },
      { id: 'id-5', name: 'Tolya Vantus', number: '245-21-48' },
    ],
    filter: '',
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  getSubmitForm = ({ name, number }) => {
    const normalazedFind = name.toLowerCase();

    const isName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalazedFind
    );
    if (isName) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState(prevstate => ({
      contacts: [{ name, number, id: nanoid(4) }, ...prevstate.contacts],
    }));
  };

  deleteName = id => {
    this.setState(prevstate => ({
      contacts: prevstate.contacts.filter(contact => contact.id !== id),
    }));
  };
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <Styles />
        <PhonebookWrap>
          <MainTitle>Phonebook</MainTitle>
          <ContactForm submitForm={this.getSubmitForm} />
          <SecondaryTitle>Contacts</SecondaryTitle>
          <Filter handleChange={this.handleChange} filter={this.state.filter} />
          <ContactList contacts={visibleContacts} onDelete={this.deleteName} />
        </PhonebookWrap>
      </>
    );
  }
}

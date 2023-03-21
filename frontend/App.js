import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';

const App = ({ isSignedIn, guestBook, wallet }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    guestBook.getMessages().then(setMessages);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    await guestBook.addMessage(message.value, donation.value)
    const messages = await guestBook.getMessages()

    setMessages(messages);
    message.value = '';
    donation.value = '0';
    fieldset.disabled = false;
    message.focus();
  };

  const signIn = () => { wallet.signIn() }

  const signOut = () => { wallet.signOut() }

  return (
    <main>
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src="path/to/logo.png" alt="Logo" width="50" height="50" />
            </a>
          </li>
          <li><a href="#about">About</a></li>
          <li><a href="#messages">Messages</a></li>
          <li>{ isSignedIn
            ? <button onClick={signOut}>Log out</button>
            : <button onClick={signIn}>Log in</button>
          }</li>
          <li><a href="#form">Add Message</a></li>
        </ul>
      </nav>

      <section id="about">
        <h2>About</h2>
        <p>This is a guest book application built with NEAR Protocol.</p>
      </section>

      <section id="messages">
        <h2>Messages</h2>
        { !!messages.length ? <Messages messages={messages}/> : <p>No messages yet.</p> }
      </section>

      <section id="form">
        <h2>Add Message</h2>
        { isSignedIn
          ? <Form onSubmit={onSubmit} currentAccountId={wallet.accountId} />
          : <SignIn/>
        }
      </section>

    </main>
  );
};

export default App;

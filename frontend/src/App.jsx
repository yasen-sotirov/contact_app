// useEffect стартира функция когато ДОМ рендерира нещо
// useState -усеща и ъпдейтва когато нещо се промени
import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts"); //изпраща request и чака за response
    const data = await response.json();
    setContacts(data.contacts);
  };

  // render contact table
  return (
    <>
      <ContactList contacts={contacts} />
      <ContactForm onSuccess={fetchContacts} />
    </>
  );
}

export default App;

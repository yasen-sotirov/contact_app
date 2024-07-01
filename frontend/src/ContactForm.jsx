import { useState } from "react";

const ContactForm = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // функция за бутоните
  const onSubmit = async (e) => {
    e.preventDefault(); //               за да не презарежда страницата

    // DEFINING DATA
    const data = { firstName, lastName, email };
    const url = "http://127.0.0.1:5000/create_contact";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    // DEFINING RESPONSE
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      // successful
      onSuccess();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* FIRST NAME */}
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/* LAST NAME */}
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* BUTTONS */}
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default ContactForm;

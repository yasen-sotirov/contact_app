import React from "react";

const ContactList = ({ contacts }) => {
  return (
    <div>
      <h2>Contacts</h2>

      <table>
        {/* заглавна лента */}
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* съдържание на таблицата */}
        <tbody>
          {contacts.map((contacts) => (
            <tr key={contacts.id}>
              <td>{contacts.firstName}</td>
              <td>{contacts.lastName}</td>
              <td>{contacts.email}</td>
              <td>
                <button>Update</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createContact,
  getAllContacts,
  deleteContact,
  updateContact,
} from "./contactSlice";

function Contact() {
  const dispatch = useDispatch();
  const contactData = useSelector(getAllContacts);
  const [formData, setFormData] = React.useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
  });
  const [isEditMode, setIsEditMode] = React.useState(false);
  React.useEffect(() => {
    let existingContact = contactData.find((ele) => {
      return ele.emailId === formData.emailId;
    });

    setIsEditMode(existingContact ? true : false);
  }, [formData, contactData]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      emailId: "",
      phoneNumber: "",
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createContact(formData));
    clearForm();
  };
  const handleDelete = (contact) => {
    dispatch(deleteContact(contact));
  };
  const handleEdit = (contact) => {
    setFormData(contact);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateContact(formData));
    clearForm();
  };

  console.log(formData);
  const listElement = contactData.map((row, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{row.fullName}</td>
      <td>{row.emailId}</td>
      <td>{row.phoneNumber}</td>
      <td>
        <button onClick={() => handleDelete(row)}>Delete</button>
        <button onClick={() => handleEdit(row)}>Edit</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <form>
        <fieldset>
          <legend>Contact Us</legend>
          <table border="1" className="table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </td>
                <td>
                  <label htmlFor="emailId">Email ID:</label>
                  <input
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    type="email"
                    required
                  />
                </td>
                <td>
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    type="tel"
                    maxLength="10"
                    required
                  />
                </td>
                <td>
                  <button onClick={isEditMode ? handleUpdate : handleSubmit}>
                    {isEditMode ? "Update" : "Submit"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
      <fieldset>
        <legend>Contact List</legend>
        <table className="table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{listElement}</tbody>
        </table>
      </fieldset>
    </div>
  );
}

export default Contact;

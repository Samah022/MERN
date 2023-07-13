import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Table,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

/**
 * Component to display user information
 */
export default function Info() {
  const api = "http://127.0.0.1:3001";

  const [users, setUsers] = useState([]); // State variable to store user data
  const [selectedType, setSelectedType] = useState("all"); // State variable to store the currently selected user type
  
  useEffect(() => {
    Axios.get(`${api}/users`).then((res) => { // Send GET request to /users endpoint to retrieve user data
      setUsers(res.data); // Update state variable with retrieved data
    });
  }, []);

  /**
   * Function to open image URL in a new window
   * @param imageUrl - URL of the image to open
   */
  const openImage = (image) => {
    window.open(image, "_blank"); // Open image URL in a new window when user clicks "View Image" button
  };

  /**
   * Function to handle user type selection from dropdown menu
   * @param type - Selected user type
   */
  const handleTypeSelect = (type) => {
    setSelectedType(type); // Update state variable with the selected user type
  };

  const filteredUsers =
    selectedType === "all"
      ? users
      : users.filter((user) => user.type === selectedType); // Filter user data based on selected user type

  return (
    <>
      <Container>
        {/* Dropdown menu to filter users by type */}
        <div className="my-3 d-flex justify-content-end">
          <DropdownButton
            id="dropdown-basic-button"
            title={`Filter by Type: ${selectedType}`}
          >
            <Dropdown.Item onClick={() => handleTypeSelect("all")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeSelect("Student")}>
              Student
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeSelect("Graduate")}>
              Graduate
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeSelect("Employed")}>
              Employed
            </Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Table to display user information */}
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(({ _id, name, phone, email, type, image }) => { // Map through filtered user data and render each user's information in a table row
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{type}</td>
                  <td>
                    {image && ( // If user has an image URL, render "View Image" button
                      <Button
                      variant="link"
                      onClick={(e) => {
                        e.preventDefault(); // prevent the default button behavior
                        openImage(image); // call the openImage function with the imageUrl argument
                      }}
                    >
                      View Image
                    </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
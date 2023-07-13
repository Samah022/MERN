import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Form,
  Button,
} from "react-bootstrap";

export default function App() {

  // URL of the API that this application will use
  const api = "http://127.0.0.1:3001";

  // Set up state variables to hold user data
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  // Use the useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    Axios.get(`${api}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  /*
  * Handle form submission and create a new user
  * @param e - Form submit event object
  */
  const createUser = (e) => {
    e.preventDefault();
    if (name && phone && email) {
      // Create a new FormData object to hold the form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("type", type);
      formData.append("image", image);
  
      // Use Axios to make a POST request to the API with the form data
      Axios.post(`${api}/createUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          // Update the users state variable with the new user data
          setUsers([...users, res.data]);
          // Reset the form inputs
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setType("");
          setImage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {/* Header section with navigation links */}
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Admin</a>
            </li>
            <li>
              <a href="/app">User</a>
            </li>
          </ul>
        </nav>
      </header>
      {/* Main content section with form to create new user */}
      <Container>
        <Form className="form" onSubmit={createUser}>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Group controlId="type">
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="Student">Student</option>
              <option value="Graduate">Graduate</option>
              <option value="Employed">Employed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Group>
          <Button variant="success" type="submit">
            Create User
          </Button>
        </Form>
      </Container>
    </>
  );
}
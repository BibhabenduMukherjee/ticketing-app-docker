import { useState } from "react";
import axios from "axios";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post("/api/users/signup", {
        email: email,
        password: password,
      });

      console.log(response.data);
    } catch (err) {
      //console.log(err.response.data);
      setError(err.response.data.errors);
    }
  };
  return (
    <div className="container">
      <form onSubmit={onsubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            vlaue={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary my-2">Sign up</button>
      </form>

      {error.length > 0 && (
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {error.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

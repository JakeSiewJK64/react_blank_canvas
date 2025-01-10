import { useState } from "react";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <div>
      <LoginForm
        onFormSubmit={(e) => {
          setUsername(e.username);
          setPassword(e.password);
        }}
      />
      <p>username: {username}</p>
      <p>password: {password}</p>
    </div>
  );
};

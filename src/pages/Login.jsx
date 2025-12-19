function Login() {
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@gmail.com",
        password: "123"
      })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.reload();
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

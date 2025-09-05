const LoginForm = ({ username,password,onUsernameChange,onPasswordChange,onSubmit }) => {
return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

const LoginForm = ({username,password,onUsernameChange,onPasswordChange,onSubmit}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>username <input type="text" value={username} onChange={onUsernameChange} /></div>
        <div>password <input type="password" value={password} onChange={onPasswordChange} /></div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

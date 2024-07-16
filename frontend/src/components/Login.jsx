import { useState } from 'react'

function Login({ handleLogin }) {
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(password)
    }

    return (
        <div>
            <h1>Express</h1>
            <p>Welcome</p>
            <p>Log in to see the messages</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login
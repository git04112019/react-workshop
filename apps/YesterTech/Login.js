import React, { useState } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import { login } from 'YesterTech/localStorage'
import useAuth from 'YesterTech/useAuth'
import api from 'YesterTech/api'

function Login({ history }) {
  const { dispatch } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then(user => {
        login(user)
        dispatch({ type: 'LOGIN', user })
        history.push('/')
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            aria-label="Username"
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default Login

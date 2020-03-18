const localStorageKey = 'userToken'

const storedUser = () => localStorage.getItem(localStorageKey) || null

const setUser = user => {
  localStorage.setItem(localStorageKey, user)
}

const removeUser = () => {
  localStorage.removeItem(localStorageKey)
}

async function fetchUser(email = '', password = '') {
  if (!process.env.REACT_APP_API_BASE) {
    console.error('Set REACT_APP_API_BASE in env')
    return
  }
  const response = await fetch(`${process.env.REACT_APP_API_BASE}/login`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
  const status = await response.status
  if (status === 200) {
    return {status: 'success', user: await response.text()}
  } else {
    return {status: 'error', message: await response.text()}
  }
}

export {storedUser, setUser, removeUser, fetchUser}

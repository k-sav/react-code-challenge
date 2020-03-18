import {Machine, assign} from 'xstate'

function fetchUser(email = '', password = '') {
  if (!process.env.REACT_APP_API_BASE) {
    console.error('Set REACT_APP_API_BASE in env')
    return
  }
  return new Promise((resolve, reject) => {
    let status
    fetch(`${process.env.REACT_APP_API_BASE}/login`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
      .then(response => {
        status = response.status
        return response.text()
      })
      .then(data => {
        if (status === 200) {
          return resolve(data)
        } else {
          return reject(data)
        }
      })
      .catch(err => {
        return reject('Network Error')
      })
  })
}

// visualisation
// https://xstate.js.org/viz/?gist=d14458ca74d0e760133fb98eba6b9d27
const authMachine = Machine(
  {
    id: 'authentication',
    initial: 'unauthorized',
    context: {
      errorMessage: null,
      user: null,
      email: '',
      password: '',
    },
    states: {
      unauthorized: {
        on: {
          LOGIN: 'loading',
          SET_EMAIL: {actions: ['changeEmail']},
          SET_PASSWORD: {actions: ['changePassword']},
        },
      },
      loading: {
        invoke: {
          id: 'getUser',
          src: (context, event) => fetchUser(context.email, context.password),
          onDone: {
            target: 'authorized',
            actions: assign({user: (context, event) => event.data}),
          },
          onError: {
            target: 'unauthorized',
            actions: assign({errorMessage: (context, event) => event.data}),
          },
        },
      },
      authorized: {
        on: {
          LOGOUT: 'unauthorized',
        },
      },
    },
  },
  {
    actions: {
      onSuccess: (context, event) => {
        context.user = event.user
        context.errorMessage = null
      },
      onError: (context, event) => {
        context.errorMessage = event.errorMessage
      },
      changeEmail: (context, event) => {
        context.email = event.value
      },
      changePassword: (context, event) => {
        context.password = event.value
      },
    },
  },
)

export default authMachine

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

function fetchDevices() {
  if (!process.env.REACT_APP_API_BASE) {
    console.error('Set REACT_APP_API_BASE in env')
    return
  }
  return new Promise((resolve, reject) => {
    let status
    fetch(`${process.env.REACT_APP_API_BASE}/devices`, {
      method: 'GET',
      cache: 'no-cache',
    })
      .then(response => {
        status = response.status
        return response.json()
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
            actions: assign({
              user: (context, event) => event.data,
              errorMessage: null,
            }),
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
        initial: 'devices_loading',
        context: {devices: [], interval: 5000},
        states: {
          devices_loading: {
            invoke: {
              id: 'getDevices',
              src: (context, event) => fetchDevices,
              onDone: {
                target: 'devices_waiting',
                actions: assign({
                  devices: (context, event) => event.data.devices,
                }),
              },
              onError: {
                target: 'devices_waiting',
              },
            },
          },
          devices_waiting: {
            after: {
              // TODO: Fix this
              // https://xstate.js.org/docs/guides/delays.html#delayed-transitions
              // after 5 seconds, transition to devices_loading
              5000: {target: 'devices_loading'},
            },
          },
        },
      },
    },
  },
  {
    actions: {
      // onSuccess: (context, event) => {
      //   context.user = event.user
      //   context.errorMessage = null
      // },
      onError: (context, event) => {
        context.errorMessage = event.errorMessage
      },
      changeEmail: (context, event) => {
        context.email = event.value
      },
      changePassword: (context, event) => {
        context.password = event.value
      },
      // onLogout: context => {
      //   context.password = null
      //   context.errorMessage = null
      // },
    },
  },
)

export default authMachine

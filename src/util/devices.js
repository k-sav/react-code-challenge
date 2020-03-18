const controller = new AbortController()

async function fetchDevices() {
  if (!process.env.REACT_APP_API_BASE) {
    console.error('Set REACT_APP_API_BASE in env')
    return
  }
  const response = await fetch(`${process.env.REACT_APP_API_BASE}/devices`, {
    method: 'GET',
    cache: 'no-cache',
    signal: controller.signal,
  })
  return await response.json()
}

export default fetchDevices
export {controller}
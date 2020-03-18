const notifyPostBody = {
  name: process.env.REACT_APP_NOTIFY_NAME || null,
  email: process.env.REACT_APP_NOTIFY_EMAIL || null,
  repoUrl: process.env.REACT_APP_NOTIFY_REPO_URL || null,
  message: process.env.REACT_APP_NOTIFY_MESSAGE || null,
}

async function notify(authToken) {
  if (!process.env.REACT_APP_API_BASE) {
    console.error('Set REACT_APP_API_BASE in env')
    return
  }
  const response = await fetch(`${process.env.REACT_APP_API_BASE}/notify`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notifyPostBody),
  })
  return await response.text()
}

export default notify

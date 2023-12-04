import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postUser } from '../api/userApi.tsx'

function Callback() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  async function addUser() {
    const token = await getAccessTokenSilently()
    await postUser(token)
    navigate('/')
  }

  useEffect(() => {
    addUser()
  }, [])

  return <></>
}

export default Callback

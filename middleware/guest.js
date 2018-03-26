import { Auth } from 'aws-amplify'
import { verifyTokens } from '../utils/tokens'

export default async function ({ redirect, req }) {
  let loggedin = false
  if (process.server) {
    loggedin = verifyTokens(req)
  } else {
    try {
      const user = await Auth.currentUserInfo()
      loggedin = Boolean(user)
    } catch (e) {
      console.log(e)
    }
  }
  if (loggedin) {
    return redirect('/')
  }
}

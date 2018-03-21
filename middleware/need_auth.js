import { Auth, Logger, JS } from 'aws-amplify'
import { verifyTokens } from '../utils/tokens'
import Cookie from 'js-cookie'

export default async function ({ redirect, req }) {
    let loggedin = false
    if (process.server) {
        loggedin = verifyTokens(req)
    } else {
        await Auth.currentUserInfo()
            .then(data => {
                loggedin = Boolean(data)
            })
            .catch(e => console.log(e))
    }
    if (!loggedin) {
        return redirect('/Auth/SignIn')
    }
}


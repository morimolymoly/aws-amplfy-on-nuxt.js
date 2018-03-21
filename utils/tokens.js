import { CognitoUserSession, CognitoIdToken, CognitoAccessToken, CognitoRefreshToken } from 'amazon-cognito-identity-js'

export function get_token_from_user(user) {
    let tokens = null
    if (user) {
        try {
            tokens = {
                IdToken: user.signInUserSession.idToken.jwtToken,
                RefreshToken: user.signInUserSession.refreshToken.token,
                AccessToken: user.signInUserSession.accessToken.jwtToken
            };
        } catch (error) {
            console.log(error)
        }
    }
    return tokens
}

export function makeToken(IdToken, AccessToken, RefreshToken) {
    const idToken = new CognitoIdToken({
        IdToken: IdToken,
    });
    const accessToken = new CognitoAccessToken({
        AccessToken: AccessToken,
    });
    const refreshToken = new CognitoRefreshToken({
        RefreshToken: RefreshToken,
    });
    const token = {
        IdToken: idToken,
        RefreshToken: refreshToken,
        AccessToken: accessToken
    }
    return token
}

export function verifyTokens(req) {
    if (!req.headers.cookie) return false

    const tokensCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokens='))
    if (!Boolean(tokensCookie)) return false

    const row_tokens = tokensCookie.split('=')[1]
    try {
        const token_obj = JSON.parse(unescape(row_tokens))
        if (!token_obj) return false
        const token = makeToken(
            token_obj.IdToken,
            token_obj.AccessToken,
            token_obj.RefreshToken
        )
        const session = new CognitoUserSession(token);
        return session.isValid()
    } catch (error) {
        console.log(error)
        return false
    }
}

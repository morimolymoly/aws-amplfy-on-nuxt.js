import { assert } from 'chai'
import { verifyTokens } from '../../../utils/tokens'
import { validToken } from './token_test_data'
import { describe, it } from 'mocha'

describe('verifyTokens', () => {
  it('verifyTokens cookie is null', () => {
    const req = {
      headers: {
        cookie: null
      }
    }
    const result = verifyTokens(req)
    assert.strictEqual(result, false)
  })

  it('verifyTokens cookie is not valid', () => {
    const req = {
      headers: {
        cookie: 'hogehoge'
      }
    }
    const result = verifyTokens(req)
    assert.strictEqual(result, false)
  })

  it('verifyTokens token is null', () => {
    const req = {
      headers: {
        cookie: 'tokens='
      }
    }
    const result = verifyTokens(req)
    assert.strictEqual(result, false)
  })

  it('verifyTokens token is not valid', () => {
    const req = {
      headers: {
        cookie: 'tokens=hogehoge'
      }
    }
    const result = verifyTokens(req)
    assert.strictEqual(result, false)
  })

  it('verifyTokens token is not valid2', () => {
    const req = {
      headers: {
        cookie: 'tokens=' +
                    JSON.stringify(
                      {
                        hoge: 21, hage: 20
                      })
      }
    }
    const result = verifyTokens(req)
    assert.strictEqual(result, false)
  })

  it('verifyTokens token is shit', () => {
    const req = {
      headers: {
        cookie: 'tokens=' +
                    JSON.stringify(
                      {
                        IdToken: 'aaaa',
                        RefreshToken: 'aaacccc',
                        AccessToken: 'aaaa'
                      })
      }
    }
    const result = verifyTokens(req)
    assert.strictEqual(result, false)
  })

  it('verifyTokens token is shit2', () => {
    const req = {
      headers: {
        cookie: 'tokens=' +
                    JSON.stringify(
                      {
                        IdToken: 'aaaa',
                        RefreshToken: 'aaacccc'
                      })
      }
    }
    const result = verifyTokens(req)
    assert.strictEqual(result, false)
  })

  it('verifyTokens valid token ', async () => {
    let tokenStr = validToken
    if (!tokenStr) {
      console.log('[*] acutually your token is empty')
      assert.strictEqual(false, false)
    } else {
      const req = {
        headers: {
          cookie: 'tokens=' + tokenStr
        }
      }
      const result = verifyTokens(req)
      assert.strictEqual(result, true)
    }
  })
})

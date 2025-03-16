import BaseRepository from './BaseRepository'

class AuthenticateRepository extends BaseRepository {
    url () {
        return '/oauth/shopify'
    }
}

export default AuthenticateRepository

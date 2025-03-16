import BaseRepository from './BaseRepository'

class ExampleRepository extends BaseRepository {
    url () {
        return '/examples'
    }
}

export default ExampleRepository

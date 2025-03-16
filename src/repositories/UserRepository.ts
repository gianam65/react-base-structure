import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository {
    url() {
        return '/users';
    }

    exteralUrl() {
        return '/public/users';
    }

    async checkEnabledThemeExtension(query = {}, headers = this.headers) {
        try {
            query = { ...query, ...this.query };
            const response = await this.httpClient.get(
                this.exteralUrl() + '/check-enabled-theme-extension',
                {
                    params: query,
                    headers: headers,
                },
            );
            return this.success(response.data);
        } catch (e) {
            return this.handlerHttpError(e);
        }
    }

    async activateThemeExtensionLink(query = {}, headers = this.headers) {
        try {
            query = { ...query, ...this.query };
            const response = await this.httpClient.get(
                this.exteralUrl() + '/activate-theme-extension-link',
                {
                    params: query,
                    headers: headers,
                },
            );
            return this.success(response.data);
        } catch (e) {
            return this.handlerHttpError(e);
        }
    }
}

export default UserRepository;

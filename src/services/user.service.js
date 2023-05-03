import createApiClient from './api.service';

class UserService {
    constructor(baseUrl = '/api/users'){
        this.api = createApiClient(baseUrl);
    }

    async login(data){
        return (await this.api.post('/login', data)).data;
    } 

    async create(data) {
        return (await this.api.post('/signup', data)).data;
    }

    async getAll() {
        return (await this.api.get('/')).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

}

export default new UserService();
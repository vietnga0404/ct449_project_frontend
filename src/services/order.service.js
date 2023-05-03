import createApiClient from './api.service';

class OrderService {
    constructor(baseUrl = '/api/orders'){
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get('/')).data;
    }

    async create(data) {
        return (await this.api.post(`/`, data)).data;
    }


    async get(phone) {
        return (await this.api.get(`/${phone}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

}

export default new OrderService();
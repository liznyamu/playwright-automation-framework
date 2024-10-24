import { faker } from "@faker-js/faker";
import { APIRequestContext, request } from "@playwright/test";

class APIController {
    private fakerApi: APIRequestContext;

    /**
     * Initialize the API context
     */
    async init() {
        this.fakerApi = await request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com/'
        });
    }

    async getUsers() {
        // API: GET /users 
        const response = await this.fakerApi.get('users');
        const responseBody = await response.json();
        return responseBody[Math.floor(Math.random() * responseBody.length)];; // First person - responseBody[0];
    }

    async createUserTodo(responseBody) {
        // POST /users/1/todos
        const response = await this.fakerApi.post('users/1/todos', {
            data: responseBody
        });
        return await response.json();
    }

}

export default new APIController();
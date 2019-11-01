export default class RecipeService {

    async getRecipes() {
        return fetch('http://localhost:8080/recipes').then(response => {
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }

            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    async getRecipe(id) {
        return fetch('http://localhost:8080/recipe/' + id).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }

            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    async createRecipe(data = {}) {
        const response = await fetch('http://localhost:8080/createRecipe/', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    async updateRecipe(data = {}) {
        const response = await fetch('http://localhost:8080/updateRecipe/', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    async deleteRecipe(id) {
        return fetch('http://localhost:8080/delete/' + id, {
            method: 'DELETE',
            cache: 'no-cache'
        }).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error, status: " + response.status);
            }
        })
    }
}
export default class HumanApi {
    constructor(humanUrl) {
        this.fetchUrl=process.env.REACT_APP_BACKEND_HOST_URL + humanUrl;
    }

    sendRequest(requestType, data, url="") {
        return fetch(this.fetchUrl + url,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: requestType,
            body: data?JSON.stringify(data):null
        })
    }

    async create(entity) {
        return await this.sendRequest("post", entity);
    }

    async getPage(pageNum, pageSize) {
        return await this.sendRequest("get", null, `/all?pageNumber=${pageNum}&pageSize=${pageSize}`);
    }

    async update(entity) {
        return await this.sendRequest("put", entity);
    }

    async deleteById(id) {
        return await this.sendRequest("delete", null, `?id=${id}`);
    }
}
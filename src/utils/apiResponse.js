class ApiResponse {
    constructor(statusCode, message = "success", data, error) {
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

export { ApiResponse };
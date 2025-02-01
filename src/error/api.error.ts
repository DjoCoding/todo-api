export interface ApiErrorData {
    message?: string;
    errors?: any[];
}

export default class ApiError extends Error {
    errors?: any[];
    code: number;

    constructor(code: number, data: ApiErrorData) {
        super(data.message);
        this.errors = data.errors;
        this.code = code;
    }
}
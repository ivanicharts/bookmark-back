import { InternalServerErrorException, HttpStatus } from "@nestjs/common";

class Response {
    constructor(status: boolean = true, statusCode: number = HttpStatus.OK) {
        Object.assign(this, {
            status,
            statusCode,
        });
    }
}

interface ISuccessResponseArgs {
    status?: boolean;
    statusCode?: number;
    data?: any;
}

export interface ISuccessResponse<T> {
    status: boolean;
    statusCode: number;
    result: T;
}

export class SuccessResponse extends Response implements ISuccessResponse<any> {
    constructor(params?: ISuccessResponseArgs) {
        if (params) {
            const { data, statusCode, status } = params;
            super(status, statusCode);
            if (data) {
                Object.assign(this, {
                    result: data,
                });
            }
        } else {
            super();
        }
    }

    status: boolean;
    statusCode: number;
    result: any;
}

export class FailResponse extends Response {
    constructor(error, message?) {
        if (!error) throw new InternalServerErrorException();
        super(false, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
        Object.assign(this, {
            message: error.message,
            error: error.error || error.name || 'Internal server error.',
        });
    }
}

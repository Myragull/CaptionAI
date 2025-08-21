class apiError extends Error {
    constructor(status ,message ,extraDetails){
        super(message);
        this.status = status || 500;
        this.extraDetails = extraDetails || null;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = apiError;
class ErrorDAC extends Error {
    name:string;
    message: string;

    constructor(name: string, message:string) {
        super();
        this.name = name;
        this.message= message;
    }
}

export class ErrorImportedFile extends ErrorDAC {
    constructor(path: string) {
        super("Imported file", `Error when we imported the file at ${path}`)
    }
}

export class ErrorSerializeddData extends ErrorDAC {
    constructor(data: any) {
        super("Serialized File", `Error when we serialized data ${JSON.stringify(data)}`);
    }
}

export class ErrorNoFunctionFound extends ErrorDAC {
    constructor(className: string) {
        super("No Function Found", `No function found for this class  ${className}`)
    }
}

export class ErrorNoParamsFound extends ErrorDAC {
    constructor(functionName: string) {
        super("No Parameters Found", `No Parameters found for this function  ${functionName}`)
    }
}

export class ErrorReader extends ErrorDAC {
    constructor(fpath: string) {
        super("Reader Error", `No File found or can't serialize data at this path: ${fpath}`)
    }
}
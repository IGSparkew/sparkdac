export interface IParams {
    name: string,
    type: string,
    value: any
}

export interface IConfigCode {
    name: string,
    params: IParams[]
}

export interface ICodeData {
    config: IConfigCode[]
}

export interface IFunctionData {
    func: Function,
    params: string[],
    clazz: string
}

export interface IFunctionOutput {
    name: string,
    data: any
}

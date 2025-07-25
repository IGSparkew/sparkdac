import type { IFunctionData } from "./models";

export class Registry {

    static methods: Map<string, IFunctionData> = new Map<string, IFunctionData>();

    static add(name: string, func: Function, params: string[], clazz: string) {

        if (this.methods.size > 0) {
            if (this.methods.get(name) != undefined && this.methods.get(name)?.clazz == clazz) {
                throw new Error("Function Already Exist !");
            }
        }

        const fcData : IFunctionData = {
            func,
            params,
            clazz
        }

       

        this.methods.set(this.getField(name, clazz), fcData);
    }

    static get(name: string, clazz: string) : IFunctionData | undefined {       
        return this.methods.get(this.getField(name, clazz));
    }

    static getFunctionsByClassName(className: string) {
        const functions = new Map<string, IFunctionData>();

        this.methods.forEach((value, key)  => {
            if (value.clazz == className) {
                functions.set(key, value);
            }
        })

        return functions;
    }

    private static getField(name: string, clazz: string) : string {
        return clazz + "_" + name;
    }
}
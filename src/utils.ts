import { ErrorNoFunctionFound, ErrorReader } from './error';
import type { ICodeData, IFunctionOutput, IConfigCode, IFunctionData } from './models';
import { Registry } from './registry';
import fs from 'fs';

export class Utils {
    
    static treatment(functions: Map<string, IFunctionData>, values: Map<string, IFunctionOutput[]>) {
        let codeData: ICodeData = {
            config: []
        };

        values.forEach((value, key) => {
            const func = functions.get(key);

            if (func == undefined) {
                throw new Error();
            }

            const configCode: IConfigCode = {
                name: func.func.name,
                params: []
            }

            for (const paramFunc of func.params) {
                const fc = value.find(f => f.name == paramFunc);
                if (fc == undefined) {
                    throw new Error();
                }

                configCode.params.push({
                    name: paramFunc,
                    type: typeof fc.data as string,
                    value: fc.data
                });
            }

            codeData.config.push(configCode);
        });

        return codeData;
    }

    static reader(path: string): ICodeData | undefined {
        try {
            const data: ICodeData = JSON.parse(fs.readFileSync(path, 'utf-8'));

            if (data == null) {
                throw new ErrorReader(path);
            }

            return data;
        } catch (e) {
            console.error(e);
        }
    }

    static execute(code: ICodeData, clazzName: string) {
        const configs = code.config;
        for (const conf of configs) {

            const fnc = Registry.get(conf.name, clazzName);

            if (fnc == undefined) {
                throw new ErrorNoFunctionFound(clazzName);
            }

            const values: any[] = [];

            if (fnc.params.length > 0) {

                if (fnc.params.length != conf.params.length) {
                    throw new Error("The function as data not setup correctly");
                }

                for (const pFnc of fnc.params) {
                    const p = conf.params.find(p => p.name == pFnc);
                    if (p == undefined) {
                        throw new ErrorNoFunctionFound(clazzName);
                    }

                    values.push(p.value);
                }
            }


            fnc.func([...values]);
        }
    }
}
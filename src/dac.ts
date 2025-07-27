import { Registry } from './registry';
import type { ICodeData, IFunctionOutput, IConfigCode, IFunctionData } from './models';
import fs from 'fs';
import { Utils } from './utils';
import { ErrorImportedFile, ErrorNoFunctionFound, ErrorSerializeddData } from './error';

/**
 * You can import config as string from Json object with the ICodeData structure
 * and the function who interprete them and execute with the class
 * the functions from clazz must have declare decorator to used them
 * 
 * @param data string json of structure and value  
 * @param clazz Class who be applied config and value
 */
export function importedDataAsCode<T>(data: string, clazz: { new (...args: any[]): T }) {
    const confData: ICodeData = JSON.parse(data);

    if (confData == null) {
        throw new ErrorSerializeddData(data)
    }

    Utils.execute(confData, clazz.name);
}

/**
 * You can import config as file from Json object with the ICodeData structure
 * and the function who interprete them and execute with the class
 * the functions from clazz must have declare decorator to used them
 *
 * @param path the path of json folder with config and value
 * @param clazz Class who be applied config and value
 */
export function importedDataFileAsCode<T>(path: string, clazz: { new (...args: any[]): T }) {
    const value = Utils.reader(path);

    if (value == undefined) {
        throw new ErrorImportedFile(path);
    }

    Utils.execute(value, clazz.name);
}

/**
 * This function is used to export config as data object whit values and function of class params
 * the functions exported must have declare decorator 
 * 
 * @param clazz Class you want to export 
 * @param values the values and the function key name of the export  
 * @returns ICodeData
 */
export function exportCodeAsData<T>(clazz: { new (...args: any[]): T }, values: Map<string, IFunctionOutput[]>) : ICodeData | undefined {
   const functions = Registry.getFunctionsByClassName(clazz.name);

   if (functions.size == 0) {
    throw new ErrorNoFunctionFound(clazz.name);
   }

  return Utils.treatment(functions, values);
}

/**
 * This function is used to export config as json file whit values and function of class params
 * the functions exported must have declare decorator 
 * 
 * @param path the path where tou want to export
 * @param clazz Class you want to export 
 * @param values the values and the function key name of the export
 * @param callBack the callback function you want to call after write the file
 */
export function exportCodeAsFile<T>(path: string, clazz: { new (...args: any[]): T }, values: Map<string, IFunctionOutput[]>, callBack: fs.NoParamCallback = ()=>{}) {
    const data = exportCodeAsData(clazz, values);

    if (data == undefined) {
        throw new ErrorSerializeddData("No data to export");
    }

    fs.writeFile(path, JSON.stringify(data, null, 4), callBack);
}
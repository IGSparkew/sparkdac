/**
 * Export models
 */
export {ICodeData, IParams, IConfigCode, IFunctionData, IFunctionOutput} from "./models";

/**
 * Export Decorator
 */
export { declare } from "./decorator";

/**
 * Export main functions to use code as data and data as code 
 */
export {importedDataAsCode} from "./dac";
export {importedDataFileAsCode} from "./dac";
export {exportCodeAsData} from "./dac";
export {exportCodeAsFile} from "./dac";

import { expect, spyOn, test } from 'bun:test';
import { exportCodeAsData, importedDataAsCode, importedDataFileAsCode } from '../src/dac';
import { Test } from './classTest';
import { ErrorImportedFile, ErrorNoFunctionFound, ErrorSerializeddData } from '../src/error';
import { Utils } from '../src/utils';
import { Registry } from '../src/registry';

test("DAC importedDataAsCode error serialized data", () => {
    spyOn(JSON, "parse").mockReturnValueOnce(undefined);
    expect(() => {
        importedDataAsCode<Test>("invalid json", Test);
    }).toThrowError(new  ErrorSerializeddData("invalid json"));
});

test("DAC importedDataFileAsCode error imported file", () => {
    spyOn(Utils, "reader").mockReturnValueOnce(undefined);
    expect(() => {
        importedDataFileAsCode<Test>("/test/mmm.ts", Test);
    }).toThrowError(new  ErrorImportedFile("/test/mmm.ts"));
});

test("DAC exportCodeAsData error no funbction found", () => {
    spyOn(Registry, "getFunctionsByClassName").mockReturnValueOnce(new Map());
    expect(() => {
        exportCodeAsData<Test>(Test, new Map());
    }).toThrowError(new  ErrorNoFunctionFound(Test.name));
});
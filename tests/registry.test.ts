import { describe, expect, test } from "bun:test";
import { Registry } from "../src/registry";

function testFunction(param1: string): string {
    return `Hello ${param1}`;
}

describe("Registry add function", () => {
    test('should add a function to the registry', () => {
        Registry.add("Test", testFunction, ["param1"], "testUnit");
        expect(Registry.get("Test", "testUnit")).toEqual({
            func: testFunction,
            params: ["param1"],
            clazz: "testUnit"
        });
    });

    test('should throw an error when adding a function with the same name and class', () => {
        expect(() => {
            Registry.add("Test", testFunction, ["param1"], "testUnit");
        }).toThrow("Function Already Exist !");
    });
})
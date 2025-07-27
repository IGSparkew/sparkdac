import { describe, expect, jest, mock, spyOn, test } from "bun:test";
import fs from "fs";
import { ICodeData, IFunctionData } from "../src/models";
import { Utils } from "../src/utils";
import { ErrorNoFunctionFound, ErrorReader } from "../src/error";
import { Test } from "./classTest";

const functions = new Map<string, IFunctionData>();
const values = new Map<string, any[]>();

const data: ICodeData = {
  config: [
    {
      name: "hello",
      params: [
        {
          name: "name",
          type: "string",
          value: "jhon",
        },
      ],
    },
  ],
};

const data2: ICodeData = {
  config: [
    {
      name: "wello",
      params: [
        {
          name: "name",
          type: "string",
          value: "jhon",
        },
      ],
    },
  ],
};

const data3: ICodeData = {
  config: [
    {
      name: "wello",
      params: [
        {
          name: "name",
          type: "string",
          value: "jhon",
        },
        {
          name: "firstname",
          type: "string",
          value: "Silver",
        },
      ],
    },
  ],
};

const data4: ICodeData = {
  config: [
    {
      name: "hello",
      params: [
        {
          name: "name",
          type: "string",
          value: "jhon",
        },
      ],
    },
    {
      name: "add",
      params: [
        {
          name: "a",
          type: "number",
          value: 1,
        },
        {
          name: "b",
          type: "number",
          value: 2,
        },
      ],
    },
  ],
};

functions.set("hello", {
  func: Test.prototype.hello,
  params: ["name"],
  clazz: Test.name,
});

functions.set("add", {
  func: Test.prototype.add,
  params: ["a", "b"],
  clazz: Test.name,
});


describe("test reader function", () => {
  test("test ok", () => {
    spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(data));
    expect(Utils.reader("")).toEqual(data);
    spyOn(fs, "readFileSync").mockReset();
  });

  test("test file not found", () => {
    expect(() => Utils.reader("/data/mrnc/t.json")).toThrow(
      new ErrorReader("/data/mrnc/t.json").message
    );
  });
});



describe("test execute function", () => {
  test("test execute data", () => {
    expect(Utils.execute(data, Test.name)).toEqual("Hello jhon");
  });

  test("test execute wrong config function name", () => {
    expect(() => Utils.execute(data2, Test.name)).toThrow(
      new ErrorNoFunctionFound(Test.name)
    );
  });

  test("test execute wrong config more parameter", () => {
    expect(() => Utils.execute(data3, Test.name)).toThrow(
      new ErrorNoFunctionFound(Test.name)
    );
  });
});

describe("test treatment function", () => {
  test("test treatment with no all function", () => {
    values.set("hello", [
      {
        name: "name",
        data: "jhon",
      },
    ]);

    expect(Utils.treatment(functions, values)).toEqual(data);
  });

  test("test treatment with all function", () => {
    values.clear();
    values.set("hello", [
      {
        name: "name",
        data: "jhon",
      },
    ]);
    values.set("add", [
      {
        name: "a",
        data: 1,
      },
      {
        name: "b",
        data: 2,
      },
    ]);

    expect(Utils.treatment(functions, values)).toEqual(data4);
  });

  test("test treatment no function config", () => {
    values.clear();
    expect(Utils.treatment(functions, values)).toEqual({ config: [] });
  });

  test("test treatment config with no function existing", () => {
    values.clear();
    values.set("whello", [
      {
        name: "name",
        data: "jhon",
      },
    ]);

    expect(() => Utils.treatment(functions, values)).toThrow(new Error());
  });
});

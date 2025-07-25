# SparkDAC

A TypeScript library that enables **Data as Code** functionality - allowing you to interpret data with code functions or export code as data with values.

## Description

SparkDAC (Data as Code) provides a powerful way to bridge the gap between configuration data and executable code. You can:

- Import JSON configuration data and execute it as code functions
- Export class methods as structured data configurations
- Use decorators to mark functions for data serialization
- Maintain type safety throughout the process

## Installation

```bash
npm install spark-dac
```

Or with Bun:

```bash
bun add spark-dac
```

## Quick Start

### 1. Define a Class with Decorated Methods

```typescript
import { declare } from 'spark-dac';

class MyService {
    @declare("greeting", ["message", "name"])
    greet(message: string, name: string): string {
        return `${message}, ${name}!`;
    }

    @declare("calculation", ["a", "b"])
    add(a: number, b: number): number {
        return a + b;
    }
}
```

### 2. Export Code as Data

```typescript
import { exportCodeAsData, exportCodeAsFile } from 'spark-dac';

const values = new Map([
    ["greeting", [
        { name: "message", data: "Hello" },
        { name: "name", data: "World" }
    ]],
    ["calculation", [
        { name: "a", data: 5 },
        { name: "b", data: 3 }
    ]]
]);

// Export as data object
const data = exportCodeAsData(MyService, values);

// Or export directly to JSON file
exportCodeAsFile("./config.json", MyService, values);
```

### 3. Import and Execute Data as Code

```typescript
import { importedDataAsCode, importedDataFileAsCode } from 'spark-dac';

// From JSON string
const jsonData = JSON.stringify(data);
importedDataAsCode(jsonData, MyService);

// From JSON file
importedDataFileAsCode("./config.json", MyService);
```

## API Reference

### Functions

#### `exportCodeAsData<T>(clazz, values): ICodeData | undefined`
Exports class methods as a structured data object.

- **clazz**: Class constructor with decorated methods
- **values**: Map of function names to their parameter values
- **Returns**: Structured data object or undefined

#### `exportCodeAsFile<T>(path, clazz, values, callback?): void`
Exports class methods directly to a JSON file.

- **path**: File path for the output JSON
- **clazz**: Class constructor with decorated methods  
- **values**: Map of function names to their parameter values
- **callback**: Optional callback function after file write

#### `importedDataAsCode<T>(data, clazz): void`
Imports and executes configuration from a JSON string.

- **data**: JSON string with configuration data
- **clazz**: Class constructor to apply the configuration to

#### `importedDataFileAsCode<T>(path, clazz): void`
Imports and executes configuration from a JSON file.

- **path**: Path to the JSON configuration file
- **clazz**: Class constructor to apply the configuration to

### Decorator

#### `@declare(name: string, params: string[])`
Marks a method for data serialization and execution.

- **name**: Unique identifier for the function
- **params**: Array of parameter names the function expects

### Interfaces

#### `ICodeData`
```typescript
interface ICodeData {
    config: IConfigCode[]
}
```

#### `IConfigCode`
```typescript
interface IConfigCode {
    name: string,
    params: IParams[]
}
```

#### `IParams`
```typescript
interface IParams {
    name: string,
    type: string,
    value: any
}
```

#### `IFunctionOutput`
```typescript
interface IFunctionOutput {
    name: string,
    data: any
}
```

## Example JSON Structure

The exported data follows this structure:

```json
{
    "config": [
        {
            "name": "greeting",
            "params": [
                {
                    "name": "message",
                    "type": "string",
                    "value": "Hello"
                },
                {
                    "name": "name", 
                    "type": "string",
                    "value": "World"
                }
            ]
        },
        {
            "name": "calculation",
            "params": [
                {
                    "name": "a",
                    "type": "number",
                    "value": 5
                },
                {
                    "name": "b",
                    "type": "number", 
                    "value": 3
                }
            ]
        }
    ]
}
```

## Use Cases

- **Configuration Management**: Store complex application configurations as executable code
- **Dynamic Function Execution**: Execute functions based on external data sources
- **Serializable Workflows**: Convert business logic into portable data formats
- **Testing**: Generate test scenarios from data configurations

## Requirements

- TypeScript ^5.8.3
- Node.js or Bun runtime

## License

MIT

## Author

IGSparkew
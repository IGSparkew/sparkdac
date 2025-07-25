import { Registry } from "./registry";

export function declare(name: string, params: string[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Registry.add(name, descriptor.value, params, target.constructor.name);
    };
}
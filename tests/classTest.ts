
import {declare} from "../src/decorator";

export class Test {
    // @ts-expect-error
    @declare("hello", ["name"])
    hello(name: string) {
        return "Hello " + name;
    }

    // @ts-expect-error
    @declare("add", ["a", "b"])
    add(a: number, b: number) {
        return a + b;
    }
}
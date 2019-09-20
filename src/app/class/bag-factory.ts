// export class BagFactory {
//     create(type: any, ...args: any) {
//         return new type(args);
//     }
// }

export const BagFactory = <T extends { new (...args: any[]): any }>(
    classToCreate: T,
    ...args: ConstructorParameters<T>
): T[] =>  new classToCreate(...args);

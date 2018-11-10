export declare function compose<T1, T2 = T1, T3 = T2, T4 = T3>(f1?: (_: T1) => T2, f2?: (_: T2) => T3, f3?: (_: T3) => T4): (data: T1) => T4;
export declare class Transformer<T> {
    $: T;
    constructor(value: T);
    with<Tout>(transform: (x: T) => Tout): Transformer<Tout>;
    _<Tout>(transform: (x: T) => Tout): Transformer<Tout>;
    value(): T;
}
export declare function transform<T>(value: T): Transformer<T>;
export interface Comp<T1, T2> {
    (x: T1): T2;
    _<T3>(f: (x: T2) => T3): Comp<T1, T3>;
    with<T3>(f: (x: T2) => T3): Comp<T1, T3>;
}
//# sourceMappingURL=index.d.ts.map
function compose2<T1, T2, T3> (f1: (x: T1) => T2, f2: (x: T2) => T3) {
    return (x: T1) => f2(f1(x));
}

export function compose<T1, T2=T1, T3=T2, T4=T3>(f1?: (_:T1)=>T2, f2?:(_:T2)=>T3, f3?:(_:T3)=>T4) {
    let args = [f1, f2, f3].filter(_=>_);
    let f = args.reduce((result, item) => result ? compose2(result, item as any) : item, null as any);
    return _(f || (x => x)) as (data: T1) => T4;
}


export class Transformer<T> {
    public $: T;
    constructor(value: T) {
        this.$ = value;
    }
    // noinspection TsLint
    with<Tout>(transform: (x:T)=>Tout): Transformer<Tout> {
        return new Transformer(transform(this.$));
    }
    // noinspection TsLint
    _<Tout>(transform: (x:T)=>Tout): Transformer<Tout> {
        return new Transformer(transform(this.$));
    }
    value() {
        return this.$;
    }
}

export function transform<T>(value: T):Transformer<T> {
    return new Transformer(value);
}


export interface Comp<T1 ,T2> {
    (x: T1): T2;
    _<T3>(f: (x: T2) => T3): Comp<T1, T3>;
    with<T3>(f: (x: T2) => T3): Comp<T1, T3>;
}

function _<T1, T2>(f1: (x: T1) => T2) { //, f2?: (x: T2) => T3 //, T3=T2
    return Object.assign((x1: T1)=> f1(x1), {
        _<T3>(f2: (x: T2) => T3) {
            return _<T1, T3>(compose2(f1, f2)) as Comp<T1, T3>;
        },
        with<T3>(f2: (x: T2) => T3) {
            return _<T1, T3>(compose2(f1, f2)) as Comp<T1, T3>;
        }
    }) as Comp<T1, T2>;
}



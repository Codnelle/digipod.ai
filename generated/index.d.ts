
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model PhaseHistory
 * 
 */
export type PhaseHistory = $Result.DefaultSelection<Prisma.$PhaseHistoryPayload>
/**
 * Model ClientMessage
 * 
 */
export type ClientMessage = $Result.DefaultSelection<Prisma.$ClientMessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Phase: {
  DISCOVERY: 'DISCOVERY',
  DESIGN: 'DESIGN',
  REVISIONS: 'REVISIONS',
  DELIVERY: 'DELIVERY'
};

export type Phase = (typeof Phase)[keyof typeof Phase]


export const MessageFrom: {
  CLIENT: 'CLIENT',
  AI: 'AI'
};

export type MessageFrom = (typeof MessageFrom)[keyof typeof MessageFrom]

}

export type Phase = $Enums.Phase

export const Phase: typeof $Enums.Phase

export type MessageFrom = $Enums.MessageFrom

export const MessageFrom: typeof $Enums.MessageFrom

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.phaseHistory`: Exposes CRUD operations for the **PhaseHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PhaseHistories
    * const phaseHistories = await prisma.phaseHistory.findMany()
    * ```
    */
  get phaseHistory(): Prisma.PhaseHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clientMessage`: Exposes CRUD operations for the **ClientMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClientMessages
    * const clientMessages = await prisma.clientMessage.findMany()
    * ```
    */
  get clientMessage(): Prisma.ClientMessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    PhaseHistory: 'PhaseHistory',
    ClientMessage: 'ClientMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "phaseHistory" | "clientMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      PhaseHistory: {
        payload: Prisma.$PhaseHistoryPayload<ExtArgs>
        fields: Prisma.PhaseHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhaseHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhaseHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>
          }
          findFirst: {
            args: Prisma.PhaseHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhaseHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>
          }
          findMany: {
            args: Prisma.PhaseHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>[]
          }
          create: {
            args: Prisma.PhaseHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>
          }
          createMany: {
            args: Prisma.PhaseHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhaseHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>[]
          }
          delete: {
            args: Prisma.PhaseHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>
          }
          update: {
            args: Prisma.PhaseHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PhaseHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhaseHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhaseHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>[]
          }
          upsert: {
            args: Prisma.PhaseHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhaseHistoryPayload>
          }
          aggregate: {
            args: Prisma.PhaseHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhaseHistory>
          }
          groupBy: {
            args: Prisma.PhaseHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhaseHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhaseHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PhaseHistoryCountAggregateOutputType> | number
          }
        }
      }
      ClientMessage: {
        payload: Prisma.$ClientMessagePayload<ExtArgs>
        fields: Prisma.ClientMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>
          }
          findFirst: {
            args: Prisma.ClientMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>
          }
          findMany: {
            args: Prisma.ClientMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>[]
          }
          create: {
            args: Prisma.ClientMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>
          }
          createMany: {
            args: Prisma.ClientMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>[]
          }
          delete: {
            args: Prisma.ClientMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>
          }
          update: {
            args: Prisma.ClientMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>
          }
          deleteMany: {
            args: Prisma.ClientMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>[]
          }
          upsert: {
            args: Prisma.ClientMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientMessagePayload>
          }
          aggregate: {
            args: Prisma.ClientMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientMessage>
          }
          groupBy: {
            args: Prisma.ClientMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ClientMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    phaseHistory?: PhaseHistoryOmit
    clientMessage?: ClientMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    phaseHistory: number
    clientMessages: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    phaseHistory?: boolean | ProjectCountOutputTypeCountPhaseHistoryArgs
    clientMessages?: boolean | ProjectCountOutputTypeCountClientMessagesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountPhaseHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhaseHistoryWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountClientMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    currentPhase: $Enums.Phase | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    currentPhase: $Enums.Phase | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    currentPhase: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    currentPhase?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    currentPhase?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    currentPhase?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    currentPhase: $Enums.Phase
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    currentPhase?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    phaseHistory?: boolean | Project$phaseHistoryArgs<ExtArgs>
    clientMessages?: boolean | Project$clientMessagesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    currentPhase?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    currentPhase?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    currentPhase?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "currentPhase" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    phaseHistory?: boolean | Project$phaseHistoryArgs<ExtArgs>
    clientMessages?: boolean | Project$clientMessagesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      phaseHistory: Prisma.$PhaseHistoryPayload<ExtArgs>[]
      clientMessages: Prisma.$ClientMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      currentPhase: $Enums.Phase
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    phaseHistory<T extends Project$phaseHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Project$phaseHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clientMessages<T extends Project$clientMessagesArgs<ExtArgs> = {}>(args?: Subset<T, Project$clientMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly currentPhase: FieldRef<"Project", 'Phase'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.phaseHistory
   */
  export type Project$phaseHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    where?: PhaseHistoryWhereInput
    orderBy?: PhaseHistoryOrderByWithRelationInput | PhaseHistoryOrderByWithRelationInput[]
    cursor?: PhaseHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhaseHistoryScalarFieldEnum | PhaseHistoryScalarFieldEnum[]
  }

  /**
   * Project.clientMessages
   */
  export type Project$clientMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    where?: ClientMessageWhereInput
    orderBy?: ClientMessageOrderByWithRelationInput | ClientMessageOrderByWithRelationInput[]
    cursor?: ClientMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientMessageScalarFieldEnum | ClientMessageScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model PhaseHistory
   */

  export type AggregatePhaseHistory = {
    _count: PhaseHistoryCountAggregateOutputType | null
    _min: PhaseHistoryMinAggregateOutputType | null
    _max: PhaseHistoryMaxAggregateOutputType | null
  }

  export type PhaseHistoryMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    phase: $Enums.Phase | null
    timestamp: Date | null
  }

  export type PhaseHistoryMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    phase: $Enums.Phase | null
    timestamp: Date | null
  }

  export type PhaseHistoryCountAggregateOutputType = {
    id: number
    projectId: number
    phase: number
    timestamp: number
    _all: number
  }


  export type PhaseHistoryMinAggregateInputType = {
    id?: true
    projectId?: true
    phase?: true
    timestamp?: true
  }

  export type PhaseHistoryMaxAggregateInputType = {
    id?: true
    projectId?: true
    phase?: true
    timestamp?: true
  }

  export type PhaseHistoryCountAggregateInputType = {
    id?: true
    projectId?: true
    phase?: true
    timestamp?: true
    _all?: true
  }

  export type PhaseHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhaseHistory to aggregate.
     */
    where?: PhaseHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhaseHistories to fetch.
     */
    orderBy?: PhaseHistoryOrderByWithRelationInput | PhaseHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhaseHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhaseHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhaseHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PhaseHistories
    **/
    _count?: true | PhaseHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhaseHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhaseHistoryMaxAggregateInputType
  }

  export type GetPhaseHistoryAggregateType<T extends PhaseHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePhaseHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhaseHistory[P]>
      : GetScalarType<T[P], AggregatePhaseHistory[P]>
  }




  export type PhaseHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhaseHistoryWhereInput
    orderBy?: PhaseHistoryOrderByWithAggregationInput | PhaseHistoryOrderByWithAggregationInput[]
    by: PhaseHistoryScalarFieldEnum[] | PhaseHistoryScalarFieldEnum
    having?: PhaseHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhaseHistoryCountAggregateInputType | true
    _min?: PhaseHistoryMinAggregateInputType
    _max?: PhaseHistoryMaxAggregateInputType
  }

  export type PhaseHistoryGroupByOutputType = {
    id: string
    projectId: string
    phase: $Enums.Phase
    timestamp: Date
    _count: PhaseHistoryCountAggregateOutputType | null
    _min: PhaseHistoryMinAggregateOutputType | null
    _max: PhaseHistoryMaxAggregateOutputType | null
  }

  type GetPhaseHistoryGroupByPayload<T extends PhaseHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhaseHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhaseHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhaseHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PhaseHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PhaseHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    phase?: boolean
    timestamp?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phaseHistory"]>

  export type PhaseHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    phase?: boolean
    timestamp?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phaseHistory"]>

  export type PhaseHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    phase?: boolean
    timestamp?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phaseHistory"]>

  export type PhaseHistorySelectScalar = {
    id?: boolean
    projectId?: boolean
    phase?: boolean
    timestamp?: boolean
  }

  export type PhaseHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "phase" | "timestamp", ExtArgs["result"]["phaseHistory"]>
  export type PhaseHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type PhaseHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type PhaseHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $PhaseHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PhaseHistory"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      phase: $Enums.Phase
      timestamp: Date
    }, ExtArgs["result"]["phaseHistory"]>
    composites: {}
  }

  type PhaseHistoryGetPayload<S extends boolean | null | undefined | PhaseHistoryDefaultArgs> = $Result.GetResult<Prisma.$PhaseHistoryPayload, S>

  type PhaseHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhaseHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhaseHistoryCountAggregateInputType | true
    }

  export interface PhaseHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PhaseHistory'], meta: { name: 'PhaseHistory' } }
    /**
     * Find zero or one PhaseHistory that matches the filter.
     * @param {PhaseHistoryFindUniqueArgs} args - Arguments to find a PhaseHistory
     * @example
     * // Get one PhaseHistory
     * const phaseHistory = await prisma.phaseHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhaseHistoryFindUniqueArgs>(args: SelectSubset<T, PhaseHistoryFindUniqueArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PhaseHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhaseHistoryFindUniqueOrThrowArgs} args - Arguments to find a PhaseHistory
     * @example
     * // Get one PhaseHistory
     * const phaseHistory = await prisma.phaseHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhaseHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PhaseHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhaseHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseHistoryFindFirstArgs} args - Arguments to find a PhaseHistory
     * @example
     * // Get one PhaseHistory
     * const phaseHistory = await prisma.phaseHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhaseHistoryFindFirstArgs>(args?: SelectSubset<T, PhaseHistoryFindFirstArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhaseHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseHistoryFindFirstOrThrowArgs} args - Arguments to find a PhaseHistory
     * @example
     * // Get one PhaseHistory
     * const phaseHistory = await prisma.phaseHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhaseHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PhaseHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PhaseHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PhaseHistories
     * const phaseHistories = await prisma.phaseHistory.findMany()
     * 
     * // Get first 10 PhaseHistories
     * const phaseHistories = await prisma.phaseHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phaseHistoryWithIdOnly = await prisma.phaseHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhaseHistoryFindManyArgs>(args?: SelectSubset<T, PhaseHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PhaseHistory.
     * @param {PhaseHistoryCreateArgs} args - Arguments to create a PhaseHistory.
     * @example
     * // Create one PhaseHistory
     * const PhaseHistory = await prisma.phaseHistory.create({
     *   data: {
     *     // ... data to create a PhaseHistory
     *   }
     * })
     * 
     */
    create<T extends PhaseHistoryCreateArgs>(args: SelectSubset<T, PhaseHistoryCreateArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PhaseHistories.
     * @param {PhaseHistoryCreateManyArgs} args - Arguments to create many PhaseHistories.
     * @example
     * // Create many PhaseHistories
     * const phaseHistory = await prisma.phaseHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhaseHistoryCreateManyArgs>(args?: SelectSubset<T, PhaseHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PhaseHistories and returns the data saved in the database.
     * @param {PhaseHistoryCreateManyAndReturnArgs} args - Arguments to create many PhaseHistories.
     * @example
     * // Create many PhaseHistories
     * const phaseHistory = await prisma.phaseHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PhaseHistories and only return the `id`
     * const phaseHistoryWithIdOnly = await prisma.phaseHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhaseHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PhaseHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PhaseHistory.
     * @param {PhaseHistoryDeleteArgs} args - Arguments to delete one PhaseHistory.
     * @example
     * // Delete one PhaseHistory
     * const PhaseHistory = await prisma.phaseHistory.delete({
     *   where: {
     *     // ... filter to delete one PhaseHistory
     *   }
     * })
     * 
     */
    delete<T extends PhaseHistoryDeleteArgs>(args: SelectSubset<T, PhaseHistoryDeleteArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PhaseHistory.
     * @param {PhaseHistoryUpdateArgs} args - Arguments to update one PhaseHistory.
     * @example
     * // Update one PhaseHistory
     * const phaseHistory = await prisma.phaseHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhaseHistoryUpdateArgs>(args: SelectSubset<T, PhaseHistoryUpdateArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PhaseHistories.
     * @param {PhaseHistoryDeleteManyArgs} args - Arguments to filter PhaseHistories to delete.
     * @example
     * // Delete a few PhaseHistories
     * const { count } = await prisma.phaseHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhaseHistoryDeleteManyArgs>(args?: SelectSubset<T, PhaseHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhaseHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PhaseHistories
     * const phaseHistory = await prisma.phaseHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhaseHistoryUpdateManyArgs>(args: SelectSubset<T, PhaseHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhaseHistories and returns the data updated in the database.
     * @param {PhaseHistoryUpdateManyAndReturnArgs} args - Arguments to update many PhaseHistories.
     * @example
     * // Update many PhaseHistories
     * const phaseHistory = await prisma.phaseHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PhaseHistories and only return the `id`
     * const phaseHistoryWithIdOnly = await prisma.phaseHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PhaseHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PhaseHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PhaseHistory.
     * @param {PhaseHistoryUpsertArgs} args - Arguments to update or create a PhaseHistory.
     * @example
     * // Update or create a PhaseHistory
     * const phaseHistory = await prisma.phaseHistory.upsert({
     *   create: {
     *     // ... data to create a PhaseHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PhaseHistory we want to update
     *   }
     * })
     */
    upsert<T extends PhaseHistoryUpsertArgs>(args: SelectSubset<T, PhaseHistoryUpsertArgs<ExtArgs>>): Prisma__PhaseHistoryClient<$Result.GetResult<Prisma.$PhaseHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PhaseHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseHistoryCountArgs} args - Arguments to filter PhaseHistories to count.
     * @example
     * // Count the number of PhaseHistories
     * const count = await prisma.phaseHistory.count({
     *   where: {
     *     // ... the filter for the PhaseHistories we want to count
     *   }
     * })
    **/
    count<T extends PhaseHistoryCountArgs>(
      args?: Subset<T, PhaseHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhaseHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PhaseHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhaseHistoryAggregateArgs>(args: Subset<T, PhaseHistoryAggregateArgs>): Prisma.PrismaPromise<GetPhaseHistoryAggregateType<T>>

    /**
     * Group by PhaseHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhaseHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhaseHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PhaseHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhaseHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhaseHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PhaseHistory model
   */
  readonly fields: PhaseHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PhaseHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhaseHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PhaseHistory model
   */
  interface PhaseHistoryFieldRefs {
    readonly id: FieldRef<"PhaseHistory", 'String'>
    readonly projectId: FieldRef<"PhaseHistory", 'String'>
    readonly phase: FieldRef<"PhaseHistory", 'Phase'>
    readonly timestamp: FieldRef<"PhaseHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PhaseHistory findUnique
   */
  export type PhaseHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PhaseHistory to fetch.
     */
    where: PhaseHistoryWhereUniqueInput
  }

  /**
   * PhaseHistory findUniqueOrThrow
   */
  export type PhaseHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PhaseHistory to fetch.
     */
    where: PhaseHistoryWhereUniqueInput
  }

  /**
   * PhaseHistory findFirst
   */
  export type PhaseHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PhaseHistory to fetch.
     */
    where?: PhaseHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhaseHistories to fetch.
     */
    orderBy?: PhaseHistoryOrderByWithRelationInput | PhaseHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhaseHistories.
     */
    cursor?: PhaseHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhaseHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhaseHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhaseHistories.
     */
    distinct?: PhaseHistoryScalarFieldEnum | PhaseHistoryScalarFieldEnum[]
  }

  /**
   * PhaseHistory findFirstOrThrow
   */
  export type PhaseHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PhaseHistory to fetch.
     */
    where?: PhaseHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhaseHistories to fetch.
     */
    orderBy?: PhaseHistoryOrderByWithRelationInput | PhaseHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhaseHistories.
     */
    cursor?: PhaseHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhaseHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhaseHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhaseHistories.
     */
    distinct?: PhaseHistoryScalarFieldEnum | PhaseHistoryScalarFieldEnum[]
  }

  /**
   * PhaseHistory findMany
   */
  export type PhaseHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PhaseHistories to fetch.
     */
    where?: PhaseHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhaseHistories to fetch.
     */
    orderBy?: PhaseHistoryOrderByWithRelationInput | PhaseHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PhaseHistories.
     */
    cursor?: PhaseHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhaseHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhaseHistories.
     */
    skip?: number
    distinct?: PhaseHistoryScalarFieldEnum | PhaseHistoryScalarFieldEnum[]
  }

  /**
   * PhaseHistory create
   */
  export type PhaseHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PhaseHistory.
     */
    data: XOR<PhaseHistoryCreateInput, PhaseHistoryUncheckedCreateInput>
  }

  /**
   * PhaseHistory createMany
   */
  export type PhaseHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PhaseHistories.
     */
    data: PhaseHistoryCreateManyInput | PhaseHistoryCreateManyInput[]
  }

  /**
   * PhaseHistory createManyAndReturn
   */
  export type PhaseHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many PhaseHistories.
     */
    data: PhaseHistoryCreateManyInput | PhaseHistoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhaseHistory update
   */
  export type PhaseHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PhaseHistory.
     */
    data: XOR<PhaseHistoryUpdateInput, PhaseHistoryUncheckedUpdateInput>
    /**
     * Choose, which PhaseHistory to update.
     */
    where: PhaseHistoryWhereUniqueInput
  }

  /**
   * PhaseHistory updateMany
   */
  export type PhaseHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PhaseHistories.
     */
    data: XOR<PhaseHistoryUpdateManyMutationInput, PhaseHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PhaseHistories to update
     */
    where?: PhaseHistoryWhereInput
    /**
     * Limit how many PhaseHistories to update.
     */
    limit?: number
  }

  /**
   * PhaseHistory updateManyAndReturn
   */
  export type PhaseHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * The data used to update PhaseHistories.
     */
    data: XOR<PhaseHistoryUpdateManyMutationInput, PhaseHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PhaseHistories to update
     */
    where?: PhaseHistoryWhereInput
    /**
     * Limit how many PhaseHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhaseHistory upsert
   */
  export type PhaseHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PhaseHistory to update in case it exists.
     */
    where: PhaseHistoryWhereUniqueInput
    /**
     * In case the PhaseHistory found by the `where` argument doesn't exist, create a new PhaseHistory with this data.
     */
    create: XOR<PhaseHistoryCreateInput, PhaseHistoryUncheckedCreateInput>
    /**
     * In case the PhaseHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhaseHistoryUpdateInput, PhaseHistoryUncheckedUpdateInput>
  }

  /**
   * PhaseHistory delete
   */
  export type PhaseHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
    /**
     * Filter which PhaseHistory to delete.
     */
    where: PhaseHistoryWhereUniqueInput
  }

  /**
   * PhaseHistory deleteMany
   */
  export type PhaseHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhaseHistories to delete
     */
    where?: PhaseHistoryWhereInput
    /**
     * Limit how many PhaseHistories to delete.
     */
    limit?: number
  }

  /**
   * PhaseHistory without action
   */
  export type PhaseHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhaseHistory
     */
    select?: PhaseHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhaseHistory
     */
    omit?: PhaseHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhaseHistoryInclude<ExtArgs> | null
  }


  /**
   * Model ClientMessage
   */

  export type AggregateClientMessage = {
    _count: ClientMessageCountAggregateOutputType | null
    _min: ClientMessageMinAggregateOutputType | null
    _max: ClientMessageMaxAggregateOutputType | null
  }

  export type ClientMessageMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    message: string | null
    from: $Enums.MessageFrom | null
    timestamp: Date | null
  }

  export type ClientMessageMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    message: string | null
    from: $Enums.MessageFrom | null
    timestamp: Date | null
  }

  export type ClientMessageCountAggregateOutputType = {
    id: number
    projectId: number
    message: number
    from: number
    timestamp: number
    _all: number
  }


  export type ClientMessageMinAggregateInputType = {
    id?: true
    projectId?: true
    message?: true
    from?: true
    timestamp?: true
  }

  export type ClientMessageMaxAggregateInputType = {
    id?: true
    projectId?: true
    message?: true
    from?: true
    timestamp?: true
  }

  export type ClientMessageCountAggregateInputType = {
    id?: true
    projectId?: true
    message?: true
    from?: true
    timestamp?: true
    _all?: true
  }

  export type ClientMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientMessage to aggregate.
     */
    where?: ClientMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientMessages to fetch.
     */
    orderBy?: ClientMessageOrderByWithRelationInput | ClientMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClientMessages
    **/
    _count?: true | ClientMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMessageMaxAggregateInputType
  }

  export type GetClientMessageAggregateType<T extends ClientMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateClientMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientMessage[P]>
      : GetScalarType<T[P], AggregateClientMessage[P]>
  }




  export type ClientMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientMessageWhereInput
    orderBy?: ClientMessageOrderByWithAggregationInput | ClientMessageOrderByWithAggregationInput[]
    by: ClientMessageScalarFieldEnum[] | ClientMessageScalarFieldEnum
    having?: ClientMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientMessageCountAggregateInputType | true
    _min?: ClientMessageMinAggregateInputType
    _max?: ClientMessageMaxAggregateInputType
  }

  export type ClientMessageGroupByOutputType = {
    id: string
    projectId: string
    message: string
    from: $Enums.MessageFrom
    timestamp: Date
    _count: ClientMessageCountAggregateOutputType | null
    _min: ClientMessageMinAggregateOutputType | null
    _max: ClientMessageMaxAggregateOutputType | null
  }

  type GetClientMessageGroupByPayload<T extends ClientMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ClientMessageGroupByOutputType[P]>
        }
      >
    >


  export type ClientMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    message?: boolean
    from?: boolean
    timestamp?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientMessage"]>

  export type ClientMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    message?: boolean
    from?: boolean
    timestamp?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientMessage"]>

  export type ClientMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    message?: boolean
    from?: boolean
    timestamp?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientMessage"]>

  export type ClientMessageSelectScalar = {
    id?: boolean
    projectId?: boolean
    message?: boolean
    from?: boolean
    timestamp?: boolean
  }

  export type ClientMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "message" | "from" | "timestamp", ExtArgs["result"]["clientMessage"]>
  export type ClientMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ClientMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ClientMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ClientMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClientMessage"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      message: string
      from: $Enums.MessageFrom
      timestamp: Date
    }, ExtArgs["result"]["clientMessage"]>
    composites: {}
  }

  type ClientMessageGetPayload<S extends boolean | null | undefined | ClientMessageDefaultArgs> = $Result.GetResult<Prisma.$ClientMessagePayload, S>

  type ClientMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientMessageCountAggregateInputType | true
    }

  export interface ClientMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClientMessage'], meta: { name: 'ClientMessage' } }
    /**
     * Find zero or one ClientMessage that matches the filter.
     * @param {ClientMessageFindUniqueArgs} args - Arguments to find a ClientMessage
     * @example
     * // Get one ClientMessage
     * const clientMessage = await prisma.clientMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientMessageFindUniqueArgs>(args: SelectSubset<T, ClientMessageFindUniqueArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClientMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientMessageFindUniqueOrThrowArgs} args - Arguments to find a ClientMessage
     * @example
     * // Get one ClientMessage
     * const clientMessage = await prisma.clientMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientMessageFindFirstArgs} args - Arguments to find a ClientMessage
     * @example
     * // Get one ClientMessage
     * const clientMessage = await prisma.clientMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientMessageFindFirstArgs>(args?: SelectSubset<T, ClientMessageFindFirstArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientMessageFindFirstOrThrowArgs} args - Arguments to find a ClientMessage
     * @example
     * // Get one ClientMessage
     * const clientMessage = await prisma.clientMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClientMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClientMessages
     * const clientMessages = await prisma.clientMessage.findMany()
     * 
     * // Get first 10 ClientMessages
     * const clientMessages = await prisma.clientMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientMessageWithIdOnly = await prisma.clientMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientMessageFindManyArgs>(args?: SelectSubset<T, ClientMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClientMessage.
     * @param {ClientMessageCreateArgs} args - Arguments to create a ClientMessage.
     * @example
     * // Create one ClientMessage
     * const ClientMessage = await prisma.clientMessage.create({
     *   data: {
     *     // ... data to create a ClientMessage
     *   }
     * })
     * 
     */
    create<T extends ClientMessageCreateArgs>(args: SelectSubset<T, ClientMessageCreateArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClientMessages.
     * @param {ClientMessageCreateManyArgs} args - Arguments to create many ClientMessages.
     * @example
     * // Create many ClientMessages
     * const clientMessage = await prisma.clientMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientMessageCreateManyArgs>(args?: SelectSubset<T, ClientMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClientMessages and returns the data saved in the database.
     * @param {ClientMessageCreateManyAndReturnArgs} args - Arguments to create many ClientMessages.
     * @example
     * // Create many ClientMessages
     * const clientMessage = await prisma.clientMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClientMessages and only return the `id`
     * const clientMessageWithIdOnly = await prisma.clientMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClientMessage.
     * @param {ClientMessageDeleteArgs} args - Arguments to delete one ClientMessage.
     * @example
     * // Delete one ClientMessage
     * const ClientMessage = await prisma.clientMessage.delete({
     *   where: {
     *     // ... filter to delete one ClientMessage
     *   }
     * })
     * 
     */
    delete<T extends ClientMessageDeleteArgs>(args: SelectSubset<T, ClientMessageDeleteArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClientMessage.
     * @param {ClientMessageUpdateArgs} args - Arguments to update one ClientMessage.
     * @example
     * // Update one ClientMessage
     * const clientMessage = await prisma.clientMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientMessageUpdateArgs>(args: SelectSubset<T, ClientMessageUpdateArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClientMessages.
     * @param {ClientMessageDeleteManyArgs} args - Arguments to filter ClientMessages to delete.
     * @example
     * // Delete a few ClientMessages
     * const { count } = await prisma.clientMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientMessageDeleteManyArgs>(args?: SelectSubset<T, ClientMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClientMessages
     * const clientMessage = await prisma.clientMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientMessageUpdateManyArgs>(args: SelectSubset<T, ClientMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientMessages and returns the data updated in the database.
     * @param {ClientMessageUpdateManyAndReturnArgs} args - Arguments to update many ClientMessages.
     * @example
     * // Update many ClientMessages
     * const clientMessage = await prisma.clientMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClientMessages and only return the `id`
     * const clientMessageWithIdOnly = await prisma.clientMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClientMessage.
     * @param {ClientMessageUpsertArgs} args - Arguments to update or create a ClientMessage.
     * @example
     * // Update or create a ClientMessage
     * const clientMessage = await prisma.clientMessage.upsert({
     *   create: {
     *     // ... data to create a ClientMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClientMessage we want to update
     *   }
     * })
     */
    upsert<T extends ClientMessageUpsertArgs>(args: SelectSubset<T, ClientMessageUpsertArgs<ExtArgs>>): Prisma__ClientMessageClient<$Result.GetResult<Prisma.$ClientMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClientMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientMessageCountArgs} args - Arguments to filter ClientMessages to count.
     * @example
     * // Count the number of ClientMessages
     * const count = await prisma.clientMessage.count({
     *   where: {
     *     // ... the filter for the ClientMessages we want to count
     *   }
     * })
    **/
    count<T extends ClientMessageCountArgs>(
      args?: Subset<T, ClientMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClientMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientMessageAggregateArgs>(args: Subset<T, ClientMessageAggregateArgs>): Prisma.PrismaPromise<GetClientMessageAggregateType<T>>

    /**
     * Group by ClientMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientMessageGroupByArgs['orderBy'] }
        : { orderBy?: ClientMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClientMessage model
   */
  readonly fields: ClientMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClientMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClientMessage model
   */
  interface ClientMessageFieldRefs {
    readonly id: FieldRef<"ClientMessage", 'String'>
    readonly projectId: FieldRef<"ClientMessage", 'String'>
    readonly message: FieldRef<"ClientMessage", 'String'>
    readonly from: FieldRef<"ClientMessage", 'MessageFrom'>
    readonly timestamp: FieldRef<"ClientMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClientMessage findUnique
   */
  export type ClientMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * Filter, which ClientMessage to fetch.
     */
    where: ClientMessageWhereUniqueInput
  }

  /**
   * ClientMessage findUniqueOrThrow
   */
  export type ClientMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * Filter, which ClientMessage to fetch.
     */
    where: ClientMessageWhereUniqueInput
  }

  /**
   * ClientMessage findFirst
   */
  export type ClientMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * Filter, which ClientMessage to fetch.
     */
    where?: ClientMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientMessages to fetch.
     */
    orderBy?: ClientMessageOrderByWithRelationInput | ClientMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientMessages.
     */
    cursor?: ClientMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientMessages.
     */
    distinct?: ClientMessageScalarFieldEnum | ClientMessageScalarFieldEnum[]
  }

  /**
   * ClientMessage findFirstOrThrow
   */
  export type ClientMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * Filter, which ClientMessage to fetch.
     */
    where?: ClientMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientMessages to fetch.
     */
    orderBy?: ClientMessageOrderByWithRelationInput | ClientMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientMessages.
     */
    cursor?: ClientMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientMessages.
     */
    distinct?: ClientMessageScalarFieldEnum | ClientMessageScalarFieldEnum[]
  }

  /**
   * ClientMessage findMany
   */
  export type ClientMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * Filter, which ClientMessages to fetch.
     */
    where?: ClientMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientMessages to fetch.
     */
    orderBy?: ClientMessageOrderByWithRelationInput | ClientMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClientMessages.
     */
    cursor?: ClientMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientMessages.
     */
    skip?: number
    distinct?: ClientMessageScalarFieldEnum | ClientMessageScalarFieldEnum[]
  }

  /**
   * ClientMessage create
   */
  export type ClientMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ClientMessage.
     */
    data: XOR<ClientMessageCreateInput, ClientMessageUncheckedCreateInput>
  }

  /**
   * ClientMessage createMany
   */
  export type ClientMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClientMessages.
     */
    data: ClientMessageCreateManyInput | ClientMessageCreateManyInput[]
  }

  /**
   * ClientMessage createManyAndReturn
   */
  export type ClientMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ClientMessages.
     */
    data: ClientMessageCreateManyInput | ClientMessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClientMessage update
   */
  export type ClientMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ClientMessage.
     */
    data: XOR<ClientMessageUpdateInput, ClientMessageUncheckedUpdateInput>
    /**
     * Choose, which ClientMessage to update.
     */
    where: ClientMessageWhereUniqueInput
  }

  /**
   * ClientMessage updateMany
   */
  export type ClientMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClientMessages.
     */
    data: XOR<ClientMessageUpdateManyMutationInput, ClientMessageUncheckedUpdateManyInput>
    /**
     * Filter which ClientMessages to update
     */
    where?: ClientMessageWhereInput
    /**
     * Limit how many ClientMessages to update.
     */
    limit?: number
  }

  /**
   * ClientMessage updateManyAndReturn
   */
  export type ClientMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * The data used to update ClientMessages.
     */
    data: XOR<ClientMessageUpdateManyMutationInput, ClientMessageUncheckedUpdateManyInput>
    /**
     * Filter which ClientMessages to update
     */
    where?: ClientMessageWhereInput
    /**
     * Limit how many ClientMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClientMessage upsert
   */
  export type ClientMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ClientMessage to update in case it exists.
     */
    where: ClientMessageWhereUniqueInput
    /**
     * In case the ClientMessage found by the `where` argument doesn't exist, create a new ClientMessage with this data.
     */
    create: XOR<ClientMessageCreateInput, ClientMessageUncheckedCreateInput>
    /**
     * In case the ClientMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientMessageUpdateInput, ClientMessageUncheckedUpdateInput>
  }

  /**
   * ClientMessage delete
   */
  export type ClientMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
    /**
     * Filter which ClientMessage to delete.
     */
    where: ClientMessageWhereUniqueInput
  }

  /**
   * ClientMessage deleteMany
   */
  export type ClientMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientMessages to delete
     */
    where?: ClientMessageWhereInput
    /**
     * Limit how many ClientMessages to delete.
     */
    limit?: number
  }

  /**
   * ClientMessage without action
   */
  export type ClientMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientMessage
     */
    select?: ClientMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientMessage
     */
    omit?: ClientMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientMessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    currentPhase: 'currentPhase',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const PhaseHistoryScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    phase: 'phase',
    timestamp: 'timestamp'
  };

  export type PhaseHistoryScalarFieldEnum = (typeof PhaseHistoryScalarFieldEnum)[keyof typeof PhaseHistoryScalarFieldEnum]


  export const ClientMessageScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    message: 'message',
    from: 'from',
    timestamp: 'timestamp'
  };

  export type ClientMessageScalarFieldEnum = (typeof ClientMessageScalarFieldEnum)[keyof typeof ClientMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Phase'
   */
  export type EnumPhaseFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Phase'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'MessageFrom'
   */
  export type EnumMessageFromFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageFrom'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    currentPhase?: EnumPhaseFilter<"Project"> | $Enums.Phase
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    phaseHistory?: PhaseHistoryListRelationFilter
    clientMessages?: ClientMessageListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    currentPhase?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    phaseHistory?: PhaseHistoryOrderByRelationAggregateInput
    clientMessages?: ClientMessageOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    currentPhase?: EnumPhaseFilter<"Project"> | $Enums.Phase
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    phaseHistory?: PhaseHistoryListRelationFilter
    clientMessages?: ClientMessageListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    currentPhase?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    currentPhase?: EnumPhaseWithAggregatesFilter<"Project"> | $Enums.Phase
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type PhaseHistoryWhereInput = {
    AND?: PhaseHistoryWhereInput | PhaseHistoryWhereInput[]
    OR?: PhaseHistoryWhereInput[]
    NOT?: PhaseHistoryWhereInput | PhaseHistoryWhereInput[]
    id?: StringFilter<"PhaseHistory"> | string
    projectId?: StringFilter<"PhaseHistory"> | string
    phase?: EnumPhaseFilter<"PhaseHistory"> | $Enums.Phase
    timestamp?: DateTimeFilter<"PhaseHistory"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type PhaseHistoryOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    phase?: SortOrder
    timestamp?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type PhaseHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PhaseHistoryWhereInput | PhaseHistoryWhereInput[]
    OR?: PhaseHistoryWhereInput[]
    NOT?: PhaseHistoryWhereInput | PhaseHistoryWhereInput[]
    projectId?: StringFilter<"PhaseHistory"> | string
    phase?: EnumPhaseFilter<"PhaseHistory"> | $Enums.Phase
    timestamp?: DateTimeFilter<"PhaseHistory"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type PhaseHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    phase?: SortOrder
    timestamp?: SortOrder
    _count?: PhaseHistoryCountOrderByAggregateInput
    _max?: PhaseHistoryMaxOrderByAggregateInput
    _min?: PhaseHistoryMinOrderByAggregateInput
  }

  export type PhaseHistoryScalarWhereWithAggregatesInput = {
    AND?: PhaseHistoryScalarWhereWithAggregatesInput | PhaseHistoryScalarWhereWithAggregatesInput[]
    OR?: PhaseHistoryScalarWhereWithAggregatesInput[]
    NOT?: PhaseHistoryScalarWhereWithAggregatesInput | PhaseHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PhaseHistory"> | string
    projectId?: StringWithAggregatesFilter<"PhaseHistory"> | string
    phase?: EnumPhaseWithAggregatesFilter<"PhaseHistory"> | $Enums.Phase
    timestamp?: DateTimeWithAggregatesFilter<"PhaseHistory"> | Date | string
  }

  export type ClientMessageWhereInput = {
    AND?: ClientMessageWhereInput | ClientMessageWhereInput[]
    OR?: ClientMessageWhereInput[]
    NOT?: ClientMessageWhereInput | ClientMessageWhereInput[]
    id?: StringFilter<"ClientMessage"> | string
    projectId?: StringFilter<"ClientMessage"> | string
    message?: StringFilter<"ClientMessage"> | string
    from?: EnumMessageFromFilter<"ClientMessage"> | $Enums.MessageFrom
    timestamp?: DateTimeFilter<"ClientMessage"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ClientMessageOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    message?: SortOrder
    from?: SortOrder
    timestamp?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ClientMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientMessageWhereInput | ClientMessageWhereInput[]
    OR?: ClientMessageWhereInput[]
    NOT?: ClientMessageWhereInput | ClientMessageWhereInput[]
    projectId?: StringFilter<"ClientMessage"> | string
    message?: StringFilter<"ClientMessage"> | string
    from?: EnumMessageFromFilter<"ClientMessage"> | $Enums.MessageFrom
    timestamp?: DateTimeFilter<"ClientMessage"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ClientMessageOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    message?: SortOrder
    from?: SortOrder
    timestamp?: SortOrder
    _count?: ClientMessageCountOrderByAggregateInput
    _max?: ClientMessageMaxOrderByAggregateInput
    _min?: ClientMessageMinOrderByAggregateInput
  }

  export type ClientMessageScalarWhereWithAggregatesInput = {
    AND?: ClientMessageScalarWhereWithAggregatesInput | ClientMessageScalarWhereWithAggregatesInput[]
    OR?: ClientMessageScalarWhereWithAggregatesInput[]
    NOT?: ClientMessageScalarWhereWithAggregatesInput | ClientMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClientMessage"> | string
    projectId?: StringWithAggregatesFilter<"ClientMessage"> | string
    message?: StringWithAggregatesFilter<"ClientMessage"> | string
    from?: EnumMessageFromWithAggregatesFilter<"ClientMessage"> | $Enums.MessageFrom
    timestamp?: DateTimeWithAggregatesFilter<"ClientMessage"> | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    currentPhase: $Enums.Phase
    createdAt?: Date | string
    updatedAt?: Date | string
    phaseHistory?: PhaseHistoryCreateNestedManyWithoutProjectInput
    clientMessages?: ClientMessageCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    currentPhase: $Enums.Phase
    createdAt?: Date | string
    updatedAt?: Date | string
    phaseHistory?: PhaseHistoryUncheckedCreateNestedManyWithoutProjectInput
    clientMessages?: ClientMessageUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phaseHistory?: PhaseHistoryUpdateManyWithoutProjectNestedInput
    clientMessages?: ClientMessageUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phaseHistory?: PhaseHistoryUncheckedUpdateManyWithoutProjectNestedInput
    clientMessages?: ClientMessageUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    currentPhase: $Enums.Phase
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhaseHistoryCreateInput = {
    id?: string
    phase: $Enums.Phase
    timestamp?: Date | string
    project: ProjectCreateNestedOneWithoutPhaseHistoryInput
  }

  export type PhaseHistoryUncheckedCreateInput = {
    id?: string
    projectId: string
    phase: $Enums.Phase
    timestamp?: Date | string
  }

  export type PhaseHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutPhaseHistoryNestedInput
  }

  export type PhaseHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    phase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhaseHistoryCreateManyInput = {
    id?: string
    projectId: string
    phase: $Enums.Phase
    timestamp?: Date | string
  }

  export type PhaseHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhaseHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    phase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientMessageCreateInput = {
    id?: string
    message: string
    from: $Enums.MessageFrom
    timestamp?: Date | string
    project: ProjectCreateNestedOneWithoutClientMessagesInput
  }

  export type ClientMessageUncheckedCreateInput = {
    id?: string
    projectId: string
    message: string
    from: $Enums.MessageFrom
    timestamp?: Date | string
  }

  export type ClientMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    from?: EnumMessageFromFieldUpdateOperationsInput | $Enums.MessageFrom
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutClientMessagesNestedInput
  }

  export type ClientMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    from?: EnumMessageFromFieldUpdateOperationsInput | $Enums.MessageFrom
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientMessageCreateManyInput = {
    id?: string
    projectId: string
    message: string
    from: $Enums.MessageFrom
    timestamp?: Date | string
  }

  export type ClientMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    from?: EnumMessageFromFieldUpdateOperationsInput | $Enums.MessageFrom
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    from?: EnumMessageFromFieldUpdateOperationsInput | $Enums.MessageFrom
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumPhaseFilter<$PrismaModel = never> = {
    equals?: $Enums.Phase | EnumPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.Phase[]
    notIn?: $Enums.Phase[]
    not?: NestedEnumPhaseFilter<$PrismaModel> | $Enums.Phase
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PhaseHistoryListRelationFilter = {
    every?: PhaseHistoryWhereInput
    some?: PhaseHistoryWhereInput
    none?: PhaseHistoryWhereInput
  }

  export type ClientMessageListRelationFilter = {
    every?: ClientMessageWhereInput
    some?: ClientMessageWhereInput
    none?: ClientMessageWhereInput
  }

  export type PhaseHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    currentPhase?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    currentPhase?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    currentPhase?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumPhaseWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Phase | EnumPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.Phase[]
    notIn?: $Enums.Phase[]
    not?: NestedEnumPhaseWithAggregatesFilter<$PrismaModel> | $Enums.Phase
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPhaseFilter<$PrismaModel>
    _max?: NestedEnumPhaseFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type PhaseHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    phase?: SortOrder
    timestamp?: SortOrder
  }

  export type PhaseHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    phase?: SortOrder
    timestamp?: SortOrder
  }

  export type PhaseHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    phase?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumMessageFromFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageFrom | EnumMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.MessageFrom[]
    notIn?: $Enums.MessageFrom[]
    not?: NestedEnumMessageFromFilter<$PrismaModel> | $Enums.MessageFrom
  }

  export type ClientMessageCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    message?: SortOrder
    from?: SortOrder
    timestamp?: SortOrder
  }

  export type ClientMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    message?: SortOrder
    from?: SortOrder
    timestamp?: SortOrder
  }

  export type ClientMessageMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    message?: SortOrder
    from?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumMessageFromWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageFrom | EnumMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.MessageFrom[]
    notIn?: $Enums.MessageFrom[]
    not?: NestedEnumMessageFromWithAggregatesFilter<$PrismaModel> | $Enums.MessageFrom
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageFromFilter<$PrismaModel>
    _max?: NestedEnumMessageFromFilter<$PrismaModel>
  }

  export type PhaseHistoryCreateNestedManyWithoutProjectInput = {
    create?: XOR<PhaseHistoryCreateWithoutProjectInput, PhaseHistoryUncheckedCreateWithoutProjectInput> | PhaseHistoryCreateWithoutProjectInput[] | PhaseHistoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PhaseHistoryCreateOrConnectWithoutProjectInput | PhaseHistoryCreateOrConnectWithoutProjectInput[]
    createMany?: PhaseHistoryCreateManyProjectInputEnvelope
    connect?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
  }

  export type ClientMessageCreateNestedManyWithoutProjectInput = {
    create?: XOR<ClientMessageCreateWithoutProjectInput, ClientMessageUncheckedCreateWithoutProjectInput> | ClientMessageCreateWithoutProjectInput[] | ClientMessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ClientMessageCreateOrConnectWithoutProjectInput | ClientMessageCreateOrConnectWithoutProjectInput[]
    createMany?: ClientMessageCreateManyProjectInputEnvelope
    connect?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
  }

  export type PhaseHistoryUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<PhaseHistoryCreateWithoutProjectInput, PhaseHistoryUncheckedCreateWithoutProjectInput> | PhaseHistoryCreateWithoutProjectInput[] | PhaseHistoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PhaseHistoryCreateOrConnectWithoutProjectInput | PhaseHistoryCreateOrConnectWithoutProjectInput[]
    createMany?: PhaseHistoryCreateManyProjectInputEnvelope
    connect?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
  }

  export type ClientMessageUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ClientMessageCreateWithoutProjectInput, ClientMessageUncheckedCreateWithoutProjectInput> | ClientMessageCreateWithoutProjectInput[] | ClientMessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ClientMessageCreateOrConnectWithoutProjectInput | ClientMessageCreateOrConnectWithoutProjectInput[]
    createMany?: ClientMessageCreateManyProjectInputEnvelope
    connect?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumPhaseFieldUpdateOperationsInput = {
    set?: $Enums.Phase
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PhaseHistoryUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PhaseHistoryCreateWithoutProjectInput, PhaseHistoryUncheckedCreateWithoutProjectInput> | PhaseHistoryCreateWithoutProjectInput[] | PhaseHistoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PhaseHistoryCreateOrConnectWithoutProjectInput | PhaseHistoryCreateOrConnectWithoutProjectInput[]
    upsert?: PhaseHistoryUpsertWithWhereUniqueWithoutProjectInput | PhaseHistoryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PhaseHistoryCreateManyProjectInputEnvelope
    set?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    disconnect?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    delete?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    connect?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    update?: PhaseHistoryUpdateWithWhereUniqueWithoutProjectInput | PhaseHistoryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PhaseHistoryUpdateManyWithWhereWithoutProjectInput | PhaseHistoryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PhaseHistoryScalarWhereInput | PhaseHistoryScalarWhereInput[]
  }

  export type ClientMessageUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ClientMessageCreateWithoutProjectInput, ClientMessageUncheckedCreateWithoutProjectInput> | ClientMessageCreateWithoutProjectInput[] | ClientMessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ClientMessageCreateOrConnectWithoutProjectInput | ClientMessageCreateOrConnectWithoutProjectInput[]
    upsert?: ClientMessageUpsertWithWhereUniqueWithoutProjectInput | ClientMessageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ClientMessageCreateManyProjectInputEnvelope
    set?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    disconnect?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    delete?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    connect?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    update?: ClientMessageUpdateWithWhereUniqueWithoutProjectInput | ClientMessageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ClientMessageUpdateManyWithWhereWithoutProjectInput | ClientMessageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ClientMessageScalarWhereInput | ClientMessageScalarWhereInput[]
  }

  export type PhaseHistoryUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PhaseHistoryCreateWithoutProjectInput, PhaseHistoryUncheckedCreateWithoutProjectInput> | PhaseHistoryCreateWithoutProjectInput[] | PhaseHistoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PhaseHistoryCreateOrConnectWithoutProjectInput | PhaseHistoryCreateOrConnectWithoutProjectInput[]
    upsert?: PhaseHistoryUpsertWithWhereUniqueWithoutProjectInput | PhaseHistoryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PhaseHistoryCreateManyProjectInputEnvelope
    set?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    disconnect?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    delete?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    connect?: PhaseHistoryWhereUniqueInput | PhaseHistoryWhereUniqueInput[]
    update?: PhaseHistoryUpdateWithWhereUniqueWithoutProjectInput | PhaseHistoryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PhaseHistoryUpdateManyWithWhereWithoutProjectInput | PhaseHistoryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PhaseHistoryScalarWhereInput | PhaseHistoryScalarWhereInput[]
  }

  export type ClientMessageUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ClientMessageCreateWithoutProjectInput, ClientMessageUncheckedCreateWithoutProjectInput> | ClientMessageCreateWithoutProjectInput[] | ClientMessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ClientMessageCreateOrConnectWithoutProjectInput | ClientMessageCreateOrConnectWithoutProjectInput[]
    upsert?: ClientMessageUpsertWithWhereUniqueWithoutProjectInput | ClientMessageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ClientMessageCreateManyProjectInputEnvelope
    set?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    disconnect?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    delete?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    connect?: ClientMessageWhereUniqueInput | ClientMessageWhereUniqueInput[]
    update?: ClientMessageUpdateWithWhereUniqueWithoutProjectInput | ClientMessageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ClientMessageUpdateManyWithWhereWithoutProjectInput | ClientMessageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ClientMessageScalarWhereInput | ClientMessageScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutPhaseHistoryInput = {
    create?: XOR<ProjectCreateWithoutPhaseHistoryInput, ProjectUncheckedCreateWithoutPhaseHistoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPhaseHistoryInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutPhaseHistoryNestedInput = {
    create?: XOR<ProjectCreateWithoutPhaseHistoryInput, ProjectUncheckedCreateWithoutPhaseHistoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPhaseHistoryInput
    upsert?: ProjectUpsertWithoutPhaseHistoryInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutPhaseHistoryInput, ProjectUpdateWithoutPhaseHistoryInput>, ProjectUncheckedUpdateWithoutPhaseHistoryInput>
  }

  export type ProjectCreateNestedOneWithoutClientMessagesInput = {
    create?: XOR<ProjectCreateWithoutClientMessagesInput, ProjectUncheckedCreateWithoutClientMessagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutClientMessagesInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumMessageFromFieldUpdateOperationsInput = {
    set?: $Enums.MessageFrom
  }

  export type ProjectUpdateOneRequiredWithoutClientMessagesNestedInput = {
    create?: XOR<ProjectCreateWithoutClientMessagesInput, ProjectUncheckedCreateWithoutClientMessagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutClientMessagesInput
    upsert?: ProjectUpsertWithoutClientMessagesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutClientMessagesInput, ProjectUpdateWithoutClientMessagesInput>, ProjectUncheckedUpdateWithoutClientMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumPhaseFilter<$PrismaModel = never> = {
    equals?: $Enums.Phase | EnumPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.Phase[]
    notIn?: $Enums.Phase[]
    not?: NestedEnumPhaseFilter<$PrismaModel> | $Enums.Phase
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumPhaseWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Phase | EnumPhaseFieldRefInput<$PrismaModel>
    in?: $Enums.Phase[]
    notIn?: $Enums.Phase[]
    not?: NestedEnumPhaseWithAggregatesFilter<$PrismaModel> | $Enums.Phase
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPhaseFilter<$PrismaModel>
    _max?: NestedEnumPhaseFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMessageFromFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageFrom | EnumMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.MessageFrom[]
    notIn?: $Enums.MessageFrom[]
    not?: NestedEnumMessageFromFilter<$PrismaModel> | $Enums.MessageFrom
  }

  export type NestedEnumMessageFromWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageFrom | EnumMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.MessageFrom[]
    notIn?: $Enums.MessageFrom[]
    not?: NestedEnumMessageFromWithAggregatesFilter<$PrismaModel> | $Enums.MessageFrom
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageFromFilter<$PrismaModel>
    _max?: NestedEnumMessageFromFilter<$PrismaModel>
  }

  export type PhaseHistoryCreateWithoutProjectInput = {
    id?: string
    phase: $Enums.Phase
    timestamp?: Date | string
  }

  export type PhaseHistoryUncheckedCreateWithoutProjectInput = {
    id?: string
    phase: $Enums.Phase
    timestamp?: Date | string
  }

  export type PhaseHistoryCreateOrConnectWithoutProjectInput = {
    where: PhaseHistoryWhereUniqueInput
    create: XOR<PhaseHistoryCreateWithoutProjectInput, PhaseHistoryUncheckedCreateWithoutProjectInput>
  }

  export type PhaseHistoryCreateManyProjectInputEnvelope = {
    data: PhaseHistoryCreateManyProjectInput | PhaseHistoryCreateManyProjectInput[]
  }

  export type ClientMessageCreateWithoutProjectInput = {
    id?: string
    message: string
    from: $Enums.MessageFrom
    timestamp?: Date | string
  }

  export type ClientMessageUncheckedCreateWithoutProjectInput = {
    id?: string
    message: string
    from: $Enums.MessageFrom
    timestamp?: Date | string
  }

  export type ClientMessageCreateOrConnectWithoutProjectInput = {
    where: ClientMessageWhereUniqueInput
    create: XOR<ClientMessageCreateWithoutProjectInput, ClientMessageUncheckedCreateWithoutProjectInput>
  }

  export type ClientMessageCreateManyProjectInputEnvelope = {
    data: ClientMessageCreateManyProjectInput | ClientMessageCreateManyProjectInput[]
  }

  export type PhaseHistoryUpsertWithWhereUniqueWithoutProjectInput = {
    where: PhaseHistoryWhereUniqueInput
    update: XOR<PhaseHistoryUpdateWithoutProjectInput, PhaseHistoryUncheckedUpdateWithoutProjectInput>
    create: XOR<PhaseHistoryCreateWithoutProjectInput, PhaseHistoryUncheckedCreateWithoutProjectInput>
  }

  export type PhaseHistoryUpdateWithWhereUniqueWithoutProjectInput = {
    where: PhaseHistoryWhereUniqueInput
    data: XOR<PhaseHistoryUpdateWithoutProjectInput, PhaseHistoryUncheckedUpdateWithoutProjectInput>
  }

  export type PhaseHistoryUpdateManyWithWhereWithoutProjectInput = {
    where: PhaseHistoryScalarWhereInput
    data: XOR<PhaseHistoryUpdateManyMutationInput, PhaseHistoryUncheckedUpdateManyWithoutProjectInput>
  }

  export type PhaseHistoryScalarWhereInput = {
    AND?: PhaseHistoryScalarWhereInput | PhaseHistoryScalarWhereInput[]
    OR?: PhaseHistoryScalarWhereInput[]
    NOT?: PhaseHistoryScalarWhereInput | PhaseHistoryScalarWhereInput[]
    id?: StringFilter<"PhaseHistory"> | string
    projectId?: StringFilter<"PhaseHistory"> | string
    phase?: EnumPhaseFilter<"PhaseHistory"> | $Enums.Phase
    timestamp?: DateTimeFilter<"PhaseHistory"> | Date | string
  }

  export type ClientMessageUpsertWithWhereUniqueWithoutProjectInput = {
    where: ClientMessageWhereUniqueInput
    update: XOR<ClientMessageUpdateWithoutProjectInput, ClientMessageUncheckedUpdateWithoutProjectInput>
    create: XOR<ClientMessageCreateWithoutProjectInput, ClientMessageUncheckedCreateWithoutProjectInput>
  }

  export type ClientMessageUpdateWithWhereUniqueWithoutProjectInput = {
    where: ClientMessageWhereUniqueInput
    data: XOR<ClientMessageUpdateWithoutProjectInput, ClientMessageUncheckedUpdateWithoutProjectInput>
  }

  export type ClientMessageUpdateManyWithWhereWithoutProjectInput = {
    where: ClientMessageScalarWhereInput
    data: XOR<ClientMessageUpdateManyMutationInput, ClientMessageUncheckedUpdateManyWithoutProjectInput>
  }

  export type ClientMessageScalarWhereInput = {
    AND?: ClientMessageScalarWhereInput | ClientMessageScalarWhereInput[]
    OR?: ClientMessageScalarWhereInput[]
    NOT?: ClientMessageScalarWhereInput | ClientMessageScalarWhereInput[]
    id?: StringFilter<"ClientMessage"> | string
    projectId?: StringFilter<"ClientMessage"> | string
    message?: StringFilter<"ClientMessage"> | string
    from?: EnumMessageFromFilter<"ClientMessage"> | $Enums.MessageFrom
    timestamp?: DateTimeFilter<"ClientMessage"> | Date | string
  }

  export type ProjectCreateWithoutPhaseHistoryInput = {
    id?: string
    name: string
    currentPhase: $Enums.Phase
    createdAt?: Date | string
    updatedAt?: Date | string
    clientMessages?: ClientMessageCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutPhaseHistoryInput = {
    id?: string
    name: string
    currentPhase: $Enums.Phase
    createdAt?: Date | string
    updatedAt?: Date | string
    clientMessages?: ClientMessageUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutPhaseHistoryInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutPhaseHistoryInput, ProjectUncheckedCreateWithoutPhaseHistoryInput>
  }

  export type ProjectUpsertWithoutPhaseHistoryInput = {
    update: XOR<ProjectUpdateWithoutPhaseHistoryInput, ProjectUncheckedUpdateWithoutPhaseHistoryInput>
    create: XOR<ProjectCreateWithoutPhaseHistoryInput, ProjectUncheckedCreateWithoutPhaseHistoryInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutPhaseHistoryInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutPhaseHistoryInput, ProjectUncheckedUpdateWithoutPhaseHistoryInput>
  }

  export type ProjectUpdateWithoutPhaseHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientMessages?: ClientMessageUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutPhaseHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientMessages?: ClientMessageUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutClientMessagesInput = {
    id?: string
    name: string
    currentPhase: $Enums.Phase
    createdAt?: Date | string
    updatedAt?: Date | string
    phaseHistory?: PhaseHistoryCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutClientMessagesInput = {
    id?: string
    name: string
    currentPhase: $Enums.Phase
    createdAt?: Date | string
    updatedAt?: Date | string
    phaseHistory?: PhaseHistoryUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutClientMessagesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutClientMessagesInput, ProjectUncheckedCreateWithoutClientMessagesInput>
  }

  export type ProjectUpsertWithoutClientMessagesInput = {
    update: XOR<ProjectUpdateWithoutClientMessagesInput, ProjectUncheckedUpdateWithoutClientMessagesInput>
    create: XOR<ProjectCreateWithoutClientMessagesInput, ProjectUncheckedCreateWithoutClientMessagesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutClientMessagesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutClientMessagesInput, ProjectUncheckedUpdateWithoutClientMessagesInput>
  }

  export type ProjectUpdateWithoutClientMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phaseHistory?: PhaseHistoryUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutClientMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentPhase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phaseHistory?: PhaseHistoryUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type PhaseHistoryCreateManyProjectInput = {
    id?: string
    phase: $Enums.Phase
    timestamp?: Date | string
  }

  export type ClientMessageCreateManyProjectInput = {
    id?: string
    message: string
    from: $Enums.MessageFrom
    timestamp?: Date | string
  }

  export type PhaseHistoryUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    phase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhaseHistoryUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    phase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhaseHistoryUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    phase?: EnumPhaseFieldUpdateOperationsInput | $Enums.Phase
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientMessageUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    from?: EnumMessageFromFieldUpdateOperationsInput | $Enums.MessageFrom
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientMessageUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    from?: EnumMessageFromFieldUpdateOperationsInput | $Enums.MessageFrom
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientMessageUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    from?: EnumMessageFromFieldUpdateOperationsInput | $Enums.MessageFrom
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
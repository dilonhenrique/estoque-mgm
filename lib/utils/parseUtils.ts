import { ObjectId, WithId } from "mongodb";

export function idToString<
  T extends object,
  K extends WithId<T> | Array<WithId<T>>,
  R = K extends Array<WithId<T>> ? Array<WithStringId<T>> : WithStringId<T>
>(obj: K): R {
  if (Array.isArray(obj)) {
    return idToStringArray<T>(obj) as R;
  }

  return idToStringSingle<T>(obj as WithId<T>) as R;
}

export function idToStringSingle<T extends object>(
  obj: WithId<T>
): WithStringId<T> {
  // return _.mapValues(obj, (value) => {
  //   return objectIdToString(value);
  // }) as WithStringId<T>;
  return JSON.parse(JSON.stringify(obj)) as WithStringId<T>;
}

export function idToStringArray<T extends object>(
  obj: WithId<T>[]
): WithStringId<T>[] {
  // return obj.map<WithStringId<T>>((subObj) => {
  //   if (typeof subObj === "object") {
  //     return idToString(subObj);
  //   }
  //   return objectIdToString(subObj);
  // });
  return JSON.parse(JSON.stringify(obj)) as WithStringId<T>[];
}

function objectIdToString(val: any) {
  if (val instanceof ObjectId) return val.toString();
  return val;
}

type AnyObject = { [x: string]: any | AnyObject };

export type WithStringId<T> = Omit<T, "_id"> & {
  _id: string;
};

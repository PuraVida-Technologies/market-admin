import { Merge } from "type-fest";

type KeyedObject = {
  key: string | number;
};

export function setKeyField<T>(
  data: T[] | undefined,
  keyField = "id"
): Merge<T, KeyedObject>[] {
  if (!data) {
    return [];
  }
  return data.map((item: T, index: number) => {
    const row = item as unknown as { [key: string]: string };
    const keyFieldValue = row[keyField] as string;

    return {
      ...item,
      key: keyFieldValue + `${index}`,
    };
  });
}

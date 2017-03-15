export default function add<T>(list: T[], predicate: (item: T) => boolean) {
  return list.filter((item) => !predicate(item));
}

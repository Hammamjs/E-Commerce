interface WithId {
  _id: string;
}

export const derivedState = <T extends WithId>(items: T[]) => {
  return {
    items,
    map: Object.fromEntries(items.map((p) => [p._id, p])),
    ids: items.map((p) => p._id),
  };
};

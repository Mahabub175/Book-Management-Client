export const filterUndefined = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return Object.entries(obj).reduce<Partial<T>>((acc, [key, value]) => {
    if (value !== undefined) {
      (acc as Record<string, any>)[key] = value;
    }
    return acc;
  }, {});
};

export const appendToFormData = <T extends Record<string, any>>(
  data: T,
  formData: FormData
): void => {
  const append = (key: string, value: any) => {
    if (key === "status") {
      value = value === "true" ? true : value === "false" ? false : value;
    }

    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  };

  Object.entries(data).forEach(([key, value]) => {
    append(key, value);
  });
};

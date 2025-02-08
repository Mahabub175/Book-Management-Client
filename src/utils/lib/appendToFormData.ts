export const appendToFormData = <T extends Record<string, any>>(
  data: T,
  formData: FormData
): void => {
  const append = (key: string, value: any) => {
    if (key === "status") {
      value = value === "true" ? true : value === "false" ? false : value;
    }

    if (value instanceof File) {
      formData.append(key, value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof File
    ) {
      value.forEach((file) => formData.append(key, file));
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  };

  Object.entries(data).forEach(([key, value]) => {
    append(key, value);
  });
};

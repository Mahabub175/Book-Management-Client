interface Field {
  name: string;
  value: any;
  errors: string;
}

type DefaultValue = Record<string, any>;
type SelectedData = Field[];

export const transformDefaultValues = (
  defaultValue: DefaultValue | undefined,
  selectedData: SelectedData | undefined
): Field[] => {
  if (!defaultValue) return [];

  const fields: Field[] = [];

  for (const key in defaultValue) {
    if (Object.prototype.hasOwnProperty.call(defaultValue, key)) {
      let value = defaultValue[key];
      if (Array.isArray(value) && typeof value[0] === "number") {
        fields.push({
          name: key,
          value: value,
          errors: "",
        });
        continue;
      }
      if (Array.isArray(value)) {
        value = value.length > 0 ? value[0] : null;
      } else if (typeof value === "string" && value.startsWith("http")) {
        value = [{ url: value }];
      }
      fields.push({
        name: key,
        value: value,
        errors: "",
      });
    }
  }

  if (selectedData && Array.isArray(selectedData)) {
    selectedData.forEach((data) => {
      fields.push(data);
    });
  }

  return fields;
};

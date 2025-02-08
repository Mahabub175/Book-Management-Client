import dayjs from "dayjs";
import { formatImagePath } from "./formatImagePath";

export interface Field {
  name: string;
  value: any;
  errors: string;
}

type DefaultValue = Record<string, any>;
type SelectedData = Field[];

const excludedKeys: string[] = [];

export const transformDefaultValues = (
  defaultValue: DefaultValue | undefined,
  selectedData: SelectedData | undefined
): Field[] => {
  if (!defaultValue) return [];

  const fields: Field[] = [];

  const selectedDataMap = (
    Array.isArray(selectedData) ? selectedData : []
  ).reduce((acc, { name, value }) => {
    acc[name] = value || "";
    return acc;
  }, {} as Record<string, any>);

  for (const key in defaultValue) {
    if (Object.prototype.hasOwnProperty.call(defaultValue, key)) {
      let value = defaultValue[key];

      if (selectedDataMap[key] !== undefined) {
        value = selectedDataMap[key];
      } else {
        if (value === "true") {
          value = true;
        } else if (value === "false") {
          value = false;
        } else if (key.includes("publishedAt")) {
          value = dayjs(value, "YYYY-MM-DD");
          if (!value.isValid()) {
            value = null;
          }
        } else if (Array.isArray(value) && typeof value[0] === "number") {
          fields.push({ name: key, value, errors: "" });
          continue;
        } else if (Array.isArray(value)) {
          if (key === "images" && Array.isArray(value)) {
            value = value.map((url, index) => ({
              url: formatImagePath(url),
              uid: `__AUTO__${Date.now()}_${index}__`,
            }));
          } else {
            value = value.length > 0 ? value[0] : null;
          }
        } else if (
          typeof value === "string" &&
          value.startsWith("http") &&
          !excludedKeys.includes(key)
        ) {
          value = [{ url: value }];
        }
      }

      fields.push({ name: key, value, errors: "" });
    }
  }

  if (Array.isArray(selectedData)) {
    selectedData.forEach((data) => {
      if (!fields.some((field) => field.name === data.name)) {
        fields.push(data);
      }
    });
  }

  return fields;
};

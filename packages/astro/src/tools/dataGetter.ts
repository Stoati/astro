import { z } from "zod";
import { Schedule } from "./ScheduleTypes";
import { ProductAttributeGeolocationData } from "./GeolocationTypes";
import { GetProductWithAttributes, ProductAttribute } from "./types";
export const findTextAttribute = (
  element: GetProductWithAttributes,
  templateAttributeCode: string,
  locale: "fr-FR" = "fr-FR"
) => {
  const found = findAttribute(element, templateAttributeCode);

  if (!found) {
    console.error(
      "Stoati: Attribute with code " + templateAttributeCode + " not found"
    );
    return null;
  }

  return convertToTextData(found, locale);
};

export const findMarkdownAttribute = (
  element: GetProductWithAttributes,
  templateAttributeCode: string,
  locale: "fr-FR" = "fr-FR"
) => {
  const found = findAttribute(element, templateAttributeCode);

  if (!found) {
    return null;
  }

  return convertToMarkdownData(found, locale);
};

export const findAssetAttribute = (
  element: GetProductWithAttributes,
  templateAttributeCode: string
) => {
  const found = findAttribute(element, templateAttributeCode);

  if (!found) {
    return null;
  }

  return convertToAssetData(found);
};

export const findScheduleAttribute = (
  element: GetProductWithAttributes,
  templateAttributeCode: string
) => {
  const attribute = findAttribute(element, templateAttributeCode);

  if (!attribute) {
    return null;
  }

  return convertToScheduleData(attribute);
};

export const findGeolocationData = (
  element: GetProductWithAttributes,
  templateAttributeCode: string
) => {
  const attribute = findAttribute(element, templateAttributeCode);

  if (!attribute) {
    return null;
  }

  return convertToGeolocationData(attribute);
};

export const findAttribute = (
  data: GetProductWithAttributes,
  templateAttributeCode: string
) => {
  const found = data.attributes.find(
    (item) => item.templateCode === templateAttributeCode
  );

  if (!found) {
    console.error(
      "Stoati: Attribute with code " + templateAttributeCode + " not found"
    );
    return null;
  }

  return found;
};

export const convertToTextData = (data: ProductAttribute, locale: "fr-FR") => {
  if (data.type !== "text") {
    console.error("Stoati: Given data doesn't have the good type (text)");
    return {
      ...data,
      data: { text: "" },
    };
  }

  const parseResult = z
    .array(
      z.object({
        locale: z.string(),
        value: z.string(),
      })
    )
    .safeParse(data.data);

  if (parseResult.success) {
    const localizedValue = parseResult.data.find(
      (item) => item.locale === locale
    );
    if (localizedValue) {
      return {
        ...data,
        data: {
          text: localizedValue.value,
        },
      };
    }

    console.error("Stoati: No value have been found with this locale");
    return {
      ...data,
      data: {
        text: "",
      },
    };
  }

  console.error("Stoati: Asset data parsing failed");
  return {
    ...data,
    data: {
      text: "",
    },
  };
};

export const convertToMarkdownData = (
  data: ProductAttribute,
  locale: "fr-FR"
) => {
  if (data.type !== "markdown") {
    console.error("Stoati: Given data doesn't have the good type (markdown)");
    return {
      ...data,
      data: { markdown: "" },
    };
  }

  const parseResult = z
    .array(
      z.object({
        locale: z.string(),
        value: z.string(),
      })
    )
    .safeParse(data.data);

  if (parseResult.success) {
    const localizedValue = parseResult.data.find(
      (item) => item.locale === locale
    );

    if (localizedValue) {
      return {
        ...data,
        data: {
          markdown: localizedValue.value,
        },
      };
    }

    console.error("Stoati: No value have been found with this locale");
    return {
      ...data,
      data: {
        markdown: "",
      },
    };
  }

  console.error("Stoati: Asset data parsing failed");
  return {
    ...data,
    data: {
      markdown: "",
    },
  };
};

export const convertToAssetData = (data: ProductAttribute) => {
  if (data.type !== "asset") {
    console.error("Stoati: Given data doesn't have the good type (asset)");
    return {
      ...data,
      data: { url: "" },
    };
  }

  const parseResult = z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .safeParse(data.data);

  if (parseResult.success) {
    return {
      ...data,
      data: {
        url: parseResult.data[0].url,
      },
    };
  }

  console.error("Stoati: Asset data parsing failed");
  return {
    ...data,
    data: {
      url: "",
    },
  };
};

export const convertToScheduleData = (data: ProductAttribute) => {
  if (data.type !== "schedule") {
    console.error("Stoati: Given data doesn't have the good type (schedule)");
    return null;
  }

  const parseResult = Schedule.safeParse(data.data);

  if (parseResult.success) {
    return parseResult.data;
  }

  console.error("Stoati: Schedule data parsing failed");
  return null;
};

export const convertToGeolocationData = (data: ProductAttribute) => {
  if (data.type !== "geolocation") {
    console.error(
      "Stoati: Given data doesn't have the good type (geolocation)"
    );
    return null;
  }

  const parseResult = ProductAttributeGeolocationData.safeParse(data.data);

  if (parseResult.success) {
    return parseResult.data;
  }

  console.error("Stoati: geolocation data parsing failed");
  return null;
};

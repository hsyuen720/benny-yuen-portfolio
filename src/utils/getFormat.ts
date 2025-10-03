import { getLocale } from "next-intl/server";

import { Languages } from "~/settings/i18n";
import type { ValueOf } from "~/types/common";
import type { ITranslation } from "~/types/data";

const getFormat = async () => {
  const locale = await getLocale();

  type FormatReturnType<T> = T extends ITranslation[] ? string[] : string;
  const format = <T extends ITranslation | ITranslation[]>(data: T) => {
    const toValue = (value: ITranslation) => {
      return value[locale as ValueOf<typeof Languages>] ?? value[Languages.English];
    };
    return (Array.isArray(data) ? data.map(toValue) : toValue(data)) as FormatReturnType<T>;
  };

  return format;
};

export default getFormat;

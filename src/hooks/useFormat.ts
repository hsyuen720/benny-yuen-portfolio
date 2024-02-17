import { useLocale } from "next-intl";

import { Languages } from "~/settings/i18n";
import { ValueOf } from "~/types/common";
import { ITranslation } from "~/types/data";

const useFormat = () => {
  const locale = useLocale();

  type FormatReturnType<T> = T extends ITranslation[] ? string[] : string;
  const format = <T extends ITranslation | ITranslation[]>(data: T) => {
    const toValue = (value: ITranslation) => {
      return value[locale as ValueOf<typeof Languages>] ?? value[Languages.English];
    };
    return (Array.isArray(data) ? data.map(toValue) : toValue(data)) as FormatReturnType<T>;
  };

  return format;
};
export default useFormat;

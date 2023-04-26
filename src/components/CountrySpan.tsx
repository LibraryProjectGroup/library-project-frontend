// @ts-ignore
import * as countries from "iso-3166-1-codes";
import { CSSProperties, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  countryCode: string;
  includeFlag: boolean;
  imgCss?: CSSProperties;
}>;

export default function CountrySpan(props: Props): JSX.Element {
  const { countryCode, includeFlag, children, imgCss } = props;

  if (!countryCode || countryCode === "XXX") {
    return <span>Unknown</span>;
  }
  const countryData = countries.byAlpha3().get(countryCode);
  if (!includeFlag) {
    return <span>{children ? children : countryData.name}</span>;
  }

  return (
    <>
      <img
        src={`https://flagcdn.com/${encodeURIComponent(
          countryData.alpha2.toLowerCase()
        )}.svg`}
        width="20"
        style={{ marginRight: "1em", ...imgCss }}
        alt={`Flag of ${countryData.name}`}
      />
      <span>{children ? children : countryData.name}</span>
    </>
  );
}

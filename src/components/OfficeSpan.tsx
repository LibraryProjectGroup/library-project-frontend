// @ts-ignore
import { PropsWithChildren } from "react";
import CountrySpan from "./CountrySpan";

type Props = PropsWithChildren<{
  countryCode: string;
  officeName: string;
}>;

export default function OfficeSpan(props: Props): JSX.Element {
  const { countryCode, officeName } = props;

  if (!countryCode || countryCode === "XXX") {
    return <span>{officeName}</span>;
  }
  return (
    <CountrySpan
      countryCode={countryCode}
      includeFlag={true}
      imgCss={{ marginRight: "0.4em" }}
    >
      {officeName}
    </CountrySpan>
  );
}

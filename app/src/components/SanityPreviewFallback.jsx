const FALLBACK_MESSAGE =
  "This field is not filled in Sanity. This message is only visible on the preview link.";

const getFallbackMessage = (fieldTitle) =>
  fieldTitle
    ? `This field (\`${fieldTitle}\`) is not filled in Sanity. This message is only visible on the preview link.`
    : FALLBACK_MESSAGE;

const hasPortableTextValue = (blocks) =>
  blocks.some((block) =>
    Array.isArray(block?.children)
      ? block.children.some((child) => typeof child?.text === "string" && child.text.trim() !== "")
      : true
  );

export const isSanityPreviewEnvironment = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

export const hasSanityValue = (value) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    if (value.every((item) => typeof item === "string")) return value.some((item) => item.trim() !== "");
    return hasPortableTextValue(value);
  }
  if (typeof value === "string") return value.trim() !== "";
  return value !== null && value !== undefined;
};

export const hasMissingSanityData = (...values) => values.some((value) => !hasSanityValue(value));

export const shouldShowSanityPreviewFallback = (...values) =>
  isSanityPreviewEnvironment && hasMissingSanityData(...values);

export default function SanityPreviewFallback({ as: Element = "div", className = "", fieldTitle, children }) {
  if (!isSanityPreviewEnvironment) return null;

  return (
    <Element
      className={className}
      style={{
        display: "inline",
        fontSize: "0.65rem",
        lineHeight: 1,
        opacity: 0.65,
      }}
    >
      {children || getFallbackMessage(fieldTitle)}
    </Element>
  );
}

export function SanityPreviewValue({ value, children, as = "span", className = "", fieldTitle }) {
  if (hasSanityValue(value)) return children || value;

  return <SanityPreviewFallback as={as} className={className} fieldTitle={fieldTitle} />;
}

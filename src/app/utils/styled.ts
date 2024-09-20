import { createElement } from "react"
import { twMerge } from "tailwind-merge"

const elements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "u",
  "ul",
  "use",
  "var",
  "video",
  "wbr",
] as const

type SupportedHTMLElements = (typeof elements)[number]

type StyledComponent<T extends SupportedHTMLElements> = (classes?: string) => {
  (props: React.ComponentPropsWithoutRef<T>): JSX.Element
}

type Styled = {
  <T extends SupportedHTMLElements>(tag: T): StyledComponent<T>
} & {
  [T in SupportedHTMLElements]: StyledComponent<T>
}

/** Create a styled component for the given HTML tag. */
export const styled = (<T extends SupportedHTMLElements>(tag: T) =>
  (classes) => {
    return function StyledComponent({ children, className, ...props }) {
      return createElement(
        tag,
        {
          className: className ? twMerge(classes, className) : classes,
          ...props,
        },
        children,
      )
    }
  }) as Styled

// Add the shorthand methods for each element we support (e.g, styled.p, styled.div, etc.)
for (const element of elements) {
  styled[element] = styled(element)
}
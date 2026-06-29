import sanitizeHtmlLib from "sanitize-html";

const sanitizeOptions: sanitizeHtmlLib.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr", "blockquote",
    "ul", "ol", "li",
    "strong", "em", "b", "i", "u", "s", "mark", "small", "sub", "sup",
    "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td",
    "pre", "code", "span", "div",
  ],
  allowedAttributes: {
    "a": ["href", "title", "class", "id"],
    "img": ["src", "alt", "title", "width", "height", "loading", "class"],
    "div": ["class", "id", "style"],
    "span": ["class", "id", "style"],
    "p": ["class", "id"],
    "h1": ["class", "id"], "h2": ["class", "id"], "h3": ["class", "id"],
    "h4": ["class", "id"], "h5": ["class", "id"], "h6": ["class", "id"],
    "ul": ["class"], "ol": ["class"], "li": ["class"],
    "blockquote": ["class"],
    "pre": ["class"], "code": ["class"],
    "table": ["class"], "thead": [], "tbody": [], "tfoot": [],
    "tr": [], "th": ["colspan", "rowspan", "scope"], "td": ["colspan", "rowspan"],
    "strong": [], "em": [], "b": [], "i": [], "u": [], "s": [],
    "mark": [], "small": [], "sub": [], "sup": [],
    "figure": ["class"], "figcaption": ["class"], "hr": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
};

export function sanitizeHTML(dirty: string): string {
  return sanitizeHtmlLib(dirty, sanitizeOptions);
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

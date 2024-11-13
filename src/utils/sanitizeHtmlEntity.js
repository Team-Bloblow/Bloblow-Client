const sanitizeHtmlEntity = (string) => {
  if (typeof string !== "string") {
    return "";
  }

  return string
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&quot;", `"`)
    .replaceAll("&#035;", "#")
    .replaceAll("&#039;", `'`)
    .replaceAll("&sim;", "~");
};

export default sanitizeHtmlEntity;

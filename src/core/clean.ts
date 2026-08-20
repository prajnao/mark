import DOMPurify from "dompurify";


export function removeFrontMatter(markdown:string):string{
    const frontMatterRegex =  /^---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(\r?\n|$)/;
    return markdown.replace( frontMatterRegex, '');

}

export function purifyHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true, svg: true, svgFilters: true },
    ADD_TAGS: ["input"],
    ADD_ATTR: ["id", "type", "checked", "disabled", "target", "rel", "start","class","data-lang"],
    FORBID_TAGS: ["iframe", "object", "embed", "form", "style"],
    FORBID_ATTR: ["style", "onerror", "onload"],
  });
}
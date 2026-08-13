export interface TocItem {
    id: string;
    text: string;
    level: number;
  }
  
  export function getHeadings(root: HTMLElement): TocItem[] {
    const nodes = root.querySelectorAll<HTMLHeadingElement>(
      "h1, h2, h3, h4"
    );
  
    return Array.from(nodes).map((node) => ({
      id: node.id,
      text: node.textContent?.trim() ?? "",
      level: Number(node.tagName[1]),
    }));
  }
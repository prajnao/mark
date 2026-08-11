import markdownIt from "markdown-it";
import { slugify } from "./slugify";


const md=new markdownIt({
    html:true,
    linkify:true,
    breaks:false
})


md.core.ruler.push("heading_id",(state)=>{
    const used=new Map<string,boolean>();
    const tokens=state.tokens;

    for(let i=0;i<tokens.length;i++){
        const token=tokens[i];

        if(token.type!=="heading_open"){
            continue;
        }

        const text=tokens[i+1]?.content ?? "";
        const base=slugify(text);

        const count=Number(used.get(base) ?? 0);
        used.set(base, count>0);
       
        token.attrSet("id", count === 0 ? base : `${base}-${count}`);

    }

    return true;
})


export function renderMarkdown(markdown:string):string{
    return md.render(markdown);
}
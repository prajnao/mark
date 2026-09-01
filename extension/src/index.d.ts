declare module "markdown-it-task-lists" {
  import type MarkdownIt from "markdown-it";

  type MarkdownItInstance = InstanceType<typeof MarkdownIt>;

  interface TaskListsOptions {
    enabled?: boolean;
    label?: boolean;
    labelAfter?: boolean;
  }

  const taskLists: (md: MarkdownItInstance, options?: TaskListsOptions) => void;
  export default taskLists;
}

declare module "markdown-it-footnote" {
  import type MarkdownIt from "markdown-it";

  const footnote: (md: InstanceType<typeof MarkdownIt>) => void;
  export default footnote;
}
import { BlogFile } from '@apptypes';

export const generateFileContent = (file: BlogFile): string => {
  return `${file.boundary} meta

CREATED = ${file.meta.created}
UPDATED = ${file.meta.updated}
TITLE   = ${file.meta.title}
AUTHOR  = ${file.meta.author}
TAGS    = ${file.meta.tags.join(',')}

${file.sections.map(
  (a) =>
    `${file.boundary} ${a.tag}

${a.content}

`
)}

`;
};

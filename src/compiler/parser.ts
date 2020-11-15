import { BlogMetaVariable, BlogFileSection, BlogFileMetaSection, BlogFileMeta, BlogFileContent } from '../types';

export function parseMeta(metaRaw: string): BlogMetaVariable[] {
  const lines = metaRaw.split('\n').filter(Boolean);

  return lines.reduce((acc: BlogMetaVariable[], line: string): BlogMetaVariable[] => {
    const [key, value] = line.split('=');

    if (!value) {
      return acc;
    }

    acc.push({
      key: key.toLowerCase().trim(),
      value: value.trim(),
    });

    return acc;
  }, []);
}

export function createMetaFromSections(sections: BlogFileSection[]): BlogFileMeta {
  const metaSections = sections.filter((a) => a.tag === 'meta') as BlogFileMetaSection[];

  return metaSections.reduce((acc: BlogFileMeta, val: BlogFileMetaSection) => {
    const result = parseMeta(val.content);

    result.forEach((variable) => {
      if (variable.key.toLowerCase() === 'tags') {
        acc[variable.key] = variable.value.split(',').map((a) => a.trim());
      } else {
        acc[variable.key] = variable.value;
      }
    });

    return acc;
  }, {} as BlogFileMeta);
}

export function parseSection(section: string): BlogFileSection {
  const [tag, ...rest] = section.split('\n');

  return {
    tag: tag.trim(),
    content: rest.join('\n').trim(),
  };
}

export function parseContent(contentRaw: string): [BlogFileContent, string] {
  const contentClean = contentRaw.replace('\r\n', '\n').replace('\r', '\n');

  const [boundaryLine] = contentClean.split(' ');
  const [boundary] = boundaryLine.trim().split(' ');

  const sectionsRaw = contentClean.split(boundary).filter(Boolean);

  const sections = sectionsRaw.map(parseSection).filter((a) => !!a.content);
  const meta = createMetaFromSections(sections);

  return [
    {
      meta,
      sections: sections.filter((a) => a.tag !== 'meta'),
    },
    boundary,
  ];
}

import { BlogMetaVariable, BlogFileSection, BlogFileMetaSection, BlogFile } from './types';

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

export function createMetaFromSections(sections: BlogFileSection[]): Record<string, string> {
  const metaSections = sections.filter((a) => a.tag === 'meta') as BlogFileMetaSection[];

  return metaSections.reduce((acc: Record<string, string>, val: BlogFileMetaSection) => {
    const result = parseMeta(val.content);

    result.forEach((variable) => {
      acc[variable.key] = variable.value;
    });

    return acc;
  }, {} as Record<string, string>);
}

export function parseSection(section: string): BlogFileSection {
  const [tag, ...rest] = section.split('\n');

  return {
    tag: tag.trim(),
    content: rest.join('\n').trim(),
  };
}

export function parse(contentRaw: string): BlogFile {
  const contentClean = contentRaw.replace('\r\n', '\n').replace('\r', '\n');

  const [boundaryLine] = contentClean.split(' ');
  const [boundary] = boundaryLine.trim().split(' ');

  const sectionsRaw = contentClean.split(boundary).filter(Boolean);

  const sections = sectionsRaw.map(parseSection).filter((a) => !!a.content);
  const meta = createMetaFromSections(sections);

  return {
    meta,
    sections: sections.filter((a) => a.tag !== 'meta'),
  };
}

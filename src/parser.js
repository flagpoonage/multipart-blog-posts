function parseMeta(metaRaw) {
  const lines = metaRaw.split('\n').filter(Boolean);

  return lines
    .map((line) => {
      const [key, value] = line.split('=');

      if (!value) {
        return null;
      }

      return {
        key: key.toLowerCase().trim(),
        value: value.trim(),
      };
    })
    .filter(Boolean);
}

function createMetaFromSections(sections) {
  return sections
    .filter((a) => a.tag === 'meta')
    .reduce((acc, val) => {
      const result = parseMeta(val.content);

      result.forEach((variable) => {
        acc[variable.key] = variable.value;
      });

      return acc;
    }, {});
}

function parseSection(section) {
  const [tag, ...rest] = section.split('\n');

  return {
    tag: tag.trim(),
    content: rest.join('\n').trim(),
  };
}

function parse(contentRaw) {
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

module.exports = {
  createMetaFromSections,
  parseSection,
  parseMeta,
  parse,
};

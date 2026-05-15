import { staticPagesData } from "../../data/fallback/staticPagesFallback";

/**
 * @typedef {Object} StaticPageContent
 * @property {string} slug
 * @property {string} title
 * @property {string} subtitle
 * @property {Array<Object>} sections
 */

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function mapTeamMember(member, index) {
  if (!member) return null;
  return {
    id: member.id || `member-${index}`,
    name: member.name || "",
    role: member.role || "",
    quote: member.quote || "",
    avatar: member.avatar || "",
    linkedinUrl: member.linkedinUrl || "",
    extraSocials: toArray(member.extraSocials),
  };
}

function mapTeamSection(section) {
  if (!section) return null;
  return {
    anchorId: section.anchorId || null,
    eyebrow: section.eyebrow || "",
    title: section.title || "",
    subtitle: section.subtitle || "",
    members: toArray(section.members).map(mapTeamMember).filter(Boolean),
  };
}

function mapAlumniPerson(person, index) {
  if (!person) return null;
  return {
    id: person.id || `alumni-${index}`,
    name: person.name || "",
    role: person.role || "",
    imageUrl: person.imageUrl || "",
    socials: toArray(person.socials),
    description: person.description || "",
  };
}

function mapAlumniSection(section) {
  if (!section) return null;
  return {
    anchorId: section.anchorId || null,
    eyebrow: section.eyebrow || "",
    title: section.title || "",
    subtitle: section.subtitle || "",
    people: toArray(section.people).map(mapAlumniPerson).filter(Boolean),
  };
}

function mapSections(sections) {
  return toArray(sections).map((section, index) => ({
    title: section?.title || `Section ${index + 1}`,
    anchorId: section?.anchorId || null,
    points: toArray(section?.points),
  }));
}

export function getStaticPageContent(slug) {
  const page = staticPagesData?.[slug];
  if (!page) return null;

  return {
    slug,
    title: page.title || "",
    subtitle: page.subtitle || "",
    financingOptions: toArray(page.financingOptions),
    aboutSchool: page.aboutSchool || null,
    aboutHighlights: page.aboutHighlights || null,
    schoolKpis: page.schoolKpis || null,
    teamShowcase: mapTeamSection(page.teamShowcase),
    expertsShowcase: mapTeamSection(page.expertsShowcase),
    alumniHall: mapAlumniSection(page.alumniHall),
    sections: mapSections(page.sections),
  };
}

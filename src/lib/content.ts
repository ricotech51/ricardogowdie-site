// Helpers the pages use. Every list here leaves out items marked draft: true,
// so a draft can never reach the built site.
import { getCollection, getEntry } from 'astro:content';

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) => a.data.order - b.data.order;

export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('src/content/site.json is missing.');
  return entry.data;
}

export async function getProjects() {
  return (await getCollection('projects', ({ data }) => !data.draft)).sort(byOrder);
}

export async function getExperience() {
  return (await getCollection('experience', ({ data }) => !data.draft)).sort(byOrder);
}

export async function getArticles() {
  return (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export async function isBlogVisible() {
  const [site, articles] = await Promise.all([getSite(), getArticles()]);
  return articles.length >= site.blogMinArticles;
}

// A case study only gets its own page once its details are written
// (no [PLACEHOLDER] left in the problem or the body). Until then it shows as a card only.
export function hasDetailPage(entry: { body?: string; data: { problem: string } }) {
  const text = `${entry.data.problem}\n${entry.body ?? ''}`;
  return !text.includes('[PLACEHOLDER]') && (entry.body ?? '').trim().length > 0;
}

// The "Download CV" link only shows when the PDF is actually in public/.
export async function resumeExists(resumePath: string) {
  const { existsSync } = await import('node:fs');
  const { join } = await import('node:path');
  return existsSync(join(process.cwd(), 'public', resumePath));
}

// Splits the headline so the emphasis words can be styled.
export function splitEmphasis(text: string, emphasis: string) {
  const i = text.indexOf(emphasis);
  if (i === -1) return { before: text, match: '', after: '' };
  return { before: text.slice(0, i), match: emphasis, after: text.slice(i + emphasis.length) };
}

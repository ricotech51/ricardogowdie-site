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
  const projects = (await getCollection('projects', ({ data }) => !data.draft)).sort(byOrder);
  // Estimated results are for review only. The live site (main branch on
  // Cloudflare Pages) refuses to build while any result is still an estimate.
  if (process.env.CF_PAGES_BRANCH === 'main') {
    const pending = projects
      .filter((p) => isEstimate(p.data.result ?? '') || [p.data.summary, p.data.action, p.data.result, p.data.where].some(hasPlaceholder))
      .map((p) => p.id);
    if (pending.length) {
      throw new Error(`Replace [ESTIMATE: confirm] or [PLACEHOLDER] text in the card fields of: ${pending.join(', ')}`);
    }
  }
  return projects;
}

// A result still waiting for Ricardo to confirm it.
export const ESTIMATE_MARK = '[ESTIMATE: confirm]';
export function isEstimate(text: string) {
  return text.includes(ESTIMATE_MARK);
}
export function withoutEstimateMark(text: string) {
  return text.replace(ESTIMATE_MARK, '').trim();
}

const hasPlaceholder = (text?: string) => !!text && text.includes('[PLACEHOLDER]');
export { hasPlaceholder };

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

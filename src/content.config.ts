// Content rules for the site. If a file is missing a required field or has a
// typo in a field name, `npm run build` stops and tells you which file and field.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Files that start with an underscore (for example _notes.md) are ignored.
const markdownIn = (folder: string) =>
  glob({ pattern: ['**/*.md', '!**/_*'], base: `./src/content/${folder}` });

const projects = defineCollection({
  loader: markdownIn('projects'),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        // Short label shown as the plum tag on the card, e.g. "Segmentation".
        tag: z.string().min(1),
        // 1-2 sentences for the card. End with the result.
        summary: z.string().min(1),
        date: z.coerce.date().optional(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        tech: z.array(z.string()).default([]),
        problem: z.string().min(1),
        action: z.string().min(1),
        result: z.string().min(1),
        liveUrl: z.url().optional(),
        repoUrl: z.url().optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        order: z.number().default(100),
      })
      .strict()
      .refine((p) => !p.cover || !!p.coverAlt, {
        message: 'Add coverAlt (a short description of the image) when you set a cover.',
        path: ['coverAlt'],
      }),
});

const experience = defineCollection({
  loader: markdownIn('experience'),
  schema: ({ image }) =>
    z
      .object({
        company: z.string().min(1),
        role: z.string().min(1),
        location: z.string().optional(),
        startDate: z.coerce.date(),
        // Leave endDate out if this is your current role.
        endDate: z.coerce.date().optional(),
        logo: image().optional(),
        skills: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        order: z.number().default(100),
      })
      .strict()
      .refine((e) => !e.endDate || e.endDate >= e.startDate, {
        message: 'endDate must be after startDate.',
        path: ['endDate'],
      }),
});

const articles = defineCollection({
  loader: markdownIn('articles'),
  schema: z
    .object({
      title: z.string().min(1),
      date: z.coerce.date(),
      // Shown in search results. Aim for about 160 characters.
      description: z.string().min(1).max(300),
      draft: z.boolean().default(false),
    })
    .strict(),
});

// Longer page text that is easier to edit as Markdown than inside site.json.
const pages = defineCollection({
  loader: markdownIn('pages'),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1).max(200),
    })
    .strict(),
});

const link = z.object({ label: z.string().min(1), href: z.string().min(1) }).strict();

const site = defineCollection({
  // site.json is one object, so it is loaded as a single entry with the id "site".
  loader: file('src/content/site.json', {
    parser: (text) => [{ id: 'site', ...JSON.parse(text) }],
  }),
  schema: z
    .object({
      id: z.literal('site'),
      $schema: z.string().optional(),
      name: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1).max(160),
      location: z.string().min(1),
      availability: z.string().min(1),
      email: z.email(),
      bookingUrl: z.url().refine((u) => u.startsWith('https://'), 'bookingUrl must use https.'),
      resumePath: z.string().startsWith('/'),
      social: z.array(link.extend({ href: z.url() })),
      hero: z
        .object({
          headline: z.string().min(1),
          // These words in the headline get the brand-blue + plum-underline emphasis.
          emphasis: z.string().min(1),
          subline: z.string().min(1),
          primaryButton: z.string().min(1),
          secondaryLink: z.string().min(1),
        })
        .strict(),
      credentials: z.array(z.string().min(1)).min(1),
      certifications: z.array(z.string().min(1)).min(1),
      education: z.array(z.string().min(1)),
      recognition: z
        .array(
          z
            .object({ award: z.string().min(1), organization: z.string().min(1), year: z.number().int() })
            .strict(),
        )
        .max(3),
      technologies: z.array(
        z.object({ group: z.string().min(1), items: z.array(z.string().min(1)).min(1) }).strict(),
      ),
      frameworks: z.array(z.string().min(1)).min(1),
      howIWork: z
        .object({
          intro: z.string().min(1).optional(),
          steps: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) }).strict()).min(1),
        })
        .strict(),
      closing: z
        .object({ headline: z.string().min(1), primaryButton: z.string().min(1), secondaryLink: z.string().min(1) })
        .strict(),
      // The Blog link only appears once this many articles are published.
      blogMinArticles: z.number().int().min(1).default(2),
    })
    .strict(),
});

export const collections = { projects, experience, articles, pages, site };

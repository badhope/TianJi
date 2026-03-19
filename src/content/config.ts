import { defineCollection, z } from 'astro:content';

const archiveCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['era', 'cultivation', 'theory']),
    order: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

const medicineCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['classic', 'theory', 'practice']),
    order: z.number().optional(),
  }),
});

const mythCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['beast', 'deity', 'place', 'event']),
    order: z.number().optional(),
  }),
});

const dharmaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tradition: z.enum(['buddhism', 'daoism', 'both']),
    order: z.number().optional(),
  }),
});

const realmsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    realmType: z.enum(['qi', 'body', 'spirit', 'combined']),
    order: z.number().optional(),
  }),
});

export const collections = {
  archive: archiveCollection,
  medicine: medicineCollection,
  myth: mythCollection,
  dharma: dharmaCollection,
  realms: realmsCollection,
};

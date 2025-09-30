import { defineField, defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Benefit Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Benefit Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide icon name',
              validation: Rule => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'icon',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title,
                subtitle: `Icon: ${subtitle}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'promiseBox',
      title: 'Promise Box',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Promise Box Title',
          type: 'string',
        },
        {
          name: 'promises',
          title: 'Promises',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'headerColor',
      title: 'Header Color',
      type: 'string',
      description: 'Controls the gradient color theme used in the header background',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Muted', value: 'muted' },
          { title: 'Background', value: 'background' },
        ],
        layout: 'dropdown'
      },
      initialValue: 'primary'
    }),
    defineField({
      name: 'badge',
      title: 'Top Badge',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Badge Text',
          type: 'string',
        },
        {
          name: 'icon',
          title: 'Icon Name',
          type: 'string',
          description: 'Lucide icon name (e.g., "zap", "clock", "shield")',
        },
      ],
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'action',
          title: 'Action',
          type: 'string',
          options: {
            list: [
              { title: 'Scroll to Services', value: 'scroll-services' },
              { title: 'External Link', value: 'external' },
              { title: 'Internal Link', value: 'internal' },
            ],
          },
        },
        {
          name: 'url',
          title: 'URL (for external/internal links)',
          type: 'string',
          hidden: ({ parent }) => parent?.action === 'scroll-services',
        },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})

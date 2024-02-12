import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: ({ theme }) => ({
        simple: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-lead': theme('colors.black'),
            '--tw-prose-links': theme('colors.black'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.black'),
            '--tw-prose-bullets': theme('colors.gray[500]'),
            '--tw-prose-hr': theme('colors.gray[500]'),
            '--tw-prose-quotes': theme('colors.gray[600]'),
            '--tw-prose-quote-borders': theme('colors.gray[300]'),
            '--tw-prose-captions': theme('colors.gray[700]'),
            '--tw-prose-code': theme('colors.gray[900]'),
            '--tw-prose-pre-code': theme('colors.gray[100]'),
            '--tw-prose-pre-bg': theme('colors.gray[900]'),
            '--tw-prose-th-borders': theme('colors.gray[300]'),
            '--tw-prose-td-borders': theme('colors.gray[200]'),
            '--tw-prose-invert-body': theme('colors.paper'),
            '--tw-prose-invert-headings': theme('colors.paper'),
            '--tw-prose-invert-lead': theme('colors.paper'),
            '--tw-prose-invert-links': theme('colors.paper'),
            '--tw-prose-invert-bold': theme('colors.paper'),
            '--tw-prose-invert-counters': theme('colors.paper'),
            '--tw-prose-invert-bullets': theme('colors.gray[500]'),
            '--tw-prose-invert-hr': theme('colors.gray[500]'),
            '--tw-prose-invert-quotes': theme('colors.gray[400]'),
            '--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.gray[100]'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]'),
          },
        },
      }),
		},

		fontFamily: {
			mono: "'Fira Code', monospace",
			text: "'IBM Plex Sans', sans-serif",
		},

		colors: {
			black: '#100F0F',
			paper: '#FFFCF0',
			gray: {
				950: '#1C1B1A',
				900: '#282726',
				850: '#343331',
				800: '#403E3C',
				700: '#575653',
				600: '#6F6E69',
				500: '#878580',
				300: '#B7B5AC',
				200: '#CECDC3',
				150: '#DAD8CE',
				100: '#E6E4D9',
				50: '#F2F0E5',
			},
			red: {
				DEFAULT: '#AF3029',
				light: '#D14D41',
			},
			orange: {
				DEFAULT: '#BC5215',
				light: '#DA702C',
			},
			yellow: {
				DEFAULT: '#AD8301',
				light: '#D0A215',
			},
			green: {
				DEFAULT: '#66800B',
				light: '#879A39',
			},
			cyan: {
				DEFAULT: '#24837B',
				light: '#3AA99F',
			},
			blue: {
				DEFAULT: '#205EA6',
				light: '#4385BE',
			},
			purple: {
				DEFAULT: '#5E409D',
				light: '#8B7EC8',
			},
			magenta: {
				DEFAULT: '#A02F6F',
				light: '#CE5D97',
			},
		},
	},
	plugins: [typography()],
}

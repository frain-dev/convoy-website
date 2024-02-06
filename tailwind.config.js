/** @type {import('tailwindcss').Config} */

function customSpacing() {
	const maxSpace = 384;
	const spaces = {};

	for (let i = 2; i <= maxSpace; ) {
		const value = i + 'px';
		spaces[value] = value;
		i = i + 2;
	}

	return spaces;
}

module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	safelist: ['bg-success-400', 'bg-primary-400', 'bg-danger-400', 'bg-warning-400'],
	theme: {
		extend: {
			spacing: customSpacing(),
			boxShadow: {
				layout: '0px 30px 40px 0px rgba(20, 37, 63, 0.08), 0px 16px 16px 0px rgba(12, 26, 75, 0.05), 0px 16px 16px 0px rgba(12, 26, 75, 0.06)',
				default: '0px 2px 4px rgba(12, 26, 75, 0.04), 0px 4px 20px -2px rgba(50, 50, 71, 0.08)',
				card: '40px 44px 81px rgba(111, 118, 138, 0.08)',
				nav: 'inset 0px -3px 8px rgba(255, 255, 255, 0.07);'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(white 10%, #fafafe78)'
			},
			fontFamily: {
				menlo: ['Menlo Regular'],
				inter: ['Inter']
			}
		},
		fontWeight: {
			thin: '100',
			extralight: '200',
			light: '300',
			normal: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
			extrabold: '800'
		},
		screens: {
			desktop: { min: '1024px' },
			'desktop-min': { min: '1248px' },
			'tab-min': { max: '768px' },
			'index-animation-min': { min: '1445px' },
			'index-animation-max': { min: '2087px' },
			'nav-bar-break': { min: '1055px' },
			md: { min: '1288px' },
			'md-max': { max: '1288px' },
			mobile: { max: '1054px' },
			footer: { max: '630px' },
			xs: { max: '425px' },
			tab: { max: '1287px', min: '880px' },
			'doc-tab': { min: '768px' }
		},
		borderRadius: {
			'2px': '2px',
			'4px': '4px',
			'6px': '6px',
			'8px': '8px',
			'10px': '10px',
			'12px': '12px',
			'16px': '16px',
			'22px': '22px',
			'100px': '100px',
			'50%': '50%'
		},
		fontSize: {
			10: ['10px', '150%'],
			12: ['12px', '20px'],
			14: ['14px', '22px'],
			16: ['16px', '24px'],
			18: ['18px', '30px'],
			20: ['20px', '30px'],
			24: ['24px', '35px'],
			26: ['26px', '36px'],
			28: ['28px', '38px'],
			30: ['30px', '46px'],
			32: ['32px', '48px'],
			36: ['32px', '48px'],
			h1: ['34px', '140%'],
			h2: ['24px', '140%'],
			h3: ['20px', '140%'],
			h4: ['18px', '140%'],
			h5: ['16px', '140%'],
			h6: ['14px', '140%']
		},
		colors: {
			primary: {
				25: '#EDF2F7',
				50: '#DAE5F0',
				100: '#B5CBE1',
				200: '#91B1D1',
				300: '#6699CC',
				400: '#477DB3',
				500: '#2E6399',
				600: '#194D80',
				700: '#0A3866',
				800: '#00264D',
				900: '#001A33,'
			},
			success: {
				25: '#F6FEF9',
				50: '#ECFDF3',
				100: '#D1FADF',
				200: '#A6F4C5',
				300: '#6CE9A6',
				400: '#32D583',
				500: '#12B76A',
				600: '#039855',
				700: '#027A48',
				800: '#05603A,',
				900: '#054F31,'
			},
			danger: {
				25: '#FFFBFA',
				50: '#FEF3F2',
				100: '#FEE4E2',
				200: '#FECDCA',
				300: '#FDA29B',
				400: '#F97066',
				500: '#F04438',
				600: '#D92D20',
				700: '#B42318',
				800: '#912018,',
				900: '#7A271A,'
			},
			warning: {
				25: '#FFFCF5',
				50: '#FFFAEB',
				100: '#FEF0C7',
				200: '#FEDF89',
				300: '#FEC84B',
				400: '#FDB022',
				500: '#F79009',
				600: '#DC6803',
				700: '#B54708',
				800: '#93370D,',
				900: '#7A2E0E,'
			},
			gray: {
				25: '#FCFCFD',
				50: '#F9FAFB',
				100: '#F2F4F7',
				200: '#E4E7EC',
				300: '#D0D5DD',
				400: '#98A2B3',
				500: '#667085',
				600: '#475467',
				700: '#344054',
				800: '#1D2939',
				900: '#101828',
				normal: 'var(--gray-normal)',
				light: 'var(--gray-light)',
				strong: 'var(--gray-strong)'
			},
			grey: {
				100: '#000624',
				80: '#31323D',
				60: '#5F5F68',
				40: '#737A91',
				20: '#E8E8E9',
				10: '#EDEDF5'
			},
			white: {
				100: 'rgba(var(--color-white), 1)',
				64: 'rgba(var(--color-white), 0.64)',
				40: 'rgba(var(--color-white), 0.40)',
				24: 'rgba(var(--color-white), 0.24)',
				16: 'rgba(var(--color-white), 0.16)',
				8: 'rgba(var(--color-white), 0.08)',
				4: 'rgba(var(--color-white), 0.04)'
			},
			'light-blue': '#F8FBFF',
			transparent: 'transparent'
		}
	},
	plugins: []
};

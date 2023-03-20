const defaultTheme = require('tailwindcss/defaultTheme');

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
	mode: 'jit',
	content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
	theme: {
		extend: {
			spacing: customSpacing(),
			boxShadow: {
				sm: '0px 2px 8px rgba(12, 26, 75, 0.08), 0px 3px 8px -1px rgba(50, 50, 71, 0.05)',
				md: '0px 15px 50px rgba(21, 37, 72, 0.05)',
				default: '0px 2px 4px rgba(12, 26, 75, 0.04), 0px 4px 20px -2px rgba(50, 50, 71, 0.08)',
				card: '40px 44px 81px rgba(111, 118, 138, 0.08)',
				nav: 'inset 0px -3px 8px rgba(255, 255, 255, 0.07);'
			},
			fontFamily: {
				menlo: ['Menlo Regular', ...defaultTheme.fontFamily.sans],
				inter: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		},
		screens: {
			'index-animation-min': { min: '1405px' },
			'index-animation-max': { min: '2087px' },
			desktop: { min: '880px' },
			md: { min: '1240px' },
			mobile: { max: '879px' },
			xs: { max: '425px' }
		},
		borderRadius: {
			'2px': '2px',
			'4px': '4px',
			'6px': '6px',
			'8px': '8px',
			'10px': '10px',
			'12px': '12px',
			'16px': '16px',
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
			h1: ['34px', '140%'],
			h2: ['24px', '140%'],
			h3: ['20px', '140%'],
			h4: ['18px', '140%'],
			h5: ['16px', '140%'],
			h6: ['14px', '140%']
		},
		colors: {
			grey: {
				100: '#000624',
				80: '#31323D',
				60: '#5F5F68',
				40: '#737A91',
				20: '#f3f3f8',
				10: '#EDEDF5'
			},
			white: {
				100: 'rgba(var(--color-white), 1)',
				64: 'rgba(var(--color-white), 0.64)',
				40: 'rgba(var(--color-white), 0.40)',
				24: 'rgba(var(--color-white), 0.24)',
				16: 'rgba(var(--color-white), 0.16)',
				10: 'rgba(var(--color-white), 0.1)',
				8: 'rgba(var(--color-white), 0.08)',
				4: 'rgba(var(--color-white), 0.04)'
			},
			primary: {
				100: '#477DB3',
				200: '#7EA4CA',
				300: '#A3BED9',
				400: '#C8D8E8',
				500: '#EDF2F7'
			},
			success: {
				100: '#25C26E',
				200: '#66D49A',
				300: '#92E1B7',
				400: '#BEEDD4',
				500: '#E9F9F1'
			},
			danger: {
				100: '#FF554A',
				200: '#FF8880',
				300: '#FF9992',
				400: '#FFCCC9',
				500: '#FFEEED'
			},
			warning: {
				100: '#F0AD4E',
				200: '#F3BD71',
				300: '#F6CE95',
				400: '#FBE6CA',
				500: '#FEF7ED'
			},
			secondary: '#32587D',
			purple: '#5A53B3',
			'dark-green': '#327D63',
			'light-green': '#47B38D',
			black: '#16192C',
			transparent: 'transparent'
		},
		keyframes: {
			slideup: {
				'0%': { opacity: '0', 'pointer-events': 'none' },
				'100%': { opacity: '1', 'pointer-events': 'auto' }
			},
			slidedown: {
				'0%': { opacity: '1', 'pointer-events': 'auto' },
				'100%': { opacity: '0', 'pointer-events': 'none' }
			}
		},
		animation: {
			slideup: 'slideup .4s ease-in-out',
			slidedown: 'slidedown .4s ease-in-out'
		}
	},
	plugins: []
};

import React from 'react';
import './App.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import MySnackbar from './shared/component/snackbar/MySnackbar';
import { store } from './core/store/_helpers';
import { Main } from './component/main/Main.';
import { interceptorsSetter } from './core/interceptors/interceptorsSetter';

const theme = createMuiTheme({
	direction: 'rtl',
	palette: {
		primary: {
			main: '#0288d1',
			light: '#5eb8ff',
			dark: '#005b9f'
		},
		secondary: {
			main: '#5a6abf',
			light: '#8d98f2',
			dark: '#23408e'
		}
	},
	overrides: {
		MuiMenuItem: {
			root: {
				'&:hover': {
					backgroundColor: '#8d98f2',
					fontSize: 'large',
				}
			}
		},
		MuiListItem: {
			button: {
				'&:hover': {
					backgroundColor: '#8d98f2',
					color: 'white',
				}
			}
		}
	}
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function MyStyleProvider(props) {
	return (
		<StylesProvider jss={jss}>
			{props.children}
		</StylesProvider>
	);
}
function App() {
	interceptorsSetter()
	return (
		<LocalizeProvider>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<MyStyleProvider>
						<MySnackbar></MySnackbar>
						<Main name='hAmed' />
					</MyStyleProvider>
				</ThemeProvider>
			</Provider>
		</LocalizeProvider>
	);
}

export default App;

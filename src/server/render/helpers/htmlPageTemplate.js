import serialize from 'serialize-javascript';
import renderStaticLinks from './renderStaticLinks';

export const createHtmlPage = (renderedApp, extractor, store, spriteContent) => {
  const appState = store.getState();
  const { htmlLang } = appState.app;

  return `
		<html lang="${htmlLang}">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5" />
				<meta property="og:site_name" content="" />
				<meta property="og:locale" content="${htmlLang.replace('-', '_')}" />
				<meta property="og:type" content="website" />
				<meta name="format-detection" content="telephone=no">
				${renderStaticLinks()}
				${extractor.getStyleTags()}
			</head>
			<body>
			  ${spriteContent}
				<div id="root">${renderedApp}</div>
				${extractor.getScriptTags()}
				<script charSet="UTF-8">
					window.__INITIAL_STATE__=${serialize(appState, { isJSON: true })}
				</script>
			</body>
		</html>
	`.replace(/[\t|\n]/g, '');
};

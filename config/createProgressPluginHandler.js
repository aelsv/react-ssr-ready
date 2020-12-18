/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
// temporary crunch for fix webpack problem with ProgressPlugin
/* eslint-disable */
module.exports = function createDefaultHandler() {
	let lineCaretPosition = 0;
	let lastMessage = '';

	const defaultHandler = (percentage, msg, ...args) => {
		const details = args.filter(v => v.length);
		const maxLineLength = process.stderr.columns || Infinity;
		if (percentage < 1) {
			percentage = Math.floor(percentage * 100);
			msg = `${percentage}% ${msg}`;
			if (percentage < 100) {
				msg = ` ${msg}`;
			}
			if (percentage < 10) {
				msg = ` ${msg}`;
			}

			if (details.length) {
				const maxTotalDetailsLength = maxLineLength - msg.length;
				const totalDetailsLength = details.reduce(
					(a, b) => a + b.length,
					details.length // account for added space before each detail text
				);
				const maxDetailLength =
					totalDetailsLength < maxTotalDetailsLength
						? Infinity
						: Math.floor(maxTotalDetailsLength / details.length);

				for (let detail of details) {
					if (!detail) continue;
					if (detail.length + 1 > maxDetailLength) {
						const truncatePrefix = '...';
						detail = `${truncatePrefix}${detail.substr(-(maxDetailLength - truncatePrefix.length - 1))}`;
					}
					msg += ` ${detail}`;
				}
			}
		}

		if (lastMessage !== msg) {
			goToLineStart(msg);
			msg = msg.substring(0, maxLineLength);
			process.stderr.write(msg);
			lastMessage = msg;
		}
	};

	const goToLineStart = nextMessage => {
		let str = '';
		for (; lineCaretPosition > nextMessage.length; lineCaretPosition--) {
			str += '\b \b';
		}
		for (let i = 0; i < lineCaretPosition; i++) {
			str += '\b';
		}
		lineCaretPosition = nextMessage.length;
		if (str) process.stderr.write(str);
	};

	return defaultHandler;
};

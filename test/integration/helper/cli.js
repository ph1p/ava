const path = require('path');
const execa = require('execa');

const entrypoint = path.resolve(__dirname, '../../../cli.js');

// TODO: Fake TTY for mini reporter

exports.run = async ({cwd, args = [], env = {}, nodeOptions = [], reject = true}) => {
	return execa.node(entrypoint, args, {
		cwd,
		env: {
			NODE_NO_WARNINGS: '1',
			...env
		},
		nodeOptions,
		reject
	});
};

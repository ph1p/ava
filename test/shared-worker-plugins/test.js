const path = require('path');
const test = require('@ava/stable');
const execa = require('execa');

test('shared worker plugins work', async t => {
	const result = await execa.node(path.resolve('./cli.js'), {cwd: path.join(__dirname, 'fixture')});
	t.is(result.exitCode, 0);
	t.regex(result.stdout, /2 tests passed/);
});

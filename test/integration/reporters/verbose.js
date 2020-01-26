const path = require('path');
const test = require('@ava/self-test');

const cli = require('../helper/cli');

// TODO: Extract into a helper for use with mini and tap reporter tests.
const runAndSnapshot = async (t, fixture, additionalArgs = []) => {
	const {stderr, stdout} = await cli.run({
		args: ['--color', '--verbose', ...additionalArgs, `${fixture}/*`],
		cwd: path.join(__dirname, 'fixture'),
		nodeOptions: ['--require', path.join(__dirname, 'helper/fix-main.js')],
		reject: false
	});
	// TODO: Normalize across Node.js versions and platforms.
	// TODO: Control in what order test files are executed, to get stable output that can be snapshotted. Perhaps using https://www.npmjs.com/package/knuth-shuffle-seeded
	t.snapshot(stderr, 'stderr');
	t.snapshot(stdout, 'stdout');
};

runAndSnapshot.title = (_, fixture) => fixture;

test.failing(runAndSnapshot, 'edgecases');
test.failing(runAndSnapshot, 'failfast', ['--fail-fast', '--serial']);
test.failing(runAndSnapshot, 'failfast2', ['--fail-fast', '--serial']);
test.failing(runAndSnapshot, 'only');
test.failing(runAndSnapshot, 'regular');
test(runAndSnapshot, 'timeoutinmultiplefiles');
test(runAndSnapshot, 'timeoutinsinglefile');
test(runAndSnapshot, 'timeoutwithmatch', ['--match', '*needle*']);
test.todo('watch mode');

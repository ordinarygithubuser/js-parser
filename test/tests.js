import Runner from 'test-runner';
import Parser from './parser';
import Scanner from './scanner';

const suites = [
    Scanner(Runner),
    Parser(Runner)
];

suites.map(suite => {
    suite.run();
    suite.log();
});
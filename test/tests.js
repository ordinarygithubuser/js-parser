import ParserSuite from './parser';
import ScannerSuite from './scanner';

let suites = [
    ScannerSuite, ParserSuite
];

suites.map(suite => {
    suite.run();
    suite.log();
    console.log();
});
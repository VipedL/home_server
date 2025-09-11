"use strict";
/**
 * Miscellaneous shared functions go here.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tick = exports.getRandomInt = void 0;
/**
 * Get a random number between 1 and 1,000,000,000,000
 */
function getRandomInt() {
    return Math.floor(Math.random() * 1000000000000);
}
exports.getRandomInt = getRandomInt;
/**
 * Wait for a certain number of milliseconds.
 */
function tick(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}
exports.tick = tick;

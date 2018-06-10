/**
 * Helper to prevent some boilerplate when formulating questions regarding the license
 *
 * @param name
 * @param message
 * @returns {{type: string, name: *, message: *}}
 */
exports.getBooleanQuestion = ({name, message}) => ({
    type: 'confirm',
    name,
    message,
});

/**
 * Calculates a score based on the answers given to the second question.
 *
 * Every time one of the answers value equals the attribute with the same
 * name in the attributes hash for a license, we assign one point to such
 * license.
 *
 * @param attributes - The attributes hash for a given license
 * @param answer - The answer being evaluated
 * @return {number}
 */
exports.calculateScore = ({ attributes, answer }) => {
    return Object
        .entries(attributes)
        .reduce((score, [key, value]) => {
            if (answer[key] === value) {
                score = score + 1;
            }
            return score;
        }, 0);
};

/**
 * Sorts an array Array<[name, score]> by score in descending order
 *
 * @param a
 * @param b
 * @return {number}
 */
exports.sortDescendingByScore = (a, b) => {
    if (a[1] > b[1]) {
        return -1;
    } else if (a[1] < b[1]) {
        return 1;
    } else {
        return 0;
    }
};

/**
 * Returns true is the score, in an Array<[name, score]>, is greater
 * than zero
 *
 * @param item
 * @return {boolean}
 */
exports.purgeScoreZero = (item) => item[1] > 0;

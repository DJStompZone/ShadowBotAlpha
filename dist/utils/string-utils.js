import removeMarkdown from 'remove-markdown';
export class StringUtils {
    static truncate(input, length, addEllipsis = false) {
        if (input.length <= length) {
            return input;
        }
        let output = input.substring(0, addEllipsis ? length - 3 : length);
        if (addEllipsis) {
            output += '...';
        }
        return output;
    }
    static stripMarkdown(input) {
        return removeMarkdown(input);
    }
}
//# sourceMappingURL=string-utils.js.map
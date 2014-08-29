var cssSelectorParser = require('css-selector-parser').CssSelectorParser;
var selectorParser = new cssSelectorParser();

module.exports = function plugin (option) {
    option = option || {};
    var connection = option.connection || "-";

    return function (css) {
        css.eachAtRule(function (atRule, i) {
            if (atRule.name === 'prefix') {
                atRule.rules.forEach(function (rule) {
                    if (rule.type === 'rule') {
                        if (isClassSelector(rule.selector)) {
                            rule.selector = "." + atRule.params + connection + selectorParser.parse(rule.selector).rule.classNames[0];
                        }
                        if (isIdSelector(rule.selector)) {
                            rule.selector = "#" + atRule.params + connection + selectorParser.parse(rule.selector).rule.id;
                        }
                    }
                });
            }

            if (atRule.name === 'suffix') {
                atRule.rules.forEach(function (rule) {
                    if (rule.type === 'rule') {
                        if (isClassSelector(rule.selector)) {
                            rule.selector = "." + selectorParser.parse(rule.selector).rule.classNames[0] + connection + atRule.params;
                        }
                        if (isIdSelector(rule.selector)) {
                            rule.selector = "#" + selectorParser.parse(rule.selector).rule.id + connection + atRule.params;
                        }
                    }
                });
            }
        });
    }
}

function isClassSelector (selector) {
    if (selectorParser.parse(selector).rule.classNames) return true;
}

function isIdSelector (selector) {
    if (selectorParser.parse(selector).rule.id) return true;
}

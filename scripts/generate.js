const { readFile } = require('fs').promises;
const { join } = require('path');
const { Type, DEFAULT_SCHEMA, load } = require('js-yaml');
const tinycolor = require('tinycolor2');

const withAlphaType = new Type('!alpha', {
    kind: 'sequence',
    construct: ([hexRGB, alpha]) => hexRGB + alpha,
    represent: ([hexRGB, alpha]) => hexRGB + alpha,
});

const schema = DEFAULT_SCHEMA.extend([withAlphaType]);

// Recursive function to replace Dracula's red (#FF5555) with soft red (#ff7a7a)
function replaceErrors(obj) {
    if (typeof obj === 'string') {
        if (obj.toLowerCase().startsWith('#ff5555')) {
            return '#ff7a7a' + obj.substring(7);
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(replaceErrors);
    }
    if (obj && typeof obj === 'object') {
        const result = {};
        for (const key of Object.keys(obj)) {
            result[key] = replaceErrors(obj[key]);
        }
        return result;
    }
    return obj;
}

function createTMNTTheme(baseTheme, name, keywordColor, identifierColor, jsxComponentColor) {
    // 1. Deep clone base theme
    const theme = JSON.parse(JSON.stringify(baseTheme));

    // 2. Set name and semanticClass
    theme.name = name;
    theme.semanticClass = `theme.tmnt-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // 3. Remove nulls and falsey values from colors
    for (const key of Object.keys(theme.colors)) {
        if (!theme.colors[key]) {
            delete theme.colors[key];
        }
    }

    // 4. Replace errors with softer red (#ff7a7a)
    const errorTheme = replaceErrors(theme);

    // 5. Append TMNT specific scope overrides at the end of tokenColors
    errorTheme.tokenColors.push(
        {
            name: "TMNT Keywords Override",
            scope: [
                "keyword",
                "keyword.control",
                "keyword.operator",
                "storage.type",
                "storage.modifier"
            ],
            settings: {
                foreground: keywordColor
            }
        },
        {
            name: "TMNT Identifiers Override",
            scope: [
                "entity.name.function",
                "entity.name.type",
                "entity.name.class",
                "variable.other.readwrite",
                "support.function"
            ],
            settings: {
                foreground: identifierColor
            }
        },
        {
            name: "TMNT JSX/TSX Components Override",
            scope: [
                "support.class.component",
                "entity.name.tag.custom"
            ],
            settings: {
                foreground: jsxComponentColor
            }
        }
    );

    // 6. Set semantic token colors
    errorTheme.semanticHighlighting = true;
    errorTheme.semanticTokenColors = {
        "keyword": keywordColor,
        "keyword.control": keywordColor,
        "type": identifierColor,
        "class": identifierColor,
        "function": identifierColor,
        "method": identifierColor,
        "variable": identifierColor
    };

    return errorTheme;
}

module.exports = async () => {
    const yamlFile = await readFile(
        join(__dirname, '..', 'src', 'dracula.yml'),
        'utf-8'
      );

    const base = load(yamlFile, { schema });

    const tmntBase = createTMNTTheme(base, "TMNT (base)", "#e8a87c", "#69cf8e", "#6fb3e0");
    const leonardo = createTMNTTheme(base, "TMNT Leonardo", "#6fb3e0", "#a8e6c0", "#e8a87c");
    const raphael = createTMNTTheme(base, "TMNT Raphael", "#e06c75", "#69cf8e", "#6fb3e0");
    const michelangelo = createTMNTTheme(base, "TMNT Michelangelo", "#e8a87c", "#69cf8e", "#6fb3e0");
    const donatello = createTMNTTheme(base, "TMNT Donatello", "#c792ea", "#69cf8e", "#6fb3e0");

    return {
        tmnt: tmntBase,
        leonardo,
        raphael,
        michelangelo,
        donatello
    };
};

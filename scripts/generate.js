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



function createTMNTTheme(baseTheme, name, bandanaColor, skinGreenColor, htmlTagColor, jsxComponentColor) {
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

    // Color mappings from Dracula to specific Turtle palette
    const mapping = {
        '#ff79c6': bandanaColor,     // PINK (Keywords, HTML tags, etc.) -> Bandana Color
        '#50fa7b': skinGreenColor,    // GREEN (Functions) -> Turtle Skin Green
        '#8be9fd': skinGreenColor,    // CYAN (Types, Classes) -> Turtle Skin Green
        '#ff5555': '#ff7a7a',         // RED (Errors) -> Soft Red
    };

    function replaceColorsRecursive(obj) {
        if (typeof obj === 'string') {
            const lowerVal = obj.toLowerCase();
            for (const [dracHex, tmntHex] of Object.entries(mapping)) {
                if (lowerVal.startsWith(dracHex)) {
                    return tmntHex + obj.substring(7);
                }
            }
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(replaceColorsRecursive);
        }
        if (obj && typeof obj === 'object') {
            const result = {};
            for (const key of Object.keys(obj)) {
                result[key] = replaceColorsRecursive(obj[key]);
            }
            return result;
        }
        return obj;
    }

    const errorTheme = replaceColorsRecursive(theme);

    // 5. Append JSX and HTML tag overrides at the end of tokenColors
    errorTheme.tokenColors.push(
        {
            name: "TMNT HTML Tags Override",
            scope: [
                "entity.name.tag"
            ],
            settings: {
                foreground: htmlTagColor
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
        "keyword": bandanaColor,
        "keyword.control": bandanaColor,
        "type": skinGreenColor,
        "class": skinGreenColor,
        "function": skinGreenColor,
        "method": skinGreenColor,
        "variable": "#f8f8f2"
    };

    return errorTheme;
}

function createTMNTTeamTheme(baseTheme, name) {
    const theme = JSON.parse(JSON.stringify(baseTheme));
    theme.name = name;
    theme.semanticClass = `theme.tmnt-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // Remove nulls and falsey values from colors
    for (const key of Object.keys(theme.colors)) {
        if (!theme.colors[key]) {
            delete theme.colors[key];
        }
    }

    // Color mappings from Dracula to Team TMNT Palette
    const mapping = {
        '#ff79c6': '#6fb3e0', // PINK (Keywords, Tags) -> Leonardo Blue
        '#50fa7b': '#69cf8e', // GREEN (Functions) -> Turtle Green
        '#8be9fd': '#c792ea', // CYAN (Types, Classes) -> Donatello Purple
        '#bd93f9': '#e06c75', // PURPLE (Constants, Numbers) -> Raphael Red
        '#f1fa8c': '#e8a87c', // YELLOW (Strings) -> Michelangelo Orange
        '#ffb86c': '#e8a87c', // ORANGE (Parameters, Attributes) -> Michelangelo Orange
        '#ff5555': '#ff7a7a', // RED (Errors) -> Soft Red
    };

    function replaceColorsRecursive(obj) {
        if (typeof obj === 'string') {
            const lowerVal = obj.toLowerCase();
            for (const [dracHex, tmntHex] of Object.entries(mapping)) {
                if (lowerVal.startsWith(dracHex)) {
                    return tmntHex + obj.substring(7);
                }
            }
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(replaceColorsRecursive);
        }
        if (obj && typeof obj === 'object') {
            const result = {};
            for (const key of Object.keys(obj)) {
                result[key] = replaceColorsRecursive(obj[key]);
            }
            return result;
        }
        return obj;
    }

    const teamTheme = replaceColorsRecursive(theme);

    // Set semantic token colors
    teamTheme.semanticHighlighting = true;
    teamTheme.semanticTokenColors = {
        "keyword": "#6fb3e0",
        "keyword.control": "#6fb3e0",
        "type": "#c792ea",
        "class": "#c792ea",
        "function": "#69cf8e",
        "method": "#69cf8e",
        "variable": "#f8f8f2"
    };

    return teamTheme;
}

module.exports = async () => {
    const yamlFile = await readFile(
        join(__dirname, '..', 'src', 'dracula.yml'),
        'utf-8'
      );

    const base = load(yamlFile, { schema });

    const tmntBase = createTMNTTeamTheme(base, "TMNT (base)");
    const leonardo = createTMNTTheme(base, "TMNT Leonardo", "#6fb3e0", "#69cf8e", "#c792ea", "#e8a87c");
    const raphael = createTMNTTheme(base, "TMNT Raphael", "#e06c75", "#69cf8e", "#6fb3e0", "#c792ea");
    const michelangelo = createTMNTTheme(base, "TMNT Michelangelo", "#e8a87c", "#69cf8e", "#c792ea", "#6fb3e0");
    const donatello = createTMNTTheme(base, "TMNT Donatello", "#c792ea", "#69cf8e", "#6fb3e0", "#e8a87c");

    return {
        tmnt: tmntBase,
        leonardo,
        raphael,
        michelangelo,
        donatello
    };
};

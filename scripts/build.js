const fs = require('fs');
const path = require('path');
const generate = require('./generate');

const THEME_DIR = path.join(__dirname, '..', 'theme');

if (!fs.existsSync(THEME_DIR)) {
    fs.mkdirSync(THEME_DIR);
}

module.exports = async () => {
    const themes = await generate();

    return Promise.all(
        Object.entries(themes).map(([key, themeData]) => {
            const fileName = key === 'tmnt' ? 'tmnt.json' : `tmnt-${key}.json`;
            return fs.promises.writeFile(
                path.join(THEME_DIR, fileName),
                JSON.stringify(themeData, null, 4)
            );
        })
    );
};

if (require.main === module) {
    module.exports();
}

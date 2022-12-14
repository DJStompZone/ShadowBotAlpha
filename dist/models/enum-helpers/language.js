import { Locale } from 'discord.js';
export class Language {
    static find(input, enabled) {
        return this.findMultiple(input, enabled, 1)[0];
    }
    static findMultiple(input, enabled, limit = Number.MAX_VALUE) {
        let langCodes = enabled ? this.Enabled : Object.values(Locale).sort();
        let search = input.toLowerCase();
        let found = new Set();
        // Exact match
        if (found.size < limit)
            langCodes
                .filter(langCode => langCode.toLowerCase() === search)
                .forEach(langCode => found.add(langCode));
        if (found.size < limit)
            langCodes
                .filter(langCode => this.Data[langCode].nativeName.toLowerCase() === search)
                .forEach(langCode => found.add(langCode));
        if (found.size < limit)
            langCodes
                .filter(langCode => this.Data[langCode].nativeName.toLowerCase() === search)
                .forEach(langCode => found.add(langCode));
        if (found.size < limit)
            langCodes
                .filter(langCode => this.Data[langCode].englishName.toLowerCase() === search)
                .forEach(langCode => found.add(langCode));
        // Starts with search term
        if (found.size < limit)
            langCodes
                .filter(langCode => langCode.toLowerCase().startsWith(search))
                .forEach(langCode => found.add(langCode));
        if (found.size < limit)
            langCodes
                .filter(langCode => this.Data[langCode].nativeName.toLowerCase().startsWith(search))
                .forEach(langCode => found.add(langCode));
        if (found.size < limit)
            langCodes
                .filter(langCode => this.Data[langCode].englishName.toLowerCase().startsWith(search))
                .forEach(langCode => found.add(langCode));
        // Includes search term
        if (found.size < limit)
            langCodes
                .filter(langCode => langCode.toLowerCase().startsWith(search))
                .forEach(langCode => found.add(langCode));
        if (found.size < limit)
            langCodes
                .filter(langCode => this.Data[langCode].nativeName.toLowerCase().startsWith(search))
                .forEach(langCode => found.add(langCode));
        if (found.size < limit)
            langCodes
                .filter(langCode => this.Data[langCode].englishName.toLowerCase().startsWith(search))
                .forEach(langCode => found.add(langCode));
        return [...found];
    }
}
Language.Default = Locale.EnglishUS;
Language.Enabled = [Locale.EnglishUS, Locale.EnglishGB];
Language.Data = {
    bg: { englishName: 'Bulgarian', nativeName: '??????????????????' },
    cs: { englishName: 'Czech', nativeName: '??e??tina' },
    da: { englishName: 'Danish', nativeName: 'Dansk' },
    de: { englishName: 'German', nativeName: 'Deutsch' },
    el: { englishName: 'Greek', nativeName: '????????????????' },
    'en-GB': { englishName: 'English, UK', nativeName: 'English, UK' },
    'en-US': { englishName: 'English, US', nativeName: 'English, US' },
    'es-ES': { englishName: 'Spanish', nativeName: 'Espa??ol' },
    fi: { englishName: 'Finnish', nativeName: 'Suomi' },
    fr: { englishName: 'French', nativeName: 'Fran??ais' },
    hi: { englishName: 'Hindi', nativeName: '??????????????????' },
    hr: { englishName: 'Croatian', nativeName: 'Hrvatski' },
    hu: { englishName: 'Hungarian', nativeName: 'Magyar' },
    it: { englishName: 'Italian', nativeName: 'Italiano' },
    ja: { englishName: 'Japanese', nativeName: '?????????' },
    ko: { englishName: 'Korean', nativeName: '?????????' },
    lt: { englishName: 'Lithuanian', nativeName: 'Lietuvi??kai' },
    nl: { englishName: 'Dutch', nativeName: 'Nederlands' },
    no: { englishName: 'Norwegian', nativeName: 'Norsk' },
    pl: { englishName: 'Polish', nativeName: 'Polski' },
    'pt-BR': { englishName: 'Portuguese, Brazilian', nativeName: 'Portugu??s do Brasil' },
    ro: { englishName: 'Romanian, Romania', nativeName: 'Rom??n??' },
    ru: { englishName: 'Russian', nativeName: 'P????????????' },
    'sv-SE': { englishName: 'Swedish', nativeName: 'Svenska' },
    th: { englishName: 'Thai', nativeName: '?????????' },
    tr: { englishName: 'Turkish', nativeName: 'T??rk??e' },
    uk: { englishName: 'Ukrainian', nativeName: '????????????????????' },
    vi: { englishName: 'Vietnamese', nativeName: 'Ti???ng Vi???t' },
    'zh-CN': { englishName: 'Chinese, China', nativeName: '??????' },
    'zh-TW': { englishName: 'Chinese, Taiwan', nativeName: '????????????' },
};
//# sourceMappingURL=language.js.map
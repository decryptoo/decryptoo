import * as _ from 'lodash';

class Util {
    public static parse(text: string): object {
        const lines = text.split(/[\n\r]/g);
        return lines.reduce((result: object, line: string) => {
            const pair: string[] = line.split('=').map(_.trim);
            if (pair.length === 2) {
                result[pair[0]] = pair[1];
            }
            return result;
        }, {});
    }

    public static decorate(css: string, theme: string, config: object): void {
        document.querySelectorAll('style.app').forEach(node => node.remove());
        const style = document.createElement('style');
        style.className = 'app';
        style.innerHTML = css.replace(/theme-[a-zA-Z-]+/g, property => config[property] ||
            console.warn(`property ${property} not found in theme ${theme}`));
        document.head.append(style);
    }
}

class Cache {
    public css: string;
    public theme: string;
    public themes: { [theme: string]: object } = {};

    constructor() {
        this.css = require('../../css/app.styl');
        this.theme = 'light';
        this.themes.light = Util.parse(require('../../css/theme/light.styl'));
        this.themes.dark = Util.parse(require('../../css/theme/dark.styl'));
    }
}

class Manager {
    private cache = new Cache();

    public theme(name: string) {
        const {css, themes} = this.cache;
        const found = themes[name] !== undefined;
        if (found) {
            this.cache.theme = name;
        }
        const theme = this.cache.theme;
        const config = themes[theme];
        Util.decorate(css, theme, config);
    }
}

const manager = new Manager();

// tslint:disable-next-line
window['theme'] = theme => {
    manager.theme(theme);
};

export default class Theme {
    public static use(theme: string) {
        manager.theme(theme);
    }
}

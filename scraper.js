const cheerio = require('cheerio');
const fetch = require('node-fetch');
const _ = require('lodash');
const { compose, map, reduce } = require('lodash/fp');

/**
 * Returns a functions that takes a guid and finds the associated category display name
 * in the selectNode element provided to getStatNameFromDropdown.
 * 
 * @param {Cheerio Element} selectNode The select node to look up category guids in.
 */
function getStatNameFromDropdown(selectNode) {
    return function getStatFromGuid(guid) {
        return selectNode.children(`[value="${guid}"]`).text();
    }
}

/**
 * Given a container element, grab all top hero stats data from its children.
 * @param {Cheerio Element} playtypeContainer Can either be the quickplay or competitive container.
 */
function getTopHeroStats(playtypeContainer) {
    const topHeroNodes = playtypeContainer.find("section.hero-comparison-section .progress-category[data-group-id=comparisons]");
    const getTopHeroCategoryName = compose(
        getStatNameFromDropdown,
        cheerio
    )('select[data-group-id=comparisons]', playtypeContainer);

    const heroNodeToObject = compose(
        heroNode => ({
            hero: heroNode('.title').text(),
            value: heroNode('.description').text()
        }),
        cheerio.load.bind(cheerio)
    );

    function buildTopHeroesObject(topHeroes, topHeroNode) {
        const node = cheerio.load(topHeroNode);
        const heroes = node('.progress-category-item');
        const statCategory = getTopHeroCategoryName(topHeroNode.attribs['data-category-id']);

        topHeroes[statCategory] = map(heroNodeToObject)(heroes);
        return topHeroes;
    }

    return reduce(buildTopHeroesObject)({})(topHeroNodes);
}

/**
 * Given a container element, grab all career stats data from its children.
 * @param {Cheerio Element} playtypeContainer
 */
function getCareerStats(playtypeContainer) {
    const statsNodes = playtypeContainer.find("section.career-stats-section div[data-group-id=stats]");
    const getStatsCategoryName = compose(
        getStatNameFromDropdown,
        cheerio
    )('select[data-group-id=stats]', playtypeContainer);

    const makeHeroStatsPair = compose(
        row => [row.find('td:nth-child(1)').text(), row.find('td:nth-child(2)').text()],
        cheerio
    );

    function buildCareerStatsObject(careerStats, statsNode) {
        const heroStatsNode = cheerio(statsNode);
        const statsRows = heroStatsNode.find('tbody > tr').toArray();
        const heroStatsPairs = map(makeHeroStatsPair)(statsRows);

        const category = getStatsCategoryName(heroStatsNode.attr('data-category-id'));

        careerStats[category] = _.fromPairs(heroStatsPairs);
        return careerStats;
    }

    return reduce(buildCareerStatsObject)({})(statsNodes);
}

/**
 * Consumes a Promise that resolves to an HTML string.
 * 
 * Extracts Overwatch Player stats and information from the documents and
 * returns those stats as an object.
 * 
 * @param {Promise} document A Promise that resolves to an HTML string.
 */
function getStatsFromDocument(document) {
    // Always make document asynchronous.
    document = Promise.resolve(document);

    return document.then(doc => {
        const parsed = {};
        const $ = cheerio.load(doc);

        const gamesWonText = $(".masthead-detail span").text().match(/\d+/);
        const playerMasthead = $(".masthead-player");
        const quickplayContainer = $("#quickplay");
        const competitiveContainer = $("#competitve");

        parsed.hero = playerMasthead.children(".header-masthead").text();
        parsed.image = playerMasthead.children(".player-portrait").prop('src');
        parsed.platform = $("#profile-platforms").text();
        parsed.games_won = parseInt(gamesWonText, 10);

        parsed.quickplay = {
            top_heroes: getTopHeroStats(quickplayContainer),
            career_stats: getCareerStats(quickplayContainer)
        }
        parsed.competitive = {
            top_heroes: getTopHeroStats(competitiveContainer),
            career_stats: getCareerStats(competitiveContainer)
        }

        return parsed;
    });
}

function getPage(url) {
    return fetch(url).then(res => res.text());
}

function buildUrl(battletag, region, platform) {
    battletag = battletag.replace("#", "-");
    return `https://playoverwatch.com/${region}/career/${platform}/${battletag}`;
}

module.exports = compose(getStatsFromDocument, getPage, buildUrl);
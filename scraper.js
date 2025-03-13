const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        // Extract all <h1> headings
        const headings = [];
        $('h1').each((index, element) => {
            headings.push($(element).text().trim());
        });

        // Extract all links
        const links = [];
        $('a').each((index, element) => {
            links.push($(element).attr('href'));
        });

        // Extract all <title> tags
        const titles = [];
        $('title').each((index, element) => {
            titles.push($(element).text().trim());
        });

        // Extract all images
        const images = [];
        $('img').each((index, element) => {
            images.push($(element).attr('src'));
        });

        return { headings, links, titles, images };
    } catch (error) {
        throw new Error('Error fetching website');
    }
}

module.exports = scrapeWebsite;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const header = [
    { id: 'tokenID', title: 'tokenID' },
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'file_name', title: 'file_name' },
    { id: 'external_url', title: 'external_url' },
    { id: 'attributes[Rarity]', title: 'attributes[Rarity]' },
];

let number_nft = 1;

let data = [];


const generateData = (rarity, sets, name) => {
    for (let i = 1; i <= sets; i++) {
        const imageUrl = `https://ipfs.io/ipfs/QmXVQRQqt8ETzLWSmUsWoFwSfrTUoF92PdJaedR4K7AYk9/${name}`;

        const current_metadata = {
            tokenID: `${number_nft}`,
            name: `HyperViciouZ #${number_nft}`,
            description: `the next generation of digital sneakers`,
            file_name: `${name}`,
            external_url: imageUrl,
            'attributes[Rarity]': `${rarity}`,
        };

        data.push(current_metadata);

        number_nft++;
    }
};

const generateCSV = () => {
    const patterns = [
        {
            rarity: 'Epic', sets: 10, name: 'dragonboot.gif'
        },
        {
            rarity: 'Epic', sets: 15, name: 'hellini.gif'
        },
        {
            rarity: 'Rare', sets: 20, name: 'pepepumps.gif'
        },
        {
            rarity: 'Rare', sets: 25, name: 'ritzriser.gif'
        },
        {
            rarity: 'Uncommon', sets: 50, name: 'chromix.gif'
        },
        {
            rarity: 'Uncommon', sets: 50, name: 'bytebunny.gif'
        },
        {
            rarity: 'Uncommon', sets: 50, name: 'hyperbooster.gif'
        },
        {
            rarity: 'Common', sets: 100, name: 'kaleidos.gif'
        },
        {
            rarity: 'Common', sets: 100, name: 'titanstomps.gif'
        },
        {
            rarity: 'Common', sets: 100, name: 'rawchicken.gif'
        },
    ];



    for (let i = 0; i < patterns.length; i++) {
        generateData(patterns[i].rarity, patterns[i].sets, patterns[i].name);
    }

    const csvWriter = createCsvWriter({
        path: './output/output.csv',
        header: header,
    });

    csvWriter.writeRecords(data)
        .then(() => console.log('CSV file written successfully'))
        .catch((err) => console.error(err));

};

generateCSV();

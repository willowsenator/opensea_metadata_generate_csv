const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const header = [
    { id: 'tokenID', title: 'tokenID' },
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'file_name', title: 'file_name' },
    { id: 'external_url', title: 'external_url' },
    { id: 'attributes[Edition]', title: 'attributes[Edition]' },
];

let number_nft = 1;

let data = [];


const generateData = (edition, sets) => {
    for (let i = 1; i <= sets; i++) {
        const imageUrl = `ipfs://QmXqz9jfAVFV12G2sSr2Ks3qinwygxYtZheQdQbCwXrGYa/${edition} (${i}).png`;

        const current_metadata = {
            tokenID: `${number_nft}`,
            name: `FEEBO #${number_nft}`,
            description: `The "perfect" collection. Inspired by Fibonacci's sequence`,
            file_name: `${edition} (${i}).png`,
            external_url: imageUrl,
            'attributes[Edition]': `${edition}`,
        };

        data.push(current_metadata);

        number_nft++;
    }
};

const generateCSV = () => {
    const patterns = [
        {
            edition: 1, sets: 233
        },
        {
            edition: 2, sets: 466
        },
        {
            edition: 5, sets: 1165
        },
        {
            edition: 13, sets: 3029
        },
        {
            edition: 34, sets: 7922
        },
    ];



    for (let i = 0; i < patterns.length; i++) {
        generateData(patterns[i].edition, patterns[i].sets);
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

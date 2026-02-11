// src/config/env.ts
export const ENV = {
    loginURL: 'https://login.salesforce.com/',
    baseURL: 'https://orgfarm-55d03ab499-dev-ed.develop.lightning.force.com/lightning/page/home',

    storageStatePath: 'storage/storageState.json',

    urls: {
        home: '/lightning/page/home',
        leadsHome: '/lightning/o/Lead/list'
    },
    timeouts: {
        short: 5000,
        medium: 10000,
        long: 30000,
    },
};
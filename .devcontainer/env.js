const { promises: { lookup } } = require('dns');
const { hostname } = require('os');
const { writeFile } = require('fs/promises');

lookup(hostname(), 4).then(({ address }) => writeFile('.devcontainer/.env', `REACT_NATIVE_PACKAGER_HOSTNAME=${address}`));
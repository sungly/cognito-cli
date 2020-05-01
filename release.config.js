module.exports = {
    branch: 'master',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/npm',
        '@semantic-release/github',
        [
            '@semantic-release/git',
            {
                message:
                    'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}', // eslint-disable-line
                assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
            },
        ],
    ],
};

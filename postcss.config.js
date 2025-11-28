module.exports = {
  packagerConfig: {
    ignore: [/node_modules\/\.vite/, /out\/renderer/]
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg'
    },
    {
      name: '@electron-forge/maker-zip'
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: { owner: 'Joy43', name: 'Desktop_Application' },
        prerelease: false,
        draft: true
      }
    }
  ]
}

module.exports = {
  packagerConfig: {},

  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    }
  ],

  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Joy43',
          name: 'Desktop_Application'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
}

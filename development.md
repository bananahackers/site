---
title: Developer resources
nav_order: 4
---
# Developer resources
{:.no_toc}

## Getting started on KaiOS development

- KaiOS Technologies' [Official documentation portal](https://developer.kaiostech.com)
- KaiOS Technologies' [List of recommended resources for developing KaiOS apps](https://www.kaiostech.com/learn-to-develop-for-the-kaios-operating-system-with-these-resources)
- [W3schools.com](https://w3schools.com) for learning to code HTML5, CSS and JavaScript and make KaiOS apps
- [YOUR FIRST APP, a little tutorial on how a KaiOS application works](https://sites.google.com/view/bananahackers/development/your-first-app) on BananaHackers website
    - A summary of this page has been archived in the Wiki: [YOUR FIRST APP](/development/your-first-app)
- farooqkz's [A not so brief introduction to KaiOS and app development for it](https://blog.bananahackers.net/farooqkz/a-not-so-brief-introduction-to-kaios-and-app-development-for-it) on BananaHackers Blog
- [KaiOS Game Development Tutorials – Complete Guide](https://gamedevacademy.org/kaios-game-development-tutorials)
- u/tbrrss's [KaiOS development blog](https://kaios.dev)
- Huzaifa Arif's [KaiOS: Everything you need to know!](https://medium.com/proximity-labs/kaios-everything-you-need-to-know-383bd0c3d081) on Proximity Labs/Medium
- Nolan Lawson's [The joy and challenge of developing for KaiOS](https://nolanlawson.com/2019/09/22/the-joy-and-challenge-of-developing-for-kaios)

## API documentations

- [List of B2G device APIs](https://contest-server.cs.uchicago.edu/ref/JavaScript/developer.mozilla.org/en-US/docs/Archive/B2G_OS/API.html)
    - A summary of this page has been archived in the Wiki: [Device APIs](/development/device-api)
- [Can I Use utility](https://caniuse.com) to check API compatibility with v2.5 (Gecko 48.0a1) or v3 (Gecko 84)
- [KaiAds SDK implementing instructions](https://www.kaiads.com/publishers/sdk.html)

### Snippets

- Interacting with files on device storage: [delete a file](device-api/device-storage/delete-file), [rename a file](device-api/device-storage/rename-file), [create new file](device-api/device-storage/create-new-file), [list files](device-api/device-storage/list-files) and [update a file](device-api/device-storage/update-file)
- Managing user interactions of [soft-keys](keys-file) (you can [simulate those](simulate-softkeys) while testing as well)
- Creating a quick [toast](toaster) or a longer-lasting [notification](notification)
- [Getting the version number](get-version-number) so your app knows what the phone is capable of and what feature to deliver
- Get to know [mozActivity and webActivity](mozActivity-webActivity)

## Testing your app (KaiOS 2.5)

- Include your app details in a good [`manifest.webapp`](/development/manifest)
- [Martin Kaptein's guide to sideloading apps on KaiOS](https://kaptein.me/blog/sideloading-and-deploying-apps-to-kai-os/) ([video by KaiOS Technologies](https://www.youtube.com/watch?v=wI-HW2cLrew))
    - Looking for a beginner-friendly version of this guide? [WebIDE](/development/webide)
- [Debugging service workers on KaiOS](/development/debugging-service-workers-on-kaios)
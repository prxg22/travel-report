# travel-report
![img](https://img.shields.io/github/package-json/v/prxg22/travel-report/master.svg?label=version&style=plastic)

[Firebase](https://firebase.google.com) RTD's helper to manage travels and it's tickets reports

## Quick Start

```
 $ npm install @prxg22/travel-report
```

```js
  const tr = require('@prxg22/travel-report')
  const admin = require('firebase-admin')

  admin.initializeApp(/** YOUR CONFIG **/)

  const { Travel, Report } = tr(admin)

  /// ...

  Travel.save({ from, to, adults, departure, round })
```

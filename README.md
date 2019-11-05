<br />
<p align="center">
  <a href="https://github.com/cdvel/url-shortenr">    
  	<h3 align="center">✂️ URL Shortenr</h3>
  </a>
  <p align="center">
		Store and resolve shortened urls Firebase<br />
<!--     <a href="https://github.com/cdvel/url-shortenr"><strong>Explore the docs »</strong></a>
 -->    <br />
    <br />
    <a href="https://shortenr.web.app">View Demo</a>
    ·
    <a href="https://github.com/cdvel/url-shortenr/issues">Report Bug</a>
    ·
    <a href="https://github.com/cdvel/url-shortenr/issues">Request Feature</a>
  </p>
</p>


## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project


The classic URL shortening/redirecting service using free resources from Firebase (cloud functions, firestore, hosting). 

![url shortener](https://user-images.githubusercontent.com/10421005/65597591-129b4980-dfcc-11e9-953f-5ec59b6e26e2.png)


### Built With

* [Firebase](https://firebase.google.com/)
* [Node](https://nodejs.org/)
* [Baseguide](https://basegui.de)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
```sh
npm install npm@latest -g
```

* Firebase CLI
```sh
npm install -g firebase-tools
```

* Login
```sh
firebase login
```

### Installation
 
1. Clone the repo
```sh
git clone https:://github.com/cdvel/url-shortenr.git
```
2. Install NPM packages
```sh
npm install
```
3. Create  and use your firebase project: url-shortener
```sh
firebase projects:create
$ url-shortener

firebase use url-shortener
```

4. Update unique hosting site on firebase.json (ex. https://shortenr.web.app)
```json
  "hosting": {
    "site": "shortenr",

```

5. Set your authorized google email to access the shortener with
```sh
firebase functions:config:set authorized.email="your-email@gmail.com"
```

6. Deploy
```sh
firebase deploy
```



<!-- USAGE EXAMPLES -->
## Usage

1. Copy and paste a long URL and click "Shorten ✂️"
2. A shortened URL such as `https://shortenr.web.app/SH0RT` is generated
3. A list of all shortened URLS can be found at https://console.firebase.google.com/u/0/project/`{your-project}`/storage


<!-- _For more examples, please refer to the [Documentation](https://shortenr.web.app)_ -->



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/cdvel/url-shortenr/issues) for a list of proposed features (and known issues).



<!-- LICENSE -->
## License

Distributed under the Apache License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

[https://twitter.com/cdvel](https://twitter.com/cdvel)

[https://github.com/cdvel/url-shortenr](https://github.com/cdvel/url-shortenr)

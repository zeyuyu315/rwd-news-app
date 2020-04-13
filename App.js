const express = require('express');
const app = express();
const url = require('url');
const cors = require('cors');
const axios = require('axios');

const defaultImageGuardian = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
const defaultImageNYT = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
const guardianKey = "49eb3a87-aeba-4157-80ff-61a971410175";
const nytimesKey = "ZUGyEz9Dc1ACeCCr4AvRGi4uElSiungB";
const guardian = "https://content.guardianapis.com/";
const nytimes = "https://api.nytimes.com/svc/";

app.use(cors());

app.get('/:newspaper/:section', (req, res) => {
  let url;
  if (req.params.newspaper === "guardian") {
    url = guardian;
    if (req.params.section === "home") {
      url += `search?api-key=${guardianKey}&section=(sport|business|technology|politics)&show-blocks=all`;
    } else {
      let section = req.params.section;
      if (req.params.section === "sports") {
        section = "sport";
      }
      url += `${section}?api-key=${guardianKey}&show-blocks=all`;
    }
  } else {
    url = nytimes + "topstories/v2/";
    if (req.params.section === "home") {
      url += `home.json?api-key=${nytimesKey}`;
    } else {
      url += `${req.params.section}.json?api-key=${nytimesKey}`;
    }
  }
  axios.get(url)
  .then(function (response) {
    // handle success
    let data = response.data;
    let results = req.params.newspaper === "guardian" ? data.response.results : data.results;
    let selected = [];
    let image;
    for (let i = 0; i < results.length; i++) {
      try {
        if (req.params.newspaper === "guardian") {
          let assets = results[i].blocks.main.elements[0].assets;
          image = assets[assets.length - 1].file;
        } else {
          for (let  j= 0; j < results[i].multimedia.length; j++) {
            let width = results[i].multimedia[j].width;
            if (width >= 2000) {
              image = results[i].multimedia[j].url;
              break;
            }
          }
          if (!image) {
            image = defaultImageNYT;
          }
        }
      } catch (e) {
        image = req.params.newspaper === "guardian" ? defaultImageGuardian : defaultImageNYT;
      }
      let id;
      let title;
      let section;
      let date;
      let description;
      let url;
      try {
        id = req.params.newspaper === "guardian" ? results[i].id : results[i].url;
        title = req.params.newspaper === "guardian" ? results[i].webTitle : results[i].title;
        section = req.params.newspaper === "guardian" ? results[i].sectionId : results[i].section;
        date = req.params.newspaper === "guardian" ? results[i].webPublicationDate : results[i].published_date;
        date = date.slice(0, 10);
        description = req.params.newspaper === "guardian" ? results[i].blocks.body[0].bodyTextSummary : results[i].abstract;
        url = req.params.newspaper === "guardian" ? results[i].webUrl : results[i].url;
      } catch (e) {
        continue;
      }
      let result = {
        id: id,
        title: title,
        image: image,
        section: section,
        date: date,
        description: description,
        url: url
      }
      selected.push(result);
      if (selected.length >= 10) {
        break;
      }
    }
    res.send(selected);
  })
  .catch(function (error) {
    console.log(error);
  });
});

app.get('/:newspaper/article/:id(*+)', (req, res) => {

  let url;
  let id = req.params.newspaper === "guardian" ? req.params.id : encodeURIComponent(req.params.id);
  if (req.params.newspaper === "guardian") {
    url = guardian + `${id}?api-key=${guardianKey}&show-blocks=all`;
  } else {
    url = nytimes + `search/v2/articlesearch.json?fq=web_url:("${id}")&api-key=${nytimesKey}`;
  }

  axios.get(url)
  .then(function (response) {
    // handle success
    let data = response.data;
    let results = req.params.newspaper === "guardian" ? data.response.content : data.response.docs[0];
    let title = req.params.newspaper === "guardian" ? results.webTitle : results.headline.main;
    let image;
    try {
      if (req.params.newspaper === "guardian") {
        let assets = results.blocks.main.elements[0].assets;
        image = assets[assets.length - 1].file;
      } else {
        for (let i = 0; i < results.multimedia.length; i++) {
          let width = results.multimedia[i].width;
          if (width >= 2000) {
            image = "https://nyt.com/" + results.multimedia[i].url;
            break;
          }
        }
        if (!image) {
          image = defaultImageNYT;
        }
      }
    } catch (e) {
      image = req.params.newspaper === "guardian" ? defaultImageGuardian : defaultImageNYT;
    }
    let date = req.params.newspaper === "guardian" ? results.webPublicationDate : results.pub_date;
    date = date.slice(0, 10);
    let section = req.params.newspaper === "guardian" ? results.sectionId : results.section_name;
    let description = req.params.newspaper === "guardian" ? results.blocks.body[0].bodyTextSummary : results.abstract;
    let url = req.params.newspaper === "guardian" ? results.webUrl : results.web_url;

    let selected = {
      title: title,
      image: image,
      date: date,
      section: section,
      description: description,
      url: url
    };
    res.send(selected);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  
});

app.get('/:newspaper/search/:query(*+)', (req, res) => {

  let url;
  let query = req.params.query;
  if (req.params.newspaper === "guardian") {
    url = guardian + `search?q=${query}&api-key=${guardianKey}&show-blocks=all`;
  } else {
    url = nytimes + `search/v2/articlesearch.json?q=${query}&api-key=${nytimesKey}`;
  }

  axios.get(url)
  .then(function (response) {
    // handle success
    let data = response.data;
    let results = req.params.newspaper === "guardian" ? data.response.results : data.response.docs
    let selected = [];
    let image;
    for (let i = 0; i < results.length; i++) {
      try {
        if (req.params.newspaper === "guardian") {
          let assets = results[i].blocks.main.elements[0].assets;
          image = assets[assets.length - 1].file;
        } else {
          for (let  j= 0; j < results[i].multimedia.length; j++) {
            let width = results[i].multimedia[j].width;
            if (width >= 2000) {
              image = "https://nyt.com/" + results[i].multimedia[j].url;
              break;
            }
          }
          if (!image) {
            image = defaultImageNYT;
          }
        }
      } catch (e) {
        image = req.params.newspaper === "guardian" ? defaultImageGuardian : defaultImageNYT;
      }
      let id;
      let title;
      let section;
      let date;
      let url;
      try {
        id = req.params.newspaper === "guardian" ? results[i].id : results[i].web_url;
        title = req.params.newspaper === "guardian" ? results[i].webTitle : results[i].headline.main;
        section = req.params.newspaper === "guardian" ? results[i].sectionId : results[i].news_desk;
        date = req.params.newspaper === "guardian" ? results[i].webPublicationDate : results[i].pub_date;
        date = date.slice(0, 10);
        url = req.params.newspaper === "guardian" ? results[i].webUrl : results[i].web_url;
      } catch (e) {
        continue;
      }
      let result = {
        id: id,
        title: title,
        image: image,
        date: date,
        section: section,
        url: url
      };
      selected.push(result);
      if (selected.length >= 10) {
        break;
      }
    }
    res.send(selected);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
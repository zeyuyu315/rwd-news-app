const express = require('express');
const app = express();
const url = require('url');
const cors = require('cors');
const axios = require('axios');
const googleTrends = require('google-trends-api');

const defaultImageGuardian = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
const defaultImageNYT = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
const guardianKey = "49eb3a87-aeba-4157-80ff-61a971410175";
const nytimesKey = "ZUGyEz9Dc1ACeCCr4AvRGi4uElSiungB";
const guardian = "https://content.guardianapis.com/";
const nytimes = "https://api.nytimes.com/svc/";
const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

app.use(cors());

app.get('/:newspaper/:section', (req, res) => {
  let url;
  if (req.params.newspaper === "guardian") {
    url = guardian;
    if (req.params.section === "home") {
      url += `search?api-key=${guardianKey}&section=(sport|business|technology|politics)&show-blocks=all`;
    } else {
      let section = req.params.section;
      if (section.toLowerCase() === "sports" || section.toLowerCase() === "sport") {
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
        section = req.params.newspaper === "guardian" ? results[i].sectionName : results[i].section;
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
    let section = req.params.newspaper === "guardian" ? results.sectionName : results.section_name;
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

app.get('/IOShomepage', (req, res) => {
  let url = 'https://content.guardianapis.com/search?orderby=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=49eb3a87-aeba-4157-80ff-61a971410175';
  axios.get(url)
  .then(function (response) {
    // handle success
    let results = response.data.response.results;
    let selected = [];
    for (let i = 0; i < results.length; i++) {
      let image = results[i].fields.thumbnail ? results[i].fields.thumbnail : defaultImageGuardian
      let title;
      let time;
      let section;
      let id;
      let url;
      try {
        title = results[i].webTitle
        time = results[i].webPublicationDate
        section = results[i].sectionName
        id = results[i].id
        url = results[i].webUrl
      } catch (e) {
        continue;
      }
      let current = new Date()
      let diff = (current.getTime() - new Date(time).getTime()) / 1000
      if (diff < 60) {
        diff = Math.round(diff) + "s ago"
      } else if (diff < 3600) {
        diff = Math.round(diff/ 60) + "m ago"
      } else {
        diff = Math.round(diff/ (60 * 60)) + "h ago"
      }
      let current_datetime = new Date(time)
      current_datetime.setHours(current_datetime.getHours() - 7)
      time = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
      let result = {
        image: image,
        title: title,
        section: section,
        id: id,
        time: time,
        url: url,
        diff: diff
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

app.get('/IOSarticle/:id(*+)', (req, res) => {
  let id = req.params.id;
  let url = guardian + `${id}?api-key=${guardianKey}&show-blocks=all`;

  axios.get(url)
  .then(function (response) {
    // handle success
    let data = response.data;
    let results = data.response.content
    let title = results.webTitle
    let assets = results.blocks.main.elements[0].assets;
    let image;
    try {
      image = assets[assets.length - 1].file
    } catch(e) {
      image = ""
    }
    let originalDate = results.webPublicationDate
    let current_datetime = new Date(originalDate)
    current_datetime.setHours(current_datetime.getHours() - 7)
    let date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
    let section = results.sectionName;
    let description = ""
    let body = results.blocks.body
    for (let i = 0; i < body.length; i++) {
      description += body[i].bodyHtml;
    }
    let url = results.webUrl;
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

app.get('/IOStrend/query/:query', (req, res) => {
  let query = req.params.query;
  let startDate = new Date("2019-06-01");
  let values = [];
  googleTrends.interestOverTime({
    keyword: query,
    startTime: startDate
  })
  .then(function(results){
    results = JSON.parse(results)
    timelineData = results.default.timelineData
    for (let i = 0; i < timelineData.length; i++) {
      values.push(timelineData[i].value[0])
    }
    res.send(values)
  })
  .catch(function(err){
    console.error('Oh no there was an error', err);
  });
});

app.get('/IOSsearch/IOSresults/:query(*+)', (req, res) => {
  let query = req.params.query;
  let url = guardian + `search?q=${query}&api-key=${guardianKey}&show-blocks=all`;

  axios.get(url)
  .then(function (response) {
    // handle success
    let data = response.data;
    let results = data.response.results;
    let selected = [];
    for (let i = 0; i < results.length; i++) {
      let image;
      try {
          let assets = results[i].blocks.main.elements[0].assets;
          image = assets[assets.length - 1].file;
      } catch (e) {
        image = defaultImageGuardian;
      }
      let id;
      let title;
      let time;
      let section;
      let url;
      try {
        title = results[i].webTitle
        time = results[i].webPublicationDate
        section = results[i].sectionName
        id = results[i].id
        url = results[i].webUrl
      } catch (e) {
        continue;
      }
      let current = new Date()
      let diff = (current.getTime() - new Date(time).getTime()) / 1000
      if (diff < 60) {
        diff = Math.round(diff) + "s ago"
      } else if (diff < 3600) {
        diff = Math.round(diff/ 60) + "m ago"
      } else {
        diff = Math.round(diff/ (60 * 60)) + "h ago"
      }
      let current_datetime = new Date(time)
      current_datetime.setHours(current_datetime.getHours() - 7)
      time = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
      let result = {
        image: image,
        title: title,
        section: section,
        id: id,
        time: time,
        url: url,
        diff: diff
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


app.get('/:section', (req, res) => {
  let url = guardian;
  let section = req.params.section.toLowerCase()
  if (section === "sports") {
    section = "sport";
  }
  url += `${section}?api-key=${guardianKey}&show-blocks=all`;
  axios.get(url)
  .then(function (response) {
    // handle success
    let data = response.data;
    let results = data.response.results;
    let selected = [];
    for (let i = 0; i < results.length; i++) {
      let image;
      try {
          let assets = results[i].blocks.main.elements[0].assets;
          image = assets[assets.length - 1].file;
      } catch (e) {
        image = defaultImageGuardian;
      }
      let id;
      let title;
      let time;
      let section;
      let url;
      try {
        title = results[i].webTitle
        time = results[i].webPublicationDate
        section = results[i].sectionName
        id = results[i].id
        url = results[i].webUrl
      } catch (e) {
        continue;
      }
      let current = new Date()
      let diff = (current.getTime() - new Date(time).getTime()) / 1000
      if (diff < 60) {
        diff = Math.round(diff) + "s ago"
      } else if (diff < 3600) {
        diff = Math.round(diff/ 60) + "m ago"
      } else {
        diff = Math.round(diff/ (60 * 60)) + "h ago"
      }
      let current_datetime = new Date(time)
      current_datetime.setHours(current_datetime.getHours() - 7)
      time = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
      let result = {
        image: image,
        title: title,
        section: section,
        id: id,
        time: time,
        url: url,
        diff: diff
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



const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
import View from './view';

export default class Model{
    constructor(){  
        this.lastAPIUrl = '';
        this.pageToShow = 0;
        this.newsDisplayed = 0;
        this.view = new View();
    }

    getNewsResources(){
        let newsAPIUrl = 'https://newsapi.org/v2/sources?apiKey=9cbcc49e8fdd445684f8d622f33125b4';
        let request = new Request(newsAPIUrl);

        fetch(request)
          .then((response) => { 
              return response.json(); 
            })
          .then((data) => {
            for (let i = 0; i < data.sources.length; i++) {
              document.querySelector('#resources').innerHTML +=
               '<button class="btn btn__sources" id="' + data.sources[i].id + '">' 
               + data.sources[i].name + '</button>';
            }      
          });
    }

    getNewsBySearch(urlPart){
        document.querySelector('#error-block').style.display = 'none';
        let newsAPIUrl = 'https://newsapi.org/v2/' + urlPart + 'apiKey=9cbcc49e8fdd445684f8d622f33125b4';
        let request = new Request(newsAPIUrl);

        let currThis = this;
        fetch(request)
          .then((response) => { 
                return response.json(); 
            })
          .then((data) => {

            const newsCount = data.articles.length;
            const newsItems = document.querySelector('#news');
            newsItems.innerHTML = '';
           
            if(newsCount == 0){
                document.querySelector('#error-block').style.display = 'unset';  
                document.querySelector('#loadButton').style.display = 'none';
                return;
            }      

            const renderedItems = currThis.view.renderItems(newsCount, data.articles);
            newsItems.appendChild(renderedItems);

            const minDisplayedNews = 5;
            if(newsCount < minDisplayedNews)
                document.querySelector('#loadButton').style.display = 'none';
            else
                document.querySelector('#loadButton').style.display = 'unset';
            
            currThis.lastAPIUrl = newsAPIUrl;
            currThis.pageToShow = 2;
            currThis.newsDisplayed = newsCount;
          });
      }

    appendNews(){
        this.lastAPIUrl = this.lastAPIUrl.replace(new RegExp('page=.*&'), 'page=' + this.pageToShow + '&');
        let request = new Request(this.lastAPIUrl);

        var currThis = this;
        fetch(request)
          .then((response) => { 
              return response.json(); 
            })
          .then((data) => {
            const newsCount = data.articles.length;
            if(newsCount == 0){
                document.querySelector('#loadButton').style.display = 'none';
                return;
            }    

            const renderedItems = currThis.view.renderItems(newsCount, data.articles);
            const newsItems = document.querySelector('#news');
            newsItems.appendChild(renderedItems);

            currThis.newsDisplayed += newsCount;
            currThis.pageToShow++;
            const minDisplayedNews = 5, maxDisplayedNews = 40;

            if(newsCount < minDisplayedNews || newsDisplayed == maxDisplayedNews)
               document.querySelector('#loadButton').style.display = 'none';
          });
      }

}

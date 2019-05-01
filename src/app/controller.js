import Model from './model';

export default class Controller{
    constructor(){
        this.model = new Model();
        this.pageToShow = 0;
        this.lastAPIUrl = '';
    }

    getNewsResources(){
        let newsAPIUrl = 'https://newsapi.org/v2/sources?apiKey=9cbcc49e8fdd445684f8d622f33125b4';
        let request = new Request(newsAPIUrl);

        let currThis = this;
        fetch(request)
          .then((response) => { 
              return response.json(); 
            })
          .then((data) => {
              currThis.model.processNewsResources(data);     
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
              currThis.model.processNewsBySearch(data);
              currThis.pageToShow = 2;
              currThis.lastAPIUrl = newsAPIUrl;
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
              currThis.model.processAppendNews(data);
              currThis.pageToShow++;
          });
    }

    start(){
        this.getNewsResources();
        this.getNewsBySearch('top-headlines?country=us&pageSize=5&page=1&');

        document.querySelector('#resources').addEventListener('click', (event) =>{
            this.getNewsBySearch(`everything?sources=${event.target.id}&pageSize=5&page=1&`);
          });

        document.querySelector('#loadButton').addEventListener('click', () => {
            this.appendNews();   
        });

        document.querySelector('#search-btn').addEventListener('click', () => {
            const query = document.querySelector('#search-field').value;
            if(query.length > 0){
                this.getNewsBySearch(`everything?q=${query}&pageSize=5&page=1&`);
                query.length = 0;
            }
        });
          
        document.querySelector('#search-field')
              .addEventListener('keyup', (event) => {
              event.preventDefault();
              if (event.keyCode === 13) {
                  document.querySelector('#search-btn').click();
              }
        });
    }
}

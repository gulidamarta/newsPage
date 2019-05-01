import View from './view';

export default class Model{
    constructor(){  
        this.newsDisplayed = 0;
        this.view = new View();
    }

    processNewsResources(data){
      for (let i = 0; i < data.sources.length; i++) {
        document.querySelector('#resources').innerHTML +=
         '<button class="btn btn__sources" id="' + data.sources[i].id + '">' 
         + data.sources[i].name + '</button>';
      } 
    }

    processNewsBySearch(data){
      const newsCount = data.articles.length;
      const newsItems = document.querySelector('#news');
      newsItems.innerHTML = '';
     
      if(newsCount == 0){
          document.querySelector('#error-block').style.display = 'unset';  
          document.querySelector('#loadButton').style.display = 'none';
          return;
      }      

      const renderedItems = this.view.renderItems(newsCount, data.articles);
      newsItems.appendChild(renderedItems);

      const minDisplayedNews = 5;

      if(newsCount < minDisplayedNews)
          document.querySelector('#loadButton').style.display = 'none';
      else
          document.querySelector('#loadButton').style.display = 'unset';
      this.newsDisplayed = newsCount;  
    }


    processAppendNews(data){
      const newsCount = data.articles.length;
      if(newsCount == 0){
          document.querySelector('#loadButton').style.display = 'none';
          return;
      }    

      const renderedItems = this.view.renderItems(newsCount, data.articles);
      const newsItems = document.querySelector('#news');
      newsItems.appendChild(renderedItems);

      this.newsDisplayed += newsCount;
      const minDisplayedNews = 5, maxDisplayedNews = 40;

      if(newsCount < minDisplayedNews || this.newsDisplayed == maxDisplayedNews)
         document.querySelector('#loadButton').style.display = 'none';
    }
}

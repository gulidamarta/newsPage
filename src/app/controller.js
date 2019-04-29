import Model from './model';

export default class Controller{
    constructor(){
        this.model = new Model();
    }

    start(){
        this.model.getNewsResources();
        this.model.getNewsBySearch('top-headlines?country=us&pageSize=5&page=1&');

        document.querySelector('#resources').addEventListener('click', (event) =>{
            this.model.getNewsBySearch(`everything?sources=${event.target.id}&pageSize=5&page=1&`);
          });

        document.querySelector('#loadButton').addEventListener('click', () => {
            this.model.appendNews();   
        });

        document.querySelector('#search-btn').addEventListener('click', () => {
            const query = document.querySelector('#search-field').value;
            if(query.length > 0){
                this.model.getNewsBySearch(`everything?q=${query}&pageSize=5&page=1&`);
                query.length = 0;
            }
        });
          
        document.querySelector('#search-field')
              .addEventListener('keyup', function(event) {
              event.preventDefault();
              if (event.keyCode === 13) {
                  document.querySelector('#search-btn').click();
              }
        });
    }
}
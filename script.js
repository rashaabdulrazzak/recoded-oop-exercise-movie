const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185'
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780'

class App {
  static run() {
    APIService.fetchMovie(534)
      .then(movie => Page.renderMovie(movie))
      APIService.fetchActor(534).then(actors => Page.renderActor(actors))
      }
}

class APIService {

  static fetchMovie(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}`)
    return fetch(url)
      .then(res => res.json())
      .then(json => new Movie(json))
  }
  static fetchActor(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/credits`)
    return fetch(url)
      .then(res => res.json())
      .then(json =>  {
        let arr = json.cast.slice(0,4)
        //console.log(arr)
        //arr.forEach(actor => new Actor(actor))
        return arr
      })
  }

  static  _constructUrl(path) {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`
  }
}

class Page {
  static backdrop = document.getElementById('movie-backdrop')
  static title = document.getElementById('movie-title')
  static releaseDate = document.getElementById('movie-release-date')
  static runtime = document.getElementById('movie-runtime')
  static overview = document.getElementById('movie-overview')
  static actorLi = document.getElementById('actors')

  static renderMovie(movie) {
    Page.backdrop.src = BACKDROP_BASE_URL + movie.backdropPath
    Page.title.innerText = movie.title
    Page.releaseDate.innerText = movie.releaseDate
    Page.runtime.innerText = movie.runtime + " minutes"
    Page.overview.innerText = movie.overview
  }
  static renderActor(actors){
    console.log(actors)
    for (let i=0;i<actors.length;i++){
       let li = document.createElement('li')
       let img = document.createElement('img')
       img.src = `${PROFILE_BASE_URL}${actors[i].profile_path}`
       li.append(img)
       let h = document.createElement('h3')
       h.innerText = `${actors[i].name}`
       li.append(h)
       let hp = document.createElement('p')
       hp.innerText =  `charachter name is : ${actors[i].character}`
       li.append(hp)
       this.actorLi.append(li)
    }
    
  }
}
     

 
class Movie {
  constructor(json) {
    this.id = json.id
    this.title = json.title
    this.releaseDate = json.release_date
    this.runtime = json.runtime
    this.overview = json.overview
    this.backdropPath = json.backdrop_path
  }
}
class Actor{
  constructor(json){
    this.name = json.name 
    this.character = json.character 
    this.profile_path = json.profile_path
  }
}

document.addEventListener("DOMContentLoaded", App.run);
if (!window.localStorage.getItem('visited_traffic_of_seattle') {
  window.location.replace('http://127.0.0.1:8080/splash.html')
  window.localStorage.setItem('visited_traffic_of_seattle', 'true')
}
//http://traffic-comments-seattle.surge.sh/splash.html

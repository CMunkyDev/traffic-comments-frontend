if (!window.localStorage.getItem('visited_traffic_of_seattle')) {
  window.location.replace('http://traffic-comments-seattle.surge.sh/splash.html')
  window.localStorage.setItem('visited_traffic_of_seattle', 'true')
}

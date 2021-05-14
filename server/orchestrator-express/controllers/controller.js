import axios from 'axios'

const movies = axios.get('http://localhost:4001/movies')
const series = axios.get('http://localhost:4002/series')

class Controller {
    
    static showAllData(req, res,next) {
        axios.all([movies, series])
            .then(({data}) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

module.exports = Controller
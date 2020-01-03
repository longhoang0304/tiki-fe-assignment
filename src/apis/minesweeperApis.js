import axios from 'axios';

const fetchBoard = (size, mines) => axios.get(`https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`)
  .then((res) => ({ res }))
  .catch((error) => ({ error }));


export default {
  fetchBoard,
};

import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

//   SWAP OUT WITH PRODUCTION LINK WHEN READY

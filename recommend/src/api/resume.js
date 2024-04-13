import request from '@/utils/request'
import axios from 'axios';

function resume_converter(uid) {
  var data = {
    uid: 'uid',
  };

  var config = {
    method: 'post',
    url: 'localhost:3012/recommendations/resume_converter',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

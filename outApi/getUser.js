const koaRequest = require('koa2-request');

const getUser = (uid) => {
  return koaRequest({
    url: `http://statistics.pandadastudio.com/player/simpleInfo`,
    method: 'get',
    qs: {
      uid: uid
    }
  });
}

module.exports = {
  getUser
}
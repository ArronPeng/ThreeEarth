module.exports = {
  port: 3000,
  session: {
    secret: 'earthserver',
    key: 'earthserver',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/earthserver'
};


const logger = (log)=> {
    process.env.DEV &&  console.log(log);
};

module.exports = logger;
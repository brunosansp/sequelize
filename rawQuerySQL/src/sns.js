const { AWS } = require('/opt/commons');
const { snsTopic: { 'contracts-create': contractsCreate } } = require('../config.json');

const sns = new AWS.SNS();

module.exports = async (data) => {
    return sns.publish({
        Message: JSON.stringify(data),
        TopicArn: contractsCreate,
    }).promise().catch((err) => { throw new Error(err.message); });
}

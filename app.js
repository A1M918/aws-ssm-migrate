const AWS = require('aws-sdk')

const ssm = new AWS.SSM({
  apiVersion: '2014-11-06',
  region: 'eu-west-2' // add your destination region here.
});


 function migrateParams() {
  const { Parameters } = await require('./parameters.json');

  for (let i = 0; i < Parameters.length; i++) {
    const params = {
      Name: Parameters[i].Name, /* required */
      Type: Parameters[i].Type, // Value of the parameter name.
      Value: Parameters[i].Value, /* required */
      KeyId: Parameters[i].KeyId ? Parameters[i].KeyId : undefined, // KeyId, if any.
      Description: Parameters[i].Description ? Parameters[i].Description : undefined, // Description, if any.
      Overwrite: true, // Make the parameter to override if it is already there.
    };
    await ssm.putParameter(params).promise().then(
      (data) => {
        console.log(data, {
          Name: Parameters[i].Name,
        });        
      }
    ).catch((err) => console.log(err, err.stack));
  };
};


migrateParams();
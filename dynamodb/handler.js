'use strict';
const AWS = require("aws-sdk")
const db = new AWS.DynamoDB.DocumentClient() //{ apiVersion: '2012-08-10' }

const incidentsTable = 'incidents'

function response(statusCode, message) {
  return {
    statusCode,
    body: JSON.stringify(message)
  }
}

module.exports.createIncident = async (event, context, callback) => {
  const reqBody = JSON.parse(event.body)
  const { incidentPriority, incidentId, incidentTitle } = reqBody

  const incident = {
    id: incidentId,
    incidentId,
    incidentPriority,
    incidentTitle,
    lastUpdate: new Date().toISOString()
  }

  return db
    .put({
      TableName: incidentsTable,
      Item: incident
    })
    .promise()
    .then(() => callback(null, response(201, incident)))
    .catch(err => callback(err, response(err.statusCode, err)))
}

module.exports.getIncidents = async (event, context, callback) => {
  const params = {
    TableName: incidentsTable
  }

  return db
    .scan(params)
    .promise()
    .then(res => callback(null, response(200, res.Items)))
    .catch(err => callback(null, response(err.statusCode, err)))
}

module.exports.getIncident = async (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: incidentsTable
  }

  return db
    .get(params)
    .promise()
    .then(res => {
      if (res.Item) callback(null, response(200, res.Item))
      else callback(null, response(404, { error: 'Incident was not found' }))
    })
    .catch(err => callback(null, response(err.statusCode, err)))
}

module.exports.updateIncident = (event, context, callback) => {
  const id = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { incidentPriority } = reqBody;

  const params = {
    Key: {
      id: id
    },
    TableName: incidentsTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET incidentPriority = :incidentPriority, lastUpdate = :lastUpdate',
    ExpressionAttributeValues: {
      ':incidentPriority': incidentPriority,
      ':lastUpdate': new Date().toISOString()
    },
    ReturnValue: 'ALL_NEW'
  }

  return db
    .update(params)
    .promise()
    .then(res => {
      callback(null, response(200, res))
    })
    .catch(err => callback(null, response(err.statusCode, err)))
}
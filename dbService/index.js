const axios = require("axios").default

class DynamoDBService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.DYNAMO_BASE_URL
    })
  }

  async getIncidents() {
    const result = await this.axios.get('/')
    return result.data
  }

  /**
   * @param {string} id 
   */
  async getIncident(id) {
    const result = await this.axios.get(`/${id}`)
    return result.data
  }

  /**
   * @param {object} incident
   * @property {string} incidentPriority
   * @property {string} incidentId
   * @property {string} incidentTitle
   */
  async createIncident(incident) {
    const result = await this.axios.post('/', incident)
    return result.data
  }

  /**
  * @param {string} id
  * @param {object} incident
  * @property {string} incidentPriority
  */
  async updateIncident(id, incident) {
    const result = await this.axios.put(`/${id}`, incident)
    return result.data
  }
}

module.exports = { DynamoDBService }
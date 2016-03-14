/**
 * Job.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    owner: {
      model: 'user'
    },
    name: {
      type: 'string',
      required: true
    },  
    position: {
      type: 'string'
    },    
    dateApplied: {
      type: 'string'
    },    
    dateInterview: {
      type: 'string'
    },    
    contact: {
      type: 'string'
    },    
    phone: {
      type: 'string'
    },    
    email: {
      type: 'string'
    },    
    applied: {
      type: 'string'
    },   
    linkedIn: {
      type: 'string'
    },    
    notes: {
      type: 'string'
    }
  },
};
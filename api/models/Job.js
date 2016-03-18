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
      type: 'date'
    },    
    interviewDate: {
      type: 'date'
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
      type: 'boolean'
    },   
    linkedIn: {
      type: 'string'
    },    
    notes: {
      type: 'text'
    }
  }
};
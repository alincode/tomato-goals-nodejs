/**
 * TimeLoggerController
 *
 * @description :: Server-side logic for managing Timeloggers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  attributes: {
    minute: {
      type: 'integer',
      unique: true
    }
  }
};

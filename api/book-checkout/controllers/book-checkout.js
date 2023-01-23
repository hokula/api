'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

   /** GET: find all book checkouts with only required data */

   findShortBookCheckouts: async () => {
    const BookCheckoutsEntities = await strapi.services['book-checkout'].find();

    const mappedData = BookCheckoutsEntities.map(({ id, book, employee, dateBorrowed, dateReturned }) => ({
      id,
      employeeId: employee.id,
      employeeFirstName: employee.firstName,
      employeeLastName: employee.lastName,
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      dateBorrowed,
      dateReturned
    }));

    return mappedData;
  },
  /** GET: find book checkout based on id with only required data */
  findShortBookCheckout: async (ctx) => {

    const { id } = ctx.params;
    const bookCheckoutsEntity = await strapi.services['book-checkout'].findOne({ id });

    const mappedData = {
      id,
      employeeId: bookCheckoutsEntity.employee.id,
      employeeFirstName: bookCheckoutsEntity.employee.firstName,
      employeeLastName: bookCheckoutsEntity.employee.lastName,
      bookId: bookCheckoutsEntity.book.id,
      bookTitle: bookCheckoutsEntity.book.title,
      bookAuthor: bookCheckoutsEntity.book.author,
      dateBorrowed: bookCheckoutsEntity.dateBorrowed,
      dateReturned: bookCheckoutsEntity.dateReturned
    };

    return sanitizeEntity(mappedData, { model: strapi.models['book-checkout'] });
  },
  /**POST: add checkout book with required data */
  createShortBookCheckout: async (ctx) => {
    let entity;
    let projection = ctx.request.body;

    projection.employee = ctx.request.body.employeeId;
    projection.book = ctx.request.body.bookId;
    projection.dateBorrowed = ctx.request.body.dateBorrowed || null;
    projection.dateReturned = ctx.request.body.dateReturned || null;

    entity = await strapi.services['book-checkout'].create(projection);

    return sanitizeEntity(entity, { model: strapi.models['book-checkout'] });
  },
   /**PUT: update checkout book with required data */
   updateShortBookCheckout: async (ctx) => {
    const { id } = ctx.params
    let entity;
    let projection = ctx.request.body;

    projection.employee = ctx.request.body.employeeId;
    projection.book = ctx.request.body.bookId;
    projection.dateBorrowed = ctx.request.body.dateBorrowed || null;
    projection.dateReturned = ctx.request.body.dateReturned || null;

    entity = await strapi.services['book-checkout'].update({ id }, projection);

    return sanitizeEntity(entity, { model: strapi.models['book-checkout'] });
  },
};

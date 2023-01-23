'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {

  /** GET: find all referrals with only required data*/
  find: async () => {

    const referralEntities = await strapi.services.referral.find();

    return referralEntities.map(( referralEntity ) => {
      const referral = sanitizeEntity( referralEntity, { model: strapi.models.referral });
      const employeeReferralId = (referral.employeeReferral !== null) ? referral.employeeReferral.id : '';
      const employeeReferralFirstName = (referral.employeeReferral !== null) ? referral.employeeReferral.firstName : '';
      const employeeReferralLastName = (referral.employeeReferral !== null) ? referral.employeeReferral.lastName : '';

      return (
        {
          id: referral.id,
          firstName: referral.firstName,
          lastName: referral.lastName,
          employeeReferralId: employeeReferralId,
          employeeReferralFirstName: employeeReferralFirstName,
          employeeReferralLastName: employeeReferralLastName,
          trialEnds: referral.trialEnds,
          bonusPaid: referral.bonusPaid,
          referralBonus: referral.referralBonus,
          note: referral.note
        }
      );
    });
  },
  /** GET: find referral based on id with only required data */
  findOne: async (ctx) => {

    const { id } = ctx.params;
    const referralEntity = await strapi.services.referral.findOne({ id });
    const employeeReferralId = (referralEntity.employeeReferral !== null) ? referralEntity.employeeReferral.id : '';

    const mappedData = {
      id: referralEntity.id,
      firstName: referralEntity.firstName,
      lastName: referralEntity.lastName,
      employeeReferralId: employeeReferralId,
      trialEnds: referralEntity.trialEnds,
      bonusPaid: referralEntity.bonusPaid,
      referralBonus: referralEntity.referralBonus,
      note: referralEntity.note
    };

    return sanitizeEntity(mappedData, { model: strapi.models.referral });
  },
  /**POST: add referral with required data */
  create: async (ctx) => {
    let entity;
    let projection = ctx.request.body;

    projection.employeeReferral = ctx.request.body.employeeReferralId;
    entity = await strapi.services.referral.create(projection);

    return sanitizeEntity(entity, { model: strapi.models.referral });
  },
  /**PUT: update referral  with required data */
  update: async (ctx) => {
    const { id } = ctx.params
    let entity;
    let projection = ctx.request.body;

    projection.employeeReferral = ctx.request.body.employeeReferralId;

    entity = await strapi.services.referral.update({ id }, projection);

    return sanitizeEntity(entity, { model: strapi.models.referral });
  },
};

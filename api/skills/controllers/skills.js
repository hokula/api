"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOneByTechSkill: async (ctx) => {
    const skills = await strapi.services.skills.findOneByTechSkill(
      ctx.params.skillname
    );
    return sanitizeEntity(skills, { model: strapi.models.skills });
  },
  findOneBySkillGroup: async (ctx) => {
    const skills = await strapi.services.skills.findOneBySkillGroup(
      ctx.params.SkillGroup
    );
    return skills;
  },
  findOneByGeneralRank: async (ctx) => {
    const skills = await strapi.services.skills.findOneByGeneralRank(
      ctx.params.GeneralRank
    );
    return skills;
  },
  /*async findOneByTechSkill(ctx) {
    const entity = await strapi.services.skills.findOneByTechSkill();
    return sanitizeEntity(entity, { model: strapi.models.skills });
  },*/
  /*async findOneBySkillGroup(ctx) {
    const entity = await strapi.services.skills.findOneBySkillGroup();
    return sanitizeEntity(entity, { model: strapi.models.skills });
  },*/
  /*async findOneByGeneralRank(ctx) {
    const entity = await strapi.services.skills.findOneByGeneralRank();
    return sanitizeEntity(entity, { model: strapi.models.skills });
  },*/
};

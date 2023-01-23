"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  findOneByTechSkill(skill) {
    return strapi.query("skills").findOne({ skillname: skill });
  },
  findOneBySkillGroup(skillgroup) {
    return strapi.query("skill").findOne({ SkillGroup: skillgroup });
  },
  findOneByGeneralRank(generalrank) {
    return strapi.query("skill").findOne({ GeneralRank: generalrank });
  },
};

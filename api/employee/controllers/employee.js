"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  find: async () => {
    const employees = await strapi.services.employee.find();

    return employees.filter((employee) => {
      if (!employee.dateLeft) {
        return sanitizeEntity(employee, { model: strapi.models.employee });
      }
    });
  },
  findUserEmployee: async (ctx) => {
    const { user } = ctx.state;

    const entity = await strapi.services.employee.findOne({ user: user.id }, [
      "conferences",
      "conferences.assignedBy",
      "vacation_requests",
      "vacation_requests.employee",
      "vacation_requests.employee.manager",
      "manager",
      "skills",
    ]);

    return sanitizeEntity(entity, { model: strapi.models.employee });
  },
  findPastEmployees: async () => {
    const employees = await strapi.services.employee.find();

    return employees.filter((employee) => {
      if (employee.dateLeft) {
        return sanitizeEntity(employee, { model: strapi.models.employee });
      }
    });
  },
  findManagers: async () => {
    const employees = await strapi.services.employee.find({}, ["user.role"]);
    const usersToReturn = employees.reduce((acumulator, employee) => {

      if (employee.user && employee.user.role && employee.user.role.name != "Employee") {
        acumulator.push({
          id: employee.id,
          name: employee.firstName + ' ' + employee.lastName
        })
      }
      return acumulator;
    }, [])
    return usersToReturn;
  },
  findActingManagers: async () => {
    const employees = await strapi.services.employee.find();
    const managers = employees
      .map((employee) => {
        if (employee.manager) {
          const { id, firstName, lastName } = employee.manager;
          return { id, firstName, lastName };
        }
      })
      .filter((manager) => manager);

    return managers;
  },
  updatePassword: async (ctx) => {
    const { id } = ctx.params;
    let entity;
    let projection = ctx.request.body;

    entity = await strapi.services.user.update({ id }, projection);

    return sanitizeEntity(entity, { model: strapi.models.user });
  },
  update: async (ctx) => {
    const id = ctx.params.id;
    const updatedEmployee = await strapi.services.employee.update(
      ctx.request.body,
      id
    );
    return sanitizeEntity(updatedEmployee, { model: strapi.models.employee });
  },
};

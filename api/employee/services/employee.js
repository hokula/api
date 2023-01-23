"use strict";
const axios = require("axios");
const extractEmployeeRegistrationData = require("../../../utils/extractEmployeeRegistrationData");
const emailFilter = require("../../../utils/emailFilter");
const newDate = require("../../../utils/newDate");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : process.env.PORTAL_URL;

module.exports = {
  create: async (data) => {
    const {
      firstName,
      lastName,
      title,
      manager,
      phoneNumber,
      birthday,
      joinedDate,
      salary,
      email,
      lastBonusReceived,
      yearsInCA,
      user,
      projects,
      domain,
      emergencyContact,
      generalRank,
      skillGroup,
    } = extractEmployeeRegistrationData(data);
    try {
      // 1. Register a user
      const isEmailValid = emailFilter(email);
      if (!isEmailValid) {
        throw "Email not valid";
      }

      const {
        data: {
          user: { id: userID }, // Destructure the response, getting the user ID as `userID`
        },
      } = await axios.post(`${BASE_URL}/auth/local/register`, user);

      // 2. Create an employee
      const newEmployee = await strapi.query("employee").create({
        firstName,
        lastName,
        title,
        manager: manager || null,
        phoneNumber,
        email,
        birthday: newDate(birthday),
        joinedDate: newDate(joinedDate),
        lastBonusReceived,
        yearsInCA,
        projects: projects || null,
        domain: domain,
        user: userID,
        generalRank,
        skillGroup: skillGroup,
      });

      // 3. Create an emergency contact entry
      const newEmergencyContact = await strapi
        .query("emergency-contact")
        .create({
          firstName: emergencyContact.firstName,
          lastName: emergencyContact.lastName,
          phoneNumber: emergencyContact.phoneNumber,
          relationship: emergencyContact.relationship,
          employee: newEmployee.id,
        });

      // 4. Create an salary entry
      const newSalary = await strapi.query("salary").create({
        ...salary,
        employee: newEmployee.id,
      });

      return {
        employee: newEmployee,
        emergency_contact: newEmergencyContact,
        salary: newSalary,
      };
    } catch (error) {
      console.error(error);
    }
  },

  update: async (data, id) => {
    const {
      firstName,
      lastName,
      title,
      manager,
      phoneNumber,
      birthday,
      joinedDate,
      email,
      lastBonusReceived,
      yearsInCA,
      projects,
      domain,
      emergencyContact,
      generalRank,
      dateLeft,
      skillGroup,
      // user,
    } = extractEmployeeRegistrationData(data);
    try {
      // Update the employee
      //try {
      console.log("UPDATE: ", data);
      const updatedEmployee = await strapi.query("employee").update(
        { id },
        {
          firstName,
          lastName,
          title,
          manager,
          phoneNumber,
          birthday,
          joinedDate,
          email,
          lastBonusReceived,
          yearsInCA,
          projects,
          domain,
          generalRank,
          dateLeft,
          skillGroup,
        }
      );
      //} //catch (error) {
      //console.log("Padam", error);
      // }

      // Update the emergency contact

      if (emergencyContact) {
        var updatedEmergencyContact;
        if (emergencyContact.id) {
          try {
            updatedEmergencyContact = await strapi
              .query("emergency-contact")
              .update({ id: emergencyContact.id }, emergencyContact);
          } catch (error) {
            console.log("in first cathc", error);
          }
        } else {
          try {
            const updatedEmergencyContact = await strapi
              .query("emergency-contact")
              .create({
                firstName: emergencyContact.firstName,
                lastName: emergencyContact.lastName,
                phoneNumber: emergencyContact.phoneNumber,
                relationship: emergencyContact.relationship,
                employee: id,
              });
          } catch (error) {
            console.log("in my catch", error);
          }
        }
      }

      // Return the updated employee and contact
      return {
        employee: updatedEmployee,
        emergency_contact: updatedEmergencyContact,
      };
    } catch (error) {
      console.error(error);
    }
  },
};

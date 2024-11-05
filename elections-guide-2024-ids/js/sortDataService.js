(function () {

    "use strict";

    angular.module("EnrApp")
           .factory("sortDataService", ["$filter", function ($filter) {

               // Service Interface
               var serviceInterface = {
                   sortCandiatesByParty: sortCandidatesByParty,
                   getOrdrerNumber: getOrderNumber,
                   ensureArray: ensureArray
               }

               function sortCandidatesByParty(data, orderbyCode, votes, name) {                   
                   return $filter('orderBy')(data, ['-votes', orderbyCode, name]);
               }
               
               function getOrderNumber(partyCode) {
                   var order;
                   if (partyCode === "D")
                       order = 1;                   
                   else if (partyCode === "L")
                       order = 2;
                   else if (partyCode === "R")
                       order = 3;
                   else 
                       order = 4;

                   return order;
               }

               /**
                * Ensures return value is an array, either by returning the given array or wrapping the given object in a new array.
                * @param {any} arrayOrObject An array of objects, or a single object that should be in an array.
                * @returns {Array<>} The original array, or an array containing the passed-in object.
                */
               function ensureArray(arrayOrObject) {
                   return [].concat(arrayOrObject);
               }

               return serviceInterface;
           }]);

}());
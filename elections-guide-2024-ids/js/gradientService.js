(function () {
    'use strict';

    angular
        .module('enrServicesModule')
        .factory('gradientService', gradientService);

    gradientService.$inject = ["$filter", "selectedOfficeService"]
    function gradientService($filter, selectedOfficeService) {

        /// SERVICE INTERFACE ///
        var serviceInterface = {
            generateOfficeCandidateGradients: generateOfficeCandidateGradients,
            getGradientsByParty: getGradientsByParty,
            isCurOfficeExcludedFromGradients: isCurOfficeExcludedFromGradients,
            isOfficeExcludedFromGradients: isOfficeExcludedFromGradients
        };


        function generateOfficeCandidateGradients(candidateList) {

            // split candidates by party
            var candidatesByParty = [];
            var partyList = [];
            candidateList.forEach(function (candidate) {
                var partyColor = candidate.DISPLAY_COLOR;
                if (!candidatesByParty[partyColor]) {
                    candidatesByParty[partyColor] = [];
                    partyList.push(partyColor);
                }
                candidatesByParty[partyColor].push(candidate);
            });

            // For each party....
            partyList.forEach(function (partyColor) {
                // Create a list of candidate obj, ordered by last name.
                var orderedNames = $filter('orderByLastName')(candidatesByParty[partyColor].map(function (candidate) { return candidate.NAME_ON_BALLOT; }));
                var orderedCandidates = [];
                orderedNames.forEach(function (name) {
                    var candidate = $filter('filter')(candidatesByParty[partyColor], { NAME_ON_BALLOT: name })[0];
                    orderedCandidates.push(candidate);
                });

                // Inject gradient color value into candidate objects
                injectGradientColorToCandidateObjects(orderedCandidates);
            });

            storedCandidateObjectsWithInjectedGradientField_ByParty = candidatesByParty;
        }
        function getGradientsByParty(partyColor) {
            if (storedCandidateObjectsWithInjectedGradientField_ByParty[partyColor] != undefined) {
                return storedCandidateObjectsWithInjectedGradientField_ByParty[partyColor].map(function (x) {
                    return {
                        NAME_ON_BALLOT: x.NAME_ON_BALLOT,
                        GRADIENT_COLOR: (x.GRADIENT_COLOR !== undefined) ? x.GRADIENT_COLOR : ""
                    };
                })
            }
        }
        function isCurOfficeExcludedFromGradients() {
            var curOfficeName = null;
            if (selectedOfficeService.getSelectedOffice() != null) {
                curOfficeName = selectedOfficeService.getSelectedOffice().OFFICE_CATEGORY_NAME;
            }
            var isExcluded = EXCLUDED_OFFICES.indexOf(curOfficeName) !== -1;
            return isExcluded;
        }

        function isOfficeExcludedFromGradients(curOfficeName) {
            var isExcluded = EXCLUDED_OFFICES.indexOf(curOfficeName) !== -1;
            return isExcluded;
        }

        /// PRIVATE /// 

        // US and state reps are also likely candidates for exclusion?
        var EXCLUDED_OFFICES = ["State Convention Delegate", "Convention Delegate",
                                "Precinct Committeeman"];
        var MAX_COLOR_SHIFT_LIGHTER = 0.8;
        var MAX_COLOR_SHIFT_DARKER = 0.4;

        var storedCandidateObjectsWithInjectedGradientField_ByParty = {};

        // Assumes candidates hve already been filtered by party.
        function injectGradientColorToCandidateObjects(candidateList) {

            if (!candidateList)
                throw new Error("falsey value passed to generatePartyGradients")

            if (!angular.isArray(candidateList))
                candidateList = [candidateList];

            var baseColorHex = candidateList[0].DISPLAY_COLOR;

            // Early Out: Single candidate just uses normal color.
            if (candidateList.length === 1) {
                candidateList[0].GRADIENT_COLOR = baseColorHex;
                return;
            }

            var baseColorRgb = hexToRgb(baseColorHex);
            var gradientCount = candidateList.length;

            // Based on the number of candidates, we calculate the per candidate color shift to reach the MAX values by the end.
            var x = gradientCount % 2 === 0 ? gradientCount : gradientCount - 1;
            var shiftDeltaTint = MAX_COLOR_SHIFT_LIGHTER / (x / 4);
            var shiftDeltaShade = MAX_COLOR_SHIFT_DARKER / (x / 2);

            // The middle item (or 2nd middle item even even total) uses the base color)
            var baseColorIndex = Math.floor(gradientCount / 2);

            // From middle base color candate, earlier entries get lighter
            var tintArray = [];
            var shiftAmount = shiftDeltaTint;
            for (var i = 0; i < baseColorIndex; i++) {
                tintArray.push(createTint(baseColorRgb, shiftAmount));
                shiftAmount += shiftDeltaTint;
            }
            tintArray.reverse();

            // From middle base color candate, later entries get darker
            var shadeArray = [];
            shiftAmount = 1 - shiftDeltaShade;
            for (var i = baseColorIndex + 1; i < gradientCount; i++) {
                shadeArray.push(createShade(baseColorRgb, shiftAmount));
                shiftAmount -= shiftDeltaShade;
            }

            // Create the final result set, a continnum of colors from light to dark, with the base color in the middle.
            var result = tintArray;
            result.push(baseColorHex);
            result = result.concat(shadeArray);

            // inject gradient value into candate objects
            for (var i = 0; i < gradientCount; i++)
                candidateList[i].GRADIENT_COLOR = result[i];
        }

        // Darker Gradient: 1 no change, 0 black
        function createShade(color, shadeAmount) {
            var red = Math.round(color.r * shadeAmount);
            var green = Math.round(color.g * shadeAmount);
            var blue = Math.round(color.b * shadeAmount);

            return rgbToHex(red, green, blue);
        }

        // Lighter Gradient: 0 no change, 1 white
        function createTint(color, tintAmount) {
            var red = Math.round(color.r + (tintAmount * (255 - color.r)));
            var green = Math.round(color.g + (tintAmount * (255 - color.g)));
            var blue = Math.round(color.b + (tintAmount * (255 - color.b)));

            return rgbToHex(red, green, blue);
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }


        /// COMPLETE SERVICE DEFINITION ///
        return serviceInterface;
    }
})();

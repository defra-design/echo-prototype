

/**********
* SEARCH RADIO BUTTONS (JavaScript)
* **********/

// jQuery (START)
$(document).ready(function () {

	// For the 'duplicate-organisation.html' page
	$('input[name="fromOrganisationName"]').on('change', function() {
			
		var selectedRadioButtonValue = $('input[name=fromOrganisationName]:checked').val(); 
		var clearFilter = jQuery("[data-clear-filter]");
		var searchContainer = jQuery("[data-checkbox-search-filter]");
		var searchInput = searchContainer.find("input");
		var searchInputValue = searchInput.val();

		// If the user hasn't searched
		if (searchInputValue == "") {

			// Show the hidden 'clear search and selection' link
			$(clearFilter).removeClass("hidden");
			$(clearFilter).attr("aria-hidden", false);
			$(clearFilter).removeAttr("hidden");

			// Show the hidden selection heading text
			$("#selectedChoiceHeading").removeClass("hidden");
			$("#selectedChoiceHeading").attr("aria-hidden", false);
			$("#selectedChoiceHeading").removeAttr("hidden");
			
			// Rename the link and associated header 
			$("#clearSearchAndSelection").text("Clear selection");
			$("#selectedChoiceHeading").text("You’ve selected “" + selectedRadioButtonValue + "”");

		}
		// Unless they have searched...
		else  {
			// Show the hidden link
			$(clearFilter).removeClass("hidden");
			$(clearFilter).attr("aria-hidden", false);
			$(clearFilter).removeAttr("hidden");

			// Show the hidden selection heading text
			$("#selectedChoiceHeading").removeClass("hidden");
			$("#selectedChoiceHeading").attr("aria-hidden", false);
			$("#selectedChoiceHeading").removeAttr("hidden");
			
			// Rename the link and associated header 
			$("#clearSearchAndSelection").text("Clear search and selection");
			$("#selectedChoiceHeading").text("You’ve selected “" + selectedRadioButtonValue + "”");
		}

	});

	// For the 'new-owner-organisation.html' page
	$('input[name="toOrganisationName"]').on('change', function() {
			
		var selectedRadioButtonValue = $('input[name=toOrganisationName]:checked').val(); 
		var clearFilter = jQuery("[data-clear-filter]");
		var searchContainer = jQuery("[data-checkbox-search-filter]");
		var searchInput = searchContainer.find("input");
		var searchInputValue = searchInput.val();

		// If the user hasn't searched
		if (searchInputValue == "") {

			// Show the hidden 'clear search and selection' link
			$(clearFilter).removeClass("hidden");
			$(clearFilter).attr("aria-hidden", false);
			$(clearFilter).removeAttr("hidden");

			// Show the hidden selection heading text
			$("#selectedChoiceHeading").removeClass("hidden");
			$("#selectedChoiceHeading").attr("aria-hidden", false);
			$("#selectedChoiceHeading").removeAttr("hidden");
			
			// Rename the link and associated header 
			$("#clearSearchAndSelection").text("Clear selection");
			$("#selectedChoiceHeading").text("You’ve selected “" + selectedRadioButtonValue + "”");

		}
		// Unless they have searched...
		else  {
			// Show the hidden link
			$(clearFilter).removeClass("hidden");
			$(clearFilter).attr("aria-hidden", false);
			$(clearFilter).removeAttr("hidden");

			// Show the hidden selection heading text
			$("#selectedChoiceHeading").removeClass("hidden");
			$("#selectedChoiceHeading").attr("aria-hidden", false);
			$("#selectedChoiceHeading").removeAttr("hidden");
			
			// Rename the link and associated header 
			$("#clearSearchAndSelection").text("Clear search and selection");
			$("#selectedChoiceHeading").text("You’ve selected “" + selectedRadioButtonValue + "”");
		}

	});

});
// jQuery (END)

// JavaScript (START)
// JavaScript (END)
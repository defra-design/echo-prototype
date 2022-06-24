

/**********
 * CUSTOM GLOBAL BEHAVIOUR (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {

  // PROGRESSIVE ENHANCEMENTS
  // On load, SHOW any JavaScript elements on the page
  $('.toggle-wrap-container').show();
  $('.toggle-wrap-container').removeClass("govuk-visually-hidden");
  $('.toggle-wrap-container').attr("aria-hidden", false);

  // On load, HIDE any JavaScript elements on the page
  $('.toggle-wrap-more').hide();
  $('.toggle-wrap-more').addClass("govuk-visually-hidden");
  $('.toggle-wrap-more').removeClass("govuk-list-nested-non-js");
  $('.toggle-wrap-more').addClass("govuk-list-nested-js");
  $('.toggle-wrap-more').attr("aria-hidden", true);

  // Trigger the 'Show other 5 cases' expandable link
  $(".toggle-wrap").click(function (e) {
      
    e.preventDefault();

    var linkText = $(this).text();

    if (linkText == "Show other 5 cases") {
      // Update the parent link state
      $('.toggle-wrap').attr("data-expanded", true);
      $('.toggle-wrap').text("Hide other 5 cases");
      $('.toggle-wrap').attr("aria-expanded", true);
      $('.toggle-wrap').attr("data-toggled-text", "Show other 5 cases");
      // Update the child conditional list items            
      $('.toggle-wrap-more').show();
      $('.toggle-wrap-more').removeClass("govuk-visually-hidden");
      $('.toggle-wrap-more').attr("aria-hidden", false);
    }
    else if (linkText == "Hide other 5 cases") {
      // Update the parent link state
      $('.toggle-wrap').attr("data-expanded", false);
      $('.toggle-wrap').text("Show other 5 cases");
      $('.toggle-wrap').attr("aria-expanded", false);
      $('.toggle-wrap').attr("data-toggled-text", "Hide other 5 cases");
      // Update the child conditional list items
      $('.toggle-wrap-more').hide();
      $('.toggle-wrap-more').addClass("govuk-visually-hidden");
      $('.toggle-wrap-more').attr("aria-hidden", true);
    }

  });

});
// jQuery (END)
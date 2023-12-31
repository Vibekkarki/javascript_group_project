$(document).ready(function() {
    let eventCounter = 1; // To track multiple events
  
    // Function to reset the form
    const resetForm = () => {
      $('#eventForm')[0].reset();
      $('[name="selectedDateTime"]').remove();
    };
    // Function to display the create event section
    const showCreateEventSection = () => {
      $('.calendar').show();
      $('#createAnotherBtn').hide();
      if(eventCounter < 1){
        $('.time-slots, .event-details, .event-info').hide();
      }
      
      resetForm();
    };
    // Initialize Flatpickr for date selection
    flatpickr("#calendarInput", {
      dateFormat: "Y-m-d",
      onChange: function(selectedDates) {
        $('.calendar').hide();
        $('.time-slots').show();
        generateTimeSlots(selectedDates[0]);
      }
    });
  
    // Generate time slots for selection
    const generateTimeSlots = () => {
      const timeSlotsContainer = $('#timeSlotsContainer');
      timeSlotsContainer.empty();

      const timeParts = ['Morning', 'Afternoon', 'Evening', 'Night'];
      const timeRanges = [['08:00', '12:00'], ['12:00', '16:00'], ['16:00', '20:00'], ['20:00', '24:00']];

      timeParts.forEach((part, index) => {
        const [start, end] = timeRanges[index];
        const timeSlotDiv = `<div class="time-slot" data-time="${start}-${end}">${part} (${start} - ${end})</div>`;
        timeSlotsContainer.append(timeSlotDiv);
      });
    };
  
    // Show event details form when time slot is clicked
    $('#timeSlotsContainer').on('click', '.time-slot', function() {
      const selectedTime = $(this).attr('data-time');
      $('.time-slots').hide();
      $('.event-details').show();
      const selectedDateTime = $('#calendarInput').val() + ' ' + selectedTime;
      $('#eventForm').append(`<input type="hidden" name="selectedDateTime" value="${selectedDateTime}">`);
    });
  
    // Handle form submission
    $('#eventForm').submit(function(event) {
        event.preventDefault();
        const eventName = $('#eventName').val();
        const eventDescription = $('#eventDescription').val();
        const selectedDateTime = $('[name="selectedDateTime"]').val();
    
        // Validation check
        if (eventName.length > 100 || eventDescription.length > 500) {
          $('#errorMessages').html('<p class="error-message">Event name should be less than 100 characters and event details less than 500 characters.</p>');
        } else if (!eventName || !eventDescription || !selectedDateTime) {
          $('#errorMessages').html('<p class="error-message">Please fill in all fields!</p>');
        } else {
          $('#errorMessages').empty();
    
          const eventCardContainer = $('#eventCardContainer');
          const eventCard =
          '<a href="payment.html"><div class="event-card">' +
          '<h2>Event ' + eventCounter + '</h2>' +
          '<p><strong>Event Name:</strong> ' + eventName + '</p>' +
          '<p><strong>Event Description:</strong> ' + eventDescription + '</p>' +
          '<p><strong>Date and Time:</strong> ' + selectedDateTime + '</p>' +
          '</div></a>';
          eventCardContainer.append(eventCard);
    
          // Increment event counter for multiple events
          eventCounter++;
    
          // Show event creation success message
          $('.event-details').hide();
          $('.event-info').show();
          $('#createAnotherBtn').show();
        }
      });
      // Create another event button click event
    $('#createAnotherBtn').click(function() {
      showCreateEventSection();
    });
    $('.gallery-item').hover(
        function() {
          $(this).find('img').css('transform', 'scale(1.1)');
          $(this).find('before').css('opacity', '1');
        },
        function() {
          $(this).find('img').css('transform', 'scale(1)');
          $(this).find('before').css('opacity', '0');
        }
      );
  });
  
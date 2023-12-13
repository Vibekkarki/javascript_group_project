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
      $('.time-slots, .event-details, .event-info').hide();
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
      if (eventName && eventDescription && selectedDateTime) {
        // Display created event information in a card
        const eventCardContainer = $('#eventCardContainer');
        const eventCard = 
        '<div class="event-card">' +
        '<h2>Event ' + eventCounter + '</h2>' +
        '<p><strong>Event Name:</strong> ' + eventName + '</p>' +
        '<p><strong>Event Description:</strong> ' + eventDescription + '</p>' +
        '<p><strong>Date and Time:</strong> ' + selectedDateTime + '</p>' +
      '</div>';
        eventCardContainer.append(eventCard);
  
        // Increment event counter for multiple events
        eventCounter++;
  
        // Show event creation success message
        $('.event-details').hide();
        $('.event-info').show();
      } else {
        alert('Please fill in all fields!');
      }
    });
      // Create another event button click event
    $('#createAnotherBtn').click(function() {
      showCreateEventSection();
    });
  });
  
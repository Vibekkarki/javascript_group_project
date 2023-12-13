$(document).ready(function() {
    // Initialize Flatpickr for date selection
    flatpickr("#calendarInput", {
      dateFormat: "Y-m-d",
      onChange: function(selectedDates) {
        $('.calendar').hide();
        $('.time-slots').show();
        generateTimeSlots(selectedDates[0]);
      }
    });
  
    // Generate time slots for selected date
    const generateTimeSlots = (selectedDate) => {
      const timeSlotsContainer = $('#timeSlotsContainer');
      timeSlotsContainer.empty();
      const availableTimes = ['9:00 AM', '11:00 AM', '2:00 PM'];
      availableTimes.forEach(time => {
        const timeSlotDiv = `<div class="time-slot" data-time="${time}">${time}</div>`;
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
    });
  });
  
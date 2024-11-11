// Declare variables for logged-in user data
let loggedInUsername = '';
let patientId = '';

// Function to fetch current user data
async function fetchCurrentUser() {
    try {
        const response = await fetch('/api/current-user');
        if (response.ok) {
            const data = await response.json();
            loggedInUsername = data.username; // Username of the logged-in user
            patientId = data.patientId; // Patient ID associated with the logged-in user
        } else {
            console.error('Error fetching current user:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to handle appointment date change
async function handleAppointmentDateChange(event) {
    const selectedDate = event.target.value;

    if (!selectedDate) {
        alert('Please select a date.');
        return; // Exit if no date is selected
    }
    
    try {
        const response = await fetch(`/api/appointments/${selectedDate}`);
        const appointments = await response.json();
        
        const timeSlotsContainer = document.querySelector('.time-slots');
        timeSlotsContainer.innerHTML = ''; // Clear previous time slots
        
        appointments.forEach(appointment => {
            const button = document.createElement('button');
            button.className = 'book-btn';
            button.setAttribute('data-time', appointment.app_start_time);
            button.setAttribute('data-doctor-id', appointment.D_ID);
            button.setAttribute('data-patient-id', patientId); // Use the dynamic patient ID
            button.setAttribute('data-reason', appointment.reason_for_visit);
            button.textContent = `Book ${appointment.app_start_time}`;
            
            timeSlotsContainer.appendChild(button);
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Event listener for appointment date change
document.getElementById('appointment-date').addEventListener('change', handleAppointmentDateChange);

// Fetch current user data when the page loads
document.addEventListener('DOMContentLoaded', fetchCurrentUser);

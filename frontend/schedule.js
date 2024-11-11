document.addEventListener('DOMContentLoaded', function() {
    // Load doctors into the dropdown
    loadDoctors();
});

function loadDoctors() {
    // Make an AJAX request to fetch doctors (or could use a predefined list)
    fetch('get_doctors.php')  // This is where you'd fetch your doctor list from the backend
        .then(response => response.json())
        .then(data => {
            const doctorSelect = document.getElementById('doctor');
            data.forEach(doctor => {
                let option = document.createElement('option');
                option.value = doctor.employee_ssn;
                option.textContent = `${doctor.first_name} ${doctor.last_name}`;
                doctorSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching doctor data:', error));
}

function loadAppointments() {
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('appointment_date').value;

    if (!doctor || !date) {
        alert("Please select both a doctor and a date.");
        return;
    }

    // Make an AJAX request to fetch the appointments for the selected doctor and date
    fetch(`get_appointments.php?doctor=${doctor}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('appointments-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';  // Clear existing appointments

            data.forEach(appointment => {
                let row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${appointment.app_date}</td>
                    <td>${appointment.app_start_time}</td>
                    <td>${appointment.}</td>
                    <td>${appointment.reason_for_visit}</td>
                `;
            });
        })
        .catch(error => console.error('Error fetching appointments:', error));
}

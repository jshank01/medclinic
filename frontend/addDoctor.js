document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addDoctorForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form not found!');
    }
});

async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const ssn = document.getElementById('ssn').value;
    const specialty = document.getElementById('specialty').value;
    const officeId = document.getElementById('office-id').value;

    const doctorData = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        ssn: ssn,
        specialty: specialty,
        office_id: officeId
    };

    try {
        const response = await fetch('/doctorActions/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctorData)
        });

        if (response.ok) {
            console.log('Doctor added successfully');
            alert('Doctor added successfully');
            // Redirect or clear the form as needed
        } else {
            console.error('Error adding doctor:', response.statusText);
            alert('Failed to add doctor');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add doctor');
    }
}
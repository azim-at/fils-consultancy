/**
 * Newsletter Form Handler
 * Handles newsletter subscription with form validation and user feedback
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all newsletter forms on the page
  const newsletterForms = document.querySelectorAll('.newsletter-form');

  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const consentCheckbox = this.querySelector('input[type="checkbox"]');
      const submitBtn = this.querySelector('.newsletter-btn');
      const email = emailInput.value.trim();

      // Validate form
      if (!email) {
        showMessage(form, 'Please enter your email address', 'error');
        return;
      }

      if (!consentCheckbox.checked) {
        showMessage(form, 'Please agree to receive newsletters', 'error');
        return;
      }

      // Disable button during submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i>';

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Success
        showMessage(form, 'Thank you for subscribing! Check your email for confirmation.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill"></i>';

        // You can replace this with actual form submission:
        // fetch('your-api-endpoint', {
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify({email: email})
        // })
        // .then(response => response.json())
        // .then(data => {
        //   showMessage(form, 'Thank you for subscribing!', 'success');
        //   form.reset();
        // })
        // .catch(error => {
        //   showMessage(form, 'Something went wrong. Please try again.', 'error');
        // })
        // .finally(() => {
        //   submitBtn.disabled = false;
        //   submitBtn.innerHTML = '<i class="bi bi-send-fill"></i>';
        // });

      }, 1500);
    });
  });

  /**
   * Show message to user
   */
  function showMessage(form, message, type) {
    // Remove existing message if any
    const existingMessage = form.querySelector('.newsletter-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.innerHTML = `
      <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'}"></i>
      <span>${message}</span>
    `;

    // Insert message after form
    form.appendChild(messageDiv);

    // Animate message in
    setTimeout(() => {
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 10);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      messageDiv.style.transform = 'translateY(-10px)';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }
});

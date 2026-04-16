# EmailJS Templates

Use these templates directly inside EmailJS:

- admin-notification-template.html
- visitor-confirmation-template.html

## Required template variables

The updated contact form now sends:

- {{from_name}}
- {{email}}
- {{from_email}}
- {{reply_to}}
- {{inquiry_type}}
- {{message}}
- {{submitted_at}}
- {{portfolio_url}}
- {{response_time}}

## Suggested mapping

- Visitor template ID -> VITE_EMAILJS_TEMPLATE_ID
- Admin template ID -> VITE_EMAILJS_ADMIN_TEMPLATE_ID

## Notes

- Keep template variable names exactly the same.
- In EmailJS template settings, set Reply-To to {{reply_to}} for admin template.

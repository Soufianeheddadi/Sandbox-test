# Call Center Showcase (Static Demo)

This is a frontend-only call center demo for inbound customer handling.

## What it includes
- Top customer bar with: name, number, VIN, plate number, car, and car model.
- Branch selection: Service or Sales.
- Service flow:
  - Book Appointment
  - Other (placeholder)
  - Booking popup with date/time selection and random availability check.
  - If available: required service type and current mileage fields.
- Sales flow:
  - Create Lead
  - Other (placeholder)
  - Known customer: opens existing lead popup.
  - New customer mode: opens Create Lead popup.
  - Create Lead popup has two outcomes:
    - Convert to Opportunity
    - Unqualified (requires reason selection)

## Run
1. Open `index.html` in your browser.
2. Use the Service and Sales buttons to test each path.

No backend or database is connected. All data is mock data for showcase purposes.

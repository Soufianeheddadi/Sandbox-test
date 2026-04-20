# CRM Call Center Showcase

Frontend demo for a call-center-style CRM flow built for quick presentation and workflow showcasing.

## Overview

This prototype simulates an incoming customer call for Chevrolet and guides the agent through two main business paths:

- Service
- Sales

It is designed as a lightweight static web app with mock data, modal-based workflows, and SMS confirmation previews.

## Demo Highlights

- Incoming call header with customer and vehicle details
- Chevrolet-branded sample customer context
- Service booking flow with daily hour-slot calendar
- Booked time slots shown in red
- Clickable available slots
- Service booking SMS preview before send
- Sales lead creation flow for new customers
- Existing lead popup for known customers
- Opportunity conversion path with follow-up type selection
- Sales SMS preview before send
- Unqualified lead path with required reason selection

## Included Customer Fields

- Customer name
- Mobile number
- VIN
- Plate number
- Vehicle name
- Vehicle model

## Service Flow

1. Select Service
2. Click Book Appointment
3. Choose a date
4. View a daily calendar with distributed hours
5. Red slots are already booked
6. Available slots can be selected
7. Enter service type and current mileage
8. Review the generated confirmation SMS
9. Click Send SMS

## Sales Flow

1. Select Sales
2. Use default known-customer behavior or enable New customer
3. Click Create Lead
4. For Convert to Opportunity:
5. Select opportunity type such as Test Drive, Showroom Visit, Sales Consultation Call, Trade-In Evaluation, or Finance Discussion
6. Review the generated sales SMS
7. Click Send SMS
8. For Unqualified:
9. Select a required reason and save

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

## Project Files

- `index.html` - UI structure and modal markup
- `styles.css` - layout, theme, responsive styles, calendar styling
- `app.js` - workflow logic for Service, Sales, and SMS previews

## Run Locally

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Run with a local server

If you want a more reliable local preview:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- This is a frontend-only mockup
- No backend, CRM integration, or database is connected
- Appointment availability is simulated
- SMS sending is simulated through preview and confirmation UI only

## Suggested Screenshots

If you want to improve the GitHub landing page further, add screenshots for:

- Incoming call dashboard
- Service booking calendar
- Service SMS preview
- Sales opportunity conversion
- Sales SMS preview

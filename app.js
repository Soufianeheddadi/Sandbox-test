const branchButtons = document.querySelectorAll(".big-action");
const servicePanel = document.getElementById("servicePanel");
const salesPanel = document.getElementById("salesPanel");
const statusBanner = document.getElementById("statusBanner");
const detailTabs = document.querySelectorAll(".detail-tab");
const customerDetailsPanel = document.getElementById("customerDetailsPanel");
const callHistoryPanel = document.getElementById("callHistoryPanel");
const callHistoryBody = document.getElementById("callHistoryBody");

const modalBackdrop = document.getElementById("modalBackdrop");
const bookModal = document.getElementById("bookModal");
const existingLeadModal = document.getElementById("existingLeadModal");
const createLeadModal = document.getElementById("createLeadModal");
const smsModal = document.getElementById("smsModal");

const isNewCustomerCheckbox = document.getElementById("isNewCustomer");

const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");
const serviceOtherBtn = document.getElementById("serviceOtherBtn");
const salesOtherBtn = document.getElementById("salesOtherBtn");
const createLeadBtn = document.getElementById("createLeadBtn");

const timeSlots = document.getElementById("timeSlots");
const availabilityResult = document.getElementById("availabilityResult");
const serviceDetails = document.getElementById("serviceDetails");
const bookForm = document.getElementById("bookForm");

const serviceDate = document.getElementById("serviceDate");
const serviceType = document.getElementById("serviceType");
const mileage = document.getElementById("mileage");
const smsPreview = document.getElementById("smsPreview");
const sendSmsBtn = document.getElementById("sendSmsBtn");
const smsModalTitle = document.getElementById("smsModalTitle");
const smsModalNote = document.getElementById("smsModalNote");

const leadForm = document.getElementById("leadForm");
const unqualifiedBtn = document.getElementById("unqualifiedBtn");
const convertBtn = document.getElementById("convertBtn");
const opportunityTypeRow = document.getElementById("opportunityTypeRow");
const opportunityType = document.getElementById("opportunityType");
const unqualifiedRow = document.getElementById("unqualifiedRow");
const unqualifiedReason = document.getElementById("unqualifiedReason");

const state = {
  branch: "",
  isNewCustomer: false,
  availabilityChecked: false,
  isAvailable: false,
  selectedTime: "",
  pendingBooking: null,
  pendingSms: null,
  leadOutcome: ""
};

const dailySlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
];

const recentServicesBody = document.getElementById("recentServicesBody");
const recentLeadsBody = document.getElementById("recentLeadsBody");

const recentServices = [
  { date: "14/04/2026", type: "40,000 KM Major Service", mileage: "41,820 KM", advisor: "Khalid Al Rashid", location: "Chevrolet Service – Al Sadd" },
  { date: "08/01/2026", type: "Oil & Filter Change", mileage: "38,250 KM", advisor: "Omar Jaber", location: "Chevrolet Service – Al Sadd" },
  { date: "22/09/2025", type: "Brake Inspection", mileage: "34,100 KM", advisor: "Nadia Al Farsi", location: "Chevrolet Service – D-Ring Road" },
  { date: "05/05/2025", type: "AC Performance Check", mileage: "29,750 KM", advisor: "Khalid Al Rashid", location: "Chevrolet Service – Al Sadd" }
];

const recentLeads = [
  { date: "17/04/2026", type: "Opportunity", model: "Chevrolet Traverse RS", stage: "Negotiation", rep: "Maya Hassan", outcome: "open" },
  { date: "02/02/2026", type: "Lead", model: "Chevrolet Tahoe LT Z71", stage: "Contacted", rep: "Ali Mansoor", outcome: "won" },
  { date: "15/10/2025", type: "Lead", model: "Chevrolet Silverado LTZ", stage: "Qualified", rep: "Maya Hassan", outcome: "lost" },
  { date: "30/06/2025", type: "Opportunity", model: "Chevrolet Traverse RS", stage: "Closed Won", rep: "Sara Nasser", outcome: "won" }
];

function buildRecentServices() {
  recentServicesBody.innerHTML = "";
  recentServices.forEach((service) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${service.date}</td>
      <td>${service.type}</td>
      <td>${service.mileage}</td>
      <td>${service.advisor}</td>
      <td>${service.location}</td>
    `;
    recentServicesBody.appendChild(row);
  });
}

function buildRecentLeads() {
  recentLeadsBody.innerHTML = "";
  recentLeads.forEach((lead) => {
    const tagClass = lead.type === "Opportunity" ? "tag-opportunity" : "tag-lead";
    const outcomeClass = { won: "tag-won", lost: "tag-lost", open: "tag-open" }[lead.outcome] || "tag-open";
    const outcomeLabel = { won: "Won", lost: "Lost", open: "Open" }[lead.outcome] || lead.outcome;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${lead.date}</td>
      <td><span class="tag ${tagClass}">${lead.type}</span></td>
      <td>${lead.model}</td>
      <td>${lead.stage}</td>
      <td>${lead.rep}</td>
      <td><span class="tag ${outcomeClass}">${outcomeLabel}</span></td>
    `;
    recentLeadsBody.appendChild(row);
  });
}

const callQueues = [
  "Chevrolet Service Line",
  "Chevrolet Sales Queue",
  "Roadside Assistance",
  "General Enquiries"
];

const callWrapUps = [
  "Appointment Booked",
  "Lead Created",
  "Follow-Up Scheduled",
  "Information Provided",
  "No Answer on Callback",
  "Unqualified"
];

const callTimes = [
  "08:14 AM",
  "09:42 AM",
  "11:05 AM",
  "01:33 PM",
  "03:18 PM",
  "04:52 PM",
  "05:27 PM"
];

function selectInfoTab(tabName) {
  detailTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  customerDetailsPanel.hidden = tabName !== "details";
  callHistoryPanel.hidden = tabName !== "history";
}

function formatHistoryDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function buildCallHistoryRows() {
  callHistoryBody.innerHTML = "";

  for (let index = 0; index < 7; index += 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);

    const queue = callQueues[index % callQueues.length];
    const wrapUp = callWrapUps[(index + 2) % callWrapUps.length];
    const time = callTimes[index];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formatHistoryDate(date)}</td>
      <td>${time}</td>
      <td>${queue}</td>
      <td>${wrapUp}</td>
    `;
    callHistoryBody.appendChild(row);
  }
}

function showStatus(message, kind = "info") {
  statusBanner.hidden = false;
  statusBanner.textContent = message;
  if (kind === "error") {
    statusBanner.style.background = "#fce9e7";
    statusBanner.style.borderColor = "#e6a49d";
    statusBanner.style.color = "#7c251f";
  } else if (kind === "success") {
    statusBanner.style.background = "#e7f5ec";
    statusBanner.style.borderColor = "#a7d9b9";
    statusBanner.style.color = "#0f5d2f";
  } else {
    statusBanner.style.background = "#e8f1f7";
    statusBanner.style.borderColor = "#b8d0df";
    statusBanner.style.color = "#1e4158";
  }
}

function openModal(modalEl) {
  modalBackdrop.hidden = false;
  [bookModal, existingLeadModal, createLeadModal, smsModal].forEach((modal) => {
    modal.hidden = true;
  });
  modalEl.hidden = false;
}

function closeAllModals() {
  modalBackdrop.hidden = true;
  [bookModal, existingLeadModal, createLeadModal, smsModal].forEach((modal) => {
    modal.hidden = true;
  });
}

function resetBookingFlow() {
  state.availabilityChecked = false;
  state.isAvailable = false;
  state.selectedTime = "";
  state.pendingBooking = null;
  availabilityResult.hidden = true;
  availabilityResult.className = "availability-box";
  availabilityResult.textContent = "";
  timeSlots.hidden = true;
  timeSlots.innerHTML = "";
  serviceDetails.hidden = true;
  serviceType.value = "";
  mileage.value = "";
}

function getDailyBookedSlots(dateValue) {
  let seed = 0;
  for (const char of dateValue) {
    seed += char.charCodeAt(0);
  }

  const booked = new Set();
  const targetCount = 2 + (seed % 3);
  while (booked.size < targetCount) {
    const index = (seed * (booked.size + 3) + booked.size * 7) % dailySlots.length;
    booked.add(dailySlots[index]);
    seed += 11;
  }
  return booked;
}

function renderDailyCalendar() {
  if (!serviceDate.value) {
    timeSlots.hidden = true;
    timeSlots.innerHTML = "";
    availabilityResult.hidden = true;
    availabilityResult.textContent = "";
    serviceDetails.hidden = true;
    state.selectedTime = "";
    state.availabilityChecked = false;
    state.isAvailable = false;
    return;
  }

  state.selectedTime = "";
  state.availabilityChecked = false;
  state.isAvailable = false;
  serviceDetails.hidden = true;
  availabilityResult.hidden = false;
  availabilityResult.className = "availability-box";
  availabilityResult.textContent = "Select an hour from the calendar below.";

  const bookedSlots = getDailyBookedSlots(serviceDate.value);
  timeSlots.hidden = false;
  timeSlots.innerHTML = "";

  dailySlots.forEach((slot) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "time-slot";
    button.textContent = slot;

    if (bookedSlots.has(slot)) {
      button.classList.add("booked");
      button.setAttribute("aria-disabled", "true");
      button.title = "Booked";
    } else {
      button.title = "Available";
      button.addEventListener("click", () => {
        document.querySelectorAll(".time-slot.selected").forEach((item) => {
          item.classList.remove("selected");
        });

        button.classList.add("selected");
        state.selectedTime = slot;
        state.availabilityChecked = true;
        state.isAvailable = true;
        availabilityResult.hidden = false;
        availabilityResult.className = "availability-box availability-ok";
        availabilityResult.textContent = `Selected ${slot}. Slot available.`;
        serviceDetails.hidden = false;
        showStatus(`Time selected: ${slot}`, "success");
      });
    }

    timeSlots.appendChild(button);
  });
}

function resetLeadFlow() {
  state.leadOutcome = "";
  opportunityTypeRow.hidden = true;
  opportunityType.value = "";
  unqualifiedRow.hidden = true;
  unqualifiedReason.value = "";
}

function prepareSmsModal(title, note, message, payload) {
  smsModalTitle.textContent = title;
  smsModalNote.textContent = note;
  smsPreview.textContent = message;
  state.pendingSms = payload;
  openModal(smsModal);
}

function buildSmsMessage(booking) {
  return [
    `Dear Nasser Al Kuwari,`,
    "",
    "Thank you for contacting Chevrolet Service.",
    `Your appointment has been confirmed for ${booking.date} at ${booking.time}.`,
    "",
    `Vehicle: Chevrolet Tahoe 2024 LT Z71`,
    `Plate Number: QTR-76214`,
    `VIN: 1GNSKPKD8PR281445`,
    `Service Type: ${booking.serviceType}`,
    `Current Mileage: ${booking.mileage} KM`,
    "",
    "We look forward to welcoming you at our service center.",
    "If you need any changes, please contact us on +974 5551 0082.",
    "",
    "Chevrolet Service Team"
  ].join("\n");
}

function buildSalesSmsMessage(leadDetails) {
  return [
    `Dear ${leadDetails.name},`,
    "",
    "Thank you for your interest in Chevrolet.",
    `Your lead has been converted to an opportunity for a ${leadDetails.opportunityType}.`,
    "",
    `Interested Model: ${leadDetails.interest}`,
    `Phone Number: ${leadDetails.phone}`,
    `Email: ${leadDetails.email}`,
    "",
    "Our sales team will contact you shortly to confirm the next step and assist you further.",
    "We look forward to welcoming you soon.",
    "",
    "Chevrolet Sales Team"
  ].join("\n");
}

function selectBranch(branchName) {
  state.branch = branchName;
  branchButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.branch === branchName);
  });

  servicePanel.hidden = branchName !== "service";
  salesPanel.hidden = branchName !== "sales";

  closeAllModals();
  resetBookingFlow();
  resetLeadFlow();

  if (branchName === "service") {
    showStatus("Service flow selected. Choose Book Appointment or Other.");
  }
  if (branchName === "sales") {
    showStatus("Sales flow selected. Existing lead appears by default for known customer.");
  }
}

branchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectBranch(button.dataset.branch);
  });
});

bookAppointmentBtn.addEventListener("click", () => {
  resetBookingFlow();
  bookForm.reset();
  openModal(bookModal);
  renderDailyCalendar();
});

serviceDate.addEventListener("change", renderDailyCalendar);

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!state.availabilityChecked || !state.isAvailable) {
    showStatus("Please select an available time slot from the calendar.", "error");
    return;
  }

  if (!serviceType.value || !mileage.value) {
    showStatus("Service type and current mileage are required.", "error");
    return;
  }

  state.pendingBooking = {
    date: serviceDate.value,
    time: state.selectedTime,
    serviceType: serviceType.value,
    mileage: mileage.value
  };
  prepareSmsModal(
    "Appointment SMS Preview",
    "Review the message that will be sent to the customer, then confirm.",
    buildSmsMessage(state.pendingBooking),
    {
      kind: "service",
      booking: { ...state.pendingBooking }
    }
  );
  showStatus("Booking captured. Review the SMS before sending.", "info");
});

sendSmsBtn.addEventListener("click", () => {
  if (!state.pendingSms) {
    showStatus("No SMS is ready to send.", "error");
    return;
  }

  const pendingSms = state.pendingSms;
  closeAllModals();

  if (pendingSms.kind === "service") {
    showStatus(
      `SMS sent for appointment on ${pendingSms.booking.date} at ${pendingSms.booking.time}.`,
      "success"
    );
    bookForm.reset();
    resetBookingFlow();
  }

  if (pendingSms.kind === "sales") {
    showStatus(
      `Sales SMS sent for ${pendingSms.lead.name} regarding ${pendingSms.lead.opportunityType}.`,
      "success"
    );
    leadForm.reset();
    resetLeadFlow();
  }

  state.pendingSms = null;
});

serviceOtherBtn.addEventListener("click", () => {
  showStatus("Service > Other selected (placeholder for future process).");
});

salesOtherBtn.addEventListener("click", () => {
  showStatus("Sales > Other selected (placeholder for future process).");
});

isNewCustomerCheckbox.addEventListener("change", () => {
  state.isNewCustomer = isNewCustomerCheckbox.checked;
  if (state.isNewCustomer) {
    showStatus("New customer mode enabled. Create Lead opens lead creation form.");
  } else {
    showStatus("Known customer mode enabled. Create Lead shows existing lead.");
  }
});

createLeadBtn.addEventListener("click", () => {
  resetLeadFlow();
  if (state.isNewCustomer) {
    openModal(createLeadModal);
  } else {
    openModal(existingLeadModal);
  }
});

convertBtn.addEventListener("click", () => {
  state.leadOutcome = "opportunity";
  opportunityTypeRow.hidden = false;
  unqualifiedRow.hidden = true;
  showStatus("Lead set to convert to opportunity. Select the next step.", "success");
});

unqualifiedBtn.addEventListener("click", () => {
  state.leadOutcome = "unqualified";
  opportunityTypeRow.hidden = true;
  opportunityType.value = "";
  unqualifiedRow.hidden = false;
  showStatus("Please select an unqualified reason.", "info");
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!state.leadOutcome) {
    showStatus("Choose either Convert to Opportunity or Unqualified.", "error");
    return;
  }

  if (state.leadOutcome === "unqualified" && !unqualifiedReason.value) {
    showStatus("Select an unqualified reason before saving.", "error");
    return;
  }

  if (state.leadOutcome === "opportunity") {
    if (!opportunityType.value) {
      showStatus("Select the opportunity type before saving.", "error");
      return;
    }

    const leadDetails = {
      name: document.getElementById("leadName").value,
      phone: document.getElementById("leadPhone").value,
      email: document.getElementById("leadEmail").value,
      interest: document.getElementById("leadInterest").value,
      opportunityType: opportunityType.value
    };

    prepareSmsModal(
      "Sales SMS Preview",
      "Review the opportunity confirmation message before sending it to the customer.",
      buildSalesSmsMessage(leadDetails),
      {
        kind: "sales",
        lead: leadDetails
      }
    );
    showStatus("Opportunity created. Review the sales SMS before sending.", "info");
  } else {
    closeAllModals();
    showStatus(`Lead marked as unqualified: ${unqualifiedReason.value}.`, "info");
    leadForm.reset();
    resetLeadFlow();
  }
});

document.querySelectorAll("[data-close]").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    closeAllModals();
  });
});

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    closeAllModals();
  }
});

selectBranch("service");
buildCallHistoryRows();
buildRecentServices();
buildRecentLeads();
selectInfoTab("details");

detailTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectInfoTab(tab.dataset.tab);
  });
});

showStatus("Call received. Start in Service or switch to Sales.");

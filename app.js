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
const leadModalTitle = document.getElementById("leadModalTitle");
const leadModalNote  = document.getElementById("leadModalNote");
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
    showStatus("New customer — all lead fields will start empty.");
  } else {
    showStatus("Existing customer — lead form will be pre-filled from CRM.");
  }
});

createLeadBtn.addEventListener("click", () => {
  resetLeadFlow();
  if (state.isNewCustomer) {
    leadModalTitle.textContent = "Create New Lead";
    leadModalNote.textContent  = "Fill in the customer details, then choose the lead outcome.";
    document.getElementById("leadName").value  = "";
    document.getElementById("leadPhone").value = "";
    document.getElementById("leadEmail").value = "";
  } else {
    leadModalTitle.textContent = "Create Lead — Existing Customer";
    leadModalNote.textContent  = "Customer details are pre-filled from the CRM. Review and choose the lead outcome.";
    document.getElementById("leadName").value  = "Nasser Al Kuwari";
    document.getElementById("leadPhone").value = "+974 5551 0082";
    document.getElementById("leadEmail").value = "nasser.alku@example.com";
  }
  openModal(createLeadModal);
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

// ═══════════════════════════════════════════
// Agent Copilot Sidebar
// ═══════════════════════════════════════════

const copilotToggle   = document.getElementById("copilotToggle");
const copilotSidebar  = document.getElementById("copilotSidebar");
const copilotClose    = document.getElementById("copilotClose");
const copilotFeed     = document.getElementById("copilotFeed");
const copilotEmpty    = document.getElementById("copilotEmpty");
const chatMessages    = document.getElementById("chatMessages");
const chatInput       = document.getElementById("chatInput");
const chatSend        = document.getElementById("chatSend");

// ── Auto-generated live insights ──────────────────────────
const copilotInsights = [
  {
    tag: "Customer Profile",
    color: "#4a9cbd",
    text: "Nasser Al Kuwari — customer since 2021, 3 vehicles registered. Loyalty tier: Gold. Avg. yearly spend: QAR 12,400."
  },
  {
    tag: "Vehicle Alert",
    color: "#e8844a",
    text: "Tahoe 2024 LT Z71 is overdue for the 40,000 KM major service. Last recorded mileage: 41,820 KM (14 Apr 2026). Preferred advisor: Khalid Al Rashid."
  },
  {
    tag: "Open Opportunity",
    color: "#a07be0",
    text: "Active opportunity for Chevrolet Traverse RS in Negotiation stage — assigned to Maya Hassan. Opened 17/04/2026."
  },
  {
    tag: "Active Promotion",
    color: "#4dbb85",
    text: "Eligible for the 'Summer Ready' AC Service Package — 15% discount until 30 April 2026. Mention this to the customer."
  },
  {
    tag: "AI Recommendation",
    color: "#f0c040",
    text: "Suggest booking the 40K major service today and bundle it with the AC package. Leverage the open Traverse RS opportunity — offer a test drive during the same visit."
  }
];

// ── Chat canned responses (keyword-matched) ───────────────
const chatResponses = [
  {
    keywords: ["warrant"],
    reply: "Great news, this Tahoe is still under warranty. It has the standard 3-year or 60,000 KM coverage, so the customer is protected until around March 2027, or until the mileage limit is reached."
  },
  {
    keywords: ["recall"],
    reply: "I checked the record and there are no open safety recalls on this vehicle right now."
  },
  {
    keywords: ["upsell", "offer", "promo", "promotion", "package", "bundle"],
    reply: "A strong upsell option is the Brake Fluid Flush plus Cabin Air Filter bundle for QAR 450 during the 40K service. You can also offer the Summer Ready AC package with 15% off. This combination feels valuable and relevant for the customer."
  },
  {
    keywords: ["service", "appointment", "book", "schedule", "visit"],
    reply: "This vehicle is already due for its 40,000 KM major service, currently at 41,820 KM. I recommend offering the customer the next available morning slot and confirming their preferred branch before finalizing the booking."
  },
  {
    keywords: ["location", "locations", "where", "address", "timing", "timings", "hours", "open", "close", "showroom", "service center", "service centre"],
    reply: "Sure, here is a clean summary you can share: Showroom: Jaidah Square, Al Matar Street, Umm Ghuwailina, open 08:30 AM to 09:00 PM, Saturday to Thursday. Industrial Service Centre: Zone 57, Street 24, open 07:30 AM to 12:00 PM and 01:00 PM to 04:30 PM, Saturday to Thursday. Airport Quick Service: Zone 47, Street 310, open 08:00 AM to 06:00 PM, Saturday to Thursday. Friday is closed for all three in this demo."
  },
  {
    keywords: ["lead", "opportunity", "sales", "traverse", "test drive"],
    reply: "There is an active Traverse RS opportunity in Negotiation. The customer is already warm, so the best next step is to propose a test drive and align it with their service visit for convenience."
  },
  {
    keywords: ["customer", "profile", "history", "loyal", "gold"],
    reply: "This is a loyal Gold-tier customer with a solid service history and consistent yearly spend. They usually prefer phone communication and morning appointments, so a proactive and premium tone works best."
  },
  {
    keywords: ["mileage", "km", "odometer", "kilometer"],
    reply: "Latest recorded mileage is 41,820 KM, which means the 40K major service is overdue. This is a good opportunity to position immediate booking as preventive care."
  },
  {
    keywords: ["ac", "air", "cool", "summer"],
    reply: "The AC package is a great fit for this call. You can present it as a comfort and reliability upgrade, especially before summer travel, and pair it with the major service to save the customer an extra visit."
  },
  {
    keywords: ["advisor", "who", "assign", "contact"],
    reply: "For service, assign Khalid Al Rashid as the preferred advisor. For sales follow-up, Maya Hassan is the right owner for the open opportunity."
  }
];

const defaultCopilotReply = "I can help with service booking, branch timings, warranty, recalls, upsell ideas, and sales opportunities. Ask me in one line and I will draft a ready-to-use reply.";

let copilotOpen   = false;
let feedStarted   = false;

function toggleCopilot() {
  copilotOpen = !copilotOpen;
  copilotSidebar.classList.toggle("open", copilotOpen);
  document.body.classList.toggle("copilot-open", copilotOpen);
  if (copilotOpen && !feedStarted) {
    feedStarted = true;
    startCopilotFeed();
  }
}

function startCopilotFeed() {
  let delay = 900;
  copilotInsights.forEach((insight, i) => {
    setTimeout(() => {
      if (i === 0 && copilotEmpty) copilotEmpty.remove();
      const card = document.createElement("div");
      card.className = "insight-card";
      card.style.setProperty("--insight-color", insight.color);
      card.innerHTML = `<p class="insight-tag">${insight.tag}</p><p class="insight-text">${insight.text}</p>`;
      copilotFeed.appendChild(card);
      copilotFeed.scrollTop = copilotFeed.scrollHeight;
    }, delay);
    delay += 1900;
  });
}

function sendCopilotMessage(text) {
  text = text.trim();
  if (!text) return;

  // User bubble
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg user";
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatInput.value = "";

  // Typing indicator
  const typing = document.createElement("div");
  typing.className = "chat-msg typing";
  typing.textContent = "Copilot is thinking…";
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Find a matching response
  const lower = text.toLowerCase();
  let reply = defaultCopilotReply;
  for (const r of chatResponses) {
    if (r.keywords.some((k) => lower.includes(k))) {
      reply = r.reply;
      break;
    }
  }

  setTimeout(() => {
    typing.remove();
    const botMsg = document.createElement("div");
    botMsg.className = "chat-msg bot";
    botMsg.textContent = reply;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1100);
}

copilotToggle.addEventListener("click", toggleCopilot);
copilotClose.addEventListener("click", toggleCopilot);
chatSend.addEventListener("click", () => sendCopilotMessage(chatInput.value));
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendCopilotMessage(chatInput.value);
});
document.querySelectorAll(".quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => sendCopilotMessage(btn.dataset.q));
});

# Debidwar Medilab Hospital (দেবীদ্বার মেডিলাব হাসপাতাল)
## Premium Bilingual Multi-Page Hospital Website

A production-grade, bilingual (English & বাংলা) multi-page hospital website for **Debidwar Medilab Hospital**, located in **Debidwar, Cumilla, Bangladesh**.

---

## 🌟 Key Features

- **22 Real Navigable Pages**:
  1. `Home` (`index.html` / `#/home`): Hero section, 24/7 hotline, quick access cards, 16 departments preview, specialist doctors preview, statistics, health packages, testimonials, articles.
  2. `About Us` (`about.html` / `#/about`): Hospital mission, vision, 100+ bed infrastructure, DGHS certification, core values, milestones.
  3. `Our Doctors` (`doctors.html` / `#/doctors`): Specialist directory with real-time search, department filters, "Available Today" toggle, and multi-criteria sorting.
  4. `Doctor Profile` (`doctor-details.html` / `#/doctor-details?id=...`): Complete visiting schedule, consultation fees, BMDC registration number, qualifications, specializations, and direct booking.
  5. `Departments` (`departments.html` / `#/departments`): All 16 clinical departments with search and floor locations.
  6. `Department Details` (`department-details.html` / `#/department-details?id=...`): Detailed clinical capabilities, modern equipment, related faculty doctors.
  7. `Medical Services` (`services.html` / `#/services`): Categorized clinical, diagnostic, emergency, and support services.
  8. `Service Details` (`service-details.html` / `#/service-details?id=...`): In-depth equipment details, operational availability, supervisor desk.
  9. `Appointment` (`appointment.html` / `#/appointment`): Validated appointment booking interface with Bangladesh mobile validation, dynamic doctor dropdown, and demo booking reference generator (`DMH-XXXXXX`).
  10. `Contact Us` (`contact.html` / `#/contact`): Address, phone numbers, interactive inquiry form, Google Maps locator, and driving directions.
  11. `Patient Information` (`patients.html` / `#/patients`): Inpatient admission procedure, discharge steps, visiting hours (4:30 PM - 6:30 PM), patient rights & responsibilities, payment options.
  12. `Health Packages` (`packages.html` / `#/packages`): 6 preventive diagnostic checkups (Basic, Executive, Diabetes, Cardiac, Women, Senior Citizen) with itemized test lists and fasting instructions.
  13. `Diagnostic Center` (`diagnostics.html` / `#/diagnostics`): Automated hematology, biochemistry, immunology, 4D ultrasound, digital X-Ray test catalog with pricing and delivery turnaround times.
  14. `Emergency Care` (`emergency.html` / `#/emergency`): 24/7 red-alert hotline, rapid trauma resuscitation steps, ambulance contacts, and emergency ramp directions.
  15. `Health Blog` (`blog.html` / `#/blog`): Expert articles on heart attacks, diabetes control, pregnancy care, pneumonia, and back pain written by consultant doctors.
  16. `Blog Details` (`blog-details.html` / `#/blog-details?id=...`): Full article reader with author credentials, read times, and share functionality.
  17. `Careers` (`careers.html` / `#/careers`): Current job vacancies (Medical Officers, ICU Staff Nurses, Lab Technologists) with requirements and quick application form.
  18. `FAQ` (`faq.html` / `#/faq`): Categorized accordion answering common questions on serial booking, reports, emergency admissions, and billing.
  19. `Testimonials` (`testimonials.html` / `#/testimonials`): Verified patient recovery stories from Debidwar, Muradnagar, Chandina, Burichang, and Brahmanpara with review submission.
  20. `Privacy Policy` (`privacy.html` / `#/privacy`): Institutional medical confidentiality and patient data protection standards.
  21. `Terms & Conditions` (`terms.html` / `#/terms`): Service policies, appointment rules, and emergency guidelines.
  22. `Custom 404` (`404.html` / `#/404`): User-friendly error page with redirection buttons.

- **Bilingual English ↔ বাংলা Support**:
  - Centralized translation dictionary (`src/data/translations.ts`)
  - Bengali typography with Google Fonts `Hind Siliguri`
  - Language selection persisted in `localStorage`

- **Interactive Functional Components**:
  - Global live search modal (`GlobalSearchModal.tsx`) across doctors, tests, and departments
  - Interactive appointment booking modal accessible from any page (`AppointmentModal.tsx`)
  - Toast notification system (`Toast.tsx`)
  - Sticky responsive header with mobile drawer menu (`Navbar.tsx`)

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Icons
- **Fonts**: Inter, Manrope, Hind Siliguri (Google Fonts)

---

## 🔌 Future Backend Integration Guide

The frontend architecture cleanly separates data models (`src/types/index.ts`) and data sources (`src/data/hospitalData.ts`) from UI components.

### Recommended REST API Endpoints:
```
GET    /api/doctors                   - List all doctors with schedule & department
GET    /api/doctors/:id               - Doctor profile details
GET    /api/departments               - List all 16 clinical departments
POST   /api/appointments              - Submit appointment booking
GET    /api/appointments/:refNo       - Track appointment serial status
POST   /api/contact                   - Submit inquiry message
POST   /api/careers/apply             - Submit job application with resume file
GET    /api/diagnostics/tests         - Retrieve diagnostic lab test catalog & pricing
```

---

## 🏥 Hospital Location & Contact

**Debidwar Medilab Hospital**  
Hospital Road, Debidwar Bazar, Debidwar, Cumilla - 3530, Bangladesh  
- **General Inquiry / Serial Hotline**: `+880 1711-234567`
- **Emergency Trauma 24/7**: `+880 1819-987654`
- **Ambulance Service 24/7**: `+880 1722-334455`
- **Email**: `info@debidwarmedilab.com`

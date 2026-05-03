export interface PageFAQ {
  question: string;
  answer: string;
}

export interface RelatedPage {
  path: string;
  label: string;
}

export interface PageConfig {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  defaultShiftHours?: number;
  defaultStartHour?: number;
  bodyContent: string;
  faqs: PageFAQ[];
  relatedPages: RelatedPage[];
}

export const ALL_PAGES: PageConfig[] = [
  {
    slug: "home",
    path: "/",
    title: "Clock Out Time Calculator - What Time Do I Get Off?",
    description: "Enter your start time and shift length to instantly see what time you clock out. Free clock-out calculator for shift workers, nurses, and hourly employees.",
    h1: "Clock Out Time Calculator",
    bodyContent: `Knowing exactly what time you get off work shouldn't require mental math. Whether you're a nurse finishing a 12-hour hospital shift, a retail associate on an 8-hour floor shift, or a factory worker running a 10-hour production line — this calculator gives you your clock-out time the moment you enter your start time.

Just pick when your shift starts, how long it is, and whether you have a paid or unpaid break. The result appears instantly: your clock-out time in both 12-hour and 24-hour format, your total paid hours, and an overtime indicator if you're crossing the 8 or 12-hour threshold.

Night shift workers are fully supported. If your shift crosses midnight, a "+1 day" label appears so you're never confused about whether 1:00 AM is today or tomorrow.

The "hours between two times" calculator below is useful when you already know your end time and want to confirm how many hours you're actually being paid for. And the weekly timecard tool lets you track multiple days at once — helpful for employees who work irregular schedules or split shifts.

**Who uses this tool?**

Shift workers across industries rely on this calculator daily. Hospital nurses managing 12-hour shifts need to know exactly when they hand off to the next team. Warehouse associates tracking 10-hour shifts during peak season use it to plan their commute. Retail managers scheduling overlapping shifts use it to avoid coverage gaps. Restaurant employees use it to calculate whether their doubles qualify for overtime pay.

**How the calculation works**

The formula is straightforward: clock-out time = start time + shift length. If there's a break, it doesn't change your clock-out time — it only affects your total paid hours (shift length minus break = paid hours). So an 8-hour shift with a 30-minute unpaid break means you clock out 8 hours after you started, but you're only paid for 7.5 hours.

Overtime kicks in at 8 hours of paid work (shown in orange) and at 12 hours (shown in red). These thresholds follow FLSA guidelines and most state overtime rules.`,
    faqs: [
      { question: "How do I calculate what time I get off work?", answer: "Add your paid shift length plus any unpaid break to your start time. For example, if you start at 9:00 AM and work 8 paid hours with a 30-minute unpaid lunch, you clock out at 5:30 PM. With no break, the same 8-hour paid shift ends at 5:00 PM." },
      { question: "Does my break time change when I clock out?", answer: "Yes — an unpaid break extends the total time you spend at work. So an 8-hour paid shift with a 30-minute unpaid lunch means you clock out 8 hours and 30 minutes after you started. Your paid hours remain 8." },
      { question: "What is the 'What time do I get off?' question really asking?", answer: "Most people want to know their clock-out time — when they physically leave the building. That's start time plus paid hours plus any unpaid break. This calculator gives you both that exit time and your paid hours." },
      { question: "How does overnight / night shift work in this calculator?", answer: "If your shift crosses midnight, the calculator detects this and shows a '+1 day' label. So a shift starting at 10:00 PM for 8 hours would clock out at 6:00 AM +1 day." },
      { question: "When does overtime start?", answer: "For most US workers, overtime starts after 8 hours in a workday (some state laws) or after 40 hours in a workweek (federal FLSA). California also mandates double-time after 12 hours in a day. This calculator flags daily overtime at 8 hours and double-time at 12 hours." },
    ],
    relatedPages: [
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/work-hours-calculator", label: "Hours Between Times" },
    ],
  },
  {
    slug: "8-hour-shift-calculator",
    path: "/8-hour-shift-calculator",
    title: "8-Hour Shift Calculator - Clock Out Time for 8h Shifts",
    description: "Calculate your clock-out time for any 8-hour shift. Enter your start time and see exactly when you get off, including overtime and break deductions.",
    h1: "8-Hour Shift Calculator",
    defaultShiftHours: 8,
    bodyContent: `The 8-hour workday is the foundation of modern labor law. Since Henry Ford famously standardized the 8-hour workday in 1926, it's been the benchmark for full-time employment across nearly every industry. Whether you're working a standard 9-to-5, a rotating 7-3 hospital shift, or a midshift in retail, knowing your exact clock-out time matters.

This calculator is pre-filled for 8-hour shifts. Enter your start time and it instantly calculates when you'll clock out — accounting for any unpaid breaks that reduce your paid hours but don't change your departure time.

**Common 8-hour shift schedules:**
- First shift: 7:00 AM – 3:00 PM
- Day shift: 9:00 AM – 5:00 PM  
- Second shift: 3:00 PM – 11:00 PM
- Swing shift: varies by industry

**Break rules for 8-hour shifts**

Federal law doesn't require employers to provide meal breaks, but most states do. A typical 8-hour shift in manufacturing or healthcare includes a 30-minute unpaid lunch. That means you clock out at 8 hours from your start time, but you're only paid for 7.5 hours. Some employers offer paid 15-minute rest breaks at the start or end, which don't reduce paid time.

**Overtime and the 8-hour day**

In California, any time worked beyond 8 hours in a single workday is paid at 1.5x your regular rate. For federal FLSA and most other states, overtime is calculated weekly — 40+ hours triggers the 1.5x rate regardless of daily hours. Know your state's rules, especially if you're being asked to stay late.

**Planning your commute around an 8-hour shift**

Most people commute 30–60 minutes each way. An 8-hour shift at a hospital starting at 7:00 AM means you need to leave home by 6:00–6:30 AM. With a 30-minute unpaid lunch, you'll clock out at exactly 3:00 PM and typically arrive home around 3:45–4:00 PM. Planning this precisely helps with childcare pickups, evening appointments, and meal prep.`,
    faqs: [
      { question: "If I start at 8 AM and work 8 hours, what time do I get off?", answer: "With no break, you clock out at 4:00 PM. With a 30-minute unpaid lunch, you clock out at 4:30 PM — your paid hours stay at 8 but you're at work for 8.5 hours total." },
      { question: "Does a 15-minute break count against my 8 hours?", answer: "Usually not. Federal law and most state laws require employers to pay for short rest breaks (under 20 minutes). A 15-minute break is typically paid, so it doesn't reduce your total paid hours." },
      { question: "Am I entitled to overtime if I work more than 8 hours in a day?", answer: "It depends on your state. California, Colorado, Nevada, and a few others require daily overtime after 8 hours. Most states follow federal FLSA, which only requires overtime after 40 hours in a workweek." },
      { question: "What's a typical 8-hour shift schedule in healthcare?", answer: "Hospitals commonly run 7-3, 3-11, and 11-7 shifts (day, evening, night). Each is exactly 8 hours. Nursing staff on 8-hour shifts often get 1-2 paid 15-minute breaks and an unpaid 30-minute meal break." },
      { question: "How many paid hours is an 8-hour shift with a 30-minute lunch?", answer: "8 paid hours. The 30-minute unpaid lunch extends your time at work to 8.5 hours but doesn't reduce your pay — your shift length is the paid portion." },
    ],
    relatedPages: [
      { path: "/", label: "Main Calculator" },
      { path: "/10-hour-shift-calculator", label: "10-Hour Shift Calculator" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
    ],
  },
  {
    slug: "10-hour-shift-calculator",
    path: "/10-hour-shift-calculator",
    title: "10-Hour Shift Calculator - 4-Day Work Week Clock Out Time",
    description: "Calculate clock-out times for 10-hour shifts. Popular for 4-day work weeks, construction, and manufacturing. Includes overtime and break calculation.",
    h1: "10-Hour Shift Calculator",
    defaultShiftHours: 10,
    bodyContent: `The 10-hour shift has surged in popularity as companies adopt compressed workweek schedules. Working four 10-hour days gives employees a three-day weekend every week — a powerful recruiting tool and a schedule many workers prefer over the traditional five-day, 8-hour week.

This calculator is pre-filled for 10-hour shifts. Select your start time and it shows your clock-out time instantly, along with overtime hours (since 10 hours exceeds the 8-hour daily threshold in some states) and your total paid time after any breaks.

**Industries that commonly use 10-hour shifts:**
- Construction and skilled trades (rotating 4/10 schedules)
- Manufacturing and logistics (4-day production runs)
- Healthcare (some hospital units and urgent care)
- Law enforcement and emergency services
- Oil and gas (extended field rotations)

**The 4/10 schedule explained**

In a 4/10 schedule, workers put in 40 hours across four days instead of five. This meets the federal overtime threshold exactly — no weekly overtime pay unless you're asked to work a fifth day. From the employee's perspective, every week has a guaranteed three-day weekend. Many workers report better work-life balance, lower commuting costs (one fewer commute day per week), and more flexibility for appointments and personal time.

**Overtime considerations for 10-hour shifts**

If you work in California, Alaska, or another state with daily overtime laws, you'll earn overtime pay for hours 9 and 10 of each shift at 1.5x your regular rate. That adds up — two overtime hours per day across four days is 8 overtime hours per week, significantly boosting your weekly paycheck. If your state only uses the federal 40-hour weekly threshold, a 4/10 schedule doesn't trigger overtime unless you work extra.

**Break requirements for long shifts**

Most states require a 30-minute unpaid meal break for shifts longer than 8 hours. Some require an additional meal break for shifts exceeding 10 hours. Check your state's labor code — California, for example, requires a second 30-minute meal break if you work more than 10 hours in a single shift.`,
    faqs: [
      { question: "What time do I get off if I start at 6 AM and work 10 hours?", answer: "With no break, you clock out at 4:00 PM. With a 30-minute unpaid meal break, you clock out at 4:30 PM — paid hours remain 10, total time at work is 10.5 hours." },
      { question: "Is a 4-day, 10-hour schedule considered overtime?", answer: "Not at the federal level — 4 x 10 = 40 hours, which is exactly the federal overtime threshold. However, in states with daily overtime laws (like California), hours 9 and 10 each day are paid at 1.5x." },
      { question: "Do I get two breaks during a 10-hour shift?", answer: "Federal law doesn't mandate meal breaks, but most states require at least one 30-minute break for shifts over 8 hours. Some states (including California) require a second meal break for shifts over 10 hours." },
      { question: "What industries use 10-hour shifts most often?", answer: "Construction, manufacturing, logistics, law enforcement, emergency services, and some healthcare facilities. The 4/10 schedule is popular because it gives employees a consistent three-day weekend." },
      { question: "How many paid hours is a 10-hour shift with a 30-minute lunch?", answer: "10 paid hours. The 30-minute unpaid meal break extends your total time at work to 10.5 hours but doesn't reduce your pay." },
    ],
    relatedPages: [
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift" },
      { path: "/12-hour-shift-calculator", label: "12-Hour Shift" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
    ],
  },
  {
    slug: "12-hour-shift-calculator",
    path: "/12-hour-shift-calculator",
    title: "12-Hour Shift Calculator for Nurses, Factory & Night Workers",
    description: "Calculate clock-out time for 12-hour shifts. Essential for nurses, hospital staff, and factory workers on 3-day or rotating schedules.",
    h1: "12-Hour Shift Calculator",
    defaultShiftHours: 12,
    bodyContent: `Twelve-hour shifts define life in hospitals, factories, emergency services, and many industrial settings. Working three days on, four days off — or four days on, three days off — is a rhythm that appeals to many workers, even though each individual shift is genuinely long. This calculator helps you nail down exactly when your shift ends, no matter what time it started.

This calculator is pre-filled for 12-hour shifts. The overtime indicators are particularly important here: in most states, any work beyond 8 hours in a day earns overtime pay at 1.5x, and hours beyond 12 hours earn double time in California. Understanding your hours is money in your pocket.

**Who works 12-hour shifts?**

- **Nurses and hospital staff**: ICU, ER, med-surg, and specialty units commonly run 12-hour shifts (7 AM–7 PM or 7 PM–7 AM). Working three shifts per week equals 36 hours — most hospitals count this as full-time.
- **Factory and manufacturing workers**: Assembly lines, automotive plants, and continuous production facilities run 12-hour rotations to keep lines running around the clock.
- **Police and firefighters**: Many departments use 12-hour shifts to improve coverage and reduce handoff errors.
- **Power plant and utility workers**: 24/7 facilities require continuous staffing on 12-hour blocks.

**The 3-day work week reality**

Three 12-hour shifts add up to 36 hours. For nurses, this typically counts as full-time with benefits. For hourly workers who need 40 hours, a fourth shift may be required — which often triggers significant overtime pay. Understanding your exact hours worked is critical for ensuring you're being paid correctly.

**What "7 to 7" actually means**

A "7 to 7" shift in healthcare is 7:00 AM to 7:00 PM (day shift) or 7:00 PM to 7:00 AM (night shift). These are 12-hour shifts. With a 30-minute unpaid meal break, paid hours are 11.5. Most states require at least two paid 15-minute rest breaks during a 12-hour shift, which are included in the 12 hours and don't reduce pay.`,
    faqs: [
      { question: "What time do I get off a 12-hour shift starting at 7 AM?", answer: "With no break, you clock out at 7:00 PM. With a 30-minute unpaid meal break, you clock out at 7:30 PM — paid hours stay at 12, total time at work is 12.5 hours." },
      { question: "How many days per week do nurses typically work 12-hour shifts?", answer: "Most hospital nurses work three 12-hour shifts per week, totaling 36 hours. Many hospitals classify this as full-time for benefits purposes. Some nurses work four shifts to get 48 hours, earning significant overtime." },
      { question: "Does double-time apply to 12-hour shifts?", answer: "In California, any hours worked beyond 12 in a single workday are paid at double time (2x). Other states don't have this daily double-time rule but may require it after 60 hours in a workweek." },
      { question: "Is it legal to work a 12-hour shift without a break?", answer: "In most states, shifts over 8-10 hours require at least one 30-minute meal break. Some states require two meal breaks for shifts over 12 hours. Check your state's labor laws — working through a required break may entitle you to penalty pay." },
      { question: "What are the most common 12-hour shift patterns?", answer: "The 'Pitman' schedule (2-3 day on/off rotation), '3-4 pattern' (three days on, four off), and rotating schedules that include both day and night shifts are most common in healthcare and industrial settings." },
    ],
    relatedPages: [
      { path: "/night-shift-calculator", label: "Night Shift Calculator" },
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/double-time-calculator", label: "Double-Time Calculator" },
    ],
  },
  {
    slug: "6-hour-shift-calculator",
    path: "/6-hour-shift-calculator",
    title: "6-Hour Shift Calculator - Part-Time Work Clock Out Time",
    description: "Calculate your clock-out time for a 6-hour part-time shift. Great for students, part-time workers, and flexible schedules.",
    h1: "6-Hour Shift Calculator",
    defaultShiftHours: 6,
    bodyContent: `Six-hour shifts occupy a sweet spot in the workforce: long enough to justify a full commute and be productive, short enough to accommodate school schedules, second jobs, family responsibilities, and medical needs. Part-time retail, food service, healthcare aides, and many gig economy roles are built around 6-hour shifts.

This calculator is pre-filled for 6-hour shifts. Enter your start time and see your clock-out time, your paid hours after any breaks, and whether you're approaching overtime territory.

**Who works 6-hour shifts?**

Students balancing coursework with employment are the most common 6-hour shift workers. A shift from 4:00 PM to 10:00 PM fits neatly after afternoon classes. Retail and food service are built on 6-hour part-time shifts specifically designed to avoid crossing the 40-hour weekly threshold that triggers overtime and, in some companies, benefits eligibility.

Healthcare aides in home health, adult day programs, and assisted living facilities often work 6-hour shifts that align with clients' daytime care needs. Administrative and office support roles frequently use 6-hour schedules for job-share arrangements.

**Break rules for 6-hour shifts**

Federal law doesn't mandate breaks, but many states require a 30-minute meal break for shifts over 5 or 6 hours. Some states (like California) require a meal break only if the shift exceeds 5 hours but allow the employee and employer to waive it if the total shift doesn't exceed 6 hours and both parties agree. Short paid rest breaks (10-15 minutes) are typically required for every 4 hours worked in states that mandate them.

**Financial considerations**

Part-time workers on 6-hour shifts often lack access to benefits like health insurance, paid time off, and retirement plans. Understanding your exact paid hours is critical if you're working multiple part-time jobs or tracking hours for benefits thresholds. Some companies offer benefits after 30 hours per week — three 6-hour shifts gets you to 18 hours, requiring additional days to qualify.`,
    faqs: [
      { question: "What time do I get off a 6-hour shift starting at 10 AM?", answer: "With no break, you clock out at 4:00 PM. With a 30-minute unpaid meal break, you clock out at 4:30 PM — your paid hours remain 6, total time at work is 6.5 hours." },
      { question: "Do I get a break during a 6-hour shift?", answer: "It depends on your state. California allows waiving the meal break for shifts up to 6 hours if both you and your employer agree. Most states require a break for shifts over 5 or 6 hours. Check your state's labor laws." },
      { question: "Is overtime possible on a 6-hour shift?", answer: "Rarely for a single shift, since daily overtime thresholds (8 hours) aren't reached. But if you work multiple 6-hour shifts in a week and exceed 40 total hours, you'd earn overtime under federal law." },
      { question: "What industries most commonly use 6-hour shifts?", answer: "Retail, food service, healthcare (aides and support staff), administrative support, and education (classroom aides, after-school programs). Six-hour shifts are common wherever employers need coverage without full-time commitments." },
      { question: "Can a 6-hour shift become full-time if I work five days?", answer: "Five 6-hour shifts equals 30 hours — this is considered part-time by most employers. To reach full-time status (typically 35-40 hours), you'd need to add additional hours or days." },
    ],
    relatedPages: [
      { path: "/4-hour-shift-calculator", label: "4-Hour Shift" },
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift" },
      { path: "/work-hours-calculator", label: "Hours Between Times" },
      { path: "/", label: "Main Calculator" },
    ],
  },
  {
    slug: "4-hour-shift-calculator",
    path: "/4-hour-shift-calculator",
    title: "4-Hour Shift Calculator - Student & Part-Time Clock Out Time",
    description: "Calculate your clock-out time for a 4-hour shift. Perfect for students, weekend workers, and anyone working minimal-hour part-time jobs.",
    h1: "4-Hour Shift Calculator",
    defaultShiftHours: 4,
    bodyContent: `Four-hour shifts are the shortest common shift in most industries — a half-day of work that provides supplemental income without consuming a full day. These are common in retail on weekends, food service during peak meal hours, student jobs, and coverage shifts where a business needs extra hands for just a few hours.

This calculator pre-fills the 4-hour shift length. Enter your start time and you'll see your exact clock-out time plus your paid hours. For a 4-hour shift, there are typically no required meal breaks (most states only require breaks for longer shifts), so your paid time usually equals your shift length.

**Common 4-hour shift examples:**

- Retail opening shifts: 8:00 AM – 12:00 PM (morning stock and prep)
- Lunch-rush food service: 10:30 AM – 2:30 PM
- Closing shifts: 8:00 PM – 12:00 AM
- Event staffing: variable start, 4-hour coverage
- After-school retail: 4:00 PM – 8:00 PM

**Students and the 4-hour shift**

High school and college students frequently work 4-hour shifts because they fit between classes and extracurricular commitments. A Tuesday and Thursday 5:00 PM – 9:00 PM schedule earns 8 hours per week without interfering with academics. Weekend 4-hour shifts (morning Saturday and Sunday) earn 8 hours while preserving weekdays for studying.

**Minimum shift lengths and reporting time pay**

Some states have "reporting time pay" laws that require employers to pay a minimum number of hours if a scheduled employee is sent home early. California requires employers to pay at least half the scheduled shift, with a minimum of 2 hours and a maximum of 4 hours, when an employee is turned away. If you're scheduled for a 4-hour shift and sent home after 1 hour, you may be entitled to 2 hours of pay.

**Tax implications of short shifts**

At very low weekly hours (under 20), you're likely solidly in part-time territory with minimal tax withholding. However, if you work multiple jobs, each employer withholds taxes independently — you could end up owing at tax time. Understanding your exact hours helps you estimate your total annual income accurately.`,
    faqs: [
      { question: "If I start at 9 AM and work 4 hours, what time do I clock out?", answer: "You clock out at 1:00 PM. A 4-hour shift rarely includes an unpaid break (most states don't require meal breaks for shifts under 5-6 hours), so your paid hours are typically 4.0." },
      { question: "Do I get any breaks on a 4-hour shift?", answer: "Most states don't require meal breaks for 4-hour shifts. However, you may be entitled to a paid 10-15 minute rest break if your state mandates it — California requires a paid 10-minute break for every 4 hours worked." },
      { question: "What is reporting time pay for a 4-hour shift?", answer: "In California, if you're scheduled for 4 hours and sent home early, you're entitled to pay for at least half your scheduled shift (2 hours minimum). Other states like Massachusetts, New York, and New Hampshire have similar protections." },
      { question: "Can working two 4-hour shifts per day be considered a split shift?", answer: "Yes — two 4-hour shifts with a gap between them constitutes a split shift. California requires additional pay (split shift premium) when the total pay for the two shifts doesn't exceed minimum wage for all hours worked." },
      { question: "How many weeks would I need to work 4-hour shifts to reach 40 hours?", answer: "If you work one 4-hour shift per day, you'd need 10 shifts to reach 40 hours. Five 4-hour shifts per week gives you 20 hours — exactly half a full-time schedule." },
    ],
    relatedPages: [
      { path: "/6-hour-shift-calculator", label: "6-Hour Shift" },
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift" },
      { path: "/break-time-calculator", label: "Break Time Calculator" },
      { path: "/", label: "Main Calculator" },
    ],
  },
  {
    slug: "night-shift-calculator",
    path: "/night-shift-calculator",
    title: "Night Shift Calculator - What Time Do I Get Off Night Shift?",
    description: "Calculate night shift clock-out times that cross midnight. Shows '+1 day' for overnight shifts. For nurses, security, factory, and hospitality workers.",
    h1: "Night Shift Calculator",
    defaultShiftHours: 8,
    defaultStartHour: 23,
    bodyContent: `Night shift workers face a unique calculation challenge: their shifts cross midnight, making it genuinely confusing to figure out when they clock out. A shift that starts at 11:00 PM and runs 8 hours ends at 7:00 AM the next day — but which day? This calculator handles overnight shifts correctly, displaying your clock-out time with a "+1 day" label whenever your shift crosses midnight.

The calculator defaults to a late-evening start time. Enter your actual start time, set your shift length, account for any breaks, and get your exact clock-out time.

**Common night shift schedules:**

- Hospital night shift: 7:00 PM – 7:00 AM (12 hours)
- Manufacturing 3rd shift: 11:00 PM – 7:00 AM (8 hours)
- Security and patrol: 10:00 PM – 6:00 AM (8 hours)
- Hospitality late shift: 11:00 PM – 7:00 AM (8 hours)
- Emergency services: 6:00 PM – 6:00 AM (12 hours)
- Transportation/trucking: various overnight windows

**Health considerations of night shift work**

Night shift workers have unique health challenges. The body's circadian rhythm is designed for daytime wakefulness and nighttime sleep. Working against this rhythm elevates risk for metabolic disorders, cardiovascular issues, and sleep disruption. Knowing your exact clock-out time helps you optimize your sleep schedule — arriving home at 7:15 AM means you need blackout curtains, a sleep mask, and a plan to get to bed by 8:00 AM to get adequate sleep before your next shift.

**Night shift differentials**

Many employers pay a shift differential for night work — typically 10-25% more per hour for shifts starting after 6:00 PM or 7:00 PM. Hospital nurses often earn $2–$5 more per hour on night shift. Security guards, factory workers, and hospitality staff may receive a fixed differential. Make sure you're being paid correctly by confirming your total hours and checking your pay stub.

**Planning around a night shift**

Knowing your clock-out time lets you plan the rest of your day. An 8-hour shift from 11:00 PM to 7:00 AM means you can schedule a doctor's appointment at 10:00 AM — giving yourself three hours to sleep before an appointment and returning to bed after for more sleep before your next shift.`,
    faqs: [
      { question: "If I start night shift at 10 PM, what time do I clock out after 8 hours?", answer: "You clock out at 6:00 AM the next day. This calculator shows '+1 day' to make it clear your clock-out is the following morning, not the same day." },
      { question: "How do I track hours on a night shift that crosses midnight?", answer: "Count from your start time to your end time across the midnight boundary. 11:00 PM to 7:00 AM = 8 hours. This calculator does this automatically — just enter your start time and shift length." },
      { question: "Do night shift workers get paid more?", answer: "Many employers offer a shift differential for night shifts — typically 10-25% more per hour. This is a negotiated or company-set rate, not a legal requirement under federal law. Some union contracts and healthcare employers mandate differentials." },
      { question: "What is the third shift in manufacturing?", answer: "Third shift (also called the graveyard or overnight shift) typically runs from 11:00 PM to 7:00 AM, covering the overnight period. First shift is usually 7 AM–3 PM and second shift is 3 PM–11 PM." },
      { question: "Is night shift harder on the body than day shift?", answer: "Research consistently shows night shift work disrupts circadian rhythms, which can affect sleep quality, metabolism, and long-term health. Strategies like consistent sleep schedules, blackout curtains, and strategic light exposure can help mitigate effects." },
    ],
    relatedPages: [
      { path: "/12-hour-shift-calculator", label: "12-Hour Shift" },
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift" },
      { path: "/what-time-do-i-clock-out", label: "What Time Do I Clock Out" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
    ],
  },
  {
    slug: "work-hours-calculator",
    path: "/work-hours-calculator",
    title: "Work Hours Calculator - Hours Between Two Times",
    description: "Calculate how many hours and minutes are between two times. Handles overnight shifts. Free tool for tracking work hours between start and end time.",
    h1: "Work Hours Calculator",
    bodyContent: `Sometimes you don't know your shift length ahead of time — you just know when you started and when you finished. This calculator takes a start time and end time and tells you exactly how many hours and minutes elapsed. It handles overnight shifts correctly, so a shift from 9:00 PM to 5:00 AM correctly shows 8 hours, not negative time.

This tool is useful for verifying payroll, calculating total work time before submitting a timesheet, checking if you've hit overtime, or simply confirming your hours when your schedule doesn't follow a standard shift length.

**When to use this vs. the clock-out calculator**

Use this "hours between two times" tool when you already know both your start and end time and want to know how many hours you worked. Use the main clock-out calculator when you know your start time and shift length but want to find your clock-out time.

**Common use cases:**

- Verifying timesheet entries before submitting to payroll
- Calculating hours for a freelance or consulting invoice
- Confirming you've reached a daily or weekly hour target
- Checking overtime eligibility based on actual hours worked
- Calculating hours for a shift that ran longer or shorter than scheduled

**Overnight shift calculation explained**

When your end time is earlier on the clock than your start time, the calculator assumes you worked through midnight. A shift from 11:00 PM to 7:00 AM is 8 hours, not -16 hours. If you want to verify this, count forward from 11:00 PM: 11 PM → midnight = 1 hour, midnight → 7 AM = 7 hours, total = 8 hours. The calculator handles this automatically.

**Including and excluding breaks**

This tool calculates raw time between two clock punches. If you took a 30-minute unpaid lunch, subtract that separately to get your paid hours. Or use the main calculator and enter both your start time and shift length — it handles break deductions automatically.`,
    faqs: [
      { question: "How do I calculate hours worked between two times?", answer: "Subtract the start time from the end time. For overnight shifts (end time is earlier than start time), add 24 hours to the end time first. Example: 9 PM to 6 AM = 9 hours (6 AM + 24 hours = 30, minus 21 = 9)." },
      { question: "What if my start and end time are on different days?", answer: "This calculator handles overnight shifts automatically. If your end time is earlier than your start time, it assumes the shift crossed midnight and calculates accordingly." },
      { question: "How do I account for an unpaid break in my hours calculation?", answer: "This calculator shows total time between two clock punches. To calculate paid hours, subtract your unpaid break manually. If you worked 8 hours 30 minutes with a 30-minute break, your paid hours are 8.0." },
      { question: "Can I use this to calculate billable hours for a freelance project?", answer: "Yes — enter your start and end time for a work session and get the exact duration. For multiple sessions, use the timecard calculator to sum several time periods." },
      { question: "What's the difference between this and a timecard calculator?", answer: "This tool calculates hours for a single time period. The timecard calculator adds up multiple days of work to give you a weekly total." },
    ],
    relatedPages: [
      { path: "/", label: "Clock Out Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
      { path: "/how-many-hours-did-i-work", label: "How Many Hours Did I Work" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
    ],
  },
  {
    slug: "timecard-calculator",
    path: "/timecard-calculator",
    title: "Timecard Calculator - Weekly Hours & Overtime Tracker",
    description: "Calculate total weekly work hours across multiple days. Enter start and end times for each day, see daily hours, weekly total, and overtime breakdown.",
    h1: "Timecard Calculator",
    bodyContent: `Tracking your hours across a full week is essential for accurate payroll, overtime monitoring, and personal budgeting. This weekly timecard calculator lets you enter start and end times for up to seven days — including breaks — and instantly shows your daily hours, weekly total, and where you stand on overtime.

Enter as few or as many days as you worked. Each row shows the hours for that day. The summary at the bottom tallies your week and flags regular hours, overtime (over 40 hours), and whether you're approaching the thresholds.

**Why track your timecard manually?**

Even if your employer uses a time clock or automated system, independently tracking your hours protects you. Payroll errors happen. Time clock glitches occur. Manager adjustments get made without employee knowledge. Keeping your own record means you can spot discrepancies and raise them before payday.

Employees who track their own hours catch errors more often and are more confident requesting corrections. It's also useful for understanding your own working patterns — are you consistently going over 8 hours on certain days? Are you approaching 40 hours mid-week and at risk of not getting paid for overtime?

**Weekly overtime calculation**

Federal law (FLSA) requires overtime pay at 1.5x for hours worked over 40 in a workweek. This applies to most non-exempt hourly employees regardless of industry. If you work 44 hours in a week, 40 hours are paid at your regular rate and 4 hours are paid at 1.5x. Some states add daily overtime rules — California requires overtime after 8 hours in a single day, additional overtime after 12 hours daily.

**Using the timecard for multiple jobs**

If you work more than one job, track each employer's hours separately. FLSA overtime applies per employer — working 25 hours at job A and 25 hours at job B doesn't trigger overtime at either job, even though your total is 50 hours.`,
    faqs: [
      { question: "How do I calculate my total weekly work hours?", answer: "Add up the hours for each day you worked. For each day, calculate hours worked by subtracting the start time from the end time, then subtract any unpaid breaks. Sum all days for your weekly total." },
      { question: "When does federal overtime kick in?", answer: "Federal law (FLSA) requires overtime pay (1.5x) for non-exempt employees who work more than 40 hours in a workweek. Your employer must count hours worked, not hours scheduled." },
      { question: "Does my lunch break count toward my 40 hours?", answer: "No — unpaid meal breaks are not counted as hours worked under FLSA. Only time you're required to be at work and performing duties counts toward your 40-hour threshold." },
      { question: "What if I work a partial day — do I still get full-day pay?", answer: "For hourly workers, you're generally paid only for hours actually worked. Salaried exempt employees are typically paid their full weekly salary regardless of days or hours, with some exceptions." },
      { question: "Can my employer change my timecard without telling me?", answer: "Employers are required to maintain accurate time records and pay employees for all hours worked. Altering timecards without employee knowledge may violate FLSA. If you suspect unauthorized changes, document your hours independently and consult your state's labor board." },
    ],
    relatedPages: [
      { path: "/work-hours-calculator", label: "Hours Between Times" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/how-many-hours-did-i-work", label: "How Many Hours Did I Work" },
      { path: "/", label: "Clock Out Calculator" },
    ],
  },
  {
    slug: "overtime-calculator",
    path: "/overtime-calculator",
    title: "Overtime Calculator - Calculate Overtime Pay & Hours",
    description: "Calculate your overtime pay based on hours worked, hourly rate, and state. Shows regular pay, time-and-a-half, and double-time earnings.",
    h1: "Overtime Calculator",
    bodyContent: `Overtime pay can add hundreds of dollars to your paycheck if you're working more than 40 hours per week — or more than 8 hours per day in states with daily overtime laws. This calculator shows exactly what you should earn based on your hours worked, your hourly rate, and your state.

Enter your total hours worked this week, your regular hourly rate, and your state. The calculator breaks down your regular pay, overtime pay (hours 41-60 at 1.5x), and double-time pay (hours over 60, or daily thresholds in certain states).

**Federal overtime rules (FLSA)**

The Fair Labor Standards Act requires overtime pay at 1.5x the regular rate for all hours over 40 per workweek. This applies to most non-exempt hourly employees in the private sector. Exempt employees (salaried professionals, executives, and some administrative staff earning over $684/week) are not entitled to overtime.

**California overtime rules**

California has the strictest overtime laws in the country: daily overtime (1.5x) kicks in after 8 hours worked in a single day, and double time (2x) applies after 12 hours in a single day. The weekly calculation still applies on top of this — any hours over 40 in a week are overtime regardless of daily amounts.

**Other states with daily overtime laws**

Alaska, Colorado, Nevada, and a few other states require daily overtime after 8 hours. Always check your specific state's labor code or consult the Department of Labor for the most current rules.

**Common overtime misconceptions**

Many employees believe their employer must offer overtime — this isn't true. Employers can prohibit unauthorized overtime and discipline employees who work it. However, they must still pay for unauthorized overtime that was actually worked. "Work now, pay later" or refusing overtime pay for unauthorized hours is illegal under FLSA.`,
    faqs: [
      { question: "How is overtime pay calculated?", answer: "Take the hours worked over 40 in a week, multiply by 1.5 times your regular hourly rate. Example: 44 hours at $15/hr = 40 regular hours ($600) + 4 OT hours ($15 x 1.5 = $22.50 x 4 = $90) = $690 total." },
      { question: "Does my employer have to pay overtime?", answer: "If you're a non-exempt employee under FLSA and work over 40 hours in a workweek, yes — your employer must pay 1.5x for those hours. They can discipline you for unauthorized overtime, but they must still pay for it." },
      { question: "What is double time, and when does it apply?", answer: "Double time is 2x your regular hourly rate. It applies in California after 12 hours in a single workday. Some employers offer it voluntarily (often on holidays) even if not legally required by state law." },
      { question: "Can my employer avoid overtime by averaging hours across two weeks?", answer: "No — FLSA doesn't allow employers to average hours across multiple workweeks. Each workweek stands alone for overtime calculation, even if your employer pays you biweekly." },
      { question: "Are salaried workers entitled to overtime?", answer: "Salaried employees earning less than $684/week ($35,568/year) are generally entitled to overtime under FLSA. Those earning more may be exempt depending on their job duties. The 'salary level test' and 'duties test' both must be met for exemption." },
    ],
    relatedPages: [
      { path: "/time-and-a-half-calculator", label: "Time-and-a-Half Calculator" },
      { path: "/double-time-calculator", label: "Double-Time Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
      { path: "/how-many-hours-did-i-work", label: "How Many Hours Did I Work" },
    ],
  },
  {
    slug: "how-many-hours-did-i-work",
    path: "/how-many-hours-did-i-work",
    title: "How Many Hours Did I Work? - Enter Start & End Time",
    description: "Enter your start and end time to calculate exactly how many hours and minutes you worked. Handles overnight shifts automatically.",
    h1: "How Many Hours Did I Work?",
    bodyContent: `You punched in, you punched out, and now you're wondering: how many hours did I actually work? Maybe your time clock printout was unclear, maybe you worked through a busy period and lost track, or maybe you just want to double-check your paycheck before it arrives. This tool gives you the answer in seconds.

Enter your start time and end time, and the calculator shows your total hours and minutes worked. It handles overnight shifts automatically — a shift from 10:00 PM to 6:00 AM correctly calculates as 8 hours, not a negative number.

**Why you might need this calculator:**

- Your paper timesheet needs filling out and you're estimating hours
- You want to verify your paycheck before direct deposit hits
- You're a freelancer billing a client by the hour
- You worked an unexpected overtime shift and want to know the damage
- You're tracking hours for a visa, internship, or academic requirement
- Your employer's payroll system rounds differently than you expected

**How payroll rounding works**

Many employers use a "rounding" policy for time records — rounding punches to the nearest 5, 6, 10, or 15 minutes. Under FLSA, this is legal if it's done neutrally over time (sometimes rounding up, sometimes rounding down, averaging out in the employee's favor). If your employer always rounds down, that may be a wage theft issue worth investigating.

**The difference between clock time and paid time**

Your total hours from start to end include any unpaid break time. If you worked from 8:00 AM to 5:00 PM (9 hours) with a 30-minute unpaid lunch, your paid time is 8.5 hours. This calculator shows clock time — subtract your breaks to get paid hours.

**Building a habit of checking your hours**

Workers who track their own hours regularly catch payroll errors significantly more often than those who don't. It takes less than a minute per day — just note your start and end time. This simple habit has helped thousands of workers identify and recover unpaid wages.`,
    faqs: [
      { question: "If I start at 8:30 AM and end at 4:45 PM, how many hours did I work?", answer: "You worked 8 hours and 15 minutes (8.25 hours). From 8:30 AM to 4:30 PM is 8 hours, plus 15 more minutes to 4:45 PM. Subtract any unpaid breaks for your paid hours." },
      { question: "How do I calculate hours that cross midnight?", answer: "Add 24 hours (1440 minutes) to your end time before subtracting. Or simply use this calculator — it detects overnight shifts automatically." },
      { question: "My employer rounds my hours — is that legal?", answer: "Yes, under FLSA, employers may round time to the nearest 5-15 minutes, as long as the rounding policy averages out neutrally over time. If rounding consistently reduces your pay, that may be illegal." },
      { question: "How do I convert hours and minutes to decimal hours for payroll?", answer: "Divide the minutes by 60 and add to hours. 8 hours 15 minutes = 8 + (15/60) = 8.25 hours. Multiply decimal hours by your hourly rate to get pay." },
      { question: "What's the best way to track my hours accurately?", answer: "Note your exact start and end times each day, including break times. Use a simple notebook, phone note, or spreadsheet. Keep records for at least 2 years in case of payroll disputes." },
    ],
    relatedPages: [
      { path: "/work-hours-calculator", label: "Work Hours Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/", label: "Clock Out Calculator" },
    ],
  },
  {
    slug: "time-and-a-half-calculator",
    path: "/time-and-a-half-calculator",
    title: "Time-and-a-Half Calculator - Overtime Rate & Pay",
    description: "Calculate your time-and-a-half overtime pay. Enter your hourly rate and overtime hours to see your OT rate, OT pay, and total earnings.",
    h1: "Time-and-a-Half Calculator",
    bodyContent: `Time-and-a-half, or 1.5x your regular hourly rate, is the standard overtime premium required by federal law for non-exempt employees who work more than 40 hours in a workweek. Knowing your exact overtime rate and expected overtime pay helps you understand your paycheck and verify you're being compensated correctly.

Enter your regular hourly rate and the number of overtime hours you worked, and this calculator shows your overtime rate, your overtime pay for those hours, and your total earnings including regular time.

**How time-and-a-half is calculated:**

The formula is simple: Overtime rate = Regular rate × 1.5. For example, if your regular rate is $18.00 per hour, your overtime rate is $18.00 × 1.5 = $27.00 per hour. If you worked 5 overtime hours, your overtime pay is 5 × $27.00 = $135.00.

**When does time-and-a-half apply?**

Under federal FLSA, time-and-a-half is required for any non-exempt employee who works more than 40 hours in a single workweek. Some states have additional daily overtime rules — in California, Colorado, Nevada, and Alaska, daily overtime (1.5x) kicks in after 8 hours in a single workday, even if you haven't reached 40 hours for the week.

**Common misconceptions about overtime rates:**

Some employees believe that comp time (time off instead of overtime pay) is a legal alternative. In the private sector, this is generally not allowed under FLSA — private employers must pay overtime in cash, not time off. Government employers may offer comp time in some situations.

Another misconception is that salaried employees can't earn overtime. Salaried non-exempt employees (those earning under $684/week) are entitled to overtime pay. Your employment classification matters more than your pay structure.

**Budgeting your overtime income:**

Overtime pay is taxed at your regular income tax rate — there's no special overtime tax rate, despite what many people believe. However, a larger paycheck may push you into a higher withholding bracket temporarily. Your marginal tax rate applies to overtime income just like regular income.`,
    faqs: [
      { question: "What is time-and-a-half pay?", answer: "Time-and-a-half pay is your regular hourly rate multiplied by 1.5. If you earn $20/hr, your OT rate is $30/hr. It's required by federal law (FLSA) for non-exempt employees working over 40 hours per week." },
      { question: "How do I calculate my overtime rate?", answer: "Multiply your regular hourly rate by 1.5. If you earn $15.50/hr, your OT rate is $15.50 × 1.5 = $23.25/hr. Then multiply by OT hours worked to get your total OT pay." },
      { question: "Does time-and-a-half apply every day or only after 40 hours?", answer: "Federally, it applies after 40 hours per workweek. In California, Colorado, Alaska, and Nevada, daily overtime (1.5x) applies after 8 hours in a single workday as well." },
      { question: "Can my employer give me comp time instead of overtime pay?", answer: "Not if you work in the private sector — FLSA requires private employers to pay overtime in wages, not compensatory time off. Government employers may offer comp time in some circumstances." },
      { question: "Is overtime pay taxed at a higher rate?", answer: "No. Overtime pay is taxed as regular income. There's no special 'overtime tax rate.' However, a larger paycheck may result in higher withholding that period, which is reconciled when you file your taxes." },
    ],
    relatedPages: [
      { path: "/double-time-calculator", label: "Double-Time Calculator" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
      { path: "/how-many-hours-did-i-work", label: "How Many Hours Did I Work" },
    ],
  },
  {
    slug: "double-time-calculator",
    path: "/double-time-calculator",
    title: "Double-Time Calculator - 2x Overtime Pay Rate",
    description: "Calculate your double-time pay (2x hourly rate). Used for California daily overtime over 12 hours, holidays, and union contracts.",
    h1: "Double-Time Calculator",
    bodyContent: `Double time — pay at twice your regular hourly rate — applies in specific situations defined by state law or employer policy. California mandates double time for hours worked beyond 12 in a single workday. Many union contracts require double time on holidays or Sundays. Some employers voluntarily offer double time to attract workers for undesirable shifts.

Enter your hourly rate and the number of double-time hours, and this calculator shows your 2x rate, your double-time earnings, and total pay.

**When double time is legally required:**

California has the most robust double-time law in the US. Any non-exempt employee who works more than 12 hours in a single workday is entitled to double time for those additional hours. California also requires double time for all hours on the seventh consecutive workday in a workweek, regardless of daily hours.

No other US state currently mandates daily double time at the 12-hour mark, though some states may have specific industry rules. Federal law (FLSA) doesn't require double time at any threshold.

**Double time in union contracts:**

Many collective bargaining agreements require double time for holiday work, Sunday work, or hours beyond a certain weekly threshold. Common union double-time triggers include working on any of 10-12 named holidays, working more than 10 hours in a day, or working more than 50 hours in a week. Always check your specific CBA.

**Double time on holidays:**

Even outside union contracts, many employers offer double time on major holidays as a recruiting tool and to reward employees working during family time. This is a voluntary employer policy, not legally required federally or in most states. If your employer offers "holiday double time," verify which holidays qualify and whether you're entitled to it or it's discretionary.

**Calculating double time alongside overtime:**

If you're in California and work 14 hours in a day, your pay breaks down as: regular rate for hours 1-8, 1.5x for hours 9-12, and 2x for hours 13-14. This calculator handles the double-time portion — use the overtime calculator for the full breakdown.`,
    faqs: [
      { question: "What is double-time pay?", answer: "Double time is pay at 2x your regular hourly rate. Mandatory in California after 12 hours in a single day, and on the seventh consecutive workday. Often offered voluntarily on holidays." },
      { question: "If I earn $20/hr, what is my double-time rate?", answer: "Your double-time rate is $40/hr ($20 × 2). For every hour of double time you work, you earn $40." },
      { question: "Does federal law require double-time pay?", answer: "No — FLSA doesn't require double time at any threshold. Only California mandates daily double time (after 12 hours or on the 7th consecutive workday). Other states may have specific industry rules." },
      { question: "Do I get double time on holidays?", answer: "Not automatically under federal law. Holiday double time is either contractually required (union agreements), a voluntary employer policy, or required by some state laws for specific industries. Check your employment contract or employee handbook." },
      { question: "How does double time interact with time-and-a-half?", answer: "They apply to different hour ranges. In California: regular rate for hours 1-8, time-and-a-half (1.5x) for hours 9-12, and double time (2x) for hours beyond 12 in a single workday." },
    ],
    relatedPages: [
      { path: "/time-and-a-half-calculator", label: "Time-and-a-Half Calculator" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
      { path: "/12-hour-shift-calculator", label: "12-Hour Shift Calculator" },
      { path: "/timecard-calculator", label: "Timecard Calculator" },
    ],
  },
  {
    slug: "break-time-calculator",
    path: "/break-time-calculator",
    title: "Break Time Calculator - How Long Is Your Required Break?",
    description: "Find out how many breaks you're legally entitled to based on your shift length and state. Calculate total paid vs unpaid break time.",
    h1: "Break Time Calculator",
    bodyContent: `Break entitlements vary dramatically by state, shift length, and employer. Federal law provides minimal guidance — FLSA says short breaks (under 20 minutes) must be paid, and longer meal breaks (30+ minutes where you're completely off duty) may be unpaid. Beyond that, state laws determine whether breaks are required at all.

This page explains break requirements by shift length and helps you understand what you're entitled to.

**Federal break rules (baseline for all states):**

Under FLSA, employers are not federally required to provide meal breaks or rest periods. However, if they do provide a break of 20 minutes or less, it must be paid. If they provide a longer break where you're completely relieved of duties, it may be unpaid. Short rest breaks given as a practical matter (to use the restroom, briefly rest) count as paid work time.

**California break requirements (strictest in the US):**

- Shifts over 5 hours: one 30-minute unpaid meal break required (may be waived by mutual consent for shifts of 6 hours or less if both parties agree)
- Shifts over 10 hours: a second 30-minute unpaid meal break required (waivable if total hours don't exceed 12 and first break wasn't waived)
- Every 4 hours worked (or major fraction thereof): one paid 10-minute rest break
- Failure to provide required breaks: one hour of premium pay (penalty) per missed break per day

**Other states with strong break laws:**

Washington requires a 30-minute meal break for shifts over 5 hours. Oregon requires a 30-minute break for shifts over 6 hours and paid 10-minute breaks for every 4 hours. New York requires 30 to 60 minutes depending on industry and shift timing. Colorado requires 30-minute meal breaks for shifts over 5 hours and 10-minute paid rest breaks every 4 hours.

**What to do if you're not getting your breaks:**

Document missed breaks in writing (date, shift, break not received). Check your state's labor board website for your specific rights. File a wage claim if needed — missed California breaks, for example, entitle you to one hour of premium pay per violation.`,
    faqs: [
      { question: "Am I legally required to get a break at work?", answer: "It depends on your state. Federal law doesn't mandate breaks, but many states do. California, Washington, Oregon, New York, Colorado, and others require meal and/or rest breaks based on shift length." },
      { question: "If I take a break, does it reduce my paid hours?", answer: "Only unpaid breaks (typically 30+ minutes where you're completely off duty) reduce your paid hours. Short breaks under 20 minutes are generally paid under federal law. A 30-minute unpaid lunch is subtracted from your wages." },
      { question: "What happens if my employer doesn't give me a required break?", answer: "In California, you're entitled to one additional hour of pay for each missed meal break and each missed rest period. Other states have varying penalties. You can file a wage claim with your state labor board." },
      { question: "Can I skip my lunch break and leave early?", answer: "This depends on your employer's policy and state law. In California, you can waive your first meal break by mutual agreement if your shift is 6 hours or less. Many employers prohibit skipping breaks regardless." },
      { question: "Do I get paid for my lunch break?", answer: "Not automatically. Meal breaks (30+ minutes where you're completely off duty) are typically unpaid. If your employer requires you to stay at your desk, answer calls, or be 'on call' during lunch, that time is paid under FLSA." },
    ],
    relatedPages: [
      { path: "/4-hour-shift-calculator", label: "4-Hour Shift Calculator" },
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift Calculator" },
      { path: "/how-many-hours-did-i-work", label: "How Many Hours Did I Work" },
      { path: "/overtime-calculator", label: "Overtime Calculator" },
    ],
  },
  {
    slug: "what-time-do-i-clock-out",
    path: "/what-time-do-i-clock-out",
    title: "What Time Do I Clock Out? - Shift End Time Calculator",
    description: "Enter your start time and shift length to find out exactly what time you clock out. The fastest answer to 'what time do I get off work?'",
    h1: "What Time Do I Clock Out?",
    bodyContent: `"What time do I clock out?" is one of the most commonly searched questions among hourly workers. You're standing at your time clock or checking your phone, trying to figure out when your shift ends. This calculator gives you the answer instantly — enter your start time, your shift length, and any break, and your clock-out time appears.

The phrasing matters. Most people aren't asking for their total paid hours — they're asking when they physically leave the building. This calculator answers that specific question: your departure time, in both 12-hour and 24-hour formats, with a "+1 day" flag if your shift crosses midnight.

**Why "clock out time" is different from "paid hours"**

Your clock-out time is simply your start time plus your total shift length. If you start at 2:00 PM and work an 8-hour shift, you clock out at 10:00 PM — regardless of whether you had a 30-minute unpaid break. The break reduces your paid hours (to 7.5) but doesn't affect your departure time.

**Shift scheduling and knowing your end time in advance**

In many industries, hourly employees receive their schedules one to two weeks in advance. But the schedule shows start times more prominently than end times. Using this calculator with your posted start time and standard shift length lets you plan your week accurately — knowing you'll be done at 9:30 PM on Thursday affects dinner plans, childcare logistics, and transportation arrangements.

**When shifts run long**

Mandatory overtime, unexpected rushes, and coverage emergencies can extend your shift beyond its scheduled end. If you're told to stay an extra hour, your new clock-out time is one hour later than calculated — and if staying that extra hour pushes you past 8 hours worked in California or past 40 hours for the week federally, overtime pay kicks in automatically.

**Calculating clock-out time mentally**

The mental math is usually straightforward: add the shift hours to your start time. If the result exceeds 12 (for 12-hour format) or 24 (for 24-hour format), subtract accordingly. A 2:45 PM start with an 8-hour shift: 2:45 + 8:00 = 10:45 PM. A 9:00 PM start with a 10-hour shift: 9:00 PM + 10:00 = 7:00 AM (+1 day). This calculator handles all of this automatically.`,
    faqs: [
      { question: "What is my clock-out time if I start at 7 AM and work 8 hours?", answer: "Your clock-out time is 3:00 PM. This is your departure time — if you have an unpaid 30-minute lunch, you still leave at 3:00 PM, but you're only paid for 7.5 hours." },
      { question: "How do I find my clock-out time for any shift?", answer: "Add your shift length to your start time. For a 10-hour shift starting at 6:00 AM: 6:00 + 10 = 4:00 PM. For overnight: a shift starting at 9:00 PM for 8 hours ends at 5:00 AM (+1 day)." },
      { question: "Does a meal break change my clock-out time?", answer: "No — meal breaks happen within your shift. A 7:00 AM to 3:00 PM shift is 8 hours total, including any breaks you take. Your clock-out time stays at 3:00 PM whether or not you took lunch." },
      { question: "What if my shift changes after I've already planned my day?", answer: "Use this calculator again with the new start time or new shift length. Shift changes are common, especially in healthcare and retail. Recalculating takes seconds." },
      { question: "How do I read a 24-hour clock for my shift end time?", answer: "Add 12 to any PM time: 3:00 PM = 15:00, 10:30 PM = 22:30. For AM times, use as-is with leading zeros: 7:00 AM = 07:00. Midnight is 00:00, noon is 12:00." },
    ],
    relatedPages: [
      { path: "/", label: "Main Calculator" },
      { path: "/shift-end-time-calculator", label: "Shift End Time Calculator" },
      { path: "/8-hour-shift-calculator", label: "8-Hour Shift Calculator" },
      { path: "/night-shift-calculator", label: "Night Shift Calculator" },
    ],
  },
  {
    slug: "shift-end-time-calculator",
    path: "/shift-end-time-calculator",
    title: "Shift End Time Calculator - When Does My Shift End?",
    description: "Find your shift end time by entering your start time and shift length. Works for all shift lengths including overnight. Fast and accurate.",
    h1: "Shift End Time Calculator",
    bodyContent: `Your shift end time is simply your start time plus your shift length. This calculator computes that instantly and displays your result in both 12-hour and 24-hour format. For overnight shifts, it shows the correct next-day time with a "+1 day" label so there's no ambiguity.

This is the same core function as the main clock-out calculator, framed around finding "when does my shift end" rather than "what time do I clock out." Some people think of their schedule as shift start and duration; others think of shift start and end. This tool works either way.

**How employers communicate shift times:**

Most schedules are posted in one of these formats:
- Start time + duration: "8-hour shift starting at 7:00 AM"  
- Start and end time: "7:00 AM – 3:00 PM"
- Military time: "0700–1500"

If you have a start time and duration but not an end time, this calculator is your tool. If you have a start and end time but want to know the duration, use the "hours between two times" calculator instead.

**Shift end time for planning purposes:**

Knowing your shift end time affects nearly every other daily logistics decision. When does your rideshare need to pick you up? What time can you schedule childcare pickup? When will you arrive home for family dinner? How much time do you have before your next shift starts?

Many hourly workers plan their entire day, week, and month around their shift start and end times. This calculator eliminates the mental math and makes it easy to coordinate schedules, especially when shifts rotate or change frequently.

**Calculating end times for rotating schedules:**

In facilities that rotate between days, evenings, and nights, your shift end time can change drastically week to week. Knowing that a 3:00 PM start and a 12-hour shift ends at 3:00 AM (+1 day), while a 7:00 PM start and the same 12-hour shift ends at 7:00 AM, helps you plan accordingly.`,
    faqs: [
      { question: "When does a shift starting at 2:30 PM for 8 hours end?", answer: "Your shift ends at 10:30 PM. Add 8 hours to 2:30 PM: 2:30 + 8:00 = 10:30 PM." },
      { question: "What is the end time of a 12-hour shift starting at 11:00 PM?", answer: "Your shift ends at 11:00 AM (+1 day). Starting at 11 PM and adding 12 hours crosses midnight — you finish the following morning at 11:00 AM." },
      { question: "How do I calculate shift end time without a calculator?", answer: "Add the shift hours to your start time. If the result goes over 12 (12-hour format) or 24 (24-hour format), subtract that number. For example: 9 PM + 10 hours = 19 PM → subtract 12 → 7 AM (+1 day)." },
      { question: "Is shift end time the same as clock-out time?", answer: "Yes — in most contexts these are the same. Your clock-out time is when your shift ends and you stop working. The exception would be if mandatory post-shift duties (like cleaning or closing) extend beyond your scheduled end." },
      { question: "What if I'm asked to stay late — does that change my shift end time?", answer: "Yes. Add however many extra hours you're staying to your scheduled end time to get your new clock-out time. If staying late pushes you over overtime thresholds, you're entitled to overtime pay." },
    ],
    relatedPages: [
      { path: "/what-time-do-i-clock-out", label: "What Time Do I Clock Out" },
      { path: "/", label: "Main Calculator" },
      { path: "/work-hours-calculator", label: "Hours Between Times" },
      { path: "/night-shift-calculator", label: "Night Shift Calculator" },
    ],
  },
];

export function getPageBySlug(slug: string): PageConfig | undefined {
  return ALL_PAGES.find(p => p.slug === slug);
}

export function getPageByPath(path: string): PageConfig | undefined {
  return ALL_PAGES.find(p => p.path === path);
}

import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import ShiftPage from "@/pages/ShiftPage";
import WorkHoursCalculator from "@/pages/WorkHoursCalculator";
import TimecardPage from "@/pages/TimecardPage";
import OvertimeCalculator from "@/pages/OvertimeCalculator";
import HowManyHours from "@/pages/HowManyHours";
import TimeAndHalf from "@/pages/TimeAndHalf";
import DoubleTime from "@/pages/DoubleTime";
import BreakTimePage from "@/pages/BreakTimePage";
import WhatTimeInHours from "@/pages/WhatTimeInHours";
import WorkSchedule from "@/pages/WorkSchedule";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { getPageByPath } from "@/data/pageContent";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />

        {/* Shift calculators */}
        <Route path="/8-hour-shift-calculator">
          {() => { const p = getPageByPath("/8-hour-shift-calculator")!; return <ShiftPage page={p} />; }}
        </Route>
        <Route path="/10-hour-shift-calculator">
          {() => { const p = getPageByPath("/10-hour-shift-calculator")!; return <ShiftPage page={p} />; }}
        </Route>
        <Route path="/12-hour-shift-calculator">
          {() => { const p = getPageByPath("/12-hour-shift-calculator")!; return <ShiftPage page={p} />; }}
        </Route>
        <Route path="/6-hour-shift-calculator">
          {() => { const p = getPageByPath("/6-hour-shift-calculator")!; return <ShiftPage page={p} />; }}
        </Route>
        <Route path="/4-hour-shift-calculator">
          {() => { const p = getPageByPath("/4-hour-shift-calculator")!; return <ShiftPage page={p} />; }}
        </Route>
        <Route path="/night-shift-calculator">
          {() => { const p = getPageByPath("/night-shift-calculator")!; return <ShiftPage page={p} />; }}
        </Route>

        {/* Synonym pages */}
        <Route path="/what-time-do-i-clock-out">
          {() => { const p = getPageByPath("/what-time-do-i-clock-out")!; return <ShiftPage page={p} />; }}
        </Route>
        <Route path="/shift-end-time-calculator">
          {() => { const p = getPageByPath("/shift-end-time-calculator")!; return <ShiftPage page={p} />; }}
        </Route>

        {/* Tool pages */}
        <Route path="/work-hours-calculator" component={WorkHoursCalculator} />
        <Route path="/timecard-calculator" component={TimecardPage} />
        <Route path="/overtime-calculator" component={OvertimeCalculator} />
        <Route path="/how-many-hours-did-i-work" component={HowManyHours} />
        <Route path="/time-and-a-half-calculator" component={TimeAndHalf} />
        <Route path="/double-time-calculator" component={DoubleTime} />
        <Route path="/break-time-calculator" component={BreakTimePage} />
        <Route path="/work-schedule-calculator" component={WorkSchedule} />

        {/* "What time in N hours" */}
        <Route path="/what-time-is-it-in-4-hours">
          {() => <WhatTimeInHours hours={4} />}
        </Route>
        <Route path="/what-time-is-it-in-8-hours">
          {() => <WhatTimeInHours hours={8} />}
        </Route>
        <Route path="/what-time-is-it-in-12-hours">
          {() => <WhatTimeInHours hours={12} />}
        </Route>

        {/* Info pages */}
        <Route path="/about" component={About} />
        <Route path="/privacy-policy" component={Privacy} />
        <Route path="/contact" component={Contact} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

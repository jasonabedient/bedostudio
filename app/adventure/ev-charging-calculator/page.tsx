"use client";
import { useState, FormEvent, ChangeEvent } from "react"
import { ArrowLeft, Zap, Clock, DollarSign, Mail, Battery, Plug, Timer } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// EV Battery Data (sample - expand with full API/dataset)
const evData: Record<string, Record<string, { batteryKwh: number; usableKwh?: number; maxAcKw?: number }>> = {
  "2024": {
    "Rivian R1S": {
      "Large AWD": { batteryKwh: 135, usableKwh: 128, maxAcKw: 11.5 },
      "Max AWD": { batteryKwh: 149, usableKwh: 141, maxAcKw: 11.5 },
      "Dual Motor AWD": { batteryKwh: 135, usableKwh: 128, maxAcKw: 11.5 },
    },
    "Tesla Model 3": {
      "Long Range AWD": { batteryKwh: 78.4, usableKwh: 75, maxAcKw: 11.5 },
      "Performance AWD": { batteryKwh: 78.4, usableKwh: 75, maxAcKw: 11.5 },
    },
    "Tesla Model Y": {
      "Long Range AWD": { batteryKwh: 78.4, usableKwh: 75, maxAcKw: 11.5 },
      "Performance AWD": { batteryKwh: 78.4, usableKwh: 75, maxAcKw: 11.5 },
    },
    "Hyundai Ioniq 6": {
      "SE Long Range RWD": { batteryKwh: 77.4, usableKwh: 74, maxAcKw: 11 },
      "SEL Long Range RWD": { batteryKwh: 77.4, usableKwh: 74, maxAcKw: 11 },
      "SEL Long Range AWD": { batteryKwh: 77.4, usableKwh: 74, maxAcKw: 11 },
    },
    "Ford Mustang Mach-E": {
      "Select RWD": { batteryKwh: 75.7, usableKwh: 70, maxAcKw: 11.5 },
      "Premium AWD": { batteryKwh: 91, usableKwh: 88, maxAcKw: 11.5 },
      "GT AWD": { batteryKwh: 91, usableKwh: 88, maxAcKw: 11.5 },
    },
    "BMW iX": {
      "xDrive50": { batteryKwh: 111.5, usableKwh: 105, maxAcKw: 11 },
      "M60 xDrive": { batteryKwh: 111.5, usableKwh: 105, maxAcKw: 11 },
    },
    "Chevrolet Blazer EV": {
      "LT AWD": { batteryKwh: 102, usableKwh: 96, maxAcKw: 11.5 },
      "RS AWD": { batteryKwh: 102, usableKwh: 96, maxAcKw: 11.5 },
      "SS AWD": { batteryKwh: 102, usableKwh: 96, maxAcKw: 11.5 },
    },
    "Volkswagen ID.4": {
      "Pro RWD": { batteryKwh: 77, usableKwh: 77, maxAcKw: 11 },
      "Pro S RWD": { batteryKwh: 77, usableKwh: 77, maxAcKw: 11 },
      "Pro S AWD": { batteryKwh: 77, usableKwh: 77, maxAcKw: 11 },
    },
  },
  "2023": {
    "Rivian R1S": {
      "Large AWD": { batteryKwh: 135, usableKwh: 128, maxAcKw: 11.5 },
    },
    "Tesla Model 3": {
      "Long Range AWD": { batteryKwh: 75, usableKwh: 72, maxAcKw: 11.5 },
      "Performance AWD": { batteryKwh: 75, usableKwh: 72, maxAcKw: 11.5 },
    },
    "Hyundai Ioniq 6": {
      "SE Long Range RWD": { batteryKwh: 77.4, usableKwh: 74, maxAcKw: 11 },
      "SEL Long Range RWD": { batteryKwh: 77.4, usableKwh: 74, maxAcKw: 11 },
    },
  },
}

const chargerPresets = [
  { value: "1.0", label: "1.0 kW (Level 1)" },
  { value: "5.4", label: "5.4 kW (Level 2)" },
  { value: "11.2", label: "11.2 kW (Level 2)" },
]

const touMultipliers: Record<string, number> = { "anytime": 1.0, "off-peak": 0.65, "peak": 1.4 }
const touLabels: Record<string, string> = { "anytime": "Anytime", "off-peak": "Off-Peak (overnight)", "peak": "Peak (daytime)" }
const chargingEfficiency = 0.90

export default function EVChargeCalculator() {
  const [year, setYear] = useState("2024")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [trim, setTrim] = useState("")
  const [chargerSpeed, setChargerSpeed] = useState("5.4")
  const [customSpeed, setCustomSpeed] = useState("")
  const [currentSoc, setCurrentSoc] = useState(20)
  const [targetSoc, setTargetSoc] = useState(80)
  const [electricRate, setElectricRate] = useState("")
  const [touPeriod, setTouPeriod] = useState("off-peak")
  const [sessionsPerWeek, setSessionsPerWeek] = useState(2)
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const selectedYearData = evData[year] || {}
  const makes = Object.keys(selectedYearData)
  const models = make ? Object.keys(selectedYearData[make] || {}) : []
  const trims = model ? Object.keys(selectedYearData[make]?.[model] || {}) : []
  const selectedEv = make && model && trim ? selectedYearData[make]?.[model]?.[trim] || null : null
  const batteryKwh = selectedEv?.batteryKwh || 0

  const effectiveSpeed = chargerSpeed === "custom" ? parseFloat(customSpeed) || 0 : parseFloat(chargerSpeed)
  const rate = parseFloat(electricRate) || 0
  const rateWithTou = rate * (touMultipliers[touPeriod] || 1)
  const energyNeeded = batteryKwh * ((targetSoc - currentSoc) / 100)
  const wallEnergy = energyNeeded / chargingEfficiency
  const chargeTimeHours = effectiveSpeed > 0 ? wallEnergy / effectiveSpeed : 0
  const sessionCost = wallEnergy * rateWithTou

  const formatTime = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return h === 0 ? `${m} min` : m === 0 ? `${h} hr` : `${h} hr ${m} min`
  }

  const costs = {
    weekly: sessionCost * sessionsPerWeek,
    monthly: sessionCost * sessionsPerWeek * 4.33,
    yearly: sessionCost * sessionsPerWeek * 4.33 * 12,
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (batteryKwh > 0 && rate > 0 && effectiveSpeed > 0) setShowResults(true)
  }

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      setEmailSubmitted(true)
      console.log("Email:", email, "Costs:", costs)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="/adventure" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Bedo Adventure
          </Link>
          <div className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> <span className="text-sm font-semibold">What's The Charge?</span></div>
        </div>
      </header>
      <section className="px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-3 bg-primary/10 text-primary" variant="secondary">Home Charging Estimator</Badge>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">See how long it takes and what it costs to charge your EV at home.</h1>
          <p className="text-sm text-muted-foreground">Choose your EV, charger speed, and electricity rate. Unlock weekly, monthly, and yearly costs after you see your result.</p>
        </div>
      </section>
      <section className="px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          <Card className="border-border/50 bg-card"><CardContent className="p-4"><div className="flex items-center gap-2 mb-2"><div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><Battery className="h-4 w-4 text-primary" /></div><h3 className="font-semibold text-sm">Trim-aware battery sizes</h3></div><p className="text-xs text-muted-foreground">Battery size auto-detected by trim.</p></CardContent></Card>
          <Card className="border-border/50 bg-card"><CardContent className="p-4"><div className="flex items-center gap-2 mb-2"><div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><Plug className="h-4 w-4 text-primary" /></div><h3 className="font-semibold text-sm">Real charger presets</h3></div><p className="text-xs text-muted-foreground">1.0, 5.4, 11.2 kW, plus custom.</p></CardContent></Card>
          <Card className="border-border/50 bg-card"><CardContent className="p-4"><div className="flex items-center gap-2 mb-2"><div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><Mail className="h-4 w-4 text-primary" /></div><h3 className="font-semibold text-sm">Email upgrade</h3></div><p className="text-xs text-muted-foreground">Weekly, monthly, yearly breakdowns.</p></CardContent></Card>
        </div>
      </section>
            <section className="px-4 py-4 md:px-6 md:py-6">
        <form onSubmit={handleSubmit} className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3 pt-4 px-4"><CardTitle className="text-base flex items-center gap-2"><Battery className="h-4 w-4 text-primary" />What EV do you drive?</CardTitle><CardDescription className="text-xs">We'll use your trim to pull the closest battery size.</CardDescription></CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs text-muted-foreground mb-1.5 block">Year</Label>
                    <Select value={year} onValueChange={(v) => { setYear(v); setMake(""); setModel(""); setTrim(""); }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="2024">2024</SelectItem><SelectItem value="2023">2023</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div><Label className="text-xs text-muted-foreground mb-1.5 block">Make</Label>
                    <Select value={make} onValueChange={(v) => { setMake(v); setModel(""); setTrim(""); }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select make" /></SelectTrigger>
                      <SelectContent>{makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs text-muted-foreground mb-1.5 block">Model</Label>
                    <Select value={model} onValueChange={(v) => { setModel(v); setTrim(""); }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select model" /></SelectTrigger>
                      <SelectContent>{models.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label className="text-xs text-muted-foreground mb-1.5 block">Trim</Label>
                    <Select value={trim} onValueChange={setTrim}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select trim" /></SelectTrigger>
                      <SelectContent>{trims.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                {batteryKwh > 0 && <div className="rounded-md bg-primary/5 p-2.5"><div className="flex justify-between"><span className="text-muted-foreground text-sm">Battery size (detected)</span><span className="font-semibold text-sm">{batteryKwh} kWh</span></div></div>}
              </CardContent>
            </Card>
                        <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3 pt-4 px-4"><CardTitle className="text-base flex items-center gap-2"><Timer className="h-4 w-4 text-primary" />Battery level</CardTitle></CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                <div><div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Current charge: {currentSoc}%</span></div>
                  <input type="range" min={0} max={95} value={currentSoc} onChange={(e) => setCurrentSoc(Math.min(parseInt(e.target.value), targetSoc - 1))} className="w-full accent-primary" />
                </div>
                <div><div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Target charge: {targetSoc}%</span></div>
                  <input type="range" min={5} max={100} value={targetSoc} onChange={(e) => setTargetSoc(Math.max(parseInt(e.target.value), currentSoc + 1))} className="w-full accent-primary" />
                </div>
                {energyNeeded > 0 && <div className="flex justify-between text-xs py-2 border-t border-border/50"><span className="text-muted-foreground">Energy to add</span><span className="font-medium">{energyNeeded.toFixed(1)} kWh</span></div>}
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3 pt-4 px-4"><CardTitle className="text-base flex items-center gap-2"><Plug className="h-4 w-4 text-primary" />How fast do you charge at home?</CardTitle><CardDescription className="text-xs">Most home charging is Level 1 or Level 2.</CardDescription></CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {chargerPresets.map((p) => <button key={p.value} type="button" onClick={() => setChargerSpeed(p.value)} className={`px-3 py-1.5 rounded-full text-sm border ${chargerSpeed === p.value ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}>{p.label}</button>)}
                </div>
                <div><Label className="text-xs text-muted-foreground mb-1.5 block">Custom speed (optional)</Label>
                  <div className="flex gap-2">
                    <Input type="number" step="0.1" min="0.1" placeholder="e.g., 7.6" value={customSpeed} onChange={(e) => setCustomSpeed(e.target.value)} disabled={chargerSpeed !== "custom"} className="h-9 text-sm" />
                    <Select value={chargerSpeed} onValueChange={setChargerSpeed}>
                      <SelectTrigger className="h-9 w-32 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {chargerPresets.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
                        <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3 pt-4 px-4"><CardTitle className="text-base flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" />What do you pay for electricity?</CardTitle><CardDescription className="text-xs">Enter your price per kWh. TOU plans make overnight charging much cheaper.</CardDescription></CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div><Label className="text-xs text-muted-foreground mb-1.5 block">Electricity rate ($/kWh)</Label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-background text-sm text-muted-foreground">$</span>
                    <Input type="number" step="0.01" min="0" placeholder="0.15" value={electricRate} onChange={(e) => setElectricRate(e.target.value)} className="h-9 text-sm rounded-l-none" />
                  </div>
                </div>
                <div><Label className="text-xs text-muted-foreground mb-1.5 block">When do you usually charge?</Label>
                  <Select value={touPeriod} onValueChange={setTouPeriod}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off-peak">{touLabels["off-peak"]} — {Math.round(touMultipliers["off-peak"] * 100)}% of base</SelectItem>
                      <SelectItem value="anytime">{touLabels["anytime"]} — {Math.round(touMultipliers["anytime"] * 100)}% of base</SelectItem>
                      <SelectItem value="peak">{touLabels["peak"]} — {Math.round(touMultipliers["peak"] * 100)}% of base</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {rate > 0 && <div className="flex justify-between text-xs py-2 border-t border-border/50"><span className="text-muted-foreground">Effective rate ({touPeriod})</span><span className="font-medium">${rateWithTou.toFixed(4)}/kWh</span></div>}
              </CardContent>
            </Card>
            <Button type="submit" className="w-full h-11 text-base" size="lg" disabled={!batteryKwh || !rate || !effectiveSpeed}>See my charge time</Button>
          </div>
                    <div className="space-y-4">
            {!showResults ? (
              <Card className="border-border/50 bg-card h-full"><CardContent className="p-8 flex flex-col items-center justify-center text-center"><div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"><Zap className="h-6 w-6 text-primary" /></div><h3 className="font-semibold mb-2">Get your instant estimate</h3><p className="text-sm text-muted-foreground max-w-xs">Fill in your vehicle, charger speed, and electricity rate to see how long charging takes.</p></CardContent></Card>
            ) : (
              <>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3 pt-4 px-4"><Badge className="w-fit bg-primary text-primary-foreground">Instant Results</Badge><CardTitle className="text-base mt-2">Your estimated home charging session</CardTitle></CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-md bg-background p-3 border border-border/50"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Clock className="h-3.5 w-3.5" /> Charge time</div><div className="text-lg font-bold">{formatTime(chargeTimeHours)}</div></div>
                      <div className="rounded-md bg-background p-3 border border-border/50"><div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><DollarSign className="h-3.5 w-3.5" /> Session cost</div><div className="text-lg font-bold">${sessionCost.toFixed(2)}</div></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1"><div className="text-xs"><span className="text-muted-foreground">Battery size</span><div className="font-medium">{batteryKwh} kWh</div></div><div className="text-xs"><span className="text-muted-foreground">Energy added</span><div className="font-medium">{energyNeeded.toFixed(1)} kWh</div></div></div>
                    <div className="text-xs pt-1 border-t border-border/50"><div className="flex justify-between py-1"><span className="text-muted-foreground">Charger speed</span><span className="font-medium">{effectiveSpeed} kW</span></div><div className="flex justify-between py-1"><span className="text-muted-foreground">Effective rate ({touPeriod})</span><span className="font-medium">${rateWithTou.toFixed(4)}/kWh</span></div><div className="flex justify-between py-1"><span className="text-muted-foreground">Wall energy (~90% eff.)</span><span className="font-medium">{wallEnergy.toFixed(1)} kWh</span></div></div>
                    <div className="pt-2"><p className="text-[11px] text-muted-foreground italic">Estimates vary based on trim, temperature, and vehicle charger limits.</p></div>
                  </CardContent>
                </Card>
                                {!emailSubmitted ? (
                  <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardHeader className="pb-2 pt-4 px-4"><CardTitle className="text-base flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />Want a more detailed charging plan?</CardTitle></CardHeader>
                    <CardContent className="px-4 pb-4 space-y-3">
                      <ul className="text-xs text-muted-foreground space-y-1.5">
                        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Weekly charging cost estimate</li>
                        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Monthly charging budget</li>
                        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Yearly charging cost projection</li>
                        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Best charger recommendation for your routine</li>
                      </ul>
                      <form onSubmit={handleEmailSubmit} className="space-y-2.5 pt-1">
                        <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-10 text-sm" />
                        <Button type="submit" className="w-full h-10" size="default">Send my full charging report</Button>
                        <p className="text-[11px] text-muted-foreground text-center">We'll send your personalized cost breakdown. No spam.</p>
                      </form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mb-3"><Mail className="h-5 w-5 text-primary-foreground" /></div>
                      <h3 className="font-semibold mb-1">Check your inbox!</h3>
                      <p className="text-sm text-muted-foreground mb-4">Your detailed charging plan has been sent.</p>
                      <div className="w-full space-y-2 pt-3 border-t border-primary/20">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Weekly cost</span><span className="font-semibold">${costs.weekly.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Monthly cost</span><span className="font-semibold">${costs.monthly.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Yearly cost</span><span className="font-semibold text-lg text-primary">${costs.yearly.toFixed(2)}</span></div>
                      </div>
                      <p className="text-[11px] text-muted-foreground pt-3">Based on {sessionsPerWeek} session(s)/week at ${rateWithTou.toFixed(4)}/kWh</p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </form>
      </section>
      <footer className="px-4 py-8 border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Bedo Studio. Estimates based on trim data, ~90% charging efficiency, and simplified TOU rate multipliers.</p>
          <div className="mt-2 flex justify-center gap-4 text-xs">
            <Link href="/adventure" className="text-muted-foreground hover:text-foreground">Bedo Adventure</Link>
            <Link href="https://bedo.studio" className="text-muted-foreground hover:text-foreground">Bedo Studio</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

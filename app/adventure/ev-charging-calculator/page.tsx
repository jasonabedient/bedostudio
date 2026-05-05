"use client";
import { useState, FormEvent } from "react"
import { ArrowLeft, Zap, Clock, DollarSign, Mail, Battery, Plug, Timer } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const evData: Record<string, Record<string, { batteryKwh: number }>> = {
  "2024": {
    "Rivian R1S": { "Large AWD": { batteryKwh: 135 }, "Max AWD": { batteryKwh: 149 }, "Dual Motor AWD": { batteryKwh: 135 } },
    "Tesla Model 3": { "Long Range AWD": { batteryKwh: 78.4 }, "Performance AWD": { batteryKwh: 78.4 } },
    "Tesla Model Y": { "Long Range AWD": { batteryKwh: 78.4 }, "Performance AWD": { batteryKwh: 78.4 } },
    "Hyundai Ioniq 6": { "SE Long Range RWD": { batteryKwh: 77.4 }, "SEL Long Range RWD": { batteryKwh: 77.4 }, "SEL Long Range AWD": { batteryKwh: 77.4 } },
    "Ford Mustang Mach-E": { "Select RWD": { batteryKwh: 75.7 }, "Premium AWD": { batteryKwh: 91 }, "GT AWD": { batteryKwh: 91 } },
    "BMW iX": { "xDrive50": { batteryKwh: 111.5 }, "M60 xDrive": { batteryKwh: 111.5 } },
    "Chevrolet Blazer EV": { "LT AWD": { batteryKwh: 102 }, "RS AWD": { batteryKwh: 102 }, "SS AWD": { batteryKwh: 102 } },
    "Volkswagen ID.4": { "Pro RWD": { batteryKwh: 77 }, "Pro S RWD": { batteryKwh: 77 }, "Pro S AWD": { batteryKwh: 77 } },
  },
  "2023": {
    "Rivian R1S": { "Large AWD": { batteryKwh: 135 } },
    "Tesla Model 3": { "Long Range AWD": { batteryKwh: 75 }, "Performance AWD": { batteryKwh: 75 } },
    "Hyundai Ioniq 6": { "SE Long Range RWD": { batteryKwh: 77.4 }, "SEL Long Range RWD": { batteryKwh: 77.4 } },
  },
}

const chargerPresets = [
  { value: "1.0", label: "1.0" },
  { value: "5.4", label: "5.4" },
  { value: "11.2", label: "11.2" },
]

const touMultipliers: Record<string, { label: string; rate: number }> = {
  "off-peak": { label: "OFF-PEAK — 65% of base", rate: 0.65 },
  "anytime": { label: "ANYTIME — 100% of base", rate: 1.0 },
  "peak": { label: "PEAK — 140% of base", rate: 1.4 },
}

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
  const batteryKwh = make && model && trim ? selectedYearData[make]?.[model]?.[trim]?.batteryKwh || 0 : 0

  const effectiveSpeed = chargerSpeed === "custom" ? parseFloat(customSpeed) || 0 : parseFloat(chargerSpeed)
  const rate = parseFloat(electricRate) || 0
  const rateWithTou = rate * (touMultipliers[touPeriod]?.rate || 1)
  const energyNeeded = batteryKwh * ((targetSoc - currentSoc) / 100)
  const wallEnergy = energyNeeded / chargingEfficiency
  const chargeTimeHours = effectiveSpeed > 0 ? wallEnergy / effectiveSpeed : 0
  const sessionCost = wallEnergy * rateWithTou

  const formatTime = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return h === 0 ? `${m} min` : m === 0 ? `${h} hr` : `${h} hr ${m} min`
  }

  const costs = { weekly: sessionCost * sessionsPerWeek, monthly: sessionCost * sessionsPerWeek * 4.33, yearly: sessionCost * sessionsPerWeek * 4.33 * 12 }

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); if (batteryKwh > 0 && rate > 0 && effectiveSpeed > 0) setShowResults(true) }
  const handleEmailSubmit = (e: FormEvent) => { e.preventDefault(); if (email) { setEmailSubmitted(true); console.log(email, costs) } }

  return (
    <div style={{ backgroundImage: 'linear-gradient(to bottom, #0a0a0f, #09090b)', minHeight: '100vh', padding: '32px' }}>
      {/* Header */}
      <header style={{ maxWidth: 1152, margin: '0 auto 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          href="/adventure"
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a1a1aa', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Bedo Adventure
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#7dd3fc', textTransform: 'uppercase' }}>
          <Zap style={{ width: 20, height: 20, color: '#7dd3fc' }} />
          Volt/Charge
        </div>
      </header>
      
      <main style={{ maxWidth: 1152, margin: '0 auto', display: 'grid', gap: '64px', gridTemplateColumns: '1fr', alignItems: 'start' }}>
        {/* Left: Hero + Form */}
        <div>
          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(34,211,238,0.3)', color: '#22d3ee', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', background: 'rgba(34,211,238,0.05)' }}>Precision Logistics 2.0</span>
          <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: -2, lineHeight: 1, marginTop: 16, color: '#fafafa' }}>
            Engineered for <br />
            <span style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Peak Efficiency.</span>
          </h1>
          <p style={{ fontSize: 16, color: '#a1a1aa', maxWidth: 448, lineHeight: 1.6, marginTop: 16 }}>
            Calculate your home charging overhead with real-time hardware presets and utility-grade rate mapping.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 32 }}>
            <div style={{ padding: 16, borderRadius: 24, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
              <div style={{ color: '#22d3ee', marginBottom: 8, fontSize: 14 }}>⚡</div>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Real Presets</h3>
              <p style={{ fontSize: 11, color: '#71717a' }}>1.0, 5.4, 11.2 kW</p>
            </div>
            <div style={{ padding: 16, borderRadius: 24, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
              <div style={{ color: '#22d3ee', marginBottom: 8, fontSize: 14 }}>🔋</div>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Trim Logic</h3>
              <p style={{ fontSize: 11, color: '#71717a' }}>Auto-battery sizing</p>
            </div>
          </div>
        </div>
        
        {/* Calculator Card */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -1, background: 'linear-gradient(135deg, rgba(34,211,238,0.6), rgba(14,165,233,0.6))', borderRadius: '2.5rem', opacity: 0.2, filter: 'blur(20px)' }} />
          <form
            onSubmit={handleSubmit}
            style={{ position: 'relative', background: '#101014', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2.5rem', padding: '32px', boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 32, color: '#fafafa' }}>Instant Estimate</h2>
            <div style={{ display: 'grid', gap: 32 }}>
              {/* Vehicle Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 8 }}>Year</label>
                  <Select value={year} onValueChange={(v) => { setYear(v); setMake(""); setModel(""); setTrim(""); }}>
                    <SelectTrigger style={{ width: '100%', background: '#000000', border: '1px solid #27272a', borderRadius: 12, padding: 12, color: '#fafafa', height: 44 }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent><SelectItem value="2024">2024</SelectItem><SelectItem value="2023">2023</SelectItem></SelectContent>
                  </Select>
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 8 }}>Vehicle</label>
                  <Select value={make} onValueChange={(v) => { setMake(v); setModel(""); setTrim(""); }}>
                    <SelectTrigger style={{ width: '100%', background: '#000000', border: '1px solid #27272a', borderRadius: 12, padding: 12, color: '#fafafa', height: 44 }}>
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 8 }}>Model</label>
                  <Select value={model} onValueChange={(v) => { setModel(v); setTrim(""); }}>
                    <SelectTrigger style={{ width: '100%', background: '#000000', border: '1px solid #27272a', borderRadius: 12, padding: 12, color: '#fafafa', height: 44 }}>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 8 }}>Trim</label>
                  <Select value={trim} onValueChange={setTrim}>
                    <SelectTrigger style={{ width: '100%', background: '#000000', border: '1px solid #27272a', borderRadius: 12, padding: 12, color: '#fafafa', height: 44 }}>
                      <SelectValue placeholder="Select trim" />
                    </SelectTrigger>
                    <SelectContent>
                      {trims.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {batteryKwh > 0 && (
                <div style={{ padding: '10px 16px', borderRadius: 8, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#71717a' }}>Battery size (detected)</span>
                    <span style={{ fontWeight: 600, color: '#22d3ee' }}>{batteryKwh} kWh</span>
                  </div>
                </div>
              )}
              
              {/* Battery Slider */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#71717a' }}>Battery Range (%)</label>
                <div style={{ fontFamily: 'monospace', color: '#22d3ee', fontSize: 20, fontWeight: 500 }}>{currentSoc}% → {targetSoc}%</div>
              </div>
              <div style={{ height: 16, width: '100%', background: '#000000', borderRadius: 12, padding: 2, border: '1px solid #27272a', overflow: 'hidden', position: 'relative' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #0891b2, #22d3ee)', borderRadius: 10, width: `${targetSoc - currentSoc}%`, marginLeft: `${currentSoc}%`, transition: 'all 0.3s' }} />
              </div>

              {/* Charger Speed */}
              <div>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 12 }}>Charge Speed (kW)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {chargerPresets.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setChargerSpeed(p.value)}
                      style={{
                        padding: 10,
                        background: chargerSpeed === p.value ? '#22d3ee' : '#000000',
                        border: chargerSpeed === p.value ? '1px solid #67e8f9' : '1px solid #27272a',
                        borderRadius: 8,
                        fontSize: 11,
                        fontFamily: 'monospace',
                        color: chargerSpeed === p.value ? '#000000' : '#a1a1aa',
                        fontWeight: chargerSpeed === p.value ? 700 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: chargerSpeed === p.value ? '0 0 12px rgba(34,211,238,0.4)' : 'none',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Electricity Rate */}
              <div>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 12 }}>Electricity Rate ($/kWh)</label>
                <div style={{ display: 'flex', gap: 2 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 12px', borderRadius: '12px 0 0 12px', border: '1px solid #27272a', borderRight: 'none', background: '#000000', color: '#71717a', fontSize: 14 }}>$</span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.15"
                    value={electricRate}
                    onChange={(e) => setElectricRate(e.target.value)}
                    style={{ background: '#000000', border: '1px solid #27272a', borderRadius: '0 12px 12px 0', padding: 12, color: '#fafafa', height: 44 }}
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <Select value={touPeriod} onValueChange={setTouPeriod}>
                    <SelectTrigger style={{ width: '100%', background: '#000000', border: '1px solid #27272a', borderRadius: 12, padding: 10, color: '#fafafa', height: 40 }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off-peak">{touMultipliers["off-peak"].label}</SelectItem>
                      <SelectItem value="anytime">{touMultipliers["anytime"].label}</SelectItem>
                      <SelectItem value="peak">{touMultipliers["peak"].label}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                disabled={!batteryKwh || !rate || !effectiveSpeed}
                style={{
                  width: '100%',
                  padding: '16px 0',
                  background: batteryKwh && rate && effectiveSpeed ? '#ffffff' : '#27272a',
                  border: 'none',
                  borderRadius: 16,
                  color: batteryKwh && rate && effectiveSpeed ? '#000000' : '#71717a',
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1, textTransform: 'uppercase',
                  cursor: batteryKwh && rate && effectiveSpeed ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  opacity: batteryKwh && rate && effectiveSpeed ? 1 : 0.5,
                }}
                onMouseOver={(e) => { if (batteryKwh && rate && effectiveSpeed) e.currentTarget.style.background = '#22d3ee' }}
                onMouseOut={(e) => { if (batteryKwh && rate && effectiveSpeed) e.currentTarget.style.background = '#ffffff' }}
              >
                Calculate Estimate
              </button>
            </div>
          </form>
        </div>
        
        {/* Results Section */}
        {showResults && (
          <div style={{ display: 'grid', gap: 32 }}>
            {/* Instant Results */}
            <div style={{ padding: '24px 32px', borderRadius: '2.5rem', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.2)' }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ padding: '3px 10px', borderRadius: 6, background: '#22d3ee', color: '#000000', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>RESULTS</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fafafa' }}>Session Estimate</h3>
              <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  <div style={{ padding: 20, borderRadius: 20, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#71717a', fontSize: 11, marginBottom: 6 }}>
                      <Clock style={{ width: 14, height: 14 }} /> CHARGE TIME
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#22d3ee', letterSpacing: -1 }}>{formatTime(chargeTimeHours)}</div>
                  </div>
                  <div style={{ padding: 20, borderRadius: 20, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#71717a', fontSize: 11, marginBottom: 6 }}>
                      <DollarSign style={{ width: 14, height: 14 }} /> SESSION COST
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#22d3ee', letterSpacing: -1 }}>${sessionCost.toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <div><div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>Battery</div><div style={{ fontSize: 14, fontWeight: 600, color: '#fafafa' }}>{batteryKwh} kWh</div></div>
                  <div><div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>Added</div><div style={{ fontSize: 14, fontWeight: 600, color: '#fafafa' }}>{energyNeeded.toFixed(1)} kWh</div></div>
                  <div><div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>Speed</div><div style={{ fontSize: 14, fontWeight: 600, color: '#fafafa' }}>{effectiveSpeed} kW</div></div>
                  <div><div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>Rate</div><div style={{ fontSize: 14, fontWeight: 600, color: '#fafafa' }}>${rateWithTou.toFixed(4)}/kWh</div></div>
                </div>
                <p style={{ fontSize: 10, color: '#71717a', fontStyle: 'italic', marginTop: 8 }}>Estimates vary by trim, temperature, and charger limits. ~90% efficiency assumed.</p>
              </div>
            </div>
            
            {/* Email Unlock */}
            {!emailSubmitted ? (
              <div style={{ padding: '24px 32px', borderRadius: '2.5rem', border: '1px solid rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.04)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fafafa', marginBottom: 16 }}>Get the full breakdown</h3>
                <ul style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
                  {[
                    'Weekly charging cost estimate',
                    'Monthly charging budget',
                    'Yearly charging cost projection',
                    'Best charger recommendation for your routine',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: '#a1a1aa' }}>
                      <span style={{ width: 6, height: 6, borderRadius: 3, background: '#22d3ee', marginTop: 4, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: 10 }}>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ background: '#000000', border: '1px solid #27272a', borderRadius: 12, padding: '0 16px', color: '#fafafa', height: 44, flex: 1 }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0 24px',
                      background: '#ffffff',
                      border: 'none',
                      borderRadius: 12,
                      color: '#000000',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#22d3ee'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#ffffff'}
                  >
                    Send Report
                  </button>
                </form>
                <p style={{ fontSize: 10, color: '#71717a', marginTop: 10, textAlign: 'center' }}>We'll send your personalized breakdown to your inbox. No spam.</p>
              </div>
            ) : (
              <div style={{ padding: 32, borderRadius: '2.5rem', border: '1px solid rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.06)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
    <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fafafa', marginBottom: 4 }}>Report Sent</h3>
                  <p style={{ fontSize: 13, color: '#a1a1aa', marginBottom: 16 }}>Your full charging breakdown has been sent.</p>
                  <div style={{ width: '100%', borderTop: '1px solid rgba(34,211,238,0.2)', paddingTop: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'center' }}>
                      <div><div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>Weekly</div><div style={{ fontSize: 18, fontWeight: 700, color: '#22d3ee' }}>${costs.weekly.toFixed(2)}</div></div>
                      <div><div style={{ fontSize: 10, color: Fixed duplicate ))} and missing </div>. Proper closing order: ternary ), grid </div>, showResults )}, left column </div>, main </main>.'#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>Monthly</div><div style={{ fontSize: 18, fontWeight: 700, color: '#22d3ee' }}>${costs.monthly.toFixed(2)}</div></div>
                      <div><div style={{ fontSize: 10, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 }}>Yearly</div><div style={{ fontSize: 18, fontWeight: 700, color: '#22d3ee' }}>${costs.yearly.toFixed(2)}</div></div>
                    </div>
                    <p style={{ fontSize: 10, color: '#71717a', marginTop: 12 }}>At ${rateWithTou.toFixed(4)}/kWh · {sessionsPerWeek}x/week</p>
                  </div>
                </div>
              </div
           )}

    </div>
    )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ maxWidth: 1152, margin: '64px auto 0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#71717a' }}>© {new Date().getFullYear()} Bedo Studio. Estimates based on trim data, ~90% efficiency, and simplified TOU multipliers.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
          <Link href="/adventure" style={{ fontSize: 11, color: '#71717a', textDecoration: 'none' }}>Bedo Adventure</Link>
          <Link href="https://bedo.studio" style={{ fontSize: 11, color: '#71717a', textDecoration: 'none' }}>Bedo Studio</Link>
        </div>
      </footer>
    </div>
  )
}

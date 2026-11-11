"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Bridge, C, DE, DECISIONS, EDGES, EdgeCaseGrid, HY, LivePrototype, R, SC, chainOf, type Node } from "@/components/reconcile/story"

/**
 * Version C · Design board
 * The whole case study as one pannable board: research → hypotheses → decisions → screens.
 * Click any card to light its chain and open the details. "Play the path" walks each chain.
 */

const LANES: { key: string; title: string; nodes: Node[]; color: string }[] = [
  { key: "R", title: "Research", nodes: R, color: "#737373" },
  { key: "H", title: "Hypotheses", nodes: HY, color: C.warn },
  { key: "D", title: "Decisions", nodes: DE, color: C.accent },
  { key: "S", title: "Screens", nodes: SC, color: C.positive },
]
const COL_W = 250
const GAP_X = 120
const CARD_H = 92
const SHOT_H = 210
const GAP_Y = 22
const TOP = 70

type Pos = { x: number; y: number; w: number; h: number }

function layout() {
  const pos: Record<string, Pos> = {}
  // decisions and screens line up row by row with their hypotheses, so lines run mostly flat
  const hRow: Record<string, number> = { H4: 0, H1: 1, H2: 2, H3: 3, H6: 4, H5: 5 }
  const rRow: Record<string, number> = { G: 0, R2: 1, R4: 2, R3: 3.4, R1: 5 }
  LANES.forEach((lane, li) => {
    const x = li * (COL_W + GAP_X)
    lane.nodes.forEach((n, i) => {
      const isShot = lane.key === "S"
      const rowH = SHOT_H + GAP_Y
      let row = i
      if (lane.key === "H") row = hRow[n.id]
      if (lane.key === "R") row = rRow[n.id]
      const y = TOP + row * rowH + (isShot ? 0 : (SHOT_H - CARD_H) / 2)
      pos[n.id] = { x, y, w: COL_W, h: isShot ? SHOT_H : CARD_H }
    })
  })
  return pos
}

const BOARD_W = 4 * COL_W + 3 * GAP_X
const BOARD_H = TOP + 6 * (SHOT_H + GAP_Y) + 20
const PATH_ORDER = ["S2", "S1", "S3", "S4", "S5", "S6"]

export function DesignBoard() {
  const pos = useMemo(layout, [])
  const wrap = useRef<HTMLDivElement>(null)
  const [view, setView] = useState({ x: 0, y: 0, k: 0.5 })
  const [sel, setSel] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null)

  const fit = useCallback(() => {
    const el = wrap.current
    if (!el) return
    const k = Math.min(el.clientWidth / (BOARD_W + 60), el.clientHeight / (BOARD_H + 40))
    setView({ k, x: (el.clientWidth - BOARD_W * k) / 2, y: (el.clientHeight - BOARD_H * k) / 2 })
  }, [])
  useEffect(() => {
    fit()
    window.addEventListener("resize", fit)
    return () => window.removeEventListener("resize", fit)
  }, [fit])

  // play the path: light each chain in turn
  useEffect(() => {
    if (!playing) return
    let i = PATH_ORDER.indexOf(sel ?? "") + 1
    setSel(PATH_ORDER[i % PATH_ORDER.length])
    const t = setInterval(() => {
      i += 1
      if (i >= PATH_ORDER.length) {
        setPlaying(false)
        return
      }
      setSel(PATH_ORDER[i])
    }, 2600)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  const lit = sel ? chainOf(sel) : null

  const zoom = (f: number, cx?: number, cy?: number) => {
    const el = wrap.current
    if (!el) return
    const px = cx ?? el.clientWidth / 2
    const py = cy ?? el.clientHeight / 2
    setView((v) => {
      const k = Math.max(0.25, Math.min(1.6, v.k * f))
      return { k, x: px - ((px - v.x) * k) / v.k, y: py - ((py - v.y) * k) / v.k }
    })
  }

  const focus = (id: string) => {
    const el = wrap.current
    const p = pos[id]
    if (!el || !p) return
    setView((v) => {
      const k = Math.max(v.k, 0.7)
      return { k, x: el.clientWidth / 2 - (p.x + p.w / 2) * k, y: el.clientHeight / 2 - (p.y + p.h / 2) * k }
    })
  }

  const node = sel ? [...R, ...HY, ...DE, ...SC].find((n) => n.id === sel) : null
  const decision = sel ? DECISIONS.find((d) => lit?.has(d.id)) : null

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50" style={{ background: "radial-gradient(circle, color-mix(in srgb, currentColor 9%, transparent) 1px, transparent 1px) 0 0 / 22px 22px" }}>
      <div
        ref={wrap}
        className="relative h-[620px] cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
          drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false }
        }}
        onPointerMove={(e) => {
          const d = drag.current
          if (!d) return
          const dx = e.clientX - d.x
          const dy = e.clientY - d.y
          if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true
          setView((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }))
        }}
        onPointerUp={(e) => {
          const d = drag.current
          drag.current = null
          if (d && !d.moved) {
            const id = (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null)?.closest<HTMLElement>("[data-node]")?.dataset.node
            setPlaying(false)
            setSel(id && id !== sel ? id : null)
          }
        }}
        onWheel={(e) => {
          if (!e.ctrlKey && !e.metaKey) return
          e.preventDefault()
          const r = wrap.current!.getBoundingClientRect()
          zoom(e.deltaY < 0 ? 1.1 : 0.9, e.clientX - r.left, e.clientY - r.top)
        }}
      >
        <div className="absolute left-0 top-0 origin-top-left transition-transform duration-500 ease-out" style={{ width: BOARD_W, height: BOARD_H, transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`, transitionDuration: drag.current ? "0ms" : undefined }}>
          {/* lane titles */}
          {LANES.map((l, i) => (
            <div key={l.key} className="absolute flex items-center gap-2" style={{ left: i * (COL_W + GAP_X), top: 10 }}>
              <span className="h-3 w-3 rounded-full" style={{ background: l.color }} />
              <span className="text-lg font-semibold">{l.title}</span>
              <span className="text-sm text-foreground/40">{l.nodes.length}</span>
            </div>
          ))}
          {/* connectors */}
          <svg className="pointer-events-none absolute inset-0" width={BOARD_W} height={BOARD_H}>
            {EDGES.map(([a, b]) => {
              const p = pos[a]
              const q = pos[b]
              const x1 = p.x + p.w
              const y1 = p.y + p.h / 2
              const x2 = q.x
              const y2 = q.y + q.h / 2
              const on = lit ? lit.has(a) && lit.has(b) : false
              return (
                <path
                  key={a + b}
                  d={`M${x1},${y1} C${x1 + GAP_X / 2},${y1} ${x2 - GAP_X / 2},${y2} ${x2},${y2}`}
                  fill="none"
                  stroke={on ? C.accent : "currentColor"}
                  strokeOpacity={on ? 1 : lit ? 0.08 : 0.2}
                  strokeWidth={on ? 3 : 1.5}
                  strokeDasharray={on ? "6 6" : undefined}
                  className={on ? "motion-safe:animate-[board-dash_1s_linear_infinite]" : undefined}
                  style={{ transition: "stroke-opacity .3s, stroke-width .3s" }}
                />
              )
            })}
          </svg>
          {/* cards */}
          {LANES.map((l) =>
            l.nodes.map((n) => {
              const p = pos[n.id]
              const on = lit?.has(n.id)
              const dim = lit && !on
              const isShot = l.key === "S"
              return (
                <div
                  key={n.id}
                  data-node={n.id}
                  className={cn("absolute cursor-pointer overflow-hidden rounded-2xl border bg-background transition-all duration-300", dim ? "opacity-25" : "opacity-100", sel === n.id ? "shadow-[0_16px_40px_rgba(60,40,160,0.28)]" : "shadow-sm hover:shadow-md")}
                  style={{ left: p.x, top: p.y, width: p.w, height: p.h, borderColor: on ? l.color : "color-mix(in srgb, currentColor 12%, transparent)", borderWidth: on ? 2 : 1 }}
                >
                  {isShot ? (
                    <div className="flex h-full">
                      <div className="relative h-full w-[97px] shrink-0 bg-neutral-100">
                        <Image src={n.detail} alt={n.label} fill className="object-cover object-top" sizes="120px" draggable={false} />
                      </div>
                      <div className="flex flex-col justify-end p-3">
                        <span className="text-[11px] font-semibold" style={{ color: l.color }}>{n.id}</span>
                        <span className="text-sm font-medium leading-snug">{n.label}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-center gap-1 px-4">
                      <span className="text-[11px] font-semibold" style={{ color: l.color }}>{n.id === "G" ? "Gap" : n.id}</span>
                      <span className="text-[15px] font-medium leading-snug">{n.label}</span>
                    </div>
                  )}
                </div>
              )
            }),
          )}
        </div>

        {/* hint */}
        {!sel && (
          <p className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-neutral-900/85 px-4 py-2 text-xs text-white">Click a card to trace it · drag to pan</p>
        )}
      </div>

      {/* toolbar */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full border border-border/60 bg-background/90 p-1 text-sm shadow-sm backdrop-blur">
        <button type="button" onClick={() => zoom(0.8)} className="h-8 w-8 rounded-full hover:bg-foreground/5" aria-label="Zoom out">−</button>
        <span className="w-10 text-center text-xs tabular-nums text-foreground/55">{Math.round(view.k * 100)}%</span>
        <button type="button" onClick={() => zoom(1.25)} className="h-8 w-8 rounded-full hover:bg-foreground/5" aria-label="Zoom in">+</button>
        <button type="button" onClick={() => { setSel(null); setPlaying(false); fit() }} className="rounded-full px-3 py-1.5 text-xs hover:bg-foreground/5">Fit</button>
        <button
          type="button"
          onClick={() => {
            fit()
            setPlaying((p) => !p)
          }}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
          style={{ background: C.accent }}
        >
          {playing ? "❚❚ Pause" : "▶ Play the path"}
        </button>
      </div>

      {/* drawer */}
      <aside
        className={cn("absolute right-3 top-3 bottom-3 w-[300px] max-w-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-border/60 bg-background/95 p-5 shadow-xl backdrop-blur transition-all duration-300", node ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0")}
      >
        {node && (
          <div key={node.id} className="space-y-4 motion-safe:animate-[sniffr-fade_.25s]">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold" style={{ color: LANES.find((l) => l.nodes.includes(node))!.color }}>
                {LANES.find((l) => l.nodes.includes(node))!.title} · {node.id === "G" ? "Gap" : node.id}
              </p>
              <button type="button" onClick={() => { setSel(null); setPlaying(false) }} className="text-foreground/40 hover:text-foreground" aria-label="Close">✕</button>
            </div>
            <p className="text-lg font-semibold leading-snug">{node.label}</p>
            {node.id.startsWith("S") ? null : <p className="text-sm text-foreground/65">{node.detail}</p>}
            {node.id.startsWith("H") && <p className="text-xs text-foreground/45">I wrote each hypothesis with the signal that would prove it wrong.</p>}
            {decision && (
              <div className="space-y-2 rounded-xl p-3 text-sm" style={{ background: C.accent50 }}>
                <p className="text-xs font-semibold" style={{ color: C.accent }}>{decision.id} · {decision.title}</p>
                <p className="text-neutral-500 line-through decoration-neutral-400">{decision.rejected}</p>
                <p className="text-neutral-900">{decision.chose}</p>
              </div>
            )}
            {decision && (
              <div className="mx-auto w-[170px] overflow-hidden rounded-[1.3rem] border-[5px] border-neutral-900 bg-white">
                <Image src={decision.shot} alt={decision.title} width={780} height={1688} className="h-auto w-full" sizes="170px" />
              </div>
            )}
            <div className="flex flex-wrap gap-1">
              {[...(lit ?? [])].map((id) => (
                <button key={id} type="button" onClick={() => { setPlaying(false); setSel(id); focus(id) }} className="rounded-full border border-border/60 px-2 py-0.5 text-[11px] hover:border-foreground/40">
                  {id === "G" ? "Gap" : id}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

export function VersionC() {
  return (
    <div className="space-y-20">
      <header className="space-y-5 pt-4">
        <p className="cs-eyebrow">Fintech product design · Solo · 2026</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Reconcile, <span style={{ color: C.accent }}>on one board.</span>
        </h1>
        <p className="max-w-xl text-base text-foreground/65">An app that tells marketplace finance why a seller payout doesn&apos;t match. Every screen traces back through a decision and a hypothesis to something I learned.</p>
        <div className="flex flex-wrap gap-6 pt-2">
          {[["5", "research inputs"], ["6", "hypotheses"], ["6", "decisions"], ["45", "edge cases"]].map(([n, l]) => (
            <div key={l}>
              <p className="text-3xl font-semibold tabular-nums tracking-tight">{n}</p>
              <p className="text-xs text-foreground/50">{l}</p>
            </div>
          ))}
        </div>
      </header>

      <DesignBoard />

      <section className="space-y-6">
        <p className="cs-eyebrow">Zoom in · the core screen</p>
        <h2 className="cs-h2">The bridge explains the gap down to the cent.</h2>
        <Bridge />
      </section>
      <section className="space-y-6">
        <p className="cs-eyebrow">Zoom in · 45 edge cases</p>
        <h2 className="cs-h2">I mapped 45 edge cases, because one wrong number sends finance back to Excel.</h2>
        <EdgeCaseGrid />
      </section>
      <section className="space-y-6">
        <p className="cs-eyebrow">Prototype v3</p>
        <h2 className="cs-h2">Try it yourself.</h2>
        <LivePrototype />
      </section>
    </div>
  )
}

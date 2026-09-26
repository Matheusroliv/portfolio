import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

const SKIN = 0xe7b18c
const HAIR = 0x1f1510
const SHIRT = 0x5a6240
const PANTS = 0x252933
const DARK = 0x16161c
const METAL = 0x3b3b46

const CODE = `const matheus = {
  role: "Full Stack Developer",
  front: ["Angular", "React", "Vue"],
  mobile: ["React Native", "Flutter"],
  back: ["NestJS", "Node", "PostgreSQL"],
  yearsShipping: 6,
};

export async function launch(idea: Idea) {
  const ui = await design(idea, { pixelPerfect: true });
  const api = await nest.build(ui.domain, { auth: "2FA" });
  return deploy({ ui, api }); // live in days
}`

type Mode = "type" | "look" | "wave"

function accentFromCss() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim().split(/\s+/)
  return new THREE.Color().setStyle(v.length === 3 ? `hsl(${v[0]}, ${v[1]}, ${v[2]})` : "hsl(262, 90%, 66%)")
}

function codeScreen(accent: string) {
  const c = document.createElement("canvas")
  c.width = 1024
  c.height = 600
  const g = c.getContext("2d")!
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  const KW = /^(const|export|async|function|await|return|new)$/

  const draw = (n: number, cursor: boolean) => {
    g.fillStyle = "#0d0b14"
    g.fillRect(0, 0, 1024, 600)
    g.fillStyle = "#17141f"
    g.fillRect(0, 0, 1024, 44)
    ;["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
      g.fillStyle = col
      g.beginPath()
      g.arc(28 + i * 26, 22, 8, 0, Math.PI * 2)
      g.fill()
    })
    g.font = "500 20px ui-monospace, Menlo, Consolas, monospace"
    g.fillStyle = "#8b86a3"
    g.fillText("launch.ts", 120, 29)

    g.font = "500 24px ui-monospace, Menlo, Consolas, monospace"
    let left = n
    let cx = 0
    let cy = 0
    CODE.split("\n").forEach((line, i) => {
      const y = 92 + i * 36
      g.fillStyle = "#4b4660"
      g.fillText(String(i + 1).padStart(2, " "), 22, y)
      let x = 78
      const toks = line.match(/\/\/.*|"[^"]*"|\w+|\s+|./g) ?? []
      toks.forEach((tok, k) => {
        if (left <= 0) return
        const part = tok.slice(0, left)
        left -= part.length
        const next = toks[k + 1]
        g.fillStyle = tok.startsWith("//")
          ? "#6b7a6b"
          : tok.startsWith('"')
            ? "#a8e6a1"
            : KW.test(tok)
              ? accent
              : /^\d+$/.test(tok)
                ? "#ffb86b"
                : next === "(" || next === "<"
                  ? "#7dd3fc"
                  : next === ":"
                    ? "#f0abfc"
                    : "#e4e1f0"
        g.fillText(part, x, y)
        x += g.measureText(part).width
      })
      if (left >= 0) {
        cx = x
        cy = y
      }
      left -= 1
    })
    if (cursor) {
      g.fillStyle = accent
      g.fillRect(cx + 2, cy - 22, 12, 28)
    }
    tex.needsUpdate = true
  }
  return { tex, draw, total: CODE.length }
}

function glowTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 128
  const g = c.getContext("2d")!
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, "rgba(255,255,255,1)")
  grad.addColorStop(1, "rgba(255,255,255,0)")
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

export default function DevScene({ hint, hello }: { hint: string; hello: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [waving, setWaving] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    const accent = accentFromCss()
    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environmentIntensity = 0.35

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
    const target = new THREE.Vector3(0.1, 0.8, 0.3)

    const mats = new Map<number, THREE.MeshStandardMaterial>()
    const mat = (color: number, rough = 0.62) => {
      const key = color * 10 + rough
      if (!mats.has(key)) mats.set(key, new THREE.MeshStandardMaterial({ color, roughness: rough }))
      return mats.get(key)!
    }
    const accentMat = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.45 })
    const glowMat = new THREE.MeshBasicMaterial({ color: accent.clone().multiplyScalar(1.6) })
    const add = (
      parent: THREE.Object3D,
      geo: THREE.BufferGeometry,
      m: THREE.Material,
      p: [number, number, number] = [0, 0, 0],
      r: [number, number, number] = [0, 0, 0],
      s?: [number, number, number]
    ) => {
      const mesh = new THREE.Mesh(geo, m)
      mesh.position.set(...p)
      mesh.rotation.set(...r)
      if (s) mesh.scale.set(...s)
      parent.add(mesh)
      return mesh
    }
    const rbox = (w: number, h: number, d: number, r = 0.02) => new RoundedBoxGeometry(w, h, d, 3, r)
    const cap = (r: number, l: number) => new THREE.CapsuleGeometry(r, l, 6, 16)
    const sph = (r: number) => new THREE.SphereGeometry(r, 32, 20)

    const world = new THREE.Group()
    scene.add(world)

    /* ---------------- chair ---------------- */
    const chair = new THREE.Group()
    world.add(chair)
    add(chair, rbox(0.56, 0.1, 0.52, 0.04), mat(DARK), [0, 0.47, 0.02])
    for (const x of [-0.23, 0.23]) add(chair, rbox(0.08, 0.11, 0.5, 0.035), accentMat, [x, 0.48, 0.02])
    const back = new THREE.Group()
    back.position.set(0, 0.52, -0.25)
    back.rotation.x = -0.13
    chair.add(back)
    add(back, rbox(0.54, 0.92, 0.1, 0.05), mat(DARK), [0, 0.47, 0])
    for (const x of [-0.25, 0.25]) add(back, rbox(0.07, 0.82, 0.12, 0.03), accentMat, [x, 0.45, 0.01])
    add(back, rbox(0.28, 0.12, 0.07, 0.035), accentMat, [0, 0.84, 0.07])
    add(back, rbox(0.3, 0.12, 0.06, 0.03), mat(DARK), [0, 0.2, 0.07])
    for (const x of [-0.31, 0.31]) {
      add(chair, rbox(0.04, 0.2, 0.04, 0.01), mat(METAL), [x, 0.6, 0.02])
      add(chair, rbox(0.09, 0.035, 0.28, 0.015), mat(DARK), [x, 0.71, 0.04])
    }
    add(chair, new THREE.CylinderGeometry(0.03, 0.03, 0.3, 16), mat(METAL, 0.3), [0, 0.28, 0.02])
    add(chair, new THREE.CylinderGeometry(0.05, 0.06, 0.1, 16), mat(DARK), [0, 0.16, 0.02])
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2
      add(chair, rbox(0.05, 0.035, 0.32, 0.012), mat(DARK), [Math.sin(a) * 0.16, 0.09, 0.02 + Math.cos(a) * 0.16], [0, a, 0])
      add(chair, sph(0.035), mat(METAL), [Math.sin(a) * 0.31, 0.035, 0.02 + Math.cos(a) * 0.31])
    }

    /* ---------------- character ---------------- */
    const body = new THREE.Group()
    chair.add(body)
    add(body, rbox(0.36, 0.14, 0.3, 0.06), mat(PANTS), [0, 0.58, 0])
    for (const x of [-0.1, 0.1]) {
      add(body, cap(0.085, 0.3), mat(PANTS), [x, 0.6, 0.2], [Math.PI / 2, 0, 0])
      add(body, cap(0.075, 0.36), mat(PANTS), [x, 0.33, 0.42])
      add(body, rbox(0.12, 0.09, 0.24, 0.04), mat(0xf1f1f3, 0.5), [x, 0.05, 0.48])
      add(body, rbox(0.125, 0.025, 0.245, 0.01), mat(0x2a2a30), [x, 0.012, 0.48])
    }

    const torso = new THREE.Group()
    torso.position.set(0, 0.62, 0)
    torso.rotation.x = 0.12
    body.add(torso)
    const chest = add(torso, cap(0.19, 0.22), mat(SHIRT, 0.85), [0, 0.28, 0], [0, 0, 0], [1.2, 1, 0.95])
    add(torso, rbox(0.045, 0.045, 0.012, 0.008), accentMat, [0.085, 0.4, 0.168], [0.1, 0.35, 0])
    add(torso, new THREE.CylinderGeometry(0.06, 0.07, 0.1, 16), mat(SKIN, 0.55), [0, 0.6, 0.01])
    add(torso, new THREE.TorusGeometry(0.115, 0.02, 12, 36), mat(DARK, 0.4), [0, 0.57, 0.02], [Math.PI / 2 - 0.25, 0, 0])
    for (const x of [-0.115, 0.115]) {
      add(torso, new THREE.CylinderGeometry(0.048, 0.048, 0.04, 20), mat(DARK, 0.4), [x, 0.55, 0.07], [0, 0, Math.PI / 2])
      add(torso, new THREE.TorusGeometry(0.04, 0.007, 8, 24), glowMat, [x + Math.sign(x) * 0.021, 0.55, 0.07], [0, Math.PI / 2, 0])
    }

    const head = new THREE.Group()
    head.position.set(0, 0.77, 0.03)
    torso.add(head)
    add(head, sph(0.17), mat(SKIN, 0.55), [0, 0, 0], [0, 0, 0], [1, 1.08, 1])
    const hairMat = new THREE.MeshStandardMaterial({ color: HAIR, roughness: 0.9, side: THREE.DoubleSide })
    add(head, new THREE.SphereGeometry(0.182, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4), hairMat, [0, 0.03, -0.012], [-0.42, 0, 0], [1, 1.12, 1])
    add(head, new THREE.SphereGeometry(0.179, 32, 16, Math.PI / 2 + 1.25, Math.PI * 2 - 2.5, Math.PI * 0.25, Math.PI * 0.27), hairMat, [0, 0.01, -0.005])
    add(
      head,
      new THREE.SphereGeometry(0.173, 32, 16, Math.PI / 2 - 1.35, 2.7, Math.PI * 0.64, Math.PI * 0.3),
      hairMat,
      [0, -0.006, 0.004],
      [0, 0, 0],
      [1.01, 1.08, 1.02]
    )
    add(head, cap(0.011, 0.06), hairMat, [0, -0.048, 0.171], [0, 0, Math.PI / 2])
    add(head, sph(0.034), mat(SKIN, 0.5), [0, -0.008, 0.172], [0, 0, 0], [1, 1.1, 1])
    add(head, cap(0.007, 0.028), mat(0x7a4034, 0.5), [0, -0.076, 0.163], [0, 0, Math.PI / 2])
    const eyes = new THREE.Group()
    eyes.position.set(0, 0.035, 0.152)
    head.add(eyes)
    for (const x of [-0.058, 0.058]) {
      add(eyes, sph(0.02), mat(0x141414, 0.2), [x, 0, 0])
      add(head, rbox(0.062, 0.015, 0.02, 0.006), hairMat, [x, 0.088, 0.158], [0, 0, -Math.sign(x) * 0.12])
      add(head, sph(0.036), mat(SKIN, 0.55), [x * 2.9, 0, -0.005], [0, 0, 0], [0.55, 1, 1])
    }
    const glasses = new THREE.Group()
    glasses.position.set(0, 0.035, 0.176)
    head.add(glasses)
    const frameMat = mat(0x1a2236, 0.3)
    const lens = new THREE.MeshPhysicalMaterial({ color: 0xb8c7ff, transparent: true, opacity: 0.18, roughness: 0, metalness: 0.2 })
    for (const s of [-1, 1]) {
      add(glasses, new THREE.TorusGeometry(0.036, 0.008, 10, 32), frameMat, [s * 0.056, 0, 0], [0, 0, 0], [1.22, 0.95, 1])
      add(glasses, new THREE.CircleGeometry(0.036, 32), lens, [s * 0.056, 0, -0.002], [0, 0, 0], [1.22, 0.95, 1])
      add(glasses, rbox(0.007, 0.01, 0.18, 0.003), frameMat, [s * 0.104, 0.005, -0.09])
    }
    add(glasses, new THREE.CylinderGeometry(0.006, 0.006, 0.03, 8), frameMat, [0, 0.008, 0], [0, 0, Math.PI / 2])

    const arms = [-1, 1].map((s) => {
      const shoulder = new THREE.Group()
      shoulder.position.set(s * 0.23, 0.5, 0)
      torso.add(shoulder)
      add(shoulder, cap(0.078, 0.08), mat(SHIRT, 0.85), [0, -0.05, 0])
      add(shoulder, cap(0.058, 0.17), mat(SKIN, 0.55), [0, -0.16, 0])
      const elbow = new THREE.Group()
      elbow.position.y = -0.27
      shoulder.add(elbow)
      add(elbow, cap(0.052, 0.2), mat(SKIN, 0.55), [0, -0.13, 0])
      add(elbow, sph(0.055), mat(SKIN, 0.55), [0, -0.27, 0.01], [0, 0, 0], [0.9, 1.15, 0.6])
      return { s, shoulder, elbow }
    })

    /* ---------------- desk ---------------- */
    const desk = new THREE.Group()
    world.add(desk)
    add(desk, rbox(1.5, 0.05, 0.7, 0.02), mat(0x24242c, 0.5), [0.05, 0.8, 0.78])
    for (const x of [-0.65, 0.75]) add(desk, rbox(0.05, 0.78, 0.6, 0.01), mat(METAL, 0.4), [x, 0.39, 0.8])
    add(desk, new THREE.BoxGeometry(1.46, 0.012, 0.012), glowMat, [0.05, 0.772, 0.44])
    add(desk, rbox(0.47, 0.008, 0.16, 0.004), glowMat, [0, 0.826, 0.52])
    add(desk, rbox(0.46, 0.025, 0.15, 0.01), mat(0x2a2a33), [0, 0.838, 0.52])
    const keys = new THREE.InstancedMesh(new THREE.BoxGeometry(0.024, 0.012, 0.024), mat(0x41414f, 0.5), 60)
    const m4 = new THREE.Matrix4()
    for (let i = 0; i < 60; i++) {
      m4.setPosition(-0.196 + (i % 15) * 0.028, 0.855, 0.478 + Math.floor(i / 15) * 0.028)
      keys.setMatrixAt(i, m4)
    }
    desk.add(keys)
    add(desk, new THREE.BoxGeometry(0.3, 0.004, 0.24), mat(0x121218), [0.42, 0.827, 0.55])
    add(desk, sph(1), mat(0x2a2a33, 0.4), [0.42, 0.84, 0.56], [0, 0, 0], [0.035, 0.02, 0.055])

    const monitor = new THREE.Group()
    monitor.position.set(0, 0.825, 1.0)
    monitor.rotation.x = 0.05
    desk.add(monitor)
    add(monitor, rbox(0.26, 0.015, 0.17, 0.006), mat(METAL, 0.35), [0, 0.008, 0])
    add(monitor, rbox(0.045, 0.3, 0.03, 0.01), mat(METAL, 0.35), [0, 0.16, 0.02])
    add(monitor, rbox(0.94, 0.54, 0.035, 0.016), mat(0x1b1b22, 0.4), [0, 0.46, 0])
    add(monitor, new THREE.BoxGeometry(0.8, 0.012, 0.004), glowMat, [0, 0.22, 0.019])
    const screen = codeScreen(`#${accent.getHexString()}`)
    const screenMat = new THREE.MeshBasicMaterial({ map: screen.tex, toneMapped: false })
    add(monitor, new THREE.PlaneGeometry(0.9, 0.5), screenMat, [0, 0.46, -0.019], [0, Math.PI, 0])

    const mug = new THREE.Group()
    mug.position.set(-0.48, 0.825, 0.62)
    desk.add(mug)
    add(mug, new THREE.CylinderGeometry(0.042, 0.038, 0.1, 24), accentMat, [0, 0.05, 0])
    add(mug, new THREE.TorusGeometry(0.028, 0.008, 8, 20), accentMat, [0.045, 0.05, 0], [0, 0, 0])
    add(mug, new THREE.CylinderGeometry(0.036, 0.036, 0.005, 24), mat(0x3b2416, 0.3), [0, 0.095, 0])
    const glowTex = glowTexture()
    const steam = [0, 1, 2].map((i) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }))
      sp.userData.offset = i / 3
      mug.add(sp)
      return sp
    })

    const plant = new THREE.Group()
    plant.position.set(0.66, 0.825, 1.0)
    desk.add(plant)
    add(plant, new THREE.CylinderGeometry(0.055, 0.045, 0.11, 20), mat(0xe8e4dc, 0.7), [0, 0.055, 0])
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2
      add(plant, sph(1), mat(0x3f7a4a, 0.7), [Math.sin(a) * 0.035, 0.16 + (i % 3) * 0.03, Math.cos(a) * 0.035], [Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5], [0.025, 0.09, 0.012])
    }

    /* ---------------- hologram of the screen ---------------- */
    const holo = new THREE.Group()
    world.add(holo)
    const holoMat = new THREE.MeshBasicMaterial({ map: screen.tex, transparent: true, opacity: 0.9, toneMapped: false, side: THREE.DoubleSide })
    holo.add(new THREE.Mesh(new THREE.PlaneGeometry(1.02, 0.6), holoMat))
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.06, 0.64)), new THREE.LineBasicMaterial({ color: accent }))
    holo.add(edge)
    const beam = new THREE.Mesh(
      new THREE.PlaneGeometry(1.06, 0.64),
      new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false })
    )
    beam.position.z = -0.01
    holo.add(beam)

    /* ---------------- floor, lights ---------------- */
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.28 }))
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    world.add(ground)
    const pool = new THREE.Mesh(
      new THREE.CircleGeometry(1.1, 48),
      new THREE.MeshBasicMaterial({ map: glowTex, color: accent, transparent: true, opacity: 0.35, depthWrite: false })
    )
    pool.rotation.x = -Math.PI / 2
    pool.position.set(0.1, 0.002, 0.35)
    world.add(pool)

    scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2233, 1.1))
    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(2.5, 4.5, 3)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.shadow.camera.left = key.shadow.camera.bottom = -1.6
    key.shadow.camera.right = key.shadow.camera.top = 1.6
    key.shadow.bias = -0.0005
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.PointLight(accent, 8, 6, 1.5)
    rim.position.set(-1.6, 2, -1.4)
    scene.add(rim)
    const screenLight = new THREE.PointLight(0x9ab8ff, 2.5, 1.6, 1.5)
    screenLight.position.set(0, 1.25, 0.8)
    scene.add(screenLight)

    world.traverse((o) => {
      if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial) o.castShadow = true
    })

    /* ---------------- interaction ---------------- */
    const pointer = new THREE.Vector2(9, 9)
    const mouse = { x: 0, y: 0 }
    const ray = new THREE.Raycaster()
    let hover = false
    let mode: Mode = "type"
    let modeUntil = 5
    let typed = 0
    let blinkAt = 2

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      mouse.x = (e.clientX / innerWidth) * 2 - 1
      mouse.y = (e.clientY / innerHeight) * 2 - 1
    }
    let now = 0
    const wave = () => {
      mode = "wave"
      modeUntil = now + 2.6
      setWaving(true)
    }
    const onClick = () => hover && wave()
    addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("click", onClick)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      const d = 3.9 * Math.max(1, 1.15 / camera.aspect)
      camera.position.copy(target).add(new THREE.Vector3(1, 0.3, 0.5).normalize().multiplyScalar(d))
      camera.lookAt(target)
      camera.updateProjectionMatrix()
      const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
      holo.position.copy(new THREE.Vector3(0, 1.62, -0.35)).addScaledVector(right, 0.42)
      holo.scale.setScalar(0.62)
      holo.userData.y = holo.position.y
      holo.lookAt(camera.position)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    let visible = true
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(el)

    const damp = (cur: number, to: number, k: number, dt: number) => cur + (to - cur) * (1 - Math.exp(-k * dt))
    const start = performance.now()
    let last = 0
    let lastDraw = -1
    let raf = 0

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const t = (performance.now() - start) / 1000
      const dt = Math.min(t - last, 0.05)
      last = t
      now = t
      if (!visible || document.hidden) return

      if (t > modeUntil) {
        if (mode === "wave") setWaving(false)
        if (typed >= screen.total) typed = 0
        mode = mode === "type" ? "look" : "type"
        modeUntil = t + (mode === "type" ? 4 + Math.random() * 3 : 1.8)
      }
      if (reduce) {
        mode = "type"
        typed = screen.total
      } else if (mode === "type") {
        typed = Math.min(screen.total, typed + dt * 24)
        if (typed >= screen.total) {
          mode = "look"
          modeUntil = t + 2.6
        }
      }
      const cursor = Math.floor(t * 2) % 2 === 0
      const drawKey = Math.floor(typed) * 2 + (cursor ? 1 : 0)
      if (drawKey !== lastDraw) {
        screen.draw(Math.floor(typed), cursor)
        lastDraw = drawKey
      }

      const typing = mode === "type" && !reduce
      const look = mode !== "type"
      head.rotation.y = damp(head.rotation.y, look ? 0.55 + mouse.x * 0.15 : mouse.x * 0.12, 6, dt)
      head.rotation.x = damp(head.rotation.x, look ? -0.05 + mouse.y * 0.1 : 0.12 + (typing ? Math.sin(t * 3) * 0.02 : 0), 6, dt)
      head.rotation.z = damp(head.rotation.z, look ? -0.08 : 0, 4, dt)
      torso.rotation.y = damp(torso.rotation.y, look ? 0.12 : 0, 4, dt)
      chest.scale.y = 1 + Math.sin(t * 1.7) * 0.012

      for (const { s, shoulder, elbow } of arms) {
        const waveArm = mode === "wave" && s === 1
        const tap = typing ? Math.sin(t * 19 + (s > 0 ? 0 : 1.7)) * 0.07 : 0
        shoulder.rotation.x = damp(shoulder.rotation.x, waveArm ? -0.2 : -0.55 + tap * 0.3, 10, dt)
        shoulder.rotation.z = damp(shoulder.rotation.z, waveArm ? 2.5 : -s * 0.2, 8, dt)
        elbow.rotation.x = damp(elbow.rotation.x, waveArm ? -0.2 : -1.05 + tap, 12, dt)
        elbow.rotation.z = damp(elbow.rotation.z, waveArm ? 0.5 + Math.sin(t * 11) * 0.45 : 0, 12, dt)
      }

      if (t > blinkAt) {
        eyes.scale.y = 0.1
        if (t > blinkAt + 0.12) {
          eyes.scale.y = 1
          blinkAt = t + 2.5 + Math.random() * 3
        }
      }

      chair.rotation.y = reduce ? 0 : Math.sin(t * 0.45) * 0.035 + (look ? 0.06 : 0)
      holo.position.y = holo.userData.y + (reduce ? 0 : Math.sin(t * 1.1) * 0.03)
      beam.material.opacity = 0.07 + Math.sin(t * 3) * 0.02
      screenLight.intensity = 2.3 + Math.sin(t * 7) * 0.15

      for (const sp of steam) {
        const k = (t * 0.35 + sp.userData.offset) % 1
        sp.position.set(Math.sin(k * 6 + sp.userData.offset * 9) * 0.015, 0.12 + k * 0.22, 0)
        sp.scale.setScalar(0.03 + k * 0.07)
        sp.material.opacity = reduce ? 0 : Math.sin(k * Math.PI) * 0.35
      }

      ray.setFromCamera(pointer, camera)
      const h = ray.intersectObject(body, true).length > 0
      if (h !== hover) {
        hover = h
        el.style.cursor = h ? "pointer" : ""
        setHovered(h)
      }

      renderer.render(scene, camera)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener("pointermove", onMove)
      el.removeEventListener("click", onClick)
      ro.disconnect()
      io.disconnect()
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        ;(Array.isArray(m.material) ? m.material : m.material ? [m.material] : []).forEach((x) => x.dispose())
      })
      screen.tex.dispose()
      glowTex.dispose()
      scene.environment?.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div ref={ref} className="relative h-full w-full [mask-image:linear-gradient(to_bottom,#000_85%,transparent)]" aria-label={hint} role="img">
      <div
        className={`pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 whitespace-nowrap rounded-2xl rounded-bl-sm border border-border bg-card/90 px-4 py-2 text-sm font-medium shadow-xl backdrop-blur transition-all duration-300 ${
          waving || hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {waving ? hello : hint}
      </div>
    </div>
  )
}

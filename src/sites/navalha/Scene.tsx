import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

const OPEN = Math.PI + 0.42

function razor() {
  const group = new THREE.Group()

  const blade = new THREE.Shape()
  blade.moveTo(-0.7, 0.18)
  blade.lineTo(3.6, 0.42)
  blade.quadraticCurveTo(4.15, 0.4, 4.1, -0.05)
  blade.lineTo(3.95, -0.55)
  blade.quadraticCurveTo(2.2, -0.66, 0.35, -0.36)
  blade.lineTo(0, -0.18)
  blade.lineTo(-0.7, -0.1)
  blade.closePath()
  const steel = new THREE.MeshStandardMaterial({ color: 0xe6e0d6, metalness: 1, roughness: 0.16 })
  const bladeMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(blade, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.03, bevelSegments: 4, curveSegments: 32 }),
    steel
  )
  bladeMesh.position.z = -0.025
  group.add(bladeMesh)

  const handleShape = new THREE.Shape()
  handleShape.moveTo(-0.35, 0.3)
  handleShape.lineTo(4.3, 0.36)
  handleShape.quadraticCurveTo(4.75, 0, 4.3, -0.36)
  handleShape.lineTo(-0.35, -0.3)
  handleShape.quadraticCurveTo(-0.7, 0, -0.35, 0.3)
  const horn = new THREE.MeshPhysicalMaterial({ color: 0x4a2814, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.2 })
  const scaleGeo = new THREE.ExtrudeGeometry(handleShape, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04, bevelSegments: 5, curveSegments: 32 })
  const handle = new THREE.Group()
  for (const z of [0.07, -0.14]) {
    const s = new THREE.Mesh(scaleGeo, horn)
    s.position.z = z
    handle.add(s)
  }

  const brass = new THREE.MeshStandardMaterial({ color: 0xd4a04a, metalness: 1, roughness: 0.28 })
  const pinGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.42, 24)
  for (const x of [0, 4.15]) {
    const pin = new THREE.Mesh(pinGeo, brass)
    pin.rotation.x = Math.PI / 2
    pin.position.x = x
    handle.add(pin)
  }
  group.add(handle)

  return { group, handle, dispose: () => [bladeMesh.geometry, scaleGeo, pinGeo, steel, horn, brass].forEach((d) => d.dispose()) }
}

function embers(count: number) {
  const pos = new Float32Array(count * 3)
  const speed = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    pos.set([(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8 - 1], i * 3)
    speed[i] = 0.15 + Math.random() * 0.45
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))

  const c = document.createElement("canvas")
  c.width = c.height = 64
  const g = c.getContext("2d")!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, "rgba(255,220,160,1)")
  grad.addColorStop(0.3, "rgba(255,150,60,.6)")
  grad.addColorStop(1, "rgba(255,120,40,0)")
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  const map = new THREE.CanvasTexture(c)

  const mat = new THREE.PointsMaterial({ size: 0.2, map, color: 0xffa24a, opacity: 0.85, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
  return { points: new THREE.Points(geo, mat), pos, speed, dispose: () => [geo, mat, map].forEach((d) => d.dispose()) }
}

export default function RazorScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

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
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.55

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 11)

    scene.add(new THREE.AmbientLight(0x3a2415, 1.2))
    const key = new THREE.PointLight(0xffb46b, 90, 0, 2)
    key.position.set(4, 3, 5)
    const rim = new THREE.PointLight(0xff6a24, 60, 0, 2)
    rim.position.set(-5, -2, -3)
    scene.add(key, rim)

    const r = razor()
    const holder = new THREE.Group()
    r.group.position.x = -0.1
    holder.add(r.group)
    scene.add(holder)

    const e = embers(reduce ? 0 : 420)
    scene.add(e.points)

    const mouse = { x: 0, y: 0 }
    const onMove = (ev: PointerEvent) => {
      mouse.x = (ev.clientX / innerWidth) * 2 - 1
      mouse.y = (ev.clientY / innerHeight) * 2 - 1
    }
    addEventListener("pointermove", onMove, { passive: true })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const wide = w / h > 1.1
      const halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      holder.position.set(wide ? 2.9 : 0, wide ? 0.3 : halfH - 1.2, 0)
      holder.scale.setScalar(wide ? 0.5 : (2 * halfH * camera.aspect) / 11)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    const start = performance.now()
    let last = start
    let raf = 0
    const frame = () => {
      raf = requestAnimationFrame(frame)
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible || document.hidden) return
      const t = (now - start) / 1000

      const k = reduce ? 1 : Math.min(Math.max((t - 0.3) / 1.6, 0), 1)
      r.handle.rotation.z = OPEN * (1 - Math.pow(1 - k, 4))

      holder.rotation.y += ((reduce ? 0 : Math.sin(t * 0.4) * 0.45) + mouse.x * 0.35 - holder.rotation.y) * 0.05
      holder.rotation.x += (0.25 + mouse.y * 0.2 - holder.rotation.x) * 0.05
      holder.rotation.z = -0.12
      r.group.position.y = 0.7 + (reduce ? 0 : Math.sin(t * 0.9) * 0.12)
      key.position.x = 4 + Math.sin(t * 0.6) * 3

      for (let i = 0; i < e.speed.length; i++) {
        const y = i * 3 + 1
        e.pos[y] += e.speed[i] * dt
        e.pos[y - 1] += Math.sin(t + i) * 0.002
        if (e.pos[y] > 5) e.pos[y] = -5
      }
      e.points.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener("pointermove", onMove)
      ro.disconnect()
      io.disconnect()
      r.dispose()
      e.dispose()
      env.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={ref} aria-hidden className={className} />
}

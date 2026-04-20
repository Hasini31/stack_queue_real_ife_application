# 🍽️ Cyber Kitchen — Stack & Queue Visualizer

An interactive, cyberpunk-themed web app that brings **Stack** and **Queue** data structures to life using a kitchen analogy.

---

## 🚀 Live Demo

Open `index.html` directly in any modern browser — no server or build step needed.

---

## 🧠 Concept

| Data Structure | Real-Life Analogy | Behaviour |
|---|---|---|
| **Queue** | Conveyor Belt (Incoming Orders) | FIFO — First In, First Out |
| **Stack** | Wash Basin (Sink) | LIFO — Last In, First Out |

Plates (orders) enter the conveyor belt via the queue, get transferred to the sink one by one, and are washed (popped) from the top of the stack.

---

## 🎮 How to Use

1. **ENQUEUE ORDER** — Adds a new plate to the conveyor belt (queue).
2. **TRANSFER TO SINK** — Removes the front plate from the belt (dequeue) and drops it into the wash basin (push onto stack).
3. **WASH TOP** — Removes and washes the top plate from the sink (pop from stack).

> Both the queue and stack hold a **maximum of 5 plates**. Error modals appear if you try to exceed the limit or operate on an empty structure.

---

## 🗂️ Project Structure

```
├── index.html   # App layout and UI markup
├── style.css    # Neon/cyberpunk theme, animations, 3D transforms
└── script.js    # Queue & stack logic, DOM manipulation, animations
```

---

## ✨ Features

- 🎨 **Neon cyberpunk UI** with 3D CSS transforms and glow effects
- 🎬 **Smooth animations** — plates slide in, fly across, and spin out
- 📊 **Live stat bars** that turn red when a structure is full
- 🚨 **Error modal** for overflow and empty-structure operations
- 🔒 **Operation lock** (`isBusy` flag) prevents animation conflicts

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, keyframe animations, 3D perspective
- **Vanilla JavaScript** — no frameworks or dependencies
- **Google Fonts** — Orbitron & Roboto

---

## 📚 Learning Outcomes

- Understand **FIFO** (Queue) vs **LIFO** (Stack) behaviour visually
- See how `Array.push()` / `Array.shift()` / `Array.pop()` map to real data structure operations
- Observe how animations can make abstract CS concepts tangible

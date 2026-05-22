# Feature Spec: 3D Layered Pop-Out Image Portals

## Goal
Establish a cohesive, consistent visual identity across the homepage by utilizing **3D Layered Pop-Out Arch Portals** for all key clinical photography. This elevates the website from a basic corporate layout to a premium, custom, luxury digital sanctuary. Instead of standard flat images, important clinic assets (Dr. Oke, the dental chair, and core treatments) will float within and pop out of arched, golden-bordered frames on user interaction (hover).

To ensure extreme photographic fidelity, the AI will not generate these images; rather, we define a list of exact image specifications and descriptions so the user can easily procure and supply pristine, high-resolution source photography.

---

## 3D Depth-Layering Architecture

Each portal consists of a 3-layer visual stack styled with Tailwind CSS utility classes:
```
                                [ Hover Zoom + Translate Effect ]
+---------------------------------------------------------------------------------------+
|  LAYER 3: FRONT POP-OUT ELEMENT                                                       |
|  - Sits on top of the border / frame                                                  |
|  - Cropped with `clipPath: inset(0 0 <crop-percentage>% 0)`                           |
|  - Only shows the top parts (e.g. head, overhead LED light, top of crown)              |
+---------------------------------------------------------------------------------------+
|  LAYER 2: BACKGROUND ARCH PORTAL BORDER & SHADOW                                      |
|  - Beautiful gold border: `border-t-2 border-x-2 border-gold/30 rounded-t-[160px]`    |
|  - Linear grid tech background pattern + soft vertical gradient mesh                  |
|  - Controlled with `overflow-hidden` to crop the lower base                           |
|  - Encloses LAYER 1 (the back clipped body layer)                                     |
+---------------------------------------------------------------------------------------+
|  LAYER 1: BACK BODY LAYER (INSIDE LAYER 2 OVERFLOW)                                   |
|  - Clipped inside the arched boundary                                                 |
|  - Scaled and positioned identically to LAYER 3 to ensure perfect registration         |
+---------------------------------------------------------------------------------------+
```

---

## Precision Image Sourcing Specifications

We require **6 high-quality image assets**. The user will procure these assets based on the following specific photographic guidelines.

### 1. Lead Surgeon Portrait (`/dr-oke.png`)
* **Role:** Hero profile anchor and about story image.
* **Format:** Transparent PNG (background completely removed).
* **Dimensions:** Minimum 800px width x 1000px height.
* **Visual Description:** A professional, warm, and welcoming studio portrait of an African male dental surgeon (Dr. Emmanuel Oke) in his late 30s or early 40s. He should have a confident, empathetic smile and be dressed in modern, sophisticated professional attire (e.g., a dark neutral suit or structured dental scrub, crisp shirt, no harsh reflections). 
* **3D Pop-out Target:** His head and collar will sit in front of the gold frame (`clipPath: 'inset(0 0 62% 0)'` on the front layer), while his shoulders and torso remain cropped within the arch.

### 2. Premium Ergonomic Dental Chair (`/dental-chair.png`)
* **Role:** Infection control & safety sanctuary anchor (Section 4).
* **Format:** Transparent PNG (background completely removed).
* **Dimensions:** Minimum 800px width x 1000px height.
* **Visual Description:** A sleek, high-end European-style ergonomic dental chair in a premium light cream, warm gray, or soft sage green color. The design must feel clean, modern, and high-tech (gold, silver, or matte dark metallic structural frame). Should include a modern overhead LED surgical light arm or an elegantly designed headrest. Shot from a clean 3/4 front angle.
* **3D Pop-out Target:** The overhead LED light or upper headrest pops out of the arch border (`clipPath: 'inset(0 0 65% 0)'` on the front layer), while the chair's hydraulic base and footrest are cropped cleanly.

### 3. Restorative Ceramic Crown & Implant (`/restorative-care.png`)
* **Role:** Services Preview Card 1 (Section 5).
* **Format:** Transparent PNG (background completely removed).
* **Dimensions:** Minimum 600px width x 800px height.
* **Visual Description:** A macro-lens studio photograph of a single, pristine dental crown made of translucent, natural-looking porcelain/ceramic, sitting on an elegant modern base or isolated in space. It should capture clean light reflections, indicating microscopic precision, durability, and biological quality.
* **3D Pop-out Target:** The top crown facets pop out of the arched gold border, with the base remaining inside the card structure.

### 4. Cosmetic Smile Artistry (`/cosmetic-artistry.png`)
* **Role:** Services Preview Card 2 (Section 5).
* **Format:** Transparent PNG or isolated close-up with a high-contrast warm background.
* **Dimensions:** Minimum 600px width x 800px height.
* **Visual Description:** A tasteful, natural, close-up studio shot of a beautiful, healthy smile (showing perfectly cleaned, bright teeth and pink healthy gums). The smile should feel warm, genuine, and premium (not over-whitened or artificial).
* **3D Pop-out Target:** The upper lips and perfect teeth row float forward over the arch line, while the chin/lower jaw remain cropped.

### 5. Clear Invisible Orthodontic Aligner (`/clear-orthodontics.png`)
* **Role:** Services Preview Card 3 (Section 5).
* **Format:** Transparent PNG (background completely removed).
* **Dimensions:** Minimum 600px width x 800px height.
* **Visual Description:** A studio shot of a crystal-clear, high-potency medical-grade invisible aligner (clear tray). It must look transparent and catch subtle highlights/shadows to show its shape. 
* **3D Pop-out Target:** The front arch of the aligner extends over the gold border, with the back tabs cleanly enclosed.

### 6. Treatment Suite Sanctuary Backdrop (`/treatment-suite.jpg`)
* **Role:** Visual interior background behind the images inside each arch.
* **Format:** Warm JPEG.
* **Dimensions:** Minimum 1200px width x 800px height.
* **Visual Description:** A cozy, serene, high-end private dental treatment suite showing warm wooden elements, soft indirect lighting, neutral beige/cream walls, and perhaps a subtle indoor green plant in the corner. It must feel like a luxury lounge or spa, not a harsh, intimidating clinic environment. Used as a blurred background texture under the isolated PNG assets inside the arches.

---

## Component Integration and UI Slots

1. **Hero Column (Line 119 - `src/app/page.tsx`):**
   - Already equipped with Dr. Oke's 3D Pop-Out Arch.
   - Requires `/dr-oke.png` to render.

2. **Safety Section Right Column (Line 225 - `src/app/page.tsx`):**
   - Already equipped with the 3D Dental Chair Arch Portal.
   - Requires `/dental-chair.png` to render.

3. **Services Preview Cards (Line 279 - `src/app/page.tsx`):**
   - Currently, these cards are plain text. We will upgrade these three cards to feature **Mini 3D Pop-Out Arch Portals** using `/restorative-care.png`, `/cosmetic-artistry.png`, and `/clear-orthodontics.png` side-by-side with their descriptions!
   - This creates an elite editorial aesthetic that immediately grabs the visitor's eye.

---

## Technical & Motion Guardrails
- **Synchronized Transitions:** Every layered portal uses matching CSS transition classes (e.g. `duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-2 origin-bottom`) on BOTH the background layer and the front pop-out layer. This prevents visual splitting or shearing on hover.
- **Hardware Acceleration:** Ensure all scale/translate classes are applied alongside opacity/transforms and utilise tailwind's `transform-gpu` if needed to guarantee buttery smooth 60fps animations.
- **No Hidden Scrollbars:** Frame containers maintain precise dimensional limits (`w-80 h-[480px]` or matching responsive variants) to prevent layouts from expanding awkwardly on mobile.

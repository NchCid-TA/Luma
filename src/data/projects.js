// Proyectos que se muestran en la sección "Trabajo" de la landing.
//
// Cómo añadir un proyecto real:
// 1. Guarda la imagen en src/assets/work/ — usa un nombre corto, sin espacios ni tildes
//    (ej. "4space-01.png"), y barras normales "/" (nunca "\", que en JS es un carácter
//    especial y rompe la ruta).
// 2. Impórtala al principio de este archivo, como las líneas de abajo:
//      import nombreProyecto from "../assets/work/nombre-proyecto.jpg";
// 3. En el objeto del proyecto, pon esa variable importada (no el texto de la ruta) en
//    el campo `image`, y quita `concept: true`.
// 4. `links` es opcional: una lista de { label, href } con las redes o la web del
//    proyecto. Si se omite, o el array está vacío, simplemente no se muestra esa fila.
//
// Mientras un proyecto no tenga `image`, se muestra con un fondo degradado de relleno
// y la etiqueta "Proyecto conceptual" para dejar claro que aún no es un caso real.

import space4 from "../assets/work/4space-01.png";
import ludipadel from "../assets/work/ludipadel.png";

export const PROJECTS = [
  {
    name: "Ludipadel Energía",
    category: "Gestión de redes",
    image: ludipadel,
    concept: false,
    links: [
      { label: "Web", href: "https://www.ludipadel.com/" },
      { label: "Instagram", href: "https://www.instagram.com/ludipadel.energia/" },
    ],
    gradient:
      "radial-gradient(120% 100% at 15% 10%, rgba(109,74,255,0.5), transparent 60%), radial-gradient(90% 90% at 85% 90%, rgba(61,42,153,0.6), transparent 55%), linear-gradient(160deg, #131219, #0b0a0f 70%)",
  },
  {
    name: "4Space",
    category: "Gestión de redes",
    image: space4,
    concept: false,
    links: [
      { label: "Web", href: "https://www.4space.es/" },
      { label: "Instagram", href: "https://www.instagram.com/4space.uniovi" },
      { label: "YouTube", href: "https://www.youtube.com/@4space.uniovi/videos" },
      { label: "TikTok", href: "https://www.tiktok.com/@4space.uniovi" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/4spaceuniovi/posts/?feedView=all" },
    ],
    gradient:
      "radial-gradient(100% 90% at 85% 15%, rgba(201,191,255,0.35), transparent 55%), radial-gradient(120% 100% at 10% 95%, rgba(109,74,255,0.35), transparent 60%), linear-gradient(200deg, #17151e, #0b0a0f 75%)",
  },
];

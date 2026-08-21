import type { Fact } from '../types/game';

/** Curated, verifiable Spanish facts keyed by exponent (n where value = 2^n). */
export const CURATED_FACTS: Record<number, Fact[]> = {
  0: [
    {
      id: '0-1',
      text: '1 es el elemento neutro de la multiplicación: cualquier número multiplicado por 1 permanece igual.',
      category: 'matemáticas',
    },
    {
      id: '0-2',
      text: 'En notación de potencias, 1 se escribe como 2⁰. Cualquier número (salvo cero) elevado a 0 vale 1.',
      category: 'matemáticas',
    },
    {
      id: '0-3',
      text: 'Los romanos escribían el 1 como I: un palo. Es el símbolo numérico más simple que existe.',
      category: 'historia',
    },
    {
      id: '0-4',
      text: 'El 1 es el único número positivo igual a su recíproco: 1 ÷ 1 = 1.',
      category: 'matemáticas',
    },
    {
      id: '0-5',
      text: 'En ajedrez, cada bando tiene un solo rey: si cae, se acaba la partida.',
      category: 'usos',
    },
    {
      id: '0-6',
      text: 'El 1 no es un número primo: los primos necesitan exactamente dos divisores distintos, y 1 solo tiene uno.',
      category: 'matemáticas',
    },
    {
      id: '0-7',
      text: 'El hidrógeno, el elemento más abundante del universo, tiene número atómico 1: un solo protón.',
      category: 'ciencia',
    },
    {
      id: '0-8',
      text: 'En datos reales —poblaciones, facturas, ríos— cerca del 30 % de los números empiezan por 1. Es la ley de Benford.',
      category: 'probabilidad',
    },
    {
      id: '0-9',
      text: 'En probabilidad, un evento seguro tiene probabilidad 1 (o 100 %).',
      category: 'probabilidad',
    },
    {
      id: '0-10',
      text: 'Si partes un pastel en 1 trozo, no lo has partido: el 1 es la ausencia de división.',
      category: 'comparación',
    },
  ],
  1: [
    {
      id: '1-1',
      text: '2 es el único número primo par: todos los pares mayores son divisibles por 2.',
      category: 'matemáticas',
    },
    {
      id: '1-2',
      text: 'La base del sistema binario es 2: con ceros y unos se codifica casi toda la informática moderna.',
      category: 'tecnología',
    },
    {
      id: '1-3',
      text: 'Los humanos somos animales bípedos: caminamos sobre 2 piernas.',
      category: 'naturaleza',
    },
    {
      id: '1-4',
      text: '2 + 2 = 2 × 2 = 4. El 2 es el único número cuyo doble y cuyo cuadrado coinciden.',
      category: 'matemáticas',
    },
    {
      id: '1-5',
      text: 'En música, un intervalo de octava duplica la frecuencia: el la a 440 Hz y el la a 880 Hz.',
      category: 'ciencia',
    },
    {
      id: '1-6',
      text: 'El helio tiene exactamente 2 protones: es el segundo elemento de la tabla periódica y el que hace flotar los globos.',
      category: 'ciencia',
    },
    {
      id: '1-7',
      text: 'En binario, 2 se escribe «10».',
      category: 'tecnología',
    },
    {
      id: '1-8',
      text: 'Una moneda justa tiene 2 caras: cara o cruz, cada una con probabilidad 1/2.',
      category: 'probabilidad',
    },
    {
      id: '1-9',
      text: 'Nadie ha encontrado un monopolio magnético: cada imán tiene siempre 2 polos, norte y sur.',
      category: 'ciencia',
    },
    {
      id: '1-10',
      text: 'Dos puntos definen una recta única en la geometría euclidiana.',
      category: 'matemáticas',
    },
  ],
  2: [
    {
      id: '2-1',
      text: '4 = 2². Es un cuadrado perfecto y una potencia de dos a la vez.',
      category: 'matemáticas',
    },
    {
      id: '2-2',
      text: 'Hay 4 puntos cardinales clásicos: norte, sur, este y oeste.',
      category: 'comparación',
    },
    {
      id: '2-3',
      text: 'Un año no bisiesto tiene 4 estaciones en gran parte del planeta: primavera, verano, otoño e invierno.',
      category: 'naturaleza',
    },
    {
      id: '2-4',
      text: 'En ADN, hay 4 bases nitrogenadas: adenina, timina, citosina y guanina.',
      category: 'ciencia',
    },
    {
      id: '2-5',
      text: 'Hay 4 tipos sanguíneos en el sistema ABO: A, B, AB y O.',
      category: 'ciencia',
    },
    {
      id: '2-6',
      text: 'Un tetraedro —el dado de 4 caras del rol— es el poliedro más simple: 4 caras y 4 vértices.',
      category: 'matemáticas',
    },
    {
      id: '2-7',
      text: 'Un trébol de 4 hojas es raro: la mayoría tiene 3.',
      category: 'naturaleza',
    },
    {
      id: '2-8',
      text: 'Al lanzar dos monedas justas hay 4 resultados posibles: CC, CX, XC y XX.',
      category: 'probabilidad',
    },
    {
      id: '2-9',
      text: 'Un año bisiesto añade 1 día cada 4 años, con matices: los siglos solo son bisiestos si son divisibles por 400.',
      category: 'tiempo',
    },
    {
      id: '2-10',
      text: 'Sin oxígeno, el cerebro humano aguanta unos 4 minutos antes de dañarse de verdad.',
      category: 'ciencia',
    },
  ],
  3: [
    {
      id: '3-1',
      text: '8 = 2³. Un byte clásico tiene 8 bits.',
      category: 'tecnología',
    },
    {
      id: '3-2',
      text: 'Desde 2006, la Unión Astronómica Internacional reconoce 8 planetas en el sistema solar.',
      category: 'ciencia',
    },
    {
      id: '3-3',
      text: 'Un pulpo tiene 8 brazos.',
      category: 'naturaleza',
    },
    {
      id: '3-4',
      text: 'En música, una octava abarca 8 notas de la escala diatónica (do–re–mi–fa–sol–la–si–do).',
      category: 'usos',
    },
    {
      id: '3-5',
      text: 'La luz del Sol tarda unos 8 minutos y 20 segundos en llegar a la Tierra.',
      category: 'ciencia',
    },
    {
      id: '3-6',
      text: 'Un cubo tiene 8 vértices.',
      category: 'matemáticas',
    },
    {
      id: '3-7',
      text: 'El ajedrez se juega en un tablero de 8×8 casillas.',
      category: 'usos',
    },
    {
      id: '3-8',
      text: 'Con 3 bits puedes representar exactamente 8 valores distintos (de 0 a 7).',
      category: 'datos',
    },
    {
      id: '3-9',
      text: 'Una araña típica tiene 8 patas; los insectos tienen 6.',
      category: 'naturaleza',
    },
    {
      id: '3-10',
      text: 'Un cubo de Rubik 3×3 tiene exactamente 8 cubitos de esquina, y nunca dejan de ser esquinas.',
      category: 'usos',
    },
  ],
  4: [
    {
      id: '4-1',
      text: '16 = 2⁴. En hexadecimal, un dígito representa exactamente 16 valores (0–F).',
      category: 'tecnología',
    },
    {
      id: '4-2',
      text: 'Hay 16 onzas en una libra del sistema imperial de pesos.',
      category: 'comparación',
    },
    {
      id: '4-3',
      text: 'En Minecraft, un chunk de superficie mide 16×16 bloques.',
      category: 'usos',
    },
    {
      id: '4-4',
      text: 'Un cuadrado perfecto: 4² = 16.',
      category: 'matemáticas',
    },
    {
      id: '4-5',
      text: 'Hay 16 piezas por bando en el ajedrez: rey, dama, 2 torres, 2 caballos, 2 alfiles y 8 peones.',
      category: 'usos',
    },
    {
      id: '4-6',
      text: 'El dado de 16 caras (d16) existe en rol, aunque el d20 se lleva toda la fama.',
      category: 'usos',
    },
    {
      id: '4-7',
      text: '16 cuadros por segundo era el cine mudo: por debajo, el movimiento se ve a tirones.',
      category: 'historia',
    },
    {
      id: '4-8',
      text: 'El puzle del «juego de las 15» se juega en un tablero de 4×4 con 16 posiciones.',
      category: 'usos',
    },
    {
      id: '4-9',
      text: '16 es el número atómico del azufre en la tabla periódica.',
      category: 'ciencia',
    },
    {
      id: '4-10',
      text: 'En hexadecimal, 16 se escribe «10»: igual que el 2 se escribe «10» en binario. Cada base empieza a pedir un segundo dígito en su propia «diez».',
      category: 'matemáticas',
    },
  ],
  5: [
    {
      id: '5-1',
      text: '32 = 2⁵. Muchos procesadores modernos trabajan de forma nativa con palabras de 32 o 64 bits.',
      category: 'tecnología',
    },
    {
      id: '5-2',
      text: 'Un conjunto de dientes humanos adultos completos suele tener 32 piezas.',
      category: 'naturaleza',
    },
    {
      id: '5-3',
      text: 'El agua se congela a 0 °C y hierve a 100 °C; 32 °F es el punto de congelación en la escala Fahrenheit.',
      category: 'ciencia',
    },
    {
      id: '5-4',
      text: 'La rosa de los vientos fina tiene 32 rumbos: N, NbE, NNE y así hasta dar la vuelta al horizonte.',
      category: 'comparación',
    },
    {
      id: '5-5',
      text: 'Hay 32 equipos en varias ligas deportivas profesionales importantes (por ejemplo, la NFL).',
      category: 'comparación',
    },
    {
      id: '5-6',
      text: '32 bits son 4 bytes: el tamaño clásico de un «int» en muchísimos programas.',
      category: 'tecnología',
    },
    {
      id: '5-7',
      text: 'En ajedrez, cada bando empieza con 16 piezas; entre ambos suman 32.',
      category: 'usos',
    },
    {
      id: '5-8',
      text: 'Un mes puede tener 28, 29, 30 o 31 días. El 32 es el primer número que se sale del calendario.',
      category: 'tiempo',
    },
    {
      id: '5-9',
      text: 'Existe el dado de 32 caras (d32) en juegos de rol, aunque casi nadie lo usa.',
      category: 'usos',
    },
    {
      id: '5-10',
      text: 'El germanio tiene número atómico 32.',
      category: 'ciencia',
    },
  ],
  6: [
    {
      id: '6-1',
      text: '64 = 2⁶. Un tablero de ajedrez tiene 64 casillas.',
      category: 'usos',
    },
    {
      id: '6-2',
      text: 'El código genético tiene 64 codones: las 4 bases del ADN combinadas de tres en tres (4³ = 64) para fabricar proteínas.',
      category: 'ciencia',
    },
    {
      id: '6-3',
      text: 'Base64 codifica datos binarios usando 64 símbolos imprimibles.',
      category: 'tecnología',
    },
    {
      id: '6-4',
      text: 'El I Ching, el libro chino de las mutaciones, se organiza en 64 hexagramas.',
      category: 'historia',
    },
    {
      id: '6-5',
      text: 'Según la leyenda del ajedrez, si pones 1 grano en la primera casilla y duplicas en cada una de las 64, el total es 2⁶⁴ − 1 granos.',
      category: 'historia',
    },
    {
      id: '6-6',
      text: '64 es un cubo perfecto: 4³ = 64, y también 8² = 64.',
      category: 'matemáticas',
    },
    {
      id: '6-7',
      text: 'Un cubo de 4×4×4 está formado por 64 cubitos más pequeños.',
      category: 'matemáticas',
    },
    {
      id: '6-8',
      text: '64 kilobits por segundo era el bitrate de una llamada telefónica digital (ISDN): voz reconocible, música fatal.',
      category: 'historia',
    },
    {
      id: '6-9',
      text: 'El gadolinio tiene número atómico 64.',
      category: 'ciencia',
    },
    {
      id: '6-10',
      text: 'En 1977 el Apple II se vendía con 4 KB y se ampliaba hasta 48 o 64 KB: 64 kilobytes eran toda la memoria de un ordenador de salón.',
      category: 'historia',
    },
  ],
  7: [
    {
      id: '7-1',
      text: '128 = 2⁷. El ASCII estándar usa valores de 0 a 127: 128 códigos en total.',
      category: 'tecnología',
    },
    {
      id: '7-2',
      text: 'MIDI numera las notas del 0 al 127: 128 sonidos, del do más grave al más agudo que un teclado electrónico reconoce.',
      category: 'tecnología',
    },
    {
      id: '7-3',
      text: 'El 128 es el primer código que ya no cabe en ASCII de 7 bits: por eso las eñes y los acentos rompían los textos antiguos.',
      category: 'historia',
    },
    {
      id: '7-4',
      text: '128 kilobits por segundo fue una tasa típica de MP3 de calidad aceptable en los años 2000.',
      category: 'historia',
    },
    {
      id: '7-5',
      text: 'La Torre de Hanói con 7 discos se resuelve en 127 movimientos: uno menos que 128.',
      category: 'matemáticas',
    },
    {
      id: '7-6',
      text: 'Contar hasta 128 a un número por segundo tarda unos 2 minutos y 8 segundos.',
      category: 'tiempo',
    },
    {
      id: '7-7',
      text: '128 metros es la altura de un edificio de unas 40 plantas: una torre de barrio, no un rascacielos.',
      category: 'comparación',
    },
    {
      id: '7-8',
      text: 'En MIDI, muchos parámetros usan el rango 0–127 (128 valores).',
      category: 'usos',
    },
    {
      id: '7-9',
      text: 'Un humano parpadea unas 15–20 veces por minuto: 128 parpadeos son 6 u 8 minutos de conversación.',
      category: 'naturaleza',
    },
    {
      id: '7-10',
      text: 'En probabilidad, si lanzas una moneda justa 7 veces, hay 128 secuencias posibles de cara/cruz.',
      category: 'probabilidad',
    },
  ],
  8: [
    {
      id: '8-1',
      text: '256 = 2⁸. Un byte sin signo puede almacenar valores de 0 a 255: 256 posibilidades.',
      category: 'tecnología',
    },
    {
      id: '8-2',
      text: 'Los colores RGB de 8 bits por canal permiten 256 intensidades por canal.',
      category: 'tecnología',
    },
    {
      id: '8-3',
      text: 'Un icono clásico de 16×16 píxeles tiene exactamente 256 puntos.',
      category: 'comparación',
    },
    {
      id: '8-4',
      text: '2⁸ = 256. Es un cuadrado perfecto: 16² = 256.',
      category: 'matemáticas',
    },
    {
      id: '8-5',
      text: 'El código de caracteres Latin-1 (ISO-8859-1) define 256 posiciones.',
      category: 'datos',
    },
    {
      id: '8-6',
      text: 'Contar hasta 256 a un número por segundo tarda unos 4 minutos y 16 segundos.',
      category: 'tiempo',
    },
    {
      id: '8-7',
      text: '256 colores era la paleta VGA estándar de los PC de los 90: toda una foto cabía en un byte por píxel.',
      category: 'historia',
    },
    {
      id: '8-8',
      text: 'Pac-Man, Space Invaders y casi todo el arcade clásico vivían en CPUs de 8 bits: 256 valores eran todo su vocabulario aritmético.',
      category: 'historia',
    },
    {
      id: '8-9',
      text: 'Si lanzas una moneda 8 veces, hay 256 secuencias posibles.',
      category: 'probabilidad',
    },
    {
      id: '8-10',
      text: '256 es 2⁸ y también 4⁴: cuatro cuatros multiplicados.',
      category: 'matemáticas',
    },
  ],
  9: [
    {
      id: '9-1',
      text: '512 = 2⁹. Aparece a menudo como tamaño de sector en discos antiguos (512 bytes).',
      category: 'tecnología',
    },
    {
      id: '9-2',
      text: 'La Torre de Hanói con 9 discos pide 511 movimientos: uno menos que 512.',
      category: 'matemáticas',
    },
    {
      id: '9-3',
      text: '512 Hz está cerca de un do agudo de piano. Cada octava duplica, así que 256 Hz es la octava de abajo.',
      category: 'ciencia',
    },
    {
      id: '9-4',
      text: 'Contar hasta 512 a un número por segundo tarda unos 8 minutos y 32 segundos.',
      category: 'tiempo',
    },
    {
      id: '9-5',
      text: 'Madrid y Barcelona están a unos 500 km en línea recta: 512 km es esa ruta con un pequeño rodeo.',
      category: 'comparación',
    },
    {
      id: '9-6',
      text: '512 no es un cuadrado perfecto (22² = 484 y 23² = 529).',
      category: 'matemáticas',
    },
    {
      id: '9-7',
      text: 'Si lanzas una moneda 9 veces, hay 512 resultados posibles.',
      category: 'probabilidad',
    },
    {
      id: '9-8',
      text: 'Un folio A4 apilado 512 veces mide unos 5 cm: un taco de papel de oficina.',
      category: 'comparación',
    },
    {
      id: '9-9',
      text: 'Una colmena pequeña arranca con unos cientos de abejas; 512 obreras ya son un enjambre que se ve y se oye.',
      category: 'naturaleza',
    },
    {
      id: '9-10',
      text: 'Una página densa de libro tiene unas 500 palabras; 512 palabras se leen en un minuto largo.',
      category: 'usos',
    },
  ],
  10: [
    {
      id: '10-1',
      text: '1024 = 2¹⁰. Un kibibyte (KiB) son exactamente 1024 bytes.',
      category: 'tecnología',
    },
    {
      id: '10-2',
      text: 'A menudo se dice «1 KB ≈ 1000 bytes», pero en potencias de dos es 1024.',
      category: 'datos',
    },
    {
      id: '10-3',
      text: 'En el juego 2048, el azulejo 1024 es el penúltimo paso: un solo merge te da el número que da nombre al juego.',
      category: 'usos',
    },
    {
      id: '10-4',
      text: '1024 años después del año 1000 está 2024: un «kibi-milenio» nos deja en el siglo XXI.',
      category: 'historia',
    },
    {
      id: '10-5',
      text: 'Contar hasta 1024 a un número por segundo tarda unos 17 minutos.',
      category: 'tiempo',
    },
    {
      id: '10-6',
      text: '1024 = 32², así que también es un cuadrado perfecto.',
      category: 'matemáticas',
    },
    {
      id: '10-7',
      text: 'Si lanzas una moneda 10 veces, hay 1024 secuencias posibles.',
      category: 'probabilidad',
    },
    {
      id: '10-8',
      text: 'Una imagen de 32×32 píxeles tiene 1024 píxeles.',
      category: 'comparación',
    },
    {
      id: '10-9',
      text: 'En la Edad Media, el millar era 1000; 1024 es el «millar binario».',
      category: 'historia',
    },
    {
      id: '10-10',
      text: 'Un kibibyte de texto son unas 200 palabras: este párrafo cabe varias veces en 1024 bytes.',
      category: 'datos',
    },
  ],
  11: [
    {
      id: '11-1',
      text: '2048 = 2¹¹. Es el nombre de un popular juego de puzzle numérico.',
      category: 'usos',
    },
    {
      id: '11-2',
      text: '2 KiB son exactamente 2048 bytes.',
      category: 'tecnología',
    },
    {
      id: '11-3',
      text: '2048 bits es un tamaño habitual de clave RSA. Ojo: no son 2048 combinaciones, sino 2²⁰⁴⁸, un número con más de 600 dígitos.',
      category: 'tecnología',
    },
    {
      id: '11-4',
      text: 'Contar hasta 2048 a un número por segundo tarda unos 34 minutos.',
      category: 'tiempo',
    },
    {
      id: '11-5',
      text: 'El cine digital 2K mide 2048×1080 píxeles: este número es el ancho de una pantalla de cine.',
      category: 'usos',
    },
    {
      id: '11-6',
      text: 'Si lanzas una moneda 11 veces, hay 2048 resultados posibles.',
      category: 'probabilidad',
    },
    {
      id: '11-7',
      text: 'Un capítulo de novela ronda las 2 000–4 000 palabras; 2048 palabras son un capítulo cortito.',
      category: 'comparación',
    },
    {
      id: '11-8',
      text: 'El ZX81 de Sinclair salía con 1 KB de RAM. 2 KB —2048 bytes— ya parecían un lujo en 1981.',
      category: 'historia',
    },
    {
      id: '11-9',
      text: '2048 no es primo, pero 11 sí: por eso 2048 no es cuadrado ni cubo perfecto.',
      category: 'matemáticas',
    },
    {
      id: '11-10',
      text: 'En el 2048 original empiezas con un 2 y fusionas baldosas iguales: el 2048 es exactamente once fusiones desde el 2.',
      category: 'usos',
    },
  ],
  12: [
    {
      id: '12-1',
      text: '4096 = 2¹². Es un tamaño de página de memoria muy común en sistemas operativos (4 KiB).',
      category: 'tecnología',
    },
    {
      id: '12-2',
      text: 'Una sección de chunk de Minecraft mide 16×16×16 bloques: exactamente 4096.',
      category: 'usos',
    },
    {
      id: '12-3',
      text: 'Las fotos RAW de 12 bits por canal distinguen 4096 niveles de brillo: 16 veces más que un JPEG de 8 bits.',
      category: 'tecnología',
    },
    {
      id: '12-4',
      text: 'Contar hasta 4096 a un número por segundo tarda un poco más de una hora (unos 68 minutos).',
      category: 'tiempo',
    },
    {
      id: '12-5',
      text: 'Una imagen de 64×64 píxeles tiene 4096 píxeles.',
      category: 'comparación',
    },
    {
      id: '12-6',
      text: 'Si lanzas una moneda 12 veces, hay 4096 secuencias posibles.',
      category: 'probabilidad',
    },
    {
      id: '12-7',
      text: '2¹² = 4096 = 64², también un cuadrado perfecto.',
      category: 'matemáticas',
    },
    {
      id: '12-8',
      text: '4096 bits es un tamaño habitual de clave RSA, el doble de largo que 2048.',
      category: 'datos',
    },
    {
      id: '12-9',
      text: '4096 escalones de 20 cm suman 819 metros: a un pelo de los 828 m del Burj Khalifa, el edificio más alto del mundo.',
      category: 'comparación',
    },
    {
      id: '12-10',
      text: 'Un cubo de 16 celdas de lado contiene 4096 celdas.',
      category: 'matemáticas',
    },
  ],
  13: [
    {
      id: '13-1',
      text: '8192 = 2¹³. Ocho kibibytes son exactamente 8192 bytes.',
      category: 'tecnología',
    },
    {
      id: '13-2',
      text: '13 es primo, así que 8192 no es cuadrado ni cubo: no hay forma de reordenar 8192 en un cuadrado o un cubo perfectos.',
      category: 'matemáticas',
    },
    {
      id: '13-3',
      text: 'Contar hasta 8192 a un número por segundo tarda unas 2 horas y 16 minutos.',
      category: 'tiempo',
    },
    {
      id: '13-4',
      text: 'El 8K UHD mide 7680×4320 píxeles: el lado largo está a un 6 % de 8192.',
      category: 'comparación',
    },
    {
      id: '13-5',
      text: 'Si lanzas una moneda 13 veces, hay 8192 resultados posibles.',
      category: 'probabilidad',
    },
    {
      id: '13-6',
      text: 'Un cuento de 8192 caracteres son unas 1 400 palabras: un relato breve de verdad.',
      category: 'usos',
    },
    {
      id: '13-7',
      text: '8192 metros son 8,2 km: una subida de montaña de las serias, o la distancia de una carrera popular.',
      category: 'comparación',
    },
    {
      id: '13-8',
      text: 'La Torre de Hanói con 13 discos pide 8191 movimientos: uno menos que este número.',
      category: 'matemáticas',
    },
    {
      id: '13-9',
      text: 'En audio digital, tamaños de buffer de 8192 muestras son habituales en procesamiento.',
      category: 'usos',
    },
    {
      id: '13-10',
      text: '8192 Hz fue una frecuencia de muestreo temprana en telefonía digital: voz comprensible, música imposible.',
      category: 'historia',
    },
  ],
  14: [
    {
      id: '14-1',
      text: '16 384 = 2¹⁴. Dieciséis kibibytes son exactamente 16 384 bytes.',
      category: 'tecnología',
    },
    {
      id: '14-2',
      text: 'El pitch bend de MIDI usa 14 bits: 16 384 matices para deslizar una nota, no 127.',
      category: 'usos',
    },
    {
      id: '14-3',
      text: 'Contar hasta 16 384 a un número por segundo tarda unas 4 horas y media.',
      category: 'tiempo',
    },
    {
      id: '14-4',
      text: 'Una imagen de 128×128 píxeles tiene 16 384 píxeles.',
      category: 'comparación',
    },
    {
      id: '14-5',
      text: 'Si lanzas una moneda 14 veces, hay 16 384 secuencias posibles.',
      category: 'probabilidad',
    },
    {
      id: '14-6',
      text: '2¹⁴ = 16 384 = 128²: también es un cuadrado perfecto.',
      category: 'matemáticas',
    },
    {
      id: '14-7',
      text: '16 384 Hz está por encima de lo que muchos adultos oyen: el oído joven llega a 20 kHz, el oído maduro se corta antes.',
      category: 'ciencia',
    },
    {
      id: '14-8',
      text: 'Un tablero de 128×128 es un ajedrez de 16 384 casillas: 256 veces más grande que el de 8×8.',
      category: 'comparación',
    },
    {
      id: '14-9',
      text: 'Un folio impreso tiene unos 3 000 caracteres; 16 384 caracteres son unas cinco páginas de libro.',
      category: 'datos',
    },
    {
      id: '14-10',
      text: '16 384 metros son 16,4 km: una media maratón es 21,1 km, así que este número en metros se queda a 5 km de la meta.',
      category: 'comparación',
    },
  ],
  15: [
    {
      id: '15-1',
      text: '32 768 = 2¹⁵. Es el rango positivo de un entero con signo de 16 bits (de −32 768 a 32 767).',
      category: 'tecnología',
    },
    {
      id: '15-2',
      text: '32 KiB = 32 768 bytes exactamente.',
      category: 'datos',
    },
    {
      id: '15-3',
      text: 'Contar hasta 32 768 a un número por segundo tarda unas 9 horas.',
      category: 'tiempo',
    },
    {
      id: '15-4',
      text: 'Si lanzas una moneda 15 veces, hay 32 768 resultados posibles.',
      category: 'probabilidad',
    },
    {
      id: '15-5',
      text: 'Los relojes de cuarzo vibran a 32 768 Hz: el cristal se divide por 2 quince veces y queda 1 tic por segundo.',
      category: 'tecnología',
    },
    {
      id: '15-6',
      text: '−32 768 es el entero más pequeño de 16 bits con signo: un número negativo que es exactamente −2¹⁵.',
      category: 'matemáticas',
    },
    {
      id: '15-7',
      text: '32 768 granos de arroz llenan un cuenco: unos 800 gramos, el arroz de una comida familiar.',
      category: 'comparación',
    },
    {
      id: '15-8',
      text: 'En audio de 16 bits el 0 está en el centro: 32 768 peldaños hacia el silencio y 32 767 hacia el volumen máximo.',
      category: 'usos',
    },
    {
      id: '15-9',
      text: '32 768 metros son 32,8 km. Una maratón son 42,2 km: este número en metros se queda a unos 10 km de la meta.',
      category: 'comparación',
    },
    {
      id: '15-10',
      text: '32 768 bits son 4 KiB: una página de memoria escondida dentro de este número.',
      category: 'tecnología',
    },
  ],
  16: [
    {
      id: '16-1',
      text: '65 536 = 2¹⁶. Un entero sin signo de 16 bits puede representar 65 536 valores (0–65 535).',
      category: 'tecnología',
    },
    {
      id: '16-2',
      text: '64 KiB = 65 536 bytes: el espacio de direcciones clásico de muchos sistemas de 8/16 bits.',
      category: 'historia',
    },
    {
      id: '16-3',
      text: 'Unicode plane 0 (BMP) tiene 65 536 posiciones de código.',
      category: 'tecnología',
    },
    {
      id: '16-4',
      text: 'Contar hasta 65 536 a un número por segundo tarda unas 18 horas.',
      category: 'tiempo',
    },
    {
      id: '16-5',
      text: 'Una imagen de 256×256 píxeles tiene 65 536 píxeles.',
      category: 'comparación',
    },
    {
      id: '16-6',
      text: 'Si lanzas una moneda 16 veces, hay 65 536 secuencias posibles.',
      category: 'probabilidad',
    },
    {
      id: '16-7',
      text: '2¹⁶ = 65 536 = 256²: cuadrado perfecto y potencia de dos.',
      category: 'matemáticas',
    },
    {
      id: '16-8',
      text: 'Hay 65 536 puertos TCP y UDP (del 0 al 65 535): por eso el 80 y el 443 hay que compartirlos entre todo Internet.',
      category: 'tecnología',
    },
    {
      id: '16-9',
      text: 'El 8086 de Intel, el abuelo de los PC, era de 16 bits y veía la memoria en trozos de 64 KiB: este número era su horizonte.',
      category: 'historia',
    },
    {
      id: '16-10',
      text: 'Es famoso en informática como «64K»: el límite mítico de muchos programas antiguos.',
      category: 'historia',
    },
  ],
  17: [
    {
      id: '17-1',
      text: 'El Macintosh 128K de 1984 tenía 131 072 bytes de memoria RAM, y el ZX Spectrum 128 llevaba esa misma cifra en el nombre.',
      category: 'historia',
    },
    {
      id: '17-2',
      text: 'Un segundo de audio con calidad de CD ocupa 176 400 bytes, así que en 131 072 bytes no cabe ni un segundo completo de música.',
      category: 'datos',
    },
    {
      id: '17-3',
      text: 'En 131 072 bytes caben 65 536 caracteres codificados en UTF-16, a dos bytes por carácter.',
      category: 'tecnología',
    },
    {
      id: '17-4',
      text: '17 es un número primo, así que 131 072 no puede escribirse como un cuadrado ni como un cubo exacto.',
      category: 'matemáticas',
    },
  ],
  18: [
    {
      id: '18-1',
      text: 'Un cartucho de 2 megabits, tamaño habitual en los primeros juegos de 16 bits, guardaba 262 144 bytes.',
      category: 'historia',
    },
    {
      id: '18-2',
      text: 'Muchas pantallas LCD económicas usan 6 bits por canal de color: 18 bits en total, que dan 262 144 tonos distintos.',
      category: 'tecnología',
    },
    {
      id: '18-3',
      text: 'Un cubo de 64 celdas de lado contiene 262 144 celdas: 64 × 64 × 64.',
      category: 'comparación',
    },
    {
      id: '18-4',
      text: 'En 262 144 bytes cabe el texto plano de unas 130 páginas de libro.',
      category: 'usos',
    },
  ],
  19: [
    {
      id: '19-1',
      text: 'El Commodore Amiga 500, lanzado en 1987, traía 524 288 bytes de memoria: 512 KiB.',
      category: 'historia',
    },
    {
      id: '19-2',
      text: 'Una novela larga tiene unas 500 000 letras, así que su texto plano cabe justo en 524 288 bytes.',
      category: 'comparación',
    },
    {
      id: '19-3',
      text: 'Un disquete de 3½ pulgadas guardaba 1 474 560 bytes: casi el triple de este número.',
      category: 'tecnología',
    },
    {
      id: '19-4',
      text: '524 288 segundos son 6,1 días: una semana laboral contando sin dormir.',
      category: 'tiempo',
    },
  ],
  20: [
    {
      id: '20-1',
      text: '1 048 576 = 2²⁰. Un mebibyte (MiB) son exactamente 1 048 576 bytes.',
      category: 'tecnología',
    },
    {
      id: '20-2',
      text: 'A menudo se confunde «1 MB» (1 000 000 bytes) con 1 MiB (1 048 576 bytes).',
      category: 'datos',
    },
    {
      id: '20-3',
      text: 'Contar hasta 1 048 576 a un número por segundo tarda unos 12 días.',
      category: 'tiempo',
    },
    {
      id: '20-4',
      text: 'Una imagen de 1024×1024 píxeles tiene 1 048 576 píxeles.',
      category: 'comparación',
    },
    {
      id: '20-5',
      text: 'Si lanzas una moneda 20 veces, hay 1 048 576 resultados posibles.',
      category: 'probabilidad',
    },
    {
      id: '20-6',
      text: 'Un millón de granos de arroz pesan unos 25 kg; 1 048 576 granos son un saco de unos 26 kg: un costal de mercado.',
      category: 'comparación',
    },
    {
      id: '20-7',
      text: '1 048 576 segundos son 12,1 días. Un millón de segundos son 11,6 días: el «millón binario» apenas dura medio día más.',
      category: 'tiempo',
    },
    {
      id: '20-8',
      text: 'Un disquete de 1,44 MB guarda un 40 % más que 1 MiB: por eso «1,44» parecía un número tan raro.',
      category: 'historia',
    },
    {
      id: '20-9',
      text: 'En Excel clásico había 65 536 filas (2¹⁶), no un millón: el millón de filas llegó en 2007.',
      category: 'historia',
    },
    {
      id: '20-10',
      text: 'Un megapíxel son aproximadamente un millón de píxeles; 2²⁰ está muy cerca de esa idea.',
      category: 'ciencia',
    },
  ],
  21: [
    {
      id: '21-1',
      text: 'Un cartucho de 16 megabits, como los de muchos juegos de Super Nintendo, guardaba 2 097 152 bytes.',
      category: 'historia',
    },
    {
      id: '21-2',
      text: 'Un minuto de música con calidad de CD ocupa unos 10 millones de bytes: cinco veces este número.',
      category: 'comparación',
    },
    {
      id: '21-3',
      text: 'Un mosquito bate las alas unas 600 veces por segundo: llegaría a 2 097 152 aleteos en menos de una hora.',
      category: 'naturaleza',
    },
    {
      id: '21-4',
      text: 'Unicode reserva 1 114 112 posiciones para caracteres: algo más de la mitad de este número.',
      category: 'datos',
    },
  ],
  22: [
    {
      id: '22-1',
      text: 'El genoma de la bacteria Escherichia coli tiene unos 4 600 000 pares de bases: algo más que este número.',
      category: 'ciencia',
    },
    {
      id: '22-2',
      text: 'Cuatro mebibytes, 4 194 304 bytes, era la memoria RAM habitual de una PC de gama media en 1993.',
      category: 'historia',
    },
    {
      id: '22-3',
      text: 'Un libro de 500 páginas en texto plano ocupa cerca de un millón de bytes: en 4 194 304 bytes caben unos cuatro libros así.',
      category: 'comparación',
    },
    {
      id: '22-4',
      text: 'Los discos se organizan en bloques de 4 KiB: 4 194 304 bytes son exactamente 1 024 bloques.',
      category: 'tecnología',
    },
  ],
  23: [
    {
      id: '23-1',
      text: 'Los decimales de 32 bits guardan la mantisa en 23 bits, lo que permite 8 388 608 valores distintos.',
      category: 'tecnología',
    },
    {
      id: '23-2',
      text: 'Un cartucho de 64 megabits, tamaño frecuente en la Nintendo 64, guardaba 8 388 608 bytes.',
      category: 'historia',
    },
    {
      id: '23-3',
      text: 'El corazón de un colibrí puede latir 1 200 veces por minuto: alcanzaría 8 388 608 latidos en menos de una semana.',
      category: 'naturaleza',
    },
    {
      id: '23-4',
      text: 'En 8 388 608 bytes caben más de dos horas de voz comprimida a 8 kilobits por segundo.',
      category: 'datos',
    },
  ],
  24: [
    {
      id: '24-1',
      text: 'El color verdadero de 24 bits ofrece 16 777 216 tonos: 256 niveles de rojo, verde y azul combinados.',
      category: 'tecnología',
    },
    {
      id: '24-2',
      text: '16 777 216 es a la vez cuadrado y cubo perfecto, (2¹²)² y (2⁸)³, porque 24 es múltiplo de 2 y de 3.',
      category: 'matemáticas',
    },
    {
      id: '24-3',
      text: 'Un cubo de 256 celdas de lado contiene 16 777 216 celdas.',
      category: 'comparación',
    },
    {
      id: '24-4',
      text: 'El ojo humano distingue unos 10 millones de colores: menos que los 16,7 millones del RGB, por eso dos tonos vecinos a veces se ven iguales.',
      category: 'ciencia',
    },
  ],
  25: [
    {
      id: '25-1',
      text: 'En la leyenda del tablero de ajedrez, la casilla 26 recibe 33 554 432 granos de trigo: el resultado de doblar 25 veces.',
      category: 'historia',
    },
    {
      id: '25-2',
      text: 'El cerebro humano tiene unos 86 000 millones de neuronas: más de dos mil quinientas veces este número.',
      category: 'ciencia',
    },
    {
      id: '25-3',
      text: 'Una torre con 33 554 432 hojas de papel superaría los tres kilómetros de altura.',
      category: 'comparación',
    },
    {
      id: '25-4',
      text: 'Las primeras tarjetas de memoria para cámaras digitales rondaban los 32 MiB: 33 554 432 bytes.',
      category: 'datos',
    },
  ],
  26: [
    {
      id: '26-1',
      text: 'Doblar una hoja de papel 26 veces daría 67 108 864 capas, aunque los récords reales no pasan de trece dobleces.',
      category: 'comparación',
    },
    {
      id: '26-2',
      text: 'El primer iPod, de 2001, guardaba 5 gigabytes: unas setenta y cinco veces este número de bytes.',
      category: 'historia',
    },
    {
      id: '26-3',
      text: 'La retina humana tiene unos 120 millones de bastones: cerca del doble de este número.',
      category: 'ciencia',
    },
    {
      id: '26-4',
      text: 'En 67 108 864 bytes caben unas diecisiete canciones en MP3 a 128 kilobits por segundo.',
      category: 'datos',
    },
  ],
  27: [
    {
      id: '27-1',
      text: 'Las primeras memorias USB masivas, a comienzos de los 2000, guardaban 128 MiB: 134 217 728 bytes.',
      category: 'historia',
    },
    {
      id: '27-2',
      text: 'Una hormiga pesa unos tres miligramos, así que 134 217 728 hormigas pesarían cerca de 400 kilos.',
      category: 'naturaleza',
    },
    {
      id: '27-3',
      text: 'Si cada unidad fuera una persona, 134 217 728 superaría por poco a toda la población de México.',
      category: 'comparación',
    },
    {
      id: '27-4',
      text: 'Un libro digital sin ilustraciones ocupa menos de un mebibyte: en 134 217 728 bytes cabrían más de cien.',
      category: 'usos',
    },
  ],
  28: [
    {
      id: '28-1',
      text: 'La suma de todas las potencias de dos anteriores (1 + 2 + 4 + … + 2²⁷) es 268 435 455: exactamente uno menos que este número.',
      category: 'matemáticas',
    },
    {
      id: '28-2',
      text: 'Existen 4 294 967 296 direcciones IPv4 posibles: dieciséis veces este número.',
      category: 'tecnología',
    },
    {
      id: '28-3',
      text: 'Doscientos cincuenta y seis mebibytes, 268 435 456 bytes, era la memoria RAM típica de una PC de 2001.',
      category: 'historia',
    },
    {
      id: '28-4',
      text: 'El genoma humano tiene unos 3 200 millones de pares de bases: casi doce veces este número.',
      category: 'ciencia',
    },
  ],
  29: [
    {
      id: '29-1',
      text: 'La PlayStation 3 tenía 536 870 912 bytes de memoria en total: 512 MiB repartidos en dos bloques de 256.',
      category: 'historia',
    },
    {
      id: '29-2',
      text: 'Un CD de datos guarda unos 700 MiB, algo más que estos 512 MiB.',
      category: 'comparación',
    },
    {
      id: '29-3',
      text: 'A los ochenta años, un corazón humano ha latido unos 3 000 millones de veces: casi seis veces este número.',
      category: 'ciencia',
    },
    {
      id: '29-4',
      text: 'Medio gibibyte exacto: 536 870 912 bytes son la mitad de 1 073 741 824.',
      category: 'datos',
    },
  ],
  30: [
    {
      id: '30-1',
      text: '1 073 741 824 = 2³⁰. Un gibibyte (GiB) son exactamente 2³⁰ bytes.',
      category: 'tecnología',
    },
    {
      id: '30-2',
      text: 'La población humana mundial ronda los 8000 millones; 2³⁰ es aproximadamente 1070 millones.',
      category: 'comparación',
    },
    {
      id: '30-3',
      text: 'Contar hasta 2³⁰ a un número por segundo tardaría unos 34 años.',
      category: 'tiempo',
    },
    {
      id: '30-4',
      text: '1 GiB de texto plano son unos 200 millones de palabras: cientos de novelas, toda una biblioteca de bolsillo.',
      category: 'usos',
    },
    {
      id: '30-5',
      text: 'A finales de los 90, un disco duro de 1 GB era un anuncio a toda página: este número era «espacio infinito».',
      category: 'historia',
    },
    {
      id: '30-6',
      text: 'Si lanzas una moneda 30 veces, hay más de mil millones de secuencias posibles.',
      category: 'probabilidad',
    },
    {
      id: '30-7',
      text: 'Un segundo de vídeo 4K sin comprimir puede pesar cerca de 1 GB: este número, en bruto, es un parpadeo de película.',
      category: 'tecnología',
    },
    {
      id: '30-8',
      text: 'Un vídeo en alta definición puede pesar cientos de mebibytes; 1 GiB es un tamaño familiar de archivo grande.',
      category: 'usos',
    },
    {
      id: '30-9',
      text: '2³⁰ está cerca de mil millones, un «millardo» en algunas variedades del español.',
      category: 'comparación',
    },
    {
      id: '30-10',
      text: 'El límite de 2 GB de RAM que sufrían Windows 95 y 98 está en 2³¹, exactamente el doble de este número.',
      category: 'historia',
    },
  ],
};

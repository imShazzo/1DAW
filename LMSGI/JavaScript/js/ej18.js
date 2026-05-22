const alumnos = [
  { nombre:"Ana",   apellido:"García",   nota:8.5, activo:true  },
  { nombre:"Luis",  apellido:"Martínez", nota:4.2, activo:true  },
  { nombre:"Sara",  apellido:"López",    nota:9.1, activo:true  },
  { nombre:"Pedro", apellido:"Sánchez",  nota:6.0, activo:false },
  { nombre:"Marta", apellido:"Díaz",     nota:7.8, activo:true  },
  { nombre:"Carlos",apellido:"Ruiz",     nota:5.5, activo:true  },
];

// --- a) Filtrar activos y ordenar por apellido ---
// Encadenamos el filter y el sort en un solo movimiento
const activosOrdenados = alumnos
    .filter((alumno) => alumno.activo === true) 
    .sort((a, b) => a.apellido.localeCompare(b.apellido));

console.log("--- Alumnos Activos y Ordenados ---");
console.table(activosOrdenados);


// --- b) Generar informe de texto ---
// Usamos map con comillas invertidas para mezclar variables y texto
const informe = alumnos.map((alumno) => `${alumno.nombre} ${alumno.apellido}: ${alumno.nota}`);

console.log("--- Informe de Calificaciones ---");
console.log(informe);
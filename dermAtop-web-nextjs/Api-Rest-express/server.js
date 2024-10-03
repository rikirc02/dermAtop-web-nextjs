const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const pl = require("tau-prolog");
const loader = require("tau-prolog/modules/lists.js");
loader(pl);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const session = pl.create();


const prologProgram = `
 :- use_module(library(lists)).
pliegue('Antecubital').
pliegue('Huecos poplieos').
pliegue('Cara lateral de tobillos').
pliegue('Cuello').
pliegue('Zona periorbitaria').



partedermatitis('Mejillas').
partedermatitis('Frente').
partedermatitis('Cara externa de miembros').

criterioobligatorio('Prurito en los ultimos 12 meses').
criterioobligatorio('Referencia paterna de rascado en los ultimos 12 meses').

hallazgopliegue(Pliegue,'Afectacion de los pliegues cutaneos'):-pliegue(Pliegue).

hallazgopersonal('Asma',_).
hallazgopersonal('Rinitis Alergica',_).
hallazgopersonal('Enfermedad atopica en familiar de primer grado',Edad):- Edad<4.

hallazgoXerosis('Xerosis cutanea generalizada en el ultimo anho').

hallazgodermatitis(Parte,Edad,'Dermatitis flexural visible'):-partedermatitis(Parte),Edad<4.

hallazgo(Edad,X):-hallazgodermatitis(X,Edad,'Dermatitis flexural visible'),!.
hallazgo(_,X):-hallazgopliegue(X,'Afectacion de los pliegues cutaneos'),!.
hallazgo(Edad,X):-hallazgopersonal(X,Edad),!.
hallazgo(_,X):-hallazgoXerosis(X).

obligatoriomiembro([],[]).
obligatoriomiembro([Y|X1],Respuesta1):-criterioobligatorio(Y),!,obligatoriomiembro(X1,Respuesta1).
obligatoriomiembro([X|Resto],[X|Respuesta]):-obligatoriomiembro(Resto,Respuesta).

edad(Edad):-Edad>=0,Edad<19.

criterios([],_,[]).
criterios([X|Resto], Edad, Respuesta):-(edad(Edad),hallazgo(Edad, X)->  
        criterios(Resto, Edad, RespuestaResto),
        Respuesta = [X | RespuestaResto];   
        criterios(Resto, Edad, Respuesta)).
    
tiene3elementos([_,_,_|_]).
tieneDA(Lista,Edad):-obligatoriomiembro(Lista,Respuesta),length(Lista,Cantidad1),length(Respuesta,Cantidad2),Cantidad1>Cantidad2,
criterios(Respuesta,Edad,Resultado),tiene3elementos(Resultado),!.

miembro(X,[X|_]).
miembro(X,[_|Cuerpo]):-miembro(X,Cuerpo).

diagnostico(Lista,Edad,Resultado):-(setof(X,miembro(X,Lista),Respuesta),tieneDA(Respuesta,Edad)->
Resultado = 'Alta posibilidad de padecer dermatitis atopica'; 
Resultado = 'Poca posibilidad de padecer dermatitis atopica, consulte al especialista para mayor seguridad'
).

scorad(A, B, C, Score,Grado) :-Score is A / 5 + 7 * B / 2 + C,grado(Score,Grado).

grado(Valor,Grado) :-Valor =< 25,Grado = 'Leve',!.
grado(Valor,Grado) :-Valor > 25, Valor =< 50,Grado = 'Moderado',!.
grado(Valor,Grado) :-Valor > 50,Grado = 'Grave'.

categoria_edad(Edad, lactante) :-Edad < 3,!.
categoria_edad(Edad, adulto) :-Edad > 12,Edad<19,!.
categoria_edad(Edad, joven) :-Edad >= 3,Edad =< 12.

tratamiento('*Alimentacion con lactancia materna',lactante).
tratamiento('*Evitar consumo de leche de vaca',lactante).
tratamiento('*Consultar pediatra para indicaciones alimenticias precisas',lactante).
tratamiento('*Busqueda de grupos de apoyo para padres',lactante).
tratamiento('*Entender la no culpabilidad de los padres ante la enfermedad',lactante).
tratamiento('*Cambiar panales con frecuencia',lactante).
tratamiento('*Utilizar jabones con base de glicerina o jabones naturales',lactante).
tratamiento('*Banos cortos con agua tibia',lactante).
tratamiento('*Posterior al bano aplicar cremas emolientes, sin alergenos ni perfumes',lactante).
tratamiento('*Vestir con ropa de algodon',lactante).

tratamiento('*Evitar alimentos acidos, ricos en histamina, muy condimentados o salados, grasos, embutidos, lacteos, bolleria industrial',joven).
tratamiento('*Ayudarlos a manejar los sentimientos y a entender su condicion',joven).
tratamiento('*Buscar terapia cognitivo-conductuales',joven).
tratamiento('*Agrega bicarbonato de sodio al bano',joven).
tratamiento('*Prueba infusiones de avena en la piel',joven).
tratamiento('*Uso de jabones suaves, sin tintes ni perfumes',joven).
tratamiento('*Cremas y aceites naturales como aloe vera',joven).
tratamiento('*Consultar con especialista potencia adecuada del uso de corticosteroides topicos y antihistaminicos',joven).

tratamiento('*Evitar el consumo de citricos, productos lacteos, huevos, gluten, trigo, soja, especias vainilla y canela',adulto).
tratamiento('*No ingerir comidas fuertes y/o picantes, ni conservantes, colorantes, grasas saturadas y transaturadas',adulto).
tratamiento('*Reducir al minimo fritos, rebozados, alcohol,tabaco,harinas, cafe, te, cacao y bebidas energeticas',adulto).
tratamiento('*Ingerir bastante agua, verduras, fibra, vitaminas como A,B,C,E,etc..., omega3, minerales, probioticos',adulto).
tratamiento('*Consumir antioxidantes, zumos naturales, infusiones',adulto).
tratamiento('*Practica de tecnicas sobre relajacion y control del estres',adulto).
tratamiento('*Uso del aloe vera, arcilla blanca, pepino, manzanilla o aceite de calendula',adulto).
tratamiento('*Altamente recomendable el agua de mar',adulto).
tratamiento('*Aliviar el picor con bano de avena',adulto).
tratamiento('*Hidratar y suavizar la piel con aceite de almendras dulces',adulto).
tratamiento('*Evita productos con fragancias fuertes o ingredientes irritantes',adulto).
tratamiento('*Uso de tratamientos topicos como tacrolimus o pimecrolimus',adulto).

tratamiento('***Consultar con un especialista en dermatologia pediatrica***',_).

recomendar_tratamiento(Edad, Ordenada) :-
    categoria_edad(Edad, Categoria),
    setof(Tratamiento, tratamiento(Tratamiento, Categoria), Ordenada).

`;

session.consult(prologProgram, {
    success: function() {
        console.log("Programa Prolog cargado correctamente.");
    },
    error: function(err) {
        console.error("Error al cargar el programa Prolog:", err);
    }
});

app.post("/diagnostico", (req, res) => {
    const { lista, edad } = req.body;
                               
    const query = `diagnostico(['${lista.join("','")}'], ${edad}, Resultado).`;


  
    session.query(query, {
        success: function(goal) {
            session.answer({
                success: function(answer) {
                    let result = session.format_answer(answer);
                    // Eliminar el prefijo "Resultado =" si está presente
                    if (result.startsWith("Resultado =")) {
                        result = result.replace("Resultado =", "").trim();
                    }
                    // Enviar el resultado como respuesta JSON
                    res.json({ resultado: result });
                },
                fail: function() {
                    // Enviar respuesta si no se encontró diagnóstico
                    res.json({ resultado: "No se encontró diagnóstico." });
                },
                error: function(err) {
                    // Capturar y mostrar el error completo en consola
                    console.error("Error en la respuesta Prolog:", err);

                    // Verificar si el error es un término Prolog y extraer detalles
                    if (err.args && err.args.length > 0) {
                        const errorType = err.args[0].args[0]; // Tipo de error (ej. 'instantiation_error')
                        const errorDetails = err.args[0].args[1]; // Detalles del error (ej. predicado en cuestión)
                        res.status(500).json({
                            error: "Error en la respuesta Prolog.",
                            type: errorType,
                            details: errorDetails,
                            prologError: err // Devolver el error Prolog completo para referencia
                        });
                    } else {
                        res.status(500).json({
                            error: "Error en la respuesta Prolog.",
                            details: err
                        });
                    }
                }
            });
        },
        error: function(err) {
            // Capturar y mostrar el error de la consulta en consola
            console.error("Error al procesar la consulta:", err);
            res.status(400).json({ error: "Error al procesar la consulta.", details: err });
        }
    });
});

// Ruta para el tratamiento
// Ruta para el tratamiento
app.post("/tratamiento", (req, res) => {
    const { edad } = req.body;

    const query = `recomendar_tratamiento(${edad}, Tratamientos).`;

    session.query(query, {
        success: function(goal) {
            session.answer({
                success: function(answer) {
                    const result = session.format_answer(answer); // Obtiene la respuesta

                    // Reemplazar las comas internas de los tratamientos con un delimitador único (por ejemplo, ';;;')
                    let cleanedResult = result.replace(/Tratamientos = \[(.*)\]/, '$1').trim();
                    
                    // Definir un delimitador temporal para comas internas (usamos ';;;' para evitar conflictos con comas de separación)
                    cleanedResult = cleanedResult.replace(/, (?!\s*Tratamiento|\s*$)/g, ';;;');

                    // Dividir el resultado usando las comas que separan tratamientos y no las internas
                    let tratamientosArray = cleanedResult.split(',')
                        .map(tratamiento => tratamiento.trim()) // Eliminar espacios extra
                        .map(tratamiento => tratamiento.replace(/\*/g, "")) // Eliminar asteriscos
                        .map(tratamiento => tratamiento.replace(/;;;/g, ',')); // Restaurar comas internas

                    res.json({ tratamientos: tratamientosArray });
                },
                fail: function() {
                    res.json({ tratamientos: "No se encontraron tratamientos." });
                },
                error: function(err) {
                    res.status(500).json({ error: "Error en la respuesta Prolog." });
                }
            });
        },
        error: function(err) {
            res.status(400).json({ error: "Error al procesar la consulta." });
        }
    });
});




// Ruta para la severidad
app.post("/severidad", (req, res) => {
    const { A, B, C } = req.body;

    const query = `scorad(${A}, ${B}, ${C}, Score, Grado).`;

    session.query(query, {
        success: function(goal) {
            session.answer({
                success: function(answer) {
                    const result = session.format_answer(answer); 

             
                    const match = result.match(/Score = ([\d.]+), Grado = (\w+)/);
                    if (match) {
                        const score = parseFloat(match[1]); // Convertir el score a número
                        const grado = match[2]; // Grado como string

                        res.json({
                            score: score,
                            grado: grado
                        });
                    } else {
                        res.json({ error: "No se pudo calcular la severidad." });
                    }
                },
                fail: function() {
                    res.json({ error: "No se pudo calcular la severidad." });
                },
                error: function(err) {
                    res.status(500).json({ error: "Error en la respuesta Prolog." });
                }
            });
        },
        error: function(err) {
            res.status(400).json({ error: "Error al procesar la consulta." });
        }
    });
});




const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


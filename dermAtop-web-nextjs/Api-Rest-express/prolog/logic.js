    const prologProgram = `
      pliegue('Antecubital').
    pliegue('Huecos popliteos').
    pliegue('Cara lateral de tobillos').
    pliegue('Cuello').
    pliegue('Zona periorbitaria').

    partedermatitis('Mejillas').
    partedermatitis('Frente').
    partedermatitis('Cara externa de miembros').

    criterioobligatorio('Prurito en los últimos 12 meses').
    criterioobligatorio('Referencia paterna de rascado en los últimos 12 meses').

    hallazgopliegue(Pliegue, 'Afectación de los pliegues cutáneos') :- pliegue(Pliegue).

    hallazgopersonal('Asma', _).
    hallazgopersonal('Rinitis Alérgica', _).
    hallazgopersonal('Enfermedad atópica en familiar de primer grado', Edad) :- Edad < 4.

    hallazgoXerosis('Xerosis cutánea generalizada en el último año').

    hallazgodermatitis(Parte, Edad, 'Dermatitis flexural visible') :- partedermatitis(Parte), Edad < 4.

    hallazgo(Edad, X) :- hallazgodermatitis(X, Edad, 'Dermatitis flexural visible'), !.
    hallazgo(Edad, X) :- hallazgopliegue(X, 'Afectación de los pliegues cutáneos'), !.
    hallazgo(Edad, X) :- hallazgopersonal(X, Edad), !.
    hallazgo(Edad, X) :- hallazgoXerosis(X).

    obligatoriomiembro([], []).
    obligatoriomiembro([Y | X1], Respuesta1) :- criterioobligatorio(Y), !, obligatoriomiembro(X1, Respuesta1).
    obligatoriomiembro([X | Resto], [X | Respuesta]) :- obligatoriomiembro(Resto, Respuesta).

    edad(Edad) :- Edad >= 0, Edad < 19.

    criterios([], _, []).
    criterios([X | Resto], Edad, Respuesta) :- 
        (edad(Edad), hallazgo(Edad, X) ->  
            criterios(Resto, Edad, RespuestaResto),
            Respuesta = [X | RespuestaResto];   
            criterios(Resto, Edad, Respuesta)).
    
    % Definición de my_length
    my_length([], 0).  % La longitud de una lista vacía es 0
    my_length([_ | Tail], Length) :- my_length(Tail, TailLength), Length is TailLength + 1.

    tiene3elementos(Lista) :- my_length(Lista, 3).

    tieneDA(Lista, Edad) :- 
        obligatoriomiembro(Lista, Respuesta),
        my_length(Lista, Cantidad1),
        my_length(Respuesta, Cantidad2),
        Cantidad1 > Cantidad2,
        criterios(Respuesta, Edad, Resultado),
        tiene3elementos(Resultado), !.

    miembro(X, [X | _]).
    miembro(X, [Cabeza | Cuerpo]) :- miembro(X, Cuerpo).

    diagnostico(Lista, Edad, Resultado) :- 
        (setof(X, miembro(X, Lista), Respuesta),
        tieneDA(Respuesta, Edad) -> 
            Resultado = 'Alta posibilidad de padecer dermatitis atópica'; 
            Resultado = 'Poca posibilidad de padecer dermatitis atópica, consulte al especialista para mayor seguridad').
    
    scorad(A, B, C, Score, Grado) :- Score is A / 5 + 7 * B / 2 + C, grado(Score, Grado).

    grado(Valor, Grado) :- Valor =< 25, Grado = 'Leve', !.
    grado(Valor, Grado) :- Valor > 25, Valor =< 50, Grado = 'Moderado', !.
    grado(Valor, Grado) :- Valor > 50, Grado = 'Grave'.

    categoria_edad(Edad, lactante) :- Edad < 3, !.
    categoria_edad(Edad, adulto) :- Edad > 12, Edad < 19, !.
    categoria_edad(Edad, joven) :- Edad >= 3, Edad =< 12.

    tratamiento('Alimentacion con lactancia materna', lactante).
    tratamiento('Evitar consumo de leche de vaca', lactante).
    tratamiento('Consultar pediatra para indicaciones alimenticias precisas', lactante).
    tratamiento('Busqueda de grupos de apoyo para padres', lactante).
    tratamiento('Entender la no culpabilidad de los padres ante la enfermedad', lactante).
    tratamiento('Cambiar panales con frecuencia', lactante).
    tratamiento('Utilizar jabones con base de glicerina o jabones naturales', lactante).
    tratamiento('Banos cortos con agua tibia', lactante).
    tratamiento('Posterior al bano aplicar cremas emolientes, sin alergenos ni perfumes', lactante).
    tratamiento('Vestir con ropa de algodon', lactante).

    tratamiento('Evitar alimentos acidos, ricos en histamina, muy condimentados o salados, grasos, embutidos, lacteos, bolleria industrial', joven).
    tratamiento('Ayudarlos a manejar los sentimientos y a entender su condicion', joven).
    tratamiento('Buscar terapia cognitivo-conductuales', joven).
    tratamiento('Agrega bicarbonato de sodio al bano', joven).
    tratamiento('Prueba infusiones de avena en la piel', joven).
    tratamiento('Uso de jabones suaves, sin tintes ni perfumes', joven).
    tratamiento('Cremas y aceites naturales como aloe vera', joven).
    tratamiento('Consultar con especialista potencia adecuada del uso de corticosteroides tópicos y antihistaminicos', joven).

    tratamiento('Evitar el consumo de citricos, productos lacteos, huevos, gluten, trigo, soja, especias vainilla y canela', adulto).
    tratamiento('No ingerir comidas fuertes y/o picantes, ni conservantes, colorantes, grasas saturadas y transaturadas', adulto).
    tratamiento('Reducir al minimo fritos, rebozados, alcohol,tabaco,harinas, cafe, te, cacao y bebidas energeticas', adulto).
    tratamiento('Ingerir bastante agua, verduras, fibra, vitaminas como A,B,C,E,etc..., omega3, minerales, probioticos', adulto).
    tratamiento('Consumir antioxidantes, zumos naturales, infusiones', adulto).
    tratamiento('Practica de tecnicas sobre relajacion y control del estres', adulto).
    tratamiento('Uso del aloe vera, arcilla blanca, pepino, manzanilla o aceite de calendula', adulto).
    tratamiento('Altamente recomendable el agua de mar', adulto).
    tratamiento('Aliviar el picor con bano de avena', adulto).
    tratamiento('Hidratar y suavizar la piel con aceite de almendras dulces', adulto).
    tratamiento('Evita productos con fragancias fuertes o ingredientes irritantes', adulto).
    tratamiento('Uso de tratamientos tópicos como tacrolimus o pimecrolimus', adulto).

    tratamiento('***Consultar con un especialista en dermatologia pediatrica***', _).

    recomendar_tratamiento(Edad, Ordenada) :- 
        categoria_edad(Edad, Categoria),
        setof(Tratamiento, tratamiento(Tratamiento, Categoria), Ordenada).
`;
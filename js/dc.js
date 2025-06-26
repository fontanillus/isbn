 //Esta es la función lógica principal que:
        //Recibe como parámetro una cadena isbn (los 9 o 12 dígitos).
        //Calcula el dígito de control aplicando el algoritmo correspondiente (ISBN-10 o ISBN-13).
        //Devuelve el resultado (un número o "X").
        function calcularDigitoControl(isbn) {
            if (!/^\d{9}$/.test(isbn) && !/^\d{12}$/.test(isbn)) {//si el usuario introduce letras o caracteres no válidos, parseInt devuelve NaN, esta vadilacion lo evita.
                return "Error: El ISBN debe tener 9 (ISBN-10) o 12 (ISBN-13) dígitos numéricos.";
                //Verifica que el isbn tenga exactamente 9 o 12 dígitos numéricos (sin letras ni símbolos). Si no se cumple, devuelve un mensaje de error
            }
            if (isbn.length === 9) {
                // ISBN-10 (módulo 11)
                let suma = 0;
                for (let i = 0; i < 9; i++) {
                    suma += (i + 1) * parseInt(isbn[i]);
                }
                const resto = suma % 11;
                return resto === 10 ? 'X' : resto.toString();
                //fórmula del ISBN-10:
                //suma=1⋅d1+2⋅d2+⋯+9⋅d9\text{suma} = 1 \cdot d_1 + 2 \cdot d_2 + \dots + 9 \cdot d_9suma=1⋅d1+2⋅d2+⋯+9⋅d9 
                //Luego se hace suma % 11.
                //Si el resultado es 10, el dígito de control es 'X', de lo contrario, se devuelve el número como string

            } else if (isbn.length === 12) {
                // ISBN-13 (módulo 10)
                let suma = 0;
                for (let i = 0; i < 12; i++) {
                    const digito = parseInt(isbn[i]);
                    suma += (i % 2 === 0) ? digito : digito * 3;

                }
                const resto = suma % 10;
                const digitoControl = (10 - resto) % 10;
                return digitoControl.toString();
                //Se usa la fórmula del ISBN-13:
                //suma=d1+3d2+d3+3d4+⋯+3d12\text{suma} = d_1 + 3d_2 + d_3 + 3d_4 + \dots + 3d_{12}suma=d1+3d2+d3+3d4+⋯+3d12 
                //(se multiplican por 1 y 3 alternativamente)
                //Se calcula:
                //dígito de control=(10−(sumamod  10))mod  10\text{dígito de control} = (10 - (\text{suma} \mod 10)) \mod 10dıˊgito de control=(10−(sumamod10))mod10 
                //Esto asegura que la suma total (incluyendo el dígito 13) sea múltiplo de 10

            } else {
                return "Error: El ISBN debe tener 9 (ISBN-10) o 12 (ISBN-13) dígitos.";
                //Es una protección adicional por si el número tiene una longitud distinta a 9 o 12.
            }
        }

        //Esta es la función conectada al botón del formulario. Hace lo siguiente:
        //Toma el valor del <input> (document.getElementById("isbn").value).
        //Llama a calcularDigitoControl(...) con ese valor.
        //Muestra el resultado en la página (innerText del <p> con id resultadoDigitoControl).
        //Esta función no calcula nada por sí sola. Solo recoge datos del formulario y usa la otra función para obtener el resultado.
        function CalcularDigitoControl() {
            const input = document.getElementById("isbn").value.trim();
            const resultado = calcularDigitoControl(input);
            document.getElementById("resultadoDigitoControl").innerText = "Dígito de control: " + resultado;
            // const input = document.getElementById("isbn").value.trim();
            //Obtiene el valor que el usuario ha escrito en un campo de texto HTML cuyo id es "isbn".
            //document.getElementById("isbn") busca en el documento el elemento con ese id.
            //.value accede al texto que contiene ese campo.
            //.trim() elimina espacios en blanco al inicio y al final del texto, para asegurar que no haya espacios extras.

            //const resultado = calcularDigitoControl(input);
            //Llama a otra función llamada calcularDigitoControl y le pasa como argumento el texto que el usuario escribió.
            console.log("ISBN ingresado:", input);
            console.log("Dígito de control calculado:", resultado);
        }

        //para comprobar si funciona
        //843654201 → debe dar 0
        //030640615 → debe dar 2
        //978849249370 → debe dar 8
        //978030640615→ debe dar 7
        //007462542→ debe dar x
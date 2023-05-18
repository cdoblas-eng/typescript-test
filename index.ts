import * as credentials from './credentials/credentials.json';
import { google, sheets_v4 } from 'googleapis';


const spreadsheetId = '1t6npY-2SMi7jDKrhhi2Tatc3RNc-WmrKKn3fmMRJHhk';
const sheetName = 'grande-nata';
const range = `${sheetName}!B3:B`; // Rango que incluye todas las filas de la columna A (suponiendo que la tabla comienza en la columna B)

//const range = 'grande-nata!B2';

const client = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);


console.log("INICIO SCRIPT:");


async function getUltimaFila() {
    try {
      // Autorizar el cliente
      await client.authorize();
  
      // Crear instancia del servicio de hojas de cálculo de Google
      const sheets = google.sheets({ version: 'v4', auth: client });
  
      // Realizar consulta para obtener los valores de la columna A
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
      });
  
      // Obtener los valores de la columna A
      const values = response.data.values;

      if (values) {
        for (let i = 0; i < values.length; i++) {
          const fila = values[i];
          console.log(`Fila ${i + 1}: ${fila}`);
        }
      }
  
      // Determinar la última fila no vacía en la columna A
      const offset_inicio = 3;
      const ultimaFila = values ? values.length + offset_inicio: offset_inicio;
  
      console.log('La siguiente fila a rellenar es:', ultimaFila);
    } catch (err) {
      console.error('Error al obtener la siguiente fila:', err);
    }
  }
  
  // Llamar a la función para obtener la siguiente fila
  getUltimaFila();


// async function readIndex() {
//     let datos: any;
//     try {   
//         // Autorizar el cliente
//         await client.authorize();

//         // Crear instancia del servicio de hojas de cálculo de Google
//         const sheets = google.sheets({ version: 'v4', auth: client });

//         // ID de la hoja de cálculo y rango de celdas a leer


//         // Leer datos de la hoja de cálculo
//         const response = await sheets.spreadsheets.values.get({
//         spreadsheetId: spreadsheetId,
//         range: range,
//         });

//         // Obtener los datos leídos
//         const datos = response.data.values;

//         // Imprimir los datos en la consola
//         console.log('Datos leídos de la hoja de cálculo:', datos);
//     } catch (err) {
//         console.error('Error al leer datos de la hoja de cálculo:', err);
//     }
//     console.log('Indice leido: ' + datos.toString());
// }
// readIndex();

// // Función para leer datos de una hoja de cálculo
// async function leerDatos() {
//   try {
//     // Autorizar el cliente
//     //await client.authorize();

//     client.authorize(function (err) {
//       if (err) {
//         console.error('Error de autenticación:', err);
//         return;
//       }
//       console.log('Autenticación exitosa!');
//       // Tu código para acceder a la API de Google Sheets aquí
//     });

//     // Crear instancia del servicio de hojas de cálculo de Google
//     const sheets = google.sheets({ version: 'v4', auth: client });

//     // ID de la hoja de cálculo y rango de celdas a leer
//     const spreadsheetId = '1t6npY-2SMi7jDKrhhi2Tatc3RNc-WmrKKn3fmMRJHhk';
//     const range = 'grande-nata!B3:D10';

//     // Leer datos de la hoja de cálculo
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: spreadsheetId,
//       range: range,
//     });

//     // Obtener los datos leídos
//     const datos = response.data.values;

//     // Imprimir los datos en la consola
//     console.log('Datos leídos de la hoja de cálculo:', datos);
//   } catch (err) {
//     console.error('Error al leer datos de la hoja de cálculo:', err);
//   }
// }

// // Llamar a la función para probar el acceso a la hoja de cálculo
// //leerDatos();

// // Función para insertar una fila en la hoja de cálculo
// async function insertarFila() {
//   try {
//     // Autorizar el cliente
//     await client.authorize();

//     // Crear instancia del servicio de hojas de cálculo de Google
//     const sheets = google.sheets({ version: 'v4', auth: client });

//     // ID de la hoja de cálculo y rango de celdas donde insertar la fila
//     const spreadsheetId = '1t6npY-2SMi7jDKrhhi2Tatc3RNc-WmrKKn3fmMRJHhk';
//     const sheetName = 'grande-nata';
//     const range = `${sheetName}!B10:C10`; // Rango de la fila siguiente a insertar

//     // Datos de la nueva fila a insertar
//     //const newRowData = ["645424785", "",'Enano Alcoholico']; // Reemplaza con tus propios datos
//     const newRowData = [645424785, 3]; // Reemplaza con tus propios datos

//     // Configurar la solicitud de inserción de la fila
//     const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
//       spreadsheetId: spreadsheetId,
//       range: range,
//       valueInputOption: 'RAW',
//       insertDataOption: 'INSERT_ROWS',
//       requestBody: {
//         values: [newRowData],
//       },
//     };

//     // Insertar la nueva fila
//     const response = await sheets.spreadsheets.values.append(request);

//     // Imprimir la respuesta en la consola
//     console.log('Fila insertada con éxito:', response.data);
//   } catch (err) {
//     console.error('Error al insertar fila:', err);
//   }
// }

// // Llamar a la función para insertar una fila en la hoja de cálculo
// insertarFila();

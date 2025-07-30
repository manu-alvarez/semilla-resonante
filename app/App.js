import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState } from 'react';
import reflexiones from './reflexiones_completas.json';
import { kinFromDate } from './src/utils/kin';
import { SELLO_NOMBRES, TONO_NOMBRES, SELLO_IMAGENES } from './src/utils/selloData';

export default function App() {
  // Estado para la fecha seleccionada (por defecto hoy)
  const hoy = new Date();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
  const [inputFecha, setInputFecha] = useState('');
  const [errorFecha, setErrorFecha] = useState('');

  // Función para formatear fecha a YYYY-MM-DD
  const formatearFecha = (fecha) => {
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Función para formatear fecha para mostrar (más legible)
  const formatearFechaLegible = (fecha) => {
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  // Kin del día seleccionado
  const kin = kinFromDate(fechaSeleccionada);

  // Obtener la reflexión de la fecha seleccionada
  const fechaString = formatearFecha(fechaSeleccionada);
  const reflexionActual = typeof reflexiones[fechaString] === 'string'
  ? reflexiones[fechaString]
  : "No hay reflexión para esta fecha.";

  // Función para cambiar a día anterior
  const diaAnterior = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() - 1);
    setFechaSeleccionada(nuevaFecha);
    setInputFecha('');
    setErrorFecha('');
  };

  // Función para cambiar a día siguiente
  const diaSiguiente = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    setFechaSeleccionada(nuevaFecha);
    setInputFecha('');
    setErrorFecha('');
  };

  // Función para volver a hoy
  const volverHoy = () => {
    setFechaSeleccionada(new Date());
    setInputFecha('');
    setErrorFecha('');
  };

  // Función para cambiar la fecha manualmente
  const cambiarFechaManual = () => {
    if (inputFecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const nuevaFecha = new Date(inputFecha + 'T00:00:00');
      if (!isNaN(nuevaFecha.getTime())) {
        setFechaSeleccionada(nuevaFecha);
        setErrorFecha('');
      } else {
        setErrorFecha('Fecha inválida');
      }
    } else {
      setErrorFecha('Formato incorrecto. Usa YYYY-MM-DD');
    }
  };

  return (
  <View style={styles.container}>
    <Text style={styles.titulo}>By ManoElectricaAzul</Text>
    <Text style={styles.titulo}>Calendario Semilla Resonante</Text>
    
    {/* Kin del día */}
    <View style={styles.kinContainer}>
      <Image
        source={SELLO_IMAGENES[kin.sello]}
        style={styles.selloImagen}
        resizeMode="contain"
      />
      <Text style={styles.kinTexto}>
        Kin {kin.num}: {SELLO_NOMBRES[kin.sello]} · {TONO_NOMBRES[kin.tono]}
      </Text>
    </View>
    
    {/* Navegación de fechas */}
    <View style={styles.navegacionFechas}>
        <TouchableOpacity style={styles.botonNavegacion} onPress={diaAnterior}>
          <Text style={styles.textoBoton}>← Anterior</Text>
        </TouchableOpacity>
        
        <View style={styles.fechaActual}>
          <Text style={styles.fechaTexto}>{formatearFechaLegible(fechaSeleccionada)}</Text>
        </View>
        
        <TouchableOpacity style={styles.botonNavegacion} onPress={diaSiguiente}>
          <Text style={styles.textoBoton}>Siguiente →</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para volver a hoy */}
      <TouchableOpacity style={styles.botonHoy} onPress={volverHoy}>
        <Text style={styles.textoBotonHoy}>Volver a Hoy</Text>
      </TouchableOpacity>

      {/* Input para elegir fecha manualmente */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={inputFecha}
          onChangeText={setInputFecha}
          keyboardType="numbers-and-punctuation"
        />
        <TouchableOpacity style={styles.botonInput} onPress={cambiarFechaManual}>
          <Text style={styles.textoBotonInput}>Ir a fecha</Text>
        </TouchableOpacity>
      </View>
      {errorFecha ? <Text style={styles.error}>{errorFecha}</Text> : null}
      
      {/* Reflexión del día */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contenedorReflexion}>
          <Text style={styles.reflexion}>{reflexionActual}</Text>
        </View>
      </ScrollView>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  navegacionFechas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  botonNavegacion: {
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  fechaActual: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fechaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  botonHoy: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textoBotonHoy: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: 120,
    marginRight: 10,
    backgroundColor: 'white',
  },
  botonInput: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  textoBotonInput: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  contenedorReflexion: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  reflexion: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'justify',
  },
  kinContainer: {
  alignItems: 'center',
  marginBottom: 15,
},
selloImagen: {
  width: 100,
  height: 100,
  marginBottom: 8,
},
kinTexto: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#2c3e50',
  textAlign: 'center',
},
});

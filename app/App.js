import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import reflexiones from './reflexiones_completas.json';

export default function App() {
  // Estado para la fecha seleccionada (por defecto hoy)
  const hoy = new Date();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);

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

  // Obtener la reflexión de la fecha seleccionada
  const fechaString = formatearFecha(fechaSeleccionada);
  const reflexionActual = reflexiones[fechaString] || "No hay reflexión para esta fecha.";

  // Función para cambiar a día anterior
  const diaAnterior = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() - 1);
    setFechaSeleccionada(nuevaFecha);
  };

  // Función para cambiar a día siguiente
  const diaSiguiente = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    setFechaSeleccionada(nuevaFecha);
  };

  // Función para volver a hoy
  const volverHoy = () => {
    setFechaSeleccionada(new Date());
  };

  // Función para ir a una fecha específica (ejemplo simple)
  const irAFechaEspecifica = () => {
    Alert.prompt(
      "Ir a fecha específica",
      "Ingresa la fecha en formato YYYY-MM-DD:",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Ir",
          onPress: (fechaTexto) => {
            if (fechaTexto && fechaTexto.match(/^\d{4}-\d{2}-\d{2}$/)) {
              const nuevaFecha = new Date(fechaTexto + 'T00:00:00');
              if (!isNaN(nuevaFecha.getTime())) {
                setFechaSeleccionada(nuevaFecha);
              } else {
                Alert.alert("Error", "Fecha inválida");
              }
            } else {
              Alert.alert("Error", "Formato incorrecto. Usa YYYY-MM-DD");
            }
          }
        }
      ],
      "plain-text"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Semilla Resonante Digital</Text>
      
      {/* Navegación de fechas */}
      <View style={styles.navegacionFechas}>
        <TouchableOpacity style={styles.botonNavegacion} onPress={diaAnterior}>
          <Text style={styles.textoBoton}>← Anterior</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.fechaActual} onPress={irAFechaEspecifica}>
          <Text style={styles.fechaTexto}>{formatearFechaLegible(fechaSeleccionada)}</Text>
          <Text style={styles.fechaSubtexto}>Toca para cambiar fecha</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botonNavegacion} onPress={diaSiguiente}>
          <Text style={styles.textoBoton}>Siguiente →</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para volver a hoy */}
      <TouchableOpacity style={styles.botonHoy} onPress={volverHoy}>
        <Text style={styles.textoBotonHoy}>Volver a Hoy</Text>
      </TouchableOpacity>
      
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
  fechaSubtexto: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
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
});
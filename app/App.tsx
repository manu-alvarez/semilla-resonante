import { StatusBar } from 'expo-status-bar'; // Para la barra de estado del teléfono
import React from 'react'; // Necesario para crear componentes de React
import { Text, View, StyleSheet } from 'react-native'; // Componentes básicos para la interfaz
import { kinFromDate } from './src/utils/kin'; // Importamos nuestra función para calcular el Kin

// Este es el componente principal de nuestra aplicación
export default function App() {
  const today = new Date(); // Obtenemos la fecha de hoy
  const kin = kinFromDate(today); // Calculamos el Kin para la fecha de hoy

  return (
    // View es como un "contenedor" para organizar los elementos
    <View style={styles.container}>
      {/* Text es para mostrar texto en la pantalla */}
      <Text style={styles.title}>Hoy es Kin {kin.num}</Text>
      <Text style={styles.subtitle}>Sello {kin.sello} · Tono {kin.tono}</Text>
      <StatusBar style="auto" /> {/* Ajusta la barra de estado (hora, batería) */}
    </View>
  );
}

// Aquí definimos los estilos para nuestros componentes
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    backgroundColor: '#fff', // Fondo blanco
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'center', // Centra los elementos verticalmente
  },
  title: {
    fontSize: 28, // Tamaño de fuente grande
    fontWeight: 'bold', // Texto en negrita
    marginBottom: 8, // Espacio debajo del título
  },
  subtitle: {
    fontSize: 20, // Tamaño de fuente mediano
    color: '#555', // Color de texto gris oscuro
  },
});
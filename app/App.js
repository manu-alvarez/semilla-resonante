import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import reflexiones from './reflexiones_completas.json';

export default function App() {
  // Obtener la fecha de hoy
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  const fechaHoy = `${yyyy}-${mm}-${dd}`;

  // Obtener la reflexión del día
  const reflexionHoy = reflexiones[fechaHoy] || "No hay reflexión para hoy.";

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Semilla Resonante Digital</Text>
      <Text style={styles.fecha}>Hoy: {fechaHoy}</Text>
      
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.reflexion}>{reflexionHoy}</Text>
      </ScrollView>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  fecha: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  reflexion: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'justify',
    padding: 20,
    backgroundColor: 'white',
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
});
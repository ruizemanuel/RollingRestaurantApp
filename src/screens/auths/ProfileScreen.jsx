import React from 'react';
import { useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export const ProfileScreen = () => {
  const { logout, state } = useContext(AuthContext);
  const profileImageUrl = 'https://i.pravatar.cc/150?img=57';

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
      <Text style={styles.userName}>{state.user.name}</Text>
      <Text style={styles.userEmail}>{state.user.email}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>CERRAR SESION</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
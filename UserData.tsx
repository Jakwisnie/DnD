import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { useAuth } from './AuthContext';

Appearance.setColorScheme('light');

export const UserData = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const registerUser = async (login, password, email) => {
      try {
          const formData = new FormData();
          formData.append('username', login);
          formData.append('password', password);
          formData.append('email', email);

          const response = await fetch('http://192.168.56.1:8000/register', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
          }

          const data = await response.json();
          return data;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };


    const loginUser = async (login, password, setToken) => {
    try {
        console.log(login, password);

        const formData = new FormData();
        formData.append('username', login);
        formData.append('password', password);

        const response = await fetch('http://192.168.56.1:8000/login', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.access_token)
        setToken(data.access_token);

        return true;
    }
    catch (error) {
    console.error('Error during login:', error);
    return false;
    }
    };



  return (
    <UserData.Provider value={{ users, loginUser }}>
      {children}
    </UserData.Provider>
  );
};
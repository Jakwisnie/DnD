import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { useAuth } from './AuthContext';
import { NetworkInfo } from 'react-native-network-info';
import NetInfo from '@react-native-community/netinfo';
Appearance.setColorScheme('light');

export const UserData = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [ipv4, setIpv4] = useState('192.168.0.54');

  const registerUser = async (login, password, email) => {
    try {
        console.log(login, password);
            NetInfo.fetch().then(state => {
                setIpv4(state.details.wifiIPAddress);
              console.log('Adres IP:', state.details.wifiIPAddress);
            });
            console.log(ipv4);
      const payload = {
        username: login,
        email: email,
        password: password,
      };
      const response = await fetch(`http://${ipv4}:8000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      return null;
    }
  };




    const loginUser = async (login, password, setToken) => {
    try {
        const formData = new FormData();
        formData.append('username', login);
        formData.append('password', password);

        const response = await fetch(`http://${ipv4}:8000/login`, {
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
    <UserData.Provider value={{ users, loginUser, registerUser,ipv4 }}>
      {children}
    </UserData.Provider>
  );
};
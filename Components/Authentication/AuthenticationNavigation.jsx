import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import InscriptionPage from './InscriptionPage';
import AuthentificationPage from './AuthentificationPage'
export default function AuthenticationNavigation(){
    const AuthenticationStack = createStackNavigator();
    return (
        <AuthenticationStack.Navigator 
        screenOptions={{ headerShown: false }}
        > 
            <AuthenticationStack.Screen name='InscriptionPage' component={InscriptionPage}/>   
            <AuthenticationStack.Screen name='AuthentificationPage' component={AuthentificationPage}/>
        </AuthenticationStack.Navigator>
    )
}
    


